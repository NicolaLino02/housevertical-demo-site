import React, { useState } from 'react';
import { SectionData } from '../../types';
import { Leaf, Wind, Volume2, TreePine, Droplets, Sun, CloudRain, Info, X, MapPin, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

const EnvironmentSection = ({ section }: { section: SectionData }) => {
    const [selectedMetric, setSelectedMetric] = useState<any>(null);

    // Safe Data Access
    const radarData = section.chartData?.radar || [
        { subject: 'Aria', A: 85, fullMark: 100 },
        { subject: 'Verde', A: 70, fullMark: 100 },
        { subject: 'Silenzio', A: 60, fullMark: 100 },
        { subject: 'Pulizia', A: 90, fullMark: 100 },
        { subject: 'Acqua', A: 80, fullMark: 100 },
    ];

    const findDetail = (key: string) => section.details?.find(d => d.label.toLowerCase().includes(key.toLowerCase()));

    // Metrics Configuration
    const metrics = [
        {
            id: 'air',
            label: 'Qualità Aria',
            icon: Wind,
            color: 'text-cyan-400',
            bg: 'bg-cyan-500',
            gradient: 'from-cyan-500/20 to-transparent',
            value: findDetail('Aria')?.value || 'Buona',
            score: 85,
            detail: findDetail('Aria')
        },
        {
            id: 'green',
            label: 'Aree Verdi',
            icon: TreePine,
            color: 'text-emerald-400',
            bg: 'bg-emerald-500',
            gradient: 'from-emerald-500/20 to-transparent',
            value: findDetail('Verdi')?.value || '3 Parchi',
            score: 75,
            detail: findDetail('Verdi')
        },
        {
            id: 'noise',
            label: 'Acustica',
            icon: Volume2,
            color: 'text-purple-400',
            bg: 'bg-purple-500',
            gradient: 'from-purple-500/20 to-transparent',
            value: findDetail('Acustico')?.value || 'Medio',
            score: 60,
            detail: findDetail('Acustico')
        },
        {
            id: 'hydro',
            label: 'Rischio Idro',
            icon: Droplets,
            color: 'text-blue-400',
            bg: 'bg-blue-500',
            gradient: 'from-blue-500/20 to-transparent',
            value: findDetail('Idro')?.value || 'Basso',
            score: 90,
            detail: findDetail('Idro')
        },
    ];

    return (
        <div className="max-w-7xl w-full mx-auto p-6 space-y-8">
            {/* 1. HEADER */}
            <div className="text-center mb-12 relative">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    Analisi <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Ambientale</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Valutazione della qualità della vita basata su dati ambientali, presenza di verde e livelli di inquinamento.
                </p>
            </div>

            {/* 2. MAIN DASHBOARD */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                {/* Radar Chart Visualizer */}
                <div className="lg:col-span-5 glass-panel p-8 rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-emerald-900/10 to-transparent relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
                    <div className="absolute top-0 left-0 p-32 bg-emerald-500/5 rounded-full blur-[80px]"></div>

                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2 relative z-10">
                        <Leaf className="w-5 h-5 text-emerald-400" /> Eco-Score Radar
                    </h3>

                    <div className="w-full h-[300px] relative z-10">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                <PolarGrid stroke="#334155" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} />
                                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                <Radar name="Environment" dataKey="A" stroke="#10b981" strokeWidth={3} fill="#10b981" fillOpacity={0.3} />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px' }} />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Metrics Grid */}
                <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {metrics.map((metric) => (
                        <motion.div
                            key={metric.id}
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedMetric(metric)}
                            className={`glass-panel p-6 rounded-2xl border border-white/5 bg-gradient-to-br ${metric.gradient} cursor-pointer group relative overflow-hidden`}
                        >
                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`p-3 rounded-xl bg-white/10 ${metric.color}`}>
                                    <metric.icon className="w-6 h-6" />
                                </div>
                                <div className="text-right">
                                    <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Valore Rilevato</span>
                                    <span className="text-xl font-bold text-white">{metric.value}</span>
                                </div>
                            </div>

                            <h4 className="text-white font-bold text-lg mb-3 relative z-10">{metric.label}</h4>

                            <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden relative z-10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${metric.score}%` }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className={`h-full ${metric.bg}`}
                                />
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-xs text-gray-400 group-hover:text-white transition-colors relative z-10">
                                <Info className="w-3 h-3" /> Clicca per dettagli
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* 3. SUMMARY & RECOMMENDATION */}
            <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-white/5 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                        <Sun className="w-6 h-6 text-yellow-400" />
                        Sintesi Ambientale
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        {section.summary || "La zona presenta ottimi indicatori di vivibilità, con una buona presenza di aree verdi e livelli di inquinamento contenuti."}
                    </p>
                </div>
                <div className="w-full md:w-1/3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
                    <h4 className="text-emerald-400 font-bold mb-2 text-sm uppercase tracking-wider">Verdetto AI</h4>
                    <p className="text-emerald-100 italic text-sm">
                        "{section.recommendation || "Ideale per famiglie e amanti dello sport all'aria aperta grazie alla vicinanza ai parchi."}"
                    </p>
                </div>
            </div>

            {/* DETAIL MODAL */}
            <AnimatePresence>
                {selectedMetric && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                        onClick={() => setSelectedMetric(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-[#0f172a] border border-white/10 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden relative"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Decorative Background */}
                            <div className={`absolute top-0 left-0 w-full h-32 bg-gradient-to-b ${selectedMetric.gradient} opacity-50`}></div>

                            <div className="p-8 relative z-10">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`p-4 rounded-2xl bg-white/10 ${selectedMetric.color} backdrop-blur-md`}>
                                        <selectedMetric.icon className="w-8 h-8" />
                                    </div>
                                    <button onClick={() => setSelectedMetric(null)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <h2 className="text-3xl font-bold text-white mb-2">{selectedMetric.label}</h2>
                                <div className={`text-xl font-bold ${selectedMetric.color} mb-6`}>{selectedMetric.value}</div>

                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mb-6">
                                    <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Analisi Dettagliata</h4>
                                    <p className="text-gray-300 leading-relaxed">
                                        {selectedMetric.detail?.explanation || "Analisi basata su dati satellitari Sentinel-5P, mappe acustiche regionali e censimento del verde urbano."}
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                                        <span className="block text-xs text-gray-500 uppercase mb-1">Score</span>
                                        <span className="text-xl font-bold text-white">{selectedMetric.score}/100</span>
                                    </div>
                                    <div className="flex-1 p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                                        <span className="block text-xs text-gray-500 uppercase mb-1">Trend</span>
                                        <span className="text-xl font-bold text-emerald-400 flex justify-center items-center gap-1">
                                            <ExternalLink className="w-4 h-4" /> Stabile
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EnvironmentSection;
