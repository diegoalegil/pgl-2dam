# Actividad 03. GameShelf con React y Axios

- **Proyecto:** GameShelf conectada a una API de videojuegos
- **Autor:** Diego Gil
- **Curso:** 2.º DAM · Programación multimedia y dispositivos móviles · 2026/2027
- **Tecnologías:** React, TypeScript, Vite, Axios, Node.js y npm, Git y GitHub, Visual Studio Code.
- **Repositorio:** https://github.com/diegoalegil/pgl-2dam/tree/main/1er-trimestre/ut1-fundamentos/actividad-03-react-axios/gameshelf

En esta actividad conecto GameShelf con una API de videojuegos de Nintendo Switch. Los juegos ya no están escritos a mano en el código: la app se los pide a la API con Axios y los muestra en tarjetas.

## Cómo ejecutarla

1. Clona el repositorio: `git clone https://github.com/diegoalegil/pgl-2dam.git`
2. Entra en la carpeta del proyecto: `cd pgl-2dam/1er-trimestre/ut1-fundamentos/actividad-03-react-axios/gameshelf`
3. Instala las dependencias: `npm install`
4. Arranca el servidor: `npm run dev`
5. Abre en el navegador la dirección que aparece, normalmente `http://localhost:5173/`. Para pararlo, pulsa Ctrl + C en la terminal.

Necesita conexión a internet, porque los juegos vienen de la API.

## 1. Preparación del proyecto

La actividad dice que trabaje sobre el GameShelf de la Actividad 02, pero esa ya la entregué y no quería cambiarla. Así que copié el proyecto a una carpeta nueva, `actividad-03-react-axios`, sin `node_modules` (eso se vuelve a descargar), y lo arranqué como en la actividad anterior:

```bash
cd actividad-03-react-axios/gameshelf
npm install
npm run dev
```

Al abrir `http://localhost:5173/` sale el GameShelf de antes, con los 14 juegos y los dos filtros. A partir de aquí lo voy cambiando para que los juegos vengan de la API.
