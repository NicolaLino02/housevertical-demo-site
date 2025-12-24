import React from 'react';
import { ResponsiveContainer, RadialBarChart, RadialBar, Legend } from 'recharts';
import { ShieldCheck, ShieldAlert, AlertTriangle } from 'lucide-react';

interface LegalRadarProps {
    data: any;
}

const LegalRadar = ({ data }: LegalRadarProps) => {
    // Mock/Infer Risk Scores (0-100, where 100 is Safe)
    const zoningScore = data.zoning?.value?.includes('Residenziale') ? 100 : 70;
    const cadastralScore = data.cadastral?.category ? 90 : 50;
    const permitScore = data.permits?.every((p: any) => p.status === 'Verificato') ? 100 : 60;

    const chartData = [
        { name: 'Urbanistica', uv: zoningScore, fill: '#10b981' },
        { name: 'Catasto', uv: cadastralScore, fill: '#3b82f6' },
        { name: 'Agibilità', uv: permitScore, fill: '#f59e0b' },
    ];

    const overallScore = Math.round((zoningScore + cadastralScore + permitScore) / 3);
    const isSafe = overallScore > 80;

    return (
        <div className="h-full bg-[#1e293b] border border-slate-700/50 rounded-[24px] p-6 relative flex flex-col items-center justify-between shadow-2xl overflow-hidden">
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-grid-slate-700/[0.1] pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 w-full flex items-center justify-between mb-2">
                <div>
                    <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> Profilo di Rischio
                    </h4>
                </div>
                <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${isSafe ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
                    {isSafe ? 'Basso Rischio' : 'Attenzione'}
                </div>
            </div>

            {/* Chart */}
            <div className="relative w-full h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart
                        innerRadius="30%"
                        outerRadius="100%"
                        barSize={10}
                        data={chartData}
                        startAngle={180}
                        endAngle={0}
                    >
                        <RadialBar dataKey="uv" background cornerRadius={10} />
                    </RadialBarChart>
                </ResponsiveContainer>

                {/* Center Score */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[20%] text-center">
                    <div className="text-4xl font-mono font-bold text-white">{overallScore}%</div>
                    <div className="text-[10px] text-slate-500 uppercase">Compliance</div>
                </div>
            </div>

            {/* Legend / Key Items */}
            <div className="w-full space-y-3 relative z-10 mt-2">
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" /> Urbanistica
                    </div>
                    <span className="font-mono text-emerald-400">{zoningScore}%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-blue-500" /> Catasto
                    </div>
                    <span className="font-mono text-blue-400">{cadastralScore}%</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                        <div className="w-2 h-2 rounded-full bg-amber-500" /> Agibilità
                    </div>
                    <span className="font-mono text-amber-400">{permitScore}%</span>
                </div>
            </div>

        </div>
    );
};

export default LegalRadar;
