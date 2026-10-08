import { Pokemon } from "./Pokemon.js";

const URL_API = "https://pokeapi.co/api/v2/pokemon";
const TOTAL_POKEMON = 151;

const formulario = document.querySelector("#formulario-busqueda");
const inputBusqueda = document.querySelector("#busqueda");
const filtroTipo = document.querySelector("#filtro-tipo");
const mensaje = document.querySelector("#mensaje");
const resultado = document.querySelector("#resultado");
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

const rellenarFiltroTipo = () => {
  const tipos = [];

  listaPokemon.forEach((pokemon) => {
    pokemon.tipos.forEach((tipo) => {
      if (!tipos.includes(tipo)) {
        tipos.push(tipo);
      }
    });
  });

  tipos.sort();

  const opcionesHTML = tipos
    .map((tipo) => `<option value="${tipo}">${formatearTexto(tipo)}</option>`)
    .join("");

  filtroTipo.innerHTML = `<option value="todos">Todos</option>${opcionesHTML}`;
};

const aplicarFiltros = () => {
  if (listaPokemon.length === 0) {
    mensaje.textContent = 'Primero pulsa "Cargar Pokémon".';
    return;
  }

  const texto = inputBusqueda.value.trim().toLowerCase();
  const tipo = filtroTipo.value;

  const filtrados = listaPokemon.filter((pokemon) => {
    const coincideTexto =
      texto === "" ||
      pokemon.nombre.includes(texto) ||
      pokemon.id === Number(texto);
    const coincideTipo = tipo === "todos" || pokemon.tipos.includes(tipo);

    return coincideTexto && coincideTipo;
  });

  mostrarTarjetas(filtrados);

  if (filtrados.length === 0) {
    mensaje.textContent = "No hay ningún Pokémon que coincida con la búsqueda.";
  } else {
    mensaje.textContent = `Se muestran ${filtrados.length} de ${listaPokemon.length} Pokémon.`;
  }
};

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
    rellenarFiltroTipo();
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

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  aplicarFiltros();
});

inputBusqueda.addEventListener("input", aplicarFiltros);
filtroTipo.addEventListener("change", aplicarFiltros);
