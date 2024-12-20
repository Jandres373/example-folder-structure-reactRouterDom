import { RouteObject } from 'react-router-dom'
import HomePage from '../pages/HomePage'

/**
 * Configuración de ruta de la página de inicio
 * @type {RouteObject}
 * @description Define la ruta raíz para la página de inicio
 */
export const homeRoute: RouteObject = {
  /**
   * La ruta para la página de inicio
   * @type {string}
   * @description La ruta URL para la página de inicio
   */
  path: '/',
  /**
   * El elemento para renderizar en la ruta de inicio
   * @type {JSX.Element}
   * @description El elemento JSX para renderizar en la página de inicio
   */
  element: <HomePage />,
  /**
   * El elemento de error para renderizar en la ruta de inicio
   * @type {JSX.Element}
   * @description El elemento JSX para renderizar cuando ocurre un error en la página de inicio
   */
  errorElement: <div>error 404 no encontrado</div>,
}
