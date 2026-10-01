import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero, meetings } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { EASE, Reveal, SplitHeading } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import CTAButton, { Arrow } from "../ui/Button";
import { ArcDivider, FlameWatermark } from "../ui/Decor";
import { ClockIcon, PinIcon } from "../ui/Icons";
import MeetingActions from "../ui/MeetingActions";

/* Sobre vídeo, la sombra `lg:[text-shadow:…]` sostiene el texto en los
   fotogramas más claros. No cuenta para el contraste medido, pero en
   movimiento es la diferencia entre leer cómodo y entornar los ojos. Va
   escrita entera en cada sitio: Tailwind sólo genera las clases que
   encuentra literales, nunca las que se componen en tiempo de
   ejecución.                                                           */

/* ------------------------------------------------------------------ */
/* Barra inferior con los horarios — equivale a la franja de accesos   */
/* rápidos del mockup del manual (pág. 32)                             */
/* ------------------------------------------------------------------ */
function ScheduleBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 1, ease: EASE }}
      className="relative z-20 border-t border-line bg-white"
    >
      <div className="shell">
        <div className="grid grid-cols-1 divide-y divide-line md:grid-cols-3 md:divide-x md:divide-y-0">
          {hero.schedule.map((s) => (
            <div key={s.day} className="group flex flex-col gap-3 py-6 md:pr-8 md:first:pl-0">
              <div className="flex items-center gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-navy text-white transition-colors duration-400 group-hover:bg-gold group-hover:text-navy">
                  <ClockIcon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="label text-[10.5px] text-gold-deep">
                    {s.day} · {s.time}
                  </p>
                  <p className="mt-1 truncate text-[14.5px] font-semibold text-navy">{s.label}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[12.5px] text-stone">
                    <PinIcon className="h-3 w-3 shrink-0 text-gold-deep" />
                    {s.place}
                  </p>
                </div>
              </div>
              <MeetingActions meeting={meetings[s.meeting]} className="pl-[60px]" />
            </div>
          ))}

          <a href="#reuniones" className="group flex items-center justify-between gap-4 py-6 md:pl-8">
            <div>
              <p className="label text-[10.5px] text-gold-deep">Toda la semana</p>
              <p className="mt-1 text-[14.5px] font-semibold text-navy transition-colors duration-300 group-hover:text-gold-deep">
                Ver todas las reuniones
              </p>
            </div>
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-navy/15 text-navy transition-all duration-400 group-hover:border-gold group-hover:bg-gold">
              <Arrow />
            </span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* El vídeo de fondo se reproduce en todos los tamaños, móvil incluido:
   la mayor parte del tráfico llega desde Instagram y WhatsApp, así que
   dejar el hero congelado justo ahí vaciaría de sentido tener vídeo.

   Sólo se queda el póster en dos casos, y los dos los pide el visitante:
   si ha activado el ahorro de datos o si ha pedido reducir el
   movimiento. El póster es un fotograma del propio vídeo, así que el
   hero nunca se ve vacío.

   Hay dos cortes del mismo vídeo y se elige por ancho de pantalla: el
   ancho (16:9) para el hero a pantalla completa y el estrecho (4:3)
   para el bloque vertical de móvil, donde un 16:9 perdería media
   escena por los lados.                                                */
function useFondo() {
  const [fondo, setFondo] = useState(() => ({
    animado: false,
    /* Se resuelve ya en el primer render para no pedir el corte
       equivocado y tener que cambiarlo después. */
    ancho: window.matchMedia("(min-width: 1024px)").matches,
  }));

  useEffect(() => {
    const ancha = window.matchMedia("(min-width: 1024px)");
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)");
    /* No todos los navegadores traen la API de red; si no está, se
       entiende que no hay ahorro de datos activo. */
    const ahorro = () => navigator.connection?.saveData === true;
    const evaluar = () =>
      setFondo({ animado: !quieto.matches && !ahorro(), ancho: ancha.matches });

    evaluar();
    ancha.addEventListener("change", evaluar);
    quieto.addEventListener("change", evaluar);
    navigator.connection?.addEventListener("change", evaluar);
    return () => {
      ancha.removeEventListener("change", evaluar);
      quieto.removeEventListener("change", evaluar);
      navigator.connection?.removeEventListener("change", evaluar);
    };
  }, []);

  return fondo;
}

/* ------------------------------------------------------------------ */
export default function Hero() {
  const ref = useRef(null);
  const { open } = useModal();
  const { animado, ancho } = useFondo();
  const fuente = ancho
    ? { video: hero.media.videoAncho, poster: hero.media.posterAncho }
    : { video: hero.media.video, poster: hero.media.poster };

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yPhoto = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const scalePhoto = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative isolate bg-navy pt-[74px] lg:flex lg:min-h-screen lg:flex-col lg:pt-[86px]"
    >
      {/* ---------------- Fondo ----------------
          En móvil es un bloque por encima del panel azul. En escritorio
          cubre toda la sección y el texto va encima, a pantalla completa
          como pidió el cliente. El navbar es blanco y opaco, así que la
          pantalla completa es todo lo que queda por debajo de él.      */}
      <div className="relative h-[42vh] min-h-[280px] overflow-hidden lg:absolute lg:inset-0 lg:h-auto lg:min-h-0">
        {animado ? (
          /* Decorativo: el contenido del hero ya está en el titular, así
             que el vídeo no añade nada que leer en voz alta. */
          <motion.video
            key={fuente.video}
            src={fuente.video}
            poster={fuente.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
            style={{ y: yPhoto, scale: scalePhoto }}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
        ) : (
          <motion.img
            src={fuente.poster}
            alt={hero.media.alt}
            style={{ y: yPhoto, scale: scalePhoto }}
            className="absolute inset-0 h-full w-full object-cover object-center"
            fetchPriority="high"
          />
        )}
        {/* Velo azul para unificar la imagen con la identidad */}
        <div className="absolute inset-0 bg-navy/25 mix-blend-multiply lg:hidden" />
        {/* En escritorio el titular va sobre el vídeo y necesita un velo
            detrás. El velo es negro, no azul, por una razón medida: a
            igualdad de legibilidad el negro necesita menos opacidad que
            el azul institucional (60% frente a 79% en el borde
            izquierdo), así que deja ver más vídeo y no tiñe de azul los
            tonos de piel. Con estos valores el titular queda en 3,3:1,
            por encima del mínimo de 3:1 para texto grande; aclararlo más
            lo baja de ese umbral. */}
        <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgba(0,0,0,0.60)_0%,rgba(0,0,0,0.50)_28%,rgba(0,0,0,0.32)_58%,rgba(0,0,0,0.19)_82%)] lg:block" />
        {/* Curva de transición en móvil */}
        <ArcDivider to="navy" position="bottom" height={70} className="lg:hidden" />
      </div>

      {/* ---------------- Panel ---------------- */}
      <div className="relative flex items-center bg-navy py-16 lg:z-10 lg:flex-1 lg:bg-transparent">
        <FlameWatermark
          className="-left-16 top-4 text-white lg:hidden"
          size={420}
          opacity={0.045}
          duration={16}
        />

        <div className="relative z-20 w-full pl-6 pr-6 lg:pl-[max(3rem,calc((100vw-82rem)/2+3rem))] lg:pr-16">
          <div className="max-w-2xl">
            <Eyebrow theme="navy">{hero.eyebrow}</Eyebrow>

            <SplitHeading
              as="h1"
              mount
              lines={hero.title}
              accentLines={[1]}
              delay={0.2}
              className="display mt-6 text-[clamp(2.3rem,4.6vw,4rem)] text-white lg:[text-shadow:0_2px_20px_rgba(18,35,63,0.8)]"
            />

            <Reveal mount delay={0.7} className="mt-7">
              <p className="text-[18px] font-medium leading-relaxed text-white/90 sm:text-[20px] lg:text-white lg:[text-shadow:0_2px_20px_rgba(18,35,63,0.8)]">
                {hero.lead}
              </p>
              <p className="mt-4 max-w-xl text-[14.5px] leading-relaxed text-navy-mist lg:text-white/90 lg:[text-shadow:0_2px_20px_rgba(18,35,63,0.8)]">
                {hero.body}
              </p>
            </Reveal>

            <Reveal
              mount
              delay={0.85}
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <CTAButton onClick={() => open("planifica-tu-visita")}>
                Planifica tu visita
              </CTAButton>
              <CTAButton variant="light" onClick={() => open("quiero-conectarme")}>
                Conéctate con nosotros
              </CTAButton>
            </Reveal>
          </div>
        </div>
      </div>

      <ScheduleBar />
    </section>
  );
}
