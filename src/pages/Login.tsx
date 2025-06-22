import React, { useState } from 'react';
import { Copy, Check, Play, Code, Eye, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { sanitizeInput } from '../utils/security';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState('react');
  const [showPreview, setShowPreview] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Basic input validation
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    if (!sanitizedEmail || !sanitizedEmail.includes('@')) {
      setLoginError('Please enter a valid email address');
      return;
    }

    if (sanitizedPassword.length < 6) {
      setLoginError('Password must be at least 6 characters');
      return;
    }

    // Demo login - in production, this would connect to secure backend
    setIsLoggedIn(true);
  };

  const copyCode = (code: string, type: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(type);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const sdkExamples = {
    react: {
      title: 'React Integration',
      code: `import { VoicePayButton } from '@voicepay/react-sdk';

function CheckoutPage() {
  const handlePayment = (result) => {
    console.log('Payment result:', result);
  };

  return (
    <VoicePayButton
      amount={1999}
      currency="INR"
      onSuccess={handlePayment}
      language="hi"
      className="voicepay-btn"
    >
      Pay with Voice
    </VoicePayButton>
  );
}`
    },
    javascript: {
      title: 'Vanilla JavaScript',
      code: `import VoicePay from '@voicepay/sdk';

// Initialize VoicePay - Use environment variables in production
const voicePay = new VoicePay({
  apiKey: process.env.VOICEPAY_API_KEY, // Never hardcode in production
  environment: 'sandbox'
});

// Create payment
voicePay.createPayment({
  amount: 1999,
  currency: 'INR',
  language: 'hi',
  onSuccess: (result) => {
    console.log('Payment successful:', result);
  },
  onError: (error) => {
    console.error('Payment failed:', error);
  }
});`
    },
    nodejs: {
      title: 'Node.js Backend',
      code: `const VoicePay = require('@voicepay/node');

// Use environment variables for API keys
const voicepay = new VoicePay(process.env.VOICEPAY_SECRET_KEY);

app.post('/create-payment', async (req, res) => {
  try {
    const payment = await voicepay.payments.create({
      amount: req.body.amount,
      currency: 'INR',
      customer: {
        phone: req.body.phone,
        language: req.body.language || 'hi'
      }
    });
    
    res.json({ payment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});`
    }
  };

  const PreviewComponent = () => (
    <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
      <h3 className="text-white text-lg font-semibold mb-4">Live Preview</h3>
      <div className="bg-gray-950 border border-gray-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-gray-300">Order Total: ₹1,999</span>
          <span className="text-green-400 text-sm">✓ Secure</span>
        </div>
        <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-all">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span>Pay with Voice</span>
        </button>
        <p className="text-gray-400 text-xs mt-2 text-center">
          Click and say: "Pay nineteen ninety nine rupees"
        </p>
      </div>
    </div>
  );

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black pt-20">
        <div className="max-w-md mx-auto px-4 py-16">
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome to VoicePay</h1>
              <p className="text-gray-400">Sign in to access your SDK and demos</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              {loginError && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{loginError}</p>
                </div>
              )}

              <div>
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white mt-1"
                  placeholder="Enter your email"
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-900 border-gray-700 text-white mt-1"
                  placeholder="Enter your password"
                  required
                  maxLength={100}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3"
              >
                Sign In
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                Don't have an account?{' '}
                <a href="#" className="text-blue-400 hover:text-blue-300">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">VoicePay SDK</h1>
          <p className="text-gray-400 text-lg">
            Integrate voice payments into your application in minutes
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Code Examples */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg">
              {Object.entries(sdkExamples).map(([key, example]) => (
                <button
                  key={key}
                  onClick={() => setSelectedTab(key)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                    selectedTab === key
                      ? 'bg-gray-800 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {example.title}
                </button>
              ))}
            </div>

            {/* Code Block */}
            <div className="bg-gray-950 border border-gray-800 rounded-lg overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800">
                <div className="flex items-center space-x-2">
                  <Code className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm font-medium">
                    {sdkExamples[selectedTab as keyof typeof sdkExamples].title}
                  </span>
                </div>
                <button
                  onClick={() => copyCode(sdkExamples[selectedTab as keyof typeof sdkExamples].code, selectedTab)}
                  className="flex items-center space-x-1 text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === selectedTab ? (
                    <Check className="w-4 h-4 text-green-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  <span className="text-xs">
                    {copiedCode === selectedTab ? 'Copied!' : 'Copy'}
                  </span>
                </button>
              </div>
              <div className="p-4">
                <pre className="text-gray-300 text-sm overflow-x-auto">
                  <code>{sdkExamples[selectedTab as keyof typeof sdkExamples].code}</code>
                </pre>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <Button
                onClick={() => setShowPreview(!showPreview)}
                className="bg-gray-800 hover:bg-gray-700 text-white flex items-center space-x-2"
              >
                <Eye className="w-4 h-4" />
                <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
              </Button>
              <Button
                className="bg-gray-800 hover:bg-gray-700 text-white flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Download SDK</span>
              </Button>
              <Button
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white flex items-center space-x-2"
              >
                <Play className="w-4 h-4" />
                <span>Run Demo</span>
              </Button>
            </div>
          </div>

          {/* Right Column - Preview & Documentation */}
          <div className="space-y-6">
            {showPreview && <PreviewComponent />}

            {/* API Keys - Updated for production security */}
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">API Keys (Demo Only)</h3>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3 mb-4">
                <p className="text-yellow-400 text-sm">
                  ⚠️ These are demo keys. In production, use environment variables and secure key management.
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-300 text-sm">Publishable Key (Demo)</Label>
                  <div className="flex mt-1">
                    <Input
                      readOnly
                      value="pk_demo_51234567890abcdef..."
                      className="bg-gray-900 border-gray-700 text-gray-300 font-mono text-sm"
                    />
                    <Button
                      onClick={() => copyCode('pk_demo_51234567890abcdef...', 'pubkey')}
                      className="ml-2 bg-gray-800 hover:bg-gray-700"
                      size="icon"
                    >
                      {copiedCode === 'pubkey' ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-300 text-sm">Secret Key (Demo)</Label>
                  <div className="flex mt-1">
                    <Input
                      readOnly
                      type="password"
                      value="sk_demo_51234567890abcdef..."
                      className="bg-gray-900 border-gray-700 text-gray-300 font-mono text-sm"
                    />
                    <Button
                      onClick={() => copyCode('sk_demo_51234567890abcdef...', 'secret')}
                      className="ml-2 bg-gray-800 hover:bg-gray-700"
                      size="icon"
                    >
                      {copiedCode === 'secret' ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Start Guide */}
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Quick Start</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">1</div>
                  <div>
                    <p className="text-gray-300">Install the SDK</p>
                    <code className="text-gray-400 text-xs">npm install @voicepay/react-sdk</code>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">2</div>
                  <div>
                    <p className="text-gray-300">Copy the code example</p>
                    <p className="text-gray-400 text-xs">Use the code from the tabs above</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5">3</div>
                  <div>
                    <p className="text-gray-300">Test your integration</p>
                    <p className="text-gray-400 text-xs">Use the preview to test functionality</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
