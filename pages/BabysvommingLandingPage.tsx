import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Check, MapPin, Star, Heart, Droplets, ArrowRight, Plus, Minus, ShieldCheck, Award, ThermometerSun, Users, Sparkles, Camera } from 'lucide-react';
import { Theme } from '../types';

interface BabysvommingLandingPageProps {
  theme: Theme;
}

const BabysvommingLandingPage: React.FC<BabysvommingLandingPageProps> = ({ theme }) => {
  const navigate = useNavigate();

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
      }
    }
  ];

  return (
    <>
      <Helmet>
        <title>Babysvømming i Asker – Trygge og lekbaserte kurs | Lær å svømme</title>
        <meta name="description" content="Babysvømming i Asker. Trygge kurs for babyer fra 6 uker. Varmt vann, små grupper og erfarne instruktører på Risenga." />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      {/* Main Container - Stone/Paper Background */}
      <div className="bg-[#FAFAF9] text-slate-900 font-sans min-h-screen selection:bg-slate-200 selection:text-slate-900">
        
        {/* === SECTION 1: HERO & INTRO === */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 border-b border-slate-200 overflow-hidden">
           <div className="container mx-auto max-w-7xl grid lg:grid-cols-12 gap-16 items-start">
              
              <div className="lg:col-span-7 space-y-10 z-10 relative">
                 <div className="space-y-6">
                    <span className="block text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 pl-1">
                       Kurs i Asker
                    </span>
                    <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-light leading-[1.1] tracking-tight text-slate-900">
                       Babysvømming i Asker<br/>
                       <span className="italic text-slate-500 text-3xl md:text-5xl block mt-4">– trygge og lekbaserte kurs for de minste</span>
                    </h1>
                 </div>

                 <div className="space-y-6 text-lg md:text-xl text-slate-600 font-light leading-relaxed max-w-xl">
                    <p>
                       Hos <strong className="font-medium text-slate-900">Lær å svømme / Idrettsbarna</strong> tilbyr vi babysvømming i Asker for babyer fra 6 ukers alder, forutsatt at navlen er grodd og barnet veier minst 4 kg.
                    </p>
                    <p>
                       Kursene foregår i trygge omgivelser med varmt vann, og med instruktører som har lang erfaring med baby- og småbarnsvømming.
                    </p>
                    <p className="italic text-slate-500 border-l-2 border-slate-300 pl-4">
                       "Babysvømming handler ikke om å lære å svømme alene – men om trygghet, mestring og positive opplevelser i vann, sammen med mor eller far."
                    </p>
                 </div>

                 <div className="flex flex-col sm:flex-row gap-6 pt-6">
                    <button 
                       onClick={() => navigate('/kurs/baby')}
                       className="px-8 py-4 bg-slate-900 text-white rounded-full text-sm font-bold tracking-widest uppercase hover:bg-slate-800 transition-all hover:px-10 duration-300 flex items-center gap-3 shadow-lg"
                    >
                       Se kursdatoer <ArrowRight size={16} />
                    </button>
                    <button 
                       onClick={() => document.getElementById('details')?.scrollIntoView({ behavior: 'smooth' })}
                       className="px-8 py-4 bg-transparent border border-slate-300 text-slate-900 rounded-full text-sm font-bold tracking-widest uppercase hover:bg-white hover:border-slate-400 transition-all"
                    >
                       Mer info
                    </button>
                 </div>
              </div>

              <div className="lg:col-span-5 relative mt-10 lg:mt-0">
                 <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white shadow-2xl rotate-1 hover:rotate-0 transition-all duration-700">
                    <div className="absolute inset-0 border-[8px] border-white z-10 pointer-events-none" />
                    <img 
                       src="/images/baby_swimming_bw.jpg" 
                       alt="Mor og barn i vann"
                       className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                 </div>
                  <p className="text-right text-[10px] uppercase tracking-widest text-slate-400 mt-4">
                     Foto: Even Hjartholm
                  </p>
                 {/* Decorative elements */}
                 <div className="absolute -z-10 top-10 right-10 w-full h-full border border-slate-300 rounded-[2rem] hidden lg:block" />
              </div>
           </div>
        </section>


        {/* === SECTION 2: STICKY SCROLL DEEP DIVE === */}
        <section id="details" className="border-b border-slate-200">
           <div className="grid lg:grid-cols-2">
              
              {/* STICKY IMAGE (Left) */}
              <div className="relative h-screen sticky top-0 hidden lg:block bg-slate-100 overflow-hidden">
                 <img 
                    src="/images/baby_underwater_bw.jpg" 
                    alt="Baby under vann"
                    className="w-full h-full object-cover grayscale opacity-90"
                 />
                 <div className="absolute inset-0 bg-slate-900/10 mix-blend-multiply" />
                 <div className="absolute bottom-12 left-12 right-12 text-white/80 text-xs tracking-widest uppercase">
                    Foto: Even Hjartholm
                 </div>
              </div>

              {/* SCROLLING CONTENT (Right) */}
              <div className="py-24 px-8 md:px-20 lg:py-32 bg-white space-y-24">
                 
                 {/* Hva er... */}
                 <div className="space-y-6">
                    <span className="inline-block px-3 py-1 border border-slate-300 rounded-full text-[10px] uppercase tracking-widest font-semibold text-slate-600">
                       Om aktiviteten
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif text-slate-900">Hva er babysvømming?</h2>
                    <p className="text-lg text-slate-600 leading-relaxed font-light">
                       Babysvømming er en rolig og strukturert aktivitet der foreldre og baby er sammen i vannet. Gjennom lek, sang og enkle øvelser:
                    </p>
                    <ul className="grid gap-4 mt-6">
                       {[
                          "Blir babyen trygg i vann",
                          "Styrkes balanse og motorikk",
                          "Lærer foreldrene sikre måter å håndtere baby i vann på"
                       ].map((item, i) => (
                          <li key={i} className="flex items-center gap-4 p-4 border border-slate-100 rounded-xl hover:border-slate-300 transition-colors">
                             <Check size={18} className="text-slate-900" />
                             <span className="text-slate-800 font-medium">{item}</span>
                          </li>
                       ))}
                    </ul>
                    <p className="text-lg text-slate-600 leading-relaxed font-light mt-4">
                       Alt skjer på babyens premisser – uten tvang eller stress.
                    </p>
                 </div>

                 {/* Slik foregår det */}
                 <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-serif text-slate-900">Slik foregår kursene</h2>
                    <p className="text-lg text-slate-600 leading-relaxed font-light">
                       Våre babysvømmekurs i Asker er bygget opp i små grupper, slik at alle får god oppfølging.
                       En typisk time inneholder:
                    </p>
                    <ul className="space-y-4 border-l-2 border-slate-200 pl-6">
                        {["Rolig tilvenning til vann", "Flyteøvelser og bevegelse", "Enkle dykke- og undervannsopplevelser (alltid frivillig)", "Lek, sang og nærhet mellom forelder og barn"].map((item, i) => (
                           <li key={i} className="text-slate-700 font-light text-lg">
                              {item}
                           </li>
                        ))}
                    </ul>
                 </div>

                 {/* Når kan baby starte */}
                 <div className="space-y-6">
                    <h2 className="text-3xl md:text-4xl font-serif text-slate-900">Når kan baby starte?</h2>
                    <p className="text-lg text-slate-600 leading-relaxed font-light">Baby kan starte på babysvømming når:</p>
                    <div className="flex flex-wrap gap-3">
                       {["Babyen er minst 6 uker gammel", "Navlen er helt grodd", "Babyen veier minst 4 kg"].map((tag, i) => (
                          <span key={i} className="px-4 py-2 bg-[#FAFAF9] border border-slate-200 text-slate-700 rounded-full text-sm font-medium">
                             {tag}
                          </span>
                       ))}
                    </div>
                    <p className="text-slate-500 text-sm">Dette gjør at kroppen er klar for varme og aktivitet i vann.</p>
                 </div>

              </div>
           </div>
        </section>


        {/* === SECTION 3: INSTRUCTORS (NEW) === */}
        <section className="py-24 px-6 bg-[#FAFAF9] border-b border-slate-200">
           <div className="container mx-auto max-w-5xl">
              <div className="text-center mb-16">
                 <h2 className="text-4xl font-serif text-slate-900 mb-4">Møt Instruktørene</h2>
                 <p className="text-slate-600 font-light max-w-2xl mx-auto">
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
                       <h3 className="text-2xl font-serif text-slate-900">Even Hjartholm</h3>
                       <p className="text-slate-500 uppercase tracking-widest text-xs mt-1">Hovedinstruktør & Daglig Leder</p>
                    </div>
                 </div>

                 {/* Instructor 2 */}
                 <div className="flex flex-col items-center text-center space-y-6">
                    <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white shadow-xl">
                       <img src="/images/lotte.jpg" alt="Lotte Vestengen" className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <h3 className="text-2xl font-serif text-slate-900">Lotte Vestengen</h3>
                       <p className="text-slate-500 uppercase tracking-widest text-xs mt-1">Hovedinstruktør</p>
                    </div>
                 </div>
              </div>
           </div>
        </section>


        {/* === SECTION 4: WHY US & GALLERI === */}
        <section className="py-24 px-6 bg-white">
           <div className="container mx-auto max-w-7xl space-y-20">
              
              <div className="text-center max-w-3xl mx-auto space-y-6">
                 <h2 className="text-4xl font-serif text-slate-900">Hvorfor velge oss?</h2>
                 <p className="text-xl text-slate-600 font-light">
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
                     <div key={i} className="bg-[#FAFAF9] p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all group">
                        <div className="mb-6 inline-block p-3 bg-white rounded-full border border-slate-100 group-hover:border-slate-300 transition-colors">
                           <card.Icon size={32} strokeWidth={1} className="text-slate-700" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 font-serif">{card.title}</h3>
                        <p className="text-slate-600 font-light text-sm leading-relaxed">{card.text}</p>
                     </div>
                  ))}
              </div>

              {/* Underwater Photography - Refined Nordic Art Gallery Layout */}
              <div className="py-32 border-t border-slate-100">
                 <div className="grid lg:grid-cols-12 gap-16 items-start">
                    
                    {/* Text Content - Serene & Informative */}
                    <div className="lg:col-span-5 space-y-12 sticky top-32">
                       <div className="space-y-6">
                          <div className="flex items-center gap-3 text-slate-400 text-xs tracking-[0.2em] uppercase font-medium">
                             <Camera size={16} strokeWidth={1.5} />
                             <span>Fotografering</span>
                          </div>
                          
                          <h2 className="text-4xl md:text-5xl font-serif text-slate-900 leading-tight">
                             Et minne for livet
                          </h2>
                          
                          <div className="space-y-6 text-slate-600 font-light text-lg leading-relaxed">
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
                       <div className="pt-8 border-t border-slate-200">
                          <p className="font-serif text-xl text-slate-900 mb-6">Teamet bak bildene</p>
                          <div className="grid grid-cols-2 gap-8">
                             <div>
                                <h4 className="font-medium text-slate-900 text-sm">Even Hjartholm</h4>
                                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">Fotograf</p>
                                <p className="text-slate-600 font-light text-sm mt-2">Fanger øyeblikket og lyset under vann.</p>
                             </div>
                             <div>
                                <h4 className="font-medium text-slate-900 text-sm">Lotte Vestengen</h4>
                                <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">I vannet</p>
                                <p className="text-slate-600 font-light text-sm mt-2">Sikrer trygge dykk og ro mad babyen.</p>
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Images - Clean Separated Gallery */}
                    <div className="lg:col-span-7 flex gap-6 md:gap-12 items-start">
                       
                       {/* Image 1 - Pushed down for visual rhythm */}
                       <div className="w-1/2 mt-12 md:mt-20 space-y-4">
                          <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
                             <img 
                                src="/images/kids_underwater_bw.jpg" 
                                alt="Undervannsfoto av barn" 
                                className="w-full h-full object-cover grayscale opacity-95 hover:scale-105 transition-transform duration-[1.5s]" 
                             />
                          </div>
                          <p className="font-serif italic text-center text-slate-500 text-sm">Magiske øyeblikk i vannet</p>
                       </div>

                       {/* Image 2 - Aligned top */}
                       <div className="w-1/2 space-y-4">
                          <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl bg-slate-100">
                             <img 
                                src="/images/baby_swimming_bw.jpg" 
                                alt="Baby og instruktør" 
                                className="w-full h-full object-cover grayscale opacity-95 hover:scale-105 transition-transform duration-[1.5s]" 
                             />
                          </div>
                          <p className="font-serif italic text-center text-slate-500 text-sm">Trygghet og nærhet</p>
                       </div>

                    </div>

                 </div>
              </div>

           </div>
        </section>


        {/* === SECTION 5: FAQ & CTA === */}
        <section className="py-24 px-6 bg-[#FAFAF9] border-t border-slate-200">
           <div className="container mx-auto max-w-3xl space-y-20">
              
              {/* FAQ */}
              <div className="space-y-12">
                 <h2 className="text-3xl font-serif text-slate-900 text-center">Ofte stilte spørsmål</h2>
                 <div className="space-y-4">
                    {[
                       { q: "Er babysvømming trygt?", a: "Ja. Når det gjennomføres riktig, er babysvømming både trygt og anbefalt. Instruktørene følger faste rutiner og tar alltid hensyn til barnets signaler." },
                       { q: "Må baby dykke?", a: "Nei. Dykking er alltid frivillig. Noen babyer liker det tidlig, andre senere – begge deler er helt normalt." },
                       { q: "Hva bør vi ta med?", a: "Badebleie (obligatorisk), håndkle, og eventuelt våtdrakt til baby (valgfritt)." }
                    ].map((item, i) => (
                       <details key={i} className="group bg-white rounded-2xl open:bg-white border border-transparent open:border-slate-200 transition-all cursor-pointer shadow-sm">
                          <summary className="flex items-center justify-between p-6 font-medium text-lg text-slate-900 list-none">
                             {item.q}
                             <Plus className="text-slate-400 group-open:rotate-45 transition-transform" />
                          </summary>
                          <div className="px-6 pb-6 text-slate-600 leading-relaxed">
                             {item.a}
                          </div>
                       </details>
                    ))}
                 </div>
              </div>

              {/* Final CTA */}
              <div className="text-center space-y-8 pt-12 border-t border-slate-200">
                 <h2 className="text-4xl md:text-5xl font-serif text-slate-900">
                    Meld på babysvømming i Asker
                 </h2>
                 <p className="text-xl text-slate-600 font-light max-w-xl mx-auto">
                    Ønsker du å gi babyen en trygg og positiv start i vann?
                 </p>
                 <button 
                    onClick={() => navigate('/kurs/baby')}
                    className="px-12 py-6 bg-slate-900 text-white rounded-full font-bold text-xl hover:bg-slate-800 transition-all shadow-2xl hover:shadow-3xl hover:-translate-y-1 duration-300 flex items-center gap-3 mx-auto"
                 >
                    Meld på nå <ArrowRight />
                 </button>
                 <p className="text-sm text-slate-400 uppercase tracking-widest">
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

