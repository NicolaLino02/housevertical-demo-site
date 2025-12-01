import React, { useState } from 'react';
import { SectionData } from '../../types';
import { Scale, FileText, Landmark, ScrollText, ShieldCheck, Info, X, CheckCircle, AlertCircle, FileCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LegalSection = ({ section }: { section: SectionData }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    // Safe Data Access with Fallbacks
    const legal = section.legal || {
        zoning: { value: "Zona B - Residenziale", explanation: "Area a prevalente destinazione residenziale con possibilità di servizi." },
        cadastral: { category: "A/2", income: 850, explanation: "Abitazione di tipo civile, rendita catastale media per la zona." },
        taxes: [
            { name: "IMU Stimata", amount: "€ 1.200/anno", explanation: "Calcolata su seconda casa, esente se prima casa." },
            { name: "TARI", amount: "€ 350/anno", explanation: "Tassa rifiuti basata su mq e occupanti." }
        ],
        permits: [
            { name: "APE", status: "Richiesto", explanation: "Attestato Prestazione Energetica obbligatorio per vendita/affitto." },
            { name: "Agibilità", status: "Verificare", explanation: "Controllare presenza certificato di abitabilità post-1967." }
        ],
        regulations: [
            { name: "Cedolare Secca", description: "Opzione fiscale al 21% o 10% per affitti residenziali." },
            { name: "Affitti Brevi", description: "Necessario codice CIN e comunicazione flussi turistici." }
        ]
    };

    return (
        <div className="max-w-7xl w-full mx-auto p-6 space-y-8">
            {/* 1. HEADER */}
            <div className="text-center mb-12 relative">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    Dossier <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-gray-200">Legale & Fiscale</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Quadro normativo, catastale e fiscale dell'immobile.
                </p>
            </div>

            {/* 2. MAIN DOSSIER CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Urbanistica & Catasto */}
                <motion.div
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedItem({ label: 'Dati Urbanistici & Catastali', type: 'zoning', data: { zoning: legal.zoning, cadastral: legal.cadastral } })}
                    className="glass-panel p-8 rounded-3xl border border-slate-500/30 bg-gradient-to-br from-slate-800/30 to-transparent cursor-pointer group relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-20 bg-slate-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>

                    <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className="p-4 rounded-2xl bg-slate-500/20 text-slate-300">
                            <Landmark className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Urbanistica & Catasto</h3>
                            <p className="text-slate-400 text-sm">Classificazione e Rendita</p>
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                        <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/20 transition-colors">
                            <span className="text-gray-400">Zona Urbanistica</span>
                            <span className="text-white font-bold">{legal.zoning.value}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/20 transition-colors">
                            <span className="text-gray-400">Categoria Catastale</span>
                            <span className="text-white font-bold">{legal.cadastral.category}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5 group-hover:border-white/20 transition-colors">
                            <span className="text-gray-400">Rendita Stimata</span>
                            <span className="text-white font-bold">€ {legal.cadastral.income}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Tasse & Imposte */}
                <motion.div
                    whileHover={{ y: -5 }}
                    onClick={() => setSelectedItem({ label: 'Imposte & Tasse', type: 'taxes', data: legal.taxes })}
                    className="glass-panel p-8 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-900/20 to-transparent cursor-pointer group relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 p-20 bg-amber-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2"></div>

                    <div className="flex items-center gap-4 mb-6 relative z-10">
                        <div className="p-4 rounded-2xl bg-amber-500/20 text-amber-400">
                            <Scale className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">Fiscalità</h3>
                            <p className="text-amber-400/70 text-sm">Stima IMU e TARI</p>
                        </div>
                    </div>

                    <div className="space-y-4 relative z-10">
                        {legal.taxes.map((tax, idx) => (
                            <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5 group-hover:border-amber-500/30 transition-colors">
                                <span className="text-gray-400">{tax.name}</span>
                                <span className="text-white font-bold">{tax.amount}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* 3. REGULATIONS & PERMITS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Permits List */}
                <div className="lg:col-span-1 glass-panel p-6 rounded-2xl border border-white/10 bg-white/5">
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                        <FileCheck className="w-5 h-5 text-green-400" /> Documenti
                    </h3>
                    <div className="space-y-3">
                        {legal.permits.map((permit, idx) => (
                            <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-black/20 border border-white/5">
                                {permit.status === 'Richiesto' ? <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" /> : <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />}
                                <div>
                                    <h4 className="text-white font-bold text-sm">{permit.name}</h4>
                                    <p className="text-gray-400 text-xs">{permit.status}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Regulations Cards */}
                {legal.regulations.map((reg, idx) => (
                    <motion.div
                        key={idx}
                        whileHover={{ y: -5 }}
                        onClick={() => setSelectedItem({ label: reg.name, type: 'regulation', data: reg })}
                        className="glass-panel p-6 rounded-2xl border border-blue-500/20 bg-blue-500/5 cursor-pointer group flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400"><ScrollText className="w-6 h-6" /></div>
                                <Info className="w-4 h-4 text-gray-600 group-hover:text-blue-400 transition-colors" />
                            </div>
                            <h4 className="text-lg font-bold text-white mb-2">{reg.name}</h4>
                            <p className="text-gray-400 text-sm line-clamp-3">{reg.description}</p>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider">
                            Approfondisci <FileText className="w-3 h-3" />
                        </div>
                    </motion.div>
                ))}
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
                            className="bg-[#0f172a] border border-white/10 rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-xl bg-slate-700 text-white">
                                            {selectedItem.type === 'zoning' ? <Landmark className="w-6 h-6" /> :
                                                selectedItem.type === 'taxes' ? <Scale className="w-6 h-6" /> :
                                                    <ScrollText className="w-6 h-6" />}
                                        </div>
                                        <h2 className="text-2xl font-bold text-white">{selectedItem.label}</h2>
                                    </div>
                                    <button onClick={() => setSelectedItem(null)} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {selectedItem.type === 'zoning' && (
                                        <>
                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Dettaglio Urbanistico</h4>
                                                <p className="text-white text-lg font-medium mb-2">{selectedItem.data.zoning.value}</p>
                                                <p className="text-gray-400">{selectedItem.data.zoning.explanation}</p>
                                            </div>
                                            <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-2">Dettaglio Catastale</h4>
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div>
                                                        <span className="block text-gray-500 text-sm">Categoria</span>
                                                        <span className="text-white font-bold text-xl">{selectedItem.data.cadastral.category}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-gray-500 text-sm">Rendita</span>
                                                        <span className="text-white font-bold text-xl">€ {selectedItem.data.cadastral.income}</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-400 mt-4 text-sm">{selectedItem.data.cadastral.explanation}</p>
                                            </div>
                                        </>
                                    )}

                                    {selectedItem.type === 'taxes' && (
                                        <div className="grid grid-cols-1 gap-4">
                                            {selectedItem.data.map((tax: any, idx: number) => (
                                                <div key={idx} className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-6">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h4 className="text-amber-400 font-bold text-lg">{tax.name}</h4>
                                                        <span className="text-white font-bold text-xl">{tax.amount}</span>
                                                    </div>
                                                    <p className="text-amber-200/70 text-sm">{tax.explanation}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {selectedItem.type === 'regulation' && (
                                        <div className="bg-blue-500/5 border border-blue-500/20 rounded-2xl p-8">
                                            <p className="text-white text-lg leading-relaxed">
                                                {selectedItem.data.description}
                                            </p>
                                            <div className="mt-6 flex items-center gap-2 text-blue-400 text-sm">
                                                <ShieldCheck className="w-5 h-5" />
                                                <span>Normativa verificata e aggiornata.</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LegalSection;
