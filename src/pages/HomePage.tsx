import { Link } from "react-router-dom"

/**
 * Componente de Página de Inicio
 * @description Renderiza la página de destino principal de la aplicación
 * @returns {React.ReactElement} Página de inicio renderizada con mensaje de bienvenida
 */
function HomePage() {
    return (
        <div className="w-screen h-screen flex flex-col justify-center items-center p-6 bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold text-center text-blue-600">Hola soy la home page</h1>
            <Link to="/about">ver demo</Link>
        </div>
    )
}

export default HomePage