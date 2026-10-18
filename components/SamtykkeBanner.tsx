import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { hentSamtykke, settSamtykke, lastSporereHvisSamtykket } from '../utils/samtykke';

/**
 * Spør om samtykke til informasjonskapsler.
 *
 * Vises bare til den som ikke har svart. Har de svart før, kommer det ikke
 * opp igjen — og har de sagt ja, lastes sporerne med en gang.
 *
 * Teksten er kort med vilje. Kravet er at samtykket skal være informert,
 * ikke at alt skal stå i banneret. Hvilke verktøy som brukes, hva de mottar
 * og hvorfor, står i personvernerklæringen — som det lenkes rett til. Det er
 * måten de fleste gjør det på, og den som faktisk blir lest.
 *
 * Ingenting lastes før noen har trykket. Lukker de siden uten å velge,
 * telles det som nei — taushet er ikke samtykke.
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
            aria-label="Informasjonskapsler"
            className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4 animate-fade-in"
        >
            <div className="max-w-lg mx-auto bg-white/95 backdrop-blur rounded-xl border border-slate-200 shadow-lg px-3.5 py-2.5 flex items-center gap-3">
                <p className="text-[12px] text-slate-600 leading-snug font-light flex-1">
                    Vi bruker informasjonskapsler.{' '}
                    <Link
                        to="/personvern"
                        className="text-slate-900 underline underline-offset-2 hover:no-underline"
                    >
                        Les mer
                    </Link>
                </p>

                <div className="flex gap-1.5 shrink-0">
                    <button
                        onClick={() => svar('ja')}
                        className="px-3 py-1.5 rounded-full bg-slate-900 text-white text-[12px] font-medium hover:bg-slate-800 transition-colors whitespace-nowrap"
                    >
                        Godta
                    </button>
                    <button
                        onClick={() => svar('nei')}
                        className="px-3 py-1.5 rounded-full bg-white text-slate-700 text-[12px] font-medium border border-slate-300 hover:bg-slate-50 transition-colors whitespace-nowrap"
                    >
                        Nei takk
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SamtykkeBanner;
