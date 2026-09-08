import { motion } from "framer-motion";
import { connect } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA, Arrow } from "../ui/Button";
import { Blob, GridLines, Ring } from "../ui/BackgroundFX";

/* ------------------------------------------------------------------ */
/* Cada tarjeta abre su modal correspondiente (lib/modals.js)          */
/* ------------------------------------------------------------------ */
function OptionCard({ option, index, onOpen }) {
  return (
    <StaggerItem>
      <motion.button
        onClick={onOpen}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-[28px] border border-cream/[0.09] bg-carbon/50 p-8 text-left backdrop-blur-xl transition-colors duration-500 hover:border-gold sm:p-10"
      >
        {/* Relleno dorado que sube al pasar el ratón */}
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-gold transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />

        <div className="relative flex h-full flex-col">
          <span className="display text-[13px] text-cream/25 transition-colors duration-500 group-hover:text-ink/40">
            0{index + 1}
          </span>

          <h3 className="display mt-8 text-[clamp(1.7rem,3.2vw,2.4rem)] leading-tight text-cream transition-colors duration-500 group-hover:text-ink">
            {option.title}
          </h3>

          <p className="mt-3 flex-1 text-[14.5px] leading-[1.75] text-mist transition-colors duration-500 group-hover:text-ink/70">
            {option.text}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-cream/15 text-cream transition-all duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-gold">
              <Arrow />
            </span>
            <span className="text-[10.5px] font-semibold uppercase tracking-[0.2em] text-cream/40 transition-colors duration-500 group-hover:text-ink/60">
              Abrir formulario
            </span>
          </div>
        </div>
      </motion.button>
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
export default function Connect() {
  const { open } = useModal();

  return (
    <section id="conectate" className="relative isolate overflow-hidden bg-ink py-28 lg:py-40">
      <div className="grain pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_85%_at_50%_0%,#151c2a_0%,#0a0d15_50%,#06070b_100%)]" />
        <GridLines columns={4} />
        <Blob className="left-[-12%] top-[12%]" color="var(--color-gold)" opacity={0.16} size={540} />
        <Blob
          className="bottom-[-12%] right-[-10%]"
          color="var(--color-violet)"
          opacity={0.15}
          size={500}
          duration={22}
          delay={2}
        />
        <Ring className="left-1/2 top-[-14%] -translate-x-1/2" size={560} duration={64} />
      </div>

      <div className="shell">
        {/* Encabezado centrado */}
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow align="center">{connect.eyebrow}</Eyebrow>
          <SplitHeading
            lines={["No tienes que", "caminar solo."]}
            italicLines={[1]}
            delay={0.1}
            className="display mt-6 text-[clamp(2.5rem,5.6vw,4.5rem)] text-cream"
          />
          <Reveal delay={0.2} className="mt-7 space-y-2">
            {connect.paragraphs.map((p, i) => (
              <p key={i} className="text-[16px] leading-relaxed text-mist">
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        {/* Las 4 opciones */}
        <Stagger step={0.1} className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-20 lg:gap-6">
          {connect.options.map((option, i) => (
            <OptionCard
              key={option.key}
              option={option}
              index={i}
              onOpen={() => open(option.key)}
            />
          ))}
        </Stagger>

        <Reveal delay={0.15} className="mt-16">
          <DualCTA align="center" className="items-center" />
        </Reveal>
      </div>
    </section>
  );
}
