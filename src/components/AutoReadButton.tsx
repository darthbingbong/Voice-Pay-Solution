
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const AutoReadButton: React.FC = () => {
  const [isReading, setIsReading] = useState(false);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const pages = [
    { path: '/', name: 'Home', content: 'Welcome to VoicePay. India\'s most inclusive payment platform. We believe technology should serve everyone, regardless of their abilities or digital literacy. Our voice-powered payment system makes transactions accessible to all.' },
    { path: '/about', name: 'About', content: 'About VoicePay. We are revolutionizing digital payments through voice technology. Our mission is to create an inclusive financial ecosystem where anyone can make payments using just their voice.' },
    { path: '/working', name: 'Working Demo', content: 'Voice Payment Demo. Experience the future of accessible payments with your voice. This interactive demonstration shows how easy it is to complete transactions using voice commands.' },
    { path: '/pricing', name: 'Pricing', content: 'Pricing Plans. Choose the perfect plan for your business needs. We offer flexible pricing options to accommodate businesses of all sizes.' }
  ];

  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const speakText = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        if (isReading) {
          // Move to next page after 2 seconds
          timeoutRef.current = setTimeout(() => {
            const nextIndex = (currentPageIndex + 1) % pages.length;
            setCurrentPageIndex(nextIndex);
            navigate(pages[nextIndex].path);
          }, 2000);
        }
      };
      
      synthRef.current.speak(utterance);
    }
  };

  useEffect(() => {
    if (isReading) {
      const currentPage = pages.find(page => page.path === location.pathname);
      if (currentPage) {
        speakText(currentPage.content);
      }
    }
  }, [location.pathname, isReading]);

  const toggleAutoRead = () => {
    if (isReading) {
      // Stop reading
      setIsReading(false);
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else {
      // Start reading
      setIsReading(true);
      const currentPageIndex = pages.findIndex(page => page.path === location.pathname);
      setCurrentPageIndex(currentPageIndex >= 0 ? currentPageIndex : 0);
      
      const currentPage = pages.find(page => page.path === location.pathname);
      if (currentPage) {
        speakText(currentPage.content);
      }
    }
  };

  return (
    <button
      onClick={toggleAutoRead}
      className={`fixed bottom-4 right-4 z-40 p-3 rounded-full backdrop-blur-sm border transition-all duration-300 shadow-lg ${
        isReading 
          ? 'bg-red-500/90 border-red-400 hover:bg-red-600/90 animate-pulse'
          : 'bg-blue-500/90 border-blue-400 hover:bg-blue-600/90'
      }`}
      aria-label={isReading ? 'Stop auto-reading' : 'Start auto-reading'}
    >
      {isReading ? (
        <VolumeX className="h-5 w-5 text-white" />
      ) : (
        <Volume2 className="h-5 w-5 text-white" />
      )}
    </button>
  );
};

export default AutoReadButton;
