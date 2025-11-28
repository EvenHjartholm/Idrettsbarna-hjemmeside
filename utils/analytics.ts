declare global {
    interface Window {
        gtag: (command: string, action: string, params?: any) => void;
        dataLayer: any[];
    }
}

export const trackEvent = (
    action: 'begin_checkout' | 'click_cta' | 'view_item',
    params?: {
        event_category?: string;
        event_label?: string;
        value?: number;
        currency?: string;
        items?: any[];
        [key: string]: any;
    }
) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', action, params);
        if (import.meta.env.DEV) {
            console.log(`[Analytics] Tracked event: ${action}`, params);
        }
    } else if (import.meta.env.DEV) {
        console.log(`[Analytics] (Dry Run) Tracked event: ${action}`, params);
    }
};
