
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import AffiliationForm from '../components/AffiliationForm';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const AffiliatePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-center mb-4 animate-fade-in">Join the People's Movement</h1>
          <div className="w-24 h-1 bg-mnu-gold mx-auto mb-8 animate-fade-in" style={{animationDelay: "0.1s"}}></div>
          <p className="text-center max-w-2xl mx-auto mb-8 text-gray-600 animate-fade-in" style={{animationDelay: "0.2s"}}>
            The Mkhonto National Union welcomes all South Africans who believe in economic freedom, 
            social justice, and true democracy. By joining MNU, you become part of a movement 
            fighting for the rights and dignity of all people, continuing the proud legacy 
            of uMkhonto Wesizwe.
          </p>
          
          <Alert className="max-w-2xl mx-auto mb-6 animate-fade-in border-green-200" style={{animationDelay: "0.25s"}}>
            <AlertCircle className="h-5 w-5 text-green-700" />
            <AlertTitle className="text-green-700 font-semibold">Payment Required - R50 Fee</AlertTitle>
            <AlertDescription className="text-green-700">
              <p className="mb-2">Please send proof of payment with your application.</p>
              <p className="font-medium">Banking Details:</p>
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li>Account Number: <span className="font-medium">63147152374</span></li>
                <li>Bank: <span className="font-medium">FNB</span></li>
                <li>Branch Code: <span className="font-medium">220825</span></li>
              </ul>
            </AlertDescription>
          </Alert>
          
          <div className="text-center max-w-2xl mx-auto mb-6 text-amber-700 text-sm font-medium animate-fade-in bg-amber-50 p-3 rounded-md border border-amber-200" style={{animationDelay: "0.3s"}}>
            <p>Note: This form will open your default email application to complete the submission.</p>
            <p className="mt-2">Please review the email content before sending it to MNU leadership.</p>
          </div>
          <div className="text-center max-w-2xl mx-auto mb-6 text-blue-700 text-sm font-medium animate-fade-in bg-blue-50 p-3 rounded-md border border-blue-200" style={{animationDelay: "0.3s"}}>
            <p>You can now upload supporting documents with your application!</p>
            <p className="mt-2">Documents will be saved locally and you'll be reminded to attach them to your email.</p>
          </div>
          <div className="text-center max-w-2xl mx-auto mb-12 text-green-600 text-sm font-medium animate-fade-in bg-green-50 p-3 rounded-md border border-green-200" style={{animationDelay: "0.3s"}}>
            Your submission will be sent directly to MNU leadership via email at mkhontonationalunion@gmail.com
          </div>
          <AffiliationForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AffiliatePage;
