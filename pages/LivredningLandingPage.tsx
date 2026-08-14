import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, Plus, ShieldCheck, Award, Users, MapPin, Calendar, CreditCard, Mail, Clock, HeartPulse, LifeBuoy, Waves } from 'lucide-react';
import { Theme } from '../types';

interface LivredningLandingPageProps {
  theme: Theme;
}

const PAGE_URL = 'https://www.læråsvømme.no/livredningsprove-barnehage-skole';

const FAQS = [
  {
    q: 'Hvem må ta livredningsprøven?',
    a: 'Livredningsprøven er en årlig, obligatorisk prøve for ansatte i barnehage, skole og SFO som skal ha med barn i eller ved vann. Bestått prøve dokumenterer at dere oppfyller kravene fra Utdanningsdirektoratet.'
  },
  {
    q: 'Hvor holdes livredningsprøven?',
    a: 'Vi kommer til dere! Prøven gjennomføres utendørs i vann eller sjø i nærheten av deres barnehage eller skole, eller i basseng etter avtale. Vi dekker Asker, Bærum, Lier, Drammen, Oslo og omegn.'
  },
  {
    q: 'Hva inneholder livredningsprøven?',
    a: 'Teori og førstehjelp på land (undersøkelse av bevisstløs person, frie luftveier og HLR), deretter praksis i vann: livredningshopp og forlenget arm, 100 meter svømming på mage og rygg, dykking til bunn etter synkedukke, og ilandføring av person 20 meter med påfølgende HLR på øvelsesdukke.'
  },
  {
    q: 'Hva koster livredningsprøven?',
    a: 'Kr 850,- per person. Ta kontakt for tilbud til større grupper, så finner vi en tid som passer deres ansatte.'
  },
  {
    q: 'Hvor lang tid tar kurset?',
    a: 'Hele opplegget tar ca. 1,5–2 timer, inkludert teori, førstehjelp og praktisk gjennomføring i vannet.'
  },
  {
    q: 'Tilbyr dere også førstehjelpskurs og hjertestarterkurs?',
    a: 'Ja. I tillegg til livredningsprøven tilbyr vi hjertestarterkurs der deres ansatte får sertifisering på bruk og forståelse av hjertestarter. Førstehjelp med HLR inngår også i selve livredningskurset. Vi kommer til dere og er fleksible på tid.'
  },
  {
    q: 'Får vi kursbevis?',
    a: 'Ja, alle som består prøven får et godkjent kompetansebevis som er gyldig i ett år.'
  }
];

const LivredningLandingPage: React.FC<LivredningLandingPageProps> = ({ theme }) => {
  const navigate = useNavigate();
  const isNordic = theme === 'nordic';

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
    buttonSecondary: isNordic ? 'bg-transparent border border-slate-300 text-slate-900 hover:bg-white' : 'bg-transparent border border-[#44403c] text-[#f5f5f4] hover:bg-[#1c1917]',
  };

  const openContact = () => {
    navigate('/', { state: { openContactModal: true, selectedServiceId: 'lifesaving' } });
  };

  // Fulltekst for strukturerte data – leses av søkemotorer og AI-boter
  const fullSeoText = `
    Livredningsprøve og førstehjelpskurs for ansatte i barnehage, skole og SFO i Asker, Bærum, Lier, Drammen og Oslo.
    Idrettsbarna / Lær å svømme tilbyr den årlige, obligatoriske livredningsprøven som ansatte må bestå for å kunne ha med barn på tur til vannkanten.
    Kurset holdes av instruktører godkjent av Norges Livredningsselskap og tar ca. 1,5–2 timer.
    Vi kommer til dere: prøven gjennomføres utendørs i vann eller sjø nær deres barnehage eller skole, eller i basseng etter avtale.
    Innhold: teori og forebygging, undersøkelse av bevisstløs person, frie luftveier og HLR (hjerte-lunge-redning),
    livredningshopp og forlenget arm, 100 meter svømming på mage og rygg, dykking til bunn etter synkedukke,
    ilandføring av person 20 meter og direkte HLR på øvelsesdukke. Vi har 4 livredningsdukker.
    Pris kr 850 per person. Godkjent kompetansebevis gyldig i ett år, i tråd med kravene fra Utdanningsdirektoratet.
    Vi tilbyr også hjertestarterkurs med sertifisering på bruk og forståelse av hjertestarter, samt førstehjelp med HLR.
  `;

  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Livredningsprøve for ansatte i barnehage og skole",
      "description": fullSeoText,
      "url": PAGE_URL,
      "provider": {
        "@type": "LocalBusiness",
        "name": "Idrettsbarna - Lær å svømme",
        "url": "https://www.læråsvømme.no",
        "telephone": "+4741906445",
        "email": "Even@idrettsbarna.no",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Brages vei 8",
          "addressLocality": "Asker",
          "postalCode": "1387",
          "addressCountry": "NO"
        }
      },
      "areaServed": [
        { "@type": "City", "name": "Asker" },
        { "@type": "City", "name": "Bærum" },
        { "@type": "City", "name": "Lier" },
        { "@type": "City", "name": "Drammen" },
        { "@type": "City", "name": "Oslo" }
      ],
      "offers": {
        "@type": "Offer",
        "price": 850,
        "priceCurrency": "NOK",
        "availability": "https://schema.org/InStock",
        "url": PAGE_URL
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": FAQS.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    }
  ];

  return (
    <>
      <Helmet>
        <title>Livredningsprøve for barnehage og skole | Førstehjelpskurs | Asker og omegn</title>
        <meta name="description" content="Årlig obligatorisk livredningsprøve for ansatte i barnehage, skole og SFO. Førstehjelp, HLR og hjertestarterkurs. Vi kommer til dere i Asker, Bærum, Lier, Drammen og Oslo. Kr 850,- per person. Godkjent kursbevis." />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content="Livredningsprøve og førstehjelpskurs for barnehage og skole" />
        <meta property="og:description" content="Vi kommer til dere! Godkjent livredningsprøve med førstehjelp og HLR for ansatte. Kursbevis ved bestått prøve. Asker, Bærum, Lier, Drammen og Oslo." />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className={`${colors.bg} ${colors.text} font-sans min-h-screen relative z-10 transition-colors duration-500`}>

        {/* === HERO === */}
        <section className={`relative pt-32 pb-16 lg:pt-44 lg:pb-24 px-6 border-b ${colors.border}`}>
          <div className="container mx-auto max-w-4xl space-y-10">
            <div className="space-y-6">
              <span className={`block text-xs font-semibold tracking-[0.2em] uppercase ${colors.textLight}`}>
                Kurs for barnehage, skole og SFO
              </span>
              <h1 className={`text-4xl md:text-6xl font-serif font-light leading-[1.1] tracking-tight ${colors.text}`}>
                Livredningsprøve for barnehage og skole
                <span className={`italic ${colors.textLight} text-2xl md:text-3xl block mt-4`}>
                  – med førstehjelp og HLR. Vi kommer til dere.
                </span>
              </h1>
            </div>

            <div className={`space-y-6 text-lg md:text-xl ${colors.textMuted} font-light leading-relaxed max-w-2xl`}>
              <p>
                <strong className={`font-medium ${colors.text}`}>Livredningsprøven</strong> er en årlig, obligatorisk
                prøve for ansatte som skal ha med barn i eller ved vann. Vi holder kurset og prøven der det passer
                dere best – utendørs ved vannkanten eller i basseng.
              </p>
              <p>
                Instruktørene våre er godkjent av Norges Livredningsselskap og har lang erfaring med barnehager,
                skoler og svømmeopplæring.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={openContact}
                className={`px-8 py-4 ${colors.buttonPrimary} rounded-full text-sm font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-3 shadow-lg`}
              >
                Book kurs for deres ansatte <ArrowRight size={16} />
              </button>
              <button
                onClick={() => document.getElementById('innhold')?.scrollIntoView({ behavior: 'smooth' })}
                className={`px-8 py-4 ${colors.buttonSecondary} rounded-full text-sm font-bold tracking-widest uppercase transition-all`}
              >
                Se innholdet i kurset
              </button>
            </div>
          </div>
        </section>

        {/* === NØKKELINFO === */}
        <section className={`py-12 px-6 ${colors.sectionBgAlt} border-b ${colors.border}`}>
          <div className="container mx-auto max-w-5xl">
            <div className="grid md:grid-cols-3 gap-6">
              <div className={`${colors.cardBg} p-6 rounded-2xl border ${colors.border} flex flex-col items-center text-center shadow-sm`}>
                <div className={`w-12 h-12 rounded-full ${isNordic ? 'bg-slate-100' : 'bg-slate-800'} flex items-center justify-center mb-4`}>
                  <CreditCard size={24} className={colors.icon} />
                </div>
                <h2 className={`text-lg font-serif ${colors.text} mb-2`}>Pris</h2>
                <p className={`${colors.text} font-bold text-xl`}>Kr 850,- per person</p>
                <p className={`${colors.textMuted} text-sm mt-1`}>Ta kontakt for gruppetilbud</p>
              </div>
              <div className={`${colors.cardBg} p-6 rounded-2xl border ${colors.border} flex flex-col items-center text-center shadow-sm`}>
                <div className={`w-12 h-12 rounded-full ${isNordic ? 'bg-slate-100' : 'bg-slate-800'} flex items-center justify-center mb-4`}>
                  <Clock size={24} className={colors.icon} />
                </div>
                <h2 className={`text-lg font-serif ${colors.text} mb-2`}>Varighet</h2>
                <p className={`${colors.text} font-bold text-xl`}>Ca. 1,5–2 timer</p>
                <p className={`${colors.textMuted} text-sm mt-1`}>Teori, førstehjelp og praksis i vann</p>
              </div>
              <div className={`${colors.cardBg} p-6 rounded-2xl border ${colors.border} flex flex-col items-center text-center shadow-sm`}>
                <div className={`w-12 h-12 rounded-full ${isNordic ? 'bg-slate-100' : 'bg-slate-800'} flex items-center justify-center mb-4`}>
                  <MapPin size={24} className={colors.icon} />
                </div>
                <h2 className={`text-lg font-serif ${colors.text} mb-2`}>Sted</h2>
                <p className={`${colors.text} font-bold text-xl`}>Vi kommer til dere</p>
                <p className={`${colors.textMuted} text-sm mt-1`}>Asker · Bærum · Lier · Drammen · Oslo</p>
              </div>
            </div>
          </div>
        </section>

        {/* === HVEM MÅ TA PRØVEN === */}
        <section className={`py-20 px-6 ${colors.sectionBg} border-b ${colors.border}`}>
          <div className="container mx-auto max-w-4xl space-y-8">
            <h2 className={`text-3xl md:text-4xl font-serif ${colors.text}`}>Hvem må ta livredningsprøven?</h2>
            <div className={`space-y-5 text-lg ${colors.textMuted} font-light leading-relaxed`}>
              <p>
                Alle ansatte i barnehage, skole og SFO som skal ha med barn på tur til vannkanten, må hvert år
                gjennomføre og bestå en livredningsprøve. Kursbeviset dokumenterer at dere oppfyller kravene fra
                Utdanningsdirektoratet, og handler om ferdigheten til å forebygge og håndtere drukningsulykker.
              </p>
              <p>
                Målet vårt er at turen til vannkanten skal være gøy, trygg og trivelig – for både barn og voksne.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {['Barnehageansatte', 'Lærere og skoleansatte', 'SFO-ansatte', 'Årlig fornyelse'].map((tag, i) => (
                <span key={i} className={`px-4 py-2 ${colors.cardBgAlt} border ${colors.border} ${colors.textMuted} rounded-full text-sm font-medium`}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* === INNHOLD === */}
        <section id="innhold" className={`py-20 px-6 ${colors.sectionBgAlt} border-b ${colors.border}`}>
          <div className="container mx-auto max-w-5xl space-y-12">
            <div className="max-w-3xl">
              <h2 className={`text-3xl md:text-4xl font-serif ${colors.text} mb-4`}>Dette inneholder kurset</h2>
              <p className={`text-lg ${colors.textMuted} font-light leading-relaxed`}>
                Livredningskurset består av en teoridel med førstehjelp på land, og en praktisk del i vann som
                avsluttes med selve livredningsprøven.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className={`${colors.cardBg} p-8 rounded-2xl border ${colors.border} shadow-sm`}>
                <div className="flex items-center gap-3 mb-6">
                  <HeartPulse size={24} className={colors.icon} />
                  <h3 className={`text-xl font-serif ${colors.text}`}>Teori og førstehjelp på land</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Planlegging og forebygging – slik blir turen trygg med minst mulig fare for ulykker',
                    'Gruppeoppgaver i teoridelen',
                    'Undersøkelse av bevisstløs person – vi demonstrerer, deretter øver alle selv',
                    'Frie luftveier og HLR (hjerte-lunge-redning) med øvelse for alle deltagere'
                  ].map((item, i) => (
                    <li key={i} className={`flex items-start gap-3 ${colors.textMuted} font-light`}>
                      <Check size={16} className={`mt-1.5 ${colors.textLight} shrink-0`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`${colors.cardBg} p-8 rounded-2xl border ${colors.border} shadow-sm`}>
                <div className="flex items-center gap-3 mb-6">
                  <Waves size={24} className={colors.icon} />
                  <h3 className={`text-xl font-serif ${colors.text}`}>Praksis i vann – selve prøven</h3>
                </div>
                <ul className="space-y-4">
                  {[
                    'Livredningshopp og forlenget arm',
                    'Svøm 100 meter på mage og 100 meter på rygg',
                    'Dykk til bassengets dypeste del og hent opp synkedukke fra bunnen',
                    'Ilandfør en person 20 meter og gjennomfør HLR på øvelsesdukke'
                  ].map((item, i) => (
                    <li key={i} className={`flex items-start gap-3 ${colors.textMuted} font-light`}>
                      <Check size={16} className={`mt-1.5 ${colors.textLight} shrink-0`} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className={`${colors.textLight} text-sm`}>
              Vi stiller med 4 livredningsdukker, slik at gjennomføringen går effektivt selv for større grupper.
            </p>
          </div>
        </section>

        {/* === FØRSTEHJELPSKURS OG HJERTESTARTERKURS === */}
        <section className={`py-20 px-6 ${colors.sectionBg} border-b ${colors.border}`}>
          <div className="container mx-auto max-w-4xl space-y-8">
            <h2 className={`text-3xl md:text-4xl font-serif ${colors.text}`}>Førstehjelpskurs og hjertestarterkurs</h2>
            <div className={`space-y-5 text-lg ${colors.textMuted} font-light leading-relaxed`}>
              <p>
                Førstehjelp med HLR er en fast del av livredningskurset. I tillegg tilbyr vi eget
                <strong className={`font-medium ${colors.text}`}> hjertestarterkurs</strong>, der deres ansatte får
                sertifisering på bruk og forståelse av hjertestarter.
              </p>
              <p>
                Hjertestarterkurset holder vi gjerne hos dere, og vi er fleksible på tidspunkt – på dagtid, etter
                stengetid eller på planleggingsdag.
              </p>
            </div>
            <button
              onClick={openContact}
              className={`px-8 py-4 ${colors.buttonSecondary} rounded-full text-sm font-bold tracking-widest uppercase transition-all flex items-center gap-3`}
            >
              Spør om førstehjelpskurs <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* === HVORFOR OSS === */}
        <section className={`py-20 px-6 ${colors.sectionBgAlt} border-b ${colors.border}`}>
          <div className="container mx-auto max-w-5xl space-y-12">
            <h2 className={`text-3xl md:text-4xl font-serif ${colors.text} text-center`}>Hvorfor velge Idrettsbarna?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { Icon: ShieldCheck, title: 'Godkjente instruktører', text: 'Vi følger Norges Livredningsselskap og er godkjente instruktører.' },
                { Icon: Users, title: 'Erfaring med barnehager', text: 'Lang erfaring med barnehager, skoler og svømmekurs for barn.' },
                { Icon: MapPin, title: 'Vi kommer til dere', text: 'Prøven holdes ved vannet nærmest dere, eller i basseng etter avtale.' },
                { Icon: Award, title: 'Godkjent kursbevis', text: 'Kompetansebevis ved bestått prøve, gyldig i ett år.' }
              ].map((card, i) => (
                <div key={i} className={`${colors.cardBg} p-6 rounded-2xl shadow-sm border ${colors.border}`}>
                  <div className={`mb-4 inline-block p-3 ${isNordic ? 'bg-slate-100' : 'bg-slate-800'} rounded-full`}>
                    <card.Icon size={24} strokeWidth={1.5} className={colors.icon} />
                  </div>
                  <h3 className={`text-lg font-bold ${colors.text} mb-2 font-serif`}>{card.title}</h3>
                  <p className={`${colors.textMuted} font-light text-sm leading-relaxed`}>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* === FAQ & CTA === */}
        <section className={`py-20 px-6 ${colors.sectionBg}`}>
          <div className="container mx-auto max-w-3xl space-y-16">
            <div className="space-y-10">
              <h2 className={`text-3xl font-serif ${colors.text} text-center`}>Ofte stilte spørsmål</h2>
              <div className="space-y-4">
                {FAQS.map((item, i) => (
                  <details key={i} className={`group ${colors.sectionBgAlt} rounded-2xl border ${colors.border} transition-all cursor-pointer shadow-sm`}>
                    <summary className={`flex items-center justify-between p-6 font-medium text-lg ${colors.text} list-none`}>
                      {item.q}
                      <Plus className={`${colors.textLight} group-open:rotate-45 transition-transform shrink-0 ml-4`} />
                    </summary>
                    <div className={`px-6 pb-6 ${colors.textMuted} leading-relaxed`}>
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div className={`text-center space-y-8 pt-12 border-t ${colors.border}`}>
              <LifeBuoy size={40} strokeWidth={1.25} className={`mx-auto ${colors.textLight}`} />
              <h2 className={`text-3xl md:text-4xl font-serif ${colors.text}`}>
                Book livredningsprøve for deres ansatte
              </h2>
              <p className={`text-lg ${colors.textMuted} font-light max-w-xl mx-auto`}>
                Det er mange som skal ha kurs, så det lønner seg å være tidlig ute. Ta kontakt, så finner vi en tid
                som passer dere.
              </p>
              <button
                onClick={openContact}
                className={`px-10 py-5 ${colors.buttonPrimary} rounded-full font-bold text-lg transition-all shadow-2xl hover:-translate-y-1 duration-300 flex items-center gap-3 mx-auto`}
              >
                Ta kontakt <ArrowRight />
              </button>
              <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 text-sm ${colors.textMuted}`}>
                <a href="mailto:Even@idrettsbarna.no" className={`flex items-center gap-2 hover:underline underline-offset-4 ${colors.text}`}>
                  <Mail size={16} /> Even@idrettsbarna.no
                </a>
                <span className="hidden sm:inline">·</span>
                <a href="tel:+4741906445" className={`flex items-center gap-2 hover:underline underline-offset-4 ${colors.text}`}>
                  <Calendar size={16} /> 419 06 445
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LivredningLandingPage;
