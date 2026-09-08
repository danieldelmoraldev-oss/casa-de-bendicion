/**
 * Identificador de Casa de Bendición.
 * ------------------------------------------------------------
 * Normas aplicadas (Manual de Identidad, págs. 8-12 y 21):
 *  · Sólo se usan las versiones oficiales entregadas por el cliente.
 *  · No se rota, deforma, recorta ni se le aplican sombras, filtros
 *    o efectos: el componente sólo controla tamaño y versión.
 *  · Se elige la versión según el contraste del fondo:
 *      fondo claro  → versión positiva
 *      fondo oscuro → versión negativa
 *  · `protection` reserva el área de protección alrededor.
 *  · Reducción mínima (pág. 12): isotipo 32 px, vertical 120 px,
 *    horizontal 240 px de ancho. Los tamaños por defecto la respetan.
 */

const FILES = {
  horizontal: {
    positive: "/marca/cdb-horizontal.png",
    negative: "/marca/cdb-horizontal-negativo.png",
  },
  vertical: {
    positive: "/marca/cdb-vertical.png",
    negative: "/marca/cdb-vertical-negativo.png",
  },
  isotipo: {
    positive: "/marca/cdb-isotipo.png",
    negative: "/marca/cdb-isotipo-negativo.png",
  },
};

/* Anchos mínimos autorizados, en px (pág. 12) */
export const MIN_WIDTH = { horizontal: 240, vertical: 120, isotipo: 32 };

export default function Logo({
  version = "horizontal",
  tone = "positive",
  className = "h-11",
  protection = false,
  alt = "Casa de Bendición",
  priority = false,
}) {
  const src = (FILES[version] ?? FILES.horizontal)[tone === "negative" ? "negative" : "positive"];

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} w-auto select-none ${protection ? "p-[0.35em]" : ""}`}
      draggable="false"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}

/**
 * Logo de ministerio / iniciativa.
 * Los archivos son las versiones horizontales a color, por lo que
 * deben ir siempre sobre fondo claro (blanco o marfil).
 *
 * Corrección óptica: casi todos los archivos son lockups apaisados
 * y con la misma altura pesan igual. KICK es la excepción — el
 * cliente sólo entregó su versión apilada — así que se le da más
 * altura para que no quede pequeño junto a los demás. Es un ajuste
 * de escala uniforme: no deforma la marca.
 */
const OPTICAL_SCALE = { kick: 1.5 };

export function MinistryLogo({ slug, name, height = 44, className = "" }) {
  const h = Math.round(height * (OPTICAL_SCALE[slug] ?? 1));
  return (
    <img
      src={`/ministerios/${slug}.png`}
      alt={name}
      style={{ height: h }}
      className={`w-auto max-w-full select-none object-contain object-left ${className}`}
      draggable="false"
      loading="lazy"
    />
  );
}
