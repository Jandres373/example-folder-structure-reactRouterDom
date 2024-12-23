import { useEffect } from 'react';
import { SidebarInfo } from './components/SidebarInfo';
import { useSidebarStore } from './store/sidebar.store';
import { DarkModeToggle } from './components/DarkModeToggle';
import { NavbarAccessControl } from './components/NavbarAccessControl';

export function SidebarFeat() {
  const {
    isDarkSidebar,
    toggleDarkSidebar,
    toggleNavbarAccess,
    setNavbarAccess,
  } = useSidebarStore();

  useEffect(() => {
    // Inicializar cualquier lógica necesaria del sidebar
    return () => {
      // Limpiar recursos si es necesario. en este caso como el sidebar no tiene listeners externos, no se necesita limpiar nada
    };
  }, []);

  return (
    <div className={`
      w-full h-full 
      p-6 
      transition-all duration-300 
      ${isDarkSidebar
        ? 'bg-gray-900 text-gray-100 shadow-2xl'
        : 'bg-white text-gray-800 shadow-lg'
      }
      border-r border-opacity-10
    `}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Panel Lateral</h2>
          <DarkModeToggle
            isDarkSidebar={isDarkSidebar}
            onToggle={toggleDarkSidebar}
          />
        </div>

        <div className="space-y-4">
          <NavbarAccessControl
            onToggleAccess={toggleNavbarAccess}
            onGrantAccess={() => setNavbarAccess(true)}
            onDenyAccess={() => setNavbarAccess(false)}
          />
          <SidebarInfo />
        </div>
      </div>
    </div>
  );
}