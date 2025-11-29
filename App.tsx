import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GeminiAssistant from './components/GeminiAssistant';
import ParallaxBackground from './components/ParallaxBackground';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import VilkarPage from './pages/VilkarPage';
import NewsPage from './pages/NewsPage';
import NewsArticlePage from './pages/NewsArticlePage';
import ContactModal from './components/ContactModal';
import RedirectHandler from './components/RedirectHandler';
import { EnrollmentFormData } from './types';

export type Theme = 'color' | 'photo' | 'test';

const App: React.FC = () => {
  const [theme, setTheme] = React.useState<Theme>('color');
  const [aiFormOverrides, setAiFormOverrides] = React.useState<Partial<EnrollmentFormData>>({});
  const [showContactModal, setShowContactModal] = React.useState(false);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'color') {
        // In production, skip 'photo' mode and go straight to 'test'
        if (!import.meta.env.DEV) {
          return 'test';
        }
        return 'photo';
      }
      if (prev === 'photo') return 'test';
      return 'color';
    });
  };

  // Apply theme class to document
  React.useEffect(() => {
    document.documentElement.classList.remove('theme-bw', 'theme-photo', 'theme-test');
    if (theme === 'photo') document.documentElement.classList.add('theme-photo');
    if (theme === 'test') document.documentElement.classList.add('theme-test');
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-white relative">
        <ParallaxBackground theme={theme} />
        <RedirectHandler />
        <Navbar theme={theme} toggleTheme={toggleTheme} onOpenContact={() => setShowContactModal(true)} />

        <Routes>
          <Route path="/" element={<HomePage onAIFormUpdate={setAiFormOverrides} aiFormOverrides={aiFormOverrides} theme={theme} toggleTheme={toggleTheme} onOpenContact={() => setShowContactModal(true)} />} />
          <Route path="/kurs/:id" element={<CoursePage theme={theme} />} />
          <Route path="/vilkar" element={<VilkarPage />} />
          <Route path="/faq" element={<Navigate to="/" replace />} />
          <Route path="/pameldingkontakt" element={<Navigate to="/" replace />} />
          <Route path="/babysvomming-asker" element={<Navigate to="/kurs/baby" replace />} />
          <Route path="/smabarnsvomming" element={<Navigate to="/kurs/toddler" replace />} />
          <Route path="/news/babysvomming-i-asker-med-idrettsbarna---oppst-12" element={<Navigate to="/nyheter/babysvomming-i-asker-med-idrettsbarna---oppst-12" replace />} />
          <Route path="/news" element={<Navigate to="/nyheter" replace />} />
          <Route path="/news/*" element={<Navigate to="/nyheter" replace />} />
          <Route path="/nyheter" element={<NewsPage />} />
          <Route path="/nyheter/:slug" element={<NewsArticlePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />

        {/* GeminiAssistant removed as per user request */}
        <ContactModal isOpen={showContactModal} onClose={() => setShowContactModal(false)} />
      </div>
    </Router>
  );
};

export default App;