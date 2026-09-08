import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { vision } from "../../data/site";
import { EASE, Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA } from "../ui/Button";
import { ArcDivider, FlameWatermark, GoldRule } from "../ui/Decor";

/* ------------------------------------------------------------------ */
function Step({ item, index }) {
  return (
    <StaggerItem className="group relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-6 lg:text-center">
      <div className="relative z-10 shrink-0">
        <motion.div
          whileHover={{ scale: 1.06 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className="grid h-14 w-14 place-items-center rounded-full border-2 border-white/20 bg-navy shadow-[0_0_0_10px_var(--color-navy)] transition-colors duration-400 group-hover:border-gold"
        >
          <span className="text-[15px] font-extrabold text-gold-light">0{index + 1}</span>
        </motion.div>
      </div>

      <div className="pt-2.5 lg:pt-0">
        <h3 className="label text-[12px] leading-tight text-white transition-colors duration-400 group-hover:text-gold-light">
          {item.step}
        </h3>
        <p className="mt-2 max-w-[20ch] text-[12.5px] leading-relaxed text-navy-mist lg:mx-auto">
          {item.note}
        </p>
      </div>
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
export default function Vision() {
  const pathRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: pathRef, offset: ["start 85%", "end 55%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const glowX = useTransform(draw, (v) => `${v * 100}%`);

  return (
    <section id="vision" className="relative isolate overflow-hidden bg-navy py-28 lg:py-40">
      <FlameWatermark className="-right-20 top-10 text-white" size={480} opacity={0.04} />
      <FlameWatermark
        className="-left-24 bottom-0 text-white"
        size={360}
        opacity={0.03}
        duration={18}
      />

      <div className="shell relative">
        {/* Encabezado */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Eyebrow theme="navy">{vision.eyebrow}</Eyebrow>
            <SplitHeading
              lines={vision.title}
              accentLines={[1]}
              delay={0.08}
              className="display mt-6 text-[clamp(2.2rem,4.6vw,3.8rem)] text-white"
            />
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-3">
            <Reveal delay={0.14} className="space-y-5">
              {vision.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-[15.5px] leading-[1.85] ${i === 0 ? "font-medium text-white/90" : "text-navy-mist"}`}
                >
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Modelo visual */}
        <div ref={pathRef} className="relative mt-24 lg:mt-32">
          <Reveal className="mb-14 flex items-center gap-4">
            <span className="label text-[10px] text-navy-mist">Modelo visual</span>
            <span className="h-px flex-1 bg-white/12" />
          </Reveal>

          <div className="relative">
            {/* Raíl */}
            <div className="pointer-events-none absolute left-[27px] top-0 hidden h-full w-[2px] bg-white/12 max-lg:block" />
            <div className="pointer-events-none absolute left-0 top-[27px] hidden h-[2px] w-full bg-white/12 lg:block" />

            {/* Progreso en degradado institucional */}
            <motion.div
              style={{ scaleY: draw }}
              className="gradient-gold pointer-events-none absolute left-[27px] top-0 hidden h-full w-[2px] origin-top max-lg:block"
            />
            <motion.div
              style={{ scaleX: draw }}
              className="gradient-gold pointer-events-none absolute left-0 top-[27px] hidden h-[2px] w-full origin-left lg:block"
            />
            <motion.span
              style={{ left: glowX }}
              className="pointer-events-none absolute top-[27px] hidden h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-light shadow-[0_0_18px_5px_rgba(226,173,70,0.6)] lg:block"
            />

            <Stagger step={0.13} className="flex flex-col gap-12 lg:grid lg:grid-cols-5 lg:gap-6">
              {vision.model.map((item, i) => (
                <Step key={item.step} item={item} index={i} />
              ))}
            </Stagger>
          </div>
        </div>

        {/* Cita de cierre */}
        <motion.figure
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.95, ease: EASE }}
          className="mx-auto mt-28 max-w-4xl text-center lg:mt-36"
        >
          <GoldRule className="mx-auto mb-9" width="4rem" />
          <blockquote className="display-light text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.3] text-white">
            {vision.quote}
          </blockquote>
        </motion.figure>

        <Reveal delay={0.12} className="mt-14">
          <DualCTA theme="navy" align="center" className="items-center" />
        </Reveal>
      </div>

      {/* Transición curva hacia la siguiente sección */}
      <ArcDivider to="ivory" position="bottom" height={110} />
    </section>
  );
}
