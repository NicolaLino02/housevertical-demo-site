import React from 'react';
import { Briefcase, Home, TrendingUp, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface StrategyCardsProps {
    onSelect: (strategy: string) => void;
    activeStrategy: string;
}

const cards = [
    { id: 'investor', title: 'Investitore', subtitle: 'Trading & Affitto', icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
    { id: 'resident', title: 'Residente', subtitle: 'Prima Casa', icon: Home, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { id: 'speculator', title: 'Flipper', subtitle: 'Ristruttura & Vendi', icon: Briefcase, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20' },
];

const StrategyCards = ({ onSelect, activeStrategy }: StrategyCardsProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {cards.map((card) => {
                const isActive = activeStrategy === card.id;
                return (
                    <motion.button
                        key={card.id}
                        onClick={() => onSelect(card.id)}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.98 }}
                        className={`relative p-6 rounded-2xl border text-left transition-all duration-300 group overflow-hidden ${isActive ? `bg-white/10 ${card.border} shadow-lg shadow-${card.color.split('-')[1]}-500/20` : 'bg-white/5 border-white/5 hover:bg-white/10'}`}
                    >
                        {isActive && (
                            <motion.div
                                layoutId="active-glow"
                                className={`absolute inset-0 ${card.bg} opacity-20`} // Background fill
                            />
                        )}

                        <div className="relative z-10 flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${isActive ? 'bg-white/10' : 'bg-white/5'} ${card.color}`}>
                                <card.icon className="w-6 h-6" />
                            </div>
                            {isActive && <div className={`p-1 rounded-full ${card.color} bg-white/10`}><Check className="w-4 h-4" /></div>}
                        </div>

                        <div className="relative z-10">
                            <h4 className={`text-lg font-bold ${isActive ? 'text-white' : 'text-gray-300'} mb-1`}>{card.title}</h4>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">{card.subtitle}</p>
                        </div>

                        {/* Hover Arrow */}
                        <div className={`absolute bottom-4 right-4 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'} transition-opacity`}>
                            <ArrowRight className={`w-5 h-5 ${card.color}`} />
                        </div>

                    </motion.button>
                );
            })}
        </div>
    );
};

export default StrategyCards;
