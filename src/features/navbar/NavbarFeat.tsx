import { useEffect } from 'react';
import { useNavbarStore } from './store/navbar.store';
import { useGlobalStore } from '../../store/global.store';

export function NavbarFeat() {
  const { hasAccess, title, toggleAccess, toggleMenu, initializeEventListeners, cleanup } =
    useNavbarStore();

  const { user, theme } = useGlobalStore();

  console.log(a);

  // Initialize and cleanup event listeners
  useEffect(() => {
    initializeEventListeners();
    return cleanup;
  }, []);

  return (
    <nav
      className={`
            w-full h-16 
            flex justify-between items-center 
            px-5 
            ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
            ${!hasAccess ? 'opacity-50 pointer-events-none' : ''}
            transition-all duration-300
            shadow-md
        `}
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleMenu}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>

      <div className="flex items-center space-x-4">
        {user && (
          <div className="flex items-center space-x-2">
            <span className="text-sm">{user.name}</span>
          </div>
        )}

        <div className="flex items-center space-x-2">
          <div
            className={`w-3 h-3 rounded-full ${hasAccess ? 'bg-green-500' : 'bg-red-500'}`}
            title={`Access ${hasAccess ? 'Granted' : 'Denied'}`}
          />
          <button
            onClick={toggleAccess}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {hasAccess ? 'Revoke Access' : 'Grant Access'}
          </button>
        </div>
      </div>

      {!hasAccess && (
        <div className="absolute top-16 left-0 w-full bg-red-100 text-red-600 text-center py-1 text-sm">
          Access Denied
        </div>
      )}
    </nav>
  );
}
