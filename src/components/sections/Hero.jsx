import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { EASE, Reveal, SplitHeading } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import CTAButton, { Arrow } from "../ui/Button";
import { ArcEdge, ArcDivider, FlameWatermark } from "../ui/Decor";
import { ClockIcon, PinIcon } from "../ui/Icons";

/* ------------------------------------------------------------------ */
/* Barra inferior con los horarios — equivale a la franja de accesos   */
/* rápidos del mockup del manual (pág. 32)                             */
/* ------------------------------------------------------------------ */
function ScheduleBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1, ease: EASE }}
      className="relative z-20 border-t border-line bg-white"
    >
      <div className="shell">
        <div className="grid grid-cols-1 divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {hero.schedule.map((s) => (
            <div key={s.day} className="group flex items-center gap-4 py-6 md:pr-8 md:first:pl-0">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-white transition-colors duration-400 group-hover:bg-gold group-hover:text-navy">
                <ClockIcon className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <p className="label text-[10.5px] text-gold-deep">
                  {s.day} · {s.time}
                </p>
                <p className="mt-1 truncate text-[14.5px] font-semibold text-navy">{s.label}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-[12.5px] text-stone">
                  <PinIcon className="h-3 w-3 shrink-0 text-gold-deep" />
                  {s.place}
                </p>
              </div>
            </div>
          ))}

          <a href="#reuniones" className="group flex items-center justify-between gap-4 py-6 md:pl-8">
            <div>
              <p className="label text-[10.5px] text-gold-deep">Toda la semana</p>
              <p className="mt-1 text-[14.5px] font-semibold text-navy transition-colors duration-300 group-hover:text-gold-deep">
                Ver todas las reuniones
              </p>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-navy/15 text-navy transition-all duration-400 group-hover:border-gold group-hover:bg-gold">
              <Arrow />
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
export default function Hero() {
  const ref = useRef(null);
  const { open } = useModal();

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const scalePhoto = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section id="inicio" ref={ref} className="relative isolate bg-navy pt-[74px] lg:pt-[86px]">
      <div className="relative flex flex-col lg:grid lg:grid-cols-[57fr_43fr] lg:items-stretch">
        {/* ---------------- Fotografía ---------------- */}
        <div className="relative order-1 h-[42vh] min-h-[280px] overflow-hidden lg:order-2 lg:h-auto lg:min-h-[640px]">
          <motion.img
            src="/congregacion.jpg"
            alt="La congregación de Casa de Bendición durante una reunión"
            style={{ y: yPhoto, scale: scalePhoto }}
            className="absolute inset-0 h-full w-full object-cover object-center"
            fetchPriority="high"
          />
          {/* Velo azul para unificar la foto con la identidad */}
          <div className="absolute inset-0 bg-navy/25 mix-blend-multiply" />
          {/* Curva de transición en móvil */}
          <ArcDivider to="navy" position="bottom" height={70} className="lg:hidden" />
        </div>

        {/* ---------------- Panel azul ---------------- */}
        <div className="relative order-2 flex items-center bg-navy py-16 lg:order-1 lg:py-28">
          <FlameWatermark
            className="-left-16 top-4 text-white"
            size={420}
            opacity={0.045}
            duration={16}
          />

          {/* Borde curvo hacia la fotografía (desktop) */}
          <ArcEdge
            fill="navy"
            width={130}
            className="right-0 z-10 hidden translate-x-[calc(100%-1px)] lg:block"
          />

          <div className="relative z-20 w-full pl-6 pr-6 lg:pl-[max(3rem,calc((100vw-82rem)/2+3rem))] lg:pr-16">
            <div className="max-w-2xl">
              <Eyebrow theme="navy">{hero.eyebrow}</Eyebrow>

              <SplitHeading
                as="h1"
                mount
                lines={hero.title}
                accentLines={[1]}
                delay={0.2}
                className="display mt-6 text-[clamp(2.3rem,4.6vw,4rem)] text-white"
              />

              <Reveal mount delay={0.7} className="mt-7">
                <p className="text-[18px] font-medium leading-relaxed text-white/90 sm:text-[20px]">
                  {hero.lead}
                </p>
                <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-navy-mist">
                  {hero.body}
                </p>
              </Reveal>

              <Reveal
                mount
                delay={0.85}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                <CTAButton onClick={() => open("planifica-tu-visita")}>
                  Planifica tu visita
                </CTAButton>
                <CTAButton variant="light" onClick={() => open("quiero-conectarme")}>
                  Conéctate con nosotros
                </CTAButton>
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      <ScheduleBar />
    </section>
  );
}
