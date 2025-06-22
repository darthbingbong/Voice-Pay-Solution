import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, CheckCircle, XCircle, Clock, CreditCard, Smartphone, Building } from 'lucide-react';

interface Transaction {
  item: string;
  amount: number;
  merchant: string;
}

const Working = () => {
  const [isListening, setIsListening] = useState(false);
  const [currentStep, setCurrentStep] = useState('initial');
  const [transcript, setTranscript] = useState('');
  const [transaction] = useState<Transaction>({
    item: "Premium Coffee Beans",
    amount: 299,
    merchant: "Bean There Coffee Co."
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [otp, setOtp] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [timer, setTimer] = useState(60);
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript.toLowerCase();
        setTranscript(speechResult);
        handleVoiceCommand(speechResult);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, [currentStep, selectedPaymentMethod]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    } else if (timer === 0) {
      setCurrentStep('timeout');
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handleVoiceCommand = (command: string) => {
    console.log(`🔊 Voice command received: "${command}"`);
    
    if (currentStep === 'initial' && (command.includes('yes') || command.includes('confirm'))) {
      setCurrentStep('payment-methods');
      speakText("Here are your available payment methods. Please choose: UPI, Credit Card, or Net Banking.");
    } else if (currentStep === 'payment-methods') {
      if (command.includes('upi')) {
        setSelectedPaymentMethod('UPI');
        setCurrentStep('confirm-method');
        speakText("You selected UPI. Do you want to proceed with UPI payment?");
      } else if (command.includes('credit') || command.includes('card')) {
        setSelectedPaymentMethod('Credit Card');
        setCurrentStep('confirm-method');
        speakText("You selected Credit Card. Do you want to proceed with Credit Card payment?");
      } else if (command.includes('net') || command.includes('banking')) {
        setSelectedPaymentMethod('Net Banking');
        setCurrentStep('confirm-method');
        speakText("You selected Net Banking. Do you want to proceed with Net Banking payment?");
      }
    } else if (currentStep === 'confirm-method' && (command.includes('yes') || command.includes('proceed'))) {
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setOtp(generatedOtp);
      setCurrentStep('otp-verification');
      setTimer(60);
      setIsTimerActive(true);
      speakText(`Your OTP is ${generatedOtp.split('').join(' ')}. Please say the OTP to confirm your payment.`);
    } else if (currentStep === 'otp-verification') {
      // Improved OTP matching - remove all spaces and non-digits, then compare
      const cleanSpokenOtp = command.replace(/[^0-9]/g, '');
      const cleanActualOtp = otp.replace(/[^0-9]/g, '');
      
      console.log(`🔍 OTP Comparison - Spoken: "${cleanSpokenOtp}", Expected: "${cleanActualOtp}"`);
      setUserOtp(cleanSpokenOtp);
      
      if (cleanSpokenOtp === cleanActualOtp) {
        setCurrentStep('success');
        setIsTimerActive(false);
        speakText("OTP verified successfully! Transaction completed. Your receipt has been sent via email and SMS. Thank you for using VoicePay!");
      } else {
        setCurrentStep('otp-error');
        speakText("Incorrect OTP. Please try again or say cancel to abort the transaction.");
      }
    } else if (command.includes('no') || command.includes('cancel')) {
      setCurrentStep('cancelled');
      speakText("Transaction cancelled. Thank you for using VoicePay.");
    }
  };

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      setTranscript('');
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const resetDemo = () => {
    setCurrentStep('initial');
    setSelectedPaymentMethod('');
    setOtp('');
    setUserOtp('');
    setTimer(60);
    setIsTimerActive(false);
    setTranscript('');
    stopListening();
  };

  const paymentMethods = [
    { id: 'UPI', name: 'UPI Payment', icon: Smartphone, color: 'from-green-400 to-green-600' },
    { id: 'Credit Card', name: 'Credit Card', icon: CreditCard, color: 'from-blue-400 to-blue-600' },
    { id: 'Net Banking', name: 'Net Banking', icon: Building, color: 'from-purple-400 to-purple-600' }
  ];

  return (
    <div className="min-h-screen gradient-bg pt-20">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-cool">
              Voice Payment Demo
            </span>
          </h1>
          <p className="text-xl text-gray-300">
            Experience the future of accessible payments with your voice
          </p>
        </div>

        {/* Demo Container */}
        <div className="gradient-card rounded-3xl p-8 md:p-12 animate-fade-in">
          {/* Transaction Details */}
          <div className="modern-card rounded-2xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Transaction Details</h3>
            <div className="space-y-2 text-gray-300">
              <p><span className="font-medium text-blue-400">Item:</span> {transaction.item}</p>
              <p><span className="font-medium text-blue-400">Amount:</span> ₹{transaction.amount}</p>
              <p><span className="font-medium text-blue-400">Merchant:</span> {transaction.merchant}</p>
            </div>
          </div>

          {/* Current Step Display */}
          <div className="text-center mb-8">
            {currentStep === 'initial' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">
                  Do you confirm the purchase of {transaction.item} at ₹{transaction.amount}?
                </h2>
                <p className="text-gray-400">Say "Yes" to confirm or "No" to cancel</p>
              </div>
            )}

            {currentStep === 'payment-methods' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white">Choose Your Payment Method</h2>
                <p className="text-gray-400">Say "UPI", "Credit Card", or "Net Banking"</p>
                <div className="grid md:grid-cols-3 gap-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className={`p-4 rounded-xl bg-gradient-to-r ${method.color} text-white hover:scale-105 transition-all duration-300`}>
                      <method.icon className="h-8 w-8 mx-auto mb-2" />
                      <p className="font-semibold">{method.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 'confirm-method' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">
                  Do you want to proceed with {selectedPaymentMethod}?
                </h2>
                <p className="text-gray-400">Say "Yes" to proceed or "No" to go back</p>
              </div>
            )}

            {currentStep === 'otp-verification' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-white">Enter OTP</h2>
                <div className="modern-card rounded-lg p-4 text-2xl font-mono font-bold text-center text-blue-400">
                  {otp}
                </div>
                <p className="text-gray-400">Please say the OTP aloud to verify your payment</p>
                <div className="flex items-center justify-center space-x-2 text-orange-400">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">Time remaining: {timer}s</span>
                </div>
                {userOtp && (
                  <p className="text-sm text-gray-500">You said: {userOtp}</p>
                )}
              </div>
            )}

            {currentStep === 'success' && (
              <div className="space-y-4 text-center">
                <CheckCircle className="h-16 w-16 text-green-400 mx-auto animate-pulse-glow" />
                <h2 className="text-2xl font-bold text-green-400">Transaction Successful!</h2>
                <p className="text-gray-300">
                  Your payment of ₹{transaction.amount} has been processed successfully.
                  Receipt sent via email and SMS.
                </p>
              </div>
            )}

            {(currentStep === 'cancelled' || currentStep === 'timeout' || currentStep === 'otp-error') && (
              <div className="space-y-4 text-center">
                <XCircle className="h-16 w-16 text-red-400 mx-auto" />
                <h2 className="text-2xl font-bold text-red-400">
                  {currentStep === 'timeout' ? 'Transaction Timeout' : 
                   currentStep === 'otp-error' ? 'Incorrect OTP' : 'Transaction Cancelled'}
                </h2>
                <p className="text-gray-300">
                  {currentStep === 'timeout' ? 'The transaction timed out. Please try again.' :
                   currentStep === 'otp-error' ? 'The OTP you entered was incorrect.' :
                   'The transaction has been cancelled as requested.'}
                </p>
              </div>
            )}
          </div>

          {/* Voice Controls */}
          <div className="flex flex-col items-center space-y-6">
            {transcript && (
              <div className="glass-effect rounded-lg p-4 w-full max-w-md border border-blue-500/20">
                <p className="text-sm text-gray-400 mb-1">You said:</p>
                <p className="font-semibold text-blue-400">"{transcript}"</p>
              </div>
            )}

            <div className="flex space-x-4">
              <button
                onClick={isListening ? stopListening : startListening}
                disabled={currentStep === 'success' || currentStep === 'cancelled' || currentStep === 'timeout'}
                className={`flex items-center space-x-2 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 ${
                  isListening 
                    ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse-glow' 
                    : 'bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 hover:shadow-2xl text-white animate-glow'
                } disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105`}
              >
                {isListening ? <MicOff className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
                <span>{isListening ? 'Stop Listening' : 'Start Voice Command'}</span>
              </button>

              <button
                onClick={resetDemo}
                className="px-8 py-4 border-2 border-gray-600 text-gray-300 rounded-full font-semibold text-lg hover:border-indigo-400 hover:text-indigo-400 transition-all duration-300 hover:scale-105"
              >
                Reset Demo
              </button>
            </div>

            <p className="text-sm text-gray-500 text-center max-w-md">
              Click "Start Voice Command" and speak clearly. Make sure your microphone is enabled.
              This demo works best in Chrome browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Working;
