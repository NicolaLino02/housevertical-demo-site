import React from 'react';
import { Home, Heart, ThumbsDown, Star } from 'lucide-react';
import ScoreRing from '../ScoreRing';

const VerdictResidentLayout = ({ data, reportData }: any) => {

    // Scores
    const score = data.finalScore?.value || 0;
    const label = data.finalScore?.label || "Vivibilità";
    const pros = data.pros || [];
    const cons = data.cons || [];

    return (
        <div className="flex flex-col lg:flex-row gap-8 items-center h-full">

            {/* LEFT: Central Score with "Home" Vibe */}
            <div className="lg:w-1/2 flex flex-col items-center">
                <div className="relative mb-6">
                    <div className="absolute inset-0 bg-blue-500/20 blur-[80px] rounded-full" />
                    <div className="scale-90">
                        <ScoreRing score={score} label={label} color="#60a5fa" />
                    </div>
                </div>
                <div className="text-center max-w-sm">
                    <h3 className="text-3xl lg:text-4xl font-bold text-white mb-2">"{data.buyStrategy?.title || 'Analisi Residenziale'}"</h3>
                    <p className="text-blue-200/60 text-sm leading-relaxed">
                        {data.buyStrategy?.description || "Valutazione basata su comfort, servizi e qualità dell'abitare."}
                    </p>
                </div>
            </div>

            {/* RIGHT: Pros & Cons Cards */}
            <div className="lg:w-1/2 space-y-4">

                {/* PROS CARD */}
                <div className="bg-gradient-to-r from-blue-500/10 to-transparent p-5 rounded-2xl border border-blue-500/20">
                    <h4 className="flex items-center gap-2 text-blue-400 font-bold mb-3 text-sm">
                        <Heart className="w-4 h-4 fill-blue-400/20" /> Cosa amerai
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {pros.slice(0, 3).map((p: string, i: number) => (
                            <span key={i} className="px-2 py-1 rounded-full bg-blue-500/20 text-white text-xs">{p}</span>
                        ))}
                        {pros.length === 0 && <span className="text-xs text-gray-500">Dati insufficienti</span>}
                    </div>
                </div>

                {/* CONS CARD */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/10">
                    <h4 className="flex items-center gap-2 text-slate-400 font-bold mb-3 text-sm">
                        <ThumbsDown className="w-4 h-4" /> Da considerare
                    </h4>
                    <ul className="space-y-2 text-xs text-slate-400">
                        {cons.slice(0, 3).map((c: string, i: number) => (
                            <li key={i} className="flex gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1" />
                                {c}
                            </li>
                        ))}
                        {cons.length === 0 && <li>Nessuna criticità rilevata</li>}
                    </ul>
                </div>

            </div>

        </div>
    );
};

export default VerdictResidentLayout;
