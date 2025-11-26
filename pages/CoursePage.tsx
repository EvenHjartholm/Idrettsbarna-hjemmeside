import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SERVICES } from '../constants';
import { ArrowLeft, ArrowRight, Check, Calendar, MapPin, Clock, Users, Shield, X, Heart } from 'lucide-react';

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
        navigate('/');
        setTimeout(() => {
            const element = document.getElementById('schedule');
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
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
        <div className="min-h-screen bg-slate-950 flex flex-col justify-start pt-32 pb-20 px-4 sm:px-6 lg:px-8">
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

            <div className="max-w-5xl w-full mx-auto relative">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Tilbake til oversikt
                </button>

                {/* Clean Header Image (No Text Overlay) */}
                <div className="relative h-[50vh] w-full rounded-3xl overflow-hidden shadow-2xl mb-12 border border-white/10">
                    <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
                </div>

                {/* Title & Intro Section */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight">{course.title}</h1>
                    <p className="text-xl md:text-2xl text-cyan-400 font-medium max-w-3xl mx-auto leading-relaxed">
                        {course.description}
                    </p>
                </div>

                {/* Feature Row (Metadata) - Inspired by Foto Mode but Color Theme */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 border-y border-white/10 py-12 bg-slate-900/30 rounded-3xl backdrop-blur-sm">
                    <div className="flex flex-col items-center text-center">
                        <Users className="w-6 h-6 text-cyan-400 mb-3" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Målgruppe</span>
                        <span className="text-white font-medium">{course.details?.age}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Clock className="w-6 h-6 text-cyan-400 mb-3" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Varighet</span>
                        <span className="text-white font-medium">{course.details?.duration}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <MapPin className="w-6 h-6 text-cyan-400 mb-3" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Sted</span>
                        <span className="text-white font-medium">{course.details?.location}</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Calendar className="w-6 h-6 text-cyan-400 mb-3" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Pris</span>
                        <span className="text-white font-medium">{course.details?.price}</span>
                    </div>
                </div>

                {/* Main Content - Centered Column */}
                <div className="max-w-3xl mx-auto space-y-16">

                    {/* Full Description */}
                    <div className="prose prose-invert prose-lg max-w-none">
                        <div className="whitespace-pre-line text-slate-300 leading-relaxed text-lg">
                            {course.details?.fullDescription}
                        </div>
                    </div>

                    {/* Learning Goals */}
                    {course.details?.learningGoals && (
                        <div className="bg-slate-900/50 rounded-3xl p-8 md:p-12 border border-white/5">
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center justify-center gap-3">
                                <Shield className="w-6 h-6 text-cyan-400" />
                                Dette lærer vi
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {course.details.learningGoals.map((goal, idx) => (
                                    <div key={idx} className="flex items-start gap-4">
                                        <div className="mt-1.5 w-2 h-2 rounded-full bg-cyan-500 flex-shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                                        <span className="text-slate-300 text-lg">{goal}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* What to bring */}
                    {course.details?.whatToBring && (
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-8">Hva skal du ha med?</h3>
                            <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                                {course.details.whatToBring.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-white/5">
                                        <Check className="w-4 h-4 text-cyan-400" />
                                        <span className="text-slate-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Section */}
                    <div className="flex flex-col items-center gap-6 pt-8 pb-12">
                        <button
                            onClick={handleEnroll}
                            className="group relative px-8 py-4 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-200 text-lg font-bold rounded-full transition-all border border-cyan-200/30 hover:border-cyan-200/50 backdrop-blur-sm overflow-hidden min-w-[250px]"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                Meld på nå <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                        <p className="text-slate-500 text-sm">
                            Begrenset antall plasser
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default CoursePage;
