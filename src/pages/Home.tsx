
import React, { useEffect, useState } from 'react';
import { ArrowRight, Heart, Users, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState(0);

  const animatedTexts = [
    "Every voice deserves to be heard",
    "Every transaction should be accessible",
    "Financial inclusion starts with innovation"
  ];

  useEffect(() => {
    setIsVisible(true);
    
    // Voice greeting simulation
    const playWelcomeMessage = () => {
      console.log("🔊 Playing: Welcome to VoicePay. India's most inclusive payment platform");
    };
    
    const timer = setTimeout(playWelcomeMessage, 1000);
    
    // Animated text rotation
    const textTimer = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % animatedTexts.length);
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearInterval(textTimer);
    };
  }, []);

  return (
    <div className="min-h-screen gradient-bg">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 animate-float">
              <span className="text-gradient-neon">
                VoicePay
              </span>
            </h1>
            
            <div className="h-20 mb-8">
              <p 
                key={currentText}
                className="text-xl md:text-2xl text-gray-300 animate-fade-in"
              >
                {animatedTexts[currentText]}
              </p>
            </div>

            <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Breaking barriers, building bridges. VoicePay empowers disabled and first-time digital users 
              with voice-activated payments, making financial services truly accessible to everyone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/working"
                className="group bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center animate-glow"
              >
                Try Voice Demo
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 border-2 border-indigo-400/50 text-indigo-400 rounded-full text-lg font-semibold hover:border-indigo-400 hover:bg-indigo-400/10 transition-all duration-300"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Stories of <span className="text-gradient-cool">Empowerment</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Real people, real impact. See how VoicePay is transforming lives across India.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group gradient-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-float" style={{animationDelay: '0s'}}>
              <Heart className="h-12 w-12 text-pink-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-4">Priya's Independence</h3>
              <p className="text-gray-400 leading-relaxed">
                "As a visually impaired teacher, VoicePay gave me the confidence to handle my finances independently. 
                Now I can pay bills, send money to family, and shop online—all with just my voice."
              </p>
            </div>

            <div className="group gradient-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-float" style={{animationDelay: '0.5s'}}>
              <Users className="h-12 w-12 text-green-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-4">Rural Digital Inclusion</h3>
              <p className="text-gray-400 leading-relaxed">
                "In my village, many elderly residents couldn't use smartphone apps. VoicePay in Hindi 
                helped them join the digital economy and receive government benefits directly."
              </p>
            </div>

            <div className="group gradient-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-float" style={{animationDelay: '1s'}}>
              <Shield className="h-12 w-12 text-purple-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold text-white mb-4">Secure & Trusted</h3>
              <p className="text-gray-400 leading-relaxed">
                "The voice authentication gives me peace of mind. Even with limited mobility, 
                I can make secure payments quickly and safely from anywhere."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Built for <span className="text-gradient-cool">Everyone</span>
            </h2>
            <p className="text-xl text-gray-400">
              Accessibility-first design meets cutting-edge technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Globe, title: "Multi-Language", desc: "Hindi, English, Tamil, Bengali & more", color: "text-blue-400" },
              { icon: Shield, title: "Bank-Grade Security", desc: "Voice biometrics & encryption", color: "text-green-400" },
              { icon: Users, title: "Inclusive Design", desc: "Built for disabilities & accessibility", color: "text-purple-400" },
              { icon: Heart, title: "Human-Centered", desc: "Empathy-driven user experience", color: "text-pink-400" }
            ].map((feature, index) => (
              <div 
                key={index}
                className="group text-center p-6 gradient-card rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <feature.icon className={`h-12 w-12 mx-auto ${feature.color} mb-4 group-hover:scale-110 transition-transform`} />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600/20 to-pink-600/20 backdrop-blur-md">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6 text-gradient-cool">
            Ready to Experience the Future of Payments?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of users who've already discovered the power of voice-enabled payments.
          </p>
          <Link
            to="/working"
            className="inline-flex items-center bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse-glow"
          >
            Start Voice Demo
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
