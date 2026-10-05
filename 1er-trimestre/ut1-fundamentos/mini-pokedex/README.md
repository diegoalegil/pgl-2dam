# Práctica guiada. Mini-Pokédex

## Qué es

Es una página donde escribes el nombre o el número de un Pokémon y te sale su tarjeta con la imagen, el número, el nombre, la altura, el peso y los tipos. Los datos los saca de PokéAPI con `fetch`. Es la base para la Actividad 01, la Pokédex con los 151 Pokémon.

## Cómo probarla

Clic derecho en `index.html` y **Open with Live Server**. Necesita conexión a Internet.

## Ampliaciones

- Después de una búsqueda correcta se limpia el campo y el cursor vuelve a él.
- El botón Buscar se desactiva mientras carga y se vuelve a activar en el `finally`, aunque haya un error.
- La imagen ahora es la oficial (`official-artwork`) en vez del sprite pequeño. Quité el `image-rendering: pixelated` del CSS porque eso sirve para ampliar sprites pequeños, y al reducir la imagen oficial (475 px) a 180 px se veía con dientes de sierra.

## Preguntas de comprobación

1. **¿Por qué escuchamos el evento `submit` del formulario?**

   Para que funcione el clic en el botón y el Enter al mismo tiempo.

2. **¿Qué ocurriría si eliminamos `evento.preventDefault()`?**

   El formulario haría lo normal, mandar la búsqueda en la URL (`?busqueda=pikachu`) y recargar la página, así que se perdería la tarjeta.

3. **¿Para qué utilizamos `trim()` y `toLowerCase()`?**

   Para normalizar las mayúsculas y los espacios y evitar errores, así `   PIKACHU   ` y `pikachu` son la misma búsqueda.

4. **¿Por qué `obtenerPokemon()` está declarada con `async`?**

   Porque dentro usa `await`, y `await` solo se puede usar dentro de una función `async`.

5. **¿Qué devuelve `fetch()`?**

   Una promesa, porque la respuesta no llega al momento, tiene que venir por Internet.

6. **¿Para qué se utiliza `await`?**

   Para esperar a que llegue el resultado de la promesa antes de seguir.

7. **¿Por qué debemos comprobar `respuesta.ok`?**

   Porque si el Pokémon no existe la API devuelve un 404 y `fetch` no da error por sí solo, así que hay que mirarlo nosotros y lanzar el error con `throw`.

8. **¿Qué hace `respuesta.json()`?**

   Convierte el texto JSON que llega en un objeto de JavaScript.

9. **¿Por qué no devolvemos directamente todos los datos recibidos?**

   Porque la API trae muchísimas cosas (Pikachu trae 109 movimientos) y solo necesitamos 6 datos, y así además los tenemos con nombres en español.

10. **¿Qué resultado produce `map()` al transformar los tipos?**

    Un array con los nombres de los tipos, por ejemplo con Charizard `["fire", "flying"]`.

11. **¿Por qué utilizamos `join("")` después de `map()`?**

    Para juntarlo todo en un solo texto sin nada en medio, si no los tipos salen separados por comas.

12. **¿Qué diferencia existe entre `try` y `catch`?**

    En el `try` va el código que puede fallar y, si falla, salta al `catch`, que aquí enseña el mensaje de error.

13. **¿Por qué hemos separado `obtenerPokemon()` y `mostrarPokemon()`?**

    Para que cada función haga una sola cosa, una trae los datos y la otra los pinta, y así se pueden reutilizar por separado.

14. **¿Qué función cumple `formatearId()`?**

    Pasa el número a texto con ceros delante hasta tener 3 cifras, por ejemplo el 25 sale como `025`.

15. **¿Qué habría que modificar para mostrar varios Pokémon simultáneamente?**

    Habría que llamar a `obtenerPokemon` una vez por cada Pokémon, guardar los resultados en un array y pintar una tarjeta por cada uno con `map` y `join`, como se hace con los tipos.
