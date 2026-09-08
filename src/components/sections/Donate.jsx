import { motion } from "framer-motion";
import { donate } from "../../data/site";
import { EASE, Reveal, SplitHeading } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA, Arrow } from "../ui/Button";
import { ArcDivider, FlameWatermark, GoldRule } from "../ui/Decor";
import { HeartIcon } from "../ui/Icons";

/**
 * Sección 12 — Donar.
 * Bloque en azul institucional con el degradado dorado como
 * protagonista del CTA. El manual reserva el dorado justamente para
 * este tipo de llamada a la acción (pág. 32).
 */
export default function Donate() {
  return (
    <section id="donar" className="relative isolate overflow-hidden bg-navy py-28 lg:py-36">
      <FlameWatermark className="left-1/2 top-16 -translate-x-1/2 text-white" size={560} opacity={0.045} />

      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow theme="navy" align="center">
            {donate.eyebrow}
          </Eyebrow>

          <SplitHeading
            lines={["Tu generosidad hace", "posible la misión."]}
            accentLines={[1]}
            delay={0.08}
            className="display mt-6 text-[clamp(2.2rem,4.6vw,3.8rem)] text-white"
          />

          <Reveal delay={0.16}>
            <p className="mx-auto mt-7 max-w-[52ch] text-[15.5px] leading-[1.85] text-navy-mist">
              {donate.text}
            </p>
          </Reveal>

          {/* Versículo */}
          <motion.figure
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.95, delay: 0.22, ease: EASE }}
            className="mt-12"
          >
            <GoldRule className="mx-auto" width="3.5rem" />
            {/* La itálica queda reservada por el manual (pág. 23) a citas */}
            <blockquote className="mt-8 text-[clamp(1.5rem,3.4vw,2.4rem)] font-light italic leading-tight text-gold-light">
              “{donate.verse.text}”
            </blockquote>
            <figcaption className="label mt-4 text-[10.5px] text-white/50">
              {donate.verse.ref}
            </figcaption>
          </motion.figure>

          {/* CTA principal */}
          <Reveal delay={0.28} className="mt-12">
            {/* TODO: enlazar a la pasarela de donaciones (Givelify / Tithe.ly / Stripe) */}
            <motion.a
              href="#donar"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0, scale: 0.985 }}
              transition={{ type: "spring", stiffness: 400, damping: 26 }}
              className="gradient-gold group relative inline-flex items-center gap-3.5 overflow-hidden rounded-md px-10 py-5 text-[13px] font-bold uppercase tracking-[0.16em] text-navy shadow-[0_20px_50px_-14px_rgba(208,142,8,0.85)]"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-[900ms] ease-out group-hover:translate-x-full" />
              <HeartIcon className="relative h-4 w-4" />
              <span className="relative">{donate.cta}</span>
              <Arrow className="relative transition-transform duration-400 group-hover:translate-x-1" />
            </motion.a>
          </Reveal>

          <Reveal delay={0.34} className="mt-10">
            <DualCTA theme="navy" align="center" className="items-center" />
          </Reveal>
        </div>
      </div>

      <ArcDivider to="ivory" position="bottom" height={110} />
    </section>
  );
}
