interface DarkModeToggleProps {
  isDarkSidebar: boolean;
  onToggle: () => void;
}

export function DarkModeToggle({ isDarkSidebar, onToggle }: DarkModeToggleProps) {
  return (
    <div
      className={`
        w-14 h-7 
        rounded-full 
        relative 
        cursor-pointer 
        transition-colors 
        ${isDarkSidebar ? 'bg-blue-700' : 'bg-gray-300'}
      `}
      onClick={onToggle}
    >
      <span
        className={`
          absolute 
          top-1 
          w-5 h-5 
          bg-white 
          rounded-full 
          shadow-md 
          transition-transform 
          ${isDarkSidebar ? 'translate-x-8' : 'translate-x-1'}
        `}
      />
    </div>
  );
}
