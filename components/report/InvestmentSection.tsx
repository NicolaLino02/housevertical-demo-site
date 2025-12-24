import React, { useState } from 'react';
import { SectionData } from '../../types';
import {
    Wallet, TrendingUp, DollarSign, Building, PieChart, Info, ArrowRight,
    Bed, Key, Calendar, AlertTriangle, CheckCircle, Shield, FileText,
    Briefcase, Landmark, Percent, CreditCard, ChevronRight
} from 'lucide-react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart as RechartsPie, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';
import { AnimatePresence, motion } from 'framer-motion';

interface InvestmentSectionProps {
    section: SectionData;
}

const InvestmentSection: React.FC<InvestmentSectionProps> = ({ section }) => {
    const [strategy, setStrategy] = useState<'long' | 'short'>('long');
    const [loanAmount, setLoanAmount] = useState(0); // For simple interactive "What if" logic
    const [showBusinessPlan, setShowBusinessPlan] = useState(false);

    // --- DATA NORMALIZATION HELPER ---
    const parseMetric = (val: any): number => {
        if (typeof val === 'number') return val;
        if (typeof val === 'string') return parseFloat(val.replace(/[^0-9.-]+/g, "")) || 0;
        if (val && typeof val === 'object' && val.value) return parseMetric(val.value);
        return 0;
    };

    const financials = section.financials || {};
    const netYield = parseMetric(financials.netYield || 4.5);
    const grossYield = parseMetric(financials.grossYield || 6.1);
    const cashFlow = parseMetric(financials.cashFlowMonthly || 850);
    const capRate = parseMetric(financials.capRate || 5.2);

    const sectionExpenses = section.expenses || {};
    const condoFees = parseMetric(sectionExpenses.condoFees || 1200);
    const tax = parseMetric(sectionExpenses.tax || 1000);
    const maintenance = parseMetric(sectionExpenses.maintenance || 500);
    const management = parseMetric(sectionExpenses.management || 800);
    const utilities = parseMetric(sectionExpenses.utilities || 0);

    const expensesData = [
        { name: 'Tasse', value: tax },
        { name: 'Condominio', value: condoFees },
        { name: 'Manutenzione', value: maintenance },
        { name: 'Gestione', value: management },
    ];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    // Normalized Data specific to strategies
    const longTerm = {
        name: "Long Rent (4+4)",
        yield: netYield,
        cashflow: cashFlow,
        occupancy: 98,
        risk: "Basso",
        management: "Passiva",
        data: section.longTermData || { advantages: ['Rendita Costante', 'Gestione Semplice', 'Basso Turnover'], risks: ['Rischio Morosità', 'Vincolo Lungo'] }
    };

    const shortTerm = {
        name: "Short Rent (Airbnb)",
        yield: netYield * 1.5,
        cashflow: cashFlow * 1.6,
        occupancy: 75,
        risk: "Medio-Alto",
        management: "Attiva",
        data: section.shortTermData || { seasonality: { winter: { occupancy: 40 }, summer: { occupancy: 90 } }, risks: ['Volatilità', 'Usura Immobile', 'Regolamentazione'] }
    };

    // Current Active Data
    const activeData = strategy === 'long' ? longTerm : shortTerm;

    // Chart Data Generators
    const seasonalityData = [
        { name: 'Gen', occ: 45, revenue: shortTerm.cashflow * 0.7 },
        { name: 'Feb', occ: 55, revenue: shortTerm.cashflow * 0.8 },
        { name: 'Mar', occ: 65, revenue: shortTerm.cashflow * 0.9 },
        { name: 'Apr', occ: 75, revenue: shortTerm.cashflow * 1.1 },
        { name: 'Mag', occ: 80, revenue: shortTerm.cashflow * 1.2 },
        { name: 'Giu', occ: 90, revenue: shortTerm.cashflow * 1.5 },
        { name: 'Lug', occ: 95, revenue: shortTerm.cashflow * 1.8 },
        { name: 'Ago', occ: 95, revenue: shortTerm.cashflow * 1.8 },
        { name: 'Set', occ: 85, revenue: shortTerm.cashflow * 1.3 },
        { name: 'Ott', occ: 70, revenue: shortTerm.cashflow * 1.0 },
        { name: 'Nov', occ: 50, revenue: shortTerm.cashflow * 0.7 },
        { name: 'Dic', occ: 60, revenue: shortTerm.cashflow * 0.9 }
    ];

    const radarData = [
        { subject: 'Rendimento', A: netYield * 10, B: 60, fullMark: 100 },
        { subject: 'Stabilità', A: 90, B: 50, fullMark: 100 },
        { subject: 'Liquidità', A: 70, B: 80, fullMark: 100 },
        { subject: 'Gestione', A: 95, B: 30, fullMark: 100 },
        { subject: 'Rischio', A: 85, B: 40, fullMark: 100 },
    ];


    return (
        <div className="w-full max-w-[1400px] mx-auto p-4 lg:p-8 space-y-12 min-h-screen relative">

            {/* 1. HERO HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/5 pb-8">
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                            <Briefcase className="w-6 h-6 text-emerald-400" />
                        </div>
                        <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase">Financial Studio</span>
                    </div>
                    <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
                        Analisi <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">Investimento</span>
                    </h2>
                    <p className="text-gray-400 max-w-xl text-lg">
                        Confronta rendimenti, flussi di cassa e rischi operativi tra le diverse strategie di messa a reddito.
                    </p>
                </div>

                {/* STRATEGY SWITCHER */}
                <div className="bg-[#0f172a] p-1.5 rounded-2xl border border-white/10 flex shadow-2xl relative z-10">
                    <button
                        onClick={() => setStrategy('long')}
                        className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${strategy === 'long'
                            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/50'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Key className="w-4 h-4" /> Long Rent
                    </button>
                    <button
                        onClick={() => setStrategy('short')}
                        className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${strategy === 'short'
                            ? 'bg-fuchsia-600 text-white shadow-lg shadow-fuchsia-900/50'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Bed className="w-4 h-4" /> Short Rent
                    </button>
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={strategy}
                    initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-8"
                >
                    {/* --- LEFT COLUMN: METRICS & CALCULATOR (4 cols) --- */}
                    <div className="lg:col-span-4 space-y-6">
                        {/* MAIN YIELD CARD */}
                        <div className={`p-5 md:p-8 rounded-[2rem] md:rounded-[2.5rem] bg-gradient-to-br ${strategy === 'long' ? 'from-emerald-900/50 to-teal-900/30 border-emerald-500/30' : 'from-fuchsia-900/50 to-purple-900/30 border-fuchsia-500/30'} border relative overflow-hidden group shadow-2xl`}>
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/10">
                                        <Wallet className="w-8 h-8 text-white" />
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold border ${strategy === 'long' ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-300' : 'bg-fuchsia-500/20 border-fuchsia-500/30 text-fuchsia-300'}`}>
                                        {strategy === 'long' ? '+ Stabile' : '+ Profittevole'}
                                    </div>
                                </div>
                                <div className="space-y-1 mb-8">
                                    <h3 className="text-gray-400 font-medium text-sm uppercase tracking-widest">Net Yield Stimato</h3>
                                    <div className="text-5xl md:text-6xl font-bold text-white tracking-tighter">
                                        {activeData.yield.toFixed(1)}<span className="text-3xl text-gray-400">%</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
                                        <div className="text-gray-400 text-[10px] uppercase font-bold mb-1">Cashflow Mensile</div>
                                        <div className="text-xl font-bold text-white">€ {Math.round(activeData.cashflow).toLocaleString()}</div>
                                    </div>
                                    <div className="bg-black/30 p-4 rounded-2xl border border-white/5">
                                        <div className="text-gray-400 text-[10px] uppercase font-bold mb-1">Occupancy Rate</div>
                                        <div className="text-xl font-bold text-white">{activeData.occupancy}%</div>
                                    </div>
                                </div>
                            </div>
                            {/* Background decoration */}
                            <div className={`absolute -top-20 -right-20 w-64 h-64 rounded-full blur-[100px] opacity-40 ${strategy === 'long' ? 'bg-emerald-500' : 'bg-fuchsia-500'}`}></div>
                        </div>

                        {/* KPIS SMALL */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors">
                                <div className="flex justify-between mb-4">
                                    <Building className="w-5 h-5 text-blue-400" />
                                    <span className="text-xs font-bold text-gray-500">CAP Rate</span>
                                </div>
                                <div className="text-2xl font-bold text-white">{capRate.toFixed(1)}%</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-colors">
                                <div className="flex justify-between mb-4">
                                    <DollarSign className="w-5 h-5 text-yellow-400" />
                                    <span className="text-xs font-bold text-gray-500">Gross</span>
                                </div>
                                <div className="text-2xl font-bold text-white">{grossYield.toFixed(1)}%</div>
                            </div>
                        </div>

                        {/* MORTGAGE SLIDER (Visual Only) */}
                        <div className="bg-[#1e293b] rounded-3xl p-6 border border-white/10">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-white font-bold flex items-center gap-2"><CreditCard className="w-4 h-4" /> Leva Finanziaria</h4>
                                <span className="text-xs px-2 py-1 bg-white/10 rounded text-gray-400">Beta</span>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-xs mb-2 text-gray-400 font-bold uppercase">
                                        <span>LTV (Loan to Value)</span>
                                        <span className="text-white">{loanAmount}%</span>
                                    </div>
                                    <input
                                        type="range" min="0" max="80" step="10" value={loanAmount} onChange={e => setLoanAmount(Number(e.target.value))}
                                        className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                    />
                                    <div className="flex justify-between text-[10px] text-gray-600 mt-1 font-mono">
                                        <span>CASH</span>
                                        <span>MUTUO MAX</span>
                                    </div>
                                </div>
                                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                    <span className="text-xs text-gray-400">ROE Stimato</span>
                                    <span className="text-xl font-bold text-green-400">
                                        {(activeData.yield * (1 + (loanAmount / 100))).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- CENTER: CHARTS & ANALYSIS (5 cols) --- */}
                    <div className="lg:col-span-5 space-y-6">
                        {/* CHART VISUALIZATION - DISTINCT PER STRATEGY */}
                        {strategy === 'long' ? (
                            // LONG TERM: RADAR (Security Focus)
                            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 min-h-[400px] flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-20"><Shield className="w-24 h-24 text-emerald-500" /></div>
                                <h3 className="text-xl font-bold text-white mb-2 relative z-10">Asset Stability Analysis</h3>
                                <p className="text-gray-400 text-xs mb-6 relative z-10">Confronto parametri chiave vs Media Mercato</p>
                                <div className="flex-1 w-full h-full flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <RadarChart outerRadius={90} data={radarData}>
                                            <PolarGrid stroke="#333" />
                                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                                            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                            <Radar name="Questa Strategia" dataKey="A" stroke="#10b981" strokeWidth={2} fill="#10b981" fillOpacity={0.6} />
                                            <Radar name="Media Mercato" dataKey="B" stroke="#64748b" strokeWidth={1} fill="#64748b" fillOpacity={0.1} />
                                            <Legend wrapperStyle={{ fontSize: '12px', marginTop: '10px' }} />
                                        </RadarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        ) : (
                            // SHORT TERM: REVENUE BARS (Cashflow Focus)
                            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 min-h-[400px] flex flex-col relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-20"><TrendingUp className="w-24 h-24 text-fuchsia-500" /></div>
                                <h3 className="text-xl font-bold text-white mb-2 relative z-10">Revenue Seasonality</h3>
                                <p className="text-gray-400 text-xs mb-6 relative z-10">Proiezione entrate mensili lorde stimate</p>
                                <div className="flex-1 w-full h-full flex items-center justify-center">
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart data={seasonalityData}>
                                            <defs>
                                                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                            <XAxis dataKey="name" stroke="#666" fontSize={10} axisLine={false} tickLine={false} />
                                            <YAxis hide />
                                            <Tooltip
                                                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#333', borderRadius: '12px' }}
                                                formatter={(value: number) => [`€ ${Math.round(value)}`, 'Revenue']}
                                            />
                                            <Area type="monotone" dataKey="revenue" stroke="#d946ef" strokeWidth={3} fill="url(#colorRev)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        )}

                        {/* BREAKDOWN PIE */}
                        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col md:flex-row items-center gap-6">
                            <div className="w-32 h-32 relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RechartsPie data={expensesData} innerRadius={35} outerRadius={50} paddingAngle={2} dataKey="value">
                                        {expensesData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="rgba(255,255,255,0.1)" />
                                        ))}
                                    </RechartsPie>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <PieChart className="w-5 h-5 text-gray-500" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-2">
                                <h4 className="text-white font-bold text-sm mb-3">Breakdown Spese</h4>
                                {expensesData.map((d, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                                            <span className="text-gray-400">{d.name}</span>
                                        </div>
                                        <span className="text-white font-mono">€{d.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: INFO & LISTS (3 cols) --- */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-[#1e293b] border border-white/10 rounded-[2rem] p-8 h-full flex flex-col justify-between">
                            <div>
                                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                    <Info className="w-5 h-5 text-blue-400" /> Dettagli
                                </h3>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Pro & Vantaggi</h4>
                                        <ul className="space-y-3">
                                            {(activeData.data.advantages || ['Alta Redditività', 'Flessibilità Utilizzo', 'Pagamenti Anticipati']).map((item: any, i: number) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                                    <span className="leading-snug">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Rischi & Attenzione</h4>
                                        <ul className="space-y-3">
                                            {(activeData.data.risks || []).map((item: any, i: number) => (
                                                <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                                                    <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                                                    <span className="leading-snug">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-white/10 mt-8">
                                <button
                                    onClick={() => setShowBusinessPlan(true)}
                                    className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold flex items-center justify-center gap-2 transition-all group hover:border-emerald-500/50"
                                >
                                    Scarica Business Plan <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* BUSINESS PLAN MODAL */}
            <AnimatePresence>
                {showBusinessPlan && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 pt-24"
                        onClick={() => setShowBusinessPlan(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="bg-[#0f172a] border border-white/10 rounded-3xl p-6 max-w-sm md:max-w-lg w-full shadow-2xl relative"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setShowBusinessPlan(false)}
                                className="absolute top-4 right-4 p-2 bg-white/5 hover:bg-white/10 rounded-full text-gray-400 hover:text-white transition-colors"
                            >
                                <ChevronRight className="w-5 h-5 rotate-90 lg:rotate-0" />
                            </button>

                            <div className="text-center mb-6 pt-2">
                                <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-500/30">
                                    <FileText className="w-6 h-6 text-emerald-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-1">Business Plan</h3>
                                <p className="text-gray-400 text-xs px-4">Proiezioni finanziarie a 5 anni per strategia {strategy === 'long' ? 'Long Rent' : 'Short Rent'}.</p>
                            </div>

                            <div className="space-y-2 mb-6">
                                {['Cashflow Analysis (5 Anni)', 'Analisi Sensibilità Tassi', 'Piano Ammortamento', 'Analisi Competitor'].map((doc, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                                        <span className="text-gray-300 text-xs flex-1">{doc}</span>
                                        <span className="text-[10px] text-gray-500 font-mono">PDF</span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3">
                                <button className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-sm transition-colors flex items-center justify-center gap-2">
                                    Download PDF (2.4 MB)
                                </button>
                                <button onClick={() => setShowBusinessPlan(false)} className="w-full py-2 text-gray-500 text-xs hover:text-white transition-colors">
                                    Chiudi
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InvestmentSection;
