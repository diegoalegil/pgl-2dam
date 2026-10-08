# Actividad 01. Pokédex con JavaScript

- **Proyecto:** Pokédex de Diego
- **Autor:** Diego Gil
- **Curso:** 2.º DAM · Programación multimedia y dispositivos móviles · 2026/2027
- **Tecnologías:** HTML, CSS y JavaScript sin librerías, [PokéAPI](https://pokeapi.co/), Git y GitHub, Visual Studio Code con Live Server.

Es una Pokédex con los 151 Pokémon de Kanto hecha con HTML, CSS y JavaScript, con los datos de PokéAPI. Parte de la mini-Pokédex de la práctica guiada.

## 1. Punto de partida

### Qué hacía la mini-Pokédex

Enseñaba un Pokémon cada vez, el que buscabas por nombre o número, con los datos de la API. Si buscabas uno que no existe salía "Pokémon no encontrado.".

### Estructura inicial

```text
actividad-01-pokedex/
├── index.html
├── css/
│   └── style.css
└── js/
    └── app.js
```

Estos tres archivos son los de la guía sin cambiar nada. En el mismo commit añadí el `README.md`, `js/Pokemon.js` (vacío de momento) y la carpeta `assets/images/`, que es la estructura que pide la actividad.

### Funcionalidades que ya estaban

- Buscar un Pokémon por nombre o por número, con el botón o con Enter.
- La búsqueda se normaliza con `trim()` y `toLowerCase()`.
- Si el campo está vacío o solo tiene espacios sale "Introduce un nombre o número.".
- Mientras carga sale "Cargando..." y el botón se desactiva.
- Si no existe sale "Pokémon no encontrado.".
- La tarjeta enseña la imagen oficial, el número con tres cifras (N.º 025), el nombre, la altura en metros, el peso en kilos y los tipos.
- Después de una búsqueda correcta se limpia el campo y vuelve el cursor a él.

### Pruebas antes de empezar

| Entrada | Resultado esperado | ¿Superada? |
|---|---|---|
| `pikachu` | Muestra a Pikachu | Sí |
| `PIKACHU` | Muestra a Pikachu | Sí |
| `   pikachu   ` | Muestra a Pikachu | Sí |
| `25` | Muestra a Pikachu | Sí |
| `charizard` | Muestra dos tipos | Sí |
| `mr-mime` | Muestra a Mr. Mime | Sí, pero sale "Mr-Mime" con guion |
| Campo vacío | Mensaje de validación | Sí |
| Solo espacios | Mensaje de validación | Sí |
| `pokemon-inventado` | Mensaje de Pokémon no encontrado | Sí |

Al buscar uno que no existe sale en la consola una línea roja `GET ... 404 (Not Found)`. No es un error de mi código, es Chrome apuntando que la petición falló. Mi código lo controla con el `catch` y por eso no sale ningún `Uncaught`.

En la consola también me salía un `Uncaught (in promise) Error: Could not establish connection` de `content_script.js`, pero era de una extensión de Chrome y no de mi código. Probando en una ventana de incógnito, que no tiene extensiones, ya no sale.

### Capturas

![Mini-Pokédex recién abierta](assets/readme/01-inicio.png)

![Búsqueda de Pikachu](assets/readme/01-busqueda-pikachu.png)

![Búsqueda de un Pokémon que no existe](assets/readme/01-error-no-encontrado.png)

**Commit del punto de partida:** [`72ae29d`](https://github.com/diegoalegil/pgl-2dam/commit/72ae29d0fe63f1a50e799fa49c57e26de100f36d)

## 2. Carga de los 151 Pokémon

### Cambios respecto al código inicial

- En el HTML metí el título y la explicación dentro de un `<header>`, cambié el título a "Pokédex de Diego" y puse una explicación nueva de cómo se usa.
- Añadí el botón "Cargar Pokémon" con `type="button"`, para que nunca envíe el formulario, y un desplegable `<select>` para filtrar por tipo, de momento solo con la opción "Todos".
- El mensaje ahora empieza con `Pulsa "Cargar Pokémon" para empezar.`
- En el CSS puse la cabecera roja con el título en blanco, el contenedor más ancho (1100 px) para que luego quepan las tarjetas, estilos para el botón nuevo y el desplegable, y una Poké Ball como cursor en los botones. La imagen es la de PokéAPI y está en `assets/images/pokeball.png`.
- Creé la clase `Pokemon` en `js/Pokemon.js` y la importé en `app.js`. Para poder usar `import` tuve que poner `type="module"` en el `<script>` del HTML.
- `obtenerPokemon` ya no devuelve un objeto escrito a mano, devuelve `new Pokemon(datos)`.
- La búsqueda de un solo Pokémon de la guía sigue funcionando igual.

### La clase Pokemon

La API devuelve un objeto enorme (Pikachu trae más de 100 movimientos), así que la clase se queda solo con lo que necesito y ya transformado:

| Atributo | De dónde sale en la API | Qué le hago |
|---|---|---|
| `id` | `id` | Nada |
| `nombre` | `name` | Nada |
| `altura` | `height` | Entre 10, porque viene en decímetros y la quiero en metros |
| `peso` | `weight` | Entre 10, porque viene en hectogramos y lo quiero en kilos |
| `spriteEspalda` | `sprites.back_default` | Nada |
| `spriteFrente` | `sprites.front_default` | Nada |
| `imagenGrande` | `sprites.other["official-artwork"].front_default` | Nada (va con corchetes por el guion) |
| `experienciaBase` | `base_experience` | Nada |
| `tipos` | `types` | Con `map` me quedo solo con el nombre de cada tipo |

Los movimientos y todo lo demás no los guardo porque no los uso.

### Cómo se cargan los 151

Para no pedirlos uno detrás de otro, los pido todos a la vez. En el bucle llamo a `obtenerPokemon(id)` sin `await`, así me da una promesa por cada uno, y luego con `Promise.all` espero a que lleguen todas juntas. `Promise.all` los devuelve en el mismo orden en que los pedí, del 1 al 151.

```javascript
const obtenerListaPokemon = async () => {
  const peticiones = [];

  for (let id = 1; id <= TOTAL_POKEMON; id++) {
    peticiones.push(obtenerPokemon(id));
  }

  const listaPokemon = await Promise.all(peticiones);
  return listaPokemon;
};
```

Lo comprobé con unos `console.log` temporales: salían 151, el primero era Bulbasaur y el último Mew. Tarda menos de un segundo.

### Mensajes y errores al cargar

- Al pulsar el botón sale "Cargando Pokémon..." y el botón se desactiva para que no se pueda pulsar dos veces.
- Cuando terminan sale "Se han cargado 151 Pokémon." (el número sale de `listaPokemon.length`) y el botón se oculta porque ya no hace falta.
- Si falla la conexión sale "No se han podido cargar los Pokémon. Revisa tu conexión a internet e inténtalo de nuevo." y el botón cambia a "Reintentar". El error técnico solo sale en la consola con `console.error`.
- El botón se vuelve a activar en el `finally`, haya ido bien o mal.

Para probar el error usé Chrome: en la pestaña Red marqué "Inhabilitar caché", puse "Sin conexión" y pulsé el botón sin recargar. Luego volví a "Sin limitación", pulsé "Reintentar" y cargaron los 151.

### Problemas que tuve

- Al guardar el nombre puse `datos.nombre` y salía `undefined`, porque en la API se llama `name`. Con el peso me pasó lo mismo (`datos.peso`) y salía `NaN`. Lo que aprendí: a la izquierda va mi nombre en español y a la derecha el de la API en inglés.
- Me costó sacar la imagen grande porque está muy metida dentro del JSON. Primero copié el camino de la URL de la imagen y no tiene nada que ver con el JSON. Lo saqué abriendo las cajas en la consola y usando corchetes para `official-artwork`.
- Cuando `obtenerPokemon` empezó a devolver la clase se rompió la búsqueda: no salía la imagen y Pikachu medía 0,04 m. Era porque la tarjeta usaba `imagen` (ahora es `imagenGrande`) y volvía a dividir entre 10 lo que la clase ya había dividido.
- Una vez cambié el código y el navegador seguía enseñando el viejo. Era la caché y se arregla recargando con `Cmd + Option + R`.

### Capturas

![Mientras cargan los Pokémon](assets/readme/02-cargando.png)

![Los 151 Pokémon cargados](assets/readme/02-cargados.png)

![Error al cargar sin conexión y botón Reintentar](assets/readme/02-error-conexion.png)

**Commit de la fase:** [`0352db9`](https://github.com/diegoalegil/pgl-2dam/commit/0352db912ad527eaa2121f346ad780f4f33a3ad4)

## 3. Construcción de las tarjetas

### Datos que uso de PokéAPI

Cada tarjeta enseña el número, el nombre, los dos sprites, los tipos, la altura en metros y el peso en kilos. Todo eso ya lo tenía en la clase `Pokemon` desde la fase anterior, así que no he tenido que pedir nada nuevo a la API.

### Cómo se generan las tarjetas

He hecho dos funciones en `app.js`:

- `crearTarjeta(pokemon)` devuelve el HTML de una tarjeta como texto, con una plantilla literal. Es parecida a la `mostrarPokemon` de la guía.
- `mostrarTarjetas(lista)` hace un `map` para crear todas las tarjetas, las une con `join("")` y las mete en la sección `resultado` con `innerHTML`.

```javascript
const mostrarTarjetas = (lista) => {
  resultado.innerHTML = lista.map((pokemon) => crearTarjeta(pokemon)).join("");
};
```

La lista de los 151 la he sacado fuera del botón (`let listaPokemon = [];` arriba del todo) porque en la siguiente fase la necesito también para buscar y filtrar.

Los tipos salen con `map` igual que en la guía, y cada uno lleva una clase con su nombre (`tipo--fire`, `tipo--water`...) para darle un color distinto en el CSS. Para que los nombres se lean bien hice `formatearTexto`, que pone la primera letra en mayúscula y cambia el guion por un espacio. Así "mr-mime" sale como "Mr mime", que era lo que tenía pendiente del apartado 1.

### Cambio de sprite al pasar el cursor

Lo he hecho solo con CSS. Cada tarjeta lleva las dos imágenes, la de espaldas y la de frente, y la de frente está oculta. Cuando pasas el cursor por la tarjeta se cambian:

```css
.tarjeta__sprite--frente {
  display: none;
}

.tarjeta:hover .tarjeta__sprite--espalda {
  display: none;
}

.tarjeta:hover .tarjeta__sprite--frente {
  display: block;
}
```

Así nunca se ven las dos a la vez y no se hace ninguna petición nueva a la API, porque las dos imágenes ya se cargaron al pintar las tarjetas. Lo comprobé en la pestaña Red: al pasar el cursor no aparece ninguna petición.

### Cuadrícula para móvil y ordenador

La sección `resultado` ahora es una cuadrícula con `grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))`. Así caben las columnas que entren según el ancho: 6 en el ordenador y 2 en el móvil, sin que se salga nada por los lados.

### Capturas

![Las tarjetas de los 151 Pokémon](assets/readme/03-tarjetas.png)

![Con el cursor encima de Charmander sale de frente y los demás de espaldas](assets/readme/03-hover.png)

![Las tarjetas en el móvil](assets/readme/03-movil.png)

**Commit de la fase:** [`44c62a3`](https://github.com/diegoalegil/pgl-2dam/commit/44c62a3449522d0751a923f040134730e533daf3)

