import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';
import { Theme } from '../types';

interface NewsPageProps {
    theme?: Theme;
}

const NewsPage: React.FC<NewsPageProps> = ({ theme }) => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const isNordic = theme === 'nordic';

    // Theme Configuration
    const colors = {
        bg: isNordic ? 'bg-[#FAFAF9]' : 'bg-slate-950',
        text: isNordic ? 'text-slate-900' : 'text-white',
        textMuted: isNordic ? 'text-slate-600' : 'text-slate-400',
        textLight: isNordic ? 'text-slate-500' : 'text-slate-500', 
        cardBg: isNordic ? 'bg-white' : 'bg-slate-900',
        cardBorder: isNordic ? 'border-slate-100' : 'border-slate-800',
        imageBg: isNordic ? 'bg-slate-100' : 'bg-slate-800',
        imageFallback: isNordic ? 'bg-slate-50 text-slate-300' : 'bg-slate-800 text-slate-600',
        sectionTitle: isNordic ? 'text-slate-900' : 'text-white',
        dateText: isNordic ? 'text-slate-400' : 'text-cyan-400',
        button: isNordic ? 'text-slate-900' : 'text-cyan-400 hover:text-cyan-300',
        cardHover: isNordic ? 'hover:shadow-xl' : 'hover:shadow-2xl hover:shadow-cyan-900/10 hover:border-slate-700',
        titleHover: isNordic ? 'group-hover:text-slate-700' : 'group-hover:text-cyan-400', 
    };

    return (
        <div className={`min-h-screen flex flex-col justify-start pt-32 pb-20 px-6 transition-colors duration-500 ${colors.bg}`}>
            <Helmet>
                <title>Nyheter og Blogg | Idrettsbarna</title>
                <meta name="description" content="Siste nytt, oppdateringer og artikler fra Idrettsbarna." />
            </Helmet>

            <div className="max-w-7xl w-full mx-auto relative">
                <div className="mb-20 grid lg:grid-cols-2 gap-12 items-end">
                    <div>
                        <span className={`block text-xs font-semibold tracking-[0.2em] uppercase mb-6 ${colors.textLight}`}>
                            Aktuelt
                        </span>
                        <h1 className={`text-5xl md:text-7xl font-serif leading-tight ${colors.text}`}>
                            Nyheter &<br /><span className={`italic ${colors.textMuted}`}>Oppdateringer</span>
                        </h1>
                    </div>
                    <p className={`text-xl font-light leading-relaxed max-w-lg mb-4 ${colors.textMuted}`}>
                        Hold deg oppdatert på hva som skjer hos oss. Her finner du informasjon om kursstart, tips og triks, og glimt fra hverdagen i bassenget.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post) => (
                        <article
                            key={post.slug}
                            className={`${colors.cardBg} rounded-3xl overflow-hidden shadow-sm transition-all duration-500 group flex flex-col h-full border ${colors.cardBorder} ${colors.cardHover}`}
                        >
                            {/* Image */}
                            <div className={`relative h-64 overflow-hidden ${colors.imageBg}`}>
                                {post.imageUrl ? (
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                                    />
                                ) : (
                                    <div className={`w-full h-full flex items-center justify-center ${colors.imageFallback}`}>
                                        <Newspaper className="w-12 h-12" />
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-1 flex flex-col">
                                <div className={`flex items-center gap-2 text-xs font-bold uppercase tracking-widest mb-4 ${colors.dateText}`}>
                                    <Calendar className="w-3 h-3" />
                                    {post.date}
                                </div>

                                <h2 className={`text-2xl font-serif mb-4 leading-tight transition-colors ${colors.text} ${colors.titleHover}`}>
                                    {post.title}
                                </h2>

                                <p className={`${colors.textMuted} font-light mb-8 line-clamp-3 leading-relaxed flex-1`}>
                                    {post.excerpt}
                                </p>

                                <button
                                    onClick={() => navigate(`/nyheter/${post.slug}`)}
                                    className={`flex items-center gap-3 font-bold uppercase tracking-wider text-xs group/btn self-start mt-auto hover:gap-4 transition-all ${colors.button}`}
                                >
                                    Les mer
                                    <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsPage;
