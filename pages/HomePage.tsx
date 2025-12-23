import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Schedule from '../components/Schedule';
import ContactForm from '../components/ContactForm';
import VideoSection from '../components/VideoSection';
import FAQ, { faqs } from '../components/FAQ';
import TermsInfo from '../components/TermsInfo';
import ParallaxWrapper from '../components/ParallaxWrapper';
import CourseDetailsModal from '../components/CourseDetailsModal';

import SuccessModal from '../components/SuccessModal';

import StickyMobileMenu from '../components/StickyMobileMenu';
import ValidationModal from '../components/ValidationModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsBanner from '../components/NewsBanner';
import CourseSelectionModal from '../components/CourseSelectionModal';
import EnrollmentWizardModal from '../components/EnrollmentWizardModal';
import ContactModal from '../components/ContactModal';
import ScheduleModal from '../components/ScheduleModal';
import { EnrollmentFormData, Theme } from '../types';
import { Helmet } from 'react-helmet-async';
import { SERVICES } from '../constants';

interface HomePageProps {
    onAIFormUpdate: (data: Partial<EnrollmentFormData>) => void;
    aiFormOverrides?: Partial<EnrollmentFormData>;
    theme: Theme;
    toggleTheme: () => void;

    onOpenContact: () => void;
    onOpenTerms: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onAIFormUpdate, aiFormOverrides, theme, toggleTheme, onOpenContact, onOpenTerms }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [formOverrides, setFormOverrides] = useState<Partial<EnrollmentFormData>>({});
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);



    const [showCourseDetails, setShowCourseDetails] = useState(false);
    const [isCourseDetailsFromContact, setIsCourseDetailsFromContact] = useState(false);

    const [showSuccess, setShowSuccess] = useState(false);

    const [showStickyMenu, setShowStickyMenu] = useState(false);
    const [showValidationModal, setShowValidationModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const [showContactModal, setShowContactModal] = useState(false);

    const [successData, setSuccessData] = useState<{ childName: string; courseName: string; inquiryType: string; startDate?: string } | null>(null);
    const [showCourseSelectionModal, setShowCourseSelectionModal] = useState(false);
    const [showEnrollmentWizard, setShowEnrollmentWizard] = useState(false);

    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [selectedCourseData, setSelectedCourseData] = useState<{ level: string; ageGroup?: string; day: string; time: string; serviceId: string } | null>(null);
    const [isScheduleVisible, setIsScheduleVisible] = useState(false);

    // Handle navigation from CoursePage
    useEffect(() => {
        // Handle deep link / navigation state
        if (location.state) {
            const state = location.state as any;

            if (state.scrollToSchedule) {
                setTimeout(handleScrollToSchedule, 300);
            } 
            
            if (state.openContactModal) {
                if (state.selectedServiceId) setSelectedServiceId(state.selectedServiceId);
                setShowContactModal(true);
            } 
            
            if (state.openCourseSelection && state.selectedCourse) {
                handleScheduleSelect(state.selectedCourse, state.serviceId);
            } 
            
            if (state.selectedCourse) {
                setFormOverrides(prev => ({ ...prev, selectedCourse: state.selectedCourse }));
                setTimeout(onOpenContact, 300);
            }

            // Aggressively clear state to prevent "stuck" modals on refresh
            window.history.replaceState(null, '');
        }
    }, [location.state]);

    // Intersection Observer for Sticky Menu & Schedule Visibility
    useEffect(() => {
        const heroSection = document.getElementById('hero');
        const scheduleSection = document.getElementById('schedule');
        
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.target.id === 'hero') {
                        // Show sticky menu when Hero is NOT intersecting (scrolled past)
                        setShowStickyMenu(!entry.isIntersecting);
                    }
                    if (entry.target.id === 'schedule') {
                         setIsScheduleVisible(entry.isIntersecting);
                    }
                });
            },
            { threshold: 0 } // You might want a slightly higher threshold or rootMargin for schedule
        );

        if (heroSection) observer.observe(heroSection);
        if (scheduleSection) observer.observe(scheduleSection);

        // Auto-scroll to Services on load (User Request)
        // Always scroll to services on mount/refresh
        setTimeout(() => {
            const servicesSection = document.getElementById('services');
            if (servicesSection) {
                servicesSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 800); // Small delay to allow fade-in

        return () => observer.disconnect();
    }, []);

    // Merge AI overrides with local overrides
    const activeFormOverrides = { ...formOverrides, ...aiFormOverrides };

    const handleEnroll = (courseName: string, serviceId?: string) => {
        setFormOverrides(prev => ({ ...prev, selectedCourse: courseName }));
        if (serviceId) {
            setSelectedServiceId(serviceId);
        }

        setTimeout(() => {
            onOpenContact();
        }, 100);
    };




    const handleScheduleSelect = (courseName: string, serviceId?: string) => {
        // Parse courseName to extract details (format: "Level: AgeGroup (Day Time)" or "Level (Day Time)")
        // Example: "Babysvømming (Onsdag 15:00 - 15:30)" or "Barn: Nybegynner (Onsdag 17:30 - 18:00)"
        const match = courseName.match(/^(.+?)(?:: (.+?))? \((.+?) (.+?)\)$/);

        if (match) {
            const level = match[1];
            const ageGroup = match[2] || ''; // Capture ageGroup if present
            const day = match[3];
            const time = match[4];

            // If serviceId is not provided (e.g. from CourseDetailsPage navigation), try to find it
            let resolvedServiceId = serviceId;
            if (!resolvedServiceId) {
                // Try to find matching session in SCHEDULE_DATA
                // This is a bit of a hack, but we need the serviceId for the logic to work
                // We can iterate through SCHEDULE_DATA to find a session that matches level, day, time
                // Or we can try to guess based on level name
                const service = SERVICES.find(s => s.title.includes(level) || level.includes(s.title));
                if (service) resolvedServiceId = service.id;
            }

            if (resolvedServiceId) {
                setSelectedCourseData({
                    level,
                    ageGroup, // Store ageGroup
                    day,
                    time,
                    serviceId: resolvedServiceId
                });
                setShowScheduleModal(false); // Close the schedule modal

                // Skip CourseSelectionModal and go directly to EnrollmentWizard
                const fullCourseName = courseName;
                setFormOverrides(prev => ({ ...prev, selectedCourse: fullCourseName }));
                setShowEnrollmentWizard(true);
            } else {
                // Fallback if we can't resolve serviceId
                handleConfirmSelection(courseName, serviceId);
            }
        } else {
            // Fallback for unexpected format
            handleConfirmSelection(courseName, serviceId);
        }
    };

    const handleConfirmSelection = (courseName?: string, serviceId?: string) => {
        const finalCourseName = courseName || (selectedCourseData ? `${selectedCourseData.level} (${selectedCourseData.day} ${selectedCourseData.time})` : '');
        const finalServiceId = serviceId || selectedCourseData?.serviceId;

        if (finalCourseName) {
            setFormOverrides(prev => ({ ...prev, selectedCourse: finalCourseName }));
        }
        if (finalServiceId) {
            setSelectedServiceId(finalServiceId);
        }

        setShowCourseSelectionModal(false);
        // setShowScheduleModal(false); // Already closed in handleScheduleSelect

        setShowCourseSelectionModal(false);
        setShowScheduleModal(false); // Already closed in handleScheduleSelect

        // Open Enrollment Wizard directly
        setShowEnrollmentWizard(true);
    };

    const handleSuccess = (data: { childName: string; courseName: string; inquiryType: string; startDate?: string }) => {
        setSuccessData(data);
        setShowSuccess(true);
    };

    const handleValidationFailed = (errors: string[]) => {
        setValidationErrors(errors);
        setShowValidationModal(true);
    };

    const handleValidationClose = () => {
        setShowValidationModal(false);
        // Scroll to first error (simplified: scroll to top of form inputs)
        const formInputs = document.getElementById('contact-form-inputs');
        if (formInputs) {
            formInputs.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleScrollToSchedule = () => {
        const scheduleSection = document.getElementById('schedule');
        if (scheduleSection) {
            scheduleSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <main>
            <Helmet>
                <title>Babysvømming og svømmekurs for barn i Asker | Lær å svømme</title>
                <meta name="description" content="Trygge og pedagogiske svømmekurs for babyer og barn på Risenga i Asker. Babysvømming, småbarn og svømmekurs – meld på i dag." />
                <link rel="canonical" href="https://www.læråsvømme.no/" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SportsClub",
                        "name": "Idrettsbarna",
                        "alternateName": "Lær å svømme",
                        "url": "https://www.læråsvømme.no",
                        "logo": "https://www.læråsvømme.no/logo.png",
                        "description": "Svømmekurs og babysvømming i Asker. Trygg og pedagogisk opplæring for barn.",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Brages vei 8",
                            "addressLocality": "Asker",
                            "postalCode": "1387",
                            "addressCountry": "NO"
                        },
                        "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": "59.8333", 
                            "longitude": "10.4333" 
                        },
                        "areaServed": "Asker",
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+47-41906445",
                            "contactType": "customer service",
                            "email": "even@idrettsbarna.no"
                        },
                        "sameAs": [
                            "https://www.facebook.com/idrettsbarna",
                            "https://www.instagram.com/idrettsbarna",
                            "https://www.youtube.com/@idrettsbarna"
                        ]
                    })}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "name": "Vanlige spørsmål om svømmekurs",
                        "mainEntity": faqs.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    })}
                </script>
            </Helmet>

            {/* AI Summary (Hidden visually but available for crawlers) */}
            {/* AI Summary and Hidden H1 removed to avoid duplication - Hero component handles H1 */}
            <StickyMobileMenu
                isVisible={showStickyMenu && !isScheduleVisible && !showScheduleModal && !showCourseSelectionModal && !showEnrollmentWizard && !showContactModal && !showValidationModal && !showSuccess && !showCourseDetails}
                onScrollToSchedule={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
                onOpenContact={onOpenContact}
            />

            <Hero theme={theme} onOpenSchedule={() => setShowScheduleModal(true)} />

            <ParallaxWrapper speed={0.02} disabled={theme === 'nordic'}>
                <div>
                    <Services onEnroll={handleEnroll} theme={theme} onSelectService={(serviceId) => {
                        navigate(`/kurs/${serviceId}`);
                    }} />
                </div>
            </ParallaxWrapper>

            <ParallaxWrapper speed={0.04} disabled={theme === 'nordic'}>
                <Schedule onSelectCourse={handleScheduleSelect} isModal={false} theme={theme} />
            </ParallaxWrapper>



            <ParallaxWrapper speed={0.03} disabled={theme === 'nordic'}>
                <div className={theme === 'nordic' ? '' : 'pb-32'}>
                    <VideoSection theme={theme} />
                </div>
            </ParallaxWrapper>

            <ParallaxWrapper speed={0.05} disabled={theme === 'nordic'}>
                <FAQ theme={theme} />
            </ParallaxWrapper>

            <ParallaxWrapper speed={0.02} disabled={theme === 'nordic'}>
                <TermsInfo theme={theme} />
            </ParallaxWrapper>



            {/* Render Modals outside of ParallaxWrapper to avoid transform issues */}
            <CourseSelectionModal
                isOpen={showCourseSelectionModal}
                onClose={() => setShowCourseSelectionModal(false)}
                courseData={selectedCourseData}
                serviceData={selectedCourseData ? SERVICES.find(s => s.id === selectedCourseData.serviceId) : undefined}
                onConfirm={() => handleConfirmSelection()}
                theme={theme}
            />

            <CourseDetailsModal
                isOpen={showCourseDetails}
                onClose={() => {
                    setShowCourseDetails(false);
                    setTimeout(() => setIsCourseDetailsFromContact(false), 300);
                }}
                serviceId={selectedServiceId}
                isFromContactForm={isCourseDetailsFromContact}
                theme={theme}
                onEnrollWizard={() => {
                    setShowCourseDetails(false);
                    setShowEnrollmentWizard(true);
                }}
                onScrollToSchedule={() => {
                    setShowCourseDetails(false);
                    setTimeout(handleScrollToSchedule, 300);
                }}
                selectedCourseName={formOverrides.selectedCourse}
                onOpenContact={() => setShowContactModal(true)}
            />

            <SuccessModal
                isOpen={showSuccess}
                onClose={() => {
                    setShowSuccess(false);
                    // Slight delay to ensure body lock is removed before scrolling
                    setTimeout(() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }, 50);
                }}
                childName={successData?.childName || ''}
                courseName={successData?.courseName || ''}
                inquiryType={successData?.inquiryType || ''}
                startDate={successData?.startDate}
            />
            <EnrollmentWizardModal
                isOpen={showEnrollmentWizard}
                onClose={() => setShowEnrollmentWizard(false)}
                selectedCourse={formOverrides.selectedCourse || ''}
                serviceId={selectedCourseData?.serviceId}
                onSuccess={handleSuccess}
                theme={theme}
            />


            <ValidationModal
                isOpen={showValidationModal}
                onClose={handleValidationClose}
                errors={validationErrors}
            />

            <ContactModal
                isOpen={showContactModal}
                onClose={() => setShowContactModal(false)}
                selectedServiceId={selectedServiceId}
                theme={theme}
            />

            <ScheduleModal
                isOpen={showScheduleModal}
                onClose={() => setShowScheduleModal(false)}
                onSelectCourse={handleScheduleSelect}
                courseTitle="Velg kurs"
                theme={theme}
            />
        </main >
    );
};

export default HomePage;
