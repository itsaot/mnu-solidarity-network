
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import ContactInfo from '../components/ContactInfo';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-8 animate-fade-in">Contact Us</h1>
          <p className="text-center max-w-2xl mx-auto mb-12 text-gray-600 animate-fade-in" style={{animationDelay: "0.2s"}}>
            Have questions or need assistance? Get in touch with the Mkhonto National Union team using any of the methods below.
          </p>
          <ContactInfo />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
