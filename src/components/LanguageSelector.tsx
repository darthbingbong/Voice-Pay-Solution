
import React from 'react';
import { Globe, X } from 'lucide-react';
import { Language } from '../hooks/useVoiceNavigation';

interface LanguageSelectorProps {
  isOpen: boolean;
  onSelect: (language: Language) => void;
  onClose: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ isOpen, onSelect, onClose }) => {
  if (!isOpen) return null;

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'hi' as Language, name: 'हिंदी (Hindi)', flag: '🇮🇳' },
    { code: 'zh' as Language, name: '中文 (Chinese)', flag: '🇨🇳' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Globe className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-semibold text-white">Choose Language</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-gray-300 mb-6 text-center">
          Select your preferred language for voice navigation
        </p>

        <div className="space-y-3">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => onSelect(language.code)}
              className="w-full flex items-center space-x-4 p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-blue-500"
            >
              <span className="text-2xl">{language.flag}</span>
              <span className="text-white font-medium text-lg">{language.name}</span>
            </button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <p className="text-blue-300 text-sm text-center">
            🎤 Voice navigation will work in your selected language
          </p>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;
