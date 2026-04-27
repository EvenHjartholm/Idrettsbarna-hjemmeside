import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Phone, Users, MapPin, ArrowRight, ExternalLink, Clock, CheckCircle, Info, X, Calendar, AlertCircle } from 'lucide-react';
import { Theme } from '../types';
import EnrollmentWizardModal from '../components/EnrollmentWizardModal';
import SuccessModal from '../components/SuccessModal';

interface Props { theme: Theme; }

// Summer: May (4) - September (8), Winter: Oct-Apr
const currentMonth = new Date().getMonth();
const isSummer = currentMonth >= 4 && currentMonth <= 8;

const DAYS = [
    { id: 'onsdag', label: 'Onsdagstrening' },
    { id: 'torsdag', label: 'Torsdagstrening' },
    { id: 'tirsdag', label: 'Tirsdagstrening' },
    { id: 'mandag', label: 'Løpegruppe' },
    { id: 'sommer', label: 'Sommerhalvår' },
    { id: 'sykkelsondag', label: 'Sykkelsøndag' },
    { id: 'vinter', label: 'Vinterhalvår' },
];

const AskerTriathlonPage: React.FC<Props> = ({ theme }) => {
    const navigate = useNavigate();
    const [showWizard, setShowWizard] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successData, setSuccessData] = useState<{ childName: string; courseName: string; inquiryType: string; startDate?: string } | null>(null);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    const handleSuccess = (data: { childName: string; courseName: string; inquiryType: string; startDate?: string }) => {
        setSuccessData(data);
        setShowSuccess(true);
    };

    const enroll = (name: string) => { setSelectedCourse(name); setShowWizard(true); };

    const TrainingRow = ({ name, time, desc, enrollLabel }: { name: string; time: string; desc: string; enrollLabel: string }) => (
        <div className="flex items-start gap-5 p-5 rounded-2xl border border-slate-100 bg-[#FAFAF9] hover:bg-slate-50 transition-colors group">
            <Clock size={18} className="text-slate-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-1">
                    <span className="font-serif text-lg text-slate-900">{name}</span>
                    <span className="text-sm text-slate-400 font-medium">{time}</span>
                </div>
                <p className="text-slate-500 font-light text-sm">{desc}</p>
            </div>
            <button onClick={() => enroll(enrollLabel)}
                className="shrink-0 hidden sm:flex px-5 py-2.5 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-all items-center gap-2 opacity-0 group-hover:opacity-100">
                Meld på <ArrowRight size={14} />
            </button>
            <button onClick={() => enroll(enrollLabel)}
                className="shrink-0 sm:hidden px-4 py-2 bg-slate-900 text-white rounded-full text-xs font-bold">
                Meld på
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FAFAF9] pt-32 pb-20 px-4 md:px-6">
            <Helmet>
                <title>Asker Triathlonklubb – Treningsoversikt | Idrettsbarna</title>
                <meta name="description" content="Treningsoversikt for Asker Triathlonklubb. Svømming tirsdager, onsdager, torsdager og løpegruppe mandager." />
                <link rel="canonical" href="https://www.læråsvømme.no/asker-triathlon" />
            </Helmet>

            <button onClick={() => navigate('/')}
                className="fixed top-24 right-4 md:right-8 lg:right-24 xl:right-[15%] px-5 py-3 bg-white/40 hover:bg-white/60 text-slate-900 border-slate-200/50 backdrop-blur-md rounded-full shadow-sm transition-all z-50 hover:scale-105 flex items-center gap-2 font-medium border"
                aria-label="Lukk">
                <span>Lukk</span><X size={20} />
            </button>

            <div className="relative w-full max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden animate-fade-in-up">
                {/* Hero Image */}
                <div className="relative h-[250px] lg:h-[350px] w-full rounded-t-[2.5rem] overflow-hidden">
                    <img src="/images/videregaende_new.png" alt="Asker Triathlonklubb" className="w-full h-full object-cover" />
                </div>

                {/* Day Navigation */}
                <div className="px-6 md:px-16 pt-5 pb-4 bg-white sticky top-[72px] z-30">
                    <div className="flex gap-1 overflow-x-auto px-2 md:px-12 scrollbar-hide">
                        {DAYS.map(d => (
                            <a key={d.id} href={`#${d.id}`}
                                className="whitespace-nowrap px-4 py-2 rounded-full text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all flex-shrink-0">
                                {d.label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* Content Body */}
                <div className="md:px-16 px-6 py-12 md:py-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 px-2 md:px-12 py-4 lg:py-8">

                        {/* ═══ LEFT COLUMN ═══ */}
                        <div className="lg:col-span-7 space-y-16">

                            {/* Title */}
                            <div className="space-y-6">
                                <h1 className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight">
                                    Asker Triathlonklubb
                                    <span className="block text-2xl md:text-3xl text-slate-500 font-light mt-2 italic">Treningsoversikt</span>
                                </h1>
                                <p className="text-slate-600 text-lg font-light leading-relaxed max-w-2xl">
                                    Svømmetrening for voksne, ungdom og barn, pluss løpegruppe – alt gjennom Asker Triathlonklubb.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <span className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-slate-700 text-sm font-semibold flex items-center gap-2">
                                        <AlertCircle size={14} className="text-slate-400" /> Krever medlemskap
                                    </span>
                                    <span className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-slate-700 text-sm font-semibold flex items-center gap-2">
                                        <Clock size={14} className="text-slate-400" /> Halvårspartier
                                    </span>
                                </div>
                            </div>

                            {/* ONSDAG */}
                            <div id="onsdag" className="scroll-mt-40">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Onsdager · Risenga Storbasseng (25m)</p>
                                <h2 className="text-2xl font-serif text-slate-900 mb-6">Svømming – Barn & Ungdom</h2>
                                <div className="space-y-4">
                                    <TrainingRow name="Nybegynner treningsparti" time="18:30 – 19:00" desc="For de som er nye i storbassenget. Fokus på trygghet, teknikk og tilvenning." enrollLabel="Onsdagstrening: Nybegynner (On 18:30-19:00)" />
                                    <TrainingRow name="Litt øvet treningsparti" time="19:00 – 19:30" desc="For de som har litt erfaring og er klare for mer utfordring." enrollLabel="Onsdagstrening: Litt øvet (On 19:00-19:30)" />
                                    <TrainingRow name="Øvet treningsparti" time="19:30 – 20:00" desc="For de som behersker grunnteknikkene og vil jobbe videre." enrollLabel="Onsdagstrening: Øvet (On 19:30-20:00)" />
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* TORSDAG */}
                            <div id="torsdag" className="scroll-mt-40">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Torsdager · Risenga Storbasseng (25m)</p>
                                <h2 className="text-2xl font-serif text-slate-900 mb-6">Svømming – Avansert</h2>
                                <div className="space-y-4">
                                    <TrainingRow name="Avansert treningsparti" time="18:30 – 19:15" desc="For svømmere med god teknikk som ønsker å videreutvikle seg." enrollLabel="Torsdagstrening: Avansert (To 18:30-19:15)" />
                                    <TrainingRow name="Avansert treningsparti" time="19:15 – 20:00" desc="Intensiv økt med fokus på utholdenhet, fart og konkurranseteknikk." enrollLabel="Torsdagstrening: Avansert (To 19:15-20:00)" />
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* TIRSDAG */}
                            <div id="tirsdag" className="scroll-mt-40">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Tirsdager · Holmen Svømmehall</p>
                                <h2 className="text-2xl font-serif text-slate-900 mb-6">Svømming – Voksne & Ungdom</h2>
                                <div className="space-y-4">
                                    <TrainingRow name="Grunnleggende treningsparti" time="19:00 – 19:50" desc="For deg som vil i gang med crawl og grunnleggende svømmeteknikk." enrollLabel="Tirsdagstrening: Grunnleggende (Ti 19:00-19:50)" />
                                    <TrainingRow name="Videregående treningsparti" time="19:50 – 20:40" desc="For deg som har god teknikk og ønsker å jobbe med utholdenhet og fart." enrollLabel="Tirsdagstrening: Videregående (Ti 19:50-20:40)" />
                                    <TrainingRow name="Avansert treningsparti" time="20:40 – 21:30" desc="Intensiv kveldsøkt med fokus på fart, utholdenhet og konkurranseteknikk." enrollLabel="Tirsdagstrening: Avansert (Ti 20:40-21:30)" />
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* MANDAG */}
                            <div id="mandag" className="scroll-mt-40">
                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Mandager</p>
                                <h2 className="text-2xl font-serif text-slate-900 mb-6">Løpegruppe – Ungdom</h2>
                                <div className="bg-[#FAFAF9] rounded-2xl p-8 border border-slate-100 space-y-5">
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="flex items-start gap-3">
                                            <Clock size={16} className="text-slate-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Tid</p>
                                                <p className="font-serif text-slate-900">Kl. 18:15</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <Users size={16} className="text-slate-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Alder</p>
                                                <p className="font-serif text-slate-900">Ca. 14 år +</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <MapPin size={16} className="text-slate-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Sted</p>
                                                <p className="text-slate-600 font-light text-sm">Varierer</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <CheckCircle size={16} className="text-slate-400 mt-0.5" />
                                            <div>
                                                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Pris</p>
                                                <p className="font-serif text-slate-900">Gratis</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-slate-500 font-light text-sm leading-relaxed">
                                        En sosial løpegruppe for ungdom. Turene varierer i lengde og sted. Må være medlem av Asker Triathlonklubb for å bli med.
                                    </p>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* ══ SOMMERHALVÅR ══ */}
                            <div id="sommer" className="scroll-mt-40 space-y-6">
                                <div className="rounded-2xl bg-amber-50/60 border border-amber-100/80 px-6 py-5">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-widest text-amber-400 mb-1">Mai – September</p>
                                            <h2 className="text-2xl font-serif text-slate-900">Sommerhalvår</h2>
                                        </div>
                                        {isSummer && (
                                            <span className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full text-xs font-semibold">
                                                Nåværende sesong
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {/* Semsvannet */}
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Onsdager 18:00 · Semsvannet</p>
                                    <h3 className="text-xl font-serif text-slate-900 mb-4">Dobbeltøkt – Sykkel + Løp / Svømming + Løp</h3>
                                    <div className="bg-[#FAFAF9] rounded-2xl p-6 border border-slate-100 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-start gap-3">
                                                <Clock size={15} className="text-amber-500 mt-0.5 shrink-0" />
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Første økt</p>
                                                    <p className="font-serif text-slate-900">Kl. 18:00</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Clock size={15} className="text-amber-500 mt-0.5 shrink-0" />
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Andre økt</p>
                                                    <p className="font-serif text-slate-900">Ca. kl. 19:00</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-slate-500 font-light text-sm leading-relaxed">
                                            Dobbeltøkt: sykkel + løp, eller svømming + løp når det er varmt nok i vannet. Det er mulig å kun delta på én av øktene.
                                        </p>
                                        <p className="text-slate-500 font-light text-sm border-t border-slate-200 pt-3">
                                            Påmelding via <strong className="text-slate-800">Spond</strong>. Spørsmål? <a href="mailto:post@askertri.no" className="text-slate-900 underline">post@askertri.no</a> / <a href="tel:40746201" className="text-slate-900 underline">407 46 201</a>.
                                        </p>
                                    </div>
                                </div>

                                {/* Sykkelsøndag */}
                                <div id="sykkelsondag" className="scroll-mt-40">
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Søndager 09:00 · Asker Brannstasjon</p>
                                    <h3 className="text-xl font-serif text-slate-900 mb-4">Sykkelsøndag</h3>
                                    <div className="bg-[#FAFAF9] rounded-2xl p-6 border border-slate-100 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-start gap-3">
                                                <Clock size={15} className="text-amber-500 mt-0.5 shrink-0" />
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Tid</p>
                                                    <p className="font-serif text-slate-900">Kl. 09:00</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <MapPin size={15} className="text-amber-500 mt-0.5 shrink-0" />
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Oppmøte</p>
                                                    <p className="font-serif text-slate-900">Asker Brannstasjon</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-slate-500 font-light text-sm leading-relaxed">
                                            Vi sykler sammen hver søndag når været tillater. Det legges til rette for en kort og en lengre runde — passer alle ambisjonsnivå.
                                        </p>
                                        <p className="text-slate-500 font-light text-sm border-t border-slate-200 pt-3">
                                            Turer legges ut ukentlig i <strong className="text-slate-800">Spond</strong>.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <hr className="border-slate-100" />

                            {/* ══ VINTERHALVÅR ══ */}
                            <div id="vinter" className="scroll-mt-40 space-y-6">
                                <div className="rounded-2xl bg-blue-50/50 border border-blue-100/70 px-6 py-5">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-widest text-blue-300 mb-1">Oktober – April</p>
                                            <h2 className="text-2xl font-serif text-slate-900">Vinterhalvår</h2>
                                        </div>
                                        {!isSummer && (
                                            <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                                                Nåværende sesong
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Onsdager 19:00 · Friskvernklinikken</p>
                                    <h3 className="text-xl font-serif text-slate-900 mb-4">Dobbeltøkt – Spinning + Løp</h3>
                                    <div className="bg-[#FAFAF9] rounded-2xl p-6 border border-slate-100 space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-start gap-3">
                                                <Clock size={15} className="text-blue-500 mt-0.5 shrink-0" />
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Oppstart</p>
                                                    <p className="font-serif text-slate-900">Kl. 19:00</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <Info size={15} className="text-blue-500 mt-0.5 shrink-0" />
                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Fasiliteter fra</p>
                                                    <p className="font-serif text-slate-900">Kl. 16:00</p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-slate-500 font-light text-sm leading-relaxed">
                                            Dobbeltøkt: spinning (1–1,5 t) + løp på mølle (30–60 min). Øktene varierer og legges ut ukentlig i <strong className="text-slate-800">Spond</strong> og på sosiale medier. Du kan bruke fasilitetene fra kl. 16:00 for ekstra trening.
                                        </p>
                                        <div className="border-t border-slate-200 pt-3 space-y-1">
                                            <p className="text-slate-500 font-light text-sm">Påmelding via <strong className="text-slate-800">Spond</strong>. Kontakt: <a href="mailto:post@askertri.no" className="text-slate-900 underline">post@askertri.no</a> / <a href="tel:40746201" className="text-slate-900 underline">407 46 201</a>.</p>
                                            <a href="https://www.askertri.no/next/p/100671/trening-2026" target="_blank" rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 underline font-medium">
                                                Mer info på askertri.no <ExternalLink size={12} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>


                        </div>

                        {/* ═══ RIGHT COLUMN: Sticky Sidebar ═══ */}
                        <div className="lg:col-span-5 relative">
                            <div className="sticky top-32 space-y-8">

                                {/* CTA Button */}
                                <div className="hidden lg:block">
                                    <a href="https://www.askertri.no/next/membership/register" target="_blank" rel="noopener noreferrer"
                                        className="w-full px-8 py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-[2rem] font-bold uppercase tracking-widest text-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-between gap-4 group">
                                        <div className="flex flex-col items-start leading-none gap-1">
                                            <span>Bli medlem</span>
                                            <span className="text-[10px] font-normal opacity-70 normal-case tracking-normal">Kreves for å delta på alle aktiviteter</span>
                                        </div>
                                        <ExternalLink size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </a>
                                </div>

                                {/* Info Card */}
                                <div className="bg-[#FAFAF9] p-8 md:p-10 rounded-[2rem] border border-slate-100 shadow-sm space-y-8">
                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Steder</h4>
                                        <div className="space-y-3">
                                            <div className="flex items-start gap-3">
                                                <MapPin className="text-slate-900 shrink-0 mt-0.5" size={20} />
                                                <p className="text-lg font-serif text-slate-900">Holmen Svømmehall</p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <MapPin className="text-slate-900 shrink-0 mt-0.5" size={20} />
                                                <p className="text-lg font-serif text-slate-900">Risenga Svømmehall</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Pris</h4>
                                        <div className="flex items-start gap-3">
                                            <AlertCircle className="text-slate-900 shrink-0 mt-0.5" size={20} />
                                            <div>
                                                <p className="text-xl font-serif text-slate-900">Halvårspartier</p>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    Pris varierer ut ifra antall treningsdager
                                                </p>
                                                <p className="text-xs text-slate-400 mt-2">
                                                    Vår: Nyttår → Sommer<br />
                                                    Høst: Etter sommer → Jul
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Treningsdager</h4>
                                        <div className="flex items-start gap-3">
                                            <Calendar className="text-slate-900 shrink-0 mt-0.5" size={20} />
                                            <div className="text-slate-600 text-sm space-y-1 font-light">
                                                <p><strong className="text-slate-900 font-medium">Man</strong> – Løping (ungdom)</p>
                                                <p><strong className="text-slate-900 font-medium">Tir</strong> – Svømming (Holmen)</p>
                                                <p><strong className="text-slate-900 font-medium">Ons</strong> – Svømming (Risenga)</p>
                                                <p><strong className="text-slate-900 font-medium">Ons</strong> – Sommer: Dobbeltøkt (Semsvannet)</p>
                                                <p><strong className="text-slate-900 font-medium">Ons</strong> – Vinter: Spinning + Løp (Friskvernklinikken)</p>
                                                <p><strong className="text-slate-900 font-medium">Tor</strong> – Svømming (Risenga)</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Membership info */}
                                    <div className="pt-6 border-t border-slate-200/60">
                                        <div className="flex gap-3">
                                            <Info className="text-slate-400 shrink-0 mt-1" size={18} />
                                            <div>
                                                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Medlemskap</h4>
                                                <p className="text-slate-600 text-sm font-light">Alle aktiviteter krever medlemskap i Asker Triathlonklubb.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Entrance ticket note */}
                                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm text-slate-500 font-light">
                                    <div className="flex gap-3">
                                        <Info size={16} className="shrink-0 mt-0.5 text-slate-400" />
                                        <div>
                                            <strong className="text-slate-700">Inngang kommer i tillegg.</strong> Betales direkte i resepsjonen ved ankomst.
                                        </div>
                                    </div>
                                </div>

                                {/* Contact */}
                                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                                    <h4 className="text-lg font-serif text-slate-900 mb-4">Har du spørsmål?</h4>
                                    <a href="tel:41906445" className="flex items-center gap-3 text-slate-600 hover:text-slate-900 transition-colors font-light">
                                        <Phone size={18} className="text-slate-400" />
                                        Ring oss på 419 06 445
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <EnrollmentWizardModal isOpen={showWizard} onClose={() => setShowWizard(false)}
                selectedCourse={selectedCourse} serviceId="triathlon_tuesday" onSuccess={handleSuccess} theme={theme} />
            <SuccessModal isOpen={showSuccess} onClose={() => { setShowSuccess(false); setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50); }}
                childName={successData?.childName || ''} courseName={successData?.courseName || ''} inquiryType={successData?.inquiryType || ''} startDate={successData?.startDate} />
        </div>
    );
};

export default AskerTriathlonPage;
