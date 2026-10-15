type SaludoProps = {
    nombre: string;
}

export default function Saludo({ nombre }: SaludoProps) {
    return <h2>¡Hola, {nombre}</h2>
}