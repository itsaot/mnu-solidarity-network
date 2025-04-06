
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav className="bg-mnu-green text-white py-4 shadow-md">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="flex items-center mb-4 md:mb-0">
          <h1 className="text-2xl font-bold text-mnu-gold">MNU</h1>
          <span className="ml-2 text-sm md:text-base">Mkhonto National Union</span>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <Button variant="link" className="text-white hover:text-mnu-gold hover-scale" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="link" className="text-white hover:text-mnu-gold hover-scale" asChild>
            <Link to="/affiliate">Affiliate</Link>
          </Button>
          <Button variant="link" className="text-white hover:text-mnu-gold hover-scale" asChild>
            <Link to="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
