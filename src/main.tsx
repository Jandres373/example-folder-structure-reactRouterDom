import './index.css';
import { StrictMode } from 'react';
import { homeRoute } from './routes';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import { aboutRoute } from './routes/about';

/**
 * Configuración de enrutamiento de la aplicación
 * @type {RouteObject[]}
 * @description Combina todas las rutas de nivel superior para la aplicación
 */
export const routes: RouteObject[] = [homeRoute, aboutRoute];

/**
 * Crea el enrutador del navegador con rutas definidas
 * @type {ReturnType<typeof createBrowserRouter>}
 */
const router = createBrowserRouter(routes);

/**
 * Renderiza la aplicación principal
 * @description Inicializa la aplicación React con StrictMode y RouterProvider
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
