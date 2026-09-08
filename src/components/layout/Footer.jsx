import { motion } from "framer-motion";
import { brand, locations, nav, socials, weeklySchedule } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { Reveal } from "../ui/Motion";
import Logo from "../ui/Logo";
import { FlameWatermark } from "../ui/Decor";
import { SocialIcon, PinIcon } from "../ui/Icons";

/* TODO: sustituir "#" por las URLs reales de cada red / mailto / tel */
const socialHref = "#";

function ColumnTitle({ children }) {
  return <p className="label text-[10px] text-gold-light">{children}</p>;
}

export default function Footer() {
  const { open } = useModal();

  return (
    <footer className="relative isolate overflow-hidden bg-navy pt-20 lg:pt-28">
      <FlameWatermark className="-left-20 top-4 text-white" size={400} opacity={0.035} />
      {/* Filete dorado superior: cierra el sistema */}
      <span aria-hidden="true" className="gradient-gold absolute inset-x-0 top-0 h-[4px]" />

      <div className="shell relative">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10">
          {/* Marca */}
          <div className="lg:col-span-4">
            <Reveal>
              {/* Versión negativa: fondo oscuro (pág. 10) */}
              <Logo version="horizontal" tone="negative" className="h-12" />
              <p className="mt-7 max-w-[24ch] text-[19px] font-semibold leading-snug text-white/80">
                {brand.tagline}
              </p>

              <div className="mt-8 flex flex-wrap gap-2.5">
                {socials.map((s) => (
                  <motion.a
                    key={s}
                    href={socialHref}
                    aria-label={s}
                    title={s}
                    whileHover={{ y: -3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 22 }}
                    className="grid h-10 w-10 place-items-center rounded-md border border-white/15 text-navy-mist transition-colors duration-400 hover:border-gold hover:bg-gold hover:text-navy"
                  >
                    <SocialIcon name={s} />
                  </motion.a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Visítanos */}
          <div className="lg:col-span-3">
            <Reveal delay={0.05}>
              <ColumnTitle>Visítanos</ColumnTitle>
              <ul className="mt-6 space-y-6">
                {locations.map((l) => (
                  <li key={l.city}>
                    <p className="label flex items-center gap-2 text-[11px] text-white">
                      <PinIcon className="h-3.5 w-3.5 text-gold-light" />
                      {l.city}
                    </p>
                    <p className="mt-2 pl-[22px] text-[13.5px] leading-relaxed text-navy-mist">
                      {l.street}
                      <br />
                      {l.region}
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Reuniones */}
          <div className="lg:col-span-3">
            <Reveal delay={0.1}>
              <ColumnTitle>Reuniones</ColumnTitle>
              <ul className="mt-6 space-y-4">
                {weeklySchedule.map((m) => (
                  <li key={`${m.day}-${m.time}`}>
                    <p className="label flex flex-wrap items-baseline gap-x-2 text-[10.5px] text-white/85">
                      {m.day}
                      <span className="h-1 w-1 rounded-full bg-gold" />
                      <span className="text-gold-light">{m.time}</span>
                    </p>
                    <p className="mt-1 text-[12.5px] leading-snug text-navy-mist">
                      {m.name}
                      <span className="text-navy-mist/60"> · {m.place}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Navegación */}
          <div className="lg:col-span-2">
            <Reveal delay={0.15}>
              <ColumnTitle>Navegación</ColumnTitle>
              <ul className="mt-6 space-y-2.5">
                {nav.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center gap-2 text-[13.5px] text-navy-mist transition-colors duration-300 hover:text-white"
                    >
                      <span className="gradient-gold h-[2px] w-0 rounded-full transition-all duration-400 group-hover:w-3" />
                      {item.label}
                    </a>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => open("planifica-tu-visita")}
                    className="group inline-flex cursor-pointer items-center gap-2 text-[13.5px] font-semibold text-gold-light transition-colors duration-300 hover:text-white"
                  >
                    <span className="gradient-gold h-[2px] w-0 rounded-full transition-all duration-400 group-hover:w-3" />
                    Planifica tu visita
                  </button>
                </li>
              </ul>
            </Reveal>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/12 py-8 sm:flex-row lg:mt-20">
          <p className="text-[12px] text-navy-mist/70">
            © {brand.year} {brand.name}. Todos los derechos reservados.
          </p>
          <a
            href="#inicio"
            className="group label inline-flex items-center gap-2.5 text-[10px] text-navy-mist/70 transition-colors duration-300 hover:text-gold-light"
          >
            Volver arriba
            <span className="grid h-8 w-8 place-items-center rounded-md border border-white/15 transition-all duration-400 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
              <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
                <path
                  d="M12 19V5.5M5.5 12 12 5.5 18.5 12"
                  stroke="currentColor"
                  strokeWidth="2"
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
