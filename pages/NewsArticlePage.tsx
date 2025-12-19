import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { X, Calendar, Newspaper, ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const NewsArticlePage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const post = BLOG_POSTS.find(p => p.slug === slug);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [slug]);

    if (!post) {
        return (
            <div className="min-h-screen bg-[#FAFAF9] flex flex-col items-center justify-center pt-40 pb-20 px-4">
                <h1 className="text-3xl text-slate-900 font-serif mb-4">Artikkelen ble ikke funnet</h1>
                <button
                    onClick={() => navigate('/nyheter')}
                    className="text-slate-600 hover:text-slate-900 flex items-center gap-2 border-b border-slate-300 pb-1"
                >
                    <ArrowLeft size={16} />
                    Tilbake til nyheter
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAFAF9] pt-32 pb-20 px-4 md:px-6"> 
            <Helmet>
                <title>{post.title} | Idrettsbarna</title>
                <meta name="description" content={post.excerpt} />
            </Helmet>

            <article className="max-w-4xl w-full mx-auto bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-xl relative animate-fade-in-up">

                {/* Close Button */}
                <button
                    onClick={() => navigate('/nyheter')}
                    className="absolute top-6 right-6 z-50 p-3 bg-white/90 backdrop-blur-md rounded-full text-slate-900 hover:bg-white hover:scale-105 transition-all border border-slate-100 shadow-lg group"
                    title="Lukk"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Hero Image */}
                <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden bg-slate-100">
                    {post.imageUrl ? (
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover grayscale opacity-95"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-slate-50">
                            <Newspaper className="w-20 h-20 text-slate-300" />
                        </div>
                    )}
                </div>

                {/* Content Container */}
                <div className="p-8 md:p-16">

                    {/* Header Info */}
                    <div className="mb-12 border-b border-slate-100 pb-10">
                        <div className="flex items-center gap-2 text-slate-400 font-medium mb-6 text-sm uppercase tracking-widest">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                        </div>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-slate-900 leading-[1.1] mb-8">
                            {post.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-slate-500 leading-relaxed font-light">
                            {post.excerpt}
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="prose prose-slate prose-lg md:prose-xl max-w-none prose-headings:font-serif prose-headings:font-light prose-p:font-light prose-p:text-slate-600 prose-strong:font-semibold prose-strong:text-slate-900">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                    
                    <div className="mt-16 pt-10 border-t border-slate-100 flex justify-center">
                        <button
                            onClick={() => navigate('/nyheter')}
                            className="text-slate-500 hover:text-slate-900 flex items-center gap-2 font-medium transition-colors"
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
