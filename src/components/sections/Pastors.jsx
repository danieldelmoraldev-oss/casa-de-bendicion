import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { pastors } from "../../data/site";
import { EASE, Reveal, SplitHeading } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA, Arrow } from "../ui/Button";
import ImagePlaceholder from "../ui/Placeholder";

/**
 * Sección 05 — Nuestros pastores.
 * Split a sangre: la foto rompe la cuadrícula y llega al borde
 * izquierdo del viewport; el texto respira dentro de la retícula.
 *
 * NOTA (documento): aquí NO van las biografías completas. La formación
 * académica, trayectoria ministerial y llamado pastoral se reservan
 * para la futura página /pastores.
 */
export default function Pastors() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yPhoto = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const yGhost = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      id="pastores"
      ref={ref}
      className="relative isolate overflow-hidden bg-cream text-ink"
    >
      {/* Fondos */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[10%] h-[460px] w-[460px] rounded-full bg-gold/12 blur-[130px]" />
        <div className="absolute bottom-[-10%] left-[30%] h-[320px] w-[320px] rounded-full bg-ember/[0.06] blur-[110px]" />
      </div>

      <motion.p
        aria-hidden="true"
        style={{ y: yGhost }}
        className="display pointer-events-none absolute -right-6 bottom-16 -z-10 whitespace-nowrap text-[clamp(4.5rem,13vw,11rem)] leading-none text-ink/[0.035]"
      >
        Pastores
      </motion.p>

      <div className="grid grid-cols-1 lg:grid-cols-[46%_1fr]">
        {/* ---------------- Foto a sangre ---------------- */}
        <motion.div style={{ y: yPhoto }} className="relative">
          <Reveal y={0} blur={false} duration={1.2}>
            <div className="relative">
              <ImagePlaceholder
                label={pastors.media.label}
                tone="light"
                ratio="4/5"
                rounded="rounded-none lg:rounded-r-[44px]"
                className="shadow-[0_60px_140px_-60px_rgba(20,16,10,0.6)]"
              />
              {/* Filete dorado en el canto derecho */}
              <div className="absolute inset-y-10 right-0 hidden w-px bg-gradient-to-b from-transparent via-gold to-transparent lg:block" />
            </div>
          </Reveal>

          {/* Firma flotante sobre la foto */}
          <motion.div
            initial={{ opacity: 0, y: 30, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -2 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.45, ease: EASE }}
            className="absolute -bottom-8 right-6 z-20 rounded-2xl border border-ink/[0.07] bg-cream/95 px-6 py-4 shadow-[0_30px_70px_-30px_rgba(20,16,10,0.5)] backdrop-blur-sm lg:-right-10 lg:bottom-16"
          >
            <p className="text-[9.5px] font-semibold uppercase tracking-[0.24em] text-gold-deep">
              Pastores
            </p>
            <p className="display mt-1 text-[21px] italic leading-tight text-ink">
              Willy &amp; Carolina
            </p>
          </motion.div>
        </motion.div>

        {/* ---------------- Texto ---------------- */}
        <div className="px-6 py-24 sm:px-10 lg:py-36 lg:pl-20 xl:pl-28">
          <div className="max-w-xl">
            <Eyebrow theme="light">{pastors.eyebrow}</Eyebrow>

            <SplitHeading
              lines={["Conoce a", "nuestros pastores"]}
              italicLines={[1]}
              delay={0.1}
              className="display mt-6 text-[clamp(2.3rem,4.6vw,3.9rem)] text-ink"
            />

            <Reveal delay={0.2} className="mt-6 flex items-center gap-3">
              <span className="h-px w-10 bg-gold-deep/40" />
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
                {pastors.names}
              </p>
            </Reveal>

            <Reveal delay={0.25} className="mt-8">
              <p className="text-[16.5px] leading-[1.8] text-ink/65">{pastors.paragraphs[0]}</p>
            </Reveal>

            {/* Visión pastoral destacada */}
            <Reveal delay={0.3} className="relative mt-8 rounded-[22px] border border-ink/[0.08] bg-sand/40 p-7">
              <span
                aria-hidden="true"
                className="display absolute -top-6 left-6 text-[5rem] leading-none text-gold/35"
              >
                “
              </span>
              <p className="display relative text-[19px] leading-snug text-ink sm:text-[21px]">
                {pastors.paragraphs[1]}
              </p>
            </Reveal>

            {/* TODO: apuntar a /pastores cuando exista la página dedicada */}
            <Reveal delay={0.35} className="mt-8">
              <a
                href="#pastores"
                className="group inline-flex items-center gap-3 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink/60 transition-colors duration-300 hover:text-gold-deep"
              >
                Su historia completa, muy pronto
                <span className="grid h-8 w-8 place-items-center rounded-full border border-ink/15 transition-all duration-500 group-hover:border-gold-deep group-hover:bg-gold-deep group-hover:text-cream">
                  <Arrow />
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.4} className="mt-12">
              <DualCTA theme="light" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
