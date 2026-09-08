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

Valores tomados literalmente del **Manual de Identidad Corporativa 2026**.

| Token | HEX | Uso | Manual |
|---|---|---|---|
| `navy` | `#1C3661` | Azul institucional. Color dominante. | pág. 14 |
| `gold` | `#D08E08` | Dorado profundo. Inicio del degradado. | pág. 15 |
| `gold-light` | `#E2AD46` | Dorado luminoso. Fin del degradado. | pág. 17 |
| `ivory` | `#F5F2EA` | Marfil cálido. Alternativa al blanco puro. | pág. 16 |
| `graphite` | `#343434` | Gris neutro oscuro. Texto. | pág. 16 |

El **degradado institucional** (`.gradient-gold`) va siempre horizontal, de
izquierda a derecha, del tono profundo al luminoso — la pág. 17 prohíbe
alterar el orden o la dirección.

**Tipografía.** El manual define *SF Pro* como principal, pero es propietaria
de Apple y no puede servirse en web. La pág. 23 autoriza expresamente
**Montserrat** como alternativa "en aplicaciones digitales donde SF Pro no
esté disponible", con los pesos que el manual asigna a cada jerarquía.

**Interfaz.** La pág. 32 pide construir la web "principalmente con blanco y
azul institucional, utilizando los tonos dorados de manera estratégica en
botones, enlaces, indicadores activos y llamadas a la acción". De ahí el
esquema claro dominante con bloques azules y el dorado reservado a los CTA.

**Lenguaje gráfico.** El arco barrido con filete dorado y el fuego como
recurso decorativo (`ui/Decor.jsx`) traducen a web las formas curvas de las
págs. 24-25. El fuego se dibuja como silueta propia: la pág. 21 prohíbe
aplicar transparencias o efectos al identificador, así que el logo nunca se
usa como marca de agua.

**Marca.** `ui/Logo.jsx` sirve las versiones oficiales y elige positiva o
negativa según el fondo. Respeta la reducción mínima de la pág. 12
(isotipo 32 px, vertical 120 px, horizontal 240 px).

### Dos desviaciones conscientes del manual

1. **Texto de los botones dorados.** El mockup de la pág. 32 los pone en
   blanco: contraste 2.8:1, insuficiente para WCAG AA. Aquí el texto va en
   azul institucional sobre el degradado oficial (4.3:1 a 5.9:1). Se conserva
   el color de marca; cambia sólo el color del texto.
2. **Tipografía**, ya explicado arriba: Montserrat en lugar de SF Pro, usando
   la alternativa que el propio manual autoriza.

## Pendiente del cliente

- Logo de **Community Outreach** (aparece como plataforma 03 pero no está en el Drive).
- **KICK**: sólo hay versión apilada; faltan la horizontal y el isotipo.
- Fotografías de **pastores** y de la sección **Bienvenida** (siguen como marcadores).
- **Vídeo institucional**.
- Los logos llegaron en PNG; en SVG el del navbar se vería más nítido.
