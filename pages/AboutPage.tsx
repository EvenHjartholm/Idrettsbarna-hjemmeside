import React from 'react';
import { Theme } from '../App';

interface AboutPageProps {
    theme?: Theme;
}

const AboutPage: React.FC<AboutPageProps> = ({ theme }) => {
    return (
        <div className="pt-32 pb-20 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Om oss</h1>
                <p className="text-xl text-slate-300 mb-8">
                    Denne siden er under konstruksjon. Her kommer informasjon om Idrettsbarna og våre instruktører.
                </p>
                <div className="p-8 bg-slate-900/50 rounded-2xl border border-white/10">
                    <p className="text-slate-400">
                        I mellomtiden kan du lese mer om våre kurs på forsiden.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
