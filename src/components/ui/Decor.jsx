import { motion, useReducedMotion } from "framer-motion";

/* ============================================================
   Lenguaje gráfico del manual (pág. 24-25):
   "las formas curvas, el degradado dorado y los recursos
    inspirados en el fuego".

   El arco barrido con filete dorado es el recurso más
   característico del sistema; aquí se traduce a divisores de
   sección y a los bordes de los paneles azules.

   El fuego se dibuja como silueta decorativa propia — NO es el
   isotipo: el manual (pág. 21) prohíbe aplicar transparencias o
   efectos al identificador, así que nunca se usa el logo como
   marca de agua.
   ============================================================ */

const TONE = {
  navy: "var(--color-navy)",
  "navy-deep": "var(--color-navy-deep)",
  ivory: "var(--color-ivory)",
  white: "#ffffff",
  gold: "var(--color-gold)",
};

const c = (t) => TONE[t] ?? t;

/**
 * Divisor de sección en arco.
 * Dibuja la curva con el color de la sección de DESTINO y traza
 * el filete dorado por encima.
 */
export function ArcDivider({
  to = "ivory",
  position = "bottom",
  height = 110,
  gold = true,
  className = "",
}) {
  const isBottom = position === "bottom";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 z-10 ${
        isBottom ? "bottom-0" : "top-0"
      } ${className}`}
      style={{ height }}
    >
      <svg
        viewBox="0 0 1440 110"
        preserveAspectRatio="none"
        className={`h-full w-full ${isBottom ? "" : "rotate-180"}`}
      >
        <path d="M0 110 C 360 6 1080 6 1440 110 Z" fill={c(to)} />
        {gold && (
          <path
            d="M0 110 C 360 6 1080 6 1440 110"
            fill="none"
            stroke={c("gold")}
            strokeWidth="5"
            vectorEffect="non-scaling-stroke"
          />
        )}
      </svg>
    </div>
  );
}

/**
 * Borde curvo vertical: separa el panel azul de la fotografía en
 * el hero (desktop). Reproduce la composición de la pág. 32.
 */
export function ArcEdge({ fill = "navy", width = 130, className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 130 1000"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-y-0 ${className}`}
      style={{ width }}
    >
      <path d="M0 0 C 96 240 96 760 0 1000 L0 0 Z" fill={c(fill)} />
      <path
        d="M0 0 C 96 240 96 760 0 1000"
        fill="none"
        stroke={c("gold")}
        strokeWidth="5"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/**
 * Silueta de fuego para marcas de agua tono sobre tono.
 * Dibujo propio inspirado en el símbolo, nunca el isotipo real.
 */
export function Flame({ className = "", style }) {
  return (
    <svg viewBox="0 0 120 150" aria-hidden="true" className={className} style={style}>
      <path
        d="M62 2C48 34 22 48 22 84c0 30 19 52 43 52s45-20 45-46c0-28-19-38-27-64-3 23-9 34-18 41 9-24 6-49 -3-65Z"
        fill="currentColor"
      />
      <path
        d="M64 56c-9 20-20 29-20 46 0 17 11 30 24 30s22-11 22-26c0-17-17-24-26-50Z"
        fill="currentColor"
        opacity="0.45"
      />
    </svg>
  );
}

/** Marca de agua de fuego, flotando muy despacio. */
export function FlameWatermark({ className = "", size = 380, opacity = 0.05, duration = 14 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={{ width: size, opacity, willChange: "transform" }}
      animate={reduce ? undefined : { y: [0, -18, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      <Flame className="h-auto w-full" />
    </motion.div>
  );
}

/** Filete dorado horizontal (degradado institucional). */
export function GoldRule({ className = "", width = "5rem" }) {
  return (
    <span
      aria-hidden="true"
      className={`rule-gold block h-[3px] rounded-full ${className}`}
      style={{ width }}
    />
  );
}

/** Barra dorada vertical: aparece en el canto de las páginas del manual. */
export function GoldEdge({ className = "" }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 left-0 w-[6px] ${className}`}
      style={{
        background: "linear-gradient(180deg, var(--color-gold), var(--color-gold-light))",
      }}
    />
  );
}

/** Malla de puntos muy tenue para dar textura sin ensuciar. */
export function DotTexture({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`dot-grid pointer-events-none absolute inset-0 opacity-[0.5] ${className}`}
    />
  );
}
