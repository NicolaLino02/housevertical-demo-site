import React from 'react';
import { Bus, Train, Plane, Car, ArrowUpRight, Clock, Info } from 'lucide-react';

interface TransitBoardProps {
    data: any;
}

const TransitBoard = ({ data }: TransitBoardProps) => {
    const lines = data.transitLines || [];
    const airports = data.airports || [];
    const highways = data.highways || [];

    const getIcon = (type: string) => {
        switch (type.toLowerCase()) {
            case 'bus': return <Bus className="w-4 h-4" />;
            case 'train': case 'metro': case 'tram': return <Train className="w-4 h-4" />;
            case 'plane': case 'airport': return <Plane className="w-4 h-4" />;
            case 'car': case 'highway': return <Car className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const getColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'metro': return 'text-red-400 bg-red-500/10 border-red-500/20 shadow-red-500/10';
            case 'bus': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
            case 'tram': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
            default: return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
        }
    };

    return (
        <div className="h-full flex flex-col gap-6">

            {/* HEADER STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <div className="text-2xl font-bold text-white">{lines.length}</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Linee Urbane</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <div className="text-2xl font-bold text-white">{airports.length}</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Aeroporti</div>
                </div>
                <div className="bg-white/5 border border-white/5 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <div className="text-2xl font-bold text-white">{highways.length}</div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Autostrade</div>
                </div>
                <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-xl p-3 flex flex-col items-center justify-center text-center">
                    <div className="text-xl font-bold text-emerald-400">Ottima</div>
                    <div className="text-[10px] text-emerald-200/60 uppercase tracking-wider">Copertura</div>
                </div>
            </div>

            {/* MAIN CONTENT GRID */}
            <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LEFT: URBAN LINES (DENSE) */}
                <div className="lg:col-span-7 bg-[#0f172a] border border-white/10 rounded-2xl overflow-hidden flex flex-col">
                    <div className="p-4 border-b border-white/10 bg-white/5 flex justify-between items-center">
                        <h3 className="text-white font-bold text-sm flex items-center gap-2">
                            <Train className="w-4 h-4 text-blue-400" /> Trasporto Locale
                        </h3>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Stop Vicini</span>
                    </div>

                    <div className="overflow-y-auto custom-scrollbar p-2 space-y-2">
                        {lines.map((line: any, idx: number) => {
                            const style = getColor(line.type);
                            return (
                                <div key={idx} className="bg-white/5 border border-white/5 p-3 rounded-lg flex items-center justify-between group hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center border shrink-0 ${style} shadow-lg`}>
                                            {getIcon(line.type)}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h4 className="text-white font-bold text-sm">{line.name}</h4>
                                                <span className="text-[10px] text-gray-400 bg-black/20 px-1.5 py-px rounded">{line.distance}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                                {line.destinations?.slice(0, 2).join(' • ')}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xs font-mono text-gray-300">{line.frequency}</div>
                                        <div className="text-[10px] text-gray-600">Frequenza</div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* RIGHT: EXTRA URBAN */}
                <div className="lg:col-span-5 flex flex-col gap-6">

                    {/* AIRPORTS */}
                    <div className="bg-blue-900/10 border border-blue-500/10 rounded-2xl p-4 flex-1">
                        <h3 className="text-blue-300 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Plane className="w-4 h-4" /> Collegamenti Aerei
                        </h3>
                        <div className="space-y-3">
                            {airports.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-3 bg-blue-900/20 rounded-xl border border-blue-500/10">
                                    <div>
                                        <div className="text-white font-bold text-sm">{item.name}</div>
                                        <div className="text-xs text-blue-200/50">{item.distance} dal centro</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-blue-400 font-bold text-lg leading-none">{item.time}</div>
                                        <div className="text-[10px] text-blue-300/50 uppercase">Auto</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* HIGHWAYS */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex-1">
                        <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                            <Car className="w-4 h-4 text-white" /> Grande Viabilità
                        </h3>
                        <div className="space-y-3">
                            {highways.map((item: any, idx: number) => (
                                <div key={idx} className="flex items-center justify-between p-2 pb-3 border-b border-white/5 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-6 bg-emerald-600 rounded text-center text-white text-[10px] font-bold leading-6 shrink-0 shadow-lg shadow-emerald-900/50">A{idx + 1}</div>
                                        <span className="text-gray-300 text-sm font-medium">{item.name}</span>
                                    </div>
                                    <div className="text-white font-bold text-sm">{item.distance}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default TransitBoard;
