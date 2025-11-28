import React, { useState } from 'react';
import { SectionData, NewsItem } from '../../types';
import { ShieldAlert, TrendingDown, Newspaper, ExternalLink, AlertTriangle, ShieldCheck, MapPin, X, ChevronRight, Siren } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts';

const CrimeSection = ({ section }: { section: SectionData }) => {
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
    const [showDetail, setShowDetail] = useState(false);

    // Safe Data Access
    const news = section.news || [];
    const trendData = section.chartData?.trend || [
        { year: '2020', value: 65 }, { year: '2021', value: 60 }, { year: '2022', value: 55 }, { year: '2023', value: 45 }, { year: '2024', value: 40 }
    ];
    const score = section.score || 7.5;

    // Helper to determine safety level
    const getSafetyLevel = (s: number) => {
        if (s >= 8) return { label: 'Eccellente', color: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500' };
        if (s >= 6) return { label: 'Buono', color: 'text-yellow-400', bg: 'bg-yellow-500', border: 'border-yellow-500' };
        return { label: 'Attenzione', color: 'text-red-400', bg: 'bg-red-500', border: 'border-red-500' };
    };

    const level = getSafetyLevel(score);

    return (
        <div className="max-w-7xl w-full mx-auto p-6 space-y-8">
            {/* 1. HEADER */}
            <div className="text-center mb-12 relative">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    Analisi <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Sicurezza</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Monitoraggio in tempo reale di incidenti, trend di criminalità e percezione della sicurezza nel quartiere.
                </p>
            </div>

            {/* 2. HERO DASHBOARD */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Safety Score Card */}
                <div className="lg:col-span-1 glass-panel p-8 rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-900/10 to-transparent relative overflow-hidden flex flex-col items-center justify-center text-center">
                    <div className="absolute top-0 right-0 p-32 bg-red-500/5 rounded-full blur-[80px]"></div>

                    <div className="relative z-10 mb-6">
                        <div className="w-40 h-40 rounded-full border-8 border-white/5 flex items-center justify-center relative">
                            <div className={`absolute inset-0 rounded-full border-8 ${level.border} opacity-20`}></div>
                            <div className={`absolute inset-0 rounded-full border-8 ${level.border} border-t-transparent border-l-transparent rotate-45`}></div>
                            <div className="flex flex-col items-center">
                                <span className="text-5xl font-bold text-white">{score}</span>
                                <span className="text-xs text-gray-400 uppercase tracking-widest mt-1">/10</span>
                            </div>
                        </div>
                    </div>

                    <h3 className={`text-2xl font-bold ${level.color} mb-2`}>{level.label}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                        {section.summary || "L'indice di sicurezza è calcolato incrociando dati ufficiali, segnalazioni e notizie locali."}
                    </p>
                </div>

                {/* Trend Chart */}
                <div className="lg:col-span-2 glass-panel p-8 rounded-3xl border border-white/10 bg-white/5 flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                <TrendingDown className="w-5 h-5 text-emerald-400" /> Trend Criminalità
                            </h3>
                            <p className="text-gray-400 text-xs mt-1">Andamento storico degli ultimi 5 anni</p>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                            -15% vs Media Città
                        </div>
                    </div>

                    <div className="flex-1 min-h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trendData}>
                                <defs>
                                    <linearGradient id="colorCrime" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="year" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                                <Area type="monotone" dataKey="value" stroke="#ef4444" strokeWidth={3} fill="url(#colorCrime)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 3. NEWS FEED & ALERTS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* News Column */}
                <div className="lg:col-span-8 space-y-6">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                        <Newspaper className="w-6 h-6 text-red-400" />
                        Ultime Notizie & Segnalazioni
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {news.length > 0 ? (
                            news.map((item, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -5 }}
                                    className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all cursor-pointer group flex flex-col justify-between"
                                    onClick={() => setSelectedNews(item)}
                                >
                                    <div>
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="px-2 py-1 rounded-md bg-white/10 text-[10px] font-bold text-gray-300 uppercase tracking-wider">
                                                {item.source || 'Fonte Locale'}
                                            </span>
                                            <span className="text-gray-500 text-xs">{item.date || 'Recente'}</span>
                                        </div>
                                        <h4 className="text-white font-bold text-lg leading-tight mb-3 group-hover:text-red-400 transition-colors line-clamp-2">
                                            {item.title}
                                        </h4>
                                        <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                                            {item.summary}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest mt-auto">
                                        Leggi Fonte <ExternalLink className="w-3 h-3" />
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-2 text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                <p className="text-gray-500">Nessuna notizia recente rilevante trovata.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Stats */}
                <div className="lg:col-span-4 space-y-6">
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-orange-400" />
                        Dettagli Rischio
                    </h3>

                    <div className="space-y-4">
                        {section.details.slice(0, 4).map((d, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-red-500/10 text-red-400">
                                    <Siren className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-gray-300 text-sm font-medium">{d.label}</h4>
                                    <div className="text-white font-bold text-lg">{d.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-3xl p-6 mt-8">
                        <h4 className="text-indigo-300 font-bold mb-2 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5" /> Verdetto AI
                        </h4>
                        <p className="text-indigo-100 text-sm leading-relaxed italic">
                            "{section.recommendation || "Zona generalmente tranquilla con episodi sporadici. Consigliata installazione di sistema di allarme standard."}"
                        </p>
                    </div>
                </div>
            </div>

            {/* NEWS DETAIL MODAL */}
            <AnimatePresence>
                {selectedNews && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                        onClick={() => setSelectedNews(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-[#0f172a] border border-white/10 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/20">
                                        {selectedNews.source}
                                    </span>
                                    <button onClick={() => setSelectedNews(null)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                                    {selectedNews.title}
                                </h2>

                                <div className="prose prose-invert max-w-none mb-8">
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        {selectedNews.summary}
                                    </p>
                                </div>

                                <a
                                    href={selectedNews.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full py-4 rounded-xl font-bold text-center bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                                >
                                    Leggi Articolo Completo <ExternalLink className="w-5 h-5" />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CrimeSection;
