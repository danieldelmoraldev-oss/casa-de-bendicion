import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { EASE, Reveal, SplitHeading } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import CTAButton, { Arrow } from "../ui/Button";
import ImagePlaceholder from "../ui/Placeholder";
import { Blob, Cylinder, GridLines, Ring, Sphere } from "../ui/BackgroundFX";

/* ------------------------------------------------------------------ */
/* Tarjeta de horarios superpuesta al borde inferior del hero          */
/* ------------------------------------------------------------------ */
function ScheduleCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.1, delay: 1.15, ease: EASE }}
      className="shell absolute inset-x-0 bottom-0 z-30 translate-y-1/2"
    >
      <div className="relative overflow-hidden rounded-[26px] border border-cream/[0.09] bg-carbon/85 shadow-[0_50px_120px_-40px_rgba(0,0,0,0.95)] backdrop-blur-2xl md:rounded-[32px]">
        {/* Filo dorado superior */}
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
        <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-gold/14 blur-[80px]" />

        <div className="relative grid grid-cols-1 divide-y divide-cream/[0.07] md:grid-cols-[auto_1fr_1fr_auto] md:divide-x md:divide-y-0">
          {/* Etiqueta */}
          <div className="flex items-center gap-3 px-6 py-5 md:px-8">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-gold">
              Nos reunimos
            </span>
          </div>

          {/* Horarios */}
          {hero.schedule.map((s) => (
            <div
              key={s.day}
              className="group flex flex-col justify-center gap-1 px-6 py-5 transition-colors duration-500 hover:bg-cream/[0.03] md:px-8"
            >
              <div className="flex flex-wrap items-baseline gap-x-2.5">
                <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-cream">
                  {s.day}
                </span>
                <span className="h-1 w-1 rounded-full bg-gold/60" />
                <span className="display text-[19px] text-gold-soft">{s.time}</span>
              </div>
              <p className="text-[12.5px] text-mist">
                {s.label} · {s.place}
              </p>
            </div>
          ))}

          {/* Enlace */}
          <a
            href="#reuniones"
            className="group flex items-center justify-between gap-4 px-6 py-5 transition-colors duration-500 hover:bg-cream/[0.03] md:px-8"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/80 transition-colors group-hover:text-gold">
              Todas las reuniones
            </span>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-cream/15 text-cream transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
              <Arrow />
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Indicador de scroll                                                 */
/* ------------------------------------------------------------------ */
function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.6, duration: 1 }}
      className="hidden items-center gap-4 lg:flex"
    >
      <div className="relative h-14 w-px overflow-hidden bg-cream/15">
        <motion.span
          className="absolute inset-x-0 top-0 h-5 bg-gold"
          animate={{ y: ["-100%", "280%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-mist/60">
        Desliza
      </span>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
export default function Hero() {
  const ref = useRef(null);
  const { open } = useModal();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Parallax por capas: el fondo se mueve menos que el contenido */
  const yShapes = useTransform(scrollYProgress, [0, 1], [0, 190]);
  const yMedia = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    /* z-20 mantiene la tarjeta de horarios superpuesta sobre la sección crema */
    <section
      id="inicio"
      ref={ref}
      className="relative isolate z-20 flex min-h-[100svh] items-center pb-44 pt-32 lg:pb-56 lg:pt-40"
    >
      {/* ============ Capas de fondo ============ */}
      <div className="grain absolute inset-0 -z-10 overflow-hidden">
        {/* Base */}
        <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_75%_0%,#161d2b_0%,#0a0e16_45%,#06070b_100%)]" />
        <GridLines columns={7} />

        <motion.div style={{ y: yShapes }} className="absolute inset-0">
          <Blob className="-left-40 top-[-10%]" color="var(--color-gold)" opacity={0.2} size={620} />
          <Blob
            className="right-[-12%] top-[18%]"
            color="var(--color-violet)"
            opacity={0.17}
            size={560}
            duration={22}
            delay={2}
          />
          <Blob
            className="bottom-[-20%] left-[35%]"
            color="var(--color-ember)"
            opacity={0.12}
            size={480}
            duration={26}
            delay={4}
          />

          <Cylinder className="right-[6%] top-[8%] hidden opacity-90 xl:block" width={92} height={250} delay={0.4} />
          <Cylinder
            className="left-[4%] bottom-[6%] hidden opacity-70 2xl:block"
            width={64}
            height={170}
            tone="cream"
            duration={12}
            delay={1.2}
          />
          <Sphere className="left-[52%] top-[12%] hidden opacity-80 lg:block" size={110} delay={0.8} />
          <Ring className="-right-24 bottom-[-8%] hidden lg:block" size={420} />
        </motion.div>

        {/* Viñeta inferior para fundir con la siguiente sección */}
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      </div>

      {/* ============ Contenido ============ */}
      <div className="shell relative w-full">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* --- Columna de texto --- */}
          <motion.div style={{ y: yText, opacity: fade }} className="lg:col-span-7">
            <Eyebrow>{hero.eyebrow}</Eyebrow>

            <SplitHeading
              as="h1"
              mount
              lines={hero.title}
              italicLines={[1]}
              delay={0.25}
              className="display mt-7 text-[clamp(2.9rem,7.2vw,6.2rem)] text-cream"
            />

            <Reveal mount delay={0.75} className="mt-8 max-w-xl">
              <p className="text-[19px] leading-relaxed text-cream/85 sm:text-[21px]">
                {hero.lead}
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-mist">{hero.body}</p>
            </Reveal>

            <Reveal mount delay={0.95} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <CTAButton onClick={() => open("planifica-tu-visita")}>Planifica tu visita</CTAButton>
              <CTAButton variant="ghost" onClick={() => open("quiero-conectarme")}>
                Conéctate con nosotros
              </CTAButton>
            </Reveal>

            <div className="mt-14">
              <ScrollCue />
            </div>
          </motion.div>

          {/* --- Columna visual --- */}
          <motion.div
            style={{ y: yMedia }}
            className="relative hidden lg:col-span-5 lg:block"
          >
            <motion.div
              initial={{ opacity: 0, y: 70, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -2.2 }}
              transition={{ duration: 1.3, delay: 0.5, ease: EASE }}
              className="relative z-10"
            >
              <ImagePlaceholder
                label={hero.media.label}
                ratio="4/5"
                tone="dark"
                className="shadow-[0_60px_140px_-50px_rgba(0,0,0,1)]"
              />
              {/* Etiqueta flotante sobre la foto */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-8 bottom-16 z-20 rounded-2xl border border-cream/10 bg-carbon/90 px-5 py-4 shadow-2xl backdrop-blur-xl"
              >
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.24em] text-gold">
                  Próxima reunión
                </p>
                <p className="display mt-1.5 text-[22px] text-cream">Domingo · 3:00 PM</p>
                <p className="mt-0.5 text-[11.5px] text-mist">266 Riverdale Ave., Yonkers</p>
              </motion.div>
            </motion.div>

            {/* Marco decorativo desplazado */}
            <div className="absolute -right-6 -top-6 -z-0 h-full w-full rounded-[26px] border border-gold/20" />
          </motion.div>
        </div>
      </div>

      <ScheduleCard />
    </section>
  );
}
