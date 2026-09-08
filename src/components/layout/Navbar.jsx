import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { nav, locations } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import useActiveSection from "../../hooks/useActiveSection";
import { EASE } from "../ui/Motion";
import { Arrow } from "../ui/Button";
import Logo from "../ui/Logo";
import { Flame } from "../ui/Decor";

const SECTION_IDS = nav.map((n) => n.href.replace("#", ""));

/**
 * Barra de navegación.
 * El manual (pág. 32) pide la versión positiva horizontal del
 * identificador sobre fondo blanco o claro, así que la barra es
 * sólida desde el inicio: el logo nunca queda sobre la fotografía,
 * uso que la pág. 21 prohíbe expresamente.
 */
export default function Navbar() {
  const { open } = useModal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 30));

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 bg-white"
      >
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 shadow-[0_1px_24px_-6px_rgba(28,54,97,0.18)]"
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.4, ease: EASE }}
        />

        <nav className="shell relative flex h-[74px] items-center justify-between lg:h-[86px]">
          <a href="#inicio" aria-label="Casa de Bendición · Inicio" className="shrink-0">
            <Logo version="horizontal" className="h-9 lg:h-11" priority />
          </a>

          {/* Enlaces (desktop) */}
          <ul className="hidden items-center gap-0.5 xl:flex">
            {nav.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    className={`relative block px-3.5 py-2 text-[13px] font-semibold transition-colors duration-300 ${
                      isActive ? "text-navy" : "text-navy/55 hover:text-navy"
                    }`}
                  >
                    {item.label}
                    {/* Indicador activo en dorado — pág. 32 */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="rule-gold absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => open("planifica-tu-visita")}
              className="group hidden cursor-pointer items-center gap-2.5 rounded-md gradient-gold px-5 py-3 text-[11.5px] font-bold uppercase tracking-[0.14em] text-navy transition-all duration-400 hover:shadow-[0_10px_24px_-10px_rgba(208,142,8,0.9)] md:inline-flex"
            >
              Visítanos
              <Arrow className="transition-transform duration-400 group-hover:translate-x-0.5" />
            </button>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              className="relative z-[60] flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-md border border-navy/15 transition-colors duration-300 hover:border-navy/40 xl:hidden"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="block h-[2px] w-4 rounded-full bg-navy"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="block h-[2px] w-4 rounded-full bg-navy"
              />
            </button>
          </div>
        </nav>

        {/* Progreso de lectura en degradado institucional */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="gradient-gold h-[3px] origin-left"
        />
      </motion.header>

      {/* ---------------- Menú móvil ---------------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[55] xl:hidden"
          >
            <motion.div
              initial={{ clipPath: "circle(0% at 92% 40px)" }}
              animate={{ clipPath: "circle(150% at 92% 40px)" }}
              exit={{ clipPath: "circle(0% at 92% 40px)" }}
              transition={{ duration: 0.7, ease: EASE }}
              className="absolute inset-0 overflow-hidden bg-navy"
            >
              <Flame className="absolute -right-16 top-1/4 h-[420px] w-auto text-white/[0.04]" />
            </motion.div>

            <div className="relative flex h-full flex-col justify-between overflow-y-auto px-6 pb-10 pt-28 sm:px-10">
              <motion.ul
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05, delayChildren: 0.2 } },
                }}
                className="flex flex-col"
              >
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 22 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline gap-4 border-b border-white/10 py-3.5"
                    >
                      <span className="w-6 text-[10px] font-bold tracking-[0.18em] text-gold-light">
                        0{i + 1}
                      </span>
                      <span className="display text-[clamp(1.6rem,7vw,2.4rem)] text-white transition-colors duration-300 group-hover:text-gold-light">
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6, ease: EASE }}
                className="mt-10"
              >
                <div className="grid grid-cols-2 gap-4">
                  {locations.map((l) => (
                    <div key={l.city}>
                      <p className="label text-[10px] text-gold-light">{l.city}</p>
                      <p className="mt-1.5 text-[13px] leading-snug text-navy-mist">
                        {l.street}
                        <br />
                        {l.region}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    open("planifica-tu-visita");
                  }}
                  className="gradient-gold mt-7 flex w-full cursor-pointer items-center justify-center gap-3 rounded-md py-4 text-[12px] font-bold uppercase tracking-[0.14em] text-navy"
                >
                  Planifica tu visita <Arrow />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
