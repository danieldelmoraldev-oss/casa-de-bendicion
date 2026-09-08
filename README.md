# Casa de Bendición — Landing Page

One-pager de 12 secciones. React 19 + Vite + Tailwind CSS v4 + Framer Motion.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # dist/
./deploy.sh      # publica en un servidor propio (ver abajo)
```

## Despliegue

**Vercel** (vista previa para cliente): conectado a este repositorio, compila
sola en cada push a `main`.

**Servidor propio** con Docker (nginx:alpine, contenido montado como volumen):

```bash
export CDB_HOST=usuario@mi-servidor   # acceso SSH por clave
./deploy.sh                           # compila, sube y publica
```

> **Si tocas el servidor a mano:** `dist/` está montada como volumen. Hay que
> vaciar su *contenido*, nunca borrar la carpeta — si se recrea, el contenedor
> se queda apuntando al inodo antiguo y nginx devuelve 403. `deploy.sh` ya lo
> hace bien y se recupera solo si pasa.

> Las tipografías se cargan desde Google Fonts, así que hace falta salida a
> internet. Para que funcione 100 % en local habría que autoalojar Fraunces
> e Inter.

---

## Secciones

| # | Sección | Componente | Ancla |
|---|---------|-----------|-------|
| 01 | Hero + tarjeta de horarios superpuesta | `sections/Hero` | `#inicio` |
| 02 | Bienvenido a casa | `sections/Welcome` | `#bienvenida` |
| 03 | Nuestra visión (Ganar → Expandir) | `sections/Vision` | `#vision` |
| 04 | Conoce CDB + vídeo institucional | `sections/AboutVideo` | `#conocenos` |
| 05 | Nuestros pastores | `sections/Pastors` | `#pastores` |
| 06 | Reúnete con nosotros | `sections/Gatherings` | `#reuniones` |
| 07 | Crece y fórmate | `sections/Training` | `#formacion` |
| 08 | Ministerios | `sections/Ministries` | `#ministerios` |
| 09 | Comunidad e impacto | `sections/Community` | `#comunidad` |
| 10 | ¿Es tu primera vez? + formulario | `sections/FirstTime` | `#visitanos` |
| 11 | Conéctate (4 modales) | `sections/Connect` | `#conectate` |
| 12 | Donar | `sections/Donate` | `#donar` |
| — | Cierre "Tu historia puede comenzar aquí" | `sections/FinalCta` | — |
| — | Footer | `layout/Footer` | — |

---

## Arquitectura

```
src/
├─ App.jsx                    Composición del one-pager
├─ index.css                  Design system (tokens @theme + utilidades)
├─ data/site.js               TODO el copy del documento, centralizado
├─ lib/modals.js              Esquema de los formularios de cada modal
├─ context/ModalContext.jsx   useModal() → open('soy-nuevo')
├─ hooks/useActiveSection.js  Scrollspy con IntersectionObserver
├─ components/
│  ├─ layout/   Navbar · Footer
│  ├─ sections/ Las 13 secciones
│  └─ ui/       Motion · Button · Eyebrow · Placeholder · BackgroundFX
│                Modal · Form · Icons
```

Cada sección es autónoma (sus propios datos, fondos y animaciones). Pasarlas
mañana a rutas independientes es mover una línea en `App.jsx`.

---

## Antes de publicar

**Contenido.** Todo el texto vive en `src/data/site.js`. Las claves marcadas
`// ← COPY SUGERIDA` son micro-copys de apoyo que **no** venían en el documento
original (los subtítulos de los 5 pasos del modelo visual): revisar.

**Imágenes y logos.** Los placeholders describen la foto que va en cada hueco.
Cuando lleguen los recursos finales sólo hay que pasar `src`:

```jsx
<ImagePlaceholder src="/img/hero.jpg" alt="…" label="…" />
<LogoPlaceholder  src="/img/logos/kick.svg" label="KICK" />
```

**Pendientes marcados con `TODO` en el código:**

| Dónde | Qué falta |
|-------|-----------|
| `ui/Modal.jsx` | POST del formulario al CRM / servicio de email |
| `sections/FirstTime.jsx` | Mismo endpoint para el formulario embebido |
| `sections/Donate.jsx` | Enlazar el botón "Dar ahora" a la pasarela (Givelify / Tithe.ly / Stripe) |
| `layout/Footer.jsx` | URLs reales de redes sociales, `mailto:` y `tel:` |
| `sections/Pastors.jsx` | Enlazar a `/pastores` cuando exista esa página |

---

## Sistema visual

- **Paleta**: noche profunda (`ink`/`night`/`carbon`) · crema editorial · oro cálido.
  Donar es el único bloque con tratamiento cálido, para que destaque solo.
- **Tipografía**: Fraunces (display, itálica en los acentos) + Inter (UI).
- **Formas**: cilindros, esferas, aros y manchas difuminadas — 100 % CSS/SVG,
  cero imágenes, con flotación continua y parallax por capas.
- **Animación**: primitivas en `ui/Motion.jsx` (`Reveal`, `SplitHeading`,
  `Stagger`, `DrawLine`). `Reveal`/`SplitHeading` aceptan `mount` para animar
  al cargar en vez de al hacer scroll (imprescindible en el hero).
  Todo respeta `prefers-reduced-motion`.

Mobile-first, sin desbordamiento horizontal en 375 px, y `npm run build`
limpio sin errores de consola.
