import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Schedule from '../components/Schedule';
import ContactForm from '../components/ContactForm';
import VideoSection from '../components/VideoSection';
import FAQ from '../components/FAQ';
import TermsInfo from '../components/TermsInfo';
import ParallaxWrapper from '../components/ParallaxWrapper';
import { EnrollmentFormData } from '../types';

interface HomePageProps {
    onAIFormUpdate: (data: Partial<EnrollmentFormData>) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onAIFormUpdate }) => {
    const location = useLocation();
    const [formOverrides, setFormOverrides] = useState<Partial<EnrollmentFormData>>({});

    // Handle navigation from CoursePage with pre-selected course
    useEffect(() => {
        if (location.state?.selectedCourse) {
            setFormOverrides(prev => ({ ...prev, selectedCourse: location.state.selectedCourse }));
            // Clear state to avoid re-triggering on refresh? 
            // Actually, standard behavior is fine.

            // Scroll to contact form
            setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        }
    }, [location.state]);

    const handleEnroll = (courseName: string) => {
        setFormOverrides(prev => ({ ...prev, selectedCourse: courseName }));
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            setTimeout(() => {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    return (
        <main>
            <Hero />
            <ParallaxWrapper speed={0.02}>
                <div className="pt-32">
                    <Services onEnroll={handleEnroll} />
                </div>
            </ParallaxWrapper>

            <ParallaxWrapper speed={0.04}>
                <Schedule onEnroll={handleEnroll} />
            </ParallaxWrapper>

            <ParallaxWrapper speed={0.04}>
                <ContactForm formOverrides={formOverrides} />
            </ParallaxWrapper>

            <ParallaxWrapper speed={0.03}>
                <div className="pb-32">
                    <VideoSection />
                </div>
            </ParallaxWrapper>

            <ParallaxWrapper speed={0.05}>
                <FAQ />
            </ParallaxWrapper>

            <ParallaxWrapper speed={0.02}>
                <TermsInfo />
            </ParallaxWrapper>
        </main>
    );
};

export default HomePage;
