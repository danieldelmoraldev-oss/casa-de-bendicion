import { motion } from "framer-motion";
import { gatherings } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA, Arrow } from "../ui/Button";
import Logo, { MinistryLogo } from "../ui/Logo";
import { PinIcon } from "../ui/Icons";

/* Escalonado que rompe la cuadrícula en desktop */
const offsets = ["lg:mt-0", "lg:mt-12", "lg:mt-24"];

function GatheringCard({ card, index, onPlan }) {
  return (
    <StaggerItem className={`group relative ${offsets[index]}`}>
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_24px_60px_-40px_rgba(28,54,97,0.45)] transition-shadow duration-500 group-hover:shadow-[0_36px_80px_-40px_rgba(28,54,97,0.6)]"
      >
        {/* Filete dorado superior */}
        <span aria-hidden="true" className="gradient-gold h-[4px] w-full" />

        <div className="flex h-full flex-col p-7 sm:p-8">
          {/* Identidad de la iniciativa */}
          <div className="flex h-14 items-center">
            {card.slug ? (
              <MinistryLogo slug={card.slug} name={card.by} height={44} />
            ) : (
              <Logo version="horizontal" className="h-10" alt={card.by} />
            )}
          </div>

          <div className="mt-8 flex flex-wrap items-baseline gap-x-3">
            <span className="label text-[11px] text-gold-deep">{card.day}</span>
            <span className="h-1 w-1 rounded-full bg-gold" />
            <span className="text-[19px] font-extrabold text-navy">{card.time}</span>
          </div>

          <h3 className="display mt-2.5 text-[clamp(1.4rem,2.2vw,1.8rem)] leading-tight text-navy">
            {card.name}
          </h3>

          <p className="mt-3 flex items-start gap-2 text-[13px] text-stone">
            <PinIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" />
            {card.place}
          </p>

          <p className="mt-5 flex-1 text-[14px] leading-[1.75] text-stone">{card.text}</p>

          <div className="mt-7 flex items-center justify-between gap-4 border-t border-line pt-5">
            <span className="max-w-[60%] text-[10px] font-bold uppercase leading-tight tracking-[0.12em] text-navy/40">
              {card.by}
            </span>
            <button
              onClick={onPlan}
              aria-label={`Planificar visita a ${card.name}`}
              className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border border-navy/15 text-navy transition-all duration-400 hover:border-gold hover:bg-gold"
            >
              <Arrow />
            </button>
          </div>
        </div>
      </motion.article>
    </StaggerItem>
  );
}

export default function Gatherings() {
  const { open } = useModal();

  return (
    <section id="reuniones" className="relative isolate overflow-hidden bg-ivory py-24 lg:py-32">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <Eyebrow>{gatherings.eyebrow}</Eyebrow>
            <SplitHeading
              lines={gatherings.title}
              accentLines={[1]}
              delay={0.08}
              className="display mt-6 text-[clamp(2.2rem,4.4vw,3.6rem)] text-navy"
            />
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.14}>
              <p className="text-[15.5px] leading-[1.8] text-stone">{gatherings.intro}</p>
            </Reveal>
          </div>
        </div>

        <Stagger
          step={0.14}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-18 lg:grid-cols-3 lg:gap-7"
        >
          {gatherings.cards.map((card, i) => (
            <GatheringCard
              key={card.name}
              card={card}
              index={i}
              onPlan={() => open("planifica-tu-visita")}
            />
          ))}
        </Stagger>

        <Reveal delay={0.12} className="mt-20 lg:mt-28">
          <DualCTA align="center" className="items-center" />
        </Reveal>
      </div>
    </section>
  );
}
