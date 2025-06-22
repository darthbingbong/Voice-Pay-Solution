
import React from 'react';
import { Shield, Mic, X } from 'lucide-react';

interface PrivacyConsentProps {
  isOpen: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

const PrivacyConsent: React.FC<PrivacyConsentProps> = ({ isOpen, onAccept, onDecline }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-blue-400" />
            <h2 className="text-xl font-bold text-white">Voice Privacy</h2>
          </div>
          <button
            onClick={onDecline}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start space-x-3">
            <Mic className="h-5 w-5 text-green-400 mt-1" />
            <div>
              <p className="text-gray-300 text-sm">
                <strong className="text-white">Microphone Access:</strong> We'll need access to your microphone to guide you by voice. Permission will be requested each time you visit for your security.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Mic className="h-5 w-5 text-green-400 mt-1" />
            <div>
              <p className="text-gray-300 text-sm">
                <strong className="text-white">Voice Processing:</strong> Your voice commands are processed locally in your browser and are not sent to external servers.
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-purple-400 mt-1" />
            <div>
              <p className="text-gray-300 text-sm">
                <strong className="text-white">Data Storage:</strong> Only your language preference is stored locally on your device. Voice transcripts are automatically cleared after each session.
              </p>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onAccept}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            Enable Voice Navigation
          </button>
          <button
            onClick={onDecline}
            className="flex-1 border border-gray-600 text-gray-300 py-3 px-4 rounded-lg font-semibold hover:border-gray-500 transition-all"
          >
            Use Without Voice
          </button>
        </div>

        <p className="text-gray-500 text-xs mt-4 text-center">
          You can change this preference anytime in settings
        </p>
      </div>
    </div>
  );
};

export default PrivacyConsent;
