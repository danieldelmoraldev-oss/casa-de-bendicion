import { motion } from "framer-motion";
import { connect } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA, Arrow } from "../ui/Button";
import { Flame } from "../ui/Decor";

/* Cada tarjeta abre su modal correspondiente (lib/modals.js) */
function OptionCard({ option, index, onOpen }) {
  return (
    <StaggerItem>
      <motion.button
        onClick={onOpen}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white p-8 text-left shadow-[0_22px_55px_-40px_rgba(28,54,97,0.5)] transition-shadow duration-500 hover:shadow-[0_36px_80px_-40px_rgba(28,54,97,0.65)] sm:p-10"
      >
        {/* Relleno azul que sube al pasar el ratón */}
        <span className="absolute inset-0 origin-bottom scale-y-0 bg-navy transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
        <span aria-hidden="true" className="gradient-gold absolute inset-x-0 top-0 h-[4px]" />

        <div className="relative flex h-full flex-col">
          <span className="text-[13px] font-extrabold text-navy/20 transition-colors duration-500 group-hover:text-gold-light">
            0{index + 1}
          </span>

          <h3 className="display mt-7 text-[clamp(1.6rem,3vw,2.2rem)] leading-tight text-navy transition-colors duration-500 group-hover:text-white">
            {option.title}
          </h3>

          <p className="mt-3 flex-1 text-[14.5px] leading-[1.75] text-stone transition-colors duration-500 group-hover:text-navy-mist">
            {option.text}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-navy/15 text-navy transition-all duration-500 group-hover:border-gold group-hover:bg-gold">
              <Arrow />
            </span>
            <span className="label text-[10px] text-navy/40 transition-colors duration-500 group-hover:text-white/60">
              Abrir formulario
            </span>
          </div>
        </div>
      </motion.button>
    </StaggerItem>
  );
}

export default function Connect() {
  const { open } = useModal();

  return (
    <section id="conectate" className="relative isolate overflow-hidden bg-ivory py-24 lg:py-32">
      <Flame className="pointer-events-none absolute -left-20 top-24 h-[420px] w-auto text-navy/[0.035]" />

      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow align="center">{connect.eyebrow}</Eyebrow>
          <SplitHeading
            lines={["No tienes que", "caminar solo."]}
            accentLines={[1]}
            delay={0.08}
            className="display mt-6 text-[clamp(2.3rem,4.8vw,3.9rem)] text-navy"
          />
          <Reveal delay={0.16} className="mt-7 space-y-1.5">
            {connect.paragraphs.map((p, i) => (
              <p key={i} className="text-[16px] leading-relaxed text-stone">
                {p}
              </p>
            ))}
          </Reveal>
        </div>

        <Stagger step={0.1} className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-18 lg:gap-6">
          {connect.options.map((option, i) => (
            <OptionCard
              key={option.key}
              option={option}
              index={i}
              onOpen={() => open(option.key)}
            />
          ))}
        </Stagger>

        <Reveal delay={0.12} className="mt-14">
          <DualCTA align="center" className="items-center" />
        </Reveal>
      </div>
    </section>
  );
}
