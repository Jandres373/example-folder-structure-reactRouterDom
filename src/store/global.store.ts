import { create } from 'zustand';
import { EventType, GlobalEvent } from './events';

// Tipos de manejadores de eventos
type EventHandler = (event: GlobalEvent) => void;

// Registro de eventos por feature y tipo
type EventRegistry = {
  [feature: string]: {
    [eventType: string]: EventHandler[];
  };
};

interface GlobalState {
  // Registro de eventos
  eventRegistry: EventRegistry;

  // Registrar un evento
  registerEvent: (
    feature: string,
    eventType: EventType,
    handler: EventHandler
  ) => void;

  // Desregistrar un evento
  unregisterEvent: (
    feature: string,
    eventType: EventType,
    handler?: EventHandler
  ) => void;

  // Disparar un evento
  dispatch: (event: GlobalEvent) => void;
}

export const useGlobalStore = create<GlobalState>((set, get) => ({

  // Registro inicial de eventos vacío
  eventRegistry: {},

  // Registrar un nuevo evento
  registerEvent: (feature, eventType, handler) => {
    set((state) => {
      const registry = { ...state.eventRegistry };

      // Crear feature si no existe
      if (!registry[feature]) {
        registry[feature] = {};
      }

      // Crear tipo de evento si no existe
      if (!registry[feature][eventType]) {
        registry[feature][eventType] = [];
      }

      // Añadir handler si no existe
      if (!registry[feature][eventType].includes(handler)) {
        registry[feature][eventType].push(handler);
      }

      return { eventRegistry: registry };
    });
  },

  // Desregistrar un evento
  unregisterEvent: (feature, eventType, handler) => {
    set((state) => {
      const registry = { ...state.eventRegistry };

      // Si no existe el feature o el tipo de evento, no hacer nada
      if (!registry[feature] || !registry[feature][eventType]) {
        return state;
      }

      // Si no se proporciona handler, eliminar todos los handlers
      if (!handler) {
        delete registry[feature][eventType];
        return { eventRegistry: registry };
      }

      // Filtrar el handler específico
      registry[feature][eventType] = registry[feature][eventType]
        .filter(h => h !== handler);

      return { eventRegistry: registry };
    });
  },

  // Disparar un evento a todos los handlers registrados
  dispatch: (event) => {
    const { eventRegistry } = get();

    // Buscar handlers para este tipo de evento
    Object.keys(eventRegistry).forEach(feature => {
      if (eventRegistry[feature][event.type]) {
        eventRegistry[feature][event.type].forEach(handler => {
          try {
            handler(event);
          } catch (error) {
            console.error(`Error en handler de evento ${event.type}:`, error);
          }
        });
      }
    });
  }
}));