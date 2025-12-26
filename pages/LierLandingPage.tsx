import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Phone, Users, Shield, Heart, MapPin, ArrowRight } from 'lucide-react';

const LierLandingPage: React.FC = () => {
    const navigate = useNavigate();

    const scrollToCourses = () => {
        navigate('/', { state: { scrollToSchedule: true } });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Helmet>
                <title>Babysvømming Lier | Kort vei til Risenga Asker | Idrettsbarna</title>
                <meta name="description" content="Babysvømming og svømmekurs for deg i Lier. Idrettsbarna holder til på Risenga i Asker, kun en kort kjøretur unna. Varmt basseng og trygge instruktører." />
                <link rel="canonical" href="https://www.læråsvømme.no/svommekurs-lier" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 bg-white overflow-hidden">
                <div className="container mx-auto max-w-4xl text-center z-10 relative">
                    <span className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block">
                        Kort vei fra Lier
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6 leading-tight">
                        Babysvømming - Kun en kort tur fra Lier <br className="hidden md:block" />
                        <span className="italic text-slate-600 font-light">– Velkommen til Risenga i Asker</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Leter du etter svømmekurs i Lier? <br/>
                        **Idrettsbarna** holder til i det flotte varmtvannsbassenget på Risenga Svømmehall i Asker. Det er kun en svipptur unna Lier, og vel verdt turen for de gode fasilitetene.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button 
                            onClick={scrollToCourses}
                            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1"
                        >
                            Se timeplan for Asker
                        </button>
                        <a 
                            href="tel:41906445"
                            className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 font-medium rounded-full hover:border-blue-300 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <Phone size={18} />
                            Ta gjerne kontakt
                        </a>
                    </div>
                </div>
            </section>

            {/* Courses Overview */}
            <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-serif text-center mb-16 text-slate-900">Våre kurstilbud nær Lier</h2>
                    
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Baby */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                                <Heart size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Babysvømming (3 - 12 mnd)</h3>
                            <p className="text-slate-600 mb-6 text-sm">Start tidlig med gode vannvaner. Vi fokuserer på trygghet, grepsreflekser og det å være komfortabel under vann.</p>
                            <ul className="text-sm text-slate-500 space-y-2 mb-8">
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"/>Styrker båndet</li>
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"/>Koselig aktivitet</li>
                            </ul>
                            <button onClick={scrollToCourses} className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                Les mer <ArrowRight size={16} />
                            </button>
                        </div>

                        {/* Toddler */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                <Shield size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Småbarnssvømming (1 - 5 år)</h3>
                            <p className="text-slate-600 mb-6 text-sm">Her er det mer fart og lek! Barna lærer å flyte, hoppe fra kanten og etter hvert svømme selvstendig.</p>
                             <ul className="text-sm text-slate-500 space-y-2 mb-8">
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-green-400 rounded-full"/>Lek som læringsmetode</li>
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-green-400 rounded-full"/>Svømmeferdigheter</li>
                            </ul>
                            <button onClick={scrollToCourses} className="text-green-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                Les mer <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 px-6 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-slate-900">Hvorfor velge Idrettsbarna?</h2>
                    
                    <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                                <Users size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">Individuell oppfølging</h4>
                                <p className="text-slate-600 text-sm">Vi tilpasser øvelsene slik at alle opplever mestring, uansett utgangspunkt.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                                <Heart size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">Varmt og godt</h4>
                                <p className="text-slate-600 text-sm">Vi bruker varmtvannsbassenget på Risenga Asker, som holder en behagelig temperatur.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">Fokus på sikkerhet</h4>
                                <p className="text-slate-600 text-sm">Lær livsviktige ferdigheter og bli trygg i vannet gjennom lek.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">Kort vei fra Lier</h4>
                                <p className="text-slate-600 text-sm">Risenga ligger kun en kort kjøretur fra Lier, og har gode parkeringsmuligheter.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* FAQ Section */}
             <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-slate-900">Spørsmål og svar</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-2">Hvor holdes kursene?</h4>
                            <p className="text-slate-600 text-sm">Kursene holdes på Risenga Svømmehall i Asker. Det er et av regionens beste anlegg med klorfritt renseanlegg og varmtvannsbasseng.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-2">Hvor lang tid tar det å kjøre fra Lier?</h4>
                            <p className="text-slate-600 text-sm">Fra Lierbyen tar det ca. 10-15 minutter med bil til Risenga. Det er meget enkel adkomst.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-2">Når kan vi starte?</h4>
                            <p className="text-slate-600 text-sm">Dere kan starte når barnet er rundt 3 måneder gammelt. Vi har fortløpende kursstart.</p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                         <h3 className="text-xl font-serif text-slate-900 mb-6">Velkommen til Asker</h3>
                          <p className="text-slate-600 max-w-lg mx-auto mb-8">
                            Vi holder til i Risenga Svømmehall. Ta turen fra Lier for en kvalitetsøkt i vannet med ditt barn.
                            Gratis parkering tilgjengelig.
                         </p>
                         <button 
                            onClick={scrollToCourses}
                            className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1 block mx-auto"
                        >
                            Se timeplan og meld deg på
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default LierLandingPage;
