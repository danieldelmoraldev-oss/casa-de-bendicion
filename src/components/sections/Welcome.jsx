import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { welcome } from "../../data/site";
import { Reveal, SplitHeading, Stagger, StaggerItem, EASE } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA } from "../ui/Button";
import ImagePlaceholder from "../ui/Placeholder";
import { Flame, GoldRule } from "../ui/Decor";

export default function Welcome() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const yMain = useTransform(scrollYProgress, [0, 1], [36, -36]);
  const yInset = useTransform(scrollYProgress, [0, 1], [-26, 62]);

  return (
    <section id="bienvenida" ref={ref} className="relative isolate overflow-hidden bg-white py-24 lg:py-36">
      {/* Fuego tono sobre tono */}
      <Flame
        className="pointer-events-none absolute -left-24 top-16 h-[460px] w-auto text-navy/[0.035]"
        aria-hidden="true"
      />

      <div className="shell">
        <div className="grid grid-cols-1 items-center gap-20 lg:grid-cols-12 lg:gap-16">
          {/* ---------------- Visual ---------------- */}
          <div className="relative lg:col-span-6">
            <motion.div style={{ y: yMain }}>
              <Reveal y={44} duration={1.05}>
                <ImagePlaceholder
                  label={welcome.media.main}
                  tone="light"
                  ratio="4/5"
                  className="shadow-[0_40px_80px_-45px_rgba(28,54,97,0.45)]"
                />
              </Reveal>
              {/* Marco azul desplazado */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-6 -top-6 h-full w-full rounded-lg border-2 border-navy/12"
              />
            </motion.div>

            {/* Foto secundaria montada sobre la principal */}
            <motion.div
              style={{ y: yInset }}
              className="absolute -bottom-14 -right-3 z-20 w-[56%] sm:-right-8 sm:w-[50%]"
            >
              <Reveal y={54} delay={0.2} duration={1.05}>
                <div className="rounded-lg bg-white p-2 shadow-[0_30px_70px_-35px_rgba(28,54,97,0.55)]">
                  <ImagePlaceholder
                    label={welcome.media.inset}
                    tone="light"
                    ratio="4/3"
                    rounded="rounded-md"
                  />
                </div>
              </Reveal>
            </motion.div>

            {/* Insignia */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.85, delay: 0.45, ease: EASE }}
              className="absolute -left-2 top-8 z-20 rounded-lg bg-navy px-5 py-4 shadow-[0_24px_50px_-25px_rgba(28,54,97,0.7)] sm:-left-7"
            >
              <p className="label text-[9.5px] text-gold-light">Todos son bienvenidos</p>
              <p className="display mt-1.5 text-[19px] leading-tight text-white">Ven como eres</p>
            </motion.div>
          </div>

          {/* ---------------- Texto ---------------- */}
          <div className="lg:col-span-6 lg:pl-6 xl:pl-14">
            <Eyebrow>{welcome.eyebrow}</Eyebrow>

            <SplitHeading
              lines={welcome.title}
              accentLines={[1]}
              delay={0.08}
              className="display mt-6 text-[clamp(2.3rem,4.8vw,3.9rem)] text-navy"
            />

            <Reveal delay={0.18} className="mt-7 space-y-5">
              {welcome.paragraphs.map((p, i) => (
                <p key={i} className="max-w-[46ch] text-[16px] leading-[1.8] text-stone">
                  {p}
                </p>
              ))}
            </Reveal>

            {/* Frase destacada */}
            <Reveal delay={0.26} className="mt-9 border-l-[3px] border-gold pl-6">
              <p className="max-w-[38ch] text-[19px] font-semibold leading-snug text-navy sm:text-[21px]">
                {welcome.highlight}
              </p>
            </Reveal>

            {/* Pilares */}
            <Stagger delay={0.12} className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
              {welcome.pillars.map((p, i) => (
                <StaggerItem key={p} className="group flex items-center gap-3.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ivory text-[11px] font-bold text-gold-deep transition-colors duration-400 group-hover:bg-navy group-hover:text-white">
                    0{i + 1}
                  </span>
                  <span className="text-[14.5px] font-semibold text-navy/80">{p}</span>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal delay={0.2} className="mt-11">
              <GoldRule className="mb-8" />
              <DualCTA />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
