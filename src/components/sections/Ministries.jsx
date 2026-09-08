import { motion, useReducedMotion } from "framer-motion";
import { ministries } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA, Arrow } from "../ui/Button";
import { LogoPlaceholder } from "../ui/Placeholder";
import { Blob, GridLines, Ring, Sphere } from "../ui/BackgroundFX";

/* ------------------------------------------------------------------ */
function MinistryCard({ item, index, onOpen }) {
  return (
    <StaggerItem>
      <motion.button
        onClick={onOpen}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[26px] border border-cream/[0.08] bg-carbon/55 p-7 text-left backdrop-blur-xl transition-colors duration-500 hover:border-gold/35"
      >
        <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-gold/12 opacity-0 blur-[60px] transition-opacity duration-700 group-hover:opacity-100" />

        <div className="relative flex items-start justify-between">
          <motion.div
            whileHover={{ rotate: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
          >
            <LogoPlaceholder label={item.logo} className="h-16 w-16" />
          </motion.div>
          <span className="display text-[12px] text-cream/20">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <h3 className="display relative mt-7 text-[clamp(1.35rem,2vw,1.65rem)] leading-tight text-cream transition-colors duration-500 group-hover:text-gold-soft">
          {item.name}
        </h3>

        <p className="relative mt-3 flex-1 text-[13.5px] leading-[1.75] text-mist">{item.text}</p>

        <div className="relative mt-6 flex items-end justify-between gap-4 border-t border-cream/[0.07] pt-5">
          <span className="text-[9.5px] font-medium uppercase leading-tight tracking-[0.14em] text-cream/30">
            {item.by ?? "Casa de Bendición"}
          </span>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-cream/12 text-cream/70 transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
            <Arrow className="h-3 w-3" />
          </span>
        </div>
      </motion.button>
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
/* Cinta infinita con el resto de equipos                              */
function TeamsMarquee({ list }) {
  const reduce = useReducedMotion();
  const items = [...list, ...list];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
      <motion.div
        className="flex w-max gap-10 py-1"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
      >
        {items.map((team, i) => (
          <span key={`${team}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
            <span className="display text-[clamp(1.1rem,2vw,1.6rem)] text-cream/45">{team}</span>
            <span className="h-1 w-1 shrink-0 rounded-full bg-gold/60" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
export default function Ministries() {
  const { open } = useModal();

  return (
    <section id="ministerios" className="relative isolate overflow-hidden bg-ink py-28 lg:py-40">
      <div className="grain pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_70%_5%,#161c2a_0%,#0a0d15_50%,#06070b_100%)]" />
        <GridLines columns={6} />
        <Blob className="left-[-14%] top-[6%]" color="var(--color-violet)" opacity={0.16} size={560} />
        <Blob
          className="bottom-[10%] right-[-12%]"
          color="var(--color-gold)"
          opacity={0.15}
          size={520}
          duration={25}
          delay={3}
        />
        <Ring className="right-[6%] top-[4%] hidden lg:block" size={340} duration={60} />
        <Sphere className="left-[8%] bottom-[6%] hidden opacity-60 2xl:block" size={80} tone="ink" />
      </div>

      <div className="shell">
        {/* Encabezado */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-6">
            <Eyebrow>{ministries.eyebrow}</Eyebrow>
            <SplitHeading
              lines={ministries.title}
              italicLines={[1]}
              delay={0.1}
              className="display mt-6 text-[clamp(2.6rem,5.6vw,4.6rem)] text-cream"
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.15} className="space-y-4">
              {ministries.paragraphs.map((p, i) => (
                <p
                  key={i}
                  className={`text-[15px] leading-[1.8] ${i === 0 ? "text-cream/85" : "text-mist"}`}
                >
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </div>

        {/* Rejilla de ministerios */}
        <Stagger
          step={0.07}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3 lg:gap-6"
        >
          {ministries.items.map((item, i) => (
            <MinistryCard
              key={item.name}
              item={item}
              index={i}
              onOpen={() => open("quiero-servir")}
            />
          ))}
        </Stagger>

        {/* Otros equipos */}
        <Reveal
          delay={0.1}
          className="mt-16 overflow-hidden rounded-[28px] border border-cream/[0.08] bg-carbon/40 py-8 backdrop-blur-xl lg:mt-20"
        >
          <p className="mb-6 px-8 text-[10px] font-semibold uppercase tracking-[0.28em] text-gold">
            {ministries.otherTeams.title}
          </p>
          <TeamsMarquee list={ministries.otherTeams.list} />
        </Reveal>

        {/* Cierre */}
        <Reveal delay={0.15} className="mt-20 text-center lg:mt-28">
          <p className="display text-[clamp(1.8rem,4vw,3rem)] text-cream">
            {ministries.otherTeams.closing}
          </p>
          <div className="mx-auto mt-8 h-px w-24 hairline-x" />
          <DualCTA align="center" className="mt-10 items-center" />
        </Reveal>
      </div>
    </section>
  );
}
