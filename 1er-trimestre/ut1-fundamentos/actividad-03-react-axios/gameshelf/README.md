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

## 3. Axios y npm

### Qué es Axios

Axios es una librería de JavaScript para hacer peticiones a servidores (pedir datos a una API, enviarlos...). Funciona con promesas y sirve tanto en el navegador como en Node. Hace lo mismo que `fetch`, que ya usé en la Pokédex, pero con dos ventajas:

- Convierte el JSON él solo y me deja los datos en `respuesta.data`. Con `fetch` tenía que hacer `await respuesta.json()`.
- Si el servidor responde con un error (por ejemplo un 404), Axios lo trata como error y salta al `catch`. Con `fetch` tenía que comprobar yo `respuesta.ok`.

### Instalarlo

Desde la terminal integrada de VS Code, dentro de la carpeta `gameshelf`:

```bash
npm install axios
```

Me salió `added 25 packages`. En `package.json` solo cambió una línea, dentro de `dependencies`:

```diff
   "dependencies": {
+    "axios": "^1.20.0",
     "react": "^19.2.8",
     "react-dom": "^19.2.8"
   },
```

El `^` quiere decir que acepta versiones nuevas de la 1 (1.20.1, 1.21...) pero nunca la 2.0.0, que podría cambiar cosas y romper el código.

También cambió `package-lock.json`, mucho más: se añadieron 25 paquetes, axios y los que necesita él para funcionar (`follow-redirects`, `form-data`, `proxy-from-env`...). Ahí se guarda la versión exacta de cada uno, para que si otro hace `npm install` le salgan las mismas.

### Qué descubrí de npm, las dependencias y node_modules

- **Dependencia:** es código de otras personas que mi proyecto necesita para funcionar, como React o ahora Axios. En `dependencies` va lo que necesita la app cuando se usa, y en `devDependencies` lo que solo hace falta para programar (Vite, TypeScript, ESLint). Axios va en `dependencies` porque su código acaba dentro de la app.
- **npm:** es el gestor de paquetes de Node, parecido a Maven en Java. Descarga las librerías de internet (de npmjs.com) y las apunta en `package.json`. `npm install` sin nada instala todo lo que ya está apuntado, y `npm install axios` añade un paquete nuevo.
- **node_modules:** es la carpeta donde npm descarga el código de todas las dependencias, también las que necesitan ellas. A mí me ocupa 121 MB. No se toca a mano, porque si reinstalas se pierden los cambios, y no se sube a GitHub: ya viene en el `.gitignore` y cualquiera la puede volver a crear con `npm install`. Lo que sí se sube es `package.json` y `package-lock.json`.

**¿Qué hace Axios y qué descubrí sobre esos archivos y herramientas?** Axios hace las peticiones a la API y me da los datos ya preparados. npm lo instala y lo apunta como dependencia en `package.json`, la versión exacta queda guardada en `package-lock.json` y el código descargado está en `node_modules`, que no se sube.

Fuentes: [Axios](https://axios.rest/), [npm install](https://docs.npmjs.com/cli/commands/npm-install), [package.json](https://docs.npmjs.com/cli/configuring-npm/package-json)

## 4. Conectar GameShelf con la API

### El tipo Juego

Como el proyecto es TypeScript, primero hice un tipo para los juegos en un archivo nuevo, `src/types/Juego.ts`. Lo hice a partir del JSON que miré antes, y solo con los campos que uso:

```ts
export interface Juego {
  id: number;
  name: string;
  genre: string[];
}
```

`genre` es `string[]` (una lista de textos) porque en la API viene entre `[ ]`. El tipo `Game` de la actividad anterior (`title`, `price`, `available`) ya no me sirve, porque la API no tiene esos campos.

### Quitar los juegos fijos y pedirlos a la API

En `App.tsx` borré la lista de 14 juegos que tenía escrita a mano y los dos filtros, porque la actividad dice que los datos tienen que venir de la petición y que no añada filtros. En su lugar:

```tsx
const URL_API = "https://api.sampleapis.com/switch/games";

function App() {
  const [juegos, setJuegos] = useState<Juego[]>([]);

  useEffect(() => {
    async function cargarJuegos(): Promise<void> {
      try {
        const respuesta = await axios.get<Juego[]>(URL_API);
        setJuegos(respuesta.data);
      } catch (errorCapturado) {
        console.error(errorCapturado);
      }
    }

    cargarJuegos();
  }, []);
```

- `useState<Juego[]>([])` guarda los juegos. Empieza como una lista vacía porque al principio todavía no han llegado.
- `useEffect(() => { ... }, [])` ejecuta lo de dentro cuando se muestra el componente. El `[]` del final hace que sea **solo una vez**, al principio. Si no lo pongo, se ejecutaría después de cada render y, como dentro cambio el estado, se harían peticiones sin parar.
- La función que le paso a `useEffect` no puede ser `async`, así que creo dentro `cargarJuegos`, que sí lo es, y la llamo justo debajo.
- `axios.get<Juego[]>(URL_API)` hace la petición GET. El `<Juego[]>` le dice a TypeScript que lo que viene es una lista de juegos.
- Con `await` espero la respuesta y los juegos están en `respuesta.data`. Al hacer `setJuegos(respuesta.data)` React vuelve a pintar la página con ellos.

Arriba del archivo están los imports:

```tsx
import { useEffect, useState } from "react";
import axios from "axios";
import type { Juego } from "./types/Juego";
```

Axios se importa sin llaves porque es la exportación por defecto, y sin ruta porque viene de `node_modules`. El tipo va con `import type` porque el proyecto lo exige (si no, da error).

### La tarjeta con los datos de la API

`GameCard` ahora recibe el juego entero en vez de cada dato por separado, y muestra el nombre y el género:

```tsx
export default function GameCard({ juego }: GameCardProps) {
  return (
    <article className="card">
      <h2>{juego.name}</h2>
      <p>Género: {juego.genre.join(", ")}</p>
    </article>
  );
}
```

Como `genre` es una lista, uso `join(", ")` para que salgan separados por comas. Sin el `join` salían pegados, por ejemplo "Survivalthird-person shooter".

Y en `App.tsx` recorro los juegos con `map()`, igual que en la actividad anterior, con el `id` de la API como `key`:

```tsx
<section className="catalog">
  {juegos.map((juego) => (
    <GameCard key={juego.id} juego={juego} />
  ))}
</section>
```

Con esto ya salen los juegos de la API, pero salen **los 1043** y, mientras llegan, la página se queda vacía sin decir nada. Eso lo arreglo en los siguientes pasos.

## 5. Mensaje de carga y de error

La petición tarda un poco y puede fallar (sin internet, la API caída...), así que añadí dos estados más:

```tsx
const [cargando, setCargando] = useState(true);
const [error, setError] = useState<string | null>(null);
```

- `cargando` empieza en `true`, porque nada más abrir la página ya se está pidiendo.
- `error` empieza en `null` (no hay error). Si falla, guardo ahí el mensaje que quiero enseñar.

Y en `cargarJuegos` completé el `try/catch` con un `finally`:

```tsx
try {
  const respuesta = await axios.get<Juego[]>(URL_API);
  setJuegos(respuesta.data);
} catch (errorCapturado) {
  console.error(errorCapturado);
  setError("No se han podido cargar los videojuegos. Comprueba tu conexión e inténtalo de nuevo.");
} finally {
  setCargando(false);
}
```

- Si todo va bien, guardo los juegos.
- Si falla, Axios salta al `catch`: guardo el error completo en la consola (para mí, por si tengo que ver qué pasó) y un mensaje que se entienda para el usuario.
- El `finally` se ejecuta siempre, vaya bien o mal, así que ahí quito el "cargando".

En el `return` los muestro con `&&`, que pinta lo de la derecha solo si lo de la izquierda es verdadero:

```tsx
{cargando && <p className="estado">Cargando videojuegos...</p>}

{error && (
  <p className="estado error" role="alert">
    {error}
  </p>
)}
```

Los puse dentro del `<main>` y debajo del título, para que el título se vea siempre. Al mensaje de error le di un estilo en `App.css`: un recuadro con el borde rojo.

Para probar la carga puse la red lenta, y para el error corté la petición a la API, que es lo mismo que pasa sin internet (en DevTools se puede hacer con la pestaña Red: "Slow 4G" o "Sin conexión"):

![Mientras llegan los datos sale "Cargando videojuegos..."](capturas/05-cargando.png)

![Si falla la petición sale el mensaje de error](capturas/05-error.png)
