export class Pokemon {
  constructor(datos) {
    this.id = datos.id;
    this.nombre = datos.name;
    this.altura = datos.height / 10;
    this.peso = datos.weight / 10;
    this.spriteEspalda = datos.sprites.back_default;
    this.spriteFrente = datos.sprites.front_default;
  }
}
