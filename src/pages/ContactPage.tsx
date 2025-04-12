
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
          <h1 className="text-3xl font-bold text-center mb-4 animate-fade-in">Contact People's Movement</h1>
          <div className="w-24 h-1 bg-mnu-green mx-auto mb-8 animate-fade-in" style={{animationDelay: "0.1s"}}></div>
          <p className="text-center max-w-2xl mx-auto mb-12 text-gray-600 animate-fade-in" style={{animationDelay: "0.2s"}}>
            The Mkhonto National Union is a movement for all citizens of South Africa. 
            Whether you have questions, want to volunteer, or need assistance with community organizing, 
            our team is ready to support the people's cause.
          </p>
          <ContactInfo />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
