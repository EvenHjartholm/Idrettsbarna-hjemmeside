import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GeminiAssistant from './components/GeminiAssistant';
import ParallaxBackground from './components/ParallaxBackground';
import HomePage from './pages/HomePage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import VilkarPage from './pages/VilkarPage';
import NewsPage from './pages/NewsPage';
import NewsArticlePage from './pages/NewsArticlePage';
import BabysvommingLandingPage from './pages/BabysvommingLandingPage';
import BabysvommingRisengaPage from './pages/BabysvommingRisengaPage'; 


import AboutPage from './pages/AboutPage';
import PortraitPage from './pages/PortraitPage';
import ContactModal from './components/ContactModal';
import TermsModal from './components/TermsModal';
import ScrollToTop from './components/ScrollToTop';
import { EnrollmentFormData, Theme } from './types';

const App: React.FC = () => {
  // Theme state managed here
  const [theme, setTheme] = React.useState<Theme>('nordic');

  const [aiFormOverrides, setAiFormOverrides] = React.useState<Partial<EnrollmentFormData>>({});
  const [showContactModal, setShowContactModal] = React.useState(false);
  const [showTermsModal, setShowTermsModal] = React.useState(false);

  // Toggle between Default (Dark) and Nordic (Light)
  const toggleTheme = () => {
    setTheme(prev => prev === 'default' ? 'nordic' : 'default');
  };

  return (
    <Router>
      <div className={`min-h-screen bg-primary text-txt-secondary font-sans selection:bg-accent selection:text-white relative transition-colors duration-500 theme-${theme}`}>
        <ParallaxBackground theme={theme} />
        <Navbar theme={theme} toggleTheme={toggleTheme} onOpenContact={() => setShowContactModal(true)} />


        <ScrollToTop />
        <Routes>

          <Route path="/" element={<HomePage onAIFormUpdate={setAiFormOverrides} aiFormOverrides={aiFormOverrides} theme={theme} toggleTheme={toggleTheme} onOpenContact={() => setShowContactModal(true)} onOpenTerms={() => setShowTermsModal(true)} />} />
          <Route path="/kurs/:id" element={<CourseDetailsPage theme={theme} />} />
          <Route path="/vilkar" element={<VilkarPage />} />
          <Route path="/faq" element={<Navigate to="/#faq" replace />} />
          <Route path="/pameldingkontakt" element={<Navigate to="/#contact" replace />} />
          
          {/* SEO Landing Page */}
          <Route path="/babysvomming-asker" element={<BabysvommingLandingPage theme={theme} />} />
          <Route path="/babysvomming-risenga" element={<BabysvommingRisengaPage theme={theme} />} />
          
          <Route path="/smabarnsvomming" element={<Navigate to="/kurs/toddler" replace />} />
          <Route path="/svommekurs-for-barn" element={<Navigate to="/kurs/kids_therapy" replace />} />
          <Route path="/hjem" element={<Navigate to="/" replace />} />
          <Route path="/news/babysvomming-i-asker-med-idrettsbarna---oppst-12" element={<Navigate to="/nyheter/babysvomming-i-asker-med-idrettsbarna---oppst-12" replace />} />
          <Route path="/news" element={<Navigate to="/nyheter" replace />} />
          <Route path="/news/*" element={<Navigate to="/nyheter" replace />} />
          <Route path="/nyheter" element={<NewsPage theme={theme} />} />
          <Route path="/nyheter/:slug" element={<NewsArticlePage theme={theme} />} />
          <Route path="/om-oss" element={<AboutPage theme={theme} />} />

          <Route path="/portrettfotografering" element={<PortraitPage theme={theme} />} />
          {/* Redirects for legacy URLs */}
          <Route path="/http://www.xn--lrsvmme-fxah8p.no" element={<Navigate to="/" replace />} />
          <Route path="/http://www.læråsvømme.no" element={<Navigate to="/" replace />} />
          <Route path="/even-hjartholm-fotograf/faq" element={<Navigate to="/#faq" replace />} />
          <Route path="/even-hjartholm-fotograf/livredningsproven-skole---og-barnehage" element={<Navigate to="/kurs/lifesaving" replace />} />
          <Route path="/livredningsproven" element={<Navigate to="/kurs/lifesaving" replace />} />
          <Route path="/https://www.xn--lrsvmme-fxah8p.no/livredningsproven-skole-og-barnehage" element={<Navigate to="/kurs/lifesaving" replace />} />
          <Route path="/babysvomming" element={<Navigate to="/kurs/baby" replace />} />
          <Route path="/babysvomming.html" element={<Navigate to="/kurs/baby" replace />} />
          <Route path="/http://læråsvømme.no/babysvomming" element={<Navigate to="/kurs/baby" replace />} />
          <Route path="/http://www.læråsvømme.no/babysvomming" element={<Navigate to="/kurs/baby" replace />} />
          <Route path="/even-hjartholm-fotograf/svommekurs-for-barn" element={<Navigate to="/kurs/kids_therapy" replace />} />
          <Route path="/even-hjartholm-fotograf/om-oss" element={<Navigate to="/om-oss" replace />} />
          <Route path="/even-hjartholm-fotograf/pameldingkontakt" element={<Navigate to="/#contact" replace />} />
          <Route path="/https://www.xn--lrsvmme-fxah8p.no/pameldingkontakt" element={<Navigate to="/#contact" replace />} />
          <Route path="/https://www.xn--lrsvmme-fxah8p.no/portrettfotografering" element={<Navigate to="/portrettfotografering" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer theme={theme} onOpenTerms={() => setShowTermsModal(true)} onOpenContact={() => setShowContactModal(true)} />

        {/* GeminiAssistant removed as per user request */}
        <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} theme={theme} />
        <TermsModal isOpen={showTermsModal} onClose={() => setShowTermsModal(false)} theme={theme} />
      </div>
    </Router>
  );
};

export default App;