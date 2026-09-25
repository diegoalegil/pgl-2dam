const nombrePokemon = "Jirachi";
const tipoPokemon = "Psíquico";
let energiaPokemon = 50;

const obtenerEstado = (energia) => {
  if (energia >= 50) {
    return "Puede seguir entrenando";
  } else {
    return "Necesita descansar";
  }
};

console.log(
  `${nombrePokemon} es de tipo ${tipoPokemon} y tiene ${energiaPokemon} puntos de energía.`,
);

energiaPokemon = energiaPokemon - 30;

console.log(
  `Después del ataque a ${nombrePokemon} le quedan ${energiaPokemon} puntos de energía.`,
);

console.log(`Estado de ${nombrePokemon}: ${obtenerEstado(energiaPokemon)}.`);

// Pruebas con otros valores
console.log(obtenerEstado(80));
console.log(obtenerEstado(50));
console.log(obtenerEstado(20));
