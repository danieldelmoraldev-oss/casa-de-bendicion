import { useEffect, useState } from "react";

/**
 * Devuelve el id de la sección visible para marcar el enlace activo del menú.
 * Usa IntersectionObserver (barato) en lugar de escuchar el scroll.
 */
export default function useActiveSection(ids = [], offset = "-45% 0px -50% 0px") {
  const [active, setActive] = useState(ids[0] ?? null);

  useEffect(() => {
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: offset, threshold: 0 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}
