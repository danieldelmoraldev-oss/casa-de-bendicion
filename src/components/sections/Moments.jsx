import { moments } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { Reveal, SplitHeading, Stagger } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import CTAButton from "../ui/Button";
import PhotoCard from "../ui/PhotoCard";
import { Flame, GoldRule } from "../ui/Decor";

/**
 * "Momentos que marcan" — continuación de Conéctate.
 *
 * Comparte ancla con Conéctate (#conectate): son la misma parada del
 * menú. Las 4 opciones de arriba responden a "qué quiero hacer" y
 * estas 12 tarjetas a "qué estoy viviendo".
 *
 * Las doce abren el mismo formulario con su momento ya
 * preseleccionado, en lugar de doce modales casi idénticos.
 */
export default function Moments() {
  const { open } = useModal();

  return (
    <section className="relative isolate overflow-hidden bg-white py-24 lg:py-32">
      <Flame className="pointer-events-none absolute -right-24 top-32 h-[440px] w-auto text-navy/[0.03]" />

      <div className="shell relative">
        {/* Encabezado */}
        <div className="max-w-3xl">
          <Eyebrow>{moments.eyebrow}</Eyebrow>
          <SplitHeading
            lines={moments.title}
            accentLines={[1]}
            delay={0.08}
            step={0.04}
            className="display mt-6 text-[clamp(2rem,4.2vw,3.4rem)] text-navy"
          />
          <Reveal delay={0.16} className="mt-7 space-y-4">
            {moments.paragraphs.map((p, i) => (
              <p key={i} className="max-w-[58ch] text-[15.5px] leading-[1.8] text-stone">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={0.22} className="mt-7">
            <GoldRule className="mb-6" width="3rem" />
            <p className="text-[17px] font-semibold text-navy">{moments.lead}</p>
          </Reveal>
        </div>

        {/* Las 12 tarjetas */}
        <Stagger
          step={0.06}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-18 lg:grid-cols-3 lg:gap-6"
        >
          {moments.items.map((m) => (
            <PhotoCard
              key={m.slug}
              photo={m.photo ? `/momentos/${m.slug}.jpg` : null}
              alt={m.name}
              title={m.name}
              text={m.cta}
              footnote="Conéctate"
              minHeight="22rem"
              onClick={() => open("acompanamiento", { momento: m.name })}
            />
          ))}
        </Stagger>

        {/* Cierre */}
        <Reveal delay={0.12} className="mt-20 lg:mt-24">
          <div className="relative overflow-hidden rounded-2xl bg-navy px-7 py-14 text-center sm:px-12 lg:py-18">
            <Flame className="pointer-events-none absolute -left-16 -top-10 h-[320px] w-auto text-white/[0.04]" />
            <span aria-hidden="true" className="gradient-gold absolute inset-x-0 top-0 h-[4px]" />

            <div className="relative mx-auto max-w-3xl">
              <SplitHeading
                lines={moments.closing.title}
                accentLines={[1]}
                delay={0.05}
                className="display text-[clamp(1.7rem,3.6vw,2.8rem)] text-white"
              />

              <Reveal delay={0.14} className="mt-8 space-y-4">
                {moments.closing.paragraphs.map((p, i) => (
                  <p
                    key={i}
                    className={`mx-auto max-w-[62ch] text-[15px] leading-[1.85] ${
                      i === 0 ? "text-white/85" : "text-navy-mist"
                    }`}
                  >
                    {p}
                  </p>
                ))}
              </Reveal>

              <Reveal delay={0.2} className="mt-10">
                <GoldRule className="mx-auto" width="3rem" />
                <p className="mt-8 text-[clamp(1.15rem,2.2vw,1.5rem)] font-bold text-white">
                  {moments.closing.question}
                </p>
                <p className="mt-2 text-[15px] text-gold-light">{moments.closing.lead}</p>
              </Reveal>

              <Reveal
                delay={0.26}
                className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
              >
                <CTAButton onClick={() => open("acompanamiento")}>
                  Solicita acompañamiento
                </CTAButton>
                <CTAButton variant="light" onClick={() => open("necesito-oracion")}>
                  Queremos orar contigo
                </CTAButton>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
