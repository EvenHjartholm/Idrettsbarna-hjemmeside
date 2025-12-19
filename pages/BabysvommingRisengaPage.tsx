import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Check, ArrowRight, CheckCircle } from 'lucide-react';
import { Theme } from '../types';

interface BabysvommingRisengaPageProps {
  theme: Theme;
}

const BabysvommingRisengaPage: React.FC<BabysvommingRisengaPageProps> = ({ theme }) => {
  const navigate = useNavigate();
  const isNordic = theme === 'nordic';

  // Theme Configuration
  const colors = {
      bg: isNordic ? 'bg-[#FAFAF9]' : 'bg-slate-950',
      sectionBg: isNordic ? 'bg-white' : 'bg-slate-900',
      sectionBgAlt: isNordic ? 'bg-[#FAFAF9]' : 'bg-slate-950',
      text: isNordic ? 'text-slate-900' : 'text-white',
      textMuted: isNordic ? 'text-slate-600' : 'text-slate-400',
      textLight: isNordic ? 'text-slate-500' : 'text-slate-500', 
      border: isNordic ? 'border-slate-200' : 'border-slate-800',
      cardBg: isNordic ? 'bg-white' : 'bg-slate-900',
      cardBgAlt: isNordic ? 'bg-[#FAFAF9]' : 'bg-slate-800/50', // Slightly lighter in dark mode for contrast
      icon: isNordic ? 'text-slate-900' : 'text-cyan-400',
      buttonPrimary: isNordic ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-cyan-600 text-white hover:bg-cyan-500',
      tagBg: isNordic ? 'bg-white' : 'bg-slate-800',
      tagText: isNordic ? 'text-slate-800' : 'text-slate-200',
      tagBorder: isNordic ? 'border-slate-200' : 'border-slate-700',
  };

  // Structured Data specific for Risenga
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Babysvømming Risenga",
    "description": "Babysvømming i Risenga Svømmehall i Asker. Varmtvannsbasseng og trygge rammer.",
    "provider": {
      "@type": "Organization",
      "name": "Lær å svømme / Idrettsbarna",
      "sameAs": "https://www.læråsvømme.no"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Risenga, Asker"
    },
    "location": {
      "@type": "Place",
      "name": "Risenga Svømmehall",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Brages vei 8",
        "addressLocality": "Asker",
        "postalCode": "1387",
        "addressCountry": "NO"
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Babysvømming Risenga - Kurs i varmtvannsbasseng | Asker</title>
        <meta 
          name="description" 
          content="Babysvømming på Risenga Svømmehall i Asker. Varmt vann (34°C), sertifiserte instruktører og trygge rammer for din baby. Meld på i dag." 
        />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Main Container - Adaptive Theme */}
      <div className={`${colors.bg} ${colors.text} font-sans min-h-screen relative z-10 transition-colors duration-500`}>
          {/* Hero Section - Focused on Risenga */}
          <section className={`relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden ${colors.sectionBgAlt} border-b ${colors.border}`}>
            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-4xl mx-auto text-center space-y-8">
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${colors.tagBg} border ${colors.tagBorder} ${colors.tagText} font-medium text-sm animate-in fade-in-50 slide-in-from-bottom-4 duration-700 shadow-sm`}>
                  <MapPin size={16} className={colors.textLight} />
                  <span>Risenga Svømmehall, Asker</span>
                </div>
                
                <h1 className={`text-4xl md:text-5xl lg:text-7xl font-serif ${colors.text} leading-[1.1] tracking-tight`}>
                  Babysvømming på Risenga
                </h1>

                <p className={`text-xl ${colors.textMuted} max-w-2xl mx-auto leading-relaxed font-light`}>
                  Velkommen til våre populære kurs i <strong className={colors.text}>Risenga Svømmehall i Asker</strong>. 
                  Her nyter vi godt av et eget <strong className={colors.text}>varmtvannsbasseng (34°C)</strong> som er perfekt for de minste.
                </p>

                <div className="flex justify-center pt-8">
                  <button 
                    onClick={() => navigate('/kurs/baby')}
                    className={`px-10 py-5 ${colors.buttonPrimary} rounded-full font-bold uppercase tracking-widest text-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-4 group`}
                  >
                    <span>Se ledige plasser på Risenga</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Why Risenga Section */}
          <div className={`container mx-auto px-6 py-20 ${colors.sectionBg}`}>
            <div className="grid md:grid-cols-2 gap-16 items-center">
                 <div className="space-y-10">
                    <h2 className={`text-3xl md:text-4xl font-serif ${colors.text} leading-tight`}>Hvorfor velge Risenga Svømmehall?</h2>
                    <div className="space-y-4">
                      {[
                        "Eget opplæringsbasseng med 34°C i vannet",
                        "Hev/senk-bunn som gir trygg dybde for foreldre",
                        "Store, moderne garderober med fasiliteter for baby",
                        "Sentralt i Asker med god parkering"
                      ].map((item, i) => (
                        <div key={i} className={`flex gap-4 p-5 ${colors.cardBgAlt} rounded-2xl border ${colors.border} shadow-sm hover:border-slate-400 transition-colors`}>
                           <CheckCircle size={20} className={`${colors.icon} shrink-0 mt-0.5`} />
                           <span className={`font-light ${colors.textMuted}`}>{item}</span>
                        </div>
                      ))}
                    </div>
                    <p className={`text-slate-500 italic font-serif text-lg border-l-2 ${colors.border} pl-6 py-2`}>
                       "Risenga er et av Norges flotteste badeanlegg, og fasilitetene for babysvømming er i toppklasse."
                    </p>
                 </div>
                 
                 {/* Map / Image placeholder */}
                 <div className={`rounded-[2.5rem] overflow-hidden shadow-2xl ${colors.cardBgAlt} aspect-video relative group border ${colors.border}`}>
                    <div className={`absolute inset-0 flex items-center justify-center ${colors.textLight} font-medium z-0`}>
                       Kart / Bilde av Risenga
                    </div>
                     {/*  Ideally embed a Google Map or an image of Risenga here */}
                     <iframe 
                        title="Kart over Risenga"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2008.3617308734617!2d10.43958731609658!3d59.83447998183921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x464114f7701f5e0b%3A0x6a1a1b1b1b1b1b1b!2sRisenga%20Sv%C3%B8mmehall!5e0!3m2!1sno!2sno!4v1620000000000!5m2!1sno!2sno"
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen 
                        loading="lazy"
                        className="relative z-10 grayscale hover:grayscale-0 transition-opacity duration-700 opacity-90 hover:opacity-100"
                     />
                 </div>
            </div>
          </div>
      </div>

    </>
  );
};

export default BabysvommingRisengaPage;
