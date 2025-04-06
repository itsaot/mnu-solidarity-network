
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import InfoSection from '../components/InfoSection';
import PoliticalSection from '../components/PoliticalSection';
import JoinBanner from '../components/JoinBanner';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <InfoSection />
        <PoliticalSection />
        <JoinBanner />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
