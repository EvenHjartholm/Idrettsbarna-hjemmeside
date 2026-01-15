import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SERVICES } from '../constants';
import { X, Clock, Calendar, MapPin, CheckCircle, Info, ArrowRight, HelpCircle, AlertCircle } from 'lucide-react';
import { Theme } from '../types';
import ScheduleModal from '../components/ScheduleModal';
import SeaCreature from '../components/SeaCreature';

interface CourseDetailsPageProps {
    theme?: Theme;
}

const CourseDetailsPage: React.FC<CourseDetailsPageProps> = ({ theme }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const course = SERVICES.find(s => s.id === id);
    const [showScheduleModal, setShowScheduleModal] = React.useState(false);

    const isNordic = theme === 'nordic';

    // Theme Configuration
    const colors = {
        bg: isNordic ? 'bg-[#FAFAF9]' : 'bg-slate-950',
        card: isNordic ? 'bg-white' : 'bg-slate-900',
        cardBorder: isNordic ? 'border-slate-100' : 'border-slate-800',
        text: isNordic ? 'text-slate-900' : 'text-white',
        textMuted: isNordic ? 'text-slate-600' : 'text-slate-400',
        textLight: isNordic ? 'text-slate-500' : 'text-slate-500', // For things that need to be dim in both
        subCard: isNordic ? 'bg-[#FAFAF9]' : 'bg-slate-800/50',
        subCardBorder: isNordic ? 'border-slate-100' : 'border-slate-700',
        tagBg: isNordic ? 'bg-slate-50' : 'bg-slate-800',
        tagBorder: isNordic ? 'border-slate-200' : 'border-slate-700',
        tagText: isNordic ? 'text-slate-700' : 'text-slate-300',
        prose: isNordic ? 'prose-slate' : 'prose-invert',
        icon: isNordic ? 'text-slate-900' : 'text-cyan-400',
        iconMuted: isNordic ? 'text-slate-400' : 'text-slate-500',
        buttonSecondary: isNordic ? 'bg-white/90 text-slate-900 hover:bg-white' : 'bg-slate-800/90 text-white hover:bg-slate-800',
        mobileNav: isNordic ? 'bg-white/95 border-slate-100' : 'bg-slate-900/95 border-slate-800'
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        // Tracking: ViewContent
        if (course && typeof (window as any).fbq === 'function') {
            const priceMatch = course.details.price.match(/Kr\s*([\d\s]+),-/);
            const price = priceMatch ? parseInt(priceMatch[1].replace(/\s/g, ''), 10) : 0;
            
            (window as any).fbq('track', 'ViewContent', {
                content_name: course.title,
                content_category: 'Course',
                content_ids: [course.id],
                content_type: 'product',
                value: price,
                currency: 'NOK'
            });
        }
    }, [id, course]);

    if (!course) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${colors.bg} ${colors.text}`}>
                <div className="text-center">
                    <h1 className="text-4xl font-serif mb-4">Fant ikke kurset</h1>
                    <button
                        onClick={() => navigate('/')}
                        className={`${colors.textMuted} hover:${colors.text} border-b border-slate-300 pb-0.5 hover:border-slate-900 transition-all font-medium`}
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
                    <h3 key={index} className={`text-xl font-serif ${colors.text} mt-8 mb-3 first:mt-0 block`}>
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

    // Dynamic SEO Metadata Logic
    let seoTitle = `${course.title} | Idrettsbarna`;
    let seoDescription = course.description;

    if (course.id === 'toddler') {
        seoTitle = "Småbarnsvømming i Asker (1-5 år) | Lær å svømme";
        seoDescription = "Småbarnsvømming for barn 1–5 år på Risenga i Asker. Lek, trygghet og mestring i vann – sammen med forelder.";
    } else if (course.id === 'kids_therapy' || course.id === 'kids_pool_25m') {
        seoTitle = "Svømmekurs for barn i Asker (5 år +) | Lær å svømme";
        seoDescription = "Svømmekurs for barn fra 5 år og oppover på Risenga i Asker. Fra nybegynner til videregående nivå – trygg progresjon.";
    }

    return (
        <>
            <div className={`min-h-screen ${colors.bg} pt-32 pb-20 px-4 md:px-6 transition-colors duration-500`}> 
                <Helmet>
                    <title>{seoTitle}</title>
                    <meta name="description" content={seoDescription} />
                    <link rel="canonical" href={`https://www.læråsvømme.no/kurs/${id}`} />
                    <meta property="og:image" content={course.imageUrl.startsWith('http') ? course.imageUrl : `https://www.læråsvømme.no${course.imageUrl}`} />
                    <script type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "Course",
                            "name": course.title,
                            "description": seoDescription,
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
                    <script type="application/ld+json">
                        {JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [{
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Hjem",
                                "item": "https://www.læråsvømme.no/"
                            }, {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Kurs",
                                "item": "https://www.læråsvømme.no/#services"
                            }, {
                                "@type": "ListItem",
                                "position": 3,
                                "name": course.title,
                                "item": window.location.href
                            }]
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

                <div className={`relative w-full max-w-6xl mx-auto ${colors.card} rounded-[2.5rem] shadow-xl border ${colors.cardBorder} flex flex-col overflow-hidden animate-fade-in-up transition-colors duration-500`}>
                    
                    {/* Sea Creature: Contextual per course */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                        {course.id === 'baby' && (
                            <SeaCreature 
                                type="fish" 
                                animation="swim-right" 
                                theme={theme || 'nordic'} 
                                className="top-20 md:top-32 -left-4 md:left-0 opacity-60" 
                                delay={2}
                                size="md"
                            />
                        )}
                        {course.id === 'toddler' && (
                            <SeaCreature 
                                type="starfish" 
                                animation="peek-right" 
                                theme={theme || 'nordic'} 
                                className="bottom-40 md:bottom-60 right-0 opacity-80" 
                                delay={1}
                                size="sm"
                            />
                        )}
                        {course.id === 'kids_pool_25m' && (
                             <SeaCreature 
                                type="crab" 
                                animation="peek-up" 
                                theme={theme || 'nordic'} 
                                className="bottom-0 left-4 md:left-20 opacity-50" 
                                delay={3}
                                size="sm"
                            />
                        )}
                    </div>
                    {/* Header Image Area */}
                    <div className="relative h-[400px] lg:h-[500px] w-full shrink-0">
                        <img
                            src={course.imageUrl}
                            alt={`${course.title} i Asker`}
                            className="w-full h-full object-cover grayscale opacity-95 transition-all duration-1000"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-t ${isNordic ? 'from-black/60' : 'from-slate-900/90'} to-transparent lg:hidden`}></div>
                        <button
                            onClick={handleClose}
                            className={`absolute top-6 right-6 p-3 ${colors.buttonSecondary} rounded-full shadow-lg transition-all z-20 hover:scale-105`}
                            aria-label="Lukk"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Content Body */}
                    <div className="md:px-16 px-6 py-12 md:py-16">
                        
                        {/* Title Section */}
                        <div className={`flex flex-col lg:flex-row justify-between items-start gap-10 mb-16 border-b ${colors.cardBorder} pb-10`}>
                            <div className="space-y-6 max-w-3xl">
                                <h1 className={`text-4xl md:text-6xl font-serif ${colors.text} leading-tight`}>
                                    {course.title}
                                    {course.id !== 'lifesaving' && course.id !== 'preschool' && (
                                        <span className={`block text-2xl md:text-3xl ${colors.textLight} font-light mt-2 italic`}>Kurs i Asker (Risenga)</span>
                                    )}
                                </h1>

                                {/* Mobile Key Info Block */}
                                <div className="lg:hidden grid grid-cols-2 gap-3 mt-6 mb-2">
                                    <div className={`${colors.subCard} p-4 rounded-xl border ${colors.subCardBorder}`}>
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Sted</h4>
                                        <p className={`font-serif ${colors.text}`}>{details.location}</p>
                                    </div>
                                    <div className={`${colors.subCard} p-4 rounded-xl border ${colors.subCardBorder}`}>
                                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">Pris</h4>
                                        <p className={`font-serif ${colors.text}`}>{details.price}</p>
                                    </div>
                                    <div className={`${colors.subCard} p-4 rounded-xl border ${colors.subCardBorder} col-span-2 flex items-center gap-3`}>
                                        <Calendar size={16} className={colors.icon} />
                                        <div>
                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Oppstart</h4>
                                            <p className={`${colors.textMuted} text-sm`}>{details.startDate}</p>
                                        </div>
                                    </div>
                                </div>

                                {course.id === 'baby' && (
                                    <div className="animate-fade-in-up mt-6">
                                        <div className={`inline-flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 ${isNordic ? 'bg-emerald-50 border-emerald-100' : 'bg-stone-800 border-stone-700'} border rounded-2xl p-4 sm:pr-8 shadow-sm`}>
                                            <div className="flex items-center gap-3">
                                                <span className="bg-emerald-600 text-white text-[11px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                                                    Kampanje
                                                </span>
                                                <span className={`text-lg font-bold ${isNordic ? 'text-emerald-900' : 'text-emerald-400'}`}>
                                                    40% rabatt
                                                </span>
                                            </div>
                                            <div className={`flex flex-col ${isNordic ? 'text-emerald-900' : 'text-stone-300'}`}>
                                                <p className="text-sm font-medium leading-snug">
                                                    Gjelder kurs <strong className={isNordic ? 'text-emerald-950' : 'text-white'}>onsdager & torsdager kl. 15:00</strong>.
                                                </p>
                                                <p className="text-xs opacity-80 mt-0.5">
                                                    Kun 10 plasser! Kampanjepris: <strong>kr 2 553,-</strong> <span className="line-through opacity-60 ml-1">kr 4 255,-</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {details.geoIntro && (
                                    <p className={`${colors.textMuted} text-lg md:text-xl font-light leading-relaxed max-w-2xl`}>
                                        {details.geoIntro}
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-3 mt-4">
                                     <span className={`px-4 py-2 ${colors.tagBg} border ${colors.tagBorder} rounded-full ${colors.tagText} text-sm font-semibold tracking-wide flex items-center gap-2`}>
                                         <AlertCircle size={14} className={colors.iconMuted} />
                                         {details.age}
                                     </span>
                                     <span className={`px-4 py-2 ${colors.tagBg} border ${colors.tagBorder} rounded-full ${colors.tagText} text-sm font-semibold tracking-wide flex items-center gap-2`}>
                                         <Clock size={14} className={colors.iconMuted} /> 
                                         {details.duration}
                                     </span>
                                </div>
                            </div>

                            {/* Desktop Enroll Button */}
                            <div className="hidden lg:block shrink-0">
                                <button
                                    onClick={handleEnroll}
                                    className={`px-10 py-5 ${isNordic ? 'bg-slate-900 hover:bg-slate-800' : 'bg-cyan-600 hover:bg-cyan-500'} text-white rounded-full font-bold uppercase tracking-widest text-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-4 group`}
                                >
                                    {course.id === 'lifesaving' || course.id === 'preschool' ? (
                                        <span>Ta kontakt</span>
                                    ) : (
                                        <div className="flex flex-col items-start leading-none gap-1">
                                            <span>Gå til kurstider</span>
                                            <span className="text-[10px] font-normal opacity-70 normal-case tracking-normal">Velg tidspunkt for å melde på</span>
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
                                <div className={`prose ${colors.prose} prose-lg max-w-none prose-headings:font-serif prose-headings:font-normal prose-p:font-light prose-p:${colors.textMuted}`}>
                                    <div className="whitespace-pre-line leading-relaxed">
                                        {renderDescription(details.fullDescription)}
                                    </div>
                                </div>

                                {/* Membership Info */}
                                {details.membershipRequired && (
                                    <div className={`${colors.subCard} rounded-2xl p-8 border ${colors.subCardBorder} flex gap-5`}>
                                        <Info className={`${colors.iconMuted} shrink-0 mt-1`} size={24} />
                                        <div>
                                            <h3 className={`text-lg font-serif ${colors.text} mb-2`}>Medlemskap påkrevd</h3>
                                            <p className={`${colors.textMuted} font-light mb-4`}>
                                                Er barnet ditt <strong>6 år eller eldre</strong> må du være medlem av Asker triathlonklubb.
                                            </p>
                                            <a
                                                href="https://askertri.no/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`${colors.text} font-bold border-b border-slate-300 hover:border-slate-900 transition-all inline-flex items-center gap-2 text-sm uppercase tracking-wide`}
                                            >
                                                Meld inn i klubben her <ArrowRight size={14} />
                                            </a>
                                        </div>
                                    </div>
                                )}

                                {/* Goals */}
                                <div>
                                    <h3 className={`text-2xl font-serif ${colors.text} mb-8 flex items-center gap-3`}>
                                        Hva lærer vi?
                                    </h3>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {details.learningGoals.map((goal, idx) => (
                                            <div key={idx} className={`flex items-start gap-4 p-4 rounded-xl border ${colors.subCardBorder} ${isNordic ? 'bg-white' : 'bg-slate-900'} shadow-sm`}>
                                                <CheckCircle size={18} className={`${colors.icon} mt-1 shrink-0`} />
                                                <span className={`${colors.textMuted} font-light`}>{goal}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* FAQ */}
                                {details.faqs && details.faqs.length > 0 && (
                                    <div className={`pt-8 border-t ${colors.cardBorder}`}>
                                        <h3 className={`text-2xl font-serif ${colors.text} mb-8`}>Ofte stilte spørsmål</h3>
                                        <div className="space-y-6">
                                            {details.faqs.map((faq, idx) => (
                                                <div key={idx} className={`${colors.subCard} p-6 rounded-2xl border ${colors.subCardBorder}`}>
                                                    <h4 className={`font-serif text-lg ${colors.text} mb-2`}>{faq.question}</h4>
                                                    <p className={`${colors.textMuted} font-light leading-relaxed text-sm`}>
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
                                    <div className={`${colors.subCard} p-8 md:p-10 rounded-[2rem] border ${colors.subCardBorder} shadow-sm space-y-8`}>
                                        
                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Sted</h4>
                                            <div className="flex items-start gap-3">
                                                <MapPin className={`${colors.icon} shrink-0 mt-0.5`} size={20} />
                                                <p className={`text-xl font-serif ${colors.text}`}>{details.location}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Pris</h4>
                                            <div className="flex items-start gap-3">
                                                <AlertCircle className={`${colors.icon} shrink-0 mt-0.5`} size={20} />
                                                <div>
                                                    <p className={`text-2xl font-serif ${colors.text}`}>{details.price}</p>
                                                    <p className="text-sm text-slate-500 mt-1">
                                                        Faktura sendes per e-post
                                                        <br />
                                                        <span className="text-xs opacity-80 mt-1 block">
                                                            (det går fint å dele opp fakturaen om det blir mye å betale på en gang)
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                             <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Oppstart</h4>
                                             <div className="flex items-center gap-3">
                                                 <Calendar className={`${colors.icon} shrink-0`} size={20} />
                                                 <p className={`text-lg ${colors.textMuted}`}>{details.startDate}</p>
                                             </div>
                                        </div>

                                        {/* Parental Info */}
                                        {(details.parentalInvolvement || course.id === 'baby') && (
                                            <div className={`pt-6 border-t ${isNordic ? 'border-slate-200/60' : 'border-slate-700/60'}`}>
                                                <div className="flex gap-3">
                                                     <Info className={`${colors.iconMuted} shrink-0 mt-1`} size={18} />
                                                     <div className="space-y-4">
                                                        {details.parentalInvolvement && (
                                                            <div>
                                                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Foreldre</h4>
                                                                <p className={`${colors.textMuted} text-sm font-light`}>{details.parentalInvolvement}</p>
                                                            </div>
                                                        )}
                                                        {course.id === 'baby' && (
                                                            <div>
                                                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Permisjon?</h4>
                                                                <p className={`${colors.textMuted} text-sm font-light`}>Om 23 kursdager er lenge, gi oss beskjed. Vi tilpasser.</p>
                                                            </div>
                                                        )}
                                                     </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* What to bring */}
                                    <div className={`${isNordic ? 'bg-white' : 'bg-slate-900'} p-8 rounded-[2rem] border ${colors.cardBorder} shadow-sm`}>
                                        <h4 className={`text-lg font-serif ${colors.text} mb-6`}>Husk å pakke</h4>
                                        <ul className="space-y-4">
                                            {details.whatToBring.map((item, idx) => (
                                                <li key={idx} className={`flex items-center gap-3 ${colors.textMuted} font-light`}>
                                                    <div className={`w-1.5 h-1.5 ${isNordic ? 'bg-slate-300' : 'bg-slate-600'} rounded-full shrink-0`}></div>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Ticket Info */}
                                    <div className={`${colors.tagBg} p-6 rounded-2xl border ${colors.subCardBorder} text-sm ${colors.textMuted} font-light leading-relaxed`}>
                                        <div className="flex gap-3">
                                            <Info size={16} className={`shrink-0 mt-0.5 ${colors.iconMuted}`} />
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
                    targetServiceId={course.id}
                />
            </div>

            {/* Fixed Mobile Footer */}
            {!showScheduleModal && (
                <div className={`fixed bottom-0 left-0 right-0 p-4 ${colors.mobileNav} backdrop-blur-xl border-t z-[100] lg:hidden pb-8 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]`}>
                    <button
                        onClick={handleEnroll}
                        className={`w-full py-5 ${isNordic ? 'bg-slate-900' : 'bg-cyan-600'} text-white rounded-full font-bold uppercase tracking-widest text-base shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-3`}
                    >
                        {course.id === 'lifesaving' || course.id === 'preschool' ? (
                            <span>Ta kontakt</span>
                        ) : (
                            <div className="flex flex-col items-center leading-none gap-1">
                                <span className="text-lg">GÅ TIL KURSTIDER</span>
                                <span className="text-[10px] opacity-80 font-normal normal-case tracking-wide">Velg tidspunkt for å melde på</span>
                            </div>
                        )}
                        <ArrowRight size={24} />
                    </button>
                </div>
            )}
        </>
    );
};

export default CourseDetailsPage;
