import './App.css'

function App() {
  const nombre = "Sara";
  const edad = "31";

  function saludar(){
    alert("¡Hola, " + nombre + "¡")
  }
  return (
    <main>
        <h1>Bienvenida, {nombre}</h1>
        <p>Tienes {edad} años</p>

        <button onClick={saludar}>Saludar</button>
    </main>
  )
}



export default App
