import { Pokemon } from "./Pokemon.js";

const URL_API = "https://pokeapi.co/api/v2/pokemon";
const TOTAL_POKEMON = 151;

const formulario = document.querySelector("#formulario-busqueda");
const inputBusqueda = document.querySelector("#busqueda");
const mensaje = document.querySelector("#mensaje");
const resultado = document.querySelector("#resultado");
const botonBuscar = formulario.querySelector("button");
const botonCargar = document.querySelector("#boton-cargar");

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
  const listaPokemon = await obtenerListaPokemon();
  mensaje.textContent = `Se han cargado ${listaPokemon.length} Pokémon.`;
});
