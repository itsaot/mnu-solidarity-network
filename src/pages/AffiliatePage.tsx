
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
          <h1 className="text-3xl font-bold text-center mb-8 animate-fade-in">Join the Mkhonto National Union</h1>
          <p className="text-center max-w-2xl mx-auto mb-12 text-gray-600 animate-fade-in" style={{animationDelay: "0.2s"}}>
            Complete the form below to affiliate with MNU. Your information will be sent to our team for processing.
          </p>
          <AffiliationForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AffiliatePage;
