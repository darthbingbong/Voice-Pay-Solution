
import React from 'react';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useVoiceNavigation } from '../hooks/useVoiceNavigation';

const VoiceNavigationIndicator: React.FC = () => {
  const { config, transcript, toggleVoiceNavigation, languageConfigs } = useVoiceNavigation();

  if (!config.isEnabled) return null;

  const currentLanguage = languageConfigs[config.language];

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="flex flex-col items-end space-y-2">
        {/* Transcript Display */}
        {transcript && (
          <div className="bg-gray-900/90 backdrop-blur-sm border border-gray-700 rounded-lg p-3 max-w-xs">
            <p className="text-sm text-gray-400 mb-1">You said:</p>
            <p className="text-blue-400 font-medium">"{transcript}"</p>
          </div>
        )}

        {/* Voice Control Button */}
        <button
          onClick={toggleVoiceNavigation}
          className={`flex items-center space-x-2 px-4 py-3 rounded-full font-medium transition-all duration-300 shadow-lg ${
            config.isListening
              ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
              : 'bg-blue-500 hover:bg-blue-600 text-white hover:scale-105'
          }`}
        >
          {config.isListening ? (
            <>
              <MicOff className="h-5 w-5" />
              <span>Stop</span>
            </>
          ) : (
            <>
              <Mic className="h-5 w-5" />
              <span>Listen</span>
            </>
          )}
        </button>

        {/* Language Indicator */}
        <div className="flex items-center space-x-1 px-3 py-2 bg-gray-800/90 backdrop-blur-sm border border-gray-700 rounded-lg">
          <Volume2 className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-300">{currentLanguage.name}</span>
        </div>
      </div>
    </div>
  );
};

export default VoiceNavigationIndicator;
