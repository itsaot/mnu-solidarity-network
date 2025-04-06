
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const JoinBanner = () => {
  return (
    <section className="py-12 bg-mnu-black text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-mnu-black to-mnu-green/70 opacity-90"></div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            Join the Movement for a Better South Africa
          </h2>
          <p className="text-lg mb-8 opacity-90 animate-fade-in" style={{animationDelay: "0.2s"}}>
            The Mkhonto National Union is fighting for economic freedom, social justice, and 
            true democracy. Our strength comes from the people - join us today!
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in" style={{animationDelay: "0.3s"}}>
            <Button asChild size="lg" className="bg-mnu-gold text-mnu-black hover:bg-mnu-gold/90">
              <Link to="/affiliate">
                Become a Member
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/contact">
                Contact Our Leadership
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinBanner;
