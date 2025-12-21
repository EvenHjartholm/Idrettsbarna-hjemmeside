import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Check, MapPin, Star, Heart, Droplets, ArrowRight, Plus, Minus, ShieldCheck, Award, ThermometerSun, Users, Sparkles, Camera, Calendar, CreditCard, Mail } from 'lucide-react';
import { Theme } from '../types';
import SeaCreature from '../components/SeaCreature';

interface BabysvommingLandingPageProps {
  theme: Theme;
}

const BabysvommingLandingPage: React.FC<BabysvommingLandingPageProps> = ({ theme }) => {
  const navigate = useNavigate();

  const isNordic = theme === 'nordic';

  // Theme Configuration
  const colors = {
      bg: isNordic ? 'bg-[#FAFAF9]' : 'bg-[#0c0a09]', // Stone 950 for dark mode (Warm Black)
      sectionBg: isNordic ? 'bg-white' : 'bg-[#1c1917]', // Stone 900
      sectionBgAlt: isNordic ? 'bg-[#FAFAF9]' : 'bg-[#0c0a09]',
      text: isNordic ? 'text-slate-900' : 'text-[#f5f5f4]', // Stone 100
      textMuted: isNordic ? 'text-slate-600' : 'text-[#a8a29e]', // Stone 400
      textLight: isNordic ? 'text-slate-500' : 'text-[#78716c]', // Stone 500
      border: isNordic ? 'border-slate-200' : 'border-[#292524]', // Stone 800
      cardBg: isNordic ? 'bg-white' : 'bg-[#1c1917]',
      cardBgAlt: isNordic ? 'bg-[#FAFAF9]' : 'bg-[#0c0a09]',
      icon: isNordic ? 'text-slate-900' : 'text-[#e7e5e4]', // Stone 200
      buttonPrimary: isNordic ? 'bg-slate-900 text-white hover:bg-slate-800' : 'bg-[#f5f5f4] text-[#0c0a09] hover:bg-[#e7e5e4]', // High contrast white/stone button
      buttonSecondary: isNordic ? 'bg-transparent border-slate-300 text-slate-900 hover:bg-white' : 'bg-transparent border-[#44403c] text-[#f5f5f4] hover:bg-[#1c1917]',
  };

  // Full SEO Text for Schema (Hidden but readable by bots)
  const fullSeoText = `
    Babysvømming i Asker – trygge og lekbaserte kurs for de minste.
    Hos Lær å svømme / Idrettsbarna tilbyr vi babysvømming i Asker for babyer fra 6 ukers alder, forutsatt at navlen er grodd og barnet veier minst 4 kg.
    Kursene foregår i trygge omgivelser med varmt vann, og med instruktører som har lang erfaring med baby- og småbarnsvømming.
    Babysvømming handler ikke om å lære å svømme alene – men om trygghet, mestring og positive opplevelser i vann, sammen med mor eller far.
    Hva er babysvømming?
    Babysvømming er en rolig og strukturert aktivitet der foreldre og baby er sammen i vannet. Gjennom lek, sang og enkle øvelser blir babyen trygg i vann, styrkes balanse og motorikk, og foreldrene lærer sikre måter å håndtere baby i vann på. Alt skjer på babyens premisser – uten tvang eller stress.
    Babysvømming i Asker – slik foregår kursene. Våre babysvømmekurs i Asker er bygget opp i små grupper, slik at alle får god oppfølging.
    En typisk time inneholder: Rolig tilvenning til vann, Flyteøvelser og bevegelse, Enkle dykke- og undervannsopplevelser (alltid frivillig), Lek, sang og nærhet mellom forelder og barn. Forelder er alltid med i vannet sammen med baby.
    Når kan baby starte på babysvømming? Baby kan starte når babyen er minst 6 uker gammel, navlen er helt grodd, og babyen veier minst 4 kg. Dette gjør at kroppen er klar for varme og aktivitet i vann.
    Hvorfor velge babysvømming hos Lær å svømme i Asker? Fokus på trygghet og barnets signaler, Erfarne og sertifiserte instruktører, Varmt og barnevennlig basseng, Små grupper og personlig oppfølging, Kurs i Asker (bl.a. Risenga / nærområdet).
  `;

  // Structured Data
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Babysvømming i Asker",
      "description": fullSeoText,
      "provider": {
        "@type": "Organization",
        "name": "Lær å svømme / Idrettsbarna",
        "url": "https://www.xn--lrsvmme-fxah8p.no"
      },
      "areaServed": "Asker",
      "instructor": [
        {
          "@type": "Person",
          "name": "Even Hjartholm"
        },
        {
          "@type": "Person",
          "name": "Lotte Vestengen"
        }
      ],
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "In-person",
        "location": "Risenga Svømmehall"
      },
      "offers": {
        "@type": "Offer",
        "price": "185",
        "priceCurrency": "NOK",
        "availability": "https://schema.org/InStock",
        "url": "https://www.xn--lrsvmme-fxah8p.no/kurs/baby"
      }
    }
  ];

  // Scroll Parallax Effect
  const [scrollY, setScrollY] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    
    // Initial check
    handleResize();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Babysvømming i Asker – Lær å svømme | Idrettsbarna</title>
        <meta name="description" content="Trygg og pedagogisk babysvømming i varmtvannsbasseng på Risenga (Asker). Oppstart jan & aug. Meld på i dag! Små grupper og erfarne instruktører." />
        <link rel="canonical" href="https://www.læråsvømme.no/babysvomming-asker" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Main Container - Adaptive Background */}
      <div className={`${colors.bg} ${colors.text} font-sans min-h-screen selection:bg-slate-200 selection:text-slate-900 relative z-10 transition-colors duration-500`}>
        
        {/* === SECTION 1: HERO & INTRO === */}
        <section className={`relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 border-b ${colors.border} overflow-hidden`}>
           <div className="container mx-auto max-w-7xl grid lg:grid-cols-12 gap-16 items-start">
              
              <div 
                  className="lg:col-span-7 space-y-10 z-10 relative will-change-transform"
                  style={{ transform: isDesktop ? `translateY(${scrollY * 0.15}px)` : 'none' }}
              >
                 <div className="space-y-6">
                    <span className={`block text-xs font-semibold tracking-[0.2em] uppercase ${colors.textLight} pl-1`}>
                       Kurs i Asker
                    </span>
                    <h1 className={`text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-light leading-[1.1] tracking-tight ${colors.text}`}>
                       Babysvømming i Asker<br/>
                       <span className={`italic ${colors.textLight} text-3xl md:text-5xl block mt-4`}>– trygge og lekbaserte kurs for de minste</span>
                    </h1>
                 </div>

                 <div className={`space-y-6 text-lg md:text-xl ${colors.textMuted} font-light leading-relaxed max-w-xl`}>
                    <p>
                       Hos <strong className={`font-medium ${colors.text}`}>Lær å svømme / Idrettsbarna</strong> tilbyr vi babysvømming i Asker for babyer fra 6 ukers alder, forutsatt at navlen er grodd og barnet veier minst 4 kg.
                    </p>
                    <p>
                       Kursene foregår i trygge omgivelser med varmt vann, og med instruktører som har lang erfaring med baby- og småbarnsvømming.
                    </p>
                    <p className={`italic ${colors.textLight} border-l-2 ${colors.border} pl-4`}>
                       "Babysvømming handler ikke om å lære å svømme alene – men om trygghet, mestring og positive opplevelser i vann, sammen med mor eller far."
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
                       onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
                       className={`px-8 py-4 ${colors.buttonSecondary} rounded-full text-sm font-bold tracking-widest uppercase transition-all`}
                    >
                       Mer info
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
                       alt="Mor og barn i vann"
                       className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                 </div>
                  <p className={`text-right text-[10px] uppercase tracking-widest ${colors.textLight} mt-4`}>
                     Foto: Even Hjartholm
                  </p>
                 {/* Decorative elements */}
                 <div className={`absolute -z-10 top-10 right-10 w-full h-full border ${colors.border} rounded-[2rem] hidden lg:block`} />
              </div>
           </div>
        </section>

        {/* === SECTION 2: PRAKTISK INFO (MOVED UP FOR VISIBILITY) === */}
        <section className={`py-12 px-6 ${colors.sectionBgAlt} border-b ${colors.border} relative z-20 overflow-hidden`}>
           {isNordic && <SeaCreature type="crab" animation="peek-up" theme={theme} className="bottom-0 right-10 md:right-32 opacity-100" delay={3} />}
           <div className="container mx-auto max-w-6xl relative z-10">
              <div className="grid md:grid-cols-3 gap-6">
                 
                 {/* Kursstart */}
                 <div className={`${colors.cardBg} p-6 rounded-2xl border ${colors.border} flex flex-col items-center text-center shadow-sm`}>
                    <div className={`w-12 h-12 rounded-full ${isNordic ? 'bg-slate-100' : 'bg-slate-800'} flex items-center justify-center mb-4`}>
                       <Calendar size={24} className={colors.icon} />
                    </div>
                    <h3 className={`text-lg font-serif ${colors.text} mb-2`}>Neste Oppstart</h3>
                    <p className={`${colors.text} font-bold text-xl`}>7. og 8. januar 2026</p>
                    <p className={`${colors.textMuted} text-sm mt-1`}>Halvtårskurs (Vårsemester)</p>
                 </div>

                 {/* Pris */}
                 <div className={`${colors.cardBg} p-6 rounded-2xl border ${colors.border} flex flex-col items-center text-center shadow-sm`}>
                    <div className={`w-12 h-12 rounded-full ${isNordic ? 'bg-slate-100' : 'bg-slate-800'} flex items-center justify-center mb-4`}>
                       <CreditCard size={24} className={colors.icon} />
                    </div>
                    <h3 className={`text-lg font-serif ${colors.text} mb-2`}>Pris</h3>
                    <p className={`${colors.text} font-bold text-xl`}>kr 185,- <span className="text-sm font-normal text-slate-500">/ gang</span></p>
                    <p className={`${colors.textMuted} text-sm mt-1`}>Faktureres per semester (ca 23 ganger)</p>
                 </div>

                 {/* Kontakt */}
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

        {/* === SECTION 3: STICKY SCROLL DEEP DIVE === */}
        <section id="details" className={`border-b ${colors.border}`}>
           <div className="grid lg:grid-cols-2">
              
              {/* STICKY IMAGE (Left) */}
              <div className={`relative h-screen sticky top-0 hidden lg:block ${colors.sectionBgAlt} overflow-hidden`}>
                 <img 
                    src="/images/baby_underwater_bw.jpg" 
                    alt="Baby under vann"
                    className="w-full h-full object-cover grayscale opacity-90"
                 />
                 <div className={`absolute inset-0 ${isNordic ? 'bg-slate-900/10' : 'bg-slate-950/40'} mix-blend-multiply`} />
                 <div className="absolute bottom-12 left-12 right-12 text-white/80 text-xs tracking-widest uppercase">
                    Foto: Even Hjartholm
                 </div>
              </div>

              {/* SCROLLING CONTENT (Right) */}
              <div className={`py-24 px-8 md:px-20 lg:py-32 ${colors.sectionBg} space-y-24`}>
                 
                 {/* Hva er... */}
                 <div className="space-y-6">
                    <span className={`inline-block px-3 py-1 border ${colors.border} rounded-full text-[10px] uppercase tracking-widest font-semibold ${colors.textMuted}`}>
                       Om aktiviteten
                    </span>
                    <h2 className={`text-4xl md:text-5xl font-serif ${colors.text}`}>Hva er babysvømming?</h2>
                    <p className={`text-lg ${colors.textMuted} leading-relaxed font-light`}>
                       Babysvømming er en rolig og strukturert aktivitet der foreldre og baby er sammen i vannet. Gjennom lek, sang og enkle øvelser:
                    </p>
                    <ul className="grid gap-4 mt-6">
                       {[
                          "Blir babyen trygg i vann",
                          "Styrkes balanse og motorikk",
                          "Lærer foreldrene sikre måter å håndtere baby i vann på"
                       ].map((item, i) => (
                          <li key={i} className={`flex items-center gap-4 p-4 border ${colors.border} rounded-xl hover:border-slate-400 transition-colors`}>
                             <Check size={18} className={colors.icon} />
                             <span className={`${colors.text} font-medium`}>{item}</span>
                          </li>
                       ))}
                    </ul>
                    <p className={`text-lg ${colors.textMuted} leading-relaxed font-light mt-4`}>
                       Alt skjer på babyens premisser – uten tvang eller stress.
                    </p>
                 </div>

                 {/* Slik foregår det */}
                 <div className="space-y-6">
                    <h2 className={`text-3xl md:text-4xl font-serif ${colors.text}`}>Slik foregår kursene</h2>
                    <p className={`text-lg ${colors.textMuted} leading-relaxed font-light`}>
                       Våre babysvømmekurs i Asker er bygget opp i små grupper, slik at alle får god oppfølging.
                       En typisk time inneholder:
                    </p>
                    <ul className={`space-y-4 border-l-2 ${colors.border} pl-6`}>
                        {["Rolig tilvenning til vann", "Flyteøvelser og bevegelse", "Enkle dykke- og undervannsopplevelser (alltid frivillig)", "Lek, sang og nærhet mellom forelder og barn"].map((item, i) => (
                           <li key={i} className={`${colors.textMuted} font-light text-lg`}>
                              {item}
                           </li>
                        ))}
                    </ul>
                 </div>

                 {/* Når kan baby starte */}
                 <div className="space-y-6">
                    <h2 className={`text-3xl md:text-4xl font-serif ${colors.text}`}>Når kan baby starte?</h2>
                    <p className={`text-lg ${colors.textMuted} leading-relaxed font-light`}>Baby kan starte på babysvømming når:</p>
                    <div className="flex flex-wrap gap-3">
                       {["Babyen er minst 6 uker gammel", "Navlen er helt grodd", "Babyen veier minst 4 kg"].map((tag, i) => (
                          <span key={i} className={`px-4 py-2 ${colors.cardBgAlt} border ${colors.border} ${colors.textMuted} rounded-full text-sm font-medium`}>
                             {tag}
                          </span>
                       ))}
                    </div>
                    <p className={`${colors.textLight} text-sm`}>Dette gjør at kroppen er klar for varme og aktivitet i vann.</p>
                  </div>

                  {/* === LEVELS (NEW) === */}
                  <div id="services" className={`space-y-12 pt-12 border-t ${colors.border}`}>
                     <div className="text-center md:text-left">
                        <span className={`inline-block px-3 py-1 border ${colors.border} rounded-full text-[10px] uppercase tracking-widest font-semibold ${colors.textMuted} mb-4`}>
                           Progresjon
                        </span>
                        <h2 className={`text-3xl md:text-4xl font-serif ${colors.text} mb-4`}>Våre Nivåer (0 - 1 år)</h2>
                        <p className={`text-lg ${colors.textMuted} leading-relaxed font-light max-w-2xl`}>
                           Den røde tråden gjennom alle kursene er å skape mer og mer selvstendighet i vannet. Vi deler inn i tre nivåer for å sikre riktig progresjon.
                        </p>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6">
                        {/* Level 1: Nybegynner */}
                        <div className={`${colors.cardBgAlt} p-6 sm:p-8 rounded-2xl border ${colors.border} hover:border-slate-400 transition-all group overflow-hidden`}>
                           <div className="flex items-center gap-3 mb-4">
                              <span className={`flex items-center justify-center w-8 h-8 min-w-[2rem] shrink-0 rounded-full ${isNordic ? 'bg-slate-900 text-white' : 'bg-slate-700 text-white'} text-sm font-bold`}>1</span>
                              <h3 className={`text-xl font-serif ${colors.text}`}>Baby Nybegynner</h3>
                           </div>
                           <p className={`${colors.textLight} mb-6 font-medium text-xs tracking-widest uppercase`}>Trygghet & Gjentagelse</p>
                           <ul className="space-y-3">
                              {["Gjentagelse av øvelser for trygghet", "Sanglek med skjulte øvelser", "Flyte på rygg & rotasjon", "Fremdrift med benspark"].map((item, i) => (
                                 <li key={i} className={`flex items-start gap-3 ${colors.textMuted} text-sm font-light`}>
                                    <Check size={14} className={`mt-1 ${colors.textLight} shrink-0`} />
                                    <span>{item}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>

                        {/* Level 2: Øvet / Videregående */}
                        <div className={`${colors.cardBg} p-6 sm:p-8 rounded-2xl border ${colors.border} hover:border-slate-400 shadow-sm transition-all group relative overflow-hidden`}>
                           <div className={`absolute top-0 right-0 w-20 h-20 ${colors.cardBgAlt} rounded-bl-full -mr-10 -mt-10`} />
                           <div className="flex items-center gap-3 mb-4 relative z-10">
                              <span className={`flex items-center justify-center w-8 h-8 min-w-[2rem] shrink-0 rounded-full ${isNordic ? 'bg-slate-200 text-slate-900' : 'bg-slate-700 text-white'} text-sm font-bold group-hover:bg-slate-900 group-hover:text-white transition-colors`}>2</span>
                              <h3 className={`text-xl font-serif ${colors.text} leading-tight`}>Baby Øvet / Videregående</h3>
                           </div>
                           <p className={`${colors.textLight} mb-6 font-medium text-xs tracking-widest uppercase`}>Selvstendighet</p>
                           <ul className="space-y-3 relative z-10">
                              {["Videreutvikling av dykk & stup", "Økt svømmedistanse", "Mer selvstendig fremdrift", "Aktive sangleker"].map((item, i) => (
                                 <li key={i} className={`flex items-start gap-3 ${colors.textMuted} text-sm font-light`}>
                                    <Check size={14} className={`mt-1 ${colors.textLight} shrink-0`} />
                                    <span>{item}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>

                        {/* Next Step: Småbarn */}
                        <div className={`${isNordic ? 'bg-[#eff6ff] border-blue-100' : 'bg-slate-800 border-slate-700'} p-6 sm:p-8 rounded-2xl border hover:border-blue-400 transition-all group relative overflow-hidden`}>
                           <div className="flex items-center gap-3 mb-4">
                              <span className={`flex items-center justify-center w-8 h-8 min-w-[2rem] shrink-0 rounded-full ${isNordic ? 'bg-blue-100 text-blue-600' : 'bg-blue-900 text-blue-200'} text-sm font-bold`}>Neste</span>
                              <h3 className={`text-xl font-serif ${colors.text}`}>Småbarn (1-2 år)</h3>
                           </div>
                           <p className={`${colors.textLight} mb-6 font-medium text-xs tracking-widest uppercase`}>Lek & Læring</p>
                           <ul className="space-y-3">
                              {["Neste steg når baby nærmer seg 1 år", "Mer fokus på oppgaveløsing", "Sosialt samspill med andre barn", "Forberedelse til svømmekurs"].map((item, i) => (
                                 <li key={i} className={`flex items-start gap-3 ${colors.textMuted} text-sm font-light`}>
                                    <ArrowRight size={14} className="mt-1 text-blue-400 shrink-0" />
                                    <span>{item}</span>
                                 </li>
                              ))}
                           </ul>
                        </div>
                     </div>
                  </div>

              </div>
           </div>
        </section>


        {/* === SECTION 3: INSTRUCTORS (NEW) === */}
        <section className={`py-24 px-6 ${colors.sectionBgAlt} border-b ${colors.border}`}>
           <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-16">
                 <h2 className={`text-4xl font-serif ${colors.text} mb-4`}>Møt Instruktørene</h2>
                 <p className={`${colors.textMuted} font-light max-w-2xl mx-auto`}>
                    Trygge voksne med lang erfaring i vann. Hos oss møter du de samme fjesene hver gang.
                 </p>
              </div>

              <div className="grid md:grid-cols-2 gap-12 max-w-3xl mx-auto">
                 {/* Instructor 1 */}
                 <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
                       <img src="/images/even.jpg" alt="Even Hjartholm" className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <h3 className={`text-2xl font-serif ${colors.text}`}>Even Hjartholm</h3>
                       <p className={`${colors.textLight} uppercase tracking-widest text-xs mt-1`}>Hovedinstruktør & Daglig Leder</p>
                    </div>
                 </div>

                 {/* Instructor 2 */}
                 <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
                       <img src="/images/lotte.jpg" alt="Lotte Vestengen" className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <h3 className={`text-2xl font-serif ${colors.text}`}>Lotte Vestengen</h3>
                       <p className={`${colors.textLight} uppercase tracking-widest text-xs mt-1`}>Hovedinstruktør</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>


        {/* === SECTION 3b: PRAKTISK INFO (WAS HERE, MOVED UP) === */}


        {/* === SECTION 4: WHY US & GALLERI === */}
        <section className={`py-24 px-6 ${colors.sectionBg}`}>
           <div className="container mx-auto max-w-7xl space-y-20">
              
              <div className="text-center max-w-3xl mx-auto space-y-6">
                 <h2 className={`text-4xl font-serif ${colors.text}`}>Hvorfor velge oss?</h2>
                 <p className={`text-xl ${colors.textMuted} font-light`}>
                    Det finnes flere tilbud om babysvømming i Asker – dette er det foreldrene trekker frem hos oss:
                 </p>
              </div>

              {/* Bento Grid Features - Asker Style */}
              <div className="grid md:grid-cols-3 gap-6">
                  {[
                     { Icon: ShieldCheck, title: "Barnets signaler", text: "Fokus på trygghet og barnets premisser." },
                     { Icon: Award, title: "Erfarne instruktører", text: "Sertifiserte instruktører med lang erfaring." },
                     { Icon: ThermometerSun, title: "Varmt vann", text: "34°C barnevennlig basseng." },
                     { Icon: Users, title: "Små grupper", text: "Tett og personlig oppfølging." },
                     { Icon: MapPin, title: "Lokalt i Asker", text: "Risenga Svømmehall / nærområdet." },
                     { Icon: Sparkles, title: "Gode fasiliteter", text: "Garderober tilrettelagt for små barn." }
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

              {/* Underwater Photography - Refined Nordic Art Gallery Layout */}
              <div className={`py-32 border-t ${colors.border}`}>
                 <div className="grid lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Text Content - Serene & Informative */}
                    <div className="lg:col-span-5 space-y-12 relative lg:sticky lg:top-32 z-20">
                       <div className="space-y-6">
                          <div className={`flex items-center gap-3 ${colors.textLight} text-xs tracking-[0.2em] uppercase font-medium`}>
                             <Camera size={16} strokeWidth={1.5} />
                             <span>Fotografering</span>
                          </div>
                          
                          <h2 className={`text-4xl md:text-5xl font-serif ${colors.text} leading-tight`}>
                             Et minne for livet
                          </h2>
                          
                          <div className={`space-y-6 ${colors.textMuted} font-light text-lg leading-relaxed`}>
                             <p>
                                Mot slutten av kurset setter vi av tid til profesjonell undervannsfotografering. 
                                Selve fotograferingen er en inkludert del av kursopplevelsen.
                             </p>
                             <p>
                                Du får se bildene i ro og mak i etterkant. Det er <strong>ingen kjøpeplikt</strong> – du velger selv om du ønsker å kjøpe bildene etter at du har sett resultatet.
                             </p>
                          </div>
                       </div>

                       {/* Roles / Credits - Architectural Detail */}
                       <div className={`pt-8 border-t ${colors.border}`}>
                          <p className={`font-serif text-xl ${colors.text} mb-6`}>Teamet bak bildene</p>
                          <div className="grid grid-cols-2 gap-8">
                             <div>
                                <h4 className={`font-medium ${colors.text} text-sm`}>Even Hjartholm</h4>
                                <p className={`text-xs ${colors.textLight} uppercase tracking-widest mt-1`}>Fotograf</p>
                                <p className={`${colors.textMuted} font-light text-sm mt-2`}>Fanger øyeblikket og lyset under vann.</p>
                             </div>
                             <div>
                                <h4 className={`font-medium ${colors.text} text-sm`}>Lotte Vestengen</h4>
                                <p className={`text-xs ${colors.textLight} uppercase tracking-widest mt-1`}>I vannet</p>
                                <p className={`${colors.textMuted} font-light text-sm mt-2`}>Sikrer trygge dykk og ro mad babyen.</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Images - Clean Separated Gallery */}
                    <div className="lg:col-span-7 flex gap-6 md:gap-12 items-start relative z-10 pt-12 lg:pt-0">
                       {isNordic && (
                           <>
                               <SeaCreature type="fish" animation="swim-right" theme={theme} className="top-20 left-10 opacity-60" delay={1} />
                               <SeaCreature type="fish" animation="swim-left" theme={theme} className="bottom-20 right-10 opacity-60" delay={4} />
                           </>
                       )}
                       
                       {/* Image 1 - Balanced Lift (Slight Negative Margin) & Parallax */}
                       <div 
                          className="w-1/2 mt-8 lg:-mt-12 space-y-4 will-change-transform" /* Removed negative margin on mobile */
                          style={{ transform: isDesktop ? `translateY(${(scrollY - 2200) * 0.08}px)` : 'none' }}
                       >
                          <div className={`aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ${colors.cardBg}`}>
                             <img 
                                src="/images/kids_underwater_bw.jpg" 
                                alt="Undervannsfoto av barn" 
                                className="w-full h-full object-cover grayscale opacity-95 hover:scale-105 transition-transform duration-[1.5s]" 
                             />
                          </div>
                          <p className={`font-serif italic text-center ${colors.textLight} text-sm`}>Magiske øyeblikk i vannet</p>
                       </div>

                       {/* Image 2 - Aligned Top & Slower Parallax */}
                       <div 
                          className="w-1/2 space-y-4 will-change-transform"
                          style={{ transform: isDesktop ? `translateY(${(scrollY - 2200) * 0.03}px)` : 'none' }}
                       >
                          <div className={`aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ${colors.cardBg}`}>
                             <img 
                                src="/images/baby_swimming_bw.jpg" 
                                alt="Baby og instruktør" 
                                className="w-full h-full object-cover grayscale opacity-95 hover:scale-105 transition-transform duration-[1.5s]" 
                             />
                          </div>
                          <p className={`font-serif italic text-center ${colors.textLight} text-sm`}>Trygghet og nærhet</p>
                       </div>

                    </div>

                 </div>
              </div>

           </div>
        </section>


        {/* === SECTION 5: FAQ & CTA === */}
        <section className={`py-24 px-6 ${colors.sectionBgAlt} border-t ${colors.border}`}>
           <div className="container mx-auto max-w-3xl space-y-20">
              
              {/* FAQ */}
              <div className="space-y-12">
                 <h2 className={`text-3xl font-serif ${colors.text} text-center`}>Ofte stilte spørsmål</h2>
                 <div className="space-y-4">
                    {[
                       { q: "Er babysvømming trygt?", a: "Ja. Når det gjennomføres riktig, er babysvømming både trygt og anbefalt. Instruktørene følger faste rutiner og tar alltid hensyn til barnets signaler." },
                       { q: "Må baby dykke?", a: "Nei. Dykking er alltid frivillig. Noen babyer liker det tidlig, andre senere – begge deler er helt normalt." },
                       { q: "Hva bør vi ta med?", a: "Badebleie (obligatorisk), håndkle, og eventuelt våtdrakt til baby (valgfritt)." }
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
                    Meld på babysvømming i Asker
                 </h2>
                 <p className={`text-xl ${colors.textMuted} font-light max-w-xl mx-auto`}>
                    Ønsker du å gi babyen en trygg og positiv start i vann?
                 </p>
                 <button 
                    onClick={() => navigate('/kurs/baby')}
                    className={`px-12 py-6 ${colors.buttonPrimary} rounded-full font-bold text-xl transition-all shadow-2xl hover:shadow-3xl hover:-translate-y-1 duration-300 flex items-center gap-3 mx-auto`}
                 >
                    Meld på nå <ArrowRight />
                 </button>
                 <p className={`text-sm ${colors.textLight} uppercase tracking-widest`}>
                    Plassene fylles raskt
                 </p>
              </div>

           </div>
        </section>

      </div>
    </>
  );
};

export default BabysvommingLandingPage;

