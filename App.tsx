import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Schedule from './components/Schedule';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import GeminiAssistant from './components/GeminiAssistant';
import VideoSection from './components/VideoSection';
import FAQ from './components/FAQ';
import TermsInfo from './components/TermsInfo';
import { EnrollmentFormData } from './types';

const App: React.FC = () => {
  // We use this state to allow both the Schedule (via button) AND the AI Assistant to fill the form
  const [formOverrides, setFormOverrides] = useState<Partial<EnrollmentFormData>>({});

  const handleEnroll = (courseName: string) => {
    setFormOverrides(prev => ({ ...prev, selectedCourse: courseName }));
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      setTimeout(() => {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleAIFormUpdate = (data: Partial<EnrollmentFormData>) => {
    console.log("AI updating form:", data);
    setFormOverrides(prev => ({ ...prev, ...data }));
    
    // Optional: Smooth scroll to form if AI fills critical info, but maybe less intrusive to just fill it
    // if the user is deep in conversation. We'll leave scrolling to the user or explicit requests.
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500 selection:text-white">
      <Navbar />
      <main>
        <Hero />
        <Services onEnroll={handleEnroll} />
        <Schedule onEnroll={handleEnroll} />
        <VideoSection />
        <FAQ />
        <TermsInfo />
        <ContactForm formOverrides={formOverrides} />
      </main>
      <Footer />
      <GeminiAssistant onFormUpdate={handleAIFormUpdate} />
    </div>
  );
};

export default App;