import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SERVICES } from '../constants';
import { ArrowLeft, Check, Calendar, MapPin, Clock, Users, Shield, X, Heart } from 'lucide-react';

import { Theme } from '../App';

interface CoursePageProps {
    theme?: Theme;
}

const CoursePage: React.FC<CoursePageProps> = ({ theme }) => {
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

    // Helper to render markdown-like content
    const renderContent = (content: string) => {
        const lines = content.split('\n');
        return lines.map((line, index) => {
            // Handle Headers/Bold lines (lines starting and ending with **)
            if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
                return (
                    <h3 key={index} className="text-2xl md:text-3xl font-light tracking-widest uppercase text-white mb-8 mt-12 first:mt-0">
                        {line.replace(/\*\*/g, '')}
                    </h3>
                );
            }

            // Handle Bullet points
            if (line.trim().startsWith('•') || line.trim().startsWith('* ')) {
                return (
                    <div key={index} className="flex items-start justify-center gap-3 mb-4 text-left max-w-2xl mx-auto">
                        <span className="w-1.5 h-1.5 bg-white rounded-full mt-2.5 flex-shrink-0" />
                        <span className="text-lg text-white/80 font-light leading-relaxed flex-1">
                            {line.replace(/^[•*]\s*/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split(/<strong>(.*?)<\/strong>/g).map((part, i) =>
                                i % 2 === 1 ? <strong key={i} className="font-medium text-white">{part}</strong> : part
                            )}
                        </span>
                    </div>
                );
            }

            // Handle Empty lines
            if (!line.trim()) {
                return <div key={index} className="h-6" />;
            }

            // Handle Regular paragraphs
            return (
                <p key={index} className="text-lg md:text-xl text-white/80 font-light leading-relaxed mb-6 max-w-3xl mx-auto">
                    {line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split(/<strong>(.*?)<\/strong>/g).map((part, i) =>
                        i % 2 === 1 ? <strong key={i} className="font-medium text-white">{part}</strong> : part
                    )}
                </p>
            );
        });
    };

    if (theme === 'photo') {
        return (
            <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
                <Helmet>
                    <title>{`${course.title} - Foto Mode | Idrettsbarna`}</title>
                    <meta name="description" content={course.description} />
                </Helmet>

                {/* 1. HERO SECTION - Full Screen Image */}
                <section className="relative h-screen w-full overflow-hidden flex flex-col justify-end items-center pb-20">
                    <div className="absolute inset-0 z-0">
                        <img
                            src={course.imageUrl}
                            alt={course.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    </div>

                    <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in-up">
                        <h1 className="text-4xl md:text-7xl font-light tracking-[0.2em] uppercase mb-6 drop-shadow-2xl">
                            {course.title}
                        </h1>
                        <p className="text-lg md:text-2xl text-white/90 font-light tracking-widest mb-12 max-w-3xl mx-auto">
                            {course.description}
                        </p>

                        <button
                            onClick={handleEnroll}
                            className="px-8 py-3 border border-white text-white text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 min-w-[200px]"
                        >
                            Meld på
                        </button>
                    </div>
                </section>

                {/* 2. INTRO TEXT - Centered on Black */}
                <section className="relative z-20 py-24 px-6 bg-black text-center">
                    <div className="max-w-5xl mx-auto">
                        {course.details?.fullDescription && renderContent(course.details.fullDescription)}
                    </div>
                </section>

                {/* 3. FEATURE ROW (Icons + Text) - Hasselblad Style */}
                <section className="relative z-20 py-20 px-6 bg-black">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                            <div className="flex flex-col items-center group">
                                <Users className="w-8 h-8 text-white mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                                <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Målgruppe</span>
                                <span className="text-lg text-white font-light tracking-wide">{course.details?.age}</span>
                            </div>
                            <div className="flex flex-col items-center group">
                                <Clock className="w-8 h-8 text-white mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                                <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Varighet</span>
                                <span className="text-lg text-white font-light tracking-wide">{course.details?.duration}</span>
                            </div>
                            <div className="flex flex-col items-center group">
                                <MapPin className="w-8 h-8 text-white mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                                <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Sted</span>
                                <span className="text-lg text-white font-light tracking-wide">{course.details?.location}</span>
                            </div>
                            <div className="flex flex-col items-center group">
                                <Calendar className="w-8 h-8 text-white mb-6 group-hover:scale-110 transition-transform duration-500" strokeWidth={1} />
                                <span className="text-xs font-bold uppercase tracking-widest text-white/50 mb-2">Pris</span>
                                <span className="text-lg text-white font-light tracking-wide">{course.details?.price}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 4. LARGE VISUAL BREAK */}
                <section className="relative z-20 h-[60vh] w-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
                    <img
                        src={course.imageUrl}
                        alt="Atmosphere"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                </section>

                {/* 5. LEARNING GOALS & REQUIREMENTS - Centered Narrative */}
                <section className="relative z-20 py-24 px-6 bg-black text-center">
                    <div className="max-w-4xl mx-auto space-y-24">

                        {/* Learning Goals */}
                        {course.details?.learningGoals && (
                            <div>
                                <h3 className="text-2xl md:text-4xl font-light tracking-widest uppercase text-white mb-12">
                                    Dette lærer vi
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 text-left max-w-2xl mx-auto">
                                    {course.details.learningGoals.map((goal, idx) => (
                                        <div key={idx} className="flex items-center gap-4 text-white/80 group">
                                            <span className="w-1.5 h-1.5 bg-white rounded-full group-hover:scale-150 transition-transform" />
                                            <span className="text-lg font-light tracking-wide">{goal}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* What to bring */}
                        {course.details?.whatToBring && (
                            <div>
                                <h3 className="text-xl md:text-2xl font-light tracking-widest uppercase text-white/90 mb-12">
                                    Hva skal du ha med?
                                </h3>
                                <ul className="flex flex-wrap justify-center gap-8 md:gap-16">
                                    {course.details.whatToBring.map((item, idx) => (
                                        <li key={idx} className="flex items-center gap-3 text-white/70">
                                            <Check className="w-4 h-4 text-white/50" />
                                            <span className="text-lg font-light tracking-wide uppercase">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </section>

                {/* 6. FOOTER / CTA */}
                <section className="relative z-20 py-32 px-6 bg-black text-center flex flex-col items-center justify-center">
                    <h2 className="text-3xl md:text-5xl font-light tracking-widest uppercase mb-12">
                        Klar for start?
                    </h2>
                    <div className="flex gap-6">
                        <button
                            onClick={() => {
                                navigate('/');
                                setTimeout(() => {
                                    const element = document.getElementById('schedule');
                                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                                }, 100);
                            }}
                            className="px-8 py-3 border border-white/30 text-white/70 text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black hover:border-white transition-all duration-300 min-w-[200px]"
                        >
                            Kurstider
                        </button>
                        <button
                            onClick={handleEnroll}
                            className="px-8 py-3 border border-white text-white text-sm font-bold tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 min-w-[200px]"
                        >
                            Meld på nå
                        </button>
                    </div>
                </section>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-start pt-40 pb-20 px-4 sm:px-6 lg:px-8">
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
