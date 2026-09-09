import { downloadIcs, mapsUrl } from "../../lib/calendar";
import { PinIcon, ScreenIcon } from "./Icons";

function CalendarIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <rect
        x="3.25"
        y="5.25"
        width="17.5"
        height="15.5"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M3.5 10h17M8 3.5v3.5M16 3.5v3.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M12 13v4M10 15h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Par de acciones de una reunión: cómo llegar y añadir al calendario.
 *
 * El evento se añade siempre como recurrente (semanal o mensual, según
 * la reunión), que es lo que pidió el cliente.
 *
 * Si la reunión es online no se pinta el botón de dirección: no hay
 * sitio al que llegar. En su lugar se marca como "Online".
 */
export default function MeetingActions({ meeting, theme = "light", className = "" }) {
  const online = !meeting.address;

  const estilos =
    theme === "navy"
      ? "border-white/20 text-white/80 hover:border-gold hover:bg-gold hover:text-navy"
      : "border-navy/15 text-navy/75 hover:border-gold hover:bg-gold hover:text-navy";

  const base =
    "label inline-flex items-center gap-2 rounded-md border px-3 py-2 text-[9.5px] " +
    "transition-colors duration-400 cursor-pointer whitespace-nowrap";

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {online ? (
        <span
          className={`${base} ${theme === "navy" ? "border-white/15 text-white/50" : "border-navy/12 text-navy/45"} cursor-default`}
        >
          <ScreenIcon className="h-3.5 w-3.5" />
          Online
        </span>
      ) : (
        <a
          href={mapsUrl(meeting.address)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Cómo llegar a ${meeting.address}`}
          className={`${base} ${estilos}`}
        >
          <PinIcon className="h-3.5 w-3.5" />
          Cómo llegar
        </a>
      )}

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          downloadIcs(meeting.event);
        }}
        aria-label={`Añadir ${meeting.event.title} al calendario`}
        className={`${base} ${estilos}`}
      >
        <CalendarIcon />
        Añadir al calendario
      </button>
    </div>
  );
}
