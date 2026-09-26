const nombre = "Charmander";
const nivel = 10;
const experienciaActual = 70;
const experienciaGanada = 30;

const experienciaTotal = experienciaActual + experienciaGanada;

console.log(`${nombre} tenia ${experienciaActual} puntos de experiencia`);
console.log(`${nombre} ha ganado ${experienciaGanada} puntos`);
console.log(`Ahora tiene ${experienciaTotal} puntos de experiencia`);

if (experienciaTotal >= 100) {
    console.log(`${nombre} puede subir de nivel`);
} else {
    console.log(`${nombre} todavia no puede subir de nivel`);
}