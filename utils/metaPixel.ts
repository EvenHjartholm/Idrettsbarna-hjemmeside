/**
 * Meta Pixel + Conversion API (CAPI) – Sentralisert tracking
 * 
 * Browser Pixel sender hendelser direkte til Meta fra nettleseren.
 * CAPI sender de viktigste hendelsene (ViewContent, Lead, CompleteRegistration, Purchase)
 * via Supabase Edge Function til Meta server-side.
 * 
 * Begge bruker samme event_id for deduplisering.
 * Ingen persondata (navn, e-post, telefon, fødselsdato) sendes til Meta.
 */

const PIXEL_ID = '275364239776475';

// Supabase config — same as used in EnrollmentWizardModal
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL
    || 'https://lvcjbqmlmbmvxtskecvy.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY
    || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2Y2picW1sbWJtdnh0c2tlY3Z5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUxOTA4MzAsImV4cCI6MjA4MDc2NjgzMH0.w2w-sblBGtYIUTQ6p6scWrm1PUaXv5tC57oNTW434eQ';

/** Generate a unique event ID for deduplication between browser Pixel and CAPI */
function generateEventId(): string {
    // Use crypto.randomUUID if available, otherwise fallback
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/** Get current Unix timestamp in seconds (Meta requires seconds, not ms) */
function getEventTime(): number {
    return Math.floor(Date.now() / 1000);
}

/**
 * Send event to Meta via Supabase Edge Function (CAPI).
 * Fire-and-forget — errors are logged but never block the UI.
 */
async function sendToCapi(
    eventName: string,
    eventId: string,
    eventTime: number,
    customData?: Record<string, any>
): Promise<void> {
    try {
        const response = await fetch(`${SUPABASE_URL}/functions/v1/meta-capi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({
                event_name: eventName,
                event_id: eventId,
                event_time: eventTime,
                event_source_url: window.location.href,
                custom_data: customData || {},
            }),
        });

        if (!response.ok) {
            console.warn(`[CAPI] ${eventName} failed:`, response.status);
        } else if (import.meta.env.DEV) {
            console.log(`[CAPI] ${eventName} sent successfully (event_id: ${eventId})`);
        }
    } catch (err) {
        // Never block the UI — just log
        console.warn(`[CAPI] ${eventName} network error:`, err);
    }
}

/**
 * Send event to browser Meta Pixel with event_id for deduplication.
 */
function sendToPixel(
    eventName: string,
    eventId: string,
    params?: Record<string, any>
): void {
    if (typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', eventName, params || {}, { eventID: eventId });
    }
}

// ─── Public API ────────────────────────────────────────────────

/**
 * Track PageView — browser Pixel only (no CAPI).
 * Called by AnalyticsTracker on every route change.
 */
export function trackPageView(): void {
    if (typeof (window as any).fbq === 'function') {
        (window as any).fbq('track', 'PageView');
    }
}

/**
 * Track ViewContent — browser Pixel + CAPI.
 * Called when a user views a course details page.
 */
export function trackViewContent(params: {
    content_name: string;
    content_category?: string;
    content_ids?: string[];
    value?: number;
    currency?: string;
}): void {
    const eventId = generateEventId();
    const eventTime = getEventTime();

    const pixelParams = {
        content_name: params.content_name,
        content_category: params.content_category || 'Course',
        content_ids: params.content_ids,
        content_type: 'product',
        value: params.value || 0,
        currency: params.currency || 'NOK',
    };

    sendToPixel('ViewContent', eventId, pixelParams);
    sendToCapi('ViewContent', eventId, eventTime, {
        content_name: params.content_name,
        content_category: params.content_category || 'Course',
        value: params.value || 0,
        currency: params.currency || 'NOK',
    });
}

/**
 * Track Lead — browser Pixel + CAPI.
 * Called when a user submits the contact form.
 */
export function trackLead(params: {
    content_name: string;
}): void {
    const eventId = generateEventId();
    const eventTime = getEventTime();

    sendToPixel('Lead', eventId, {
        content_name: params.content_name,
    });
    sendToCapi('Lead', eventId, eventTime, {
        content_name: params.content_name,
    });
}

/**
 * Track CompleteRegistration — browser Pixel + CAPI.
 * Called when a course enrollment is successfully submitted.
 */
export function trackCompleteRegistration(params: {
    content_name: string;
    content_category: string;
    value: number;
    currency?: string;
}): void {
    const eventId = generateEventId();
    const eventTime = getEventTime();

    const data = {
        content_name: params.content_name,
        content_category: params.content_category,
        currency: params.currency || 'NOK',
        value: params.value,
    };

    sendToPixel('CompleteRegistration', eventId, data);
    sendToCapi('CompleteRegistration', eventId, eventTime, data);
}

/**
 * Track Purchase — browser Pixel + CAPI.
 * Called alongside CompleteRegistration for ROAS tracking.
 */
export function trackPurchase(params: {
    content_name: string;
    content_category: string;
    value: number;
    currency?: string;
}): void {
    const eventId = generateEventId();
    const eventTime = getEventTime();

    const data = {
        content_name: params.content_name,
        content_category: params.content_category,
        currency: params.currency || 'NOK',
        value: params.value,
        content_type: 'product',
    };

    sendToPixel('Purchase', eventId, data);
    sendToCapi('Purchase', eventId, eventTime, data);
}
