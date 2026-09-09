import { training } from "../data/site";

/* Las opciones del desplegable se generan desde las propias tarjetas
   de "Crece y fórmate": así no puede haber desajuste entre lo que se
   ve en la sección y lo que llega en el formulario. */
export const etiquetaFormacion = (c) => `${c.name} — ${c.day} ${c.time} (${c.place})`;

/**
 * Registro de modales.
 * Cada entrada define título, subtítulo y los campos del formulario.
 * La UI se genera sola a partir de este esquema: cuando llegue el
 * backend sólo hay que implementar `onSubmit` en <Modal/>.
 */

const contactBase = [
  { name: "nombre", label: "Nombre", type: "text", span: 1, required: true },
  { name: "telefono", label: "Teléfono", type: "tel", span: 1 },
  { name: "email", label: "Email", type: "email", span: 2, required: true },
];

export const modalRegistry = {
  /* CTA global — Planifica tu visita (formulario del documento) */
  "planifica-tu-visita": {
    eyebrow: "Planifica tu visita",
    title: "Nos encantaría conocerte.",
    text: "Cuéntanos un poco sobre ti y preparamos todo para que te sientas en casa desde el primer minuto.",
    fields: [
      ...contactBase,
      { name: "personas", label: "¿Cuántas personas vienen?", type: "number", span: 1, min: 1 },
      {
        name: "ninos",
        label: "¿Vienen niños?",
        type: "select",
        span: 1,
        options: ["Sí", "No"],
      },
      {
        name: "reunion",
        label: "¿Qué reunión deseas visitar?",
        type: "select",
        span: 2,
        options: [
          "Domingo • 3:00 PM — Servicio Familiar (Yonkers)",
          "Viernes • 7:30 PM — Noche de Avivamiento (Bronx)",
          "Jueves • 7:30 PM — Estudio Bíblico Interactivo (Yonkers)",
          "Domingo • 2:00 PM — Rhema Academy, Escuela Bíblica (Yonkers)",
          "Miércoles • 7:00 PM — Fundamentos de la Fe (Zoom)",
          "Miércoles • 9:00 PM — Formación Prematrimonial (Online)",
        ],
      },
      {
        name: "notas",
        label: "¿Hay algo que quisieras que sepamos antes de tu visita?",
        type: "textarea",
        span: 2,
      },
    ],
    submit: "Planificar mi visita",
  },

  /* Sección Conéctate — 4 opciones */
  "soy-nuevo": {
    eyebrow: "Soy nuevo",
    title: "Quiero conocer más acerca de Casa de Bendición.",
    text: "Déjanos tus datos y alguien de nuestro equipo se pondrá en contacto contigo.",
    fields: [
      ...contactBase,
      { name: "mensaje", label: "¿Qué te gustaría saber?", type: "textarea", span: 2 },
    ],
    submit: "Enviar",
  },
  "quiero-conectarme": {
    eyebrow: "Quiero conectarme",
    title: "Quiero conocer oportunidades para crecer y participar.",
    text: "Cuéntanos en qué etapa estás y te ayudamos a encontrar tu lugar.",
    fields: [
      ...contactBase,
      {
        name: "interes",
        label: "¿Qué te interesa?",
        type: "select",
        span: 2,
        options: [
          "Grupos y comunidad",
          "Formación bíblica (Rhema Academy)",
          "Mentoría (Blueprint Mentorship)",
          "Ministerio de jóvenes",
          "Ministerio de niños",
          "Aún no lo sé",
        ],
      },
      { name: "mensaje", label: "Cuéntanos un poco más", type: "textarea", span: 2 },
    ],
    submit: "Quiero conectarme",
  },
  "necesito-oracion": {
    eyebrow: "Necesito oración",
    title: "Quiero compartir una petición de oración.",
    text: "Nuestro equipo de intercesión orará por ti. Tu petición se trata con total confidencialidad.",
    fields: [
      ...contactBase,
      { name: "peticion", label: "Tu petición de oración", type: "textarea", span: 2, required: true },
      {
        name: "confidencial",
        label: "¿Deseas que sea confidencial?",
        type: "select",
        span: 2,
        options: ["Sí, sólo el equipo pastoral", "Puede compartirse con el equipo de oración"],
      },
    ],
    submit: "Enviar petición",
  },
  "quiero-servir": {
    eyebrow: "Quiero servir",
    title: "Quiero conocer oportunidades para utilizar mis dones y talentos.",
    text: "Hay un equipo esperando por ti. Dinos qué te apasiona.",
    fields: [
      ...contactBase,
      {
        name: "area",
        label: "¿Dónde te gustaría servir?",
        type: "select",
        span: 2,
        options: [
          "Adoración — Anhelo Ardiente Worship",
          "Niños — KICK",
          "Jóvenes — Revival Youth",
          "Intercesión",
          "Ujieres y Hospitalidad",
          "Echo Media",
          "Operación Nehemías",
          "Community Outreach",
          "Donde más se necesite",
        ],
      },
      { name: "mensaje", label: "Cuéntanos sobre tu experiencia", type: "textarea", span: 2 },
    ],
    submit: "Quiero servir",
  },


  /* Momentos que marcan — las 12 tarjetas comparten este formulario.
     Cada una lo abre con su momento ya preseleccionado. */
  "acompanamiento": {
    eyebrow: "Momentos que marcan",
    title: "Permítenos acompañarte.",
    text: "Cuéntanos qué estás viviendo y nos ponemos en contacto contigo. Sea una celebración, un nuevo comienzo o una pérdida, no tienes que caminarlo solo.",
    fields: [
      ...contactBase,
      {
        name: "momento",
        label: "¿Qué momento estás viviendo?",
        type: "select",
        span: 2,
        required: true,
        options: [
          "Bautizos",
          "Bodas",
          "Presentación de niños",
          "Dedicaciones",
          "Visitas a hospitales",
          "Ministerio en cárceles",
          "Visitas a los hogares",
          "Funerales y servicios conmemorativos",
          "Oración y bendición",
          "Bendiciones familiares",
          "Nuevos comienzos",
          "Acompañamiento pastoral",
        ],
      },
      { name: "mensaje", label: "Cuéntanos un poco más", type: "textarea", span: 2 },
    ],
    submit: "Solicita acompañamiento",
  },


  /* Crece y fórmate — una tarjeta, una plaza reservada */
  inscripcion: {
    eyebrow: "Crece y fórmate",
    title: "Reserva tu plaza.",
    text: "Déjanos tus datos y te confirmamos el acceso, el horario y lo que necesitas para empezar.",
    fields: [
      ...contactBase,
      {
        name: "formacion",
        label: "¿En qué formación quieres inscribirte?",
        type: "select",
        span: 2,
        required: true,
        options: training.courses.map(etiquetaFormacion),
      },
      { name: "mensaje", label: "¿Algo que quieras contarnos?", type: "textarea", span: 2 },
    ],
    submit: "Registrarme",
  },

  /* Community Outreach — recibir ayuda.
     El flujo que pidió el cliente: la petición entra, Community
     Outreach la revisa y la deriva al programa o recurso adecuado. */
  "necesito-ayuda": {
    eyebrow: "Community Outreach",
    title: "Necesito ayuda.",
    text: "Cuéntanos qué necesitas. Nuestro equipo de Community Outreach revisa cada petición y te pone en contacto con el programa o el recurso que mejor pueda acompañarte.",
    fields: [
      ...contactBase,
      {
        name: "necesidad",
        label: "¿En qué necesitas ayuda?",
        type: "select",
        span: 2,
        required: true,
        options: [
          "Alimentos y artículos de primera necesidad",
          "Apoyo a la familia",
          "Acompañamiento espiritual y oración",
          "Orientación y recursos comunitarios",
          "Visita a domicilio u hospital",
          "Otra necesidad",
        ],
      },
      {
        name: "urgencia",
        label: "¿Con qué urgencia?",
        type: "select",
        span: 2,
        options: ["Lo antes posible", "Esta semana", "Sin prisa"],
      },
      {
        name: "detalle",
        label: "Cuéntanos tu situación",
        type: "textarea",
        span: 2,
        required: true,
      },
    ],
    submit: "Enviar petición",
  },

  /* Community Outreach — servir.
     Flujo: voluntario -> intereses y disponibilidad -> Community Outreach. */
  "quiero-ayudar": {
    eyebrow: "Community Outreach",
    title: "Quiero ayudar.",
    text: "Súmate como voluntario. Dinos qué te mueve y cuándo puedes, y Community Outreach te conecta con el equipo donde más falta haces.",
    fields: [
      ...contactBase,
      {
        name: "interes",
        label: "¿En qué te gustaría servir?",
        type: "select",
        span: 2,
        required: true,
        options: [
          "Reparto de alimentos — Dorcas",
          "Alcance en la calle — Pescadores de Hombres",
          "Visitas a hogares y hospitales",
          "Apoyo en eventos comunitarios",
          "Acompañamiento y mentoría",
          "Donde más se necesite",
        ],
      },
      {
        name: "disponibilidad",
        label: "¿Cuándo puedes?",
        type: "select",
        span: 2,
        required: true,
        options: [
          "Entre semana, por la mañana",
          "Entre semana, por la tarde",
          "Fines de semana",
          "Puntualmente, en eventos",
          "Flexible",
        ],
      },
      { name: "mensaje", label: "Cuéntanos sobre ti", type: "textarea", span: 2 },
    ],
    submit: "Quiero ser voluntario",
  },

  /* Vídeo institucional */
  video: {
    eyebrow: "Vídeo institucional",
    title: "Casa de Bendición",
    text: "Aquí se incrustará el reproductor (YouTube / Vimeo) cuando esté disponible el material final.",
    kind: "video",
  },
};

export const modalKeys = Object.keys(modalRegistry);
