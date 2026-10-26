import type { Juego } from "../types/Juego";

type GameCardProps = {
  juego: Juego;
};

export default function GameCard({ juego }: GameCardProps) {
  return (
    <article className="card">
      <h2>{juego.name}</h2>
      <p>Género: {juego.genre.join(", ")}</p>
    </article>
  );
}
