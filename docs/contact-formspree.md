# Contacto via Formspree

## Historia de usuario
Como visitante, quiero enviar mi solicitud, para que EKOU la reciba y me contacte.

## AC
- MUST enviar a Formspree con los campos definidos: `name`, `email`, `project`, `message`.
- MUST manejar respuesta success/error con feedback visible en el formulario.
- SHOULD permitir configuracion del endpoint (env/config).

## Propuesta tecnica
- Usar `ContactForm.jsx` como formulario con `action` + enhancement progresivo.
- `action` apunta al endpoint de Formspree (configurable) y `method="POST"` habilita envio sin JS.
- En JS, interceptar submit para enviar por `fetch` con `FormData` y mostrar feedback.
- Estados sugeridos: `idle`, `submitting`, `success`, `error`.
- En `success` limpiar campos y bloquear re-envio hasta nuevo input (opcional).
- En `error` mantener valores para reintento.

## Configuracion
- Variable publica sugerida: `PUBLIC_FORMSPREE_ENDPOINT`.
- Opcion A: leerla en `ContactForm.jsx` via `import.meta.env`.
- Opcion B: leerla en `Contact.astro` y pasarla como prop a `ContactForm`.

## Tareas
- [ ] Leer `PUBLIC_FORMSPREE_ENDPOINT` y conectarlo al formulario.
- [ ] Actualizar `ContactForm.jsx` con envio por `fetch` y manejo de estados.
- [ ] Agregar mensajes i18n para success/error/loading.
- [ ] (Opcional) documentar ejemplo de `.env` en `README.md`.
