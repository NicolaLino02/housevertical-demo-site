import React, { useState } from 'react';
import { SectionData, RichMetric } from '../../types';
import { Wallet, TrendingUp, DollarSign, Building, PieChart, Info, X, ArrowRight, Bed, Key, Calendar, AlertTriangle, CheckCircle, Shield, FileText, Lightbulb } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart as RechartsPie, Pie, BarChart, Bar } from 'recharts';
import { AnimatePresence, motion } from 'framer-motion';

interface InvestmentSectionProps {
    section: SectionData;
}

const InvestmentSection: React.FC<InvestmentSectionProps> = ({ section }) => {
    const [selectedScenario, setSelectedScenario] = useState<'longTerm' | 'shortTerm' | null>(null);
    const [showInfoModal, setShowInfoModal] = useState<{ label: string; metric: RichMetric } | null>(null);

    // Helper to handle both legacy (number) and new (object) data formats
    const getSafeMetric = (metric: any): RichMetric => {
        if (typeof metric === 'number') return { value: metric, explanation: 'Calcolato su base annua.' };
        if (metric && typeof metric === 'object') return {
            value: metric.value || 0,
            explanation: metric.explanation || 'Calcolato su base annua.',
            breakdown: metric.breakdown,
            recommendation: metric.recommendation
        };
        return { value: 0, explanation: 'Dato non disponibile' };
    };

    const financials = section.financials || {
        grossYield: 0, netYield: 0, cashFlowMonthly: 0, capRate: 0, totalInvestment: 0
    };

    const expenses = section.expenses || {
        condoFees: 0, tax: 0, maintenance: 0, management: 0, utilities: 0
    };

    const scenarios = section.scenarios || {
        longTerm: { rentMonthly: 0, occupancyRate: 0, cashFlowYearly: 0 },
        shortTerm: { adr: 0, occupancyRate: 0, cashFlowYearly: 0 }
    };

    // Fallback data if new fields are missing (compatibility)
    const longTermData = section.longTermData || {
        advantages: ["Rendita costante e prevedibile", "Minore impegno gestionale", "Utenze a carico dell'inquilino"],
        risks: ["Rischio morosità inquilino", "Vincolo contrattuale lungo (4+4)", "Difficoltà rientro in possesso"],
        contractType: "4+4 Standard",
        tenantRisk: "medium"
    };

    const shortTermData = section.shortTermData || {
        seasonality: section.seasonality || {
            winter: { occupancy: 40, rate: 80 },
            spring: { occupancy: 60, rate: 100 },
            summer: { occupancy: 90, rate: 150 },
            autumn: { occupancy: 50, rate: 90 }
        },
        risks: section.risks?.list || ["Fluttuazione stagionale", "Gestione operativa complessa", "Usura immobile accelerata"]
    };

    const totalInv = getSafeMetric(financials.totalInvestment).value || 1;

    // Calculate Metrics for BOTH scenarios
    const calculateMetrics = (type: 'longTerm' | 'shortTerm') => {
        const yearlyIncome = type === 'longTerm'
            ? scenarios.longTerm.rentMonthly * 12
            : scenarios.shortTerm.adr * 365 * scenarios.shortTerm.occupancyRate;

        const yearlyExpenses = Object.values(expenses).reduce((a, b) => (a as number) + (b as number), 0);
        const adjustedExpenses = type === 'longTerm' ? yearlyExpenses - (expenses.utilities as number) : yearlyExpenses;

        const grossYieldVal = Number(((yearlyIncome / (totalInv as number)) * 100).toFixed(1));
        const netYieldVal = Number((((yearlyIncome - adjustedExpenses) / (totalInv as number)) * 100).toFixed(1));
        const cashFlowVal = Number(((yearlyIncome - adjustedExpenses) / 12).toFixed(0));

        return {
            grossYield: grossYieldVal,
            netYield: netYieldVal,
            cashFlow: cashFlowVal,
            yearlyIncome,
            yearlyExpenses: adjustedExpenses,
            profit: yearlyIncome - adjustedExpenses
        };
    };

    const longTermMetrics = calculateMetrics('longTerm');
    const shortTermMetrics = calculateMetrics('shortTerm');

    const activeMetrics = selectedScenario ? (selectedScenario === 'longTerm' ? longTermMetrics : shortTermMetrics) : null;

    // Seasonality Data for Chart (Short Term)
    const seasonalityData = [
        { name: 'Inverno', occupancy: shortTermData.seasonality.winter.occupancy, rate: shortTermData.seasonality.winter.rate },
        { name: 'Primavera', occupancy: shortTermData.seasonality.spring.occupancy, rate: shortTermData.seasonality.spring.rate },
        { name: 'Estate', occupancy: shortTermData.seasonality.summer.occupancy, rate: shortTermData.seasonality.summer.rate },
        { name: 'Autunno', occupancy: shortTermData.seasonality.autumn.occupancy, rate: shortTermData.seasonality.autumn.rate },
    ];

    // Dynamic Title Logic
    const getTitle = () => {
        if (selectedScenario === 'longTerm') return { main: 'Investimento', highlight: 'Long Rent' };
        if (selectedScenario === 'shortTerm') return { main: 'Investimento', highlight: 'Short Rent' };
        return { main: 'Strategia', highlight: 'Investimento' };
    };

    const title = getTitle();

    return (
        <div className="w-full max-w-7xl mx-auto p-6 space-y-8">
            {/* Centered Header (Matching AmenitiesSection style) */}
            <div className="text-center mb-12 relative">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    {title.main} <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-fuchsia-500">{title.highlight}</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    {selectedScenario
                        ? "Analisi dettagliata dei rendimenti e dei rischi per questa strategia."
                        : "Confronta le due strategie principali per massimizzare il tuo ROI."}
                </p>

                {selectedScenario && (
                    <motion.button
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        onClick={() => setSelectedScenario(null)}
                        className="absolute top-0 right-0 md:top-4 md:right-4 text-sm text-gray-400 hover:text-white flex items-center gap-2 bg-white/5 px-4 py-2 rounded-lg transition-all hover:bg-white/10"
                    >
                        <ArrowRight className="w-4 h-4 rotate-180" /> Torna al confronto
                    </motion.button>
                )}
            </div>

            <AnimatePresence mode="wait">
                {!selectedScenario ? (
                    /* MAIN SELECTION VIEW */
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {/* Long Term Card */}
                        <StrategyCard
                            title="Affitto Lungo Termine"
                            subtitle="Stabilità e rendita passiva (4+4)"
                            yieldVal={longTermMetrics.netYield}
                            cashFlow={longTermMetrics.cashFlow}
                            color="emerald"
                            gradient="from-emerald-900/40 to-teal-900/40"
                            border="border-emerald-500/30"
                            icon={Key}
                            onClick={() => setSelectedScenario('longTerm')}
                        />

                        {/* Short Term Card */}
                        <StrategyCard
                            title="Short Rent (Airbnb)"
                            subtitle="Massimizzazione del profitto"
                            yieldVal={shortTermMetrics.netYield}
                            cashFlow={shortTermMetrics.cashFlow}
                            color="fuchsia"
                            gradient="from-fuchsia-900/40 to-purple-900/40"
                            border="border-fuchsia-500/30"
                            icon={Bed}
                            onClick={() => setSelectedScenario('shortTerm')}
                        />
                    </motion.div>
                ) : (
                    /* DETAILED DASHBOARD VIEW */
                    <motion.div
                        key={selectedScenario}
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                        className="space-y-8"
                    >
                        {/* KPI Grid (Common for both but styled differently) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <KpiCard
                                label="Net Yield"
                                value={`${activeMetrics?.netYield}%`}
                                subtext="Rendimento Netto Annuo"
                                icon={PieChart}
                                color={selectedScenario === 'longTerm' ? 'text-emerald-400' : 'text-fuchsia-400'}
                                bg={selectedScenario === 'longTerm' ? 'bg-emerald-500/10' : 'bg-fuchsia-500/10'}
                                onClick={() => setShowInfoModal({
                                    label: "Net Yield",
                                    metric: { ...getSafeMetric(financials.netYield), value: activeMetrics?.netYield || 0 }
                                })}
                            />
                            <KpiCard
                                label="Cash Flow"
                                value={`€ ${Number(activeMetrics?.cashFlow).toLocaleString()}`}
                                subtext="Mensile Netto"
                                icon={DollarSign}
                                color="text-green-400"
                                bg="bg-green-500/10"
                                onClick={() => setShowInfoModal({
                                    label: "Cash Flow",
                                    metric: { ...getSafeMetric(financials.cashFlowMonthly), value: activeMetrics?.cashFlow || 0 }
                                })}
                            />
                            <KpiCard
                                label="Gross Yield"
                                value={`${activeMetrics?.grossYield}%`}
                                subtext="Rendimento Lordo"
                                icon={TrendingUp}
                                color="text-blue-400"
                                bg="bg-blue-500/10"
                                onClick={() => setShowInfoModal({
                                    label: "Gross Yield",
                                    metric: { ...getSafeMetric(financials.grossYield), value: activeMetrics?.grossYield || 0 }
                                })}
                            />
                            <KpiCard
                                label="Investimento Totale"
                                value={`€ ${Number(totalInv).toLocaleString()}`}
                                subtext="Prezzo + Spese"
                                icon={Building}
                                color="text-purple-400"
                                bg="bg-purple-500/10"
                                onClick={() => setShowInfoModal({ label: "Investimento Totale", metric: getSafeMetric(financials.totalInvestment) })}
                            />
                        </div>

                        {/* DISTINCT VIEWS START HERE */}
                        {selectedScenario === 'shortTerm' ? (
                            /* SHORT TERM VIEW */
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Seasonality Chart */}
                                <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-fuchsia-400" />
                                        Analisi Stagionalità & Occupazione
                                    </h3>
                                    <div className="h-64 w-full">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart data={seasonalityData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                                <defs>
                                                    <linearGradient id="colorOccupancy" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#d946ef" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#d946ef" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <XAxis dataKey="name" stroke="#666" fontSize={12} />
                                                <YAxis stroke="#666" fontSize={12} />
                                                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                                                <Tooltip
                                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
                                                    formatter={(value: number, name: string) => [name === 'occupancy' ? `${value}%` : `€${value}`, name === 'occupancy' ? 'Occupazione' : 'Tariffa Media']}
                                                />
                                                <Area type="monotone" dataKey="occupancy" stroke="#d946ef" fillOpacity={1} fill="url(#colorOccupancy)" name="Occupazione" />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>

                                {/* Short Term Risks */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                                        Rischi Specifici
                                    </h3>
                                    <ul className="space-y-4">
                                        {shortTermData.risks.map((risk, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-fuchsia-500 flex-shrink-0" />
                                                {risk}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Cost Breakdown (Full Width) */}
                                <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                        <Wallet className="w-4 h-4 text-emerald-400" />
                                        Dettaglio Costi Operativi (Annuali)
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <CostItem label="IMU & Tasse" value={expenses.tax} total={activeMetrics?.yearlyExpenses || 1} color="bg-blue-500" />
                                        <CostItem label="Spese Condominiali" value={expenses.condoFees} total={activeMetrics?.yearlyExpenses || 1} color="bg-purple-500" />
                                        <CostItem label="Manutenzione" value={expenses.maintenance} total={activeMetrics?.yearlyExpenses || 1} color="bg-orange-500" />
                                        <CostItem label="Gestione & Agenzia" value={expenses.management} total={activeMetrics?.yearlyExpenses || 1} color="bg-pink-500" />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* LONG TERM VIEW (Totally Different) */
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Contract & Stability Info */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-emerald-400" />
                                        Contratto & Stabilità
                                    </h3>
                                    <div className="space-y-6">
                                        <div>
                                            <span className="text-gray-400 text-xs uppercase tracking-wider">Tipologia Contratto</span>
                                            <div className="text-2xl font-bold text-white mt-1">{longTermData.contractType}</div>
                                        </div>
                                        <div>
                                            <span className="text-gray-400 text-xs uppercase tracking-wider">Rischio Inquilino</span>
                                            <div className={`text-xl font-bold mt-1 flex items-center gap-2 ${longTermData.tenantRisk === 'low' ? 'text-green-400' : longTermData.tenantRisk === 'medium' ? 'text-yellow-400' : 'text-red-400'}`}>
                                                <Shield className="w-5 h-5" />
                                                {longTermData.tenantRisk === 'low' ? 'Basso' : longTermData.tenantRisk === 'medium' ? 'Medio' : 'Alto'}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Advantages List */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                                        Vantaggi Strategia
                                    </h3>
                                    <ul className="space-y-3">
                                        {longTermData.advantages.map((adv, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                                <CheckCircle className="w-4 h-4 text-emerald-500/50 flex-shrink-0 mt-0.5" />
                                                {adv}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Risks List */}
                                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                        <AlertTriangle className="w-4 h-4 text-red-400" />
                                        Rischi Potenziali
                                    </h3>
                                    <ul className="space-y-3">
                                        {longTermData.risks.map((risk, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-300">
                                                <div className="mt-1 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                                                {risk}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Cost Breakdown (Full Width) */}
                                <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                                    <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                                        <Wallet className="w-4 h-4 text-emerald-400" />
                                        Dettaglio Costi Operativi (Annuali)
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        <CostItem label="IMU & Tasse" value={expenses.tax} total={activeMetrics?.yearlyExpenses || 1} color="bg-blue-500" />
                                        <CostItem label="Spese Condominiali" value={expenses.condoFees} total={activeMetrics?.yearlyExpenses || 1} color="bg-purple-500" />
                                        <CostItem label="Manutenzione" value={expenses.maintenance} total={activeMetrics?.yearlyExpenses || 1} color="bg-orange-500" />
                                        <CostItem label="Gestione & Agenzia" value={expenses.management} total={activeMetrics?.yearlyExpenses || 1} color="bg-pink-500" />
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* RICH INFO MODAL */}
            <AnimatePresence>
                {showInfoModal && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                        onClick={() => setShowInfoModal(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="bg-slate-900 border border-white/10 rounded-3xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white">{showInfoModal.label}</h3>
                                    <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500 mt-2">
                                        {typeof showInfoModal.metric.value === 'number' ? showInfoModal.metric.value.toLocaleString() : showInfoModal.metric.value}
                                        {showInfoModal.label.includes('Yield') || showInfoModal.label.includes('Rate') ? '%' : ''}
                                        {showInfoModal.label.includes('Cash') || showInfoModal.label.includes('Investimento') ? ' €' : ''}
                                    </div>
                                </div>
                                <button onClick={() => setShowInfoModal(null)} className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-8">
                                {/* Explanation */}
                                <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <Info className="w-4 h-4" /> Analisi
                                    </h4>
                                    <p className="text-gray-300 leading-relaxed text-lg">
                                        {showInfoModal.metric.explanation}
                                    </p>
                                </div>

                                {/* Breakdown (if available) */}
                                {showInfoModal.metric.breakdown && showInfoModal.metric.breakdown.length > 0 && (
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                                            <PieChart className="w-4 h-4" /> Composizione
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {showInfoModal.metric.breakdown.map((item, idx) => (
                                                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5 flex justify-between items-center">
                                                    <span className="text-gray-300">{item.label}</span>
                                                    <span className="font-bold text-white">
                                                        {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Recommendation (if available) */}
                                {showInfoModal.metric.recommendation && (
                                    <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6">
                                        <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                            <Lightbulb className="w-4 h-4" /> Il Consiglio dell'AI
                                        </h4>
                                        <p className="text-indigo-200 italic">
                                            "{showInfoModal.metric.recommendation}"
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const StrategyCard = ({ title, subtitle, yieldVal, cashFlow, color, gradient, border, icon: Icon, onClick }: any) => (
    <motion.div
        whileHover={{ scale: 1.02, y: -5 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`relative overflow-hidden rounded-3xl p-8 cursor-pointer group border ${border} bg-gradient-to-br ${gradient}`}
    >
        <div className={`absolute top-0 right-0 p-32 rounded-full blur-[80px] transition-all opacity-30 group-hover:opacity-50 bg-${color}-500`}></div>

        <div className="relative z-10 flex flex-col h-full justify-between min-h-[280px]">
            <div>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-white/10 backdrop-blur-md border border-white/20 text-${color}-300`}>
                    <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">{title}</h3>
                <p className="text-gray-300 font-medium">{subtitle}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/5">
                    <span className={`text-${color}-300 text-xs font-bold uppercase tracking-wider block mb-1`}>Net Yield</span>
                    <span className="text-3xl font-bold text-white">{yieldVal}%</span>
                </div>
                <div className="bg-black/20 rounded-xl p-4 backdrop-blur-sm border border-white/5">
                    <span className={`text-${color}-300 text-xs font-bold uppercase tracking-wider block mb-1`}>Cash Flow</span>
                    <span className="text-3xl font-bold text-white">€ {Number(cashFlow).toLocaleString()}</span>
                </div>
            </div>

            <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0">
                <div className={`p-3 rounded-full bg-white text-${color}-600 shadow-lg`}>
                    <ArrowRight className="w-6 h-6" />
                </div>
            </div>
        </div>
    </motion.div>
);

const KpiCard = ({ label, value, subtext, icon: Icon, color, bg, onClick }: any) => (
    <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="relative overflow-hidden rounded-xl p-5 cursor-pointer transition-all border bg-white/5 border-white/10 hover:bg-white/10"
    >
        <div className="flex justify-between items-start mb-3 relative z-10">
            <div className={`p-2 rounded-lg ${bg}`}>
                <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <Info className="w-4 h-4 text-gray-600 hover:text-white transition-colors" />
        </div>
        <div className="relative z-10">
            <h4 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">{label}</h4>
            <div className="font-bold text-white text-xl">{value}</div>
            <p className="text-xs text-gray-500 mt-1">{subtext}</p>
        </div>
    </motion.div>
);

const CostItem = ({ label, value, total, color }: any) => {
    const percentage = Math.min(100, Math.max(0, (value / total) * 100));

    return (
        <div>
            <div className="flex justify-between items-end mb-2">
                <span className="text-gray-400 text-sm">{label}</span>
                <span className="text-white font-bold">€ {value.toLocaleString()}</span>
            </div>
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className={`h-full ${color}`} style={{ width: `${percentage}%` }}></div>
            </div>
        </div>
    );
};

export default InvestmentSection;
