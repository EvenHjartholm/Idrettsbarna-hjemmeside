import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Mail, Phone, Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { SERVICES } from '../constants';

interface ContactModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedServiceId?: string | null;
}

const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose, selectedServiceId }) => {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        const SERVICE_ID = 'service_z5qlv57';
        const TEMPLATE_ID = 'template_8ifgw0r';
        const PUBLIC_KEY = 'AnYbkdu2hWdOx50pj';

        const templateParams = {
            to_name: 'Idrettsbarna',
            from_name: 'Spørsmål',
            from_email: formData.email,
            // Use message body to include name since template might expect specific fields
            message: `Navn: ${formData.name}\nE-post: ${formData.email}\n\nMelding:\n${formData.message}`,
            subject: `KONTAKT: ${formData.name}${selectedServiceId ? ` - ${SERVICES.find(s => s.id === selectedServiceId)?.title}` : ''}`,
            inquiry_type: 'Spørsmål'
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
            .then(() => {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
            })
            .catch((err) => {
                console.error('FAILED...', err);
                alert('Noe gikk galt. Prøv igjen senere.');
                setStatus('idle');
            });
    };

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-lg bg-slate-900 rounded-2xl shadow-2xl border border-white/10 flex flex-col overflow-hidden animate-scale-up max-h-[90vh] overflow-y-auto">

                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
                    <h2 className="text-xl font-bold text-white">Kontakt oss</h2>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 space-y-8">


                    {/* Direct Info */}
                    <div className="grid grid-cols-1 gap-4">
                        <a href="mailto:even@idrettsbarna.no" className="flex items-center gap-4 p-5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-white/5 hover:border-cyan-500/30 transition-all group">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
                                <Mail className="text-cyan-400" size={24} />
                            </div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">E-post</span>
                                <span className="text-lg font-medium text-white tracking-wide whitespace-nowrap">even@idrettsbarna.no</span>
                            </div>
                        </a>

                        <a href="tel:41906445" className="flex items-center gap-4 p-5 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-white/5 hover:border-cyan-500/30 transition-all group">
                            <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors flex-shrink-0">
                                <Phone className="text-cyan-400" size={24} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">Telefon</span>
                                <span className="text-lg font-medium text-white tracking-wide">41 90 64 45</span>
                            </div>
                        </a>
                    </div>

                    {/* Custom Message for Service Interest */}
                    {selectedServiceId && (
                        <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-xl p-4">
                            <p className="text-cyan-300 font-medium text-center">
                                Takk for interessen for {SERVICES.find(s => s.id === selectedServiceId)?.title}
                            </p>
                        </div>
                    )}

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-slate-900 px-2 text-slate-500">Eller send melding her</span>
                        </div>
                    </div>

                    {/* Form or Success View */}
                    {status === 'success' ? (
                        <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
                            <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                                <CheckCircle className="text-green-500" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Melding sendt!</h3>
                            <p className="text-slate-300 max-w-xs mx-auto mb-8">
                                Vi har mottatt din henvendelse på vår mail og svarer deg fortløpende.
                            </p>
                            <button
                                onClick={onClose}
                                className="bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-xl transition-all border border-white/10"
                            >
                                Lukk vinduet
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="contact-name" className="block text-sm font-medium text-slate-300 mb-1">Navn</label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder-slate-500"
                                    placeholder="Ditt navn"
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-email" className="block text-sm font-medium text-slate-300 mb-1">E-post</label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder-slate-500"
                                    placeholder="din@epost.no"
                                />
                            </div>

                            <div>
                                <label htmlFor="contact-message" className="block text-sm font-medium text-slate-300 mb-1">Melding</label>
                                <textarea
                                    id="contact-message"
                                    required
                                    rows={4}
                                    value={formData.message}
                                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                                    className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder-slate-500 resize-none"
                                    placeholder="Hva lurer du på?"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'submitting'}
                                className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-white font-bold transition-all shadow-lg bg-cyan-600 hover:bg-cyan-500 hover:shadow-cyan-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
