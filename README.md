# Belara · Landing

Landing de Belara que se muestra dentro de GHL.

- `landing.html`: contenido y estilos de la página.
- `app.js`: animaciones (chats en vivo y aparición con scroll) y el diagnóstico de respuesta de 2 minutos.
  Al inicio del bloque del diagnóstico están `URL_WEBHOOK` (webhook de entrada de GHL que recibe los contactos), `URL_AGENDA` (calendario de reuniones) y `URL_AGENTE` (WhatsApp del agente).
- `loader.js`: carga los dos archivos anteriores dentro de GHL. No se toca.
- `index.html`: vista previa de la landing fuera de GHL.

Código para pegar una sola vez en GHL (elemento de Código personalizado):

```html
<div id="belara-landing"></div>
<script src="https://colombauv-dev.github.io/belara-landing/loader.js"></script>
```

Cualquier cambio que se suba a este repositorio aparece en la página de GHL en pocos minutos.
