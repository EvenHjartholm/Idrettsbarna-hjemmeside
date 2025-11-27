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
import CourseDetailsModal from '../components/CourseDetailsModal';
import TermsModal from '../components/TermsModal';
import SuccessModal from '../components/SuccessModal';
import { EnrollmentFormData } from '../types';

import { Theme } from '../App';

interface HomePageProps {
    onAIFormUpdate: (data: Partial<EnrollmentFormData>) => void;
    aiFormOverrides?: Partial<EnrollmentFormData>;
    theme: Theme;
}

const HomePage: React.FC<HomePageProps> = ({ onAIFormUpdate, aiFormOverrides, theme }) => {
    const location = useLocation();
    const [formOverrides, setFormOverrides] = useState<Partial<EnrollmentFormData>>({});
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

    const [showCourseDetails, setShowCourseDetails] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successData, setSuccessData] = useState<{ childName: string; courseName: string; inquiryType: string } | null>(null);

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

    // Merge AI overrides with local overrides
    const activeFormOverrides = { ...formOverrides, ...aiFormOverrides };

    const handleEnroll = (courseName: string, serviceId?: string) => {
        setFormOverrides(prev => ({ ...prev, selectedCourse: courseName }));
        if (serviceId) {
            setSelectedServiceId(serviceId);
        }
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            setTimeout(() => {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    const handleSuccess = (data: { childName: string; courseName: string; inquiryType: string }) => {
        setSuccessData(data);
        setShowSuccess(true);
    };

    return (
        <main>
            <Hero theme={theme} />
            <ParallaxWrapper speed={0.02}>
                <div className="pt-32">
                    <Services onEnroll={handleEnroll} theme={theme} />
                </div>
            </ParallaxWrapper>

            <ParallaxWrapper speed={0.04}>
                <Schedule onEnroll={handleEnroll} />
            </ParallaxWrapper>

            <ParallaxWrapper speed={0.04}>
                <ContactForm
                    formOverrides={activeFormOverrides}
                    selectedServiceId={selectedServiceId}
                    onOpenCourseDetails={() => setShowCourseDetails(true)}
                    onOpenTerms={() => setShowTerms(true)}
                    onSuccess={handleSuccess}
                />
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

            {/* Render Modals outside of ParallaxWrapper to avoid transform issues */}
            <CourseDetailsModal
                isOpen={showCourseDetails}
                onClose={() => setShowCourseDetails(false)}
                serviceId={selectedServiceId}
            />
            <TermsModal
                isOpen={showTerms}
                onClose={() => setShowTerms(false)}
            />
            <SuccessModal
                isOpen={showSuccess}
                onClose={() => setShowSuccess(false)}
                childName={successData?.childName || ''}
                courseName={successData?.courseName || ''}
                inquiryType={successData?.inquiryType || ''}
            />
        </main>
    );
};

export default HomePage;
