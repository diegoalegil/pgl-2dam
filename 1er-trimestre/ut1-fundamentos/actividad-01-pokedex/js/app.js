import { Pokemon } from "./Pokemon.js";

const URL_API = "https://pokeapi.co/api/v2/pokemon";
const TOTAL_POKEMON = 151;
const NOMBRES_ESTADISTICAS = {
  hp: "Puntos de salud",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "Ataque especial",
  "special-defense": "Defensa especial",
  speed: "Velocidad",
};

const formulario = document.querySelector("#formulario-busqueda");
const inputBusqueda = document.querySelector("#busqueda");
const filtroTipo = document.querySelector("#filtro-tipo");
const mensaje = document.querySelector("#mensaje");
const resultado = document.querySelector("#resultado");
const botonCargar = document.querySelector("#boton-cargar");
const panelDetalles = document.querySelector("#panel-detalles");
const contenidoDetalles = document.querySelector("#contenido-detalles");
const botonCerrar = document.querySelector("#boton-cerrar");

let listaPokemon = [];

const obtenerPokemon = async (busqueda) => {
  const url = `${URL_API}/${busqueda}`;
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

const crearTiposHTML = (tipos) => {
  return tipos
    .map((tipo) => `<span class="tipo tipo--${tipo}">${tipo}</span>`)
    .join("");
};

const crearTarjeta = (pokemon) => {
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
        ${crearTiposHTML(pokemon.tipos)}
      </div>

      <div class="tarjeta__datos">
        <p><strong>Altura</strong><br>${pokemon.altura} m</p>
        <p><strong>Peso</strong><br>${pokemon.peso} kg</p>
      </div>

      <button class="tarjeta__boton" type="button" data-id="${pokemon.id}">
        Ver detalles
      </button>
    </article>
  `;
};

const mostrarDetalles = (pokemon) => {
  const habilidadesHTML = pokemon.habilidades
    .map((habilidad) => `<li>${formatearTexto(habilidad)}</li>`)
    .join("");

  const estadisticasHTML = pokemon.estadisticas
    .map((estadistica) => {
      return `
        <li class="estadistica">
          <span>${NOMBRES_ESTADISTICAS[estadistica.nombre]}</span>
          <strong>${estadistica.valor}</strong>
        </li>
      `;
    })
    .join("");

  contenidoDetalles.innerHTML = `
    <p class="tarjeta__numero">N.º ${formatearId(pokemon.id)}</p>
    <h2 class="panel__nombre">${formatearTexto(pokemon.nombre)}</h2>

    <img
      class="panel__imagen"
      src="${pokemon.imagenGrande}"
      alt="Ilustración oficial de ${formatearTexto(pokemon.nombre)}"
    >

    <div class="tarjeta__tipos">
      ${crearTiposHTML(pokemon.tipos)}
    </div>

    <div class="panel__datos">
      <p><strong>Altura</strong><br>${pokemon.altura} m</p>
      <p><strong>Peso</strong><br>${pokemon.peso} kg</p>
      <p><strong>Experiencia base</strong><br>${pokemon.experienciaBase}</p>
    </div>

    <h3>Habilidades</h3>
    <ul class="panel__habilidades">
      ${habilidadesHTML}
    </ul>

    <h3>Estadísticas base</h3>
    <ul class="panel__estadisticas">
      ${estadisticasHTML}
    </ul>
  `;

  panelDetalles.showModal();
  panelDetalles.scrollTop = 0;
};

const mostrarTarjetas = (lista) => {
  resultado.innerHTML = lista.map((pokemon) => crearTarjeta(pokemon)).join("");

  const botonesDetalles = resultado.querySelectorAll(".tarjeta__boton");

  botonesDetalles.forEach((boton) => {
    boton.addEventListener("click", () => {
      const id = Number(boton.dataset.id);
      const pokemon = listaPokemon.find((elemento) => elemento.id === id);
      mostrarDetalles(pokemon);
    });
  });
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
    mensaje.textContent = "Todavía no hay Pokémon cargados.";
    return;
  }

  const texto = inputBusqueda.value.trim().toLowerCase().replace(" ", "-");
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
    mensaje.textContent = `Mostrando ${filtrados.length} de ${listaPokemon.length} Pokémon.`;
  }
};

const obtenerListaPokemon = async () => {
  const peticiones = [];

  for (let id = 1; id <= TOTAL_POKEMON; id++) {
    peticiones.push(obtenerPokemon(id));
  }

  const lista = await Promise.all(peticiones);
  return lista;
};

botonCargar.addEventListener("click", async () => {
  mensaje.textContent = "Cargando Pokémon...";
  botonCargar.disabled = true;

  try {
    listaPokemon = await obtenerListaPokemon();
    rellenarFiltroTipo();
    inputBusqueda.value = "";
    mostrarTarjetas(listaPokemon);
    mensaje.textContent = `Se han cargado ${listaPokemon.length} Pokémon.`;
    botonCargar.hidden = true;
  } catch (error) {
    console.error(error);
    mensaje.textContent =
      "No se han podido cargar los Pokémon. Revisa tu conexión a internet e inténtalo de nuevo.";
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

botonCerrar.addEventListener("click", () => {
  panelDetalles.close();
});

panelDetalles.addEventListener("click", (evento) => {
  if (evento.target === panelDetalles) {
    panelDetalles.close();
  }
});
