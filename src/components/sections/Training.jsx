import { motion } from "framer-motion";
import { training } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { Arrow } from "../ui/Button";
import { MinistryLogo } from "../ui/Logo";
import { PinIcon, ScreenIcon } from "../ui/Icons";

/**
 * Sección 07 — Crece y fórmate.
 * Se resuelve como lista editorial y no como tarjetas, para
 * diferenciarla del bloque de Reuniones que la precede.
 */
function CourseRow({ course, index, onOpen }) {
  const Place = course.online ? ScreenIcon : PinIcon;

  return (
    <StaggerItem>
      <motion.button
        onClick={onOpen}
        whileHover={{ x: 6 }}
        transition={{ type: "spring", stiffness: 320, damping: 26 }}
        className="group relative block w-full cursor-pointer border-t border-line py-8 text-left last:border-b lg:py-10"
      >
        <span className="pointer-events-none absolute -inset-x-6 inset-y-0 -z-10 rounded-xl bg-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="flex items-center gap-4 lg:col-span-3">
            <MinistryLogo slug={course.slug} name="Rhema Academy" height={40} />
            <span className="text-[12px] font-bold text-navy/20">0{index + 1}</span>
          </div>

          <div className="lg:col-span-4">
            <div className="flex flex-wrap items-baseline gap-x-2.5">
              <span className="label text-[10.5px] text-gold-deep">{course.day}</span>
              <span className="h-1 w-1 rounded-full bg-gold" />
              <span className="text-[13.5px] font-bold text-navy/70">{course.time}</span>
            </div>
            <h3 className="display mt-1.5 text-[clamp(1.4rem,2.4vw,1.95rem)] leading-tight text-navy">
              {course.name}
            </h3>
          </div>

          <p className="text-[14.5px] leading-[1.75] text-stone lg:col-span-3">{course.text}</p>

          <div className="flex items-center justify-between gap-4 lg:col-span-2 lg:justify-end">
            <span className="label inline-flex items-center gap-2 rounded-md border border-navy/12 px-3.5 py-2 text-[10px] text-navy/60">
              <Place className="h-3.5 w-3.5 text-gold-deep" />
              {course.online ? "Online" : "Yonkers"}
            </span>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-navy/15 text-navy transition-all duration-400 group-hover:border-gold group-hover:bg-gold">
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
    <section id="formacion" className="relative isolate overflow-hidden bg-white py-24 lg:py-32">
      <div className="shell">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-6">
            <Eyebrow>{training.eyebrow}</Eyebrow>
            <SplitHeading
              lines={["Crece y", "fórmate."]}
              accentLines={[1]}
              delay={0.08}
              className="display mt-6 text-[clamp(2.1rem,4.2vw,3.4rem)] text-navy"
            />
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.14}>
              <p className="text-[15.5px] leading-[1.8] text-stone">{training.intro}</p>
            </Reveal>
          </div>
        </div>

        <Stagger step={0.12} className="mt-12 lg:mt-16">
          {training.courses.map((c, i) => (
            <CourseRow key={c.name} course={c} index={i} onOpen={() => open("quiero-conectarme")} />
          ))}
        </Stagger>
      </div>
    </section>
  );
}
