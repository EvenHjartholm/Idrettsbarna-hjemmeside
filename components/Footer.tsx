import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { APP_NAME } from '../constants';

const Footer: React.FC = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-secondary border-t border-border pt-16 pb-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="text-txt-primary font-bold text-xl tracking-tight">Idrettsbarna</span>
            </div>
            <p className="text-txt-secondary text-sm leading-relaxed">
              Trygghet og mestring i vannet for de minste. Vi skaper gode opplevelser som varer livet ut.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-txt-primary font-bold mb-6">Snarveier</h3>
            <ul className="space-y-4">
              <li><a href="#services" className="text-txt-secondary hover:text-accent transition-colors">Våre Kurs</a></li>
              <li><a href="#schedule" className="text-txt-secondary hover:text-accent transition-colors">Timeplan</a></li>
              <li><a href="#faq" className="text-txt-secondary hover:text-accent transition-colors">Spørsmål & Svar</a></li>
              <li><a href="#contact" className="text-txt-secondary hover:text-accent transition-colors">Kontakt Oss</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-txt-primary font-bold mb-6">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-txt-secondary">
                <Phone className="w-5 h-5 text-accent" />
                <a href="tel:41906445" className="hover:text-accent transition-colors">41 90 64 45</a>
              </li>
              <li className="flex items-center gap-3 text-txt-secondary">
                <Mail className="w-5 h-5 text-accent" />
                <a href="mailto:even@idrettsbarna.no" className="hover:text-accent transition-colors">even@idrettsbarna.no</a>
              </li>
              <li className="flex items-center gap-3 text-txt-secondary">
                <MapPin className="w-5 h-5 text-accent" />
                <span>Brages vei 2, 1387 Asker</span>
              </li>
            </ul>
          </div>

          {/* Social / Legal */}
          <div>
            <h3 className="text-txt-primary font-bold mb-6">Følg Oss</h3>
            <div className="flex gap-4 mb-8">
              <a href="#" className="p-2 bg-primary rounded-full text-txt-secondary hover:text-white hover:bg-accent transition-all">
                {/* <Facebook className="w-5 h-5" /> */}
              </a>
              <a href="#" className="p-2 bg-primary rounded-full text-txt-secondary hover:text-white hover:bg-accent transition-all">
                {/* <Instagram className="w-5 h-5" /> */}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-txt-muted text-sm">
            © {new Date().getFullYear()} Idrettsbarna. Alle rettigheter reservert.
          </p>
          <div className="flex gap-6 text-sm text-txt-muted">
            <a href="#" className="hover:text-txt-primary transition-colors">Personvern</a>
            <a href="#" className="hover:text-txt-primary transition-colors">Vilkår</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;