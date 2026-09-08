import { motion } from "framer-motion";
import { finalCta } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { EASE, Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import CTAButton from "../ui/Button";
import Logo from "../ui/Logo";
import { Flame, GoldRule } from "../ui/Decor";
import { ClockIcon, PinIcon } from "../ui/Icons";

/** Cierre antes del footer. */
export default function FinalCta() {
  const { open } = useModal();

  return (
    <section className="relative isolate overflow-hidden bg-ivory py-28 lg:py-36">
      <Flame className="pointer-events-none absolute -right-24 top-10 h-[480px] w-auto text-navy/[0.035]" />
      <Flame className="pointer-events-none absolute -left-28 bottom-0 h-[380px] w-auto text-navy/[0.028]" />

      <div className="shell relative text-center">
        <Reveal className="mb-10 flex justify-center">
          <Logo version="vertical" className="h-20 lg:h-24" />
        </Reveal>

        <SplitHeading
          as="h2"
          lines={["Tu historia puede", "comenzar aquí."]}
          accentLines={[1]}
          delay={0.05}
          className="display mx-auto max-w-5xl text-[clamp(2.4rem,6vw,5rem)] text-navy"
        />

        <Stagger step={0.11} delay={0.2} className="mx-auto mt-11 flex max-w-2xl flex-col gap-2.5">
          {finalCta.lines.map((line) => (
            <StaggerItem key={line}>
              <p className="text-[16px] leading-relaxed text-stone sm:text-[17px]">{line}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.28} className="mt-12">
          <GoldRule className="mx-auto" width="4rem" />
          <p className="display mt-9 text-[clamp(1.7rem,3.8vw,2.9rem)] leading-tight text-navy">
            {finalCta.closing}
          </p>
        </Reveal>

        <Reveal delay={0.34} className="mt-11 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <CTAButton onClick={() => open("planifica-tu-visita")}>Planifica tu visita</CTAButton>
          <CTAButton variant="outline" onClick={() => open("quiero-conectarme")}>
            Conéctate con nosotros
          </CTAButton>
        </Reveal>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, delay: 0.42, ease: EASE }}
          className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4"
        >
          <span className="label inline-flex items-center gap-2.5 rounded-md border border-navy/12 bg-white px-5 py-3 text-[10.5px] text-navy/75">
            <ClockIcon className="h-3.5 w-3.5 text-gold-deep" />
            {finalCta.meta.when}
          </span>
          <span className="inline-flex items-center gap-2.5 rounded-md border border-navy/12 bg-white px-5 py-3 text-[12px] font-semibold text-navy/75">
            <PinIcon className="h-3.5 w-3.5 text-gold-deep" />
            {finalCta.meta.where}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
