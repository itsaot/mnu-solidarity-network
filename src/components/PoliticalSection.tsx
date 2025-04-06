
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PoliticalSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold mb-6 text-mnu-green animate-fade-in">
              The People's Movement
            </h2>
            <p className="text-gray-700 mb-6 animate-fade-in" style={{animationDelay: "0.2s"}}>
              The Mkhonto National Union stands in the proud tradition of uMkhonto Wesizwe, 
              continuing the legacy of fighting for social justice, economic freedom, and true democracy 
              for all South Africans.
            </p>
            <p className="text-gray-700 mb-6 animate-fade-in" style={{animationDelay: "0.3s"}}>
              Our union represents the aspirations of all people, not just workers, seeking to build 
              a more equitable society where economic opportunity and social justice extend to every 
              citizen regardless of background.
            </p>
            <div className="animate-fade-in" style={{animationDelay: "0.4s"}}>
              <Button asChild variant="default" className="bg-mnu-green hover:bg-mnu-green/90">
                <Link to="/affiliate" className="flex items-center">
                  Join Our Movement
                </Link>
              </Button>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="bg-gradient-to-br from-mnu-green to-mnu-black p-1 rounded-lg shadow-xl">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-2xl font-semibold mb-4 text-mnu-green">Our Core Values</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-mnu-green mr-2 font-bold">•</span>
                    <span>Economic liberation and equality for all South Africans</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-mnu-green mr-2 font-bold">•</span>
                    <span>Protection of workers' rights and fair labor practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-mnu-green mr-2 font-bold">•</span>
                    <span>Land reform and restoration of ancestral lands</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-mnu-green mr-2 font-bold">•</span>
                    <span>Quality education and healthcare for all citizens</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-mnu-green mr-2 font-bold">•</span>
                    <span>Sovereignty and protection of South African resources</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 h-20 w-20 bg-mnu-gold rounded-br-lg z-[-1]"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PoliticalSection;
