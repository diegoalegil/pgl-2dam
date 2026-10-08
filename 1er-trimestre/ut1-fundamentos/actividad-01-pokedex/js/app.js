import { Pokemon } from "./Pokemon.js";

const URL_API = "https://pokeapi.co/api/v2/pokemon";
const TOTAL_POKEMON = 151;

const formulario = document.querySelector("#formulario-busqueda");
const inputBusqueda = document.querySelector("#busqueda");
const mensaje = document.querySelector("#mensaje");
const resultado = document.querySelector("#resultado");
const botonBuscar = formulario.querySelector("button");
const botonCargar = document.querySelector("#boton-cargar");

let listaPokemon = [];

const obtenerPokemon = async (busqueda) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${busqueda}`;
  const respuesta = await fetch(url);

  if (!respuesta.ok) {
    throw new Error("Pokémon no encontrado.");
  }

  const datos = await respuesta.json();

  return new Pokemon(datos);
};

const formatearId = (id) => {
  return String(id).padStart(3, "0");
};

const formatearTexto = (texto) => {
  const textoConEspacios = texto.replace("-", " ");
  return textoConEspacios.charAt(0).toUpperCase() + textoConEspacios.slice(1);
};

const crearTarjeta = (pokemon) => {
  const tiposHTML = pokemon.tipos
    .map((tipo) => `<span class="tipo tipo--${tipo}">${tipo}</span>`)
    .join("");

  return `
    <article class="tarjeta">
      <p class="tarjeta__numero">N.º ${formatearId(pokemon.id)}</p>

      <div class="tarjeta__sprites">
        <img
          class="tarjeta__sprite tarjeta__sprite--espalda"
          src="${pokemon.spriteEspalda}"
          alt="${formatearTexto(pokemon.nombre)} de espaldas"
        >
        <img
          class="tarjeta__sprite tarjeta__sprite--frente"
          src="${pokemon.spriteFrente}"
          alt="${formatearTexto(pokemon.nombre)} de frente"
        >
      </div>

      <h2 class="tarjeta__nombre">${formatearTexto(pokemon.nombre)}</h2>

      <div class="tarjeta__tipos">
        ${tiposHTML}
      </div>

      <div class="tarjeta__datos">
        <p><strong>Altura</strong><br>${pokemon.altura} m</p>
        <p><strong>Peso</strong><br>${pokemon.peso} kg</p>
      </div>
    </article>
  `;
};

const mostrarTarjetas = (lista) => {
  resultado.innerHTML = lista.map((pokemon) => crearTarjeta(pokemon)).join("");
};

const mostrarPokemon = (pokemon) => {
  const tiposHTML = pokemon.tipos
    .map((tipo) => `<span class="tipo">${tipo}</span>`)
    .join("");

  resultado.innerHTML = `
    <article class="pokemon">
      <p class="pokemon__numero">N.º ${formatearId(pokemon.id)}</p>

      <img
        class="pokemon__imagen"
        src="${pokemon.imagenGrande}"
        alt="Imagen de ${pokemon.nombre}"
      >

      <h2 class="pokemon__nombre">${pokemon.nombre}</h2>

      <div class="pokemon__datos">
        <p><strong>Altura</strong><br>${pokemon.altura} m</p>
        <p><strong>Peso</strong><br>${pokemon.peso} kg</p>
      </div>

      <div class="pokemon__tipos">
        ${tiposHTML}
      </div>
    </article>
  `;
};

formulario.addEventListener("submit", async (evento) => {
  evento.preventDefault();

  const busqueda = inputBusqueda.value.trim().toLowerCase();

  if (!busqueda) {
    mensaje.textContent = "Introduce un nombre o número.";
    resultado.innerHTML = "";
    return;
  }

  mensaje.textContent = "Cargando...";
  resultado.innerHTML = "";
  botonBuscar.disabled = true;

  try {
    const pokemon = await obtenerPokemon(busqueda);

    mostrarPokemon(pokemon);
    mensaje.textContent = "";
    inputBusqueda.value = "";
    inputBusqueda.focus();
  } catch (error) {
    mensaje.textContent = error.message;
  } finally {
    botonBuscar.disabled = false;
  }
});

const obtenerListaPokemon = async () => {
  const peticiones = [];

  for (let id = 1; id <= TOTAL_POKEMON; id++) {
    peticiones.push(obtenerPokemon(id));
  }

  const listaPokemon = await Promise.all(peticiones);
  return listaPokemon;
};

botonCargar.addEventListener("click", async () => {
  mensaje.textContent = "Cargando Pokémon...";
  botonCargar.disabled = true;

  try {
    listaPokemon = await obtenerListaPokemon();
    mostrarTarjetas(listaPokemon);
    mensaje.textContent = `Se han cargado ${listaPokemon.length} Pokémon.`;
    botonCargar.hidden = true;
  } catch (error) {
    console.error(error);
    mensaje.textContent = "No se han podido cargar los Pokémon. Revisa tu conexión a internet e inténtalo de nuevo.";
    botonCargar.textContent = "Reintentar";
  } finally {
    botonCargar.disabled = false;
  }
});
