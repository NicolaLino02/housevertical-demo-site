import React, { useState } from 'react';
import { SectionData } from '../../types';
import StrategyCards from './verdict/StrategyCards';
import VerdictInvestorLayout from './verdict/layouts/VerdictInvestorLayout';
import VerdictResidentLayout from './verdict/layouts/VerdictResidentLayout';
import VerdictSpeculatorLayout from './verdict/layouts/VerdictSpeculatorLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Bot } from 'lucide-react';

const VerdictSection = ({ section, data }: { section: SectionData, data: any }) => {
    const [activeStrategy, setActiveStrategy] = useState('investor');

    // Safe Data
    const verdict = section.verdict || {};

    // Determine Theme mainly for background
    const theme = {
        investor: { gradient: 'from-emerald-900/20', bg: 'bg-[#0f172a]' },
        resident: { gradient: 'from-blue-900/20', bg: 'bg-[#0f172a]' },
        speculator: { gradient: 'from-purple-900/20', bg: 'bg-[#0f172a]' }
    }[activeStrategy as 'investor' | 'resident' | 'speculator'] || { gradient: 'from-cyan-900/20', bg: 'bg-[#0f172a]' };

    return (
        <div className="w-full h-full min-h-[550px] relative overflow-hidden flex flex-col p-4 lg:p-6 transition-colors duration-700">

            {/* Background Ambience (Fullscreen Dynamic) */}
            <div className="absolute top-0 left-0 w-full h-full bg-[#0f172a] -z-20" />
            <motion.div
                animate={{ opacity: 1 }}
                key={`bg-${activeStrategy}`}
                className={`absolute top-0 right-0 w-[60%] h-full bg-gradient-to-l ${theme.gradient} to-transparent -z-10 transition-all duration-1000`}
            />

            <div className="max-w-[1400px] w-full mx-auto h-full flex flex-col">

                {/* HEADER - Compact */}
                <div className="mb-4 flex justify-between items-end">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">
                            <Bot className="w-3 h-3" /> HouseVertical AI
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <p className="text-[10px] text-slate-500 font-mono uppercase">ID: 942-B / VERDICT MATRIX</p>
                    </div>
                </div>

                {/* DYNAMIC STAGE (Polymorphic Layout) */}
                <div className="flex-1 min-h-0 relative mb-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStrategy}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            transition={{ duration: 0.4 }}
                            className="w-full h-full"
                        >
                            {activeStrategy === 'investor' && <VerdictInvestorLayout data={verdict} reportData={data} />}
                            {activeStrategy === 'resident' && <VerdictResidentLayout data={verdict} reportData={data} />}
                            {activeStrategy === 'speculator' && <VerdictSpeculatorLayout data={verdict} reportData={data} />}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* BOTTOM: STRATEGY SELECTOR */}
                <div className="mt-auto pt-2 border-t border-white/5">
                    <StrategyCards activeStrategy={activeStrategy} onSelect={setActiveStrategy} />
                </div>

            </div>

        </div>
    );
};

export default VerdictSection;
