
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LanguageSelector from "./components/LanguageSelector";
import VoiceNavigationIndicator from "./components/VoiceNavigationIndicator";
import PrivacyConsent from "./components/PrivacyConsent";
import ThemeToggle from "./components/ThemeToggle";
import AutoReadButton from "./components/AutoReadButton";
import { useVoiceNavigation } from "./hooks/useVoiceNavigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Working from "./pages/Working";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const { 
    showLanguageSelector, 
    showPrivacyConsent, 
    selectLanguage, 
    handlePrivacyConsent 
  } = useVoiceNavigation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/working" element={<Working />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      <PrivacyConsent
        isOpen={showPrivacyConsent}
        onAccept={() => handlePrivacyConsent(true)}
        onDecline={() => handlePrivacyConsent(false)}
      />
      
      <LanguageSelector
        isOpen={showLanguageSelector}
        onSelect={selectLanguage}
        onClose={() => {}}
      />
      
      <ThemeToggle />
      <AutoReadButton />
      <VoiceNavigationIndicator />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
