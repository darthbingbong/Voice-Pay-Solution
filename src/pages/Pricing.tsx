
import React from 'react';
import { Check, Star, Phone, Mail, Shield, Zap, Users, BarChart3 } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      period: "",
      description: "Perfect for small businesses getting started with voice payments",
      features: [
        "Up to 100 transactions/month",
        "Basic voice recognition",
        "Email support",
        "2 languages (Hindi, English)",
        "Standard security",
        "Web dashboard access"
      ],
      buttonText: "Get Started Free",
      buttonStyle: "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-500 hover:to-gray-600",
      popular: false
    },
    {
      name: "Pro",
      price: "₹1,999",
      period: "/month",
      description: "Advanced features for growing businesses and organizations",
      features: [
        "Up to 5,000 transactions/month",
        "Advanced voice recognition",
        "Priority email & chat support",
        "8 languages including regional",
        "Enhanced security & encryption",
        "Analytics dashboard",
        "API access",
        "Custom voice prompts",
        "Transaction reports"
      ],
      buttonText: "Start Pro Trial",
      buttonStyle: "bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white hover:shadow-2xl animate-glow",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "Tailored solutions for large organizations and institutions",
      features: [
        "Unlimited transactions",
        "AI-powered voice intelligence",
        "Dedicated account manager",
        "24/7 phone support",
        "All languages + custom dialects",
        "Enterprise-grade security",
        "Custom integrations",
        "White-label options",
        "SLA guarantees",
        "On-premise deployment",
        "Training & workshops"
      ],
      buttonText: "Contact Sales",
      buttonStyle: "bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 text-white hover:shadow-2xl",
      popular: false
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Your voice data and payments are protected with enterprise-level encryption"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process payments in seconds with our optimized voice recognition engine"
    },
    {
      icon: Users,
      title: "Inclusive Design",
      description: "Built specifically for disabled users and digital beginners"
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Track usage, success rates, and user behavior with comprehensive reporting"
    }
  ];

  return (
    <div className="min-h-screen gradient-bg pt-20">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 animate-fade-in">
            <span className="text-gradient-cool">
              Simple, Transparent Pricing
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed animate-fade-in">
            Choose the perfect plan for your organization's needs. 
            Scale up as you grow, with no hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index}
                className={`relative p-8 gradient-card rounded-3xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in ${
                  plan.popular ? 'ring-2 ring-blue-500/50' : ''
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center space-x-1 animate-pulse-glow">
                      <Star className="h-4 w-4" />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gradient-cool">{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                  <p className="text-gray-400">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-4 px-6 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 ${plan.buttonStyle}`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Why Choose <span className="text-gradient-cool">VoicePay</span>?
            </h2>
            <p className="text-xl text-gray-400">
              Built from the ground up for accessibility and inclusion
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group text-center p-6 modern-card rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <feature.icon className="h-12 w-12 mx-auto text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                question: "How secure is voice payment processing?",
                answer: "VoicePay uses bank-grade encryption and voice biometrics to ensure your payments are completely secure. We never store sensitive financial data."
              },
              {
                question: "What languages are supported?",
                answer: "We support Hindi, English, Tamil, Bengali, Telugu, Marathi, Gujarati, and Kannada, with more regional languages being added regularly."
              },
              {
                question: "Can I integrate VoicePay with my existing systems?",
                answer: "Yes! Our Pro and Enterprise plans include API access for seamless integration with your current payment infrastructure."
              },
              {
                question: "Is there a setup fee?",
                answer: "No setup fees for any plan. You can start with our free Starter plan and upgrade anytime as your needs grow."
              }
            ].map((faq, index) => (
              <div key={index} className="gradient-card rounded-xl p-6 hover:shadow-xl transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                <p className="text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="gradient-card rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-6 text-gradient-cool">Ready to Get Started?</h2>
            <p className="text-xl mb-8 text-gray-300">
              Join thousands of organizations already using VoicePay to create inclusive payment experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center animate-glow">
                <Phone className="mr-2 h-5 w-5" />
                Schedule a Call
              </button>
              <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-full text-lg font-semibold hover:border-indigo-400 hover:text-indigo-400 transition-all duration-300 flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
