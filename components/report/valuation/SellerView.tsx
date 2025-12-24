import React, { useState, useEffect } from 'react';
import { SectionData } from '../../../types';
import { Target, Clock, TrendingUp, Users, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';

interface SellerViewProps {
    data: any; // Valuation Data
}

const SellerView = ({ data }: SellerViewProps) => {
    // Strategy State: 0 (Fast) -> 50 (Market) -> 100 (Max Price)
    const [strategyIndex, setStrategyIndex] = useState(50);
    const [projectedValues, setProjectedValues] = useState({
        price: 0,
        days: 0,
        prob: 0
    });

    // Base Data from Props (with defaults)
    const marketPrice = data.saleStrategy?.marketPrice?.price || 300000;
    const baseDays = 45;

    // Math for Projection Curve
    useEffect(() => {
        // Linear interpolation for price: -10% to +15%
        const priceMultiplier = 0.9 + (strategyIndex / 100) * 0.25;
        const computedPrice = marketPrice * priceMultiplier;

        // Exponential curve for time: Fast (10 days) -> High (120 days)
        const computedDays = Math.round(10 + Math.pow(strategyIndex / 10, 2.2)); // Non-linear time penalty

        // Probability curve: High at low price, drops sharply after market price
        let prob = 0;
        if (strategyIndex <= 50) {
            // 99% down to 85%
            prob = 99 - (strategyIndex / 50) * 14;
        } else {
            // 85% drops to 40%
            prob = 85 - ((strategyIndex - 50) / 50) * 45;
        }

        setProjectedValues({
            price: Math.round(computedPrice / 1000) * 1000,
            days: computedDays,
            prob: Math.round(prob)
        });
    }, [strategyIndex, marketPrice]);

    // Chart Data: Gaussian-ish distribution centered on Market Price
    const distributionData = Array.from({ length: 20 }, (_, i) => {
        const p = marketPrice * (0.8 + i * 0.02); // x-axis price points
        // Bell curve logic
        const diff = (p - marketPrice) / (marketPrice * 0.15);
        const density = Math.exp(-0.5 * diff * diff) * 100;
        return {
            price: p,
            density: density,
            label: `€${(p / 1000).toFixed(0)}k`
        };
    });

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full">

            {/* LEFT: STRATEGY CONTROLLER */}
            <div className="lg:col-span-4 flex flex-col gap-6">

                {/* Main Control Panel */}
                <div className="bg-white/5 border border-white/10 p-4 md:p-6 rounded-3xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-blue-600/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                    <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                        <Target className="w-5 h-5 text-blue-400" /> Strategia di Vendita
                    </h3>

                    {/* Slider */}
                    <div className="mb-10 relative px-2">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={strategyIndex}
                            onChange={(e) => setStrategyIndex(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 relative z-20"
                        />
                        <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-3">
                            <span>Vendita Rapida</span>
                            <span>Mercato</span>
                            <span>Max Profitto</span>
                        </div>
                    </div>

                    {/* Dynamic Metrics */}
                    <div className="space-y-6 relative z-10">
                        <div>
                            <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Prezzo Target</div>
                            <motion.div
                                key={projectedValues.price}
                                initial={{ opacity: 0.5, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl lg:text-5xl font-bold text-white tracking-tight"
                            >
                                € {projectedValues.price.toLocaleString()}
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                                <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Tempo</div>
                                <div className="text-xl font-bold text-white">{projectedValues.days} gg</div>
                            </div>
                            <div className="bg-black/20 p-4 rounded-2xl border border-white/5">
                                <div className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Probabilità</div>
                                <div className={`text-xl font-bold ${projectedValues.prob > 70 ? 'text-emerald-400' : projectedValues.prob > 40 ? 'text-yellow-400' : 'text-red-400'}`}>
                                    {projectedValues.prob}%
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* AI Insight Card */}
                <div className="flex-1 bg-gradient-to-br from-blue-900/20 to-transparent border border-blue-500/20 p-6 rounded-3xl flex flex-col justify-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h4 className="text-blue-400 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" /> Insight AI
                        </h4>
                        <p className="text-gray-300 text-sm leading-relaxed">
                            {strategyIndex < 30
                                ? "Questa strategia sacrifica circa il 5-8% del valore per garantire una liquidità immediata. Consigliata solo per urgenze."
                                : strategyIndex > 70
                                    ? "Posizionamento aggressivo. Richiede un marketing d'eccellenza e pazienza. Il rischio di invenduto sale drasticamente dopo 90 giorni."
                                    : "Punto di equilibrio ottimale. Massimizza il valore mantenendo alta l'attenzione degli acquirenti nelle prime 4 settimane."
                            }
                        </p>
                    </div>
                </div>
            </div>

            {/* RIGHT: MARKET VISUALIZATION */}
            <div className="lg:col-span-8 bg-white/5 border border-white/10 rounded-3xl p-4 md:p-8 flex flex-col h-full relative overflow-hidden">
                <div className="flex justify-between items-start mb-8">
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-2">Posizionamento Competitivo</h3>
                        <p className="text-gray-400 max-w-md">Visualizzazione della curva di domanda. La linea verticale indica il tuo posizionamento attuale.</p>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-bold text-gray-300">
                        <Users className="w-4 h-4" /> {data.comparables?.length || 12} Immobili Analizzati
                    </div>
                </div>

                <div className="flex-1 w-full relative min-h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={distributionData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorDensity" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.3} />
                                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                            <XAxis
                                dataKey="price"
                                stroke="#94a3b8"
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(val) => `€${(val / 1000).toFixed(0)}k`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)' }}
                                itemStyle={{ color: '#fff' }}
                                cursor={{ stroke: '#94a3b8', strokeWidth: 1, strokeDasharray: '5 5' }}
                                formatter={(val: number) => [val.toFixed(1), 'Densità Domanda']}
                                labelFormatter={(val) => `Prezzo: €${Number(val).toLocaleString()}`}
                            />
                            <Area
                                type="monotone"
                                dataKey="density"
                                stroke="#60a5fa"
                                strokeWidth={3}
                                fill="url(#colorDensity)"
                            />
                            {/* User Position Line */}
                            <ReferenceLine x={projectedValues.price} stroke="#ffffff" strokeWidth={2} label={{ position: 'top', value: 'TUA STRATEGIA', fill: 'white', fontSize: 10, fontWeight: 'bold' }} />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default SellerView;
