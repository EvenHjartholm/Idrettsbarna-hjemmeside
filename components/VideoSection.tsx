import React from 'react';
import { Youtube } from 'lucide-react';

const VideoSection: React.FC = () => {
  return (
    <section id="videos" className="py-24 bg-slate-950">
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
            title="Idrettsbarna YouTube Kanal"
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
