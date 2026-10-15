import './App.css'
import Saludo from './components/Saludo';

function App() {
  const nombre = "Sara";
  const edad = "31";

  function saludar(){
    alert("¡Hola, " + nombre + "¡")
  }
  return (
    <main>
        <h1>Bienvenida, {nombre}</h1>
        <Saludo />
        <Saludo />
    </main>
  )
}



export default App
