import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle, User, Baby, MapPin, FileText, Send, AlertCircle, Info, Calendar, Clock, ArrowRight, ChevronDown, ChevronUp } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Theme, EnrollmentFormData } from '../types';
import { SERVICES, SCHEDULE_DATA } from '../constants';
import TermsModal from './TermsModal';

interface EnrollmentWizardModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCourse: string;
    serviceId?: string;
    onSuccess: (data: { childName: string; courseName: string; inquiryType: string }) => void;
    theme?: Theme;
}

const EnrollmentWizardModal: React.FC<EnrollmentWizardModalProps> = ({ isOpen, onClose, selectedCourse, serviceId, onSuccess, theme }) => {
    const [step, setStep] = useState(1);
    const [showTerms, setShowTerms] = useState(false);
    const [expandedInfo, setExpandedInfo] = useState(false);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isShaking, setIsShaking] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [formData, setFormData] = useState<EnrollmentFormData>({
        parentFirstName: '',
        parentLastName: '',
        childFirstName: '',
        childBirthDate: '',
        email: '',
        phone: '',
        address: '',
        zipCity: '',
        selectedCourse: selectedCourse || '',
        heardAboutUs: '',
        inquiryType: 'Påmelding',
        termsAccepted: '',
        message: ''
    });

    useEffect(() => {
        if (isOpen) {
            setStep(1);
            setStatus('idle');
            setErrors({});
            if (selectedCourse) {
                setFormData(prev => ({ ...prev, selectedCourse }));
            }
            // Lock body scroll
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, selectedCourse]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        let value = e.target.value;
        if (e.target.name === 'childBirthDate') {
            const rawValue = value.replace(/\D/g, '');
            if (rawValue.length <= 2) value = rawValue;
            else if (rawValue.length <= 4) value = `${rawValue.slice(0, 2)}.${rawValue.slice(2)}`;
            else value = `${rawValue.slice(0, 2)}.${rawValue.slice(2, 4)}.${rawValue.slice(4, 8)}`;
        }

        setFormData(prev => ({ ...prev, [e.target.name]: value }));

        // Clear error when user types
        if (errors[e.target.name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[e.target.name];
                return newErrors;
            });
        }
    };

    const validateStep = (currentStep: number): boolean => {
        const newErrors: Record<string, string> = {};
        let isValid = true;

        switch (currentStep) {
            case 1: // Course Info (No validation needed)
                break;
            case 2: // Parent Info
                if (!formData.parentFirstName.trim()) newErrors.parentFirstName = 'Fornavn må fylles ut';
                if (!formData.parentLastName.trim()) newErrors.parentLastName = 'Etternavn må fylles ut';
                if (!formData.email.trim()) {
                    newErrors.email = 'E-post må fylles ut';
                } else if (!formData.email.includes('@')) {
                    newErrors.email = 'Ugyldig e-postadresse';
                }
                if (!formData.phone.trim()) newErrors.phone = 'Mobilnummer må fylles ut';
                break;
            case 3: // Child Info
                if (!formData.childFirstName.trim()) newErrors.childFirstName = 'Barnets navn må fylles ut';
                if (!formData.childBirthDate.trim()) {
                    newErrors.childBirthDate = 'Fødselsdato må fylles ut';
                } else if (formData.childBirthDate.length < 10) {
                    newErrors.childBirthDate = 'Fyll ut hele datoen (DD.MM.ÅÅÅÅ)';
                }
                break;
            case 4: // Details
                if (!formData.address.trim()) newErrors.address = 'Adresse må fylles ut';
                if (!formData.zipCity.trim()) newErrors.zipCity = 'Postnr og sted må fylles ut';
                if (!formData.heardAboutUs.trim()) newErrors.heardAboutUs = 'Vennligst fortell oss hvor du hørte om oss';
                if (formData.termsAccepted !== 'Ja') newErrors.termsAccepted = 'Du må godta vilkårene';
                break;
            default:
                break;
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            isValid = false;
            
            // Trigger shake and toast
            setIsShaking(true);
            setShowErrorToast(true);
            setTimeout(() => setIsShaking(false), 500); // Shake duration
            setTimeout(() => setShowErrorToast(false), 4000); // Toast duration
        }

        return isValid;
    };

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1);
        }
    };

    const handleBack = () => {
        setStep(prev => prev - 1);
    };

    const handleStepClick = (targetStep: number) => {
        if (targetStep < step) {
            setStep(targetStep);
        } else {
            handleNext();
        }
    };

    const handleSubmit = async () => {
        setStatus('submitting');

        const SERVICE_ID = 'service_z5qlv57';
        const TEMPLATE_ID = 'template_8ifgw0r';
        const PUBLIC_KEY = 'AnYbkdu2hWdOx50pj';

        const templateParams = {
            to_name: 'Idrettsbarna',
            from_name: formData.inquiryType,
            from_email: formData.email,
            phone: formData.phone,
            child_name: formData.childFirstName,
            child_dob: formData.childBirthDate,
            course: formData.selectedCourse,
            inquiry_type: formData.inquiryType,
            parent_first_name: formData.parentFirstName,
            parent_last_name: formData.parentLastName,
            address_street: formData.address,
            address_zip_city: formData.zipCity,
            address: `${formData.address}, ${formData.zipCity}`,
            heard_about: formData.heardAboutUs,
            terms_accepted: formData.termsAccepted,
            message_body: formData.message,
            message: `Forelder: ${formData.parentFirstName} ${formData.parentLastName}\n\n${formData.message}`,
            subject: `${formData.inquiryType.toUpperCase()}: ${formData.childFirstName} (${formData.selectedCourse})`
        };

        try {
            await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
            setStatus('success');
            setTimeout(() => {
                onSuccess({
                    childName: formData.childFirstName,
                    courseName: formData.selectedCourse,
                    inquiryType: formData.inquiryType
                });
                onClose();
            }, 1500);
        } catch (error) {
            console.error('FAILED...', error);
            alert('Noe gikk galt. Prøv igjen senere.');
            setStatus('idle');
        }
    };

    const steps = [
        { id: 1, title: 'Kurs', icon: Info },
        { id: 2, title: 'Foresatte', icon: User },
        { id: 3, title: 'Barnet', icon: Baby },
        { id: 4, title: 'Detaljer', icon: MapPin },
        { id: 5, title: 'Se over', icon: CheckCircle }
    ];

    // Helper to render input field with error handling (Default Theme)
    const renderInput = (name: keyof EnrollmentFormData, label: string, type: string = 'text', placeholder: string = '') => (
        <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{label}</label>
            <div className="relative">
                <input
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all shadow-inner ${errors[name] ? 'border-red-500 pr-10' : 'border-slate-700 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                        }`}
                    placeholder={placeholder}
                />
                {errors[name] && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none">
                        <AlertCircle size={18} />
                    </div>
                )}
            </div>
            {errors[name] && (
                <p className="text-red-400 text-xs mt-1 ml-1 animate-fade-in">{errors[name]}</p>
            )}
        </div>
    );

    // Helper to render input field with error handling (Nordic Theme)
    const renderNordicInput = (name: keyof EnrollmentFormData, label: string, type: string = 'text', placeholder: string = '') => (
        <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">{label}</label>
            <div className="relative">
                <input
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all shadow-sm ${errors[name] ? 'border-rose-500 pr-10' : 'border-slate-200 focus:shadow-[0_0_10px_rgba(15,23,42,0.1)]'
                        }`}
                    placeholder={placeholder}
                />
                {errors[name] && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-500 pointer-events-none">
                        <AlertCircle size={18} />
                    </div>
                )}
            </div>
            {errors[name] && (
                <p className="text-rose-500 text-xs mt-1 ml-1 animate-fade-in">{errors[name]}</p>
            )}
        </div>
    );

    // NORDIC THEME RENDER
    // NORDIC THEME RENDER (Universal)
    if (theme === 'nordic') {
        return (
            <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-sm" onClick={onClose}></div>

                <div className={`relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden max-h-[90vh] animate-fade-in ${isShaking ? 'animate-shake-custom' : ''}`}>
                    
                    {/* Animations */}
                    <style>{`
                        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                        @keyframes shake {
                            10%, 90% { transform: translate3d(-1px, 0, 0); }
                            20%, 80% { transform: translate3d(2px, 0, 0); }
                            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                            40%, 60% { transform: translate3d(4px, 0, 0); }
                        }
                        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
                        .animate-shake-custom { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
                    `}</style>


                    {/* Header */}
                    <div className="p-6 border-b border-slate-100 bg-white flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-serif text-slate-900">Påmelding</h2>
                            <p className="text-slate-600 text-sm font-medium max-w-xs">{formData.selectedCourse}</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400 hover:text-slate-600">
                            <X size={24} />
                        </button>
                    </div>

                    {/* Progress Bar */}
                    <div className="px-6 pt-6 pb-2">
                        <div className="flex justify-between relative">
                            {/* Connecting Line */}
                            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10 transform -translate-y-1/2"></div>
                            <div
                                className="absolute top-1/2 left-0 h-0.5 bg-slate-900 -z-10 transform -translate-y-1/2 transition-all duration-500"
                                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                            ></div>

                            {steps.map((s, index) => (
                                <React.Fragment key={s.id}>
                                    <div
                                        onClick={() => handleStepClick(s.id)}
                                        className="flex flex-col items-center gap-3 cursor-pointer group relative"
                                    >
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step >= s.id
                                            ? 'bg-slate-900 border-slate-900 text-white shadow-sm scale-110 ring-4 ring-slate-100'
                                            : 'bg-white border-slate-200 text-slate-300'
                                            }`}>
                                            <s.icon size={20} strokeWidth={step >= s.id ? 2.5 : 2} />
                                        </div>
                                        <span className={`text-sm font-medium tracking-wide transition-colors duration-500 ${step >= s.id ? 'text-slate-900' : 'text-slate-400'
                                            }`}>{s.title}</span>
                                    </div>
                                    {/* Arrow between steps */}
                                    {index < steps.length - 1 && (
                                        <div className="absolute top-[22px] -translate-y-1/2 left-0 w-full flex justify-center -z-0 pointer-events-none opacity-0 md:opacity-100"
                                            style={{ 
                                                left: `calc(${((index + 1) / steps.length) * 100}% - 12px)`, // Approximate positioning, simplified for visual
                                                width: 'auto',
                                                display: 'none' // Actually, let's keep it simple: Just put it in the flex flow if possible, or use the line.
                                                // The user asked for "Elegant liten pil til høyre mellom hver av stegene".
                                                // The flex space-between makes direct placement tricky without exact math.
                                                // Let's rely on the connecting line and maybe add a small chevron overlay on the line?
                                                // Re-implementation: Let's simpler logic.
                                             }}
                                        >
                                           {/* Reverting complex attempts. The user just wants a visual separator. */}
                                        </div>
                                    )}
                                     {index < steps.length - 1 && (
                                         <div className="hidden sm:flex items-center justify-center text-slate-200" style={{ marginTop: '-24px' }}>
                                            <ChevronRight size={16} />
                                         </div>
                                     )}
                                </React.Fragment>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-0 custom-scrollbar bg-white">
                        {step === 1 && (
                            <div className="animate-fade-in flex flex-col h-full">
                                {(() => {
                                    // Logic duplicated from default theme for looking up service
                                    const match = formData.selectedCourse.match(/^(.+?)(?:: (.+?))? \((.+?) (.+?)\)$/);
                                    let level = '', ageGroup = '', day = '', time = '';
                                    if (match) {
                                        level = match[1]; ageGroup = match[2] || ''; day = match[3]; time = match[4];
                                    } else {
                                        const parts = formData.selectedCourse.split('(');
                                        level = parts[0]?.trim();
                                        const timeParts = parts[1]?.replace(')', '').split(' ');
                                        day = timeParts?.[0] || ''; time = timeParts?.slice(1).join(' ') || '';
                                    }
                                    let service;
                                    if (serviceId) service = SERVICES.find(s => s.id === serviceId);
                                    if (!service) {
                                        const scheduleDay = SCHEDULE_DATA.find(d => d.day === day);
                                        const session = scheduleDay?.sessions.find(s => s.time === time && s.level === level);
                                        if (session) service = SERVICES.find(s => s.id === session.serviceId);
                                    }
                                    if (!service) service = SERVICES.find(s => s.title.toLowerCase().includes(level.toLowerCase()) || level.toLowerCase().includes(s.title.toLowerCase()));
                                    if (!service) service = SERVICES[0];

                                    const fullTitle = ageGroup ? `${level}: ${ageGroup}` : level;
                                    const getStartDate = (d: string) => {
                                        if (d.toLowerCase().includes('onsdag')) return '7. jan';
                                        if (d.toLowerCase().includes('torsdag')) return '8. jan';
                                        return 'Januar';
                                    };

                                    return (
                                        <>
                                            <div className="relative">
                                                <div className="h-56 sm:h-72 w-full shrink-0 relative">
                                                    <img src={service.imageUrl} alt={service.title} className="w-full h-full object-cover grayscale opacity-90" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
                                                </div>
                                                <div className="absolute bottom-6 left-6 right-6 text-white">
                                                    <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-[10px] font-bold uppercase tracking-widest mb-3">
                                                        Valgt Kurs
                                                    </span>
                                                    <h2 className="text-3xl sm:text-4xl font-serif leading-tight text-white mb-2 shadow-sm">{fullTitle}</h2>
                                                    <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
                                                        <MapPin size={16} className="text-white" />
                                                        {service.details.location.split(',')[0]}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="px-8 pt-8 pb-6 space-y-8">
                                                
                                                {/* Key Details - Clean Row */}
                                                <div className="flex flex-col sm:flex-row gap-8 border-b border-slate-100 pb-8">
                                                    <div className="flex-1 flex gap-4 items-start">
                                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100/50">
                                                             <Calendar size={18} className="text-slate-700" />
                                                        </div>
                                                        <div>
                                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Dag & Oppstart</span>
                                                            <p className="text-slate-900 font-serif text-xl capitalize mt-1">{day}</p>
                                                            <p className="text-sm text-slate-500">{getStartDate(day)}</p>
                                                        </div>
                                                    </div>

                                                    <div className="flex-1 flex gap-4 items-start">
                                                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0 border border-slate-100/50">
                                                             <Clock size={18} className="text-slate-700" />
                                                        </div>
                                                        <div>
                                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tidspunkt</span>
                                                            <p className="text-slate-900 font-serif text-xl mt-1">{time}</p>
                                                            <p className="text-sm text-slate-500">{service.details.duration}</p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Price & Info */}
                                                <div className="flex flex-col gap-6">
                                                     <div className="flex justify-between items-baseline">
                                                        <div>
                                                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Pris for kurset</span>
                                                            <p className="text-3xl font-serif text-slate-900">{service.details.price}</p>
                                                        </div>
                                                        <span className="text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                                                            ca. 185,- per time
                                                        </span>
                                                     </div>

                                                     <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-100 space-y-3">
                                                          <div className="flex gap-3 text-sm text-slate-600">
                                                                <Info size={18} className="shrink-0 text-amber-700/60 mt-0.5" />
                                                                <p className="leading-relaxed">
                                                                    {(() => {
                                                                        if (service.id === 'baby') return "Inngangsbillett (0-3 år): Forelder betaler, babyen er gratis.";
                                                                        if (service.id === 'toddler') {
                                                                            if (ageGroup.includes('1 - 2') || ageGroup.includes('2 - 3')) return "Inngangsbillett (0-3 år): Forelder betaler, barnet er gratis.";
                                                                            if (ageGroup.includes('3 - 4') || ageGroup.includes('3 - 5') || ageGroup.includes('2 - 4')) return "Inngangsbillett (3-6 år): Barnet betaler, forelder er gratis.";
                                                                            return "Inngangsbillett: Barn under 3 år gratis (forelder betaler).";
                                                                        }
                                                                        if (service.id === 'kids_therapy') return "Inngangsbillett (3-6 år): Barnet betaler, forelder er gratis.";
                                                                        if (service.id === 'kids_pool_25m') return "Inngang kommer i tillegg.";
                                                                        return "Inngang kjøpes på Risenga.";
                                                                    })()}
                                                                </p>
                                                            </div>
                                                            <div className="flex gap-3 text-sm text-slate-600">
                                                                <Info size={18} className="shrink-0 text-amber-700/60 mt-0.5" />
                                                                <p>Faktura kan deles opp ved behov.</p>
                                                            </div>
                                                     </div>
                                                </div>

                                                <div className="text-slate-600 text-sm leading-relaxed border-t border-slate-100 pt-6">
                                                    <p>{service.description.replace(/\*\*/g, '')}</p>
                                                    
                                                    {/* READ MORE EXPANDER */}
                                                    <div className="mt-4">
                                                        <button 
                                                            type="button"
                                                            onClick={() => setExpandedInfo(!expandedInfo)}
                                                            className="flex items-center gap-2 text-slate-900 font-semibold text-sm hover:text-slate-700 transition-colors group py-2 w-full"
                                                        >
                                                            <span>{expandedInfo ? 'Vis mindre info' : 'Les mer om hva vi gjør på kurset'}</span>
                                                            {expandedInfo ? <ChevronUp size={16} /> : <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />}
                                                        </button>

                                                        {/* EXPANDABLE CONTENT */}
                                                        {expandedInfo && (
                                                            <div className="mt-6 space-y-6 animate-fade-in border-l-2 border-slate-100 pl-4 sm:pl-6 bg-slate-50/50 -ml-4 -mr-4 p-4 rounded-xl sm:ml-0 sm:mr-0 sm:bg-transparent sm:p-0">
                                                                
                                                                {/* CONTENT FOR BABY SWIMMING */}
                                                                {service.id === 'baby' ? (
                                                                    <>
                                                                         <div className="space-y-4">
                                                                            <h4 className="font-serif text-xl text-slate-900">Et minne for livet</h4>
                                                                            <p className="text-slate-600 leading-relaxed font-light">
                                                                                Babysvømming handler ikke om å lære å svømme teknisk, men om trygghet, mestring og en unik nærhet mellom forelder og barn.
                                                                                I vannet får babyen frihet til å bevege seg på en måte som ikke er mulig på land.
                                                                            </p>
                                                                            <img src="/images/baby_swimming_bw.jpg" alt="Babysvømming" className="rounded-2xl w-full h-48 object-cover shadow-sm grayscale opacity-90 my-4" />
                                                                        </div>

                                                                        <div className="grid gap-4">
                                                                            <h4 className="font-serif text-lg text-slate-900 mt-2">Hva lærer vi?</h4>
                                                                            <ul className="space-y-3">
                                                                                {[
                                                                                    "Trygghet under vann (dykking er alltid frivillig)",
                                                                                    "Selvberging og rotasjon mot rygg",
                                                                                    "Griperefleks og balansetrening",
                                                                                    "Sosialt samspill med andre babyer"
                                                                                ].map((item, i) => (
                                                                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                                                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                                                                                        {item}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>

                                                                        <div className="bg-white p-4 rounded-xl border border-slate-200 text-sm space-y-2 shadow-sm">
                                                                            <p className="font-semibold text-slate-900">Praktisk info</p>
                                                                            <p className="text-slate-600">
                                                                                Vi har god og varm vanntemperatur (ca 34 grader).
                                                                                Husk badebleie! Det er gratis parkering utenfor hallen.
                                                                            </p>
                                                                        </div>
                                                                        {service.id === 'baby' && (
                                                                            <div className="flex gap-3 text-sm text-slate-400">
                                                                                <Info size={18} className="shrink-0 text-slate-500 mt-0.5" />
                                                                                <p>Om 23 kursdager er lenge pga permisjonstid, så gi oss beskjed. Vi kan ordne færre kursdager.</p>
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                ) : service.id === 'toddler' ? (
                                                                    /* CONTENT FOR TODDLER SWIMMING */
                                                                    <>
                                                                        <div className="space-y-4">
                                                                             <h4 className="font-serif text-xl text-slate-900">Mestring og vannglede</h4>
                                                                             <p className="text-slate-600 leading-relaxed font-light">
                                                                                 Småbarnssvømming bygger videre på tryggheten fra babysvømming, eller gir en trygg start for nye.
                                                                                 Nå begynner vi med mer konkrete øvelser innbakt i lek og sang.
                                                                             </p>
                                                                        </div>
                                                                         <ul className="space-y-3 mt-2">
                                                                                {[
                                                                                    "Hoppe fra kanten og svømme tilbake",
                                                                                    "Dykke etter leker (for de som vil)",
                                                                                    "Flyte på rygg og mage",
                                                                                    "Grunnleggende arm- og beintak",
                                                                                    "Stuping fra kanten"
                                                                                ].map((item, i) => (
                                                                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                                                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                                                                                        {item}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                    </>
                                                                ) : service.id === 'kids_therapy' ? (
                                                                    /* CONTENT FOR KIDS THERAPY (Nybegynner / Øvet) */
                                                                    <div className="space-y-4">
                                                                         <h4 className="font-serif text-xl text-slate-900">Om kurset</h4>
                                                                         <p className="text-slate-600 leading-relaxed font-light">
                                                                             Dette kurset har fokus på trygghet, mestring og svømmeglede.
                                                                             Barna lærer grunnleggende svømmeteknikker gjennom lek og øvelser.
                                                                         </p>
                                                                         <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-sm flex gap-3">
                                                                             <Info size={18} className="shrink-0 text-amber-700 mt-0.5" />
                                                                             <p className="text-slate-700 font-medium">
                                                                                På dette partiet (Nybegynner og Øvet) skal en foresatt være med barnet ut i vannet.
                                                                             </p>
                                                                         </div>
                                                                    </div>
                                                                ) : service.id === 'kids_pool_25m' ? (
                                                                    /* CONTENT FOR KIDS POOL 25M (Videregående) */
                                                                    <>
                                                                        {ageGroup.includes('Avansert') ? (
                                                                             /* AVANSERT NIVÅ */
                                                                            <>
                                                                                <div className="space-y-4">
                                                                                    <h4 className="font-serif text-xl text-slate-900">Teknikk og svømmetrening</h4>
                                                                                    <p className="text-slate-600 leading-relaxed font-light">
                                                                                        På dette nivået skal barna kunne crawle, ryggsvømme og svømmebryst, og være trygge i stort basseng.
                                                                                        Her svømmer vi mer lengder, i en fin kombinasjon av trening og øvelser. 
                                                                                        Vi stuper og dykker også.
                                                                                    </p>
                                                                                </div>
                                                                                <ul className="space-y-3 mt-4">
                                                                                    {[
                                                                                        "Videreutvikling av alle svømmearter",
                                                                                        "Svømming av lengder (trening)",
                                                                                        "Stup og dykking på dypet",
                                                                                        "Kombinasjon av lek og seriøs trening"
                                                                                    ].map((item, i) => (
                                                                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                                                                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                                                                                            {item}
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </>
                                                                        ) : ageGroup.includes('Øvet') ? (
                                                                             /* ØVET NIVÅ */
                                                                            <>
                                                                                <div className="space-y-4">
                                                                                    <h4 className="font-serif text-xl text-slate-900">Trygghet og øvelser i 25m</h4>
                                                                                    <p className="text-slate-600 leading-relaxed font-light">
                                                                                        Her skal barna være trygge på det å være i stort basseng.
                                                                                        Vi gjør øvelser i 25-meteren med fokus på bryst, rygg og crawl.
                                                                                        Vi har med dykk og stup også. Fokus på mestringsfølelse og at det er gøy å svømme.
                                                                                    </p>
                                                                                </div>
                                                                                <ul className="space-y-3 mt-4">
                                                                                    {[
                                                                                        "Øvelser i 25-meters basseng",
                                                                                        "Fokus på Bryst, Rygg og Crawl",
                                                                                        "Stup og dykk som en del av undervisningen",
                                                                                        "Mestringsfølelse og svømmeglede"
                                                                                    ].map((item, i) => (
                                                                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                                                                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                                                                                            {item}
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </>
                                                                        ) : (
                                                                             /* NYBEGYNNER NIVÅ (Default) */
                                                                            <>
                                                                                <div className="space-y-4">
                                                                                    <h4 className="font-serif text-xl text-slate-900">Trygghet i stort basseng</h4>
                                                                                    <p className="text-slate-600 leading-relaxed font-light">
                                                                                        Dette er et kurs der barna skal bli trygge på å svømme i stort basseng. 
                                                                                        Samtidig trener vi på svømmeteknikk som crawl, rygg og bryst.
                                                                                        Mestringsfølelse er i hovedfokus.
                                                                                    </p>
                                                                                </div>
                                                                                <ul className="space-y-3 mt-4">
                                                                                    {[
                                                                                        "Svømmeteknikk (Crawl, Rygg, Bryst)",
                                                                                        "Stup og dykkekunnskaper",
                                                                                        "Bli trygg på dypt vann",
                                                                                        "Mestringsfølelse og svømmeglede"
                                                                                    ].map((item, i) => (
                                                                                        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                                                                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-400 shrink-0" />
                                                                                            {item}
                                                                                        </li>
                                                                                    ))}
                                                                                </ul>
                                                                            </>
                                                                        )}
                                                                    </>
                                                                ) : (
                                                                    /* GENERIC CONTENT FOR OTHERS */
                                                                    <div className="space-y-4">
                                                                         <h4 className="font-serif text-xl text-slate-900">Om kurset</h4>
                                                                         <p className="text-slate-600 leading-relaxed font-light">
                                                                             Dette kurset har fokus på trygghet, mestring og svømmeglede. Våre instruktører
                                                                             gir tett oppfølging for å sikre god progresjon.
                                                                         </p>
                                                                    </div>
                                                                )}
                                                                <div className="space-y-3 pt-3 border-t border-white/5">
                                                                    <div className="flex gap-3 text-sm text-slate-400">
                                                                        <Info size={18} className="shrink-0 text-slate-500 mt-0.5" />
                                                                        <p>
                                                                            {(() => {
                                                                                if (service.id === 'baby') return "Inngangsbillett (0-3 år): Forelder betaler, babyen er gratis. Inngang kjøpes på Risenga.";
                                                                                if (service.id === 'toddler') {
                                                                                    if (ageGroup.includes('1 - 2') || ageGroup.includes('2 - 3')) return "Inngangsbillett (0-3 år): Forelder betaler, barnet er gratis. Inngang kjøpes på Risenga.";
                                                                                    if (ageGroup.includes('3 - 4') || ageGroup.includes('3 - 5') || ageGroup.includes('2 - 4')) return "Inngangsbillett (3-6 år): Barnet betaler, forelder er gratis. Inngang kjøpes på Risenga.";
                                                                                    return "Inngangsbillett: Barn under 3 år gratis (forelder betaler). Fra 3 år betaler barnet (forelder gratis).";
                                                                                }
                                                                                if (service.id === 'kids_therapy') {
                                                                                    if (ageGroup.includes('Øvet') && !ageGroup.includes('Litt')) return "Inngang kommer i tillegg, og kjøpes på Risenga.";
                                                                                    return "Inngangsbillett (3-6 år): Barnet betaler, forelder er gratis. Inngang kjøpes på Risenga.";
                                                                                }
                                                                                if (service.id === 'kids_pool_25m') return "Inngang kommer i tillegg, og kjøpes på Risenga.";
                                                                                return "Inngang kjøpes på Risenga.";
                                                                            })()}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                                })()}
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-fade-in p-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-serif text-slate-900">Informasjon om foresatte</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {renderNordicInput('parentFirstName', 'Fornavn *')}
                                        {renderNordicInput('parentLastName', 'Etternavn *')}
                                    </div>
                                    {renderNordicInput('email', 'E-post *', 'email')}
                                    {renderNordicInput('phone', 'Mobilnummer *', 'tel')}
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 animate-fade-in p-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-serif text-slate-900">Informasjon om barnet</h3>
                                    <p className="text-slate-500 text-sm">Vi trenger litt info for å plassere barnet på riktig nivå.</p>
                                    {renderNordicInput('childFirstName', 'Barnets fornavn *')}
                                    {renderNordicInput('childBirthDate', 'Fødselsdato (DD.MM.ÅÅÅÅ) *')}
                                </div>
                            </div>
                        )}

                        {step === 4 && (
                            <div className="space-y-6 animate-fade-in p-6">
                                <div className="space-y-4">
                                    <h3 className="text-lg font-serif text-slate-900">Adresse og detaljer</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="md:col-span-2">
                                            {renderNordicInput('address', 'Gateadresse *')}
                                        </div>
                                        <div className="md:col-span-2">
                                            {renderNordicInput('zipCity', 'Postnr og Sted *')}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-1">Hvor hørte du om oss? *</label>
                                        <div className="relative">
                                            <textarea
                                                name="heardAboutUs"
                                                value={formData.heardAboutUs}
                                                onChange={handleChange}
                                                rows={2}
                                                className={`w-full bg-slate-50 border rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-slate-900 focus:border-slate-900 outline-none transition-all resize-none shadow-sm ${errors.heardAboutUs ? 'border-rose-500' : 'border-slate-200 focus:shadow-[0_0_10px_rgba(15,23,42,0.1)]'
                                                    }`}
                                            />
                                            {errors.heardAboutUs && (
                                                <div className="absolute right-3 top-3 text-rose-500 pointer-events-none">
                                                    <AlertCircle size={18} />
                                                </div>
                                            )}
                                        </div>
                                        {errors.heardAboutUs && (
                                            <p className="text-rose-500 text-xs mt-1 ml-1 animate-fade-in">{errors.heardAboutUs}</p>
                                        )}
                                    </div>
                                    <div className={`bg-slate-50 p-4 rounded-xl border ${errors.termsAccepted ? 'border-rose-500/50 bg-rose-50' : 'border-slate-200'}`}>
                                        <label className="flex items-center gap-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.termsAccepted === 'Ja'}
                                                onChange={(e) => {
                                                    setFormData(prev => ({ ...prev, termsAccepted: e.target.checked ? 'Ja' : '' }));
                                                    if (e.target.checked && errors.termsAccepted) {
                                                        setErrors(prev => {
                                                            const newErrors = { ...prev };
                                                            delete newErrors.termsAccepted;
                                                            return newErrors;
                                                        });
                                                    }
                                                }}
                                                className="w-5 h-5 rounded border-slate-300 text-slate-900 focus:ring-slate-800 bg-white"
                                            />
                                            <span className="text-sm text-slate-600">
                                                Jeg aksepterer <button type="button" onClick={() => setShowTerms(true)} className="text-slate-900 underline hover:no-underline font-medium transition-colors">vilkårene</button> for påmelding *
                                            </span>
                                        </label>
                                        {errors.termsAccepted && (
                                            <p className="text-rose-500 text-xs mt-2 ml-8 animate-fade-in">{errors.termsAccepted}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 5 && (
                            <div className="space-y-6 animate-fade-in p-6">
                                <h3 className="text-lg font-serif text-slate-900 text-center">Se over og send inn</h3>
                                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 space-y-4 text-sm">
                                    <div className="flex justify-between border-b border-slate-200 pb-2">
                                        <span className="text-slate-500">Kurs</span>
                                        <span className="text-slate-900 font-medium text-right">{formData.selectedCourse}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-200 pb-2">
                                        <span className="text-slate-500">Foresatt</span>
                                        <span className="text-slate-900 font-medium text-right">{formData.parentFirstName} {formData.parentLastName}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-200 pb-2">
                                        <span className="text-slate-500">Barn</span>
                                        <span className="text-slate-900 font-medium text-right">{formData.childFirstName} ({formData.childBirthDate})</span>
                                    </div>
                                    <div className="flex justify-between border-b border-slate-200 pb-2">
                                        <span className="text-slate-500">Kontakt</span>
                                        <div className="text-right">
                                            <div className="text-slate-900 font-medium">{formData.email}</div>
                                            <div className="text-slate-500">{formData.phone}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex gap-3 shadow-sm">
                                    <FileText className="text-slate-700 shrink-0" size={20} />
                                    <p className="text-sm text-slate-600">
                                        Når du trykker "Fullfør påmelding" sendes informasjonen til oss. Du vil motta en bekreftelse på e-post kort tid etterpå.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer Buttons */}
                    <div className="p-6 border-t border-slate-100 bg-white flex justify-between items-center">
                        {step > 1 ? (
                            <button
                                onClick={handleBack}
                                className="flex items-center gap-2 text-slate-400 hover:text-slate-700 transition-colors px-4 py-2 rounded-lg hover:bg-slate-50"
                            >
                                <ChevronLeft size={20} /> Tilbake
                            </button>
                        ) : (<div></div>)}

                        {step < 5 ? (
                            <button
                                onClick={handleNext}
                                className={`group relative p-[1px] rounded-full overflow-hidden shadow-sm hover:shadow-md transition-all outline-none focus:outline-none ${step === 1 ? 'w-full' : ''}`}
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                                <div className="relative h-full w-full bg-slate-900 hover:bg-slate-800 rounded-full px-6 py-3 flex items-center justify-center gap-2 transition-colors">
                                    {step === 1 ? (
                                        <div className="flex flex-col items-center leading-none">
                                            <div className="flex items-center gap-2 text-white text-lg font-medium uppercase tracking-wider">
                                                Neste <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                            </div>
                                            <span className="text-slate-300 text-xs font-medium uppercase tracking-wide mt-0.5">for å fullføre påmeldingen</span>
                                        </div>
                                    ) : (
                                        <span className="text-white text-lg font-medium uppercase tracking-wider flex items-center gap-2">
                                            Neste <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </span>
                                    )}
                                </div>
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={status === 'submitting'}
                                className="group relative p-[1px] rounded-full overflow-hidden shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:outline-none"
                                style={{ WebkitTapHighlightColor: 'transparent' }}
                            >
                                <div className="relative h-full w-full bg-slate-900 hover:bg-slate-800 rounded-full px-8 py-3 flex items-center justify-center gap-2 transition-colors">
                                    <span className="text-white text-lg font-medium uppercase tracking-wider flex items-center gap-2">
                                        {status === 'submitting' ? 'Sender...' : (
                                            <>Fullfør påmelding <Send size={20} className="group-hover:translate-x-1 transition-transform" /></>
                                        )}
                                    </span>
                                </div>
                            </button>
                        )}
                    </div>
                </div>

                
                {/* Friendly Error Toast */}
                {showErrorToast && (
                    <div className="fixed inset-x-0 bottom-6 z-[70] flex justify-center pointer-events-none px-4 animate-fade-in-up">
                         <div className="bg-slate-900/95 backdrop-blur-md text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3 sm:gap-4 border border-white/10 w-fit max-w-full pointer-events-auto">
                            <div className="w-10 h-10 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0">
                                <span className="text-xl">😊</span>
                            </div>
                            <div className="min-w-0 flex-1">
                                <h4 className="font-bold text-sm text-white">Nesten i mål!</h4>
                                <p className="text-slate-300 text-xs text-wrap leading-tight">Fyll ut de siste feltene så går vi videre 🌟</p>
                            </div>
                            <button onClick={() => setShowErrorToast(false)} className="ml-1 text-slate-400 hover:text-white shrink-0 p-2 -mr-2">
                                <X size={18} />
                            </button>
                         </div>
                    </div>
                )}
                
                <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} theme={theme} />
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={onClose}></div>

            <div className={`relative w-full max-w-lg bg-slate-900 rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden max-h-[90vh] animate-fade-in ${isShaking ? 'animate-shake-custom' : ''}`}>
               
                {/* Shake Animation Style - Universal */}
                <style>{`
                    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                    @keyframes shake {
                        10%, 90% { transform: translate3d(-1px, 0, 0); }
                        20%, 80% { transform: translate3d(2px, 0, 0); }
                        30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
                        40%, 60% { transform: translate3d(4px, 0, 0); }
                    }
                    .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
                    .animate-shake-custom { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
                `}</style>

                {/* Header */}
                <div className="p-6 border-b border-white/10 bg-slate-900/50 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">Påmelding</h2>
                        <p className="text-cyan-400 text-sm font-medium truncate max-w-xs">{formData.selectedCourse}</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="px-6 pt-6 pb-2">
                    <div className="flex justify-between relative">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 transform -translate-y-1/2"></div>
                        <div
                            className="absolute top-1/2 left-0 h-0.5 bg-cyan-400 -z-10 transform -translate-y-1/2 transition-all duration-500 shadow-[0_0_15px_rgba(34,211,238,0.8)]"
                            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                        ></div>

                        {steps.map((s) => (
                            <div
                                key={s.id}
                                onClick={() => handleStepClick(s.id)}
                                className="flex flex-col items-center gap-3 cursor-pointer group"
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-500 ${step >= s.id
                                    ? 'bg-cyan-500 border-cyan-300 text-slate-900 shadow-[0_0_25px_rgba(34,211,238,0.6)] scale-125 ring-4 ring-cyan-500/20'
                                    : 'bg-slate-900 border-slate-700 text-slate-500'
                                    }`}>
                                    <s.icon size={20} strokeWidth={step >= s.id ? 3 : 2} />
                                </div>
                                <span className={`text-sm font-bold tracking-wide transition-colors duration-500 ${step >= s.id ? 'text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]' : 'text-slate-600'
                                    }`}>{s.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-0 custom-scrollbar bg-slate-900">
                    {step === 1 && (
                        <div className="animate-fade-in flex flex-col h-full">
                            {(() => {
                                // Parse selectedCourse string
                                // Format: "Level: AgeGroup (Day Time)" or "Level (Day Time)"
                                const match = formData.selectedCourse.match(/^(.+?)(?:: (.+?))? \((.+?) (.+?)\)$/);
                                let level = '', ageGroup = '', day = '', time = '';

                                if (match) {
                                    level = match[1];
                                    ageGroup = match[2] || '';
                                    day = match[3];
                                    time = match[4];
                                } else {
                                    // Fallback parsing
                                    const parts = formData.selectedCourse.split('(');
                                    level = parts[0]?.trim();
                                    const timeParts = parts[1]?.replace(')', '').split(' ');
                                    day = timeParts?.[0] || '';
                                    time = timeParts?.slice(1).join(' ') || '';
                                }

                                // Find service data
                                let service;

                                // 1. Try using the explicitly passed serviceId
                                if (serviceId) {
                                    service = SERVICES.find(s => s.id === serviceId);
                                }

                                // 2. If not found, try to match via SCHEDULE_DATA (most reliable fallback)
                                if (!service) {
                                    const scheduleDay = SCHEDULE_DATA.find(d => d.day === day);
                                    const session = scheduleDay?.sessions.find(s => s.time === time && s.level === level);
                                    if (session) {
                                        service = SERVICES.find(s => s.id === session.serviceId);
                                    }
                                }

                                // 3. Last resort: fuzzy match on title (prone to errors like Barn vs Småbarn)
                                if (!service) {
                                    service = SERVICES.find(s => s.title.toLowerCase().includes(level.toLowerCase()) || level.toLowerCase().includes(s.title.toLowerCase()));
                                }

                                // Fallback to first service if still not found (shouldn't happen if data is consistent)
                                if (!service) service = SERVICES[0];

                                const fullTitle = ageGroup ? `${level}: ${ageGroup}` : level;

                                const getStartDate = (d: string) => {
                                    if (d.toLowerCase().includes('onsdag')) return '7. jan';
                                    if (d.toLowerCase().includes('torsdag')) return '8. jan';
                                    return 'Januar';
                                };

                                return (
                                    <>
                                        {/* Header Image */}
                                        <div className="relative h-48 sm:h-64 w-full shrink-0">
                                            <img
                                                src={service.imageUrl}
                                                alt={service.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
                                        </div>

                                        {/* Content */}
                                        <div className="px-6 pt-6 pb-6 space-y-6">
                                            <div>
                                                <h2 className="text-2xl font-bold text-white leading-tight mb-2">{fullTitle}</h2>
                                                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                                    <MapPin size={16} className="text-cyan-500" />
                                                    {service.details.location.split(',')[0]}
                                                </div>
                                            </div>

                                            {/* Info Grid */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
                                                    <div className="flex items-center gap-2 text-cyan-400 mb-3">
                                                        <Calendar size={18} />
                                                        <span className="text-xs font-bold uppercase tracking-wider">Dag</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-bold text-lg capitalize">{day}</p>
                                                        <p className="text-sm text-slate-400 mt-1">Oppstart {getStartDate(day)}</p>
                                                    </div>
                                                </div>
                                                <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5 flex flex-col justify-between">
                                                    <div className="flex items-center gap-2 text-cyan-400 mb-3">
                                                        <Clock size={18} />
                                                        <span className="text-xs font-bold uppercase tracking-wider">Tid</span>
                                                    </div>
                                                    <div>
                                                        <p className="text-white font-bold text-lg">{time}</p>
                                                        <p className="text-sm text-slate-400 mt-1">{service.details.duration}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Price */}
                                            <div className="bg-slate-800/30 p-5 rounded-2xl border border-white/5 space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Pris</h3>
                                                        <p className="text-2xl font-bold text-cyan-400">{service.details.price}</p>
                                                    </div>
                                                    <div className="text-right mt-1">
                                                        <span className="inline-block bg-white/5 px-3 py-1 rounded-lg text-xs text-slate-300 font-medium">
                                                            ca. kr 185,- per gang
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="space-y-3 pt-3 border-t border-white/5">
                                                    <div className="flex gap-3 text-sm text-slate-400">
                                                        <Info size={18} className="shrink-0 text-slate-500 mt-0.5" />
                                                        <p>Det er fullt mulig å dele opp fakturaen, bare gi oss beskjed.</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Description */}
                                                <div className="text-slate-300 text-sm leading-relaxed border-t border-white/10 pt-6">
                                                    <p>{service.description.replace(/\*\*/g, '')}</p>
                                                    
                                                    {/* READ MORE EXPANDER */}
                                                    <div className="mt-4">
                                                        <button 
                                                            type="button"
                                                            onClick={() => setExpandedInfo(!expandedInfo)}
                                                            className="flex items-center gap-2 text-cyan-400 font-semibold text-sm hover:text-cyan-300 transition-colors group py-2"
                                                        >
                                                            <span>{expandedInfo ? 'Vis mindre info' : 'Les mer om hva vi gjør på kurset'}</span>
                                                            {expandedInfo ? <ChevronUp size={16} /> : <ChevronDown size={16} className="group-hover:translate-y-0.5 transition-transform" />}
                                                        </button>

                                                        {/* EXPANDABLE CONTENT */}
                                                        {expandedInfo && (
                                                            <div className="mt-6 space-y-6 animate-fade-in border-l-2 border-white/10 pl-4 sm:pl-6 bg-slate-800/30 -ml-4 -mr-4 p-4 rounded-xl sm:ml-0 sm:mr-0 sm:bg-transparent sm:p-0">
                                                                
                                                                {/* CONTENT FOR BABY SWIMMING */}
                                                                {service.id === 'baby' ? (
                                                                    <>
                                                                         <div className="space-y-4">
                                                                            <h4 className="font-serif text-xl text-white">Et minne for livet</h4>
                                                                            <p className="text-slate-300 leading-relaxed font-light">
                                                                                Babysvømming handler ikke om å lære å svømme teknisk, men om trygghet, mestring og en unik nærhet mellom forelder og barn.
                                                                                I vannet får babyen frihet til å bevege seg på en måte som ikke er mulig på land.
                                                                            </p>
                                                                            <img src="/images/baby_swimming_bw.jpg" alt="Babysvømming" className="rounded-2xl w-full h-48 object-cover shadow-sm grayscale opacity-90 my-4" />
                                                                        </div>

                                                                        <div className="grid gap-4">
                                                                            <h4 className="font-serif text-lg text-white mt-2">Hva lærer vi?</h4>
                                                                            <ul className="space-y-3">
                                                                                {[
                                                                                    "Trygghet under vann (dykking er alltid frivillig)",
                                                                                    "Selvberging og rotasjon mot rygg",
                                                                                    "Griperefleks og balansetrening",
                                                                                    "Sosialt samspill med andre babyer"
                                                                                ].map((item, i) => (
                                                                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                                                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                                                                                        {item}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                        </div>

                                                                        <div className="bg-slate-800 p-4 rounded-xl border border-white/10 text-sm space-y-2 shadow-sm">
                                                                            <p className="font-semibold text-white">Praktisk info</p>
                                                                            <p className="text-slate-300">
                                                                                Vi har god og varm vanntemperatur (ca 34 grader).
                                                                                Husk badebleie! Det er gratis parkering utenfor hallen.
                                                                            </p>
                                                                        </div>
                                                                        {service.id === 'baby' && (
                                                                            <div className="flex gap-3 text-sm text-slate-400">
                                                                                <Info size={18} className="shrink-0 text-slate-500 mt-0.5" />
                                                                                <p>Om 23 kursdager er lenge pga permisjonstid, så gi oss beskjed. Vi kan ordne færre kursdager.</p>
                                                                            </div>
                                                                        )}
                                                                    </>
                                                                ) : service.id === 'toddler' ? (
                                                                    /* CONTENT FOR TODDLER SWIMMING */
                                                                    <>
                                                                        <div className="space-y-4">
                                                                             <h4 className="font-serif text-xl text-white">Mestring og vannglede</h4>
                                                                             <p className="text-slate-300 leading-relaxed font-light">
                                                                                 Småbarnssvømming bygger videre på tryggheten fra babysvømming, eller gir en trygg start for nye.
                                                                                 Nå begynner vi med mer konkrete øvelser innbakt i lek og sang.
                                                                             </p>
                                                                        </div>
                                                                         <ul className="space-y-3 mt-2">
                                                                                {[
                                                                                    "Hoppe fra kanten og svømme tilbake",
                                                                                    "Dykke etter leker (for de som vil)",
                                                                                    "Flyte på rygg og mage",
                                                                                    "Grunnleggende arm- og beintak"
                                                                                ].map((item, i) => (
                                                                                    <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                                                                                        <div className="mt-1 w-1.5 h-1.5 rounded-full bg-slate-500 shrink-0" />
                                                                                        {item}
                                                                                    </li>
                                                                                ))}
                                                                            </ul>
                                                                    </>
                                                                ) : (
                                                                    /* GENERIC CONTENT FOR OTHERS */
                                                                    <div className="space-y-4">
                                                                         <h4 className="font-serif text-xl text-white">Om kurset</h4>
                                                                         <p className="text-slate-300 leading-relaxed font-light">
                                                                             Dette kurset har fokus på trygghet, mestring og svømmeglede. Våre instruktører
                                                                             er i vannet sammen med barna (unntatt på videregående nivåer) for å gi best mulig oppfølging.
                                                                         </p>
                                                                          <div className="bg-slate-800 p-4 rounded-xl border border-white/10 text-sm">
                                                                             <p className="text-slate-300">
                                                                                Møt gjerne opp 15 minutter før timen starter for å skifte.
                                                                                Vi møtes ved bassengkanten. Velkommen!
                                                                             </p>
                                                                         </div>
                                                                    </div>
                                                                )}
                                                                <div className="space-y-3 pt-3 border-t border-white/5">
                                                                    <div className="flex gap-3 text-sm text-slate-400">
                                                                        <Info size={18} className="shrink-0 text-slate-500 mt-0.5" />
                                                                        <p>
                                                                            {(() => {
                                                                                if (service.id === 'baby') return "Inngangsbillett (0-3 år): Forelder betaler, babyen er gratis. Inngang kjøpes på Risenga.";
                                                                                if (service.id === 'toddler') {
                                                                                    if (ageGroup.includes('1 - 2') || ageGroup.includes('2 - 3')) return "Inngangsbillett (0-3 år): Forelder betaler, barnet er gratis. Inngang kjøpes på Risenga.";
                                                                                    if (ageGroup.includes('3 - 4') || ageGroup.includes('3 - 5') || ageGroup.includes('2 - 4')) return "Inngangsbillett (3-6 år): Barnet betaler, forelder er gratis. Inngang kjøpes på Risenga.";
                                                                                    return "Inngangsbillett: Barn under 3 år gratis (forelder betaler). Fra 3 år betaler barnet (forelder gratis).";
                                                                                }
                                                                                if (service.id === 'kids_therapy') {
                                                                                    if (ageGroup.includes('Øvet') && !ageGroup.includes('Litt')) return "Inngang kommer i tillegg, og kjøpes på Risenga.";
                                                                                    return "Inngangsbillett (3-6 år): Barnet betaler, forelder er gratis. Inngang kjøpes på Risenga.";
                                                                                }
                                                                                if (service.id === 'kids_pool_25m') return "Inngang kommer i tillegg, og kjøpes på Risenga.";
                                                                                return "Inngang kjøpes på Risenga.";
                                                                            })()}
                                                                        </p>
                                                                    </div>
                                                                    {service.id !== 'kids_pool_25m' && service.id !== 'baby' && (
                                                                        <div className="flex gap-3 text-sm text-slate-400">
                                                                            <Info size={18} className="shrink-0 text-slate-500 mt-0.5" />
                                                                            <p>En foresatt er med i vannet med barnet på dette kurset.</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    );
                            })()}
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-6 animate-fade-in p-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-white">Informasjon om foresatte</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {renderInput('parentFirstName', 'Fornavn *')}
                                    {renderInput('parentLastName', 'Etternavn *')}
                                </div>
                                {renderInput('email', 'E-post *', 'email')}
                                {renderInput('phone', 'Mobilnummer *', 'tel')}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-fade-in p-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-white">Informasjon om barnet</h3>
                                <p className="text-slate-400 text-sm">Vi trenger litt info for å plassere barnet på riktig nivå.</p>
                                {renderInput('childFirstName', 'Barnets fornavn *')}
                                {renderInput('childBirthDate', 'Fødselsdato (DD.MM.ÅÅÅÅ) *')}
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6 animate-fade-in p-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-white">Adresse og detaljer</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        {renderInput('address', 'Gateadresse *')}
                                    </div>
                                    <div className="md:col-span-2">
                                        {renderInput('zipCity', 'Postnr og Sted *')}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-400 mb-1">Hvor hørte du om oss? *</label>
                                    <div className="relative">
                                        <textarea
                                            name="heardAboutUs"
                                            value={formData.heardAboutUs}
                                            onChange={handleChange}
                                            rows={2}
                                            className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition-all resize-none shadow-inner ${errors.heardAboutUs ? 'border-red-500' : 'border-slate-700 focus:shadow-[0_0_10px_rgba(34,211,238,0.2)]'
                                                }`}
                                        />
                                        {errors.heardAboutUs && (
                                            <div className="absolute right-3 top-3 text-red-500 pointer-events-none">
                                                <AlertCircle size={18} />
                                            </div>
                                        )}
                                    </div>
                                    {errors.heardAboutUs && (
                                        <p className="text-red-400 text-xs mt-1 ml-1 animate-fade-in">{errors.heardAboutUs}</p>
                                    )}
                                </div>
                                <div className={`bg-slate-800/50 p-4 rounded-xl border ${errors.termsAccepted ? 'border-red-500/50 bg-red-500/5' : 'border-white/5'}`}>
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.termsAccepted === 'Ja'}
                                            onChange={(e) => {
                                                setFormData(prev => ({ ...prev, termsAccepted: e.target.checked ? 'Ja' : '' }));
                                                if (e.target.checked && errors.termsAccepted) {
                                                    setErrors(prev => {
                                                        const newErrors = { ...prev };
                                                        delete newErrors.termsAccepted;
                                                        return newErrors;
                                                    });
                                                }
                                            }}
                                            className="w-5 h-5 rounded border-slate-600 text-cyan-500 focus:ring-cyan-500 bg-slate-700"
                                        />
                                        <span className="text-sm text-slate-300">
                                            Jeg aksepterer <button type="button" onClick={() => setShowTerms(true)} className="text-cyan-400 hover:underline focus:outline-none hover:text-cyan-300 transition-colors">vilkårene</button> for påmelding *
                                        </span>
                                    </label>
                                    {errors.termsAccepted && (
                                        <p className="text-red-400 text-xs mt-2 ml-8 animate-fade-in">{errors.termsAccepted}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 5 && (
                        <div className="space-y-6 animate-fade-in p-6">
                            <h3 className="text-lg font-bold text-white text-center">Se over og send inn</h3>

                            <div className="bg-slate-800/50 rounded-2xl p-6 border border-white/5 space-y-4 text-sm">
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-slate-400">Kurs</span>
                                    <span className="text-white font-medium text-right">{formData.selectedCourse}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-slate-400">Foresatt</span>
                                    <span className="text-white font-medium text-right">{formData.parentFirstName} {formData.parentLastName}</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-slate-400">Barn</span>
                                    <span className="text-white font-medium text-right">{formData.childFirstName} ({formData.childBirthDate})</span>
                                </div>
                                <div className="flex justify-between border-b border-white/5 pb-2">
                                    <span className="text-slate-400">Kontakt</span>
                                    <div className="text-right">
                                        <div className="text-white font-medium">{formData.email}</div>
                                        <div className="text-slate-400">{formData.phone}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 flex gap-3 shadow-[0_0_15px_rgba(34,211,238,0.1)]">
                                <FileText className="text-cyan-400 shrink-0" size={20} />
                                <p className="text-sm text-cyan-200">
                                    Når du trykker "Fullfør påmelding" sendes informasjonen til oss. Du vil motta en bekreftelse på e-post kort tid etterpå.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Buttons */}
                <div className="p-6 border-t border-white/10 bg-slate-900/50 flex justify-between items-center">
                    {step > 1 ? (
                        <button
                            onClick={handleBack}
                            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                        >
                            <ChevronLeft size={20} /> Tilbake
                        </button>
                    ) : (
                        <div></div> // Spacer
                    )}

                    {step < 5 ? (
                        <button
                            onClick={handleNext}
                            className={`group relative p-[1px] rounded-full overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all outline-none focus:outline-none ${step === 1 ? 'w-full' : ''}`}
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                            <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#22d3ee_50%,transparent_100%)] animate-spin-slow opacity-40 group-hover:opacity-80 transition-opacity" />
                            <div className="relative h-full w-full bg-cyan-950/80 hover:bg-cyan-950/60 rounded-full px-6 py-3 flex items-center justify-center gap-2 backdrop-blur-sm transition-colors">
                                {step === 1 ? (
                                    <div className="flex flex-col items-center leading-none">
                                        <div className="flex items-center gap-2 text-cyan-200 text-lg font-bold uppercase tracking-wider">
                                            Neste <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                        <span className="text-cyan-100 text-xs font-bold uppercase tracking-wide mt-0.5">for å fullføre påmeldingen</span>
                                    </div>
                                ) : (
                                    <span className="text-cyan-200 text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                                        Neste <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </span>
                                )}
                            </div>
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={status === 'submitting'}
                            className="group relative p-[1px] rounded-full overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed outline-none focus:outline-none"
                            style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                            <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#22d3ee_50%,transparent_100%)] animate-spin-slow opacity-40 group-hover:opacity-80 transition-opacity" />
                            <div className="relative h-full w-full bg-cyan-950/80 hover:bg-cyan-950/60 rounded-full px-8 py-3 flex items-center justify-center gap-2 backdrop-blur-sm transition-colors">
                                <span className="text-cyan-200 text-lg font-bold uppercase tracking-wider flex items-center gap-2">
                                    {status === 'submitting' ? 'Sender...' : (
                                        <>Fullfør påmelding <Send size={20} className="group-hover:translate-x-1 transition-transform" /></>
                                    )}
                                </span>
                            </div>
                        </button>
                    )}
                </div>
            </div>
            <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} theme={theme} />
        </div>
    );
};

export default EnrollmentWizardModal;
