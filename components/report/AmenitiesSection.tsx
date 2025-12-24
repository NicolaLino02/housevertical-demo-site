import React, { useState } from 'react';
import { SectionData } from '../../types';
import ServicesRadar from './amenities/ServicesRadar';
import LifestyleGrid from './amenities/LifestyleGrid';
import { AnimatePresence, motion } from 'framer-motion';
import { X, MapPin, Star, ArrowUpRight } from 'lucide-react';

const AmenitiesSection = ({ section }: { section: SectionData }) => {
    const [selectedCategory, setSelectedCategory] = useState<any>(null);

    // Safe Data
    const amenities = section.amenities || {};

    const getThemeColors = (theme: string) => {
        switch (theme) {
            case 'purple': return { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400', gradient: 'from-purple-600 to-indigo-700' };
            case 'emerald': return { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400', gradient: 'from-emerald-500 to-teal-700' };
            case 'orange': return { bg: 'bg-orange-500/10', border: 'border-orange-500/20', text: 'text-orange-400', gradient: 'from-orange-400 to-rose-600' };
            default: return { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400', gradient: 'from-blue-600 to-cyan-700' };
        }
    };

    return (
        <div className="max-w-7xl w-full mx-auto p-4 lg:p-6 h-full flex flex-col justify-center relative">

            {/* HER0 HEADER (Minimal) */}
            <div className="mb-8 pl-2">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-2">
                    Vivi il <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Quartiere</span>
                </h2>
                <p className="text-gray-400 text-sm max-w-lg">
                    Una panoramica immersiva dei servizi. Istruzione, shopping e lifestyle a portata di mano.
                </p>
            </div>

            {/* BENTO GRID LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-full min-h-[500px]">

                {/* 1. SCORE HERO WIDGET */}
                <div className="h-full">
                    <ServicesRadar data={amenities} />
                </div>

                {/* 2, 3, 4. CATEGORY WIDGETS */}
                <LifestyleGrid data={amenities} onCategoryClick={setSelectedCategory} />

            </div>

            {/* DETAIL MODAL OVERLAY */}
            <AnimatePresence>
                {selectedCategory && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-8">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                            onClick={() => setSelectedCategory(null)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            layoutId={`card-${selectedCategory.theme}`}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-[#0f172a] border border-white/10 rounded-[32px] w-full max-w-2xl max-h-[85vh] relative z-10 overflow-hidden flex flex-col shadow-2xl"
                        >
                            {/* Modal Header */}
                            <div className={`relative p-8 pb-12 bg-gradient-to-br ${getThemeColors(selectedCategory.theme).gradient}`}>
                                <button
                                    onClick={() => setSelectedCategory(null)}
                                    className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 rounded-full text-white transition-colors backdrop-blur-md"
                                >
                                    <X className="w-5 h-5" />
                                </button>

                                <h2 className="text-4xl font-bold text-white mb-2">{selectedCategory.title}</h2>
                                <p className="text-white/80 font-medium">Esplora tutti i punti di interesse in zona.</p>
                            </div>

                            {/* Modal List */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-6 pt-12 space-y-4 -mt-8 bg-[#0f172a] rounded-t-[32px] relative z-20">
                                {selectedCategory.items.map((item: any, idx: number) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center justify-between group hover:bg-white/10 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getThemeColors(selectedCategory.theme).bg} ${getThemeColors(selectedCategory.theme).text}`}>
                                                <MapPin className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-base group-hover:text-blue-300 transition-colors">{item.name}</h4>
                                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                                    <span>{item.distance}</span>
                                                    <span>•</span>
                                                    <span>{item.type}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-lg border border-yellow-500/20 mb-1">
                                                <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                                                <span className="text-sm font-bold text-yellow-500">{item.rating}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}

                                <div className="pt-8 pb-4 text-center">
                                    <p className="text-gray-500 text-xs">
                                        Tutti i dati sono verificati e aggiornati al {new Date().getFullYear()}.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default AmenitiesSection;
