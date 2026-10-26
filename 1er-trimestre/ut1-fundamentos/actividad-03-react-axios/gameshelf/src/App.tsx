import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import GameCard from "./components/GameCard";
import type { Juego } from "./types/Juego";

const URL_API = "https://api.sampleapis.com/switch/games";

function App() {
  const [juegos, setJuegos] = useState<Juego[]>([]);

  useEffect(() => {
    async function cargarJuegos(): Promise<void> {
      try {
        const respuesta = await axios.get<Juego[]>(URL_API);
        setJuegos(respuesta.data);
      } catch (errorCapturado) {
        console.error(errorCapturado);
      }
    }

    cargarJuegos();
  }, []);

  return (
    <main className="app">
      <h1>GameShelf</h1>
      <p>Mi catálogo de videojuegos de Nintendo Switch</p>
      <section className="catalog">
        {juegos.map((juego) => (
          <GameCard key={juego.id} juego={juego} />
        ))}
      </section>
    </main>
  );
}

export default App;
