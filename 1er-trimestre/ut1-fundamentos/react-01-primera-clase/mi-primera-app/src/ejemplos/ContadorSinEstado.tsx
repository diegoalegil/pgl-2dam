// Ejemplo de clase antes de useState: en la consola el contador sube,
// pero en la página sigue saliendo 0 porque es una variable normal

function ContadorSinEstado() {
  let contador = 0;

  function incrementar(){
    contador++;
    console.log(contador);
  }

  return(
    <div>
        <p>Contador: {contador}</p>
        <button onClick={incrementar}>Contador</button>
    </div>
  )
}

export default ContadorSinEstado
