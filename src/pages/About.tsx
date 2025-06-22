
import React from 'react';
import { Heart, Target, Award, Linkedin, Mail } from 'lucide-react';

const About = () => {
  const team = [
    {
      name: "Anand Venukrishnan",
      role: "Co-Founder & CEO",
      bio: "Passionate about inclusive technology and accessibility.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      linkedin: "#",
      email: "anand@voicepay.in"
    },
    {
      name: "Mohammed Shadab",
      role: "Co-Founder & CTO",
      bio: "Expert in voice technology and AI.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      linkedin: "#",
      email: "shadab@voicepay.in"
    },
    {
      name: "Hiten Raj Singh",
      role: "Co-Founder & Head of Design",
      bio: "UX designer focused on accessibility and inclusive design.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      linkedin: "#",
      email: "hiten@voicepay.in"
    }
  ];

  const values = [
    {
      icon: Heart,
      title: "Empathy First",
      description: "Every feature we build starts with understanding real human needs and challenges."
    },
    {
      icon: Target,
      title: "Inclusive Innovation",
      description: "Technology should work for everyone, not just the digitally privileged."
    },
    {
      icon: Award,
      title: "Excellence & Trust",
      description: "We maintain the highest standards of security, reliability, and user experience."
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 animate-fade-in">
            <span className="text-gradient-cool">
              Our Mission
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 leading-relaxed animate-fade-in">
            We believe that financial services should be accessible to everyone, regardless of their 
            physical abilities or digital literacy. VoicePay is our commitment to building a more 
            inclusive financial future for India.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl font-bold text-white mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p>
                  VoicePay was born from a simple observation: millions of Indians struggle with 
                  digital payments not because they lack the need, but because current systems 
                  weren't designed with them in mind.
                </p>
                <p>
                  When we met Priya, a visually impaired teacher who had to rely on others for 
                  simple transactions, we knew we had to act. Her story, along with countless 
                  others, inspired us to create a payment platform that truly works for everyone.
                </p>
                <p>
                  Today, VoicePay serves thousands of users across India, from rural farmers 
                  making their first digital payment to elderly citizens receiving pensions 
                  with dignity and independence.
                </p>
              </div>
            </div>
            <div className="relative animate-float">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-gray-400">The principles that guide everything we do</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="group p-8 modern-card rounded-2xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <value.icon className="h-12 w-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-400">
              Passionate individuals united by a shared vision of financial inclusion
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index}
                className="group gradient-card rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="relative mb-6">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 mx-auto rounded-full object-cover group-hover:scale-105 transition-transform border-2 border-gray-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-full"></div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                  <p className="text-blue-400 font-semibold mb-4">{member.role}</p>
                  <p className="text-gray-300 leading-relaxed mb-6">{member.bio}</p>
                  
                  <div className="flex justify-center space-x-4">
                    <a 
                      href={member.linkedin}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors hover:scale-110 transform"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a 
                      href={`mailto:${member.email}`}
                      className="p-2 text-gray-400 hover:text-blue-400 transition-colors hover:scale-110 transform"
                    >
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="gradient-card rounded-3xl p-12">
            <h2 className="text-4xl font-bold mb-6 text-gradient-cool">Join Our Mission</h2>
            <p className="text-xl mb-8 text-gray-300">
              Help us build a more inclusive financial future for everyone in India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-glow">
                Partner With Us
              </button>
              <button className="border-2 border-gray-600 text-gray-300 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-400 hover:text-blue-400 transition-all duration-300">
                Contact Our Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
