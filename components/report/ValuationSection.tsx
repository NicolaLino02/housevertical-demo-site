import React, { useState } from 'react';
import { SectionData, ReportData } from '../../types';
import Modal from '../shared/Modal';
import {
    Activity, Building2, CheckCircle, TrendingUp, BrainCircuit, ArrowUpRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell
} from 'recharts';

const ValuationSection = ({ section, data }: { section: SectionData, data: ReportData }) => {
    const currentVal = data.overview.estimatedValue;
    const [selectedMetric, setSelectedMetric] = useState<any>(null);

    const historyData = section.chartData?.history || [];
    const forecastData = section.chartData?.forecast || [];

    const metrics = [
        {
            id: 'range',
            label: 'Range di Prezzo',
            value: `€ ${(currentVal * 0.95).toLocaleString()} - ${(currentVal * 1.05).toLocaleString()}`,
            icon: Activity,
            desc: 'Oscillazione stimata basata sulla volatilità del quartiere.',
            color: 'text-blue-400',
            bg: 'bg-blue-500'
        },
        {
            id: 'sqm',
            label: 'Prezzo al Mq',
            value: `€ ${Math.round(data.overview.pricePerSqm).toLocaleString()}/mq`,
            icon: Building2,
            desc: 'Valore medio calcolato su immobili simili nel raggio di 500m.',
            color: 'text-indigo-400',
            bg: 'bg-indigo-500'
        },
        {
            id: 'confidence',
            label: 'Affidabilità AI',
            value: `${Math.round(data.overview.confidence * 100)}%`,
            icon: CheckCircle,
            desc: 'Livello di confidenza basato sulla quantità di dati reperiti.',
            color: 'text-teal-400',
            bg: 'bg-teal-500'
        }
    ];

    return (
        <div className="max-w-7xl w-full">
            <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">Valutazione <span className="text-indigo-400">Immobiliare</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-sm lg:text-base">
                    Analisi di mercato basata su algoritmi predittivi e comparabili reali.
                </p>
            </div>

            <Modal
                isOpen={!!selectedMetric}
                onClose={() => setSelectedMetric(null)}
                title={selectedMetric?.label}
                icon={selectedMetric?.icon || Activity}
                color={selectedMetric?.color || 'text-white'}
            >
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                    <span className={`text-3xl font-bold text-white block`}>{selectedMetric?.value}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed text-center">{selectedMetric?.desc}</p>
            </Modal>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                <div className="lg:col-span-8 glass-panel rounded-3xl p-8 border border-indigo-500/30 bg-gradient-to-br from-indigo-900/10 to-transparent relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-32 bg-indigo-600/10 rounded-full blur-[80px] group-hover:bg-indigo-600/20 transition-colors duration-500"></div>

                    <div className="relative z-10 mb-8 flex flex-col md:flex-row justify-between items-start gap-4">
                        <div>
                            <p className="text-indigo-300 font-bold uppercase tracking-widest text-sm mb-2">Valore di Mercato Stimato</p>
                            <h3 className="text-5xl lg:text-7xl font-bold text-white tracking-tight">€ {currentVal.toLocaleString()}</h3>
                        </div>
                        <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${section.score > 6 ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                            {section.score > 6 ? <TrendingUp className="w-5 h-5" /> : <TrendingUp className="w-5 h-5 rotate-180" />}
                            <span className="font-bold">Trend {section.score > 6 ? 'Positivo' : 'Stabile'}</span>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={historyData}>
                                <defs>
                                    <linearGradient id="colorValuation" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4} />
                                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="year" stroke="#94a3b8" axisLine={false} tickLine={false} />
                                <YAxis hide domain={['auto', 'auto']} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                    itemStyle={{ color: '#fff' }}
                                    cursor={{ stroke: '#818cf8', strokeWidth: 1, strokeDasharray: '5 5' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={4} fill="url(#colorValuation)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-4">
                    <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-white/5">
                        <div className="flex items-center gap-3 mb-3">
                            <BrainCircuit className="w-5 h-5 text-indigo-400" />
                            <h4 className="font-bold text-white">Analisi Sintetica</h4>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 hover:line-clamp-none transition-all">
                            {section.summary}
                        </p>
                    </div>

                    {metrics.map((m) => (
                        <motion.div
                            key={m.id}
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setSelectedMetric(m)}
                            className="flex-1 glass-panel p-5 rounded-2xl border border-white/5 hover:border-indigo-500/30 cursor-pointer flex items-center justify-between group transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`p-3 rounded-xl bg-black/20 ${m.color} group-hover:bg-white/10 transition-colors`}>
                                    <m.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <span className="block text-gray-500 text-xs font-bold uppercase tracking-widest group-hover:text-indigo-300 transition-colors">{m.label}</span>
                                    <span className="block text-lg font-bold text-white">{m.value}</span>
                                </div>
                            </div>
                            <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-indigo-400" />
                        </motion.div>
                    ))}
                </div>

                <div className="lg:col-span-12 glass-panel p-6 rounded-3xl border border-white/5">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h4 className="text-lg font-bold text-white">Previsione Crescita (12 Mesi)</h4>
                            <p className="text-gray-400 text-sm">Stima basata su piano regolatore e infrastrutture in arrivo.</p>
                        </div>
                        <div className="flex gap-2">
                            <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-lg">+1.8% Atteso</span>
                        </div>
                    </div>
                    <div className="h-[150px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={forecastData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="quarter" stroke="#94a3b8" axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                                />
                                <Bar dataKey="growth" fill="#818cf8" radius={[4, 4, 0, 0]} barSize={40}>
                                    {forecastData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={`rgba(129, 140, 248, ${0.4 + (index * 0.2)})`} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ValuationSection;
