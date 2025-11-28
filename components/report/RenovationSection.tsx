import React, { useState } from 'react';
import { SectionData } from '../../types';
import { Hammer, TrendingUp, DollarSign, Clock, CheckCircle, Info, X, Calculator, ArrowRight, PiggyBank, Briefcase, ArrowUpRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';

const RenovationSection = ({ section, currentValuation }: { section: SectionData, currentValuation: number }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Safe Data Access
    const renovation = section.renovation || {
        totalCost: { value: 0, explanation: "Dati in elaborazione..." },
        valueIncrease: { value: 0, explanation: "Dati in elaborazione..." },
        roi: { value: 0, explanation: "Dati in elaborazione..." },
        timeline: { value: 0, explanation: "Dati in elaborazione..." },
        breakdown: [],
        bonuses: []
    };

    // Derived Values for "Transformation" View
    const currentValue = currentValuation || 0;
    const renovationCost = Number(renovation.totalCost.value) || 0;
    const valueAdded = Number(renovation.valueIncrease.value) || 0;
    const futureValue = currentValue + valueAdded;

    // Chart Data
    const breakdownData = renovation.breakdown?.map((item, index) => ({
        name: item.category,
        value: item.cost,
        color: ['#ec4899', '#d946ef', '#8b5cf6', '#10b981'][index % 4] // Pink to Green spectrum
    })) || [];

    return (
        <div className="max-w-7xl w-full mx-auto p-6 space-y-8">
            {/* 1. HEADER */}
            <div className="text-center mb-12 relative">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    Potenziale <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-emerald-500">Trasformativo</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Visualizza l'impatto della ristrutturazione: dall'investimento iniziale al valore futuro generato.
                </p>
            </div>

            {/* 2. TRANSFORMATION CARD (Pink -> Green) */}
            <div className="glass-panel p-1 rounded-3xl border border-white/10 bg-gradient-to-r from-pink-500/20 via-purple-500/10 to-emerald-500/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xl rounded-[22px] m-[1px]"></div>

                <div className="relative z-10 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    {/* PRE (Pink) */}
                    <div className="text-center md:text-left">
                        <span className="text-pink-400 font-bold text-xs uppercase tracking-widest mb-2 block">Stato Attuale</span>
                        <div className="text-4xl lg:text-5xl font-bold text-white mb-1">€ {currentValue.toLocaleString()}</div>
                        <div className="text-gray-500 text-sm">Valore di Mercato Oggi</div>
                    </div>

                    {/* ACTION (Arrow & Cost) */}
                    <div className="flex flex-col items-center justify-center text-center">
                        <div className="w-full h-1 bg-gradient-to-r from-pink-500/50 to-emerald-500/50 rounded-full mb-4 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0f172a] p-2 rounded-full border border-white/10">
                                <Hammer className="w-5 h-5 text-purple-400" />
                            </div>
                        </div>
                        <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl mb-1">
                            <span className="text-white font-bold">Investimento: € {renovationCost.toLocaleString()}</span>
                        </div>
                        <span className="text-xs text-gray-500">{renovation.timeline.value} Mesi di Lavori</span>
                    </div>

                    {/* POST (Green) */}
                    <div className="text-center md:text-right">
                        <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest mb-2 block">Post Ristrutturazione</span>
                        <div className="text-4xl lg:text-5xl font-bold text-white mb-1">€ {futureValue.toLocaleString()}</div>
                        <div className="text-emerald-400/70 text-sm font-bold flex items-center justify-center md:justify-end gap-1">
                            <TrendingUp className="w-4 h-4" /> +{(futureValue - currentValue - renovationCost).toLocaleString()}€ (Netto)
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. ROI & METRICS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedItem({ label: 'ROI', value: renovation.roi.value + '%', detail: renovation.roi, type: 'metric' })}
                    className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 cursor-pointer group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400"><Calculator className="w-6 h-6" /></div>
                        <Info className="w-4 h-4 text-gray-600 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Ritorno Investimento</span>
                    <span className="text-3xl font-bold text-white">{renovation.roi.value}%</span>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedItem({ label: 'Incremento Valore', value: '€ ' + valueAdded.toLocaleString(), detail: renovation.valueIncrease, type: 'metric' })}
                    className="glass-panel p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 cursor-pointer group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400"><TrendingUp className="w-6 h-6" /></div>
                        <Info className="w-4 h-4 text-gray-600 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Valore Aggiunto</span>
                    <span className="text-3xl font-bold text-white">+ € {valueAdded.toLocaleString()}</span>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedItem({ label: 'Bonus Fiscali', value: renovation.bonuses.length + ' Attivi', description: "Clicca per vedere i dettagli dei bonus.", type: 'bonus' })}
                    className="glass-panel p-6 rounded-2xl border border-pink-500/20 bg-pink-500/5 cursor-pointer group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400"><PiggyBank className="w-6 h-6" /></div>
                        <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-pink-400 transition-colors" />
                    </div>
                    <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Incentivi Fiscali</span>
                    <span className="text-3xl font-bold text-white">{renovation.bonuses.length} Attivi</span>
                </motion.div>
            </div>

            {/* 4. COST BREAKDOWN CHART */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-white/5">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-purple-400" /> Ripartizione Budget
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={breakdownData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#fff', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'white', opacity: 0.1 }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px', borderRadius: '12px' }} />
                                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={32}>
                                    {breakdownData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-3">
                        {renovation.breakdown?.map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ scale: 1.02, x: 5 }}
                                onClick={() => setSelectedItem({ ...item, label: item.category, type: 'category' })}
                                className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 cursor-pointer hover:border-white/20 transition-all group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: breakdownData[idx % breakdownData.length]?.color }}></div>
                                    <span className="text-gray-300 font-medium">{item.category}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-white font-bold">€ {item.cost.toLocaleString()}</span>
                                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
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
                            className="bg-[#0f172a] border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 rounded-xl bg-white/10 text-white">
                                        {selectedItem.type === 'bonus' ? <PiggyBank className="w-6 h-6 text-pink-400" /> : <Sparkles className="w-6 h-6 text-emerald-400" />}
                                    </div>
                                    <button onClick={() => setSelectedItem(null)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-2">{selectedItem.label}</h2>
                                {selectedItem.value && <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-emerald-400 mb-6">{selectedItem.value}</div>}
                                {selectedItem.cost && <div className="text-3xl font-bold text-white mb-6">€ {selectedItem.cost.toLocaleString()}</div>}

                                {selectedItem.type === 'bonus' ? (
                                    <div className="space-y-4">
                                        {renovation.bonuses.map((b, i) => (
                                            <div key={i} className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                                                <h4 className="text-pink-400 font-bold mb-1">{b.name}</h4>
                                                <div className="text-white font-bold text-lg mb-1">{b.value}</div>
                                                <p className="text-pink-200/70 text-sm">{b.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <>
                                        <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mb-6">
                                            <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Analisi Dettagliata</h4>
                                            <p className="text-gray-300 leading-relaxed">
                                                {selectedItem.detail?.explanation || selectedItem.description || "Nessuna descrizione disponibile."}
                                            </p>
                                        </div>
                                        {selectedItem.tips && (
                                            <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex gap-3">
                                                <Briefcase className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                                                <div>
                                                    <h5 className="text-yellow-400 font-bold text-sm mb-1">Consiglio dell'Esperto</h5>
                                                    <p className="text-yellow-200/70 text-xs">{selectedItem.tips}</p>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RenovationSection;
