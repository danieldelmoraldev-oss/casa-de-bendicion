import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useModal } from "../../context/ModalContext";
import { modalRegistry } from "../../lib/modals";
import { FormFields, FormSuccess } from "./Form";
import CTAButton from "./Button";

/* ------------------------------------------------------------------ */
/* Panel: se monta con key={activeKey}, así el estado se reinicia solo */
/* ------------------------------------------------------------------ */
function Panel({ config, onClose }) {
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
      className="grain relative z-10 max-h-[92vh] w-full max-w-2xl overflow-y-auto overflow-x-hidden rounded-t-[28px] border border-cream/10 bg-carbon/95 p-6 shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] sm:rounded-[28px] sm:p-10"
    >
      {/* Halo dorado superior */}
      <div className="pointer-events-none absolute -left-24 -top-32 h-64 w-64 rounded-full bg-gold/16 blur-[90px]" />

      <button
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute right-5 top-5 z-20 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-cream/12 text-mist transition-colors duration-300 hover:border-gold/50 hover:text-gold"
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
            <p className="text-[10.5px] font-semibold uppercase tracking-[0.28em] text-gold">
              {config.eyebrow}
            </p>
            <h3 className="display mt-3 max-w-[22ch] text-3xl text-cream sm:text-[2.6rem]">
              {config.title}
            </h3>
            {config.text && (
              <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-mist">
                {config.text}
              </p>
            )}

            {config.kind === "video" ? (
              <div className="mt-8 flex aspect-video w-full items-center justify-center rounded-2xl border border-cream/10 bg-[radial-gradient(120%_120%_at_30%_10%,#1b2231_0%,#0c1017_60%,#070a10_100%)]">
                <p className="text-[11px] uppercase tracking-[0.22em] text-mist">
                  [Reproductor de vídeo]
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8">
                <FormFields fields={config.fields} />
                <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                  <p className="order-2 text-[10px] uppercase tracking-[0.18em] text-mist/45 sm:order-1">
                    Tus datos están seguros con nosotros
                  </p>
                  <CTAButton type="submit" className="order-1 sm:order-2">
                    {config.submit}
                  </CTAButton>
                </div>
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
  const { activeKey, close } = useModal();
  const config = activeKey ? modalRegistry[activeKey] : null;

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
            className="absolute inset-0 bg-ink/80 backdrop-blur-md"
          />
        )}
        {config && <Panel key={activeKey} config={config} onClose={close} />}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
