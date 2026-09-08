import { motion } from "framer-motion";

/* ============================================================
   Primitivas de animación reutilizables (Framer Motion)
   Todas usan whileInView con `once` para no re-disparar y no
   penalizar el scroll.
   ============================================================ */

export const EASE = [0.16, 1, 0.3, 1];

const viewportDefault = { once: true, margin: "-90px 0px -90px 0px" };

/**
 * Aparición simple hacia arriba (o desde el lado indicado).
 * `mount`: dispara al montar en lugar de al entrar en pantalla.
 * Imprescindible en el hero: en pantallas cortas su contenido queda
 * por debajo del pliegue y nunca llegaría a revelarse.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.9,
  y = 30,
  x = 0,
  blur = true,
  mount = false,
  className = "",
  as = "div",
  ...rest
}) {
  const Tag = motion[as] ?? motion.div;
  const shown = { opacity: 1, y: 0, x: 0, filter: "blur(0px)" };
  const trigger = mount
    ? { animate: shown }
    : { whileInView: shown, viewport: viewportDefault };

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x, filter: blur ? "blur(8px)" : "none" }}
      {...trigger}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Contenedor que escalona a sus hijos <StaggerItem/>. */
export function Stagger({ children, className = "", delay = 0, step = 0.09, ...rest }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewportDefault}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: step, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 34, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.85, ease: EASE } },
};

export function StaggerItem({ children, className = "", as = "div", ...rest }) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag className={className} variants={staggerItemVariants} {...rest}>
      {children}
    </Tag>
  );
}

/**
 * Titular con revelado palabra a palabra usando máscara.
 * `lines` puede ser un string o un array de strings (una línea por entrada).
 * Se puede resaltar una línea con el degradado dorado pasando `accentLines={[1]}`.
 */
export function SplitHeading({
  lines,
  className = "",
  accentLines = [],
  delay = 0,
  step = 0.055,
  mount = false,
  as = "h2",
}) {
  const arr = Array.isArray(lines) ? lines : [lines];
  const Tag = motion[as] ?? motion.h2;
  const trigger = mount
    ? { animate: "show" }
    : { whileInView: "show", viewport: viewportDefault };
  let wordIndex = 0;

  return (
    <Tag
      className={className}
      initial="hidden"
      {...trigger}
      variants={{ hidden: {}, show: { transition: { delayChildren: delay } } }}
    >
      {arr.map((line, li) => (
        <span key={li} className="block">
          {line.split(" ").map((word) => {
            const i = wordIndex++;
            return (
              <span
                key={`${li}-${i}`}
                className="mr-[0.25em] inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]"
              >
                <motion.span
                  className={`inline-block ${
                    accentLines.includes(li) ? "text-gold-gradient" : ""
                  }`}
                  variants={{
                    hidden: { y: "115%", opacity: 0 },
                    show: {
                      y: "0%",
                      opacity: 1,
                      transition: { duration: 1, delay: i * step, ease: EASE },
                    },
                  }}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

/** Línea horizontal que se dibuja al entrar en pantalla. */
export function DrawLine({ className = "", delay = 0, duration = 1.2, origin = "left" }) {
  return (
    <motion.div
      className={className}
      style={{ transformOrigin: origin }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={viewportDefault}
      transition={{ duration, delay, ease: EASE }}
    />
  );
}
