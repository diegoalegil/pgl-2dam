import { useState } from "react";
import "./App.css";
import GameCard from "./components/GameCard";

type Game = {
  id: number;
  title: string;
  genre: string;
  price: number;
  available: boolean;
};

const games: Game[] = [
  { id: 1, title: "Hollow Knight", genre: "Aventura", price: 14.99, available: true },
  { id: 2, title: "Celeste", genre: "Plataformas", price: 19.99, available: true },
  { id: 3, title: "Stardew Valley", genre: "Simulación", price: 13.99, available: false },
  { id: 4, title: "Valorant", genre: "Shooter", price: 0, available: true },
  { id: 5, title: "EA Sports FC 27", genre: "Deportes", price: 69.99, available: true },
  { id: 6, title: "Minecraft", genre: "Supervivencia", price: 29.99, available: true },
  { id: 7, title: "Pokémon Púrpura", genre: "RPG", price: 59.99, available: true },
  { id: 8, title: "Zelda: Tears of the Kingdom", genre: "Aventura", price: 69.99, available: false },
  { id: 9, title: "Geometry Dash", genre: "Ritmo", price: 4.99, available: true },
  { id: 10, title: "Among Us", genre: "Party", price: 3.99, available: false },
  { id: 11, title: "Spider-Man 2", genre: "Acción", price: 69.99, available: true },
  { id: 12, title: "God of War Ragnarök", genre: "Acción", price: 69.99, available: false },
  { id: 13, title: "Cuphead", genre: "Plataformas", price: 19.99, available: true },
  { id: 14, title: "Undertale", genre: "RPG", price: 9.99, available: false },
];

function App() {
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [onlyUnder15, setOnlyUnder15] = useState(false);

  const visibleGames = onlyAvailable
    ? games.filter((game) => game.available)
    : games;

  const filteredGames = onlyUnder15
    ? visibleGames.filter((game) => game.price < 15)
    : visibleGames;

  return (
    <main className="app">
      <h1>GameShelf</h1>
      <p>Mi catálogo de videojuegos</p>
      <button onClick={() => setOnlyAvailable(!onlyAvailable)}>
        {onlyAvailable ? "Mostrar todos" : "Mostrar disponibles"}
      </button>
      <button onClick={() => setOnlyUnder15(!onlyUnder15)}>
        {onlyUnder15 ? "Todos los precios" : "Menos de 15 €"}
      </button>
      <section className="catalog">
        {filteredGames.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            genre={game.genre}
            price={game.price}
            available={game.available}
          />
        ))}
      </section>
    </main>
  );
}

export default App;