export type Difficulty = "aprendiz" | "gestor" | "oposicion" | "examen";

export type LawRef = {
  boe?: string;
  name: string;
  url: string;
};

export type Topic = {
  id: string;
  block: 1 | 2 | 3 | 4 | 5 | 6;
  n: number;
  title: string;
  short: string;
  npc: string;
  laws: LawRef[];
  voice: string;
  summary: string;
  points: string[];
  trap: string;
};

export type Question = {
  id: string;
  topic: string;
  d: 1 | 2 | 3;
  q: string;
  o: string[];
  a: number;
  e: string;
};

export type NpcDef = {
  id: string;
  name: string;
  role: string;
  portrait?: string;
  body: string;
  accent: string;
  hair: string;
  hat: string;
};

export type WorldDef = {
  id: string;
  block: 1 | 2 | 3 | 4 | 5 | 6 | null;
  name: string;
  place: string;
  blurb: string;
  bossName: string;
  bossTitle: string;
  bossLine: string;
  theme: string;
  music: string;
};

export type Caso = {
  id: string;
  title: string;
  story: string;
  questions: Question[];
};

export const DIFFICULTIES: { id: Difficulty; name: string; blurb: string }[] = [
  {
    id: "aprendiz",
    name: "Aprendiz",
    blurb: "Preguntas de base, 5 corazones, pista de Bit y sin penalización.",
  },
  {
    id: "gestor",
    name: "Gestor",
    blurb: "El nivel de estudio diario. 4 corazones y trampas habituales de test.",
  },
  {
    id: "oposicion",
    name: "Oposición",
    blurb: "Preguntas finas, 3 corazones y nota con la fórmula A − E/3.",
  },
  {
    id: "examen",
    name: "Examen",
    blurb: "Como la Comisión Permanente: penalización de un tercio y sin pistas.",
  },
];

export const EXAM_META = {
  boeId: "BOE-A-2025-26262",
  date: "22 de diciembre de 2025",
  resolution: "Resolución de 18 de diciembre de 2025, de la Secretaría de Estado de Función Pública",
  url: "https://www.boe.es/diario_boe/txt.php?id=BOE-A-2025-26262",
  pdf: "https://www.boe.es/boe/dias/2025/12/22/pdfs/BOE-A-2025-26262.pdf",
  inap: "https://sede.inap.gob.es",
  program: "Anexo VII · ingreso libre · 58 temas · 6 bloques",
  test: "Primer ejercicio: hasta 100 preguntas + 5 de reserva, 90 minutos, penalización de 1/3, de 0 a 50 puntos, mínimo 25.",
  practical:
    "Segundo ejercicio: supuesto práctico de los bloques IV, V y VI. En el juego es una versión breve, con la misma lógica.",
};
