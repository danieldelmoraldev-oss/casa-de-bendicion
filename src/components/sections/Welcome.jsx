import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { welcome } from "../../data/site";
import { EASE, DrawLine, Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA } from "../ui/Button";
import ImagePlaceholder from "../ui/Placeholder";

export default function Welcome() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  /* Parallax suave entre las dos fotos: rompe la cuadrícula al hacer scroll */
  const yMain = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yInset = useTransform(scrollYProgress, [0, 1], [-30, 70]);
  const rotBadge = useTransform(scrollYProgress, [0, 1], [-8, -2]);
  const yGhost = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <section
      id="bienvenida"
      ref={ref}
      className="relative isolate overflow-hidden bg-cream pb-28 pt-[clamp(9rem,17vw,15rem)] text-ink lg:pb-40"
    >
      {/* Fondos decorativos claros */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-gold/12 blur-[120px]" />
        <div className="absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-ember/[0.07] blur-[110px]" />
        <div className="dot-grid absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(70%_50%_at_50%_40%,black,transparent)]" />
      </div>

      {/* Palabra fantasma de fondo */}
      <motion.p
        aria-hidden="true"
        style={{ y: yGhost }}
        className="display pointer-events-none absolute top-10 left-1/2 -z-10 -translate-x-1/2 whitespace-nowrap text-[clamp(5rem,15vw,12rem)] leading-none text-ink/[0.04] lg:top-16"
      >
        Bienvenido
      </motion.p>

      <div className="shell">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-12 lg:gap-14">
          {/* ---------------- Visual (cluster superpuesto) ---------------- */}
          <div className="relative lg:col-span-6">
            <motion.div style={{ y: yMain }} className="relative">
              <Reveal y={50} duration={1.1}>
                <ImagePlaceholder
                  label={welcome.media.main}
                  tone="light"
                  ratio="4/5"
                  className="shadow-[0_50px_120px_-50px_rgba(20,16,10,0.55)]"
                />
              </Reveal>

              {/* Aro fino desplazado */}
              <div className="pointer-events-none absolute -left-7 -top-7 h-full w-full rounded-[26px] border border-gold-deep/25" />
            </motion.div>

            {/* Foto secundaria montada sobre la principal */}
            <motion.div
              style={{ y: yInset }}
              className="absolute -bottom-16 -right-4 z-20 w-[58%] sm:-right-10 sm:w-[52%]"
            >
              <Reveal y={60} delay={0.25} duration={1.1}>
                <div className="rounded-[22px] bg-cream p-2 shadow-[0_40px_90px_-40px_rgba(20,16,10,0.6)]">
                  <ImagePlaceholder
                    label={welcome.media.inset}
                    tone="light"
                    ratio="4/3"
                    rounded="rounded-[16px]"
                  />
                </div>
              </Reveal>
            </motion.div>

            {/* Insignia flotante */}
            <motion.div
              style={{ rotate: rotBadge }}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.9, delay: 0.5, ease: EASE }}
              className="absolute -left-3 top-10 z-20 rounded-2xl border border-ink/[0.08] bg-cream/95 px-5 py-4 shadow-[0_24px_60px_-25px_rgba(20,16,10,0.5)] backdrop-blur-sm sm:-left-8"
            >
              <p className="text-[9.5px] font-semibold uppercase tracking-[0.24em] text-gold-deep">
                Todos son bienvenidos
              </p>
              <p className="display mt-1 text-[20px] leading-tight text-ink">
                Ven como eres
              </p>
            </motion.div>
          </div>

          {/* ---------------- Texto ---------------- */}
          <div className="lg:col-span-6 lg:pl-8 xl:pl-16">
            <Eyebrow theme="light">{welcome.eyebrow}</Eyebrow>

            <SplitHeading
              lines={welcome.title}
              italicLines={[1]}
              delay={0.1}
              className="display mt-6 text-[clamp(2.6rem,5.6vw,4.6rem)] text-ink"
            />

            <Reveal delay={0.2} className="mt-7 space-y-5">
              {welcome.paragraphs.map((p, i) => (
                <p key={i} className="max-w-[46ch] text-[16.5px] leading-[1.75] text-ink/65">
                  {p}
                </p>
              ))}
            </Reveal>

            {/* Cita destacada */}
            <Reveal delay={0.3} className="relative mt-9 pl-6">
              <DrawLine
                className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-[2px] origin-top bg-gradient-to-b from-gold to-gold-deep/30"
                origin="top"
              />
              <p className="display max-w-[38ch] text-[22px] leading-snug text-ink sm:text-[25px]">
                {welcome.highlight}
              </p>
            </Reveal>

            {/* Pilares */}
            <Stagger delay={0.15} className="mt-11 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
              {welcome.pillars.map((p, i) => (
                <StaggerItem key={p} className="group flex items-center gap-3.5">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-deep/25 text-[10px] font-semibold text-gold-deep transition-colors duration-500 group-hover:border-gold-deep group-hover:bg-gold-deep group-hover:text-cream">
                    0{i + 1}
                  </span>
                  <span className="text-[14.5px] font-medium text-ink/80">{p}</span>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.25} className="mt-12">
              <DualCTA theme="light" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
