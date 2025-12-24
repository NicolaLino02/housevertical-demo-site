import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Mail, ShieldCheck, Heart } from 'lucide-react';

interface AboutPageProps {
    onBack: () => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ onBack }) => {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            {/* 1. Header / Navigation */}
            <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
                <div className="max-w-4xl mx-auto px-6 h-20 flex items-center">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="text-sm font-medium">Torna alla Home</span>
                    </button>
                </div>
            </nav>

            {/* 2. Content Container */}
            <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">

                {/* Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                        <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Manifesto</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                        Perché <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Esistiamo</span>.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 leading-relaxed font-light">
                        Il mercato immobiliare è pieno di dati. Ma è povero di <strong>verità</strong>.
                    </p>
                </motion.div>

                {/* Narrative Sections */}
                <div className="space-y-24 border-l-2 border-white/5 pl-8 md:pl-12 relative">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -left-[41px] md:-left-[57px] top-0 w-5 h-5 rounded-full bg-[#050505] border-2 border-gray-700" />
                        <h2 className="text-3xl font-bold mb-4 text-white">Il Problema dell'Opacità</h2>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            Oggi, comprare o vendere casa è come guidare nella nebbia. Ti affidi a stime, "sentito dire" e valutazioni che spesso ignorano il 50% dei fattori reali. Quanto vale davvero il silenzio di una strada? O la sicurezza di un quartiere alle 10 di sera? Questi dati esistono, ma sono nascosti.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -left-[41px] md:-left-[57px] top-0 w-5 h-5 rounded-full bg-[#050505] border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]" />
                        <h2 className="text-3xl font-bold mb-4 text-white">La Nostra Visione</h2>
                        <p className="text-lg text-gray-400 leading-relaxed">
                            HouseVertical nasce con un solo scopo: <strong>portare luce</strong>. Utilizziamo l'Intelligenza Artificiale non per sostituire l'uomo, ma per potenziarlo. Aggreghiamo milioni di datapoint apparentemente invisibili — crimine, demografia, ambiente, urbanistica — per restituire l'unica cosa che conta: il Valore Reale.
                        </p>
                    </motion.div>

                    {/* Social Proof / Team */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="absolute -left-[41px] md:-left-[57px] top-0 w-5 h-5 rounded-full bg-[#050505] border-2 border-purple-500" />
                        <h2 className="text-3xl font-bold mb-8 text-white">Chi sta costruendo questo futuro?</h2>

                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-colors group">
                                <div className="mb-4 w-12 h-12 rounded-full bg-gray-800 overflow-hidden">
                                    <img src="/assets/founders/nicola_linoti.png" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                </div>
                                <h3 className="text-xl font-bold mb-1">Nicola Linoti</h3>
                                <p className="text-sm text-blue-400 font-mono uppercase mb-3">Vision & Strategy</p>
                                <p className="text-sm text-gray-400">"Non stiamo costruendo un sito web. Stiamo costruendo l'infrastruttura di verità del mercato immobiliare."</p>
                            </div>

                            <div className="bg-white/5 p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors group">
                                <div className="mb-4 w-12 h-12 rounded-full bg-gray-800 overflow-hidden">
                                    <img src="/assets/founders/samuele_pintus.png" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" />
                                </div>
                                <h3 className="text-xl font-bold mb-1">Samuele Pintus</h3>
                                <p className="text-sm text-purple-400 font-mono uppercase mb-3">Technology & Data</p>
                                <p className="text-sm text-gray-400">"Ogni dato è una storia. Il nostro compito è ascoltare tutte le storie di un immobile, contemporaneamente."</p>
                            </div>
                        </div>
                    </motion.div>

                </div>

                {/* 3. Protected Contact Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 p-8 md:p-12 rounded-3xl bg-gradient-to-br from-blue-900/20 to-purple-900/20 border border-white/10 text-center relative overflow-hidden"
                >
                    {/* Background Glows */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 blur-[80px] rounded-full" />

                    <ShieldCheck className="w-12 h-12 text-blue-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-6">Credi in questa visione?</h2>
                    <p className="text-gray-300 max-w-lg mx-auto mb-8">
                        Non siamo qui per vendere a tutti. Siamo qui per costruire con chi comprende la portata di questa rivoluzione. Investitori, Partner, Visionari: se siete pronti, noi lo siamo.
                    </p>

                    <div className="inline-flex flex-col items-center">
                        <span className="text-xs text-gray-500 font-mono mb-2 uppercase tracking-widest">Canale Diretto Fondatori</span>
                        <a
                            href="mailto:info@housevertical.it"
                            className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-blue-50 transition-colors flex items-center gap-2"
                        >
                            <Mail className="w-4 h-4" />
                            info@housevertical.it
                        </a>
                        <p className="text-[10px] text-gray-600 mt-3 max-w-xs">
                            * Email protetta e monitorata direttamente dai founder. No spam, solo Business & Partnership.
                        </p>
                    </div>

                </motion.div>

            </div>
        </div>
    );
};

export default AboutPage;
