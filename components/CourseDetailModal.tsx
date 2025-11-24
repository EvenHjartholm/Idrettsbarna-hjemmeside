import React, { useEffect } from 'react';
import { X, CheckCircle, Clock, Tag, Calendar, Users, Droplets, CreditCard, ArrowRight } from 'lucide-react';
import { ServiceItem, SessionContext } from '../types';

interface CourseDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: ServiceItem | null;
  sessionContext?: SessionContext | null;
  onEnroll?: (courseName: string) => void;
}

const CourseDetailModal: React.FC<CourseDetailModalProps> = ({ isOpen, onClose, course, sessionContext, onEnroll }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleEnrollClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    e.preventDefault();
    if (onEnroll && course) {
      const courseString = sessionContext 
        ? `${course.title} - Nivå: ${sessionContext.level} (${sessionContext.day} ${sessionContext.time})`
        : course.title;
      
      onEnroll(courseString);
    }
    onClose();
  };

  if (!isOpen || !course) return null;

  const isWarmWater = course.details.location.toLowerCase().includes('varmt');
  const is25m = course.details.location.includes('25m');
  
  let parentInfoText = "";
  if (isWarmWater) {
    parentInfoText = "Foreldre skal delta i vannet.";
  } else if (is25m) {
    parentInfoText = "Foreldre skal ikke være med i vannet.";
  }

  // Helper to render text with line breaks, simple bold formatting, and bullets
  const renderFormattedText = (text: string) => {
    return text.split('\n').map((paragraph, idx) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return <br key={idx} />;
      
      // Handle Bullet points manually if they start with "-" or "•"
      if (trimmed.startsWith('•') || trimmed.startsWith('- ')) {
         return (
             <div key={idx} className="flex items-start gap-2 ml-4 mb-2 text-slate-300">
                 <span className="text-cyan-400 mt-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full flex-shrink-0"></span>
                 <span>{trimmed.substring(1).trim()}</span>
             </div>
         )
      }

      // Headers (All caps lines or lines ending in :)
      const isHeader = (trimmed.length < 50 && trimmed.toUpperCase() === trimmed) || trimmed.endsWith(':');

      if (isHeader) {
          return <h4 key={idx} className="text-lg font-bold text-white mt-6 mb-2">{trimmed}</h4>
      }

      // Bold syntax **text**
      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
      
      return (
        <p key={idx} className="mb-4 text-slate-400 leading-relaxed text-base md:text-lg">
          {parts.map((part, partIdx) => {
             if (part.startsWith('**') && part.endsWith('**')) {
               return <strong key={partIdx} className="text-white font-bold">{part.slice(2, -2)}</strong>;
             }
             return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-slate-900 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border border-slate-800 animate-fade-in-up flex flex-col">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors z-20"
        >
          <X size={24} />
        </button>

        {/* Image Header */}
        <div className="relative h-48 md:h-64 w-full flex-shrink-0">
          <img 
            src={course.imageUrl} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
          
          {!sessionContext && (
            <div className="absolute bottom-4 left-6 md:left-8 pr-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-md leading-tight">{course.title}</h2>
            </div>
          )}
        </div>

        {/* Selected Session Context Banner */}
        {sessionContext && (
          <div className="bg-cyan-950/40 border-y border-cyan-500/30 px-6 py-5 flex-shrink-0">
             <div className="flex flex-col gap-1">
                <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  {course.title}
                </h2>
                
                <div className="flex items-center gap-2 text-cyan-300 font-medium text-lg mt-1">
                   <Calendar className="w-5 h-5" />
                   <span>{sessionContext.startDate}</span>
                   <span className="text-slate-600 mx-1">•</span>
                   <span>{sessionContext.time}</span>
                </div>

                <div className="mt-2">
                   <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20">
                     Nivå: {sessionContext.level}
                   </span>
                </div>
             </div>
          </div>
        )}

        {/* Body */}
        <div className="p-6 md:p-8 space-y-8">
          
          {/* Quick Info Bar & Primary Action - MOVED UP */}
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-slate-800/50 pb-6">
              <div className="flex flex-wrap gap-3 text-sm font-medium text-slate-300">
                {course.details.age && (
                <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full">
                    <Users className="text-cyan-400 w-4 h-4" />
                    <span>Alder: <span className="text-white">{course.details.age}</span></span>
                </div>
                )}
                <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full">
                <Tag className="text-cyan-400 w-4 h-4" />
                <span>{course.details.price}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-full">
                <Clock className="text-cyan-400 w-4 h-4" />
                <span>{course.details.duration}</span>
                </div>
             </div>

             {/* Prominent Enroll Button at TOP */}
             <button
                onClick={handleEnrollClick}
                className="w-full md:w-auto bg-cyan-600 hover:bg-cyan-500 text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-cyan-900/40 hover:scale-105 flex items-center justify-center gap-2"
              >
                Meld på nå <ArrowRight size={18} />
             </button>
          </div>

          {/* Important Info Box */}
          <div className="bg-slate-950/40 rounded-xl p-4 border border-slate-800/50 space-y-2">
             {parentInfoText && (
               <div className="flex items-center gap-3 text-slate-400 text-sm">
                  <div className="p-1.5 bg-cyan-900/20 rounded-full">
                     <Droplets className="text-cyan-500/80 w-4 h-4" />
                  </div>
                  <span>{parentInfoText}</span>
               </div>
             )}
             <div className="flex items-center gap-3 text-slate-400 text-sm">
                <div className="p-1.5 bg-cyan-900/20 rounded-full">
                    <CreditCard className="text-cyan-500/80 w-4 h-4" />
                </div>
                <span>Faktura kan deles opp ved behov. Gi beskjed ved påmelding.</span>
             </div>
          </div>

          {/* Description */}
          <div>
            <div className="prose prose-invert max-w-none">
              {renderFormattedText(course.details.fullDescription)}
            </div>
          </div>

          {/* Two Columns for Lists */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-slate-800/50">
            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-4 uppercase tracking-wide text-sm">Hva vi lærer</h3>
              <ul className="space-y-3">
                {course.details.learningGoals.map((goal, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="text-green-500 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-cyan-400 mb-4 uppercase tracking-wide text-sm">Ta med</h3>
              <ul className="list-disc list-inside space-y-2 text-slate-300 marker:text-cyan-600">
                {course.details.whatToBring.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Secondary Bottom Call to Action (Optional, but good for long content) */}
          <div className="pt-8 border-t border-slate-800 flex justify-center md:hidden">
             <button
                onClick={handleEnrollClick}
                className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-8 py-3 rounded-full font-bold transition-all"
              >
                Meld på nå
             </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetailModal;