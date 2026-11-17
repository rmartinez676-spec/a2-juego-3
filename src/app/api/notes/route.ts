import { getNotes, saveNote } from "@/lib/repo";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const playerId = new URL(request.url).searchParams.get("playerId") ?? "";
  if (!playerId) return Response.json({ notes: [] });
  try {
    const rows = await getNotes(playerId);
    return Response.json({ notes: rows });
  } catch (error) {
    return Response.json({ notes: [], error: error instanceof Error ? error.message : "db" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const playerId = String(body.playerId ?? "");
    const topicId = String(body.topicId ?? "");
    const note = String(body.body ?? "").slice(0, 4000);
    if (!playerId || !topicId) return Response.json({ ok: false }, { status: 400 });
    await saveNote(playerId, topicId, note);
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ ok: false, error: error instanceof Error ? error.message : "db" }, { status: 500 });
  }
}
