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
        <div className="min-h-screen bg-[#FAFAF9] flex flex-col justify-start pt-32 pb-20 px-6">
            <Helmet>
                <title>Nyheter og Blogg | Idrettsbarna</title>
                <meta name="description" content="Siste nytt, oppdateringer og artikler fra Idrettsbarna." />
            </Helmet>

            <div className="max-w-7xl w-full mx-auto relative">
                <div className="mb-20 grid lg:grid-cols-2 gap-12 items-end">
                    <div>
                        <span className="block text-xs font-semibold tracking-[0.2em] uppercase text-slate-500 mb-6">
                            Aktuelt
                        </span>
                        <h1 className="text-5xl md:text-7xl font-serif text-slate-900 leading-tight">
                            Nyheter &<br /><span className="italic text-slate-500">Oppdateringer</span>
                        </h1>
                    </div>
                    <p className="text-xl text-slate-600 font-light leading-relaxed max-w-lg mb-4">
                        Hold deg oppdatert på hva som skjer hos oss. Her finner du informasjon om kursstart, tips og triks, og glimt fra hverdagen i bassenget.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post) => (
                        <article
                            key={post.slug}
                            className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col h-full border border-slate-100"
                        >
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden bg-slate-100">
                                {post.imageUrl ? (
                                    <img
                                        src={post.imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                                        <Newspaper className="w-12 h-12 text-slate-300" />
                                    </div>
                                )}
                            </div>

                            {/* Content */}
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">
                                    <Calendar className="w-3 h-3" />
                                    {post.date}
                                </div>

                                <h2 className="text-2xl font-serif text-slate-900 mb-4 leading-tight group-hover:text-slate-700 transition-colors">
                                    {post.title}
                                </h2>

                                <p className="text-slate-600 font-light mb-8 line-clamp-3 leading-relaxed flex-1">
                                    {post.excerpt}
                                </p>

                                <button
                                    onClick={() => navigate(`/nyheter/${post.slug}`)}
                                    className="flex items-center gap-3 text-slate-900 font-bold uppercase tracking-wider text-xs group/btn self-start mt-auto hover:gap-4 transition-all"
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
