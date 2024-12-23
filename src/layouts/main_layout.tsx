import { NavbarFeat } from '../features/navbar';
import { SidebarFeat } from '../features/sidebar';

type MainLayoutProps = {
  children: React.ReactNode;
};

/**
 * Layout principal de la aplicación. Se encarga de renderizar y organizar el jsx y los estilos de la aplicación
 * @param {MainLayoutProps} props - Propiedades del layout
 * @returns {JSX.Element} Layout principal de la aplicación
 */
function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col w-[100dvw] h-[100dvh] overflow-hidden">
      {/* Navbar */}
      <div id="navbar" className="w-full h-[10dvh]">
        <NavbarFeat />
      </div>

      {/* contenido */}
      <div id="content" className="flex w-full h-[90dvh] flex-1">
        {/* Sidebar */}
        <div id="sidebar" className="w-fit">
          <SidebarFeat />
        </div>

        {/* Contenido */}
        <div id="content" className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
