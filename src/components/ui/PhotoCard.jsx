import { useState } from "react";
import { motion } from "framer-motion";
import { StaggerItem } from "./Motion";
import { Arrow } from "./Button";

/**
 * Tarjeta con fotografía de fondo y contenido superpuesto.
 * La usan Ministerios y "Momentos que marcan".
 *
 * Sobre el contraste: la foto lleva siempre un velo en azul
 * institucional que va de opaco abajo a casi transparente arriba, y
 * el logo —cuando lo hay— se apoya en una placa blanca. Así el
 * identificador nunca queda directamente sobre la fotografía, uso
 * que el manual prohíbe en la pág. 21.
 */
export default function PhotoCard({
  photo,
  alt,
  brand,
  title,
  text,
  footnote,
  onClick,
  minHeight = "27rem",
}) {
  /* Red de seguridad: si la foto no existe o falla al cargar, la
     tarjeta cae al degradado institucional en vez de enseñar una
     imagen rota. */
  const [falloFoto, setFalloFoto] = useState(false);
  const hayFoto = Boolean(photo) && !falloFoto;

  return (
    <StaggerItem className="h-full">
      <motion.button
        onClick={onClick}
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className="group relative flex h-full w-full cursor-pointer flex-col justify-end overflow-hidden rounded-xl bg-navy text-left shadow-[0_22px_55px_-38px_rgba(28,54,97,0.6)] transition-shadow duration-500 hover:shadow-[0_36px_80px_-38px_rgba(28,54,97,0.75)]"
        style={{ minHeight }}
      >
        {/* Fotografía */}
        {hayFoto ? (
          <img
            src={photo}
            alt={alt}
            loading="lazy"
            onError={() => setFalloFoto(true)}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        ) : (
          <>
            <div className="absolute inset-0 bg-[linear-gradient(150deg,#24406f_0%,#1c3661_55%,#12233f_100%)]" />
            <span className="label absolute right-4 top-4 z-20 rounded-md border border-white/20 px-2.5 py-1.5 text-[8.5px] text-white/55">
              Foto pendiente
            </span>
          </>
        )}

        {/* Velo azul: garantiza la lectura del contenido */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-navy via-navy/80 to-navy/15"
        />

        {/* Filete dorado al pasar el ratón */}
        <span
          aria-hidden="true"
          className="gradient-gold absolute inset-x-0 top-0 z-20 h-[4px] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
        />

        {/* Contenido */}
        <div className="relative z-10 flex flex-col p-6 sm:p-7">
          {brand && (
            /* Placa blanca: el logo no toca la fotografía */
            <span className="mb-5 inline-flex w-fit rounded-md bg-white px-3.5 py-2.5 shadow-[0_8px_22px_-12px_rgba(0,0,0,0.6)]">
              {brand}
            </span>
          )}

          {title && (
            <h3 className="display text-[clamp(1.3rem,2vw,1.6rem)] leading-tight text-white">
              {title}
            </h3>
          )}

          {text && (
            <p className={`text-[13.5px] leading-[1.7] text-white/80 ${title ? "mt-2.5" : ""}`}>
              {text}
            </p>
          )}

          <div className="mt-6 flex items-end justify-between gap-4 border-t border-white/20 pt-4">
            <span className="text-[9.5px] font-bold uppercase leading-tight tracking-[0.12em] text-white/50">
              {footnote}
            </span>
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/30 text-white transition-all duration-400 group-hover:border-gold group-hover:bg-gold group-hover:text-navy">
              <Arrow className="h-3.5 w-3.5" />
            </span>
          </div>
        </div>
      </motion.button>
    </StaggerItem>
  );
}
