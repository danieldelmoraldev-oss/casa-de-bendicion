import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { about } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA } from "../ui/Button";
import ImagePlaceholder from "../ui/Placeholder";
import { Blob, GridLines, Sphere } from "../ui/BackgroundFX";

/* ------------------------------------------------------------------ */
/* Botón de reproducción con ondas                                     */
/* ------------------------------------------------------------------ */
function PlayButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label="Reproducir vídeo institucional"
      whileHover={{ scale: 1.07 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className="group relative grid h-24 w-24 cursor-pointer place-items-center rounded-full sm:h-28 sm:w-28"
    >
      {/* Ondas */}
      {[0, 0.9, 1.8].map((d) => (
        <motion.span
          key={d}
          className="absolute inset-0 rounded-full border border-gold/45"
          animate={{ scale: [1, 1.75], opacity: [0.6, 0] }}
          transition={{ duration: 2.7, repeat: Infinity, delay: d, ease: "easeOut" }}
        />
      ))}
      {/* Disco */}
      <span className="absolute inset-0 rounded-full bg-gold/12 backdrop-blur-md transition-colors duration-500 group-hover:bg-gold/20" />
      <span className="absolute inset-[10px] rounded-full bg-gold shadow-[0_20px_60px_-15px_rgba(214,163,84,0.85)]" />
      <svg viewBox="0 0 24 24" className="relative ml-1 h-7 w-7 text-ink" fill="currentColor">
        <path d="M8 5.2c0-.9 1-1.5 1.8-1L19 11c.7.5.7 1.5 0 2l-9.2 6.8c-.8.5-1.8 0-1.8-1V5.2Z" />
      </svg>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
export default function AboutVideo() {
  const { open } = useModal();
  const sectionRef = useRef(null);
  const frameRef = useRef(null);

  /* --- Reacción al scroll: el marco "se endereza" al llegar --- */
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ["start end", "center center"],
  });
  const scaleScroll = useTransform(scrollYProgress, [0, 1], [0.88, 1]);
  const tiltScroll = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const radiusScroll = useTransform(scrollYProgress, [0, 1], [56, 28]);
  const scale = useSpring(scaleScroll, { stiffness: 110, damping: 26 });
  const tilt = useSpring(tiltScroll, { stiffness: 110, damping: 26 });

  /* --- Reacción al ratón: inclinación 3D --- */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springCfg = { stiffness: 220, damping: 24, mass: 0.4 };
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), springCfg);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), springCfg);
  const shineX = useTransform(mx, [-0.5, 0.5], ["25%", "75%"]);

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="conocenos"
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-night py-28 lg:py-40"
    >
      {/* Fondo */}
      <div className="grain pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(110%_90%_at_50%_110%,#18202f_0%,#0b0f17_50%,#070910_100%)]" />
        <GridLines columns={5} />
        <Blob className="left-[-12%] top-[20%]" color="var(--color-gold)" opacity={0.14} size={520} />
        <Blob
          className="right-[-14%] top-[0%]"
          color="var(--color-violet)"
          opacity={0.14}
          size={480}
          duration={21}
          delay={2}
        />
        <Sphere className="right-[8%] bottom-[12%] hidden opacity-70 xl:block" size={90} tone="ink" />
      </div>

      <div className="shell">
        {/* ---------------- Encabezado ---------------- */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <SplitHeading
              lines={about.title}
              italicLines={[1]}
              delay={0.1}
              className="display mt-6 text-[clamp(2.5rem,5.4vw,4.5rem)] text-cream"
            />
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.15} className="space-y-5">
              {about.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-[15.5px] leading-[1.8] ${i === 0 ? "text-cream/85" : "text-mist"}`}
                >
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </div>

        {/* ---------------- Marco de vídeo dinámico ---------------- */}
        <motion.div
          ref={frameRef}
          style={{ perspective: 1400 }}
          className="mt-16 lg:mt-24"
        >
          <motion.div
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{
              scale,
              rotateX: tilt,
              transformStyle: "preserve-3d",
            }}
            className="relative"
          >
            <motion.div
              style={{ rotateX, rotateY, borderRadius: radiusScroll, transformStyle: "preserve-3d" }}
              className="relative isolate overflow-hidden border border-cream/10 bg-carbon shadow-[0_80px_180px_-60px_rgba(0,0,0,1)]"
            >
              {/* Imagen / póster */}
              <ImagePlaceholder
                label={about.video.label}
                tone="dark"
                ratio="16/9"
                rounded="rounded-none"
                showCorners={false}
                align="top"
                className="border-0"
              />

              {/* Velo */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/45" />

              {/* Brillo que sigue al ratón */}
              <motion.div
                aria-hidden="true"
                style={{ left: shineX }}
                className="pointer-events-none absolute -top-1/2 h-[200%] w-64 -translate-x-1/2 rotate-12 bg-gradient-to-r from-transparent via-cream/[0.07] to-transparent"
              />

              {/* Barra superior del marco */}
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-7">
                <div className="flex items-center gap-2.5 rounded-full border border-cream/12 bg-ink/45 px-3.5 py-1.5 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-ember" />
                  <span className="text-[9.5px] font-semibold uppercase tracking-[0.22em] text-cream/80">
                    {about.video.caption}
                  </span>
                </div>
                <span className="rounded-full border border-cream/12 bg-ink/45 px-3 py-1.5 text-[10px] font-medium tracking-[0.12em] text-cream/70 backdrop-blur-md">
                  {about.video.duration}
                </span>
              </div>

              {/* Play */}
              <div className="absolute inset-0 grid place-items-center">
                <PlayButton onClick={() => open("video")} />
              </div>

              {/* Pie del marco */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <p className="display max-w-md text-[19px] leading-tight text-cream/90 sm:text-[23px]">
                  Conoce nuestra historia, nuestros ministerios y las vidas que están siendo
                  impactadas.
                </p>
                <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-cream/12">
                  <motion.div
                    className="h-full w-1/4 rounded-full bg-gold"
                    animate={{ x: ["-100%", "400%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Sombra de contacto */}
            <div className="pointer-events-none absolute inset-x-12 -bottom-8 h-16 rounded-[50%] bg-gold/12 blur-3xl" />
          </motion.div>
        </motion.div>

        {/* ---------------- Cifras ---------------- */}
        <Stagger
          step={0.1}
          className="mt-20 grid grid-cols-2 gap-y-10 border-t border-cream/[0.08] pt-12 lg:mt-28 lg:grid-cols-4"
        >
          {about.stats.map((s) => (
            <StaggerItem
              key={s.label}
              className="group relative px-2 text-center lg:border-r lg:border-cream/[0.08] lg:last:border-r-0"
            >
              <p className="display text-[clamp(2.4rem,5vw,3.4rem)] leading-none text-gold-gradient">
                {s.value}
              </p>
              <p className="mx-auto mt-3 max-w-[16ch] text-[11px] font-medium uppercase leading-relaxed tracking-[0.18em] text-mist">
                {s.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15} className="mt-16">
          <DualCTA align="center" className="items-center" />
        </Reveal>
      </div>
    </section>
  );
}
