import React, { useState } from 'react';
import { SectionData } from '../../types';
import Modal from '../shared/Modal';
import { Plane, Train, Car, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const ConnectivitySection = ({ section }: { section: SectionData }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const findDetail = (key: string) => section.details.find(d => d.label.toLowerCase().includes(key));
    const transports = [
        { id: 'plane', icon: Plane, label: 'Aeroporto', detail: findDetail('aero'), color: 'text-cyan-400' },
        { id: 'train', icon: Train, label: 'Stazione', detail: findDetail('staz'), color: 'text-cyan-400' },
        { id: 'car', icon: Car, label: 'Autostrada', detail: findDetail('auto'), color: 'text-cyan-400' },
    ];
    return (
        <div className="max-w-6xl w-full">
            <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">Hub <span className="text-cyan-400">Trasporti</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Accessibilità e tempi di percorrenza dai principali snodi.</p>
            </div>
            <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.label} icon={Navigation} color="text-cyan-400">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4"><span className="text-4xl font-bold text-white block">{selectedItem?.value}</span></div>
                <p className="text-gray-300 text-sm">{selectedItem?.explanation || "Dato non disponibile."}</p>
            </Modal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-5 relative py-4 pl-4">
                    <div className="absolute left-4 top-0 bottom-0 w-1 bg-cyan-900/50 rounded-full"></div>
                    <div className="space-y-12">
                        {section.details.map((d, i) => (
                            <div key={i} className="relative pl-10 group cursor-pointer" onClick={() => setSelectedItem(d)}>
                                <div className="absolute left-[11px] top-1.5 w-4 h-4 rounded-full bg-[#0f172a] border-4 border-cyan-500 group-hover:scale-125 transition-transform"></div>
                                <h4 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{d.label}</h4>
                                <span className="text-cyan-500 font-mono text-sm">{String(d.value)}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-7 space-y-8">
                    <div className="glass-panel p-8 rounded-3xl border border-cyan-500/20 flex items-center justify-between">
                        <div><h3 className="text-xl font-bold text-white mb-1">Mobility Score</h3><p className="text-gray-400 text-sm">Indice di accessibilità generale</p></div>
                        <div className="relative w-24 h-24">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value: section.score * 10, fill: '#06b6d4' }]} startAngle={90} endAngle={-270}><RadialBar background dataKey="value" cornerRadius={10} /></RadialBarChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-white">{section.score}</div>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {transports.map((t) => (
                            <motion.div key={t.id} whileHover={{ y: -5 }} onClick={() => t.detail && setSelectedItem(t.detail)} className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center cursor-pointer">
                                <t.icon className={`w-8 h-8 ${t.color} mb-3`} /><span className="text-xs text-gray-400 font-bold uppercase">{t.label}</span><span className="text-white font-bold">{t.detail?.value || 'N/A'}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConnectivitySection;
