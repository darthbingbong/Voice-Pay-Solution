import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { encryptData, decryptData, sanitizeInput } from '../utils/security';

export type Language = 'en' | 'hi' | 'zh';

interface VoiceNavigationConfig {
  language: Language;
  isEnabled: boolean;
  isListening: boolean;
}

interface LanguageConfig {
  code: string;
  speechSynthesisLang: string;
  speechRecognitionLang: string;
  name: string;
  welcomeMessage: string;
  navigationPrompt: string;
  pageNotFound: string;
  microphoneRequired: string;
  lightModeEnabled: string;
  darkModeEnabled: string;
  commands: {
    [key: string]: string;
  };
  themeCommands: {
    light: string[];
    dark: string[];
  };
}

const languageConfigs: Record<Language, LanguageConfig> = {
  en: {
    code: 'en',
    speechSynthesisLang: 'en-US',
    speechRecognitionLang: 'en-US',
    name: 'English',
    welcomeMessage: 'Welcome to VoicePay. Voice navigation is now active. You can say Home, About, Working, or Pricing to navigate.',
    navigationPrompt: 'Say a page name to navigate: Home, About, Working, or Pricing.',
    pageNotFound: 'Page not found. Please try saying Home, About, Working, or Pricing.',
    microphoneRequired: 'Voice control requires microphone access. Please allow it from your browser settings or use manual navigation.',
    lightModeEnabled: 'Sunlight mode enabled.',
    darkModeEnabled: 'Switched to dark mode.',
    commands: {
      home: '/',
      about: '/about',
      working: '/working',
      pricing: '/pricing'
    },
    themeCommands: {
      light: ['light mode', 'light', 'sunlight', 'sun'],
      dark: ['dark mode', 'dark', 'night', 'moon']
    }
  },
  hi: {
    code: 'hi',
    speechSynthesisLang: 'hi-IN',
    speechRecognitionLang: 'hi-IN',
    name: 'हिंदी',
    welcomeMessage: 'VoicePay में आपका स्वागत है। आवाज़ नेवीगेशन अब सक्रिय है। आप होम, अबाउट, वर्किंग, या प्राइसिंग कह सकते हैं।',
    navigationPrompt: 'पेज पर जाने के लिए नाम बोलें: होम, अबाउट, वर्किंग, या प्राइसिंग।',
    pageNotFound: 'पेज नहीं मिला। कृपया होम, अबाउट, वर्किंग, या प्राइसिंग कहने की कोशिश करें।',
    microphoneRequired: 'आवाज़ नियंत्रण के लिए माइक्रोफोन की अनुमति चाहिए। कृपया इसे अपने ब्राउज़र सेटिंग्स से अनुमति दें या मैन्युअल नेवीगेशन का उपयोग करें।',
    lightModeEnabled: 'उजाला मोड सक्षम किया गया।',
    darkModeEnabled: 'अंधेरा मोड में बदल गया।',
    commands: {
      'होम': '/',
      'अबाउट': '/about',
      'वर्किंग': '/working',
      'प्राइसिंग': '/pricing',
      'home': '/',
      'about': '/about',
      'working': '/working',
      'pricing': '/pricing'
    },
    themeCommands: {
      light: ['उजाला मोड', 'उजाला', 'सूरज', 'रोशनी'],
      dark: ['अंधेरा मोड', 'अंधेरा', 'रात', 'चांद']
    }
  },
  zh: {
    code: 'zh',
    speechSynthesisLang: 'zh-CN',
    speechRecognitionLang: 'zh-CN',
    name: '中文',
    welcomeMessage: '欢迎来到VoicePay。语音导航现已激活。您可以说首页、关于、工作或定价来导航。',
    navigationPrompt: '说出页面名称来导航：首页、关于、工作或定价。',
    pageNotFound: '页面未找到。请尝试说首页、关于、工作或定价。',
    microphoneRequired: '语音控制需要麦克风权限。请在浏览器设置中允许或使用手动导航。',
    lightModeEnabled: '阳光模式已启用。',
    darkModeEnabled: '已切换到黑暗模式。',
    commands: {
      '首页': '/',
      '关于': '/about',
      '工作': '/working',
      '定价': '/pricing',
      'home': '/',
      'about': '/about',
      'working': '/working',
      'pricing': '/pricing'
    },
    themeCommands: {
      light: ['亮色模式', '亮色', '阳光', '太阳'],
      dark: ['暗色模式', '暗色', '夜晚', '月亮']
    }
  }
};

export const useVoiceNavigation = () => {
  const [config, setConfig] = useState<VoiceNavigationConfig>({
    language: 'en',
    isEnabled: false,
    isListening: false
  });
  const [showLanguageSelector, setShowLanguageSelector] = useState(false);
  const [showPrivacyConsent, setShowPrivacyConsent] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [hasConsent, setHasConsent] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  const navigate = useNavigate();
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const transcriptTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize theme from localStorage and apply to document
  useEffect(() => {
    const savedTheme = localStorage.getItem('voicepay-theme') as 'light' | 'dark' | null;
    const initialTheme = savedTheme || 'dark';
    setTheme(initialTheme);
    
    // Apply theme to document immediately
    if (initialTheme === 'light') {
      document.documentElement.classList.add('light');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    } else {
      document.documentElement.classList.remove('light');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    }
  }, []);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }

    // Always show privacy consent on each visit
    setTimeout(() => {
      setShowPrivacyConsent(true);
    }, 1000);

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
      if (transcriptTimeoutRef.current) {
        clearTimeout(transcriptTimeoutRef.current);
      }
    };
  }, []);

  const requestMicrophonePermission = async (language: Language) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
      initializeSpeechRecognition(language);
    } catch (error) {
      console.error('Microphone permission denied:', error);
      speakText(languageConfigs[language].microphoneRequired, language);
    }
  };

  const initializeSpeechRecognition = useCallback((language: Language) => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = languageConfigs[language].speechRecognitionLang;

      recognitionRef.current.onresult = (event: any) => {
        const lastResult = event.results[event.results.length - 1];
        if (lastResult.isFinal) {
          const speechResult = sanitizeInput(lastResult[0].transcript.toLowerCase().trim());
          setTranscript(speechResult);
          handleVoiceCommand(speechResult, language);
          
          // Auto-clear transcript after 3 seconds for privacy
          if (transcriptTimeoutRef.current) {
            clearTimeout(transcriptTimeoutRef.current);
          }
          transcriptTimeoutRef.current = setTimeout(() => {
            setTranscript('');
          }, 3000);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setConfig(prev => ({ ...prev, isListening: false }));
      };

      recognitionRef.current.onend = () => {
        setConfig(prev => ({ ...prev, isListening: false }));
        if (config.isEnabled && hasConsent) {
          setTimeout(() => startListening(language), 1000);
        }
      };
    }
  }, [config.isEnabled, hasConsent]);

  const speakText = (text: string, language: Language) => {
    if (synthRef.current && hasConsent) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = languageConfigs[language].speechSynthesisLang;
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      synthRef.current.speak(utterance);
    }
  };

  const toggleTheme = (newTheme?: 'light' | 'dark') => {
    const targetTheme = newTheme || (theme === 'light' ? 'dark' : 'light');
    setTheme(targetTheme);
    localStorage.setItem('voicepay-theme', targetTheme);
    
    // Apply theme changes to document immediately
    if (targetTheme === 'light') {
      document.documentElement.classList.add('light');
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
    } else {
      document.documentElement.classList.remove('light');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    }
    
    if (hasConsent) {
      const message = targetTheme === 'light' 
        ? languageConfigs[config.language].lightModeEnabled
        : languageConfigs[config.language].darkModeEnabled;
      speakText(message, config.language);
    }
  };

  const handleVoiceCommand = (command: string, language: Language) => {
    const languageConfig = languageConfigs[language];
    console.log(`🎤 Voice command received: "${command}" in ${language}`);

    // Check for theme commands first
    for (const [themeType, commands] of Object.entries(languageConfig.themeCommands)) {
      for (const themeCommand of commands) {
        if (command.includes(themeCommand.toLowerCase())) {
          toggleTheme(themeType as 'light' | 'dark');
          return;
        }
      }
    }

    // Check for navigation commands
    for (const [commandWord, route] of Object.entries(languageConfig.commands)) {
      if (command.includes(commandWord.toLowerCase())) {
        navigate(route);
        const pageName = route === '/' ? 'Home' : route.substring(1);
        speakText(`Navigating to ${pageName}`, language);
        return;
      }
    }

    speakText(languageConfig.pageNotFound, language);
  };

  const handlePrivacyConsent = (granted: boolean) => {
    setShowPrivacyConsent(false);
    setHasConsent(granted);
    
    if (granted) {
      setShowLanguageSelector(true);
    }
  };

  const selectLanguage = (language: Language) => {
    setConfig(prev => ({ ...prev, language, isEnabled: true }));
    localStorage.setItem('voicepay-language', encryptData(language));
    setShowLanguageSelector(false);
    
    requestMicrophonePermission(language);
    speakText(languageConfigs[language].welcomeMessage, language);
    
    setTimeout(() => startListening(language), 2000);
  };

  const startListening = (language: Language) => {
    if (recognitionRef.current && !config.isListening && hasConsent) {
      setConfig(prev => ({ ...prev, isListening: true }));
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && config.isListening) {
      recognitionRef.current.stop();
      setConfig(prev => ({ ...prev, isListening: false }));
    }
  };

  const toggleVoiceNavigation = () => {
    if (config.isEnabled && config.isListening) {
      stopListening();
    } else if (config.isEnabled && hasConsent) {
      startListening(config.language);
    }
  };

  const clearVoiceData = () => {
    setTranscript('');
    localStorage.removeItem('voicepay-language');
    setHasConsent(false);
    setConfig(prev => ({ ...prev, isEnabled: false, isListening: false }));
    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }
  };

  return {
    config,
    transcript,
    showLanguageSelector,
    showPrivacyConsent,
    hasConsent,
    theme,
    selectLanguage,
    toggleVoiceNavigation,
    handlePrivacyConsent,
    clearVoiceData,
    toggleTheme,
    startListening: () => startListening(config.language),
    stopListening,
    speakText: (text: string) => speakText(text, config.language),
    languageConfigs
  };
};
