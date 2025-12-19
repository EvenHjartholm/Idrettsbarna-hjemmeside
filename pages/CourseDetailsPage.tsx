import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SERVICES } from '../constants';
import { X, Clock, Calendar, MapPin, CheckCircle, Info, ArrowRight, HelpCircle, AlertCircle } from 'lucide-react';
import { Theme } from '../types';
import ScheduleModal from '../components/ScheduleModal';

interface CourseDetailsPageProps {
    theme?: Theme;
}

const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({ theme }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const course = SERVICES.find(s => s.id === id);
    const [showScheduleModal, setShowScheduleModal] = React.useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAFAF9] text-slate-900">
                <div className="text-center">
                    <h1 className="text-4xl font-serif mb-4">Fant ikke kurset</h1>
                    <button
                        onClick={() => navigate('/')}
                        className="text-slate-600 hover:text-slate-900 border-b border-slate-300 pb-0.5 hover:border-slate-900 transition-all font-medium"
                    >
                        Gå tilbake til forsiden
                    </button>
                </div>
            </div>
        );
    }

    const { details } = course;

    // Helper to render markdown bold syntax as headings
    const renderDescription = (text: string) => {
        const parts = text.split(/(\*\*.*?\*\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**')) {
                return (
                    <h3 key={index} className="text-xl font-serif text-slate-900 mt-8 mb-3 first:mt-0 block">
                        {part.slice(2, -2)}
                    </h3>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    const handleClose = () => {
        navigate('/#services');
    };

    const handleEnroll = () => {
        if (course.id === 'lifesaving' || course.id === 'preschool') {
            navigate('/', { state: { openContactModal: true, selectedServiceId: course.id } });
        } else {
            setShowScheduleModal(true);
        }
    };

    const handleScheduleSelect = (courseName: string, serviceId?: string) => {
        setShowScheduleModal(false);
        navigate('/', { state: { openCourseSelection: true, selectedCourse: courseName, serviceId } });
    };

    return (
        <>
            <div className="min-h-screen bg-[#FAFAF9] pt-32 pb-20 px-4 md:px-6"> 
                <Helmet>
                    <title>{`${course.title} | Idrettsbarna`}</title>
                    <meta name="description" content={course.description} />
                    <link rel="canonical" href={`https://www.læråsvømme.no/kurs/${id}`} />
                    <meta property="og:image" content={course.imageUrl.startsWith('http') ? course.imageUrl : `https://www.læråsvømme.no${course.imageUrl}`} />
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
                            "performer": {
                                "@type": "Organization",
                                "name": "Idrettsbarna",
                                "sameAs": "https://www.læråsvømme.no"
                            },
                            "offers": {
                                "@type": "Offer",
                                "price": details.price.replace(/[^0-9]/g, ''),
                                "priceCurrency": "NOK",
                                "availability": "https://schema.org/InStock",
                                "url": window.location.href,
                                "category": "Swimming Course"
                            },
                            "hasCourseInstance": {
                                "@type": "CourseInstance",
                                "courseMode": "InPerson",
                                "location": details.location,
                                "startDate": "2026-01-07"
                            }
                        })}
                    </script>
                    {details.faqs && (
                        <script type="application/ld+json">
                            {JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "FAQPage",
                                "name": `Ofte stilte spørsmål om ${course.title}`,
                                "mainEntity": details.faqs.map(faq => ({
                                    "@type": "Question",
                                    "name": faq.question,
                                    "acceptedAnswer": {
                                        "@type": "Answer",
                                        "text": faq.answer
                                    }
                                }))
                            })}
                        </script>
                    )}
                </Helmet>

                <div className="relative w-full max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-xl border border-slate-100 flex flex-col overflow-hidden animate-fade-in-up">
                    
                    {/* Header Image Area */}
                    <div className="relative h-[400px] lg:h-[500px] w-full shrink-0">
                        <img
                            src={course.imageUrl}
                            alt={`${course.title} i Asker`}
                            className="w-full h-full object-cover grayscale opacity-95 transition-all duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden"></div>
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-6 p-3 bg-white/90 hover:bg-white text-slate-900 rounded-full shadow-lg transition-all z-20 hover:scale-105"
                            aria-label="Lukk"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content Body */}
                    <div className="md:px-16 px-6 py-12 md:py-16">
                        
                        {/* Title Section */}
                        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-16 border-b border-slate-100 pb-10">
                            <div className="space-y-6 max-w-3xl">
                                <h1 className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight">
                                    {course.title}
                                    {course.id !== 'lifesaving' && course.id !== 'preschool' && (
                                        <span className="block text-2xl md:text-3xl text-slate-500 font-light mt-2 italic">Kurs i Asker (Risenga)</span>
                                    )}
                                </h1>

                                {details.geoIntro && (
                                    <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                                        {details.geoIntro}
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-3 mt-4">
                                     <span className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-slate-700 text-sm font-semibold tracking-wide flex items-center gap-2">
                                         <AlertCircle size={14} className="text-slate-400" />
                                         {details.age}
                                     </span>
                                     <span className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-slate-700 text-sm font-semibold tracking-wide flex items-center gap-2">
                                         <Clock size={14} className="text-slate-400" /> 
                                         {details.duration}
                                     </span>
                                </div>
                            </div>

                            {/* Desktop Enroll Button */}
                            <div className="hidden lg:block shrink-0">
                                <button
                                    onClick={handleEnroll}
                                    className="px-10 py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-full font-bold uppercase tracking-widest text-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-4 group"
                                >
                                    {course.id === 'lifesaving' || course.id === 'preschool' ? (
                                        <span>Ta kontakt</span>
                                    ) : (
                                        <div className="flex flex-col items-start leading-none gap-1">
                                            <span>Meld på</span>
                                            <span className="text-[10px] font-normal opacity-70 normal-case tracking-normal">Gå til påmelding</span>
                                        </div>
                                    )}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>

                        {/* Main Grid Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
                            
                            {/* Left Column: Description & FAQs */}
                            <div className="lg:col-span-7 space-y-16">
                                <div className="prose prose-slate prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-p:font-light prose-p:text-slate-600">
                                    <div className="whitespace-pre-line leading-relaxed">
                                        {renderDescription(details.fullDescription)}
                                    </div>
                                </div>

                                {/* Membership Info */}
                                {details.membershipRequired && (
                                    <div className="bg-[#FAFAF9] rounded-2xl p-8 border border-slate-100 flex gap-5">
                                        <Info className="text-slate-400 shrink-0 mt-1" size={24} />
                                        <div>
                                            <h3 className="text-lg font-serif text-slate-900 mb-2">Medlemskap påkrevd</h3>
                                            <p className="text-slate-600 font-light mb-4">
                                                Er barnet ditt <strong>6 år eller eldre</strong> må du være medlem av Asker triathlonklubb.
                                            </p>
                                            <a
                                                href="https://askertri.no/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-900 font-bold border-b border-slate-300 hover:border-slate-900 transition-all inline-flex items-center gap-2 text-sm uppercase tracking-wide"
                                            >
                                                Meld inn i klubben her <ArrowRight size={14} />
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Goals */}
                                <div>
                                    <h3 className="text-2xl font-serif text-slate-900 mb-8 flex items-center gap-3">
                                        Hva lærer vi?
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {details.learningGoals.map((goal, idx) => (
                                            <div key={idx} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-white shadow-sm">
                                                <CheckCircle size={18} className="text-slate-900 mt-1 shrink-0" />
                                                <span className="text-slate-600 font-light">{goal}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* FAQ */}
                                {details.faqs && details.faqs.length > 0 && (
                                    <div className="pt-8 border-t border-slate-100">
                                        <h3 className="text-2xl font-serif text-slate-900 mb-8">Ofte stilte spørsmål</h3>
                                        <div className="space-y-6">
                                            {details.faqs.map((faq, idx) => (
                                                <div key={idx} className="bg-[#FAFAF9] p-6 rounded-2xl border border-slate-100">
                                                    <h4 className="font-serif text-lg text-slate-900 mb-2">{faq.question}</h4>
                                                    <p className="text-slate-600 font-light leading-relaxed text-sm">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Right Column: Key Info Sidebar (Sticky) */}
                            <div className="lg:col-span-5 relative">
                                <div className="sticky top-8 space-y-8">
                                    
                                    {/* Info Card */}
                                    <div className="bg-[#FAFAF9] p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
                                        
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Sted</h4>
                                            <div className="flex items-start gap-3">
                                                <MapPin className="text-slate-900 shrink-0 mt-0.5" size={20} />
                                                <p className="text-xl font-serif text-slate-900">{details.location}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Pris</h4>
                                            <div className="flex items-start gap-3">
                                                <AlertCircle className="text-slate-900 shrink-0 mt-0.5" size={20} />
                                                <div>
                                                    <p className="text-2xl font-serif text-slate-900">{details.price}</p>
                                                    <p className="text-sm text-slate-500 mt-1">Faktura sendes per e-post</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                             <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Oppstart</h4>
                                             <div className="flex items-center gap-3">
                                                 <Calendar className="text-slate-900 shrink-0" size={20} />
                                                 <p className="text-lg text-slate-700">{details.startDate}</p>
                                             </div>
                                        </div>

                                        {/* Parental Info */}
                                        {(details.parentalInvolvement || course.id === 'baby') && (
                                            <div className="pt-6 border-t border-slate-200/60">
                                                <div className="flex gap-3">
                                                     <Info className="text-slate-400 shrink-0 mt-1" size={18} />
                                                     <div className="space-y-4">
                                                        {details.parentalInvolvement && (
                                                            <div>
                                                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Foreldre</h4>
                                                                <p className="text-slate-600 text-sm font-light">{details.parentalInvolvement}</p>
                                                            </div>
                                                        )}
                                                        {course.id === 'baby' && (
                                                            <div>
                                                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Permisjon?</h4>
                                                                <p className="text-slate-600 text-sm font-light">Om 23 kursdager er lenge, gi oss beskjed. Vi tilpasser.</p>
                                                            </div>
                                                        )}
                                                     </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* What to bring */}
                                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                                        <h4 className="text-lg font-serif text-slate-900 mb-6">Husk å pakke</h4>
                                        <ul className="space-y-4">
                                            {details.whatToBring.map((item, idx) => (
                                                <li key={idx} className="flex items-center gap-3 text-slate-600 font-light">
                                                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full shrink-0"></div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Ticket Info */}
                                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 text-sm text-slate-500 font-light leading-relaxed">
                                        <div className="flex gap-3">
                                            <Info size={16} className="shrink-0 mt-0.5 text-slate-400" />
                                            <div>
                                                {(() => {
                                                    if (course.id === 'baby') return "Inngangsbillett (0-3 år): Forelder betaler, babyen er gratis.";
                                                    if (course.id === 'toddler') return (
                                                        <>
                                                            <strong>Inngangsbillett:</strong><br />
                                                            • 0-3 år: Forelder betaler, barnet gratis.<br />
                                                            • 3-6 år: Barnet betaler, forelder gratis.
                                                        </>
                                                    );
                                                    if (course.id === 'kids_therapy') return "Inngangsbillett (3-6 år): Barnet betaler, forelder er gratis.";
                                                    if (course.id === 'kids_pool_25m') return "Inngang kommer i tillegg.";
                                                    return "Inngang kjøpes i resepsjonen.";
                                                })()}
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ScheduleModal
                    isOpen={showScheduleModal}
                    onClose={() => setShowScheduleModal(false)}
                    onSelectCourse={handleScheduleSelect}
                    courseTitle={course.title}
                    theme={theme}
                />
            </div>

            {/* Fixed Mobile Footer */}
            {!showScheduleModal && (
                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-slate-100 z-[100] lg:hidden pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                    <button
                        onClick={handleEnroll}
                        className="w-full py-4 bg-slate-900 text-white rounded-full font-bold uppercase tracking-wide text-sm shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                    >
                        {course.id === 'lifesaving' || course.id === 'preschool' ? (
                            <span>Ta kontakt</span>
                        ) : (
                            <div className="flex flex-col items-center leading-none gap-0.5">
                                <span>Meld på</span>
                                <span className="text-[9px] opacity-70 font-normal normal-case tracking-normal">Gå til påmelding</span>
                            </div>
                        )}
                        <ArrowRight size={18} />
                    </button>
                </div>
            )}
        </>
    );
};

export default CourseDetailsPage;
