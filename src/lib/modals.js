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
          "Domingo • 2:00 PM — Rhema Academy, Nivel Avanzado (Yonkers)",
          "Miércoles • 7:00 PM — Fundamentos de la Fe (Zoom)",
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

  /* Vídeo institucional */
  video: {
    eyebrow: "Vídeo institucional",
    title: "Casa de Bendición",
    text: "Aquí se incrustará el reproductor (YouTube / Vimeo) cuando esté disponible el material final.",
    kind: "video",
  },
};

export const modalKeys = Object.keys(modalRegistry);
