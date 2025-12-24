import React, { useState } from 'react';
import { SectionData } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Navigation, Map, Globe } from 'lucide-react';
import CommuteSmartView from './connectivity/CommuteSmartView';
import TransitBoard from './connectivity/TransitBoard';

const ConnectivitySection = ({ section }: { section: SectionData }) => {
    const [activeTab, setActiveTab] = useState<'commute' | 'grid'>('commute');

    // Safe Data
    const connectivity = section.connectivity || {};

    return (
        <div className="max-w-7xl w-full mx-auto p-4 lg:p-6 space-y-8 h-full flex flex-col justify-center">

            {/* 1. HERO HEADER */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-8 border-b border-white/5">
                <div className="text-center lg:text-left">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-2">
                        Hub <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Logistico</span>
                    </h2>
                    <p className="text-gray-400 max-w-md text-sm">
                        Analisi dinamica delle connessioni. Tempi di percorrenza e infrastrutture chiave.
                    </p>
                </div>

                {/* Quick Toggle */}
                <div className="bg-white/5 p-1 rounded-xl flex w-full max-w-sm relative isolate">
                    {/* Animated Background Pill */}
                    <div className="absolute inset-1 pointer-events-none z-0">
                        <div className="w-full h-full relative">
                            <motion.div
                                layoutId="conn-active-pill"
                                className={`h-full w-1/2 rounded-lg shadow-lg absolute top-0 bottom-0 ${activeTab === 'commute' ? 'left-0 bg-blue-600' : 'left-1/2 bg-cyan-600'}`}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        </div>
                    </div>

                    <button
                        onClick={() => setActiveTab('commute')}
                        className={`flex-1 relative z-10 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${activeTab === 'commute' ? 'text-white' : 'text-gray-400 hover:text-white/80'}`}
                    >
                        <Navigation className="w-4 h-4" /> Smart Commute
                    </button>
                    <button
                        onClick={() => setActiveTab('grid')}
                        className={`flex-1 relative z-10 py-2.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all duration-200 ${activeTab === 'grid' ? 'text-white' : 'text-gray-400 hover:text-white/80'}`}
                    >
                        <Map className="w-4 h-4" /> Rete Trasporti
                    </button>
                </div>
            </div>

            {/* 2. DYNAMIC CONTENT */}
            <div className="flex-1 min-h-0 relative">
                <AnimatePresence mode="wait">
                    {activeTab === 'commute' ? (
                        <motion.div
                            key="commute"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <CommuteSmartView data={connectivity} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="grid"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <TransitBoard data={connectivity} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

        </div>
    );
};

export default ConnectivitySection;
