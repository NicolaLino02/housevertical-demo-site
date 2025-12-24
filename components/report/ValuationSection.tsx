import React, { useState } from 'react';
import { SectionData, ReportData } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import SellerView from './valuation/SellerView';
import BuyerView from './valuation/BuyerView';

const ValuationSection = ({ section, data }: { section: SectionData, data: ReportData }) => {
    const [viewMode, setViewMode] = useState<'seller' | 'buyer'>('seller');

    // Safe Data Extraction (Deep safety check)
    const valuationData = section.valuation || {
        saleStrategy: { marketPrice: { price: 0 } },
        buyStrategy: { idealPrice: 0 }
    };
    // Inject comparables from data root if missing in section
    // Inject comparables from data root if missing in section
    if (!(valuationData as any).comparables && data.sections?.market_comps?.details) {
        (valuationData as any).comparables = data.sections.market_comps.details;
    }


    return (
        <div className="max-w-7xl w-full mx-auto p-2 md:p-6 space-y-4 md:space-y-6 h-full flex flex-col justify-center">

            {/* 1. HEADER & NAVIGATION */}
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 md:gap-6 flex-none pb-4 border-b border-white/5">
                <div className="w-full md:w-auto text-center md:text-left">
                    <h2 className="text-3xl lg:text-5xl font-bold tracking-tight mb-2">
                        Valutazione <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Strategica</span>
                    </h2>
                    <p className="text-gray-400 max-w-lg text-sm mx-auto md:mx-0">
                        Ecosistema di analisi immobiliare predittiva. Seleziona il tuo obiettivo.
                    </p>
                </div>

                {/* Advanced Toggle - RESPONSIVE WIDTH */}
                <div className="w-full md:w-72 bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex relative shadow-2xl">
                    <motion.div
                        className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] rounded-xl shadow-lg border border-white/10 ${viewMode === 'seller' ? 'bg-blue-600 left-1.5' : 'bg-emerald-600 right-1.5'}`}
                        layoutId="active-pill"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                    <button
                        onClick={() => setViewMode('seller')}
                        className={`flex-1 relative z-10 py-2.5 text-sm font-bold transition-all ${viewMode === 'seller' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        Vendi Casa
                    </button>
                    <button
                        onClick={() => setViewMode('buyer')}
                        className={`flex-1 relative z-10 py-2.5 text-sm font-bold transition-all ${viewMode === 'buyer' ? 'text-white' : 'text-gray-400 hover:text-white'}`}
                    >
                        Compra Casa
                    </button>
                </div>
            </div>

            {/* 2. MAIN DASHBOARD CONTENT */}
            <div className="flex-1 min-h-0 relative">
                <AnimatePresence mode="wait">
                    {viewMode === 'seller' ? (
                        <motion.div
                            key="seller"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <SellerView data={valuationData} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="buyer"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="h-full"
                        >
                            <BuyerView data={valuationData} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* 3. FOOTER INFO - Removed as requested */}
        </div>
    );
};

export default ValuationSection;
