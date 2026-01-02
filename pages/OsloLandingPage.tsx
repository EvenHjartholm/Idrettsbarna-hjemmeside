import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Phone, Users, Shield, Heart, MapPin, ArrowRight } from 'lucide-react';

const OsloLandingPage: React.FC = () => {
    const navigate = useNavigate();

    const scrollToCourses = () => {
        navigate('/', { state: { scrollToSchedule: true } });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Helmet>
                <title>Babysvømming Oslo | Svømmekurs for baby og barn - Kort vei fra Oslo</title>
                <meta name="description" content="Leter du etter babysvømming i Oslo? Idrettsbarna på Risenga (Asker) er et populært valg kun 15 min fra Oslo. Varmt vann, erfarne instruktører og enkel parkering." />
                <link rel="canonical" href="https://www.læråsvømme.no/svommekurs-oslo" />
                
                {/* Structured Data for Local Business (AI Search Optimization) */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Idrettsbarna - Babysvømming Oslo (Risenga)",
                        "image": "https://www.læråsvømme.no/assets/logo.png",
                        "url": "https://www.læråsvømme.no/svommekurs-oslo",
                        "telephone": "+4741906445",
                        "priceRange": "KR",
                         "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Brages vei 2",
                            "addressLocality": "Asker",
                            "postalCode": "1387",
                            "addressCountry": "NO"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": 59.8335, 
                            "longitude": 10.4445
                        },
                         "openingHoursSpecification": {
                            "@type": "OpeningHoursSpecification",
                            "dayOfWeek": [
                                "Monday",
                                "Tuesday",
                                "Wednesday",
                                "Thursday",
                                "Friday",
                                "Saturday",
                                "Sunday"
                            ],
                            "opens": "08:00",
                            "closes": "21:00"
                        },
                        "sameAs": [
                            "https://www.facebook.com/idrettsbarna",
                            "https://www.instagram.com/idrettsbarna"
                        ],
                        "description": "Idrettsbarna på Risenga er et foretrukket valg for babysvømming for familier i Oslo. Kun en kort kjøretur for kurs i topp moderne varmtvannsbasseng med erfarne instruktører."
                    })}
                </script>
            </Helmet>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 bg-white overflow-hidden">
                <div className="container mx-auto max-w-4xl text-center z-10 relative">
                    <span className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block">
                        Kort vei fra Oslo
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6 leading-tight">
                        Babysvømming - Kun en kort tur fra Oslo <br className="hidden md:block" />
                        <span className="italic text-slate-600 font-light">– Velkommen til Risenga i Asker</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Leter du etter svømmekurs i Oslo? <br/>
                        **Idrettsbarna** holder til i det flotte varmtvannsbassenget på Risenga Svømmehall i Asker. Det er kun en kort kjøretur unna Oslo vest, og vel verdt turen for de gode fasilitetene og små gruppene.
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
                            Spørsmål? Kontakt oss
                        </a>
                    </div>
                </div>
            </section>

            {/* Courses Overview */}
            <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-serif text-center mb-16 text-slate-900">Våre kursnivåer</h2>
                    
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {/* Baby */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                                <Heart size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Babysvømming (3 - 12 mnd)</h3>
                            <p className="text-slate-600 mb-6 text-sm">Hovedfokus er å gjøre babyen trygg i vannet. Vi jobber med grep, balansetrenig og dykking på barnets premisser.</p>
                            <ul className="text-sm text-slate-500 space-y-2 mb-8">
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"/>Styrker samspillet</li>
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"/>Individuell tilpasning</li>
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
                            <p className="text-slate-600 mb-6 text-sm">For de litt større barna jobber vi med selvhjulpenhet. Barna lærer å hoppe uti, komme seg til kanten og flyte.</p>
                             <ul className="text-sm text-slate-500 space-y-2 mb-8">
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-green-400 rounded-full"/>Lek og moro</li>
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-green-400 rounded-full"/>Trygghet i vann</li>
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
                    <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-slate-900">Kvalitetssvømming for de minste i Oslo</h2>
                    
                    <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
                       <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">Erfarne instruktører</h4>
                                <p className="text-slate-600 text-sm">Våre instruktører har lang erfaring med barn i vann.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                                <Heart size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">Varmt vann</h4>
                                <p className="text-slate-600 text-sm">Vi bruker varmtvannsbassenget på Risenga Asker, som holder 34 grader.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                                <Users size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">Samhold</h4>
                                <p className="text-slate-600 text-sm">En flott mulighet til å treffe andre foreldre i regionen.</p>
                            </div>
                        </div>
                         <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">Kort vei fra Oslo Vest</h4>
                                <p className="text-slate-600 text-sm">Risenga ligger kun en kort kjøretur fra Oslo grense, med gratis parkering.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

             {/* FAQ Section */}
             <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-slate-900">Babysvømming Oslo FAQ</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-2">Hvor holdes kursene?</h4>
                            <p className="text-slate-600 text-sm">Kursene holdes på Risenga Svømmehall i Asker. Det er et av landets flotteste anlegg med gode fasiliteter for babyer.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-2">Må vi kunne svømme for å delta?</h4>
                            <p className="text-slate-600 text-sm">Som forelder bør du være trygg i bassenget, men du trenger ikke å være en elitesvømmer. Du bunner i hele bassenget.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-2">Hva trenger babyen av utstyr?</h4>
                            <p className="text-slate-600 text-sm">En godkjent badebleie som sitter tett rundt lår og liv er obligatorisk.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-2">Er det kurs i feriene?</h4>
                            <p className="text-slate-600 text-sm">Vi følger som hovedregel skoleruten, men sjekk timeplanen for eventuelle intensivkurs i ferier.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-2">Kan vi ta igjen tapte timer?</h4>
                            <p className="text-slate-600 text-sm">Vi strekker oss langt for å finne løsninger hvis dere går glipp av en time pga. sykdom, men vi kan ikke garantere plass på andre grupper.</p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                         <h3 className="text-xl font-serif text-slate-900 mb-6">Velkommen til Asker</h3>
                          <p className="text-slate-600 max-w-lg mx-auto mb-8">
                            Vi holder til i Risenga Svømmehall. Ta turen fra Oslo for en kvalitetsøkt i vannet med ditt barn.
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

export default OsloLandingPage;
