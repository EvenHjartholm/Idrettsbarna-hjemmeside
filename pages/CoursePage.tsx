import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SERVICES } from '../constants';
import { X, Clock, Calendar, MapPin, CheckCircle, Info, ArrowRight, HelpCircle } from 'lucide-react';
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

    const { details } = course;

    // Helper to clean markdown bold syntax
    const cleanText = (text: string) => text.replace(/\*\*/g, '');

    const handleClose = () => {
        navigate('/#services');
    };

    const handleEnroll = () => {
        navigate('/', { state: { selectedCourse: course.title } });
    };

    return (
        <div
            className="min-h-screen bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8"
            style={{ paddingTop: '90px' }}
        >
            <Helmet>
                <title>{`${course.title} | Idrettsbarna`}</title>
                <meta name="description" content={course.description} />
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Course",
                        "name": course.title,
                        "description": details.fullDescription,
                        "provider": {
                            "@type": "Organization",
                            "name": "Asker Triathlonklubb",
                            "sameAs": "https://askertri.no"
                        },
                        "offers": {
                            "@type": "Offer",
                            "price": details.price.replace(/[^0-9]/g, ''),
                            "priceCurrency": "NOK",
                            "availability": "https://schema.org/InStock"
                        },
                        "hasCourseInstance": {
                            "@type": "CourseInstance",
                            "courseMode": "InPerson",
                            "location": details.location,
                            "startDate": "2026-01-07"
                        }
                    })}
                </script>
            </Helmet>

            {/* AI Summary (Hidden visually but available for crawlers) */}
            <div className="sr-only">
                <h1>{course.title} i Asker</h1>
                <p>
                    {course.title} tilbys av Idrettsbarna og Asker Triathlonklubb i Risenga Svømmehall.
                    Kurset passer for {details.age || 'barn'}.
                    Prisen er {details.price}. Oppstart er i januar og august.
                    Sted: {details.location}.
                    {details.fullDescription}
                </p>
            </div>

            {/* Main Container - Mimicking the Modal Look */}
            <div className="relative w-full max-w-5xl bg-slate-900 rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-fade-in-up z-10">

                {/* Header Image */}
                <div className="relative h-80 sm:h-[500px] w-full shrink-0">
                    <img
                        src={course.imageUrl}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-3 bg-black/30 hover:bg-black/50 text-white rounded-full backdrop-blur-md transition-colors z-20 border border-white/10 group"
                        aria-label="Lukk"
                    >
                        <X size={24} className="group-hover:scale-110 transition-transform" />
                    </button>
                </div>

                {/* Header Content (Below Image) */}
                <div className="px-8 pt-8 pb-4 bg-slate-900">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6">
                        <div>
                            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4">{course.title}</h1>
                            <div className="flex flex-wrap gap-3 mb-4">
                                <span className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-300 text-sm font-bold uppercase tracking-wider">
                                    {details.age}
                                </span>
                                <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-slate-300 text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                                    <Clock size={14} /> {details.duration}
                                </span>
                            </div>
                            <p className="text-slate-400 text-base font-medium flex items-center gap-2">
                                <Calendar size={16} className="text-cyan-400" />
                                Oppstart: Onsdag 7. og torsdag 8. januar 2026
                            </p>
                        </div>

                        <button
                            onClick={handleEnroll}
                            className="hidden sm:flex bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-4 rounded-full shadow-lg shadow-cyan-900/20 hover:shadow-cyan-900/40 hover:-translate-y-0.5 transition-all duration-300 text-lg uppercase tracking-wider items-center justify-center gap-3 shrink-0 whitespace-nowrap"
                            style={{ minWidth: '200px', paddingLeft: '32px', paddingRight: '32px' }}
                        >
                            Meld på <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Mobile Enroll Button - Visible only on small screens */}
                    <button
                        onClick={handleEnroll}
                        className="flex sm:hidden w-full mt-6 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3.5 rounded-full shadow-lg shadow-cyan-900/20 text-base uppercase tracking-wider items-center justify-center gap-2"
                    >
                        Meld på <ArrowRight size={18} />
                    </button>
                </div>

                {/* Content Area */}
                <div className="p-8 pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-10">
                            <div className="prose prose-invert prose-lg max-w-none">
                                <div className="whitespace-pre-line text-slate-300 leading-relaxed">
                                    {cleanText(details.fullDescription)}
                                </div>
                            </div>

                            {/* Membership Warning */}
                            {details.membershipRequired && (
                                <div className="bg-cyan-950/30 border border-cyan-500/30 rounded-2xl p-6 flex items-start gap-4">
                                    <Info className="text-cyan-400 shrink-0 mt-1" size={24} />
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">Medlemskap påkrevd</h3>
                                        <p className="text-slate-300 mb-3">
                                            Er barnet ditt <strong>6 år eller eldre</strong> må du være medlem av Asker triathlonklubb.
                                        </p>
                                        <a
                                            href="https://askertri.no/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-bold hover:underline decoration-cyan-500/30 underline-offset-4 transition-all"
                                        >
                                            → Meld inn i klubben her
                                        </a>
                                    </div>
                                </div>
                            )}

                            {/* Learning Goals */}
                            <div className="bg-slate-800/30 rounded-2xl p-8 border border-white/5">
                                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                    <CheckCircle className="text-green-400" size={24} />
                                    Hva lærer vi?
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {details.learningGoals.map((goal, idx) => (
                                        <div key={idx} className="flex items-center gap-3 text-slate-300 bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                            <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full shrink-0"></div>
                                            {goal}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* GEO FAQ Section */}
                        <div className="bg-slate-800/30 rounded-2xl p-8 border border-white/5">
                            <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                                <HelpCircle className="text-cyan-400" size={24} />
                                Ofte stilte spørsmål
                            </h3>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-white font-bold mb-2">Når kan vi starte?</h4>
                                    <p className="text-slate-300">
                                        {course.id === 'baby' ? (
                                            <>
                                                For babysvømming kan dere starte fra barnet er ca. 6 uker gammelt.
                                                Det er viktig at navlen er helt grodd og at barnet veier minst 4 kg.
                                            </>
                                        ) : course.id === 'toddler' ? (
                                            <>
                                                Småbarnsvømming er tilrettelagt for barn mellom 1 og 5 år.
                                                Dere kan starte når dere ønsker, uavhengig av tidligere erfaring.
                                                Vi deler inn i grupper basert på alder og ferdigheter.
                                            </>
                                        ) : course.id === 'lifesaving' ? (
                                            <>
                                                Vi er fleksible på tid og sted. Dere kan avtale med oss, så kommer vi til der det er nærmest dere.
                                                Ta kontakt for å finne et tidspunkt som passer.
                                            </>
                                        ) : (
                                            <>
                                                Vi har kurs for alle nivåer. Se kursbeskrivelsen for anbefalt alder og forkunnskaper.
                                                Oppstart er vanligvis i januar og august.
                                            </>
                                        )}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-2">Hva koster kurset?</h4>
                                    <p className="text-slate-300">
                                        Prisen for dette kurset er {details.price}. Dette inkluderer inngang for barn og en voksen (der det er relevant).
                                    </p>
                                </div>
                                <div>
                                    <h4 className="text-white font-bold mb-2">Hvor foregår undervisningen?</h4>
                                    <p className="text-slate-300">
                                        Vi holder til i {details.location}. {details.location.includes('Terapibasseng') ? 'Vannet holder 34 grader.' : ''}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info */}
                    <div className="space-y-8">
                        <div className="bg-slate-800/30 rounded-2xl p-8 border border-white/5 space-y-6">
                            <div className="flex items-start gap-4">
                                <MapPin className="text-cyan-400 shrink-0 mt-1" size={24} />
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Sted</h4>
                                    <p className="text-white text-lg">{details.location}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <Calendar className="text-cyan-400 shrink-0 mt-1" size={24} />
                                <div>
                                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Pris</h4>
                                    <p className="text-white text-xl font-bold">{details.price}</p>
                                </div>
                            </div>

                            {details.parentalInvolvement && (
                                <div className="flex items-start gap-4">
                                    <Info className="text-cyan-400 shrink-0 mt-1" size={24} />
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Foreldre</h4>
                                        <p className="text-white text-lg">{details.parentalInvolvement}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="bg-slate-800/30 rounded-2xl p-8 border border-white/5">
                            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Ta med</h4>
                            <ul className="space-y-3">
                                {details.whatToBring.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-slate-300">
                                        <span className="w-2 h-2 bg-slate-500 rounded-full shrink-0"></span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer (Mobile Only) */}
            <div className="p-6 border-t border-white/10 bg-slate-900 flex justify-end shrink-0 sm:hidden">
                <button
                    onClick={handleEnroll}
                    className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-full transition-all duration-300 shadow-lg shadow-cyan-900/20 hover:shadow-cyan-900/40 hover:-translate-y-0.5 text-lg uppercase tracking-wider flex items-center justify-center gap-3 whitespace-nowrap mx-auto"
                    style={{ minWidth: '200px', paddingLeft: '24px', paddingRight: '24px', paddingTop: '16px', paddingBottom: '16px' }}
                >
                    Meld på <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

        </div>

    );
};

export default CoursePage;
