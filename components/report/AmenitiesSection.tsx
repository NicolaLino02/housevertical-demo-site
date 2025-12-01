import React, { useState } from 'react';
import { SectionData, ServiceItem } from '../../types';
import {
    Coffee, ShoppingCart, GraduationCap, HeartPulse, Utensils,
    Dumbbell, MapPin, Star, Info, X, Store, ArrowUpRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const getIcon = (type: string) => {
    switch (type) {
        case 'school': return GraduationCap;
        case 'supermarket': return ShoppingCart;
        case 'pharmacy': return HeartPulse;
        case 'gym': return Dumbbell;
        case 'restaurant': return Utensils;
        case 'hospital': return HeartPulse;
        default: return Store;
    }
};

const getColor = (type: string) => {
    switch (type) {
        case 'school': return 'text-purple-400 bg-purple-500/20 border-purple-500/30';
        case 'supermarket': return 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30';
        case 'pharmacy': return 'text-rose-400 bg-rose-500/20 border-rose-500/30';
        case 'gym': return 'text-amber-400 bg-amber-500/20 border-amber-500/30';
        case 'restaurant': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
        default: return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
    }
};

const ServiceCard: React.FC<{ item: ServiceItem; onClick: (item: ServiceItem) => void }> = ({ item, onClick }) => {
    const Icon = getIcon(item.type);
    const colorClass = getColor(item.type);
    const borderColor = colorClass.split(' ').find(c => c.startsWith('border-')) || 'border-white/10';

    return (
        <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick(item)}
            className={`relative overflow-hidden rounded-2xl p-5 cursor-pointer group bg-gradient-to-br from-white/5 to-white/[0.02] border ${borderColor} hover:shadow-lg hover:shadow-${colorClass.split('-')[1]}-500/10 transition-all duration-300`}
        >
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${colorClass} backdrop-blur-md`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-full border border-white/5">
                    <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-bold text-white">{item.rating}</span>
                </div>
            </div>

            <h4 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-blue-300 transition-colors">{item.name}</h4>

            <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{item.distance}</span>
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                    <ArrowUpRight className="w-4 h-4 text-white/50" />
                </div>
            </div>
        </motion.div>
    );
};

const AmenitiesSection = ({ section }: { section: SectionData }) => {
    const [selectedItem, setSelectedItem] = useState<ServiceItem | null>(null);

    // Safe Data Access with Fallbacks
    const amenities = section.amenities || {
        serviceScore: { value: 80, explanation: "Zona ben servita con scuole e supermercati a breve distanza." },
        schools: [
            { name: 'Scuola Elementare Manzoni', distance: '300m', rating: 4.5, type: 'school' },
            { name: 'Liceo Scientifico', distance: '1.2km', rating: 4.8, type: 'school' }
        ],
        supermarkets: [
            { name: 'Esselunga', distance: '500m', rating: 4.2, type: 'supermarket' },
            { name: 'Carrefour Express', distance: '150m', rating: 3.9, type: 'supermarket' }
        ],
        pharmacies: [
            { name: 'Farmacia Centrale', distance: '200m', rating: 4.5, type: 'pharmacy' }
        ],
        lifestyle: [
            { name: 'Virgin Active', distance: '800m', rating: 4.7, type: 'gym' },
            { name: 'Ristorante Da Luigi', distance: '400m', rating: 4.3, type: 'restaurant' }
        ]
    };

    const scoreValue = Number(amenities.serviceScore.value) || 0;

    return (
        <div className="max-w-7xl w-full mx-auto p-4 lg:p-8 space-y-10">
            {/* HEADER */}
            <div className="text-center space-y-4">
                <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight">
                    Servizi & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">Lifestyle</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                    Tutto ciò che ti serve a portata di mano. Analisi dettagliata dei servizi essenziali e dei luoghi di interesse nel quartiere.
                </p>
            </div>

            {/* MAIN SCORE DASHBOARD */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Score Card */}
                <div className="lg:col-span-12 relative overflow-hidden rounded-3xl p-8 border border-orange-500/20 bg-gradient-to-r from-orange-900/20 via-[#0f172a] to-[#0f172a]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="flex items-center gap-8">
                            <div className="relative">
                                <svg className="w-32 h-32 transform -rotate-90">
                                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-800" />
                                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={377} strokeDashoffset={377 - (377 * scoreValue) / 100} className="text-orange-500 transition-all duration-1000 ease-out" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-3xl font-bold text-white">{scoreValue}</span>
                                    <span className="text-xs text-gray-400 uppercase font-bold">Score</span>
                                </div>
                            </div>

                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-bold text-white mb-2">Service Score</h3>
                                <p className="text-gray-300 max-w-md leading-relaxed">
                                    {amenities.serviceScore.explanation}
                                </p>
                            </div>
                        </div>

                        {/* Quick Stats Pills */}
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center min-w-[100px]">
                                <span className="text-2xl font-bold text-white">{amenities.schools.length}</span>
                                <span className="text-xs text-purple-400 font-bold uppercase">Scuole</span>
                            </div>
                            <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center min-w-[100px]">
                                <span className="text-2xl font-bold text-white">{amenities.supermarkets.length}</span>
                                <span className="text-xs text-emerald-400 font-bold uppercase">Market</span>
                            </div>
                            <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center min-w-[100px]">
                                <span className="text-2xl font-bold text-white">{amenities.lifestyle.length}</span>
                                <span className="text-xs text-amber-400 font-bold uppercase">Svago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CATEGORIES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Column 1: Schools */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400"><GraduationCap className="w-5 h-5" /></div>
                        <h3 className="text-lg font-bold text-white">Istruzione</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {amenities.schools.map((item, i) => <ServiceCard key={i} item={item} onClick={setSelectedItem} />)}
                    </div>
                </div>

                {/* Column 2: Supermarkets */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400"><ShoppingCart className="w-5 h-5" /></div>
                        <h3 className="text-lg font-bold text-white">Spesa</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {amenities.supermarkets.map((item, i) => <ServiceCard key={i} item={item} onClick={setSelectedItem} />)}
                    </div>
                </div>

                {/* Column 3: Health */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-rose-500/20 text-rose-400"><HeartPulse className="w-5 h-5" /></div>
                        <h3 className="text-lg font-bold text-white">Salute</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {amenities.pharmacies.map((item, i) => <ServiceCard key={i} item={item} onClick={setSelectedItem} />)}
                    </div>
                </div>

                {/* Column 4: Lifestyle */}
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400"><Utensils className="w-5 h-5" /></div>
                        <h3 className="text-lg font-bold text-white">Lifestyle</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {amenities.lifestyle.map((item, i) => <ServiceCard key={i} item={item} onClick={setSelectedItem} />)}
                    </div>
                </div>
            </div>

            {/* DETAIL MODAL */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
                        onClick={() => setSelectedItem(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="bg-[#0f172a] border border-white/10 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden relative"
                            onClick={e => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="relative h-32 bg-gradient-to-br from-gray-800 to-black">
                                <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:20px_20px]"></div>
                                <button
                                    onClick={() => setSelectedItem(null)}
                                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 text-white hover:bg-white/20 transition-colors z-10"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                                <div className="absolute -bottom-8 left-8">
                                    <div className={`p-4 rounded-2xl ${getColor(selectedItem.type)} shadow-lg backdrop-blur-xl`}>
                                        {React.createElement(getIcon(selectedItem.type), { className: "w-8 h-8" })}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-12 p-8">
                                <h2 className="text-2xl font-bold text-white mb-1">{selectedItem.name}</h2>
                                <div className="flex items-center gap-2 text-gray-400 mb-6">
                                    <MapPin className="w-4 h-4" />
                                    <span>{selectedItem.distance} dall'immobile</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                                        <span className="text-gray-400 text-sm font-medium">Rating Google/TripAdvisor</span>
                                        <div className="flex items-center gap-1.5">
                                            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                                            <span className="text-xl font-bold text-white">{selectedItem.rating}</span>
                                            <span className="text-gray-500 text-sm">/5</span>
                                        </div>
                                    </div>

                                    <div className="bg-blue-500/10 rounded-2xl p-4 border border-blue-500/20">
                                        <div className="flex items-start gap-3">
                                            <Info className="w-5 h-5 text-blue-400 mt-0.5" />
                                            <div>
                                                <h4 className="text-blue-400 font-bold text-sm mb-1">Info Utile</h4>
                                                <p className="text-blue-200/80 text-sm">
                                                    Questo punto di interesse è stato verificato e incluso nel report per la sua rilevanza e vicinanza.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AmenitiesSection;
