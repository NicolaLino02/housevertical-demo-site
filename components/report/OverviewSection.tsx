import React from 'react';
import { ReportData } from '../../types';
import {
    Building2, TrendingUp, Activity, ArrowUpRight, Wallet, ShieldCheck, Leaf, Hammer
} from 'lucide-react';

const OverviewSection = ({ data }: { data: ReportData }) => {
    const { overview, sections } = data;

    const SummaryWidget = ({ icon: Icon, label, value, color, sub, onClick }: any) => {
        const colors: any = {
            emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500/20', hover: 'hover:border-emerald-500/50' },
            red: { text: 'text-red-400', bg: 'bg-red-500', border: 'border-red-500/20', hover: 'hover:border-red-500/50' },
            teal: { text: 'text-teal-400', bg: 'bg-teal-500', border: 'border-teal-500/20', hover: 'hover:border-teal-500/50' },
            pink: { text: 'text-pink-400', bg: 'bg-pink-500', border: 'border-pink-500/20', hover: 'hover:border-pink-500/50' },
        };
        const c = colors[color] || colors.emerald;

        return (
            <div onClick={onClick} className={`glass-panel p-5 rounded-2xl border ${c.border} hover:bg-white/5 transition-all group cursor-pointer ${c.hover} relative overflow-hidden`}>
                <div className="absolute right-0 top-0 p-12 rounded-full opacity-5 bg-gradient-to-br from-white to-transparent blur-xl"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className={`p-2.5 rounded-xl bg-black/20 ${c.text}`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <div className="relative z-10">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1">{label}</span>
                    <span className="text-xl md:text-2xl font-bold text-white block tracking-tight truncate">{String(value)}</span>
                    <span className="text-[10px] text-gray-500 mt-2 block font-medium uppercase tracking-wide">{sub}</span>
                </div>
            </div>
        )
    }

    const yieldVal = sections.investment.details.find(d => d.label.includes('Yield'))?.value || "N/A";
    const renoVal = sections.renovation_potential.details.find(d => d.label.includes('Valore'))?.value || "N/A";

    return (
        <div className="max-w-7xl w-full animate-fade-in-up">
            <div className="mb-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Analisi Completata</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white">
                    Report <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Esecutivo</span>
                </h1>
                <p className="text-gray-400 max-w-xl">Sintesi strategica dell'analisi immobiliare generata da House Vertical AI.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                <div className="lg:col-span-8 glass-panel p-8 md:p-10 rounded-[2.5rem] border border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-slate-900/50 relative overflow-hidden group">
                    <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/15 transition-all duration-700"></div>

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400 border border-blue-500/10">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="block text-blue-300 font-bold uppercase tracking-widest text-xs">Stima di Mercato</span>
                                    <span className="text-gray-400 text-xs">Algoritmo Comparativo v2.4</span>
                                </div>
                            </div>
                            <div className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <TrendingUp className="w-3 h-3" />
                                Alta Confidenza
                            </div>
                        </div>

                        <div className="mb-6">
                            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-2">
                                € {overview.estimatedValue.toLocaleString()}
                            </h2>
                            <div className="flex items-center gap-2 text-gray-400 text-sm md:text-base">
                                <Activity className="w-4 h-4" />
                                <span>Range: <span className="text-white font-bold">€ {overview.valueRange[0].toLocaleString()} - € {overview.valueRange[1].toLocaleString()}</span></span>
                            </div>
                        </div>

                        <div className="mt-auto pt-6 border-t border-white/5 flex flex-col md:flex-row gap-8">
                            <div>
                                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest block mb-1">Prezzo al Mq</span>
                                <span className="text-xl font-bold text-white">€ {Math.round(overview.pricePerSqm).toLocaleString()}</span>
                            </div>
                            <div>
                                <span className="text-gray-500 text-xs font-bold uppercase tracking-widest block mb-1">Analisi AI</span>
                                <span className="text-sm font-medium text-gray-300 line-clamp-2 max-w-sm">
                                    {sections.valuation.summary}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4 glass-panel p-8 rounded-[2.5rem] border border-fuchsia-500/20 bg-gradient-to-b from-fuchsia-900/10 to-slate-900/50 flex flex-col items-center justify-center relative overflow-hidden text-center group hover:border-fuchsia-500/30 transition-all">
                    <div className="absolute inset-0 bg-fuchsia-500/5 blur-[40px] group-hover:bg-fuchsia-500/10 transition-all duration-700"></div>

                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                        <div className="w-40 h-40 relative flex items-center justify-center mb-6">
                            <div className="absolute inset-0 rounded-full border-8 border-white/5"></div>
                            <div
                                className="absolute inset-0 rounded-full border-8 border-fuchsia-500 border-t-transparent border-l-transparent"
                                style={{ transform: `rotate(${(sections.ai_verdict.score / 10) * 360}deg)`, transition: 'transform 1s ease-out' }}
                            ></div>
                            <div className="flex flex-col items-center">
                                <span className="text-6xl font-bold text-white tracking-tighter">{sections.ai_verdict.score}</span>
                                <span className="text-fuchsia-400 text-sm font-bold">/10</span>
                            </div>
                        </div>

                        <span className="text-fuchsia-400 text-sm font-bold uppercase tracking-widest bg-fuchsia-500/10 px-4 py-1.5 rounded-full border border-fuchsia-500/20 mb-4">
                            Vertical Score
                        </span>
                        <p className="text-gray-400 text-xs leading-relaxed max-w-[200px] mx-auto line-clamp-3">
                            {sections.ai_verdict.recommendation}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                <SummaryWidget
                    icon={Wallet}
                    label="Rendimento"
                    value={yieldVal}
                    color="emerald"
                    sub="Netto Annuo Stimato"
                />
                <SummaryWidget
                    icon={ShieldCheck}
                    label="Sicurezza"
                    value={`${sections.crime.score}/10`}
                    color="red"
                    sub="Indice Rischio Zona"
                />
                <SummaryWidget
                    icon={Leaf}
                    label="Ambiente"
                    value={`${sections.environment.score}/10`}
                    color="teal"
                    sub="Qualità Vivibilità"
                />
                <SummaryWidget
                    icon={Hammer}
                    label="Ristrutturazione"
                    value={renoVal}
                    color="pink"
                    sub="Potenziale Aggiunto"
                />
            </div>
        </div>
    )
}

export default OverviewSection;
