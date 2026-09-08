import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { community } from "../../data/site";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA } from "../ui/Button";
import { MinistryLogo } from "../ui/Logo";
import { ArcDivider, FlameWatermark, GoldRule } from "../ui/Decor";

/* El título del documento son tres frases: una por línea. */
const titleLines = community.title
  .split(". ")
  .map((s, i, a) => (i < a.length - 1 ? `${s}.` : s));

/* ------------------------------------------------------------------ */
function Platform({ platform }) {
  return (
    <StaggerItem>
      <article className="group relative border-t border-white/12 py-12 lg:py-16">
        <span
          aria-hidden="true"
          className="gradient-gold pointer-events-none absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-1">
            <span className="display text-gold-gradient text-[clamp(2.4rem,3.6vw,3.2rem)] leading-none">
              {platform.index}
            </span>
          </div>

          <div className="lg:col-span-4">
            {/* Los logos son a color y necesitan fondo claro (pág. 10) */}
            {platform.slug ? (
              <div className="mb-6 inline-flex rounded-lg bg-white px-5 py-3.5">
                <MinistryLogo slug={platform.slug} name={platform.name} height={40} />
              </div>
            ) : (
              <div className="mb-6 inline-flex rounded-lg border border-white/15 px-5 py-3.5">
                {/* TODO: el cliente aún no ha entregado el logo de Community Outreach */}
                <span className="label text-[10px] text-navy-mist">[Logo pendiente]</span>
              </div>
            )}
            <h3 className="display text-[clamp(1.6rem,2.8vw,2.2rem)] leading-tight text-white transition-colors duration-400 group-hover:text-gold-light">
              {platform.name}
            </h3>
            <p className="label mt-2.5 text-[10px] text-gold-light/85">{platform.en}</p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[15px] leading-[1.85] text-navy-mist">{platform.text}</p>

            {platform.extensions.length > 0 && (
              <div className="mt-8">
                <p className="label text-[9.5px] text-white/40">Extensiones</p>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {platform.extensions.map((ext) => (
                    <div
                      key={ext.name}
                      className="rounded-lg bg-white p-5 transition-transform duration-400 hover:-translate-y-1"
                    >
                      <MinistryLogo slug={ext.slug} name={ext.name} height={36} />
                      <p className="mt-4 text-[12.5px] leading-relaxed text-stone">{ext.text}</p>
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
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 80%", "end 70%"] });
  const draw = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });

  return (
    <section id="comunidad" className="relative isolate overflow-hidden bg-navy py-28 lg:py-36">
      <FlameWatermark className="-right-24 top-24 text-white" size={520} opacity={0.035} />

      <div className="shell relative">
        <Eyebrow theme="navy">{community.eyebrow}</Eyebrow>

        <SplitHeading
          lines={titleLines}
          accentLines={[2]}
          delay={0.08}
          step={0.038}
          className="display mt-7 max-w-5xl text-[clamp(1.9rem,4.2vw,3.5rem)] text-white"
        />

        <Reveal delay={0.18} className="mt-8 flex items-center gap-4">
          <GoldRule width="2.5rem" />
          <p className="label text-[10.5px] text-gold-light/90">{community.subtitleEn}</p>
        </Reveal>

        <Reveal delay={0.24} className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-14">
          {community.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`text-[15px] leading-[1.85] ${i === 0 ? "font-medium text-white/90" : "text-navy-mist"}`}
            >
              {p}
            </p>
          ))}
        </Reveal>

        {/* Plataformas */}
        <div ref={listRef} className="relative mt-20 lg:mt-28">
          <div className="pointer-events-none absolute -left-5 top-0 hidden h-full w-[2px] bg-white/10 xl:block" />
          <motion.div
            style={{ scaleY: draw }}
            className="gradient-gold pointer-events-none absolute -left-5 top-0 hidden h-full w-[2px] origin-top xl:block"
          />

          <Stagger step={0.12}>
            {community.platforms.map((p) => (
              <Platform key={p.name} platform={p} />
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.12} className="mt-20 border-t border-white/12 pt-16 text-center">
          <p className="display mx-auto max-w-3xl text-[clamp(1.8rem,4vw,3rem)] leading-tight text-white">
            {community.closing}
          </p>
          <DualCTA theme="navy" align="center" className="mt-10 items-center" />
        </Reveal>
      </div>

      <ArcDivider to="white" position="bottom" height={110} />
    </section>
  );
}
