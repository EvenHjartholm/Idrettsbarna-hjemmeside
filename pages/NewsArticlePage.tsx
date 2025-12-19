import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { X, Calendar, Newspaper, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { Theme } from '../types';

interface NewsArticlePageProps {
    theme?: Theme;
}

const NewsArticlePage: React.FC<NewsArticlePageProps> = ({ theme }) => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const post = BLOG_POSTS.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

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
        backButton: isNordic ? 'text-slate-600 hover:text-slate-900 border-slate-300' : 'text-slate-400 hover:text-white border-slate-700',
        closeButton: isNordic ? 'bg-white/90 text-slate-900 hover:bg-white border-slate-100' : 'bg-slate-800/90 text-slate-200 hover:bg-slate-800 border-slate-700',
        divider: isNordic ? 'border-slate-100' : 'border-slate-800',
        prose: isNordic ? 'prose-slate' : 'prose-invert',
    };

    if (!post) {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center pt-40 pb-20 px-4 transition-colors duration-500 ${colors.bg}`}>
                <h1 className={`text-3xl font-serif mb-4 ${colors.text}`}>Artikkelen ble ikke funnet</h1>
                <button
                    onClick={() => navigate('/nyheter')}
                    className={`flex items-center gap-2 border-b pb-1 ${colors.backButton}`}
                >
                    <ArrowLeft size={16} />
                    Tilbake til nyheter
                </button>
            </div>
        );
    }

    return (
        <div className={`min-h-screen pt-32 pb-20 px-4 md:px-6 transition-colors duration-500 ${colors.bg}`}> 
            <Helmet>
                <title>{post.title} | Idrettsbarna</title>
                <meta name="description" content={post.excerpt} />
            </Helmet>

            <article className={`max-w-4xl w-full mx-auto rounded-[2.5rem] overflow-hidden border shadow-xl relative animate-fade-in-up transition-colors duration-500 ${colors.cardBg} ${colors.cardBorder}`}>

                {/* Close Button */}
                <button
                    onClick={() => navigate('/nyheter')}
                    className={`absolute top-6 right-6 z-50 p-3 backdrop-blur-md rounded-full hover:scale-105 transition-all border shadow-lg group ${colors.closeButton}`}
                    title="Lukk"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Hero Image */}
                <div className={`relative h-[400px] md:h-[600px] w-full overflow-hidden ${colors.imageBg}`}>
                    {post.imageUrl ? (
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover grayscale opacity-95"
                        />
                    ) : (
                        <div className={`w-full h-full flex items-center justify-center ${colors.imageFallback}`}>
                            <Newspaper className="w-20 h-20" />
                        </div>
                    )}
                </div>

                {/* Content Container */}
                <div className="p-8 md:p-16">

                    {/* Header Info */}
                    <div className={`mb-12 border-b pb-10 ${colors.divider}`}>
                        <div className={`flex items-center gap-2 font-medium mb-6 text-sm uppercase tracking-widest ${colors.dateText}`}>
                            <Calendar className="w-4 h-4" />
                            {post.date}
                        </div>
                        <h1 className={`text-3xl md:text-5xl lg:text-6xl font-serif leading-[1.1] mb-8 ${colors.sectionTitle}`}>
                            {post.title}
                        </h1>
                        <p className={`text-xl md:text-2xl leading-relaxed font-light ${colors.textLight}`}>
                            {post.excerpt}
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className={`prose prose-lg md:prose-xl max-w-none prose-headings:font-serif prose-headings:font-light prose-p:font-light prose-strong:font-semibold ${colors.prose}`}>
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                    
                    <div className={`mt-16 pt-10 border-t flex justify-center ${colors.divider}`}>
                        <button
                            onClick={() => navigate('/nyheter')}
                            className={`flex items-center gap-2 font-medium transition-colors ${colors.backButton.split(' ')[0]} hover:${colors.backButton.split(' ')[1]}`}
                        >
                            <ArrowLeft size={20} />
                            Tilbake til nyhetsoversikten
                        </button>
                    </div>
                </div>

            </article>
        </div>
    );
};

export default NewsArticlePage;
