import React, { useState, useEffect } from 'react';
import { EnrollmentFormData } from '../types';
import { Send, CheckCircle, ArrowUpCircle } from 'lucide-react';

interface ContactFormProps {
  formOverrides?: Partial<EnrollmentFormData>;
}

const ContactForm: React.FC<ContactFormProps> = ({ formOverrides }) => {
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
  const [highlightedFields, setHighlightedFields] = useState<string[]>([]);

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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const scrollToTerms = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('vilkar');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate processing
    setTimeout(() => {
      console.log("Form submitted:", formData);
      
      const subject = `${formData.inquiryType}: ${formData.selectedCourse}`;
      const body = `
PÅMELDING/HENVENDELSE IDRETTSBARNA
--------------------------------
Type: ${formData.inquiryType}

FORELDER:
Navn: ${formData.parentFirstName} ${formData.parentLastName}
E-post: ${formData.email}
Telefon: ${formData.phone}
Adresse: ${formData.address}
Poststed: ${formData.zipCity}

BARN:
Navn: ${formData.childFirstName}
Fødselsdato: ${formData.childBirthDate}

KURS:
Valgt kurs: ${formData.selectedCourse}

DIVERSE:
Hørt om oss via: ${formData.heardAboutUs}
Vilkår akseptert: ${formData.termsAccepted}

MELDING:
${formData.message}
      `;
      
      // Create mailto link
      const mailtoLink = `mailto:kontakt@idrettsbarna.no?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      const link = document.createElement('a');
      link.href = mailtoLink;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      setStatus('success');
      
      // Resetting for this demo after a delay
      setTimeout(() => setStatus('idle'), 8000);
    }, 1000);
  };

  const getInputClass = (fieldName: string) => {
    const baseClass = "w-full bg-slate-800 border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all placeholder-slate-500";
    if (highlightedFields.includes(fieldName)) {
      return `${baseClass} border-cyan-400 ring-2 ring-cyan-500/50 bg-cyan-900/20 duration-500`;
    }
    return `${baseClass} border-slate-700`;
  };

  return (
    <section id="contact" className="py-24 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Info Header */}
        <div className="mb-10 text-slate-300 space-y-3 bg-slate-950/50 p-6 rounded-xl border border-slate-800">
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wide border-b border-slate-800 pb-2">
                PÅMELDING TIL KURS
            </h2>
            <ul className="space-y-3 text-sm md:text-base list-none">
                <li className="flex gap-2">
                    <span className="font-bold text-white min-w-[140px]">Påmeldingsskjema:</span>
                    <span>Benytt vårt påmeldingsskjema, selv om du kun har spørsmål. Vi vil svare deg så snart som mulig.</span>
                </li>
                 <li className="flex gap-2">
                    <span className="font-bold text-white min-w-[140px]">Ventelister:</span>
                    <span>Dersom kurset du ønsker er fullt, tilbyr vi ventelister. Du vil bli kontaktet når det blir ledig plass.</span>
                </li>
                 <li className="flex gap-2">
                    <span className="font-bold text-white min-w-[140px]">Bindende Påmelding:</span>
                    <span>Påmeldingen til våre svømmekurs er bindende. Vennligst les våre vilkår for mer informasjon om dette.</span>
                </li>
            </ul>
        </div>

        <div className="bg-slate-950 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden">
          <div className="p-8 md:p-12">
            
            {status === 'success' ? (
              <div className="bg-green-500/10 border border-green-500 rounded-lg p-8 text-center animate-fade-in">
                <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Takk for din henvendelse!</h3>
                <p className="text-green-200">Din e-post klient skal nå ha åpnet seg for å sende informasjonen. Trykk send i e-postprogrammet ditt.</p>
              </div>
            ) : (
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
                    <label htmlFor="selectedCourse" className="block text-sm font-medium text-slate-300 mb-2">Navn på kurs (Asker, Oslo eller Hokksund)</label>
                    <input
                      type="text"
                      name="selectedCourse"
                      value={formData.selectedCourse}
                      onChange={handleChange}
                      placeholder="F.eks. Babysvømming Onsdag 15:00"
                      className={getInputClass('selectedCourse')}
                    />
                    <p className="text-xs text-slate-500 mt-1">Velg gjerne kurs fra timeplanen over for å fylle ut dette automatisk.</p>
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
                     <button onClick={scrollToTerms} className="ml-2 text-cyan-400 hover:text-cyan-300 hover:underline inline-flex items-center gap-1 text-xs font-bold">
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
                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-full text-lg font-bold transition-all shadow-lg w-full md:w-auto justify-center ${
                      status === 'submitting' 
                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white shadow-cyan-900/50 transform hover:scale-105'
                    }`}
                  >
                    {status === 'submitting' ? 'Behandler...' : 'Send'}
                  </button>
                  <p className="mt-4 text-xs text-slate-500">
                    Ved å klikke "Send" åpnes din e-postklient med ferdig utfylt informasjon.
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;