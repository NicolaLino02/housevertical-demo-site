import React from 'react';
import { Timer, ArrowRight, TrendingUp } from 'lucide-react';
import ScoreRing from '../ScoreRing';
import { motion } from 'framer-motion';

const VerdictSpeculatorLayout = ({ data, reportData }: any) => {

    const renovation = reportData?.sections?.renovation_potential?.renovation || {};
    const valuation = reportData?.sections?.valuation?.valuation || {};

    // Dynamic Financials
    const purchasePrice = valuation.buyStrategy?.idealPrice || 0;
    const renoCost = Number(renovation.totalCost?.value) || 0;
    const exitPrice = valuation.saleStrategy?.highPrice?.price || valuation.saleStrategy?.marketPrice?.price || 0;
    const profit = exitPrice - (purchasePrice + renoCost);
    const duration = renovation.timeline?.value || 4; // Months

    const score = data.finalScore?.value || 0;

    return (
        <div className="flex flex-col h-full gap-6">

            {/* HEADER & NARRATIVE */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-3xl lg:text-4xl font-bold text-white">
                        Deal <span className="text-purple-400">Trajectory</span>
                    </h2>
                    <div className="px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-bold uppercase tracking-widest">
                        Fix & Flip
                    </div>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed max-w-2xl text-purple-100/80">
                    <span className="text-purple-400 font-bold">{data.buyStrategy?.title || 'Strategia Speculativa'}: </span>
                    {data.buyStrategy?.description || "Massimizza il profitto con una ristrutturazione mirata e uscita rapida."}
                </p>
            </div>

            {/* MAIN CHART */}
            <div className="relative w-full flex-1 min-h-[160px] bg-purple-900/10 rounded-2xl border border-purple-500/20 overflow-hidden flex items-end px-6 pb-4 shadow-inner shadow-purple-900/20">
                {/* Technical Grid Background */}
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(to right, rgba(168, 85, 247, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                {/* Break-even Line (Dotted) */}
                <div className="absolute top-[40%] left-0 w-full h-px border-t border-dashed border-white/10" />
                <div className="absolute top-[35%] right-2 text-[9px] text-white/20 font-mono">BREAK-EVEN POINT</div>

                {/* The SVG Curve */}
                <svg className="absolute inset-0 w-full h-full overflow-visible z-10" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#c084fc" stopOpacity="0.5" />
                            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
                        </linearGradient>
                        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>

                    {/* Fill Area */}
                    <motion.path
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1 }}
                        d="M0,150 C50,150 120,170 180,170 C280,170 300,40 400,40 L600,40 V200 H0 Z"
                        fill="url(#curveGradient)"
                    />

                    {/* Stroke Line with Glow */}
                    <motion.path
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                        d="M0,150 C50,150 120,170 180,170 C280,170 300,40 400,40 L600,40"
                        fill="none"
                        stroke="#e879f9"
                        strokeWidth="3"
                        strokeLinecap="round"
                        filter="url(#glow)"
                        vectorEffect="non-scaling-stroke"
                    />
                </svg>

                {/* Floating Glass Cards for Data Points */}
                {/* 1. BUY */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
                    className="absolute left-[5%] bottom-[25%] z-20 flex flex-col items-center"
                >
                    <div className="w-2 h-2 bg-white rounded-full ring-4 ring-purple-500/30 mb-2 shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
                    <div className="bg-[#0f172a]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 text-center">
                        <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Acquisto</p>
                        <p className="text-xs font-bold text-white">€ {(purchasePrice / 1000).toFixed(0)}k</p>
                    </div>
                </motion.div>

                {/* 2. MAKER (Renovation Dip) */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
                    className="absolute left-[30%] bottom-[15%] z-20 flex flex-col items-center"
                >
                    <div className="w-2 h-2 bg-purple-400 rounded-full ring-4 ring-purple-500/30 mb-2 shadow-[0_0_10px_rgba(168,85,247,0.8)]" />
                    <div className="bg-[#0f172a]/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-purple-500/30 text-center shadow-lg shadow-purple-900/20">
                        <p className="text-[9px] text-purple-300 font-bold uppercase tracking-wider">Lavori</p>
                        <p className="text-xs text-purple-200">- € {(renoCost / 1000).toFixed(0)}k</p>
                    </div>
                </motion.div>

                {/* 3. EXIT */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.4 }}
                    className="absolute right-[10%] top-[15%] z-20 flex flex-col items-end"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">Target Exit</span>
                        <div className="w-3 h-3 bg-emerald-400 rounded-full ring-4 ring-emerald-500/30 shadow-[0_0_15px_rgba(52,211,153,0.8)]" />
                    </div>
                    <div className="bg-gradient-to-br from-emerald-900/80 to-[#0f172a]/90 backdrop-blur-md px-4 py-2 rounded-xl border border-emerald-500/30 text-right shadow-xl">
                        <p className="text-2xl font-bold text-white tracking-tight">€ {(exitPrice / 1000).toFixed(0)}k</p>
                        <div className="flex items-center justify-end gap-1 text-[10px] text-emerald-400 font-mono mt-0.5">
                            <TrendingUp className="w-3 h-3" /> +{((profit / (purchasePrice + renoCost)) * 100).toFixed(0)}% Gro
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* BOTTOM STRIP: METRICS + SCORERING */}
            <div className="grid grid-cols-12 gap-4">

                {/* METRIC 1: PROFIT */}
                <div className="col-span-5 bg-purple-500/10 p-3 rounded-2xl border border-purple-500/20 flex flex-col justify-center relative overflow-hidden group">
                    <div className="absolute right-0 top-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                        <TrendingUp className="w-12 h-12 text-purple-400" />
                    </div>
                    <p className="text-[10px] text-purple-300 uppercase font-bold mb-1">Profitto Lordo</p>
                    <p className="text-2xl lg:text-3xl font-bold text-white">€ {profit.toLocaleString()}</p>
                </div>

                {/* METRIC 2: DURATION */}
                <div className="col-span-4 bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-1">
                        <Timer className="w-3 h-3 text-slate-400" />
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Durata</p>
                    </div>
                    <p className="text-xl lg:text-2xl font-bold text-white">{duration} Mesi</p>
                </div>

                {/* METRIC 3: FLIP SCORE (Consistent Card) */}
                <div className="col-span-3 bg-white/5 p-3 rounded-2xl border border-white/10 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-1 z-10">
                        <div className="w-3 h-3 rounded-full border-2 border-purple-400 flex items-center justify-center">
                            <div className="w-1 h-1 bg-purple-400 rounded-full" />
                        </div>
                        <p className="text-[10px] text-slate-400 uppercase font-bold">Score</p>
                    </div>
                    <div className="flex items-end gap-1 z-10">
                        <p className="text-xl lg:text-2xl font-bold text-white">{score}</p>
                        <p className="text-xs text-purple-400 font-bold mb-1">/100</p>
                    </div>
                    {/* Decorative Background Ring */}
                    <div className="absolute -right-4 -bottom-6 opacity-20 rotate-[-90deg]">
                        <svg width="100" height="100" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="40" stroke="#a78bfa" strokeWidth="8" fill="none" opacity="0.5" />
                            <circle cx="50" cy="50" r="40" stroke="#a78bfa" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="30" />
                        </svg>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default VerdictSpeculatorLayout;
