
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AffiliationForm from '../components/AffiliationForm';

const AffiliatePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-4 animate-fade-in">Join the People's Movement</h1>
          <div className="w-24 h-1 bg-mnu-gold mx-auto mb-8 animate-fade-in" style={{animationDelay: "0.1s"}}></div>
          <p className="text-center max-w-2xl mx-auto mb-12 text-gray-600 animate-fade-in" style={{animationDelay: "0.2s"}}>
            The Mkhonto National Union welcomes all South Africans who believe in economic freedom, 
            social justice, and true democracy. By joining MNU, you become part of a movement 
            fighting for the rights and dignity of all people, continuing the proud legacy 
            of uMkhonto Wesizwe.
          </p>
          <AffiliationForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AffiliatePage;
