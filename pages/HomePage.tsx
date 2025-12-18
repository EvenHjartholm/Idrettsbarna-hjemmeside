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

    const [successData, setSuccessData] = useState<{ childName: string; courseName: string; inquiryType: string } | null>(null);
    const [showCourseSelectionModal, setShowCourseSelectionModal] = useState(false);
    const [showEnrollmentWizard, setShowEnrollmentWizard] = useState(false);

    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [selectedCourseData, setSelectedCourseData] = useState<{ level: string; ageGroup?: string; day: string; time: string; serviceId: string } | null>(null);

    // Handle navigation from CoursePage
    useEffect(() => {
        if (location.state?.scrollToSchedule) {
            setTimeout(() => {
                handleScrollToSchedule();
            }, 300);
        } else if (location.state?.openContactModal) {
            // Handle opening the popup modal (for Livredning/Barnehage)
            if (location.state.selectedServiceId) {
                setSelectedServiceId(location.state.selectedServiceId);
            }
            setShowContactModal(true);
        } else if (location.state?.openCourseSelection && location.state?.selectedCourse) {
            // Handle opening CourseSelectionModal directly
            handleScheduleSelect(location.state.selectedCourse, location.state.serviceId);
        } else if (location.state?.selectedCourse) {
            setFormOverrides(prev => ({ ...prev, selectedCourse: location.state.selectedCourse }));

            setTimeout(() => {
                onOpenContact();
            }, 300);
        }
    }, [location.state]);

    // Intersection Observer for Sticky Menu
    useEffect(() => {
        const heroSection = document.getElementById('hero');
        if (!heroSection) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                // Show sticky menu when Hero is NOT intersecting (scrolled past)
                setShowStickyMenu(!entry.isIntersecting);
            },
            { threshold: 0 }
        );

        observer.observe(heroSection);

        return () => {
            if (heroSection) observer.unobserve(heroSection);
        };
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

    const handleSuccess = (data: { childName: string; courseName: string; inquiryType: string }) => {
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
                <title>Svømmekurs og Babysvømming i Asker | Idrettsbarna</title>
                <meta name="description" content="Idrettsbarna tilbyr trygg og pedagogisk svømmeopplæring for barn i alle aldre i Asker. Babysvømming, småbarnssvømming og svømmekurs i varmtvannsbasseng." />
                <link rel="canonical" href="https://www.læråsvømme.no/" />

                <script type="application/ld+json">
                    {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "SportsClub",
                        "name": "Idrettsbarna",
                        "url": "https://idrettsbarna.no",
                        "logo": "https://idrettsbarna.no/logo.png",
                        "description": "Svømmekurs og babysvømming i Asker. Trygg og pedagogisk opplæring for barn.",
                        "address": {
                            "@type": "PostalAddress",
                            "streetAddress": "Brages vei 8",
                            "addressLocality": "Asker",
                            "postalCode": "1387",
                            "addressCountry": "NO"
                        },
                        "contactPoint": {
                            "@type": "ContactPoint",
                            "telephone": "+47-41906445",
                            "contactType": "customer service",
                            "email": "even@idrettsbarna.no"
                        },
                        "sameAs": [
                            "https://www.facebook.com/idrettsbarna",
                            "https://www.instagram.com/idrettsbarna"
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
            <div className="sr-only">
                <h1>Babysvømming og Svømmekurs i Asker</h1>
                <p>
                    Idrettsbarna tilbyr trygg og pedagogisk svømmeopplæring for barn i alle aldre i Asker.
                    Vi har kurs i babysvømming (3 mnd - 2 år), småbarnssvømming (2-4 år) og svømmekurs for eldre barn.
                    Kursene holdes i Risenga Svømmehall i varmtvannsbasseng (34 grader).
                    Oppstart er i januar og august. Pris er 4255 kr for 23 uker.
                </p>
            </div>
            <StickyMobileMenu
                isVisible={showStickyMenu && !showScheduleModal && !showCourseSelectionModal && !showEnrollmentWizard && !showContactModal && !showValidationModal && !showSuccess && !showCourseDetails}
                onScrollToSchedule={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
                onOpenContact={onOpenContact}
            />

            <Hero theme={theme} onOpenSchedule={() => setShowScheduleModal(true)} />

            <ParallaxWrapper speed={0.02}>
                <div>
                    <Services onEnroll={handleEnroll} theme={theme} onSelectService={(serviceId) => {
                        navigate(`/kurs/${serviceId}`);
                    }} />
                </div>
            </ParallaxWrapper>

            <ParallaxWrapper speed={0.04}>
                <Schedule onSelectCourse={handleScheduleSelect} isModal={false} theme={theme} />
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
            <CourseSelectionModal
                isOpen={showCourseSelectionModal}
                onClose={() => setShowCourseSelectionModal(false)}
                courseData={selectedCourseData}
                serviceData={selectedCourseData ? SERVICES.find(s => s.id === selectedCourseData.serviceId) : undefined}
                onConfirm={() => handleConfirmSelection()}
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
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                childName={successData?.childName || ''}
                courseName={successData?.courseName || ''}
                inquiryType={successData?.inquiryType || ''}
            />
            <EnrollmentWizardModal
                isOpen={showEnrollmentWizard}
                onClose={() => setShowEnrollmentWizard(false)}
                selectedCourse={formOverrides.selectedCourse || ''}
                serviceId={selectedCourseData?.serviceId}
                onSuccess={handleSuccess}
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
            />

            <ScheduleModal
                isOpen={showScheduleModal}
                onClose={() => setShowScheduleModal(false)}
                onSelectCourse={handleScheduleSelect}
                courseTitle="Velg kurs"
            />
        </main >
    );
};

export default HomePage;
