import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, CheckCircle, User, Baby, MapPin, FileText, Send, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { EnrollmentFormData } from '../types';
import TermsModal from './TermsModal';

interface EnrollmentWizardModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedCourse: string;
    onSuccess: (data: { childName: string; courseName: string; inquiryType: string }) => void;
}

const EnrollmentWizardModal: React.FC<EnrollmentWizardModalProps> = ({ isOpen, onClose, selectedCourse, onSuccess }) => {
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
            case 1: // Parent Info
                if (!formData.parentFirstName.trim()) newErrors.parentFirstName = 'Fornavn må fylles ut';
                if (!formData.parentLastName.trim()) newErrors.parentLastName = 'Etternavn må fylles ut';
                if (!formData.email.trim()) {
                    newErrors.email = 'E-post må fylles ut';
                } else if (!formData.email.includes('@')) {
                    newErrors.email = 'Ugyldig e-postadresse';
                }
                if (!formData.phone.trim()) newErrors.phone = 'Mobilnummer må fylles ut';
                break;
            case 2: // Child Info
                if (!formData.childFirstName.trim()) newErrors.childFirstName = 'Barnets navn må fylles ut';
                if (!formData.childBirthDate.trim()) {
                    newErrors.childBirthDate = 'Fødselsdato må fylles ut';
                } else if (formData.childBirthDate.length < 10) {
                    newErrors.childBirthDate = 'Fyll ut hele datoen (DD.MM.ÅÅÅÅ)';
                }
                break;
            case 3: // Details
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
        { id: 1, title: 'Foresatte', icon: User },
        { id: 2, title: 'Barnet', icon: Baby },
        { id: 3, title: 'Detaljer', icon: MapPin },
        { id: 4, title: 'Se over', icon: CheckCircle }
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
                    className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all ${errors[name] ? 'border-red-500 pr-10' : 'border-slate-700'
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

            <div className="relative w-full max-w-2xl bg-slate-900 rounded-3xl shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-scale-up max-h-[90vh]">

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
                            className="absolute top-1/2 left-0 h-0.5 bg-cyan-500 -z-10 transform -translate-y-1/2 transition-all duration-300"
                            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
                        ></div>

                        {steps.map((s) => (
                            <div key={s.id} className="flex flex-col items-center gap-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${step >= s.id
                                    ? 'bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                                    : 'bg-slate-900 border-slate-700 text-slate-500'
                                    }`}>
                                    <s.icon size={18} />
                                </div>
                                <span className={`text-xs font-medium transition-colors duration-300 ${step >= s.id ? 'text-cyan-400' : 'text-slate-600'
                                    }`}>{s.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                    {step === 1 && (
                        <div className="space-y-6 animate-fade-in">
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

                    {step === 2 && (
                        <div className="space-y-6 animate-fade-in">
                            <div className="space-y-4">
                                <h3 className="text-lg font-bold text-white">Informasjon om barnet</h3>
                                <p className="text-slate-400 text-sm">Vi trenger litt info for å plassere barnet på riktig nivå.</p>
                                {renderInput('childFirstName', 'Barnets fornavn *')}
                                {renderInput('childBirthDate', 'Fødselsdato (DD.MM.ÅÅÅÅ) *')}
                            </div>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="space-y-6 animate-fade-in">
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
                                            className={`w-full bg-slate-800 border rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all resize-none ${errors.heardAboutUs ? 'border-red-500' : 'border-slate-700'
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
                                            Jeg aksepterer <button type="button" onClick={() => setShowTerms(true)} className="text-cyan-400 hover:underline focus:outline-none">vilkårene</button> for påmelding *
                                        </span>
                                    </label>
                                    {errors.termsAccepted && (
                                        <p className="text-red-400 text-xs mt-2 ml-8 animate-fade-in">{errors.termsAccepted}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {step === 4 && (
                        <div className="space-y-6 animate-fade-in">
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

                            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4 flex gap-3">
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

                    {step < 4 ? (
                        <button
                            onClick={handleNext}
                            className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-cyan-900/20"
                        >
                            Neste <ChevronRight size={20} />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={status === 'submitting'}
                            className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-cyan-900/30 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'submitting' ? 'Sender...' : (
                                <>Fullfør påmelding <Send size={20} /></>
                            )}
                        </button>
                    )}
                </div>
            </div>
            <TermsModal isOpen={showTerms} onClose={() => setShowTerms(false)} />
        </div>
    );
};

export default EnrollmentWizardModal;
