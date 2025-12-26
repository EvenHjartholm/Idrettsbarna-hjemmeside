import React from 'react';
import { Theme } from '../types';
import { Helmet } from 'react-helmet-async';

interface PortraitPageProps {
    theme?: Theme;
}

const PortraitPage: React.FC<PortraitPageProps> = ({ theme }) => {
    return (
        <div className="pt-32 pb-20 px-4 min-h-screen">
            <Helmet>
                <title>Portrettfotografering | Idrettsbarna Asker</title>
                <meta name="description" content="Profesjonell portrettfotografering i vann. Vi fanger magiske øyeblikk av barnet ditt under vann." />
                <link rel="canonical" href="https://www.læråsvømme.no/portrettfotografering" />
            </Helmet>
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">Portrettfotografering</h1>
                <p className="text-xl text-slate-300 mb-8">
                    Denne siden er under konstruksjon.
                </p>
                <div className="p-8 bg-slate-900/50 rounded-2xl border border-white/10">
                    <p className="text-slate-400">
                        Mer informasjon om portrettfotografering kommer snart.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default PortraitPage;
