import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    // GA4 Page View
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'page_view', {
        page_path: location.pathname + location.search,
        page_location: window.location.href,
        page_title: document.title,
      });
    }

    // Meta Pixel Page View
    if (typeof (window as any).fbq === 'function') {
      (window as any).fbq('track', 'PageView');
    }
  }, [location]);

  return null;
};

export default AnalyticsTracker;
