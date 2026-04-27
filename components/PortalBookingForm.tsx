import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import { ArrowUpCircle, Info } from 'lucide-react';
import { SERVICES } from '../constants';
import { supabase } from '../utils/supabase';
import { buildBookingPayload } from '../utils/bookingPayload';

export interface PortalFormData {
  parentFirstName: string;
  parentLastName: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  
  childFirstName: string;
  childLastName: string;
  childBirthDate: string;
  gender: string;
  
  selectedCourse: string;
  heardAboutUs: string;
  inquiryType: string;
  termsAccepted: string;
  message: string;
}

interface PortalBookingFormProps {
  formOverrides?: Partial<PortalFormData>;
  selectedServiceId?: string | null;
  onOpenCourseDetails?: () => void;
  onOpenTerms?: () => void;
  onOpenSchedule?: () => void;
  onSuccess?: (data: { childName: string; courseName: string; inquiryType: string }) => void;
  onValidationFailed?: (errors: string[]) => void;
  isModal?: boolean;
}

const PortalBookingForm: React.FC<PortalBookingFormProps> = ({
  formOverrides,
  selectedServiceId,
  onOpenCourseDetails,
  onOpenTerms,
  onOpenSchedule,
  onSuccess,
  onValidationFailed,
  isModal = false
}) => {
  const [formData, setFormData] = useState<PortalFormData>({
    parentFirstName: '',
    parentLastName: '',
    email: '',
    phone: '',
    address: '',
    zip: '',
    city: '',
    
    childFirstName: '',
    childLastName: '',
    childBirthDate: '',
    gender: '',
    
    selectedCourse: '',
    heardAboutUs: '',
    inquiryType: 'Påmelding',
    termsAccepted: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [highlightedFields, setHighlightedFields] = useState<string[]>([]);

  // Get selected service data
  const selectedService = selectedServiceId ? SERVICES.find(s => s.id === selectedServiceId) : null;

  // Update form data when overrides change
  useEffect(() => {
    if (formOverrides && Object.keys(formOverrides).length > 0) {
      setFormData(prev => ({ ...prev, ...formOverrides }));
      const newKeys = Object.keys(formOverrides);
      setHighlightedFields(newKeys);
      setTimeout(() => setHighlightedFields([]), 2000);
    }
  }, [formOverrides]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let value = e.target.value;

    // Auto-format Date: DD.MM.YYYY
    if (e.target.name === 'childBirthDate') {
      const rawValue = value.replace(/\D/g, '');
      if (rawValue.length <= 2) {
        value = rawValue;
      } else if (rawValue.length <= 4) {
        value = `${rawValue.slice(0, 2)}.${rawValue.slice(2)}`;
      } else {
        value = `${rawValue.slice(0, 2)}.${rawValue.slice(2, 4)}.${rawValue.slice(4, 8)}`;
      }
    }

    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const openTerms = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenTerms) onOpenTerms();
  };

  const openCourseDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenCourseDetails) onOpenCourseDetails();
  };

  const openSchedule = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenSchedule) onOpenSchedule();
  };

  const validateForm = (): string[] => {
    const errors: string[] = [];
    if (!formData.parentFirstName.trim()) errors.push("Foreldres fornavn mangler");
    if (!formData.parentLastName.trim()) errors.push("Foreldres etternavn mangler");
    if (!formData.email.trim() || !formData.email.includes('@')) errors.push("Gyldig e-postadresse mangler");
    if (!formData.phone.trim()) errors.push("Mobilnummer mangler");
    if (!formData.address.trim()) errors.push("Gateadresse mangler");
    if (!formData.zip.trim()) errors.push("Postnummer mangler");
    if (!formData.city.trim()) errors.push("Poststed mangler");
    
    if (!formData.childFirstName.trim()) errors.push("Barnets fornavn mangler");
    if (!formData.childLastName.trim()) errors.push("Barnets etternavn mangler");
    if (!formData.childBirthDate.trim()) errors.push("Barnets fødselsdato mangler");
    if (!formData.gender) errors.push("Barnets kjønn er ikke valgt");
    
    if (!formData.heardAboutUs.trim()) errors.push("Vennligst fortell oss hvem du hørte om oss fra");
    if (formData.termsAccepted !== 'Ja') errors.push("Du må akseptere vilkårene");

    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateForm();
    if (errors.length > 0) {
      if (onValidationFailed) onValidationFailed(errors);
      return;
    }

    if (status === 'submitting' || status === 'success') return;
    setStatus('submitting');

    // ---------------------------------------------------------
    // Innsending via Supabase.js Insert
    // ---------------------------------------------------------
    const payload = buildBookingPayload(formData);

    console.log("--> SENDING PAYLOAD TO SUPABASE:", payload);

    try {
      const { error } = await supabase
        .from('booking_requests')
        .insert([payload]);
        
      if (error) {
        console.error("Booking failed:", error.message);
        throw new Error(`Supabase Insert Feil: ${error.message}`);
      }
      
      // ---------------------------------------------------------
      // EMAIL JS BACKUP TO ADMIN (Livsviktig for eier)
      // ---------------------------------------------------------
      const SERVICE_ID = 'service_z5qlv57';
      const TEMPLATE_ID = 'template_8ifgw0r';
      const PUBLIC_KEY = 'AnYbkdu2hWdOx50pj';

      const fullMessage = `
--- NY HENVENDELSE (${formData.inquiryType.toUpperCase()}) ---

KURS: ${formData.selectedCourse || '-'}

FORELDER:
Navn: ${formData.parentFirstName} ${formData.parentLastName}
E-post: ${formData.email}
Mobil: ${formData.phone}
Adresse: ${formData.address}, ${formData.zip} ${formData.city}

BARN:
Navn: ${formData.childFirstName} ${formData.childLastName}
Født: ${formData.childBirthDate}
Kjønn: ${formData.gender}

ANNET:
Hørt om oss: ${formData.heardAboutUs}
Godtatt vilkår: ${formData.termsAccepted}

MELDING / SPØRSMÅL:
${formData.message}

----------------------------------------
Sent fra Idrettsbarna.no Påmeldingsskjema (V2 / Portal)
      `.trim();

      const templateParams = {
        to_name: 'Idrettsbarna',
        from_name: formData.inquiryType,
        from_email: formData.email,
        phone: formData.phone,
        child_name: `${formData.childFirstName} ${formData.childLastName}`,
        child_dob: formData.childBirthDate,
        course: formData.selectedCourse,
        inquiry_type: formData.inquiryType,

        parent_first_name: formData.parentFirstName,
        parent_last_name: formData.parentLastName,
        address_street: formData.address,
        address_zip_city: `${formData.zip} ${formData.city}`,
        address: `${formData.address}, ${formData.zip} ${formData.city}`,

        heard_about: formData.heardAboutUs,
        terms_accepted: formData.termsAccepted,
        message_body: formData.message,
        message: fullMessage,

        subject: `[V2] ${formData.inquiryType.toUpperCase()}: ${formData.childFirstName} (${formData.selectedCourse})`
      };

      try {
        await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
        console.log("SUCCESS EMAIL JS BACKUP");
      } catch (emailErr) {
        console.error("FAILED EMAIL JS BACKUP...", emailErr);
        // Note: We don't throw an alert here since the Portal API data went through. 
        // We log it so the admin can debug if emails stop arriving.
      }

      console.log('SUCCESS API AND EMAIL SUBMIT');
      setStatus('success');

      if (onSuccess) {
        onSuccess({
          childName: formData.childFirstName,
          courseName: formData.selectedCourse,
          inquiryType: formData.inquiryType
        });
      }

      setTimeout(() => setStatus('idle'), 2000);

      // Reset form
      setFormData({
        parentFirstName: '', parentLastName: '', email: '', phone: '', address: '', zip: '', city: '',
        childFirstName: '', childLastName: '', childBirthDate: '', gender: '',
        selectedCourse: '', heardAboutUs: '', inquiryType: 'Påmelding', termsAccepted: '', message: ''
      });

    } catch (err) {
      console.error('FAILED...', err);
      alert('Beklager, noe gikk galt med påmeldingen. Prøv igjen senere. Error i konsoll.');
      setStatus('idle');
    }
  };

  const getInputClass = (fieldName: string) => {
    const baseClass = "w-full bg-slate-800 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder-slate-500";
    if (highlightedFields.includes(fieldName)) {
      return `${baseClass} border-cyan-400 ring-2 ring-cyan-500/50 bg-cyan-900/20 duration-500`;
    }
    return `${baseClass} border-slate-700`;
  };

  return (
    <section id="contact" className={`${isModal ? 'p-0 bg-transparent' : 'py-24 bg-slate-900'} scroll-mt-32`}>
      <div className={`${isModal ? 'w-full' : 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
        <div className={`${isModal ? 'bg-transparent border-none shadow-none' : 'bg-slate-950 rounded-2xl shadow-2xl border border-slate-800'} overflow-hidden`}>
          <div className={`${isModal ? 'p-0' : 'p-8 md:p-12'}`}>
            
            {/* Selected Course Info */}
            {selectedService && (
              <div className="mb-8 p-6 bg-slate-900/50 rounded-xl border border-slate-800">
                <h4 className="text-lg font-bold text-cyan-400 mb-2">{selectedService.title}</h4>
                <p className="text-slate-300 text-sm leading-relaxed">{selectedService.description}</p>
                <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1"><Info size={14} className="text-cyan-500" /> {selectedService.details.age}</span>
                  <span className="flex items-center gap-1"><Info size={14} className="text-cyan-500" /> {selectedService.details.duration}</span>
                  <span className="flex items-center gap-1"><Info size={14} className="text-cyan-500" /> {selectedService.details.price}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Foreldre Info */}
              <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">1</span> 
                  Foresattes detaljer
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Fornavn *</label>
                    <input type="text" name="parentFirstName" value={formData.parentFirstName} onChange={handleChange} className={getInputClass('parentFirstName')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Etternavn *</label>
                    <input type="text" name="parentLastName" value={formData.parentLastName} onChange={handleChange} className={getInputClass('parentLastName')} />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">E-post *</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className={getInputClass('email')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Mobil *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={getInputClass('phone')} />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Gateadresse *</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} className={getInputClass('address')} />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Postnummer *</label>
                    <input type="text" name="zip" value={formData.zip} onChange={handleChange} className={getInputClass('zip')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Poststed *</label>
                    <input type="text" name="city" value={formData.city} onChange={handleChange} className={getInputClass('city')} />
                  </div>
                </div>
              </div>

              {/* Barn Info */}
              <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">2</span> 
                  Barnets detaljer
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Fornavn *</label>
                    <input type="text" name="childFirstName" value={formData.childFirstName} onChange={handleChange} className={getInputClass('childFirstName')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Etternavn *</label>
                    <input type="text" name="childLastName" value={formData.childLastName} onChange={handleChange} className={getInputClass('childLastName')} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Fødselsdato *</label>
                    <input type="text" name="childBirthDate" value={formData.childBirthDate} onChange={handleChange} placeholder="DD.MM.ÅÅÅÅ" className={getInputClass('childBirthDate')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Kjønn *</label>
                    <select name="gender" value={formData.gender} onChange={handleChange} className={getInputClass('gender')}>
                      <option value="" disabled>Velg...</option>
                      <option value="male">Gutt</option>
                      <option value="female">Jente</option>
                      <option value="unknown">Ønsker ikke å oppgi</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Påmelding og vilkår */}
              <div className="bg-slate-900/30 p-6 rounded-xl border border-slate-800/50">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-sm">3</span> 
                  Kurs og Tillegg
                </h3>
                
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-slate-300">Hvilket kurs ønsker dere plass på? *</label>
                    <div className="flex gap-2">
                       {!selectedServiceId ? (
                         onOpenSchedule && (
                           <button onClick={openSchedule} type="button" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/10 px-3 py-1 rounded-full transition-all flex items-center gap-1">
                             <ArrowUpCircle size={12} /> Se kurstider
                           </button>
                         )
                       ) : (
                         <button onClick={openCourseDetails} type="button" className="text-xs font-bold text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/10 px-3 py-1 rounded-full transition-all flex items-center gap-1">
                           <Info size={12} /> Les om kurset
                         </button>
                       )}
                    </div>
                  </div>
                  <input type="text" name="selectedCourse" value={formData.selectedCourse} onChange={handleChange} placeholder="F.eks. Hval Onsdag 17:00 Holmen" className={getInputClass('selectedCourse')} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Hvor hørte du om oss? *</label>
                    <input type="text" name="heardAboutUs" value={formData.heardAboutUs} onChange={handleChange} placeholder="Feks sosiale medier, venn etc" className={getInputClass('heardAboutUs')} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Henvendelsestype *</label>
                    <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} className={getInputClass('inquiryType')}>
                      <option value="Påmelding">Påmelding</option>
                      <option value="Spørsmål">Spørsmål/Sette på liste</option>
                    </select>
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Melding / Allergier / Spesielle Behov</label>
                  <textarea name="message" rows={3} value={formData.message} onChange={handleChange} className={getInputClass('message')}></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Lest våre vilkår og akseptert? *
                    <button onClick={openTerms} type="button" className="ml-2 text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1 text-xs font-bold">
                      <ArrowUpCircle size={12} /> Les vilkår her
                    </button>
                  </label>
                  <select name="termsAccepted" value={formData.termsAccepted} onChange={handleChange} className={getInputClass('termsAccepted')}>
                    <option value="" disabled>Velg...</option>
                    <option value="Ja">Ja, vilkår aksepteres</option>
                  </select>
                </div>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg w-full md:w-auto justify-center ${
                    status === 'submitting'
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-900/50 transform hover:scale-105'
                  }`}
                >
                  {status === 'submitting' ? 'Behandler...' : 'Meld På'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortalBookingForm;
