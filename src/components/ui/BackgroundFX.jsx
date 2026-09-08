import { useId } from "react";
import { motion, useReducedMotion } from "framer-motion";

/* ============================================================
   Formas geométricas y fondos decorativos.
   Todo es puro CSS/SVG (cero imágenes) para que pese nada y
   escale perfecto en retina.
   ============================================================ */

/** Mancha de color difuminada. */
export function Blob({
  className = "",
  color = "var(--color-gold)",
  opacity = 0.22,
  size = 520,
  duration = 18,
  delay = 0,
  style,
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-[110px] ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 35% 35%, ${color} 0%, transparent 68%)`,
        opacity,
        /* Promover a capa propia: el desenfoque se rasteriza una sola vez
           y el navegador se limita a desplazar la textura. */
        willChange: "transform",
        ...style,
      }}
      animate={reduce ? undefined : { x: [0, 26, -18, 0], y: [0, -30, 16, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/** Cilindro 3D dibujado en SVG con degradados (sin imágenes). */
export function Cylinder({
  className = "",
  width = 120,
  height = 300,
  tone = "gold",
  float = true,
  duration = 9,
  delay = 0,
  style,
}) {
  const id = useId().replace(/:/g, "");
  const reduce = useReducedMotion();

  const palettes = {
    gold: ["#7a5416", "#f4d9a8", "#d6a354", "#5c3d0f", "#f7e4c2"],
    ink: ["#0d1119", "#39445a", "#1d2432", "#080a10", "#4a566e"],
    cream: ["#b9ac96", "#fdfaf3", "#eae0cf", "#a4967e", "#fffdf8"],
  };
  const [c1, c2, c3, c4, top] = palettes[tone] ?? palettes.gold;
  const ry = width * 0.22;

  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
      style={style}
      animate={reduce || !float ? undefined : { y: [0, -22, 0], rotate: [0, 1.6, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
        <defs>
          <linearGradient id={`body-${id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={c1} />
            <stop offset="22%" stopColor={c2} />
            <stop offset="52%" stopColor={c3} />
            <stop offset="100%" stopColor={c4} />
          </linearGradient>
          <linearGradient id={`cap-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={top} />
            <stop offset="100%" stopColor={c3} />
          </linearGradient>
        </defs>
        <path
          d={`M0 ${ry} V${height - ry} a ${width / 2} ${ry} 0 0 0 ${width} 0 V${ry} Z`}
          fill={`url(#body-${id})`}
        />
        <ellipse cx={width / 2} cy={ry} rx={width / 2} ry={ry} fill={`url(#cap-${id})`} />
        <ellipse
          cx={width / 2}
          cy={ry}
          rx={width / 2 - 1}
          ry={ry - 1}
          fill="none"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="0.8"
        />
      </svg>
    </motion.div>
  );
}

/** Esfera con luz especular. */
export function Sphere({
  className = "",
  size = 160,
  tone = "gold",
  duration = 11,
  delay = 0,
  style,
}) {
  const reduce = useReducedMotion();
  const fills = {
    gold: "radial-gradient(circle at 30% 26%, #ffeecb 0%, #e5b56a 26%, #b07c2c 62%, #4d3410 100%)",
    ink: "radial-gradient(circle at 30% 26%, #4b5670 0%, #222b3b 34%, #0e131c 72%, #05070b 100%)",
    cream: "radial-gradient(circle at 30% 26%, #ffffff 0%, #f0e8da 30%, #cfc2ab 68%, #8d8271 100%)",
  };
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${className}`}
      style={{
        width: size,
        height: size,
        background: fills[tone] ?? fills.gold,
        boxShadow: "0 40px 80px -30px rgba(0,0,0,0.75), inset 0 0 40px rgba(0,0,0,0.28)",
        willChange: "transform",
        ...style,
      }}
      animate={reduce ? undefined : { y: [0, -26, 0], x: [0, 10, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

/** Aro fino que gira muy despacio. */
export function Ring({ className = "", size = 320, duration = 46, style }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full border border-gold/22 ${className}`}
      style={{ width: size, height: size, ...style }}
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_16px_4px_rgba(214,163,84,0.6)]" />
    </motion.div>
  );
}

/** Rejilla de líneas verticales muy tenue. */
export function GridLines({ className = "", columns = 6, tone = "dark" }) {
  const color = tone === "dark" ? "bg-cream/[0.055]" : "bg-ink/[0.06]";
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 mx-auto flex max-w-[84rem] justify-between px-6 lg:px-12 ${className}`}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <span key={i} className={`h-full w-px ${color}`} />
      ))}
    </div>
  );
}

/** Onda decorativa para separar secciones. */
export function WaveDivider({ className = "", flip = false, color = "var(--color-cream)" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute left-0 w-full ${flip ? "rotate-180" : ""} ${className}`}
    >
      <path
        d="M0 64c160 40 320 56 480 40s320-64 480-72 240 16 320 32l160 32V120H0Z"
        fill={color}
      />
    </svg>
  );
}
