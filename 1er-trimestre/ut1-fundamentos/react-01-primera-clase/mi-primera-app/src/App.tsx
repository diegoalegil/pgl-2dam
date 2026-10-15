import './App.css'
import { useState } from 'react';
import Saludo from './components/Saludo';

function App() {
  const [contador, setContador] = useState(0);

  function incrementar () {
    setContador (contador + 1);
  }

  return(
    <div>
        <p>Contador: {contador}</p>
        <button onClick={incrementar}>Contador</button>
    </div>
  )
}



export default App
