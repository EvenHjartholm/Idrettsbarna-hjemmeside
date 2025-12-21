import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { Theme } from '../types';

interface FooterProps {
  onOpenTerms?: () => void;
  onOpenContact?: () => void;
  theme?: Theme;
}

const Footer: React.FC<FooterProps> = ({ onOpenTerms, onOpenContact, theme }) => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isNordic = theme === 'nordic';

  return (
    <footer className={`border-t pt-16 pb-8 transition-colors duration-500 ${
      isNordic 
        ? 'bg-[#FAFAF9] border-slate-200 text-slate-600' 
        : 'bg-secondary border-border text-txt-secondary'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg ${
                isNordic ? 'bg-slate-900 shadow-slate-200' : 'bg-gradient-to-br from-cyan-400 to-blue-600 shadow-cyan-500/20'
              }`}>
                <span className="text-white font-bold text-lg font-serif">I</span>
              </div>
              <span className={`font-bold text-xl tracking-tight ${isNordic ? 'text-slate-900 font-serif' : 'text-txt-primary'}`}>
                Idrettsbarna
              </span>
            </div>
            <p className={`text-sm leading-relaxed ${isNordic ? 'text-slate-500 font-light' : 'text-txt-secondary'}`}>
              Trygghet og mestring i vannet for de minste. Vi skaper gode opplevelser som varer livet ut.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-bold mb-6 ${isNordic ? 'text-slate-900 font-serif' : 'text-txt-primary'}`}>Snarveier</h3>
            <ul className="space-y-4">
              <li><a href="#services" className={`transition-colors ${isNordic ? 'hover:text-slate-900' : 'text-txt-secondary hover:text-accent'}`}>Våre Kurs</a></li>
              <li><a href="/svommekurs-asker" className={`transition-colors ${isNordic ? 'hover:text-slate-900' : 'text-txt-secondary hover:text-accent'}`}>Svømmekurs i Asker</a></li>
              <li><a href="/babysvomming-asker" className={`transition-colors ${isNordic ? 'hover:text-slate-900' : 'text-txt-secondary hover:text-accent'}`}>Babysvømming i Asker</a></li>
              <li><button onClick={(e: any) => scrollToSection(e, 'schedule')} className={`transition-colors text-left ${isNordic ? 'hover:text-slate-900' : 'text-slate-400 hover:text-cyan-400'}`}>Kurstider</button></li>
              <li><a href="/nyheter" className={`transition-colors ${isNordic ? 'hover:text-slate-900' : 'text-txt-secondary hover:text-accent'}`}>Nyheter</a></li>
              <li><a href="#faq" className={`transition-colors ${isNordic ? 'hover:text-slate-900' : 'text-txt-secondary hover:text-accent'}`}>Spørsmål & Svar</a></li>
              <li><button onClick={onOpenContact} className={`transition-colors text-left ${isNordic ? 'hover:text-slate-900' : 'text-txt-secondary hover:text-accent'}`}>Kontakt Oss</button></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className={`font-bold mb-6 ${isNordic ? 'text-slate-900 font-serif' : 'text-txt-primary'}`}>Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <Phone className={`w-5 h-5 ${isNordic ? 'text-slate-400' : 'text-accent'}`} />
                <a href="tel:41906445" className={`transition-colors ${isNordic ? 'hover:text-slate-900' : 'hover:text-accent'}`}>41 90 64 45</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className={`w-5 h-5 ${isNordic ? 'text-slate-400' : 'text-accent'}`} />
                <a href="mailto:even@idrettsbarna.no" className={`transition-colors ${isNordic ? 'hover:text-slate-900' : 'hover:text-accent'}`}>even@idrettsbarna.no</a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className={`w-5 h-5 ${isNordic ? 'text-slate-400' : 'text-accent'}`} />
                <span>Brages vei 2, 1387 Asker</span>
              </li>
            </ul>
          </div>

          {/* Social / Legal */}
          <div>
            <h3 className={`font-bold mb-6 ${isNordic ? 'text-slate-900 font-serif' : 'text-txt-primary'}`}>Følg Oss</h3>
            <div className="flex gap-4 mb-8">
              <a href="https://www.facebook.com/lerosvomme" target="_blank" rel="noopener noreferrer" className={`p-2 rounded-full transition-all ${isNordic ? 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-blue-600' : 'bg-secondary text-txt-secondary hover:text-white hover:bg-white/10'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            </div>
          </div>
        </div>

        <div className={`border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4 ${isNordic ? 'border-slate-200' : 'border-border'}`}>
          <p className={`text-sm ${isNordic ? 'text-slate-400' : 'text-txt-muted'}`}>
            © {new Date().getFullYear()} Idrettsbarna. Alle rettigheter reservert.
          </p>
          <div className={`flex gap-6 text-sm ${isNordic ? 'text-slate-400' : 'text-txt-muted'}`}>
            <button onClick={onOpenTerms} className={`transition-colors ${isNordic ? 'hover:text-slate-900' : 'hover:text-txt-primary'}`}>Vilkår</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;