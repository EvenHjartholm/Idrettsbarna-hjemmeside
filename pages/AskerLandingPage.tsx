import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Phone, Users, Shield, Heart, MapPin, ArrowRight, Waves } from 'lucide-react';


const AskerLandingPage: React.FC = () => {
    const navigate = useNavigate();

    const scrollToCourses = () => {
        // Since we reuse the homepage's course selection, we can redirect to home with a state to open it
        // OR we can just link to the main services section if we want a simpler flow.
        // For a landing page, linking to the main course list (Home #services) is often safest so they see all options.
        navigate('/', { state: { scrollToSchedule: true } });
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            <Helmet>
                <title>Svømmekurs i Asker | Idrettsbarna - Trygghet siden 2008</title>
                <meta name="description" content="Babysvømming og svømmekurs i Asker. Vi er en godt etablert svømmeskole med lang erfaring på Risenga. Små grupper, erfarne instruktører og vannglede i fokus." />
                <link rel="canonical" href="https://www.læråsvømme.no/svommekurs-asker" />
                
                {/* Structured Data for Local Business (AI Search Optimization) */}
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "LocalBusiness",
                        "name": "Idrettsbarna Asker",
                        "image": "https://www.læråsvømme.no/assets/logo.png",
                        "url": "https://www.læråsvømme.no/svommekurs-asker",
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
                        "description": "Idrettsbarna er en veletablert svømmeskole i Asker med over 15 års erfaring. Vi tilbyr babysvømming og svømmekurs for barn med sterkt fokus på trygghet og mestring på Risenga Svømmehall."
                    })}
                </script>
            </Helmet>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 bg-white overflow-hidden">
                <div className="container mx-auto max-w-4xl text-center z-10 relative">
                    <span className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block">
                        Lokalt i Asker
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6 leading-tight">
                        Babysvømming og svømmekurs i Asker <br className="hidden md:block" />
                        <span className="italic text-slate-600 font-light">– Trygghet og vannglede på Risenga</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Gi barnet ditt en fantastisk start i vannet! <br/>
                        <strong>Idrettsbarna</strong> er en veletablert aktør i Asker med over 15 års erfaring (siden 2008). Vi tilbyr kurs med trygge, erfarne instruktører i oppvarmet basseng på Risenga. Hos oss står trygghet, mestring og lek i sentrum.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button 
                            onClick={scrollToCourses}
                            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white font-bold rounded-full shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1"
                        >
                            Se ledige svømmekurs i Asker
                        </button>
                        <a 
                            href="tel:41906445"
                            className="w-full sm:w-auto px-8 py-4 bg-white border border-slate-200 text-slate-700 font-medium rounded-full hover:border-blue-300 hover:text-blue-600 transition-colors flex items-center justify-center gap-2"
                        >
                            <Phone size={18} />
                            Spørsmål? Ring 419 06 445
                        </a>
                    </div>
                </div>
            </section>

            {/* Courses Overview */}
            <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl md:text-4xl font-serif text-center mb-16 text-slate-900">Våre svømmekurs i Asker</h2>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Baby */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6">
                                <Heart size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Babysvømming</h3>
                            <p className="text-slate-600 mb-6 text-sm">En koselig stund for deg og babyen. Vi øver på grep, dykking og vanntilvenning i 34 graders vann.</p>
                            <ul className="text-sm text-slate-500 space-y-2 mb-8">
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"/>Varmtvannsbasseng</li>
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"/>Forelder med i vannet</li>
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
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Småbarnsvømming</h3>
                            <p className="text-slate-600 mb-6 text-sm">Gjennom lek og moro lærer barna å bli trygge i vannet, flyte og dykke. Et viktig steg mot svømmedyktighet.</p>
                             <ul className="text-sm text-slate-500 space-y-2 mb-8">
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-green-400 rounded-full"/>Grupper: 1-2, 2-4, 3-5 år</li>
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-green-400 rounded-full"/>Lekbasert læring</li>
                            </ul>
                            <button onClick={scrollToCourses} className="text-green-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                Les mer <ArrowRight size={16} />
                            </button>
                        </div>

                        {/* Kids */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-6">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Svømmekurs for barn</h3>
                            <p className="text-slate-600 mb-6 text-sm">Fra 5 år +. Fra nybegynner til viderekommende teknikk.</p>
                             <ul className="text-sm text-slate-500 space-y-2 mb-8">
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full"/>Nivådelt progresjon</li>
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-orange-400 rounded-full"/>Små grupper</li>
                            </ul>
                            <button onClick={scrollToCourses} className="text-orange-600 font-semibold text-sm flex items-center gap-1 hover:gap-2 transition-all">
                                Les mer <ArrowRight size={16} />
                            </button>
                        </div>

                        {/* Triathlon Training */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all md:col-span-3 lg:col-span-1 border-2 border-blue-500/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                                Nyhet
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                <Waves size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-slate-900">Asker Triathlonklubb</h3>
                            <p className="text-slate-600 mb-6 text-sm">Eksklusiv trening for voksne og ungdom på Tirsdager i Holmen Svømmehall.</p>
                             <ul className="text-sm text-slate-500 space-y-2 mb-8">
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"/>Holmen Svømmehall</li>
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"/>Medlemskap påkrevd</li>
                                <li className="flex gap-2 items-center"><span className="w-1.5 h-1.5 bg-blue-400 rounded-full"/>Kr 850,- (10 uker)</li>
                            </ul>
                            <button onClick={() => navigate('/asker-triathlon')} className="w-full bg-blue-50 text-blue-600 font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600 hover:text-white transition-all">
                                Les mer & påmelding <ArrowRight size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 px-6 bg-white">
                <div className="container mx-auto max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-slate-900">Hvorfor velge oss i Asker?</h2>
                    
                    <div className="grid sm:grid-cols-2 gap-x-12 gap-y-8">
                        <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                                <MapPin size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">Lokalt tilbud på Risenga</h4>
                                <p className="text-slate-600 text-sm">Vi er heldige som får bruke flotte Risenga. Her er fasilitetene topp moderne, med gode garderober og perfekt vanntemperatur for de minste.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                                <Users size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">Tilpassede grupper</h4>
                                <p className="text-slate-600 text-sm">Vi sikrer at alle barn blir sett og får individuell oppfølging.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                                <Shield size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">Trygg progresjon</h4>
                                <p className="text-slate-600 text-sm">Vi bygger trygghet først, deretter ferdigheter.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="shrink-0 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-900">
                                <Heart size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-900 mb-1">Foreldre i vannet</h4>
                                <p className="text-slate-600 text-sm">For de minste er foreldre alltid med i vannet for trygghet.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 px-6 bg-slate-50 border-t border-slate-200">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl md:text-4xl font-serif text-center mb-12 text-slate-900">Ofte stilte spørsmål</h2>
                    
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-2">Når er det kurs på Risenga?</h4>
                            <p className="text-slate-600 text-sm">Vi har kurs på ettermiddager og helger. Klikk på påmeldingsknappen for oppdatert timeplan.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-2">Er det parkering på Risenga?</h4>
                            <p className="text-slate-600 text-sm">Ja, det er god parkeringsdekning rett utenfor svømmehallen (mot avgift, sjekk skilting).</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-2">Hvor møter vi opp?</h4>
                            <p className="text-slate-600 text-sm">Vi møtes ved inngangen til garderobene eller ved bassengkanten, avhengig av tidspunkt. Du får detaljert info ved påmelding.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h4 className="font-bold text-slate-900 mb-2">Hva trenger vi til babysvømming?</h4>
                            <p className="text-slate-600 text-sm">Godkjent badebleie (obligatorisk), håndklær og toalettsaker. Vi anbefaler også at dere har med litt mat til etter kurset, da svømming gjør små mager sultne.</p>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                         <h3 className="text-xl font-serif text-slate-900 mb-6">Klar for en trygg og morsom opplevelse i vannet?</h3>
                         <button 
                            onClick={scrollToCourses}
                            className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all transform hover:-translate-y-1"
                        >
                            Se timeplan og meld deg på i Asker
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AskerLandingPage;
