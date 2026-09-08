import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { vision } from "../../data/site";
import { EASE, Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA } from "../ui/Button";
import { Blob, Cylinder, Ring } from "../ui/BackgroundFX";

/* ------------------------------------------------------------------ */
/* Nodo del recorrido GANAR → FORMAR → … → EXPANDIR                    */
/* ------------------------------------------------------------------ */
function Step({ item, index }) {
  return (
    <StaggerItem className="group relative flex items-start gap-5 lg:flex-col lg:items-center lg:gap-6 lg:text-center">
      {/* Nodo */}
      <div className="relative z-10 shrink-0">
        <motion.div
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 320, damping: 20 }}
          className="grid h-14 w-14 place-items-center rounded-full border border-gold/30 bg-night shadow-[0_0_0_8px_rgba(6,7,11,1)] transition-colors duration-500 group-hover:border-gold"
        >
          <span className="display text-[17px] text-gold">0{index + 1}</span>
        </motion.div>
        <span className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gold/25 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Texto */}
      <div className="pt-2 lg:pt-0">
        <h3 className="text-[13px] font-semibold uppercase leading-tight tracking-[0.13em] text-cream transition-colors duration-500 group-hover:text-gold-soft">
          {item.step}
        </h3>
        <p className="mt-2 max-w-[20ch] text-[12.5px] leading-relaxed text-mist lg:mx-auto">
          {item.note}
        </p>
      </div>
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
export default function Vision() {
  const pathRef = useRef(null);

  /* La línea del recorrido se dibuja con el scroll */
  const { scrollYProgress } = useScroll({
    target: pathRef,
    offset: ["start 85%", "end 55%"],
  });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const glowX = useTransform(draw, (v) => `${v * 100}%`);

  return (
    <section
      id="vision"
      className="relative isolate overflow-hidden bg-ink py-28 lg:py-40"
    >
      {/* Fondo */}
      <div className="grain pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_0%,#141a27_0%,#080b12_55%,#06070b_100%)]" />
        <Blob className="left-[-15%] top-[10%]" color="var(--color-violet)" opacity={0.16} size={560} />
        <Blob
          className="right-[-10%] bottom-[5%]"
          color="var(--color-gold)"
          opacity={0.15}
          size={520}
          duration={24}
          delay={3}
        />
        <Ring className="left-1/2 top-[-12%] -translate-x-1/2" size={620} duration={70} />
        <Cylinder
          className="right-[7%] top-[14%] hidden opacity-60 2xl:block"
          width={56}
          height={150}
          tone="ink"
          duration={13}
        />
      </div>

      <div className="shell">
        {/* ---------------- Encabezado editorial asimétrico ---------------- */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <Eyebrow>{vision.eyebrow}</Eyebrow>
            <SplitHeading
              lines={vision.title}
              italicLines={[1]}
              delay={0.1}
              className="display mt-6 text-[clamp(2.5rem,5.4vw,4.5rem)] text-cream"
            />
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-4">
            <Reveal delay={0.15} className="space-y-5">
              {vision.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-[16px] leading-[1.8] ${i === 0 ? "text-cream/85" : "text-mist"}`}
                >
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </div>

        {/* ---------------- Modelo visual ---------------- */}
        <div ref={pathRef} className="relative mt-24 lg:mt-32">
          <Reveal className="mb-14 flex items-center gap-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-mist/60">
              Modelo visual
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-cream/12 to-transparent" />
          </Reveal>

          <div className="relative">
            {/* Raíl base */}
            <div className="pointer-events-none absolute left-[27px] top-0 hidden h-full w-px bg-cream/10 max-lg:block" />
            <div className="pointer-events-none absolute left-0 top-[27px] hidden h-px w-full bg-cream/10 lg:block" />

            {/* Progreso dorado */}
            <motion.div
              style={{ scaleY: draw }}
              className="pointer-events-none absolute left-[27px] top-0 hidden h-full w-px origin-top bg-gradient-to-b from-gold via-gold to-gold/20 max-lg:block"
            />
            <motion.div
              style={{ scaleX: draw }}
              className="pointer-events-none absolute left-0 top-[27px] hidden h-px w-full origin-left bg-gradient-to-r from-gold-deep via-gold to-gold-soft lg:block"
            />
            {/* Punto de luz que avanza */}
            <motion.span
              style={{ left: glowX }}
              className="pointer-events-none absolute top-[27px] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold shadow-[0_0_20px_6px_rgba(214,163,84,0.55)] lg:block"
            />

            <Stagger step={0.13} className="flex flex-col gap-12 lg:grid lg:grid-cols-5 lg:gap-6">
              {vision.model.map((item, i) => (
                <Step key={item.step} item={item} index={i} />
              ))}
            </Stagger>
          </div>
        </div>

        {/* ---------------- Cita de cierre ---------------- */}
        <motion.figure
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: EASE }}
          className="relative mx-auto mt-28 max-w-4xl text-center lg:mt-36"
        >
          <span
            aria-hidden="true"
            className="display pointer-events-none absolute -top-14 left-1/2 -translate-x-1/2 text-[9rem] leading-none text-gold/15"
          >
            “
          </span>
          <blockquote className="display relative text-[clamp(1.7rem,3.6vw,2.9rem)] leading-[1.25] text-cream">
            {vision.quote}
          </blockquote>
          <div className="mx-auto mt-10 h-px w-32 hairline-x" />
        </motion.figure>

        <Reveal delay={0.15} className="mt-14">
          <DualCTA align="center" className="items-center" />
        </Reveal>
      </div>
    </section>
  );
}
