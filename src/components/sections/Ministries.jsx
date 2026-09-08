import { motion, useReducedMotion } from "framer-motion";
import { ministries } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { Reveal, SplitHeading, Stagger } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA } from "../ui/Button";
import { MinistryLogo } from "../ui/Logo";
import PhotoCard from "../ui/PhotoCard";
import { GoldRule } from "../ui/Decor";

/* ------------------------------------------------------------------ */
/* Tarjeta de ministerio: fotografía de fondo con el contenido encima  */
function MinistryCard({ item, onOpen }) {
  return (
    <PhotoCard
      photo={item.photo ? `/ministerios/fotos/${item.slug}.jpg` : null}
      alt={item.name}
      brand={<MinistryLogo slug={item.slug} name={item.name} height={36} />}
      text={item.text}
      footnote={item.by ?? "Casa de Bendición"}
      raise={item.raise ?? 24}
      onClick={onOpen}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Cinta con el resto de equipos, ahora con sus logos reales           */
function TeamsMarquee({ list }) {
  const reduce = useReducedMotion();
  const items = [...list, ...list];

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <motion.div
        className="flex w-max items-center gap-14 py-2"
        animate={reduce ? undefined : { x: ["0%", "-50%"] }}
        transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
      >
        {items.map((team, i) => (
          <span key={`${team.name}-${i}`} className="flex shrink-0 items-center gap-14">
            {team.slug ? (
              <MinistryLogo slug={team.slug} name={team.name} height={36} className="opacity-70" />
            ) : (
              <span className="text-[15px] font-semibold text-navy/45">{team.name}</span>
            )}
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
    <section id="ministerios" className="relative isolate overflow-hidden bg-ivory py-24 lg:py-32">
      <div className="shell">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-6">
            <Eyebrow>{ministries.eyebrow}</Eyebrow>
            <SplitHeading
              lines={ministries.title}
              accentLines={[1]}
              delay={0.08}
              className="display mt-6 text-[clamp(2.4rem,5vw,4.1rem)] text-navy"
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.14} className="space-y-4">
              {ministries.paragraphs.map((p, i) => (
                <p key={i} className="text-[15px] leading-[1.8] text-stone">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </div>

        <Stagger
          step={0.07}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-18 lg:grid-cols-3 lg:gap-6"
        >
          {ministries.items.map((item) => (
            <MinistryCard key={item.name} item={item} onOpen={() => open("quiero-servir")} />
          ))}
        </Stagger>

        {/* Otros equipos */}
        <Reveal delay={0.1} className="mt-14 overflow-hidden rounded-xl bg-white py-8 shadow-[0_20px_50px_-42px_rgba(28,54,97,0.5)] lg:mt-18">
          <p className="label mb-7 px-8 text-[10px] text-gold-deep">
            {ministries.otherTeams.title}
          </p>
          <TeamsMarquee list={ministries.otherTeams.list} />
        </Reveal>

        {/* Cierre */}
        <Reveal delay={0.12} className="mt-20 text-center lg:mt-24">
          <p className="display text-[clamp(1.8rem,3.8vw,2.9rem)] text-navy">
            {ministries.otherTeams.closing}
          </p>
          <GoldRule className="mx-auto mt-7" width="4rem" />
          <DualCTA align="center" className="mt-10 items-center" />
        </Reveal>
      </div>
    </section>
  );
}
