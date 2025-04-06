
import React from 'react';
import { Shield, Users, Award } from 'lucide-react';

const InfoSection = () => {
  const features = [
    {
      icon: <Shield className="h-10 w-10 text-mnu-green" />,
      title: "Worker Protection",
      description: "We fight for your rights in the workplace, ensuring fair treatment and equitable compensation."
    },
    {
      icon: <Users className="h-10 w-10 text-mnu-green" />,
      title: "Collective Bargaining",
      description: "Our collective strength enables us to negotiate better terms and conditions for all members."
    },
    {
      icon: <Award className="h-10 w-10 text-mnu-green" />,
      title: "Legal Support",
      description: "Members receive professional legal advice and representation in labor-related matters."
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold mb-4">Why Join MNU?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The Mkhonto National Union is committed to improving working conditions and upholding the rights of workers across all sectors.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-200 animate-fade-in hover-scale"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InfoSection;
