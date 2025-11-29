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
import TermsModal from '../components/TermsModal';
import SuccessModal from '../components/SuccessModal';
import ScheduleModal from '../components/ScheduleModal';
import StickyMobileMenu from '../components/StickyMobileMenu';
import ValidationModal from '../components/ValidationModal';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsBanner from '../components/NewsBanner';
import CourseSelectionModal from '../components/CourseSelectionModal';
import { EnrollmentFormData } from '../types';
import { Helmet } from 'react-helmet-async';
import { Theme } from '../App';
import { SERVICES } from '../constants';

interface HomePageProps {
    onAIFormUpdate: (data: Partial<EnrollmentFormData>) => void;
    aiFormOverrides?: Partial<EnrollmentFormData>;
    theme: Theme;
    toggleTheme: () => void;
    onOpenContact: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onAIFormUpdate, aiFormOverrides, theme, toggleTheme, onOpenContact }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [formOverrides, setFormOverrides] = useState<Partial<EnrollmentFormData>>({});
    const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);



    const [showCourseDetails, setShowCourseDetails] = useState(false);
    const [isCourseDetailsFromContact, setIsCourseDetailsFromContact] = useState(false);
    const [showTerms, setShowTerms] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showScheduleModal, setShowScheduleModal] = useState(false);
    const [showStickyMenu, setShowStickyMenu] = useState(false);
    const [showValidationModal, setShowValidationModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const [successData, setSuccessData] = useState<{ childName: string; courseName: string; inquiryType: string } | null>(null);
    const [showCourseSelectionModal, setShowCourseSelectionModal] = useState(false);
    const [selectedCourseData, setSelectedCourseData] = useState<{ level: string; day: string; time: string; serviceId: string } | null>(null);

    // Handle navigation from CoursePage with pre-selected course
    useEffect(() => {
        if (location.state?.selectedCourse) {
            setFormOverrides(prev => ({ ...prev, selectedCourse: location.state.selectedCourse }));

            setTimeout(() => {
                const contactSection = document.getElementById('contact');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
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
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            setTimeout(() => {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    const handleScheduleSelect = (courseName: string, serviceId?: string) => {
        // Close schedule modal immediately when a course is selected
        setShowScheduleModal(false);

        // Parse courseName to extract details (format: "Level (Day Time)")
        // Example: "Babysvømming (Onsdag 15:00 - 15:30)"
        const match = courseName.match(/^(.+?) \((.+?) (.+?)\)$/);

        if (match && serviceId) {
            setSelectedCourseData({
                level: match[1],
                day: match[2],
                time: match[3],
                serviceId: serviceId
            });
            setShowCourseSelectionModal(true);
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

        // Scroll to contact form inputs after modal closes
        setTimeout(() => {
            const contactFormInputs = document.getElementById('contact-form-inputs');
            if (contactFormInputs) {
                contactFormInputs.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
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

    return (
        <main>
            <Helmet>
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
                    Oppstart er i januar og august. Pris er 2300 kr for 8 uker.
                </p>
            </div>
            <StickyMobileMenu
                isVisible={showStickyMenu}
                onScrollToSchedule={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
                onOpenContact={onOpenContact}
            />



            <Hero theme={theme} />

            <ParallaxWrapper speed={0.02}>
                <div className="pt-20">
                    <Services onEnroll={handleEnroll} theme={theme} onSelectService={(serviceId) => {
                        navigate(`/kurs/${serviceId}`);
                    }} />
                </div>
            </ParallaxWrapper>

            <ParallaxWrapper speed={0.04}>
                <Schedule onEnroll={handleEnroll} onSelectCourse={handleScheduleSelect} isModal={false} theme={theme} />
            </ParallaxWrapper>

            <ParallaxWrapper speed={0.04}>
                <ContactForm
                    formOverrides={activeFormOverrides}
                    selectedServiceId={selectedServiceId}
                    onOpenCourseDetails={() => {
                        setIsCourseDetailsFromContact(true);
                        setShowCourseDetails(true);
                    }}
                    onOpenTerms={() => setShowTerms(true)}
                    onOpenSchedule={() => setShowScheduleModal(true)}
                    onSuccess={handleSuccess}
                    onValidationFailed={handleValidationFailed}
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
                    // Reset the flag after closing, but with a small delay to avoid flicker if needed, 
                    // though immediate reset is usually fine.
                    setTimeout(() => setIsCourseDetailsFromContact(false), 300);
                }}
                serviceId={selectedServiceId}
                isFromContactForm={isCourseDetailsFromContact}
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
            <ScheduleModal
                isOpen={showScheduleModal}
                onClose={() => setShowScheduleModal(false)}
                onSelectCourse={handleScheduleSelect}
            />

            <ValidationModal
                isOpen={showValidationModal}
                onClose={handleValidationClose}
                errors={validationErrors}
            />
        </main >
    );
};

export default HomePage;
