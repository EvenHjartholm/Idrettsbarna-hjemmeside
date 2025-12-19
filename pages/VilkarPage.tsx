import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, FileText, CheckCircle, CreditCard, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VilkarPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-[#FAFAF9] text-slate-900 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Vilkår for påmelding | Idrettsbarna</title>
                <meta name="description" content="Vilkår og betingelser for deltakelse på svømmekurs med Idrettsbarna." />
            </Helmet>

            <div className="max-w-4xl w-full mx-auto relative">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="group flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors font-medium border-b border-transparent hover:border-slate-900 pb-0.5 w-fit"
                >
                    <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                    Tilbake til forsiden
                </button>

                <div className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl p-8 md:p-16 relative">
                    
                    <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                <FileText className="w-8 h-8 text-slate-400" />
                            </div>
                            <h1 className="text-3xl md:text-5xl font-serif text-slate-900 tracking-tight">
                                Vilkår for påmelding
                            </h1>
                        </div>

                        <div className="space-y-12 text-slate-600 leading-relaxed font-light">

                            {/* Section 1: Bindende påmelding */}
                            <section className="bg-slate-50/50 p-8 rounded-2xl border border-slate-100">
                                <h2 className="text-xl font-serif text-slate-900 mb-4 flex items-center gap-3">
                                    <div className="p-1.5 bg-white rounded-full border border-slate-200 shadow-sm">
                                        <CheckCircle className="w-4 h-4 text-slate-900" />
                                    </div>
                                    1. Bindende påmelding
                                </h2>
                                <p className="mb-4 text-lg">
                                    Påmeldingen til våre svømmekurs er bindende. Hvis bassengene stenges av årsaker utenfor Idrettsbarna Svøm og Foto AS sin kontroll (force majeure), refunderes ikke kursavgiften, og fakturaen forblir gjeldende.
                                </p>
                            </section>

                            {/* Section 2: Prisregulering */}
                            <section className="p-4">
                                <h2 className="text-xl font-serif text-slate-900 mb-4 flex items-center gap-3">
                                    <div className="p-1.5 bg-slate-100 rounded-full border border-slate-200">
                                        <CreditCard className="w-4 h-4 text-slate-700" />
                                    </div>
                                    2. Prisregulering
                                </h2>
                                <p className="mb-4">
                                    Ved eventuelle prisreguleringer besluttet av politikerne i Asker, kan det sendes ut en ekstra faktura til kursdeltakerne. Vi håper dette ikke blir nødvendig, men må forholde oss til endringer som kan komme.
                                </p>
                            </section>

                            <hr className="border-slate-100" />

                            {/* Section 3: Avmelding */}
                            <section className="p-4">
                                <h2 className="text-xl font-serif text-slate-900 mb-4 flex items-center gap-3">
                                    <div className="p-1.5 bg-slate-100 rounded-full border border-slate-200">
                                        <AlertCircle className="w-4 h-4 text-slate-700" />
                                    </div>
                                    3. Avmelding
                                </h2>
                                <p className="mb-4">
                                    Ved avmelding før kursstart, hvis vi finner en erstatter, påløper et gebyr på kr. 500.
                                </p>
                            </section>

                        </div>

                        <div className="mt-16 pt-8 border-t border-slate-100 text-center">
                            <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">
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
