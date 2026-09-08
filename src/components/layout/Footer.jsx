import { motion } from "framer-motion";
import { brand, locations, nav, socials, weeklySchedule } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { Reveal } from "../ui/Motion";
import { SocialIcon, PinIcon } from "../ui/Icons";

/* TODO: sustituir "#" por las URLs reales de cada red / mailto / tel */
const socialHref = "#";

function ColumnTitle({ children }) {
  return (
    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">{children}</p>
  );
}

export default function Footer() {
  const { open } = useModal();

  return (
    <footer className="relative isolate overflow-hidden border-t border-cream/[0.07] bg-ink pt-20 lg:pt-28">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-64 w-[760px] -translate-x-1/2 rounded-full bg-gold/[0.08] blur-[130px]" />
      </div>

      <div className="shell">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* ---------------- Marca ---------------- */}
          <div className="lg:col-span-4">
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-gold/45">
                  <span className="display text-[16px] leading-none text-gold">CB</span>
                </span>
                <span className="display text-[17px] text-cream">{brand.name}</span>
              </div>
              <p className="display mt-6 max-w-[22ch] text-[22px] leading-tight text-cream/70">
                {brand.tagline}
              </p>

              {/* Redes */}
              <div className="mt-8 flex flex-wrap gap-2.5">
                {socials.map((s) => (
                  <motion.a
                    key={s}
                    href={socialHref}
                    aria-label={s}
                    title={s}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="grid h-10 w-10 place-items-center rounded-full border border-cream/12 text-mist transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    <SocialIcon name={s} />
                  </motion.a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* ---------------- Visítanos ---------------- */}
          <div className="lg:col-span-3">
            <Reveal delay={0.05}>
              <ColumnTitle>Visítanos</ColumnTitle>
              <ul className="mt-6 space-y-6">
                {locations.map((l) => (
                  <li key={l.city}>
                    <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-cream">
                      <PinIcon className="h-3.5 w-3.5 text-gold/70" />
                      {l.city}
                    </p>
                    <p className="mt-2 pl-[22px] text-[13.5px] leading-relaxed text-mist">
                      {l.street}
                      <br />
                      {l.region}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ---------------- Reuniones ---------------- */}
          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <ColumnTitle>Reuniones</ColumnTitle>
              <ul className="mt-6 space-y-4">
                {weeklySchedule.map((m) => (
                  <li key={`${m.day}-${m.time}`} className="group">
                    <p className="flex flex-wrap items-baseline gap-x-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-cream/85">
                      {m.day}
                      <span className="h-1 w-1 rounded-full bg-gold/60" />
                      <span className="text-gold-soft">{m.time}</span>
                    </p>
                    <p className="mt-1 text-[12.5px] leading-snug text-mist">
                      {m.name}
                      <span className="text-mist/50"> · {m.place}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* ---------------- Navegación ---------------- */}
          <div className="lg:col-span-2">
            <Reveal delay={0.15}>
              <ColumnTitle>Navegación</ColumnTitle>
              <ul className="mt-6 space-y-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-[13.5px] text-mist transition-colors duration-300 hover:text-cream"
                    >
                      <span className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-3" />
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => open("planifica-tu-visita")}
                    className="group inline-flex cursor-pointer items-center gap-2 text-[13.5px] text-gold transition-colors duration-300 hover:text-gold-soft"
                  >
                    <span className="h-px w-0 bg-gold transition-all duration-500 group-hover:w-3" />
                    Planifica tu visita
                  </button>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>

        {/* ---------------- Barra inferior ---------------- */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cream/[0.07] py-8 sm:flex-row lg:mt-20">
          <p className="text-[11.5px] text-mist/60">
            © {brand.year} {brand.name}. Todos los derechos reservados.
          </p>
          <a
            href="#inicio"
            className="group inline-flex items-center gap-2.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-mist/60 transition-colors duration-300 hover:text-gold"
          >
            Volver arriba
            <span className="grid h-8 w-8 place-items-center rounded-full border border-cream/12 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <path
                  d="M12 19V5.5M5.5 12 12 5.5 18.5 12"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
