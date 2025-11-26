import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, FileText, Shield, AlertCircle, CreditCard, Camera, Users, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VilkarPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-start pt-40 pb-20 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Vilkår for påmelding | Idrettsbarna</title>
                <meta name="description" content="Vilkår og betingelser for deltakelse på svømmekurs med Idrettsbarna." />
            </Helmet>

            <div className="max-w-4xl w-full mx-auto relative">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center text-slate-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Tilbake til forsiden
                </button>

                <div className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl p-8 md:p-12 relative">
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

                    <div className="relative z-10">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8 flex items-center gap-4">
                            <FileText className="w-10 h-10 text-cyan-400" />
                            Vilkår for påmelding
                        </h1>

                        <div className="space-y-12 text-slate-300 leading-relaxed">

                            {/* Section 1: Bindende påmelding */}
                            <section>
                                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5 text-green-400" />
                                    1. Bindende påmelding
                                </h2>
                                <p className="mb-4">
                                    Påmeldingen til våre svømmekurs er bindende. Hvis bassengene stenges av årsaker utenfor Idrettsbarna Svøm og Foto AS sin kontroll (force majeure), refunderes ikke kursavgiften, og fakturaen forblir gjeldende.
                                </p>
                            </section>

                            {/* Section 2: Prisregulering */}
                            <section>
                                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5 text-blue-400" />
                                    2. Prisregulering
                                </h2>
                                <p className="mb-4">
                                    Ved eventuelle prisreguleringer besluttet av politikerne i Asker, kan det sendes ut en ekstra faktura til kursdeltakerne. Vi håper dette ikke blir nødvendig, men må forholde oss til endringer som kan komme.
                                </p>
                            </section>

                            {/* Section 3: Avmelding */}
                            <section>
                                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-amber-400" />
                                    3. Avmelding
                                </h2>
                                <p className="mb-4">
                                    Ved avmelding før kursstart, hvis vi finner en erstatter, påløper et gebyr på kr. 500.
                                </p>
                            </section>

                        </div>

                        <div className="mt-12 pt-8 border-t border-white/10 text-center">
                            <p className="text-slate-500 text-sm">
                                Sist oppdatert: 26. November 2025
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VilkarPage;
