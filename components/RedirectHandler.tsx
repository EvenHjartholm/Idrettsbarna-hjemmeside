import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RedirectHandler: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const path = location.pathname;

        // List of redirects
        // Format: { from: string | RegExp, to: string }
        const redirects = [
            // Fix for malformed URL from old site/GSC
            { from: '/http://www.xn--lrsvmme-fxah8p.no', to: '/' },
            { from: '/http://www.læråsvømme.no', to: '/' },

            // FAQ
            { from: '/even-hjartholm-fotograf/faq', to: '/#faq' },

            // Livredning
            { from: '/even-hjartholm-fotograf/livredningsproven-skole---og-barnehage', to: '/kurs/lifesaving' },
            { from: '/livredningsproven', to: '/kurs/lifesaving' },
            { from: '/https://www.xn--lrsvmme-fxah8p.no/livredningsproven-skole-og-barnehage', to: '/kurs/lifesaving' },

            // Babysvømming
            { from: '/babysvomming', to: '/kurs/baby' },
            { from: '/http://læråsvømme.no/babysvomming', to: '/kurs/baby' },
            { from: '/http://www.læråsvømme.no/babysvomming', to: '/kurs/baby' },

            // Svømmekurs for barn
            { from: '/even-hjartholm-fotograf/svommekurs-for-barn', to: '/kurs/kids_therapy' },

            // Om oss
            { from: '/even-hjartholm-fotograf/om-oss', to: '/om-oss' },

            // Påmelding / Kontakt
            { from: '/even-hjartholm-fotograf/pameldingkontakt', to: '/#contact' },
            { from: '/https://www.xn--lrsvmme-fxah8p.no/pameldingkontakt', to: '/#contact' },

            // Portrettfotografering
            { from: '/https://www.xn--lrsvmme-fxah8p.no/portrettfotografering', to: '/portrettfotografering' },
        ];

        for (const rule of redirects) {
            if (path === rule.from || (rule.from instanceof RegExp && rule.from.test(path))) {
                console.log(`Redirecting from ${path} to ${rule.to}`);
                navigate(rule.to, { replace: true });
                return;
            }
        }
    }, [location, navigate]);

    return null;
};

export default RedirectHandler;
