import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
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



  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-primary/80 backdrop-blur-md shadow-lg border-b border-white/5'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
            <div className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-black shadow-lg shadow-accent/10`}>
              <img
                src="/images/logo_fish.jpg"
                alt="Idrettsbarna Logo"
                className={`w-full h-full object-cover object-[center_15%] scale-110`}
              />
            </div>
            <div className="flex flex-col">
              <span className={`transition-colors duration-500 text-txt-primary font-bold text-xl tracking-tight leading-none`}>
                Idrettsbarna
              </span>
              <span className="text-xs text-accent font-medium tracking-wide">
                Lær å Svømme
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="ml-8 flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-2 rounded-md transition-colors relative group text-txt-secondary hover:text-accent text-sm font-medium`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left bg-accent`}></span>
                </a>
              ))}

              {/* Theme Toggle Removed */}

              <a
                href="#schedule"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent('click_cta', { event_category: 'Navbar', event_label: 'Ta kontakt' });
                  if (onOpenContact) onOpenContact();
                }}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg hover:-translate-y-0.5 whitespace-nowrap bg-accent hover:bg-accent-hover text-white shadow-accent/20 hover:shadow-accent/40`}
              >
                Ta kontakt
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-4 lg:hidden">
            {/* Theme Toggle Removed */}

            <button
              onClick={(e) => {
                e.preventDefault();
                trackEvent('click_cta', { event_category: 'Navbar Mobile', event_label: 'Ta kontakt' });
                if (onOpenContact) onOpenContact();
              }}
              className="hidden md:flex bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-2.5 rounded-full font-bold transition-all shadow-lg shadow-cyan-900/20 hover:shadow-cyan-900/40 hover:-translate-y-0.5 text-sm uppercase tracking-wider items-center gap-2"
            >
              Ta kontakt <ArrowRight size={16} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-txt-secondary hover:text-txt-primary hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-primary/95 backdrop-blur-xl border-b border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-txt-secondary hover:text-txt-primary hover:bg-white/5 block px-3 py-4 rounded-md text-base font-medium border-b border-border/50 last:border-0"
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