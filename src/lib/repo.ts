import { and, desc, eq } from "drizzle-orm";
import { db } from "@/db";
import {
  boeSyncs,
  customQuestions,
  lawReviews,
  lawWatches,
  notes,
  players,
  progress,
  runs,
} from "@/db/schema";

export async function upsertPlayer(id: string, name: string, difficulty: string, muted: boolean) {
  const existing = await db.select().from(players).where(eq(players.id, id)).limit(1);
  if (existing.length === 0) {
    await db.insert(players).values({ id, name, difficulty, muted });
    return;
  }
  await db
    .update(players)
    .set({ name, difficulty, muted, updatedAt: new Date() })
    .where(eq(players.id, id));
}

export async function getProgress(playerId: string) {
  return db.select().from(progress).where(eq(progress.playerId, playerId));
}

export async function saveProgress(input: {
  playerId: string;
  levelId: string;
  stars: number;
  score: number;
  completed: boolean;
  articles: number;
  correct: number;
  wrong: number;
  difficulty: string;
  blank: number;
  questionIds: string[];
}) {
  const existing = await db
    .select()
    .from(progress)
    .where(and(eq(progress.playerId, input.playerId), eq(progress.levelId, input.levelId)))
    .limit(1);
  if (existing.length === 0) {
    await db.insert(progress).values({
      playerId: input.playerId,
      levelId: input.levelId,
      stars: input.stars,
      bestScore: input.score,
      attempts: 1,
      completed: input.completed,
      articles: input.articles,
      correct: input.correct,
      wrong: input.wrong,
    });
  } else {
    const row = existing[0];
    await db
      .update(progress)
      .set({
        stars: Math.max(row.stars, input.stars),
        bestScore: Math.max(row.bestScore, input.score),
        attempts: row.attempts + 1,
        completed: row.completed || input.completed,
        articles: Math.max(row.articles, input.articles),
        correct: row.correct + input.correct,
        wrong: row.wrong + input.wrong,
        updatedAt: new Date(),
      })
      .where(eq(progress.id, row.id));
  }
  await db.insert(runs).values({
    playerId: input.playerId,
    levelId: input.levelId,
    difficulty: input.difficulty,
    score: input.score,
    stars: input.stars,
    correct: input.correct,
    wrong: input.wrong,
    blank: input.blank,
    questionIds: input.questionIds,
  });
}

export async function recentQuestionIds(playerId: string, levelId: string) {
  const rows = await db
    .select()
    .from(runs)
    .where(and(eq(runs.playerId, playerId), eq(runs.levelId, levelId)))
    .orderBy(desc(runs.id))
    .limit(1);
  return rows[0]?.questionIds ?? [];
}

export async function getNotes(playerId: string) {
  return db.select().from(notes).where(eq(notes.playerId, playerId));
}

export async function saveNote(playerId: string, topicId: string, body: string) {
  const existing = await db
    .select()
    .from(notes)
    .where(and(eq(notes.playerId, playerId), eq(notes.topicId, topicId)))
    .limit(1);
  if (!body.trim()) {
    if (existing[0]) await db.delete(notes).where(eq(notes.id, existing[0].id));
    return;
  }
  if (existing.length === 0) {
    await db.insert(notes).values({ playerId, topicId, body });
    return;
  }
  await db.update(notes).set({ body, updatedAt: new Date() }).where(eq(notes.id, existing[0].id));
}

export async function listCustomQuestions() {
  return db.select().from(customQuestions).where(eq(customQuestions.active, true));
}

export async function addCustomQuestion(input: {
  id: string;
  topicId: string;
  difficulty: number;
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}) {
  await db.insert(customQuestions).values(input);
}

export async function latestBoe() {
  const rows = await db.select().from(boeSyncs).orderBy(desc(boeSyncs.id)).limit(1);
  const laws = await db.select().from(lawWatches);
  return { sync: rows[0] ?? null, laws };
}

export async function saveBoeSync(status: string, summary: string, payload: unknown, laws: { id: string; title: string; fecha: string | null; url: string | null }[]) {
  await db.insert(boeSyncs).values({ status, summary, payload });
  for (const law of laws) {
    const existing = await db.select().from(lawWatches).where(eq(lawWatches.boeId, law.id)).limit(1);
    if (existing.length === 0) {
      await db.insert(lawWatches).values({
        boeId: law.id,
        title: law.title,
        fechaActualizacion: law.fecha,
        url: law.url,
      });
    } else {
      await db
        .update(lawWatches)
        .set({
          title: law.title,
          fechaActualizacion: law.fecha,
          url: law.url,
          lastChecked: new Date(),
        })
        .where(eq(lawWatches.boeId, law.id));
    }
  }
}

export async function getReviews(playerId: string) {
  return db.select().from(lawReviews).where(eq(lawReviews.playerId, playerId));
}

export async function markReviewed(playerId: string, boeId: string, fecha: string | null) {
  const existing = await db
    .select()
    .from(lawReviews)
    .where(and(eq(lawReviews.playerId, playerId), eq(lawReviews.boeId, boeId)))
    .limit(1);
  if (existing.length === 0) {
    await db.insert(lawReviews).values({ playerId, boeId, reviewedFecha: fecha });
    return;
  }
  await db
    .update(lawReviews)
    .set({ reviewedFecha: fecha, reviewedAt: new Date() })
    .where(eq(lawReviews.id, existing[0].id));
}
