import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { BLOG_POSTS } from '../constants';
import { Calendar, ArrowRight, Newspaper } from 'lucide-react';

const NewsPage: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-start pt-40 pb-20 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Nyheter og Blogg | Idrettsbarna</title>
                <meta name="description" content="Siste nytt, oppdateringer og artikler fra Idrettsbarna." />
            </Helmet>

            <div className="max-w-7xl w-full mx-auto relative">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 flex items-center justify-center gap-4">
                        <Newspaper className="w-10 h-10 text-cyan-400" />
                        Nyheter
                    </h1>
                    <p className="max-w-2xl mx-auto text-base text-slate-400">
                        Hold deg oppdatert på hva som skjer hos oss. Her finner du informasjon om kursstart, tips og triks, og glimt fra hverdagen i bassenget.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post) => (
                        <article
                            key={post.slug}
                            className="bg-slate-900 rounded-3xl overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all duration-300 group flex flex-col h-full"
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                {post.imageUrl ? (
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-800 flex items-center justify-center">
                                        <Newspaper className="w-12 h-12 text-slate-600" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60"></div>
                            </div>

                            {/* Content */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium mb-3">
                                    <Calendar className="w-4 h-4" />
                                    {post.date}
                                </div>

                                <h2 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                                    {post.title}
                                </h2>

                                <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-1">
                                    {post.excerpt}
                                </p>

                                <button
                                    onClick={() => navigate(`/nyheter/${post.slug}`)}
                                    className="flex items-center gap-2 text-white font-medium group/btn self-start mt-auto"
                                >
                                    Les mer
                                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-cyan-400" />
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
