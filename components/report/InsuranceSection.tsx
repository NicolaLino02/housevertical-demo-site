import React, { useState, useEffect } from 'react';
import { Shield, ShieldCheck, Flame, Droplets, Zap, Lock, Siren, HeartHandshake, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface InsuranceSectionProps {
    propertyValue: number;
}

const InsuranceSection = ({ propertyValue }: InsuranceSectionProps) => {
    // Default insured value matches property value
    const [insuredValue, setInsuredValue] = useState(propertyValue);
    const [selectedPlan, setSelectedPlan] = useState<'basic' | 'plus' | 'premium'>('plus');

    // Rates (Yearly % of capital)
    const RATES = {
        basic: 0.0012, // 0.12%
        plus: 0.0025,  // 0.25%
        premium: 0.0045 // 0.45%
    };

    const monthlyPrice = (insuredValue * RATES[selectedPlan]) / 12;

    const plans = [
        {
            id: 'basic',
            name: 'Essential',
            color: 'blue',
            icon: Shield,
            features: [
                { label: 'Incendio & Scoppio', icon: Flame },
                { label: 'Responsabilità Civile', icon: HeartHandshake },
            ],
            missing: ['Danni Acqua', 'Furto', 'Fenomeni Elettrici']
        },
        {
            id: 'plus',
            name: 'Complete',
            color: 'purple',
            icon: ShieldCheck,
            features: [
                { label: 'Incendio & Scoppio', icon: Flame },
                { label: 'Responsabilità Civile', icon: HeartHandshake },
                { label: 'Danni d\'Acqua', icon: Droplets },
                { label: 'Fenomeni Elettrici', icon: Zap },
            ],
            missing: ['Furto & Rapina', 'Tutela Legale', 'Catastrofali']
        },
        {
            id: 'premium',
            name: 'All Inclusive',
            color: 'emerald',
            icon: Lock,
            features: [
                { label: 'Incendio & Scoppio', icon: Flame },
                { label: 'Responsabilità Civile', icon: HeartHandshake },
                { label: 'Danni d\'Acqua', icon: Droplets },
                { label: 'Fenomeni Elettrici', icon: Zap },
                { label: 'Furto & Rapina', icon: Siren },
                { label: 'Tutela Legale', icon: Shield },
            ]
        }
    ];

    const formatCurrency = (val: number) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="max-w-7xl w-full mx-auto p-4 space-y-4 h-full flex flex-col justify-center">
            {/* 1. HEADER - COMPACT */}
            <div className="text-center mb-4 relative flex-none">
                <h2 className="text-3xl lg:text-5xl font-bold mb-2">
                    Protezione <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Immobile</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-sm">
                    Calcola la polizza ideale per proteggere il tuo investimento.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-1 min-h-0">
                {/* 2. CONTROL PANEL (Left Col) */}
                <div className="lg:col-span-1 glass-panel p-6 rounded-3xl border border-white/10 bg-white/5 flex flex-col justify-between overflow-y-auto">
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-blue-400" /> Capitale Assicurato
                        </h3>

                        <div className="space-y-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-white mb-0">{formatCurrency(insuredValue)}</div>
                                <div className="text-[10px] text-gray-400 uppercase tracking-widest">Valore Ricostruzione</div>
                            </div>

                            <input
                                type="range"
                                min={propertyValue * 0.5}
                                max={propertyValue * 1.5}
                                step={5000}
                                value={insuredValue}
                                onChange={(e) => setInsuredValue(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                            />
                            <div className="flex justify-between text-[10px] text-gray-500">
                                <span>-50%</span>
                                <span>+50%</span>
                            </div>

                            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-blue-200/80 leading-relaxed">
                                <span className="block font-bold text-blue-400 mb-1">Consiglio AI:</span>
                                Assicurare il 100% del valore ({formatCurrency(propertyValue)}) evita la regola proporzionale.
                            </div>
                        </div>
                    </div>

                    {/* Total Price Display for selected plan */}
                    <div className="mt-4 pt-4 border-t border-white/10 text-center">
                        <div className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">Premio Mensile Stimato</div>
                        <motion.div
                            key={monthlyPrice}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="text-4xl font-bold text-white tracking-tight"
                        >
                            € {monthlyPrice.toFixed(2)}
                        </motion.div>
                        <div className="text-[10px] text-gray-500 mt-1">pagabili annualmente o mensilmente</div>
                    </div>
                </div>

                {/* 3. PLANS SELECTION (Right Col) */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-3 h-full">
                    {plans.map((plan) => {
                        const isSelected = selectedPlan === plan.id;
                        return (
                            <div
                                key={plan.id}
                                onClick={() => setSelectedPlan(plan.id as any)}
                                className={`relative rounded-2xl p-4 border transition-all duration-300 cursor-pointer flex flex-col h-full ${isSelected
                                    ? `bg-${plan.color}-500/10 border-${plan.color}-500 ring-1 ring-${plan.color}-500 shadow-[0_0_20px_rgba(0,0,0,0.2)] scale-[1.02] z-10`
                                    : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'}`}
                            >
                                {isSelected && (
                                    <div className={`absolute -top-2 left-1/2 -translate-x-1/2 bg-${plan.color}-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-widest shadow-lg`}>
                                        Selezionato
                                    </div>
                                )}

                                <div className="text-center mb-3">
                                    <div className={`w-10 h-10 mx-auto rounded-xl bg-${plan.color}-500/20 flex items-center justify-center mb-2 text-${plan.color}-400`}>
                                        <plan.icon className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-base font-bold text-white">{plan.name}</h4>
                                </div>

                                <ul className="space-y-2 flex-1 overflow-y-auto custom-scrollbar">
                                    {plan.features.map((feat, i) => (
                                        <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                                            <feat.icon className={`w-3.5 h-3.5 text-${plan.color}-400 shrink-0 mt-0.5`} />
                                            <span>{feat.label}</span>
                                        </li>
                                    ))}
                                    {/* Opacity for missing features */}
                                    {plan.missing && plan.missing.map((miss, i) => (
                                        <li key={'m' + i} className="flex items-start gap-2 text-xs text-gray-600 line-through decoration-gray-700">
                                            <Check className="w-3.5 h-3.5 opacity-0 shrink-0" /> {/* Spacer */}
                                            <span>{miss}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full mt-4 py-2 rounded-lg text-xs font-bold transition-colors ${isSelected
                                    ? `bg-${plan.color}-500 text-white`
                                    : 'bg-white/10 text-gray-400 group-hover:bg-white/20'}`}>
                                    {isSelected ? 'Incluso' : 'Scegli'}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>


        </div>
    );
};

export default InsuranceSection;
