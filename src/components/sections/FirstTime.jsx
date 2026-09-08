import { useState } from "react";
import { motion } from "framer-motion";
import { firstTime } from "../../data/site";
import { modalRegistry } from "../../lib/modals";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import CTAButton from "../ui/Button";
import { FormFields, FormSuccess } from "../ui/Form";
import { Sphere } from "../ui/BackgroundFX";

/* Mismo esquema que el modal "Planifica tu visita": una sola fuente de verdad */
const visitForm = modalRegistry["planifica-tu-visita"];

/* ------------------------------------------------------------------ */
function Faq({ item, index }) {
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group h-full rounded-[24px] border border-ink/[0.08] bg-cream/70 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-gold-deep/30 sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="display text-[clamp(1.15rem,2vw,1.45rem)] leading-snug text-ink">
            {item.q}
          </p>
          <span className="mt-1 shrink-0 text-[10px] font-semibold tracking-[0.16em] text-gold-deep/60">
            0{index + 1}
          </span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="h-px w-6 shrink-0 bg-gold-deep/40 transition-all duration-500 group-hover:w-10" />
          <p className="text-[14.5px] font-medium text-gold-deep">{item.a}</p>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
export default function FirstTime() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO(backend): mismo endpoint que el modal "Planifica tu visita".
    setSent(true);
  };

  return (
    <section
      id="visitanos"
      className="relative isolate overflow-hidden bg-cream py-28 text-ink lg:py-40"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-[5%] h-[440px] w-[440px] rounded-full bg-gold/14 blur-[130px]" />
        <div className="absolute bottom-[-8%] left-[-10%] h-[380px] w-[380px] rounded-full bg-ember/[0.07] blur-[120px]" />
        <div className="dot-grid absolute inset-0 opacity-[0.3] [mask-image:radial-gradient(65%_50%_at_30%_40%,black,transparent)]" />
        <Sphere className="right-[10%] bottom-[14%] hidden opacity-70 2xl:block" size={90} tone="cream" />
      </div>

      <div className="shell">
        {/* Encabezado */}
        <div className="max-w-3xl">
          <Eyebrow theme="light">{firstTime.eyebrow}</Eyebrow>
          <SplitHeading
            lines={["Queremos que te", "sientas en casa."]}
            italicLines={[1]}
            delay={0.1}
            className="display mt-6 text-[clamp(2.4rem,5.2vw,4.2rem)] text-ink"
          />
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.8] text-ink/60">
              {firstTime.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* ---------------- Preguntas ---------------- */}
          <div className="lg:col-span-6">
            <Stagger step={0.09} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {firstTime.faqs.map((f, i) => (
                <Faq key={f.q} item={f} index={i} />
              ))}
            </Stagger>

            <Reveal delay={0.2} className="mt-12">
              <p className="display text-[clamp(1.7rem,3.4vw,2.5rem)] leading-tight text-ink">
                {firstTime.closing}
              </p>
              <div className="mt-6 h-px w-24 hairline-x" />
            </Reveal>
          </div>

          {/* ---------------- Formulario ---------------- */}
          <div className="lg:col-span-6">
            <Reveal y={40} delay={0.15}>
              <div className="grain relative overflow-hidden rounded-[30px] border border-ink/10 bg-carbon p-7 shadow-[0_50px_120px_-45px_rgba(20,16,10,0.65)] sm:p-9">
                <div className="pointer-events-none absolute -right-24 -top-28 h-64 w-64 rounded-full bg-gold/18 blur-[90px]" />

                <div className="relative">
                  {sent ? (
                    <FormSuccess compact />
                  ) : (
                    <>
                      <p className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-gold">
                        Planifica tu visita
                      </p>
                      <h3 className="display mt-3 text-[clamp(1.6rem,2.6vw,2.1rem)] text-cream">
                        Cuéntanos que vienes
                      </h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-mist">
                        Así preparamos todo para recibirte: te esperamos en la puerta y te
                        acompañamos.
                      </p>

                      <form onSubmit={handleSubmit} className="mt-8">
                        <FormFields fields={visitForm.fields} />
                        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                          <p className="order-2 text-[10px] uppercase tracking-[0.18em] text-mist/45 sm:order-1">
                            Tus datos están seguros con nosotros
                          </p>
                          <CTAButton type="submit" className="order-1 w-full sm:order-2 sm:w-auto">
                            {visitForm.submit}
                          </CTAButton>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
