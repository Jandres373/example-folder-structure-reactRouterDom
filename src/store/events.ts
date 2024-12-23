// Definición centralizada de eventos globales
export const EventTypes = {
  NAVBAR_TOGGLE_ACCESS: 'NAVBAR/TOGGLE_ACCESS',
  NAVBAR_SET_ACCESS: 'NAVBAR/SET_ACCESS',
  SIDEBAR_TOGGLE: 'SIDEBAR/TOGGLE',
} as const;

export type EventType = typeof EventTypes[keyof typeof EventTypes];

export interface GlobalEvent<T = any> {
  type: EventType;
  payload?: T;
}
