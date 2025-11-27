import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Camera } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Theme } from '../App';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
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
    { name: 'Timeplan/Påmelding', href: '#schedule' },
    { name: 'Video', href: '#video' },
    { name: 'Nyheter', href: '/nyheter' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Kontakt', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);

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

  const getThemeIcon = () => {
    if (theme === 'color') return <Moon size={20} />;
    return <Sun size={20} />;
  };

  const getThemeTitle = () => {
    if (theme === 'color') return "Bytt til Foto Modus";
    return "Bytt til Farger";
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled
        ? theme === 'photo'
          ? 'bg-black/40 backdrop-blur-2xl border-b border-white/10'
          : 'bg-primary/80 backdrop-blur-md shadow-lg border-b border-white/5'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={handleLogoClick}>
            <div className={`w-12 h-12 rounded-full overflow-hidden flex items-center justify-center bg-black shadow-lg ${theme === 'photo' ? 'shadow-white/10 border border-white/10' : 'shadow-cyan-500/10'}`}>
              <img
                src="/images/logo_fish.jpg"
                alt="Idrettsbarna Logo"
                className={`w-full h-full object-cover object-[center_15%] scale-110 ${theme === 'photo' ? 'mix-blend-screen' : ''}`}
              />
            </div>
            <div className="flex flex-col">
              <span className={`transition-colors duration-500 ${theme === 'photo'
                ? 'text-white font-sans font-light tracking-[0.3em] uppercase text-xl md:text-2xl'
                : 'text-txt-primary font-bold text-xl tracking-tight leading-none'
                }`}>
                Idrettsbarna
              </span>
              {theme !== 'photo' && (
                <span className="text-xs text-cyan-600 font-medium tracking-wide">
                  Lær å Svømme
                </span>
              )}
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-4 lg:ml-8 flex items-center space-x-4 lg:space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-2 lg:px-3 py-2 rounded-md transition-colors relative group ${theme === 'photo'
                    ? 'text-white/80 hover:text-white text-[10px] lg:text-xs font-light tracking-widest uppercase'
                    : 'text-txt-secondary hover:text-accent text-sm font-medium'
                    }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${theme === 'photo' ? 'bg-white' : 'bg-accent'
                    }`}></span>
                </a>
              ))}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors flex-shrink-0 ${theme === 'photo'
                  ? 'text-white/80 hover:text-white hover:bg-white/10'
                  : 'text-txt-secondary hover:text-accent hover:bg-white/5'
                  }`}
                title={getThemeTitle()}
              >
                {getThemeIcon()}
              </button>

              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className={`px-4 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-bold transition-all shadow-lg hover:-translate-y-0.5 whitespace-nowrap ${theme === 'photo'
                  ? 'border border-white text-white hover:bg-white hover:text-black tracking-widest uppercase text-[10px] lg:text-xs'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-900/20 hover:shadow-cyan-900/40'
                  }`}
              >
                Meld på
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-txt-secondary hover:text-accent hover:bg-white/5 transition-colors"
            >
              {getThemeIcon()}
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
        <div className="md:hidden bg-primary/95 backdrop-blur-xl border-b border-border">
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