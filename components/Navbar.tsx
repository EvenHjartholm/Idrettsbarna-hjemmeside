import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Sun, Moon } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Theme } from '../types';
import { trackEvent } from '../utils/analytics';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  onOpenContact?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme, onOpenContact }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if we are on the specific Nordic landing page OR if global theme is Nordic
  const isNordicPage = location.pathname === '/babysvomming-asker' || theme === 'nordic';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle scroll after navigation
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  const navLinks = [
    { name: 'Hjem', href: '#hero' },
    { name: 'Kurs', href: '#services' },
    { name: 'Kurstider/Påmelding', href: '#schedule' },
    { name: 'Video', href: '#video' },
    { name: 'Om oss', href: '/om-oss' },
    { name: 'Nyheter', href: '/nyheter' },
    { name: 'FAQ', href: '#faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

    // Special handling for Contact link
    if (href === '#contact' && onOpenContact) {
      onOpenContact();
      return;
    }

    if (href.startsWith('/')) {
      navigate(href);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      const id = href.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Dynamic Styles based on Page Type
  const navClasses = isNordicPage
    ? `fixed w-full z-50 transition-all duration-500 ${scrolled
        ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 py-2'
        : 'bg-transparent border-b border-transparent py-4'
      }`
    : `fixed w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-primary/80 backdrop-blur-md shadow-[0_4px_35px_rgba(34,211,238,0.25)] border-b border-cyan-400/30'
        : 'bg-transparent border-b border-transparent'
      }`;
  
  const textMainColor = isNordicPage ? (scrolled ? 'text-slate-900' : 'text-slate-800') : 'text-white';
  const textHoverColor = isNordicPage ? 'hover:text-amber-600' : 'hover:text-cyan-300';
  const logoTextMain = isNordicPage ? 'text-slate-900' : 'text-white';
  const logoTextSub = isNordicPage ? 'text-slate-500' : 'text-cyan-400';
  const linkColor = isNordicPage ? 'text-slate-600' : 'text-slate-300';

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={handleLogoClick}>
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center transition-all duration-500 ${isNordicPage ? 'bg-slate-100 shadow-inner' : 'bg-black shadow-[0_0_15px_rgba(34,211,238,0.3)]'}`}>
              <img
                src="/images/logo_fish.jpg"
                alt="Idrettsbarna Logo"
                className={`w-full h-full object-cover object-[center_15%] transition-transform duration-700 ${isNordicPage ? 'scale-100 opacity-90 mix-blend-multiply' : 'scale-110 group-hover:scale-125'}`}
              />
            </div>
            <div className="flex flex-col">
              <span className={`transition-colors duration-500 font-bold text-lg md:text-xl tracking-tight leading-none ${logoTextMain} ${!isNordicPage && 'group-hover:text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]'}`}>
                Idrettsbarna
              </span>
              <span className={`text-xs font-medium tracking-wide transition-colors ${logoTextSub}`}>
                Lær å Svømme
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-8 flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded-md transition-all duration-300 relative group text-sm font-medium ${linkColor} ${textHoverColor} ${!isNordicPage && 'hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'}`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${isNordicPage ? 'bg-slate-900' : 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'}`}></span>
                </a>
              ))}

              {/* Theme Toggle Button */}
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${isNordicPage ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-white/10 text-cyan-200 hover:bg-white/20 hover:text-white'}`}
                title={isNordicPage ? "Bytt til mørk modus" : "Bytt til lys modus"}
              >
                {isNordicPage ? <Moon size={18} /> : <Sun size={18} />}
              </button>

              <a
                href="#schedule"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent('click_cta', { event_category: 'Navbar', event_label: 'Ta kontakt' });
                  if (onOpenContact) onOpenContact();
                }}
                className={isNordicPage 
                  ? "px-6 py-2.5 rounded-full bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                  : "group relative px-6 py-2.5 rounded-full overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all hover:-translate-y-0.5"
                }
              >
                {!isNordicPage && (
                   <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#22d3ee_50%,transparent_100%)] animate-spin-slow opacity-40 group-hover:opacity-80 transition-opacity" />
                )}
                <div className={`${isNordicPage ? '' : 'relative h-full w-full bg-cyan-950/80 hover:bg-cyan-950/60 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors px-4'}`}>
                  <span className={`${isNordicPage ? 'text-white' : 'text-cyan-200 group-hover:text-white'} text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors`}>
                    Ta kontakt
                  </span>
                </div>
              </a>
            </div>
          </div>

          {/* Mobile Menu Button & Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
             {/* Mobile Theme Toggle */}
             <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${isNordicPage ? 'bg-slate-100 text-slate-600' : 'bg-white/10 text-cyan-200'}`}
              >
                {isNordicPage ? <Moon size={18} /> : <Sun size={18} />}
              </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                trackEvent('click_cta', { event_category: 'Navbar Mobile', event_label: 'Ta kontakt' });
                if (onOpenContact) onOpenContact();
              }}
              className={isNordicPage
                 ? "hidden md:flex px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider gap-2 items-center"
                 : "hidden md:flex group relative px-5 py-2 rounded-full overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all hover:-translate-y-0.5 items-center gap-2"
              }
            >
              {!isNordicPage && (
                 <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#22d3ee_50%,transparent_100%)] animate-spin-slow opacity-40 group-hover:opacity-80 transition-opacity" />
              )}
              <div className={`${isNordicPage ? '' : 'relative h-full w-full bg-cyan-950/80 hover:bg-cyan-950/60 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors px-3 py-1'}`}>
                <span className={`${isNordicPage ? 'text-white' : 'text-cyan-200 group-hover:text-white'} text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors`}>
                  Ta kontakt <ArrowRight size={14} />
                </span>
              </div>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors ${isNordicPage ? 'text-slate-800 hover:bg-slate-100' : 'text-cyan-400 hover:text-cyan-200 hover:bg-cyan-500/10'}`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`lg:hidden transition-all duration-300 ${isNordicPage ? 'bg-white/95 border-b border-slate-200' : 'bg-slate-950/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-3 py-4 rounded-md text-base font-medium transition-colors ${
                  isNordicPage 
                    ? 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-b border-slate-100 last:border-0' 
                    : 'text-slate-300 hover:text-cyan-300 hover:bg-cyan-500/10 border-b border-white/5 last:border-0'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;