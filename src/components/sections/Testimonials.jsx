import { motion } from "framer-motion";
import { testimonials } from "../../data/site";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA } from "../ui/Button";
import { Flame } from "../ui/Decor";

/* Cinco estrellas en el degradado institucional */
function Stars() {
  return (
    <div className="flex items-center gap-1" aria-label="Valoración: 5 de 5 estrellas">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" aria-hidden="true" className="h-[15px] w-[15px]">
          <defs>
            <linearGradient id={`star-${i}`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--color-gold)" />
              <stop offset="100%" stopColor="var(--color-gold-light)" />
            </linearGradient>
          </defs>
          <path
            d="M12 2.6l2.7 5.9 6.4.7-4.8 4.4 1.3 6.3L12 16.7 6.4 19.9l1.3-6.3L2.9 9.2l6.4-.7L12 2.6Z"
            fill={`url(#star-${i})`}
          />
        </svg>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
function TestimonialCard({ item }) {
  return (
    <StaggerItem className="mb-6 break-inside-avoid">
      <motion.figure
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-[0_22px_55px_-40px_rgba(28,54,97,0.5)] transition-shadow duration-500 hover:shadow-[0_34px_75px_-40px_rgba(28,54,97,0.62)] sm:p-7"
      >
        <span aria-hidden="true" className="gradient-gold absolute inset-x-0 top-0 h-[4px]" />

        {/* Comilla decorativa */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 top-2 select-none text-[7rem] font-extrabold leading-none text-navy/[0.05]"
        >
          &rdquo;
        </span>

        <div className="relative flex items-start gap-5">
          {/* Las fotos son de familia y de cuerpo entero, no retratos:
              a tamaño de avatar no se distinguiría nada. */}
          <img
            src={`/testimonios/${item.slug}.jpg`}
            alt={item.name}
            loading="lazy"
            className="h-28 w-28 shrink-0 rounded-lg object-cover shadow-[0_10px_26px_-14px_rgba(28,54,97,0.7)] sm:h-36 sm:w-36"
          />
          <figcaption className="pt-1">
            <Stars />
            <p className="display mt-3 text-[clamp(1.15rem,1.8vw,1.35rem)] leading-tight text-navy">
              {item.name}
            </p>
            <p className="label mt-2 text-[9.5px] text-gold-deep">Casa de Bendición</p>
          </figcaption>
        </div>

        <blockquote className="relative mt-6 space-y-3.5 border-t border-line pt-6">
          {item.quote.map((p, i) => (
            <p key={i} className="text-[14.5px] leading-[1.8] text-stone">
              {p}
            </p>
          ))}
        </blockquote>
      </motion.figure>
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
export default function Testimonials() {
  return (
    <section id="testimonios" className="relative isolate overflow-hidden bg-ivory py-24 lg:py-32">
      <Flame className="pointer-events-none absolute -left-24 top-24 h-[420px] w-auto text-navy/[0.03]" />

      <div className="shell relative">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-7">
            <Eyebrow>{testimonials.eyebrow}</Eyebrow>
            <SplitHeading
              lines={testimonials.title}
              accentLines={[1]}
              delay={0.08}
              className="display mt-6 text-[clamp(2.1rem,4.4vw,3.6rem)] text-navy"
            />
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.14}>
              <p className="text-[15.5px] leading-[1.8] text-stone">{testimonials.intro}</p>
            </Reveal>
          </div>
        </div>

        {/* Multicolumna: los testimonios tienen longitudes muy distintas
            y así encajan sin dejar huecos ni estirar las tarjetas. */}
        <Stagger step={0.1} className="mt-14 gap-6 lg:mt-18 lg:columns-2">
          {testimonials.items.map((item) => (
            <TestimonialCard key={item.slug} item={item} />
          ))}
        </Stagger>

        <Reveal delay={0.12} className="mt-10">
          <DualCTA align="center" className="items-center" />
        </Reveal>
      </div>
    </section>
  );
}
