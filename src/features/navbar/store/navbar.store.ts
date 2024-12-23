import { create } from 'zustand';
import { useGlobalStore } from '../../../store/global.store';
import { EventTypes, GlobalEvent } from '../../../store/events';

// Eventos que el Navbar puede recibir
export const NavbarEvents = {
  TOGGLE_ACCESS: 'NAVBAR/TOGGLE_ACCESS',
  SET_ACCESS: 'NAVBAR/SET_ACCESS'
} as const;

interface NavbarState {
  // Estado local
  hasAccess: boolean;

  // Acciones locales
  toggleAccess: () => void;
  setAccess: (value: boolean) => void;

  // Inicializar listeners
  initializeEventListeners: () => void;

  // Limpiar listeners
  cleanup: () => void;
}

export const useNavbarStore = create<NavbarState>((set) => {
  // Referencia al mediador global
  const globalStore = useGlobalStore.getState();

  // Handler para eventos externos
  const handleNavbarEvent = (event: GlobalEvent<boolean>) => {
    switch (event.type) {
      case EventTypes.NAVBAR_TOGGLE_ACCESS:
        set((state) => ({ hasAccess: !state.hasAccess }));
        break;
      case EventTypes.NAVBAR_SET_ACCESS:
        if (typeof event.payload === 'boolean') {
          set({ hasAccess: event.payload });
        }
        break;
    }
  };

  return {
    // Estado inicial
    hasAccess: false,

    // Acciones locales
    toggleAccess: () => set((state) => ({ hasAccess: !state.hasAccess })),
    setAccess: (value) => set({ hasAccess: value }),

    // Inicializar listeners
    initializeEventListeners: () => {
      // Registrar handlers para eventos externos
      globalStore.registerEvent('navbar', EventTypes.NAVBAR_TOGGLE_ACCESS, handleNavbarEvent);
      globalStore.registerEvent('navbar', EventTypes.NAVBAR_SET_ACCESS, handleNavbarEvent);

      console.log('[NavbarStore] Eventos inicializados');
    },

    // Limpiar listeners
    cleanup: () => {
      globalStore.unregisterEvent('navbar', EventTypes.NAVBAR_TOGGLE_ACCESS);
      globalStore.unregisterEvent('navbar', EventTypes.NAVBAR_SET_ACCESS);

      console.log('[NavbarStore] Eventos limpiados');
    }
  };
});