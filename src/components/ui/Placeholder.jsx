/**
 * Placeholders de imagen y logo.
 * ------------------------------------------------------------
 * Mientras no existan los recursos gráficos finales, estos
 * componentes dibujan un marco elegante con la descripción de
 * la foto que debe ir ahí.
 *
 * Cuando lleguen las imágenes reales basta con pasar `src`:
 *   <ImagePlaceholder src="/img/hero.jpg" alt="…" label="…" />
 * y el componente renderiza la foto en lugar del marcador.
 */

const tones = {
  dark: {
    surface:
      "bg-[radial-gradient(120%_120%_at_20%_10%,#1d2534_0%,#11151e_45%,#0a0d14_100%)]",
    border: "border-cream/10",
    text: "text-mist",
    accent: "text-gold/70",
    grid: "opacity-[0.14]",
  },
  light: {
    surface:
      "bg-[radial-gradient(120%_120%_at_25%_10%,#f3ece0_0%,#e6dccc_50%,#d8ccb8_100%)]",
    border: "border-ink/10",
    text: "text-stone",
    accent: "text-gold-deep/80",
    grid: "opacity-[0.10] invert",
  },
  gold: {
    surface:
      "bg-[radial-gradient(120%_120%_at_25%_10%,#3a2c17_0%,#231a0d_55%,#14100a_100%)]",
    border: "border-gold/20",
    text: "text-gold-soft/70",
    accent: "text-gold/80",
    grid: "opacity-[0.16]",
  },
};

function PhotoIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.25" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8.5" cy="10" r="1.6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M3 16.5 8.7 11.9a1.6 1.6 0 0 1 2.1.05L16 16.5m0 0 2.2-1.9a1.6 1.6 0 0 1 2.1.06L21 15.3M16 16.5l2.6 2.4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Esquinas tipo visor de cámara. */
function Corners({ className = "" }) {
  const c = "absolute h-4 w-4 border-current";
  return (
    <div className={`pointer-events-none absolute inset-3 ${className}`}>
      <span className={`${c} left-0 top-0 border-l border-t`} />
      <span className={`${c} right-0 top-0 border-r border-t`} />
      <span className={`${c} bottom-0 left-0 border-b border-l`} />
      <span className={`${c} bottom-0 right-0 border-b border-r`} />
    </div>
  );
}

export default function ImagePlaceholder({
  label = "Imagen",
  src,
  alt,
  tone = "dark",
  ratio = "4/5",
  rounded = "rounded-[26px]",
  className = "",
  showCorners = true,
  align = "center",
  children,
}) {
  const t = tones[tone] ?? tones.dark;

  return (
    <div
      className={`relative isolate overflow-hidden border ${t.border} ${rounded} ${t.surface} ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {src ? (
        <img src={src} alt={alt ?? label} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <>
          <div className={`absolute inset-0 dot-grid ${t.grid}`} />
          {showCorners && <Corners className={t.accent} />}
          <div
            className={`absolute inset-0 flex flex-col items-center gap-3 px-8 text-center ${
              align === "top" ? "justify-start pt-[20%]" : "justify-center"
            }`}
          >
            <PhotoIcon className={`h-7 w-7 ${t.accent}`} />
            <p
              className={`max-w-[26ch] text-[11px] font-medium uppercase leading-relaxed tracking-[0.16em] ${t.text}`}
            >
              [{label}]
            </p>
          </div>
          {/* Brillo diagonal sutil */}
          <div className="pointer-events-none absolute -inset-x-10 -top-1/2 h-[200%] rotate-12 bg-gradient-to-r from-transparent via-white/[0.045] to-transparent" />
        </>
      )}
      {children}
    </div>
  );
}

/** Marcador cuadrado para los logos de ministerios / iniciativas. */
export function LogoPlaceholder({ label = "Logo", src, tone = "dark", className = "" }) {
  const t = tones[tone] ?? tones.dark;
  if (src) {
    return <img src={src} alt={label} className={`object-contain ${className}`} />;
  }
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border ${t.border} ${t.surface} ${className}`}
    >
      <span
        className={`px-2 text-center text-[8.5px] font-semibold uppercase leading-tight tracking-[0.14em] ${t.accent}`}
      >
        {label}
      </span>
    </div>
  );
}
