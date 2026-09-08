import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { about } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA } from "../ui/Button";
import ImagePlaceholder from "../ui/Placeholder";


/* ------------------------------------------------------------------ */
function PlayButton({ onClick }) {
  return (
    <motion.button
      onClick={onClick}
      aria-label="Reproducir vídeo institucional"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className="group relative grid h-24 w-24 cursor-pointer place-items-center rounded-full sm:h-28 sm:w-28"
    >
      {[0, 0.9, 1.8].map((d) => (
        <motion.span
          key={d}
          className="absolute inset-0 rounded-full border-2 border-gold-light/50"
          animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, delay: d, ease: "easeOut" }}
        />
      ))}
      <span className="gradient-gold absolute inset-[10px] rounded-full shadow-[0_18px_50px_-14px_rgba(208,142,8,0.95)]" />
      <svg viewBox="0 0 24 24" className="relative ml-1 h-7 w-7 text-navy" fill="currentColor">
        <path d="M8 5.2c0-.9 1-1.5 1.8-1L19 11c.7.5.7 1.5 0 2l-9.2 6.8c-.8.5-1.8 0-1.8-1V5.2Z" />
      </svg>
    </motion.button>
  );
}

/* ------------------------------------------------------------------ */
export default function AboutVideo() {
  const { open } = useModal();
  const frameRef = useRef(null);

  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "center center"] });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [0.9, 1]), {
    stiffness: 110,
    damping: 26,
  });
  const tilt = useSpring(useTransform(scrollYProgress, [0, 1], [9, 0]), {
    stiffness: 110,
    damping: 26,
  });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const cfg = { stiffness: 220, damping: 24, mass: 0.4 };
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), cfg);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), cfg);
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
    <section id="conocenos" className="relative isolate overflow-hidden bg-ivory py-24 lg:py-32">
      <div className="shell">
        {/* Encabezado */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <Eyebrow>{about.eyebrow}</Eyebrow>
            <SplitHeading
              lines={about.title}
              accentLines={[1]}
              delay={0.08}
              className="display mt-6 text-[clamp(2.2rem,4.6vw,3.8rem)] text-navy"
            />
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.14} className="space-y-4">
              {about.paragraphs.map((p, i) => (
                <p key={i} className="text-[15.5px] leading-[1.8] text-stone">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Marco de vídeo */}
        <motion.div ref={frameRef} style={{ perspective: 1400 }} className="mt-14 lg:mt-20">
          <motion.div
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ scale, rotateX: tilt, transformStyle: "preserve-3d" }}
            className="relative"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="relative isolate overflow-hidden rounded-xl bg-navy shadow-[0_50px_110px_-45px_rgba(28,54,97,0.75)]"
            >
              <ImagePlaceholder
                label={about.video.label}
                tone="navy"
                ratio="16/9"
                rounded="rounded-none"
                align="top"
                className="border-0"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-navy/45" />

              <motion.div
                aria-hidden="true"
                style={{ left: shineX }}
                className="pointer-events-none absolute -top-1/2 h-[200%] w-64 -translate-x-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/[0.07] to-transparent"
              />

              {/* Cabecera del marco */}
              <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-5 sm:p-7">
                <span className="label flex items-center gap-2.5 rounded-md border border-white/15 bg-navy/50 px-3.5 py-2 text-[9.5px] text-white/85 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-light" />
                  {about.video.caption}
                </span>
                <span className="rounded-md border border-white/15 bg-navy/50 px-3 py-2 text-[11px] font-semibold text-white/75 backdrop-blur-md">
                  {about.video.duration}
                </span>
              </div>

              <div className="absolute inset-0 grid place-items-center">
                <PlayButton onClick={() => open("video")} />
              </div>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <p className="max-w-md text-[17px] font-semibold leading-snug text-white sm:text-[21px]">
                  Conoce nuestra historia, nuestros ministerios y las vidas que están siendo
                  impactadas.
                </p>
                <div className="mt-4 h-[4px] w-full overflow-hidden rounded-full bg-white/15">
                  <motion.div
                    className="gradient-gold h-full w-1/4 rounded-full"
                    animate={{ x: ["-100%", "400%"] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Cifras */}
        <Stagger
          step={0.1}
          className="mt-16 grid grid-cols-2 gap-y-10 border-t border-line pt-12 lg:mt-20 lg:grid-cols-4"
        >
          {about.stats.map((s) => (
            <StaggerItem
              key={s.label}
              className="px-2 text-center lg:border-r lg:border-line lg:last:border-r-0"
            >
              <p className="display text-gold-gradient text-[clamp(2.4rem,5vw,3.4rem)] leading-none">
                {s.value}
              </p>
              <p className="label mx-auto mt-3 max-w-[16ch] text-[10.5px] leading-relaxed text-navy/60">
                {s.label}
              </p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.12} className="mt-14">
          <DualCTA align="center" className="items-center" />
        </Reveal>
      </div>
    </section>
  );
}
