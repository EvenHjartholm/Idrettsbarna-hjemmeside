import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { MapPin, Star, Check, ArrowRight } from 'lucide-react';
import { Theme } from '../types';

interface BabysvommingRisengaPageProps {
  theme: Theme;
}

const BabysvommingRisengaPage: React.FC<BabysvommingRisengaPageProps> = ({ theme }) => {
  const navigate = useNavigate();

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

      {/* Hero Section - Focused on Risenga */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-blue-50/30">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 border border-blue-200 text-blue-800 font-medium text-sm animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
              <MapPin size={16} fill="currentColor" />
              <span>Risenga Svømmehall, Asker</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-txt-primary leading-tight tracking-tight">
              Babysvømming på Risenga
            </h1>

            <p className="text-xl text-txt-secondary max-w-2xl mx-auto leading-relaxed">
              Velkommen til våre populære kurs i <strong>Risenga Svømmehall i Asker</strong>. 
              Her nyter vi godt av et eget <strong>varmtvannsbasseng (34°C)</strong> som er perfekt for de minste.
            </p>

            <div className="flex justify-center pt-8">
              <button 
                onClick={() => navigate('/kurs/baby')}
                className="px-8 py-4 bg-accent text-white rounded-2xl font-bold text-lg hover:bg-accent-hover transition-all shadow-lg flex items-center gap-3"
              >
                <span>Se ledige plasser på Risenga</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Risenga Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="space-y-8">
                <h2 className="text-3xl font-serif text-txt-primary">Hvorfor velge Risenga Svømmehall?</h2>
                <div className="space-y-4">
                  {[
                    "Eget opplæringsbasseng med 34°C i vannet",
                    "Hev/senk-bunn som gir trygg dybde for foreldre",
                    "Store, moderne garderober med fasiliteter for baby",
                    "Sentralt i Asker med god parkering"
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-black/5 shadow-sm">
                       <Check size={20} className="text-green-600 shrink-0 mt-0.5" />
                       <span className="font-medium text-txt-secondary">{item}</span>
                    </div>
                  ))}
                </div>
                <p className="text-txt-secondary italic">
                   "Risenga er et av Norges flotteste badeanlegg, og fasilitetene for babysvømming er i toppklasse."
                </p>
             </div>
             
             {/* Map / Image placeholder */}
             <div className="rounded-3xl overflow-hidden shadow-2xl bg-slate-100 aspect-video relative group">
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium z-0">
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
                    className="relative z-10 grayscale hover:grayscale-0 transition-all duration-500 opacity-80 hover:opacity-100"
                 />
             </div>
        </div>
      </div>

    </>
  );
};

export default BabysvommingRisengaPage;
