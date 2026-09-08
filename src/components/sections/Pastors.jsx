import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { pastors } from "../../data/site";
import { EASE, Reveal, SplitHeading } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA, Arrow } from "../ui/Button";
import ImagePlaceholder from "../ui/Placeholder";
import { Flame, GoldRule } from "../ui/Decor";

/**
 * Sección 05 — Nuestros pastores.
 * El manual (pág. 34) pide que en las piezas protagonizadas por el
 * liderazgo la persona mantenga el protagonismo y los recursos
 * gráficos queden en segundo plano: de ahí el fondo limpio y los
 * acentos reducidos a un filete dorado.
 *
 * NOTA (documento de contenido): aquí NO van las biografías completas;
 * se reservan para la futura página /pastores.
 */
export default function Pastors() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yPhoto = useTransform(scrollYProgress, [0, 1], [26, -26]);

  return (
    <section id="pastores" ref={ref} className="relative isolate overflow-hidden bg-white">
      <Flame className="pointer-events-none absolute -right-16 bottom-10 h-[400px] w-auto text-navy/[0.03]" />

      <div className="grid grid-cols-1 lg:grid-cols-[46%_1fr]">
        {/* ---------------- Foto a sangre ---------------- */}
        <motion.div style={{ y: yPhoto }} className="relative">
          <Reveal y={0} blur={false} duration={1.1}>
            <div className="relative">
              <ImagePlaceholder
                label={pastors.media.label}
                tone="light"
                ratio="4/5"
                rounded="rounded-none lg:rounded-r-2xl"
                className="shadow-[0_50px_100px_-55px_rgba(28,54,97,0.55)]"
              />
              {/* Filete dorado en el canto */}
              <span
                aria-hidden="true"
                className="gradient-gold absolute inset-y-12 right-0 hidden w-[4px] rounded-full lg:block"
              />
            </div>
          </Reveal>

          {/* Placa con los nombres */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
            className="absolute -bottom-7 right-5 z-20 rounded-lg bg-navy px-6 py-4 shadow-[0_26px_60px_-28px_rgba(28,54,97,0.8)] lg:-right-9 lg:bottom-16"
          >
            <p className="label text-[9.5px] text-gold-light">Pastores</p>
            <p className="display mt-1.5 text-[20px] leading-tight text-white">Willy &amp; Carolina</p>
          </motion.div>
        </motion.div>

        {/* ---------------- Texto ---------------- */}
        <div className="px-6 py-24 sm:px-10 lg:py-36 lg:pl-20 xl:pl-28">
          <div className="max-w-xl">
            <Eyebrow>{pastors.eyebrow}</Eyebrow>

            <SplitHeading
              lines={["Conoce a", "nuestros pastores"]}
              accentLines={[1]}
              delay={0.08}
              className="display mt-6 text-[clamp(2.1rem,4.2vw,3.4rem)] text-navy"
            />

            <Reveal delay={0.16} className="mt-6 flex items-center gap-3.5">
              <GoldRule width="2.5rem" />
              <p className="label text-[11px] text-gold-deep">{pastors.names}</p>
            </Reveal>

            <Reveal delay={0.22} className="mt-8">
              <p className="text-[16px] leading-[1.8] text-stone">{pastors.paragraphs[0]}</p>
            </Reveal>

            <Reveal delay={0.28} className="mt-8 rounded-xl bg-ivory p-7">
              <p className="text-[18px] font-semibold leading-snug text-navy sm:text-[19px]">
                {pastors.paragraphs[1]}
              </p>
            </Reveal>

            {/* TODO: apuntar a /pastores cuando exista la página dedicada */}
            <Reveal delay={0.34} className="mt-8">
              <a
                href="#pastores"
                className="group inline-flex items-center gap-3 text-[11.5px] font-bold uppercase tracking-[0.14em] text-navy/60 transition-colors duration-300 hover:text-gold-deep"
              >
                Su historia completa, muy pronto
                <span className="grid h-9 w-9 place-items-center rounded-full border border-navy/15 transition-all duration-400 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
                  <Arrow />
                </span>
              </a>
            </Reveal>

            <Reveal delay={0.4} className="mt-12">
              <DualCTA />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
