import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { X, Calendar, Newspaper } from 'lucide-react';
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
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center pt-40 pb-20 px-4">
                <h1 className="text-3xl text-white font-bold mb-4">Artikkelen ble ikke funnet</h1>
                <button
                    onClick={() => navigate('/nyheter')}
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-2"
                >
                    Tilbake til nyheter
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col pt-40 pb-40 px-4 sm:px-6 lg:px-8 relative">
            <Helmet>
                <title>{post.title} | Idrettsbarna</title>
                <meta name="description" content={post.excerpt} />
            </Helmet>

            <article className="max-w-4xl w-full mx-auto bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">

                {/* Close Button - Absolute positioned inside article */}
                <button
                    onClick={() => navigate('/nyheter')}
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-cyan-500 transition-colors border border-white/10 shadow-lg group"
                    title="Lukk"
                >
                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                </button>

                {/* Hero Image - Clean, no text overlay */}
                <div className="relative h-96 md:h-[700px] w-full overflow-hidden bg-slate-800">
                    {post.imageUrl ? (
                        <img
                            src={post.imageUrl}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center">
                            <Newspaper className="w-20 h-20 text-slate-600" />
                        </div>
                    )}
                </div>

                {/* Content Container */}
                <div className="p-8 md:p-16">

                    {/* Header Info - Below Image */}
                    <div className="mb-10 border-b border-white/10 pb-8">
                        <div className="flex items-center gap-2 text-cyan-400 font-medium mb-4">
                            <Calendar className="w-5 h-5" />
                            {post.date}
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
                            {post.title}
                        </h1>
                        <p className="text-xl text-slate-300 leading-relaxed font-light">
                            {post.excerpt}
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="prose prose-invert prose-lg prose-cyan max-w-none">
                        <ReactMarkdown>{post.content}</ReactMarkdown>
                    </div>
                </div>

            </article>
        </div>
    );
};

export default NewsArticlePage;
