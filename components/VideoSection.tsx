import React from 'react';
import { Youtube, Play } from 'lucide-react';
import { Theme } from '../types';

interface VideoSectionProps {
  theme?: Theme;
}

const VideoSection: React.FC<VideoSectionProps> = ({ theme }) => {
  
  // NORDIC THEME
  if (theme === 'nordic') {
    return (
      <section id="video" className="py-32 bg-[#FAFAF9]">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
             <span className="text-slate-500 text-xs tracking-[0.2em] uppercase font-semibold">
                Bli inspirert
             </span>
             <h2 className="text-4xl md:text-5xl font-serif text-slate-900">
                Se videoklipp
             </h2>
             <p className="max-w-2xl mx-auto text-lg text-slate-600 font-light leading-relaxed">
                Få et lite innblikk i hverdagen vår i bassenget. Trygghet, mestring og lek.
             </p>
          </div>

          <div className="relative w-full pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-2xl bg-slate-100 group">
            <iframe
              src="https://www.youtube.com/embed/JgVWP4Pyrkc"
              title="Idrettsbarna YouTube Video"
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://www.youtube.com/channel/UCeGAPk4IA4Vu3QoyWQnwcUw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-slate-900 border border-slate-200 hover:border-slate-400 rounded-full font-medium transition-all shadow-sm hover:shadow-lg hover:-translate-y-0.5 group"
            >
              <Youtube className="w-5 h-5 text-red-600 transition-transform group-hover:scale-110" />
              <span>Besøk vår YouTube-kanal</span>
            </a>
          </div>
        </div>
      </section>
    );
  }

  // DEFAULT THEME
  return (
    <section id="video" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-base text-cyan-400 font-semibold tracking-wide uppercase">Video</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            Se Idrettsbarna i aksjon
          </p>
          <p className="mt-4 max-w-2xl text-xl text-slate-400 mx-auto">
            Få et innblikk i våre svømmekurs, livredningsøvelser og aktiviteter i Asker gjennom våre videoer.
          </p>
        </div>

        {/* 16:9 Aspect Ratio Container */}
        <div className="relative w-full pb-[56.25%] h-0 rounded-2xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-900 group">
          <iframe
            src="https://www.youtube.com/embed/JgVWP4Pyrkc"
            title="Idrettsbarna YouTube Video"
            className="absolute top-0 left-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>

        <div className="mt-10 text-center">
          <a
            href="https://www.youtube.com/channel/UCeGAPk4IA4Vu3QoyWQnwcUw"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-red-900/40 hover:-translate-y-1"
          >
            <Youtube className="w-6 h-6" />
            Besøk vår YouTube-kanal
          </a>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
