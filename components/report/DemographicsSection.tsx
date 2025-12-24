import React from 'react';
import { SectionData } from '../../types';
import ResidentPersona from './demographics/ResidentPersona';
import PopulationTrend from './demographics/PopulationTrend';
import { Info } from 'lucide-react';

const DemographicsSection = ({ section }: { section: SectionData }) => {
    // Safe Data
    // Safe Data
    const demographics = section.demographics || {};

    return (
        <div className="max-w-7xl w-full mx-auto p-4 lg:p-6 h-full flex flex-col justify-center">

            {/* HER0 HEADER */}
            <div className="mb-10 pl-2 border-l-4 border-purple-500">
                <h2 className="text-3xl lg:text-5xl font-bold text-white mb-2 ml-4">
                    Community <span className="text-purple-500">DNA</span>
                </h2>
                <p className="text-gray-400 text-sm max-w-lg ml-4">
                    Chi vive qui? Analisi del tessuto sociale, età e composizione dei nuclei familiari.
                </p>
            </div>

            {/* ASYMMETRIC MAGAZINE GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-full min-h-[500px]">

                {/* LEFT: RESIDENT PERSONA (Profile) */}
                <div className="lg:col-span-4 h-full">
                    <ResidentPersona data={demographics} />
                </div>

                {/* RIGHT: DATA VISUALIZATION */}
                <div className="lg:col-span-8 h-full">
                    <PopulationTrend data={demographics} />
                </div>

            </div>

            {/* FOOTER NOTE */}
            <div className="mt-8 flex items-start gap-3 p-4 rounded-xl bg-purple-900/10 border border-purple-500/10 max-w-2xl mx-auto">
                <Info className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                <p className="text-sm text-purple-200/60 leading-relaxed">
                    Il quartiere mostra un trend di crescita positivo, attirando sempre più {Number((demographics as any).averageAge?.value || 40) < 35 ? 'giovani professionisti' : 'famiglie stabili'}, garantendo un tessuto sociale solido e sicuro.
                </p>
            </div>

        </div>
    );
};

export default DemographicsSection;
