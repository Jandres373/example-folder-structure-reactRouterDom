import { useEffect } from 'react';
import { SidebarInfo } from './components/SidebarInfo';
import { useSidebarStore } from './store/sidebar.store';
import { DarkModeToggle } from './components/DarkModeToggle';
import { NavbarAccessControl } from './components/NavbarAccessControl';
import { useGlobalStore } from '../../store/global.store';
import { eventBus, EventTypes } from '../../shared/events/eventBus';

/**
 * SidebarFeat Component
 *
 * Este componente representa la barra lateral de la aplicación.
 * Utiliza el patrón Event Bus para comunicarse con otros componentes,
 * especialmente con el navbar, de manera desacoplada.
 *
 * Características principales:
 * - Gestión del estado de colapso del sidebar
 * - Control de acceso al navbar mediante eventos
 * - Cambio de tema (claro/oscuro)
 *
 * @component
 * @description Componente principal de la barra lateral con funcionalidades de navegación y control
 */
export function SidebarFeat() {
  const {
    isCollapsed,
    activeMenuItem,
    menuItems,
    toggleCollapse,
    setActiveMenuItem,
    initializeEventListeners,
    cleanup,
  } = useSidebarStore();

  const { theme, setTheme } = useGlobalStore();

  // Inicializar y limpiar listeners de eventos al montar/desmontar el componente
  useEffect(() => {
    initializeEventListeners();
    return cleanup;
  }, []);

  /**
   * Manejador para conceder acceso al navbar mediante Event Bus
   *
   * Esta función emite un evento global para modificar el estado de acceso del navbar.
   * Utiliza el Event Bus para desacoplar la comunicación entre sidebar y navbar.
   *
   * @function
   * @description Emite un evento para conceder acceso al navbar
   * @fires EventTypes.NAVBAR_ACCESS_CHANGED con valor `true`
   *
   * @example
   * // Cuando se hace clic en el botón de conceder acceso
   * handleNavbarAccessToggle(); // Emite evento para conceder acceso
   */
  const handleNavbarAccessToggle = () => {
    eventBus.emit(EventTypes.NAVBAR_ACCESS_CHANGED, true);
  };

  /**
   * Manejador para denegar acceso al navbar mediante Event Bus
   *
   * Esta función emite un evento global para modificar el estado de acceso del navbar.
   * Utiliza el Event Bus para desacoplar la comunicación entre sidebar y navbar.
   *
   * @function
   * @description Emite un evento para denegar acceso al navbar
   * @fires EventTypes.NAVBAR_ACCESS_CHANGED con valor `false`
   *
   * @example
   * // Cuando se hace clic en el botón de denegar acceso
   * handleNavbarAccessDeny(); // Emite evento para denegar acceso
   */
  const handleNavbarAccessDeny = () => {
    eventBus.emit(EventTypes.NAVBAR_ACCESS_CHANGED, false);
  };

  const isDarkSidebar = theme === 'dark';

  return (
    <div
      className={`
      h-full 
      ${isCollapsed ? 'w-20' : 'w-96'}
      transition-all duration-300 
      ${isDarkSidebar ? 'bg-gray-900 text-gray-100' : 'bg-transparent text-gray-800'}
      border-r border-opacity-10
      shadow-lg
      flex flex-col
    `}
    >
      <div className="p-4 flex-none">
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && <h2 className="text-xl font-bold">Dashboard</h2>}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleCollapse}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              <svg
                className={`w-6 h-6 transform ${isCollapsed ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
                />
              </svg>
            </button>
            {!isCollapsed && (
              <DarkModeToggle
                isDarkSidebar={isDarkSidebar}
                onToggle={() => setTheme(isDarkSidebar ? 'light' : 'dark')}
              />
            )}
          </div>
        </div>

        {!isCollapsed && (
          <div className="space-y-4">
            <NavbarAccessControl
              onGrantAccess={handleNavbarAccessToggle}
              onDenyAccess={handleNavbarAccessDeny}
            />
            <SidebarInfo />
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="px-4 py-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveMenuItem(item.id)}
              className={`
                w-full text-left px-4 py-2 mb-1 rounded-lg
                transition-colors duration-200
                ${
                  activeMenuItem === item.id
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                }
                ${isCollapsed ? 'flex justify-center' : ''}
              `}
            >
              {item.icon && <span className="mr-3">{item.icon}</span>}
              {!isCollapsed && item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}
