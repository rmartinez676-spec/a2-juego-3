import { NPC_BY_ID, TOPICS, topicsOfBlock, worldOfBlock, WORLDS } from "@/lib/content";
import { hashSeed } from "@/lib/questions";
import type { Difficulty } from "@/lib/types";
import { audio } from "./audio";

export const T = 48;

export type Input = {
  left: boolean;
  right: boolean;
  jumpHeld: boolean;
  jumpPressed: boolean;
  actionPressed: boolean;
};

export type EntKind = "article" | "qblock" | "enemy" | "npc" | "flag" | "portal" | "panel" | "spring" | "boss" | "deco" | "paper";

export type Ent = {
  id: number;
  kind: EntKind;
  x: number;
  y: number;
  w: number;
  h: number;
  vx: number;
  minX: number;
  maxX: number;
  used: boolean;
  dead: boolean;
  label: string;
  ref: string;
  life: number;
  variant: number;
};

export type Pending =
  | { type: "dialogue"; npcId: string; topicId: string }
  | { type: "quiz"; topicIds: string[]; count: number; source: "block" | "npc" | "boss"; levelId: string }
  | { type: "panel"; id: "codex" | "boe" | "difficulty" | "help" }
  | { type: "enter"; levelId: string }
  | { type: "confirm-exit" };

export type Run = {
  mode: "hub" | "map" | "stage" | "boss" | "hall";
  levelId: string;
  title: string;
  subtitle: string;
  theme: string;
  music: string;
  topicId?: string;
  worldId: string;
  W: number;
  H: number;
  tiles: Uint8Array;
  entities: Ent[];
  player: { x: number; y: number; w: number; h: number; vx: number; vy: number; onGround: boolean; face: 1 | -1; coyote: number; buffer: number; anim: number; land: number };
  hearts: number;
  maxHearts: number;
  articles: number;
  articleTotal: number;
  score: number;
  talked: boolean;
  quizCorrect: number;
  quizWrong: number;
  quizBlank: number;
  quizFaced: number;
  questionIds: string[];
  iframe: number;
  time: number;
  paused: boolean;
  pending: Pending | null;
  won: boolean;
  failed: boolean;
  checkpoint: number;
  shake: number;
  bossHp: number;
  bossMax: number;
  toast: string;
  toastT: number;
  bannerT: number;
  prompt: string;
  interactCd: number;
  hint: string;
  hintT: number;
  penalty: boolean;
  difficulty: Difficulty;
  flagX: number;
  nextId: number;
  paperT: number;
};

function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ent(partial: Partial<Ent> & Pick<Ent, "kind" | "x" | "y">, nextId: () => number): Ent {
  return {
    id: nextId(),
    w: 36,
    h: 36,
    vx: 0,
    minX: partial.x - 80,
    maxX: partial.x + 80,
    used: false,
    dead: false,
    label: "",
    ref: "",
    life: 8,
    variant: 0,
    ...partial,
  };
}

function heartsFor(d: Difficulty) {
  if (d === "aprendiz") return 5;
  if (d === "gestor") return 4;
  return 3;
}

function blankPlayer(x: number, y: number): Run["player"] {
  return { x, y, w: 28, h: 50, vx: 0, vy: 0, onGround: false, face: 1, coyote: 0, buffer: 0, anim: 0, land: 0 };
}

function baseRun(opts: {
  mode: Run["mode"];
  levelId: string;
  title: string;
  subtitle: string;
  theme: string;
  music: string;
  worldId: string;
  W: number;
  H: number;
  difficulty: Difficulty;
  topicId?: string;
}): Run {
  const hearts = heartsFor(opts.difficulty);
  return {
    ...opts,
    tiles: new Uint8Array(opts.W * opts.H),
    entities: [],
    player: blankPlayer(80, 200),
    hearts,
    maxHearts: hearts,
    articles: 0,
    articleTotal: 0,
    score: 0,
    talked: opts.mode === "hub" || opts.mode === "map",
    quizCorrect: 0,
    quizWrong: 0,
    quizBlank: 0,
    quizFaced: 0,
    questionIds: [],
    iframe: 0,
    time: 0,
    paused: false,
    pending: null,
    won: false,
    failed: false,
    checkpoint: 80,
    shake: 0,
    bossHp: 6,
    bossMax: 6,
    toast: "",
    toastT: 0,
    bannerT: 2.4,
    prompt: "",
    interactCd: 0.4,
    hint: "",
    hintT: 0,
    penalty: opts.difficulty === "oposicion" || opts.difficulty === "examen",
    flagX: 0,
    nextId: 1,
    paperT: 1.4,
  };
}

function tileAt(run: Run, tx: number, ty: number) {
  if (tx < 0 || tx >= run.W) return 1;
  if (ty >= run.H) return 1;
  if (ty < 0) return 0;
  return run.tiles[ty * run.W + tx];
}

function setGround(run: Run, ground: number, gaps: Array<[number, number]> = []) {
  for (let x = 0; x < run.W; x++) {
    if (gaps.some(([a, b]) => x >= a && x <= b)) continue;
    for (let y = ground; y < run.H; y++) run.tiles[y * run.W + x] = 1;
  }
}

function solidColumn(run: Run, x: number) {
  for (let y = run.H - 1; y >= 0; y--) if (run.tiles[y * run.W + x] === 1) return y;
  return run.H - 1;
}

export function startHub(difficulty: Difficulty): Run {
  const run = baseRun({
    mode: "hub",
    levelId: "hub",
    title: "Plaza del INAP",
    subtitle: "Elige un mundo, el temario o el examen",
    theme: "plaza",
    music: "hub",
    worldId: "hub",
    W: 62,
    H: 14,
    difficulty,
  });
  setGround(run, 11);
  for (let x = 4; x < 8; x++) run.tiles[8 * run.W + x] = 2;
  for (let x = 14; x < 18; x++) run.tiles[7 * run.W + x] = 2;
  const id = () => run.nextId++;
  run.entities.push(ent({ kind: "npc", x: 210, y: 11 * T - 78, w: 46, h: 78, ref: "pilar", label: "Doña Pilar" }, id));
  run.entities.push(ent({ kind: "deco", x: 340, y: 11 * T - 70, w: 90, h: 70, ref: "fountain", variant: 1 }, id));
  const panels: Array<[number, string, string]> = [
    [10, "help", "Cómo jugar"],
    [13, "codex", "Temario"],
    [16, "boe", "BOE"],
    [19, "difficulty", "Dificultad"],
  ];
  panels.forEach(([tile, ref, label]) => {
    run.entities.push(ent({ kind: "panel", x: tile * T, y: 11 * T - 92, w: 64, h: 92, ref, label }, id));
  });
  WORLDS.filter((world) => world.id !== "hub").forEach((world, index) => {
    run.entities.push(
      ent({
        kind: "portal",
        x: (23 + index * 5) * T,
        y: 11 * T - 120,
        w: 78,
        h: 120,
        ref: world.id === "final" ? "exam-hall" : `map-${world.id}`,
        label: world.id === "final" ? "Examen" : world.name.split(" ").slice(0, 2).join(" "),
        variant: index,
      }, id),
    );
  });
  for (let i = 0; i < 8; i++) {
    run.entities.push(ent({ kind: "deco", x: 80 + i * 320, y: 11 * T - 54, w: 28, h: 54, ref: i % 2 ? "banner" : "lamp", variant: i }, id));
  }
  run.toast = "Camina a la derecha. Cada puerta es un bloque; la última es el examen.";
  run.toastT = 5;
  run.player.x = 90;
  run.player.y = 11 * T - run.player.h;
  return run;
}

export function startMap(worldId: string, difficulty: Difficulty): Run {
  const world = WORLDS.find((item) => item.id === worldId) ?? WORLDS[1];
  const topics = topicsOfBlock(world.block ?? 1);
  const nodes = [
    ...topics.map((topic) => ({ id: topic.id, label: topic.short })),
    { id: `${world.id}-boss`, label: "Jefe final" },
  ];
  const run = baseRun({
    mode: "map",
    levelId: `map-${world.id}`,
    title: world.name,
    subtitle: world.place,
    theme: world.theme,
    music: `map-${world.id}`,
    worldId: world.id,
    W: 8 + nodes.length * 6,
    H: 14,
    difficulty,
  });
  setGround(run, 11);
  const id = () => run.nextId++;
  nodes.forEach((node, index) => {
    const x = (4 + index * 6) * T;
    run.entities.push(ent({ kind: "portal", x, y: 11 * T - 108, w: 78, h: 108, ref: node.id, label: node.label, variant: index }, id));
    if (index % 2 === 0) run.entities.push(ent({ kind: "deco", x: x + 110, y: 11 * T - 64, w: 40, h: 64, ref: "tree", variant: index }, id));
  });
  run.player.x = 70;
  run.player.y = 11 * T - run.player.h;
  return run;
}

export function startStage(topicId: string, attempt: number, difficulty: Difficulty): Run {
  const topic = TOPICS.find((item) => item.id === topicId) ?? TOPICS[0];
  const world = worldOfBlock(topic.block);
  const random = rng(hashSeed(`${topic.id}:${attempt}:${difficulty}`));
  const W = 62 + Math.floor(random() * 10);
  const run = baseRun({
    mode: "stage",
    levelId: topic.id,
    title: topic.short,
    subtitle: `${world.name} · tema ${topic.n}`,
    theme: world.theme,
    music: `${world.id}-t${topic.n}`,
    worldId: world.id,
    W,
    H: 14,
    difficulty,
    topicId: topic.id,
  });
  const ground = 11;
  const gapMax = difficulty === "aprendiz" ? 0 : difficulty === "gestor" ? 2 : 3;
  const gaps: Array<[number, number]> = [];
  if (gapMax) {
    let cursor = 10;
    while (cursor < W - 10) {
      if (random() < 0.22) {
        const size = 2 + Math.floor(random() * (gapMax - 1));
        gaps.push([cursor, cursor + size - 1]);
        cursor += size + 6;
      } else cursor += 4;
    }
  }
  setGround(run, ground, gaps);
  for (let i = 0; i < 7; i++) {
    const px = 6 + Math.floor(random() * (W - 14));
    const py = ground - 3 - Math.floor(random() * 2);
    const len = 3 + Math.floor(random() * 3);
    for (let k = 0; k < len; k++) {
      if (px + k > 2 && px + k < W - 2) run.tiles[py * W + px + k] = 2;
    }
  }
  const id = () => run.nextId++;
  const npc = NPC_BY_ID.get(topic.npc);
  run.entities.push(ent({ kind: "npc", x: Math.floor(W * 0.38) * T, y: ground * T - 78, w: 46, h: 78, ref: topic.npc, label: npc?.name ?? "Guía" }, id));
  const blockCount = difficulty === "aprendiz" ? 3 : 4;
  for (let i = 0; i < blockCount; i++) {
    const tx = 8 + Math.floor(random() * (W - 16));
    const ty = ground - 4;
    run.entities.push(ent({ kind: "qblock", x: tx * T + 6, y: ty * T, w: 36, h: 36, ref: topic.id, label: "?" }, id));
  }
  const articles = 8 + Math.floor(random() * 4);
  for (let i = 0; i < articles; i++) {
    const tx = 4 + Math.floor(random() * (W - 8));
    const ty = ground - 2 - Math.floor(random() * 3);
    run.entities.push(ent({ kind: "article", x: tx * T + 12, y: ty * T, w: 22, h: 22, variant: i }, id));
  }
  const enemies = difficulty === "aprendiz" ? 3 : difficulty === "gestor" ? 5 : 6;
  for (let i = 0; i < enemies; i++) {
    const tx = 9 + Math.floor(random() * (W - 14));
    if (gaps.some(([a, b]) => tx >= a - 1 && tx <= b + 1)) continue;
    run.entities.push(
      ent({
        kind: "enemy",
        x: tx * T,
        y: ground * T - 32,
        w: 30,
        h: 30,
        vx: (random() < 0.5 ? -1 : 1) * (difficulty === "oposicion" || difficulty === "examen" ? 70 : 48),
        minX: (tx - 3) * T,
        maxX: (tx + 3) * T,
        variant: i,
      }, id),
    );
  }
  if (difficulty !== "examen") {
    run.entities.push(ent({ kind: "spring", x: Math.floor(W * 0.62) * T, y: ground * T - 22, w: 40, h: 22, label: "Código" }, id));
  }
  for (let i = 0; i < 8; i++) {
    const tx = 3 + Math.floor(random() * (W - 6));
    run.entities.push(ent({ kind: "deco", x: tx * T, y: ground * T - 58, w: 34, h: 58, ref: ["tree", "lamp", "banner", "book"][i % 4], variant: i }, id));
  }
  run.flagX = (W - 3) * T;
  run.entities.push(ent({ kind: "flag", x: run.flagX, y: ground * T - 96, w: 36, h: 96, label: "Meta" }, id));
  run.articleTotal = run.entities.filter((item) => item.kind === "article").length;
  run.player.x = 70;
  run.player.y = ground * T - run.player.h;
  run.checkpoint = run.player.x;
  if (difficulty === "aprendiz" || difficulty === "gestor") {
    run.hint = topic.trap;
    run.hintT = 6.5;
  }
  return run;
}

export function startBoss(worldId: string, difficulty: Difficulty): Run {
  const world = WORLDS.find((item) => item.id === worldId) ?? WORLDS[1];
  const run = baseRun({
    mode: "boss",
    levelId: `${world.id}-boss`,
    title: world.bossName,
    subtitle: world.bossTitle,
    theme: world.theme,
    music: `boss-${world.block ?? 1}`,
    worldId: world.id,
    W: 24,
    H: 14,
    difficulty,
  });
  setGround(run, 11);
  for (let x = 4; x < 9; x++) run.tiles[8 * run.W + x] = 2;
  for (let x = 15; x < 20; x++) run.tiles[7 * run.W + x] = 2;
  for (let x = 9; x < 15; x++) run.tiles[5 * run.W + x] = 2;
  const id = () => run.nextId++;
  run.entities.push(
    ent({
      kind: "boss",
      x: 16 * T,
      y: 11 * T - 92,
      w: 78,
      h: 92,
      vx: 60,
      minX: 8 * T,
      maxX: 20 * T,
      label: world.bossName,
      ref: world.id,
    }, id),
  );
  run.bossMax = difficulty === "aprendiz" ? 4 : 6;
  run.bossHp = run.bossMax;
  run.toast = world.bossLine;
  run.toastT = 4.2;
  run.player.x = 80;
  run.player.y = 11 * T - run.player.h;
  return run;
}

export function startHall(difficulty: Difficulty): Run {
  const run = baseRun({
    mode: "hall",
    levelId: "exam-hall",
    title: "Aula de la Comisión",
    subtitle: "El examen de todo el programa",
    theme: "examen",
    music: "exam",
    worldId: "final",
    W: 36,
    H: 14,
    difficulty,
  });
  setGround(run, 11);
  const id = () => run.nextId++;
  run.entities.push(ent({ kind: "npc", x: 520, y: 11 * T - 78, w: 46, h: 78, ref: "comisaria", label: "Comisaria Rivas" }, id));
  run.flagX = 30 * T;
  run.entities.push(ent({ kind: "flag", x: run.flagX, y: 11 * T - 110, w: 48, h: 110, label: "El examen", ref: "exam" }, id));
  for (let i = 0; i < 5; i++) run.entities.push(ent({ kind: "deco", x: 160 + i * 220, y: 11 * T - 70, w: 50, h: 70, ref: "column", variant: i }, id));
  run.player.x = 80;
  run.player.y = 11 * T - run.player.h;
  run.toast = "Cien preguntas en el examen real. Aquí, un simulacro que cambia cada intento.";
  run.toastT = 4;
  return run;
}

function overlaps(a: { x: number; y: number; w: number; h: number }, b: { x: number; y: number; w: number; h: number }) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function collideX(run: Run) {
  const body = run.player;
  const x0 = Math.floor(body.x / T);
  const x1 = Math.floor((body.x + body.w - 0.01) / T);
  const y0 = Math.floor(body.y / T);
  const y1 = Math.floor((body.y + body.h - 0.01) / T);
  for (let ty = y0; ty <= y1; ty++) {
    for (let tx = x0; tx <= x1; tx++) {
      if (tileAt(run, tx, ty) === 1) return true;
    }
  }
  return false;
}

function collideY(run: Run, dy: number) {
  const body = run.player;
  const prevBottom = body.y + body.h - dy;
  const x0 = Math.floor(body.x / T);
  const x1 = Math.floor((body.x + body.w - 0.01) / T);
  const y0 = Math.floor(body.y / T);
  const y1 = Math.floor((body.y + body.h - 0.01) / T);
  for (let ty = y0; ty <= y1; ty++) {
    for (let tx = x0; tx <= x1; tx++) {
      const tile = tileAt(run, tx, ty);
      const oneWay = tile === 2 && dy >= 0 && prevBottom <= ty * T + 8;
      if (tile === 1 || oneWay) {
        if (dy > 0) body.y = ty * T - body.h - 0.02;
        else if (tile === 1) body.y = (ty + 1) * T + 0.02;
        return true;
      }
    }
  }
  return false;
}

function hurt(run: Run) {
  if (run.iframe > 0 || run.won || run.failed) return;
  run.hearts -= 1;
  run.iframe = 1.15;
  run.shake = 0.28;
  run.player.vy = -280;
  audio.sfx("hurt");
  if (run.hearts <= 0) {
    run.failed = true;
    run.paused = true;
  }
}

function win(run: Run) {
  if (run.won) return;
  run.won = true;
  run.paused = true;
  run.pending = null;
  audio.sfx("win");
}

function openPending(run: Run, pending: Pending) {
  run.pending = pending;
  run.paused = true;
  run.interactCd = 0.35;
}

export function step(run: Run, dt: number, input: Input) {
  run.time += dt;
  run.shake = Math.max(0, run.shake - dt);
  run.toastT = Math.max(0, run.toastT - dt);
  run.bannerT = Math.max(0, run.bannerT - dt);
  run.hintT = Math.max(0, run.hintT - dt);
  run.interactCd = Math.max(0, run.interactCd - dt);
  run.iframe = Math.max(0, run.iframe - dt);
  if (run.paused || run.won || run.failed) return;

  const body = run.player;
  const speed = run.difficulty === "oposicion" || run.difficulty === "examen" ? 248 : 220;
  if (input.left) body.vx -= 1600 * dt;
  else if (input.right) body.vx += 1600 * dt;
  else body.vx *= Math.max(0, 1 - 10 * dt);
  body.vx = Math.max(-speed, Math.min(speed, body.vx));
  if (Math.abs(body.vx) > 20) body.face = body.vx > 0 ? 1 : -1;
  if (input.jumpPressed) body.buffer = 0.12;
  else body.buffer = Math.max(0, body.buffer - dt);
  if (body.onGround) body.coyote = 0.1;
  else body.coyote = Math.max(0, body.coyote - dt);
  if (body.buffer > 0 && body.coyote > 0) {
    body.vy = -640;
    body.buffer = 0;
    body.coyote = 0;
    body.onGround = false;
    audio.sfx("jump");
  }
  if (!input.jumpHeld && body.vy < -180) body.vy *= 0.86;
  body.vy = Math.min(860, body.vy + 1700 * dt);

  const prevX = body.x;
  body.x += body.vx * dt;
  if (collideX(run)) {
    body.x = prevX;
    body.vx = 0;
  }
  const prevBottom = body.y + body.h;
  body.y += body.vy * dt;
  const dy = body.y + body.h - prevBottom;
  if (collideY(run, dy)) {
    if (dy > 0) {
      body.onGround = true;
      if (body.vy > 200) body.land = 0.12;
      body.vy = 0;
    } else body.vy = 40;
  } else body.onGround = false;
  body.land = Math.max(0, body.land - dt);
  body.anim += dt * (Math.abs(body.vx) > 20 ? 8 : 2);

  if (body.y > run.H * T) {
    hurt(run);
    body.x = run.checkpoint;
    body.y = 4 * T;
    body.vy = 0;
  }
  if (body.onGround && body.x > 60) run.checkpoint = body.x;

  run.entities.forEach((item) => {
    if (item.dead) return;
    if (item.kind === "enemy" || item.kind === "boss") {
      item.x += item.vx * dt;
      if (item.x < item.minX || item.x > item.maxX) item.vx *= -1;
    }
    if (item.kind === "paper") {
      item.x += item.vx * dt;
      item.y += Math.sin(run.time * 8 + item.id) * 18 * dt;
      item.life -= dt;
      if (item.life <= 0) item.dead = true;
      if (run.iframe <= 0 && overlaps(body, item)) {
        item.dead = true;
        hurt(run);
      }
    }
    if (item.kind === "article" && overlaps(body, item)) {
      item.dead = true;
      run.articles += 1;
      run.score += 5;
      const topic = TOPICS.find((row) => row.id === run.topicId);
      run.toast = topic ? topic.points[run.articles % topic.points.length] : "Artículo recogido";
      run.toastT = 2.3;
      audio.sfx("coin");
    }
    if (item.kind === "spring" && overlaps(body, { ...item, y: item.y - 6 }) && body.vy >= 0) {
      body.vy = -860;
      body.onGround = false;
      audio.sfx("jump");
    }
    if (item.kind === "enemy" && !item.dead && overlaps(body, item)) {
      if (body.vy > 40 && body.y + body.h - item.y < 28) {
        item.dead = true;
        body.vy = -420;
        run.score += 8;
        audio.sfx("stomp");
      } else hurt(run);
    }
  });

  if (run.mode === "boss") {
    run.paperT -= dt;
    const boss = run.entities.find((item) => item.kind === "boss");
    if (boss && run.paperT <= 0) {
      run.paperT = run.difficulty === "aprendiz" ? 2.8 : 2.1;
      const dir = body.x > boss.x ? 1 : -1;
      run.entities.push(
        ent({
          kind: "paper",
          x: boss.x + boss.w / 2,
          y: boss.y + 20,
          w: 18,
          h: 18,
          vx: dir * (150 + (run.difficulty === "examen" ? 40 : 0)),
          life: 4,
        }, () => run.nextId++),
      );
    }
  }

  run.prompt = "";
  if (run.interactCd > 0) return;
  const near = run.entities
    .filter((item) => !item.dead && ["npc", "portal", "panel", "qblock", "flag", "boss"].includes(item.kind))
    .map((item) => ({ item, dist: Math.abs(item.x + item.w / 2 - (body.x + body.w / 2)) }))
    .filter((row) => row.dist < 78 && Math.abs(row.item.y - body.y) < 190)
    .sort((a, b) => a.dist - b.dist)[0];

  if (near) {
    const item = near.item;
    if (item.kind === "flag") run.prompt = item.ref === "exam" ? "Entrar al examen" : "Llegar a la meta";
    else if (item.kind === "npc") run.prompt = `Hablar con ${item.label}`;
    else if (item.kind === "qblock") run.prompt = "Abrir el bloque ?";
    else if (item.kind === "boss") run.prompt = "Rebatir al jefe";
    else run.prompt = item.label;
    const headHit = item.kind === "qblock" && body.vy < 0 && body.y < item.y + item.h && body.y + body.h > item.y && Math.abs(body.x - item.x) < 40;
    if (item.kind === "flag" && overlaps(body, { x: item.x - 10, y: item.y, w: item.w + 20, h: item.h })) {
      if (item.ref === "exam") openPending(run, { type: "enter", levelId: "exam" });
      else if (run.mode === "stage" && !run.talked) openPending(run, { type: "confirm-exit" });
      else win(run);
      return;
    }
    if (input.actionPressed || headHit) {
      if (item.kind === "npc" && run.topicId) openPending(run, { type: "dialogue", npcId: item.ref, topicId: run.topicId });
      else if (item.kind === "npc") openPending(run, { type: "dialogue", npcId: item.ref, topicId: "" });
      else if (item.kind === "panel") openPending(run, { type: "panel", id: item.ref as "codex" });
      else if (item.kind === "portal") openPending(run, { type: "enter", levelId: item.ref });
      else if (item.kind === "qblock" && !item.used && run.topicId) {
        item.used = true;
        openPending(run, { type: "quiz", topicIds: [run.topicId], count: 1, source: "block", levelId: run.levelId });
      } else if (item.kind === "boss") {
        const ids = topicsOfBlock(WORLDS.find((world) => world.id === run.worldId)?.block ?? 1).map((topic) => topic.id);
        openPending(run, { type: "quiz", topicIds: ids, count: 1, source: "boss", levelId: run.levelId });
      }
    }
  }
}

export function acceptDialogue(run: Run) {
  run.talked = true;
  run.pending = null;
  run.paused = false;
  run.interactCd = 0.4;
}

export function offerNpcQuiz(run: Run) {
  if (!run.topicId) return;
  run.talked = true;
  run.pending = { type: "quiz", topicIds: [run.topicId], count: 4, source: "npc", levelId: run.levelId };
  run.paused = true;
}

export function resolveQuiz(run: Run, result: { correct: number; wrong: number; blank: number; ids: string[] }) {
  run.quizCorrect += result.correct;
  run.quizWrong += result.wrong;
  run.quizBlank += result.blank;
  run.quizFaced += result.correct + result.wrong + result.blank;
  run.questionIds.push(...result.ids);
  run.score += result.correct * 12;
  if (result.correct) audio.sfx("ok");
  if (result.wrong) audio.sfx("bad");
  if (run.mode === "boss") {
    run.bossHp = Math.max(0, run.bossHp - result.correct);
    if (result.wrong > 0) hurt(run);
    if (run.bossHp <= 0) win(run);
    run.toast = run.bossHp <= 0 ? "Jefe superado" : `Le quedan ${run.bossHp} vidas de temario`;
    run.toastT = 1.8;
  }
  run.pending = null;
  if (!run.won && !run.failed) run.paused = false;
  run.interactCd = 0.45;
}

export function closePending(run: Run) {
  run.pending = null;
  run.paused = false;
  run.interactCd = 0.55;
  if (run.flagX && run.player.x > run.flagX - 70) run.player.x = run.flagX - 110;
}

export function forceWin(run: Run) {
  win(run);
}

export function summarize(run: Run) {
  const ratio = run.quizFaced ? run.quizCorrect / run.quizFaced : 0;
  let stars = run.won ? 1 : 0;
  if (run.won && run.mode === "boss") {
    stars = ratio >= 0.85 && run.hearts === run.maxHearts ? 3 : ratio >= 0.6 ? 2 : 1;
  } else if (run.won && run.mode === "stage") {
    if (run.talked && ratio >= 0.6) stars = 2;
    const grabbed = run.articleTotal === 0 || run.articles >= Math.ceil(run.articleTotal * 0.7);
    if (run.talked && ratio >= 0.85 && run.hearts === run.maxHearts && grabbed) stars = 3;
  } else if (run.won) stars = 3;
  const raw = run.penalty ? run.quizCorrect - run.quizWrong / 3 : run.quizCorrect;
  return {
    stars,
    score: Math.max(0, Math.round(raw * 10 + run.articles * 5 + run.hearts * 3)),
    correct: run.quizCorrect,
    wrong: run.quizWrong,
    blank: run.quizBlank,
    articles: run.articles,
    questionIds: run.questionIds,
    note: run.penalty ? `Nota de preguntas: ${Math.max(0, raw).toFixed(2)} (A − E/3)` : `${run.quizCorrect} aciertos`,
  };
}
