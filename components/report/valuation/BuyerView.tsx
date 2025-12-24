import React, { useState } from 'react';
import { SectionData } from '../../../types';
import { ShieldCheck, Target, AlertTriangle, MessageSquare, TrendingDown, Check, X, Copy, FileText, Download, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend } from 'recharts';

interface BuyerViewProps {
    data: any;
}

const BuyerView = ({ data }: BuyerViewProps) => {
    const [showLetter, setShowLetter] = useState(false);

    // Extract Data
    const buy = data.buyStrategy || { idealPrice: 280000, maxDiscount: 10, negotiationPoints: [] };
    const dealScore = 78; // Mock Score

    // Radar Data: Comparison between "This Property" and "Market Avg"
    const radarData = [
        { subject: 'Prezzo', A: 80, B: 60, fullMark: 150 }, // A = Questa Casa, B = Mercato
        { subject: 'Stato', A: 65, B: 70, fullMark: 150 },
        { subject: 'Location', A: 90, B: 85, fullMark: 150 },
        { subject: 'ROI', A: 85, B: 60, fullMark: 150 },
        { subject: 'Rischio', A: 95, B: 70, fullMark: 150 }, // Higher is better (less risk)
    ];

    const generateLetterText = () => {
        const date = new Date().toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' });
        const points = buy.negotiationPoints?.map((p: string) => `• ${p}`).join('\n') || "• Necessità di ammodernamento impianti\n• Andamento mercato di zona";

        return `Milano, ${date}

Oggetto: Proposta d'acquisto irrevocabile per l'immobile sito in Via Pacini 15

Egregi Signori,

Con la presente la sottoscritta parte promittente acquirente formalizza il proprio interesse all'acquisto dell'immobile in oggetto.
Sulla base di un'attenta analisi di mercato e dello stato attuale dell'immobile, siamo a formulare un'offerta di:

€ ${buy.idealPrice.toLocaleString()} (Diconsi Euro ${(buy.idealPrice / 1000).toFixed(0)} mila/00)

La presente valutazione tiene conto dei seguenti fattori tecnici ed economici emersi in fase di due diligence:
${points}

Tali elementi rendono necessaria una revisione del prezzo richiesto per allinearlo all'effettivo valore di mercato e per coprire i costi di adeguamento stimati.
La presente offerta è valida per 15 giorni dalla data odierna.

Restiamo in attesa di un vostro gentile riscontro.

Cordiali Saluti,
[Firma Acquirente]`;
    };

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full relative">

                {/* LEFT: DEAL ANALYSIS (RADAR) */}
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Score Card */}
                    <div className="md:col-span-2 bg-gradient-to-r from-emerald-900/40 to-emerald-900/10 border border-emerald-500/20 p-5 md:p-8 rounded-3xl flex items-center justify-between relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-2 h-full bg-emerald-500" />
                        <div>
                            <h3 className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-2 flex items-center gap-2">
                                <Target className="w-4 h-4" /> Deal Score
                            </h3>
                            <h2 className="text-5xl font-bold text-white tracking-tighter mb-1">{dealScore}/100</h2>
                            <p className="text-emerald-200/60 text-sm">Opportunità di investimento solida.</p>
                        </div>
                        <div className="hidden sm:block">
                            <div className="text-right">
                                <div className="text-xs text-gray-400 uppercase font-bold mb-1">Margine Trattativa</div>
                                <div className="text-3xl font-bold text-white flex items-center justify-end gap-1">
                                    <TrendingDown className="w-6 h-6 text-emerald-400" /> {buy.maxDiscount}%
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Radar Chart */}
                    <div className="md:col-span-1 bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col">
                        <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-gray-400" /> Analisi Qualitativa
                        </h4>
                        <div className="flex-1 min-h-[250px] -ml-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                                    <PolarGrid stroke="#334155" />
                                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 'bold' }} />
                                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                    <Radar name="Questa Proprietà" dataKey="A" stroke="#10b981" strokeWidth={3} fill="#10b981" fillOpacity={0.3} />
                                    <Radar name="Media Zona" dataKey="B" stroke="#64748b" strokeWidth={2} fill="#64748b" fillOpacity={0.1} />
                                    <Legend wrapperStyle={{ fontSize: '10px', paddingTop: '10px' }} />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Financial Details */}
                    <div className="md:col-span-1 bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-center space-y-6">
                        <div>
                            <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Prezzo Valutato</div>
                            <div className="text-2xl font-bold text-white">€ {buy.idealPrice.toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Max Offerta Consigliata</div>
                            <div className="text-2xl font-bold text-emerald-400">€ {(buy.idealPrice * 1.05).toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Rischio</div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-lg text-sm font-bold border border-yellow-500/20">
                                <AlertTriangle className="w-4 h-4" /> Medio
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: NEGOTIATION SCRIPT */}
                <div className="lg:col-span-4 bg-[#0f172a] border border-white/10 rounded-3xl p-0 flex flex-col h-full overflow-hidden">
                    <div className="p-4 md:p-6 border-b border-white/10 bg-white/5">
                        <h3 className="text-white font-bold text-lg flex items-center gap-2">
                            <MessageSquare className="w-5 h-5 text-blue-400" /> Script Negoziazione
                        </h3>
                        <p className="text-sm text-gray-400 mt-1">Usa questi argomenti in ordine di impatto.</p>
                    </div>

                    <div className="p-6 space-y-4 overflow-y-auto custom-scrollbar flex-1">
                        {buy.negotiationPoints && buy.negotiationPoints.length > 0 ? (
                            buy.negotiationPoints.map((point: string, idx: number) => (
                                <div key={idx} className="group cursor-pointer">
                                    <div className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-900/50 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400 text-xs font-bold mt-0.5 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                            {idx + 1}
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm leading-snug group-hover:text-emerald-300 transition-colors">{point}</p>
                                            <p className="text-gray-500 text-[10px] mt-1 opacity-0 group-hover:opacity-100 transition-opacity">Impatto stimato: Alto</p>
                                        </div>
                                    </div>
                                    {idx < buy.negotiationPoints.length - 1 && <div className="ml-3 w-px h-6 bg-white/10 my-1 group-hover:bg-emerald-500/30 transition-colors" />}
                                </div>
                            ))
                        ) : (
                            <div className="text-gray-500 text-sm italic">Nessun punto di negoziazione rilevato.</div>
                        )}
                    </div>

                    <div className="p-4 bg-white/5 border-t border-white/10">
                        <button
                            onClick={() => setShowLetter(true)}
                            className="w-full py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                        >
                            <PenTool className="w-4 h-4" /> Genera Lettera d'Offerta
                        </button>
                    </div>
                </div>
            </div>

            {/* OFFER LETTER MODAL */}
            <AnimatePresence>
                {showLetter && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowLetter(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-[#0f172a] w-full max-w-2xl rounded-xl border border-white/10 shadow-2xl overflow-hidden relative z-10 flex flex-col max-h-[80vh]"
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                                <h3 className="text-white font-bold flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-emerald-400" /> Bozza Offerta Generata
                                </h3>
                                <button onClick={() => setShowLetter(false)} className="text-gray-400 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Paper Content */}
                            <div className="flex-1 overflow-y-auto p-4 md:p-8 bg-white text-gray-900 font-serif leading-relaxed text-sm lg:text-base relative">
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-blue-500" />
                                <pre className="whitespace-pre-wrap font-serif">
                                    {generateLetterText()}
                                </pre>
                            </div>

                            {/* Footer Actions */}
                            <div className="p-4 border-t border-white/10 bg-white/5 flex gap-3">
                                <button
                                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex items-center justify-center gap-2"
                                    onClick={() => {
                                        navigator.clipboard.writeText(generateLetterText());
                                        alert("Testo copiato negli appunti!");
                                    }}
                                >
                                    <Copy className="w-4 h-4" /> Copia Testo
                                </button>
                                <button className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all flex items-center justify-center gap-2">
                                    <Download className="w-4 h-4" /> Scarica PDF
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default BuyerView;
