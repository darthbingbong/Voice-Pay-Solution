
import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useVoiceNavigation } from '../hooks/useVoiceNavigation';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useVoiceNavigation();

  return (
    <button
      onClick={() => toggleTheme()}
      className="fixed bottom-4 left-4 z-40 p-3 rounded-full bg-gray-800/90 backdrop-blur-sm border border-gray-700 hover:bg-gray-700/90 transition-all duration-300 shadow-lg"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-gray-800 hover:text-gray-600 transition-colors" />
      ) : (
        <Sun className="h-5 w-5 text-yellow-400 hover:text-yellow-300 transition-colors" />
      )}
    </button>
  );
};

export default ThemeToggle;
