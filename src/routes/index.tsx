import { RouteObject } from 'react-router-dom'
import HomePage from '../pages/HomePage'

/**
 * Configuración de ruta de la página de inicio
 * @type {RouteObject}
 * @description Define la ruta raíz para la página de inicio
 */
export const homeRoute: RouteObject = {
  path: '/',
  element: <HomePage />,
  errorElement: <div>error 404 no encontrado 💀</div>,
}
