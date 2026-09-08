import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ModalContext = createContext(null);

/**
 * Proveedor global de modales.
 * Cualquier componente puede hacer:  const { open } = useModal(); open('soy-nuevo')
 * Así los 4 botones de "Conéctate" (y los CTA de cada sección) ya están cableados.
 */
export function ModalProvider({ children }) {
  const [active, setActive] = useState({ key: null, prefill: null });

  /* `prefill` permite abrir un mismo formulario con un campo ya
     resuelto: las tarjetas de "Momentos que marcan" comparten modal
     y cada una preselecciona su momento. */
  const open = useCallback((key, prefill = null) => setActive({ key, prefill }), []);
  const close = useCallback(() => setActive({ key: null, prefill: null }), []);

  const value = useMemo(
    () => ({ activeKey: active.key, prefill: active.prefill, open, close }),
    [active, open, close],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal debe usarse dentro de <ModalProvider>");
  return ctx;
}
