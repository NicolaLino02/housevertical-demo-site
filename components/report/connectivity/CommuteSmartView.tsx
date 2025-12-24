import React, { useState } from 'react';
import { Clock, MapPin, Navigation, Car, Train, Bus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommuteSmartViewProps {
    data: any;
}

const CommuteSmartView = ({ data }: CommuteSmartViewProps) => {
    const [maxTime, setMaxTime] = useState(30);

    // Safe Data
    const score = data.mobilityScore?.value || 85;
    const commuteTimes = data.commuteTimes || [
        { destination: 'Centro Città', time: '15 min', mode: 'Metro', minutes: 15 },
        { destination: 'Stazione Centrale', time: '20 min', mode: 'Bus', minutes: 20 },
        { destination: 'Business District', time: '30 min', mode: 'Auto', minutes: 30 },
        { destination: 'Aeroporto', time: '45 min', mode: 'Treno', minutes: 45 },
    ];

    // Parse strings to numbers if needed
    const parsedCommute = commuteTimes.map((c: any) => ({
        ...c,
        minutes: typeof c.minutes === 'number' ? c.minutes : parseInt(c.time)
    }));

    const reachableDestinations = parsedCommute.filter((c: any) => c.minutes <= maxTime);
    const unreachableDestinations = parsedCommute.filter((c: any) => c.minutes > maxTime);

    const getIcon = (mode: string) => {
        const m = mode.toLowerCase();
        if (m.includes('metro') || m.includes('treno')) return <Train className="w-5 h-5" />;
        if (m.includes('bus')) return <Bus className="w-5 h-5" />;
        return <Car className="w-5 h-5" />;
    };

    return (
        <div className="flex flex-col gap-6 h-full">

            {/* TOP CONTROL BAR: Score + Slider */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

                {/* COMPACT SCORE */}
                <div className="lg:col-span-3 bg-[#0f172a] border border-blue-500/20 rounded-2xl p-4 flex items-center justify-between relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-600/10 blur-xl" />
                    <div className="relative z-10 flex flex-col">
                        <span className="text-[10px] text-blue-400 uppercase font-bold tracking-wider">Mobility Score</span>
                        <span className="text-4xl font-bold text-white">{score}<span className="text-sm text-gray-500">/100</span></span>
                    </div>
                    <div className="relative z-10 w-12 h-12 rounded-full border-4 border-blue-500/20 flex items-center justify-center">
                        <Navigation className="w-5 h-5 text-blue-400" />
                    </div>
                </div>

                {/* SLIDER CONTROLS */}
                <div className="lg:col-span-9 bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col md:flex-row items-center gap-6">
                    <div className="flex items-center gap-3 shrink-0">
                        <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-white font-bold text-sm">Budget Tempo</h4>
                            <div className="text-blue-400 font-bold text-lg leading-none">{maxTime} min</div>
                        </div>
                    </div>

                    <div className="flex-1 w-full relative px-2">
                        <input
                            type="range"
                            min="10"
                            max="60"
                            step="5"
                            value={maxTime}
                            onChange={(e) => setMaxTime(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-mono">
                            <span>10m</span>
                            <span className="text-white font-bold">Entro {maxTime} min</span>
                            <span>60m</span>
                        </div>
                    </div>

                    <div className="shrink-0 text-center px-4 border-l border-white/10 hidden md:block">
                        <span className="text-2xl font-bold text-white block">{reachableDestinations.length}</span>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Raggiungibili</span>
                    </div>
                </div>
            </div>

            {/* BOTTOM: DESTINATION GRID (DENSE) */}
            <div className="flex-1 bg-white/5 border border-white/10 rounded-3xl p-6 overflow-hidden flex flex-col">
                <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" /> Destinazioni nel Raggio Selezionato
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto pr-2 custom-scrollbar">
                    <AnimatePresence mode="popLayout">
                        {parsedCommute.map((dest: any, idx: number) => {
                            const isReachable = dest.minutes <= maxTime;
                            return (
                                <motion.div
                                    key={idx}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{
                                        opacity: isReachable ? 1 : 0.4,
                                        scale: 1,
                                        filter: isReachable ? 'grayscale(0%)' : 'grayscale(100%)',
                                        y: isReachable ? 0 : 0 // Keep sort logic simple for now
                                    }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.2 }}
                                    className={`p-4 rounded-xl border transition-all relative overflow-hidden group ${isReachable ? 'bg-blue-900/10 border-blue-500/20 hover:border-blue-500/50' : 'bg-white/5 border-white/5 order-last'}`}
                                >
                                    {isReachable && <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-full blur-xl translate-x-4 -translate-y-4 group-hover:bg-blue-500/20 transition-colors" />}

                                    <div className="flex items-center gap-3 relative z-10">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isReachable ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-gray-800 text-gray-500'}`}>
                                            {getIcon(dest.mode)}
                                        </div>
                                        <div>
                                            <h4 className={`font-bold text-sm leading-tight mb-0.5 ${isReachable ? 'text-white' : 'text-gray-500'}`}>{dest.destination}</h4>
                                            <div className={`text-xs font-bold ${isReachable ? 'text-blue-400' : 'text-gray-600'}`}>
                                                {dest.time} • {dest.mode}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>

        </div>
    );
};

export default CommuteSmartView;
