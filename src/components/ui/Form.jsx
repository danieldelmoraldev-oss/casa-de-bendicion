import { motion } from "framer-motion";
import { EASE } from "./Motion";
import CTAButton from "./Button";

/**
 * Campos de formulario generados desde el esquema de `lib/modals.js`.
 * Se comparten entre el modal global y el formulario embebido de
 * "¿Es tu primera vez?", así el esquema es la única fuente de verdad.
 */

const fieldBase =
  "w-full rounded-xl border border-cream/12 bg-cream/[0.035] px-4 py-3 text-[15px] text-cream " +
  "placeholder:text-mist/50 outline-none transition-all duration-300 " +
  "focus:border-gold/60 focus:bg-cream/[0.06] focus:ring-2 focus:ring-gold/15";

export function Field({ field }) {
  const id = `f-${field.name}`;

  return (
    <div className={field.span === 2 ? "sm:col-span-2" : "sm:col-span-1"}>
      <label
        htmlFor={id}
        className="mb-2 block text-[10.5px] font-semibold uppercase tracking-[0.18em] text-mist"
      >
        {field.label}
        {field.required && <span className="ml-1 text-gold">*</span>}
      </label>

      {field.type === "textarea" ? (
        <textarea id={id} name={field.name} rows={3} className={`${fieldBase} resize-none`} />
      ) : field.type === "select" ? (
        <div className="relative">
          <select
            id={id}
            name={field.name}
            defaultValue=""
            className={`${fieldBase} appearance-none pr-10 [&>option]:bg-carbon`}
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
            className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gold"
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
          className={fieldBase}
          placeholder={field.type === "email" ? "tunombre@email.com" : ""}
        />
      )}
    </div>
  );
}

export function FormFields({ fields, className = "" }) {
  return (
    <div className={`grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2 ${className}`}>
      {fields.map((f) => (
        <Field key={f.name} field={f} />
      ))}
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
      <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gold/12">
        <motion.svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-gold">
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
        <span className="absolute inset-0 animate-ping rounded-full bg-gold/10" />
      </div>
      <div>
        <h4 className="display text-3xl text-cream">¡Gracias! Hemos recibido tu mensaje.</h4>
        <p className="mt-2 text-sm text-mist">
          Alguien de nuestro equipo se pondrá en contacto contigo muy pronto.
        </p>
      </div>
      {onClose && (
        <CTAButton variant="ghost" icon={false} onClick={onClose}>
          Cerrar
        </CTAButton>
      )}
      <p className="text-[10px] uppercase tracking-[0.2em] text-mist/40">
        Demo de interfaz · sin envío a backend
      </p>
    </motion.div>
  );
}
