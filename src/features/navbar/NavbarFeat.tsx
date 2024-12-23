import { useEffect } from 'react';
import { useNavbarStore } from './store/navbar.store';

export function NavbarFeat() {
    const { hasAccess, toggleAccess, initializeEventListeners, cleanup } = useNavbarStore();

    // Inicializar y limpiar event listeners
    useEffect(() => {
        initializeEventListeners();
        return cleanup;
    }, []);

    return (
        <nav className={`w-full h-full flex justify-between items-center px-5 ${!hasAccess ? 'opacity-50 pointer-events-none' : ''}`}>
            <div className="flex items-center space-x-4">
                <h2>Navbar</h2>
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
            {!hasAccess && (
                <p className="text-red-500 text-sm">Access Denied</p>
            )}
        </nav>
    );
}