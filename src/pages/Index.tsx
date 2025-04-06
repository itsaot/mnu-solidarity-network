
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import InfoSection from '../components/InfoSection';
import PoliticalSection from '../components/PoliticalSection';
import JoinBanner from '../components/JoinBanner';
import { sendEmail } from './services/emailService';

sendEmail({
  to: 'calvinmzoboshe@gmail.com',
  subject: 'Test Email from Gmail API',
  body: 'Hi Calvin, this is a test email sent using Node.js and Gmail API!',
})
.then((response) => console.log(response.message))
.catch((error) => console.error('Failed to send email:', error));

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
