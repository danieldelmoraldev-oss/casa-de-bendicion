import { motion } from "framer-motion";
import { useModal } from "../../context/ModalContext";

export function Arrow({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className={`h-3.5 w-3.5 shrink-0 ${className}`}
    >
      <path
        d="M5 12h13M12 5.5 18.5 12 12 18.5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full " +
  "whitespace-nowrap px-7 py-3.5 text-[11.5px] font-semibold uppercase tracking-[0.16em] " +
  "transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 " +
  "focus-visible:outline-gold cursor-pointer select-none";

const variants = {
  /* Relleno dorado — acción principal */
  primary: "bg-gold text-ink hover:bg-gold-soft shadow-[0_10px_40px_-12px_rgba(214,163,84,0.65)]",
  /* Contorno sobre fondo oscuro */
  ghost: "border border-cream/18 text-cream/85 hover:text-ink hover:border-transparent",
  /* Contorno sobre fondo claro */
  outline: "border border-ink/15 text-ink/80 hover:text-cream hover:border-transparent",
  /* Relleno oscuro sobre fondo claro */
  dark: "bg-ink text-cream hover:bg-carbon",
};

/** Fondo que sube al hacer hover en las variantes de contorno. */
function Fill({ tone }) {
  return (
    <span
      className={`absolute inset-0 -z-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 ${tone}`}
    />
  );
}

export default function CTAButton({
  children,
  variant = "primary",
  href,
  onClick,
  icon = true,
  className = "",
  ...rest
}) {
  const isOutline = variant === "ghost" || variant === "outline";
  const Comp = href ? motion.a : motion.button;

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
      {isOutline && <Fill tone={variant === "ghost" ? "bg-gold" : "bg-ink"} />}
      {variant === "primary" && (
        /* Barrido de brillo */
        <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/45 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
      )}
      <span className="relative z-10">{children}</span>
      {icon && (
        <span className="relative z-10 overflow-hidden">
          <Arrow className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
        </span>
      )}
    </Comp>
  );
}

/**
 * Par de CTA que se repite al final de cada sección del documento:
 * [PLANIFICA TU VISITA] [CONÉCTATE CON NOSOTROS]
 */
export function DualCTA({ theme = "dark", align = "left", className = "" }) {
  const { open } = useModal();
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-center ${
        align === "center" ? "sm:justify-center" : ""
      } ${className}`}
    >
      <CTAButton onClick={() => open("planifica-tu-visita")}>Planifica tu visita</CTAButton>
      <CTAButton
        variant={theme === "dark" ? "ghost" : "outline"}
        onClick={() => open("quiero-conectarme")}
      >
        Conéctate con nosotros
      </CTAButton>
    </div>
  );
}
