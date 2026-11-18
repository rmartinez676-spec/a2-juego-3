import type { LawRef, NpcDef, Topic, WorldDef } from "./types";

export function eli(tipo: string, y: string, m: string, d: string, n: string, name: string): LawRef {
  return { name, url: `https://www.boe.es/eli/es/${tipo}/${y}/${m}/${d}/${n}` };
}

export function act(boe: string, name: string): LawRef {
  return { boe, name, url: `https://www.boe.es/buscar/act.php?id=${boe}` };
}

const CE = act("BOE-A-1978-31229", "Constitución Española");
const LPAC = act("BOE-A-2015-10565", "Ley 39/2015, procedimiento administrativo común");
const LRJSP = act("BOE-A-2015-10566", "Ley 40/2015, régimen jurídico del sector público");
const TREBEP = act("BOE-A-2015-11719", "TREBEP, RDLeg 5/2015");
const LGP = act("BOE-A-2003-21614", "Ley 47/2003, General Presupuestaria");
const LCSP = act("BOE-A-2017-12902", "Ley 9/2017, de contratos del sector público");
const LSUB = act("BOE-A-2003-20977", "Ley 38/2003, general de subvenciones");
const LPAP = act("BOE-A-2003-20254", "Ley 33/2003, del patrimonio de las AAPP");
const LJCA = act("BOE-A-1998-16718", "Ley 29/1998, jurisdicción contencioso-administrativa");
const LOTC = act("BOE-A-1979-23709", "LO 2/1979, del Tribunal Constitucional");
const LGOB = act("BOE-A-1997-25336", "Ley 50/1997, del Gobierno");
const LOPJ = act("BOE-A-1985-12666", "LO 6/1985, del Poder Judicial");
const LBRL = act("BOE-A-1985-5392", "Ley 7/1985, de bases del régimen local");
const LOEX = act("BOE-A-2000-544", "LO 4/2000, de extranjería");
const LDEP = act("BOE-A-2006-21990", "Ley 39/2006, de dependencia");
const LOEPSF = act("BOE-A-2012-5730", "LO 2/2012, de estabilidad presupuestaria");
const LTRANS = act("BOE-A-2013-12887", "Ley 19/2013, de transparencia");
const LOPD = act("BOE-A-2018-16673", "LO 3/2018, de protección de datos");
const LIGU = act("BOE-A-2007-6115", "LO 3/2007, de igualdad");
const LODEF = eli("lo", "1981", "04", "06", "3", "LO 3/1981, del Defensor del Pueblo");
const LINCOM = eli("l", "1984", "12", "26", "53", "Ley 53/1984, de incompatibilidades");
const LVIO = eli("lo", "2004", "12", "28", "1", "LO 1/2004, de violencia de género");
const LLGTBI = eli("l", "2023", "02", "28", "4", "Ley 4/2023, igualdad trans y LGTBI");
const LASILO = eli("l", "2009", "10", "30", "12", "Ley 12/2009, de asilo");
const LPNB = eli("l", "2007", "12", "13", "42", "Ley 42/2007, patrimonio natural y biodiversidad");
const LCLIMA = eli("l", "2021", "05", "20", "7", "Ley 7/2021, de cambio climático");
const LGSS = eli("rdlg", "2015", "10", "30", "8", "LGSS, RDLeg 8/2015");
const LCONSEJO = eli("lo", "1980", "04", "22", "3", "LO 3/1980, del Consejo de Estado");
const LEMPLEO = eli("l", "2023", "02", "28", "3", "Ley 3/2023, de empleo");
const LDIS = eli("rdlg", "2013", "11", "29", "1", "RDLeg 1/2013, derechos de las personas con discapacidad");
const LUNI = eli("l", "2013", "12", "09", "20", "Ley 20/2013, de garantía de la unidad de mercado");
const LTASAS = eli("l", "1989", "04", "13", "8", "Ley 8/1989, de tasas y precios públicos");
const LSAN = eli("l", "1986", "04", "25", "14", "Ley 14/1986, general de sanidad");
const LCOH = eli("l", "2003", "05", "28", "16", "Ley 16/2003, de cohesión y calidad del SNS");
const LEXT = eli("l", "2014", "03", "25", "2", "Ley 2/2014, de la acción y del servicio exterior");
const LTEL = eli("l", "2022", "06", "28", "11", "Ley 11/2022, general de telecomunicaciones");
const LMUFACE = eli("rdlg", "2000", "06", "23", "4", "RDLeg 4/2000, MUFACE");
const LEF = { name: "Ley de Expropiación Forzosa de 16 de diciembre de 1954", url: "https://www.boe.es/buscar/act.php?id=BOE-A-1954-15431" };
const RGPD = { name: "Reglamento (UE) 2016/679, RGPD", url: "https://www.boe.es/buscar/doc.php?id=DOUE-L-2016-80807" };
const TFUE = { name: "Tratado de la Unión Europea y TFUE", url: "https://www.boe.es/buscar/doc.php?id=DOUE-Z-2010-70002" };

export const NPCS: NpcDef[] = [
  { id: "pilar", name: "Doña Pilar", role: "Mentora del INAP", portrait: "/sprites/npc-pilar.png", body: "#1f7f86", accent: "#f4efe4", hair: "#a0563a", hat: "bun" },
  { id: "heraldo", name: "Heraldo Martín", role: "Cronista de las Cortes", body: "#7c2f3b", accent: "#e2b657", hair: "#5a3a28", hat: "crown" },
  { id: "nuria", name: "Senadora Nuria", role: "Las Cortes Generales", body: "#9a3d4a", accent: "#f6efe2", hair: "#2b211c", hat: "book" },
  { id: "vega", name: "Magistrada Vega", role: "Tribunal Constitucional", body: "#3d3a72", accent: "#e7e2f4", hair: "#1d1a24", hat: "scales" },
  { id: "rodrigo", name: "Don Rodrigo", role: "Casa de la Corona", body: "#8a6232", accent: "#f3e2b0", hair: "#6b4a2a", hat: "crown" },
  { id: "leandro", name: "Don Leandro", role: "Consejo de Estado", body: "#3e5c4a", accent: "#efe6d4", hair: "#d9d3c8", hat: "book" },
  { id: "soler", name: "Magistrado Soler", role: "Poder Judicial", body: "#243044", accent: "#d7e2ee", hair: "#3a332e", hat: "scales" },
  { id: "elsa", name: "Subsecretaria Elsa", role: "Administración General del Estado", body: "#2f5d73", accent: "#f7f1e4", hair: "#6a3b2c", hat: "badge" },
  { id: "rita", name: "Alcaldesa Rita", role: "Administración local", body: "#c46a45", accent: "#f8ead4", hair: "#2a211c", hat: "badge" },
  { id: "erika", name: "Érika Soler", role: "Enlace con Bruselas", portrait: "/sprites/npc-erika.png", body: "#1d4e89", accent: "#f2c14e", hair: "#e2b657", hat: "star" },
  { id: "lars", name: "Comisario Lars", role: "Comisión Europea", body: "#163a66", accent: "#f2d56b", hair: "#c9b59a", hat: "star" },
  { id: "ada", name: "Jueza Ada", role: "Tribunal de Justicia de la UE", body: "#245c86", accent: "#f7fbff", hair: "#1b1a22", hat: "scales" },
  { id: "ana", name: "Ana Clave", role: "Transparencia y administración digital", body: "#2a6f8f", accent: "#e7f4fb", hair: "#3a2a24", hat: "badge" },
  { id: "bruno", name: "Economista Bruno", role: "Ministerio de Economía", body: "#3d6b4f", accent: "#f3e2a8", hair: "#4a3428", hat: "book" },
  { id: "nilo", name: "Nilo Verde", role: "Transición Ecológica", body: "#2f6b4f", accent: "#d7ef9a", hair: "#2a241c", hat: "leaf" },
  { id: "rios", name: "Doctora Ríos", role: "Seguridad Social y MUFACE", body: "#8d3d4a", accent: "#f8e6ea", hair: "#6b3a2a", hat: "badge" },
  { id: "leo", name: "Inspector Leo", role: "Trabajo y Economía Social", body: "#c46a2a", accent: "#f8ead4", hair: "#2b211c", hat: "badge" },
  { id: "samir", name: "Oficial Samir", role: "Extranjería y asilo", body: "#3d5a73", accent: "#f4efe4", hair: "#1c1816", hat: "book" },
  { id: "iris", name: "Iris Luna", role: "Ministerio de Igualdad", body: "#7a3e78", accent: "#f8e6f4", hair: "#2a1828", hat: "flower" },
  { id: "sol", name: "Doctora Sol", role: "Sanidad y Agenda 2030", body: "#2f8f8a", accent: "#f7fbff", hair: "#5a3a28", hat: "leaf" },
  { id: "sello", name: "Archivera Sello", role: "Maestra del procedimiento", portrait: "/sprites/npc-sello.png", body: "#3d3a72", accent: "#f7f1e4", hair: "#241820", hat: "stamp" },
  { id: "nico", name: "Nico Contreras", role: "Contratación y subvenciones", body: "#8a5a32", accent: "#f3e2b0", hair: "#2b211c", hat: "stamp" },
  { id: "petra", name: "Petra del Patrimonio", role: "Bienes públicos", body: "#3e6b58", accent: "#efe6d4", hair: "#6b4a2a", hat: "crown" },
  { id: "julia", name: "Letrada Julia", role: "Sala de lo contencioso", body: "#243044", accent: "#e7e2f4", hair: "#1d1a24", hat: "scales" },
  { id: "carmen", name: "Jefa Carmen", role: "Función Pública", portrait: "/sprites/npc-carmen.png", body: "#c4523a", accent: "#f8ead4", hair: "#241820", hat: "badge" },
  { id: "hugo", name: "Delegado Hugo", role: "Carrera y movilidad", body: "#a85a3a", accent: "#f6efe2", hair: "#3a2a24", hat: "badge" },
  { id: "aurelio", name: "Don Aurelio", role: "Interventor de Hacienda", portrait: "/sprites/npc-aurelio.png", body: "#145744", accent: "#f8efc8", hair: "#5c564e", hat: "abacus" },
  { id: "ines", name: "Auditora Inés", role: "Tribunal de Cuentas", body: "#1d4e46", accent: "#f3e2a8", hair: "#2a211c", hat: "scales" },
  { id: "oro", name: "Tesorera Oro", role: "Tesorería del Estado", body: "#8a6a22", accent: "#f8efc8", hair: "#3a2a18", hat: "abacus" },
  { id: "luz", name: "Nominera Luz", role: "Nóminas de la AGE", body: "#b0893e", accent: "#fff6df", hair: "#6b3a2a", hat: "badge" },
  { id: "comisaria", name: "Comisaria Rivas", role: "Comisión Permanente de Selección", portrait: "/sprites/npc-comisaria.png", body: "#243044", accent: "#b23a48", hair: "#241820", hat: "clock" },
  { id: "tribunal-caso", name: "Tribunal de Supuestos", role: "2.ª Prueba: Casos Prácticos A2", portrait: "/sprites/npc-sello.png", body: "#1a2c4e", accent: "#fcd34d", hair: "#2b211c", hat: "scales" },
  { id: "bit", name: "Bit", role: "Robot de bolsillo", body: "#d4654a", accent: "#f6efe2", hair: "#1b1a22", hat: "robot" },
];

export const WORLDS: WorldDef[] = [
  {
    id: "hub",
    block: null,
    name: "Plaza del INAP",
    place: "Mundo inicial",
    blurb: "La plaza donde empieza todo: portales a los seis bloques, el quiosco del BOE y el aula del examen.",
    bossName: "",
    bossTitle: "",
    bossLine: "",
    theme: "plaza",
    music: "hub",
  },
  {
    id: "w1",
    block: 1,
    name: "Palacio de la Carta Magna",
    place: "Cortes, Corona y Tribunal Constitucional",
    blurb: "Mármol, banderas y el rumor de un hemiciclo. Aquí vive la organización del Estado.",
    bossName: "Guardián de la Carta",
    bossTitle: "Jefe del bloque I",
    bossLine: "Solo pasa quien distingue una reforma agravada de un decreto-ley disfrazado de Constitución.",
    theme: "carta",
    music: "w1",
  },
  {
    id: "w2",
    block: 2,
    name: "Archipiélago de las Doce Estrellas",
    place: "Bruselas, Luxemburgo y Fráncfort",
    blurb: "Canales, cristal y estrellas. El derecho de la Unión no es un adorno: tiene primacía.",
    bossName: "Eurodragón",
    bossTitle: "Jefe del bloque II",
    bossLine: "Un reglamento no se transpone. Si confundes eso, te caes al canal.",
    theme: "europa",
    music: "w2",
  },
  {
    id: "w3",
    block: 3,
    name: "Paseo de los Ministerios",
    place: "Políticas públicas",
    blurb: "Cada pabellón es un ministerio: clima, empleo, igualdad, datos, sanidad y la Agenda 2030.",
    bossName: "La Agenda Viva",
    bossTitle: "Jefa del bloque III",
    bossLine: "Diecisiete objetivos y ni uno de relleno. Demuéstrame que sabes qué ley sostiene cada política.",
    theme: "jardin",
    music: "w3",
  },
  {
    id: "w4",
    block: 4,
    name: "Ciudad del Sello",
    place: "Derecho administrativo",
    blurb: "Tinta, plazos y un silencio que a veces estima y a veces no. El corazón del supuesto práctico.",
    bossName: "Señor Silencio",
    bossTitle: "Jefe del bloque IV",
    bossLine: "Llevo tres meses sin resolver. ¿Me estimas, me desestimas o me declaras caducado?",
    theme: "sello",
    music: "w4",
  },
  {
    id: "w5",
    block: 5,
    name: "Campus de Función Pública",
    place: "INAP y empleo público",
    blurb: "Escalafones, mesas de negociación y la toma de posesión que convierte un aprobado en nombramiento.",
    bossName: "El Escalafón",
    bossTitle: "Jefe del bloque V",
    bossLine: "Mérito y capacidad. La libre designación no es un atajo para saltarse los requisitos del puesto.",
    theme: "campus",
    music: "w5",
  },
  {
    id: "w6",
    block: 6,
    name: "Fortaleza de la Hacienda",
    place: "Ministerio de Hacienda, IGAE y Tribunal de Cuentas",
    blurb: "Créditos, fases A-D-O y una caja fuerte que solo se abre con la Ley General Presupuestaria.",
    bossName: "Interventor de Hierro",
    bossTitle: "Jefe del bloque VI",
    bossLine: "Sin crédito no hay gasto. Y un suplemento no es una transferencia, por mucho que corras.",
    theme: "hacienda",
    music: "w6",
  },
  {
    id: "final",
    block: null,
    name: "Aula de la Comisión",
    place: "El examen",
    blurb: "El mundo final: test de todo el programa y un supuesto de los bloques IV, V y VI. Las preguntas cambian en cada intento.",
    bossName: "Comisaria Rivas",
    bossTitle: "Comisión Permanente de Selección",
    bossLine: "Noventa minutos, un tercio de penalización y ni una pregunta de adorno. Cuando quieras.",
    theme: "examen",
    music: "exam",
  },
];

function t(
  block: Topic["block"],
  n: number,
  title: string,
  short: string,
  npc: string,
  laws: LawRef[],
  voice: string,
  summary: string,
  points: string[],
  trap: string,
): Topic {
  const roman = ["I", "II", "III", "IV", "V", "VI"][block - 1];
  return { id: `${roman}-${n}`, block, n, title, short, npc, laws, voice, summary, points, trap };
}

export const TOPICS: Topic[] = [
  t(1, 1, "La Constitución Española de 1978: estructura y contenido. La reforma de la Constitución.", "La Constitución", "heraldo", [CE],
    "Alba, este palacio tiene cimientos fechados: las Cortes la aprobaron el 31 de octubre de 1978, el pueblo la ratificó el 6 de diciembre, el Rey la sancionó el 27 y el BOE la publicó el 29. A partir de ahí, no improvises la reforma.",
    "La Constitución es la norma suprema. Se abre con un preámbulo, un título preliminar (arts. 1 a 9) y diez títulos, y se cierra con 169 artículos, cuatro disposiciones adicionales, nueve transitorias, una derogatoria y una final. El título preliminar fija España como Estado social y democrático de Derecho, la soberanía nacional, la Monarquía parlamentaria y el derecho a la autonomía. La reforma ordinaria (art. 167) exige tres quintos de cada Cámara; si no hay acuerdo, una comisión mixta y, en su caso, mayoría de dos tercios del Congreso siempre que el Senado haya aprobado por mayoría absoluta. Cabe referéndum si lo pide una décima parte de cualquiera de las Cámaras en quince días. La reforma agravada (art. 168) alcanza al título preliminar, a la sección 1.ª del capítulo segundo del título I y al título II: dos tercios de cada Cámara, disolución, ratificación por las nuevas Cámaras y referéndum obligatorio. La iniciativa es la de los arts. 87.1 y 87.2, no la popular. El art. 169 prohíbe reformarla en tiempo de guerra o bajo los estados del art. 116.",
    ["169 artículos, 4 adicionales, 9 transitorias, 1 derogatoria y 1 final.", "Reforma ordinaria: art. 167, tres quintos de cada Cámara.", "Reforma agravada: art. 168, título preliminar, derechos de la sección 1.ª y Corona.", "La iniciativa popular no sirve para reformar la Constitución (art. 166).", "Prohibida la reforma en guerra o durante alarma, excepción o sitio."],
    "La sección 1.ª del capítulo II del título I son los arts. 15 a 29, no todo el título I."),

  t(1, 2, "Derechos y deberes fundamentales. Su garantía y suspensión. El Defensor del Pueblo.", "Derechos y Defensor", "nuria", [CE, LODEF],
    "No todos los derechos del título I se defienden igual. Si mezclas el amparo con los principios del capítulo III, el Guardián te cierra la puerta.",
    "El art. 10.1 sitúa la dignidad y los derechos inviolables como fundamento del orden político. El art. 14 proclama la igualdad. La sección 1.ª (arts. 15 a 29) recoge los derechos fundamentales y las libertades públicas, desarrollados por ley orgánica y tutelados por un procedimiento preferente y sumario y por el recurso de amparo. El art. 53.2 extiende el amparo a los arts. 14 a 29 y a la objeción de conciencia del 30.2. La sección 2.ª (arts. 30 a 38) se regula por ley ordinaria. El capítulo III (arts. 39 a 52) informa la legislación, pero solo es alegable ante los tribunales según lo dispongan las leyes. La suspensión general del art. 55.1 procede en los estados de excepción y de sitio, no en el de alarma, y alcanza a derechos tasados (17, 18.2 y 18.3, 19, 20.1.a y d y 20.5, 21, 28.2 y 37.2). El Defensor del Pueblo (art. 54 y LO 3/1981) es alto comisionado de las Cortes, designado por tres quintos de cada Cámara para cinco años, supervisa la Administración y puede interponer recursos de inconstitucionalidad y de amparo.",
    ["Amparo: arts. 14 a 29 y 30.2 (art. 53.2).", "El estado de alarma no suspende derechos fundamentales.", "Excepción y sitio sí pueden suspender los derechos del art. 55.1.", "Capítulo III: principios rectores, no derechos de amparo.", "Defensor del Pueblo: 3/5 de cada Cámara y mandato de 5 años."],
    "El art. 14 no está en la sección 1.ª, pero sí tiene amparo."),

  t(1, 3, "El Tribunal Constitucional. Organización, composición y atribuciones.", "Tribunal Constitucional", "vega", [CE, LOTC],
    "Doce magistrados, nueve años, y se renuevan por tercios. Si te aprendes solo el número y no quién los propone, el test te caza.",
    "El Tribunal Constitucional es el intérprete supremo de la Constitución, independiente y único en su orden (arts. 159 a 165 y LOTC 2/1979). Lo componen doce miembros nombrados por el Rey: cuatro a propuesta del Congreso por tres quintos, cuatro del Senado por la misma mayoría, dos del Gobierno y dos del Consejo General del Poder Judicial. El mandato es de nueve años y se renueva por tercios cada tres. Deben ser juristas de reconocida competencia con más de quince años de ejercicio. El presidente lo nombra el Rey, a propuesta del pleno, por tres años. Conoce del recurso y de la cuestión de inconstitucionalidad, del amparo, de los conflictos de competencia y de las demás materias que le atribuya la ley orgánica, incluidos el control previo de tratados y los conflictos entre órganos constitucionales. Sus sentencias tienen valor de cosa juzgada, se publican en el BOE y no cabe recurso frente a ellas. Las que declaran la inconstitucionalidad y las que no se limitan a estimar un derecho vinculan a todos.",
    ["12 magistrados, mandato de 9 años, renovación por tercios cada 3.", "4 Congreso, 4 Senado, 2 Gobierno y 2 CGPJ.", "Mayoría de tres quintos en Congreso y Senado.", "Presidente propuesto por el pleno y nombrado por 3 años.", "Sentencias con valor de cosa juzgada y publicación en el BOE."],
    "El Senado también exige tres quintos, no mayoría absoluta."),

  t(1, 4, "La Corona. Funciones constitucionales del Rey. Sucesión y regencia. El refrendo.", "La Corona", "rodrigo", [CE],
    "El Rey reina y no gobierna. Cada acto lleva una firma que no es la suya: el refrendo. Sin esa firma, el acto no vive.",
    "El Rey es el jefe del Estado, símbolo de su unidad y permanencia, arbitra y modera el funcionamiento regular de las instituciones y asume la más alta representación del Estado (art. 56). Su persona es inviolable y no está sujeta a responsabilidad. Los actos del art. 62 —sancionar y promulgar leyes, convocar y disolver las Cortes, convocar elecciones y referéndum, proponer el candidato a la Presidencia, nombrar a los miembros del Gobierno, el mando supremo de las Fuerzas Armadas, el derecho de gracia, el alto patronazgo de las Reales Academias— se refrendan. El refrendo corresponde al Presidente del Gobierno y, en su caso, a los ministros competentes; el nombramiento y cese del Presidente se refrenda por el Presidente del Congreso (arts. 64 y 99). La excepción es el art. 65.2: nombra y releva libremente a los miembros civiles y militares de su Casa. La sucesión sigue primogenitura y representación, con preferencia de línea, de grado, de varón a mujer en el mismo grado y de mayor a menor (art. 57.1). La regencia y la tutela se regulan en los arts. 59 y 60. El consorte no puede asumir funciones constitucionales salvo la regencia.",
    ["El Rey no está sujeto a responsabilidad; responde quien refrenda.", "El nombramiento del Presidente lo refrenda el Presidente del Congreso.", "Excepción al refrendo: art. 65.2, la Casa del Rey.", "Sucesión: preferencia del varón sobre la mujer en igual grado.", "El consorte solo puede asumir la regencia, no otras funciones."],
    "La preferencia del varón sigue en el texto de 1978: no se ha reformado."),

  t(1, 5, "El poder legislativo. Las Cortes Generales. Composición y atribuciones del Congreso de los Diputados y del Senado.", "Las Cortes", "nuria", [CE],
    "Dos Cámaras, un pueblo. El Congreso pesa más en la investidura, en la ley orgánica y en el presupuesto. El Senado es la Cámara territorial, no un adorno.",
    "Las Cortes Generales representan al pueblo español, ejercen la potestad legislativa, aprueban los presupuestos y controlan al Gobierno (art. 66). Son inviolables. El Congreso se compone de un mínimo de 300 y un máximo de 400 diputados —la LOREG fija 350—, elegidos por sufragio universal, libre, igual, directo y secreto, en circunscripciones provinciales, por cuatro años (art. 68). El Senado es la Cámara de representación territorial: cuatro senadores por provincia, con régimen especial de islas, Ceuta y Melilla, más los designados por las asambleas autonómicas (uno y otro por cada millón de habitantes). Los miembros son inviolables por las opiniones vertidas en el ejercicio de sus funciones e inmunes: solo pueden ser detenidos en caso de flagrante delito y no inculpados ni procesados sin autorización de la Cámara (art. 71). Hay dos periodos ordinarios de sesiones, de septiembre a diciembre y de febrero a junio. Las leyes orgánicas, reservadas a los derechos fundamentales, los Estatutos y el régimen electoral general, exigen mayoría absoluta del Congreso en una votación final sobre el conjunto (art. 81). La delegación legislativa y el decreto-ley viven en los arts. 82 a 86.",
    ["Congreso: entre 300 y 400 diputados; hoy 350, mandato de 4 años.", "Senado: Cámara territorial, 4 por provincia más designación autonómica.", "Ley orgánica: mayoría absoluta del Congreso sobre el conjunto.", "Inviolabilidad por opiniones; inmunidad, salvo flagrante delito.", "Periodos ordinarios: septiembre-diciembre y febrero-junio."],
    "La mayoría absoluta de la ley orgánica es del Congreso, no de las dos Cámaras."),

  t(1, 6, "El poder ejecutivo. El Presidente del Gobierno y el Consejo de Ministros. Relaciones entre el Gobierno y las Cortes Generales. Designación, causas de cese y responsabilidad del Gobierno. El Consejo de Estado.", "Gobierno y Consejo de Estado", "leandro", [CE, LGOB, LCONSEJO],
    "La moción de censura española es constructiva: no basta con echar a alguien, hay que traer un nombre. Apúntatelo en la manga.",
    "El Gobierno dirige la política interior y exterior, la Administración civil y militar y la defensa del Estado; ejerce la función ejecutiva y la potestad reglamentaria (art. 97). Lo componen el Presidente, los vicepresidentes en su caso, los ministros y los demás miembros que establezca la ley (art. 98). El candidato propuesto por el Rey, tras consulta y a través del Presidente del Congreso, expone su programa. La confianza exige mayoría absoluta en la primera votación y, cuarenta y ocho horas después, mayoría simple. Si en dos meses nadie la obtiene, el Rey disuelve las Cámaras con el refrendo del Presidente del Congreso (art. 99). El Gobierno cesa tras las elecciones, por pérdida de confianza, por dimisión o fallecimiento, y continúa en funciones hasta el nuevo (art. 101). La cuestión de confianza (art. 112) se entiende otorgada por mayoría simple. La moción de censura (art. 113) la propone una décima parte de los diputados, incluye candidato, no se vota hasta pasados cinco días y exige mayoría absoluta. La responsabilidad criminal del Presidente y de los ministros se exige ante la Sala de lo Penal del Tribunal Supremo (art. 102). El Consejo de Estado es el supremo órgano consultivo del Gobierno (art. 107 y LO 3/1980).",
    ["Investidura: mayoría absoluta y, a las 48 horas, mayoría simple.", "Si pasan dos meses sin investidura, disolución automática.", "Cuestión de confianza: mayoría simple del Congreso.", "Moción de censura: una décima parte, constructiva y mayoría absoluta.", "Consejo de Estado: supremo órgano consultivo, art. 107."],
    "La cuestión de confianza no exige mayoría absoluta; la censura sí."),

  t(1, 7, "El Poder Judicial. El principio de unidad jurisdiccional. El Consejo General del Poder Judicial. La organización judicial española.", "Poder Judicial", "soler", [CE, LOPJ],
    "La justicia emana del pueblo y se administra en nombre del Rey por jueces independientes, inamovibles y sometidos solo al imperio de la ley. El CGPJ gobierna el Poder Judicial: no juzga.",
    "El art. 117 consagra la independencia, la inamovilidad y la responsabilidad de jueces y magistrados, y el principio de unidad jurisdiccional como base de la organización, con las únicas excepciones de la jurisdicción militar en el ámbito estrictamente castrense y en el estado de sitio, y de los tribunales consuetudinarios y tradicionales. El Consejo General del Poder Judicial es el órgano de gobierno. Lo preside el presidente del Tribunal Supremo y lo integran veinte vocales nombrados por el Rey para cinco años: doce entre jueces y magistrados de todas las categorías y ocho entre abogados y juristas de reconocida competencia con más de quince años de ejercicio (art. 122). La ley orgánica atribuye la propuesta a las Cortes, diez el Congreso y diez el Senado, por mayoría de tres quintos. El Tribunal Supremo es el superior en todos los órdenes, salvo en materia de garantías constitucionales. Debajo se ordenan la Audiencia Nacional, los Tribunales Superiores de Justicia, las Audiencias Provinciales y los juzgados. Los órdenes son civil, penal, contencioso-administrativo, social y militar. El Ministerio Fiscal, con unidad de actuación y dependencia jerárquica, promueve la acción de la justicia; el Fiscal General del Estado es nombrado por el Rey a propuesta del Gobierno, oído el CGPJ (art. 124).",
    ["Unidad jurisdiccional, con las excepciones del art. 117.5.", "CGPJ: presidente del TS más 20 vocales, mandato de 5 años.", "12 jueces y 8 juristas; propuesta de las Cortes por 3/5.", "El CGPJ gobierna, no juzga.", "Fiscal General: Rey, a propuesta del Gobierno, oído el CGPJ."],
    "Los vocales juristas necesitan más de quince años de ejercicio, igual que los magistrados del TC."),

  t(1, 8, "La Administración General del Estado. Principios de organización y funcionamiento. Órganos centrales. Órganos superiores y órganos directivos. Los servicios comunes. Órganos territoriales. La Administración del Estado en el exterior.", "La AGE", "elsa", [CE, LRJSP, LGOB],
    "Memoriza el art. 55 como si fuera el mapa del metro: superiores arriba, directivos debajo, y el Delegado del Gobierno con rango de subsecretario, no de secretario de Estado.",
    "La Administración sirve con objetividad los intereses generales y actúa de acuerdo con los principios de eficacia, jerarquía, descentralización, desconcentración y coordinación, con sometimiento pleno a la ley y al Derecho (art. 103). La AGE se organiza en la Presidencia del Gobierno y los ministerios. En la organización central son órganos superiores los ministros y los secretarios de Estado, y órganos directivos los subsecretarios y secretarios generales, los secretarios generales técnicos y directores generales, y los subdirectores generales (art. 55.3 LRJSP). Los ministerios se crean, modifican y suprimen por real decreto del Presidente del Gobierno. Los secretarios de Estado se nombran por real decreto del Consejo de Ministros a propuesta del Presidente, oído el ministro. Subsecretarios, secretarios generales, secretarios generales técnicos y directores generales se nombran por real decreto del Consejo de Ministros a propuesta del ministro; los subdirectores, por libre designación entre funcionarios de carrera del subgrupo A1. Tienen condición de alto cargo todos los superiores y directivos salvo los subdirectores generales. En el territorio, los delegados del Gobierno tienen rango de subsecretario y los subdelegados, nivel de subdirector general. En el exterior son órganos directivos los embajadores y los representantes permanentes.",
    ["Superiores: ministros y secretarios de Estado.", "Directivos: subsecretarios, secretarios generales, SGT, DG y subdirectores.", "Ministerios: real decreto del Presidente del Gobierno.", "Delegado del Gobierno: rango de subsecretario.", "Subdirectores generales: no son alto cargo."],
    "El Delegado del Gobierno no tiene rango de secretario de Estado."),

  t(1, 9, "El sector público institucional: entidades que lo integran y régimen jurídico.", "Sector público institucional", "elsa", [LRJSP],
    "No todo lo que cuelga de un ministerio es un organismo autónomo. El sector institucional tiene familia, y cada hijo vive con un régimen distinto.",
    "El sector público institucional estatal, en la Ley 40/2015, integra los organismos públicos —organismos autónomos y entidades públicas empresariales—, las autoridades administrativas independientes, las sociedades mercantiles estatales, los consorcios, las fundaciones del sector público y los fondos sin personalidad jurídica. Los organismos autónomos se rigen por derecho administrativo y se reservan, con carácter general, actividades de fomento, prestacionales o de gestión de servicios públicos. Las entidades públicas empresariales se rigen en su actividad por derecho privado, salvo en el ejercicio de potestades públicas y en determinados aspectos organizativos. La creación de organismos públicos estatales exige ley, que establece sus fines y el tipo de organismo, y un estatuto aprobado por real decreto del Consejo de Ministros. Se exige un plan de actuación, control de eficacia y supervisión continua por el ministerio de adscripción y por Hacienda. La disolución y liquidación siguen causas tasadas, entre ellas el incumplimiento grave de los fines o la falta de sostenibilidad. Los consorcios y las fundaciones del sector público tienen reglas propias de adscripción y de pertenencia mayoritaria.",
    ["Organismos autónomos y entidades públicas empresariales no son lo mismo.", "La creación de un organismo público estatal exige ley y estatuto.", "Las entidades públicas empresariales se rigen sobre todo por derecho privado.", "Hay supervisión continua y control de eficacia.", "También integran el sector las sociedades estatales, consorcios, fundaciones y fondos sin personalidad."],
    "Una entidad pública empresarial no se crea por una simple orden ministerial."),

  t(1, 10, "Organización territorial (I): las Comunidades Autónomas. Los Estatutos de Autonomía. Distribución de competencias.", "Comunidades Autónomas", "nuria", [CE],
    "El Estado autonómico no es un estado federal escrito con otra letra, ni una simple descentralización. El mapa está en los arts. 148 y 149, y el cierre, en las cláusulas de prevalencia y supletoriedad.",
    "La Constitución reconoce y garantiza el derecho a la autonomía de las nacionalidades y regiones (art. 2) y organiza el Estado en municipios, provincias y comunidades autónomas (art. 137). Los Estatutos son la norma institucional básica de cada comunidad, forman parte del ordenamiento estatal y se protegen como ley orgánica en su reforma, sin ser leyes orgánicas ordinarias en todos sus efectos. El art. 148 enumera competencias que las comunidades pueden asumir; el 149.1 reserva al Estado una lista exclusiva, entre ellas nacionalidad, inmigración, relaciones internacionales, defensa, justicia, legislación laboral, bases de la sanidad, o bases del régimen jurídico de las Administraciones y procedimiento administrativo común (149.1.18.ª). El derecho estatal prevalece sobre el autonómico en todo lo que no esté atribuido a la exclusiva competencia de estas (art. 149.3), y el derecho estatal es supletorio. Los conflictos de competencia se resuelven ante el Tribunal Constitucional. La solidaridad, la igualdad de derechos en el territorio y la unidad de mercado limitan la autonomía. Los decretos de traspaso materializan el paso de servicios.",
    ["Arts. 148 y 149: el mapa competencial.", "El Estatuto es la norma institucional básica de la comunidad.", "149.1.18.ª: bases del régimen jurídico, procedimiento común y responsabilidad.", "Prevalencia y supletoriedad del derecho estatal: art. 149.3.", "Los conflictos de competencia van al Tribunal Constitucional."],
    "El Estatuto forma parte del ordenamiento del Estado, pero no es una ley ordinaria."),

  t(1, 11, "Organización territorial (II): la Administración local. El municipio y la provincia.", "Administración local", "rita", [CE, LBRL],
    "Municipio, provincia e isla. La autonomía local es constitucional, pero no es una competencia para inventarse tributos ni para saltarse la ley básica.",
    "La Constitución garantiza la autonomía de municipios, provincias y islas (arts. 137, 140 y 141). El gobierno municipal corresponde al ayuntamiento, integrado por el alcalde y los concejales; los concejales se eligen por sufragio universal y el alcalde por los concejales o por los vecinos. La provincia es una entidad local con personalidad propia, determinada por la agrupación de municipios, y también división territorial para el cumplimiento de las actividades del Estado; su gobierno corresponde a la diputación u otra corporación de carácter representativo. La Ley 7/1985, de Bases del Régimen Local, distingue competencias propias, delegadas y distintas de las propias. Las competencias locales deben ser propias cuando se refieren a asuntos de interés local y no están atribuidas a otra Administración, y se ejercen bajo la propia responsabilidad y en el marco de las leyes. La tutela financiera y el control de legalidad no pueden vaciar la autonomía. En los archipiélagos, los cabildos y consejos insulares acumulan funciones provinciales e insulares. Ceuta y Melilla tienen un estatuto propio de autonomía.",
    ["El alcalde lo eligen los concejales o los vecinos, según el caso.", "La provincia es a la vez entidad local y división territorial del Estado.", "LBRL: competencias propias y atribuidas por delegación.", "La autonomía local está en los arts. 137, 140 y 141.", "Ceuta y Melilla no son comunidades autónomas ordinarias."],
    "La provincia no desaparece dentro de la comunidad autónoma uniprovincial: sus funciones se acumulan."),

  t(2, 1, "La Unión Europea: antecedentes, objetivos, tratados, ampliación y cooperaciones reforzadas.", "Tratados y ampliación", "erika", [TFUE],
    "De la Comunidad Económica a la Unión. Lisboa, en vigor el 1 de diciembre de 2009, no sustituye a la Unión: le cambia el traje jurídico.",
    "La Unión persigue la paz, sus valores y el bienestar de sus pueblos (art. 3 TUE). Sus valores son la dignidad, la libertad, la democracia, la igualdad, el Estado de Derecho y los derechos humanos (art. 2). El Tratado de Lisboa, firmado en 2007 y en vigor el 1 de diciembre de 2009, modifica el TUE y convierte el Tratado de la Comunidad Europea en el Tratado de Funcionamiento. La Unión sustituyó y sucedió a la Comunidad Europea. Tiene personalidad jurídica. La ampliación exige solicitud al Consejo, unanimidad y mayoría absoluta del Parlamento, más la ratificación de todos los Estados. Las cooperaciones reforzadas permiten que un grupo de al menos nueve Estados avance en un ámbito no exclusivo, como último recurso, abiertas a los demás y sin perjudicar el mercado interior ni la cohesión. La ciudadanía de la Unión se añade a la nacional y no la sustituye. La retirada se regula en el art. 50 TUE.",
    ["Lisboa en vigor el 1 de diciembre de 2009.", "La Unión tiene personalidad jurídica y sucedió a la Comunidad.", "Ciudadanía europea: complementa, no sustituye, a la nacional.", "Cooperación reforzada: al menos nueve Estados, último recurso.", "Retirada: art. 50 TUE."],
    "Lisboa no creó una Constitución europea: reformó los tratados."),

  t(2, 2, "Instituciones (I): Consejo Europeo, Consejo y Comisión. Procedimiento decisorio y participación de los Estados.", "Consejo y Comisión", "lars", [TFUE],
    "El Consejo Europeo orienta y no legisla. Si en el test te dicen que aprueba directivas, es un gazapo con corbata.",
    "El Consejo Europeo, formado por los jefes de Estado o de Gobierno, su presidente y el presidente de la Comisión, define las orientaciones políticas generales y no ejerce función legislativa (art. 15 TUE). Decide por consenso, salvo que los tratados dispongan otra cosa. El Consejo reúne a un ministro de cada Estado, ejerce conjuntamente con el Parlamento la función legislativa y presupuestaria y decide, como regla, por mayoría cualificada: al menos el 55 % de los miembros del Consejo, un mínimo de quince, que representen al menos el 65 % de la población. La minoría de bloqueo requiere al menos cuatro Estados. La Comisión promueve el interés general, vela por los tratados, dispone del monopolio general de la iniciativa legislativa y ejecuta el presupuesto. Está compuesta por un nacional de cada Estado miembro en la práctica actual, incluido su presidente y el alto representante. El presidente es propuesto por el Consejo Europeo teniendo en cuenta las elecciones al Parlamento y es elegido por este.",
    ["El Consejo Europeo no legisla.", "Mayoría cualificada: 55 % de Estados, mínimo 15, y 65 % de población.", "Minoría de bloqueo: al menos cuatro Estados.", "La Comisión tiene el monopolio general de la iniciativa.", "El Parlamento elige al presidente de la Comisión."],
    "Unanimidad no es la regla del Consejo: la regla es la mayoría cualificada."),

  t(2, 3, "Instituciones (II): Parlamento Europeo, Tribunal de Justicia, Tribunal de Cuentas y Banco Central Europeo.", "Parlamento, TJUE y BCE", "ada", [TFUE],
    "Cinco años, sufragio directo y una pregunta prejudicial que puede salvarte un tema entero: el art. 267.",
    "El Parlamento Europeo lo eligen los ciudadanos por sufragio universal directo, libre y secreto, para cinco años. Ejerce, con el Consejo, la función legislativa y presupuestaria, controla a la Comisión y puede censurarla. El procedimiento legislativo ordinario es la codecisión. El Tribunal de Justicia de la Unión Europea comprende el Tribunal de Justicia, el Tribunal General y los tribunales especializados. El Tribunal de Justicia cuenta con un juez por Estado miembro y con abogados generales. La cuestión prejudicial (art. 267 TFUE) garantiza la aplicación uniforme del derecho de la Unión: el órgano que decide en última instancia está obligado a plantearla si la duda es necesaria para la sentencia. El Tribunal de Cuentas fiscaliza las cuentas de la Unión. El Banco Central Europeo, con los bancos centrales nacionales, conduce la política monetaria de la zona del euro y es independiente. Ni el BCE ni los bancos centrales nacionales pueden autorizar descubiertos a favor de autoridades públicas.",
    ["Parlamento: mandato de 5 años y sufragio directo.", "Cuestión prejudicial: art. 267 TFUE.", "Un juez del TJUE por cada Estado miembro.", "El BCE es independiente y no financia a los Estados.", "El Tribunal de Cuentas fiscaliza, no ejecuta el presupuesto."],
    "Quien juzga en última instancia debe plantear la prejudicial si es necesaria, no puede dejarla pasar."),

  t(2, 4, "Fuentes del derecho de la Unión y su relación con los ordenamientos nacionales.", "Fuentes y primacía", "ada", [TFUE],
    "Reglamento, directiva, decisión. Tres palabras, tres efectos. El que transpone un reglamento pierde el tiempo y el test.",
    "El derecho originario lo forman los tratados y la Carta de los Derechos Fundamentales, con el mismo valor jurídico que aquellos. El derecho derivado, según el art. 288 TFUE, comprende el reglamento, obligatorio en todos sus elementos y directamente aplicable; la directiva, que obliga en cuanto al resultado y deja a los Estados la elección de forma y medios; y la decisión, obligatoria para sus destinatarios. También existen recomendaciones y dictámenes, no vinculantes, principios generales, acuerdos internacionales y la jurisprudencia del Tribunal de Justicia. El derecho de la Unión tiene primacía sobre el derecho nacional incompatible y, cuando es claro, preciso e incondicional, puede tener efecto directo. Las directivas no transpuestas en plazo pueden invocarse frente al Estado (efecto directo vertical), no, como regla, entre particulares. El Estado que no transpone puede incurrir en responsabilidad frente a los particulares. Los jueces nacionales son también jueces de la Unión y pueden, o deben, plantear la cuestión prejudicial.",
    ["El reglamento es directamente aplicable; no se transpone.", "La directiva obliga al resultado y exige transposición.", "La decisión obliga a sus destinatarios.", "Primacía y efecto directo son construcción del TJUE, hoy consolidada.", "Efecto directo vertical de la directiva: frente al Estado, no entre particulares."],
    "Una directiva no nace con efecto directo horizontal."),

  t(2, 5, "El presupuesto comunitario, los fondos europeos y la cohesión económica y social.", "Presupuesto y fondos", "lars", [TFUE],
    "El presupuesto de la Unión no es el de un ministerio con estrellas. Tiene marco plurianual, recursos propios y una autoridad presupuestaria a dos manos.",
    "La Unión se financia con recursos propios, aprobados por los Estados según sus reglas constitucionales, y no puede financiar gastos con deuda como un Estado ordinario. El marco financiero plurianual, establecido por reglamento del Consejo, fija los límites de gasto por rúbricas durante al menos cinco años. El presupuesto anual lo adoptan el Parlamento y el Consejo, que forman la autoridad presupuestaria. Los principios clásicos —unidad, anualidad, equilibrio, universalidad, especificación y buena gestión financiera— informan la ejecución, que corresponde sobre todo a la Comisión, bajo control del Parlamento y fiscalización del Tribunal de Cuentas. La cohesión económica, social y territorial se persigue mediante fondos estructurales y de inversión: Fondo Europeo de Desarrollo Regional, Fondo Social Europeo Plus, Fondo de Cohesión, y los fondos de la política agrícola y pesquera. España es a la vez contribuyente neta en algunos ejercicios y beneficiaria relevante de fondos de cohesión, agrícolas y de recuperación. La condicionalidad vincula los fondos al Estado de Derecho y a una gestión financiera sólida.",
    ["Autoridad presupuestaria: Parlamento y Consejo.", "Marco financiero plurianual: al menos cinco años.", "La Comisión ejecuta; el Tribunal de Cuentas fiscaliza.", "FEDER, FSE+ y Fondo de Cohesión son los pilares de la cohesión.", "Recursos propios, no un impuesto europeo general aprobado solo por el Parlamento."],
    "El Consejo Europeo no adopta el presupuesto anual."),

  t(2, 6, "Políticas de la Unión: mercado interior, UEM, PESC, espacio de libertad, seguridad y justicia, competencia y política agrícola.", "Políticas europeas", "erika", [TFUE],
    "Cuatro libertades y una moneda que no todos usan. No metas a todos los Estados en el euro ni saques la PESC del método intergubernamental.",
    "El mercado interior comprende un espacio sin fronteras interiores con libre circulación de mercancías, personas, servicios y capitales. La unión económica y monetaria distingue a los Estados cuya moneda es el euro: la política monetaria es competencia exclusiva del Eurosistema, mientras la política económica sigue coordinada entre Estados, con el Pacto de Estabilidad. La política exterior y de seguridad común se rige por reglas específicas, con un papel central del Consejo Europeo y del Consejo, y queda al margen del procedimiento legislativo ordinario. El espacio de libertad, seguridad y justicia abarca fronteras, asilo, inmigración, cooperación judicial y policial. La política de competencia prohíbe los acuerdos colusorios, el abuso de posición dominante y, con matices, las ayudas de Estado incompatibles con el mercado interior; la Comisión es la autoridad central. La política agrícola común y la pesquera son competencias compartidas de larga tradición, con organización común de mercados y fondos propios. La competencia exclusiva, la compartida y la de apoyo se enumeran en los arts. 3 a 6 TFUE.",
    ["Cuatro libertades: mercancías, personas, servicios y capitales.", "No todos los Estados miembros están en la zona del euro.", "La PESC no sigue el procedimiento legislativo ordinario.", "Ayudas de Estado: control de la Comisión.", "Arts. 3 a 6 TFUE: competencias exclusivas, compartidas y de apoyo."],
    "La política monetaria de la zona euro es exclusiva de la Unión, no compartida."),

  t(3, 1, "Modernización de la AGE, administración electrónica, calidad de los servicios y mejora regulatoria.", "Administración electrónica", "ana", [LPAC, LRJSP],
    "El papel ya no es el camino ordinario. Desde las leyes de 2015, la tramitación electrónica es la forma habitual de actuar de la Administración.",
    "La Ley 39/2015 reconoce el derecho a relacionarse electrónicamente y obliga a ello a personas jurídicas, entidades sin personalidad, quienes ejerzan una actividad profesional colegiada y a los empleados públicos para sus trámites. La sede electrónica, el registro electrónico, el punto de acceso general, la carpeta ciudadana, Cl@ve, el archivo electrónico y las notificaciones electrónicas son las piezas del modelo. La Ley 40/2015 ordena el funcionamiento electrónico del sector público: cada Administración mantiene un registro electrónico y un archivo electrónico único, y los sistemas deben ser interoperables y seguros (Esquema Nacional de Interoperabilidad y Esquema Nacional de Seguridad). La calidad se expresa en cartas de servicios, evaluaciones y en el tratamiento de quejas y sugerencias. La mejora regulatoria del título VI de la Ley 39/2015 impone los principios de buena regulación del art. 129 —necesidad, eficacia, proporcionalidad, seguridad jurídica, transparencia y eficiencia—, la consulta pública previa, la audiencia y la memoria del análisis de impacto normativo.",
    ["La tramitación electrónica es la actuación habitual, no una vía especial.", "Obligados a relacionarse por medios electrónicos: personas jurídicas, profesionales colegiados y empleados públicos.", "Art. 129 LPAC: los seis principios de buena regulación.", "Consulta pública, audiencia e información pública, y MAIN.", "ENS y ENI sostienen la interoperabilidad y la seguridad."],
    "Los principios del art. 129 no incluyen la estabilidad presupuestaria: esa vive en otra ley."),

  t(3, 2, "Política económica, presupuestaria y fiscal. La unidad de mercado.", "Economía y unidad de mercado", "bruno", [CE, LOEPSF, LUNI],
    "El art. 40 encarga a los poderes públicos promover el progreso. La estabilidad no es un deseo: es una ley orgánica con reglas de gasto, déficit y deuda.",
    "La Constitución ordena a los poderes públicos promover las condiciones de progreso social y económico y una distribución de la renta más equitativa, en el marco de la estabilidad económica (art. 40), y somete el gasto público a los principios de equidad y eficiencia (art. 31). La LO 2/2012 de estabilidad presupuestaria y sostenibilidad financiera impone estabilidad, plurianualidad, transparencia, eficiencia, responsabilidad y lealtad institucional. Fija objetivos de déficit estructural, un límite de deuda y una regla de gasto, con medidas preventivas, correctivas y coercitivas, y crea el marco en el que actúa la AIReF como autoridad independiente. La política fiscal se reparte entre los impuestos estatales, cedidos y propios de comunidades y entidades locales. La Ley 20/2013 de garantía de la unidad de mercado asegura que una actividad autorizada en un lugar pueda ejercerse en todo el territorio, con cooperación y una ventanilla de reclamación. No elimina las competencias autonómicas: impide que se usen como barrera injustificada.",
    ["Art. 31 CE: sistema tributario justo y gasto eficiente.", "LOEPSF: estabilidad, regla de gasto, déficit y deuda.", "La AIReF vigila el cumplimiento con independencia.", "Unidad de mercado: licencia en origen y eficacia en todo el territorio.", "La unidad de mercado no borra el Estado autonómico."],
    "La regla de gasto no es lo mismo que el objetivo de déficit."),

  t(3, 3, "Política ambiental. Competencias, biodiversidad, contaminación y cambio climático.", "Medio ambiente", "nilo", [CE, LPNB, LCLIMA],
    "El art. 45 no es un poema: es un principio rector con sanción. Quien contamina puede pagar, y las competencias están partidas entre el Estado y las comunidades.",
    "El art. 45 reconoce el derecho a disfrutar de un medio ambiente adecuado y el deber de conservarlo, e impone a los poderes públicos velar por el uso racional de los recursos. Es un principio rector del capítulo III. La competencia estatal del art. 149.1.23.ª abarca la legislación básica sobre protección del medio ambiente, sin perjuicio de las facultades autonómicas de normas adicionales, y la legislación básica sobre montes, aprovechamientos forestales y vías pecuarias. Las comunidades gestionan y pueden elevar el nivel de protección. La Ley 42/2007 ordena el patrimonio natural y la biodiversidad, los espacios protegidos y la Red Natura 2000. La prevención y el control de la contaminación se apoyan en la autorización ambiental, la evaluación de impacto y los principios de precaución, prevención, quien contamina paga y corrección en la fuente. La Ley 7/2021 de cambio climático y transición energética fija objetivos de reducción de emisiones, neutralidad climática y planificación energética, en el marco del Pacto Verde europeo. La responsabilidad medioambiental obliga a prevenir y reparar los daños a suelos, aguas, especies y hábitats.",
    ["Art. 45: principio rector, con sanciones penales o administrativas.", "149.1.23.ª: legislación básica estatal y normas adicionales autonómicas.", "Red Natura 2000 y Ley 42/2007.", "Principios: precaución, prevención y quien contamina paga.", "Ley 7/2021: marco estatal de cambio climático."],
    "Las comunidades pueden mejorar la protección básica, no rebajarla."),

  t(3, 4, "La Seguridad Social: estructura, financiación, regímenes y acción protectora.", "Seguridad Social", "rios", [CE, LGSS],
    "Un sistema, varios regímenes, y una acción protectora que no es solo la pensión. Si confundes contributivo con no contributivo, el tema se deshace.",
    "El art. 41 encarga a los poderes públicos un régimen público de Seguridad Social para todos los ciudadanos, que garantice asistencia y prestaciones suficientes ante situaciones de necesidad, y prestaciones complementarias libres. El texto refundido de la LGSS organiza el sistema en un régimen general y regímenes especiales —entre ellos el de trabajadores del mar y el de la minería del carbón, además del régimen de autónomos integrado en el sistema—. La gestión se reparte entre el INSS, la Tesorería General y el Instituto Social de la Marina, con el SEPE para el desempleo y el IMSERSO en el ámbito no contributivo y de mayores. La financiación procede de cotizaciones y de aportaciones estatales, estas últimas decisivas en la protección no contributiva y en una parte de la sanidad ya transferida al sistema fiscal. La acción protectora incluye incapacidad temporal, nacimiento y cuidado, incapacidad permanente, jubilación, muerte y supervivencia, desempleo, prestaciones familiares y protección no contributiva. Las prestaciones contributivas exigen afiliación, alta y cotización; las no contributivas, situación de necesidad y residencia.",
    ["Art. 41 CE: régimen público para todos los ciudadanos.", "Régimen general y regímenes especiales.", "INSS, TGSS e ISM son la columna gestora.", "Contributivo: alta y cotización. No contributivo: necesidad.", "El desempleo se gestiona en el ámbito del SEPE."],
    "La sanidad pública ya no se financia principalmente por cotizaciones."),

  t(3, 5, "Empleo, servicios públicos de empleo y políticas de empleo.", "Empleo", "leo", [CE, LEMPLEO],
    "El SEPE no es solo una ventanilla de paro. Hay protección y hay política activa, y el test las separa a propósito.",
    "El art. 40.1 encarga políticas de pleno empleo. El art. 35 reconoce el deber y el derecho al trabajo. El sistema nacional de empleo articula el servicio público estatal y los servicios autonómicos. La Ley 3/2023 de Empleo define las políticas activas —orientación, formación, intermediación y oportunidades— y la coordinación con la protección por desempleo. La prestación contributiva exige cotización previa y situación legal de desempleo; el subsidio y otras ayudas asisten a quien agota la contributiva o no alcanza el periodo mínimo, con requisitos de rentas. La inscripción como demandante y el compromiso de actividad condicionan el cobro. Las comunidades ejecutan buena parte de las políticas activas con fondos estatales y europeos; el Estado conserva la legislación laboral (art. 149.1.7.ª) y la caja única de la protección. El diálogo social y la negociación colectiva ordenan salarios y condiciones, sin sustituir al servicio público de empleo.",
    ["Políticas activas y protección por desempleo no son lo mismo.", "Prestación contributiva: cotización y situación legal de desempleo.", "El compromiso de actividad condiciona la protección.", "Legislación laboral: competencia estatal, art. 149.1.7.ª.", "Los servicios autonómicos ejecutan gran parte de la política activa."],
    "Estar en paro no basta: hace falta situación legal de desempleo y, en la contributiva, cotización."),

  t(3, 6, "Política de inmigración, régimen de extranjería y derecho de asilo.", "Extranjería y asilo", "samir", [CE, LOEX, LASILO],
    "Extranjería y asilo no comparten ventanilla. Una regula la residencia; la otra protege a quien huye de una persecución.",
    "El art. 13 remite a la ley los derechos de los extranjeros y reconoce el derecho de asilo. La LO 4/2000 distingue la entrada, la estancia de corta duración, la residencia temporal y la de larga duración, y la autorización para trabajar. Los ciudadanos de la Unión se rigen por el régimen de libre circulación, no por el general de extranjería. La reagrupación familiar, la residencia por circunstancias excepcionales y la autorización por arraigo son vías tasadas. Las sanciones —multa, extinción de la autorización o expulsión— deben ser proporcionales y, en varios supuestos, la expulsión no es automática. El derecho de asilo de la Ley 12/2009 protege al refugiado, perseguido por motivos de raza, religión, nacionalidad, opiniones políticas o pertenencia a grupo social, y también la protección subsidiaria frente a daños graves. La solicitud suspende la devolución y da derecho a ser documentado y a no ser devuelto al país de riesgo (non-refoulement). La competencia sobre inmigración y extranjería es estatal (art. 149.1.2.ª), sin perjuicio de la acogida y la integración, donde colaboran comunidades y municipios.",
    ["LO 4/2000: entrada, estancia, residencia y trabajo.", "Los ciudadanos de la UE no se rigen por el régimen general.", "Asilo: Ley 12/2009, persecución por motivos tasados.", "Non-refoulement: prohibición de devolver al país de riesgo.", "Inmigración: competencia estatal del art. 149.1.2.ª."],
    "La protección subsidiaria no es un permiso de trabajo ordinario."),

  t(3, 7, "Gobierno abierto y Ley 19/2013, de transparencia, acceso a la información pública y buen gobierno.", "Transparencia", "ana", [LTRANS],
    "Transparencia, participación y colaboración. Y un plazo de un mes que, si se calla, desestima. No le apliques el silencio positivo de la calle de al lado.",
    "El gobierno abierto se apoya en tres principios: transparencia, participación y colaboración, desarrollados en planes de acción. La Ley 19/2013 impone publicidad activa —información institucional, jurídica y económica— y un derecho de acceso a la información pública, que no exige motivar la solicitud. El plazo para resolver es de un mes, ampliable otro, y el silencio es negativo. Los límites del art. 14 —seguridad, defensa, relaciones exteriores, investigación, intereses económicos, igualdad de las partes, intimidad y datos personales, entre otros— se aplican de forma proporcionada y justificada, no como una puerta cerrada genérica. Si la información contiene datos personales se articula con la normativa de protección de datos. El Consejo de Transparencia y Buen Gobierno reclama frente a las resoluciones de acceso y vela por el cumplimiento. El título II tipifica infracciones de los altos cargos en materia de buen gobierno, con un régimen sancionador propio. La ley se aplica al sector público estatal y, en lo básico, al resto de Administraciones.",
    ["Publicidad activa y derecho de acceso no son lo mismo.", "Plazo de un mes; silencio negativo.", "No hace falta motivar para qué se pide la información.", "Límites del art. 14, aplicados con proporcionalidad.", "El Consejo de Transparencia resuelve reclamaciones."],
    "El silencio en acceso a la información es negativo, no positivo."),

  t(3, 8, "Protección de datos personales y derechos digitales.", "Protección de datos", "ana", [RGPD, LOPD],
    "Licitud, lealtad, transparencia, limitación de la finalidad, minimización, exactitud, limitación del plazo, integridad y confidencialidad, y responsabilidad proactiva. Si te falta una, el art. 5 está incompleto.",
    "El RGPD y la LO 3/2018 forman el régimen aplicable. Los principios del art. 5 RGPD obligan al responsable desde el diseño y por defecto. Las bases de licitud incluyen el consentimiento, el contrato, la obligación legal, el interés vital, el interés público o el ejercicio de poderes públicos, y el interés legítimo cuando proceda. Los derechos de las personas son acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad, además de no ser objeto de decisiones exclusivamente automatizadas con efectos jurídicos. El responsable determina fines y medios; el encargado trata por cuenta de aquel, con un contrato. El delegado de protección de datos es obligatorio en las autoridades públicas y en ciertos tratamientos de riesgo. La Agencia Española de Protección de Datos es la autoridad estatal de control, con independencia. Las multas más graves pueden alcanzar 20 millones de euros o el 4 % del volumen de negocio mundial. La LO 3/2018 añade un catálogo de derechos digitales y reglas específicas para el sector público, los menores y los tratamientos por obligación legal.",
    ["Art. 5 RGPD: los principios, incluida la responsabilidad proactiva.", "Responsable y encargado no se confunden.", "Derechos: acceso, rectificación, supresión, oposición, limitación y portabilidad.", "DPD obligatorio en las autoridades públicas.", "AEPD independiente; sanciones de hasta el 4 % o 20 millones."],
    "El consentimiento no es la única base legal: la obligación legal es la vía habitual del sector público."),

  t(3, 9, "Igualdad, violencia de género, igualdad LGTBI, discapacidad y dependencia.", "Igualdad y dependencia", "iris", [CE, LIGU, LVIO, LLGTBI, LDEP, LDIS],
    "El art. 14 es el suelo. Las leyes de igualdad, violencia, dependencia y discapacidad son los andamios. No las juntes en un único artículo inventado.",
    "El art. 14 prohíbe la discriminación y el art. 9.2 encarga a los poderes públicos remover los obstáculos y promover la igualdad real. La LO 3/2007 impone transversalidad, presencia equilibrada, planes de igualdad en las empresas que alcanzan los umbrales legales, y el informe de impacto de género en la elaboración normativa. La LO 1/2004 articula la protección integral contra la violencia de género: medidas judiciales, penales, laborales y de asistencia social, con la delegación del Gobierno y los juzgados especializados. La Ley 4/2023 desarrolla la igualdad real de las personas trans y la garantía de los derechos LGTBI. El RDLeg 1/2013 refunde los derechos de las personas con discapacidad, con los principios de accesibilidad, vida independiente y ajustes razonables. La Ley 39/2006 crea el Sistema para la Autonomía y Atención a la Dependencia, con grados de dependencia, un baremo y un catálogo de servicios y prestaciones económicas, financiado por el Estado, las comunidades y los usuarios según capacidad económica. La competencia es compartida: bases estatales y gestión autonómica.",
    ["Art. 9.2: igualdad real, no solo formal.", "LO 3/2007: transversalidad e impacto de género.", "LO 1/2004: protección integral, no solo penal.", "Dependencia: Ley 39/2006, grados, SAAD y catálogo.", "Discapacidad: accesibilidad universal y ajustes razonables."],
    "El impacto de género se hace al elaborar la norma, no después de publicarla."),

  t(3, 10, "Sanidad, acción exterior, telecomunicaciones y Agenda 2030.", "Sanidad, exterior y Agenda 2030", "sol", [CE, LSAN, LCOH, LEXT, LTEL],
    "Cierro el paseo con tres ministerios que el programa mete en el mismo tema: sanidad, exteriores y la red. Y, encima de todos, diecisiete objetivos.",
    "La protección de la salud es un principio rector (art. 43) y también una competencia repartida: el Estado fija las bases y la coordinación general (art. 149.1.16.ª) y las comunidades gestionan los servicios. La Ley 14/1986 universalizó la asistencia y creó el Sistema Nacional de Salud; la Ley 16/2003 ordena la cohesión, la cartera común, el Consejo Interterritorial y la financiación. La acción exterior, dirigida por el Gobierno, se organiza en la Ley 2/2014: servicio exterior, tratados, cooperación para el desarrollo y la Agencia Española de Cooperación Internacional. La política de cooperación se alinea con la Agenda 2030 y sus 17 Objetivos de Desarrollo Sostenible, adoptados por Naciones Unidas en 2015, que España incorpora a sus planes nacionales. El régimen de telecomunicaciones de la Ley 11/2022 garantiza el servicio universal, la gestión del espectro y la competencia, con la Comisión Nacional de los Mercados y la Competencia como regulador. La sociedad de la información se apoya en ese régimen y en la administración digital del tema anterior.",
    ["Art. 149.1.16.ª: bases y coordinación de la sanidad.", "SNS: Ley 14/1986 y cohesión de la Ley 16/2003.", "Acción exterior: Ley 2/2014 y AECID.", "Agenda 2030: 17 Objetivos de Desarrollo Sostenible.", "Telecomunicaciones: Ley 11/2022 y supervisión de la CNMC."],
    "Las comunidades gestionan la sanidad, pero no fijan solas las bases del sistema."),

  t(4, 1, "Las fuentes del derecho administrativo y la jerarquía normativa.", "Fuentes y jerarquía", "sello", [CE, LPAC],
    "Constitución, ley, reglamento. Y, en medio, principios generales que no se ven pero deciden empates. Si inviertes el orden, el acto nace muerto.",
    "El ordenamiento administrativo se inserta en la jerarquía del art. 9.3: legalidad, jerarquía normativa, publicidad, irretroactividad de las disposiciones sancionadoras no favorables, seguridad jurídica, responsabilidad e interdicción de la arbitrariedad. Las fuentes del derecho administrativo son la Constitución, la ley en sus distintas formas, los reglamentos, los tratados y el derecho de la Unión, los principios generales del Derecho y la costumbre solo en los términos del Código Civil, además de la jurisprudencia como complemento. La Administración no crea derecho con sus actos: el acto aplica el ordenamiento, la disposición general lo innova. Un reglamento no puede contradecir la ley ni regular materias reservadas a ella. La inderogabilidad singular de los reglamentos impide resolver un caso concreto contra lo que dice la norma general. El art. 103 somete la actuación administrativa a la ley y al Derecho, de modo que la circular interna no es fuente frente al ciudadano.",
    ["Art. 9.3: legalidad, jerarquía, publicidad, irretroactividad, seguridad, responsabilidad.", "El reglamento está por debajo de la ley.", "El acto administrativo no es una fuente del ordenamiento.", "Inderogabilidad singular de los reglamentos.", "Una instrucción interna no obliga al ciudadano."],
    "La jurisprudencia complementa el ordenamiento, pero no es una ley."),

  t(4, 2, "La ley. Reserva de ley. Decretos-leyes y decretos legislativos.", "Leyes y decretos-leyes", "sello", [CE],
    "Hay leyes que solo pueden ser orgánicas, y decretos-leyes que no pueden tocar lo que el art. 86 pone a salvo. Treinta días, Alba. Ni uno más para que el Congreso se pronuncie.",
    "La ley emana de las Cortes. La reserva de ley impide que ciertas materias —derechos, tributos del art. 31, o las que la Constitución señala— se regulen por reglamento. La reserva de ley orgánica (art. 81) cubre el desarrollo de los derechos fundamentales y las libertades públicas, los Estatutos, el régimen electoral general y las demás previstas en la Constitución, y exige mayoría absoluta del Congreso en votación final. El decreto legislativo (art. 82) es una delegación al Gobierno para dictar textos articulados o refundidos, con límites de materia, plazo y principios; no cabe en lo reservado a ley orgánica ni autoriza a modificar la propia delegación. El decreto-ley (art. 86) exige extraordinaria y urgente necesidad, no puede afectar al ordenamiento de las instituciones básicas, a los derechos del título I, al régimen de las comunidades ni al derecho electoral general, y debe convalidarse por el Congreso en treinta días. Las Cortes pueden tramitarlo como proyecto de ley por el procedimiento de urgencia.",
    ["Reserva de ley orgánica: art. 81 y mayoría absoluta del Congreso.", "Decreto legislativo: delegación con límites, art. 82.", "Decreto-ley: extraordinaria y urgente necesidad, art. 86.", "Convalidación por el Congreso en 30 días.", "El decreto-ley no puede afectar a los derechos del título I."],
    "La convalidación del decreto-ley es del Congreso, no del Senado."),

  t(4, 3, "El reglamento: concepto, clases y límites. Principios generales y tratados.", "Reglamentos", "sello", [CE, LGOB, LPAC],
    "El reglamento es ley en minúscula solo para quien no ha estudiado. Tiene fuerza normativa, sí, pero nace atado de pies y manos a la ley que lo habilita.",
    "El reglamento es una norma escrita de rango inferior a la ley, dictada por el Gobierno o por otros órganos con potestad reglamentaria. Se clasifica en reglamentos ejecutivos, independientes, de necesidad y organizativos, y también por su relación con la ley. Sus límites son la Constitución, la reserva de ley, la jerarquía, la competencia y el procedimiento de elaboración: consulta, informes, audiencia y memoria de impacto, según el título VI de la Ley 39/2015 y la Ley del Gobierno. El Gobierno ejerce la potestad reglamentaria por real decreto del Consejo de Ministros; los ministros, por orden, en su ámbito. Los principios generales del Derecho —buena fe, proporcionalidad, confianza legítima, equidad— informan y colman lagunas. Los tratados internacionales válidamente celebrados, una vez publicados en España, forman parte del ordenamiento interno (art. 96). Sus disposiciones solo pueden ser derogadas, modificadas o suspendidas en la forma prevista en los propios tratados o de acuerdo con las normas generales del Derecho internacional. El derecho de la Unión, cuando es directamente aplicable, se impone al reglamento interno incompatible.",
    ["El reglamento no puede invadir la reserva de ley.", "Potestad reglamentaria del Gobierno: real decreto acordado en Consejo de Ministros.", "Elaboración: principios del art. 129 y procedimiento del título VI LPAC.", "Art. 96: los tratados publicados forman parte del ordenamiento interno.", "Inderogabilidad singular: no se excepciona un reglamento para un caso."],
    "Una orden ministerial no puede contradecir un real decreto, ni este una ley."),

  t(4, 4, "El acto administrativo: concepto, clases, eficacia, validez, motivación y notificación.", "El acto administrativo", "sello", [LPAC],
    "El acto es la decisión que te nombra, te multa o te concede. Si no se motiva cuando debe, o no se notifica bien, el plazo para recurrir no empieza a correr en tu contra.",
    "El acto administrativo es una declaración de voluntad, de juicio, de conocimiento o de deseo dictada por una Administración en ejercicio de una potestad administrativa. Se distingue de la disposición general, que innova el ordenamiento, y de la vía de hecho. Puede ser expreso o presunto, favorable o de gravamen, definitivo o de trámite, resolutorio o no. Es eficaz desde que se dicta, salvo que disponga otra cosa, pero esa eficacia no se despliega frente al interesado hasta la notificación, y los actos desfavorables o restrictivos no pueden ejecutarse antes de notificarse. Deben motivarse, entre otros, los que limiten derechos, los que resuelvan recursos o pruebas, los de revisión de oficio, los discrecionales y los que se separen del criterio seguido o del dictamen de órganos consultivos (art. 35). La notificación contiene el texto íntegro, la indicación de si agota la vía administrativa, los recursos, el órgano y el plazo (art. 40). Debe practicarse en diez días desde que el acto se dictó. Si omite requisitos, surte efecto cuando el interesado realiza actuaciones que suponen conocer el contenido o interpone el recurso procedente.",
    ["Eficacia desde que se dicta, salvo disposición en contrario.", "Los actos de gravamen no se ejecutan antes de notificarse.", "Motivación obligatoria en los casos del art. 35 LPAC.", "Notificación en diez días, con pie de recursos.", "Una notificación incompleta no hace correr los plazos en contra del interesado."],
    "Notificar tarde no anula el acto, pero protege los plazos del ciudadano."),

  t(4, 5, "Contratos del sector público (I): preparación, adjudicación, efectos, extinción e invalidez.", "Contratos: régimen general", "nico", [LCSP],
    "Libertad de acceso, publicidad, transparencia, no discriminación e integridad. Y una garantía definitiva que, como regla, es el 5 % del precio de adjudicación.",
    "La Ley 9/2017 transpone las directivas de cuarta generación y se aplica a los contratos onerosos que celebren los poderes adjudicadores. El expediente de contratación, los pliegos de cláusulas administrativas y de prescripciones técnicas, y la aprobación del gasto son la fase de preparación. La adjudicación se rige por los procedimientos abierto, restringido, con negociación, diálogo competitivo, asociación para la innovación y, en su estrecho ámbito, el contrato menor. La mesa de contratación valora las ofertas. Los criterios deben estar ligados al objeto y pueden incluir calidad, plazo y coste del ciclo de vida, no solo el precio. La garantía definitiva es, con carácter general, el 5 % del precio final ofertado, excluido el IVA. Los efectos, el cumplimiento, la modificación —excepcional y prevista o justificada—, la cesión, la subcontratación y la extinción por cumplimiento o resolución se sujetan a la ley y al pliego. La invalidez distingue nulidad de pleno derecho, anulabilidad y la declaración de nulidad especial ligada al recurso especial. El recurso especial en materia de contratación procede frente a determinados actos de contratos que superan los umbrales legales, ante el Tribunal Administrativo Central de Recursos Contractuales u órgano equivalente.",
    ["Principios: acceso, publicidad, transparencia, igualdad e integridad.", "Garantía definitiva general: 5 % del precio de adjudicación, IVA excluido.", "La modificación del contrato es excepcional.", "Recurso especial ante el TACRC u órgano autonómico equivalente.", "Los criterios de adjudicación deben estar vinculados al objeto."],
    "El precio más bajo no es el único criterio posible ni siempre el obligatorio."),

  t(4, 6, "Contratos del sector público (II): tipos y características.", "Tipos de contratos", "nico", [LCSP],
    "Obras, servicios, suministro, concesión de obras y concesión de servicios. Si el riesgo de la explotación no pasa al contratista, eso no es una concesión: es un servicio disfrazado.",
    "La LCSP tipifica el contrato de obras, la concesión de obras, la concesión de servicios, el suministro y los servicios, además de los contratos mixtos, que se rigen por la prestación principal. La concesión exige que el riesgo operacional se transfiera al concesionario. El contrato menor, en la regla general del art. 118, exige un valor estimado inferior a 40.000 euros en obras y a 15.000 en suministros y servicios, duración no superior a un año, y no puede prorrogarse ni revisarse el precio; el expediente se simplifica, pero no desaparece el límite de fraccionamiento. Los contratos sujetos a regulación armonizada siguen umbrales europeos y reglas de publicidad en el DOUE. Los contratos administrativos, a diferencia de los privados, se rigen en su preparación y adjudicación por la ley y en sus efectos por el derecho administrativo, con privilegios de ejecución. El órgano de contratación no puede fraccionar el objeto para eludir el procedimiento. Las prohibiciones de contratar y la solvencia del licitador se comprueban antes de adjudicar.",
    ["Cinco tipos típicos, más el mixto.", "Concesión: transferencia del riesgo operacional.", "Contrato menor: umbrales del art. 118 y duración máxima de un año.", "Prohibido fraccionar para bajar de umbral.", "Contrato administrativo y contrato privado no comparten el mismo régimen de efectos."],
    "Comprueba en el BOE consolidado los umbrales del contrato menor: son de los preceptos que más se reforman."),

  t(4, 7, "Formas de la actividad administrativa. Servicio público, fomento y subvenciones.", "Actividad y subvenciones", "nico", [LPAC, LSUB, LRJSP],
    "Policía, fomento, servicio público. Y, dentro del fomento, la subvención: dinero público con nombre, apellido y reintegro si te lo gastas mal.",
    "La Administración interviene mediante limitación o policía, servicio público, fomento y actividad arbitral. El servicio público puede gestionarse de forma directa o indirecta, esta última por contrato. El fomento estimula actividades de interés general sin imponerlas; su instrumento principal es la subvención. La Ley 38/2003 exige publicidad, transparencia, concurrencia, objetividad, igualdad y no discriminación, eficacia y eficiencia. La concesión exige bases reguladoras —en la AGE, con carácter general, una orden ministerial—, convocatoria, procedimiento de concurrencia competitiva salvo excepciones tasadas, y una resolución. El beneficiario debe cumplir los requisitos del art. 13 y no estar incurso en prohibiciones. El silencio en los procedimientos de concesión es desestimatorio. La falta de justificación, el incumplimiento de la finalidad o la incompatibilidad provocan el reintegro, con intereses. Las entregas dinerarias sin contraprestación que no son subvención se identifican para no eludir la ley. La actividad de policía se expresa en autorizaciones, declaraciones responsables y comunicaciones.",
    ["Policía, servicio público, fomento y arbitraje.", "Subvención: Ley 38/2003 y concurrencia competitiva.", "Silencio desestimatorio en la concesión de subvenciones.", "Bases reguladoras y convocatoria no son el mismo documento.", "Incumplir la finalidad abre el reintegro."],
    "Una entrega de dinero público no escapa de la ley por llamarla ayuda en vez de subvención."),

  t(4, 8, "La expropiación forzosa: elementos, procedimiento y garantías.", "Expropiación", "petra", [CE, LEF],
    "Nadie puede ser privado de sus bienes sino por causa justificada de utilidad pública o interés social, con la indemnización correspondiente. Eso es el art. 33.3, y no admite atajos.",
    "La expropiación forzosa es una potestad ablatoria. Sus elementos son el sujeto expropiante —una Administración territorial—, el beneficiario, el expropiado, el objeto y la causa: utilidad pública o interés social declaradas por ley o por acuerdo en los casos previstos. El procedimiento ordinario comprende la declaración de la causa, la necesidad de ocupación, la determinación del justiprecio por mutuo acuerdo o por el Jurado Provincial de Expropiación, y el pago y la ocupación. El Jurado es un órgano administrativo independiente en su valoración. Si transcurren dos años sin que el justiprecio se pague o se consigne, procede la retasación. Existen procedimientos especiales de urgencia, en los que la ocupación precede al justiprecio mediante el depósito o la consignación previos, y de expropiación por zonas o grupos. Las garantías jurisdiccionales incluyen el recurso contencioso contra los acuerdos del Jurado y la responsabilidad por demora. La reversión permite recuperar el bien si no se ejecuta la obra o sobra terreno, en los plazos y condiciones de la ley.",
    ["Causa: utilidad pública o interés social, art. 33.3 CE.", "Justiprecio: acuerdo o Jurado Provincial de Expropiación.", "Retasación si pasan dos años sin pago ni consignación.", "Urgencia: ocupación previa, no ausencia de indemnización.", "Cabe reversión si la obra no se ejecuta o sobra terreno."],
    "El procedimiento de urgencia no elimina el justiprecio: lo aplaza."),

  t(4, 9, "Régimen patrimonial. Dominio público, bienes patrimoniales y Patrimonio Nacional.", "Patrimonio público", "petra", [CE, LPAP],
    "Lo demanial no se vende, no prescribe y no se embarga. Lo patrimonial sí puede enajenarse, pero no en un mercadillo: con procedimiento y precio.",
    "El art. 132 distingue los bienes de dominio público —los que determina la ley, y en todo caso la zona marítimo-terrestre, las playas, el mar territorial y los recursos naturales de la zona económica y la plataforma— inspirados en los principios de inalienabilidad, imprescriptibilidad e inembargabilidad. La Ley 33/2003 clasifica los bienes en demaniales y patrimoniales. Los demaniales se afectan a un uso general o a un servicio público; la desafectación los convierte en patrimoniales. La mutación demanial cambia el fin o el titular sin sacarlos del dominio público. Pueden usarse de forma común, especial o privativa; el uso privativo normalmente exige concesión. Los bienes patrimoniales son los que la Administración tiene en propiedad sin afectar, y pueden adquirirse, arrendar y enajenarse por concurso o adjudicación directa en casos tasados. El Patrimonio Nacional no es el conjunto de bienes patrimoniales del Estado: es una entidad pública que gestiona los bienes vinculados a la Jefatura del Estado, con ley propia. Los bienes comunales pertenecen a los municipios y su aprovechamiento corresponde al vecindario.",
    ["Demaniales: inalienables, imprescriptibles e inembargables.", "Afectación, desafectación y mutación demanial.", "Uso privativo del dominio público: normalmente concesión.", "Bienes patrimoniales: enajenables con procedimiento.", "Patrimonio Nacional no es sinónimo de bienes patrimoniales del Estado."],
    "Una mutación demanial no es una venta."),

  t(4, 10, "La responsabilidad patrimonial de las Administraciones públicas.", "Responsabilidad patrimonial", "sello", [CE, LRJSP, LPAC],
    "Daño efectivo, evaluable e individualizado, nexo causal y funcionamiento normal o anormal del servicio. La fuerza mayor exonera; el caso fortuito, no.",
    "El art. 106.2 de la Constitución reconoce el derecho a ser indemnizado por toda lesión que los particulares sufran en sus bienes y derechos como consecuencia del funcionamiento de los servicios públicos, salvo fuerza mayor. La Ley 40/2015, en su art. 32, objetiva esa responsabilidad: no exige dolo ni culpa, pero sí un daño antijurídico, que el particular no tenga el deber jurídico de soportar. No son indemnizables los daños derivados de hechos o circunstancias que no se hubiesen podido prever o evitar según el estado de los conocimientos. El procedimiento, hoy en la Ley 39/2015, se inicia de oficio o por reclamación del interesado. El plazo para reclamar es de un año desde el hecho o desde que se manifiesta el efecto lesivo (art. 67). El plazo para resolver es de seis meses y el silencio es desestimatorio. La indemnización se calcula con criterios de la legislación de expropiación y de seguro, y se actualiza. Si hay varios responsables, la regla es la responsabilidad solidaria o mancomunada según el caso, con repetición. La vía judicial es la contencioso-administrativa, una vez agotada o concluida la reclamación previa.",
    ["Responsabilidad objetiva: art. 106.2 CE y art. 32 LRJSP.", "Fuerza mayor sí exonera; caso fortuito, no.", "Reclamación: un año, art. 67 LPAC.", "Resolución en seis meses; silencio desestimatorio.", "El daño debe ser antijurídico: no hay indemnización si existe el deber de soportarlo."],
    "No hace falta demostrar culpa del funcionario para que la Administración responda."),

  t(4, 11, "Procedimiento administrativo común: fases, obligación de resolver y silencio.", "Procedimiento y silencio", "sello", [LPAC],
    "Este es el tema que más puntos mueve en el supuesto. Tres meses si nadie fijó plazo, seis como techo salvo ley o derecho europeo, y un silencio que cambia de signo según quién empezó.",
    "El procedimiento se ordena en iniciación, ordenación, instrucción y terminación. Se inicia de oficio o a solicitud del interesado. La instrucción comprende alegaciones, prueba, informes y trámite de audiencia. La Administración está obligada a resolver expresamente aunque haya operado el silencio (art. 21). El plazo máximo es el que fije la norma del procedimiento y no puede superar seis meses, salvo que una norma con rango de ley o el derecho de la Unión Europea establezca otro mayor. Si la norma no fija plazo, es de tres meses. En los procedimientos iniciados a solicitud, el silencio es positivo, salvo que una norma con rango de ley o una norma de la Unión o internacional establezca lo contrario, o cuando la estimación transfiera facultades sobre el dominio o el servicio público, permita actividades que dañen el medio ambiente, o se trate de impugnación y revisión de oficio a solicitud (art. 24). En los iniciados de oficio, si pueden nacer derechos, el silencio es negativo; si son sancionadores o de gravamen, se produce la caducidad (art. 25). Los días son hábiles, salvo que una ley o el derecho de la Unión dispongan otra cosa; sábados, domingos y festivos no computan (art. 30).",
    ["Obligación de resolver expresamente, también tras el silencio.", "Plazo supletorio: 3 meses. Techo: 6 meses, salvo ley o derecho de la UE.", "Silencio positivo como regla en procedimientos a solicitud.", "De oficio y de gravamen: caducidad, no silencio estimatorio.", "Cómputo por días: hábiles. El sábado es inhábil."],
    "El doble silencio: la alzada contra una desestimación presunta puede estimarse por silencio, salvo materias excluidas."),

  t(4, 12, "Derechos de los ciudadanos, garantías del procedimiento y revisión de los actos: revisión de oficio y recursos.", "Recursos administrativos", "sello", [LPAC],
    "Alzada, reposición y extraordinario de revisión. Tres puertas, tres plazos. Y una revisión de oficio que no es un recurso del ciudadano, aunque a veces lo parezca.",
    "Los interesados tienen derecho a conocer el estado del expediente, a formular alegaciones, a no presentar documentos que ya tenga la Administración, a cumplir los trámites en plazo y a ser oídos antes de la resolución desfavorable. La revisión de oficio de los actos nulos (art. 106) la inicia la propia Administración, con dictamen favorable del Consejo de Estado u órgano consultivo equivalente; si el dictamen no llega en el plazo o es desfavorable, el acto permanece. Los actos anulables pueden declararse lesivos y impugnarse ante la jurisdicción contenciosa. El recurso de alzada procede contra actos que no ponen fin a la vía administrativa, ante el superior jerárquico: un mes si el acto es expreso, y el órgano dispone de tres meses, con silencio desestimatorio (arts. 121 y 122). La reposición es potestativa, contra actos que agotan la vía, ante el mismo órgano, en un mes, y debe resolverse en un mes, con silencio negativo (arts. 123 y 124). El extraordinario de revisión cabe contra actos firmes por las causas del art. 125: el error de hecho se invoca en cuatro años desde la notificación; el resto, en tres meses desde el conocimiento de los documentos o desde la firmeza de la sentencia. Se resuelve en tres meses y el silencio es negativo.",
    ["Alzada: 1 mes, resuelve el superior en 3, silencio negativo.", "Reposición: potestativa, 1 mes para interponer y 1 para resolver.", "Extraordinario de revisión: actos firmes y causas tasadas.", "Error de hecho: 4 años. Las demás causas: 3 meses.", "Revisión de oficio de nulos: dictamen favorable del Consejo de Estado."],
    "Contra la resolución de una alzada no cabe otra alzada ni reposición, solo el extraordinario de revisión o la vía judicial."),

  t(4, 13, "La jurisdicción contencioso-administrativa y el recurso contencioso.", "Contencioso-administrativo", "julia", [LJCA, CE],
    "Dos meses si el acto es expreso. Seis si es presunto. Y el órgano no se elige por simpatía: lo marca la ley según quién dictó el acto.",
    "El art. 106.1 somete la actuación administrativa al control judicial. La Ley 29/1998 regula una jurisdicción de garantías, no un orden más de la Administración. Son impugnables las disposiciones generales y los actos expresos o presuntos que pongan fin a la vía administrativa, la inactividad y la vía de hecho. El plazo es de dos meses desde la notificación del acto expreso y de seis meses desde que se entiende producido el silencio (art. 46). Las partes necesitan capacidad, legitimación y, cuando la ley lo exige, representación de procurador y defensa de abogado. Los órganos son los juzgados de lo contencioso-administrativo, los juzgados centrales, las salas de los Tribunales Superiores de Justicia, la Audiencia Nacional y la Sala de lo Contencioso del Tribunal Supremo, según el autor del acto y la materia. El procedimiento ordinario y el abreviado —este, para materias de cuantía limitada y ciertas sanciones— culminan en sentencia que puede anular, reconocer una situación jurídica y adoptar medidas de plena jurisdicción. Las medidas cautelares evitan que el recurso pierda su fin. La ejecución corresponde al órgano que ha conocido del proceso.",
    ["Plazo: 2 meses el acto expreso y 6 el presunto.", "También se impugnan disposiciones generales, inactividad y vía de hecho.", "Órganos: juzgados, TSJ, Audiencia Nacional y Tribunal Supremo.", "Procedimiento abreviado para cuantías y materias tasadas.", "La sentencia puede ir más allá de la anulación: plena jurisdicción."],
    "El silencio no abre un plazo infinito: son seis meses, aunque la jurisprudencia matiza algunos cómputos."),

  t(5, 1, "El personal al servicio de las Administraciones públicas: clases y relación de servicio.", "Clases de personal", "carmen", [TREBEP],
    "Funcionario de carrera, interino, laboral y eventual. Cuatro clases. El eventual no hace carrera: asesora y se va cuando se va quien lo nombró.",
    "El TREBEP, aprobado por el Real Decreto Legislativo 5/2015, se aplica al personal funcionario y, en lo que corresponda, al laboral al servicio de las Administraciones. El art. 8 distingue funcionarios de carrera, funcionarios interinos, personal laboral y personal eventual. El funcionario de carrera se vincula por una relación estatutaria permanente tras superar el proceso selectivo. El interino cubre vacantes, sustituciones, programas temporales o exceso de tareas, con causas de cese tasadas. El personal laboral se rige por el Estatuto de los Trabajadores, el convenio y las normas específicas del TREBEP. El eventual realiza funciones de confianza o asesoramiento especial, y su cese es libre, en todo caso cuando cesa la autoridad que lo nombró; el puesto no es un modo de acceso a la función pública. Se adquiere la condición de funcionario de carrera al superar la selección, ser nombrado por el órgano competente y tomar posesión en el plazo (art. 62). Se pierde por renuncia, pérdida de la nacionalidad, jubilación, separación del servicio y pena de inhabilitación (art. 63).",
    ["Cuatro clases: carrera, interino, laboral y eventual.", "El eventual cesa cuando cesa la autoridad que lo nombró.", "Condición de funcionario: selección, nombramiento y toma de posesión.", "Pérdida: renuncia, nacionalidad, jubilación, separación e inhabilitación.", "El interino no es un funcionario de carrera en prácticas."],
    "La toma de posesión es un requisito, no un trámite simbólico."),

  t(5, 2, "Derechos, deberes y régimen disciplinario del personal público.", "Derechos, deberes y disciplina", "carmen", [TREBEP],
    "El código de conducta no es un cartel de pasillo. Y la separación del servicio solo cabe por falta muy grave.",
    "Los empleados públicos tienen derechos individuales —a la inamovilidad en la condición de funcionario, a la carrera, a la formación, a la intimidad y a la no discriminación— y derechos de ejercicio colectivo, como la negociación y, en los términos de la Constitución, la huelga (arts. 14 y 15). Los deberes y el código de conducta de los arts. 52 a 54 exigen objetividad, integridad, neutralidad, responsabilidad, austeridad y respeto a la igualdad. El régimen disciplinario clasifica las faltas en muy graves, graves y leves. La separación del servicio solo puede imponerse por falta muy grave. Las sanciones se gradúan y no pueden ser de plano: hace falta procedimiento, con presunción de inocencia y audiencia. La prescripción de las infracciones es de tres años las muy graves, dos las graves y seis meses las leves; la de las sanciones, de tres años, dos años y un año, respectivamente (art. 97). La responsabilidad disciplinaria es compatible con la penal y con la patrimonial cuando los hechos también encajan en esos regímenes, sin vulnerar el non bis in idem.",
    ["Derechos individuales y de ejercicio colectivo, arts. 14 y 15.", "Código de conducta: arts. 52 a 54.", "Separación del servicio: solo falta muy grave.", "Prescripción de faltas: 3 años, 2 años y 6 meses.", "Prescripción de sanciones: 3 años, 2 años y 1 año."],
    "Una falta leve no prescribe al año: prescribe a los seis meses."),

  t(5, 3, "Planificación de recursos humanos, oferta de empleo y selección.", "Oferta y selección", "carmen", [TREBEP],
    "Igualdad, mérito y capacidad. Publicidad y transparencia. Si el proceso no cabe en esos principios, no es una oposición: es otra cosa.",
    "Las Administraciones planifican sus recursos para atender las necesidades con eficiencia. La oferta de empleo público es el instrumento anual —o del periodo que se establezca— que aprueba las plazas que se convocarán, se publica en el diario oficial y no puede exceder los límites que fije la ley de presupuestos. Los procesos selectivos se rigen por los principios de igualdad, mérito y capacidad, y también por publicidad, transparencia, imparcialidad, independencia, profesionalidad, adecuación del contenido a las funciones y agilidad (art. 55). Los sistemas son la oposición, el concurso-oposición y, con carácter excepcional, el concurso (art. 61). Las bases de la convocatoria vinculan a la Administración, al tribunal y a las personas aspirantes. Los órganos de selección actúan con imparcialidad y sus miembros se abstienen o pueden ser recusados. La composición debe ser técnica y, en la medida de lo posible, paritaria. Superar el proceso no otorga todavía la condición de funcionario: faltan el nombramiento y la toma de posesión. Las personas con discapacidad participan en igualdad, con adaptaciones y con la reserva de plazas del tema correspondiente.",
    ["Principios del art. 55: igualdad, mérito, capacidad y publicidad.", "Sistemas: oposición, concurso-oposición y, excepcional, concurso.", "La OEP se publica en el diario oficial.", "Las bases de la convocatoria vinculan a todos.", "Aprobar no basta: hacen falta nombramiento y posesión."],
    "El concurso puro es excepcional, no el sistema ordinario de acceso."),

  t(5, 4, "Provisión de puestos, movilidad, promoción interna y carrera profesional.", "Carrera y provisión", "hugo", [TREBEP],
    "El concurso es la regla para proveer puestos. La libre designación es la excepción, y también se cesa con la misma libertad con la que se nombró.",
    "La carrera profesional es el conjunto ordenado de oportunidades de ascenso y de progreso profesional, horizontal y vertical (art. 16). La promoción interna permite pasar a otro cuerpo o escala del mismo o de otro subgrupo, con respeto a los principios de igualdad, mérito y capacidad, y puede reservar plazas en la oferta. La provisión ordinaria de puestos de funcionarios es el concurso; la libre designación se reserva a determinados puestos de especial responsabilidad o confianza que la relación de puestos de trabajo señale (arts. 79 y 80). En la libre designación se nombra y se cesa con discrecionalidad entre quienes cumplen los requisitos, pero la convocatoria y la motivación del nombramiento no desaparecen. La movilidad puede ser voluntaria, por razones de servicio o por violencia de género y de terrorismo, con garantías de puesto en otra localidad. La relación de puestos de trabajo es el instrumento que ordena los puestos, sus requisitos, el complemento y la forma de provisión. Un puesto no puede proveerse por un sistema distinto del que la relación publica.",
    ["Carrera horizontal y vertical.", "Provisión ordinaria: concurso.", "Libre designación: solo puestos previstos y cese discrecional.", "La RPT fija requisitos, retribución y forma de provisión.", "Promoción interna: reserva en la oferta y principios de acceso."],
    "La libre designación no permite nombrar a quien no cumple los requisitos del puesto."),

  t(5, 5, "Situaciones administrativas e incompatibilidades.", "Situaciones e incompatibilidades", "hugo", [TREBEP, LINCOM],
    "Servicio activo, servicios especiales, servicio en otras Administraciones, excedencia y suspensión. Cinco casillas. Y la incompatibilidad no se cura con no contarlo.",
    "El art. 85 enumera las situaciones de los funcionarios de carrera: servicio activo, servicios especiales, servicio en otras Administraciones públicas, excedencia y suspensión de funciones. La excedencia voluntaria por interés particular exige un periodo previo de servicios efectivos —cinco años en la regla general del precepto— y no puede concederse si hay expediente disciplinario; no se permanece en ella menos de dos años. Hay también excedencia por agrupación familiar, por cuidado de familiares, por violencia de género o terrorismo, y excedencia forzosa. En servicios especiales se conserva la carrera y se computa el tiempo a efectos de trienios y derechos pasivos en los casos previstos. La suspensión puede ser firme, como sanción, o provisional, mientras se tramita un procedimiento. La Ley 53/1984 impide, como regla, el desempeño de un segundo puesto en el sector público y somete las actividades privadas a autorización o declaración de incompatibilidad. Hay excepciones tasadas, entre ellas ciertas actividades docentes o de investigación, dentro de límites. El incumplimiento es falta y puede llevar a la remoción del segundo puesto.",
    ["Cinco situaciones del art. 85 TREBEP.", "Excedencia por interés particular: servicios previos y mínimo de permanencia.", "No cabe esa excedencia con expediente disciplinario abierto.", "Servicios especiales: se conserva la condición y, en lo previsto, el cómputo.", "Ley 53/1984: incompatibilidad de un segundo puesto público como regla."],
    "La excedencia por cuidado de familiar no se rige por los cinco años del interés particular."),

  t(5, 6, "Retribuciones de los funcionarios e indemnizaciones por razón del servicio.", "Retribuciones", "carmen", [TREBEP],
    "Básicas y complementarias. El sueldo mira al subgrupo; el específico mira al puesto. Si te pagan una productividad fija y universal, alguien está disfrazando un complemento.",
    "Las retribuciones básicas son el sueldo, asignado a cada subgrupo o grupo de clasificación, los trienios, que se devengan por cada tres años de servicio, y las pagas extraordinarias, dos al año como regla (art. 23). Las complementarias son el complemento de destino, según el nivel del puesto; el complemento específico, que retribuye las condiciones particulares del puesto; el complemento de productividad, para el rendimiento especial; y las gratificaciones por servicios extraordinarios fuera de la jornada (art. 24). La productividad no es consolidable ni puede convertirse en un aumento lineal encubierto. Las cuantías básicas se fijan en la ley de presupuestos. Nadie puede percibir retribuciones distintas de las previstas. Las indemnizaciones por razón del servicio —dietas, viajes, traslados— resarcen gastos, no retribuyen el trabajo, y se rigen por su propio decreto. La parte de las pagas extraordinarias incluye una mensualidad de retribuciones básicas y, en su caso, complementos que la norma señale. Los funcionarios en prácticas perciben las retribuciones que determine la normativa de cada proceso.",
    ["Básicas: sueldo, trienios y pagas extraordinarias.", "Complementarias: destino, específico, productividad y gratificaciones.", "Trienio: cada tres años de servicio.", "La productividad no se consolida.", "Las indemnizaciones por razón del servicio no son retribución."],
    "El complemento específico retribuye el puesto, no la antigüedad."),

  t(5, 7, "Personal laboral y el IV Convenio Único de la AGE.", "Personal laboral", "carmen", [TREBEP],
    "El laboral de la AGE no se clasifica en A1 y A2. Tiene sus propios grupos profesionales, y el convenio es su mapa.",
    "El personal laboral se vincula por contrato de trabajo y se rige por el Estatuto de los Trabajadores, el TREBEP en los preceptos que le son aplicables y el convenio colectivo. En la Administración General del Estado, el IV Convenio Único ordena el ámbito, la clasificación profesional, la jornada, las retribuciones y la movilidad de ese personal. La clasificación no reproduce los subgrupos funcionariales: se organiza en grupos profesionales según la titulación y el contenido del trabajo. El acceso también respeta igualdad, mérito, capacidad y publicidad. Pueden existir plazas fijas y contratación temporal, esta última solo por las causas de la legislación laboral, no para cubrir de forma permanente una necesidad estructural. La negociación de sus condiciones se articula en el convenio y en las mesas correspondientes, sin perjuicio de las materias que el TREBEP reserva a la ley. La jurisdicción competente para sus conflictos es, como regla, la social, no la contencioso-administrativa. El convenio no puede contradecir normas de derecho necesario ni los límites presupuestarios.",
    ["Régimen: Estatuto de los Trabajadores, TREBEP aplicable y convenio.", "IV Convenio Único: clasificación propia, no subgrupos A1/A2.", "El acceso laboral también exige mérito, capacidad y publicidad.", "La temporalidad no puede cubrir necesidades permanentes.", "Los pleitos del personal laboral van, como regla, al orden social."],
    "Un grupo profesional del convenio no equivale a un subgrupo del TREBEP."),

  t(5, 8, "Negociación colectiva, representación y derecho de huelga de los empleados públicos.", "Negociación y huelga", "hugo", [CE, TREBEP],
    "Pactos y acuerdos no son sinónimos. El acuerdo, si toca potestades de organización o exige norma jurídica, no obliga hasta que el Gobierno lo aprueba de forma expresa y formal.",
    "El art. 28 de la Constitución reconoce la libertad sindical y el derecho a la huelga, y el art. 37 la negociación colectiva. El TREBEP adapta esas instituciones al empleo público. La negociación se desarrolla en mesas generales y sectoriales, con legitimación tasada de las organizaciones sindicales según los resultados electorales. Los pactos versan sobre materias que no exigen una norma con rango de ley y obligan directamente. Los acuerdos, cuando afectan al ejercicio de potestades de organización o necesitan una disposición jurídica para ser eficaces, solo vinculan si el órgano de gobierno competente los aprueba expresa y formalmente (art. 38). Quedan fuera de la negociación el ejercicio de los derechos de los ciudadanos, la determinación de las condiciones de acceso y los criterios de organización que la ley reserva. La huelga se ejerce con respeto a la mantenimiento de los servicios esenciales de la comunidad, fijados por la autoridad con proporcionalidad. El personal eventual y determinadas funciones de autoridad tienen reglas específicas. La representación unitaria convive con las secciones sindicales.",
    ["Mesas de negociación con legitimación según resultados electorales.", "Pacto: obliga directamente en su ámbito.", "Acuerdo que exige norma: necesita aprobación expresa y formal.", "Hay materias excluidas de la negociación.", "La huelga de servicios esenciales se garantiza con servicios mínimos proporcionales."],
    "Un acuerdo no aprobado por el Gobierno no se convierte en ley por el hecho de firmarse."),

  t(5, 9, "MUFACE, clases pasivas y régimen especial de los funcionarios civiles del Estado.", "MUFACE y clases pasivas", "rios", [LMUFACE, TREBEP],
    "Dos historias que el programa junta y el examen separa: la asistencia sanitaria de MUFACE y las pensiones de clases pasivas. Desde 2011, quien entra nuevo no vive ya en el régimen viejo de pensiones.",
    "Los funcionarios civiles del Estado incluidos en el régimen especial se encuadran en la Mutualidad General de Funcionarios Civiles del Estado. MUFACE gestiona la acción protectora de ese colectivo y, rasgo de examen, permite elegir la prestación sanitaria entre las entidades públicas del sistema nacional de salud y las entidades privadas concertadas. Las clases pasivas, reguladas en su texto refundido, cubren jubilación, viudedad, orfandad y otras pensiones de quien permaneció en ese régimen. La reforma de 2011 integró en el Régimen General de la Seguridad Social, a efectos de pensiones, a los funcionarios de nuevo ingreso a partir del 1 de enero de 2011. Por eso conviven un colectivo histórico de clases pasivas y otro, posterior, de Seguridad Social. No deben confundirse la cotización mutualista, la cuota de clases pasivas y la cotización al Régimen General. La acción protectora mutualista incluye también prestaciones por incapacidad y ayudas, distintas de la pensión. El encuadramiento depende del cuerpo, de la fecha de ingreso y de la Administración de pertenencia: no todo empleado público está en MUFACE.",
    ["MUFACE: mutualidad de los funcionarios civiles del Estado incluidos en el régimen especial.", "Elección de sanidad: entidades públicas o concertadas.", "Clases pasivas: pensiones del colectivo que permaneció en ese régimen.", "Nuevo ingreso desde el 1 de enero de 2011: Régimen General para la pensión.", "No todo el empleo público estatal está en MUFACE."],
    "Elegir sanidad privada concertada no saca al mutualista del régimen."),

  t(5, 10, "Acceso al empleo público y provisión de puestos de las personas con discapacidad.", "Discapacidad y empleo público", "iris", [TREBEP, LDIS],
    "La reserva no es un favor: es un cupo legal. Y el ajuste razonable es la diferencia entre una convocatoria abierta y una convocatoria de verdad accesible.",
    "El art. 59 del TREBEP reserva un cupo no inferior al 7 % de las plazas de la oferta de empleo público para personas con discapacidad, definida conforme a la legislación de derechos de las personas con discapacidad, siempre que superen los procesos y acrediten la compatibilidad con las tareas. Dentro de esa política se reserva también un porcentaje específico para discapacidad intelectual. Las convocatorias deben prever adaptaciones de tiempo y medios en las pruebas, y ajustes razonables en el puesto, sin que eso rebaje el nivel de competencia exigido: el principio de mérito y capacidad se mantiene. La provisión de puestos y la promoción interna aplican la misma lógica de acceso en igualdad. El RDLeg 1/2013 y la Convención de la ONU informan estos preceptos. Incumplir la reserva o negar un ajuste razonable proporcionado puede ser discriminación. Las Administraciones deben progresar hasta alcanzar, al menos, el 2 % de los efectivos totales con discapacidad, objetivo histórico del precepto que convive con el cupo de la oferta.",
    ["Cupo no inferior al 7 % de las plazas ofertadas.", "Hay reserva específica vinculada a la discapacidad intelectual.", "Adaptaciones de tiempo y medios, y ajustes razonables.", "No se rebaja el principio de mérito y capacidad.", "Objetivo de presencia en los efectivos, además del cupo de cada oferta."],
    "La reserva no exonera de superar el proceso selectivo."),

  t(6, 1, "El presupuesto, la Ley General Presupuestaria y la estabilidad.", "Presupuesto y LGP", "aurelio", [CE, LGP, LOEPSF],
    "El presupuesto es una ley, pero no una ley cualquiera: autoriza gastos y prevé ingresos para un ejercicio. Sin crédito, no hay gasto. Ese es el primer mandamiento de esta fortaleza.",
    "El presupuesto es la expresión cifrada, conjunta y sistemática de las obligaciones que como máximo puede reconocer el Estado y de los derechos que prevé liquidar en el ejercicio. Los Presupuestos Generales del Estado incluyen los del Estado, los de la Seguridad Social, los de los organismos autónomos y los de otras entidades del sector público estatal según la Ley 47/2003. La iniciativa es exclusiva del Gobierno (art. 134 CE). Si no se aprueban antes del primer día del ejercicio, se prorrogan automáticamente los anteriores. La LGP ordena el régimen presupuestario, la gestión económica y la contabilidad pública, y se inspira en estabilidad, plurianualidad, transparencia y eficiencia, en conexión con la LO 2/2012. Los créditos son limitativos en el presupuesto del Estado: no pueden adquirirse compromisos por encima de su importe, salvo las excepciones legales. La estructura distingue clasificación orgánica, por programas y económica. El ciclo recorre elaboración, aprobación parlamentaria, ejecución, control y rendición de cuentas.",
    ["Iniciativa presupuestaria exclusiva del Gobierno, art. 134 CE.", "Prórroga automática si no hay ley el 1 de enero.", "Créditos limitativos en el presupuesto del Estado.", "Clasificación orgánica, por programas y económica.", "LGP y LOEPSF se leen juntas."],
    "La prórroga no es una nueva ley de presupuestos: arrastra la anterior."),

  t(6, 2, "Las leyes anuales de presupuestos y el presupuesto del Estado.", "Ley de presupuestos", "aurelio", [CE, LGP],
    "La ley de presupuestos no puede convertirse en una ley ómnibus para reformar lo que apetezca. El Tribunal Constitucional lleva años cerrándole esa puerta.",
    "La ley anual de presupuestos contiene la previsión de ingresos y la autorización de gastos, la relación de objetivos y programas, y las normas de gestión necesarias para ejecutarlos. Puede incluir las modificaciones tributarias que se articulen correctamente, pero no es vehículo idóneo para regular materias ajenas a la disciplina presupuestaria o sin relación con los créditos: esa es la doctrina del contenido eventual, frente al contenido mínimo y al esencial. El presupuesto del Estado se elabora por la dirección del ministerio competente, con escenarios plurianuales y techos de gasto. Las aplicaciones presupuestarias desglosan el crédito hasta el nivel que permite controlar el gasto: servicio, programa y concepto económico. Los créditos se especifican y, como regla, no pueden destinarse a una finalidad distinta sin una modificación legal. La enmienda parlamentaria que suponga aumento de crédito o disminución de ingresos exige la conformidad del Gobierno (art. 134.6). El debate y las enmiendas tienen un procedimiento especial en las Cortes.",
    ["Contenido esencial: previsión de ingresos y autorización de gastos.", "El contenido eventual no puede colonizar materias ajenas.", "Art. 134.6: enmiendas que aumentan gasto o bajan ingresos, con conformidad del Gobierno.", "La aplicación presupuestaria es el desglose que ata el crédito.", "Elaboración en escenarios plurianuales y techos de gasto."],
    "Una enmienda de aumento de crédito sin la conformidad del Gobierno no es válida."),

  t(6, 3, "Gastos plurianuales y modificaciones de crédito.", "Modificaciones de crédito", "aurelio", [LGP],
    "Transferencia, generación, ampliación, extraordinario, suplemento e incorporación. Seis llaves distintas. Usar la equivocada es el error más caro del bloque.",
    "Los gastos plurianuales permiten adquirir compromisos que se extiendan a ejercicios posteriores, con el límite general de cuatro anualidades y de unos porcentajes sobre el crédito inicial del año en que se compromete: 70 % en el ejercicio siguiente, 60 % en el segundo y 50 % en el tercero y en el cuarto (art. 47 LGP). El Consejo de Ministros puede ampliar esos límites en casos tasados. Las modificaciones responden a necesidades distintas. La transferencia mueve crédito entre aplicaciones, con prohibiciones —no puede alterar la naturaleza del crédito ni, como regla, financiar gastos de personal con otros capítulos en contra de la ley—. La generación nace de ingresos no previstos y afectados. La ampliación solo cabe en créditos declarados ampliables, cuando el gasto es obligatorio y el crédito no alcanza. El crédito extraordinario cubre un gasto nuevo para el que no existe crédito; el suplemento, un gasto que ya tiene crédito insuficiente. Ambos se aprueban por ley. La incorporación de remanentes es excepcional y solo procede en los supuestos de la ley, porque la anualidad es la regla.",
    ["Plurianuales: máximo cuatro ejercicios y porcentajes 70/60/50/50.", "Extraordinario: no hay crédito. Suplemento: el crédito no alcanza.", "Ampliación: solo créditos declarados ampliables.", "Generación: ingreso nuevo y afectado al gasto.", "Incorporar remanentes es la excepción, no la regla."],
    "Un suplemento de crédito no se aprueba por una simple transferencia interna."),

  t(6, 4, "Control del gasto público: IGAE y Tribunal de Cuentas.", "Control del gasto", "ines", [CE, LGP],
    "Tres modos de control interno y uno externo. La Intervención no es el Tribunal de Cuentas, y el Tribunal no es un órgano del Ministerio de Hacienda.",
    "El control interno lo ejerce la Intervención General de la Administración del Estado. Sus modalidades son la función interventora, el control financiero permanente y la auditoría pública. La función interventora fiscaliza, antes de que se dicte el acto, los actos de gasto que generan obligaciones y los pagos, y puede formular reparos suspensivos cuando aprecia una ilegalidad. El control financiero permanente acompaña la gestión de determinados organismos de forma continua. La auditoría pública examina, con posterioridad y con técnicas de auditoría, la regularidad y la eficacia. El control externo corresponde al Tribunal de Cuentas, órgano dependiente de las Cortes Generales (art. 136), con jurisdicción contable propia para el enjuiciamiento de la responsabilidad contable. Fiscaliza la cuenta general del Estado y la gestión económica del sector público, e informa a las Cortes. No sustituye a la IGAE ni está jerárquicamente bajo el Ministerio de Hacienda. Las comunidades tienen órganos de control externo propios, sin perjuicio de la competencia del Tribunal de Cuentas. El reparo de la Intervención no lo levanta el propio interventor actuante: lo resuelve la autoridad prevista en la ley.",
    ["IGAE: función interventora, control financiero permanente y auditoría pública.", "El reparo suspensivo frena el acto ilegal.", "Tribunal de Cuentas: art. 136, depende de las Cortes.", "Tiene función fiscalizadora y jurisdicción contable.", "El control externo no está jerárquicamente bajo Hacienda."],
    "La auditoría pública es control interno, no es el Tribunal de Cuentas."),

  t(6, 5, "Ejecución del presupuesto de gastos, documentos contables y tesorería.", "Ejecución del gasto", "oro", [LGP, LCSP, LSUB],
    "A, D, O y el pago. Cuatro estaciones. El documento ADO las junta cuando la ley deja, pero no las confunde.",
    "La ejecución del presupuesto de gastos sigue una secuencia: autorización del gasto (A), disposición o compromiso (D), reconocimiento de la obligación (O) y ordenación del pago, al que sigue el pago material por la Tesorería. Cada fase corresponde a un órgano y a un momento de la actuación administrativa: la autorización inicia el expediente, el compromiso vincula frente a un tercero, el reconocimiento declara la deuda líquida y exigible, y la ordenación libra el pago. Los documentos contables —A, D, AD, O, ADO, y los de pago— dejan constancia en el sistema de información contable. En la contratación y en las subvenciones, las fases se anudan a la aprobación del gasto, a la adjudicación o concesión y a la certificación o justificación. No puede reconocerse una obligación sin crédito suficiente y sin que se haya cumplido la prestación, salvo los anticipos legalmente previstos. La Tesorería del Estado centraliza los fondos, ordena la posición de tesorería y responde de los pagos. La gestión de tesorería no puede alterar el orden de los pagos vencidos y exigibles por preferencias ajenas a la ley.",
    ["Fases: autorización, disposición, reconocimiento de la obligación y ordenación del pago.", "Documento ADO: junta fases cuando procede, no las inventa.", "Sin crédito suficiente no hay compromiso.", "La Tesorería paga; no reconoce ella sola la obligación.", "Contratos y subvenciones se encadenan a las mismas fases."],
    "Reconocer la obligación antes de que exista el derecho del acreedor es un atajo ilegal."),

  t(6, 6, "Tipos de gasto, anticipos de caja fija y pagos a justificar.", "Anticipos y pagos a justificar", "oro", [LGP],
    "Dos figuras que parecen hermanas y no lo son. El anticipo de caja fija es una provisión de fondos para gastos repetidos. El pago a justificar es un libramiento concreto que todavía no tiene los papeles.",
    "Los créditos se agrupan económicamente en capítulos: gastos de personal, bienes y servicios, financieros, transferencias corrientes, inversiones reales, transferencias de capital y activos y pasivos financieros. Comprar material ordinario es un gasto corriente en bienes y servicios; una obra nueva es inversión; una subvención es transferencia, corriente o de capital según financie gasto corriente o inversión del beneficiario. Los anticipos de caja fija, regulados en la LGP, son provisiones de fondos de carácter permanente para atender gastos periódicos o repetitivos, con posterior aplicación al presupuesto y justificación. Los pagos a justificar se libran cuando no pueden aportarse los documentos justificativos antes de ordenar el pago, y quedan sujetos a un plazo de justificación; si no se justifica, se exige el reintegro. Ninguna de las dos figuras permite eludir la fiscalización ni el destino del crédito. La caja fija no es un presupuesto paralelo. El libramiento a justificar no convierte un gasto improcedente en procedente.",
    ["Capítulos: personal, corrientes, inversiones y transferencias.", "Transferencia corriente y de capital no se confunden.", "Anticipo de caja fija: provisión permanente para gastos repetidos.", "Pago a justificar: falta el justificante en el momento del pago.", "Ambos se justifican después y no escapan al control."],
    "La caja fija no sirve para un gasto singular que ya puede documentarse."),

  t(6, 7, "Ingresos públicos, sistema tributario, tasas y precios públicos.", "Ingresos, tasas y precios", "oro", [CE, LTASAS],
    "La tasa se impone; el precio público se pide. Las dos pueden pagarse por un servicio, pero solo una es un tributo con reserva de ley.",
    "Los ingresos públicos se clasifican en tributos, transferencias, ingresos patrimoniales y operaciones financieras. El art. 31 exige un sistema tributario justo, inspirado en igualdad y progresividad, y reserva a la ley el establecimiento de prestaciones personales o patrimoniales de carácter público. Los tributos son tasas, contribuciones especiales e impuestos. El impuesto grava una manifestación de capacidad económica sin contraprestación directa. La tasa, según la Ley 8/1989, es un tributo cuyo hecho imponible consiste en la utilización privativa o el aprovechamiento especial del dominio público, o en la prestación de servicios o la realización de actividades en régimen de derecho público que se refieran, afecten o beneficien de modo particular al obligado, cuando los servicios no sean de solicitud voluntaria o no los preste también el sector privado. El precio público retribuye servicios solicitados voluntariamente que también puede prestar el sector privado, y no tiene naturaleza tributaria. Las tasas respetan el principio de equivalencia: el rendimiento no debe superar el coste del servicio. Hacienda estatal, autonómica y local se delimitan en la Constitución, la LOFCA y la ley de haciendas locales.",
    ["Tributos: tasas, contribuciones especiales e impuestos.", "Reserva de ley del art. 31.3 para las prestaciones patrimoniales públicas.", "Tasa: servicio no voluntario o no prestado por el sector privado.", "Precio público: solicitud voluntaria y prestación también privada.", "El rendimiento de la tasa no debe exceder el coste del servicio."],
    "Llamar precio a una tasa no cambia su naturaleza ni salva la reserva de ley."),

  t(6, 8, "Nóminas de los funcionarios: estructura, altas, bajas y liquidación.", "Nóminas", "luz", [TREBEP, LGP],
    "La nómina no es un excel libre. Tiene devengo mensual, altas y bajas que se justifican, y unos descuentos que no se inventa quien la confecciona.",
    "Las retribuciones se devengan y se liquidan por mensualidades, con dos pagas extraordinarias como regla. La nómina recoge percepciones básicas y complementarias, y descuentos legales: retención a cuenta del IRPF, cotización o cuota que corresponda al régimen de protección social, y otras deducciones autorizadas. El alta en nómina exige el nombramiento, la toma de posesión y el documento que acredita el derecho; la baja, el cese, la suspensión o la pérdida de la condición, y debe justificarse para no seguir pagando un puesto vacante. Los atrasos y los reintegros de lo indebidamente percibido se regularizan en nómina, con los límites de prescripción y el procedimiento debido. Los ingresos en formalización registran operaciones que no suponen movimiento de fondos pero sí un apunte contable, como ciertas retenciones que se aplican internamente. La confección de la nómina es un acto de gestión de personal y, a la vez, una fase de ejecución del presupuesto de gastos de personal: necesita crédito en el capítulo correspondiente. Quien ordena el pago no puede alterar conceptos retributivos que solo la ley crea.",
    ["Devengo mensual y dos pagas extraordinarias.", "Alta: nombramiento y toma de posesión justificados.", "Baja: cese o suspensión, para no pagar de más.", "Descuentos legales: IRPF y protección social.", "La nómina ejecuta el capítulo de gastos de personal y exige crédito."],
    "Un ingreso en formalización no es un pago en metálico al funcionario."),
];

export const TOPIC_BY_ID = new Map(TOPICS.map((topic) => [topic.id, topic]));
export const NPC_BY_ID = new Map(NPCS.map((npc) => [npc.id, npc]));

export function topicsOfBlock(block: number) {
  return TOPICS.filter((topic) => topic.block === block);
}

export function worldOfBlock(block: number) {
  return WORLDS.find((world) => world.block === block)!;
}

export type NextLevelInfo = {
  nextId: string;
  nextLabel: string;
  isBoss: boolean;
  isNextBlock: boolean;
};

export function getNextLevel(currentLevelId: string): NextLevelInfo | null {
  const topicIndex = TOPICS.findIndex((t) => t.id === currentLevelId);
  if (topicIndex >= 0) {
    const currentTopic = TOPICS[topicIndex];
    const nextTopic = TOPICS[topicIndex + 1];
    if (nextTopic && nextTopic.block === currentTopic.block) {
      return {
        nextId: nextTopic.id,
        nextLabel: `${nextTopic.id}: ${nextTopic.short}`,
        isBoss: false,
        isNextBlock: false,
      };
    }
    const world = worldOfBlock(currentTopic.block);
    return {
      nextId: `${world.id}-boss`,
      nextLabel: `Jefe: ${world.bossName}`,
      isBoss: true,
      isNextBlock: false,
    };
  }

  if (currentLevelId.endsWith("-boss")) {
    const worldId = currentLevelId.replace("-boss", "");
    const worldIndex = WORLDS.findIndex((w) => w.id === worldId);
    if (worldIndex >= 0) {
      const nextWorld = WORLDS[worldIndex + 1];
      if (nextWorld && nextWorld.block) {
        const nextTopics = topicsOfBlock(nextWorld.block);
        if (nextTopics.length > 0) {
          return {
            nextId: nextTopics[0].id,
            nextLabel: `${nextWorld.name} · ${nextTopics[0].id}`,
            isBoss: false,
            isNextBlock: true,
          };
        }
      } else if (nextWorld && nextWorld.id === "final") {
        return {
          nextId: "exam-hall",
          nextLabel: "Examen Oficial A2 (Gran Salón)",
          isBoss: false,
          isNextBlock: true,
        };
      }
    }
  }

  if (currentLevelId === "exam-hall") {
    return {
      nextId: "exam",
      nextLabel: "Tribunal Calificador (Comenzar Examen)",
      isBoss: false,
      isNextBlock: true,
    };
  }

  return null;
}

export const WATCHED_LAWS: { id: string; title: string; topics: string[] }[] = [
  { id: "BOE-A-1978-31229", title: "Constitución Española", topics: ["I-1", "I-2", "I-3", "I-4", "I-5", "I-6", "I-7"] },
  { id: "BOE-A-2015-10565", title: "Ley 39/2015, LPAC", topics: ["IV-4", "IV-10", "IV-11", "IV-12", "III-1"] },
  { id: "BOE-A-2015-10566", title: "Ley 40/2015, LRJSP", topics: ["I-8", "I-9", "IV-10"] },
  { id: "BOE-A-2015-11719", title: "TREBEP", topics: ["V-1", "V-2", "V-3", "V-4", "V-5", "V-6", "V-10"] },
  { id: "BOE-A-2003-21614", title: "Ley General Presupuestaria", topics: ["VI-1", "VI-2", "VI-3", "VI-4", "VI-5", "VI-6"] },
  { id: "BOE-A-2017-12902", title: "Ley de contratos del sector público", topics: ["IV-5", "IV-6"] },
  { id: "BOE-A-2003-20977", title: "Ley general de subvenciones", topics: ["IV-7"] },
  { id: "BOE-A-2013-12887", title: "Ley de transparencia", topics: ["III-7"] },
  { id: "BOE-A-2018-16673", title: "LO 3/2018, protección de datos", topics: ["III-8"] },
  { id: "BOE-A-2007-6115", title: "LO 3/2007, de igualdad", topics: ["III-9"] },
  { id: "BOE-A-2012-5730", title: "LO de estabilidad presupuestaria", topics: ["III-2", "VI-1"] },
  { id: "BOE-A-1985-12666", title: "LO del Poder Judicial", topics: ["I-7"] },
  { id: "BOE-A-1985-5392", title: "Ley de bases del régimen local", topics: ["I-11"] },
  { id: "BOE-A-1998-16718", title: "Ley de la jurisdicción contencioso-administrativa", topics: ["IV-13"] },
  { id: "BOE-A-1997-25336", title: "Ley del Gobierno", topics: ["I-6"] },
  { id: "BOE-A-1979-23709", title: "LO del Tribunal Constitucional", topics: ["I-3"] },
  { id: "BOE-A-2000-544", title: "LO de extranjería", topics: ["III-6"] },
  { id: "BOE-A-2006-21990", title: "Ley de dependencia", topics: ["III-9"] },
  { id: "BOE-A-2003-20254", title: "Ley del patrimonio de las AAPP", topics: ["IV-9"] },
];
