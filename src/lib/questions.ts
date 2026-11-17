import type { Caso, Difficulty, Question } from "./types";
import { TOPICS } from "./content";

function q(id: string, topic: string, d: 1 | 2 | 3, prompt: string, options: string[], a: number, e: string): Question {
  return { id, topic, d, q: prompt, o: options, a, e };
}

export const QUESTIONS: Question[] = [
  q("I-1a", "I-1", 1, "¿Cuántos artículos tiene la Constitución Española de 1978?", ["169", "168", "170", "166"], 0, "Tiene 169 artículos, además de 4 disposiciones adicionales, 9 transitorias, 1 derogatoria y 1 final."),
  q("I-1b", "I-1", 2, "La reforma agravada del art. 168 afecta a:", ["El título preliminar, la sección 1.ª del capítulo II del título I y el título II", "Todo el título I y el título III", "Solo la Corona", "Cualquier derecho del capítulo III"], 0, "El art. 168 reserva el procedimiento agravado al título preliminar, a los derechos fundamentales de la sección 1.ª y a la Corona."),
  q("I-1c", "I-1", 3, "¿Quién puede iniciar una reforma constitucional?", ["Gobierno, Congreso, Senado y asambleas de las comunidades, no la iniciativa popular", "Cualquier ciudadano con 500.000 firmas", "Solo el Rey", "El Tribunal Constitucional"], 0, "El art. 166 remite a los arts. 87.1 y 87.2. La iniciativa popular queda fuera."),

  q("I-2a", "I-2", 1, "El recurso de amparo protege, entre otros, los derechos de:", ["Los artículos 14 a 29 y el 30.2", "Solo el capítulo III", "Todos los artículos de la Constitución", "Únicamente el art. 14"], 0, "Así lo dice el art. 53.2. El art. 14 tiene amparo aunque no esté en la sección 1.ª."),
  q("I-2b", "I-2", 2, "¿Qué estado puede suspender los derechos del art. 55.1?", ["Excepción y sitio, no el de alarma", "Solo el de alarma", "Los tres por igual", "Ninguno: solo cabe la suspensión individual"], 0, "El estado de alarma no suspende derechos fundamentales. La suspensión del art. 55.1 es para excepción y sitio."),
  q("I-2c", "I-2", 3, "El Defensor del Pueblo es designado:", ["Por mayoría de tres quintos de cada Cámara, para cinco años", "Por el Gobierno, para nueve años", "Por el Rey a su libre discreción", "Por mayoría simple del Congreso, para tres años"], 0, "Es alto comisionado de las Cortes. La LO 3/1981 fija tres quintos de Congreso y Senado y un mandato de cinco años."),

  q("I-3a", "I-3", 1, "¿Cuántos magistrados integran el Tribunal Constitucional?", ["12", "20", "8", "15"], 0, "Doce miembros nombrados por el Rey, con mandato de nueve años (art. 159)."),
  q("I-3b", "I-3", 2, "¿Cómo se reparten las propuestas de magistrados del TC?", ["4 Congreso, 4 Senado, 2 Gobierno y 2 CGPJ", "6 Congreso y 6 Senado", "12 a propuesta del Gobierno", "4 Gobierno, 4 CGPJ y 4 Cortes"], 0, "Congreso y Senado proponen por mayoría de tres quintos. El mandato se renueva por tercios cada tres años."),
  q("I-3c", "I-3", 3, "Las sentencias del Tribunal Constitucional que declaran la inconstitucionalidad:", ["Tienen valor de cosa juzgada, se publican en el BOE y vinculan a todos", "Solo obligan a las partes del proceso", "Pueden apelarse ante el Tribunal Supremo", "Necesitan convalidación del Congreso"], 0, "El art. 164 les da valor de cosa juzgada y eficacia erga omnes cuando no se limitan a estimar un derecho subjetivo."),

  q("I-4a", "I-4", 1, "La persona del Rey:", ["Es inviolable y no está sujeta a responsabilidad", "Responde políticamente ante el Congreso", "Puede ser censurada como el Gobierno", "Solo es inviolable en actos de la Casa Real"], 0, "Art. 56.3. La responsabilidad del acto refrendado recae en quien lo refrenda."),
  q("I-4b", "I-4", 2, "El nombramiento del Presidente del Gobierno se refrenda por:", ["El Presidente del Congreso", "El Presidente del Gobierno saliente", "El ministro de la Presidencia", "No necesita refrendo"], 0, "Es la regla especial de los arts. 64 y 99. El resto de actos del art. 62 se refrendan por el Presidente o los ministros."),
  q("I-4c", "I-4", 3, "En la sucesión a la Corona, en el mismo grado:", ["Se prefiere el varón a la mujer y, en el mismo sexo, la persona de más edad", "Se prefiere siempre a la persona de más edad, sin distinción de sexo", "Decide libremente el Rey", "Decide el Gobierno"], 0, "Art. 57.1: línea, grado, sexo y edad. Esa preferencia del varón sigue en el texto vigente."),

  q("I-5a", "I-5", 1, "Las Cortes Generales se componen de:", ["Congreso de los Diputados y Senado", "Congreso y Consejo de Estado", "Senado y Consejo General del Poder Judicial", "Solo el Congreso"], 0, "Art. 66. Representan al pueblo español y ejercen la potestad legislativa del Estado."),
  q("I-5b", "I-5", 2, "Una ley orgánica exige:", ["Mayoría absoluta del Congreso en una votación final sobre el conjunto", "Tres quintos de las dos Cámaras", "Mayoría simple del Senado", "Referéndum obligatorio"], 0, "Art. 81. La reserva cubre derechos fundamentales, Estatutos y régimen electoral general, entre otras materias."),
  q("I-5c", "I-5", 3, "La inmunidad parlamentaria implica que los diputados y senadores:", ["No pueden ser inculpados ni procesados sin autorización de la Cámara, salvo flagrante delito", "No responden nunca, ni siquiera por delitos comunes", "Solo son inviolables, que es lo mismo que inmunes", "Necesitan autorización del Gobierno para declarar"], 0, "Art. 71. La inviolabilidad cubre las opiniones en el ejercicio del cargo; la inmunidad es otra garantía, de carácter procesal."),

  q("I-6a", "I-6", 1, "La moción de censura española es:", ["Constructiva: debe incluir un candidato a la Presidencia", "Destructiva: basta con derrotar al Gobierno", "Una pregunta oral en el Senado", "Un recurso ante el Tribunal Constitucional"], 0, "Art. 113. La propone una décima parte de los diputados y exige mayoría absoluta."),
  q("I-6b", "I-6", 2, "La cuestión de confianza se entiende otorgada si vota a favor:", ["La mayoría simple del Congreso", "La mayoría absoluta del Congreso", "Tres quintos de cada Cámara", "El Senado"], 0, "Art. 112. No la confundas con la censura, que sí pide mayoría absoluta."),
  q("I-6c", "I-6", 3, "Si tras la primera votación de investidura pasan dos meses sin candidato, ¿qué ocurre?", ["El Rey disuelve las Cortes y convoca elecciones, con refrendo del Presidente del Congreso", "Gobierna en funciones el candidato más votado", "El Senado propone un candidato", "Se nombra un Gobierno de gestión por un año"], 0, "Art. 99.5. La primera votación exige mayoría absoluta; la segunda, 48 horas después, mayoría simple."),

  q("I-7a", "I-7", 1, "El principio de unidad jurisdiccional se enuncia en:", ["El art. 117.5 de la Constitución", "El art. 159", "El art. 54", "El art. 97"], 0, "La justicia emana del pueblo y se administra por jueces independientes sometidos al imperio de la ley. El CGPJ gobierna, no juzga."),
  q("I-7b", "I-7", 2, "El CGPJ está integrado por:", ["El presidente del Tribunal Supremo y 20 vocales, nombrados por cinco años", "12 magistrados del Tribunal Constitucional", "El Fiscal General y 8 vocales", "20 vocales elegidos por los jueces en exclusiva"], 0, "Doce vocales son jueces y ocho juristas con más de quince años de ejercicio. La propuesta corresponde a las Cortes por tres quintos."),
  q("I-7c", "I-7", 3, "El Fiscal General del Estado es nombrado:", ["Por el Rey, a propuesta del Gobierno, oído el CGPJ", "Por el CGPJ, sin intervención del Gobierno", "Por el Congreso, por mayoría absoluta", "Por el Tribunal Supremo"], 0, "Art. 124. El Ministerio Fiscal actúa con unidad de actuación y dependencia jerárquica, y con sujeción a la legalidad y a la imparcialidad."),

  q("I-8a", "I-8", 1, "Son órganos superiores de la AGE:", ["Los ministros y los secretarios de Estado", "Los subsecretarios y los directores generales", "Solo los ministros", "Los subdirectores generales"], 0, "Art. 55.3 LRJSP. Los directivos son subsecretarios, secretarios generales, SGT, directores generales y subdirectores."),
  q("I-8b", "I-8", 2, "Los delegados del Gobierno en las comunidades autónomas tienen:", ["Rango de subsecretario", "Rango de secretario de Estado", "Nivel de subdirector general", "Rango de ministro"], 0, "Art. 55.4. Los subdelegados del Gobierno tienen nivel de subdirector general. No inviertas los rangos."),
  q("I-8c", "I-8", 3, "Los ministerios se crean, modifican y suprimen:", ["Por real decreto del Presidente del Gobierno", "Por ley orgánica", "Por orden del ministro de Hacienda", "Por acuerdo del Consejo de Estado"], 0, "Los secretarios de Estado, en cambio, se nombran por real decreto del Consejo de Ministros a propuesta del Presidente."),

  q("I-9a", "I-9", 1, "La creación de un organismo público estatal exige:", ["Una ley y un estatuto", "Solo una orden ministerial", "Un contrato de gestión", "Un decreto-ley en todo caso"], 0, "La ley fija los fines y el tipo; el estatuto se aprueba por real decreto del Consejo de Ministros."),
  q("I-9b", "I-9", 2, "Las entidades públicas empresariales se rigen, en su actividad ordinaria:", ["Por el derecho privado, salvo cuando ejercen potestades públicas", "Siempre por el derecho administrativo", "Por el derecho laboral", "Por los tratados internacionales"], 0, "Los organismos autónomos, en cambio, se rigen por derecho administrativo. No los intercambies."),
  q("I-9c", "I-9", 3, "¿Cuál de estos entes forma parte del sector público institucional?", ["Los fondos sin personalidad jurídica", "Las diputaciones provinciales", "Las salas del Tribunal Supremo", "Los grupos parlamentarios"], 0, "Junto a organismos públicos, autoridades independientes, sociedades estatales, consorcios y fundaciones del sector público."),

  q("I-10a", "I-10", 1, "La competencia sobre el procedimiento administrativo común corresponde:", ["Al Estado, art. 149.1.18.ª", "En exclusiva a cada comunidad", "A los ayuntamientos", "Al Consejo de Europa"], 0, "El Estado fija las bases del régimen jurídico de las Administraciones, el procedimiento común y el sistema de responsabilidad."),
  q("I-10b", "I-10", 2, "El Estatuto de Autonomía es:", ["La norma institucional básica de la comunidad y forma parte del ordenamiento estatal", "Un reglamento del Gobierno autonómico", "Una ley ordinaria del Congreso sin especialidad", "Un tratado internacional"], 0, "Se aprueba y reforma por los cauces constitucionales. No es un reglamento ni un convenio privado."),
  q("I-10c", "I-10", 3, "El art. 149.3 dispone que:", ["El derecho estatal prevalece, en caso de conflicto, sobre el autonómico en lo que no sea competencia exclusiva de las comunidades, y es supletorio", "El derecho autonómico siempre prevalece", "No hay cláusulas de cierre", "El Senado dirime el conflicto"], 0, "Los conflictos de competencia se plantean ante el Tribunal Constitucional, no ante el Gobierno."),

  q("I-11a", "I-11", 1, "El gobierno del municipio corresponde:", ["Al ayuntamiento, integrado por el alcalde y los concejales", "Al delegado del Gobierno", "A la diputación en todo caso", "Al Tribunal Superior de Justicia"], 0, "Art. 140. Los concejales se eligen por sufragio universal; el alcalde, por los concejales o por los vecinos."),
  q("I-11b", "I-11", 2, "La provincia es:", ["Entidad local con personalidad propia y, a la vez, división territorial del Estado", "Solo una oficina de la comunidad autónoma", "Un órgano del ministerio del Interior", "Una mancomunidad voluntaria"], 0, "Art. 141. Su gobierno corresponde a la diputación u otra corporación representativa."),
  q("I-11c", "I-11", 3, "Las competencias locales propias deben ejercerse:", ["Bajo la propia responsabilidad, en asuntos de interés local no atribuidos a otra Administración", "Por delegación obligatoria del Estado en todos los casos", "Solo si las aprueba el Senado", "Como competencias exclusivas del art. 149"], 0, "La LBRL distingue competencias propias y competencias atribuidas por delegación. La tutela no puede vaciar la autonomía."),

  q("II-1a", "II-1", 1, "El Tratado de Lisboa entró en vigor el:", ["1 de diciembre de 2009", "1 de mayo de 2004", "1 de enero de 2002", "7 de febrero de 1992"], 0, "Modificó el TUE y convirtió el Tratado de la Comunidad Europea en el TFUE. La Unión sucedió a la Comunidad."),
  q("II-1b", "II-1", 2, "Una cooperación reforzada exige, como regla:", ["Al menos nueve Estados, como último recurso, y quedar abierta a los demás", "La unanimidad de todos los Estados", "Solo la decisión de la Comisión", "Un referéndum en cada Estado"], 0, "No puede afectar a competencias exclusivas ni perjudicar el mercado interior. La ciudadanía europea complementa, no sustituye, a la nacional."),
  q("II-1c", "II-1", 3, "La retirada de un Estado miembro se regula en:", ["El art. 50 del TUE", "El art. 267 del TFUE", "El art. 168 de la Constitución española", "El protocolo de Schengen"], 0, "Es el precepto aplicado en el Brexit. La ampliación, en cambio, exige unanimidad del Consejo y ratificación de todos los Estados."),

  q("II-2a", "II-2", 1, "El Consejo Europeo:", ["Define orientaciones políticas y no ejerce función legislativa", "Aprueba reglamentos junto al Parlamento", "Es el tribunal de la Unión", "Gestiona el presupuesto anual"], 0, "Art. 15 TUE. Lo forman los jefes de Estado o de Gobierno, su presidente y el presidente de la Comisión."),
  q("II-2b", "II-2", 2, "La mayoría cualificada del Consejo exige:", ["Al menos el 55 % de los Estados, un mínimo de 15, que representen el 65 % de la población", "Unanimidad siempre", "Mayoría simple de la población", "Dos tercios de los diputados europeos"], 0, "La minoría de bloqueo requiere al menos cuatro Estados. La unanimidad queda para los casos que los tratados reservan."),
  q("II-2c", "II-2", 3, "El monopolio general de la iniciativa legislativa corresponde:", ["A la Comisión", "Al Parlamento Europeo", "Al Consejo Europeo", "A cada parlamento nacional"], 0, "El presidente de la Comisión es propuesto por el Consejo Europeo, teniendo en cuenta las elecciones, y elegido por el Parlamento."),

  q("II-3a", "II-3", 1, "El Parlamento Europeo se elige para:", ["Cinco años, por sufragio universal directo", "Cuatro años, por los Gobiernos", "Nueve años, como el TC español", "Seis años, por el Consejo"], 0, "Ejerce con el Consejo la función legislativa y presupuestaria y controla a la Comisión."),
  q("II-3b", "II-3", 2, "La cuestión prejudicial se regula en:", ["El art. 267 TFUE", "El art. 50 TUE", "El art. 288 TFUE", "El art. 126 CE"], 0, "Garantiza la aplicación uniforme. El órgano que decide en última instancia debe plantearla cuando la duda es necesaria."),
  q("II-3c", "II-3", 3, "El Banco Central Europeo:", ["Es independiente y no puede financiar descubiertos a los Estados", "Depende del Consejo Europeo", "Aprueba los presupuestos nacionales", "Nombra a la Comisión"], 0, "Conduce la política monetaria de la zona del euro. El Tribunal de Cuentas fiscaliza las cuentas de la Unión, no ejecuta el presupuesto."),

  q("II-4a", "II-4", 1, "Un reglamento de la Unión es:", ["Obligatorio y directamente aplicable en todos los Estados", "Una recomendación", "Una norma que siempre debe transponerse", "Un dictamen del Parlamento"], 0, "Art. 288 TFUE. La directiva obliga al resultado y deja la forma y los medios a los Estados."),
  q("II-4b", "II-4", 2, "El efecto directo vertical de una directiva no transpuesta permite invocarla:", ["Frente al Estado, no como regla entre particulares", "Entre dos empresas privadas", "Solo ante el Consejo Europeo", "Nunca"], 0, "La primacía impide aplicar el derecho nacional incompatible. El Estado que no transpone puede responder frente a los particulares."),
  q("II-4c", "II-4", 3, "¿Cuál de estas fuentes no es vinculante?", ["Las recomendaciones y los dictámenes", "Los reglamentos", "Las decisiones dirigidas a un Estado", "Los tratados"], 0, "El derecho originario lo forman los tratados y la Carta, que tiene el mismo valor jurídico. El derivado vinculante es reglamento, directiva y decisión."),

  q("II-5a", "II-5", 1, "La autoridad presupuestaria de la Unión la forman:", ["El Parlamento Europeo y el Consejo", "Solo la Comisión", "El Banco Central Europeo", "El Tribunal de Cuentas"], 0, "La Comisión ejecuta el presupuesto. El Tribunal de Cuentas lo fiscaliza. El marco financiero plurianual dura al menos cinco años."),
  q("II-5b", "II-5", 2, "El Fondo Europeo de Desarrollo Regional es un instrumento de:", ["Cohesión económica, social y territorial", "Política monetaria", "Defensa común", "Nombramiento de comisarios"], 0, "Junto al FSE+ y al Fondo de Cohesión. La Unión se financia con recursos propios, no con un impuesto europeo aprobado solo por el Parlamento."),
  q("II-5c", "II-5", 3, "El marco financiero plurianual:", ["Fija techos de gasto por rúbricas durante al menos cinco años", "Sustituye al presupuesto anual", "Lo aprueba solo el BCE", "Dura un año"], 0, "El presupuesto anual sigue existiendo y lo adoptan Parlamento y Consejo dentro de esos techos."),

  q("II-6a", "II-6", 1, "Las cuatro libertades del mercado interior son:", ["Mercancías, personas, servicios y capitales", "Trabajo, vivienda, salud y educación", "Moneda, ejército, policía y aduanas", "Solo mercancías y capitales"], 0, "El mercado interior es un espacio sin fronteras interiores. No todos los Estados tienen el euro."),
  q("II-6b", "II-6", 2, "La política exterior y de seguridad común:", ["No se rige por el procedimiento legislativo ordinario", "La aprueba la Comisión por reglamento", "La juzga el BCE", "Es competencia exclusiva de los parlamentos nacionales"], 0, "Tiene un método propio, con un papel central del Consejo Europeo y del Consejo. La competencia se clasifica en exclusiva, compartida y de apoyo (arts. 3 a 6 TFUE)."),
  q("II-6c", "II-6", 3, "Las ayudas de Estado incompatibles con el mercado interior las controla principalmente:", ["La Comisión", "El Defensor del Pueblo europeo, con carácter vinculante", "Cada ayuntamiento", "El Tribunal de Cuentas español"], 0, "La política de competencia prohíbe colusión, abuso de posición dominante y, con matices, las ayudas de Estado. La política monetaria de la zona euro es exclusiva de la Unión."),

  q("III-1a", "III-1", 1, "Los principios de buena regulación del art. 129 LPAC son:", ["Necesidad, eficacia, proporcionalidad, seguridad jurídica, transparencia y eficiencia", "Estabilidad, déficit, deuda y regla de gasto", "Mérito, capacidad y publicidad", "Primacía, efecto directo y subsidiariedad"], 0, "No metas aquí la estabilidad presupuestaria: vive en la LOEPSF. La MAIN y la consulta pública completan el título VI."),
  q("III-1b", "III-1", 2, "Están obligados a relacionarse electrónicamente con las Administraciones:", ["Las personas jurídicas, los profesionales colegiados en su actividad y los empleados públicos", "Solo los ministerios", "Nadie: es siempre voluntario", "Únicamente los extranjeros"], 0, "Las personas físicas pueden elegir, salvo que una norma les imponga el medio electrónico. La tramitación electrónica es la forma habitual de la Administración."),
  q("III-1c", "III-1", 3, "El Esquema Nacional de Seguridad y el de Interoperabilidad sirven para:", ["Asegurar e interconectar los sistemas del sector público", "Fijar los tipos de los contratos menores", "Regular la moción de censura", "Nombrar subdelegados del Gobierno"], 0, "La sede electrónica, el registro, la carpeta ciudadana y Cl@ve son las piezas visibles de ese modelo."),

  q("III-2a", "III-2", 1, "La iniciativa de los Presupuestos Generales del Estado corresponde:", ["En exclusiva al Gobierno", "Al Senado", "A la AIReF", "A las comunidades autónomas de forma conjunta"], 0, "Art. 134 CE. El art. 31 exige un sistema tributario justo y un gasto eficiente."),
  q("III-2b", "III-2", 2, "La LO 2/2012 impone, entre otros instrumentos:", ["Estabilidad presupuestaria, regla de gasto, objetivo de déficit y límite de deuda", "Solo un tipo fijo de IVA", "La libre designación de interventores", "La reserva del 7 % de la oferta de empleo"], 0, "La AIReF vigila el cumplimiento con independencia. No confundas la regla de gasto con el objetivo de déficit."),
  q("III-2c", "III-2", 3, "La Ley 20/2013 de unidad de mercado implica que:", ["Una actividad legitimada en un lugar pueda ejercerse en el resto del territorio, sin borrar las competencias autonómicas", "Todas las competencias pasan al Estado", "Se suprimen las licencias municipales en bloque", "El derecho autonómico deja de aplicarse"], 0, "Evita barreras injustificadas. No convierte a España en un Estado unitario."),

  q("III-3a", "III-3", 1, "El art. 45 de la Constitución reconoce:", ["El derecho a un medio ambiente adecuado y el deber de conservarlo", "La libertad de empresa sin límites ambientales", "Solo una competencia municipal", "El derecho de asilo"], 0, "Es un principio rector del capítulo III. Los poderes públicos deben velar por el uso racional de los recursos."),
  q("III-3b", "III-3", 2, "La legislación básica sobre medio ambiente corresponde:", ["Al Estado, y las comunidades pueden dictar normas adicionales de protección", "En exclusiva a los ayuntamientos", "A la Comisión Europea, sin margen interno", "Al Consejo de Estado"], 0, "Art. 149.1.23.ª. Las comunidades no pueden rebajar la protección básica. La Red Natura 2000 se apoya en la Ley 42/2007."),
  q("III-3c", "III-3", 3, "El principio «quien contamina paga» significa que:", ["El responsable del daño ambiental soporta los costes de prevención y reparación", "La multa la paga siempre el Estado", "Solo se aplica a delitos dolosos", "Excluye la autorización ambiental"], 0, "Convive con precaución, prevención y corrección en la fuente. La Ley 7/2021 fija el marco estatal de cambio climático."),

  q("III-4a", "III-4", 1, "El art. 41 CE encarga a los poderes públicos:", ["Un régimen público de Seguridad Social para todos los ciudadanos", "Solo pensiones privadas", "La sanidad gestionada por mutuas obligatorias", "Un seguro exclusivo de funcionarios"], 0, "Garantiza asistencia y prestaciones suficientes ante situaciones de necesidad, con prestaciones complementarias libres."),
  q("III-4b", "III-4", 2, "Una prestación contributiva exige, como regla:", ["Afiliación, alta y cotización", "Solo residir en España", "Ser funcionario de carrera", "Un informe del Consejo de Estado"], 0, "La no contributiva atiende situaciones de necesidad. INSS, TGSS e ISM gestionan el sistema; el desempleo, el SEPE."),
  q("III-4c", "III-4", 3, "¿Cuál de estas afirmaciones es correcta?", ["La sanidad pública se financia hoy de forma decisiva con impuestos, no solo con cotizaciones", "Todas las pensiones son no contributivas", "Solo existe el régimen general", "El IMSERSO recauda las cotizaciones"], 0, "Siguen existiendo régimen general y regímenes especiales. No reduzcas la acción protectora a la pensión de jubilación."),

  q("III-5a", "III-5", 1, "La prestación por desempleo y las políticas activas:", ["No son lo mismo: una protege rentas y las otras orientan, forman e intermedian", "Son idénticas", "Las gestionan los juzgados de lo social", "Solo existen en el País Vasco"], 0, "La Ley 3/2023 ordena las políticas de empleo. El art. 40 CE orienta al pleno empleo."),
  q("III-5b", "III-5", 2, "Para cobrar la prestación contributiva hace falta:", ["Situación legal de desempleo y cotización previa, además del compromiso de actividad", "Solo estar sin trabajo, aunque se haya dimitido", "Tener más de 55 años", "Un contrato indefinido vigente"], 0, "La inscripción como demandante y el compromiso de actividad condicionan la protección. La legislación laboral es competencia estatal (art. 149.1.7.ª)."),
  q("III-5c", "III-5", 3, "Las comunidades autónomas, en empleo:", ["Ejecutan gran parte de las políticas activas, sin romper la caja única de la protección", "Legislan el despido con libertad total", "Pagan las pensiones de jubilación", "Nombran al SEPE"], 0, "El Estado conserva la legislación laboral y la unidad de la protección. El diálogo social no sustituye al servicio público de empleo."),

  q("III-6a", "III-6", 1, "El régimen general de extranjería está en:", ["La LO 4/2000", "La Ley 39/2015", "El TREBEP", "La LGP"], 0, "Regula entrada, estancia, residencia y trabajo. Los ciudadanos de la Unión se rigen por la libre circulación."),
  q("III-6b", "III-6", 2, "El asilo protege a quien:", ["Sufre persecución por motivos tasados o necesita protección subsidiaria frente a daños graves", "Quiere un visado de estudios", "Es turista de larga estancia", "Trabaja sin contrato"], 0, "Ley 12/2009. El principio de non-refoulement impide devolver a la persona al país donde corre ese riesgo."),
  q("III-6c", "III-6", 3, "La competencia sobre inmigración y extranjería es:", ["Estatal, art. 149.1.2.ª, sin perjuicio de la colaboración en acogida e integración", "Exclusiva de los ayuntamientos", "Del Parlamento Europeo, sin ley interna", "Del Defensor del Pueblo"], 0, "Asilo y extranjería no comparten el mismo procedimiento ni la misma finalidad."),

  q("III-7a", "III-7", 1, "El derecho de acceso a la información pública, en la Ley 19/2013:", ["No exige motivar la solicitud", "Solo lo tienen los periodistas", "Exige un interés legítimo cualificado siempre", "Es de pago"], 0, "La publicidad activa y el derecho de acceso son obligaciones distintas. El plazo de resolución es de un mes."),
  q("III-7b", "III-7", 2, "Si la Administración no resuelve una solicitud de acceso:", ["El silencio es negativo", "El silencio es positivo", "Se entiende estimada a los diez días", "Caduca el expediente"], 0, "No apliques el silencio positivo de la LPAC. Los límites del art. 14 deben ser proporcionados y justificados."),
  q("III-7c", "III-7", 3, "Frente a una resolución de acceso cabe reclamar ante:", ["El Consejo de Transparencia y Buen Gobierno", "El Tribunal de Cuentas", "MUFACE", "La mesa de contratación"], 0, "El título II de la ley tipifica además infracciones de buen gobierno de los altos cargos."),

  q("III-8a", "III-8", 1, "El reglamento europeo de protección de datos es:", ["El RGPD, Reglamento (UE) 2016/679", "Una directiva de 1995 aún vigente como única norma", "La Ley 19/2013", "El ENS"], 0, "En España lo completa la LO 3/2018. Los principios están en el art. 5: licitud, lealtad, transparencia, limitación, minimización, exactitud, plazo, integridad y responsabilidad proactiva."),
  q("III-8b", "III-8", 2, "En el sector público, la base habitual del tratamiento es:", ["Una obligación legal o una misión de interés público, no necesariamente el consentimiento", "Siempre el consentimiento expreso", "El interés comercial", "La decisión del encargado"], 0, "El responsable decide fines y medios. El encargado trata por cuenta de aquel. El DPD es obligatorio en las autoridades públicas."),
  q("III-8c", "III-8", 3, "Las multas más graves del RGPD pueden alcanzar:", ["20 millones de euros o el 4 % del volumen de negocio mundial anual", "6.000 euros como máximo", "Solo un apercibimiento", "El 1 % del presupuesto del ministerio"], 0, "La AEPD es la autoridad estatal independiente. Los derechos incluyen acceso, rectificación, supresión, oposición, limitación, portabilidad y no ser objeto de decisiones solo automatizadas."),

  q("III-9a", "III-9", 1, "La igualdad real, además de la formal del art. 14, se apoya en:", ["El art. 9.2 de la Constitución", "El art. 57", "El art. 134", "El art. 65"], 0, "Los poderes públicos deben remover los obstáculos. La LO 3/2007 impone la transversalidad de género."),
  q("III-9b", "III-9", 2, "El Sistema para la Autonomía y Atención a la Dependencia nace de:", ["La Ley 39/2006", "La LGP", "La LCSP", "La LO 1/2004"], 0, "Grados, baremo y catálogo de servicios. La financiación es compartida. La LO 1/2004 es la de violencia de género, no la de dependencia."),
  q("III-9c", "III-9", 3, "El informe de impacto de género debe emitirse:", ["Durante la elaboración de la norma", "Solo si hay un recurso contencioso", "Después de la publicación en el BOE, como mera estadística", "Únicamente en los presupuestos municipales"], 0, "Lo exige la legislación de igualdad. Los ajustes razonables y la accesibilidad universal vienen del régimen de discapacidad."),

  q("III-10a", "III-10", 1, "Las bases y la coordinación general de la sanidad corresponden:", ["Al Estado, art. 149.1.16.ª", "A cada hospital", "Al BCE", "A la AECID"], 0, "Las comunidades gestionan los servicios. Ley 14/1986 y Ley 16/2003 ordenan el SNS y su cohesión."),
  q("III-10b", "III-10", 2, "La Agenda 2030 se compone de:", ["17 Objetivos de Desarrollo Sostenible", "12 estrellas", "6 bloques del temario", "3 principios de buena regulación"], 0, "La acción exterior se ordena en la Ley 2/2014. La cooperación se alinea con esos objetivos."),
  q("III-10c", "III-10", 3, "El regulador de las comunicaciones electrónicas en España es:", ["La CNMC", "El Consejo de Estado", "MUFACE", "La IGAE"], 0, "La Ley 11/2022 garantiza el servicio universal, el espectro y la competencia. No es una ley de contratación."),

  q("IV-1a", "IV-1", 1, "En la jerarquía normativa, el reglamento:", ["Está por debajo de la ley", "Puede derogar una ley orgánica", "Equivale a un tratado", "Es una fuente superior a la Constitución"], 0, "Art. 9.3: legalidad, jerarquía, publicidad, irretroactividad de las sanciones no favorables, seguridad, responsabilidad e interdicción de la arbitrariedad."),
  q("IV-1b", "IV-1", 2, "La inderogabilidad singular de los reglamentos significa que:", ["No se puede resolver un caso concreto en contra del reglamento", "Cada ciudadano puede pedir una excepción verbal", "El reglamento se deroga por un acto administrativo", "Solo obliga a la Administración"], 0, "El acto aplica el ordenamiento; no lo innova. Una instrucción interna no es fuente frente al ciudadano."),
  q("IV-1c", "IV-1", 3, "¿Cuál de estas afirmaciones es correcta?", ["La Administración está sometida a la ley y al Derecho, art. 103", "La costumbre administrativa deroga la ley", "El informe de un servicio jurídico es una ley", "La circular obliga siempre al particular"], 0, "Los principios generales informan y colman lagunas, pero no invierten la jerarquía."),

  q("IV-2a", "IV-2", 1, "El decreto-ley debe ser convalidado por el Congreso en:", ["30 días", "15 días", "3 meses", "48 horas"], 0, "Art. 86. Exige extraordinaria y urgente necesidad y no puede afectar a los derechos del título I, a las instituciones básicas, al régimen autonómico ni al derecho electoral general."),
  q("IV-2b", "IV-2", 2, "Un decreto legislativo:", ["Es una delegación de las Cortes al Gobierno para textos articulados o refundidos", "Es lo mismo que un decreto-ley", "Lo dicta el Rey sin refrendo", "Sirve para reformar la Constitución"], 0, "Art. 82. No cabe delegar lo reservado a ley orgánica ni autorizar a modificar la propia ley de delegación."),
  q("IV-2c", "IV-2", 3, "La reserva de ley orgánica exige mayoría absoluta:", ["Del Congreso, en votación final sobre el conjunto", "Del Senado", "Del Consejo de Ministros", "De los electores en referéndum"], 0, "Art. 81. La convalidación del decreto-ley también es del Congreso, no de las dos Cámaras."),

  q("IV-3a", "IV-3", 1, "La potestad reglamentaria del Gobierno se ejerce, como regla, mediante:", ["Real decreto acordado en Consejo de Ministros", "Ley orgánica", "Sentencia del TS", "Orden de un director general"], 0, "Los ministros dictan órdenes en su ámbito. Ningún reglamento puede invadir la reserva de ley."),
  q("IV-3b", "IV-3", 2, "Un tratado internacional publicado oficialmente en España:", ["Forma parte del ordenamiento interno, art. 96 CE", "Solo obliga si lo reitera un reglamento", "No puede aplicarse en los tribunales", "Deroga la Constitución"], 0, "Solo puede dejar de aplicarse en la forma prevista en el propio tratado o en las normas generales del Derecho internacional."),
  q("IV-3c", "IV-3", 3, "En la elaboración de un reglamento ejecutivo deben respetarse:", ["Los principios de buena regulación y el procedimiento de consulta, informes y audiencia", "Solo la firma del ministro", "El trámite de la moción de censura", "La cuestión prejudicial"], 0, "Título VI LPAC y Ley del Gobierno. Un real decreto no puede contradecir la ley, ni una orden el real decreto."),

  q("IV-4a", "IV-4", 1, "Los actos que limitan derechos subjetivos o intereses legítimos:", ["Deben motivarse", "Nunca se notifican", "Son siempre nulos", "No admiten recurso"], 0, "Art. 35 LPAC. También se motivan los que resuelven recursos, los discrecionales y los que se separan de un dictamen."),
  q("IV-4b", "IV-4", 2, "La notificación debe cursarse en el plazo de:", ["Diez días desde que el acto se dictó", "24 horas", "Tres meses", "Un año"], 0, "Debe indicar si agota la vía administrativa, el recurso, el órgano y el plazo. Si falta un requisito, los plazos no corren en contra del interesado."),
  q("IV-4c", "IV-4", 3, "Un acto de gravamen:", ["No puede ejecutarse antes de ser notificado", "Es eficaz frente al ciudadano desde que se piensa", "No necesita pie de recursos", "Siempre agota la vía administrativa"], 0, "La eficacia interna nace cuando se dicta, salvo que disponga otra cosa, pero frente al interesado manda la notificación."),

  q("IV-5a", "IV-5", 1, "La garantía definitiva en los contratos del sector público es, como regla:", ["El 5 % del precio final ofertado, IVA excluido", "El 20 % del presupuesto de licitación", "Una fianza verbal", "El 1 % solo en obras"], 0, "Art. 107 LCSP. Los principios son libertad de acceso, publicidad, transparencia, no discriminación e integridad."),
  q("IV-5b", "IV-5", 2, "El recurso especial en materia de contratación se interpone, cuando procede, ante:", ["El Tribunal Administrativo Central de Recursos Contractuales u órgano autonómico equivalente", "El Defensor del Pueblo", "La mesa de contratación, como última instancia", "El BCE"], 0, "Cabe frente a determinados actos de contratos que superan los umbrales. La modificación contractual es excepcional."),
  q("IV-5c", "IV-5", 3, "Los criterios de adjudicación:", ["Deben estar vinculados al objeto del contrato", "Pueden ser cualquier preferencia política", "Solo pueden ser el precio más bajo", "Los fija el adjudicatario"], 0, "Pueden atender a calidad, plazo o ciclo de vida. El expediente y los pliegos son la fase de preparación; no se improvisa la adjudicación."),

  q("IV-6a", "IV-6", 1, "Son tipos contractuales típicos de la LCSP:", ["Obras, concesión de obras, concesión de servicios, suministro y servicios", "Solo obras y laborales", "Subvención, convenio y encomienda, como contratos", "Mutuo, compraventa y donación"], 0, "El contrato mixto se rige por la prestación principal. La concesión exige transferir el riesgo operacional."),
  q("IV-6b", "IV-6", 2, "El contrato menor, en la regla general del art. 118:", ["No dura más de un año y no puede prorrogarse", "Puede prorrogarse libremente cinco años", "No tiene límite de valor", "Se adjudica siempre por diálogo competitivo"], 0, "Los umbrales generales son 40.000 euros en obras y 15.000 en suministros y servicios. Contrástalos en el texto consolidado del BOE."),
  q("IV-6c", "IV-6", 3, "Fraccionar un contrato para eludir el procedimiento:", ["Está prohibido", "Es una buena práctica si hay prisa", "Solo lo veta el Senado", "Convierte el contrato en menor automáticamente"], 0, "Tampoco cabe adjudicar a quien está incurso en prohibición de contratar o no acredita la solvencia exigida."),

  q("IV-7a", "IV-7", 1, "La ley general de subvenciones es:", ["La Ley 38/2003", "La Ley 9/2017", "La Ley 47/2003", "La Ley 33/2003"], 0, "Principios: publicidad, transparencia, concurrencia, objetividad, igualdad, no discriminación, eficacia y eficiencia."),
  q("IV-7b", "IV-7", 2, "En un procedimiento de concesión de subvenciones, el silencio es:", ["Desestimatorio", "Siempre estimatorio", "Positivo a los diez días", "Inexistente: hay que esperar indefinidamente"], 0, "Art. 25.5 de la Ley 38/2003. Las bases reguladoras y la convocatoria no son el mismo documento."),
  q("IV-7c", "IV-7", 3, "Si el beneficiario no aplica la subvención a la finalidad prevista:", ["Procede el reintegro", "La ayuda se convierte en un premio", "Solo se le apercibe", "La concede de nuevo la mesa de contratación"], 0, "El reintegro incluye los intereses. Llamar «ayuda» a una subvención no elude la ley."),

  q("IV-8a", "IV-8", 1, "Nadie puede ser privado de sus bienes sino por causa de utilidad pública o interés social y mediante:", ["La correspondiente indemnización, art. 33.3 CE", "Una orden verbal del alcalde", "Un contrato menor", "Una tasa"], 0, "Esa es la causa expropiandi. El justiprecio lo fija el acuerdo o el Jurado Provincial de Expropiación."),
  q("IV-8b", "IV-8", 2, "Procede la retasación si:", ["Transcurren dos años sin pago ni consignación del justiprecio", "Pasa un mes desde la ocupación", "El expropiado recurre en alzada", "Cambia el Gobierno"], 0, "El procedimiento de urgencia permite ocupar antes, pero no elimina la indemnización."),
  q("IV-8c", "IV-8", 3, "La reversión permite:", ["Recuperar el bien si no se ejecuta la obra o sobra terreno, en los casos de la ley", "Subir el justiprecio cada año de forma automática", "Evitar la declaración de utilidad pública", "Convertir el bien en comunal"], 0, "El Jurado es un órgano administrativo de valoración. Sus acuerdos son impugnables en vía contenciosa."),

  q("IV-9a", "IV-9", 1, "Los bienes de dominio público son:", ["Inalienables, imprescriptibles e inembargables", "Vendibles en subasta ordinaria sin trámite", "Siempre patrimoniales", "Propiedad de quien los ocupa"], 0, "Art. 132 CE y Ley 33/2003. La afectación los destina a un uso general o a un servicio público."),
  q("IV-9b", "IV-9", 2, "La mutación demanial consiste en:", ["Cambiar el fin o el titular sin sacar el bien del dominio público", "Venderlo a un particular", "Embargarlo", "Declararlo comunal"], 0, "La desafectación, en cambio, lo convierte en patrimonial. El uso privativo suele exigir concesión."),
  q("IV-9c", "IV-9", 3, "El Patrimonio Nacional:", ["No es el conjunto de los bienes patrimoniales del Estado", "Es otro nombre de la LGP", "Lo gestiona cada ayuntamiento", "Se enajena por contrato menor"], 0, "Es la entidad que administra bienes vinculados a la Jefatura del Estado. Los bienes comunales pertenecen al municipio y se aprovechan por el vecindario."),

  q("IV-10a", "IV-10", 1, "La responsabilidad patrimonial de la Administración es:", ["Objetiva: no exige demostrar culpa del funcionario", "Solo por dolo", "Excluida si el servicio funcionó con normalidad", "Una multa al particular"], 0, "Art. 106.2 CE y art. 32 LRJSP. El daño ha de ser efectivo, evaluable, individualizado y antijurídico."),
  q("IV-10b", "IV-10", 2, "El plazo para reclamar es de:", ["Un año desde el hecho o desde que se manifiesta el daño", "Diez días", "Cuatro años siempre", "Seis meses desde el silencio"], 0, "Art. 67 LPAC. El procedimiento se resuelve en seis meses y el silencio es desestimatorio."),
  q("IV-10c", "IV-10", 3, "Exonera de responsabilidad:", ["La fuerza mayor, no el caso fortuito", "Cualquier imprevisto", "La falta de seguro del particular", "Que el daño sea grande"], 0, "Si el particular tiene el deber jurídico de soportar el daño, este no es antijurídico y no se indemniza."),

  q("IV-11a", "IV-11", 1, "Si la norma del procedimiento no fija plazo máximo, este es de:", ["Tres meses", "Un mes", "Diez días", "Un año"], 0, "Art. 21.3 LPAC. El techo general es de seis meses, salvo que una ley o el derecho de la Unión establezcan otro mayor."),
  q("IV-11b", "IV-11", 2, "En los procedimientos iniciados a solicitud del interesado, el silencio es, como regla:", ["Positivo", "Siempre negativo", "Caducidad", "Inexistencia del procedimiento"], 0, "Art. 24. Hay excepciones: norma con rango de ley o de la Unión, dominio público, servicio público, medio ambiente, impugnación y revisión de oficio."),
  q("IV-11c", "IV-11", 3, "En un procedimiento sancionador iniciado de oficio, el transcurso del plazo máximo sin resolver produce:", ["La caducidad", "La estimación de la sanción", "Un silencio positivo a favor de la Administración", "La nulidad automática de todo el expediente anterior"], 0, "Art. 25. Si el procedimiento de oficio pudiera producir efectos favorables, el silencio es desestimatorio. Los días del cómputo ordinario son hábiles y el sábado es inhábil."),

  q("IV-12a", "IV-12", 1, "El recurso de alzada se interpone, si el acto es expreso, en el plazo de:", ["Un mes", "Diez días", "Dos meses", "Cuatro años"], 0, "Arts. 121 y 122. Lo resuelve el superior en tres meses. El silencio es desestimatorio, con la excepción del doble silencio."),
  q("IV-12b", "IV-12", 2, "El recurso de reposición:", ["Es potestativo, se interpone ante el mismo órgano y este tiene un mes para resolver", "Es obligatorio antes de cualquier alzada", "Lo resuelve el Tribunal Supremo", "Cabe contra cualquier acto de trámite"], 0, "Arts. 123 y 124. Procede contra actos que ponen fin a la vía administrativa. El silencio es negativo."),
  q("IV-12c", "IV-12", 3, "El error de hecho del art. 125 puede invocarse en el extraordinario de revisión durante:", ["Cuatro años desde la notificación del acto firme", "Un mes", "Diez días", "Seis meses"], 0, "Las demás causas —documentos esenciales, documentos falsos o prevaricación declarada por sentencia— tienen tres meses. Hace falta dictamen del Consejo de Estado para anular de oficio un acto nulo."),

  q("IV-13a", "IV-13", 1, "El plazo del recurso contencioso contra un acto expreso es de:", ["Dos meses desde la notificación", "Diez días", "Un año", "Cinco años"], 0, "Si el acto es presunto, el plazo es de seis meses desde que se entiende producido el silencio (art. 46 LJCA)."),
  q("IV-13b", "IV-13", 2, "También pueden impugnarse en esta jurisdicción:", ["Las disposiciones generales, la inactividad y las vías de hecho", "Solo las multas de tráfico", "Las leyes orgánicas ante el juzgado de guardia", "Los tratados antes de firmarse"], 0, "Es una jurisdicción de garantías. Los órganos van del juzgado de lo contencioso al Tribunal Supremo, según el autor del acto y la materia."),
  q("IV-13c", "IV-13", 3, "La sentencia contenciosa puede:", ["Anular el acto y, además, reconocer una situación jurídica individualizada", "Solo aconsejar a la Administración", "Reformar la Constitución", "Sustituir al Consejo de Ministros en cualquier política"], 0, "Es la plena jurisdicción. Las medidas cautelares evitan que el recurso pierda su finalidad."),

  q("V-1a", "V-1", 1, "El personal eventual:", ["Realiza funciones de confianza o asesoramiento y cesa cuando cesa la autoridad que lo nombró", "Es funcionario de carrera", "Accede por oposición obligatoria", "No existe en la AGE"], 0, "Art. 8 TREBEP: carrera, interino, laboral y eventual. El eventual no es una vía de acceso a la función pública."),
  q("V-1b", "V-1", 2, "Se adquiere la condición de funcionario de carrera:", ["Superando la selección, siendo nombrado y tomando posesión", "Con la sola publicación de la nota", "Al presentar la instancia", "Al cobrar la primera nómina"], 0, "Art. 62. Se pierde por renuncia, pérdida de nacionalidad, jubilación, separación e inhabilitación (art. 63)."),
  q("V-1c", "V-1", 3, "El funcionario interino cubre:", ["Vacantes, sustituciones, programas temporales o exceso de tareas, con causas de cese tasadas", "Cualquier puesto de libre designación de forma permanente", "Solo alcaldías", "Plazas de magistrado del TC"], 0, "No es un funcionario en prácticas ni un laboral temporal. Su relación es funcionarial y temporal."),

  q("V-2a", "V-2", 1, "La separación del servicio solo puede imponerse por:", ["Falta muy grave", "Falta leve reincidente una vez", "Decisión verbal del superior", "Cualquier expediente"], 0, "El régimen disciplinario distingue faltas muy graves, graves y leves. Hace falta procedimiento y audiencia."),
  q("V-2b", "V-2", 2, "Las faltas leves prescriben:", ["A los seis meses", "Al año", "A los tres años", "No prescriben"], 0, "Muy graves, 3 años; graves, 2 años; leves, 6 meses. Las sanciones prescriben a los 3 años, 2 años y 1 año (art. 97)."),
  q("V-2c", "V-2", 3, "El código de conducta de los arts. 52 a 54 exige:", ["Objetividad, integridad, neutralidad y respeto a la igualdad", "Obediencia ciega aunque la orden sea ilegal", "Solo puntualidad", "Lealtad al partido del Gobierno"], 0, "Los derechos individuales y los de ejercicio colectivo están en los arts. 14 y 15. La huelga se reconoce en los términos constitucionales."),

  q("V-3a", "V-3", 1, "Los sistemas selectivos ordinarios son:", ["Oposición y concurso-oposición; el concurso es excepcional", "Solo la entrevista", "Libre designación", "Sorteo"], 0, "Art. 61. Los principios del art. 55 son igualdad, mérito, capacidad, publicidad y transparencia, entre otros."),
  q("V-3b", "V-3", 2, "Las bases de la convocatoria:", ["Vinculan a la Administración, al tribunal y a quienes opositan", "Son orientativas y se cambian el día del examen", "Las redacta el tribunal durante la prueba", "No se publican"], 0, "Los órganos de selección actúan con imparcialidad y sus miembros pueden abstenerse o ser recusados."),
  q("V-3c", "V-3", 3, "Superar el proceso selectivo:", ["No otorga por sí solo la condición de funcionario de carrera", "Equivale a la toma de posesión", "Impide el nombramiento", "Convierte a la persona en personal eventual"], 0, "Faltan el nombramiento del órgano competente y la toma de posesión en plazo. La OEP se publica en el diario oficial."),

  q("V-4a", "V-4", 1, "La forma ordinaria de provisión de puestos de funcionario es:", ["El concurso", "La libre designación", "La herencia del puesto", "El sorteo"], 0, "Art. 79. La libre designación se reserva a puestos que la relación de puestos señale expresamente."),
  q("V-4b", "V-4", 2, "En la libre designación:", ["Se puede cesar con discrecionalidad, pero no nombrar a quien no cumple los requisitos", "No hacen falta requisitos", "El cese exige una falta muy grave", "El puesto se consolida de por vida"], 0, "La convocatoria y la motivación no desaparecen. La carrera puede ser horizontal o vertical."),
  q("V-4c", "V-4", 3, "La relación de puestos de trabajo determina:", ["Requisitos, retribución complementaria y forma de provisión", "Solo el nombre del ocupante", "La ley de presupuestos", "El temario de la oposición"], 0, "No se puede proveer un puesto por un sistema distinto del publicado. La promoción interna reserva plazas y mantiene mérito y capacidad."),

  q("V-5a", "V-5", 1, "Son situaciones administrativas del art. 85:", ["Servicio activo, servicios especiales, servicio en otras Administraciones, excedencia y suspensión", "Solo activo y jubilación", "Interinidad y eventualidad", "Alta y baja en nómina"], 0, "La excedencia tiene varias modalidades. No las reduzcas al interés particular."),
  q("V-5b", "V-5", 2, "La excedencia por interés particular, como regla:", ["Exige servicios efectivos previos y no se concede si hay expediente disciplinario", "Es un derecho automático desde el primer día", "Solo la pide el personal laboral", "Dura como máximo un mes"], 0, "El precepto exige cinco años previos y una permanencia mínima de dos. La de cuidado de familiar no se rige por esos cinco años."),
  q("V-5c", "V-5", 3, "La Ley 53/1984 implica que:", ["Como regla no se pueden desempeñar dos puestos públicos, y la actividad privada puede exigir autorización", "Todo funcionario puede tener otro empleo público pleno", "Las incompatibilidades se derogaron con el TREBEP", "Solo afecta a los ministros"], 0, "Hay excepciones tasadas, como cierta docencia. No declarar una segunda actividad no la hace compatible."),

  q("V-6a", "V-6", 1, "Son retribuciones básicas:", ["Sueldo, trienios y pagas extraordinarias", "Productividad y gratificaciones", "Solo las dietas", "El complemento específico"], 0, "Art. 23. El trienio se devenga cada tres años. Hay dos pagas extraordinarias como regla."),
  q("V-6b", "V-6", 2, "El complemento específico retribuye:", ["Las condiciones particulares del puesto", "La antigüedad", "El parentesco", "Las dietas de viaje"], 0, "El de destino atiende al nivel del puesto. La productividad no es consolidable. Las gratificaciones pagan servicios extraordinarios."),
  q("V-6c", "V-6", 3, "Las indemnizaciones por razón del servicio:", ["Resarcen gastos; no son retribución del trabajo", "Sustituyen al sueldo", "Se consolidan como trienio", "Las fija el compañero de mesa"], 0, "Nadie puede percibir conceptos retributivos distintos de los previstos en la norma. Las cuantías básicas se fijan en la ley de presupuestos."),

  q("V-7a", "V-7", 1, "El personal laboral de la AGE se clasifica:", ["En grupos profesionales del convenio, no en subgrupos A1 o A2", "Igual que los funcionarios de carrera", "Solo como eventual", "Por sorteo"], 0, "El IV Convenio Único es su instrumento. El acceso también exige igualdad, mérito, capacidad y publicidad."),
  q("V-7b", "V-7", 2, "Los conflictos jurídicos del personal laboral se ventilan, como regla, ante:", ["El orden social", "El orden contencioso-administrativo siempre", "El Tribunal de Cuentas", "El Consejo de Estado"], 0, "Su régimen es el Estatuto de los Trabajadores, el convenio y los preceptos aplicables del TREBEP."),
  q("V-7c", "V-7", 3, "La contratación temporal en la AGE:", ["No puede usarse para cubrir de forma permanente una necesidad estructural", "Es la forma ordinaria de acceso", "No tiene causas legales", "Sustituye a la oferta de empleo"], 0, "El convenio no puede contradecir el derecho necesario ni los límites presupuestarios."),

  q("V-8a", "V-8", 1, "Un pacto sindical en el empleo público:", ["Obliga directamente en las materias que no exigen una norma con rango de ley", "Es siempre una ley", "No existe", "Lo aprueba el Rey"], 0, "El acuerdo que afecta a potestades de organización o necesita norma solo vincula si el órgano de gobierno lo aprueba expresa y formalmente (art. 38)."),
  q("V-8b", "V-8", 2, "La huelga de los empleados públicos:", ["Se reconoce, con mantenimiento de los servicios esenciales", "Está prohibida por completo", "Solo la pueden hacer los eventuales", "La autoriza el CGPJ caso por caso"], 0, "Art. 28.2 CE. Los servicios mínimos deben ser proporcionales. Hay materias excluidas de la negociación."),
  q("V-8c", "V-8", 3, "La legitimación para estar en las mesas de negociación depende:", ["De la representación sindical medida en las elecciones", "Del sorteo anual", "De la libre designación del ministro", "Del número de trienios"], 0, "Hay mesas generales y sectoriales. Un acuerdo firmado y no aprobado no se convierte en ley."),

  q("V-9a", "V-9", 1, "MUFACE permite a sus mutualistas:", ["Elegir la sanidad pública o una entidad privada concertada", "Cobrar dos sueldos", "No cotizar nunca", "Ser jueces sin oposición"], 0, "Es la mutualidad de los funcionarios civiles del Estado incluidos en el régimen especial. No todo el empleo público está en MUFACE."),
  q("V-9b", "V-9", 2, "Quien ingresó como funcionario después del 1 de enero de 2011:", ["Quedó integrado, a efectos de pensión, en el Régimen General de la Seguridad Social", "Entró obligatoriamente en clases pasivas", "No tiene protección social", "Cobra la pensión de MUFACE aunque no esté incluido"], 0, "El colectivo histórico de clases pasivas se mantiene. Son dos regímenes que conviven según la fecha de ingreso."),
  q("V-9c", "V-9", 3, "Elegir una entidad sanitaria concertada:", ["No saca al mutualista de MUFACE", "Lo convierte en personal laboral", "Extingue las clases pasivas de quien aún las tenía", "Es una excedencia"], 0, "La cuota mutualista, la cuota de clases pasivas y la cotización al Régimen General no son el mismo concepto."),

  q("V-10a", "V-10", 1, "La reserva de plazas para personas con discapacidad en la oferta de empleo es:", ["No inferior al 7 %", "Del 1 % como máximo", "Voluntaria para cada tribunal", "Solo para el personal eventual"], 0, "Art. 59 TREBEP. Hay además una reserva específica ligada a la discapacidad intelectual."),
  q("V-10b", "V-10", 2, "Las adaptaciones de tiempo y medios:", ["No rebajan el nivel de competencia exigido por mérito y capacidad", "Suponen un examen distinto y más fácil en contenido", "Están prohibidas", "Solo se aplican después del nombramiento"], 0, "El ajuste razonable en el puesto forma parte de la igualdad. Negarlo, cuando es proporcionado, puede ser discriminación."),
  q("V-10c", "V-10", 3, "La reserva de la oferta:", ["No exonera de superar el proceso selectivo ni de acreditar la compatibilidad con las tareas", "Garantiza el aprobado", "Sustituye a la toma de posesión", "Solo vale para la promoción interna"], 0, "El objetivo histórico de alcanzar al menos el 2 % de los efectivos convive con el cupo de cada convocatoria."),

  q("VI-1a", "VI-1", 1, "Si la ley de presupuestos no se aprueba antes del 1 de enero:", ["Se prorrogan automáticamente los presupuestos del ejercicio anterior", "El Estado no puede gastar nada", "Decide el alcalde de Madrid", "Se disuelven las Cortes de forma obligatoria"], 0, "Art. 134 CE. La iniciativa es exclusiva del Gobierno. Los créditos del Estado son limitativos."),
  q("VI-1b", "VI-1", 2, "Los Presupuestos Generales del Estado integran:", ["Los del Estado, la Seguridad Social, los organismos y otras entidades del sector público estatal según la LGP", "Solo los sueldos de los ministerios", "Los presupuestos municipales de toda España", "El marco financiero de la Unión"], 0, "Se clasifican orgánica, por programas y económicamente. La LGP se lee junto a la LOEPSF."),
  q("VI-1c", "VI-1", 3, "Un crédito limitativo significa que:", ["No pueden adquirirse compromisos por encima de su importe, salvo excepción legal", "Es solo una previsión orientativa", "Puede superarse si lo pide el interventor", "No se contabiliza"], 0, "Sin crédito no hay gasto. Esa es la regla de oro de la ejecución."),

  q("VI-2a", "VI-2", 1, "Una enmienda parlamentaria que aumente los créditos exige:", ["La conformidad del Gobierno, art. 134.6", "Solo la firma de diez diputados", "Un informe de MUFACE", "Nada especial"], 0, "Lo mismo ocurre si disminuye los ingresos. El presupuesto no es una ley ordinaria más."),
  q("VI-2b", "VI-2", 2, "El contenido eventual de la ley de presupuestos:", ["No puede regular materias ajenas a la disciplina presupuestaria", "Permite reformar cualquier ley", "Sustituye a la Constitución", "Lo fija el Tribunal de Cuentas"], 0, "El Tribunal Constitucional distingue contenido mínimo, esencial y eventual. La aplicación presupuestaria ata el crédito a una finalidad."),
  q("VI-2c", "VI-2", 3, "La elaboración del presupuesto del Estado se apoya en:", ["Escenarios plurianuales y techos de gasto", "La libre iniciativa de cada director general, sin techo", "Un referéndum", "El contrato menor"], 0, "Después vienen la aprobación parlamentaria, la ejecución, el control y la rendición de cuentas."),

  q("VI-3a", "VI-3", 1, "Un crédito extraordinario sirve para:", ["Un gasto nuevo para el que no existe crédito, y se aprueba por ley", "Mover dinero entre dos aplicaciones del mismo servicio", "Pagar una nómina ordinaria", "Justificar una caja fija"], 0, "El suplemento, en cambio, aumenta un crédito que ya existe pero no alcanza. También se aprueba por ley."),
  q("VI-3b", "VI-3", 2, "Los gastos plurianuales, como regla, no pueden extenderse a más de:", ["Cuatro ejercicios, con porcentajes del 70, 60 y 50 %", "Diez ejercicios sin límite", "Un solo mes", "El mandato del Gobierno"], 0, "Art. 47 LGP. Los porcentajes se aplican sobre el crédito inicial del año del compromiso. El Consejo de Ministros puede ampliar los límites en casos tasados."),
  q("VI-3c", "VI-3", 3, "Una ampliación de crédito solo procede si:", ["El crédito fue declarado ampliable y el gasto es obligatorio", "Lo pide cualquier unidad por correo", "Se trata de un ingreso", "Hay remanente de tesorería, siempre"], 0, "La generación exige un ingreso nuevo afectado. La incorporación de remanentes es excepcional porque la anualidad es la regla. La transferencia no puede cambiar la naturaleza del gasto saltándose las prohibiciones."),

  q("VI-4a", "VI-4", 1, "La función interventora, el control financiero permanente y la auditoría pública corresponden a:", ["La IGAE", "El Tribunal Constitucional", "El CGPJ", "La Comisión Europea"], 0, "Son las tres modalidades del control interno. El reparo suspensivo puede frenar un acto ilegal."),
  q("VI-4b", "VI-4", 2, "El Tribunal de Cuentas:", ["Depende de las Cortes Generales y tiene jurisdicción contable", "Es una dirección general de Hacienda", "Sustituye a la Intervención delegada", "Aprueba los créditos extraordinarios"], 0, "Art. 136 CE. Fiscaliza la cuenta general y enjuicia la responsabilidad contable. No está bajo el ministerio."),
  q("VI-4c", "VI-4", 3, "La auditoría pública de la IGAE es:", ["Control interno, posterior, con técnicas de auditoría", "Lo mismo que el recurso contencioso", "Una sentencia penal", "El presupuesto prorrogado"], 0, "No la confundas con el control externo del Tribunal de Cuentas. El reparo no lo levanta por su cuenta el interventor actuante."),

  q("VI-5a", "VI-5", 1, "La secuencia ordinaria de la ejecución del gasto es:", ["Autorización, disposición, reconocimiento de la obligación y ordenación del pago", "Pago, obligación y, si acaso, crédito", "Solo tesorería", "Enmienda, silencio y alzada"], 0, "Se documenta con A, D, O y los documentos combinados, como el ADO. La Tesorería paga; no reconoce ella sola la obligación."),
  q("VI-5b", "VI-5", 2, "No puede reconocerse una obligación si:", ["No hay crédito suficiente o no se ha cumplido la prestación, salvo anticipos legales", "El acreedor lo pide por teléfono", "Es un capítulo de personal", "Hay interventor"], 0, "En los contratos, la adjudicación se anuda al compromiso y la certificación al reconocimiento. El mismo esquema vale para las subvenciones."),
  q("VI-5c", "VI-5", 3, "La Tesorería del Estado:", ["Centraliza los fondos y no puede alterar el orden legal de los pagos vencidos", "Crea créditos extraordinarios", "Nombra a los interventores", "Fiscaliza los tratados"], 0, "La ordenación del pago y el pago material son fases distintas del reconocimiento de la obligación."),

  q("VI-6a", "VI-6", 1, "Un anticipo de caja fija es:", ["Una provisión permanente para gastos periódicos o repetitivos", "Un crédito extraordinario", "Una subvención nominativa", "Un trienio"], 0, "Después se aplica al presupuesto y se justifica. No es un presupuesto paralelo."),
  q("VI-6b", "VI-6", 2, "Un pago a justificar procede cuando:", ["No pueden aportarse los justificantes antes de ordenar el pago, y luego hay que rendirlos", "Se quiere evitar para siempre la justificación", "El gasto es una inversión plurianual", "Lo pide el Senado"], 0, "Si no se justifica, se exige el reintegro. No convierte un gasto improcedente en procedente."),
  q("VI-6c", "VI-6", 3, "Una subvención para financiar una obra del beneficiario es:", ["Una transferencia de capital", "Un gasto de personal", "Una tasa", "Un anticipo de caja fija"], 0, "La transferencia corriente financia gasto corriente. Los capítulos económicos no se mezclan para eludir el control."),

  q("VI-7a", "VI-7", 1, "Son tributos:", ["Tasas, contribuciones especiales e impuestos", "Precios públicos y multas", "Solo los impuestos", "Las dietas"], 0, "Art. 31: el sistema tributario se inspira en igualdad y progresividad, y las prestaciones patrimoniales públicas se establecen por ley."),
  q("VI-7b", "VI-7", 2, "Hay tasa, y no precio público, cuando el servicio:", ["No es de solicitud voluntaria o no lo presta el sector privado", "Lo ofrece también cualquier empresa y se pide libremente", "Es gratuito", "Lo paga la Unión Europea"], 0, "Ley 8/1989. El precio público no tiene naturaleza tributaria. El rendimiento de la tasa no debe superar el coste."),
  q("VI-7c", "VI-7", 3, "Llamar precio a una tasa:", ["No cambia su naturaleza ni evita la reserva de ley", "La convierte en ingreso patrimonial", "Elimina el hecho imponible", "La saca del presupuesto"], 0, "Hacienda estatal, autonómica y local se delimitan en la Constitución, la LOFCA y la ley de haciendas locales."),

  q("VI-8a", "VI-8", 1, "Las retribuciones de los funcionarios se devengan:", ["Por mensualidades, con dos pagas extraordinarias como regla", "Una vez al año", "Solo si hay productividad", "En especies"], 0, "La nómina ejecuta el capítulo de gastos de personal y necesita crédito."),
  q("VI-8b", "VI-8", 2, "Para dar de alta en nómina hace falta:", ["Nombramiento, toma de posesión y justificación del derecho", "Solo el DNI", "Un contrato menor", "La conformidad del compañero"], 0, "La baja por cese o suspensión debe justificarse para no seguir pagando un puesto vacante."),
  q("VI-8c", "VI-8", 3, "Un ingreso en formalización es:", ["Un apunte contable sin movimiento material de fondos", "Un pago en metálico al funcionario", "Una tasa", "Un crédito ampliable"], 0, "Los descuentos de IRPF y de protección social son legales. Quien ordena el pago no puede inventar conceptos retributivos."),

  q("X-1", "I-1", 2, "¿En qué fecha se celebró el referéndum de la Constitución?", ["El 6 de diciembre de 1978", "El 31 de octubre de 1978", "El 29 de diciembre de 1978", "El 6 de diciembre de 1977"], 0, "Las Cortes la aprobaron el 31 de octubre, el Rey la sancionó el 27 de diciembre y el BOE la publicó el 29."),
  q("X-2", "I-6", 3, "El Consejo de Estado es:", ["El supremo órgano consultivo del Gobierno", "Un órgano jurisdiccional", "La mesa del Congreso", "El interventor general"], 0, "Art. 107 CE y LO 3/1980. Su dictamen es preceptivo en la revisión de oficio de actos nulos."),
  q("X-3", "IV-11", 3, "El doble silencio positivo puede aparecer cuando:", ["Se interpone alzada contra la desestimación por silencio de una solicitud y el superior tampoco resuelve, salvo materias excluidas", "Cualquier sanción se estima", "Un decreto-ley no se convalida", "Caduca un contrato menor"], 0, "Es la excepción del art. 24.1, párrafo segundo. No la extiendas a dominio público, medio ambiente o revisión de oficio."),
  q("X-4", "I-5", 2, "El decreto-ley no puede afectar:", ["A los derechos, deberes y libertades del título I", "A la gestión ordinaria de un ministerio", "Al nombramiento de un director general", "A una transferencia de crédito"], 0, "Tampoco al régimen de las comunidades, al derecho electoral general ni al ordenamiento de las instituciones básicas del Estado."),
  q("X-5", "VI-3", 2, "La generación de crédito se produce cuando:", ["Hay un ingreso no previsto y afectado a un gasto", "Se quiere crear un gasto sin ingreso ni ley", "Se prorroga el presupuesto", "Se nombra un interino"], 0, "No la uses para disfrazar un crédito extraordinario. Cada modificación tiene su llave."),
  q("X-6", "V-5", 1, "La suspensión de funciones puede ser:", ["Firme, como sanción, o provisional, durante un procedimiento", "Solo una excedencia voluntaria", "Un trienio", "Una paga extra"], 0, "Es una de las cinco situaciones del art. 85. No la confundas con los servicios especiales."),
];

export const CASOS: Caso[] = [
  {
    id: "caso-silencio",
    title: "El silencio y la subvención",
    story:
      "Nora pide una subvención a un ministerio. La convocatoria no fija plazo distinto del general. Pasan más de tres meses y nadie resuelve. El órgano que debería resolver no pone fin a la vía administrativa. Meses después, una resolución expresa deniega la ayuda y Nora quiere impugnarla. En paralelo, un vecino ha recibido una sanción en un procedimiento iniciado de oficio cuyo plazo máximo también venció sin resolución.",
    questions: [
      q("C1-1", "IV-11", 3, "¿Cuál era el plazo máximo para resolver la solicitud de Nora si la norma no fijaba otro?", ["Tres meses", "Diez días", "Un año", "Seis meses improrrogables en todo caso"], 0, "Art. 21.3 LPAC: si la norma reguladora no fija plazo, son tres meses."),
      q("C1-2", "IV-7", 3, "El silencio en la concesión de la subvención es:", ["Desestimatorio", "Estimatorio", "Una caducidad", "Un crédito extraordinario"], 0, "La Ley 38/2003 dispone el silencio negativo. Encaja además con las excepciones del art. 24 LPAC cuando se transfieren fondos públicos."),
      q("C1-3", "IV-12", 3, "Contra la denegación expresa, si el órgano no pone fin a la vía administrativa, Nora debe interponer:", ["Recurso de alzada en el plazo de un mes", "Recurso de reposición obligatorio", "Extraordinario de revisión al día siguiente", "Un contrato menor"], 0, "La alzada es el recurso ordinario frente a actos que no agotan la vía. El superior tiene tres meses."),
      q("C1-4", "IV-13", 2, "Si la alzada se resuelve de forma expresa y desestimatoria, el contencioso cabe en:", ["Dos meses desde la notificación", "Seis años", "Diez días hábiles siempre", "Cuatro años"], 0, "Art. 46 LJCA. El plazo de seis meses es el del acto presunto, no el del expreso."),
      q("C1-5", "IV-11", 3, "En la sanción iniciada de oficio cuyo plazo venció sin resolverse, lo procedente es:", ["Declarar la caducidad", "Entender estimada la sanción por silencio", "Convertirla en subvención", "Esperar cuatro años y revisar de oficio sin más"], 0, "Art. 25 LPAC: en los procedimientos de gravamen iniciados de oficio, el vencimiento del plazo produce caducidad."),
    ],
  },
  {
    id: "caso-personal",
    title: "El expediente de Hugo",
    story:
      "Hugo es funcionario de carrera del subgrupo A1, con seis años de servicios efectivos y sin expediente disciplinario. Quiere una excedencia por interés particular. Su compañera Luz ocupa un puesto que la relación de puestos califica de libre designación y cumple los requisitos. Un tercero cobra, además del sueldo y los trienios, un complemento que le pagan igual todos los meses «por productividad del negociado».",
    questions: [
      q("C2-1", "V-5", 2, "Hugo, con seis años de servicio y sin expediente, ¿puede pedir la excedencia por interés particular?", ["Sí, porque supera el periodo previo de servicios efectivos y no hay expediente", "No, porque solo pueden pedirla los interinos", "No, porque hacen falta veinte años", "Sí, y puede volver al día siguiente sin límite"], 0, "La regla general exige cinco años de servicios efectivos previos y niega la excedencia si hay expediente disciplinario. La permanencia mínima es de dos años."),
      q("C2-2", "V-4", 3, "El nombramiento de Luz por libre designación:", ["Es posible si el puesto está así clasificado y cumple los requisitos; el cese también es discrecional", "Es nulo porque la provisión ordinaria es siempre la herencia del puesto", "Exige una falta muy grave previa", "La convierte en personal eventual"], 0, "La libre designación no dispensa de los requisitos de la relación de puestos. El concurso sigue siendo el sistema ordinario."),
      q("C2-3", "V-6", 2, "El complemento igual para todo el negociado, llamado productividad:", ["Desnaturaliza la productividad, que debe retribuir un rendimiento especial y no se consolida", "Es un trienio", "Es una indemnización por razón del servicio", "Es el sueldo del subgrupo"], 0, "Básicas: sueldo, trienios y pagas. Complementarias: destino, específico, productividad y gratificaciones."),
      q("C2-4", "V-2", 3, "Si Hugo, ya en activo, cometiera una falta leve, esta prescribiría:", ["A los seis meses", "A los tres años", "Al año", "No prescribiría"], 0, "Art. 97 TREBEP. La sanción por falta leve prescribe al año, que no es lo mismo que la prescripción de la infracción."),
      q("C2-5", "V-1", 2, "Para que una persona aprobada adquiera la condición de funcionario de carrera faltan:", ["El nombramiento y la toma de posesión", "Solo publicar el BOE de la convocatoria", "Un contrato laboral", "La conformidad del sindicato"], 0, "Art. 62. Superar el proceso no basta."),
    ],
  },
  {
    id: "caso-hacienda",
    title: "La caja de Aurelio",
    story:
      "Una subdirección necesita financiar un gasto que no tiene crédito en el presupuesto. Otra unidad tiene crédito, pero se le ha quedado corto para un gasto ya previsto. Hay además gastos de limpieza mensuales y un libramiento urgente cuyos justificantes llegarán la semana que viene. La interventora delegada anuncia un reparo. Al finalizar el ejercicio, el Tribunal de Cuentas pedirá cuentas.",
    questions: [
      q("C3-1", "VI-3", 3, "El gasto completamente nuevo, sin crédito, exige:", ["Un crédito extraordinario aprobado por ley", "Una transferencia decidida por el auxiliar de gestión", "Un precio público", "Una excedencia"], 0, "Si el crédito existe pero es insuficiente, el instrumento es el suplemento de crédito, también por ley."),
      q("C3-2", "VI-3", 2, "El crédito que existe y no alcanza se completa mediante:", ["Un suplemento de crédito", "Una generación automática", "Un trienio", "Un silencio positivo"], 0, "No es una transferencia ni una ampliación, salvo que el crédito hubiera sido declarado ampliable y el gasto fuera obligatorio."),
      q("C3-3", "VI-6", 2, "Los gastos periódicos de limpieza encajan mejor en:", ["Un anticipo de caja fija", "Un crédito extraordinario cada mes", "Una tasa", "Una moción de censura"], 0, "La caja fija es una provisión permanente para gastos repetitivos. El pago a justificar es el libramiento concreto que aún no tiene papeles."),
      q("C3-4", "VI-4", 3, "El reparo de la interventora delegada es:", ["Control interno de la IGAE, distinto de la fiscalización del Tribunal de Cuentas", "Una sentencia del orden social", "Un recurso de alzada", "Un contrato menor"], 0, "La IGAE controla por dentro. El Tribunal de Cuentas, que depende de las Cortes, controla por fuera y tiene jurisdicción contable."),
      q("C3-5", "VI-5", 2, "Antes de reconocer la obligación de pago hace falta, como regla:", ["Crédito suficiente y prestación cumplida", "Solo la voluntad del acreedor", "Un decreto-ley", "La conformidad del Senado en todo gasto"], 0, "Las fases son autorización, disposición, reconocimiento y ordenación. El documento contable no sustituye al crédito."),
    ],
  },
];

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function hashSeed(text: string) {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffle<T>(list: T[], rng: () => number) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function buildTopicQuestions(): Question[] {
  const dynamic: Question[] = [];
  const allPoints = TOPICS.flatMap((t) => t.points);
  const allTraps = TOPICS.map((t) => t.trap);
  const allLaws = Array.from(new Set(TOPICS.flatMap((t) => t.laws.map((l) => l.name))));
  const allVoices = TOPICS.map((t) => t.voice);
  const allTitles = TOPICS.map((t) => t.title);

  TOPICS.forEach((topic, tIdx) => {
    const blockTopics = TOPICS.filter((t) => t.block === topic.block && t.id !== topic.id);
    const blockPoints = blockTopics.flatMap((t) => t.points);
    const blockTraps = blockTopics.map((t) => t.trap);
    const blockTitles = blockTopics.map((t) => t.title);

    const getDistractors = (correct: string, source: string[], count = 3): string[] => {
      const filtered = source.filter((item) => item !== correct && item.trim().length > 0);
      const chosen: string[] = [];
      let offset = tIdx;
      while (chosen.length < count && filtered.length > 0) {
        const candidate = filtered[(offset++) % filtered.length];
        if (!chosen.includes(candidate)) {
          chosen.push(candidate);
        }
      }
      return chosen;
    };

    // 1. Trap question (high-yield exam pitfall)
    if (topic.trap) {
      const trapDistractors = getDistractors(topic.trap, blockTraps.length >= 3 ? blockTraps : allTraps, 3);
      dynamic.push({
        id: `${topic.id}-trap`,
        topic: topic.id,
        d: 2,
        q: `En el examen sobre "${topic.short}", ¿cuál de las siguientes precisiones jurídicas es la CORRECTA?`,
        o: [topic.trap, ...trapDistractors],
        a: 0,
        e: `¡Cuidado con la trampa típica de oposición!: ${topic.trap}`,
      });
    }

    // 2. Point-based questions for each point (points 0 to 4)
    topic.points.forEach((point, pIdx) => {
      const pointDistractors = getDistractors(point, blockPoints.length >= 3 ? blockPoints : allPoints, 3);
      const d = (pIdx === 0 ? 1 : pIdx <= 2 ? 2 : 3) as 1 | 2 | 3;
      const prompts = [
        `Respecto a "${topic.title}", señale la afirmación correcta:`,
        `En el marco normativo de "${topic.short}", ¿qué regla resulta de aplicación preceptiva?`,
        `Conforme al temario de "${topic.short}", señale la opción VERDADERA:`,
        `Sobre el régimen jurídico de "${topic.short}", es jurídicamente exacto que:`,
        `En relación con "${topic.short}", ¿cuál es el principio aplicable en la Administración?`,
      ];
      dynamic.push({
        id: `${topic.id}-pt${pIdx + 1}`,
        topic: topic.id,
        d,
        q: prompts[pIdx % prompts.length],
        o: [point, ...pointDistractors],
        a: 0,
        e: `Punto clave del tema: ${point}`,
      });
    });

    // 3. Question on legal framework
    if (topic.laws.length > 0) {
      const lawName = topic.laws.map((l) => l.name).join("; ");
      const otherLaws = allLaws.filter((l) => !topic.laws.some((tl) => tl.name === l));
      const lawDistractors = getDistractors(lawName, otherLaws, 3);
      dynamic.push({
        id: `${topic.id}-law`,
        topic: topic.id,
        d: 1,
        q: `¿Cuál es el marco legislativo fundamental regulador de "${topic.short}"?`,
        o: [lawName, ...lawDistractors],
        a: 0,
        e: `La regulación básica aplicable es: ${lawName}.`,
      });
    }

    // 4. Practical case / scenario question
    if (topic.points.length >= 2) {
      const bestPt = topic.points[1] || topic.points[0];
      const caseDistractors = getDistractors(bestPt, blockPoints.length >= 3 ? blockPoints : allPoints, 3);
      dynamic.push({
        id: `${topic.id}-caso`,
        topic: topic.id,
        d: 3,
        q: `En un supuesto práctico sobre "${topic.short}", el gestor debe resolver aplicando que:`,
        o: [bestPt, ...caseDistractors],
        a: 0,
        e: `Criterio técnico aplicable al caso: ${bestPt}`,
      });
    }

    // 5. Synthesis / Scope question
    const titleDistractors = getDistractors(topic.title, blockTitles.length >= 3 ? blockTitles : allTitles, 3);
    dynamic.push({
      id: `${topic.id}-scope`,
      topic: topic.id,
      d: 1,
      q: `¿A qué epígrafe del programa oficial corresponde la materia de "${topic.short}"?`,
      o: [topic.title, ...titleDistractors],
      a: 0,
      e: `Epígrafe oficial del bloque ${topic.block}: ${topic.title}`,
    });

    // 6. Mentor voice question
    if (topic.voice) {
      const voiceDistractors = getDistractors(topic.voice, allVoices, 3);
      dynamic.push({
        id: `${topic.id}-voice`,
        topic: topic.id,
        d: 2,
        q: `En la preparación de "${topic.short}", el preparador destaca especialmente:`,
        o: [topic.voice, ...voiceDistractors],
        a: 0,
        e: `Consejo del preparador: ${topic.voice}`,
      });
    }
  });

  return dynamic;
}

export const ALL_QUESTIONS: Question[] = [...QUESTIONS, ...buildTopicQuestions()];

export function presentQuestion(question: Question, rng: () => number): Question {
  const order = shuffle(question.o.map((text, index) => ({ text, index })), rng);
  return {
    ...question,
    o: order.map((item) => item.text),
    a: order.findIndex((item) => item.index === question.a),
  };
}

function rank(difficulty: Difficulty, question: Question) {
  if (difficulty === "aprendiz") return question.d === 1 ? 0 : question.d === 2 ? 1 : 2;
  if (difficulty === "gestor") return question.d === 2 ? 0 : question.d === 3 ? 1 : 2;
  return question.d === 3 ? 0 : question.d === 2 ? 1 : 2;
}

export function selectQuestions(opts: {
  topicIds: string[];
  difficulty: Difficulty;
  count: number;
  exclude?: string[];
  extras?: Question[];
  seed?: number;
}) {
  const rng = mulberry32(opts.seed ?? Date.now());
  const pool = [...ALL_QUESTIONS, ...(opts.extras ?? [])].filter((item) => opts.topicIds.includes(item.topic));
  const excluded = new Set(opts.exclude ?? []);

  // Partition into unseen (fresh) and previously seen questions
  const fresh = pool.filter((item) => !excluded.has(item.id));
  const seen = pool.filter((item) => excluded.has(item.id));

  const rankWithJitter = (list: Question[]) =>
    shuffle(list, rng).sort((a, b) => {
      const diffA = rank(opts.difficulty, a) + rng() * 1.4;
      const diffB = rank(opts.difficulty, b) + rng() * 1.4;
      return diffA - diffB;
    });

  const sortedFresh = rankWithJitter(fresh);
  const pickedFresh = sortedFresh.slice(0, opts.count);
  const remainder = opts.count - pickedFresh.length;
  const sortedSeen = rankWithJitter(seen);
  const pickedSeen = remainder > 0 ? sortedSeen.slice(0, remainder) : [];

  const finalQuestions = [...pickedFresh, ...pickedSeen];
  return finalQuestions.map((item) => presentQuestion(item, rng));
}

export function examSet(difficulty: Difficulty, exclude: string[] = [], extras: Question[] = [], seed = Date.now()) {
  const plan: [number, number][] = [
    [1, 3],
    [2, 2],
    [3, 3],
    [4, 5],
    [5, 4],
    [6, 3],
  ];
  const picked: Question[] = [];
  const used = new Set(exclude);
  plan.forEach(([block, count]) => {
    const ids = TOPICS.filter((topic) => topic.block === block).map((topic) => topic.id);
    const batch = selectQuestions({
      topicIds: ids,
      difficulty,
      count,
      exclude: [...used],
      extras,
      seed: seed + block * 97,
    });
    batch.forEach((item) => {
      picked.push(item);
      used.add(item.id);
    });
  });
  return picked;
}

export function pickCaso(seed = Date.now()) {
  const rng = mulberry32(seed);
  const caso = CASOS[Math.floor(rng() * CASOS.length)];
  return {
    ...caso,
    questions: caso.questions.map((item) => presentQuestion(item, rng)),
  };
}

export function questionCount() {
  return ALL_QUESTIONS.length + CASOS.reduce((sum, caso) => sum + caso.questions.length, 0);
}
