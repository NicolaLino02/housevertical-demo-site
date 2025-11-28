import React, { useState } from 'react';
import { SectionData } from '../../types';
import Modal from '../shared/Modal';
import { GraduationCap, ShoppingCart, Utensils, TreePine, Dumbbell, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const AmenitiesSection = ({ section }: { section: SectionData }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const getIcon = (label: string) => {
        const l = label.toLowerCase();
        if (l.includes('scuol') || l.includes('univ')) return GraduationCap;
        if (l.includes('super') || l.includes('comm')) return ShoppingCart;
        if (l.includes('rist') || l.includes('bar')) return Utensils;
        if (l.includes('park') || l.includes('verde')) return TreePine;
        if (l.includes('palest') || l.includes('sport')) return Dumbbell;
        return Coffee;
    };
    return (
        <div className="max-w-6xl w-full">
            <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">Servizi <span className="text-orange-400">di Zona</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto">{section.summary}</p>
            </div>
            <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.label} icon={selectedItem ? getIcon(selectedItem.label) : Coffee} color="text-orange-400">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4"><span className="text-3xl font-bold text-white block">{String(selectedItem?.value)}</span><span className="text-xs text-gray-400 uppercase">Quantità in zona</span></div>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedItem?.explanation || "Conteggio basato sui punti di interesse registrati entro 10-15 minuti a piedi dall'immobile."}</p>
            </Modal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 flex flex-col items-center">
                    <div className="relative w-64 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: 'Score', value: section.score * 10, fill: '#fb923c' }]} startAngle={180} endAngle={0}><RadialBar background dataKey="value" cornerRadius={30} /></RadialBarChart>
                        </ResponsiveContainer>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 text-center"><span className="text-5xl font-bold text-white">{section.score}</span><span className="block text-gray-500 text-sm uppercase font-bold">Score Servizi</span></div>
                    </div>
                </div>
                <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {section.details.map((d, i) => {
                        const Icon = getIcon(d.label); return (
                            <motion.div key={i} whileHover={{ scale: 1.05 }} onClick={() => setSelectedItem(d)} className="glass-panel p-4 rounded-2xl border border-orange-500/10 flex flex-col items-center text-center cursor-pointer group hover:bg-orange-500/10 transition-colors">
                                <Icon className="w-8 h-8 text-orange-400 mb-3 group-hover:scale-110 transition-transform" /><span className="text-gray-300 text-sm font-bold mb-1">{d.label}</span><span className="text-2xl font-bold text-white">{String(d.value)}</span>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default AmenitiesSection;
