export interface GlobalEvent<T = any> {
  type: string;
  payload?: T;
}

export enum EventTypes {
  NAVBAR_TOGGLE_ACCESS = 'NAVBAR_TOGGLE_ACCESS',
  NAVBAR_SET_ACCESS = 'NAVBAR_SET_ACCESS',
  // Add other global event types here
}