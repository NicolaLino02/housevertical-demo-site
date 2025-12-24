import React, { useState } from 'react';
import { SectionData, ReportData } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Hammer, Calendar, ArrowRight, Sparkles } from 'lucide-react';
import RenovationOptimizer from './renovation/RenovationOptimizer';
import RenovationTimeline from './renovation/RenovationTimeline';

const RenovationSection = ({ section, currentValuation }: { section: SectionData, currentValuation: number }) => {
    const [activeTab, setActiveTab] = useState<'budget' | 'timeline'>('budget');

    // Safe Data
    const renovation = section.renovation || {};
    const currentValue = currentValuation || 0;

    // Derived for Header
    const valueIncrease = Number((renovation as any).valueIncrease?.value) || 0;
    const futureValue = currentValue + valueIncrease;

    return (
        <div className="max-w-7xl w-full mx-auto p-4 lg:p-6 space-y-4 lg:space-y-8 h-full flex flex-col justify-center">

            {/* 1. HERO HEADER: The Transformation Story */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-8 pb-4 lg:pb-8 border-b border-white/5">
                <div className="text-center lg:text-left">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-2">
                        Potenziale <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Trasformativo</span>
                    </h2>
                    <p className="text-gray-400 max-w-md text-sm">
                        Analisi ROI e impatto di valorizzazione. Scopri come l'intervento trasforma l'asset.
                    </p>
                </div>

                {/* Quick Stats: Pre -> Post */}
                <div className="flex flex-wrap justify-center items-center gap-4 bg-black/20 p-4 rounded-3xl border border-white/5">
                    <div className="text-right px-4 border-r border-white/10">
                        <div className="text-[10px] text-gray-500 uppercase font-bold">Stato Attuale</div>
                        <div className="text-lg font-bold text-gray-300">€ {(currentValue / 1000).toFixed(0)}k</div>
                    </div>

                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg shadow-purple-500/20">
                        <ArrowRight className="w-4 h-4 text-white" />
                    </div>

                    <div className="text-left">
                        <div className="text-[10px] text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 uppercase font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Post Opera
                        </div>
                        <div className="text-xl font-bold text-white">€ {(futureValue / 1000).toFixed(0)}k</div>
                    </div>
                </div>
            </div>

            {/* 2. NAVIGATION TABS */}
            <div className="flex justify-center">
                <div className="bg-white/5 p-1 rounded-xl flex gap-1 relative">
                    {/* Active Pill Background */}
                    <div className="absolute inset-0 p-1 pointer-events-none">
                        <motion.div
                            layoutId="tab-pill"
                            className={`h-full rounded-lg shadow-lg ${activeTab === 'budget' ? 'w-1/2 translate-x-0 bg-purple-600' : 'w-1/2 translate-x-full bg-blue-600'}`}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                    </div>

                    <button
                        onClick={() => setActiveTab('budget')}
                        className={`relative z-10 px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'budget' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Hammer className="w-4 h-4" /> Simulatore Budget
                    </button>
                    <button
                        onClick={() => setActiveTab('timeline')}
                        className={`relative z-10 px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors ${activeTab === 'timeline' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        <Calendar className="w-4 h-4" /> Cronoprogramma
                    </button>
                </div>
            </div>

            {/* 3. DYNAMIC CONTENT */}
            <div className="flex-1 min-h-0 relative">
                <AnimatePresence mode="wait">
                    {activeTab === 'budget' ? (
                        <motion.div
                            key="budget"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <RenovationOptimizer data={renovation} currentValue={currentValue} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="timeline"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <RenovationTimeline data={renovation} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </div>
    );
};

export default RenovationSection;
