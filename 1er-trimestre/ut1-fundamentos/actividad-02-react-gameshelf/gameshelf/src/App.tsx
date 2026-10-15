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
  { id: 5, title: "EA Sports FC 26", genre: "Deportes", price: 69.99, available: true },
  { id: 6, title: "Minecraft", genre: "Supervivencia", price: 29.99, available: true },
  { id: 7, title: "Pokémon Púrpura", genre: "RPG", price: 59.99, available: true },
  { id: 8, title: "Zelda: Tears of the Kingdom", genre: "Aventura", price: 69.99, available: false },
  { id: 9, title: "Terraria", genre: "Sandbox", price: 9.99, available: true },
  { id: 10, title: "Among Us", genre: "Party", price: 3.99, available: false },
  { id: 11, title: "Hades", genre: "Roguelike", price: 24.99, available: true },
  { id: 12, title: "Elden Ring", genre: "RPG de acción", price: 59.99, available: false },
  { id: 13, title: "Cuphead", genre: "Plataformas", price: 19.99, available: true },
  { id: 14, title: "Undertale", genre: "RPG", price: 9.99, available: false },
];

function App() {
  return (
    <main className="app">
      <h1>GameShelf</h1>
      <p>Mi catálogo de videojuegos</p>
      <section className="catalog">
        {games.map((game) => (
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