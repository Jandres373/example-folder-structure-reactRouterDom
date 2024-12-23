interface NavbarAccessControlProps {
  onGrantAccess: () => void;
  onDenyAccess: () => void;
}

export function NavbarAccessControl({ onGrantAccess, onDenyAccess }: NavbarAccessControlProps) {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-inner">
      <h3 className="text-sm font-semibold mb-3 text-gray-600 dark:text-gray-300">
        Control de Acceso Navbar
      </h3>
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onGrantAccess}
          className="
            px-3 py-2 
            bg-green-500 hover:bg-green-600 
            text-white 
            rounded-md 
            text-xs 
            transition-colors 
            focus:outline-none 
            focus:ring-2 
            focus:ring-green-400
          "
        >
          Conceder
        </button>
        <button
          onClick={onDenyAccess}
          className="
            px-3 py-2 
            bg-red-500 hover:bg-red-600 
            text-white 
            rounded-md 
            text-xs 
            transition-colors 
            focus:outline-none 
            focus:ring-2 
            focus:ring-red-400
          "
        >
          Denegar
        </button>
      </div>
    </div>
  );
}
