import { upsertPlayer, getProgress, saveProgress } from "@/lib/repo";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const playerId = new URL(request.url).searchParams.get("playerId") ?? "";
  if (!playerId) return Response.json({ progress: [] });
  try {
    const rows = await getProgress(playerId);
    return Response.json({ progress: rows });
  } catch (error) {
    return Response.json({ progress: [], error: error instanceof Error ? error.message : "db" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const playerId = String(body.playerId ?? "");
    const name = String(body.name ?? "Alba").slice(0, 40);
    const difficulty = String(body.difficulty ?? "gestor");
    if (!playerId) return Response.json({ ok: false }, { status: 400 });
    await upsertPlayer(playerId, name, difficulty, Boolean(body.muted));
    if (body.levelId) {
      await saveProgress({
        playerId,
        levelId: String(body.levelId),
        stars: Number(body.stars ?? 0),
        score: Number(body.score ?? 0),
        completed: Boolean(body.completed),
        articles: Number(body.articles ?? 0),
        correct: Number(body.correct ?? 0),
        wrong: Number(body.wrong ?? 0),
        blank: Number(body.blank ?? 0),
        difficulty,
        questionIds: Array.isArray(body.questionIds) ? body.questionIds.map(String) : [],
      });
    }
    const progress = await getProgress(playerId);
    return Response.json({ ok: true, progress });
  } catch (error) {
    return Response.json({ ok: false, error: error instanceof Error ? error.message : "db" }, { status: 500 });
  }
}
