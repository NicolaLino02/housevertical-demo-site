import React, { useState } from 'react';
import { SectionData, NewsItem } from '../../types';
import { ShieldCheck, TrendingDown, Newspaper, ExternalLink, Siren, Eye, Lock, MapPin, X, ArrowRight, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const CrimeSection = ({ section }: { section: SectionData }) => {
    const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

    // Safe Data Access
    const news = section.news || [];
    const trendData = section.chartData?.trend || [];
    const score = section.score || 7.5;

    // Safety Level Logic
    const getSafetyLevel = (s: number) => {
        if (s >= 8) return { label: 'Eccellente', color: 'text-emerald-400', gradient: 'from-emerald-500/20 to-transparent', border: 'border-emerald-500/20', stroke: '#10b981' };
        if (s >= 6) return { label: 'Buono', color: 'text-yellow-400', gradient: 'from-yellow-500/20 to-transparent', border: 'border-yellow-500/20', stroke: '#eab308' };
        return { label: 'Attenzione', color: 'text-red-400', gradient: 'from-red-500/20 to-transparent', border: 'border-red-500/20', stroke: '#f87171' };
    };
    const level = getSafetyLevel(score);

    // Kpi Card Component (Market Style)
    const KpiCard = ({ label, value, subtext, icon: Icon, color, bg }: any) => (
        <div className="relative overflow-hidden rounded-2xl p-4 transition-all border bg-white/5 border-white/10 hover:bg-white/10 flex flex-col justify-between min-h-[120px]">
            <div className="flex justify-between items-start mb-3">
                <div className={`p-2 rounded-xl ${bg}`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                </div>
            </div>
            <div>
                <h4 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</h4>
                <div className="font-bold text-white text-xl mb-0.5">{value}</div>
                <p className="text-[10px] text-gray-500 font-medium">{subtext}</p>
            </div>
        </div>
    );

    return (
        <div className="max-w-7xl w-full mx-auto p-4 lg:p-6 space-y-8">

            {/* 1. HEADER (Market Style) */}
            <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    Analisi <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Sicurezza</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-sm lg:text-base">
                    Valutazione della sicurezza e monitoraggio degli incidenti nel quartiere.
                </p>
            </div>

            {/* 2. HERO DASHBOARD */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Score Card */}
                <div className={`lg:col-span-1 glass-panel p-8 rounded-2xl border ${level.border} bg-gradient-to-br ${level.gradient} flex flex-col items-center justify-center text-center relative overflow-hidden`}>
                    <div className="relative w-48 h-48 flex items-center justify-center mb-6">
                        {/* Clean Circular Gauge */}
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#334155" strokeWidth="8" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke={level.stroke} strokeWidth="8" strokeDasharray={`${score * 28.3} 283`} strokeLinecap="round" transform="rotate(-90 50 50)" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <ShieldCheck className={`w-8 h-8 ${level.color} mb-1`} />
                            <span className="text-5xl font-bold text-white">{score}</span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest">Su 10</span>
                        </div>
                    </div>
                    <h3 className={`text-2xl font-bold ${level.color} mb-2`}>{level.label}</h3>
                    <p className="text-gray-300 text-xs leading-relaxed max-w-xs">{section.summary || "L'area presenta indici di sicurezza superiori alla media cittadina."}</p>
                </div>

                {/* Metrics Grid & Trend */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                    {/* KPI Cards */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <KpiCard label="Furti" value="Basso" subtext="-10% vs Media" icon={Lock} color="text-emerald-400" bg="bg-emerald-500/10" />
                        <KpiCard label="Vandalismo" value="Medio" subtext="In lieve calo" icon={AlertTriangle} color="text-yellow-400" bg="bg-yellow-500/10" />
                        <KpiCard label="Interventi" value="Rapidi" subtext="< 10 min" icon={Siren} color="text-blue-400" bg="bg-blue-500/10" />
                        <KpiCard label="Illuminazione" value="Ottima" subtext="Copertura 95%" icon={Eye} color="text-purple-400" bg="bg-purple-500/10" />
                    </div>

                    {/* Trend Chart (Clean) */}
                    <div className="flex-1 glass-panel p-6 rounded-2xl border border-white/5 bg-white/5 flex flex-col">
                        <h4 className="text-gray-400 text-xs font-bold uppercase mb-4 flex items-center gap-2">
                            <TrendingDown className="w-4 h-4 text-emerald-400" /> Trend Criminalità (5 Anni)
                        </h4>
                        <div className="flex-1 min-h-[180px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={trendData}>
                                    <defs>
                                        <linearGradient id="colorCrimeClean" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={level.stroke} stopOpacity={0.2} />
                                            <stop offset="95%" stopColor={level.stroke} stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                    <XAxis dataKey="year" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                                    <Area type="monotone" dataKey="value" stroke={level.stroke} strokeWidth={3} fill="url(#colorCrimeClean)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </div>
            </div>

            {/* 3. NEWS FEED (Clean List) */}
            <div className="glass-panel p-8 rounded-2xl border border-white/5 bg-white/5">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                    <div className="p-2 bg-red-500/10 rounded-lg">
                        <Newspaper className="w-5 h-5 text-red-400" />
                    </div>
                    Cronaca Locale & Segnalazioni
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {news.length > 0 ? (
                        news.map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -3 }}
                                onClick={() => setSelectedNews(item)}
                                className="p-5 rounded-xl border border-white/5 bg-white/5 hover:border-red-500/30 hover:bg-white/10 transition-all cursor-pointer group"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest bg-black/20 px-2 py-1 rounded">{item.source || 'Fonte'}</span>
                                    <span className="text-xs text-gray-500">{item.date}</span>
                                </div>
                                <h4 className="text-white font-bold text-sm mb-2 group-hover:text-red-400 transition-colors line-clamp-1">{item.title}</h4>
                                <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">{item.summary}</p>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-2 text-center py-12 text-gray-500 text-sm italic">
                            Nessuna segnalazione recente rilevante.
                        </div>
                    )}
                </div>
            </div>

            {/* NEWS MODAL */}
            <AnimatePresence>
                {selectedNews && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                        onClick={() => setSelectedNews(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-[#0f172a] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden p-6"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <span className="px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-wider">
                                    {selectedNews.source}
                                </span>
                                <button onClick={() => setSelectedNews(null)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-4">{selectedNews.title}</h2>
                            <p className="text-gray-300 leading-relaxed mb-6 text-sm">
                                {selectedNews.summary}
                            </p>
                            <a
                                href={selectedNews.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block w-full py-3 rounded-xl font-bold text-center bg-white text-black hover:bg-gray-200 transition-all flex items-center justify-center gap-2 text-sm"
                            >
                                Leggi Articolo <ExternalLink className="w-4 h-4" />
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default CrimeSection;
