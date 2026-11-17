"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { NPC_BY_ID, TOPIC_BY_ID, TOPICS, WORLDS } from "@/lib/content";
import { selectQuestions } from "@/lib/questions";
import type { Difficulty, Question } from "@/lib/types";
import { DIFFICULTIES, EXAM_META } from "@/lib/types";
import { audio } from "./game/audio";
import { drawRun } from "./game/draw";
import {
  acceptDialogue,
  closePending,
  forceWin,
  offerNpcQuiz,
  resolveQuiz,
  startBoss,
  startHall,
  startHub,
  startMap,
  startStage,
  step,
  summarize,
  type Input,
  type Pending,
  type Run,
} from "./game/engine";
import { chromaTrim, SPRITES } from "./game/sprites";

type Save = { stars: number; best: number; attempts: number; completed: boolean };
type BoeLaw = { id: string; title: string; fechaHumana?: string | null; fecha?: string | null; url: string | null; changed?: boolean; ok?: boolean; topics?: string[] };
type BoeView = { summary?: string; laws?: BoeLaw[]; convocatoriaOk?: boolean; inapOk?: boolean; checkedAt?: string };

const emptyInput = (): Input => ({ left: false, right: false, jumpHeld: false, jumpPressed: false, actionPressed: false });

function loadId() {
  const existing = window.localStorage.getItem("opos-id");
  if (existing) return existing;
  const id = crypto.randomUUID();
  window.localStorage.setItem("opos-id", id);
  return id;
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function ChromaImg({ src, className, alt }: { src: string; className?: string; alt: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      const canvas = ref.current;
      if (!canvas) return;
      const trimmed = chromaTrim(img);
      canvas.width = trimmed.width;
      canvas.height = trimmed.height;
      canvas.getContext("2d")?.drawImage(trimmed, 0, 0);
    };
    img.src = src;
  }, [src]);
  return <canvas ref={ref} className={className} role="img" aria-label={alt} />;
}

function MuteButton({ muted, onToggle }: { muted: boolean; onToggle: () => void }) {
  return (
    <button type="button" className={`mute ${muted ? "is-muted" : ""}`} aria-pressed={muted} onClick={(event) => { event.stopPropagation(); onToggle(); }}>
      {muted ? "Música: off" : "Música: on"}
    </button>
  );
}

export default function GameApp() {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runRef = useRef<Run | null>(null);
  const inputRef = useRef<Input>(emptyInput());
  const shownRef = useRef("");
  const endRef = useRef("");
  const [ready, setReady] = useState(false);
  const [tick, setTick] = useState(0);
  const [playerId, setPlayerId] = useState("");
  const [name, setName] = useState("Alba");
  const [difficulty, setDifficulty] = useState<Difficulty>("gestor");
  const [muted, setMuted] = useState(false);
  const [screen, setScreen] = useState<"title" | "play" | "codex" | "boe" | "exam">("title");
  const [progress, setProgress] = useState<Record<string, Save>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [overlay, setOverlay] = useState<Pending | null>(null);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof summarize> | null>(null);
  const [topicId, setTopicId] = useState("I-1");
  const [boe, setBoe] = useState<BoeView | null>(null);
  const [boeBusy, setBoeBusy] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [tally, setTally] = useState({ correct: 0, wrong: 0, blank: 0, ids: [] as string[] });
  const [examPhase, setExamPhase] = useState<"intro" | "test" | "caso" | "done">("intro");
  const [caso, setCaso] = useState<{ title: string; story: string; questions: Question[] } | null>(null);
  const [seconds, setSeconds] = useState(0);
  const [examTotals, setExamTotals] = useState({ correct: 0, wrong: 0, blank: 0, asked: 0 });
  const [noteDraft, setNoteDraft] = useState("");
  const [customQ, setCustomQ] = useState({ prompt: "", options: ["", "", "", ""], correctIndex: 0, explanation: "" });

  const toggleMute = useCallback(() => {
    const next = audio.toggle();
    setMuted(next);
  }, []);

  useEffect(() => {
    const id = loadId();
    setPlayerId(id);
    setName(window.localStorage.getItem("opos-name") || "Alba");
    const storedDiff = window.localStorage.getItem("opos-difficulty") as Difficulty | null;
    if (storedDiff) setDifficulty(storedDiff);
    setMuted(window.localStorage.getItem("opos-music-muted") === "1");
    setProgress(readJson("opos-progress", {}));
    setNotes(readJson("opos-notes", {}));
    setReady(true);
    void fetch(`/api/progress?playerId=${id}`).then(async (res) => {
      if (!res.ok) return;
      const data = await res.json();
      const mapped: Record<string, Save> = {};
      for (const row of data.progress ?? []) {
        mapped[row.levelId] = { stars: row.stars, best: row.bestScore, attempts: row.attempts, completed: row.completed };
      }
      setProgress((prev) => ({ ...mapped, ...prev, ...Object.fromEntries(Object.entries(prev).map(([key, value]) => [key, {
        stars: Math.max(value.stars, mapped[key]?.stars ?? 0),
        best: Math.max(value.best, mapped[key]?.best ?? 0),
        attempts: Math.max(value.attempts, mapped[key]?.attempts ?? 0),
        completed: value.completed || Boolean(mapped[key]?.completed),
      }])) }));
    }).catch(() => undefined);
    void fetch(`/api/notes?playerId=${id}`).then(async (res) => {
      if (!res.ok) return;
      const data = await res.json();
      const mapped: Record<string, string> = {};
      for (const row of data.notes ?? []) mapped[row.topicId] = row.body;
      setNotes((prev) => ({ ...mapped, ...prev }));
    }).catch(() => undefined);
    void fetch(`/api/boe?playerId=${id}`).then(async (res) => {
      if (!res.ok) return;
      const data = await res.json();
      const payload = data.sync?.payload;
      if (payload) setBoe(payload);
    }).catch(() => undefined);
  }, []);

  useEffect(() => {
    const fit = () => {
      const root = rootRef.current;
      if (!root) return;
      const vv = window.visualViewport;
      const width = vv?.width ?? window.innerWidth;
      const height = vv?.height ?? window.innerHeight;
      root.style.width = `${width}px`;
      root.style.height = `${height}px`;
      root.style.left = `${vv?.offsetLeft ?? 0}px`;
      root.style.top = `${vv?.offsetTop ?? 0}px`;
      root.classList.toggle("short", height < 480);
      root.classList.toggle("landscape", width > height);
      root.classList.toggle("touch", window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0);
    };
    fit();
    window.addEventListener("resize", fit);
    window.addEventListener("orientationchange", fit);
    window.visualViewport?.addEventListener("resize", fit);
    window.visualViewport?.addEventListener("scroll", fit);
    const late = window.setTimeout(fit, 350);
    return () => {
      window.clearTimeout(late);
      window.removeEventListener("resize", fit);
      window.removeEventListener("orientationchange", fit);
      window.visualViewport?.removeEventListener("resize", fit);
      window.visualViewport?.removeEventListener("scroll", fit);
    };
  }, [screen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const down = event.type === "keydown";
      if (["ArrowLeft", "ArrowRight", "ArrowUp", " ", "KeyM"].includes(event.code)) event.preventDefault();
      if (event.code === "ArrowLeft" || event.code === "KeyA") inputRef.current.left = down;
      if (event.code === "ArrowRight" || event.code === "KeyD") inputRef.current.right = down;
      if (event.code === "ArrowUp" || event.code === "Space" || event.code === "KeyK" || event.code === "KeyZ") {
        if (down && !event.repeat) inputRef.current.jumpPressed = true;
        inputRef.current.jumpHeld = down;
      }
      if ((event.code === "KeyE" || event.code === "Enter" || event.code === "KeyJ") && down && !event.repeat) inputRef.current.actionPressed = true;
      if (event.code === "KeyM" && down && !event.repeat) toggleMute();
      if (event.code === "Escape" && down) setPaused((value) => !value);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    window.addEventListener("blur", () => { inputRef.current = emptyInput(); });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, [toggleMute]);

  useEffect(() => {
    if (screen === "exam") audio.play("exam");
    else if (screen === "play" && runRef.current) audio.play(runRef.current.music);
    else audio.play("hub");
  }, [screen, overlay]);

  useEffect(() => {
    if (screen !== "play") return;
    let frame = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.033, (now - last) / 1000);
      last = now;
      const canvas = canvasRef.current;
      const current = runRef.current;
      if (canvas && current && !paused) {
        const rect = canvas.getBoundingClientRect();
        const dpr = Math.min(2, window.devicePixelRatio || 1);
        const w = Math.max(1, Math.floor(rect.width));
        const h = Math.max(1, Math.floor(rect.height));
        const bw = Math.floor(w * dpr);
        const bh = Math.floor(h * dpr);
        if (canvas.width !== bw || canvas.height !== bh) {
          canvas.width = bw;
          canvas.height = bh;
        }
        step(current, dt, inputRef.current);
        inputRef.current.jumpPressed = false;
        inputRef.current.actionPressed = false;
        const ctx = canvas.getContext("2d");
        if (ctx) drawRun(ctx, current, w, h);
        const key = current.pending ? JSON.stringify(current.pending) : "";
        if (key && key !== shownRef.current) {
          shownRef.current = key;
          setOverlay(current.pending);
        }
        if (current.won && endRef.current !== "won") {
          endRef.current = "won";
          const summary = summarize(current);
          setResult(summary);
          persist(current.levelId, summary, true);
        }
        if (current.failed && endRef.current !== "failed") {
          endRef.current = "failed";
          setFailed(true);
          persist(current.levelId, null, false);
        }
      } else if (canvas && current && paused) {
        const rect = canvas.getBoundingClientRect();
        const ctx = canvas.getContext("2d");
        if (ctx && rect.width > 2) drawRun(ctx, current, rect.width, rect.height);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, [screen, paused]);

  useEffect(() => {
    if (overlay?.type !== "quiz") return;
    setQuestions([]);
    void beginQuiz(overlay);
  }, [overlay]);

  useEffect(() => {
    if (screen !== "exam" || (examPhase !== "test" && examPhase !== "caso")) return;
    if (difficulty === "aprendiz" || difficulty === "gestor") return;
    const timer = window.setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => window.clearInterval(timer);
  }, [screen, examPhase, difficulty]);

  function persist(levelId: string, summary: ReturnType<typeof summarize> | null, completed: boolean) {
    setProgress((prev) => {
      const old = prev[levelId];
      const next = {
        ...prev,
        [levelId]: {
          stars: Math.max(old?.stars ?? 0, summary?.stars ?? 0),
          best: Math.max(old?.best ?? 0, summary?.score ?? 0),
          attempts: (old?.attempts ?? 0) + 1,
          completed: Boolean(old?.completed) || completed,
        },
      };
      window.localStorage.setItem("opos-progress", JSON.stringify(next));
      return next;
    });
    if (!summary) return;
    void fetch("/api/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        playerId,
        name,
        difficulty,
        muted,
        levelId,
        stars: summary.stars,
        score: summary.score,
        completed,
        articles: summary.articles,
        correct: summary.correct,
        wrong: summary.wrong,
        blank: summary.blank,
        questionIds: summary.questionIds,
      }),
    }).catch(() => undefined);
  }

  function launch(next: Run) {
    audio.unlock();
    audio.play(next.music);
    runRef.current = next;
    shownRef.current = "";
    endRef.current = "";
    inputRef.current = emptyInput();
    setOverlay(null);
    setPaused(false);
    setFailed(false);
    setResult(null);
    setTick((value) => value + 1);
    setScreen("play");
  }

  function enter(levelId: string) {
    const attempts = (progress[levelId]?.attempts ?? 0) + 1;
    if (levelId.startsWith("map-")) launch(startMap(levelId.replace("map-", ""), difficulty));
    else if (levelId.endsWith("-boss")) launch(startBoss(levelId.replace("-boss", ""), difficulty));
    else if (levelId === "exam-hall") launch(startHall(difficulty));
    else if (levelId === "exam") {
      setScreen("exam");
      setExamPhase("intro");
    } else launch(startStage(levelId, attempts, difficulty));
  }

  async function fetchQuestions(topicIds: string[], count: number, levelId: string) {
    const seed = Date.now();
    const exclude = readJson<string[]>("opos-seen", []).slice(0, 40).join(",");
    try {
      const res = await fetch(`/api/questions?topics=${topicIds.join(",")}&count=${count}&difficulty=${difficulty}&playerId=${playerId}&levelId=${levelId}&seed=${seed}&exclude=${exclude}`);
      const data = await res.json();
      if (data.questions?.length) return data.questions as Question[];
    } catch {
      /* local bank */
    }
    return selectQuestions({ topicIds, difficulty, count, seed, exclude: exclude.split(",").filter(Boolean) });
  }

  async function beginQuiz(pending: Extract<Pending, { type: "quiz" }>) {
    const list = await fetchQuestions(pending.topicIds, pending.count, pending.levelId);
    setQuestions(list);
    setQi(0);
    setPicked(null);
    setTally({ correct: 0, wrong: 0, blank: 0, ids: [] });
  }

  function finishQuiz(nextTally: { correct: number; wrong: number; blank: number; ids: string[] }) {
    const seen = readJson<string[]>("opos-seen", []);
    window.localStorage.setItem("opos-seen", JSON.stringify([...nextTally.ids, ...seen].slice(0, 80)));
    const current = runRef.current;
    if (!current) return;
    resolveQuiz(current, nextTally);
    shownRef.current = "";
    setOverlay(null);
    setQuestions([]);
  }

  function answer(index: number | null) {
    const question = questions[qi];
    if (!question || picked !== null) return;
    const next = { ...tally, ids: [...tally.ids, question.id] };
    if (index === null) next.blank += 1;
    else if (index === question.a) next.correct += 1;
    else next.wrong += 1;
    setPicked(index);
    setTally(next);
    const hide = screen === "exam" && (difficulty === "examen" || difficulty === "oposicion");
    if (hide) window.setTimeout(() => advance(next), 250);
  }

  function advance(next = tally) {
    if (qi + 1 < questions.length) {
      setQi(qi + 1);
      setPicked(null);
      return;
    }
    if (screen === "exam" && examPhase === "test") {
      setExamTotals((prev) => ({ correct: prev.correct + next.correct, wrong: prev.wrong + next.wrong, blank: prev.blank + next.blank, asked: prev.asked + questions.length }));
      setExamPhase("caso");
      void fetch(`/api/questions?mode=caso&seed=${Date.now()}`).then(async (res) => {
        const data = await res.json();
        setCaso(data.caso);
        setQuestions(data.caso.questions);
        setQi(0);
        setPicked(null);
        setTally({ correct: 0, wrong: 0, blank: 0, ids: [] });
      }).catch(() => setExamPhase("done"));
      return;
    }
    if (screen === "exam" && examPhase === "caso") {
      setExamTotals((prev) => ({ correct: prev.correct + next.correct, wrong: prev.wrong + next.wrong, blank: prev.blank + next.blank, asked: prev.asked + questions.length }));
      setExamPhase("done");
      return;
    }
    finishQuiz(next);
  }

  async function syncBoe() {
    setBoeBusy(true);
    try {
      const res = await fetch("/api/boe", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      const data = await res.json();
      setBoe(data);
    } finally {
      setBoeBusy(false);
    }
  }

  const topic = TOPIC_BY_ID.get(topicId) ?? TOPICS[0];
  const npc = NPC_BY_ID.get(topic.npc);
  const mastered = TOPICS.filter((item) => (progress[item.id]?.stars ?? 0) > 0).length;
  const currentQuestion = questions[qi];

  if (!ready) return <div className="boot">OPOS</div>;

  return (
    <div ref={rootRef} className="game-root">
      {screen === "title" && (
        <main className="title-screen">
          <section className="hero-card">
            <ChromaImg src={SPRITES.cheer} className="alba" alt="Alba, opositora pelirroja con gafas, celebrando" />
            <p className="kicker">Gestión Civil del Estado · A2</p>
            <h1>OPOS</h1>
          </section>
          <section className="menu-card stack">
            <p className="kicker">Plaza del INAP</p>
            <h1>Alba y los 58 temas</h1>
            <p className="lede">Un plataformas de repaso, con un submundo por tema, jefes de bloque y un aula final como el examen. Las preguntas cambian en cada intento.</p>
            <label className="fine" htmlFor="name">Tu nombre</label>
            <input id="name" className="name-input" value={name} maxLength={24} onChange={(event) => { setName(event.target.value); window.localStorage.setItem("opos-name", event.target.value); }} />
            <div className="diff-grid">
              {DIFFICULTIES.map((item) => (
                <button key={item.id} className={`diff-card ${difficulty === item.id ? "active" : ""}`} onClick={() => { setDifficulty(item.id); window.localStorage.setItem("opos-difficulty", item.id); }}>
                  <strong>{item.name}</strong>
                  <span>{item.blurb}</span>
                </button>
              ))}
            </div>
            <div className="row">
              <button className="primary grow" onClick={() => { audio.unlock(); launch(startHub(difficulty)); }}>Entrar en la plaza</button>
              <MuteButton muted={muted} onToggle={toggleMute} />
            </div>
            <div className="row">
              <button className="ghost" onClick={() => setScreen("codex")}>Temario</button>
              <button className="ghost" onClick={() => setScreen("boe")}>Actualizar con el BOE</button>
              <button className="ghost" onClick={() => { setScreen("exam"); setExamPhase("intro"); }}>Ir al examen</button>
            </div>
            <p className="fine">{mastered}/58 temas con estrella · {EXAM_META.program}</p>
          </section>
        </main>
      )}

      {screen === "play" && (
        <div className="stage">
          <header className="topbar">
            <button className="ghost" onClick={() => launch(startHub(difficulty))}>Plaza</button>
            <strong key={tick}>{runRef.current?.title}</strong>
            <button className="ghost" onClick={() => setPaused(true)}>Pausa</button>
            <MuteButton muted={muted} onToggle={toggleMute} />
          </header>
          <div className="playfield">
            <canvas ref={canvasRef} />
            {overlay?.type === "dialogue" && <Dialogue pending={overlay} onQuiz={() => { const current = runRef.current; if (!current) return; if (overlay.topicId) offerNpcQuiz(current); else acceptDialogue(current); setOverlay(current.pending); }} onClose={() => { const current = runRef.current; if (!current) return; acceptDialogue(current); shownRef.current = ""; setOverlay(null); }} />}
            {overlay?.type === "quiz" && (
              <Quiz
                question={currentQuestion}
                index={qi}
                total={questions.length}
                picked={picked}
                showExplain={difficulty !== "examen"}
                onPick={answer}
                onNext={() => advance()}
              />
            )}
            {overlay?.type === "panel" && (
              <div className="overlay">
                <section className="sheet stack">
                  <h2>{overlay.id === "codex" ? "Temario" : overlay.id === "boe" ? "BOE" : overlay.id === "difficulty" ? "Dificultad" : "Cómo se juega"}</h2>
                  {overlay.id === "help" && <Help />}
                  {overlay.id === "difficulty" && DIFFICULTIES.map((item) => (
                    <button key={item.id} className={`diff-card ${difficulty === item.id ? "active" : ""}`} onClick={() => { setDifficulty(item.id); window.localStorage.setItem("opos-difficulty", item.id); }}>
                      <strong>{item.name}</strong><span>{item.blurb}</span>
                    </button>
                  ))}
                  {overlay.id === "codex" && <p>El cuaderno completo está en el menú. Desde aquí puedes abrir un tema y volver.</p>}
                  {overlay.id === "boe" && <p>La sincronización consulta los textos consolidados. Ábrela desde el botón del temario o desde la plaza, en la pantalla grande.</p>}
                  <div className="row">
                    {overlay.id === "codex" && <button className="primary" onClick={() => setScreen("codex")}>Abrir cuaderno</button>}
                    {overlay.id === "boe" && <button className="primary" onClick={() => setScreen("boe")}>Conectar con el BOE</button>}
                    <button className="ghost" onClick={() => { const current = runRef.current; if (current) closePending(current); shownRef.current = ""; setOverlay(null); }}>Seguir</button>
                  </div>
                </section>
              </div>
            )}
            {overlay?.type === "confirm-exit" && (
              <div className="overlay">
                <section className="sheet stack">
                  <h2>Aún no has hablado con el guía</h2>
                  <p>Sin la explicación y el test del personaje, este submundo solo puede darte una estrella.</p>
                  <div className="row">
                    <button className="primary" onClick={() => { const current = runRef.current; if (!current) return; closePending(current); shownRef.current = ""; setOverlay(null); }}>Volver a buscarle</button>
                    <button className="ghost" onClick={() => { const current = runRef.current; if (!current) return; forceWin(current); }}>Terminar igualmente</button>
                  </div>
                </section>
              </div>
            )}
            {overlay?.type === "enter" && (
              <div className="overlay">
                <section className="sheet stack">
                  <h2>¿Entramos?</h2>
                  <p>{labelFor(overlay.levelId)}</p>
                  <div className="row">
                    <button className="primary" onClick={() => enter(overlay.levelId)}>Entrar</button>
                    <button className="ghost" onClick={() => { const current = runRef.current; if (current) closePending(current); shownRef.current = ""; setOverlay(null); }}>Ahora no</button>
                  </div>
                </section>
              </div>
            )}
            {(paused || failed || result) && (
              <div className="overlay">
                <section className="result-card stack">
                  {result ? <ChromaImg src={SPRITES.cheer} alt="Alba celebrando" /> : null}
                  <h2>{result ? "Submundo superado" : failed ? "Se acabaron los corazones" : "Pausa"}</h2>
                  {result && <p>{result.stars} estrellas · {result.score} puntos · {result.note}</p>}
                  {failed && <p>Las preguntas del siguiente intento serán otras. El mapa no se cierra.</p>}
                  {paused && !result && !failed && <Help />}
                  <div className="row">
                    {!result && !failed && <button className="primary" onClick={() => setPaused(false)}>Seguir</button>}
                    {(failed || result) && runRef.current && <button className="primary" onClick={() => enter(runRef.current?.levelId || "hub")}>Reintentar</button>}
                    <button className="ghost" onClick={() => { setPaused(false); if (runRef.current?.worldId && runRef.current.worldId !== "hub" && runRef.current.mode !== "hub") launch(startMap(runRef.current.worldId, difficulty)); else launch(startHub(difficulty)); }}>Volver</button>
                  </div>
                </section>
              </div>
            )}
          </div>
          <div className="pad">
            <button onPointerDown={(event) => { event.preventDefault(); inputRef.current.left = true; }} onPointerUp={() => { inputRef.current.left = false; }} onPointerLeave={() => { inputRef.current.left = false; }} onPointerCancel={() => { inputRef.current.left = false; }}>◀</button>
            <button onPointerDown={(event) => { event.preventDefault(); inputRef.current.right = true; }} onPointerUp={() => { inputRef.current.right = false; }} onPointerLeave={() => { inputRef.current.right = false; }} onPointerCancel={() => { inputRef.current.right = false; }}>▶</button>
            <button onPointerDown={(event) => { event.preventDefault(); inputRef.current.jumpHeld = true; inputRef.current.jumpPressed = true; }} onPointerUp={() => { inputRef.current.jumpHeld = false; }} onPointerCancel={() => { inputRef.current.jumpHeld = false; }}>Saltar</button>
            <button onPointerDown={(event) => { event.preventDefault(); inputRef.current.actionPressed = true; }}>Acción</button>
          </div>
        </div>
      )}

      {screen === "codex" && (
        <section className="panel">
          <header className="panel-head">
            <div>
              <p className="kicker">Cuaderno de Alba</p>
              <h1>58 temas, seis bloques</h1>
            </div>
            <div className="row">
              <MuteButton muted={muted} onToggle={toggleMute} />
              <button className="ghost" onClick={() => setScreen("title")}>Inicio</button>
            </div>
          </header>
          <div className="split">
            <div className="topic-list">
              {WORLDS.filter((world) => world.block).map((world) => (
                <div key={world.id}>
                  <p className="fine">{world.name}</p>
                  {TOPICS.filter((item) => item.block === world.block).map((item) => (
                    <button key={item.id} className={`topic-row ${topicId === item.id ? "active" : ""}`} onClick={() => { setTopicId(item.id); setNoteDraft(notes[item.id] ?? ""); }}>
                      <strong>{item.id} · {item.short}</strong>
                      <span className="stars">{"★".repeat(progress[item.id]?.stars ?? 0)}{"☆".repeat(3 - (progress[item.id]?.stars ?? 0))}</span>
                    </button>
                  ))}
                </div>
              ))}
            </div>
            <article className="sheet">
              <div className="row">
                {npc?.portrait ? <div className="portrait"><ChromaImg src={npc.portrait} alt={npc.name} /></div> : null}
                <div>
                  <p className="kicker">{npc?.role}</p>
                  <h2>{topic.title}</h2>
                </div>
              </div>
              <p>{topic.voice}</p>
              <p>{topic.summary}</p>
              <ul className="points">{topic.points.map((point) => <li key={point}>{point}</li>)}</ul>
              <p className="fine">Trampa de examen: {topic.trap}</p>
              <div className="row">
                {topic.laws.map((law) => <a key={law.url} href={law.url} target="_blank" rel="noreferrer">{law.name}</a>)}
              </div>
              <div className="row">
                <button className="primary" onClick={() => enter(topic.id)}>Jugar este submundo</button>
                <button className="ghost" onClick={() => enter(`map-w${topic.block}`)}>Ver el mundo</button>
              </div>
              <label className="fine">Apunte propio</label>
              <textarea className="note" rows={3} value={noteDraft || notes[topic.id] || ""} onChange={(event) => setNoteDraft(event.target.value)} />
              <button className="ghost" onClick={() => {
                const body = noteDraft;
                setNotes((prev) => ({ ...prev, [topic.id]: body }));
                window.localStorage.setItem("opos-notes", JSON.stringify({ ...notes, [topic.id]: body }));
                void fetch("/api/notes", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ playerId, topicId: topic.id, body }) });
              }}>Guardar apunte</button>
              <h3>Añadir una pregunta a este tema</h3>
              <input className="q-input" placeholder="Enunciado" value={customQ.prompt} onChange={(event) => setCustomQ({ ...customQ, prompt: event.target.value })} />
              {customQ.options.map((option, index) => (
                <input key={index} className="q-input" placeholder={`Opción ${index + 1}`} value={option} onChange={(event) => {
                  const options = [...customQ.options];
                  options[index] = event.target.value;
                  setCustomQ({ ...customQ, options });
                }} />
              ))}
              <label className="fine">Correcta
                <select value={customQ.correctIndex} onChange={(event) => setCustomQ({ ...customQ, correctIndex: Number(event.target.value) })}>
                  <option value={0}>1</option><option value={1}>2</option><option value={2}>3</option><option value={3}>4</option>
                </select>
              </label>
              <button className="primary" onClick={() => void fetch("/api/questions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...customQ, topicId: topic.id, difficulty: 2, explanation: customQ.explanation || "Pregunta del cuaderno." }) }).then(() => setCustomQ({ prompt: "", options: ["", "", "", ""], correctIndex: 0, explanation: "" }))}>Guardar en el banco</button>
            </article>
          </div>
        </section>
      )}

      {screen === "boe" && (
        <section className="panel">
          <header className="panel-head">
            <div>
              <p className="kicker">Conexión oficial</p>
              <h1>Temario y BOE</h1>
            </div>
            <div className="row">
              <MuteButton muted={muted} onToggle={toggleMute} />
              <button className="ghost" onClick={() => setScreen("title")}>Inicio</button>
            </div>
          </header>
          <article className="sheet stack">
            <p>Programa de referencia: {EXAM_META.resolution}. {EXAM_META.program}.</p>
            <p>{EXAM_META.test}</p>
            <div className="row">
              <a href={EXAM_META.url} target="_blank" rel="noreferrer">Convocatoria en el BOE</a>
              <a href={EXAM_META.inap} target="_blank" rel="noreferrer">Sede del INAP</a>
              <button className="primary" disabled={boeBusy} onClick={() => void syncBoe()}>{boeBusy ? "Consultando…" : "Comprobar el BOE ahora"}</button>
            </div>
            {boe?.summary && <p>{boe.summary}</p>}
            <div className="law-list">
              {(boe?.laws ?? []).map((law) => (
                <article key={law.id} className="law-row">
                  <strong>{law.changed ? "Novedad · " : ""}{law.title}</strong>
                  <span>{law.ok === false ? "No se pudo leer esta ficha" : `Consolidación: ${law.fechaHumana || law.fecha || "sin fecha"}`}</span>
                  {law.url && <a href={law.url} target="_blank" rel="noreferrer">Abrir texto</a>}
                  {law.changed && <button className="ghost" onClick={() => void fetch("/api/boe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ review: true, playerId, boeId: law.id, fecha: law.fecha }) })}>Marcar como revisada</button>}
                </article>
              ))}
            </div>
            <p className="fine">Las fichas del juego son de repaso. Si el BOE consolida una reforma, manda el texto oficial. INAP {boe?.inapOk === false ? "no respondió en esta consulta" : "enlazado"} · convocatoria {boe?.convocatoriaOk === false ? "no localizada en esta consulta" : "localizada"}.</p>
          </article>
        </section>
      )}

      {screen === "exam" && (
        <section className="exam-screen">
          <header className="exam-head">
            <div>
              <p className="kicker">Mundo final · Comisión Permanente</p>
              <h1>El examen</h1>
            </div>
            <div className="row">
              {(difficulty === "oposicion" || difficulty === "examen") && <span className="timer">{Math.max(0, seconds)}s</span>}
              <MuteButton muted={muted} onToggle={toggleMute} />
              <button className="ghost" onClick={() => setScreen("title")}>Salir</button>
            </div>
          </header>
          {examPhase === "intro" && (
            <article className="sheet stack">
              <ChromaImg src={SPRITES.comisaria} alt="Comisaria Rivas" />
              <p>En la convocatoria real hay hasta 100 preguntas en 90 minutos, penalización de un tercio y un supuesto de los bloques IV, V y VI. Este aula es un simulacro más corto, con preguntas distintas cada vez.</p>
              <button className="primary" onClick={() => void (async () => {
                audio.unlock();
                audio.play("exam");
                const list = await fetchQuestions(TOPICS.map((item) => item.id), 12, "exam");
                const mixed = await fetch(`/api/questions?mode=exam&difficulty=${difficulty}&playerId=${playerId}&seed=${Date.now()}`).then((res) => res.json()).catch(() => ({ questions: list }));
                setQuestions(mixed.questions?.length ? mixed.questions : list);
                setQi(0);
                setPicked(null);
                setTally({ correct: 0, wrong: 0, blank: 0, ids: [] });
                setExamTotals({ correct: 0, wrong: 0, blank: 0, asked: 0 });
                setSeconds(difficulty === "examen" ? 18 * 60 : difficulty === "oposicion" ? 12 * 60 : 0);
                setExamPhase("test");
              })()}>Sentarse</button>
            </article>
          )}
          {(examPhase === "test" || examPhase === "caso") && currentQuestion && (
            <article className="sheet stack">
              <div className="exam-progress"><span style={{ width: `${((qi + 1) / questions.length) * 100}%` }} /></div>
              {examPhase === "caso" && caso && <p>{caso.story}</p>}
              <h2>{currentQuestion.q}</h2>
              <div className="choices">
                {currentQuestion.o.map((option, index) => (
                  <button key={option} className={`choice ${picked === null ? "" : index === currentQuestion.a ? "good" : picked === index ? "bad" : ""}`} onClick={() => answer(index)}>{option}</button>
                ))}
              </div>
              <div className="row">
                <button className="ghost" onClick={() => answer(null)}>En blanco</button>
                {picked !== null && <button className="primary" onClick={() => advance()}>Siguiente</button>}
              </div>
              {picked !== null && !(difficulty === "examen" || difficulty === "oposicion") && <p className="explain">{currentQuestion.e}</p>}
            </article>
          )}
          {examPhase === "done" && (
            <article className="sheet stack">
              <ChromaImg src={SPRITES.cheer} alt="Alba al terminar" />
              <h2>{scoreLine(examTotals, examTotals.asked || questions.length)}</h2>
              <p>La nota del simulacro usa la fórmula del primer ejercicio: aciertos menos un tercio de los errores, sobre 50. Las blancas no restan. El supuesto real se valora aparte; aquí suma como un segundo bloque de preguntas.</p>
              <button className="primary" onClick={() => setExamPhase("intro")}>Otro intento</button>
            </article>
          )}
        </section>
      )}
    </div>
  );
}

function Help() {
  return (
    <div className="stack">
      <p>Flechas o WASD para correr. Espacio salta. E habla, abre un bloque ? o entra en un portal. En el móvil usa los botones de abajo: el juego se encoge para caber entero en horizontal.</p>
      <p>Cada tema es un submundo. El personaje explica la ficha y luego te examina. Los jefes preguntan de todo el bloque, con otra música. El aula final mezcla el programa.</p>
      <p>M silencia la música de verdad. La dificultad cambia el tipo de pregunta, los corazones y la penalización.</p>
    </div>
  );
}

function Dialogue({ pending, onQuiz, onClose }: { pending: Extract<Pending, { type: "dialogue" }>; onQuiz: () => void; onClose: () => void }) {
  const topic = pending.topicId ? TOPIC_BY_ID.get(pending.topicId) : undefined;
  const npc = NPC_BY_ID.get(pending.npcId);
  return (
    <div className="overlay">
      <section className="sheet stack">
        <div className="row">
          {npc?.portrait && <div className="portrait"><ChromaImg src={npc.portrait} alt={npc.name} /></div>}
          <div>
            <p className="kicker">{npc?.role}</p>
            <h2>{npc?.name}</h2>
          </div>
        </div>
        <p>{topic ? topic.voice : "Soy Pilar, del INAP. Corre la plaza, entra en cada ministerio y no dejes un bloque sin jefe. El aula del fondo es el examen."}</p>
        {topic && <ul className="points">{topic.points.map((point) => <li key={point}>{point}</li>)}</ul>}
        {topic && <p className="fine">{topic.trap}</p>}
        <div className="row">
          {topic && <button className="primary" onClick={onQuiz}>Ponme a prueba</button>}
          <button className="ghost" onClick={onClose}>Seguir andando</button>
        </div>
      </section>
    </div>
  );
}

function Quiz({ question, index, total, picked, showExplain, onPick, onNext }: { question?: Question; index: number; total: number; picked: number | null; showExplain: boolean; onPick: (index: number | null) => void; onNext: () => void }) {
  if (!question) return <div className="overlay"><section className="sheet"><p>Preparando preguntas nuevas…</p></section></div>;
  return (
    <div className="overlay">
      <section className="quiz-card stack">
        <p className="fine">{index + 1} / {total}</p>
        <h2>{question.q}</h2>
        <div className="choices">
          {question.o.map((option, optionIndex) => (
            <button key={option} className={`choice ${picked === null ? "" : optionIndex === question.a ? "good" : picked === optionIndex ? "bad" : ""}`} onClick={() => onPick(optionIndex)}>{option}</button>
          ))}
        </div>
        <div className="row">
          <button className="ghost" onClick={() => onPick(null)}>En blanco</button>
          {picked !== null && <button className="primary" onClick={onNext}>Siguiente</button>}
        </div>
        {picked !== null && showExplain && <p className="explain">{question.e}</p>}
      </section>
    </div>
  );
}

function labelFor(levelId: string) {
  if (levelId.startsWith("map-")) return WORLDS.find((world) => world.id === levelId.replace("map-", ""))?.blurb ?? "Un mundo del temario";
  if (levelId.endsWith("-boss")) return "El jefe pregunta de todo el bloque y suena otra música.";
  if (levelId === "exam" || levelId === "exam-hall") return "El aula de la Comisión Permanente.";
  return TOPIC_BY_ID.get(levelId)?.title ?? levelId;
}

function scoreLine(tally: { correct: number; wrong: number; blank: number }, total: number) {
  const raw = Math.max(0, tally.correct - tally.wrong / 3);
  const note = total ? (raw / total) * 50 : 0;
  const pass = note >= 25 ? "Apta en el simulacro" : "Aún no llegas al 25";
  return `${pass}: ${note.toFixed(2)} / 50 · ${tally.correct} aciertos, ${tally.wrong} errores, ${tally.blank} en blanco`;
}
