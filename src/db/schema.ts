import {
  boolean,
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const players = pgTable("players", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  difficulty: text("difficulty").notNull().default("gestor"),
  muted: boolean("muted").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
});

export const progress = pgTable(
  "progress",
  {
    id: serial("id").primaryKey(),
    playerId: text("player_id").notNull(),
    levelId: text("level_id").notNull(),
    stars: integer("stars").notNull().default(0),
    bestScore: integer("best_score").notNull().default(0),
    attempts: integer("attempts").notNull().default(0),
    completed: boolean("completed").notNull().default(false),
    articles: integer("articles").notNull().default(0),
    correct: integer("correct").notNull().default(0),
    wrong: integer("wrong").notNull().default(0),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("progress_player_level").on(t.playerId, t.levelId)],
);

export const runs = pgTable("runs", {
  id: serial("id").primaryKey(),
  playerId: text("player_id").notNull(),
  levelId: text("level_id").notNull(),
  difficulty: text("difficulty").notNull(),
  score: integer("score").notNull(),
  stars: integer("stars").notNull().default(0),
  correct: integer("correct").notNull(),
  wrong: integer("wrong").notNull(),
  blank: integer("blank").notNull(),
  questionIds: jsonb("question_ids").$type<string[]>().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const notes = pgTable(
  "notes",
  {
    id: serial("id").primaryKey(),
    playerId: text("player_id").notNull(),
    topicId: text("topic_id").notNull(),
    body: text("body").notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("notes_player_topic").on(t.playerId, t.topicId)],
);

export const customQuestions = pgTable("custom_questions", {
  id: text("id").primaryKey(),
  topicId: text("topic_id").notNull(),
  difficulty: integer("difficulty").notNull().default(2),
  prompt: text("prompt").notNull(),
  options: jsonb("options").$type<string[]>().notNull(),
  correctIndex: integer("correct_index").notNull(),
  explanation: text("explanation").notNull(),
  active: boolean("active").notNull().default(true),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const boeSyncs = pgTable("boe_syncs", {
  id: serial("id").primaryKey(),
  status: text("status").notNull(),
  summary: text("summary").notNull(),
  payload: jsonb("payload").notNull(),
  fetchedAt: timestamp("fetched_at", { withTimezone: true }).defaultNow().notNull(),
});

export const lawWatches = pgTable("law_watches", {
  boeId: text("boe_id").primaryKey(),
  title: text("title").notNull(),
  fechaActualizacion: text("fecha_actualizacion"),
  url: text("url"),
  lastChecked: timestamp("last_checked", { withTimezone: true }).defaultNow().notNull(),
});

export const lawReviews = pgTable(
  "law_reviews",
  {
    id: serial("id").primaryKey(),
    playerId: text("player_id").notNull(),
    boeId: text("boe_id").notNull(),
    reviewedFecha: text("reviewed_fecha"),
    reviewedAt: timestamp("reviewed_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (t) => [uniqueIndex("law_reviews_player_boe").on(t.playerId, t.boeId)],
);
