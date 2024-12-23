import { Link, Outlet } from 'react-router-dom';

/**
 * Segundo contenedor de diseño para páginas de Acerca de con navegación
 * @returns {React.ReactElement} Componente Layout2 renderizado con área de navegación y contenido
 */
function InnerLayout() {
  return (
    <div className="bg-gray-100 p-6">
      <div>hola soy el layout 2</div>
      <div className="">
        <nav className="mb-6">
          <ul className="flex space-x-4">
            <li>
              <Link to="/about/vision" className="text-blue-600 hover:text-blue-800 font-semibold">
                Visión
              </Link>
            </li>
            <li>
              <Link to="/about/mision" className="text-blue-600 hover:text-blue-800 font-semibold">
                Misión
              </Link>
            </li>
            <li>
              <Link
                to="/about/internal"
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Internal
              </Link>
            </li>
          </ul>
        </nav>

        <div className="bg-white shadow-md rounded-xl p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default InnerLayout;
