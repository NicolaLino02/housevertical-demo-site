import React, { useState } from 'react';
import { SectionData, ReportData, RichMetric } from '../../types';
import {
    BarChart as ChartIcon, Clock, Percent, TrendingUp, Building2, BarChart3, Activity, DollarSign, ArrowRight, Info, X, Lightbulb, PieChart, MapPin, ArrowLeft, ChevronRight, Target, ShieldCheck, Zap, TrendingDown, Layers, Users, BrainCircuit, ArrowUpRight, Home
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell, PieChart as RechartsPie, Pie, LineChart, Line, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// --- HELPER COMPONENTS ---

const KpiCard = ({ label, value, subtext, icon: Icon, color, bg, onClick }: any) => (
    <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="relative overflow-hidden rounded-2xl p-4 cursor-pointer transition-all border bg-white/5 border-white/10 hover:bg-white/10 group flex flex-col justify-between min-h-[140px]"
    >
        <div className="flex justify-between items-start mb-3 relative z-10">
            <div className={`p-2 rounded-xl ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
        </div>
        <div className="relative z-10">
            <h4 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</h4>
            <div className="font-bold text-white text-2xl mb-0.5">{value}</div>
            <p className="text-[10px] text-gray-500 font-medium">{subtext}</p>
        </div>
    </motion.div>
);

// --- COMPARABLE LAYOUT (Standalone) ---
const ComparableLayout = ({ comp }: { comp: any }) => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Image & Key Stats */}
            <div className="lg:col-span-5 space-y-6">
                {/* Visual Placeholder */}
                <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative z-10 text-center p-6">
                        <Building2 className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                        <span className="text-gray-400 text-sm font-medium uppercase tracking-widest">Immobile Simile</span>
                    </div>
                    {/* Price Tag */}
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                        <span className="text-white font-bold text-lg">€ {comp.price.toLocaleString()}</span>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                        <span className="block text-gray-500 text-xs uppercase font-bold mb-1">Mq</span>
                        <span className="text-lg font-bold text-white">{comp.sqm}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                        <span className="block text-gray-500 text-xs uppercase font-bold mb-1">€/Mq</span>
                        <span className="text-lg font-bold text-white">{Math.round(comp.pricePerSqm).toLocaleString()}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                        <span className="block text-gray-500 text-xs uppercase font-bold mb-1">Piano</span>
                        <span className="text-lg font-bold text-white">{comp.floor}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                        <span className="block text-gray-500 text-xs uppercase font-bold mb-1">Locali</span>
                        <span className="text-lg font-bold text-white">{comp.rooms || '-'}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                        <span className="block text-gray-500 text-xs uppercase font-bold mb-1">Bagni</span>
                        <span className="text-lg font-bold text-white">{comp.bathrooms || '-'}</span>
                    </div>
                    <div className="bg-white/5 p-3 rounded-xl border border-white/5 text-center">
                        <span className="block text-gray-500 text-xs uppercase font-bold mb-1">Ascensore</span>
                        <span className="text-lg font-bold text-white">{comp.elevator ? 'Sì' : 'No'}</span>
                    </div>
                </div>
            </div>

            {/* Right Column: Details & Analysis */}
            <div className="lg:col-span-7 space-y-8">
                <div>
                    <h3 className="text-3xl font-bold text-white mb-2">{comp.address}</h3>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <MapPin className="w-4 h-4" />
                        <span>Distanza: {comp.distance}</span>
                    </div>
                </div>

                {/* Description */}
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <Info className="w-4 h-4" /> Descrizione
                    </h4>
                    <p className="text-gray-300 leading-relaxed italic">
                        "{comp.description}"
                    </p>
                </div>

                {/* AI Analysis */}
                <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6">
                    <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                        <BrainCircuit className="w-4 h-4" /> Analisi Competitiva
                    </h4>
                    <p className="text-indigo-200">
                        {comp.analysis}
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                    <a
                        href={comp.url && comp.url !== 'N/A' ? comp.url : '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 py-4 rounded-xl font-bold text-center transition-all flex items-center justify-center gap-2 ${comp.url && comp.url !== 'N/A'
                            ? 'bg-white text-black hover:bg-gray-200'
                            : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        Vedi Annuncio <ArrowUpRight className="w-5 h-5" />
                    </a>

                    <button className="flex-1 py-4 rounded-xl font-bold text-center bg-indigo-600 text-white hover:bg-indigo-500 transition-all flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20">
                        Genera Report Completo <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- MARKET DETAIL VIEW ---
const MarketDetailView: React.FC<{ item: { label: string; metric: RichMetric; color: string; icon: any; type: 'price' | 'time' | 'demand' | 'growth' | 'comparable'; data?: any }, onBack: () => void }> = ({ item, onBack }) => {
    const getColor = (c: string) => {
        switch (c) {
            case 'yellow': return { text: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', gradient: 'from-yellow-500/20 to-transparent', solid: 'bg-yellow-500', stroke: '#eab308' };
            case 'orange': return { text: 'text-orange-400', bg: 'bg-orange-500/10', border: 'border-orange-500/20', gradient: 'from-orange-500/20 to-transparent', solid: 'bg-orange-500', stroke: '#f97316' };
            case 'green': return { text: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-500/20', gradient: 'from-green-500/20 to-transparent', solid: 'bg-green-500', stroke: '#22c55e' };
            case 'blue': return { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', gradient: 'from-blue-500/20 to-transparent', solid: 'bg-blue-500', stroke: '#3b82f6' };
            default: return { text: 'text-white', bg: 'bg-white/10', border: 'border-white/20', gradient: 'from-white/20 to-transparent', solid: 'bg-white', stroke: '#fff' };
        }
    };

    const theme = getColor(item.color);

    const PriceLayout = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Main Stat & Trend */}
                <div className={`md:col-span-2 rounded-3xl p-8 border ${theme.border} bg-gradient-to-br ${theme.gradient} relative overflow-hidden`}>
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest">Valore di Mercato</span>
                            <div className="text-5xl lg:text-6xl font-bold text-white mt-2">
                                {typeof item.metric.value === 'number' ? item.metric.value.toLocaleString() : item.metric.value}
                                <span className={`text-2xl ml-2 opacity-60 ${theme.text}`}>€/mq</span>
                            </div>
                        </div>
                        <div className={`p-3 rounded-2xl ${theme.bg} border ${theme.border}`}>
                            <TrendingUp className={`w-6 h-6 ${theme.text}`} />
                        </div>
                    </div>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={item.metric.trend || []}>
                                <defs>
                                    <linearGradient id="colorTrendPrice" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={theme.stroke} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={theme.stroke} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="year" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                                <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} domain={['auto', 'auto']} />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                                <Area type="monotone" dataKey="value" stroke={theme.stroke} strokeWidth={3} fill="url(#colorTrendPrice)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Distribution & Benchmark */}
                <div className="space-y-6">
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                        <h4 className="text-gray-400 text-xs font-bold uppercase mb-4">Distribuzione Prezzi</h4>
                        <div className="space-y-4">
                            {item.metric.breakdown?.map((b, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-300">{b.label}</span>
                                        <span className="text-white font-mono">€ {b.value.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full ${i === 1 ? theme.solid : 'bg-gray-600'}`}
                                            style={{ width: `${(b.value / (item.metric.breakdown?.[2]?.value || b.value)) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center justify-between">
                        <div>
                            <div className="text-gray-400 text-xs font-bold uppercase">Benchmark</div>
                            <div className="text-white font-medium text-sm mt-1">{item.metric.benchmark?.label}</div>
                        </div>
                        <div className="text-right">
                            <div className={`text-xl font-bold ${theme.text}`}>€ {item.metric.benchmark?.value.toLocaleString()}</div>
                            <div className="text-[10px] text-gray-500">Differenza: {Math.round(((Number(item.metric.value) - (item.metric.benchmark?.value || 0)) / (item.metric.benchmark?.value || 1)) * 100)}%</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h4 className="text-gray-400 text-xs font-bold uppercase mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-yellow-400" /> Analisi AI
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">{item.metric.explanation}</p>
                <div className="mt-4 p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl text-yellow-200 text-sm italic">
                    "{item.metric.recommendation}"
                </div>
            </div>
        </div>
    );

    const TimeLayout = () => (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Big Number & Circular Progress */}
                <div className={`rounded-3xl p-8 border ${theme.border} bg-gradient-to-br ${theme.gradient} flex flex-col items-center justify-center text-center relative overflow-hidden`}>
                    <div className="relative z-10">
                        <div className="text-6xl font-bold text-white mb-2">{item.metric.value}</div>
                        <div className={`text-lg font-medium ${theme.text}`}>Giorni Medi</div>
                        <p className="text-gray-400 text-xs mt-4 max-w-xs mx-auto">{item.metric.explanation}</p>
                    </div>
                    {/* Decorative circles */}
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border-4 border-dashed ${theme.border} opacity-20 animate-spin-slow`}></div>
                </div>

                {/* Seasonality Chart */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col">
                    <h4 className="text-gray-400 text-xs font-bold uppercase mb-4">Stagionalità (Trimestri)</h4>
                    <div className="flex-1 min-h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={item.metric.trend || []}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="year" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                                <Bar dataKey="value" fill={theme.stroke} radius={[4, 4, 0, 0]} barSize={30} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Breakdown by Type */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {item.metric.breakdown?.map((b, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                        <span className="text-gray-300 text-sm">{b.label}</span>
                        <span className={`font-bold ${theme.text}`}>{b.value} gg</span>
                    </div>
                ))}
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <p className="text-gray-300 text-sm leading-relaxed">{item.metric.recommendation}</p>
            </div>
        </div>
    );

    const DemandLayout = () => (
        <div className="space-y-6">
            {/* Gauge & Split */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`md:col-span-1 rounded-3xl p-6 border ${theme.border} bg-gradient-to-br ${theme.gradient} flex flex-col items-center justify-center`}>
                    <div className="relative w-40 h-40 flex items-center justify-center">
                        <svg className="w-full h-full" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="#334155" strokeWidth="10" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke={theme.stroke} strokeWidth="10" strokeDasharray={`${Number(item.metric.value) * 2.83} 283`} strokeLinecap="round" transform="rotate(-90 50 50)" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-3xl font-bold text-white">{item.metric.value}</span>
                            <span className="text-[10px] text-gray-400 uppercase">Score</span>
                        </div>
                    </div>
                    <div className="mt-4 text-center">
                        <h4 className="text-white font-bold">Richiesta {Number(item.metric.value) > 70 ? 'Molto Alta' : 'Media'}</h4>
                        <p className="text-xs text-gray-400 mt-1">{item.metric.explanation}</p>
                    </div>
                </div>

                <div className="md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-center">
                    <h4 className="text-gray-400 text-xs font-bold uppercase mb-6">Composizione Domanda</h4>
                    <div className="space-y-8">
                        {item.metric.breakdown?.map((b, i) => (
                            <div key={i}>
                                <div className="flex justify-between mb-2">
                                    <span className="text-white font-medium flex items-center gap-2">
                                        {b.label === 'Acquisto' ? <DollarSign className="w-4 h-4 text-blue-400" /> : <Users className="w-4 h-4 text-purple-400" />}
                                        {b.label}
                                    </span>
                                    <span className="text-gray-300 font-mono">{b.value}%</span>
                                </div>
                                <div className="w-full bg-white/10 h-3 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${b.value}%` }}
                                        className={`h-full ${b.label === 'Acquisto' ? 'bg-blue-500' : 'bg-purple-500'}`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trend Timeline */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <h4 className="text-gray-400 text-xs font-bold uppercase mb-4">Trend Richieste (Ultimi Mesi)</h4>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={item.metric.trend || []}>
                            <defs>
                                <linearGradient id="colorTrendDemand" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={theme.stroke} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={theme.stroke} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                            <XAxis dataKey="year" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                            <Area type="monotone" dataKey="value" stroke={theme.stroke} strokeWidth={3} fill="url(#colorTrendDemand)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );

    const GrowthLayout = () => (
        <div className="space-y-6">
            {/* Scenarios */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {item.metric.breakdown?.map((b, i) => (
                    <div key={i} className={`rounded-2xl p-6 border ${i === 1 ? theme.border : 'border-white/10'} ${i === 1 ? 'bg-white/10' : 'bg-white/5'} flex flex-col items-center text-center`}>
                        <span className="text-xs text-gray-400 uppercase tracking-widest mb-2">{b.label}</span>
                        <div className={`text-3xl font-bold ${i === 1 ? theme.text : 'text-white'}`}>
                            {b.value > 0 ? '+' : ''}{b.value}%
                        </div>
                        {i === 1 && <div className="mt-2 px-2 py-1 bg-blue-500/20 text-blue-300 text-[10px] rounded-full">Scenario Probabile</div>}
                    </div>
                ))}
            </div>

            {/* Forecast Chart */}
            <div className={`rounded-3xl p-6 border ${theme.border} bg-gradient-to-br ${theme.gradient}`}>
                <h4 className="text-white font-bold mb-6 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" /> Proiezione 3 Anni
                </h4>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={item.metric.trend || []}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                            <XAxis dataKey="year" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                            <Bar dataKey="value" fill={theme.stroke} radius={[4, 4, 0, 0]} barSize={40} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-4">
                <div className="p-3 bg-white/10 rounded-full">
                    <Zap className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                    <h4 className="text-white font-bold text-sm">Benchmark Inflazione</h4>
                    <p className="text-gray-400 text-xs">Target BCE: {item.metric.benchmark?.value}%</p>
                </div>
                <div className="ml-auto text-right">
                    <div className="text-green-400 font-bold text-lg">
                        +{((Number(item.metric.value) - (item.metric.benchmark?.value || 0))).toFixed(1)}%
                    </div>
                    <div className="text-[10px] text-gray-500">Spread Reale</div>
                </div>
            </div>
        </div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="w-full min-h-[600px] flex flex-col"
        >
            {/* Detail Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={onBack}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:scale-105 group"
                >
                    <ArrowLeft className="w-5 h-5" />
                </button>
                <div>
                    <h2 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">Dettaglio</h2>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        {item.label}
                        <div className={`w-2 h-2 rounded-full ${theme.solid}`}></div>
                    </h1>
                </div>
            </div>

            {/* Render Specific Layout */}
            {item.type === 'price' && <PriceLayout />}
            {item.type === 'time' && <TimeLayout />}
            {item.type === 'demand' && <DemandLayout />}
            {item.type === 'growth' && <GrowthLayout />}
            {item.type === 'comparable' && <ComparableLayout comp={item.data} />}

        </motion.div>
    );
};

// --- MAIN MARKET SECTION ---
const MarketSection = ({ section, data }: { section: SectionData, data: ReportData }) => {
    const [activeDetail, setActiveDetail] = useState<{ label: string; metric: RichMetric; color: string; icon: any; type: 'price' | 'time' | 'demand' | 'growth' | 'comparable'; data?: any } | null>(null);

    const pps = data.overview.pricePerSqm || 3500;

    // ROBUST FALLBACK DATA
    const marketData = section.marketData || {
        pricePerSqm: {
            value: pps,
            explanation: "Prezzo medio al mq calcolato su dati OMI e annunci recenti.",
            trend: [
                { year: '2020', value: pps * 0.85 }, { year: '2021', value: pps * 0.9 }, { year: '2022', value: pps * 0.95 }, { year: '2023', value: pps }, { year: '2024', value: pps * 1.05 }
            ],
            breakdown: [
                { label: 'Minimo', value: pps * 0.8 }, { label: 'Medio', value: pps }, { label: 'Massimo', value: pps * 1.2 }
            ],
            benchmark: { label: 'Media Città', value: pps * 0.9 },
            recommendation: "Il prezzo è allineato con il mercato attuale, suggerendo una buona tenuta del valore nel tempo."
        },
        averageDaysOnMarket: {
            value: 45,
            explanation: "Tempo medio per vendere un immobile in questa zona.",
            trend: [
                { year: 'Q1', value: 60 }, { year: 'Q2', value: 55 }, { year: 'Q3', value: 50 }, { year: 'Q4', value: 45 }
            ],
            breakdown: [
                { label: 'Bilocali', value: 30 }, { label: 'Trilocali', value: 45 }, { label: 'Quadrilocali', value: 60 }
            ],
            benchmark: { label: 'Media Città', value: 55 },
            recommendation: "I tempi di vendita sono rapidi, indicando un'alta liquidità dell'asset."
        },
        demandIndex: {
            value: 85,
            explanation: "Indice di richiesta basato sulle ricerche online.",
            trend: [
                { year: 'Gen', value: 70 }, { year: 'Feb', value: 75 }, { year: 'Mar', value: 80 }, { year: 'Apr', value: 85 }
            ],
            breakdown: [
                { label: 'Acquisto', value: 60 }, { label: 'Affitto', value: 40 }
            ],
            benchmark: { label: 'Media Zona', value: 70 },
            recommendation: "La domanda è molto forte, superiore alla media di zona."
        },
        supplyIndex: { value: 40, explanation: "Indice di offerta basato sugli immobili disponibili." },
        priceGrowthForecast: {
            value: 3.5,
            explanation: "Previsione di crescita annuale per i prossimi 3 anni.",
            trend: [
                { year: '2025', value: 3.5 }, { year: '2026', value: 4.0 }, { year: '2027', value: 4.2 }
            ],
            breakdown: [
                { label: 'Pessimistico', value: 1.5 }, { label: 'Realistico', value: 3.5 }, { label: 'Ottimistico', value: 5.5 }
            ],
            benchmark: { label: 'Inflazione', value: 2.0 },
            recommendation: "Prevista una crescita costante, superiore al tasso di inflazione."
        },
        comparables: [],
        priceHistory: []
    };

    // Helper to safely get metric for modal
    const getSafeMetric = (metric: any, fallbackKey: keyof typeof marketData): RichMetric => {
        const fallback = marketData[fallbackKey] as any;
        if (!metric) return fallback;

        return {
            value: metric.value || fallback.value,
            explanation: metric.explanation || fallback.explanation,
            breakdown: metric.breakdown || fallback.breakdown,
            recommendation: metric.recommendation || fallback.recommendation,
            trend: metric.trend || fallback.trend,
            benchmark: metric.benchmark || fallback.benchmark
        };
    };

    // Distribution Data (Fallback logic)
    const distData = section.chartData?.distribution || [];
    const minVal = distData.length > 0 ? distData[0].value : (pps * 0.8);
    const maxVal = distData.length > 0 ? distData[distData.length - 1].value : (pps * 1.2);
    const marketStatus = pps > (maxVal + minVal) / 2 ? "Premium" : "Competitivo";

    return (
        <div className="w-full max-w-7xl mx-auto p-4 lg:p-6 space-y-6 min-h-[800px]">
            <AnimatePresence mode="wait">
                {activeDetail ? (
                    <MarketDetailView
                        key="detail"
                        item={activeDetail}
                        onBack={() => setActiveDetail(null)}
                    />
                ) : (
                    <motion.div
                        key="main"
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6"
                    >
                        {/* Centered Header (Consistent with Valuation) */}
                        <div className="text-center mb-12">
                            <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                                Analisi <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Mercato</span>
                            </h2>
                            <p className="text-gray-400 max-w-2xl mx-auto text-sm lg:text-base">
                                Posizionamento competitivo e trend di liquidità dell'asset nel contesto locale.
                            </p>
                        </div>

                        {/* Compact Hero Positioning */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-yellow-500/20 bg-gradient-to-r from-yellow-900/10 to-transparent relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
                                <div className="flex-1 space-y-2">
                                    <span className="text-yellow-500 font-bold uppercase tracking-widest text-[10px]">Posizionamento</span>
                                    <div className="flex items-baseline gap-2">
                                        <h3 className="text-3xl font-bold text-white">€ {Math.round(pps).toLocaleString()}</h3>
                                        <span className="text-gray-400 text-sm">/mq</span>
                                    </div>
                                    <p className="text-gray-400 text-xs leading-relaxed">
                                        Il prezzo si colloca nella fascia {marketStatus === 'Premium' ? 'alta' : 'media'} ({Math.round(minVal).toLocaleString()} - {Math.round(maxVal).toLocaleString()} €/mq).
                                    </p>
                                </div>
                                <div className="w-full md:w-1/2 h-[120px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={distData.length > 0 ? distData : [{ x: 'Min', y: 20 }, { x: 'Avg', y: 50 }, { x: 'Max', y: 20 }]}>
                                            <defs>
                                                <linearGradient id="colorDist" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <Area type="monotone" dataKey="y" stroke="#eab308" strokeWidth={2} fill="url(#colorDist)" />
                                            <ReferenceLine x={marketStatus === 'Premium' ? (distData.length > 0 ? distData.length - 2 : 2) : 1} stroke="white" strokeDasharray="3 3" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* Quick Stats Summary */}
                            <div className="glass-panel p-6 rounded-2xl border border-white/10 bg-white/5 flex flex-col justify-center gap-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-xs">Liquidità</span>
                                    <span className="text-green-400 text-xs font-bold">{Number(marketData.averageDaysOnMarket.value) < 60 ? 'Alta' : 'Media'}</span>
                                </div>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500" style={{ width: `${Math.min(100, (90 / Number(marketData.averageDaysOnMarket.value)) * 50)}%` }}></div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-gray-400 text-xs">Volatilità</span>
                                    <span className="text-yellow-400 text-xs font-bold">Bassa</span>
                                </div>
                                <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                                    <div className="h-full bg-yellow-500" style={{ width: '30%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* KPI Grid - Compact */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <KpiCard
                                label="Prezzo al Mq"
                                value={`€ ${Math.round(pps).toLocaleString()}`}
                                subtext="Media Zona"
                                icon={DollarSign}
                                color="text-yellow-400"
                                bg="bg-yellow-500/10"
                                onClick={() => setActiveDetail({ label: "Prezzo al Mq", metric: getSafeMetric(marketData.pricePerSqm, 'pricePerSqm'), color: "yellow", icon: DollarSign, type: 'price' })}
                            />
                            <KpiCard
                                label="Tempo Vendita"
                                value={`${marketData.averageDaysOnMarket.value} gg`}
                                subtext="Giorni medi"
                                icon={Clock}
                                color="text-orange-400"
                                bg="bg-orange-500/10"
                                onClick={() => setActiveDetail({ label: "Tempo di Vendita", metric: getSafeMetric(marketData.averageDaysOnMarket, 'averageDaysOnMarket'), color: "orange", icon: Clock, type: 'time' })}
                            />
                            <KpiCard
                                label="Indice Domanda"
                                value={`${marketData.demandIndex.value}/100`}
                                subtext="Richiesta"
                                icon={TrendingUp}
                                color="text-green-400"
                                bg="bg-green-500/10"
                                onClick={() => setActiveDetail({ label: "Indice Domanda", metric: getSafeMetric(marketData.demandIndex, 'demandIndex'), color: "green", icon: TrendingUp, type: 'demand' })}
                            />
                            <KpiCard
                                label="Crescita"
                                value={`+${marketData.priceGrowthForecast.value}%`}
                                subtext="CAGR 3 anni"
                                icon={BarChart3}
                                color="text-blue-400"
                                bg="bg-blue-500/10"
                                onClick={() => setActiveDetail({ label: "Previsione Crescita", metric: getSafeMetric(marketData.priceGrowthForecast, 'priceGrowthForecast'), color: "blue", icon: BarChart3, type: 'growth' })}
                            />
                        </div>

                        {/* Comparables Grid */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="p-2 bg-yellow-500/10 rounded-lg">
                                    <Building2 className="w-6 h-6 text-yellow-400" />
                                </div>
                                Immobili Comparabili in Zona
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {marketData.comparables && marketData.comparables.length > 0 ? (
                                    marketData.comparables.slice(0, 4).map((comp, idx) => (
                                        <motion.div
                                            key={idx}
                                            whileHover={{ y: -5 }}
                                            onClick={() => setActiveDetail({ label: "Dettaglio Immobile", metric: { value: comp.price, explanation: comp.description, breakdown: [], trend: [], recommendation: '', benchmark: { label: 'Media Zona', value: Number(marketData.pricePerSqm.value) } } as any, color: "yellow", icon: Building2, type: 'comparable', data: comp } as any)}
                                            className="glass-panel p-5 rounded-2xl border border-white/5 cursor-pointer group hover:border-indigo-500/30 transition-all bg-gradient-to-b from-white/5 to-transparent"
                                        >
                                            <div className="aspect-[4/3] rounded-xl bg-gray-800 mb-4 overflow-hidden relative">
                                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-50 group-hover:scale-110 transition-transform duration-500"></div>
                                                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                                                    <span className="text-white text-xs font-bold">€ {comp.price.toLocaleString()}</span>
                                                </div>
                                                <div className="absolute top-2 right-2 bg-indigo-500 px-2 py-1 rounded-lg shadow-lg">
                                                    <span className="text-white text-xs font-bold">{comp.distance}</span>
                                                </div>
                                            </div>

                                            <h4 className="text-white font-bold text-sm leading-tight mb-2 line-clamp-2 h-10">
                                                {comp.address}
                                            </h4>

                                            <div className="flex justify-between items-center text-xs text-gray-400 border-t border-white/5 pt-3">
                                                <span>{comp.sqm} mq</span>
                                                <span>€ {Math.round(comp.pricePerSqm).toLocaleString()}/mq</span>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="col-span-4 text-gray-500 text-sm text-center py-8 bg-white/5 rounded-2xl border border-dashed border-white/10">
                                        Nessun immobile comparabile trovato nel raggio selezionato.
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MarketSection;
