import { create } from 'zustand';
import { mountStoreDevtool } from 'simple-zustand-devtools';

interface User {
  id: string;
  name: string;
  role: string;
}

interface GlobalState {
  // Auth state
  user: User | null;
  isAuthenticated: boolean;
  accessToken: string | null;

  // UI state
  isLoading: boolean;
  theme: 'light' | 'dark';

  // Actions
  setAuth: (isAuthenticated: boolean, user?: User | null, token?: string | null) => void;
  setLoading: (loading: boolean) => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useGlobalStore = create<GlobalState>((set) => ({
  // Initial state
  isAuthenticated: false,
  user: null,
  accessToken: null,
  isLoading: false,
  theme: 'light',

  // Actions
  setAuth: (isAuthenticated, user = null, token = null) =>
    set({ isAuthenticated, user, accessToken: token }),

  setLoading: (loading) => set({ isLoading: loading }),

  setTheme: (theme) => set({ theme }),
}));

// Only mount devtools in development
if (import.meta.env.DEV && import.meta.env.VITE_APP_DEBUG === 'true') {
  mountStoreDevtool('GlobalStore', useGlobalStore);
}
