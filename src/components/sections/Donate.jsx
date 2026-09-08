import { motion } from "framer-motion";
import { donate } from "../../data/site";
import { EASE, Reveal, SplitHeading } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA, Arrow } from "../ui/Button";
import { Blob, Cylinder, Ring, Sphere } from "../ui/BackgroundFX";
import { HeartIcon } from "../ui/Icons";

/**
 * Sección 12 — Donar.
 * Rompe la alternancia crema/noche con un panel cálido en tonos oro:
 * es el único bloque de la página con ese tratamiento, así destaca sin
 * necesidad de gritar.
 */
export default function Donate() {
  return (
    <section id="donar" className="relative isolate overflow-hidden bg-night py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(100%_80%_at_50%_50%,#12161f_0%,#090c12_60%,#07080d_100%)]" />
      </div>

      <div className="shell">
        <Reveal y={50} duration={1.1}>
          <div className="grain relative overflow-hidden rounded-[36px] border border-gold/20 px-6 py-20 text-center sm:rounded-[44px] sm:px-12 lg:py-28">
            {/* Fondo cálido del panel */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_130%_at_50%_-10%,#3d2c12_0%,#22190c_45%,#100c07_100%)]" />
            <Blob
              className="left-[-8%] top-[-20%]"
              color="var(--color-gold)"
              opacity={0.28}
              size={480}
            />
            <Blob
              className="bottom-[-25%] right-[-6%]"
              color="var(--color-ember)"
              opacity={0.22}
              size={420}
              duration={22}
              delay={2}
            />
            <Ring className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size={620} duration={80} />
            <Cylinder
              className="left-[6%] bottom-[10%] hidden opacity-70 xl:block"
              width={60}
              height={160}
              duration={13}
            />
            <Sphere className="right-[8%] top-[14%] hidden opacity-75 xl:block" size={78} delay={1} />

            {/* Marca de agua */}
            <motion.div
              aria-hidden="true"
              animate={{ scale: [1, 1.06, 1], opacity: [0.06, 0.1, 0.06] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-gold-soft"
            >
              <HeartIcon className="h-72 w-72" />
            </motion.div>

            <div className="relative mx-auto max-w-3xl">
              <Eyebrow align="center">{donate.eyebrow}</Eyebrow>

              <SplitHeading
                lines={["Tu generosidad hace", "posible la misión."]}
                italicLines={[1]}
                delay={0.1}
                className="display mt-6 text-[clamp(2.3rem,5.2vw,4.2rem)] text-cream"
              />

              <Reveal delay={0.2}>
                <p className="mx-auto mt-7 max-w-[52ch] text-[15.5px] leading-[1.85] text-cream/70">
                  {donate.text}
                </p>
              </Reveal>

              {/* Versículo */}
              <motion.figure
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, delay: 0.25, ease: EASE }}
                className="relative mt-12"
              >
                <div className="mx-auto h-px w-20 hairline-x" />
                <blockquote className="display mt-8 text-[clamp(1.6rem,3.6vw,2.6rem)] italic leading-tight text-gold-soft">
                  “{donate.verse.text}”
                </blockquote>
                <figcaption className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-gold/70">
                  {donate.verse.ref}
                </figcaption>
              </motion.figure>

              {/* CTA principal */}
              <Reveal delay={0.3} className="mt-12">
                {/* TODO: enlazar a la pasarela de donaciones (Givelify / Tithe.ly / Stripe) */}
                <motion.a
                  href="#donar"
                  whileHover={{ y: -3 }}
                  whileTap={{ y: 0, scale: 0.985 }}
                  transition={{ type: "spring", stiffness: 400, damping: 26 }}
                  className="group relative inline-flex items-center gap-3.5 overflow-hidden rounded-full bg-gold px-10 py-5 text-[12px] font-semibold uppercase tracking-[0.18em] text-ink shadow-[0_20px_60px_-15px_rgba(214,163,84,0.8)]"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
                  <HeartIcon className="relative h-4 w-4" />
                  <span className="relative">{donate.cta}</span>
                  <Arrow className="relative transition-transform duration-500 group-hover:translate-x-1" />
                </motion.a>
              </Reveal>

              <Reveal delay={0.35} className="mt-10">
                <DualCTA align="center" className="items-center" />
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
