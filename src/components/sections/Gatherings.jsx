import { motion } from "framer-motion";
import { gatherings } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA, Arrow } from "../ui/Button";
import { LogoPlaceholder } from "../ui/Placeholder";
import { Blob, Cylinder, GridLines } from "../ui/BackgroundFX";
import { PinIcon } from "../ui/Icons";

/* Escalonado que rompe la cuadrícula en desktop */
const offsets = ["lg:mt-0", "lg:mt-14", "lg:mt-28"];

function GatheringCard({ card, index, onPlan }) {
  return (
    <StaggerItem className={`group relative ${offsets[index]}`}>
      <motion.article
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="relative h-full overflow-hidden rounded-[28px] border border-cream/[0.09] bg-carbon/70 p-7 backdrop-blur-xl transition-colors duration-500 group-hover:border-gold/35 sm:p-8"
      >
        {/* Filo dorado que aparece al pasar el ratón */}
        <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-gold/10 opacity-0 blur-[70px] transition-opacity duration-700 group-hover:opacity-100" />

        <div className="relative flex h-full flex-col">
          {/* Cabecera: logo + índice */}
          <div className="flex items-start justify-between">
            <LogoPlaceholder label={card.logo} className="h-16 w-16" />
            <span className="display text-[13px] text-cream/25">0{index + 1}</span>
          </div>

          {/* Día y hora */}
          <div className="mt-8 flex flex-wrap items-baseline gap-x-3">
            <span className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold">
              {card.day}
            </span>
            <span className="h-1 w-1 rounded-full bg-gold/50" />
            <span className="display text-[22px] text-cream">{card.time}</span>
          </div>

          <h3 className="display mt-3 text-[clamp(1.5rem,2.4vw,1.95rem)] leading-tight text-cream">
            {card.name}
          </h3>

          <p className="mt-3 flex items-center gap-2 text-[12.5px] text-mist">
            <PinIcon className="h-3.5 w-3.5 shrink-0 text-gold/70" />
            {card.place}
          </p>

          <p className="mt-5 flex-1 text-[14px] leading-[1.75] text-mist">{card.text}</p>

          <div className="mt-7 flex items-center justify-between border-t border-cream/[0.08] pt-5">
            <span className="max-w-[60%] text-[10px] font-medium uppercase leading-tight tracking-[0.14em] text-cream/35">
              {card.by}
            </span>
            <button
              onClick={onPlan}
              aria-label={`Planificar visita a ${card.name}`}
              className="grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-full border border-cream/15 text-cream transition-all duration-500 hover:border-gold hover:bg-gold hover:text-ink"
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
    <section id="reuniones" className="relative isolate overflow-hidden bg-ink py-28 lg:py-40">
      {/* Fondo */}
      <div className="grain pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(115%_85%_at_25%_0%,#151b28_0%,#090c13_50%,#06070b_100%)]" />
        <GridLines columns={6} />
        <Blob className="right-[-12%] top-[8%]" color="var(--color-gold)" opacity={0.15} size={540} />
        <Blob
          className="bottom-[-15%] left-[-10%]"
          color="var(--color-violet)"
          opacity={0.14}
          size={500}
          duration={23}
          delay={2}
        />
        <Cylinder
          className="left-[3%] top-[18%] hidden opacity-50 2xl:block"
          width={58}
          height={160}
          tone="ink"
          duration={12}
        />
      </div>

      <div className="shell">
        {/* Encabezado */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <Eyebrow>{gatherings.eyebrow}</Eyebrow>
            <SplitHeading
              lines={gatherings.title}
              italicLines={[1]}
              delay={0.1}
              className="display mt-6 text-[clamp(2.5rem,5.2vw,4.3rem)] text-cream"
            />
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.15}>
              <p className="text-[15.5px] leading-[1.8] text-mist">{gatherings.intro}</p>
            </Reveal>
          </div>
        </div>

        {/* Tarjetas */}
        <Stagger
          step={0.14}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-7"
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

        <Reveal delay={0.15} className="mt-20 lg:mt-32">
          <DualCTA align="center" className="items-center" />
        </Reveal>
      </div>
    </section>
  );
}
