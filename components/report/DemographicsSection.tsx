import React, { useState } from 'react';
import { SectionData } from '../../types';
import Modal from '../shared/Modal';
import { Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';

const DemographicsSection = ({ section }: { section: SectionData }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const getPct = (key: string) => { const d = section.details.find(d => d.label.includes(key)); if (!d) return 0; return Number(String(d.value).replace(/[^0-9.]/g, '')) || 0; };
    const data = [{ age: '65+', pct: getPct('65+') }, { age: '51-65', pct: getPct('51-65') }, { age: '36-50', pct: getPct('36-50') }, { age: '19-35', pct: getPct('19-35') }, { age: '0-18', pct: getPct('0-18') },];
    return (
        <div className="max-w-6xl w-full">
            <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">Profilo <span className="text-purple-400">Sociologico</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto">{section.summary}</p>
            </div>
            <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.label} icon={Users} color="text-purple-400">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4"><span className="text-3xl font-bold text-white block">{String(selectedItem?.value)}</span></div>
                <p className="text-gray-300 text-sm">{selectedItem?.explanation || "Dato chiave per determinare il target di inquilino ideale."}</p>
            </Modal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="glass-panel p-8 rounded-3xl border border-purple-500/20">
                    <h3 className="text-lg font-bold text-white mb-6">Piramide Età Residenti</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart layout="vertical" data={data} margin={{ left: 10, right: 10 }}><CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" /><XAxis type="number" stroke="#94a3b8" /><YAxis dataKey="age" type="category" stroke="#fff" width={50} /><Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} cursor={{ fill: 'rgba(168,85,247,0.1)' }} /><Bar dataKey="pct" fill="#c084fc" radius={[0, 4, 4, 0]} barSize={30} /></BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="space-y-4">
                    {section.details.filter(d => !d.label.includes('Age')).map((d, i) => (
                        <motion.div key={i} whileHover={{ x: 5, backgroundColor: 'rgba(192, 132, 252, 0.1)' }} onClick={() => setSelectedItem(d)} className="glass-panel p-5 rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer group transition-all">
                            <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><Users className="w-5 h-5" /></div><span className="font-bold text-white">{d.label}</span></div>
                            <span className="text-xl font-bold text-purple-300">{String(d.value)}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DemographicsSection;
