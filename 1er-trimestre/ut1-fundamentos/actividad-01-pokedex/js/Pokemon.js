export class Pokemon {
  constructor(datos) {
    this.id = datos.id;
    this.nombre = datos.name;
    this.altura = datos.height / 10;
    this.peso = datos.weight / 10;
    this.spriteEspalda = datos.sprites.back_default;
    this.spriteFrente = datos.sprites.front_default;
    this.imagenGrande = datos.sprites.other["official-artwork"].front_default;
    this.experienciaBase = datos.base_experience;
    this.tipos = datos.types.map((elemento) => elemento.type.name);
    this.habilidades = datos.abilities.map((elemento) => elemento.ability.name);
    this.estadisticas = datos.stats.map((elemento) => {
      return { nombre: elemento.stat.name, valor: elemento.base_stat };
    });
  }
}
