import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ModalContext = createContext(null);

/**
 * Proveedor global de modales.
 * Cualquier componente puede hacer:  const { open } = useModal(); open('soy-nuevo')
 * Así los 4 botones de "Conéctate" (y los CTA de cada sección) ya están cableados.
 */
export function ModalProvider({ children }) {
  const [activeKey, setActiveKey] = useState(null);

  const open = useCallback((key) => setActiveKey(key), []);
  const close = useCallback(() => setActiveKey(null), []);

  const value = useMemo(() => ({ activeKey, open, close }), [activeKey, open, close]);

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal debe usarse dentro de <ModalProvider>");
  return ctx;
}
