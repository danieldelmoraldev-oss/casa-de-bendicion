/**
 * Direcciones y "añadir al calendario".
 * ------------------------------------------------------------------
 * Se genera un fichero .ics en lugar de un enlace a Google Calendar:
 * funciona igual en Google, Apple, Outlook y móvil, sin obligar a
 * nadie a tener cuenta de Google.
 *
 * Todos los eventos salen como RECURRENTES por defecto, que es lo que
 * pidió el cliente: semanales las reuniones y mensuales las dos
 * formaciones de Blueprint (1er y 3er martes).
 *
 * Las horas van con TZID=America/New_York e incluyen el bloque
 * VTIMEZONE: la iglesia está en Nueva York y el evento debe caer a esa
 * hora aunque quien lo añada esté en otro huso.
 */

const TZ = "America/New_York";

/* Domingo = 0, como en Date.getDay() */
const ICS_DAYS = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"];

/* ------------------------------------------------------------------ */
/* Dirección                                                           */
/* ------------------------------------------------------------------ */
export function mapsUrl(address) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

/* ------------------------------------------------------------------ */
/* Primera ocurrencia                                                  */
/* ------------------------------------------------------------------ */

/** Próxima vez que cae `weekday` a las `hour:minute` (hoy incluido). */
function nextWeekday(weekday, hour, minute) {
  const d = new Date();
  d.setHours(hour, minute, 0, 0);
  let salto = (weekday - d.getDay() + 7) % 7;
  if (salto === 0 && d.getTime() < Date.now()) salto = 7;
  d.setDate(d.getDate() + salto);
  return d;
}

/** Próximo "n-ésimo <weekday> del mes" (p. ej. 3er martes). */
function nextNthWeekday(nth, weekday, hour, minute) {
  const hoy = new Date();
  for (let salto = 0; salto < 13; salto++) {
    const d = new Date(hoy.getFullYear(), hoy.getMonth() + salto, 1, hour, minute, 0, 0);
    d.setDate(1 + ((weekday - d.getDay() + 7) % 7) + (nth - 1) * 7);
    if (d.getMonth() === (hoy.getMonth() + salto) % 12 && d.getTime() >= Date.now()) return d;
  }
  return nextWeekday(weekday, hour, minute); // salvaguarda
}

function primeraOcurrencia(ev) {
  return ev.recur?.freq === "MONTHLY"
    ? nextNthWeekday(ev.recur.nth, ev.weekday, ev.hour, ev.minute)
    : nextWeekday(ev.weekday, ev.hour, ev.minute);
}

/* ------------------------------------------------------------------ */
/* Construcción del .ics                                               */
/* ------------------------------------------------------------------ */
const dosDigitos = (n) => String(n).padStart(2, "0");

function fechaLocal(d) {
  return (
    `${d.getFullYear()}${dosDigitos(d.getMonth() + 1)}${dosDigitos(d.getDate())}` +
    `T${dosDigitos(d.getHours())}${dosDigitos(d.getMinutes())}00`
  );
}

function fechaUtc(d) {
  return (
    `${d.getUTCFullYear()}${dosDigitos(d.getUTCMonth() + 1)}${dosDigitos(d.getUTCDate())}` +
    `T${dosDigitos(d.getUTCHours())}${dosDigitos(d.getUTCMinutes())}${dosDigitos(d.getUTCSeconds())}Z`
  );
}

/* Escapado de los campos de texto según RFC 5545 */
function escapar(texto = "") {
  return String(texto)
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");
}

/* Las líneas no deben pasar de 75 octetos */
function plegar(linea) {
  if (linea.length <= 75) return linea;
  const trozos = [linea.slice(0, 75)];
  let resto = linea.slice(75);
  while (resto.length > 74) {
    trozos.push(" " + resto.slice(0, 74));
    resto = resto.slice(74);
  }
  if (resto) trozos.push(" " + resto);
  return trozos.join("\r\n");
}

function reglaRepeticion(recur, weekday) {
  if (!recur) return null;
  if (recur.freq === "MONTHLY") {
    return `RRULE:FREQ=MONTHLY;BYDAY=${recur.nth}${ICS_DAYS[weekday]}`;
  }
  return `RRULE:FREQ=WEEKLY;BYDAY=${ICS_DAYS[weekday]}`;
}

const VTIMEZONE = [
  "BEGIN:VTIMEZONE",
  `TZID:${TZ}`,
  "BEGIN:DAYLIGHT",
  "TZOFFSETFROM:-0500",
  "TZOFFSETTO:-0400",
  "TZNAME:EDT",
  "DTSTART:19700308T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU",
  "END:DAYLIGHT",
  "BEGIN:STANDARD",
  "TZOFFSETFROM:-0400",
  "TZOFFSETTO:-0500",
  "TZNAME:EST",
  "DTSTART:19701101T020000",
  "RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU",
  "END:STANDARD",
  "END:VTIMEZONE",
];

export function buildIcs(ev) {
  const inicio = primeraOcurrencia(ev);
  const fin = new Date(inicio.getTime() + (ev.durationMin ?? 90) * 60000);
  const uid = `${ev.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${inicio.getTime()}@casadebendicion`;

  const lineas = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Casa de Bendicion//Web//ES",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    ...VTIMEZONE,
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${fechaUtc(new Date())}`,
    `DTSTART;TZID=${TZ}:${fechaLocal(inicio)}`,
    `DTEND;TZID=${TZ}:${fechaLocal(fin)}`,
    reglaRepeticion(ev.recur, ev.weekday),
    `SUMMARY:${escapar(ev.title)}`,
    ev.description ? `DESCRIPTION:${escapar(ev.description)}` : null,
    ev.location ? `LOCATION:${escapar(ev.location)}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  return lineas.map(plegar).join("\r\n");
}

/** Descarga el .ics. En móvil el sistema lo abre con la app de calendario. */
export function downloadIcs(ev) {
  const blob = new Blob([buildIcs(ev)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${ev.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
