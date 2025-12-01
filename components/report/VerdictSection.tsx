import React, { useState } from 'react';
import { SectionData } from '../../types';
import { Award, TrendingUp, AlertTriangle, CheckCircle, XCircle, Target, Users, Heart, Briefcase, Info, X, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const VerdictSection = ({ section }: { section: SectionData }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Safe Data Access with Fallbacks
    const verdict = section.verdict || {
        pros: [
            "Posizione strategica vicino alla metro",
            "Alto potenziale di rivalutazione post-ristrutturazione",
            "Zona in forte riqualificazione urbana"
        ],
        cons: [
            "Necessita di ristrutturazione importante",
            "Piano basso senza ascensore",
            "Spese condominiali sopra la media"
        ],
        buyStrategy: {
            title: "Fix & Flip",
            description: "Acquisto, ristrutturazione rapida e rivendita per massimizzare il profitto a breve termine.",
            riskLevel: "medium"
        },
        suitability: [
            { type: 'investor', score: 90, reason: "Ottimo margine per operazione di trading immobiliare." },
            { type: 'young_couple', score: 75, reason: "Buona prima casa se disposti a seguire i lavori." },
            { type: 'family', score: 60, reason: "Spazi interni limitati per una famiglia numerosa." }
        ],
        finalScore: {
            value: 85,
            label: "Eccellente Opportunità",
            description: "Immobile con fondamentali solidi e prezzo d'ingresso competitivo."
        }
    };

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'low': return 'text-green-400 bg-green-500/10 border-green-500/20';
            case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
            case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20';
            default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
        }
    };

    const getSuitabilityIcon = (type: string) => {
        switch (type) {
            case 'investor': return Briefcase;
            case 'family': return Users;
            case 'young_couple': return Heart;
            default: return Target;
        }
    };

    const getSuitabilityLabel = (type: string) => {
        switch (type) {
            case 'investor': return 'Investitori';
            case 'family': return 'Famiglie';
            case 'young_couple': return 'Giovani Coppie';
            default: return 'Generale';
        }
    };

    const scoreData = [
        { name: 'Score', value: verdict.finalScore.value, color: '#10b981' },
        { name: 'Remaining', value: 100 - verdict.finalScore.value, color: '#334155' }
    ];

    return (
        <div className="max-w-7xl w-full mx-auto p-6 space-y-8">
            {/* 1. HEADER */}
            <div className="text-center mb-12 relative">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    Verdetto <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Finale</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Sintesi strategica e valutazione complessiva dell'opportunità.
                </p>
            </div>

            {/* 2. MAIN DASHBOARD */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* FINAL SCORE CARD */}
                <motion.div
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedItem({ type: 'score', data: verdict.finalScore })}
                    className="lg:col-span-1 glass-panel p-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/20 to-transparent cursor-pointer group relative overflow-hidden flex flex-col items-center justify-center text-center"
                >
                    <div className="absolute top-0 right-0 p-20 bg-emerald-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>

                    <h3 className="text-gray-400 font-bold uppercase tracking-widest mb-6">HouseVertical Score</h3>

                    <div className="relative w-48 h-48 mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={scoreData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    startAngle={90}
                                    endAngle={-270}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {scoreData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-5xl font-bold text-white">{verdict.finalScore.value}</span>
                            <span className="text-sm text-gray-400">/100</span>
                        </div>
                    </div>

                    <h4 className="text-2xl font-bold text-white mb-2">{verdict.finalScore.label}</h4>
                    <p className="text-gray-400 text-sm">{verdict.finalScore.description}</p>
                </motion.div>

                {/* STRATEGY & SUITABILITY */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Strategy Card */}
                    <motion.div
                        whileHover={{ scale: 1.01 }}
                        onClick={() => setSelectedItem({ type: 'strategy', data: verdict.buyStrategy })}
                        className={`glass-panel p-8 rounded-3xl border cursor-pointer group ${getRiskColor(verdict.buyStrategy.riskLevel)}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-black/20">
                                    <Target className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">Strategia Consigliata</h3>
                                    <p className="text-sm opacity-80 uppercase tracking-wider">{verdict.buyStrategy.title}</p>
                                </div>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getRiskColor(verdict.buyStrategy.riskLevel)}`}>
                                Rischio {verdict.buyStrategy.riskLevel === 'low' ? 'Basso' : verdict.buyStrategy.riskLevel === 'medium' ? 'Medio' : 'Alto'}
                            </div>
                        </div>
                        <p className="opacity-90 leading-relaxed">{verdict.buyStrategy.description}</p>
                    </motion.div>

                    {/* Suitability Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {verdict.suitability.map((item, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -3 }}
                                onClick={() => setSelectedItem({ type: 'suitability', data: item })}
                                className="glass-panel p-5 rounded-2xl border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-all"
                            >
                                <div className="flex justify-between items-start mb-3">
                                    <div className="p-2 rounded-lg bg-white/10 text-gray-300">
                                        {React.createElement(getSuitabilityIcon(item.type), { className: "w-5 h-5" })}
                                    </div>
                                    <span className={`text-lg font-bold ${item.score >= 80 ? 'text-green-400' : item.score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                                        {item.score}%
                                    </span>
                                </div>
                                <h4 className="text-white font-bold text-sm mb-1">{getSuitabilityLabel(item.type)}</h4>
                                <p className="text-gray-400 text-xs line-clamp-2">{item.reason}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. PROS & CONS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="glass-panel p-8 rounded-3xl border border-green-500/20 bg-green-500/5">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-400" /> Punti di Forza
                    </h3>
                    <ul className="space-y-4">
                        {verdict.pros.map((pro, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-3 text-gray-300"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-2 flex-shrink-0"></div>
                                <span>{pro}</span>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div className="glass-panel p-8 rounded-3xl border border-red-500/20 bg-red-500/5">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <XCircle className="w-6 h-6 text-red-400" /> Punti di Attenzione
                    </h3>
                    <ul className="space-y-4">
                        {verdict.cons.map((con, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="flex items-start gap-3 text-gray-300"
                            >
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 flex-shrink-0"></div>
                                <span>{con}</span>
                            </motion.li>
                        ))}
                    </ul>
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
                            className="bg-[#0f172a] border border-white/10 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8 text-center">
                                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-6">
                                    {selectedItem.type === 'score' ? <Award className="w-10 h-10 text-emerald-400" /> :
                                        selectedItem.type === 'strategy' ? <Target className="w-10 h-10 text-blue-400" /> :
                                            <Users className="w-10 h-10 text-purple-400" />}
                                </div>

                                {selectedItem.type === 'score' && (
                                    <>
                                        <h2 className="text-3xl font-bold text-white mb-2">{selectedItem.data.value}/100</h2>
                                        <h3 className="text-xl text-emerald-400 font-bold mb-4">{selectedItem.data.label}</h3>
                                        <p className="text-gray-400">{selectedItem.data.description}</p>
                                    </>
                                )}

                                {selectedItem.type === 'strategy' && (
                                    <>
                                        <h2 className="text-2xl font-bold text-white mb-2">{selectedItem.data.title}</h2>
                                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold border mb-4 ${getRiskColor(selectedItem.data.riskLevel)}`}>
                                            Rischio {selectedItem.data.riskLevel === 'low' ? 'Basso' : selectedItem.data.riskLevel === 'medium' ? 'Medio' : 'Alto'}
                                        </div>
                                        <p className="text-gray-400">{selectedItem.data.description}</p>
                                    </>
                                )}

                                {selectedItem.type === 'suitability' && (
                                    <>
                                        <h2 className="text-2xl font-bold text-white mb-2">{getSuitabilityLabel(selectedItem.data.type)}</h2>
                                        <div className="text-4xl font-bold text-white mb-4">{selectedItem.data.score}%</div>
                                        <p className="text-gray-400">{selectedItem.data.reason}</p>
                                    </>
                                )}

                                <button onClick={() => setSelectedItem(null)} className="w-full mt-8 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors">
                                    Chiudi
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default VerdictSection;
