import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { eventBus, EventTypes } from '../../../shared/events/eventBus';

/**
 * Interfaz que define el estado del sidebar en la aplicación.
 * Gestiona la visibilidad, elementos de menú y estado de interacción.
 */
interface SidebarState {
  // Estado local del sidebar
  isCollapsed: boolean; // Indica si el sidebar está colapsado
  activeMenuItem: string | null; // Elemento de menú actualmente seleccionado
  menuItems: Array<{ id: string; label: string; icon?: string }>; // Lista de elementos de menú

  // Acciones para modificar el estado del sidebar
  toggleCollapse: () => void; // Alternar estado de colapso
  setActiveMenuItem: (itemId: string | null) => void; // Establecer elemento de menú activo
  setMenuItems: (items: Array<{ id: string; label: string; icon?: string }>) => void; // Establecer lista de elementos de menú

  // Manejadores de eventos
  initializeEventListeners: () => void; // Inicializar listeners de eventos
  cleanup: () => void; // Limpiar listeners de eventos
}

/**
 * Almacén de estado para el sidebar utilizando Zustand.
 * Proporciona un estado reactivo y manejadores para la gestión del sidebar.
 *
 * @returns {SidebarState} Un hook de Zustand para gestionar el estado del sidebar
 */
export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, _get) => {
      // Almacenar funciones de desuscripción de eventos
      let unsubscribeCallbacks: Array<() => void> = [];

      return {
        // Estado inicial del sidebar
        isCollapsed: false,
        activeMenuItem: null,
        menuItems: [],

        // Acción para alternar el estado de colapso del sidebar
        toggleCollapse: () => {
          set((state) => ({ isCollapsed: !state.isCollapsed }));
        },

        // Acción para establecer el elemento de menú activo
        setActiveMenuItem: (itemId: string | null) => {
          set({ activeMenuItem: itemId });
        },

        // Acción para establecer la lista de elementos de menú
        setMenuItems: (items) => {
          set({ menuItems: items });
        },

        // Inicializar listeners de eventos
        initializeEventListeners: () => {
          // Escuchar evento de cierre de sesión para restablecer el estado
          const logoutUnsubscribe = eventBus.on(EventTypes.USER_LOGGED_OUT, () => {
            set({
              isCollapsed: false,
              activeMenuItem: null,
            });
          });

          // Escuchar cambios de acceso en el navbar
          const navbarAccessUnsubscribe = eventBus.on(
            EventTypes.NAVBAR_ACCESS_CHANGED,
            (hasAccess: boolean) => {
              // Ejemplo de acción en respuesta al cambio de acceso
              console.log('Navbar access changed:', hasAccess);
              // Puedes añadir lógica específica aquí si es necesario
            }
          );

          // Almacenar funciones de desuscripción
          unsubscribeCallbacks = [logoutUnsubscribe, navbarAccessUnsubscribe];
        },

        // Función de limpieza para eliminar listeners de eventos
        cleanup: () => {
          unsubscribeCallbacks.forEach((unsubscribe) => unsubscribe());
          unsubscribeCallbacks = [];
        },
      };
    },
    {
      name: 'sidebar-storage',
      // Configuración de persistencia para mantener el estado del sidebar
      partialize: (state) => ({
        isCollapsed: state.isCollapsed,
      }),
    }
  )
);

// Herramienta de desarrollo para inspeccionar el estado en modo de desarrollo
if (import.meta.env.DEV && import.meta.env.VITE_APP_DEBUG === 'true') {
  mountStoreDevtool('SidebarStore', useSidebarStore);
}
