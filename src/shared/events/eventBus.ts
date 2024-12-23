/**
 * Tipo de función de callback para eventos.
 * Permite definir funciones que pueden recibir datos opcionales y no devuelven nada.
 *
 * @template T Tipo opcional de datos que puede recibir el callback
 */
type EventCallback<T = any> = (data?: T) => void;

/**
 * Clase EventBus: Implementa un patrón de Bus de Eventos (Publish-Subscribe)
 * Permite la comunicación desacoplada entre diferentes partes de la aplicación.
 *
 * @class
 * @description Proporciona un mecanismo para registrar, emitir y gestionar eventos globales
 */
class EventBus {
  /**
   * Almacén privado de eventos.
   * Estructura: { 'nombreEvento': [callback1, callback2, ...] }
   * Permite múltiples listeners para un mismo evento.
   *
   * @private
   * @type {Record<string, EventCallback[]>}
   */
  private events: Record<string, EventCallback[]> = {};

  /**
   * Suscribe un callback a un evento específico.
   *
   * @param {string} event - Nombre del evento al que se quiere suscribir
   * @param {EventCallback} callback - Función que se ejecutará cuando se emita el evento
   * @returns {Function} Función de limpieza para desuscribirse fácilmente
   *
   * @example
   * const unsubscribe = eventBus.on('userLoggedIn', (userData) => {
   *   console.log('Usuario logueado:', userData);
   * });
   * // Más tarde, para desuscribirse:
   * unsubscribe();
   */
  on(event: string, callback: EventCallback) {
    // Si el evento no existe, inicializa un array vacío para ese evento
    if (!this.events[event]) {
      this.events[event] = [];
    }
    // Agrega el callback al array de listeners del evento
    this.events[event].push(callback);
    // Devuelve una función de limpieza para facilitar la desuscripción
    return () => this.off(event, callback);
  }

  /**
   * Desuscribe un callback específico de un evento.
   *
   * @param {string} event - Nombre del evento
   * @param {EventCallback} callback - Función a eliminar de los listeners
   */
  off(event: string, callback: EventCallback) {
    // Filtra el array de callbacks, eliminando el callback específico
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    }
  }

  /**
   * Emite (dispara) un evento, ejecutando todos los callbacks registrados.
   *
   * @param {string} event - Nombre del evento a emitir
   * @param {*} [data] - Datos opcionales para pasar a los callbacks
   *
   * @throws {Error} Captura y registra cualquier error durante la ejecución de callbacks
   */
  emit(event: string, data?: any) {
    // Comprueba si existen listeners para este evento
    if (this.events[event]) {
      // Ejecuta cada callback registrado para este evento
      this.events[event].forEach((callback) => {
        try {
          // Llama al callback con los datos proporcionados
          // Manejo de errores para que un callback fallido no detenga los demás
          callback(data);
        } catch (error) {
          // Registra cualquier error durante la ejecución del callback
          console.error(`Error executing event ${event}:`, error);
        }
      });
    }
  }

  /**
   * Limpia todos los listeners de eventos.
   * Útil para reset o limpieza de recursos.
   */
  clear() {
    this.events = {};
  }
}

/**
 * Instancia singleton del EventBus.
 * Permite usar el mismo bus de eventos en toda la aplicación.
 *
 * @type {EventBus}
 */
export const eventBus = new EventBus();

/**
 * Enum de tipos de eventos para mayor seguridad de tipos.
 * Proporciona un conjunto predefinido de eventos con nombres consistentes.
 * Ayuda a prevenir errores de tipeo y mejora la mantenibilidad.
 *
 * @enum {string}
 * @description Tipos de eventos globales utilizados en la aplicación
 */
export enum EventTypes {
  /** Evento disparado cuando un usuario inicia sesión */
  USER_LOGGED_IN = 'USER_LOGGED_IN',
  /** Evento disparado cuando un usuario cierra sesión */
  USER_LOGGED_OUT = 'USER_LOGGED_OUT',
  /** Evento para cambios de acceso en el navbar */
  NAVBAR_ACCESS_CHANGED = 'NAVBAR_ACCESS_CHANGED',
}
