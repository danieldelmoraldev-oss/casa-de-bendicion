import { motion } from "framer-motion";
import { finalCta } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { EASE, Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import CTAButton from "../ui/Button";
import { Blob, Cylinder, GridLines, Ring, Sphere } from "../ui/BackgroundFX";
import { ClockIcon, PinIcon } from "../ui/Icons";

/** Cierre emocional antes del footer. */
export default function FinalCta() {
  const { open } = useModal();

  return (
    <section className="relative isolate flex min-h-[92svh] items-center overflow-hidden bg-ink py-28 lg:py-40">
      {/* Fondo */}
      <div className="grain pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(130%_100%_at_50%_100%,#1a2130_0%,#0a0e16_50%,#06070b_100%)]" />
        <GridLines columns={7} />
        <Blob className="left-[-10%] bottom-[-10%]" color="var(--color-gold)" opacity={0.2} size={600} />
        <Blob
          className="right-[-12%] top-[-8%]"
          color="var(--color-violet)"
          opacity={0.17}
          size={540}
          duration={23}
          delay={2}
        />
        <Ring className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" size={720} duration={90} />
        <Cylinder
          className="left-[7%] top-[16%] hidden opacity-70 xl:block"
          width={72}
          height={200}
          duration={12}
        />
        <Sphere className="right-[9%] bottom-[18%] hidden opacity-70 xl:block" size={96} delay={0.6} />
        <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="shell relative w-full text-center">
        <SplitHeading
          as="h2"
          lines={["Tu historia puede", "comenzar aquí."]}
          italicLines={[1]}
          delay={0.05}
          className="display mx-auto max-w-5xl text-[clamp(2.7rem,7vw,6rem)] text-cream"
        />

        {/* Los "quizás" en cascada */}
        <Stagger step={0.12} delay={0.2} className="mx-auto mt-12 flex max-w-2xl flex-col gap-3">
          {finalCta.lines.map((line) => (
            <StaggerItem key={line}>
              <p className="text-[16px] leading-relaxed text-mist sm:text-[17px]">{line}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.3} className="mt-14">
          <div className="mx-auto h-px w-24 hairline-x" />
          <p className="display mt-10 text-[clamp(1.8rem,4.2vw,3.2rem)] leading-tight text-gold-gradient">
            {finalCta.closing}
          </p>
        </Reveal>

        <Reveal delay={0.35} className="mt-12 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <CTAButton onClick={() => open("planifica-tu-visita")}>Planifica tu visita</CTAButton>
          <CTAButton variant="ghost" onClick={() => open("quiero-conectarme")}>
            Conéctate con nosotros
          </CTAButton>
        </Reveal>

        {/* Datos prácticos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-cream/12 bg-carbon/50 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-cream/80 backdrop-blur-md">
            <ClockIcon className="h-3.5 w-3.5 text-gold" />
            {finalCta.meta.when}
          </span>
          <span className="inline-flex items-center gap-2.5 rounded-full border border-cream/12 bg-carbon/50 px-5 py-3 text-[11px] font-medium tracking-[0.06em] text-cream/80 backdrop-blur-md">
            <PinIcon className="h-3.5 w-3.5 text-gold" />
            {finalCta.meta.where}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
