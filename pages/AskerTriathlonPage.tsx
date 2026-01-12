import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { Phone, Users, Shield, Heart, MapPin, ArrowRight, ExternalLink, Clock, CheckCircle2 } from 'lucide-react';
import { Theme, EnrollmentFormData } from '../types';
import EnrollmentWizardModal from '../components/EnrollmentWizardModal';
import SuccessModal from '../components/SuccessModal';

interface AskerTriathlonPageProps {
    theme: Theme;
}

const AskerTriathlonPage: React.FC<AskerTriathlonPageProps> = ({ theme }) => {
    const navigate = useNavigate();
    const [showEnrollmentWizard, setShowEnrollmentWizard] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successData, setSuccessData] = useState<{ childName: string; courseName: string; inquiryType: string; startDate?: string } | null>(null);

    const handleEnroll = (groupName: string, time: string) => {
        setSelectedCourse(`Tirsdagstrening: ${groupName} (Tirsdager ${time})`);
        setShowEnrollmentWizard(true);
    };

    const handleSuccess = (data: { childName: string; courseName: string; inquiryType: string; startDate?: string }) => {
        setSuccessData(data);
        setShowSuccess(true);
    };

    const trainingGroups = [
        {
            name: "Gruppe 1: Nybegynner",
            time: "19:00 - 19:50",
            description: "For deg som vil i gang med crawl og grunnleggende triatlonsvømming.",
            icon: <Users size={24} />
        },
        {
            name: "Gruppe 2: Øvet og viderekommende",
            time: "19:50 - 20:40",
            description: "For deg som har god teknikk og ønsker å jobbe med utholdenhet og fart.",
            icon: <Shield size={24} />
        },
        {
            name: "Gruppe 3: Øvet og viderekommende",
            time: "20:40 - 21:30",
            description: "Kveldsgruppe for de som ønsker en intensiv økt i vannet.",
            icon: <Heart size={24} />
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans pt-20">
            <Helmet>
                <title>Asker Triathlonklubb Tirsdagstrening | Idrettsbarna</title>
                <meta name="description" content="Egen treningsside for Asker Triathlonklubb medlemmer. Tirsdagstrening for voksne og ungdom på Holmen svømmehall." />
                <link rel="canonical" href="https://www.læråsvømme.no/asker-triathlon" />
            </Helmet>

            {/* Hero Section */}
            <section className="bg-white py-16 px-6 border-b border-slate-100">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold mb-6">
                        <Users size={16} />
                        EKSKLUSIVT FOR ASKER TRIATHLON MEDLEMMER
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 leading-tight">
                        Tirsdagstrening på Holmen
                    </h1>
                    <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
                        Vi tilbyr spesialtrente grupper for voksne og ungdom som er medlemmer i Asker Triathlonklubb. 
                        Fokus på teknikk, fremdrift og utholdenhet i vannet.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a 
                            href="https://www.askertri.no/next/p/56830/bli-medlem"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-bold rounded-full shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                        >
                            <ExternalLink size={18} />
                            Bli medlem i Asker Triathlon
                        </a>
                        <div className="text-slate-500 font-medium">
                            Pris: <span className="text-slate-900 font-bold underline">Kr 850,-</span> (10 kursdager)
                        </div>
                    </div>
                </div>
            </section>

            {/* Training Groups */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl font-serif text-center mb-12 text-slate-900">Treningstider</h2>
                    
                    <div className="grid md:grid-cols-3 gap-8">
                        {trainingGroups.map((group, index) => (
                            <div key={index} className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-50 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500">
                                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                                    {group.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-slate-900 leading-tight h-14 flex items-center justify-center">
                                    {group.name}
                                </h3>
                                <div className="flex items-center gap-2 text-slate-500 font-medium mb-4">
                                    <Clock size={16} />
                                    {group.time}
                                </div>
                                <p className="text-slate-600 mb-8 text-sm leading-relaxed flex-1">
                                    {group.description}
                                </p>
                                <button 
                                    onClick={() => handleEnroll(group.name, group.time)}
                                    className="w-full py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
                                >
                                    Meld på denne gruppen
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* General Info */}
            <section className="py-20 px-6 bg-slate-900 text-white rounded-[4rem] mx-4 mb-20">
                <div className="container mx-auto max-w-4xl">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-3xl font-serif mb-8">Viktig informasjon</h2>
                            <ul className="space-y-6">
                                <li className="flex gap-4">
                                    <div className="shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                        <CheckCircle2 size={20} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Medlemskap kreves</h4>
                                        <p className="text-slate-400 text-sm">Du må ha aktivt medlemskap i Asker Triathlonklubb for å delta. Kontrolleres ved oppstart.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                        <MapPin size={20} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">Sted og Oppstart</h4>
                                        <p className="text-slate-400 text-sm">Treningene foregår i Holmen Svømmehall. Oppstart tirsdag 20. januar 2026.</p>
                                    </div>
                                </li>
                                <li className="flex gap-4">
                                    <div className="shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                                        <Users size={20} className="text-blue-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold mb-1">For alle nivåer</h4>
                                        <p className="text-slate-400 text-sm">Enten du er nybegynner eller erfaren triatlet, har vi en gruppe som passer ditt nivå.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="space-y-8">
                            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                                <h3 className="text-xl font-bold mb-4">Har du spørsmål?</h3>
                                <p className="text-slate-400 mb-6 text-sm">
                                    Lurer du på hvilken gruppe som passer best for deg, eller har du tekniske problemer med påmeldingen?
                                </p>
                                <a 
                                    href="tel:41906445"
                                    className="flex items-center gap-3 text-blue-400 font-bold hover:text-blue-300 transition-colors"
                                >
                                    <Phone size={20} />
                                    Ring oss på 419 06 445
                                </a>
                            </div>
                            <div className="text-center">
                                <button 
                                    onClick={() => navigate('/svommekurs-asker')}
                                    className="text-white/60 hover:text-white transition-colors text-sm font-medium flex items-center justify-center gap-2 mx-auto"
                                >
                                    Se alle svømmekurs i Asker
                                    <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Modals */}
            <EnrollmentWizardModal
                isOpen={showEnrollmentWizard}
                onClose={() => setShowEnrollmentWizard(false)}
                selectedCourse={selectedCourse}
                serviceId="triathlon_tuesday"
                onSuccess={handleSuccess}
                theme={theme}
            />

            <SuccessModal
                isOpen={showSuccess}
                onClose={() => {
                    setShowSuccess(false);
                    setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 50);
                }}
                childName={successData?.childName || ''}
                courseName={successData?.courseName || ''}
                inquiryType={successData?.inquiryType || ''}
                startDate={successData?.startDate}
            />
        </div>
    );
};

export default AskerTriathlonPage;
