import { EXAM_META } from "@/lib/types";
import { WATCHED_LAWS } from "@/lib/content";
import { getReviews, latestBoe, markReviewed, saveBoeSync } from "@/lib/repo";

export const dynamic = "force-dynamic";

type LawResult = {
  id: string;
  title: string;
  fecha: string | null;
  url: string | null;
  ok: boolean;
  changed: boolean;
  topics: string[];
};

function formatFecha(value: string | null) {
  if (!value) return null;
  const digits = value.replace(/\D/g, "");
  if (digits.length < 8) return value;
  return `${digits.slice(6, 8)}/${digits.slice(4, 6)}/${digits.slice(0, 4)}`;
}

async function fetchLaw(id: string) {
  const url = `https://www.boe.es/datosabiertos/api/legislacion-consolidada/id/${id}`;
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) return { ok: false, fecha: null, url: `https://www.boe.es/buscar/act.php?id=${id}`, title: null };
  const data = await response.json();
  const meta = data?.data?.metadatos ?? data?.data ?? {};
  return {
    ok: true,
    fecha: String(meta.fecha_actualizacion ?? meta.fecha_publicacion ?? "") || null,
    url: String(meta.url_html_consolidada ?? meta.url_eli ?? `https://www.boe.es/buscar/act.php?id=${id}`),
    title: String(meta.titulo ?? ""),
  };
}

async function probe(url: string) {
  try {
    const response = await fetch(url, { method: "GET", signal: AbortSignal.timeout(10000), redirect: "follow" });
    return response.ok;
  } catch {
    return false;
  }
}

export async function GET(request: Request) {
  const playerId = new URL(request.url).searchParams.get("playerId") ?? "";
  try {
    const current = await latestBoe();
    const reviews = playerId ? await getReviews(playerId) : [];
    return Response.json({
      convocatoria: EXAM_META,
      sync: current.sync,
      laws: current.laws.map((law) => ({
        ...law,
        fechaHumana: formatFecha(law.fechaActualizacion),
      })),
      reviews,
    });
  } catch (error) {
    return Response.json({ convocatoria: EXAM_META, sync: null, laws: [], reviews: [], error: error instanceof Error ? error.message : "db" });
  }
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  if (body?.review && body.playerId && body.boeId) {
    try {
      await markReviewed(String(body.playerId), String(body.boeId), body.fecha ? String(body.fecha) : null);
      return Response.json({ ok: true });
    } catch (error) {
      return Response.json({ ok: false, error: error instanceof Error ? error.message : "db" }, { status: 500 });
    }
  }

  let previous = new Map<string, string | null>();
  try {
    const current = await latestBoe();
    previous = new Map(current.laws.map((law) => [law.boeId, law.fechaActualizacion]));
  } catch {
    previous = new Map();
  }

  const laws: LawResult[] = [];
  for (const law of WATCHED_LAWS) {
    try {
      const remote = await fetchLaw(law.id);
      const changed = Boolean(previous.get(law.id) && remote.fecha && previous.get(law.id) !== remote.fecha);
      laws.push({
        id: law.id,
        title: remote.title || law.title,
        fecha: remote.fecha,
        url: remote.url,
        ok: remote.ok,
        changed,
        topics: law.topics,
      });
    } catch {
      laws.push({
        id: law.id,
        title: law.title,
        fecha: null,
        url: `https://www.boe.es/buscar/act.php?id=${law.id}`,
        ok: false,
        changed: false,
        topics: law.topics,
      });
    }
  }

  const [convocatoriaOk, inapOk, sumarioOk] = await Promise.all([
    probe(EXAM_META.url),
    probe(EXAM_META.inap),
    probe("https://www.boe.es/datosabiertos/api/boe/sumario/20251222"),
  ]);

  const changed = laws.filter((law) => law.changed);
  const reached = laws.filter((law) => law.ok).length;
  const summary = changed.length
    ? `El BOE tiene consolidación nueva en ${changed.length} norma${changed.length === 1 ? "" : "s"}. Revisa esos temas antes de seguir.`
    : `Programa de referencia confirmado: Anexo VII, 58 temas. Se han consultado ${reached} textos consolidados en el BOE.`;

  const payload = {
    convocatoria: EXAM_META,
    convocatoriaOk,
    inapOk,
    sumarioOk,
    laws: laws.map((law) => ({ ...law, fechaHumana: formatFecha(law.fecha) })),
    checkedAt: new Date().toISOString(),
  };

  try {
    await saveBoeSync(changed.length ? "cambios" : "ok", summary, payload, laws);
  } catch {
    /* the live payload is still useful if the table is briefly unavailable */
  }

  return Response.json({ ok: true, summary, ...payload });
}
