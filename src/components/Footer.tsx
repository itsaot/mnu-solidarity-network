
import React from 'react';
import { ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-mnu-black text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="animate-fade-in">
            <h3 className="text-xl font-bold text-white mb-4">Mkhonto National Union</h3>
            <p className="mb-4">Empowering workers across South Africa</p>
          </div>
          
          <div className="animate-fade-in" style={{animationDelay: "0.2s"}}>
            <h3 className="text-xl font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="hover-link">Home</a></li>
              <li><a href="/affiliate" className="hover-link">Affiliate</a></li>
              <li><a href="/contact" className="hover-link">Contact</a></li>
            </ul>
          </div>
          
          <div className="animate-fade-in" style={{animationDelay: "0.4s"}}>
            <h3 className="text-xl font-bold text-white mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="mr-2 text-white" size={18} />
                <a 
                  href="https://maps.google.com/?q=1415+Manaye+Road+Imbali+unit+1+Pietermaritzburg+3201"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover-link flex items-center"
                >
                  1415 Manaye Road, Imbali unit 1, Pietermaritzburg 3201
                  <ExternalLink className="ml-1" size={14} />
                </a>
              </div>
              
              <div className="flex items-center">
                <Mail className="mr-2 text-white" size={18} />
                <a href="mailto:mkhontonationalunion@gmail.com" className="hover-link">
                  mkhontonationalunion@gmail.com
                </a>
              </div>
              
              <div className="flex items-center">
                <Phone className="mr-2 text-white" size={18} />
                <a href="tel:+27645055259" className="hover-link">+27 64 505 5259</a>
              </div>

              <div className="flex items-center">
                <Phone className="mr-2 text-white" size={18} />
                <a href="tel:+27732570686" className="hover-link">+27 73 257 0686</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Mkhonto National Union. All rights reserved.</p>
          <p className="mt-2">
            Developed and maintained by{' '}
            <a 
              href="https://smzobosheportfolio.vercel.app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover-link text-white"
            >
              S Mzoboshe
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
