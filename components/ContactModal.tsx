import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Phone, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { SERVICES } from '../constants';
import { Theme } from '../types';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedServiceId?: string | null;
    theme?: Theme;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, selectedServiceId, theme }) => {
    // Lock body scroll when modal is open
    // Reset status when modal opens
    useEffect(() => {
        if (isOpen) {
            setStatus('idle');
            setFormData({ name: '', email: '', message: '' });
        }
    }, [isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const SERVICE_ID = 'service_z5qlv57';
        const TEMPLATE_ID = 'template_8ifgw0r';
        const PUBLIC_KEY = 'AnYbkdu2hWdOx50pj';

        // Construct a comprehensive message body
        const fullMessage = `
--- NY HENVENDELSE FRA KONTAKTSKJEMA ---

Navn: ${formData.name}
E-post: ${formData.email}
Emne: ${selectedServiceId ? SERVICES.find(s => s.id === selectedServiceId)?.title : 'Generelt Spørsmål'}

Melding:
${formData.message}

----------------------------------------
Sent fra Idrettsbarna.no
        `.trim();

        const templateParams = {
            to_name: 'Idrettsbarna',
            from_name: formData.name, // Use the actual name provided
            from_email: formData.email,
            message: fullMessage, // Use the pre-formatted string
            message_body: formData.message, // Also send raw message if template uses it
            subject: `KONTAKT: ${formData.name}${selectedServiceId ? ` - ${SERVICES.find(s => s.id === selectedServiceId)?.title}` : ''}`,
            inquiry_type: 'Spørsmål'
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then(() => {
                setStatus('success');
                // No need to clear formData here as useEffect handles it on re-open, 
                // but we can keep it for cleaner state if they don't close immediately.
                setFormData({ name: '', email: '', message: '' });
                
                // Analytics Event: Lead Generation
                if (typeof (window as any).gtag === 'function') {
                    (window as any).gtag('event', 'generate_lead', {
                        event_category: 'Contact',
                        event_label: selectedServiceId ? `Service: ${selectedServiceId}` : 'General Inquiry'
                    });
                }
                if (typeof (window as any).fbq === 'function') {
                    (window as any).fbq('track', 'Lead', {
                        content_name: selectedServiceId ? `Service: ${selectedServiceId}` : 'General Inquiry'
                    });
                }
            })
            .catch((err) => {
                console.error('FAILED...', err);
                alert('Noe gikk galt. Prøv igjen senere.');
                setStatus('idle');
            });
    };

    const isNordic = theme === 'nordic';

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className={`fixed inset-0 backdrop-blur-sm transition-opacity ${
                    isNordic ? 'bg-slate-200/60' : 'bg-slate-950/80'
                }`}
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className={`relative w-full max-w-lg rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-scale-up max-h-[90vh] overflow-y-auto ${
                isNordic ? 'bg-[#FAFAF9] border border-slate-200' : 'bg-slate-900 border border-white/10'
            }`}>

                {/* Header */}
                <div className={`p-6 border-b flex items-center justify-between ${
                    isNordic ? 'bg-white border-slate-100' : 'bg-white/5 border-white/5'
                }`}>
                    <h2 className={`text-xl font-bold ${
                        isNordic ? 'font-serif text-slate-900' : 'text-white'
                    }`}>
                        Kontakt oss
                    </h2>
                    <button
                        onClick={onClose}
                        className={`transition-colors p-2 rounded-full ${
                            isNordic 
                                ? 'text-slate-400 hover:text-slate-900 hover:bg-slate-100' 
                                : 'text-slate-400 hover:text-white hover:bg-white/10'
                        }`}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-8">

                    {/* Direct Info */}
                    <div className="grid grid-cols-1 gap-4">
                        <a href="mailto:even@idrettsbarna.no" className={`flex items-center gap-4 p-5 rounded-xl border transition-all group ${
                            isNordic 
                                ? 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-md' 
                                : 'bg-slate-800/50 border-white/5 hover:bg-slate-800 hover:border-cyan-500/30'
                        }`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                                isNordic ? 'bg-slate-50 text-slate-600 group-hover:bg-slate-100' : 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20'
                            }`}>
                                <Mail size={24} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className={`text-xs uppercase tracking-wider mb-1 ${
                                    isNordic ? 'text-slate-500' : 'text-slate-400'
                                }`}>E-post</span>
                                <span className={`text-lg font-medium whitespace-nowrap ${
                                    isNordic ? 'text-slate-900' : 'text-white'
                                }`}>even@idrettsbarna.no</span>
                            </div>
                        </a>

                        <a href="tel:41906445" className={`flex items-center gap-4 p-5 rounded-xl border transition-all group ${
                            isNordic 
                                ? 'bg-white border-slate-100 hover:border-slate-200 hover:shadow-md' 
                                : 'bg-slate-800/50 border-white/5 hover:bg-slate-800 hover:border-cyan-500/30'
                        }`}>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                                isNordic ? 'bg-slate-50 text-slate-600 group-hover:bg-slate-100' : 'bg-cyan-500/10 text-cyan-400 group-hover:bg-cyan-500/20'
                            }`}>
                                <Phone size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-xs uppercase tracking-wider mb-1 ${
                                    isNordic ? 'text-slate-500' : 'text-slate-400'
                                }`}>Telefon</span>
                                <span className={`text-lg font-medium ${
                                    isNordic ? 'text-slate-900' : 'text-white'
                                }`}>41 90 64 45</span>
                            </div>
                        </a>
                    </div>

                    {/* Custom Message for Service Interest */}
                    {selectedServiceId && (
                        <div className={`rounded-xl p-4 ${
                            isNordic 
                                ? 'bg-slate-50 border border-slate-100' 
                                : 'bg-cyan-900/20 border border-cyan-500/30'
                        }`}>
                            <p className={`font-medium text-center ${
                                isNordic ? 'text-slate-700' : 'text-cyan-300'
                            }`}>
                                Takk for interessen for {SERVICES.find(s => s.id === selectedServiceId)?.title}
                            </p>
                        </div>
                    )}

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className={`w-full border-t ${
                                isNordic ? 'border-slate-200' : 'border-white/10'
                            }`}></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className={`px-2 ${
                                isNordic ? 'bg-[#FAFAF9] text-slate-400' : 'bg-slate-900 text-slate-500'
                            }`}>Eller send melding her</span>
                        </div>
                    </div>

                    {/* Form or Success View */}
                    {status === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
                            <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${
                                isNordic ? 'bg-green-100' : 'bg-green-500/20'
                            }`}>
                                <CheckCircle className={`${isNordic ? 'text-green-600' : 'text-green-500'}`} size={40} />
                            </div>
                            <h3 className={`text-2xl font-bold mb-2 ${
                                isNordic ? 'text-slate-900 font-serif' : 'text-white'
                            }`}>Melding sendt!</h3>
                            <p className={`max-w-xs mx-auto mb-8 ${
                                isNordic ? 'text-slate-600' : 'text-slate-300'
                            }`}>
                                Vi har mottatt din henvendelse på vår mail og svarer deg fortløpende.
                            </p>
                            <button
                                onClick={onClose}
                                className={`font-bold py-3 px-8 rounded-xl transition-all border ${
                                    isNordic 
                                        ? 'bg-slate-900 text-white hover:bg-slate-800 border-slate-900' 
                                        : 'bg-slate-800 text-white hover:bg-slate-700 border-white/10'
                                }`}
                            >
                                Lukk vinduet
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="contact-name" className={`block text-sm font-medium mb-1 ${
                                    isNordic ? 'text-slate-700' : 'text-slate-300'
                                }`}>Navn</label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all ${
                                        isNordic 
                                            ? 'bg-white border border-slate-200 text-slate-900 focus:ring-slate-400 placeholder-slate-400' 
                                            : 'bg-slate-800 border border-slate-700 text-white focus:ring-cyan-500 placeholder-slate-500'
                                    }`}
                                    placeholder="Ditt navn"
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-email" className={`block text-sm font-medium mb-1 ${
                                    isNordic ? 'text-slate-700' : 'text-slate-300'
                                }`}>E-post</label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all ${
                                        isNordic 
                                            ? 'bg-white border border-slate-200 text-slate-900 focus:ring-slate-400 placeholder-slate-400' 
                                            : 'bg-slate-800 border border-slate-700 text-white focus:ring-cyan-500 placeholder-slate-500'
                                    }`}
                                    placeholder="din@epost.no"
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-message" className={`block text-sm font-medium mb-1 ${
                                    isNordic ? 'text-slate-700' : 'text-slate-300'
                                }`}>Melding</label>
                                <textarea
                                    id="contact-message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                    className={`w-full rounded-lg px-4 py-3 focus:outline-none focus:ring-2 transition-all resize-none ${
                                        isNordic 
                                            ? 'bg-white border border-slate-200 text-slate-900 focus:ring-slate-400 placeholder-slate-400' 
                                            : 'bg-slate-800 border border-slate-700 text-white focus:ring-cyan-500 placeholder-slate-500'
                                    }`}
                                    placeholder="Hva lurer du på?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                                    isNordic 
                                        ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-slate-200' 
                                        : 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-900/50'
                                }`}
                            >
                                {status === 'submitting' ? (
                                    'Sender...'
                                ) : (
                                    <>
                                        <Send size={20} /> Send melding
                                    </>
                                )}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default ContactModal;
