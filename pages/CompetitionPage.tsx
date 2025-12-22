import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Theme } from '../types';
import { Fish, Send, CheckCircle, HelpCircle } from 'lucide-react';
import SeaCreature from '../components/SeaCreature';

interface CompetitionPageProps {
    theme: Theme;
}

const CompetitionPage: React.FC<CompetitionPageProps> = ({ theme }) => {
    const isNordic = theme === 'nordic';

    // Simplified Colors (consistent with BabysvommingLandingPage)
    const colors = {
        bg: isNordic ? 'bg-[#FAFAF9]' : 'bg-slate-950',
        cardBg: isNordic ? 'bg-white' : 'bg-slate-900',
        text: isNordic ? 'text-slate-900' : 'text-white',
        textMuted: isNordic ? 'text-slate-600' : 'text-slate-400',
        border: isNordic ? 'border-slate-200' : 'border-slate-800',
        inputBg: isNordic ? 'bg-slate-50' : 'bg-slate-950',
        accent: isNordic ? 'text-cyan-700' : 'text-cyan-400',
        button: isNordic ? 'bg-slate-900 hover:bg-slate-800 text-white' : 'bg-cyan-600 hover:bg-cyan-500 text-white',
    };

    const [formState, setFormState] = useState({ name: '', email: '', count: '', answer: '' });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        
        // Simulate API call (replace with EmailJS or Supabase later if needed)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setSubmitting(false);
        setSubmitted(true);
    };

    return (
        <>
            <Helmet>
                <title>Konkurranse: Den Store Sjødyrjakten | Idrettsbarna</title>
                <meta name="description" content="Bli med på den store sjødyrjakten! Finn dyrene på nettsiden vår, svar på spørsmålet, og vinn halvt pris på babysvømmekurs." />
            </Helmet>

            <div className={`min-h-screen pt-32 pb-20 px-6 ${colors.bg} ${colors.text} font-sans relative overflow-hidden`}>
                


                <div className="container mx-auto max-w-2xl relative z-10">
                    
                    {/* Header */}
                    <div className="text-center space-y-6 mb-12">
                        <div className={`inline-flex items-center justify-center p-4 rounded-full ${colors.cardBg} shadow-lg border ${colors.border} mb-4`}>
                            <Fish size={40} className={colors.accent} strokeWidth={1.5} />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-light">
                            Den Store <span className="italic block mt-2">Sjødyrjakten</span>
                        </h1>
                        <p className={`text-lg ${colors.textMuted} font-light leading-relaxed max-w-md mx-auto`}>
                            Vi har gjemt en rekke sjødyr rundt omkring på nettsiden vår. Klarer du å finne alle?
                        </p>
                    </div>

                    {/* Prize Info */}
                    <div className={`${colors.cardBg} p-8 rounded-3xl border ${colors.border} shadow-xl mb-12 relative overflow-hidden group`}>
                        <div className={`absolute top-0 left-0 w-full h-2 ${isNordic ? 'bg-gradient-to-r from-cyan-500 to-blue-600' : 'bg-gradient-to-r from-cyan-400 to-blue-500'}`} />
                        <div className="text-center space-y-4 relative z-10">
                            <span className="text-xs font-bold tracking-[0.2em] uppercase opacity-60">Premien</span>
                            <h2 className="text-3xl font-serif">Vinn Halv Pris</h2>
                            <p className={`${colors.textMuted} font-light`}>på valgfritt babysvømmekurs i 2026!</p>
                        </div>
                    </div>

                    {/* Submission Form */}
                    <div className={`${colors.cardBg} p-8 md:p-12 rounded-3xl border ${colors.border} shadow-lg`}>
                        {!submitted ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium tracking-wide uppercase opacity-70">Hvor mange sjødyr fant du?</label>
                                    <div className="relative">
                                        <select 
                                            required 
                                            className={`w-full p-4 rounded-xl ${colors.inputBg} border ${colors.border} focus:ring-2 focus:ring-cyan-500 outline-none appearance-none transition-all cursor-pointer`}
                                            value={formState.count}
                                            onChange={(e) => setFormState({...formState, count: e.target.value})}
                                        >
                                            <option value="" disabled>Velg antall...</option>
                                            {[3,4,5,6,7,8,9,10].map(n => (
                                                <option key={n} value={n}>{n} sjødyr</option>
                                            ))}
                                        </select>
                                        <HelpCircle className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 pointer-events-none" size={20} />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium tracking-wide uppercase opacity-70">Navn</label>
                                        <input 
                                            type="text" 
                                            required
                                            className={`w-full p-4 rounded-xl ${colors.inputBg} border ${colors.border} focus:ring-2 focus:ring-cyan-500 outline-none transition-all`}
                                            placeholder="Ola Nordmann"
                                            value={formState.name}
                                            onChange={(e) => setFormState({...formState, name: e.target.value})}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium tracking-wide uppercase opacity-70">E-post</label>
                                        <input 
                                            type="email" 
                                            required
                                            className={`w-full p-4 rounded-xl ${colors.inputBg} border ${colors.border} focus:ring-2 focus:ring-cyan-500 outline-none transition-all`}
                                            placeholder="ola@eksempel.no"
                                            value={formState.email}
                                            onChange={(e) => setFormState({...formState, email: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={submitting}
                                    className={`w-full py-5 rounded-xl ${colors.button} font-bold text-lg tracking-wide uppercase flex items-center justify-center gap-3 transition-all transform hover:scale-[1.02] disabled:opacity-70 disabled:hover:scale-100`}
                                >
                                    {submitting ? 'Sender inn...' : 'Send inn svar'}
                                    {!submitting && <Send size={20} />}
                                </button>
                                
                                <p className="text-center text-xs opacity-50 pt-4">
                                    Vinneren trekkes 31. januar og kontaktes på e-post.
                                </p>
                            </form>
                        ) : (
                            <div className="text-center space-y-6 py-12 animate-in fade-in zoom-in duration-500">
                                <div className={`w-20 h-20 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-6`}>
                                    <CheckCircle size={40} />
                                </div>
                                <h3 className="text-3xl font-serif">Takk for ditt svar!</h3>
                                <p className={`${colors.textMuted} text-lg font-light max-w-sm mx-auto`}>
                                    Vi har registrert ditt svar. Lykke til i trekningen!
                                </p>
                                <button 
                                    onClick={() => window.location.href = 'https://facebook.com/idrettsbarna'}
                                    className={`mt-8 px-8 py-3 rounded-full border ${colors.border} hover:bg-slate-100 text-sm font-medium transition-all`}
                                >
                                    Tips en venn på Facebook
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
};

export default CompetitionPage;
