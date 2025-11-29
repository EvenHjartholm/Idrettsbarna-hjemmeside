import React from 'react';
import { Theme } from '../App';
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                    <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                        <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                            <Heart className="text-cyan-400" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Vår lidenskap</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Vår intensjon er å jobbe tett opp mot deltagerne og gi gode kurs med god veiledning.
                            Det å jobbe med barn og voksne i vann er noe vi brenner for, og resultatet er mange
                            fornøyde kunder som blir med videre på våre svømmekurs.
                        </p>
                    </div>

                    <div className="bg-slate-900/50 p-8 rounded-3xl border border-white/5 hover:border-cyan-500/30 transition-colors">
                        <div className="w-12 h-12 bg-cyan-500/10 rounded-xl flex items-center justify-center mb-6">
                            <History className="text-cyan-400" size={24} />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Vår historie</h2>
                        <p className="text-slate-300 leading-relaxed">
                            Vi har hatt stabile kurs siden 2011 frem til dags dato. Vi tilbyr et bredt spekter av aktiviteter:
                            babysvømming, småbarnsvømming, svømmekurs for barn, crawlkurs for voksne, vanntrim og livredningskurs.
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
                                <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                    LH
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Lotte Hemmingby</h3>
                                    <p className="text-cyan-400 font-medium">Instruktør & Administrator</p>
                                </div>
                            </div>
                            <div className="space-y-4 text-slate-300 leading-relaxed">
                                <p>
                                    Lotte har bred og lang erfaring med å jobbe med barn. Babysvømming, småbarnsvømming
                                    og barnesvømming har hun holdt på med i over 11 år.
                                </p>
                                <p>
                                    Hun lever seg inn i gruppen og er superflink til å få med seg voksne og barn.
                                    Lotte er opptatt av at barn skal være trygge i vann og at det skal være artig å gå
                                    på svømmekurs for å få god progresjon.
                                </p>
                                <p className="text-sm text-slate-400 pt-4 border-t border-white/5">
                                    Til daglig har hun to barn, jobber som leder i administrasjonen på Montessoriskolen i Drammen,
                                    og driver Badebarna.no.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Even */}
                    <div className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10 flex flex-col">
                        <div className="p-8 flex-1">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                                    EH
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white">Even Hjartholm</h3>
                                    <p className="text-cyan-400 font-medium">Hovedinstruktør</p>
                                </div>
                            </div>
                            <div className="space-y-4 text-slate-300 leading-relaxed">
                                <p>
                                    Even er 46 år gammel og har jobbet 14 år som svømmeinstruktør i Asker.
                                    Han har nå valgt å ta med seg kunnskapen og erfaringen for å starte egne svømmekurs på Risenga.
                                </p>
                                <p>
                                    Kursene han holder blir "rett på sak" på en positiv måte for at læringskurven på barna
                                    skal nå nye høyder. Barna elsker mestring, og det er hovedfokuset på kursene han holder.
                                </p>
                                <div className="flex items-center gap-2 text-cyan-400 pt-4 border-t border-white/5">
                                    <Award size={18} />
                                    <span className="text-sm font-medium">Får mye gode tilbakemeldinger</span>
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
