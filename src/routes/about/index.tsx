import MainLayout from '../../layouts/main_layout'
import InnerLayout from '../../layouts/inner_layout'

import AboutPage from '../../pages/about/AboutPage'
import VisionPage from '../../pages/about/VisionPage'
import MisionPage from '../../pages/about/MisionPage'
import InternalPage from '../../pages/about/InternalPage'

import { RouteObject } from 'react-router-dom'
import { ProtectedRoute } from '../../shared/guards/ProtectedRoute'

/**
 * Configuración de rutas para la sección Acerca de
 * @type {RouteObject}
 * @description Define rutas anidadas para páginas de Acerca de con un diseño compartido
 */
export const aboutRoute: RouteObject = {
    path: 'about',
    element: (
        <MainLayout>
            <InnerLayout />
        </MainLayout>
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
        {
            path: 'internal',
            element: (
                <ProtectedRoute>
                    <InternalPage />
                </ProtectedRoute>
            ),
        },
    ],
}