import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';
import { eventBus, EventTypes } from '../../../shared/events/eventBus';

/**
 * Interfaz que define el estado y acciones del store del Navbar
 *
 * Gestiona el estado de acceso, menú y título del navbar.
 * Utiliza el patrón Publish-Subscribe para comunicación entre componentes.
 *
 * @interface
 * @description Define la estructura completa del estado del navbar
 */
interface NavbarState {
  // Estado local
  /** Indica si el navbar tiene acceso habilitado */
  hasAccess: boolean;
  /** Controla si el menú del navbar está abierto */
  isOpen: boolean;
  /** Título actual mostrado en el navbar */
  title: string;

  // Acciones para modificar el estado
  /** Alterna el estado de acceso del navbar */
  toggleAccess: () => void;
  /** Establece el estado de acceso de forma directa */
  setAccess: (value: boolean) => void;
  /** Alterna la visibilidad del menú */
  toggleMenu: () => void;
  /** Establece el título del navbar */
  setTitle: (title: string) => void;

  // Gestión de eventos
  /** Inicializa los listeners de eventos */
  initializeEventListeners: () => void;
  /** Limpia los listeners de eventos */
  cleanup: () => void;
}

/**
 * Store del Navbar utilizando Zustand
 *
 * Proporciona un estado reactivo para el navbar con capacidades de gestión de eventos.
 * Permite modificar y responder a cambios de estado de forma desacoplada.
 *
 * @returns {NavbarState} Hook de Zustand para gestionar el estado del navbar
 *
 * @example
 * // Obtener y modificar el estado del navbar
 * const { hasAccess, toggleAccess } = useNavbarStore();
 */
export const useNavbarStore = create<NavbarState>((set, _get) => {
  // Almacena las funciones de desuscripción de eventos
  let unsubscribeCallbacks: Array<() => void> = [];

  return {
    // Estado inicial
    hasAccess: false,
    isOpen: false,
    title: 'Dashboard',

    /**
     * Alterna el estado de acceso del navbar
     *
     * Cambia el valor de `hasAccess` entre true y false.
     * Emite un evento global para notificar el cambio de acceso.
     *
     * @function
     * @description Cambia el estado de acceso del navbar
     * @fires EventTypes.NAVBAR_ACCESS_CHANGED con el nuevo estado de acceso
     */
    toggleAccess: () => {
      set((state) => {
        const newAccess = !state.hasAccess;
        // Emitir evento para que otros componentes puedan reaccionar
        eventBus.emit(EventTypes.NAVBAR_ACCESS_CHANGED, newAccess);
        return { hasAccess: newAccess };
      });
    },

    /**
     * Establece directamente el estado de acceso del navbar
     *
     * Permite establecer un valor específico para `hasAccess`.
     * Emite un evento global para notificar el cambio de acceso.
     *
     * @function
     * @description Establece el estado de acceso del navbar
     * @param {boolean} value - Nuevo valor de acceso
     * @fires EventTypes.NAVBAR_ACCESS_CHANGED con el valor de acceso proporcionado
     */
    setAccess: (value: boolean) => {
      set({ hasAccess: value });
      eventBus.emit(EventTypes.NAVBAR_ACCESS_CHANGED, value);
    },

    /** Alterna la visibilidad del menú */
    toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),

    /** Establece el título del navbar */
    setTitle: (title: string) => set({ title }),

    /**
     * Inicializa los listeners de eventos
     *
     * Configura listeners para eventos de autenticación y cambios de acceso.
     * Almacena las funciones de desuscripción para una limpieza posterior.
     *
     * @function
     * @description Configura listeners de eventos para el navbar
     */
    initializeEventListeners: () => {
      // Listener para eventos de inicio de sesión
      const authUnsubscribe = eventBus.on(EventTypes.USER_LOGGED_IN, (_user) => {
        set({ hasAccess: true });
      });

      // Listener para eventos de cierre de sesión
      const logoutUnsubscribe = eventBus.on(EventTypes.USER_LOGGED_OUT, () => {
        set({ hasAccess: false, isOpen: false });
      });

      // Listener para cambios de acceso desde otros componentes
      const navbarAccessUnsubscribe = eventBus.on(
        EventTypes.NAVBAR_ACCESS_CHANGED,
        (hasAccess: boolean) => {
          set({ hasAccess });
        }
      );

      // Almacenar funciones de desuscripción
      unsubscribeCallbacks = [authUnsubscribe, logoutUnsubscribe, navbarAccessUnsubscribe];
    },

    /**
     * Limpia los listeners de eventos
     *
     * Ejecuta todas las funciones de desuscripción almacenadas.
     * Previene memory leaks y limpia recursos de eventos.
     *
     * @function
     * @description Elimina todos los listeners de eventos
     */
    cleanup: () => {
      unsubscribeCallbacks.forEach((unsubscribe) => unsubscribe());
      unsubscribeCallbacks = [];
    },
  };
});

// Solo montar herramientas de desarrollo en entorno de desarrollo
if (import.meta.env.DEV && import.meta.env.VITE_APP_DEBUG === 'true') {
  mountStoreDevtool('NavbarStore', useNavbarStore);
}
