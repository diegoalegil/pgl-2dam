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
