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

  // LOGIC FIX:
  // 1. We use "Nordic Style" (Architectural) if:
  //    - We are on the specific landing page (/babysvomming-asker)
  //    - OR the global theme is 'nordic' (Light Mode)
  const useNordicStyle = location.pathname === '/babysvomming-asker' || theme === 'nordic';

  // 2. We use "Nordic Dark" (Stone/Warm Black) ONLY if:
  //    - We are on the specific landing page AND the theme is NOT 'nordic' (Dark Mode)
  //    - (Global 'nordic' theme is always Light)
  const isNordicDark = location.pathname === '/babysvomming-asker' && theme !== 'nordic';

  // 3. Fallback is "Tech Style" (Cyan/Black):
  //    - Only used on other pages when theme is NOT 'nordic'.

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

  // 1. Nordic Light (White/Slate)
  // 2. Nordic Dark (Stone/Warm Black) - REPLACES the "Tech" look for this page
  // 3. Default Tech (Cyan/Black) - For other pages


  const getNavClasses = () => {
      // SCENARIO 1: Nordic Style (Architectural)
      if (useNordicStyle) {
          if (isNordicDark) {
             // NORDIC DARK (Stone/Warm Black)
             return `fixed w-full z-50 transition-all duration-500 ${scrolled
                ? 'bg-[#0c0a09]/90 backdrop-blur-md shadow-sm border-b border-white/5 py-2' 
                : 'bg-transparent border-b border-transparent py-4'
             }`;
          } else {
             // NORDIC LIGHT (Original - RESTORED)
             return `fixed w-full z-50 transition-all duration-500 ${scrolled
                ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-100 py-2'
                : 'bg-transparent border-b border-transparent py-4'
             }`;
          }
      }
      
      // SCENARIO 2: Tech Style (Cyan/Black)
      return `fixed w-full z-50 transition-all duration-300 ${scrolled
        ? 'bg-primary/80 backdrop-blur-md shadow-[0_4px_35px_rgba(34,211,238,0.25)] border-b border-cyan-400/30'
        : 'bg-transparent border-b border-transparent'
      }`;
  };

  const navClasses = getNavClasses();
  
  // Colors helpers
  const getTextColors = () => {
     if (useNordicStyle) {
         if (isNordicDark) {
             // Nordic Dark
             return {
                 text: scrolled ? 'text-[#f5f5f4]' : 'text-[#f5f5f4]',
                 hover: 'hover:text-stone-300',
                 logoMain: 'text-[#f5f5f4]',
                 logoSub: 'text-stone-400',
                 link: 'text-stone-300'
             };
         }
         // Nordic Light (Original)
         return {
             text: scrolled ? 'text-slate-900' : 'text-slate-800',
             hover: 'hover:text-amber-600',
             logoMain: 'text-slate-900',
             logoSub: 'text-slate-500',
             link: 'text-slate-600'
         };
     }
     // Default Tech
     return {
         text: 'text-white',
         hover: 'hover:text-cyan-300',
         logoMain: 'text-white',
         logoSub: 'text-cyan-400',
         link: 'text-slate-300'
     };
  };

  const colors = getTextColors();

  const textMainColor = colors.text;
  const textHoverColor = colors.hover;
  const logoTextMain = colors.logoMain;
  const logoTextSub = colors.logoSub;
  const linkColor = colors.link;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group" onClick={handleLogoClick}>
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex items-center justify-center transition-all duration-500 
                ${useNordicStyle 
                    ? (isNordicDark ? 'bg-white/5 border border-white/10' : 'bg-slate-100 shadow-inner') 
                    : 'bg-black shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                }`}>
              <img
                src="/images/logo_fish.jpg"
                alt="Idrettsbarna Logo"
                className={`w-full h-full object-cover object-[center_15%] transition-transform duration-700 
                    ${useNordicStyle 
                        ? (isNordicDark ? 'scale-100 opacity-90 brightness-110' : 'scale-100 opacity-90 mix-blend-multiply')
                        : 'scale-110 group-hover:scale-125'
                    }`}
              />
            </div>
            <div className="flex flex-col">
              <span className={`transition-colors duration-500 font-bold text-lg md:text-xl tracking-tight leading-none ${logoTextMain} ${!useNordicStyle && 'group-hover:text-cyan-300 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]'}`}>
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
                  className={`px-3 py-2 rounded-md transition-all duration-300 relative group text-sm font-medium ${linkColor} ${textHoverColor} ${!useNordicStyle && 'hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]'}`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left ${useNordicStyle ? (isNordicDark ? 'bg-stone-500' : 'bg-slate-900') : 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'}`}></span>
                </a>
              ))}

              {/* Theme Toggle Button */}
              <button 
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 
                    ${useNordicStyle 
                        ? (isNordicDark ? 'bg-white/5 text-stone-300 hover:bg-white/10 hover:text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200') 
                        : 'bg-white/10 text-cyan-200 hover:bg-white/20 hover:text-white'
                    }`}
                title={isNordicDark ? "Bytt til lys modus" : "Bytt til mørk modus"}
              >
                {isNordicDark || (!useNordicStyle && theme !== 'nordic') ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              <a
                href="#schedule"
                onClick={(e) => {
                  e.preventDefault();
                  trackEvent('click_cta', { event_category: 'Navbar', event_label: 'Ta kontakt' });
                  if (onOpenContact) onOpenContact();
                }}
                className={useNordicStyle 
                  ? (isNordicDark 
                        ? "px-6 py-2.5 rounded-full border border-stone-600 text-[#f5f5f4] font-medium text-sm hover:bg-white hover:text-stone-950 transition-all"
                        : "px-6 py-2.5 rounded-full bg-slate-900 text-white font-medium text-sm hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    )
                  : "group relative px-6 py-2.5 rounded-full overflow-hidden shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] transition-all hover:-translate-y-0.5"
                }
              >
                {!useNordicStyle && (
                   <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#22d3ee_50%,transparent_100%)] animate-spin-slow opacity-40 group-hover:opacity-80 transition-opacity" />
                )}
                <div className={`${useNordicStyle ? '' : 'relative h-full w-full bg-cyan-950/80 hover:bg-cyan-950/60 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors px-4'}`}>
                  <span className={`${useNordicStyle ? (isNordicDark ? 'text-inherit' : 'text-white') : 'text-cyan-200 group-hover:text-white'} text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors`}>
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
                className={`p-2 rounded-full transition-all duration-300 
                    ${useNordicStyle 
                        ? (isNordicDark ? 'bg-white/5 text-stone-300' : 'bg-slate-100 text-slate-600') 
                        : 'bg-white/10 text-cyan-200'
                    }`}
              >
                {isNordicDark || (!useNordicStyle && theme !== 'nordic') ? <Sun size={18} /> : <Moon size={18} />}
              </button>

            <button
              onClick={(e) => {
                e.preventDefault();
                trackEvent('click_cta', { event_category: 'Navbar Mobile', event_label: 'Ta kontakt' });
                if (onOpenContact) onOpenContact();
              }}
              className={useNordicStyle
                 ? (isNordicDark 
                        ? "hidden md:flex px-5 py-2 rounded-full border border-stone-600 text-stone-200 text-xs font-bold uppercase tracking-wider gap-2 items-center"
                        : "hidden md:flex px-5 py-2 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider gap-2 items-center"
                    )
                 : "hidden md:flex group relative px-5 py-2 rounded-full overflow-hidden shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] transition-all hover:-translate-y-0.5 items-center gap-2"
              }
            >
              {!useNordicStyle && (
                 <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#22d3ee_50%,transparent_100%)] animate-spin-slow opacity-40 group-hover:opacity-80 transition-opacity" />
              )}
              <div className={`${useNordicStyle ? '' : 'relative h-full w-full bg-cyan-950/80 hover:bg-cyan-950/60 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors px-3 py-1'}`}>
                <span className={`${useNordicStyle ? (isNordicDark ? 'text-inherit' : 'text-white') : 'text-cyan-200 group-hover:text-white'} text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors`}>
                  Ta kontakt <ArrowRight size={14} />
                </span>
              </div>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-md focus:outline-none transition-colors 
                  ${useNordicStyle 
                      ? (isNordicDark ? 'text-stone-300 hover:bg-white/5' : 'text-slate-800 hover:bg-slate-100')
                      : 'text-cyan-400 hover:text-cyan-200 hover:bg-cyan-500/10'
                  }`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={`lg:hidden transition-all duration-300 
            ${useNordicStyle 
                ? (isNordicDark ? 'bg-[#0c0a09]/95 border-b border-white/5' : 'bg-white/95 border-b border-slate-200') // Stone 950
                : 'bg-slate-950/95 backdrop-blur-xl border-b border-cyan-500/20 shadow-2xl'
            }`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`block px-3 py-4 rounded-md text-base font-medium transition-colors ${
                  useNordicStyle 
                    ? (isNordicDark 
                        ? 'text-stone-400 hover:bg-white/5 hover:text-white border-b border-white/5 last:border-0' 
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border-b border-slate-100 last:border-0')
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