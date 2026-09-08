import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { nav, brand, locations } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import useActiveSection from "../../hooks/useActiveSection";
import { EASE } from "../ui/Motion";
import { Arrow } from "../ui/Button";

/* ids observados para el indicador activo (constante: evita re-suscribir el observer) */
const SECTION_IDS = nav.map((n) => n.href.replace("#", ""));

/* ------------------------------------------------------------------ */
/* Monograma de marca                                                  */
/* ------------------------------------------------------------------ */
function Logo({ compact = false }) {
  return (
    <a href="#inicio" className="group flex items-center gap-3">
      <span className="relative grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-gold/45">
        <span className="absolute inset-0 bg-gradient-to-br from-gold/25 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="display relative text-[15px] leading-none text-gold">CB</span>
      </span>
      <span
        className={`flex flex-col leading-none transition-all duration-500 ${
          compact ? "lg:opacity-0 lg:-translate-x-2 lg:pointer-events-none" : ""
        }`}
      >
        <span className="display text-[15px] tracking-tight text-cream">{brand.name}</span>
        <span className="mt-1 text-[8.5px] font-semibold uppercase tracking-[0.26em] text-mist/70">
          Yonkers · Bronx, NY
        </span>
      </span>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Barra superior                                                      */
/* ------------------------------------------------------------------ */
export default function Navbar() {
  const { open } = useModal();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  const { scrollYProgress, scrollY } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  /* Bloqueo de scroll con el menú móvil abierto */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.15, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50"
      >
        {/* Fondo cristal que aparece al hacer scroll */}
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 border-b border-cream/[0.07] bg-ink/70 backdrop-blur-xl"
          initial={false}
          animate={{ opacity: scrolled ? 1 : 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        />

        <nav className="shell relative flex h-20 items-center justify-between lg:h-[88px]">
          <Logo />

          {/* Enlaces (desktop) */}
          <ul className="hidden items-center gap-1 xl:flex">
            {nav.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={item.href} className="relative">
                  <a
                    href={item.href}
                    className={`relative block px-3.5 py-2 text-[12.5px] font-medium tracking-tight transition-colors duration-300 ${
                      isActive ? "text-cream" : "text-mist hover:text-cream"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-cream/[0.07] ring-1 ring-inset ring-cream/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => open("planifica-tu-visita")}
              className="group hidden cursor-pointer items-center gap-2.5 rounded-full bg-cream px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-500 hover:bg-gold md:inline-flex"
            >
              Planifica tu visita
              <Arrow className="transition-transform duration-500 group-hover:translate-x-0.5" />
            </button>

            {/* Hamburguesa */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              className="relative z-[60] flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-[5px] rounded-full border border-cream/12 transition-colors duration-300 hover:border-gold/50 xl:hidden"
            >
              <motion.span
                animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="block h-px w-4 bg-cream"
              />
              <motion.span
                animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.35, ease: EASE }}
                className="block h-px w-4 bg-cream"
              />
            </button>
          </div>
        </nav>

        {/* Barra de progreso de lectura */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="h-px origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-soft"
        />
      </motion.header>

      {/* ---------------- Menú móvil a pantalla completa ---------------- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[55] xl:hidden"
          >
            <motion.div
              initial={{ clipPath: "circle(0% at 92% 44px)" }}
              animate={{ clipPath: "circle(150% at 92% 44px)" }}
              exit={{ clipPath: "circle(0% at 92% 44px)" }}
              transition={{ duration: 0.75, ease: EASE }}
              className="grain absolute inset-0 bg-night"
            >
              <div className="absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-gold/12 blur-[100px]" />
              <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-violet/12 blur-[110px]" />
            </motion.div>

            <div className="relative flex h-full flex-col justify-between px-6 pb-10 pt-28 sm:px-10">
              <motion.ul
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.055, delayChildren: 0.25 } },
                }}
                className="flex flex-col gap-1"
              >
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 26 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="group flex items-baseline gap-4 py-2"
                    >
                      <span className="w-6 text-[10px] font-semibold tracking-[0.2em] text-gold/60">
                        0{i + 1}
                      </span>
                      <span className="display text-[clamp(2rem,9vw,3.2rem)] text-cream transition-colors duration-300 group-hover:text-gold">
                        {item.label}
                      </span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
                className="border-t border-cream/10 pt-6"
              >
                <div className="grid grid-cols-2 gap-4">
                  {locations.map((l) => (
                    <div key={l.city}>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-gold">
                        {l.city}
                      </p>
                      <p className="mt-1.5 text-[13px] leading-snug text-mist">
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
                  className="mt-7 flex w-full cursor-pointer items-center justify-center gap-3 rounded-full bg-gold py-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink"
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
