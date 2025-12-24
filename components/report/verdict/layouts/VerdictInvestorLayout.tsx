import React from 'react';
import { TrendingUp, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import ScoreRing from '../ScoreRing';

const VerdictInvestorLayout = ({ data, reportData }: any) => {
    // Safe Access to Financials
    const financials = reportData?.sections?.investment?.financials || {};
    const roi = financials.roi?.value || financials.grossYield?.value || 0;
    const cashflow = financials.cashFlowMonthly?.value || 0;
    const capRate = financials.capRate?.value || 0;

    // Safe Access to Verdict Data
    const pros = data.pros || [];
    const risks = data.cons || [];

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full items-center">

            {/* LEFT: Financial Data & Logic */}
            <div className="lg:col-span-7 space-y-6">
                <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                        Analisi <span className="text-emerald-400">Investimento</span>
                    </h2>
                    <p className="text-slate-400 max-w-lg text-sm">
                        Focus su ROI, Cashflow e stabilità dell'inquilino.
                    </p>
                </div>

                {/* KPI GRID */}
                <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-xl bg-emerald-900/10 border border-emerald-500/20 text-center">
                        <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">ROI Annuo</div>
                        <div className="text-xl font-bold text-white">{roi}%</div>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-900/10 border border-emerald-500/20 text-center">
                        <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Cashflow</div>
                        <div className="text-xl font-bold text-white">€ {Number(cashflow).toLocaleString()}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-emerald-900/10 border border-emerald-500/20 text-center">
                        <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Cap Rate</div>
                        <div className="text-xl font-bold text-white">{capRate}%</div>
                    </div>
                </div>

                {/* AI PROS & CONS */}
                <div className="grid grid-cols-2 gap-4 bg-white/5 p-4 rounded-2xl border border-white/10">
                    <div>
                        <h4 className="flex items-center gap-2 text-emerald-400 font-bold mb-2 uppercase text-[10px] tracking-wider">
                            <CheckCircle className="w-3 h-3" /> Perchè Sì
                        </h4>
                        <ul className="space-y-1 text-xs text-slate-300">
                            {pros.slice(0, 3).map((p: string, i: number) => (
                                <li key={i}>• {p}</li>
                            ))}
                            {pros.length === 0 && <li>• Dati insufficienti</li>}
                        </ul>
                    </div>
                    <div>
                        <h4 className="flex items-center gap-2 text-red-400 font-bold mb-2 uppercase text-[10px] tracking-wider">
                            <AlertTriangle className="w-3 h-3" /> Rischi
                        </h4>
                        <ul className="space-y-1 text-xs text-slate-300">
                            {risks.slice(0, 3).map((r: string, i: number) => (
                                <li key={i}>• {r}</li>
                            ))}
                            {risks.length === 0 && <li>• Nessun rischio critico rilevato</li>}
                        </ul>
                    </div>
                </div>
            </div>

            {/* RIGHT: SCORE RING (Small & Technical) */}
            <div className="lg:col-span-5 flex justify-center">
                <div className="scale-100">
                    <ScoreRing score={92} label="Investability" color="#34d399" />
                </div>
            </div>

        </div>
    );
};

export default VerdictInvestorLayout;
