import { EnrollmentFormData } from '../types';

// THE ENTERPRISE WAY: Lås payload-funksjonen for Portal-kommunikasjon
// Eventuelt hent VITE_ORGANIZATION_ID herifra, men hardkoder under inntil env er opprettet
export const PORTAL_ORGANIZATION_ID = import.meta.env.VITE_ORGANIZATION_ID || '40a57371-ec30-4551-bd4e-f904614b1e70';
export const PORTAL_FALLBACK_COURSE_ID = '11111111-2222-3333-4444-555555555555';

export const buildBookingPayload = (formData: any) => {
    let formattedDate = formData.childBirthDate || '1900-01-01';
    if (formattedDate.includes('.')) {
        const parts = formData.childBirthDate.split('.');
        if (parts.length === 3) formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    
    // Support EnrollmentFormData (childFirstName holds full name) or PortalFormData (separated names)
    const rawFirstName = formData.childFirstName || 'Ikke oppgitt';
    let childFirstName = rawFirstName;
    let childLastName = formData.childLastName;

    if (!childLastName) {
        const childNameParts = rawFirstName.trim().split(' ');
        childLastName = childNameParts.length > 1 ? childNameParts.slice(1).join(' ') : 'Ikke oppgitt';
        childFirstName = childNameParts[0] || 'Ikke oppgitt';
    }
    
    // Support EnrollmentFormData (zipCity) or PortalFormData (zip + city)
    let zip = formData.zip || '';
    let city = formData.city || '';
    if (!zip && !city && formData.zipCity) {
        zip = formData.zipCity.trim().split(' ')[0] || '';
        city = formData.zipCity.trim().split(' ').slice(1).join(' ') || '';
    }

    return {
        organization_id: PORTAL_ORGANIZATION_ID,
        status: 'pending',
        course_id: PORTAL_FALLBACK_COURSE_ID,
        
        child_first_name: formData.isParticipantSameAsParent ? formData.parentFirstName : childFirstName,
        child_last_name: formData.isParticipantSameAsParent ? formData.parentLastName : childLastName,
        child_birth_date: formattedDate,
        child_gender: formData.isParticipantSameAsParent ? 'Voksen' : (formData.gender || 'Ukjent'),
        
        parent_name: `${formData.parentFirstName} ${formData.parentLastName}`,
        parent_email: formData.email,
        parent_phone: formData.phone,
        parent_address: formData.address,
        parent_zip: zip,
        parent_city: city,
        
        registration_metadata: {
            requested_course: formData.selectedCourse,
            inquiryType: formData.inquiryType,
            heardAboutUs: formData.heardAboutUs,
            termsAccepted: formData.termsAccepted,
            message: formData.message
        }
    };
};
