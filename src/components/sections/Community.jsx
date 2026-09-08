import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { community } from "../../data/site";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA } from "../ui/Button";
import { LogoPlaceholder } from "../ui/Placeholder";
import { Blob, Cylinder, GridLines } from "../ui/BackgroundFX";

/* El título del documento son tres frases: una por línea. */
const titleLines = community.title
  .split(". ")
  .map((s, i, a) => (i < a.length - 1 ? `${s}.` : s));

/* ------------------------------------------------------------------ */
function Platform({ platform }) {
  return (
    <StaggerItem>
      <article className="group relative border-t border-cream/[0.09] py-12 lg:py-16">
        {/* Barrido de luz al pasar el ratón */}
        <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <span className="pointer-events-none absolute -inset-x-6 inset-y-0 -z-10 rounded-[32px] bg-cream/[0.02] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Índice */}
          <div className="lg:col-span-1">
            <span className="display text-gold-gradient text-[clamp(2.6rem,4vw,3.4rem)] leading-none">
              {platform.index}
            </span>
          </div>

          {/* Identidad */}
          <div className="lg:col-span-4">
            <LogoPlaceholder label={`Logo ${platform.name}`} className="mb-6 h-16 w-16" />
            <h3 className="display text-[clamp(1.7rem,3vw,2.4rem)] leading-tight text-cream transition-colors duration-500 group-hover:text-gold-soft">
              {platform.name}
            </h3>
            <p className="mt-2.5 text-[10.5px] font-semibold uppercase tracking-[0.2em] text-gold/80">
              {platform.en}
            </p>
          </div>

          {/* Descripción + extensiones */}
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[15px] leading-[1.85] text-mist">{platform.text}</p>

            {platform.extensions.length > 0 && (
              <div className="mt-8">
                <p className="text-[9.5px] font-semibold uppercase tracking-[0.26em] text-cream/35">
                  Extensiones
                </p>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {platform.extensions.map((ext) => (
                    <div
                      key={ext.name}
                      className="rounded-2xl border border-cream/[0.09] bg-carbon/50 p-5 transition-colors duration-500 hover:border-gold/30"
                    >
                      <LogoPlaceholder label={`Logo ${ext.name}`} className="h-11 w-11" />
                      <p className="display mt-4 text-[17px] text-cream">{ext.name}</p>
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-mist">{ext.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
export default function Community() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 80%", "end 70%"],
  });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <section id="comunidad" className="relative isolate overflow-hidden bg-night py-28 lg:py-40">
      <div className="grain pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_0%,#1a2130_0%,#0c1017_50%,#080a11_100%)]" />
        <GridLines columns={5} />
        <Blob className="right-[-15%] top-[15%]" color="var(--color-ember)" opacity={0.13} size={560} />
        <Blob
          className="bottom-[-10%] left-[-8%]"
          color="var(--color-gold)"
          opacity={0.14}
          size={520}
          duration={24}
          delay={2}
        />
        <Cylinder
          className="right-[5%] bottom-[12%] hidden opacity-70 2xl:block"
          width={70}
          height={190}
          duration={14}
        />
      </div>

      <div className="shell">
        {/* Encabezado */}
        <Eyebrow>{community.eyebrow}</Eyebrow>

        <SplitHeading
          lines={titleLines}
          italicLines={[2]}
          delay={0.1}
          step={0.04}
          className="display mt-7 max-w-5xl text-[clamp(2.1rem,4.8vw,4rem)] text-cream"
        />

        <Reveal delay={0.2} className="mt-8 flex items-center gap-4">
          <span className="h-px w-10 shrink-0 bg-gold/50" />
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold/85">
            {community.subtitleEn}
          </p>
        </Reveal>

        <Reveal delay={0.25} className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-14">
          {community.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`text-[15px] leading-[1.85] ${i === 0 ? "text-cream/85" : "text-mist"}`}
            >
              {p}
            </p>
          ))}
        </Reveal>

        {/* Plataformas */}
        <div ref={listRef} className="relative mt-20 lg:mt-28">
          {/* Raíl que se dibuja con el scroll */}
          <div className="pointer-events-none absolute -left-4 top-0 hidden h-full w-px bg-cream/[0.07] xl:block" />
          <motion.div
            style={{ scaleY: draw }}
            className="pointer-events-none absolute -left-4 top-0 hidden h-full w-px origin-top bg-gradient-to-b from-gold via-gold to-transparent xl:block"
          />

          <Stagger step={0.12}>
            {community.platforms.map((p) => (
              <Platform key={p.name} platform={p} />
            ))}
          </Stagger>
        </div>

        {/* Cierre */}
        <Reveal delay={0.15} className="mt-20 border-t border-cream/[0.09] pt-16 text-center lg:mt-24">
          <p className="display mx-auto max-w-3xl text-[clamp(1.9rem,4.2vw,3.1rem)] leading-tight text-cream">
            {community.closing}
          </p>
          <DualCTA align="center" className="mt-10 items-center" />
        </Reveal>
      </div>
    </section>
  );
}
