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
            // Add more redirects here as needed
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
