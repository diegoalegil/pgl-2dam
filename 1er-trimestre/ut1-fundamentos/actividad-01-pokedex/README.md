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
