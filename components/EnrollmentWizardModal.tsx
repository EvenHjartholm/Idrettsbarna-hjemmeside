import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle, User, Baby, MapPin, FileText, Send, AlertCircle, Info, Calendar, Clock, ArrowRight } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EnrollmentFormData } from '../types';
import TermsModal from './TermsModal';
import { SERVICES, SCHEDULE_DATA } from '../constants';

interface EnrollmentWizardModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCourse: string;
    serviceId?: string;
    onSuccess: (data: { childName: string; courseName: string; inquiryType: string }) => void;
}

const EnrollmentWizardModal: React.FC<EnrollmentWizardModalProps> = ({ isOpen, onClose, selectedCourse, serviceId, onSuccess }) => {
    const [step, setStep] = useState(1);
    const [showTerms, setShowTerms] = useState(false);
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
    const [errors, setErrors] = useState<Record<string, string>>({});
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
        }
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

    // Helper to render input field with error handling
    const renderInput = (name: keyof EnrollmentFormData, label: string, type: string = 'text', placeholder: string = '') => (
        <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">{label}</label>
            <div className="relative">
                <input
                    name={name}
                    type={type}
                    value={formData[name]}
                    onChange={handleChange}
                    className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${errors[name] ? 'border-red-500 pr-10' : 'border-slate-700'
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

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative w-full max-w-lg bg-slate-900 rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-scale-up max-h-[90vh]">

                {/* Header */}
                <div className="p-6 border-b border-white/10 bg-slate-900/50 flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-white">Påmelding</h2>
                        <p className="text-blue-400 text-sm font-medium truncate max-w-xs">{formData.selectedCourse}</p>
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
                            className="absolute top-1/2 left-0 h-0.5 bg-blue-500 -z-10 transform -translate-y-1/2 transition-all duration-300"
                            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                        ></div>

                        {steps.map((s) => (
                            <div key={s.id} className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= s.id
                                    ? 'bg-blue-500 border-blue-500 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-slate-900 border-slate-700 text-slate-500'
                                    }`}>
                                    <s.icon size={18} />
                                </div>
                                <span className={`text-xs font-medium transition-colors duration-300 ${step >= s.id ? 'text-blue-400' : 'text-slate-600'
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
                                                    {service.id === 'baby' && (
                                                        <div className="flex gap-3 text-sm text-slate-400">
                                                            <Info size={18} className="shrink-0 text-slate-500 mt-0.5" />
                                                            <p>Om 23 kursdager er lenge pga permisjonstid, så gi oss beskjed. Vi kan ordne færre kursdager.</p>
                                                        </div>
                                                    )}
                                                    {service.id !== 'kids_pool_25m' && service.id !== 'baby' && (
                                                        <div className="flex gap-3 text-sm text-slate-400">
                                                            <Info size={18} className="shrink-0 text-slate-500 mt-0.5" />
                                                            <p>En foresatt er med i vannet med barnet på dette kurset.</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="text-slate-300 text-sm leading-relaxed">
                                                <p>{service.description.replace(/\*\*/g, '')}</p>
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
                                            className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none ${errors.heardAboutUs ? 'border-red-500' : 'border-slate-700'
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
                                            className="w-5 h-5 rounded border-slate-600 text-blue-500 focus:ring-blue-500 bg-slate-700"
                                        />
                                        <span className="text-sm text-slate-300">
                                            Jeg aksepterer <button type="button" onClick={() => setShowTerms(true)} className="text-blue-400 hover:underline focus:outline-none">vilkårene</button> for påmelding *
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

                            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex gap-3">
                                <FileText className="text-blue-400 shrink-0" size={20} />
                                <p className="text-sm text-blue-200">
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
                            className={`group relative p-[1px] rounded-full overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all ${step === 1 ? 'w-full' : ''}`}
                        >
                            <div className="absolute inset-[-100%] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,#22d3ee_50%,transparent_100%)] animate-spin-slow opacity-40 group-hover:opacity-80 transition-opacity" />
                            <div className="relative h-full w-full bg-cyan-950/80 hover:bg-cyan-950/60 rounded-full px-6 py-3 flex items-center justify-center gap-2 backdrop-blur-sm transition-colors">
                                {step === 1 ? (
                                    <div className="flex flex-col items-center leading-none">
                                        <div className="flex items-center gap-2 text-cyan-200 text-lg font-bold uppercase tracking-wider">
                                            Neste <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                        <span className="text-cyan-200/80 text-[10px] font-normal mt-1">for å fullføre påmeldingen</span>
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
                            className="group relative p-[1px] rounded-full overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.1)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
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
            <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
        </div>
    );
};

export default EnrollmentWizardModal;
