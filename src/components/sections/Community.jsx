import { community } from "../../data/site";
import { useModal } from "../../context/ModalContext";
import { Reveal, SplitHeading, Stagger, StaggerItem } from "../ui/Motion";
import Eyebrow from "../ui/Eyebrow";
import { DualCTA, Arrow } from "../ui/Button";
import Logo, { MinistryLogo } from "../ui/Logo";
import { ArcDivider, FlameWatermark, GoldRule } from "../ui/Decor";

/* El título del documento son tres frases: una por línea. */
const titleLines = community.title
  .split(". ")
  .map((s, i, a) => (i < a.length - 1 ? `${s}.` : s));

/* ------------------------------------------------------------------ */
/* Cada plataforma es una tarjeta con fotografía ancha a todo el       */
/* ancho del bloque y el contenido debajo.                             */
function Platform({ platform, onAction }) {
  return (
    <StaggerItem>
      <article className="group relative mb-6 overflow-hidden rounded-xl bg-navy-deep/60 shadow-[0_26px_60px_-40px_rgba(0,0,0,0.9)] lg:mb-8">
        <span aria-hidden="true" className="gradient-gold absolute inset-x-0 top-0 z-20 h-[4px]" />

        {/* Banner: la foto ocupa todo el ancho de la subdivisión */}
        <div className="relative h-[220px] overflow-hidden sm:h-[280px] lg:h-[320px]">
          {platform.photo ? (
            <img
              src={`/comunidad/${platform.photoSlug}.jpg`}
              alt={platform.name}
              loading="lazy"
              /* El banner es muy apaisado y el navegador recorta el alto:
                 cada plataforma elige qué banda de la foto se ve. */
              style={{ objectPosition: `center ${platform.photoFocus ?? "50%"}` }}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-[linear-gradient(150deg,#24406f_0%,#1c3661_55%,#12233f_100%)]" />
              <span className="label absolute right-4 top-5 z-20 rounded-md border border-white/20 px-2.5 py-1.5 text-[8.5px] text-white/55">
                Foto pendiente
              </span>
            </>
          )}

          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-deep via-navy-deep/75 to-navy-deep/20"
          />

          <div className="relative flex h-full flex-col justify-between p-6 sm:p-8">
            <span className="display text-gold-gradient text-[clamp(2.2rem,3.4vw,3rem)] leading-none">
              {platform.index}
            </span>

            <div>
              {/* Los logos son a color: van sobre placa blanca (pág. 10).
                  Community Outreach no tiene marca propia, así que usa
                  el identificador de Casa de Bendición. */}
              <span className="mb-5 inline-flex rounded-md bg-white px-4 py-3 shadow-[0_8px_22px_-12px_rgba(0,0,0,0.7)]">
                {platform.slug ? (
                  <MinistryLogo slug={platform.slug} name={platform.name} height={34} />
                ) : (
                  <Logo version="horizontal" className="h-8" alt={platform.name} />
                )}
              </span>
              <h3 className="display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight text-white transition-colors duration-400 group-hover:text-gold-light">
                {platform.name}
              </h3>
              <p className="label mt-2 text-[10px] text-gold-light/85">{platform.en}</p>
            </div>
          </div>
        </div>

        {/* Cuerpo */}
        <div className="p-6 sm:p-8">
          <p className="max-w-[80ch] text-[15px] leading-[1.85] text-navy-mist">{platform.text}</p>

          {platform.extensions.length > 0 && (
            <div className="mt-8">
              <p className="label text-[9.5px] text-white/40">Extensiones</p>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {platform.extensions.map((ext) => (
                  <div
                    key={ext.name}
                    className="flex flex-col rounded-lg bg-white p-5 transition-transform duration-400 hover:-translate-y-1"
                  >
                    <MinistryLogo slug={ext.slug} name={ext.name} height={36} />
                    <p className="mt-4 flex-1 text-[12.5px] leading-relaxed text-stone">
                      {ext.text}
                    </p>
                    {ext.action && (
                      <button
                        onClick={() => onAction(ext.action.modal)}
                        className="group/btn mt-5 inline-flex w-fit cursor-pointer items-center gap-2.5 rounded-md border-2 border-navy/20 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.14em] text-navy transition-colors duration-400 hover:border-gold hover:bg-gold"
                      >
                        {ext.action.label}
                        <Arrow className="h-3 w-3 transition-transform duration-400 group-hover/btn:translate-x-0.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </article>
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
export default function Community() {
  const { open } = useModal();

  return (
    <section id="comunidad" className="relative isolate overflow-hidden bg-navy py-28 lg:py-36">
      <FlameWatermark className="-right-24 top-24 text-white" size={520} opacity={0.035} />

      <div className="shell relative">
        <Eyebrow theme="navy">{community.eyebrow}</Eyebrow>

        <SplitHeading
          lines={titleLines}
          accentLines={[2]}
          delay={0.08}
          step={0.038}
          className="display mt-7 max-w-5xl text-[clamp(1.9rem,4.2vw,3.5rem)] text-white"
        />

        <Reveal delay={0.18} className="mt-8 flex items-center gap-4">
          <GoldRule width="2.5rem" />
          <p className="label text-[10.5px] text-gold-light/90">{community.subtitleEn}</p>
        </Reveal>

        <Reveal delay={0.24} className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-14">
          {community.paragraphs.map((p, i) => (
            <p
              key={i}
              className={`text-[15px] leading-[1.85] ${i === 0 ? "font-medium text-white/90" : "text-navy-mist"}`}
            >
              {p}
            </p>
          ))}
        </Reveal>

        {/* Plataformas */}
        <div className="relative mt-20 lg:mt-28">
          <Stagger step={0.12}>
            {community.platforms.map((p) => (
              <Platform key={p.name} platform={p} onAction={open} />
            ))}
          </Stagger>
        </div>

        <Reveal delay={0.12} className="mt-20 border-t border-white/12 pt-16 text-center">
          <p className="display mx-auto max-w-3xl text-[clamp(1.8rem,4vw,3rem)] leading-tight text-white">
            {community.closing}
          </p>
          <DualCTA theme="navy" align="center" className="mt-10 items-center" />
        </Reveal>
      </div>

      <ArcDivider to="ivory" position="bottom" height={110} />
    </section>
  );
}
