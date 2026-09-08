import { motion } from "framer-motion";
import { training } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { Arrow } from "../ui/Button";
import { LogoPlaceholder } from "../ui/Placeholder";
import { PinIcon, ScreenIcon } from "../ui/Icons";

/**
 * Sección 07 — Crece y fórmate.
 * Se resuelve como lista editorial (no tarjetas) para diferenciarla
 * visualmente del bloque de Reuniones que la precede.
 */
function CourseRow({ course, index, onOpen }) {
  const Place = course.online ? ScreenIcon : PinIcon;

  return (
    <StaggerItem>
      <motion.button
        onClick={onOpen}
        whileHover={{ x: 6 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="group relative block w-full cursor-pointer border-t border-ink/[0.09] py-8 text-left last:border-b lg:py-10"
      >
        {/* Fondo que entra al pasar el ratón */}
        <span className="pointer-events-none absolute -inset-x-6 inset-y-0 -z-10 rounded-3xl bg-sand/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Logo + índice */}
          <div className="flex items-center gap-4 lg:col-span-2">
            <LogoPlaceholder label={course.logo} tone="light" className="h-14 w-14 shrink-0" />
            <span className="display text-[13px] text-ink/25">0{index + 1}</span>
          </div>

          {/* Horario + nombre */}
          <div className="lg:col-span-4">
            <div className="flex flex-wrap items-baseline gap-x-2.5">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold-deep">
                {course.day}
              </span>
              <span className="h-1 w-1 rounded-full bg-gold-deep/50" />
              <span className="text-[13px] font-semibold text-ink/70">{course.time}</span>
            </div>
            <h3 className="display mt-1.5 text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight text-ink">
              {course.name}
            </h3>
          </div>

          {/* Descripción */}
          <p className="text-[14.5px] leading-[1.75] text-ink/60 lg:col-span-4">{course.text}</p>

          {/* Lugar + flecha */}
          <div className="flex items-center justify-between gap-4 lg:col-span-2 lg:justify-end">
            <span className="inline-flex items-center gap-2 rounded-full border border-ink/[0.12] px-3.5 py-2 text-[10.5px] font-medium uppercase tracking-[0.12em] text-ink/60">
              <Place className="h-3.5 w-3.5 text-gold-deep" />
              {course.online ? "Online" : "Yonkers"}
            </span>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/15 text-ink transition-all duration-500 group-hover:border-gold-deep group-hover:bg-gold-deep group-hover:text-cream">
              <Arrow />
            </span>
          </div>
        </div>
      </motion.button>
    </StaggerItem>
  );
}

export default function Training() {
  const { open } = useModal();

  return (
    <section id="formacion" className="relative isolate overflow-hidden bg-cream py-24 text-ink lg:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-12%] top-[-10%] h-[400px] w-[400px] rounded-full bg-gold/12 blur-[120px]" />
        <div className="dot-grid absolute inset-0 opacity-[0.3] [mask-image:radial-gradient(60%_50%_at_70%_30%,black,transparent)]" />
      </div>

      <div className="shell">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-6">
            <Eyebrow theme="light">{training.eyebrow}</Eyebrow>
            <SplitHeading
              lines={["Crece y", "fórmate."]}
              italicLines={[1]}
              delay={0.1}
              className="display mt-6 text-[clamp(2.3rem,4.8vw,3.9rem)] text-ink"
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.15}>
              <p className="text-[15.5px] leading-[1.8] text-ink/60">{training.intro}</p>
            </Reveal>
          </div>
        </div>

        <Stagger step={0.12} className="mt-14 lg:mt-20">
          {training.courses.map((c, i) => (
            <CourseRow
              key={c.name}
              course={c}
              index={i}
              onOpen={() => open("quiero-conectarme")}
            />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
