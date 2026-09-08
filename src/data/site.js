/**
 * ============================================================
 * CONTENIDO CENTRALIZADO — Casa de Bendición
 * ------------------------------------------------------------
 * Todo el copy del documento vive aquí. Los componentes son
 * "tontos": leen de este archivo. Así el cliente puede editar
 * textos sin tocar JSX, y mañana se puede migrar a un CMS
 * (Sanity / Contentful) cambiando sólo este módulo.
 *
 * Las claves marcadas con  // ← COPY SUGERIDA  no venían en el
 * documento original: son micro-copys de apoyo para el diseño.
 * ============================================================
 */

export const brand = {
  name: "Casa de Bendición",
  short: "CDB",
  tagline: "Más que Iglesia, un Movimiento", // redacción oficial del manual (pág. 9)
  claim: "Un lugar para creer, crecer, pertenecer y vivir el propósito de Dios.",
  year: 2026,
};

export const nav = [
  { label: "Inicio", href: "#inicio" },
  { label: "Conócenos", href: "#conocenos" },
  { label: "Reuniones", href: "#reuniones" },
  { label: "Ministerios", href: "#ministerios" },
  { label: "Comunidad", href: "#comunidad" },
  { label: "Conéctate", href: "#conectate" },
  { label: "Momentos", href: "#momentos" },
  { label: "Donar", href: "#donar" },
  { label: "Visítanos", href: "#visitanos" },
];

/* ------------------------------------------------------------------ */
/* 01 · HERO                                                           */
/* ------------------------------------------------------------------ */
export const hero = {
  eyebrow: "Yonkers & Bronx · Nueva York",
  title: ["Más que Iglesia,", "un Movimiento"],
  lead: "Un lugar para creer, crecer, pertenecer y vivir el propósito de Dios.",
  body: "Somos una comunidad cristiana comprometida con compartir el Evangelio, formar discípulos, fortalecer familias y servir a nuestra comunidad.",
  schedule: [
    { day: "Domingos", time: "3:00 PM", place: "Yonkers, NY", label: "Servicio Familiar" },
    { day: "Viernes", time: "7:30 PM", place: "Bronx, NY", label: "Noche de Avivamiento" },
  ],
  media: {
    label: "Imagen: plano abierto de la congregación adorando, luz cálida lateral",
  },
};

/* ------------------------------------------------------------------ */
/* 02 · BIENVENIDA                                                     */
/* ------------------------------------------------------------------ */
export const welcome = {
  eyebrow: "Bienvenido a casa",
  title: ["Hay un lugar", "para ti."],
  paragraphs: [
    "No importa si estás comenzando a conocer a Dios, buscando una iglesia, atravesando una nueva temporada o simplemente deseas crecer más en tu fe.",
    "En Casa de Bendición queremos que encuentres una comunidad donde puedas conocer a Cristo, crecer en Su Palabra, desarrollar relaciones saludables y descubrir el propósito que Dios ha puesto en tu vida.",
  ],
  highlight: "Aquí no tienes que llegar teniendo todo resuelto. Puedes comenzar desde donde estás.",
  pillars: [
    "Conocer a Cristo",
    "Crecer en Su Palabra",
    "Relaciones saludables",
    "Descubrir tu propósito",
  ],
  media: {
    main: "Imagen: familia recibida en la entrada del templo, formato vertical",
    inset: "Imagen: detalle de manos alzadas / abrazo en el pasillo",
  },
};

/* ------------------------------------------------------------------ */
/* 03 · VISIÓN                                                         */
/* ------------------------------------------------------------------ */
export const vision = {
  eyebrow: "Nuestra visión",
  title: ["Una iglesia que", "forma y moviliza."],
  paragraphs: [
    "Nuestra misión no termina cuando alguien cruza nuestras puertas.",
    "Queremos acompañar a las personas en un proceso de crecimiento que las lleve desde conocer a Cristo hasta vivir activamente el propósito que Dios ha puesto en sus vidas.",
  ],
  // Modelo visual del documento: GANAR → FORMAR → ACTIVAR Y EQUIPAR → ENVIAR Y MOVILIZAR → EXPANDIR
  model: [
    { step: "Ganar", note: "Compartir el Evangelio" }, // ← COPY SUGERIDA
    { step: "Formar", note: "Fundamentos y Palabra" }, // ← COPY SUGERIDA
    { step: "Activar y equipar", note: "Dones puestos a servir" }, // ← COPY SUGERIDA
    { step: "Enviar y movilizar", note: "Fe fuera de las paredes" }, // ← COPY SUGERIDA
    { step: "Expandir", note: "Familias y comunidades" }, // ← COPY SUGERIDA
  ],
  quote:
    "No buscamos solamente asistentes. Queremos formar discípulos que transformen familias y comunidades.",
};

/* ------------------------------------------------------------------ */
/* 04 · CONÓCENOS / VIDEO INSTITUCIONAL                                */
/* ------------------------------------------------------------------ */
export const about = {
  eyebrow: "Conoce Casa de Bendición",
  title: ["Más que una", "reunión semanal."],
  paragraphs: [
    "Casa de Bendición es una comunidad de fe, formación, mentoría, adoración, servicio y desarrollo comunitario.",
    "Conoce nuestra historia, nuestros ministerios, las vidas que están siendo impactadas y la visión que Dios ha puesto delante de nosotros.",
  ],
  video: {
    label: "Vídeo institucional: recorrido por la vida de la iglesia",
    caption: "Vídeo institucional",
    duration: "2:41",
  },
  // Cifras derivadas del propio documento (reuniones, ministerios y sedes listados)
  stats: [
    { value: "5", label: "Reuniones cada semana" },
    { value: "14", label: "Ministerios activos" },
    { value: "2", label: "Sedes en Nueva York" },
    { value: "3", label: "Plataformas de impacto" },
  ],
};

/* ------------------------------------------------------------------ */
/* 05 · PASTORES                                                       */
/* ------------------------------------------------------------------ */
export const pastors = {
  eyebrow: "Nuestros pastores",
  title: "Conoce a nuestros pastores",
  names: "Pastores Willy & Carolina Burgos",
  paragraphs: [
    "Servimos juntos con el deseo de construir una iglesia centrada en Cristo, fundamentada en Su Palabra y comprometida con acompañar a las personas y familias en su crecimiento espiritual.",
    "Nuestra visión pastoral es formar una comunidad donde las personas puedan encontrar fe, familia, propósito y oportunidades para servir.",
  ],
  media: { label: "Foto: Pastores Willy & Carolina Burgos, retrato editorial" },
  // Nota del documento: las biografías completas se reservan para la futura página "Pastores".
};

/* ------------------------------------------------------------------ */
/* 06 · REUNIONES                                                      */
/* ------------------------------------------------------------------ */
export const gatherings = {
  eyebrow: "Reúnete con nosotros",
  title: ["Hay un lugar para ti", "esta semana."],
  intro:
    "Cada semana tenemos diferentes oportunidades para adorar, aprender, crecer en la Palabra, desarrollar nuestro propósito y compartir en comunidad.",
  cards: [
    {
      slug: "blueprint-mentorship",
      day: "Jueves",
      time: "7:30 PM",
      name: "Estudio Bíblico Interactivo",
      place: "266 Riverdale Ave., Yonkers, NY",
      text: "Una noche de crecimiento, conversación y formación como parte de Blueprint Mentorship, donde profundizamos juntos en la Palabra de Dios y desarrollamos principios de fe, propósito, liderazgo, relaciones y crecimiento personal.",
      by: "Una iniciativa de Blueprint Mentorship",
    },
    {
      slug: "anhelo-ardiente",
      day: "Viernes",
      time: "7:30 PM",
      name: "Noche de Avivamiento",
      place: "1688 Boston Rd., Bronx, NY",
      text: "Una noche de adoración, oración y Palabra dirigida por Anhelo Ardiente Worship, creada para buscar juntos la presencia de Dios y fomentar una cultura de adoración y avivamiento.",
      by: "Una iniciativa de Anhelo Ardiente Worship",
    },
    {
      slug: null, // marca madre: se usa el identificador de Casa de Bendición
      day: "Domingos",
      time: "3:00 PM",
      name: "Servicio Familiar",
      place: "266 Riverdale Ave., Yonkers, NY",
      text: "Nuestro encuentro congregacional principal de la semana. Un tiempo para adorar juntos, recibir la Palabra de Dios, orar y compartir como familia.",
      by: "Casa de Bendición",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 07 · FORMACIÓN                                                      */
/* ------------------------------------------------------------------ */
export const training = {
  eyebrow: "Crece y fórmate",
  intro:
    "Además de nuestras reuniones congregacionales, ofrecemos espacios de formación bíblica para ayudarte a continuar creciendo.",
  courses: [
    {
      slug: "rhema-academy",
      day: "Miércoles",
      time: "7:00 PM",
      name: "Fundamentos de la Fe",
      place: "Virtual por Zoom",
      online: true,
      text: "Formación bíblica diseñada para establecer fundamentos sólidos de la fe cristiana y ayudar a cada creyente a crecer en el conocimiento de la Palabra de Dios.",
    },
    {
      slug: "rhema-academy",
      day: "Domingos",
      time: "2:00 PM",
      name: "Nivel Avanzado",
      place: "266 Riverdale Ave., Yonkers, NY",
      online: false,
      text: "Formación bíblica avanzada para quienes desean profundizar en las Escrituras, fortalecer sus fundamentos y continuar avanzando hacia la madurez cristiana.",
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 08 · MINISTERIOS                                                    */
/* ------------------------------------------------------------------ */
export const ministries = {
  eyebrow: "Ministerios",
  title: ["Encuentra", "tu lugar."],
  paragraphs: [
    "En Casa de Bendición creemos que cada persona tiene un lugar, cada etapa de la vida importa y cada don puede ser utilizado para servir a Dios y a los demás.",
    "Nuestros ministerios crean espacios para crecer, desarrollar relaciones, servir y vivir nuestra fe en comunidad.",
  ],
  items: [
    {
      slug: "ams",
      photo: true,
      name: "AMS",
      text: "Un espacio para que las mujeres crezcan juntas en sabiduría, fe, propósito y comunidad.",
      by: "Una iniciativa de Blueprint Mentorship",
    },
    {
      slug: "hombres-de-valor",
      photo: true,
      name: "Hombres de Valor",
      text: "Formando hombres de fe, carácter, responsabilidad y liderazgo espiritual.",
      by: "Una iniciativa de Blueprint Mentorship",
    },
    {
      slug: "revival-youth",
      photo: false, // pendiente: el cliente no ha entregado la foto
      name: "Revival Youth",
      text: "Una generación de jóvenes creciendo en Cristo, descubriendo su identidad y viviendo con propósito.",
      by: "Una iniciativa de Blueprint Mentorship",
    },
    {
      slug: "kick",
      photo: true,
      name: "KICK",
      text: "Un espacio seguro y dinámico donde nuestros niños pueden conocer a Jesús y crecer en la Palabra.",
      by: null,
    },
    {
      slug: "dorcas",
      photo: true,
      name: "Dorcas",
      text: "Sirviendo con compasión y convirtiendo el amor de Cristo en acciones que bendicen a quienes más lo necesitan.",
      by: "Una iniciativa de Community Outreach",
    },
    {
      slug: "pescadores",
      photo: true,
      name: "Pescadores de Hombres",
      text: "Una iniciativa de alcance y movilización que lleva nuestra fe más allá de las paredes de la iglesia mediante servicio, conexión y participación comunitaria.",
      by: "Una iniciativa de Community Outreach",
    },
    {
      slug: "anhelo-ardiente",
      photo: true,
      // Su foto es vertical y la cantante ya queda alta en el recorte:
      // subirla le cortaba la cara.
      raise: 0,
      name: "Anhelo Ardiente Worship",
      text: "Nuestro ministerio de adoración, dedicado a guiar a la congregación hacia una experiencia genuina de adoración y entrega a Dios.",
      by: null,
    },
    {
      slug: "rhema-academy",
      photo: true,
      name: "Rhema Academy",
      text: "Formación bíblica y capacitación ministerial para creyentes, servidores y líderes.",
      by: null,
    },
    {
      slug: "blueprint-mentorship",
      photo: true,
      name: "Blueprint Mentorship",
      text: "Nuestra plataforma de mentoría y desarrollo para fortalecer personas y familias, desarrollar liderazgo y acompañar diferentes generaciones hacia propósito y crecimiento.",
      by: null,
    },
  ],
  otherTeams: {
    title: "Otros equipos",
    list: [
      { name: "Intercesores", slug: "intercesores" },
      { name: "Ujieres y Hospitalidad", slug: "ujieres" },
      { name: "Echo Media", slug: "echo-media" },
      { name: "Operación Nehemías", slug: "operacion-nehemias" },
      { name: "Casa de Bendición Publishing", slug: "cdb-publishing" },
      { name: "El Momento de la Verdad", slug: "momento-de-la-verdad" },
      { name: "y otros equipos de servicio", slug: null },
    ],
    closing: "Encuentra tu lugar en Casa.",
  },
};

/* ------------------------------------------------------------------ */
/* 09 · COMUNIDAD / IMPACTO                                            */
/* ------------------------------------------------------------------ */
export const community = {
  eyebrow: "Comunidad · Impacto comunitario",
  title: "Fortaleciendo familias. Desarrollando líderes. Transformando comunidades.",
  subtitleEn: "Building Leaders. Strengthening Families. Transforming Communities.",
  paragraphs: [
    "Nuestra fe también se expresa mediante la manera en que desarrollamos personas, fortalecemos familias y servimos a nuestra comunidad.",
    "Nuestro modelo de impacto integra mentoría, desarrollo de liderazgo, innovación digital y alcance comunitario, creando diferentes caminos para que niños, jóvenes y adultos puedan crecer, servir y contribuir al bienestar de sus comunidades.",
  ],
  platforms: [
    {
      index: "01",
      name: "Blueprint Mentorship",
      slug: "blueprint-mentorship",
      photoSlug: "blueprint-mentorship",
      photo: false, // pendiente de subir

      en: "Leadership & Family Development",
      text: "Plataforma de mentoría y desarrollo diseñada para fortalecer personas y familias, desarrollar liderazgo y acompañar a diferentes generaciones en procesos de crecimiento, propósito y participación comunitaria.",
      extensions: [],
    },
    {
      index: "02",
      name: "Echo Media",
      slug: "echo-media",
      photoSlug: "echo-media",
      photo: false, // pendiente de subir

      en: "Community Leadership & Digital Innovation",
      text: "Echo Media utiliza comunicación, creatividad y herramientas digitales como vehículos para desarrollar habilidades, liderazgo y oportunidades de participación. Su enfoque incluye desarrollo de habilidades digitales, comunicación, creación de contenido, innovación y preparación profesional.",
      extensions: [],
    },
    {
      index: "03",
      name: "Community Outreach",
      slug: null, // sin marca propia: usa el identificador de Casa de Bendición
      photoSlug: "community-outreach",
      photo: false, // pendiente de subir
      en: "Neighborhood Engagement",
      text: "Community Outreach moviliza el servicio más allá de las actividades internas de la iglesia mediante participación comunitaria, voluntariado, apoyo práctico, conexión con recursos y colaboración.",
      extensions: [
        { name: "Dorcas", slug: "dorcas", text: "Servicio compasivo y apoyo práctico para personas y familias." },
        {
          name: "Pescadores de Hombres",
          slug: "pescadores",
          text: "Servicio, alcance, movilización y conexión comunitaria.",
        },
      ],
    },
  ],
  closing: "Sé parte de lo que estamos construyendo.",
};


/* ------------------------------------------------------------------ */
/* 09b · TESTIMONIOS                                                   */
/* Textos entregados por el cliente, transcritos literalmente.         */
/* ------------------------------------------------------------------ */
export const testimonials = {
  eyebrow: "Lo que dicen nuestras familias",
  title: ["Historias de", "una misma casa."],
  intro:
    "No hay mejor manera de conocer Casa de Bendición que escuchar a quienes ya forman parte de ella.",
  items: [
    {
      slug: "familia-morales",
      name: "Familia Morales",
      quote: [
        "Casa de Bendición ha sido un ejemplo de amor para con toda nuestra familia. Se puede palpar la calidez y la empatía de cada líder y cada miembro.",
      ],
    },
    {
      slug: "emelyn-burgos",
      name: "Emelyn Burgos",
      quote: [
        "En Casa de Bendición he encontrado mucho más que un lugar de congregación; he encontrado una familia. Allí he recibido apoyo en los momentos difíciles, amor sincero y el soporte que necesitaba para seguir adelante.",
        "Me siento bendecida de formar parte de una familia que me anima, me acompaña y me recuerda que nunca estoy sola. Casa de Bendición ha sido para mí un lugar de amor, crecimiento, restauración y, sobre todo, de muchas bendiciones.",
      ],
    },
    {
      slug: "familia-liriano",
      name: "Familia Liriano",
      quote: [
        "Estamos muy agradecidos por Casa de Bendición. Los pastores nos han ayudado a conocer más a Dios y a fortalecer nuestra relación con Él. A través de los diferentes programas y actividades, también hemos aprendido a trabajar en nuestro carácter, crecer como familia y mejorar nuestra convivencia dentro del hogar.",
        "Casa de Bendición ha sido de gran bendición para nuestras vidas y nuestra familia. ¡Dios siga usando este ministerio para transformar hogares y acercar más personas a Él!",
      ],
    },
    {
      slug: "amy-crespo",
      name: "Amy Crespo",
      quote: [
        "Casa de Bendición se ha convertido en nuestro segundo hogar, y sus pastores y miembros, en parte de nuestra familia. Para mi bebé y para mí ha sido un verdadero privilegio encontrar una comunidad donde no solo compartimos nuestras creencias y crecemos en nuestra fe, sino donde también contamos con líderes que nos acompañan con amor en las buenas y no tan buenas, nos guían a ser nuestra mejor versión y nos animan y orientan a descubrir y perseguir el propósito que Dios tiene para nuestras vidas.",
        "Estamos profundamente agradecidas por esta familia de fe y por todo el amor, apoyo, soporte y dirección que hemos recibido. Es un privilegio y una gran bendición ser parte de Casa de Bendición.",
      ],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 10 · PRIMERA VEZ / VISÍTANOS                                        */
/* ------------------------------------------------------------------ */
export const firstTime = {
  eyebrow: "¿Es tu primera vez?",
  title: "Queremos que te sientas en casa.",
  intro: "Sabemos que visitar una iglesia por primera vez puede traer muchas preguntas.",
  faqs: [
    { q: "¿Qué me pongo?", a: "Ven como eres." },
    { q: "¿Puedo venir con mis niños?", a: "Sí. Nos encantará recibir a toda tu familia." },
    { q: "¿Tengo que ser miembro?", a: "No. Todos son bienvenidos." },
    { q: "¿Tengo que participar en todo?", a: "No. Puedes conocer nuestra iglesia a tu propio ritmo." },
  ],
  closing: "Nos encantaría conocerte.",
};

/* ------------------------------------------------------------------ */
/* 11 · CONÉCTATE                                                      */
/* ------------------------------------------------------------------ */
export const connect = {
  eyebrow: "Conéctate",
  title: "No tienes que caminar solo.",
  paragraphs: [
    "La iglesia es mucho más que un servicio semanal.",
    "Es una comunidad donde podemos crecer, servir, aprender y caminar juntos.",
  ],
  options: [
    { key: "soy-nuevo", title: "Soy nuevo", text: "Quiero conocer más acerca de Casa de Bendición." },
    {
      key: "quiero-conectarme",
      title: "Quiero conectarme",
      text: "Quiero conocer oportunidades para crecer y participar.",
    },
    { key: "necesito-oracion", title: "Necesito oración", text: "Quiero compartir una petición de oración." },
    {
      key: "quiero-servir",
      title: "Quiero servir",
      text: "Quiero conocer oportunidades para utilizar mis dones y talentos.",
    },
  ],
};


/* ------------------------------------------------------------------ */
/* 11b · MOMENTOS QUE MARCAN                                           */
/* Documento "Sección: Conéctate" — el cliente pidió una tarjeta por   */
/* momento, cada una con foto y su llamada a la acción encima.         */
/* ------------------------------------------------------------------ */
export const moments = {
  eyebrow: "Momentos que marcan",
  title: ["Estamos contigo en cada etapa,", "celebración y circunstancia."],
  paragraphs: [
    "En Casa de Bendición creemos que no debemos caminar solos. Queremos acompañarte en los momentos que celebras, en los nuevos comienzos, en las dificultades y también en los momentos de pérdida.",
    "A través de oración, Palabra, acompañamiento y servicio, queremos ser una comunidad presente cuando más lo necesitas.",
  ],
  lead: "Encuentra el momento que estás viviendo y conéctate con nosotros.",
  items: [
    { slug: "bautizos", name: "Bautizos", cta: "¿Listo para dar este paso de fe? Conéctate con nosotros.", photo: true },
    { slug: "bodas", name: "Bodas", cta: "¿Preparándose para el gran día? Permítenos acompañarlos.", photo: true },
    { slug: "presentacion-de-ninos", name: "Presentación de niños", cta: "Presenta a tu niño al Señor junto a nosotros.", photo: true },
    { slug: "dedicaciones", name: "Dedicaciones", cta: "Invítanos a orar por tu hogar, negocio o proyecto.", photo: true },
    { slug: "hospitales", name: "Visitas a hospitales", cta: "¿Tú o alguien está hospitalizado? Queremos acompañarlos.", photo: true },
    { slug: "carceles", name: "Ministerio en cárceles", cta: "Conéctanos con alguien que necesite esperanza y acompañamiento.", photo: true },
    { slug: "hogares", name: "Visitas a los hogares", cta: "Abre las puertas de tu hogar para compartir y orar.", photo: true },
    { slug: "funerales", name: "Funerales y servicios conmemorativos", cta: "Permítenos acompañar a tu familia durante este momento.", photo: true },
    { slug: "oracion", name: "Oración y bendición", cta: "Comparte tu petición. Queremos unirnos contigo en oración.", photo: true },
    { slug: "bendiciones-familiares", name: "Bendiciones familiares", cta: "Conecta a tu familia con un momento de oración.", photo: true },
    { slug: "nuevos-comienzos", name: "Nuevos comienzos", cta: "Comienza esta nueva etapa poniendo a Dios primero.", photo: true },
    { slug: "acompanamiento-pastoral", name: "Acompañamiento pastoral", cta: "¿Necesitas hablar con alguien? Estamos aquí para acompañarte.", photo: true },
  ],
  closing: {
    title: ["No importa el momento.", "No tienes que caminarlo solo."],
    paragraphs: [
      "Casa de Bendición está aquí para caminar contigo. En tus celebraciones. En tus nuevos comienzos. En tus luchas. En tus pérdidas. En tus momentos de fe.",
      "Porque somos más que una iglesia; somos un movimiento que sirve, acompaña y bendice a nuestra comunidad.",
    ],
    question: "¿Estás viviendo un momento que marca tu vida?",
    lead: "Permítenos acompañarte.",
  },
};

/* ------------------------------------------------------------------ */
/* 12 · DONAR                                                          */
/* ------------------------------------------------------------------ */
export const donate = {
  eyebrow: "Donar",
  title: "Tu generosidad hace posible la misión.",
  text: "Cada contribución ayuda a sostener la obra ministerial, formar discípulos, servir familias y ampliar nuestro impacto dentro y fuera de la iglesia.",
  verse: { text: "Dios ama al dador alegre.", ref: "2 Corintios 9:7" },
  cta: "Dar ahora",
  // Pasarela de donaciones (Stripe Payment Link) facilitada por el cliente
  url: "https://donate.stripe.com/9B600j33TdVlb0K7ok77O00",
};

/* ------------------------------------------------------------------ */
/* CIERRE + FOOTER                                                     */
/* ------------------------------------------------------------------ */
export const finalCta = {
  title: "Tu historia puede comenzar aquí.",
  lines: [
    "Quizás estás buscando una iglesia.",
    "Quizás necesitas comenzar nuevamente.",
    "Quizás deseas conocer más de Dios.",
    "O quizás simplemente estás buscando un lugar donde puedas pertenecer.",
  ],
  closing: "Hay un lugar para ti en Casa de Bendición.",
  meta: { when: "Domingos • 3:00 PM", where: "266 Riverdale Ave., Yonkers, NY" },
};

export const locations = [
  { city: "Yonkers", street: "266 Riverdale Ave.", region: "Yonkers, NY" },
  { city: "Bronx", street: "1688 Boston Rd.", region: "Bronx, NY" },
];

export const weeklySchedule = [
  { day: "Miércoles", time: "7:00 PM", name: "Rhema Academy — Fundamentos de la Fe", place: "Virtual por Zoom" },
  { day: "Jueves", time: "7:30 PM", name: "Blueprint Mentorship — Estudio Bíblico Interactivo", place: "Yonkers" },
  { day: "Viernes", time: "7:30 PM", name: "Noche de Avivamiento — Anhelo Ardiente Worship", place: "Bronx" },
  { day: "Domingo", time: "2:00 PM", name: "Rhema Academy — Nivel Avanzado", place: "Yonkers" },
  { day: "Domingo", time: "3:00 PM", name: "Servicio Familiar", place: "Yonkers" },
];

/* Redes sociales.
   Las URLs vienen limpias: los enlaces que envió el cliente traían
   parámetros de compartición personales (`si`, `stkn`, `_t`,
   `mibextid`) que identifican a quien compartió y no pintan nada en
   una web pública. El de Facebook era un redirector /share/…; aquí va
   la dirección canónica que devuelve la propia página.

   TODO: falta el correo y el teléfono de contacto para completar la
   columna "Conecta" del footer con mailto: y tel:. */
export const socials = [
  { name: "Instagram", href: "https://www.instagram.com/casa.de.bendicion_mpi" },
  { name: "Facebook", href: "https://www.facebook.com/p/Casa-De-Bendicion-61583118900335/" },
  { name: "YouTube", href: "https://youtube.com/@casa.de.bendicion-mpi" },
  { name: "TikTok", href: "https://www.tiktok.com/@casa.de.bendicion_mpi" },
  { name: "Email", href: "mailto:houseofblessingsny@gmail.com" },
  // TODO: falta el teléfono; el cliente aún no tiene número.
];
