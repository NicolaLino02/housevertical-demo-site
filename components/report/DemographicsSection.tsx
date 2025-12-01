import React, { useState } from 'react';
import { SectionData } from '../../types';
import { Users, Baby, Briefcase, GraduationCap, Home, Info, X, TrendingUp, UserCheck, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell, PieChart, Pie } from 'recharts';

const DemographicsSection = ({ section }: { section: SectionData }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Safe Data Access with Fallbacks
    const demographics = section.demographics || {
        populationDensity: { value: 1200, explanation: "Alta densità abitativa, tipica di zone residenziali centrali." },
        averageAge: { value: 42, explanation: "Età media in linea con la media cittadina, mix di famiglie e giovani professionisti." },
        incomeLevel: { value: 35000, explanation: "Reddito medio-alto, indicativo di un buon potere d'acquisto." },
        educationLevel: { value: "Laurea", explanation: "Alto livello di istruzione prevalente tra i residenti." },
        ageDistribution: [
            { ageRange: '0-18', percentage: 15 },
            { ageRange: '19-35', percentage: 25 },
            { ageRange: '36-50', percentage: 30 },
            { ageRange: '51-65', percentage: 20 },
            { ageRange: '65+', percentage: 10 }
        ],
        householdComposition: [
            { type: 'Single', percentage: 35 },
            { type: 'Coppie', percentage: 30 },
            { type: 'Famiglie', percentage: 25 },
            { type: 'Anziani', percentage: 10 }
        ]
    };

    const ageData = demographics.ageDistribution.map((item, index) => ({
        name: item.ageRange,
        value: item.percentage,
        color: ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#ede9fe'][index % 5]
    }));

    const householdData = demographics.householdComposition.map((item, index) => ({
        name: item.type,
        value: item.percentage,
        color: ['#ec4899', '#f472b6', '#fbcfe8', '#fce7f3'][index % 4]
    }));

    return (
        <div className="max-w-7xl w-full mx-auto p-6 space-y-8">
            {/* 1. HEADER */}
            <div className="text-center mb-12 relative">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    Profilo <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Sociologico</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Analisi della popolazione residente: età, composizione familiare e livello socio-economico.
                </p>
            </div>

            {/* 2. KEY METRICS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedItem({ label: 'Densità Abitativa', value: demographics.populationDensity.value + ' ab/km²', detail: demographics.populationDensity, icon: Users })}
                    className="glass-panel p-6 rounded-2xl border border-purple-500/20 bg-purple-500/5 cursor-pointer group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400"><Users className="w-6 h-6" /></div>
                        <Info className="w-4 h-4 text-gray-600 group-hover:text-purple-400 transition-colors" />
                    </div>
                    <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Densità</span>
                    <span className="text-2xl font-bold text-white">{demographics.populationDensity.value} <span className="text-sm font-normal text-gray-400">ab/km²</span></span>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedItem({ label: 'Età Media', value: demographics.averageAge.value + ' anni', detail: demographics.averageAge, icon: Baby })}
                    className="glass-panel p-6 rounded-2xl border border-pink-500/20 bg-pink-500/5 cursor-pointer group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-pink-500/10 text-pink-400"><Baby className="w-6 h-6" /></div>
                        <Info className="w-4 h-4 text-gray-600 group-hover:text-pink-400 transition-colors" />
                    </div>
                    <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Età Media</span>
                    <span className="text-2xl font-bold text-white">{demographics.averageAge.value} <span className="text-sm font-normal text-gray-400">anni</span></span>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedItem({ label: 'Reddito Medio', value: '€ ' + Number(demographics.incomeLevel.value).toLocaleString(), detail: demographics.incomeLevel, icon: Briefcase })}
                    className="glass-panel p-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 cursor-pointer group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400"><Briefcase className="w-6 h-6" /></div>
                        <Info className="w-4 h-4 text-gray-600 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Reddito Annuo</span>
                    <span className="text-2xl font-bold text-white">€ {Number(demographics.incomeLevel.value).toLocaleString()}</span>
                </motion.div>

                <motion.div
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedItem({ label: 'Istruzione', value: demographics.educationLevel.value, detail: demographics.educationLevel, icon: GraduationCap })}
                    className="glass-panel p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 cursor-pointer group"
                >
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400"><GraduationCap className="w-6 h-6" /></div>
                        <Info className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
                    </div>
                    <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Livello Istruzione</span>
                    <span className="text-2xl font-bold text-white truncate">{demographics.educationLevel.value}</span>
                </motion.div>
            </div>

            {/* 3. CHARTS SECTION */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Age Distribution Chart */}
                <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-white/5">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-purple-400" /> Distribuzione Età
                    </h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ageData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip cursor={{ fill: 'white', opacity: 0.1 }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px', borderRadius: '12px' }} />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {ageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Household Composition Chart */}
                <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-white/5">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Home className="w-5 h-5 text-pink-400" /> Composizione Nuclei
                    </h3>
                    <div className="h-[300px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={householdData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {householdData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px', borderRadius: '12px' }} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4 mt-4">
                        {householdData.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                                <span className="text-xs text-gray-400">{entry.name} ({entry.value}%)</span>
                            </div>
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
                            className="bg-[#0f172a] border border-white/10 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                                        {React.createElement(selectedItem.icon || Users, { className: "w-6 h-6" })}
                                    </div>
                                    <button onClick={() => setSelectedItem(null)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-2">{selectedItem.label}</h2>
                                <div className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">{selectedItem.value}</div>

                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mb-6">
                                    <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Analisi Demografica</h4>
                                    <p className="text-gray-300 leading-relaxed">
                                        {selectedItem.detail?.explanation || "Nessuna descrizione disponibile."}
                                    </p>
                                </div>

                                {selectedItem.detail?.trend && (
                                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex gap-3">
                                        <TrendingUp className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                        <div>
                                            <h5 className="text-blue-400 font-bold text-sm mb-1">Trend Storico</h5>
                                            <p className="text-blue-200/70 text-xs">Il dato mostra una tendenza stabile negli ultimi 3 anni.</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DemographicsSection;
