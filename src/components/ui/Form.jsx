import { motion } from "framer-motion";
import { contact } from "../../data/site";
import { EASE } from "./Motion";
import CTAButton from "./Button";

/**
 * Campos de formulario generados desde el esquema de `lib/modals.js`.
 * Se comparten entre el modal global y el formulario embebido de
 * "¿Es tu primera vez?", así el esquema es la única fuente de verdad.
 */

const fieldBase =
  "w-full rounded-md border border-white/15 bg-white/[0.06] px-4 py-3 text-[15px] text-white " +
  "placeholder:text-navy-mist/60 outline-none transition-all duration-300 " +
  "focus:border-gold focus:bg-white/[0.1] focus:ring-2 focus:ring-gold/25";

export function Field({ field, prefill, disabled = false }) {
  const id = `f-${field.name}`;
  const preset = prefill?.[field.name];

  return (
    <div className={field.span === 2 ? "sm:col-span-2" : "sm:col-span-1"}>
      <label
        htmlFor={id}
        className="label mb-2 block text-[10px] text-navy-mist"
      >
        {field.label}
        {field.required && <span className="ml-1 text-gold-light">*</span>}
      </label>

      {field.type === "textarea" ? (
        <textarea id={id} name={field.name} rows={3} disabled={disabled} className={`${fieldBase} resize-none`} />
      ) : field.type === "select" ? (
        <div className="relative">
          <select
            id={id}
            name={field.name}
            disabled={disabled}
            defaultValue={preset ?? ""}
            className={`${fieldBase} appearance-none pr-10 [&>option]:bg-navy-deep`}
          >
            <option value="" disabled>
              Selecciona…
            </option>
            {field.options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gold-light"
            fill="none"
          >
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>
      ) : (
        <input
          id={id}
          name={field.name}
          type={field.type}
          min={field.min}
          disabled={disabled}
          defaultValue={preset ?? undefined}
          className={fieldBase}
          placeholder={field.type === "email" ? "tunombre@email.com" : ""}
        />
      )}
    </div>
  );
}

export function FormFields({ fields, prefill, disabled = false, className = "" }) {
  return (
    <div className={`grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 ${className}`}>
      {fields.map((f) => (
        <Field key={f.name} field={f} prefill={prefill} disabled={disabled} />
      ))}
      {/* Trampa antispam: invisible para una persona, irresistible para
          los bots que rellenan todo lo que encuentran. Si llega con
          contenido, lib/forms.js descarta el envío en silencio. */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Plantilla de correo, mantenimiento y error                          */
/* ------------------------------------------------------------------ */
/* El mailto sigue vivo por dos motivos: es el aviso que se muestra si
   no hay servicio de envío configurado, y es la salida de emergencia
   cuando un envío falla. Un formulario caído no puede dejar a nadie
   sin manera de escribir.                                             */

const SALTO = "\n";

/** Plantilla de correo con los mismos campos que el formulario, para
    que quien escriba no tenga que adivinar qué contar. */
function cuerpoCorreo(config, prefill) {
  const lineas = config.fields.map((f) => {
    const valor = prefill?.[f.name] ?? "";
    return `${f.label}: ${valor}`;
  });
  return ["Hola, escribo desde la web.", "", ...lineas, "", "Gracias."].join(SALTO);
}

export function mailtoFor(config, prefill) {
  const asunto = `[Web] ${config.eyebrow}`;
  return (
    `mailto:${contact.email}` +
    `?subject=${encodeURIComponent(asunto)}` +
    `&body=${encodeURIComponent(cuerpoCorreo(config, prefill))}`
  );
}

/** Aviso que sustituye al botón de enviar mientras no haya envío real. */
export function FormMaintenance({ config, prefill, className = "" }) {
  return (
    <div
      className={`rounded-lg border border-gold/35 bg-gold/[0.08] p-5 text-center sm:p-6 ${className}`}
    >
      <p className="label text-[9.5px] text-gold-light">Temporalmente inactivo</p>
      <p className="mx-auto mt-3 max-w-[46ch] text-[14px] leading-relaxed text-white/85">
        Este formulario está en mantenimiento y todavía no envía nada. Escríbenos
        directamente y te respondemos igual de rápido.
      </p>
      <a
        href={mailtoFor(config, prefill)}
        className="gradient-gold label mt-5 inline-flex items-center gap-2.5 rounded-md px-6 py-3 text-[11px] text-navy transition-shadow duration-400 hover:shadow-[0_10px_26px_-10px_rgba(208,142,8,0.9)]"
      >
        Escríbenos por correo
      </a>
      <p className="mt-3.5 text-[12px] text-navy-mist">{contact.email}</p>
    </div>
  );
}

/** Estado de confirmación tras "enviar" (demo de interfaz). */
export function FormSuccess({ onClose, compact = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className={`flex flex-col items-center gap-5 text-center ${compact ? "py-6" : "py-10"}`}
    >
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold/15">
        <motion.svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-gold-light">
          <motion.path
            d="m4.5 12.5 5 5 10-11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          />
        </motion.svg>
        <span className="absolute inset-0 animate-ping rounded-full bg-gold/12" />
      </div>
      <div>
        <h4 className="display text-[26px] text-white">¡Gracias! Hemos recibido tu mensaje.</h4>
        <p className="mt-2.5 text-sm text-navy-mist">
          Alguien de nuestro equipo se pondrá en contacto contigo muy pronto.
        </p>
      </div>
      {onClose && (
        <CTAButton variant="light" icon={false} onClick={onClose}>
          Cerrar
        </CTAButton>
      )}
    </motion.div>
  );
}

/** El envío ha fallado. Se conserva lo que la persona escribió y se le
    ofrece reintentar o escribir por correo, para no perder el contacto. */
export function FormError({ config, prefill, onRetry, className = "" }) {
  return (
    <div
      className={`rounded-lg border border-gold/35 bg-gold/[0.08] p-5 text-center sm:p-6 ${className}`}
    >
      <p className="label text-[9.5px] text-gold-light">No hemos podido enviarlo</p>
      <p className="mx-auto mt-3 max-w-[46ch] text-[14px] leading-relaxed text-white/85">
        Algo ha fallado por el camino y tu mensaje no ha salido. No hemos
        borrado nada de lo que escribiste: prueba otra vez, o escríbenos
        directamente y te respondemos igual.
      </p>
      <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <CTAButton type="button" icon={false} onClick={onRetry}>
          Reintentar
        </CTAButton>
        <a
          href={mailtoFor(config, prefill)}
          className="label rounded-md border-2 border-white/30 px-6 py-3 text-[11px] text-white transition-colors duration-400 hover:border-white"
        >
          Escríbenos por correo
        </a>
      </div>
    </div>
  );
}
