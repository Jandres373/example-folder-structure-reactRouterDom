import React from 'react'
import VisionPage from '../../pages/about/VisionPage'
import MisionPage from '../../pages/about/MisionPage'

import { RouteObject } from 'react-router-dom'
import { Outlet, Link } from 'react-router-dom'
import AboutPage from '../../pages/about/AboutPage'

/**
 * Configuración de rutas para la sección Acerca de
 * @type {RouteObject}
 * @description Define rutas anidadas para páginas de Acerca de con un diseño compartido
 */
export const aboutRoute: RouteObject = {
    path: 'about',
    element: (
        <Layout1>
            <Layout2 />
        </Layout1>
    ),
    children: [
        {
            path: '',
            element: <AboutPage />,
        },
        {
            path: 'vision',
            element: <VisionPage />,
        },
        {
            path: 'mision',
            element: <MisionPage />,
        },
    ],
}

/**
 * Primer contenedor de diseño para páginas de Acerca de
 * @param {Object} props - Propiedades del componente
 * @param {React.ReactNode} props.children - Componentes hijos para renderizar
 * @returns {React.ReactElement} Componente Layout1 renderizado
 */
function Layout1({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <div>hola soy el layout 1</div>
            {children}
        </div>
    )
}

/**
 * Segundo contenedor de diseño para páginas de Acerca de con navegación
 * @returns {React.ReactElement} Componente Layout2 renderizado con área de navegación y contenido
 */
function Layout2() {
    return (
        <div className="w-screen min-h-screen bg-gray-100 p-6">
            <div>
                hola soy el layout 2
            </div>
            <p>da click en algun enlace para ver como cambia la ruta mientras yo me mantengo</p>
            <div className="container mx-auto">
                <nav className="mb-6">
                    <ul className="flex space-x-4">
                        <li>
                            <Link
                                to="/about/vision"
                                className="text-blue-600 hover:text-blue-800 font-semibold"
                            >
                                Visión
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/about/mision"
                                className="text-blue-600 hover:text-blue-800 font-semibold"
                            >
                                Misión
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className="bg-white shadow-md rounded-xl p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}