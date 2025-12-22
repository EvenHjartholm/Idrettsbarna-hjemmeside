import React, { useEffect } from 'react';
import { Theme } from '../types';
import { Users, Heart, History, Award, Quote } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SeaCreature from '../components/SeaCreature';

interface AboutPageProps {
    theme?: Theme;
}

const AboutPage: React.FC<AboutPageProps> = ({ theme }) => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const isNordic = theme === 'nordic';

    // Theme Configuration
    const colors = {
        bg: isNordic ? 'bg-[#FAFAF9]' : 'bg-slate-950',
        text: isNordic ? 'text-slate-900' : 'text-white',
        textMuted: isNordic ? 'text-slate-600' : 'text-slate-400',
        textLight: isNordic ? 'text-slate-500' : 'text-slate-500', 
        cardBg: isNordic ? 'bg-white' : 'bg-slate-900',
        cardBorder: isNordic ? 'border-slate-100' : 'border-slate-800',
        iconBg: isNordic ? 'bg-[#FAFAF9]' : 'bg-slate-800',
        icon: isNordic ? 'text-slate-900' : 'text-cyan-400',
        imageBg: isNordic ? 'bg-slate-100' : 'bg-slate-800',
        quoteBorder: isNordic ? 'border-slate-200' : 'border-cyan-500/30 text-cyan-200',
        sectionTitle: isNordic ? 'text-slate-900' : 'text-white',
        roleText: isNordic ? 'text-slate-400' : 'text-cyan-400',
    };

    return (
        <div className={`pt-32 pb-20 min-h-screen transition-colors duration-500 ${colors.bg} ${colors.text} relative overflow-x-hidden`}>
            <Helmet>
                <title>Om oss | Idrettsbarna | Svømmekurs i Asker</title>
                <meta name="description" content="Møt instruktørene Lotte Hemmingby og Even Hjartholm. Idrettsbarna har tilbudt svømmekurs i Asker siden 2011." />
                <link rel="canonical" href="https://www.læråsvømme.no/om-oss" />
            </Helmet>

            <div className="max-w-7xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-20 md:mb-32 relative">

                    <span className={`block text-xs font-semibold tracking-[0.2em] uppercase mb-6 ${colors.textLight}`}>
                        Vår historie
                    </span>
                    <h1 className={`text-5xl md:text-7xl font-serif mb-8 tracking-tight ${colors.text}`}>
                        Lidenskap for <br/><span className={`italic ${colors.textMuted}`}>trygghet i vann</span>
                    </h1>
                    <p className={`text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed ${colors.textMuted}`}>
                        Lær å svømme har holdt på siden 2011 og er en del av Asker Triathlonklubb.
                        Vi brenner for å skape trygghet og glede i vann for både store og små.
                    </p>
                </div>

                {/* Main Content / Philosophy - Bento Grid Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-32">
                    <div className={`${colors.cardBg} p-10 md:p-12 rounded-[2rem] border ${colors.cardBorder} shadow-sm hover:shadow-md transition-all duration-300 group`}>
                        <div className={`w-14 h-14 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                            <Heart className={colors.icon} size={24} strokeWidth={1.5} />
                        </div>
                        <h2 className={`text-3xl font-serif ${colors.text} mb-6`}>Vår lidenskap</h2>
                        <p className={`${colors.textMuted} leading-relaxed font-light text-lg`}>
                            Vår intensjon er å jobbe tett med deltakerne og tilby kurs med høy kvalitet og god veiledning. 
                            Arbeidet i vann med både barn og voksne er noe vi virkelig brenner for, og resultatet er mange 
                            fornøyde deltakere som fortsetter hos oss over tid.
                        </p>
                    </div>

                    <div className={`${colors.cardBg} p-10 md:p-12 rounded-[2rem] border ${colors.cardBorder} shadow-sm hover:shadow-md transition-all duration-300 group`}>
                        <div className={`w-14 h-14 ${colors.iconBg} rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                            <History className={colors.icon} size={24} strokeWidth={1.5} />
                        </div>
                        <h2 className={`text-3xl font-serif ${colors.text} mb-6`}>Vår historie</h2>
                        <p className={`${colors.textMuted} leading-relaxed font-light text-lg`}>
                            Lær å svømme har vært aktiv siden 2011 og har hatt stabile og populære kurs frem til i dag. 
                            Virksomheten er tilknyttet Asker Triathlonklubb. Vi tilbyr babysvømming, småbarnsvømming, 
                            svømmekurs for barn, crawlkurs for voksne, vanntilvenning og livredningskurs.
                        </p>
                    </div>
                </div>

                {/* Instructors Section */}
                <div className="mb-20">
                    <h2 className={`text-4xl md:text-5xl font-serif text-center mb-20 ${colors.sectionTitle}`}>
                        Møt instruktørene
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                        {/* Lotte */}
                        <div className="flex flex-col gap-8 group">
                            <div className={`aspect-[4/5] w-full overflow-hidden rounded-[2rem] ${colors.imageBg} relative shadow-xl`}>
                                <img 
                                    src="/images/lotte.jpg" 
                                    alt="Lotte Hemmingby" 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2rem]"></div>
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className={`text-3xl font-serif mb-2 ${colors.text}`}>Lotte Hemmingby</h3>
                                <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${colors.roleText}`}>Hovedinstruktør</p>
                                
                                <div className={`space-y-4 font-light leading-relaxed ${colors.textMuted}`}>
                                    <p>
                                        Lotte Hemmingby har bred og lang erfaring med arbeid med barn, og har i over 20 år jobbet 
                                        med babysvømming, småbarnsvømming og barnesvømming. Hun er svært dyktig til å skape 
                                        trygghet i gruppen.
                                    </p>
                                    <div className={`relative pl-6 py-2 border-l-2 italic my-6 ${colors.quoteBorder} ${isNordic ? 'text-slate-500' : 'text-cyan-200/70'}`}>
                                        "Trygghet først – så kommer gleden og mestringen av seg selv."
                                    </div>
                                    <p>
                                        Lotte er utdannet lærer og sosialpedagog, med videreutdanning i psykisk helse, spesialpedagogikk og ledelse.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Even */}
                        <div className="flex flex-col gap-8 group md:mt-20">
                            <div className={`aspect-[4/5] w-full overflow-hidden rounded-[2rem] ${colors.imageBg} relative shadow-xl`}>
                                <img 
                                    src="/images/even.jpg" 
                                    alt="Even Hjartholm" 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2rem]"></div>
                            </div>
                            <div className="text-center md:text-left">
                                <h3 className={`text-3xl font-serif mb-2 ${colors.text}`}>Even Hjartholm</h3>
                                <p className={`text-xs font-bold uppercase tracking-widest mb-6 ${colors.roleText}`}>Hovedinstruktør</p>
                                
                                <div className={`space-y-4 font-light leading-relaxed ${colors.textMuted}`}>
                                    <p>
                                        Even Hjartholm har over 20 års erfaring som svømmeinstruktør, og har i mange år jobbet 
                                        med svømmeopplæring for barn i Asker. Han har tatt med seg all sin erfaring og kompetanse 
                                        videre til egne svømmekurs.
                                    </p>
                                    <div className={`relative pl-6 py-2 border-l-2 italic my-6 ${colors.quoteBorder} ${isNordic ? 'text-slate-500' : 'text-cyan-200/70'}`}>
                                        "Å se et barn knekke koden og flyte for første gang er like magisk hver gang."
                                    </div>
                                    <p>
                                        Kursene Even holder er tydelige, strukturerte og tilpasset barnas nivå.
                                        Han er også profesjonell fotograf og står bak undervannsbildene på kursene.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AboutPage;
