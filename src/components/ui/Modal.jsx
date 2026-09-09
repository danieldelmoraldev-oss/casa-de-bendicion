import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "../../context/ModalContext";
import { modalRegistry } from "../../lib/modals";
import { contact } from "../../data/site";
import { FormFields, FormMaintenance, FormSuccess } from "./Form";
import CTAButton from "./Button";

/* ------------------------------------------------------------------ */
/* Panel: se monta con key={activeKey}, así el estado se reinicia solo */
/* ------------------------------------------------------------------ */
function Panel({ config, onClose, prefill }) {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO(backend): aquí irá el POST al CRM / servicio de email.
    setSent(true);
  };

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={config.title}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 24, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-t-2xl border border-white/10 bg-navy p-6 shadow-[0_40px_110px_-30px_rgba(18,35,63,0.9)] sm:rounded-2xl sm:p-10"
    >
      {/* Halo dorado superior */}
      <span aria-hidden="true" className="rule-gold pointer-events-none absolute inset-x-0 top-0 h-[4px]" />

      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-5 top-6 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-md border border-white/15 text-navy-mist transition-colors duration-300 hover:border-gold hover:text-gold-light"
      >
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </button>

      <div className="relative">
        {sent ? (
          <FormSuccess onClose={onClose} />
        ) : (
          <>
            <p className="label text-[10px] text-gold-light">
              {config.eyebrow}
            </p>
            <h3 className="display mt-3 max-w-[24ch] text-[26px] text-white sm:text-[34px]">
              {config.title}
            </h3>
            {config.text && (
              <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-navy-mist">
                {config.text}
              </p>
            )}

            {config.kind === "video" ? (
              <div className="mt-8 flex aspect-video w-full items-center justify-center rounded-lg border border-white/10 bg-navy-deep">
                <p className="label text-[10px] text-navy-mist">
                  [Reproductor de vídeo]
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8">
                {/* Mientras no haya envío real los campos se muestran
                    apagados: se ve qué se va a pedir, pero nadie cree
                    haber mandado algo que no sale de aquí. */}
                <div
                  className={contact.formsEnabled ? "" : "pointer-events-none select-none opacity-40"}
                  aria-hidden={!contact.formsEnabled}
                >
                  <FormFields
                    fields={config.fields}
                    prefill={prefill}
                    disabled={!contact.formsEnabled}
                  />
                </div>

                {contact.formsEnabled ? (
                  <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                    <p className="label order-2 text-[9.5px] text-navy-mist/60 sm:order-1">
                      Tus datos están seguros con nosotros
                    </p>
                    <CTAButton type="submit" className="order-1 sm:order-2">
                      {config.submit}
                    </CTAButton>
                  </div>
                ) : (
                  <FormMaintenance config={config} prefill={prefill} className="mt-7" />
                )}
              </form>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
export default function Modal() {
  const { activeKey, prefill, close } = useModal();
  const config = activeKey ? modalRegistry[activeKey] : null;

  /* La clave incluye el valor preseleccionado: las 12 tarjetas de
     "Momentos que marcan" comparten modal, y sin esto React reutiliza
     el panel y `defaultValue` —que sólo se aplica al montar— seguiría
     mostrando el momento de la tarjeta anterior. */
  const panelKey = activeKey + (prefill ? `:${Object.values(prefill).join("|")}` : "");

  /* ESC para cerrar + bloqueo del scroll de fondo */
  useEffect(() => {
    if (!activeKey) return;
    const onKey = (e) => e.key === "Escape" && close();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [activeKey, close]);

  return createPortal(
    /* El contenedor vive siempre montado pero sin `pointer-events` cuando no
       hay modal abierto: si no, la capa a pantalla completa seguiría
       interceptando los clics de toda la página durante la animación de
       salida (y se quedaría bloqueada si la pestaña deja de pintar). */
    <div
      className={`fixed inset-0 z-[100] flex items-end justify-center sm:items-center ${
        config ? "" : "pointer-events-none"
      }`}
    >
      <AnimatePresence>
        {config && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
            className="absolute inset-0 bg-navy-deep/85 backdrop-blur-md"
          />
        )}
        {config && <Panel key={panelKey} config={config} onClose={close} prefill={prefill} />}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
