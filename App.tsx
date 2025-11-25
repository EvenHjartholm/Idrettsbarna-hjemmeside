import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import GeminiAssistant from './components/GeminiAssistant';
import ParallaxBackground from './components/ParallaxBackground';
import HomePage from './pages/HomePage';
import CoursePage from './pages/CoursePage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-white relative">
        <ParallaxBackground />
        <Navbar />

        <Routes>
          <Route path="/" element={<HomePage onAIFormUpdate={() => { }} />} />
          <Route path="/kurs/:id" element={<CoursePage />} />
        </Routes>

        <Footer />
        <GeminiAssistant />
      </div>
    </Router>
  );
};

export default App;