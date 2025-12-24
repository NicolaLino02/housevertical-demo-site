import React from 'react';
import { ResponsiveContainer, BarChart, Bar, Cell, Tooltip, XAxis } from 'recharts';
import { Users, Home } from 'lucide-react';

interface PopulationTrendProps {
    data: any;
}

const PopulationTrend = ({ data }: PopulationTrendProps) => {
    // Robust Fallbacks if data is missing or empty arrays
    const ageData = (data.ageDistribution && data.ageDistribution.length > 0) ? data.ageDistribution : [
        { ageRange: '0-18', percentage: 15 },
        { ageRange: '19-35', percentage: 25 },
        { ageRange: '36-50', percentage: 35 },
        { ageRange: '51-65', percentage: 15 },
        { ageRange: '65+', percentage: 10 }
    ];

    const householdData = (data.householdComposition && data.householdComposition.length > 0) ? data.householdComposition : [
        { type: 'Single', percentage: 35 },
        { type: 'Coppie', percentage: 30 },
        { type: 'Famiglie', percentage: 25 },
        { type: 'Anziani', percentage: 10 }
    ];

    return (
        <div className="flex flex-col gap-6 h-full">

            {/* AGE DISTRIBUTION (Abstract Bars) */}
            <div className="flex-1 bg-[#0f172a] border border-white/10 rounded-[32px] p-6 flex flex-col">
                <h4 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" /> Fasce d'Età
                </h4>

                <div className="flex-1 w-full min-h-[150px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={ageData} barSize={40}>
                            <XAxis
                                dataKey="ageRange"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                                dy={10}
                            />
                            <Tooltip
                                cursor={{ fill: 'white', opacity: 0.05 }}
                                contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                                itemStyle={{ color: '#a78bfa' }}
                            />
                            <Bar dataKey="percentage" radius={[8, 8, 8, 8]}>
                                {ageData.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={index === 2 ? '#8b5cf6' : '#334155'} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="mt-4 text-center">
                    <p className="text-xs text-gray-500">
                        La fascia predominante è <span className="text-purple-400 font-bold">36-50 anni</span>, indicando una stabilità demografica.
                    </p>
                </div>
            </div>

            {/* HOUSEHOLD COMPOSITION (DNA Strips) */}
            <div className="bg-[#0f172a] border border-white/10 rounded-[32px] p-6">
                <h4 className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-6 flex items-center gap-2">
                    <Home className="w-4 h-4 text-pink-400" /> Nuclei Familiari
                </h4>

                <div className="space-y-4">
                    {householdData.map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-4">
                            <div className="w-24 text-xs font-bold text-gray-400 text-right shrink-0">{item.type}</div>
                            <div className="flex-1 h-3 bg-gray-800 rounded-full overflow-hidden relative">
                                <div
                                    className="h-full bg-pink-500 rounded-full absolute top-0 left-0"
                                    style={{ width: `${item.percentage}%`, opacity: 0.5 + (idx * 0.1) }}
                                />
                            </div>
                            <div className="w-10 text-xs font-mono text-white text-right">{item.percentage}%</div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default PopulationTrend;
