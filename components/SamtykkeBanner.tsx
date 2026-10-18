import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { hentSamtykke, settSamtykke, lastSporereHvisSamtykket } from '../utils/samtykke';

/**
 * Spør om samtykke til måling og annonsering.
 *
 * Vises bare til den som ikke har svart. Har de svart før, kommer det ikke
 * opp igjen — og har de sagt ja, lastes sporerne med en gang.
 *
 * Ingenting lastes før noen har trykket. Lukker de banneret uten å velge,
 * telles det som nei: taushet er ikke samtykke.
 *
 * Knappene er likeverdige med vilje. Et «nei» som er grått og lite, mens
 * «ja» lyser, er ikke et reelt valg.
 */
const SamtykkeBanner: React.FC = () => {
    const [vises, setVises] = useState(false);

    useEffect(() => {
        // Sjekken skjer etter montering, ikke under prerendering — der finnes
        // ingen nettleser og ingen localStorage.
        lastSporereHvisSamtykket();
        if (hentSamtykke() === null) setVises(true);
    }, []);

    if (!vises) return null;

    const svar = (valg: 'ja' | 'nei') => {
        settSamtykke(valg);
        setVises(false);
    };

    return (
        <div
            role="dialog"
            aria-label="Samtykke til måling og annonsering"
            className="fixed inset-x-0 bottom-0 z-[100] p-4 sm:p-6 animate-fade-in"
        >
            <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8">
                <h2
                    className="text-lg font-serif text-slate-900 mb-3"
                    style={{ fontFamily: 'inherit' }}
                >
                    Vi vil gjerne måle hvordan sidene brukes
                </h2>

                <p className="text-sm text-slate-600 leading-relaxed font-light mb-2">
                    Sier du ja, bruker vi Google Analytics til å se hvilke sider som
                    besøkes, og måleverktøy fra Google og Meta til å se om annonsene våre
                    virker. De får vite hvilke sider du ser på, og IP-adressen din.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed font-light mb-6">
                    Sier du nei, fungerer sidene akkurat som før. Du kan melde barnet ditt
                    på kurs uansett hva du velger.{' '}
                    <Link
                        to="/personvern"
                        className="text-slate-900 underline hover:no-underline font-medium"
                    >
                        Les personvernerklæringen
                    </Link>
                    .
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={() => svar('ja')}
                        className="flex-1 px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-colors"
                    >
                        Ja, det er greit
                    </button>
                    <button
                        onClick={() => svar('nei')}
                        className="flex-1 px-6 py-3 rounded-full bg-white text-slate-900 text-sm font-medium border border-slate-300 hover:bg-slate-50 transition-colors"
                    >
                        Nei takk
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SamtykkeBanner;
