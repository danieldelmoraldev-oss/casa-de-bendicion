import { motion } from "framer-motion";
import { EASE } from "./Motion";

/**
 * Etiqueta superior de sección: punto + línea + texto en versalitas.
 * theme: "dark" (sobre fondo oscuro) | "light" (sobre crema)
 */
export default function Eyebrow({ children, theme = "dark", align = "left", className = "" }) {
  const text = theme === "dark" ? "text-gold" : "text-gold-deep";
  const line = theme === "dark" ? "bg-gold/45" : "bg-gold-deep/40";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`flex items-center gap-3 ${
        align === "center" ? "justify-center" : ""
      } ${className}`}
    >
      <span className={`relative flex h-1.5 w-1.5 shrink-0 rounded-full ${text.replace("text-", "bg-")}`}>
        <span
          className={`absolute inset-0 animate-ping rounded-full ${text.replace("text-", "bg-")} opacity-60`}
        />
      </span>
      <motion.span
        className={`h-px ${line}`}
        initial={{ width: 0 }}
        whileInView={{ width: 28 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
      />
      <span
        className={`text-[11px] font-semibold uppercase tracking-[0.28em] ${text} whitespace-nowrap`}
      >
        {children}
      </span>
    </motion.div>
  );
}
