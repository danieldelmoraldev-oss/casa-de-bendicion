import { motion } from "framer-motion";
import { EASE } from "./Motion";

/**
 * Etiqueta superior de sección: filete dorado + texto en versalitas.
 * theme: "light" (sobre blanco/marfil) | "navy" (sobre azul institucional)
 */
export default function Eyebrow({ children, theme = "light", align = "left", className = "" }) {
  const text = theme === "navy" ? "text-gold-light" : "text-gold-deep";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE }}
      className={`flex items-center gap-3.5 ${align === "center" ? "justify-center" : ""} ${className}`}
    >
      <motion.span
        aria-hidden="true"
        className="rule-gold h-[3px] shrink-0 rounded-full"
        initial={{ width: 0 }}
        whileInView={{ width: 32 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
      />
      <span className={`label text-[11px] ${text} whitespace-nowrap`}>{children}</span>
    </motion.div>
  );
}
