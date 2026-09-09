import { useState } from "react";
import { motion } from "framer-motion";
import { contact, firstTime } from "../../data/site";
import { modalRegistry } from "../../lib/modals";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import CTAButton from "../ui/Button";
import { FormFields, FormMaintenance, FormSuccess } from "../ui/Form";
import { GoldRule } from "../ui/Decor";

/* Mismo esquema que el modal "Planifica tu visita": una sola fuente de verdad */
const visitForm = modalRegistry["planifica-tu-visita"];

function Faq({ item, index }) {
  return (
    <StaggerItem>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group h-full rounded-xl border border-line bg-ivory p-6 transition-colors duration-400 hover:border-gold/50 sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <p className="text-[clamp(1.05rem,1.9vw,1.25rem)] font-bold leading-snug text-navy">
            {item.q}
          </p>
          <span className="mt-1 shrink-0 text-[10px] font-bold tracking-[0.14em] text-gold-deep/60">
            0{index + 1}
          </span>
        </div>
        <div className="mt-4 flex items-center gap-3">
          <span className="gradient-gold h-[3px] w-6 shrink-0 rounded-full transition-all duration-500 group-hover:w-10" />
          <p className="text-[14.5px] font-semibold text-gold-deep">{item.a}</p>
        </div>
      </motion.div>
    </StaggerItem>
  );
}

export default function FirstTime() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO(backend): mismo endpoint que el modal "Planifica tu visita".
    setSent(true);
  };

  return (
    <section id="visitanos" className="relative isolate overflow-hidden bg-white py-24 lg:py-32">
      <div className="shell">
        <div className="max-w-3xl">
          <Eyebrow>{firstTime.eyebrow}</Eyebrow>
          <SplitHeading
            lines={["Queremos que te", "sientas en casa."]}
            accentLines={[1]}
            delay={0.08}
            className="display mt-6 text-[clamp(2.2rem,4.6vw,3.8rem)] text-navy"
          />
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[46ch] text-[16px] leading-[1.8] text-stone">
              {firstTime.intro}
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-12 lg:mt-18 lg:grid-cols-12 lg:gap-14">
          {/* Preguntas */}
          <div className="lg:col-span-6">
            <Stagger step={0.09} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {firstTime.faqs.map((f, i) => (
                <Faq key={f.q} item={f} index={i} />
              ))}
            </Stagger>

            <Reveal delay={0.18} className="mt-12">
              <p className="display text-[clamp(1.7rem,3.2vw,2.4rem)] leading-tight text-navy">
                {firstTime.closing}
              </p>
              <GoldRule className="mt-6" width="4rem" />
            </Reveal>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-6">
            <Reveal y={36} delay={0.14}>
              <div className="relative overflow-hidden rounded-2xl bg-navy p-7 shadow-[0_40px_90px_-45px_rgba(28,54,97,0.8)] sm:p-9">
                <span aria-hidden="true" className="gradient-gold absolute inset-x-0 top-0 h-[4px]" />

                <div className="relative">
                  {sent ? (
                    <FormSuccess compact />
                  ) : (
                    <>
                      <p className="label text-[10px] text-gold-light">Planifica tu visita</p>
                      <h3 className="display mt-3 text-[clamp(1.5rem,2.4vw,2rem)] text-white">
                        Cuéntanos que vienes
                      </h3>
                      <p className="mt-3 text-[14px] leading-relaxed text-navy-mist">
                        Así preparamos todo para recibirte: te esperamos en la puerta y te
                        acompañamos.
                      </p>

                      <form onSubmit={handleSubmit} className="mt-8">
                        <div
                          className={
                            contact.formsEnabled ? "" : "pointer-events-none select-none opacity-40"
                          }
                          aria-hidden={!contact.formsEnabled}
                        >
                          <FormFields
                            fields={visitForm.fields}
                            disabled={!contact.formsEnabled}
                          />
                        </div>

                        {contact.formsEnabled ? (
                          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                            <p className="label order-2 text-[9.5px] text-navy-mist/60 sm:order-1">
                              Tus datos están seguros con nosotros
                            </p>
                            <CTAButton type="submit" className="order-1 w-full sm:order-2 sm:w-auto">
                              {visitForm.submit}
                            </CTAButton>
                          </div>
                        ) : (
                          <FormMaintenance config={visitForm} className="mt-7" />
                        )}
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
