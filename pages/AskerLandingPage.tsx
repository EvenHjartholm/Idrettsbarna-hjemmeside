import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Phone, Users, Shield, Heart, MapPin, ArrowRight } from 'lucide-react';


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
                <title>Svømmekurs i Asker for baby og barn | Lær å svømme</title>
                <meta name="description" content="Svømmekurs i Asker for babyer, småbarn og barn. Trygge kurs på Risenga svømmehall – meld på i dag." />
                <link rel="canonical" href="https://www.læråsvømme.no/svommekurs-asker" />
            </Helmet>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 lg:pt-48 lg:pb-32 bg-white overflow-hidden">
                <div className="container mx-auto max-w-4xl text-center z-10 relative">
                    <span className="text-blue-600 font-bold tracking-widest uppercase text-xs md:text-sm mb-4 block">
                        Lokalt i Asker
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif text-slate-900 mb-6 leading-tight">
                        Svømmekurs i Asker <br className="hidden md:block" />
                        <span className="italic text-slate-600 font-light">– trygt og tilpasset barnets alder</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Leter du etter svømmekurs i Asker for baby eller barn? <br/>
                        Hos <strong>Lær å svømme</strong> tilbyr vi trygge og pedagogiske kurs på Risenga svømmehall – med fokus på mestring, glede og sikkerhet i vann.
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
                            <p className="text-slate-600 mb-6 text-sm">Fra 6 uker. Trygg og rolig tilvenning til vann sammen med forelder.</p>
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
                            <p className="text-slate-600 mb-6 text-sm">1 til 5 år. Lek, flyt og grunnleggende ferdigheter for trygghet.</p>
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
                                <p className="text-slate-600 text-sm">Vi holder til i Risenga Svømmehall, sentralt i Asker.</p>
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
        </div>
    );
};

export default AskerLandingPage;
