import React, { useState } from 'react';
import { SectionData, ReportData } from '../../types';
import { TrendingUp, TrendingDown, DollarSign, Clock, AlertTriangle, Target, ArrowRight, Info, X, Home, BarChart3, Percent, Activity, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, ComposedChart, Line, Area, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const ValuationSection = ({ section, data }: { section: SectionData, data: ReportData }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const [viewMode, setViewMode] = useState<'seller' | 'buyer'>('seller');

    // Safe Data Access with Fallbacks
    const valuation = section.valuation || {
        saleStrategy: {
            quickSale: { price: 0, timing: "N/A", description: "Dati non disponibili", analysis: "Nessuna analisi disponibile.", confidence: 0 },
            marketPrice: { price: 0, timing: "N/A", description: "Dati non disponibili", analysis: "Nessuna analisi disponibile.", confidence: 0 },
            highPrice: { price: 0, timing: "N/A", description: "Dati non disponibili", analysis: "Nessuna analisi disponibile.", confidence: 0 }
        },
        buyStrategy: {
            idealPrice: 0,
            maxDiscount: 0,
            riskLevel: "medium",
            advice: "Dati non disponibili",
            analysis: "Nessuna analisi disponibile.",
            negotiationPoints: []
        },
        comparables: [],
        marketTrend: []
    };

    // Fallback Chart Data if AI doesn't provide it
    const chartData = valuation.marketTrend && valuation.marketTrend.length > 0 ? valuation.marketTrend : [
        { year: '2020', value: 2800, volume: 120 },
        { year: '2021', value: 2950, volume: 145 },
        { year: '2022', value: 3100, volume: 130 },
        { year: '2023', value: 3050, volume: 90 },
        { year: '2024', value: 3200, volume: 110 }
    ];

    return (
        <div className="max-w-7xl w-full mx-auto p-6 space-y-8">
            {/* 1. HEADER */}
            <div className="text-center mb-12 relative">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    Valutazione <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-500">Strategica</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Analisi di prezzo avanzata per vendere al meglio o acquistare con il massimo sconto.
                </p>
            </div>

            {/* 2. MODE SWITCHER */}
            <div className="flex justify-center mb-8">
                <div className="bg-white/5 p-1 rounded-xl border border-white/10 flex gap-1">
                    <button
                        onClick={() => setViewMode('seller')}
                        className={`px-6 py-2 rounded-lg font-bold transition-all ${viewMode === 'seller' ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' : 'text-gray-400 hover:text-white'}`}
                    >
                        Vendi Casa
                    </button>
                    <button
                        onClick={() => setViewMode('buyer')}
                        className={`px-6 py-2 rounded-lg font-bold transition-all ${viewMode === 'buyer' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-gray-400 hover:text-white'}`}
                    >
                        Compra Casa
                    </button>
                </div>
            </div>

            {/* 3. MAIN DASHBOARD */}
            <AnimatePresence mode="wait">
                {viewMode === 'seller' ? (
                    <motion.div
                        key="seller"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                    >
                        {/* SELLER STRATEGIES */}
                        <motion.div
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedItem({ type: 'strategy', title: 'Vendita Rapida', data: valuation.saleStrategy.quickSale, color: 'text-yellow-400', bg: 'bg-yellow-500' })}
                            className="glass-panel p-8 rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-yellow-900/10 to-transparent cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 rounded-xl bg-yellow-500/20 text-yellow-400"><Clock className="w-6 h-6" /></div>
                                <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded-lg">Aggressiva</span>
                            </div>
                            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Vendita Rapida</h3>
                            <div className="text-3xl font-bold text-white mb-2">€ {valuation.saleStrategy.quickSale.price.toLocaleString()}</div>
                            <p className="text-gray-400 text-sm mb-4">{valuation.saleStrategy.quickSale.timing}</p>
                            <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                                Analisi <ArrowRight className="w-3 h-3" />
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedItem({ type: 'strategy', title: 'Prezzo di Mercato', data: valuation.saleStrategy.marketPrice, color: 'text-indigo-400', bg: 'bg-indigo-500' })}
                            className="glass-panel p-8 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-900/10 to-transparent cursor-pointer group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-20 bg-indigo-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>
                            <div className="flex justify-between items-start mb-6 relative z-10">
                                <div className="p-3 rounded-xl bg-indigo-500/20 text-indigo-400"><Target className="w-6 h-6" /></div>
                                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 border border-indigo-500/30 px-2 py-1 rounded-lg">Consigliata</span>
                            </div>
                            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1 relative z-10">Prezzo di Mercato</h3>
                            <div className="text-4xl font-bold text-white mb-2 relative z-10">€ {valuation.saleStrategy.marketPrice.price.toLocaleString()}</div>
                            <p className="text-gray-400 text-sm mb-4 relative z-10">{valuation.saleStrategy.marketPrice.timing}</p>
                            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all relative z-10">
                                Analisi <ArrowRight className="w-3 h-3" />
                            </div>
                        </motion.div>

                        <motion.div
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedItem({ type: 'strategy', title: 'Prezzo Alto', data: valuation.saleStrategy.highPrice, color: 'text-purple-400', bg: 'bg-purple-500' })}
                            className="glass-panel p-8 rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-transparent cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400"><TrendingUp className="w-6 h-6" /></div>
                                <span className="text-xs font-bold uppercase tracking-wider text-purple-400 border border-purple-500/30 px-2 py-1 rounded-lg">Lenta</span>
                            </div>
                            <h3 className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-1">Prezzo Alto</h3>
                            <div className="text-3xl font-bold text-white mb-2">€ {valuation.saleStrategy.highPrice.price.toLocaleString()}</div>
                            <p className="text-gray-400 text-sm mb-4">{valuation.saleStrategy.highPrice.timing}</p>
                            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                                Analisi <ArrowRight className="w-3 h-3" />
                            </div>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="buyer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                    >
                        {/* BUYER STRATEGY CARD */}
                        <div
                            onClick={() => setSelectedItem({ type: 'buyer_analysis', data: valuation.buyStrategy })}
                            className="lg:col-span-8 glass-panel p-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/10 to-transparent relative overflow-hidden cursor-pointer group"
                        >
                            <div className="absolute top-0 right-0 p-32 bg-emerald-500/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>

                            <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
                                <div>
                                    <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-2">Prezzo Ideale d'Acquisto</h3>
                                    <div className="text-5xl lg:text-7xl font-bold text-white tracking-tight mb-4">€ {valuation.buyStrategy.idealPrice.toLocaleString()}</div>
                                    <p className="text-gray-300 max-w-lg leading-relaxed">{valuation.buyStrategy.advice}</p>
                                    <div className="mt-4 flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                                        Strategia Negoziazione <ArrowRight className="w-3 h-3" />
                                    </div>
                                </div>

                                <div className="bg-black/20 p-6 rounded-2xl border border-white/5 min-w-[200px]">
                                    <div className="mb-4">
                                        <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Sconto Max</span>
                                        <span className="text-3xl font-bold text-white flex items-center gap-1">
                                            <Percent className="w-5 h-5 text-emerald-400" /> {valuation.buyStrategy.maxDiscount}%
                                        </span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Rischio Rifiuto</span>
                                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-xs font-bold ${valuation.buyStrategy.riskLevel === 'low' ? 'bg-green-500/20 text-green-400' : valuation.buyStrategy.riskLevel === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                                            {valuation.buyStrategy.riskLevel === 'low' ? 'Basso' : valuation.buyStrategy.riskLevel === 'medium' ? 'Medio' : 'Alto'}
                                            <AlertTriangle className="w-3 h-3" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* COMPARABLES LIST */}
                        <div className="lg:col-span-4 space-y-4">
                            <h3 className="text-white font-bold flex items-center gap-2 mb-2">
                                <Home className="w-5 h-5 text-gray-400" /> Comparabili Usati
                            </h3>
                            {valuation.comparables.map((comp: any, idx: number) => (
                                <a
                                    key={idx}
                                    href={comp.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="glass-panel p-4 rounded-xl border border-white/5 bg-white/5 flex justify-between items-center hover:bg-white/10 transition-colors group"
                                >
                                    <div>
                                        <div className="text-white font-bold text-sm group-hover:text-indigo-400 transition-colors">{comp.address}</div>
                                        <div className="text-gray-400 text-xs">{comp.sqm} mq • {Math.round(comp.price / comp.sqm).toLocaleString()} €/mq</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-emerald-400 font-bold">€ {comp.price.toLocaleString()}</div>
                                        <div className="text-gray-500 text-xs">{comp.similarity}% Simile</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* 4. MARKET TREND CHART (COMPLEX) */}
            <div className="glass-panel p-8 rounded-3xl border border-white/5 bg-white/5">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-xl font-bold text-white flex items-center gap-2">
                            <Activity className="w-5 h-5 text-indigo-400" /> Analisi Trend & Volumi
                        </h3>
                        <p className="text-gray-400 text-sm">Correlazione tra prezzo medio al mq e volume di compravendite.</p>
                    </div>
                </div>
                <div className="h-[350px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={chartData}>
                            <defs>
                                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis dataKey="year" stroke="#94a3b8" axisLine={false} tickLine={false} />
                            <YAxis yAxisId="left" stroke="#818cf8" axisLine={false} tickLine={false} tickFormatter={(val) => `€${val}`} />
                            <YAxis yAxisId="right" orientation="right" stroke="#34d399" axisLine={false} tickLine={false} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Legend />
                            <Bar yAxisId="right" dataKey="volume" name="Volume Vendite" fill="#34d399" barSize={20} radius={[4, 4, 0, 0]} opacity={0.6} />
                            <Area yAxisId="left" type="monotone" dataKey="value" name="Prezzo al Mq" stroke="#818cf8" strokeWidth={3} fill="url(#colorPrice)" />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* DETAIL MODAL */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-[#0f172a] border border-white/10 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl ${selectedItem.bg ? selectedItem.bg + '/20' : 'bg-emerald-500/20'} ${selectedItem.color || 'text-emerald-400'}`}>
                                            {selectedItem.type === 'buyer_analysis' ? <Target className="w-8 h-8" /> : <DollarSign className="w-8 h-8" />}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">{selectedItem.title || 'Analisi Acquisto'}</h2>
                                            {selectedItem.data.price && <p className={`text-xl font-bold ${selectedItem.color}`}>€ {selectedItem.data.price.toLocaleString()}</p>}
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedItem(null)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                        <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                            <Activity className="w-4 h-4" /> Analisi AI
                                        </h4>
                                        <p className="text-gray-300 leading-relaxed text-lg">
                                            {selectedItem.data.analysis}
                                        </p>
                                    </div>

                                    {selectedItem.data.confidence && (
                                        <div className="flex items-center gap-4">
                                            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div className="h-full bg-indigo-500" style={{ width: `${selectedItem.data.confidence * 100}%` }}></div>
                                            </div>
                                            <span className="text-indigo-400 font-bold">{Math.round(selectedItem.data.confidence * 100)}% Confidenza</span>
                                        </div>
                                    )}

                                    {selectedItem.data.negotiationPoints && (
                                        <div>
                                            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
                                                <ShieldCheck className="w-4 h-4" /> Punti di Negoziazione
                                            </h4>
                                            <ul className="space-y-2">
                                                {selectedItem.data.negotiationPoints.map((point: string, idx: number) => (
                                                    <li key={idx} className="flex items-start gap-2 text-gray-300">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0"></div>
                                                        {point}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ValuationSection;
