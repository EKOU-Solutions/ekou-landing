# EKOU landing context

## Objetivo del sitio
- Landing para EKOU con enfoque en acompanamiento consultivo, tecnologia e innovacion aplicada.
- Debe comunicar que EKOU integra estrategia, tecnologia y ejecucion, con resultados medibles.
- Secciones actuales: hero, quienes somos, como te ayudamos, servicios, casos de exito, blog (placeholder), contacto y footer.

## Perfil de audiencia (resumen EKOU.md)
- Pymes: restaurantes, tiendas, academias y negocios similares.
- Emprendedores con negocio propio que quieren digitalizar o escalar.
- Inversionistas o interesados en el ecosistema EKOU.

## Servicios (resumen EKOU.md)
- Consultoria y estrategia: definicion de estrategia, planeacion, optimizacion, innovacion.
- Productos tecnologicos: apps moviles, plataformas web, RPA, chatbots, soluciones a la medida.

## Valores de marca (resumen EKOU.md)
- Orientacion al usuario.
- Transparencia total.
- Acompanamiento cercano.
- Innovacion practica.
- Enfoque en resultados.

## Ecosistema (resumen EKOU.md)
- Ekou Foundations: empoderamiento juvenil con tecnologia.
- Ekou Solutions: soluciones tecnologicas personalizadas.
- Ekou Real State: servicios inmobiliarios.

## Requisitos responsive
- Escritorio: 1920px.
- Tablet: 768px - 1024px.
- Movil: 320px - 767px.

## Tech stack
- Astro 5 con integracion React (componentes client:load).
- Tailwind CSS v4 via plugin de Vite; global.css importa CSS de Splide.
- i18n nativo de Astro con locales es/en.
- Iconos lucide-react.
- @splidejs/react-splide para slider de casos y zustand para estado de fases.
- Formspree para envio del formulario (endpoint via `PUBLIC_FORMSPREE_ENDPOINT`).

## Estructura del sitio
- Paginas: `src/pages/index.astro` y `src/pages/en/index.astro` usan el mismo layout y componentes; `.box` controla el padding horizontal.
- Layout: `src/layouts/Layout.astro` importa `src/styles/global.css`, define `data-theme="dark"`, y contiene:
  - Script de smooth scroll con offset desde `[data-site-header]` y foco a la seccion.
  - IntersectionObserver para resaltar el link activo del menu via `data-section-link`.

## Componentes actuales
- `src/components/Navbar.astro`: logo, links ancla con iconos, selector de idioma, toggle de tema (desktop), boton de menu con logica y `data-site-header`.
- `src/components/MobileMenu.astro`: menu mobile desplegable con links e iconos, incluye toggle de tema.
- `src/components/ThemeController.astro`: alterna tema light/dark y guarda en localStorage.
- `src/components/ModalLanguage.astro`: menu de idiomas con Astro i18n e iconos de banderas.
- `src/components/Welcome.astro`: hero con textos i18n, CTA, features e imagen `src/assets/img/grupoEkou.webp`.
- `src/components/WelcomeDecoration.astro`: separador visual full width con `src/assets/img/decoration1.svg`.
- `src/components/WhoWeAre.astro`: seccion con cards e iconografia custom, usa `src/assets/img/decoration2.svg`.
- `src/components/HelpYou.astro`: seccion con 3 items e iconos, flechas `arrowA.svg`/`arrowB.svg`.
- `src/components/Services.astro`: header + `ServicePhases` interactivo.
- `src/components/ServicePhases.jsx`: fases con controles prev/next, usa `PhaseCircle` y zustand.
- `src/components/PhaseCircle.jsx`: boton circular para seleccionar fase.
- `src/components/Successes.astro`: seccion con slider `CasesSlider` y overlay `barsInclined.svg`.
- `src/components/CasesSlider.jsx`: carrusel Splide con data de `src/data/casesData.js`.
- `src/components/Blog.astro`: seccion "Proximamente" (contenido estatico).
- `src/components/Contact.astro`: seccion con robot `robotShappe.svg`, datos de contacto y `ContactForm`.
- `src/components/ContactForm.jsx`: validacion en cliente y envio a Formspree.
- `src/components/Footer.astro`: footer con logo, redes y fondo `bgContact.svg`.
- `src/components/icons/*`: iconos custom para secciones y branding.

## i18n
- Configuracion: `src/i18n/utils/config.js` y `src/i18n/utils/ui.js`.
- Textos: `src/i18n/es.json` y `src/i18n/en.json` (navbar, welcome, helpyou, whoweare, services, servicePhases, successes, contact, footer).
- Default locale: es; `/en` sirve la version inglesa.

## Estilos globales
- `src/styles/global.css` define variables de color para dark/light e importa Tailwind + Splide CSS.
- `body` con `padding-top: 72px`; `.box` maneja el padding horizontal.
- `section` usa `scroll-margin-top: 96px`, padding y margen vertical entre secciones.

## Assets relevantes
- `src/assets/img/grupoEkou.webp`, `src/assets/img/decoration1.svg`, `src/assets/img/decoration2.svg`.
- `src/assets/img/arrowA.svg`, `src/assets/img/arrowB.svg`, `src/assets/img/barsInclined.svg`.
- `src/assets/img/robotShappe.svg`, `src/assets/img/bgContact.svg`.
- `src/assets/icons/ekouLogo-v1.svg`, `src/assets/icons/es.svg`, `src/assets/icons/en.svg`, `src/assets/icons/start.svg`, `src/assets/icons/ekou.svg`.
- `public/gfx.svg`, `public/favicon.svg`.

## Gaps actuales
- Blog es placeholder ("Proximamente") y no esta localizado.
- Links sociales en `src/components/Footer.astro` apuntan a `#`.
- ContactForm requiere `PUBLIC_FORMSPREE_ENDPOINT`; sin eso falla el envio.
- `src/data/casesData.js` usa imagenes externas (URLs remotas).
- Footer usa copy estatico y no consume i18n.
