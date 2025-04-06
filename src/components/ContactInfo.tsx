
import React from 'react';
import { MapPin, Mail, Phone, ExternalLink } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";

const ContactInfo = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center">Get in Touch</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover-scale">
          <CardContent className="flex flex-col items-center p-6">
            <div className="bg-mnu-green/10 p-4 rounded-full mb-4">
              <MapPin className="h-6 w-6 text-mnu-green" />
            </div>
            <h3 className="font-semibold mb-2">Visit Us</h3>
            <a 
              href="https://maps.google.com/?q=1415+Manaye+Road+Imbali+unit+1+Pietermaritzburg+3201"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-center text-gray-600 hover:text-mnu-green flex items-center"
            >
              1415 Manaye Road<br />
              Imbali unit 1<br />
              Pietermaritzburg 3201
              <ExternalLink className="ml-1" size={14} />
            </a>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardContent className="flex flex-col items-center p-6">
            <div className="bg-mnu-green/10 p-4 rounded-full mb-4">
              <Mail className="h-6 w-6 text-mnu-green" />
            </div>
            <h3 className="font-semibold mb-2">Email Us</h3>
            <a 
              href="mailto:mkhontonationalunion@gmail.com"
              className="text-center text-gray-600 hover:text-mnu-green"
            >
              mkhontonationalunion@gmail.com
            </a>
          </CardContent>
        </Card>
        
        <Card className="hover-scale">
          <CardContent className="flex flex-col items-center p-6">
            <div className="bg-mnu-green/10 p-4 rounded-full mb-4">
              <Phone className="h-6 w-6 text-mnu-green" />
            </div>
            <h3 className="font-semibold mb-2">Call Us</h3>
            <a 
              href="tel:+27645055259"
              className="text-center text-gray-600 hover:text-mnu-green"
            >
              +27 64 505 5259
            </a>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactInfo;
