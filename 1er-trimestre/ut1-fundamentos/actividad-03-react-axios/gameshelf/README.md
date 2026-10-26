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

## 2. La API de SampleAPIs

La API es el catálogo de juegos de Nintendo Switch de SampleAPIs: https://api.sampleapis.com/switch/games

Al abrirla en el navegador sale mucho texto seguido, pero empieza por `[`, así que **la respuesta es una lista** (un array), no un objeto suelto. Cada elemento de la lista es un objeto `{ }` con un juego. En total hay 1043 juegos.

![La API abierta en el navegador](capturas/02-api-json.png)

Si pido un solo juego, por ejemplo `https://api.sampleapis.com/switch/games/1`, ahí sí devuelve un objeto solo.

Así es el primer juego, ordenado para que se lea mejor:

```json
{
  "id": 1,
  "name": "#Breakforcist Battle",
  "genre": ["Party"],
  "developers": ["Lucid Sheep Games"],
  "publishers": ["Lucid Sheep Games"],
  "releaseDates": {
    "Japan": "Unreleased",
    "NorthAmerica": "April 12, 2018",
    "Europe": "April 12, 2018",
    "Australia": "April 12, 2018"
  }
}
```

Miré varios juegos y estos son los campos que pide la actividad:

| Campo | Tipo | ¿Sale siempre? | Lo que vi |
|---|---|---|---|
| `id` | número | Sí | Es distinto en cada juego, va del 1 al 1043 |
| `name` | texto | Sí | El nombre del juego |
| `genre` | **lista de textos** | Sí | Aunque sea un solo género viene entre `[ ]`. Hay juegos con 2, 3 y hasta 4 géneros |
| `releaseDates` | objeto | Sí | Tiene las fechas de `Japan`, `NorthAmerica`, `Europe` y `Australia`. Son textos, no fechas: a veces pone "Unreleased" o "TBA" |

Además vienen `developers` y `publishers`, que también son listas de textos. Lo comprobé en los 1043 juegos y todos los campos salen siempre.

Lo más importante para el código es que `genre` es una lista y no un texto, así que no lo puedo pintar directamente.
