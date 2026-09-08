/**
 * Marcadores de imagen para los huecos cuyo material fotográfico
 * aún no ha entregado el cliente.
 *
 * Cuando lleguen las fotos basta con pasar `src`:
 *   <ImagePlaceholder src="/fotos/pastores.jpg" alt="…" label="…" />
 *
 * El manual (pág. 32 y 34) pide fotografía auténtica, natural y de
 * alta calidad, así que el marcador describe el tipo de imagen que
 * debe ocupar cada hueco.
 */

const tones = {
  light: {
    surface: "bg-[linear-gradient(135deg,#f7f5ef_0%,#ece7db_55%,#ded7c6_100%)]",
    border: "border-navy/10",
    text: "text-stone",
    accent: "text-gold-deep",
  },
  navy: {
    surface: "bg-[linear-gradient(135deg,#24406f_0%,#1c3661_55%,#12233f_100%)]",
    border: "border-white/12",
    text: "text-navy-mist",
    accent: "text-gold-light",
  },
};

function PhotoIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.25" stroke="currentColor" strokeWidth="1.3" />
      <circle cx="8.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.3" />
      <path
        d="M3 16.5 8.7 11.9a1.6 1.6 0 0 1 2.1.05L16 16.5m0 0 2.2-1.9a1.6 1.6 0 0 1 2.1.06L21 15.3M16 16.5l2.6 2.4"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ImagePlaceholder({
  label = "Imagen",
  src,
  alt,
  tone = "light",
  ratio = "4/5",
  rounded = "rounded-lg",
  className = "",
  align = "center",
  children,
}) {
  const t = tones[tone] ?? tones.light;

  return (
    <div
      className={`relative isolate overflow-hidden border ${t.border} ${rounded} ${t.surface} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <img src={src} alt={alt ?? label} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <>
          <div
            className={`absolute inset-0 flex flex-col items-center gap-3 px-8 text-center ${
              align === "top" ? "justify-start pt-[18%]" : "justify-center"
            }`}
          >
            <PhotoIcon className={`h-7 w-7 ${t.accent}`} />
            <p className={`label max-w-[28ch] text-[10px] leading-relaxed ${t.text}`}>[{label}]</p>
          </div>
          {/* Filete dorado inferior: ancla el marcador al sistema */}
          <span aria-hidden="true" className="rule-gold absolute inset-x-0 bottom-0 h-[3px]" />
        </>
      )}
      {children}
    </div>
  );
}
