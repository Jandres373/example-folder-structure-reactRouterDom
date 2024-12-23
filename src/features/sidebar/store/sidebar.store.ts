  import { create } from 'zustand';
  import { useGlobalStore } from '../../../store/global.store';
  import { EventTypes } from '../../../store/events';
  import { persist } from 'zustand/middleware';

  interface SidebarState {
    // Estados locales
    isDarkSidebar: boolean;
    toggleDarkSidebar: () => void;

    // Acciones que afectan a otros features
    toggleNavbarAccess: () => void;
    setNavbarAccess: (value: boolean) => void;
  }

  export const useSidebarStore = create<SidebarState>()(
    persist(
      (set) => {
        // Referencia al mediador global
        const globalStore = useGlobalStore.getState();

        return {
          // Estados locales
          isDarkSidebar: false,
          toggleDarkSidebar: () => set((state) => ({ isDarkSidebar: !state.isDarkSidebar })),

          /**
           * Toogle de acceso del Navbar
           * @param {boolean} value - Nuevo valor de acceso
           * @description Solicita el toggle de acceso del Navbar
           */
          toggleNavbarAccess: () => {
            globalStore.dispatch({ type: EventTypes.NAVBAR_TOGGLE_ACCESS });
            console.log('[SidebarStore] Solicitó toggle de acceso del Navbar');
          },

          /**
           * Establecimiento de acceso del Navbar
           * @param {boolean} value - Nuevo valor de acceso
           * @description Solicita el establecimiento de acceso del Navbar
           */
          setNavbarAccess: (value: boolean) => {
            globalStore.dispatch({
              type: EventTypes.NAVBAR_SET_ACCESS,
              payload: value
            });
            console.log(`[SidebarStore] Estableció acceso del Navbar a: ${value}`);
          }
        };
      },
      {
        name: 'sidebar-storage', // el nombre del almacenamiento  
        partialize: (state) => ({ isDarkSidebar: state.isDarkSidebar }) // solo persistir isDarkSidebar
      }
    )
  );