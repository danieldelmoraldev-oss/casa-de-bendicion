import { motion } from "framer-motion";
import { useModal } from "../../context/ModalContext";

export function Arrow({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={`h-3.5 w-3.5 shrink-0 ${className}`}>
      <path
        d="M5 12h13M12 5.5 18.5 12 12 18.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* El manual (pág. 32) reserva el dorado para "botones, enlaces,
   indicadores activos y llamadas a la acción". De ahí que sólo la
   acción principal sea dorada y el resto se resuelva en azul.

   Nota de accesibilidad: el mockup del manual usa texto blanco
   sobre dorado (contraste 2.8:1, insuficiente). Aquí el texto va
   en azul institucional sobre el degradado dorado oficial, que da
   entre 4.3:1 y 5.9:1 y sí cumple. Se conserva el color de marca,
   cambia sólo el color del texto. */
const base =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-md " +
  "whitespace-nowrap px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] " +
  "transition-colors duration-400 cursor-pointer select-none " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-gold";

const variants = {
  /* Acción principal — degradado institucional */
  primary: "gradient-gold text-navy shadow-[0_10px_28px_-12px_rgba(208,142,8,0.75)]",
  /* Acción secundaria sobre fondo claro */
  navy: "bg-navy text-white hover:bg-navy-deep",
  outline: "border-2 border-navy/25 text-navy hover:border-navy",
  /* Acción secundaria sobre fondo azul */
  light: "border-2 border-white/30 text-white hover:border-white",
};

export default function CTAButton({
  children,
  variant = "primary",
  href,
  onClick,
  icon = true,
  className = "",
  ...rest
}) {
  const Comp = href ? motion.a : motion.button;
  const isOutline = variant === "outline" || variant === "light";

  return (
    <Comp
      href={href}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.985 }}
      transition={{ type: "spring", stiffness: 400, damping: 26 }}
      className={`${base} ${variants[variant]} ${className}`}
      {...rest}
    >
      {isOutline && (
        /* Relleno que sube al pasar el ratón */
        <span
          className={`absolute inset-0 -z-0 origin-bottom scale-y-0 transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 ${
            variant === "outline" ? "bg-navy" : "bg-white"
          }`}
        />
      )}
      {variant === "primary" && (
        <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-[850ms] ease-out group-hover:translate-x-full" />
      )}
      <span
        className={`relative z-10 ${
          variant === "outline"
            ? "transition-colors duration-400 group-hover:text-white"
            : variant === "light"
              ? "transition-colors duration-400 group-hover:text-navy"
              : ""
        }`}
      >
        {children}
      </span>
      {icon && (
        <span
          className={`relative z-10 ${
            variant === "outline"
              ? "transition-colors duration-400 group-hover:text-white"
              : variant === "light"
                ? "transition-colors duration-400 group-hover:text-navy"
                : ""
          }`}
        >
          <Arrow className="transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
        </span>
      )}
    </Comp>
  );
}

/** Par de CTA que cierra cada sección del documento de contenido. */
export function DualCTA({ theme = "light", align = "left", className = "" }) {
  const { open } = useModal();
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-center ${
        align === "center" ? "sm:justify-center" : ""
      } ${className}`}
    >
      <CTAButton onClick={() => open("planifica-tu-visita")}>Planifica tu visita</CTAButton>
      <CTAButton
        variant={theme === "navy" ? "light" : "outline"}
        onClick={() => open("quiero-conectarme")}
      >
        Conéctate con nosotros
      </CTAButton>
    </div>
  );
}
