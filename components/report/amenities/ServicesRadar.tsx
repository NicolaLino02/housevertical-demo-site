import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Sparkles, GraduationCap, HeartPulse, ShoppingCart, Utensils, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface ServicesRadarProps {
    data: any;
}

const ServicesRadar = ({ data }: ServicesRadarProps) => {
    const schools = data.schools || [];
    const supermarkets = data.supermarkets || [];
    const pharmacies = data.pharmacies || [];
    const lifestyle = data.lifestyle || [];

    const chartData = [
        { subject: 'Scuole', A: Math.min(schools.length * 30, 95), fullMark: 100 },
        { subject: 'Salute', A: Math.min(pharmacies.length * 40, 90), fullMark: 100 },
        { subject: 'Shop', A: Math.min(supermarkets.length * 30, 85), fullMark: 100 },
        { subject: 'Food', A: Math.min(lifestyle.length * 25, 98), fullMark: 100 },
        { subject: 'Verde', A: 75, fullMark: 100 },
    ];

    const score = data.serviceScore?.value || 80;

    return (
        <div className="h-full bg-gradient-to-br from-gray-900 to-black rounded-[32px] p-6 relative overflow-hidden text-white flex flex-col items-center justify-between border border-white/5 shadow-2xl">

            {/* Background Glow */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.03]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px]" />

            {/* Header */}
            <div className="relative z-10 w-full flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 bg-indigo-500 rounded-lg">
                            <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Quartiere</span>
                    </div>
                    <h3 className="text-xl font-bold leading-tight">Analisi<br />Copertura</h3>
                </div>
                <div className="text-right">
                    <div className="text-5xl font-bold tracking-tighter">{score}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase">Score</div>
                </div>
            </div>

            {/* Radar Chart (Compact) */}
            <div className="relative z-10 w-full h-[180px] my-4">
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
                        <PolarGrid stroke="#6366f1" strokeOpacity={0.2} />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#a5b4fc', fontSize: 10, fontWeight: 700 }} />
                        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar name="Zona" dataKey="A" stroke="#818cf8" strokeWidth={2} fill="#6366f1" fillOpacity={0.4} />
                    </RadarChart>
                </ResponsiveContainer>
            </div>

            {/* Footer Verdict */}
            <div className="relative z-10 w-full bg-indigo-900/20 backdrop-blur-md border border-indigo-500/20 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-1">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span className="text-indigo-200 font-bold text-xs">Verdetto AI</span>
                </div>
                <p className="text-xs text-indigo-100/70 leading-relaxed line-clamp-2">
                    {data.serviceScore?.explanation || "Zona perfettamente bilanciata."}
                </p>
            </div>
        </div>
    );
};

export default ServicesRadar;
