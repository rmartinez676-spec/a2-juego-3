import { TOPIC_BY_ID } from "@/lib/content";
import { examSet, pickCaso, questionCount, selectQuestions } from "@/lib/questions";
import { addCustomQuestion, listCustomQuestions, recentQuestionIds } from "@/lib/repo";
import type { Difficulty, Question } from "@/lib/types";

export const dynamic = "force-dynamic";

function asDifficulty(value: string | null): Difficulty {
  if (value === "aprendiz" || value === "oposicion" || value === "examen" || value === "gestor") return value;
  return "gestor";
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const mode = url.searchParams.get("mode") ?? "topic";
  const difficulty = asDifficulty(url.searchParams.get("difficulty"));
  const playerId = url.searchParams.get("playerId") ?? "";
  const levelId = url.searchParams.get("levelId") ?? url.searchParams.get("topic") ?? "";
  const seed = Number(url.searchParams.get("seed") ?? Date.now());
  let extras: Question[] = [];
  let exclude: string[] = (url.searchParams.get("exclude") ?? "").split(",").filter(Boolean);
  try {
    const custom = await listCustomQuestions();
    extras = custom.map((row) => ({
      id: row.id,
      topic: row.topicId,
      d: (row.difficulty === 1 || row.difficulty === 3 ? row.difficulty : 2) as 1 | 2 | 3,
      q: row.prompt,
      o: row.options,
      a: row.correctIndex,
      e: row.explanation,
    }));
    if (playerId && levelId) {
      const recent = await recentQuestionIds(playerId, levelId);
      exclude = [...exclude, ...recent];
    }
  } catch {
    extras = [];
  }

  if (mode === "exam") {
    return Response.json({ questions: examSet(difficulty, exclude, extras, seed), bank: questionCount() });
  }
  if (mode === "caso") {
    return Response.json({ caso: pickCaso(seed), bank: questionCount() });
  }
  const topic = url.searchParams.get("topic") ?? "";
  const topics = (url.searchParams.get("topics") ?? topic).split(",").filter(Boolean);
  const count = Math.min(12, Math.max(1, Number(url.searchParams.get("count") ?? 4)));
  const questions = selectQuestions({ topicIds: topics, difficulty, count, exclude, extras, seed });
  return Response.json({ questions, bank: questionCount() + extras.length });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const topicId = String(body.topicId ?? "");
    const prompt = String(body.prompt ?? "").trim();
    const options = Array.isArray(body.options) ? body.options.map((item: unknown) => String(item).trim()) : [];
    const correctIndex = Number(body.correctIndex ?? 0);
    const explanation = String(body.explanation ?? "").trim();
    const difficulty = Number(body.difficulty ?? 2);
    if (!TOPIC_BY_ID.has(topicId)) return Response.json({ ok: false, error: "Tema desconocido" }, { status: 400 });
    if (prompt.length < 12 || options.length !== 4 || options.some((item: string) => item.length < 1)) {
      return Response.json({ ok: false, error: "Escribe el enunciado y cuatro opciones" }, { status: 400 });
    }
    if (correctIndex < 0 || correctIndex > 3) return Response.json({ ok: false, error: "Índice inválido" }, { status: 400 });
    const id = `custom-${crypto.randomUUID()}`;
    await addCustomQuestion({
      id,
      topicId,
      difficulty: difficulty === 1 || difficulty === 3 ? difficulty : 2,
      prompt,
      options,
      correctIndex,
      explanation: explanation || "Pregunta añadida al cuaderno.",
    });
    return Response.json({ ok: true, id });
  } catch (error) {
    return Response.json({ ok: false, error: error instanceof Error ? error.message : "db" }, { status: 500 });
  }
}
