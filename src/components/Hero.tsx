
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="bg-gradient-to-br from-mnu-green/90 to-mnu-green py-16 md:py-24 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Mkhonto</span> National Union
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Uniting workers. Fighting for rights. Building a better future.
          </p>
          <div className="space-x-4 flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-white text-mnu-black hover:bg-white/90 hover-scale" 
              size="lg" 
              asChild
            >
              <Link to="/affiliate">Affiliate Today</Link>
            </Button>
            <Button 
              className="bg-white text-mnu-green hover:bg-white/90 hover-scale" 
              variant="outline" 
              size="lg" 
              asChild
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
