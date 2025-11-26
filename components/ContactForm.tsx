import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, ArrowUpCircle, Info } from 'lucide-react';
import { EnrollmentFormData } from '../types';
import emailjs from '@emailjs/browser';

import SuccessModal from './SuccessModal';



interface ContactFormProps {
  formOverrides?: Partial<EnrollmentFormData>;
  selectedServiceId?: string | null;
  onOpenCourseDetails?: () => void;
  onOpenTerms?: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ formOverrides, selectedServiceId, onOpenCourseDetails, onOpenTerms }) => {
  const [formData, setFormData] = useState<EnrollmentFormData>({
    parentFirstName: '',
    parentLastName: '',
    childFirstName: '',
    childBirthDate: '',
    email: '',
    phone: '',
    address: '',
    zipCity: '',
    selectedCourse: '',
    heardAboutUs: '',
    inquiryType: 'Påmelding',
    termsAccepted: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [lastSubmittedType, setLastSubmittedType] = useState<string>('');
  const [highlightedFields, setHighlightedFields] = useState<string[]>([]);

  const [submittedData, setSubmittedData] = useState<EnrollmentFormData | null>(null);

  // Modal States
  const [showSuccess, setShowSuccess] = useState(false);

  // Update form data when overrides change (from AI or Schedule click)
  useEffect(() => {
    if (formOverrides && Object.keys(formOverrides).length > 0) {
      setFormData(prev => ({ ...prev, ...formOverrides }));

      // Flash effect for updated fields
      const newKeys = Object.keys(formOverrides);
      setHighlightedFields(newKeys);
      setTimeout(() => setHighlightedFields([]), 2000);
    }
  }, [formOverrides]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let value = e.target.value;

    // Auto-format Date: DD.MM.YYYY
    if (e.target.name === 'childBirthDate') {
      // Remove non-digits
      const rawValue = value.replace(/\D/g, '');

      // Format
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
    if (onOpenTerms) {
      onOpenTerms();
    }
  };

  const openCourseDetails = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenCourseDetails) {
      onOpenCourseDetails();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // EmailJS Configuration
    const SERVICE_ID = 'service_z5qlv57';
    const TEMPLATE_ID = 'template_8ifgw0r';
    const PUBLIC_KEY = 'AnYbkdu2hWdOx50pj';

    const templateParams = {
      to_name: 'Idrettsbarna',
      from_name: `${formData.parentFirstName} ${formData.parentLastName}`,
      from_email: formData.email,
      phone: formData.phone,
      child_name: formData.childFirstName,
      child_dob: formData.childBirthDate,
      course: formData.selectedCourse,
      inquiry_type: formData.inquiryType,
      address: `${formData.address}, ${formData.zipCity}`,
      heard_about: formData.heardAboutUs,
      terms_accepted: formData.termsAccepted,
      message: formData.message
    };

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        setStatus('success');
        setLastSubmittedType(formData.inquiryType);
        setSubmittedData(formData); // Store data for modal
        setShowSuccess(true); // Open Success Modal

        // Reset form after a delay or immediately? 
        // User might want to see the form cleared. 
        // Let's clear it but keep status as success for a bit if needed, 
        // though the modal covers it.

        setTimeout(() => setStatus('idle'), 2000); // Reset status behind modal

        setFormData({
          parentFirstName: '',
          parentLastName: '',
          childFirstName: '',
          childBirthDate: '',
          email: '',
          phone: '',
          address: '',
          zipCity: '',
          selectedCourse: '',
          heardAboutUs: '',
          inquiryType: 'Påmelding',
          termsAccepted: '',
          message: ''
        });
      }, (err) => {
        console.error('FAILED...', err);
        alert(`Noe gikk galt: ${JSON.stringify(err)}. Sjekk at nøklene er riktige.`);
        setStatus('idle');
      });
  };

  const getInputClass = (fieldName: string) => {
    const baseClass = "w-full bg-slate-800 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder-slate-500";
    if (highlightedFields.includes(fieldName)) {
      return `${baseClass} border-cyan-400 ring-2 ring-cyan-500/50 bg-cyan-900/20 duration-500`;
    }
    return `${baseClass} border-slate-700`;
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 scroll-mt-32">
      <SuccessModal
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        childName={submittedData?.childFirstName || ''}
        courseName={submittedData?.selectedCourse || ''}
        inquiryType={lastSubmittedType}
      />

      {/*
         FIX: The SuccessModal needs the data *after* submission but *before* clearing.
         However, I clear the form in the .then() block.
         I should store the "submitted data" in a separate state for the modal to use.
      */}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Info Header - Elegant Redesign */}
        <div className="mb-12 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/5 p-8 relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-cyan-500 rounded-full"></span>
              Påmelding og Informasjon
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-slate-300">
              <div className="space-y-2">
                <h3 className="font-bold text-white text-base">Påmeldingsskjema</h3>
                <p className="leading-relaxed text-slate-400">
                  Benytt skjemaet nedenfor for både påmelding og uforpliktende spørsmål. Vi svarer raskt!
                  <br /><br />
                  Direkte e-post: <a href="mailto:even@idrettsbarna.no" className="text-cyan-400 hover:text-cyan-300 transition-colors">even@idrettsbarna.no</a>
                </p>
                <button
                  onClick={() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' })}
                  className="mt-4 text-xs font-bold text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/10 px-4 py-2 rounded-full transition-all flex items-center gap-2"
                >
                  <ArrowUpCircle size={14} /> Se kurstider
                </button>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-white text-base">Ventelister</h3>
                <p className="leading-relaxed text-slate-400">
                  Er kurset fullt? Vi har ventelister og kontakter deg så snart en plass åpner seg.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-bold text-white text-base">Viktig å vite</h3>
                <ul className="space-y-2 text-slate-400">
                  <li>• Påmelding er bindende.</li>
                  <li>
                    • Er barnet ditt 6 år og eldre så må du være medlem av Asker triathlonklubb- <a href="https://askertri.no/" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-500/30 underline-offset-4 transition-all">Meld inn i klubben her</a>.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-950 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
          <div className="p-8 md:p-12">

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Parents Name */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="parentFirstName" className="block text-sm font-medium text-slate-300 mb-2">Foreldres Fornavn *</label>
                  <input
                    type="text"
                    name="parentFirstName"
                    required
                    value={formData.parentFirstName}
                    onChange={handleChange}
                    className={getInputClass('parentFirstName')}
                  />
                </div>
                <div>
                  <label htmlFor="parentLastName" className="block text-sm font-medium text-slate-300 mb-2">Foreldres Etternavn *</label>
                  <input
                    type="text"
                    name="parentLastName"
                    required
                    value={formData.parentLastName}
                    onChange={handleChange}
                    className={getInputClass('parentLastName')}
                  />
                </div>
              </div>

              {/* Child Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="childFirstName" className="block text-sm font-medium text-slate-300 mb-2">Barnets fornavn *</label>
                  <input
                    type="text"
                    name="childFirstName"
                    required
                    value={formData.childFirstName}
                    onChange={handleChange}
                    className={getInputClass('childFirstName')}
                  />
                </div>
                <div>
                  <label htmlFor="childBirthDate" className="block text-sm font-medium text-slate-300 mb-2">Barnets Fødselsdato *</label>
                  <input
                    type="text"
                    name="childBirthDate"
                    required
                    value={formData.childBirthDate}
                    onChange={handleChange}
                    placeholder="DD.MM.ÅÅÅÅ"
                    className={getInputClass('childBirthDate')}
                  />
                </div>
              </div>

              {/* Course Name (Auto-filled or manual) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="selectedCourse" className="block text-sm font-medium text-slate-300">Navn på kurs (Asker, Oslo eller Hokksund)</label>
                  {selectedServiceId && (
                    <button
                      onClick={openCourseDetails}
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/10 px-3 py-1 rounded-full transition-all flex items-center gap-1"
                    >
                      <Info size={12} /> Les om kurset
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  name="selectedCourse"
                  value={formData.selectedCourse}
                  onChange={handleChange}
                  placeholder="F.eks. Babysvømming Onsdag 15:00"
                  className={getInputClass('selectedCourse')}
                />
                <p className="text-xs text-slate-500 mt-1">Velg gjerne kurs fra kurstidene over for å fylle ut dette automatisk.</p>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Mailadr privat *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={getInputClass('email')}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-slate-300 mb-2">Mobil *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className={getInputClass('phone')}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-slate-300 mb-2">Gate adr *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className={getInputClass('address')}
                  />
                </div>
                <div>
                  <label htmlFor="zipCity" className="block text-sm font-medium text-slate-300 mb-2">Post nr og sted *</label>
                  <input
                    type="text"
                    name="zipCity"
                    required
                    value={formData.zipCity}
                    onChange={handleChange}
                    className={getInputClass('zipCity')}
                  />
                </div>
              </div>

              {/* Misc */}
              <div>
                <label htmlFor="heardAboutUs" className="block text-sm font-medium text-slate-300 mb-2">Hvor har dere hørt om oss - feks fb, insta, fant lapp på butikk, Risenga svømmehall etc. *</label>
                <textarea
                  name="heardAboutUs"
                  required
                  rows={2}
                  value={formData.heardAboutUs}
                  onChange={handleChange}
                  className={getInputClass('heardAboutUs')}
                ></textarea>
              </div>

              <div>
                <label htmlFor="inquiryType" className="block text-sm font-medium text-slate-300 mb-2">Skriv om dette er påmelding eller spørsmål: *</label>
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className={getInputClass('inquiryType')}
                >
                  <option value="Påmelding">Påmelding</option>
                  <option value="Spørsmål">Spørsmål</option>
                </select>
              </div>

              <div>
                <label htmlFor="termsAccepted" className="block text-sm font-medium text-slate-300 mb-2">
                  Lest våres vilkår og akseptert - skriv (ja eller nei) *
                  <button onClick={openTerms} className="ml-2 text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1 text-xs font-bold">
                    <ArrowUpCircle size={12} /> Les vilkår her
                  </button>
                </label>
                <input
                  type="text"
                  name="termsAccepted"
                  required
                  value={formData.termsAccepted}
                  onChange={handleChange}
                  placeholder="Ja"
                  className={getInputClass('termsAccepted')}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Spørsmål kan skrive her:</label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className={getInputClass('message')}
                ></textarea>
              </div>

              <div className="text-center pt-4">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg w-full md:w-auto justify-center ${status === 'submitting'
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-900/50 transform hover:scale-105'
                    }`}
                >
                  {status === 'submitting' ? 'Behandler...' : 'Send'}
                </button>
                <p className="mt-4 text-xs text-slate-500">
                  Meldingen sendes automatisk til oss.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;