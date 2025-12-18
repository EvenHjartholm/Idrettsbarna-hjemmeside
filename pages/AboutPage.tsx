import React from 'react';
import { Theme } from '../types';
import { Users, Heart, History, Award } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface AboutPageProps {
    theme?: Theme;
}

const AboutPage: React.FC<AboutPageProps> = ({ theme }) => {
    return (
        <div className="pt-32 pb-20 px-4 min-h-screen bg-slate-950">
            <Helmet>
                <title>Om oss | Idrettsbarna | Svømmekurs i Asker</title>
                <meta name="description" content="Møt instruktørene Lotte Hemmingby og Even Hjartholm. Idrettsbarna har tilbudt svømmekurs i Asker siden 2011. Vi brenner for trygghet og glede i vann." />
                <link rel="canonical" href="https://www.læråsvømme.no/om-oss" />
            </Helmet>
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                        Om <span className="text-cyan-400">oss</span>
                    </h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                        Lær å svømme har holdt på siden 2011 og er en del av Asker Triathlonklubb.
                        Vi brenner for å skape trygghet og glede i vann for både store og små.
                    </p>
                </div>

                {/* Main Content / Philosophy */}
                {/* Main Content / Philosophy */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                        <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                            <Heart className="text-cyan-400" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Vår lidenskap</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Vår intensjon er å jobbe tett med deltakerne og tilby kurs med høy kvalitet og god veiledning. 
                            Arbeidet i vann med både barn og voksne er noe vi virkelig brenner for, og resultatet er mange 
                            fornøyde deltakere som fortsetter hos oss over tid.
                        </p>
                    </div>

                    <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                        <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                            <History className="text-cyan-400" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Vår historie</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Lær å svømme har vært aktiv siden 2011 og har hatt stabile og populære kurs frem til i dag. 
                            Virksomheten er tilknyttet Asker Triathlonklubb. Vi tilbyr babysvømming, småbarnsvømming, 
                            svømmekurs for barn, crawlkurs for voksne, vanntilvenning og livredningskurs.
                        </p>
                    </div>
                </div>

                {/* Instructors Section */}
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                    Møt instruktørene
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Lotte */}
                    <div className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10 flex flex-col">
                        <div className="p-8 flex-1">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-white/10 shrink-0">
                                    <img 
                                        src="/images/lotte.jpg" 
                                        alt="Lotte Hemmingby" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Lotte Hemmingby</h3>
                                    <p className="text-cyan-400 font-medium">Hovedinstruktør</p>
                                </div>
                            </div>
                            <div className="space-y-4 text-slate-300 leading-relaxed">
                                <p>
                                    Lotte Hemmingby har bred og lang erfaring med arbeid med barn, og har i over 20 år jobbet 
                                    med babysvømming, småbarnsvømming og barnesvømming. Hun er svært dyktig til å skape 
                                    trygghet i gruppen, og er kjent for sitt gode samspill med både barn og foreldre.
                                </p>
                                <p>
                                    Lotte har tidligere jobbet ved Montessoriskolen, studerer psykisk helse og jobber i dag 
                                    på skole ved siden av svømmekursene. Denne kombinasjonen gir henne en sterk faglig bakgrunn 
                                    og god forståelse for barns behov, både i og utenfor vann.
                                </p>
                                <p className="text-sm text-slate-400 pt-4 border-t border-white/5">
                                    Hun er opptatt av at barn skal føle seg trygge i vann, samtidig som kursene er lekne, 
                                    motiverende og legger til rette for god progresjon.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Even */}
                    <div className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10 flex flex-col">
                        <div className="p-8 flex-1">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-2 border-white/10 shrink-0">
                                    <img 
                                        src="/images/even.jpg" 
                                        alt="Even Hjartholm" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Even Hjartholm</h3>
                                    <p className="text-cyan-400 font-medium">Hovedinstruktør</p>
                                </div>
                            </div>
                            <div className="space-y-4 text-slate-300 leading-relaxed">
                                <p>
                                    Even Hjartholm har over 20 års erfaring som svømmeinstruktør, og har i mange år jobbet 
                                    med svømmeopplæring for barn i Asker. Han har tatt med seg all sin erfaring og kompetanse 
                                    videre til egne svømmekurs på Risenga.
                                </p>
                                <p>
                                    Kursene Even holder er tydelige, strukturerte og tilpasset barnas nivå.
                                </p>
                                <p className="text-sm text-slate-400 pt-4 border-t border-white/5">
                                    Han er opptatt av mestring, trygghet og læringsglede. Barna trives svært godt på kursene hans, 
                                    og han får gjennomgående svært gode tilbakemeldinger fra foreldre.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
