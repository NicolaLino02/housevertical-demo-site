import React from 'react';
import { SectionData, ReportData } from '../../types';
import { BrainCircuit, Check, AlertTriangle, Gavel, X } from 'lucide-react';

const VerdictSection = ({ section, data }: { section: SectionData, data: ReportData }) => {
    const isPositive = section.score >= 6;
    return (
        <div className="max-w-7xl w-full flex flex-col items-center">
            <div className="text-center mb-12">
                <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 mb-6"><BrainCircuit className="w-4 h-4" /><span className="text-xs font-bold uppercase tracking-widest">Analisi Conclusiva</span></div>
                <h2 className="text-5xl lg:text-7xl font-bold mb-4 text-white">Verdetto <span className="text-fuchsia-500">AI</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto">Sintesi finale basata su {data.overview.confidence * 100}% di confidenza dati.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-start">
                <div className="glass-panel p-8 rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-green-900/10 to-transparent relative overflow-hidden group hover:border-green-500/40 transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[50px]"></div>
                    <h3 className="flex items-center gap-3 text-2xl font-bold text-green-400 mb-8 relative z-10"><div className="p-2 bg-green-500/20 rounded-lg"><Check className="w-6 h-6" /></div>Punti di Forza</h3>
                    <ul className="space-y-6 relative z-10">{section.details.filter((_, i) => i % 2 === 0).map((d, i) => (
                        <li key={i} className="flex items-start gap-4 group/item"><div className="w-2 h-2 rounded-full bg-green-500 mt-2.5 shadow-[0_0_10px_rgba(34,197,94,0.5)] group-hover/item:scale-150 transition-transform"></div><div><span className="block font-bold text-white text-lg mb-1">{d.label}</span><span className="text-gray-400 text-sm">{String(d.value)}</span></div></li>
                    ))}</ul>
                </div>
                <div className="flex flex-col items-center justify-center text-center relative order-first lg:order-none mb-8 lg:mb-0">
                    <div className="absolute inset-0 bg-fuchsia-600/20 blur-[100px] rounded-full pointer-events-none"></div>
                    <div className="relative z-10 glass-panel p-10 rounded-full border border-white/10 w-[300px] h-[300px] flex flex-col items-center justify-center shadow-2xl bg-[#0f172a]/80 backdrop-blur-xl group hover:scale-105 transition-transform duration-500">
                        <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-t-fuchsia-500 border-r-fuchsia-500 border-b-transparent border-l-transparent animate-spin-slow opacity-50"></div>
                        <span className="text-8xl font-bold text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">{section.score}</span><span className="text-fuchsia-400 uppercase tracking-[0.2em] text-sm mt-2 font-bold">Vertical Score</span>
                    </div>
                    <div className="mt-10 space-y-6 relative z-10 w-full max-w-md">
                        <div className={`py-4 px-8 rounded-2xl font-bold text-2xl border flex items-center justify-center gap-3 shadow-lg ${isPositive ? 'bg-green-600 border-green-500 text-white shadow-green-900/50' : 'bg-red-600 border-red-500 text-white shadow-red-900/50'}`}>
                            {isPositive ? <Gavel className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                            {isPositive ? 'OPPORTUNITÀ' : 'RISCHIO ALTO'}
                        </div>
                        <div className="glass-panel p-6 rounded-2xl border border-white/10"><p className="text-gray-300 text-base leading-relaxed font-medium">"{section.recommendation}"</p></div>
                    </div>
                </div>
                <div className="glass-panel p-8 rounded-[2rem] border border-red-500/20 bg-gradient-to-bl from-red-900/10 to-transparent relative overflow-hidden group hover:border-red-500/40 transition-all">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-red-500/10 rounded-full blur-[50px]"></div>
                    <h3 className="flex items-center gap-3 text-2xl font-bold text-red-400 mb-8 relative z-10"><div className="p-2 bg-red-500/20 rounded-lg"><X className="w-6 h-6" /></div>Attenzione A</h3>
                    <ul className="space-y-6 relative z-10">{section.details.filter((_, i) => i % 2 !== 0).map((d, i) => (
                        <li key={i} className="flex items-start gap-4 group/item"><div className="w-2 h-2 rounded-full bg-red-500 mt-2.5 shadow-[0_0_10px_rgba(239,68,68,0.5)] group-hover/item:scale-150 transition-transform"></div><div><span className="block font-bold text-white text-lg mb-1">{d.label}</span><span className="text-gray-400 text-sm">{String(d.value)}</span></div></li>
                    ))}</ul>
                </div>
            </div>
        </div>
    );
};

export default VerdictSection;
