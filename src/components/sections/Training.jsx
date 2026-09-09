import { motion } from "framer-motion";
import { training, meetings } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { etiquetaFormacion } from "../../lib/modals";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import CTAButton from "../ui/Button";
import { MinistryLogo } from "../ui/Logo";
import MeetingActions from "../ui/MeetingActions";
import { PinIcon, ScreenIcon } from "../ui/Icons";

/**
 * Sección 07 — Crece y fórmate.
 * Lista editorial (no tarjetas) para diferenciarla del bloque de
 * Reuniones que la precede.
 *
 * Cada formación lleva dos acciones: registrarse —abre el formulario
 * con la formación ya seleccionada— y añadirla al calendario como
 * evento recurrente.
 */
function CourseRow({ course, index, onRegister }) {
  const Place = course.online ? ScreenIcon : PinIcon;

  return (
    <StaggerItem>
      <article className="group relative border-t border-line py-8 last:border-b lg:py-10">
        <span className="pointer-events-none absolute -inset-x-6 inset-y-0 -z-10 rounded-xl bg-ivory opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
          {/* Identidad */}
          <div className="flex items-center gap-4 lg:col-span-3">
            <MinistryLogo slug={course.slug} name={course.name} height={40} />
            <span className="text-[12px] font-bold text-navy/20">
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Horario y nombre */}
          <div className="lg:col-span-4">
            <div className="flex flex-wrap items-baseline gap-x-2.5">
              <span className="label text-[10.5px] text-gold-deep">{course.day}</span>
              <span className="h-1 w-1 rounded-full bg-gold" />
              <span className="text-[13.5px] font-bold text-navy/70">{course.time}</span>
            </div>
            <h3 className="display mt-1.5 text-[clamp(1.25rem,2.2vw,1.8rem)] leading-tight text-navy">
              {course.name}
            </h3>
            <p className="label mt-2.5 inline-flex items-center gap-2 text-[9.5px] text-navy/50">
              <Place className="h-3.5 w-3.5 text-gold-deep" />
              {course.online ? "Online" : "Yonkers"}
            </p>
          </div>

          {/* Descripción y acciones */}
          <div className="lg:col-span-5">
            <p className="text-[14px] leading-[1.75] text-stone">{course.text}</p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <motion.button
                onClick={onRegister}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0, scale: 0.985 }}
                transition={{ type: "spring", stiffness: 400, damping: 26 }}
                className="gradient-gold label cursor-pointer rounded-md px-5 py-2.5 text-[10px] text-navy shadow-[0_8px_22px_-10px_rgba(208,142,8,0.8)]"
              >
                Registrarme
              </motion.button>
              <MeetingActions meeting={meetings[course.meeting]} />
            </div>
          </div>
        </div>
      </article>
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

        <Stagger step={0.1} className="mt-12 lg:mt-16">
          {training.courses.map((c, i) => (
            <CourseRow
              key={c.name}
              course={c}
              index={i}
              onRegister={() => open("inscripcion", { formacion: etiquetaFormacion(c) })}
            />
          ))}
        </Stagger>

        <Reveal delay={0.12} className="mt-14 text-center">
          <CTAButton variant="outline" onClick={() => open("inscripcion")}>
            Ver todas las formaciones
          </CTAButton>
        </Reveal>
      </div>
    </section>
  );
}
