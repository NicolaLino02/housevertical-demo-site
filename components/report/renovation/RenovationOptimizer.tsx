import React, { useState, useEffect } from 'react';
import { Hammer, TrendingUp, DollarSign, Calculator, ChevronRight, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

interface RenovationOptimizerProps {
    data: any;
    currentValue: number;
}

const RenovationOptimizer = ({ data, currentValue }: RenovationOptimizerProps) => {
    // 1.0 = Standard, 0.8 = Economy, 1.5 = Luxury
    const [qualityLevel, setQualityLevel] = useState(1.0);
    const [calculatedCost, setCalculatedCost] = useState(0);
    const [calculatedValue, setCalculatedValue] = useState(0);

    // Default Data Safe Access
    // Default Data Safe Access
    const baseCost = Number(data.totalCost?.value) || 0;
    const baseUplift = Number(data.valueIncrease?.value) || 0;
    const breakdown = data.breakdown || [];

    // Recalculate Logic
    useEffect(() => {
        // Non-linear scaling: 
        // Luxury cost increases faster than value (diminishing returns)
        // Economy cost savings reduce value more sharply

        // Cost scales linearly with slider
        const newCost = baseCost * qualityLevel;

        // Uplift scales with a curve: High quality adds value, but caps out
        const valueMultiplier = qualityLevel < 1
            ? qualityLevel * 0.9 // Economy hurts value more
            : 1 + (qualityLevel - 1) * 0.7; // Luxury adds value but at 70% efficiency

        const newUplift = baseUplift * valueMultiplier;

        setCalculatedCost(Math.round(newCost));
        setCalculatedValue(Math.round(currentValue + newUplift));
    }, [qualityLevel, baseCost, baseUplift, currentValue]);

    // Dynamic Breakdown Data
    const chartData = breakdown.map((item: any) => ({
        name: item.category,
        value: Math.round(item.cost * qualityLevel),
        original: item.cost
    }));

    const netProfit = calculatedValue - currentValue - calculatedCost;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">

            {/* LEFT: CONTROLS & SUMMARY */}
            <div className="lg:col-span-5 flex flex-col gap-6">

                {/* QUALITY CONTROL CARD */}
                <div className="bg-white/5 border border-white/10 p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-24 bg-purple-500/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                        <Hammer className="w-5 h-5 text-purple-400" /> Livello Ristrutturazione
                    </h3>

                    {/* Slider */}
                    <div className="mb-8 relative px-2">
                        <input
                            type="range"
                            min="0.8"
                            max="1.5"
                            step="0.1"
                            value={qualityLevel}
                            onChange={(e) => setQualityLevel(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500 relative z-20"
                        />
                        <div className="flex justify-between text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-4">
                            <span className={qualityLevel === 0.8 ? 'text-white' : ''}>Economy</span>
                            <span className={qualityLevel === 1.0 ? 'text-white' : ''}>Standard</span>
                            <span className={qualityLevel === 1.5 ? 'text-white' : ''}>Luxury</span>
                        </div>
                    </div>

                    {/* Dynamic Tickers */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
                            <span className="text-gray-400 text-sm">Budget Stimato</span>
                            <span className="text-xl font-bold text-white">€ {calculatedCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                            <span className="text-gray-400 text-sm flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-emerald-400" /> Valore Futuro
                            </span>
                            <motion.span
                                key={calculatedValue}
                                initial={{ scale: 1.1, color: '#fff' }}
                                animate={{ scale: 1, color: '#fff' }}
                                className="text-xl font-bold"
                            >
                                € {calculatedValue.toLocaleString()}
                            </motion.span>
                        </div>
                    </div>
                </div>

                {/* ROI CARD */}
                <div className={`flex-1 p-6 rounded-3xl border transition-colors duration-500 flex flex-col justify-center items-center text-center ${netProfit > 0 ? 'bg-emerald-900/10 border-emerald-500/20' : 'bg-red-900/10 border-red-500/20'}`}>
                    <div className="text-xs font-bold uppercase tracking-widest mb-2 text-gray-400">Profitto Netto Operazione</div>
                    <div className={`text-4xl lg:text-5xl font-bold tracking-tight mb-2 ${netProfit > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                        {netProfit > 0 ? '+' : ''}€ {netProfit.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-500 max-w-xs">
                        {netProfit > 0
                            ? "L'intervento genera un plusvalore significativo rispetto ai costi."
                            : "Attenzione: I costi superano l'incremento di valore previsto."}
                    </p>
                </div>

            </div>

            {/* RIGHT: BREAKDOWN VISUALIZER */}
            <div className="lg:col-span-7 bg-[#0f172a] border border-white/10 rounded-3xl p-8 flex flex-col h-full">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-gray-400" /> Ripartizione Costi
                </h3>

                <div className="flex-1 min-h-[300px] flex gap-6">
                    {/* Visual Chart */}
                    <div className="flex-1">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 0, left: 40, bottom: 0 }}>
                                <XAxis type="number" hide />
                                <YAxis dataKey="name" type="category" width={100} tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                                <Tooltip
                                    cursor={{ fill: '#ffffff', opacity: 0.05 }}
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff', borderRadius: '8px' }}
                                    formatter={(val: number) => [`€ ${val.toLocaleString()}`, 'Costo Stimato']}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24} animationDuration={500}>
                                    {chartData.map((entry: any, index: number) => (
                                        <Cell key={`cell-${index}`} fill={['#a855f7', '#d946ef', '#ec4899', '#f472b6', '#fb7185'][index % 5]} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* List Detail */}
                    <div className="w-48 hidden md:flex flex-col gap-2 overflow-y-auto custom-scrollbar">
                        {chartData.map((item: any, idx: number) => (
                            <div key={idx} className="bg-white/5 p-3 rounded-lg border border-white/5 text-xs">
                                <div className="text-gray-400 mb-1">{item.name}</div>
                                <div className="text-white font-bold">€ {item.value.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 flex items-start gap-3">
                    <div className="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                        <Check className="w-5 h-5" />
                    </div>
                    <div>
                        <h4 className="text-white font-bold text-sm">Bonus Ristrutturazione 50%</h4>
                        <p className="text-gray-400 text-xs mt-1">Confermati per l'anno in corso. Recupero fiscale in 10 anni.</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default RenovationOptimizer;
