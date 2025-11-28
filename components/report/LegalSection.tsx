import React, { useState } from 'react';
import { SectionData } from '../../types';
import Modal from '../shared/Modal';
import { Gavel, CheckCircle, AlertTriangle, FileText, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, RadialBarChart, RadialBar } from 'recharts';

const LegalSection = ({ section }: { section: SectionData }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const getStatus = (val: string) => {
        const v = val.toLowerCase();
        if (v.includes('ok') || v.includes('regolare') || v.includes('assente') || v.includes('basso') || v.includes('a') || v.includes('b')) return 'success';
        if (v.includes('attenzione') || v.includes('verifica') || v.includes('presenza') || v.includes('alto')) return 'warning';
        return 'neutral';
    };

    return (
        <div className="max-w-6xl w-full">
            <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">Due Diligence <span className="text-gray-400">Legale</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-sm">Quadro sintetico della conformità urbanistica, catastale e ipotecaria.</p>
            </div>

            <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.label} icon={Gavel} color="text-gray-400">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4">
                    <span className="text-xl font-bold text-white block">{String(selectedItem?.value)}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedItem?.explanation || "Verifica preliminare. Si consiglia sempre il supporto di un notaio per la conferma definitiva."}</p>
            </Modal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center">
                    <h3 className="text-lg font-bold text-white mb-6">Indice Rischio</h3>
                    <div className="w-full h-[200px] relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart innerRadius="80%" outerRadius="100%" data={[{ value: section.score * 10, fill: section.score > 7 ? '#22c55e' : '#ef4444' }]} startAngle={180} endAngle={0}><RadialBar background dataKey="value" cornerRadius={30} /></RadialBarChart>
                        </ResponsiveContainer>
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
                            <span className={`text-5xl font-bold ${section.score > 7 ? 'text-green-500' : 'text-red-500'}`}>{section.score}/10</span>
                            <span className="block text-gray-500 text-xs font-bold uppercase mt-2">Legal Score</span>
                        </div>
                    </div>
                </div>

                {/* Checklist Grid - 6 Items */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                    {section.details.slice(0, 6).map((d, i) => {
                        const status = getStatus(String(d.value));
                        return (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                onClick={() => setSelectedItem(d)}
                                className={`p-5 rounded-2xl border cursor-pointer flex flex-col gap-2 relative overflow-hidden ${status === 'success' ? 'bg-green-900/10 border-green-500/20' :
                                        status === 'warning' ? 'bg-yellow-900/10 border-yellow-500/20' :
                                            'bg-white/5 border-white/10'
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className={`p-2 rounded-lg ${status === 'success' ? 'bg-green-500/20 text-green-400' :
                                            status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-gray-700 text-gray-400'
                                        }`}>
                                        {status === 'success' ? <CheckCircle className="w-5 h-5" /> :
                                            status === 'warning' ? <AlertTriangle className="w-5 h-5" /> :
                                                <FileText className="w-5 h-5" />}
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <span className="text-gray-400 text-xs font-bold uppercase truncate block w-full">{d.label}</span>
                                    <h4 className="text-white font-bold leading-tight mt-1 truncate">{String(d.value)}</h4>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default LegalSection;
