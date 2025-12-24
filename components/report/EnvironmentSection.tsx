import React, { useState } from 'react';
import { SectionData } from '../../types';
import { Wind, TreePine, Volume2, Droplets, ArrowRight, Activity, Cloud, Waves } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EnvironmentSection = ({ section }: { section: SectionData }) => {
    const [expandedLayer, setExpandedLayer] = useState<string | null>('air');

    // Helper to find details
    const findDetail = (key: string) => section.details?.find(d => d.label.toLowerCase().includes(key.toLowerCase()));

    // Layer Configuration (The Biome Stack)
    const layers = [
        {
            id: 'air',
            label: 'Qualità Aria',
            subLabel: 'Livello PM10 / PM2.5',
            value: findDetail('Aria')?.value || 'N/D',
            score: 92,
            icon: Wind,
            theme: {
                text: 'text-cyan-400',
                border: 'border-cyan-500/30',
                bg: 'bg-cyan-950/30',
                gradient: 'from-cyan-500/20',
                decoration: <Cloud className="w-64 h-64 text-cyan-400/5 absolute -right-10 -top-10" />
            },
            details: "L'area beneficia di ventilazione costante. I livelli di particolato sono costantemente sotto la media cittadina."
        },
        {
            id: 'noise',
            label: 'Inquinamento Acustico',
            subLabel: 'Decibel Medi Diurni',
            value: findDetail('Acustico')?.value || 'N/D',
            score: 85,
            icon: Volume2,
            theme: {
                text: 'text-purple-400',
                border: 'border-purple-500/30',
                bg: 'bg-purple-950/30',
                gradient: 'from-purple-500/20',
                decoration: <Activity className="w-64 h-64 text-purple-400/5 absolute -right-10 -top-10" />
            },
            details: "Zona residenziale protetta dal traffico pesante. Silenzio notturno garantito dalla distanza dalle arterie principali."
        },
        {
            id: 'green',
            label: 'Verde Urbano',
            subLabel: 'Parchi & Alberature',
            value: findDetail('Verdi')?.value || 'N/D',
            score: 78,
            icon: TreePine,
            theme: {
                text: 'text-emerald-400',
                border: 'border-emerald-500/30',
                bg: 'bg-emerald-950/30',
                gradient: 'from-emerald-500/20',
                decoration: <TreePine className="w-64 h-64 text-emerald-400/5 absolute -right-10 -top-10" />
            },
            details: "Accesso diretto a 2 parchi comunali entro 500m. Viali alberati presenti nel 60% delle strade limitrofe."
        },
        {
            id: 'hydro',
            label: 'Rischio Idrogeologico',
            subLabel: 'Sicurezza & Drenaggio',
            value: findDetail('Idro')?.value || 'N/D',
            score: 95,
            icon: Droplets,
            theme: {
                text: 'text-blue-400',
                border: 'border-blue-500/30',
                bg: 'bg-blue-950/30',
                gradient: 'from-blue-500/20',
                decoration: <Waves className="w-64 h-64 text-blue-400/5 absolute -right-10 -top-10" />
            },
            details: "Area situata su terreno stabile e non alluvionabile. Sistema fognario recentemente potenziato."
        }
    ];

    return (
        <div className="max-w-7xl w-full mx-auto p-4 lg:p-6 h-full flex flex-col justify-center min-h-[600px]">

            {/* HEADER */}
            <div className="mb-8 flex items-end justify-between border-b border-white/5 pb-4">
                <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-1">
                        Analisi <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Ambientale</span>
                    </h2>
                    <p className="text-slate-400 text-sm max-w-xl">
                        Scansione degli strati ambientali: aria, suono, natura e sicurezza idrogeologica.
                    </p>
                </div>
                <div className="hidden md:block">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">Bio-Metric Layering V2.0</span>
                </div>
            </div>

            {/* THE BIOME STACK (Interactive Accordion Layers) */}
            <div className="flex flex-col gap-3">
                {layers.map((layer) => {
                    const isExpanded = expandedLayer === layer.id;

                    return (
                        <motion.div
                            key={layer.id}
                            layout
                            onClick={() => setExpandedLayer(isExpanded ? null : layer.id)}
                            className={`relative overflow-hidden rounded-2xl border cursor-pointer transition-colors duration-500 ${isExpanded ? `${layer.theme.bg} ${layer.theme.border}` : 'bg-slate-900/50 border-white/5 hover:border-white/10'}`}
                        >
                            {/* Decorative Background Icon */}
                            {isExpanded && layer.theme.decoration}

                            {/* Content */}
                            <div className="p-4 lg:p-6 relative z-10">
                                <div className="flex items-center justify-between">

                                    {/* Left: Icon & Label */}
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-xl backdrop-blur-md border border-white/5 ${isExpanded ? 'bg-white/10' : 'bg-white/5'}`}>
                                            <layer.icon className={`w-6 h-6 ${layer.theme.text}`} />
                                        </div>
                                        <div>
                                            <h3 className={`font-bold text-lg ${isExpanded ? 'text-white' : 'text-slate-300'}`}>{layer.label}</h3>
                                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">{layer.subLabel}</p>
                                        </div>
                                    </div>

                                    {/* Right: Value & Score */}
                                    <div className="flex items-center gap-6">
                                        <div className="text-right">
                                            <p className={`text-xl font-bold ${layer.theme.text}`}>{layer.value}</p>
                                        </div>
                                        {/* Animated Bar Graph (Mini) */}
                                        <div className="hidden md:flex gap-1 items-end h-8 w-16 opacity-50">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <div key={i} className={`w-2 rounded-t-sm ${layer.theme.bg.replace('/30', '')} transition-all duration-500`} style={{ height: `${Math.random() * 100}%`, backgroundColor: layer.theme.text.replace('text-', '') }} />
                                            ))}
                                        </div>
                                        <motion.div animate={{ rotate: isExpanded ? 90 : 0 }}>
                                            <ArrowRight className={`w-5 h-5 ${isExpanded ? layer.theme.text : 'text-slate-600'}`} />
                                        </motion.div>
                                    </div>

                                </div>

                                {/* EXPANDED DETAILS */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                            animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                            className="border-t border-white/10 pt-6"
                                        >
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                                <div>
                                                    <h4 className={`text-xs font-bold uppercase tracking-widest mb-2 ${layer.theme.text}`}>Dettaglio Rilevazione</h4>
                                                    <p className="text-slate-300 leading-relaxed text-sm">
                                                        {layer.details}
                                                    </p>
                                                </div>
                                                <div className="flex items-center justify-between bg-black/20 rounded-xl p-4 border border-white/5">
                                                    <div>
                                                        <span className="text-xs text-slate-400 block mb-1">Punteggio Settoriale</span>
                                                        <span className="text-3xl font-bold text-white">{layer.score}<span className="text-base text-slate-500 font-normal">/100</span></span>
                                                    </div>
                                                    <div className="h-12 w-12 rounded-full border-4 border-white/10 flex items-center justify-center relative">
                                                        <div className={`absolute inset-0 rounded-full border-4 ${layer.theme.border.replace('border-', 'border-t-')} rotate-45`} />
                                                        <layer.icon className={`w-5 h-5 ${layer.theme.text}`} />
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Animated Scanner Line (Bottom of card) */}
                            {isExpanded && (
                                <motion.div
                                    layoutId="activeGlow"
                                    className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${layer.theme.gradient} to-transparent`}
                                />
                            )}
                        </motion.div>
                    );
                })}
            </div>

            {/* SUMMARY FOOTER */}
            <div className="mt-6 flex items-start gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <TreePine className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-white mb-1">Sintesi Ecosistema</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        La zona presenta ottimi indicatori di vivibilità, con una buona presenza di aree verdi e livelli di inquinamento contenuti. Ideale per chi cerca un equilibrio tra urbanizzazione e natura.
                    </p>
                </div>
            </div>

        </div>
    );
};

export default EnvironmentSection;
