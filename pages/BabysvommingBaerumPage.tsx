import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Check, MapPin, Heart, ArrowRight, Plus, ShieldCheck, Award, ThermometerSun, Users, Calendar, CreditCard, Mail, Clock, Car, Navigation } from 'lucide-react';
import { Theme } from '../types';

interface BabysvommingBaerumPageProps {
  theme: Theme;
}

const BabysvommingBaerumPage: React.FC<BabysvommingBaerumPageProps> = ({ theme }) => {
  const navigate = useNavigate();

  const isNordic = theme === 'nordic';

  // Theme Configuration
  const colors = {
      bg: isNordic ? 'bg-[#FAFAF9]' : 'bg-[#0c0a09]',
      sectionBg: isNordic ? 'bg-white' : 'bg-[#1c1917]',
      sectionBgAlt: isNordic ? 'bg-[#FAFAF9]' : 'bg-[#0c0a09]',
      text: isNordic ? 'text-slate-900' : 'text-[#f5f5f4]',
      textMuted: isNordic ? 'text-slate-600' : 'text-[#a8a29e]',
      textLight: isNordic ? 'text-slate-500' : 'text-[#78716c]',
      border: isNordic ? 'border-slate-200' : 'border-[#292524]',
      cardBg: isNordic ? 'bg-white' : 'bg-[#1c1917]',
      cardBgAlt: isNordic ? 'bg-[#FAFAF9]' : 'bg-[#0c0a09]',
      icon: isNordic ? 'text-slate-900' : 'text-[#e7e5e4]',
      buttonPrimary: isNordic ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-[#f5f5f4] text-[#0c0a09] hover:bg-[#e7e5e4]',
      buttonSecondary: isNordic ? 'bg-transparent border-slate-300 text-slate-900 hover:bg-white' : 'bg-transparent border-[#44403c] text-[#f5f5f4] hover:bg-[#1c1917]',
  };

  // Full SEO Text
  const fullSeoText = `
    Babysvømming for deg som bor i Bærum – kurs på Risenga Svømmehall i Asker, bare 10–15 minutter fra Sandvika.
    Hos Lær å svømme / Idrettsbarna tilbyr vi babysvømming for babyer fra 6 ukers alder i varmtvannsbassenget på Risenga Svømmehall.
    Mange familier fra Bærum, Sandvika, Lysaker, Stabekk, Bekkestua og Høvik velger oss for de gode fasilitetene, varmt vann (34°C) og erfarne instruktører med over 15 års erfaring.
    Vi tilbyr babysvømming på onsdager og torsdager, med nybegynner- og øvet-nivå.
    Prisen er kr 185 per gang (halvårskurs kr 2 035). Det er enkelt å hoppe inn midt i kurset – prisen justeres automatisk.
    Risenga Svømmehall ligger rett ved E18 med god parkering, og er den nærmeste svømmehallen med varmtvannsbasseng for babysvømming for mange i Bærum.
  `;

  // Structured Data
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Babysvømming for Bærum – Risenga Svømmehall",
      "description": fullSeoText,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Idrettsbarna - Lær å svømme",
        "url": "https://www.xn--lrsvmme-fxah8p.no",
        "telephone": "+4741906445",
        "email": "Even@idrettsbarna.no",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Risenga Svømmehall, Risengaveien 13",
          "addressLocality": "Asker",
          "postalCode": "1387",
          "addressCountry": "NO"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 59.8333,
          "longitude": 10.4333
        },
        "areaServed": [
          { "@type": "City", "name": "Bærum" },
          { "@type": "City", "name": "Asker" },
          { "@type": "City", "name": "Sandvika" }
        ]
      },
      "areaServed": ["Bærum", "Asker", "Sandvika", "Lysaker", "Stabekk", "Bekkestua"],
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "In-person",
        "location": {
          "@type": "Place",
          "name": "Risenga Svømmehall",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Asker",
            "postalCode": "1387"
          }
        }
      },
      "offers": {
        "@type": "Offer",
        "price": "185",
        "priceCurrency": "NOK",
        "availability": "https://schema.org/InStock",
        "url": "https://www.xn--lrsvmme-fxah8p.no/kurs/baby"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Finnes det babysvømming i Bærum?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Idrettsbarna tilbyr babysvømming på Risenga Svømmehall i Asker, bare 10–15 minutter fra Sandvika i Bærum. Mange familier fra Bærum velger oss for det varme bassenget (34°C) og de erfarne instruktørene."
          }
        },
        {
          "@type": "Question",
          "name": "Hvor lang tid tar det å kjøre fra Bærum til Risenga?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fra Sandvika tar det ca. 10–15 minutter via E18. Fra Lysaker/Stabekk ca. 15–20 minutter. Risenga Svømmehall har god parkering rett utenfor."
          }
        },
        {
          "@type": "Question",
          "name": "Hva koster babysvømming?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Et halvårskurs koster kr 2 035, som tilsvarer ca. 185 kr per gang. Du kan hoppe inn midt i kurset – prisen justeres automatisk."
          }
        },
        {
          "@type": "Question",
          "name": "Hvor gammel må babyen være for babysvømming?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Babyen kan starte fra 6 ukers alder, forutsatt at navlen er grodd og barnet veier minst 4 kg."
          }
        },
        {
          "@type": "Question",
          "name": "Hvorfor velge Risenga i stedet for Bærum?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Risenga Svømmehall har et dedikert varmtvannsbasseng som holder 34 grader – perfekt temperatur for babyer. Instruktørene har over 15 års erfaring, og vi tilbyr små grupper med personlig oppfølging. Kort vei fra Bærum via E18."
          }
        }
      ]
    }
  ];

  // Scroll Parallax
  const [scrollY, setScrollY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    handleResize();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Driving distances from Bærum areas
  const drivingDistances = [
    { from: "Sandvika", time: "ca. 11 min", km: "10 km" },
    { from: "Høvik", time: "ca. 16 min", km: "13 km" },
    { from: "Stabekk", time: "ca. 16 min", km: "15 km" },
    { from: "Kolsås", time: "ca. 17 min", km: "15 km" },
    { from: "Lysaker", time: "ca. 18 min", km: "17 km" },
    { from: "Bekkestua", time: "ca. 20 min", km: "16 km" },
  ];

  return (
    <>
      <Helmet>
        <title>Babysvømming Bærum | Risenga Svømmehall | 10 min fra Sandvika | Idrettsbarna</title>
        <meta name="description" content="Babysvømming for deg i Bærum! Kurs på Risenga Svømmehall i Asker – bare 10 min fra Sandvika. Varmt vann (34°C), erfarne instruktører, fra 6 uker. Kr 185/gang." />
        <link rel="canonical" href="https://www.læråsvømme.no/babysvomming-baerum" />
        <meta property="og:title" content="Babysvømming Bærum | Nærmeste kurs på Risenga" />
        <meta property="og:description" content="Bor du i Bærum? Nærmeste babysvømming er på Risenga i Asker. 34°C varmt vann, erfarne instruktører, fra 6 uker. Meld på i dag!" />
        <meta property="og:url" content="https://www.læråsvømme.no/babysvomming-baerum" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className={`${colors.bg} ${colors.text} font-sans min-h-screen selection:bg-slate-200 selection:text-slate-900 relative z-10 transition-colors duration-500`}>
        
        {/* === SECTION 1: HERO === */}
        <section className={`relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 border-b ${colors.border} overflow-hidden`}>
           <div className="container mx-auto max-w-7xl grid lg:grid-cols-12 gap-16 items-start">
              
              <div 
                  className="lg:col-span-7 space-y-10 z-10 relative will-change-transform"
                  style={{ transform: isDesktop ? `translateY(${scrollY * 0.15}px)` : 'none' }}
              >
                 <div className="space-y-6">
                    <span className={`block text-xs font-semibold tracking-[0.2em] uppercase ${colors.textLight} pl-1`}>
                       Babysvømming nær Bærum
                    </span>
                    <h1 className={`text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-light leading-[1.1] tracking-tight ${colors.text}`}>
                       Babysvømming<br/>for deg i Bærum
                       <span className={`italic ${colors.textLight} text-2xl md:text-3xl block mt-4`}>– Bare 10 minutter fra Sandvika til Risenga</span>
                    </h1>
                 </div>

                 <div className={`space-y-6 text-lg md:text-xl ${colors.textMuted} font-light leading-relaxed max-w-xl`}>
                    <p>
                       Bor du i <strong className={`font-medium ${colors.text}`}>Bærum</strong> og leter etter babysvømming? 
                       Hos Idrettsbarna holder vi kurs i det flotte varmtvannsbassenget på <strong className={`font-medium ${colors.text}`}>Risenga Svømmehall i Asker</strong> — bare en kort kjøretur fra Sandvika, Lysaker, Bekkestua og Høvik.
                    </p>
                    <p>
                       Med 34°C varmt vann, erfarne instruktører og små grupper er Risenga et fantastisk sted for babysvømming — og mange familier fra Bærum har allerede funnet veien hit.
                    </p>
                 </div>

                 <div className="flex flex-col sm:flex-row gap-6 pt-6">
                    <button 
                       onClick={() => navigate('/kurs/baby')}
                       className={`px-8 py-4 ${colors.buttonPrimary} rounded-full text-sm font-bold tracking-widest uppercase transition-all hover:px-10 duration-300 flex items-center gap-3 shadow-lg`}
                    >
                       Se kursdatoer <ArrowRight size={16} />
                    </button>
                    <button 
                       onClick={() => navigate('/babysvomming-asker')}
                       className={`px-8 py-4 ${colors.buttonSecondary} rounded-full text-sm font-bold tracking-widest uppercase transition-all border`}
                    >
                       Les mer om kursene
                    </button>
                 </div>
              </div>

              <div 
                  className="lg:col-span-5 relative mt-10 lg:mt-0 will-change-transform"
                  style={{ transform: isDesktop ? `translateY(${scrollY * 0.05}px)` : 'none' }}
              >
                 <div className={`relative aspect-[4/5] overflow-hidden rounded-[2rem] ${colors.cardBg} shadow-2xl rotate-1 hover:rotate-0 transition-all duration-700`}>
                    <div className="absolute inset-0 border-[8px] border-white/10 z-10 pointer-events-none" />
                    <img 
                       src="/images/baby_swimming_bw.jpg" 
                       alt="Babysvømming for familier fra Bærum på Risenga Svømmehall"
                       className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                 </div>
                  <p className={`text-right text-[10px] uppercase tracking-widest ${colors.textLight} mt-4`}>
                     Foto: Even Hjartholm
                  </p>
                 <div className={`absolute -z-10 top-10 right-10 w-full h-full border ${colors.border} rounded-[2rem] hidden lg:block`} />
              </div>
           </div>
        </section>

        {/* === SECTION 2: KJØREAVSTANDER === */}
        <section className={`py-16 px-6 ${colors.sectionBg} border-b ${colors.border}`}>
           <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-12">
                 <span className={`inline-block px-3 py-1 border ${colors.border} rounded-full text-[10px] uppercase tracking-widest font-semibold ${colors.textMuted} mb-4`}>
                    Avstand fra Bærum
                 </span>
                 <h2 className={`text-4xl font-serif ${colors.text}`}>Hvorfor foreldre fra Bærum velger Risenga</h2>
                 <p className={`${colors.textMuted} font-light max-w-2xl mx-auto`}>
                    Mange familier fra Sandvika, Lysaker og Bekkestua kjører den korte turen til Risenga for babysvømming. Her er hva de setter pris på:
                 </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                 {drivingDistances.map((d, i) => (
                    <div key={i} className={`${colors.cardBgAlt} p-5 rounded-2xl border ${colors.border} text-center hover:border-slate-400 transition-colors`}>
                       <Car size={20} className={`mx-auto mb-3 ${colors.textLight}`} />
                       <p className={`font-serif text-lg ${colors.text} mb-1`}>{d.from}</p>
                       <p className={`text-2xl font-bold ${colors.text}`}>{d.time}</p>
                       <p className={`text-xs ${colors.textLight} mt-1`}>{d.km} via E18</p>
                    </div>
                 ))}
              </div>
           </div>
        </section>

        {/* === SECTION 3: PRAKTISK INFO === */}
        <section className={`py-12 px-6 ${colors.sectionBgAlt} border-b ${colors.border}`}>
           <div className="container mx-auto max-w-6xl">
              <div className="grid md:grid-cols-3 gap-6">
                 <div className={`${colors.cardBg} p-6 rounded-2xl border ${colors.border} flex flex-col items-center text-center shadow-sm`}>
                    <div className={`w-12 h-12 rounded-full ${isNordic ? 'bg-slate-100' : 'bg-slate-800'} flex items-center justify-center mb-4`}>
                       <Calendar size={24} className={colors.icon} />
                    </div>
                    <h3 className={`text-lg font-serif ${colors.text} mb-2`}>Neste Oppstart</h3>
                    <p className={`${colors.text} font-bold text-xl`}>15. og 16. april 2026</p>
                    <p className={`${colors.textMuted} text-sm mt-1`}>Vårsemester (11 kursdager)</p>
                 </div>

                 <div className={`${colors.cardBg} p-6 rounded-2xl border ${colors.border} flex flex-col items-center text-center shadow-sm`}>
                    <div className={`w-12 h-12 rounded-full ${isNordic ? 'bg-slate-100' : 'bg-slate-800'} flex items-center justify-center mb-4`}>
                       <CreditCard size={24} className={colors.icon} />
                    </div>
                    <h3 className={`text-lg font-serif ${colors.text} mb-2`}>Pris</h3>
                    <p className={`${colors.text} font-bold text-xl`}>kr 185,- <span className="text-sm font-normal text-slate-500">/ gang</span></p>
                    <p className={`${colors.textMuted} text-sm mt-1`}>Faktureres for gjenværende dager</p>
                 </div>

                 <div className={`${colors.cardBg} p-6 rounded-2xl border ${colors.border} flex flex-col items-center text-center shadow-sm`}>
                    <div className={`w-12 h-12 rounded-full ${isNordic ? 'bg-slate-100' : 'bg-slate-800'} flex items-center justify-center mb-4`}>
                       <Mail size={24} className={colors.icon} />
                    </div>
                    <h3 className={`text-lg font-serif ${colors.text} mb-2`}>Spørsmål?</h3>
                    <a href="mailto:Even@idrettsbarna.no" className={`text-lg font-medium ${colors.text} hover:underline decoration-1 underline-offset-4`}>
                       Even@idrettsbarna.no
                    </a>
                    <p className={`${colors.textMuted} text-sm mt-1`}>Vi svarer raskt!</p>
                 </div>
              </div>
           </div>
        </section>

        {/* === SECTION 4: HVORFOR RISENGA === */}
        <section className={`py-24 px-6 ${colors.sectionBg}`}>
           <div className="container mx-auto max-w-7xl space-y-16">
              
              <div className="text-center max-w-3xl mx-auto space-y-6">
                 <h2 className={`text-4xl font-serif ${colors.text}`}>Derfor velger familier fra Bærum oss</h2>
                 <p className={`text-xl ${colors.textMuted} font-light`}>
                    Risenga i Asker er et populært valg for familier fra hele Bærum. Her er det foreldrene trekker frem:
                 </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                  {[
                     { Icon: ThermometerSun, title: "34°C varmt vann", text: "Varmtvannsbassenget på Risenga har perfekt temperatur for babyer – varmere enn vanlige basseng." },
                     { Icon: Award, title: "15+ års erfaring", text: "Instruktørene har lang erfaring med baby- og småbarnsvømming. Trygghet og kvalitet i fokus." },
                     { Icon: Users, title: "Små grupper", text: "Tett og personlig oppfølging for hver familie. Alle får god veiledning." },
                     { Icon: ShieldCheck, title: "Fra 6 uker", text: "Babyen kan starte allerede fra 6 ukers alder – tidligere enn hos de fleste andre tilbydere." },
                     { Icon: Navigation, title: "Rett ved E18", text: "Enkel adkomst fra Bærum via E18. God parkering rett utenfor døren." },
                     { Icon: Heart, title: "Fleksibel oppstart", text: "Du kan hoppe inn midt i kurset – prisen justeres automatisk for gjenværende dager." },
                  ].map((card, i) => (
                     <div key={i} className={`${colors.cardBgAlt} p-8 rounded-2xl shadow-sm border ${colors.border} hover:shadow-md transition-all group`}>
                        <div className={`mb-6 inline-block p-3 ${isNordic ? 'bg-white' : 'bg-slate-800'} rounded-full border ${colors.border} group-hover:border-slate-300 transition-colors`}>
                           <card.Icon size={32} strokeWidth={1} className={isNordic ? 'text-slate-700' : 'text-slate-200'} />
                        </div>
                        <h3 className={`text-lg font-bold ${colors.text} mb-2 font-serif`}>{card.title}</h3>
                        <p className={`${colors.textMuted} font-light text-sm leading-relaxed`}>{card.text}</p>
                     </div>
                  ))}
              </div>
           </div>
        </section>


        {/* === SECTION 5: FAQ === */}
        <section className={`py-24 px-6 ${colors.sectionBgAlt} border-t ${colors.border}`}>
           <div className="container mx-auto max-w-3xl space-y-20">
              
              <div className="space-y-12">
                 <h2 className={`text-3xl font-serif ${colors.text} text-center`}>Ofte stilte spørsmål om babysvømming i Bærum</h2>
                 <div className="space-y-4">
                    {[
                       { q: "Finnes det babysvømming i Bærum?", a: "Idrettsbarna tilbyr babysvømming på Risenga Svømmehall i Asker – bare 10–15 minutter fra Sandvika. Mange familier fra Bærum, Lysaker, Bekkestua og Høvik velger oss for det varme bassenget og de erfarne instruktørene." },
                       { q: "Hvor lang tid tar det å kjøre fra Sandvika?", a: "Fra Sandvika tar det ca. 10–12 minutter via E18. Risenga Svømmehall har god parkering rett utenfor." },
                       { q: "Hva koster babysvømming?", a: "Et halvårskurs koster kr 2 035, ca. 185 kr per gang. Du kan hoppe inn midt i kurset – prisen justeres automatisk." },
                       { q: "Hvor gammel må babyen være?", a: "Fra 6 uker, forutsatt at navlen er grodd og barnet veier minst 4 kg." },
                       { q: "Hva er forskjellen mellom dere og Asker Svømmeklubb?", a: "Hos oss er inngang til bassenget inkludert i prisen, og du trenger ikke betale medlemskontingent. Vi tilbyr også profesjonell undervannsfotografering som en del av kursopplevelsen. Baby kan starte allerede fra 6 uker (mot 2 måneder hos ASK)." },
                       { q: "Hvilket basseng brukes?", a: "Varmtvannsbassenget på Risenga Svømmehall i Asker. Vannet holder 34 grader – perfekt for babyer." }
                    ].map((item, i) => (
                       <details key={i} className={`group ${colors.sectionBg} rounded-2xl open:${colors.sectionBg} border border-transparent open:${colors.border} transition-all cursor-pointer shadow-sm`}>
                          <summary className={`flex items-center justify-between p-6 font-medium text-lg ${colors.text} list-none`}>
                             {item.q}
                             <Plus className={`${colors.textLight} group-open:rotate-45 transition-transform`} />
                          </summary>
                          <div className={`px-6 pb-6 ${colors.textMuted} leading-relaxed`}>
                             {item.a}
                          </div>
                       </details>
                    ))}
                 </div>
              </div>

              {/* Final CTA */}
              <div className={`text-center space-y-8 pt-12 border-t ${colors.border}`}>
                 <h2 className={`text-4xl md:text-5xl font-serif ${colors.text}`}>
                    Meld på babysvømming
                 </h2>
                 <p className={`text-xl ${colors.textMuted} font-light max-w-xl mx-auto`}>
                    Bor du i Bærum? Gi babyen en trygg og positiv start i vann — bare en kort kjøretur unna.
                 </p>
                 <button 
                    onClick={() => navigate('/kurs/baby')}
                    className={`px-12 py-6 ${colors.buttonPrimary} rounded-full font-bold text-xl transition-all shadow-2xl hover:shadow-3xl hover:-translate-y-1 duration-300 flex items-center gap-3 mx-auto`}
                 >
                    Se kurs og meld på <ArrowRight />
                 </button>
                 <p className={`text-sm ${colors.textLight} uppercase tracking-widest`}>
                    Risenga Svømmehall · 10 min fra Sandvika
                 </p>
              </div>

           </div>
        </section>

      </div>
    </>
  );
};

export default BabysvommingBaerumPage;
