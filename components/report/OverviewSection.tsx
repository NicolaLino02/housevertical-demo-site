import React, { useState } from 'react';
import { ReportData } from '../../types';
import {
    Building2, TrendingUp, Activity, ArrowUpRight, Wallet, ShieldCheck, Leaf, Hammer,
    X, ChevronRight, MapPin, AlertTriangle, CheckCircle2, Info, Clock, BarChart3, TrendingDown,
    PiggyBank, Timer, Award, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OverviewSection = ({ data }: { data: ReportData }) => {
    const { overview, sections } = data;
    const [activeModal, setActiveModal] = useState<string | null>(null);

    // Helper to get color styles - Darker, more premium palette
    const getColors = (color: string) => {
        const colors: any = {
            emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', hover: 'hover:border-emerald-500/40', gradient: 'from-emerald-500/10 to-emerald-900/10', glow: 'shadow-emerald-500/10', bar: 'bg-emerald-500' },
            red: { text: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-500/20', hover: 'hover:border-red-500/40', gradient: 'from-red-500/10 to-red-900/10', glow: 'shadow-red-500/10', bar: 'bg-red-500' },
            teal: { text: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20', hover: 'hover:border-teal-500/40', gradient: 'from-teal-500/10 to-teal-900/10', glow: 'shadow-teal-500/10', bar: 'bg-teal-500' },
            pink: { text: 'text-pink-400', bg: 'bg-pink-500/10', border: 'border-pink-500/20', hover: 'hover:border-pink-500/40', gradient: 'from-pink-500/10 to-pink-900/10', glow: 'shadow-pink-500/10', bar: 'bg-pink-500' },
            blue: { text: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', hover: 'hover:border-blue-500/40', gradient: 'from-blue-500/10 to-blue-900/10', glow: 'shadow-blue-500/10', bar: 'bg-blue-500' },
            fuchsia: { text: 'text-fuchsia-400', bg: 'bg-fuchsia-500/10', border: 'border-fuchsia-500/20', hover: 'hover:border-fuchsia-500/40', gradient: 'from-fuchsia-500/10 to-fuchsia-900/10', glow: 'shadow-fuchsia-500/10', bar: 'bg-fuchsia-500' },
        };
        return colors[color] || colors.emerald;
    };

    const SummaryWidget = ({ icon: Icon, label, value, color, sub, onClick }: any) => {
        const c = getColors(color);
        return (
            <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClick}
                className={`glass-panel p-5 rounded-2xl border ${c.border} bg-[#0f111a]/80 backdrop-blur-md hover:bg-[#1a1d2d] transition-all group cursor-pointer relative overflow-hidden shadow-lg ${c.glow}`}
            >
                <div className={`absolute right-0 top-0 p-16 rounded-full opacity-5 bg-gradient-to-br ${c.gradient} blur-2xl`}></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                    <div className={`p-3 rounded-xl bg-black/40 ${c.text} border border-white/5`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <div className="relative z-10">
                    <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1">{label}</span>
                    <span className="text-xl md:text-2xl font-bold text-white block tracking-tight truncate">{value}</span>
                    <span className="text-[10px] text-gray-500 mt-2 block font-medium uppercase tracking-wide">{sub}</span>
                </div>
            </motion.div>
        )
    }

    const Modal = () => {
        if (!activeModal) return null;

        let content = null;
        let title = "";
        let color = "blue";

        switch (activeModal) {
            case 'valuation':
                title = "Analisi Valutazione";
                color = "blue";
                content = (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-[#131620] border border-white/5">
                                <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Prezzo Stimato</span>
                                <span className="text-3xl font-bold text-white">€ {overview.estimatedValue.toLocaleString()}</span>
                            </div>
                            <div className="p-5 rounded-2xl bg-[#131620] border border-white/5">
                                <span className="text-gray-500 text-xs uppercase tracking-wider block mb-1">Range di Mercato</span>
                                <span className="text-2xl font-bold text-white">€ {overview.valueRange[0].toLocaleString()} - {overview.valueRange[1].toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="p-5 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                            <h4 className="text-blue-400 font-bold mb-3 flex items-center gap-2 text-sm uppercase tracking-wide">
                                <Activity className="w-4 h-4" /> Analisi AI
                            </h4>
                            <p className="text-gray-300 text-sm leading-relaxed">{sections.valuation.summary}</p>
                        </div>
                        <div>
                            <h4 className="text-gray-400 font-bold mb-3 text-xs uppercase tracking-wider">Immobili Comparabili</h4>
                            <div className="space-y-3">
                                {sections.market_comps.marketData?.comparables.slice(0, 3).map((comp, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-[#131620] border border-white/5 hover:border-white/10 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-full bg-white/5">
                                                <MapPin className="w-4 h-4 text-gray-400" />
                                            </div>
                                            <div>
                                                <span className="text-gray-200 text-sm font-medium block truncate max-w-[180px]">{comp.address}</span>
                                                <span className="text-gray-500 text-xs">{comp.sqm} mq</span>
                                            </div>
                                        </div>
                                        <span className="text-white font-bold text-sm">€ {comp.price.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
                break;
            case 'verdict':
                title = "Verdetto Vertical AI";
                color = "fuchsia";
                content = (
                    <div className="space-y-8">
                        <div className="flex flex-col items-center justify-center py-4">
                            <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                                <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
                                <div className="absolute inset-0 rounded-full border-4 border-fuchsia-500 border-t-transparent border-l-transparent opacity-50 animate-spin-slow"></div>
                                <span className="text-5xl font-bold text-white">{sections.ai_verdict.score}</span>
                            </div>
                            <span className="text-fuchsia-400 text-xs font-bold uppercase tracking-widest bg-fuchsia-500/10 px-3 py-1 rounded-full">Vertical Score</span>
                        </div>

                        <div className="p-5 rounded-2xl bg-[#131620] border border-white/5 text-center">
                            <p className="text-gray-300 italic text-sm leading-relaxed">"{sections.ai_verdict.recommendation}"</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                <h4 className="text-emerald-400 font-bold mb-3 flex items-center gap-2 text-xs uppercase tracking-wider"><CheckCircle2 className="w-4 h-4" /> Punti di Forza</h4>
                                <ul className="space-y-2">
                                    {sections.ai_verdict.verdict?.pros.slice(0, 3).map((pro, i) => (
                                        <li key={i} className="text-gray-400 text-xs flex items-start gap-2">
                                            <span className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 shrink-0"></span>
                                            {pro}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="p-5 rounded-2xl bg-red-500/5 border border-red-500/10">
                                <h4 className="text-red-400 font-bold mb-3 flex items-center gap-2 text-xs uppercase tracking-wider"><AlertTriangle className="w-4 h-4" /> Rischi</h4>
                                <ul className="space-y-2">
                                    {sections.ai_verdict.verdict?.cons.slice(0, 3).map((con, i) => (
                                        <li key={i} className="text-gray-400 text-xs flex items-start gap-2">
                                            <span className="w-1 h-1 rounded-full bg-red-500 mt-1.5 shrink-0"></span>
                                            {con}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                );
                break;
            case 'yield':
                title = "Analisi Rendimento";
                color = "emerald";
                content = (
                    <div className="space-y-6">
                        {/* Top Row: Yields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider block mb-2">Rendimento Lordo</span>
                                <span className="text-4xl font-bold text-white">{sections.investment.financials?.grossYield.value}%</span>
                            </div>
                            <div className="p-5 rounded-2xl bg-[#131620] border border-white/5">
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-2">Rendimento Netto</span>
                                <span className="text-2xl font-bold text-white">{sections.investment.financials?.netYield.value}%</span>
                            </div>
                        </div>

                        {/* Middle: Investment & ROI */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-[#131620] border border-white/5">
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-2">Investimento Totale</span>
                                <span className="text-xl font-bold text-white">€ {sections.investment.financials?.totalInvestment.value}</span>
                            </div>
                            <div className="p-5 rounded-2xl bg-[#131620] border border-white/5">
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-2">ROI Stimato</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xl font-bold text-emerald-400">High</span>
                                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                                </div>
                            </div>
                        </div>

                        {/* Bottom: Cash Flow */}
                        <div className="p-5 rounded-2xl bg-[#131620] border border-white/5">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Cash Flow Mensile</span>
                                <span className="text-2xl font-bold text-white">€ {sections.investment.financials?.cashFlowMonthly.value}</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                            <p className="text-gray-500 text-xs mt-3 leading-relaxed">{sections.investment.financials?.grossYield.explanation}</p>
                        </div>
                    </div>
                );
                break;
            case 'renovation_potential':
                title = "Potenziale Ristrutturazione";
                color = "pink";
                content = (
                    <div className="space-y-6">
                        {/* Top: ROI */}
                        <div className="p-5 rounded-2xl bg-pink-500/5 border border-pink-500/10 flex justify-between items-center">
                            <div>
                                <span className="text-pink-400 text-xs font-bold uppercase tracking-wider block mb-1">ROI Ristrutturazione</span>
                                <span className="text-3xl font-bold text-white">{sections.renovation_potential.renovation?.roi.value}%</span>
                            </div>
                            <div className="p-3 bg-pink-500/20 rounded-full">
                                <Hammer className="w-6 h-6 text-pink-400" />
                            </div>
                        </div>

                        {/* Middle: Cost vs Value & Timeline */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl bg-[#131620] border border-white/5">
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-2">Valore Aggiunto</span>
                                <span className="text-xl font-bold text-white">€ {Number(sections.renovation_potential.renovation?.valueIncrease.value || 0).toLocaleString()}</span>
                            </div>
                            <div className="p-5 rounded-2xl bg-[#131620] border border-white/5">
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-2">Costo Stimato</span>
                                <span className="text-xl font-bold text-white">€ {Number(sections.renovation_potential.renovation?.totalCost.value || 0).toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="p-5 rounded-2xl bg-[#131620] border border-white/5 flex items-center gap-4">
                            <div className="p-2 bg-white/5 rounded-lg">
                                <Timer className="w-5 h-5 text-gray-400" />
                            </div>
                            <div>
                                <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block">Tempistiche</span>
                                <span className="text-white font-bold">{sections.renovation_potential.renovation?.timeline.value}</span>
                            </div>
                        </div>

                        {/* Bottom: Bonuses */}
                        {sections.renovation_potential.renovation?.bonuses && sections.renovation_potential.renovation.bonuses.length > 0 && (
                            <div className="p-5 rounded-2xl bg-[#131620] border border-white/5">
                                <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider flex items-center gap-2">
                                    <Award className="w-4 h-4 text-yellow-500" /> Bonus Disponibili
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {sections.renovation_potential.renovation.bonuses.map((bonus, i) => (
                                        <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                                            {bonus.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );
                break;
            case 'crime':
                title = "Sicurezza & Rischi";
                color = "red";
                content = (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-5 rounded-2xl bg-red-500/5 border border-red-500/10">
                            <div>
                                <span className="text-red-400 text-xs font-bold uppercase tracking-wider block mb-1">Indice di Sicurezza</span>
                                <span className="text-4xl font-bold text-white">{sections.crime.score}/10</span>
                            </div>
                            <div className="relative w-16 h-16">
                                <svg className="w-full h-full" viewBox="0 0 36 36">
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#333" strokeWidth="3" />
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray={`${sections.crime.score * 10}, 100`} />
                                </svg>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {sections.crime.details?.slice(0, 4).map((d, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-[#131620] border border-white/5">
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-300 text-sm">{d.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                            <div className={`h-full rounded-full ${d.value === 'Basso' ? 'bg-emerald-500 w-1/4' : d.value === 'Medio' ? 'bg-yellow-500 w-1/2' : 'bg-red-500 w-3/4'}`}></div>
                                        </div>
                                        <span className="text-white text-xs font-bold w-12 text-right">{d.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
                break;
            case 'environment':
                title = "Qualità Ambientale";
                color = "teal";
                content = (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between p-5 rounded-2xl bg-teal-500/5 border border-teal-500/10">
                            <div>
                                <span className="text-teal-400 text-xs font-bold uppercase tracking-wider block mb-1">Indice Vivibilità</span>
                                <span className="text-4xl font-bold text-white">{sections.environment.score}/10</span>
                            </div>
                            <Leaf className="w-12 h-12 text-teal-500/50" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {sections.environment.details?.slice(0, 4).map((d, i) => (
                                <div key={i} className="p-4 rounded-xl bg-[#131620] border border-white/5 flex flex-col gap-2">
                                    <span className="text-gray-400 text-xs uppercase tracking-wide">{d.label}</span>
                                    <div className="flex items-center justify-between">
                                        <span className="text-white font-bold text-sm">{d.value}</span>
                                        <Zap className="w-3 h-3 text-teal-500" />
                                    </div>
                                    <div className="w-full h-1 bg-gray-800 rounded-full mt-1">
                                        <div className="bg-teal-500 h-full rounded-full" style={{ width: '60%' }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
                break;
            default:
                // Generic fallback for other widgets
                const sectionKey = activeModal as keyof typeof sections;
                const section = sections[sectionKey];
                title = section?.title || "Dettaglio";
                content = (
                    <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-[#131620] border border-white/5">
                            <h4 className="text-white font-bold mb-3 text-sm uppercase tracking-wider">Sintesi</h4>
                            <p className="text-gray-300 text-sm leading-relaxed">{section?.summary || "Nessuna sintesi disponibile."}</p>
                        </div>
                        {section?.details && (
                            <div className="grid grid-cols-1 gap-2">
                                {section.details.slice(0, 4).map((d, i) => (
                                    <div key={i} className="flex justify-between p-4 rounded-xl bg-[#131620] border border-white/5">
                                        <span className="text-gray-400 text-sm">{d.label}</span>
                                        <span className="text-white font-medium">{d.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
        }

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                onClick={() => setActiveModal(null)}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className={`bg-[#0f111a] border border-white/5 w-full max-w-lg rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/5`}
                >
                    <div className={`p-6 border-b border-white/5 bg-gradient-to-r ${getColors(color).gradient} flex justify-between items-center`}>
                        <h3 className="text-lg font-bold text-white tracking-wide">{title}</h3>
                        <button onClick={() => setActiveModal(null)} className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors border border-white/5">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="p-6">
                        {content}
                    </div>
                    <div className="p-4 border-t border-white/5 bg-[#0a0c12] text-center">
                        <button onClick={() => setActiveModal(null)} className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors flex items-center justify-center gap-2 mx-auto">
                            Chiudi Scheda <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    // Robust data extraction with fallbacks
    const yieldVal = sections.investment.financials?.grossYield.value
        ? `${sections.investment.financials.grossYield.value}%`
        : (sections.investment.details?.find(d => d.label.includes('Yield'))?.value || "N/A");

    const renoVal = sections.renovation_potential.renovation?.valueIncrease.value
        ? `€ ${Number(sections.renovation_potential.renovation.valueIncrease.value).toLocaleString()}`
        : (sections.renovation_potential.details?.find(d => d.label.includes('Valore'))?.value || "N/A");

    // Market Data Extraction
    const marketData = sections.market_comps.marketData;

    return (
        <div className="max-w-7xl w-full animate-fade-in-up relative">
            <AnimatePresence>
                {activeModal && <Modal />}
            </AnimatePresence>

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
                <p className="text-gray-400 max-w-xl">Sintesi strategica interattiva. Clicca sulle schede per i dettagli.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                {/* MARKET INTELLIGENCE HUB (Main Card) */}
                <motion.div
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setActiveModal('valuation')}
                    className="lg:col-span-8 glass-panel p-8 md:p-10 rounded-[2.5rem] border border-blue-500/20 bg-[#0f111a]/80 backdrop-blur-xl relative overflow-hidden group cursor-pointer shadow-2xl shadow-blue-900/10"
                >
                    <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/15 transition-all duration-700"></div>

                    <div className="relative z-10 flex flex-col h-full justify-between">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div className="flex items-center gap-3">
                                <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400 border border-blue-500/20">
                                    <Building2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="block text-blue-300 font-bold uppercase tracking-widest text-xs">Market Intelligence</span>
                                    <span className="text-gray-400 text-xs">Algoritmo Comparativo v2.4</span>
                                </div>
                            </div>
                            <div className="px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <TrendingUp className="w-3 h-3" />
                                Alta Confidenza
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-2">
                                € {overview.estimatedValue.toLocaleString()}
                            </h2>
                            <div className="flex items-center gap-2 text-gray-400 text-sm md:text-base">
                                <Activity className="w-4 h-4" />
                                <span>Range: <span className="text-white font-bold">€ {overview.valueRange[0].toLocaleString()} - € {overview.valueRange[1].toLocaleString()}</span></span>
                            </div>
                        </div>

                        {/* KPI GRID */}
                        <div className="mt-auto pt-6 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Prezzo al Mq</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-white">€ {Math.round(overview.pricePerSqm).toLocaleString()}</span>
                                    {marketData?.priceGrowthForecast.value && Number(marketData.priceGrowthForecast.value) > 0 ? (
                                        <TrendingUp className="w-3 h-3 text-emerald-400" />
                                    ) : (
                                        <TrendingDown className="w-3 h-3 text-red-400" />
                                    )}
                                </div>
                            </div>
                            <div>
                                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Tempo Vendita</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-white">{marketData?.averageDaysOnMarket.value || "N/A"} gg</span>
                                    <Clock className="w-3 h-3 text-blue-400" />
                                </div>
                            </div>
                            <div>
                                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Domanda</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-lg font-bold text-white">{marketData?.demandIndex.value || "N/A"}/100</span>
                                    <BarChart3 className="w-3 h-3 text-fuchsia-400" />
                                </div>
                            </div>
                            <div>
                                <span className="text-gray-500 text-[10px] font-bold uppercase tracking-widest block mb-1">Previsione</span>
                                <div className="flex items-center gap-2">
                                    <span className={`text-lg font-bold ${Number(marketData?.priceGrowthForecast.value) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {Number(marketData?.priceGrowthForecast.value) > 0 ? '+' : ''}{marketData?.priceGrowthForecast.value || 0}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* VERDICT CARD */}
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveModal('verdict')}
                    className="lg:col-span-4 glass-panel p-8 rounded-[2.5rem] border border-fuchsia-500/20 bg-[#0f111a]/80 backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden text-center group hover:border-fuchsia-500/30 transition-all cursor-pointer shadow-2xl shadow-fuchsia-900/10"
                >
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
                        <p className="text-gray-400 text-xs leading-relaxed max-w-[200px] mx-auto line-clamp-3 group-hover:text-gray-200 transition-colors">
                            {sections.ai_verdict.recommendation}
                        </p>
                    </div>
                </motion.div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                <SummaryWidget
                    icon={Wallet}
                    label="Rendimento"
                    value={yieldVal}
                    color="emerald"
                    sub="Netto Annuo Stimato"
                    onClick={() => setActiveModal('yield')}
                />
                <SummaryWidget
                    icon={ShieldCheck}
                    label="Sicurezza"
                    value={`${sections.crime.score}/10`}
                    color="red"
                    sub="Indice Rischio Zona"
                    onClick={() => setActiveModal('crime')}
                />
                <SummaryWidget
                    icon={Leaf}
                    label="Ambiente"
                    value={`${sections.environment.score}/10`}
                    color="teal"
                    sub="Qualità Vivibilità"
                    onClick={() => setActiveModal('environment')}
                />
                <SummaryWidget
                    icon={Hammer}
                    label="Ristrutturazione"
                    value={renoVal}
                    color="pink"
                    sub="Potenziale Aggiunto"
                    onClick={() => setActiveModal('renovation_potential')}
                />
            </div>
        </div>
    )
}

export default OverviewSection;
