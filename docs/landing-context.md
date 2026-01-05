# EKOU landing context

## Objetivo del sitio
- Landing para EKOU con enfoque en acompanamiento consultivo, tecnologia e innovacion aplicada.
- Debe comunicar que EKOU integra estrategia, tecnologia y ejecucion, con resultados medibles.
- Secciones esperadas: que hace, como lo hace, valores, beneficios, equipo, ecosistema, casos de exito, blog (opcional en menu).

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
- Astro 5 con integracion React.
- Tailwind CSS v4 via plugin de Vite.
- i18n nativo de Astro con locales es/en.
- Iconos lucide-react.

## Estructura del sitio
- Paginas: `src/pages/index.astro` y `src/pages/en/index.astro` usan el mismo layout y componentes.
- Layout: `src/layouts/Layout.astro` importa `src/styles/global.css`, define `data-theme="dark"`, y contiene:
  - Script de smooth scroll con offset del header.
  - IntersectionObserver para resaltar el link activo del menu.

## Componentes actuales
- `src/components/Navbar.astro`: logo, links ancla, selector de idioma, toggle de tema, boton menu (sin logica).
- `src/components/ThemeController.astro`: alterna tema light/dark y guarda en localStorage.
- `src/components/ModalLanguage.astro`: menu de idiomas con Astro i18n.
- `src/components/Welcome.astro`: hero con textos i18n, CTA, lista de features y imagen `grupoEkou.webp`.
- `src/components/WelcomeDecoration.astro`: separador visual full width con `decoration1.svg`.
- `src/components/WhoWeAre.astro`: seccion placeholder (texto dummy).
- `src/components/HelpYou.astro`: seccion placeholder (texto dummy).
- `src/components/Services.astro`: seccion placeholder (texto dummy).
- `src/components/Successes.astro`: seccion placeholder (texto dummy).
- `src/components/Contact.astro`: seccion placeholder (texto dummy).
- `src/components/Footer.astro`: footer placeholder.

## i18n
- Configuracion: `src/i18n/utils/config.js` y `src/i18n/utils/ui.js`.
- Textos: `src/i18n/es.json` y `src/i18n/en.json` (navbar y hero).
- Default locale: es; `/en` sirve la version inglesa.

## Estilos globales
- `src/styles/global.css` define variables de color para dark/light.
- Body con `padding-top: 72px` y `padding: 0 3%` para dejar espacio al navbar fijo.
- `section` usa `scroll-margin-top` y margen vertical entre secciones.

## Assets relevantes
- `public/grupoEkou.webp`: imagen hero.
- `public/decoration1.svg`: separador grafico.
- `src/assets/ekouLogo-v1.svg`, `src/assets/es.svg`, `src/assets/en.svg`.

## Gaps actuales
- Navbar incluye `#blog`, pero no existe seccion con id `blog`.
- Boton menu hamburguesa no tiene comportamiento implementado.
- Varias secciones son texto placeholder.
