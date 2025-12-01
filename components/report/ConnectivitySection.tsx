import React, { useState } from 'react';
import { SectionData } from '../../types';
import { Bus, Train, Plane, Car, MapPin, Clock, Navigation, Info, X, ArrowRight, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const ConnectivitySection = ({ section }: { section: SectionData }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Safe Data Access with Fallbacks
    const connectivity = section.connectivity || {
        mobilityScore: { value: 85, explanation: "Ottima copertura mezzi pubblici e vicinanza arterie principali." },
        transitLines: [
            { type: 'bus', name: 'Linea 30', distance: '100m', frequency: 'Ogni 10 min', destinations: ['Centro', 'Stazione'] },
            { type: 'metro', name: 'Metro A', distance: '500m', frequency: 'Ogni 3 min', destinations: ['Duomo', 'Fiera'] },
            { type: 'tram', name: 'Tram 14', distance: '200m', frequency: 'Ogni 15 min', destinations: ['Università'] }
        ],
        airports: [
            { name: 'Aeroporto Int.', distance: '15km', time: '25 min' }
        ],
        highways: [
            { name: 'A1 Autostrada', distance: '3km' }
        ],
        commuteTimes: [
            { destination: 'Centro Città', time: '15 min', mode: 'Metro' },
            { destination: 'Stazione Centrale', time: '20 min', mode: 'Bus' },
            { destination: 'Business District', time: '30 min', mode: 'Auto' }
        ]
    };

    const commuteData = connectivity.commuteTimes.map((item, index) => ({
        name: item.destination,
        value: parseInt(item.time),
        mode: item.mode,
        color: ['#3b82f6', '#8b5cf6', '#10b981'][index % 3]
    }));

    const getIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'bus': return Bus;
            case 'train': case 'metro': case 'tram': return Train;
            case 'plane': case 'airport': return Plane;
            case 'car': case 'highway': return Car;
            default: return Navigation;
        }
    };

    return (
        <div className="max-w-7xl w-full mx-auto p-6 space-y-8">
            {/* 1. HEADER */}
            <div className="text-center mb-12 relative">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    Hub <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Trasporti</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Analisi della connettività: mezzi pubblici, accessibilità stradale e tempi di percorrenza.
                </p>
            </div>

            {/* 2. MOBILITY SCORE DASHBOARD */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Score Card */}
                <div className="lg:col-span-4 glass-panel p-8 rounded-3xl border border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-transparent flex flex-col items-center justify-center text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/5 blur-xl"></div>
                    <div className="relative z-10">
                        <div className="w-24 h-24 rounded-full bg-blue-500/20 flex items-center justify-center mb-4 mx-auto border border-blue-500/30">
                            <Navigation className="w-10 h-10 text-blue-400" />
                        </div>
                        <h3 className="text-gray-400 uppercase tracking-widest text-sm font-bold mb-2">Mobility Score</h3>
                        <div className="text-6xl font-bold text-white mb-2">{connectivity.mobilityScore.value}/100</div>
                        <p className="text-blue-200/70 text-sm">{connectivity.mobilityScore.explanation}</p>
                    </div>
                </div>

                {/* Commute Times Chart */}
                <div className="lg:col-span-8 glass-panel p-8 rounded-3xl border border-white/10 bg-white/5">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-cyan-400" /> Tempi di Percorrenza
                    </h3>
                    <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={commuteData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={120} tick={{ fill: '#fff', fontSize: 12, fontWeight: 500 }} axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: 'white', opacity: 0.1 }} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff', fontSize: '12px', borderRadius: '12px' }} />
                                <Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={24}>
                                    {commuteData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 3. TRANSIT LINES GRID */}
            <div>
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <Zap className="w-6 h-6 text-yellow-400" /> Linee e Collegamenti
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {connectivity.transitLines.map((line, idx) => {
                        const Icon = getIcon(line.type);
                        return (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                onClick={() => setSelectedItem({ ...line, label: line.name, type: 'transit' })}
                                className="glass-panel p-6 rounded-2xl border border-white/5 bg-white/5 cursor-pointer group hover:bg-white/10 transition-all relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-16 bg-gradient-to-br from-blue-500/10 to-transparent blur-2xl rounded-full translate-x-1/2 -translate-y-1/2"></div>

                                <div className="flex justify-between items-start mb-4 relative z-10">
                                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded-lg text-white">{line.distance}</span>
                                </div>

                                <h4 className="text-xl font-bold text-white mb-1 relative z-10">{line.name}</h4>
                                <p className="text-sm text-gray-400 mb-4 relative z-10">{line.frequency}</p>

                                <div className="flex flex-wrap gap-2 relative z-10">
                                    {line.destinations.map((dest, i) => (
                                        <span key={i} className="text-xs text-blue-300 bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">
                                            {dest}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Airport & Highway Cards */}
                    {connectivity.airports.map((airport, idx) => (
                        <motion.div
                            key={`air-${idx}`}
                            whileHover={{ y: -5 }}
                            onClick={() => setSelectedItem({ ...airport, label: airport.name, type: 'airport' })}
                            className="glass-panel p-6 rounded-2xl border border-cyan-500/20 bg-cyan-500/5 cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-400"><Plane className="w-6 h-6" /></div>
                                <span className="text-xs font-bold bg-cyan-500/10 px-2 py-1 rounded-lg text-cyan-300">{airport.time}</span>
                            </div>
                            <h4 className="text-xl font-bold text-white mb-1">{airport.name}</h4>
                            <p className="text-sm text-gray-400">Distanza: {airport.distance}</p>
                        </motion.div>
                    ))}
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
                                    <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                                        {selectedItem.type === 'transit' ? <Train className="w-6 h-6" /> : <Plane className="w-6 h-6" />}
                                    </div>
                                    <button onClick={() => setSelectedItem(null)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <h2 className="text-2xl font-bold text-white mb-2">{selectedItem.label}</h2>
                                <div className="text-3xl font-bold text-blue-400 mb-6">{selectedItem.distance}</div>

                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5 mb-6">
                                    <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-3">Dettagli Connessione</h4>
                                    <div className="space-y-3">
                                        {selectedItem.frequency && (
                                            <div className="flex justify-between border-b border-white/5 pb-2">
                                                <span className="text-gray-400">Frequenza</span>
                                                <span className="text-white font-medium">{selectedItem.frequency}</span>
                                            </div>
                                        )}
                                        {selectedItem.time && (
                                            <div className="flex justify-between border-b border-white/5 pb-2">
                                                <span className="text-gray-400">Tempo Stimato</span>
                                                <span className="text-white font-medium">{selectedItem.time}</span>
                                            </div>
                                        )}
                                        {selectedItem.destinations && (
                                            <div>
                                                <span className="text-gray-400 block mb-2">Destinazioni Principali</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {selectedItem.destinations.map((d: string, i: number) => (
                                                        <span key={i} className="text-xs text-white bg-white/10 px-2 py-1 rounded">{d}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
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

export default ConnectivitySection;
