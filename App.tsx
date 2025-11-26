import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GeminiAssistant from './components/GeminiAssistant';
import ParallaxBackground from './components/ParallaxBackground';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';
import VilkarPage from './pages/VilkarPage';
import { EnrollmentFormData } from './types';

export type Theme = 'color' | 'bw' | 'photo';

const App: React.FC = () => {
  const [theme, setTheme] = React.useState<Theme>('color');
  const [aiFormOverrides, setAiFormOverrides] = React.useState<Partial<EnrollmentFormData>>({});

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'color') return 'bw';
      if (prev === 'bw') return 'photo';
      return 'color';
    });
  };

  // Apply theme class to document
  React.useEffect(() => {
    document.documentElement.classList.remove('theme-bw', 'theme-photo');
    if (theme === 'bw') document.documentElement.classList.add('theme-bw');
    if (theme === 'photo') document.documentElement.classList.add('theme-photo');
  }, [theme]);

  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-white relative">
        <ParallaxBackground theme={theme} />
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <Routes>
          <Route path="/" element={<HomePage onAIFormUpdate={setAiFormOverrides} aiFormOverrides={aiFormOverrides} theme={theme} />} />
          <Route path="/kurs/:id" element={<CoursePage />} />
          <Route path="/vilkar" element={<VilkarPage />} />
        </Routes>

        <Footer />
        <GeminiAssistant onFormUpdate={setAiFormOverrides} />
      </div>
    </Router>
  );
};

export default App;