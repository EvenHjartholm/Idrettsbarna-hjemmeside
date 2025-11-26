import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SERVICES } from '../constants';
import { ArrowLeft, Check, Calendar, MapPin, Clock, Users, Shield, X, Heart } from 'lucide-react';

const CoursePage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const course = SERVICES.find(s => s.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Fant ikke kurset</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="text-cyan-400 hover:underline"
                    >
                        Gå tilbake til forsiden
                    </button>
                </div>
            </div>
        );
    }

    const handleEnroll = () => {
        navigate('/', { state: { selectedCourse: course.title } });
    };

    const handleClose = () => {
        navigate('/');
        setTimeout(() => {
            const element = document.getElementById('services');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    };

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "Course",
        "name": course.title,
        "description": course.description,
        "provider": {
            "@type": "Organization",
            "name": "Idrettsbarna",
            "url": "https://idrettsbarna.no"
        },
        "image": `https://idrettsbarna.no${course.imageUrl}`,
        "offers": {
            "@type": "Offer",
            "category": "Paid",
            "priceCurrency": "NOK",
            "price": course.details?.price.replace(/[^0-9]/g, '') || "0",
            "availability": "https://schema.org/InStock",
            "url": typeof window !== 'undefined' ? window.location.href : ''
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-32 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>{`${course.title} i Asker | Idrettsbarna`}</title>
                <meta name="description" content={course.description} />
                <meta property="og:title" content={`${course.title} | Idrettsbarna`} />
                <meta property="og:description" content={course.description} />
                <meta property="og:image" content={`https://idrettsbarna.no${course.imageUrl}`} />
                <meta property="og:url" content={window.location.href} />
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </Helmet>

            <div className="max-w-6xl w-full mx-auto relative">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center text-slate-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Tilbake til oversikt
                </button>

                <div className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-50 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-all group"
                        title="Lukk"
                    >
                        <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    </button>

                    {/* Header Image */}
                    <div className="relative h-80 md:h-96">
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
                        <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="w-full h-full object-cover grayscale contrast-125"
                        />
                        <div className="absolute bottom-0 left-0 p-8 z-20">
                            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">{course.title}</h1>
                            <p className="text-xl text-cyan-400 font-medium">{course.description}</p>
                        </div>
                    </div>

                    <div className="p-8 md:p-12">
                        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 justify-between">

                            {/* Main Content */}
                            <div className="flex-1 space-y-8">
                                <div className="prose prose-invert max-w-none">
                                    <div className="whitespace-pre-line text-slate-300 text-lg leading-relaxed">
                                        {course.details?.fullDescription}
                                    </div>
                                </div>

                                {/* Learning Goals */}
                                {course.details?.learningGoals && (
                                    <div className="bg-slate-950/50 rounded-2xl p-6 border border-white/5">
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <Shield className="w-5 h-5 text-cyan-400" />
                                            Dette lærer vi
                                        </h3>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                            {course.details.learningGoals.map((goal, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <div className="mt-1 w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                                                        <Check className="w-3 h-3 text-cyan-400" />
                                                    </div>
                                                    <span className="text-slate-300">{goal}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Sidebar Info */}
                            <div className="md:w-72 lg:w-80 space-y-6 flex-shrink-0">
                                <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5 space-y-6">
                                    <div>
                                        <div className="flex items-center gap-3 text-slate-400 mb-1">
                                            <Users className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Målgruppe</span>
                                        </div>
                                        <p className="text-white font-medium">{course.details?.age}</p>
                                    </div>

                                    {course.details?.parentalInvolvement && (
                                        <div>
                                            <div className="flex items-center gap-3 text-slate-400 mb-1">
                                                <Heart className="w-4 h-4" />
                                                <span className="text-xs font-bold uppercase tracking-wider">Foreldre</span>
                                            </div>
                                            <p className="text-white font-medium">{course.details.parentalInvolvement}</p>
                                        </div>
                                    )}

                                    <div>
                                        <div className="flex items-center gap-3 text-slate-400 mb-1">
                                            <MapPin className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Sted</span>
                                        </div>
                                        <p className="text-white font-medium">{course.details?.location}</p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-3 text-slate-400 mb-1">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Varighet</span>
                                        </div>
                                        <p className="text-white font-medium">{course.details?.duration}</p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-3 text-slate-400 mb-1">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-xs font-bold uppercase tracking-wider">Pris</span>
                                        </div>
                                        <p className="text-white font-medium">{course.details?.price}</p>
                                    </div>

                                    <button
                                        onClick={handleEnroll}
                                        className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 hover:shadow-cyan-900/40 transform hover:-translate-y-0.5 transition-all"
                                    >
                                        Meld på nå
                                    </button>
                                </div>

                                {course.details?.whatToBring && (
                                    <div className="bg-slate-800/30 rounded-2xl p-6 border border-white/5">
                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
                                            Hva skal du ha med?
                                        </h4>
                                        <ul className="space-y-2">
                                            {course.details.whatToBring.map((item, idx) => (
                                                <li key={idx} className="text-slate-300 text-sm flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/50" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePage;
