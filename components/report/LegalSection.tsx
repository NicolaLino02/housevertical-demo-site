import React from 'react';
import { SectionData } from '../../types';
import LegalRadar from './legal/LegalRadar';
import DocumentMatrix from './legal/DocumentMatrix';
import FiscalWidget from './legal/FiscalWidget';
import { ShieldCheck } from 'lucide-react';

const LegalSection = ({ section }: { section: SectionData }) => {
    // Safe Data
    const legal = section.legal || {};

    return (
        <div className="max-w-7xl w-full mx-auto p-4 lg:p-6 h-full flex flex-col justify-center">

            {/* HER0 HEADER */}
            <div className="mb-8 pl-4 border-l-2 border-slate-600 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl lg:text-5xl font-bold text-white mb-2 font-mono tracking-tight">
                        COMPLIANCE <span className="text-emerald-500">VAULT</span>
                    </h2>
                    <p className="text-slate-400 text-sm max-w-lg font-mono">
                        Dossier Legale # 942-B. Stato Urbanistico, Fiscale e Documentale.
                    </p>
                </div>
                <div className="hidden md:flex items-center gap-2 bg-emerald-900/20 px-3 py-1 rounded text-emerald-400 border border-emerald-500/20">
                    <ShieldCheck className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase">System Secure</span>
                </div>
            </div>

            {/* VAULT DASHBOARD GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full min-h-[450px]">

                {/* 1. RISK RADAR */}
                <div className="h-full">
                    <LegalRadar data={legal} />
                </div>

                {/* 2. DOCUMENT MATRIX */}
                <div className="h-full">
                    <DocumentMatrix data={legal} />
                </div>

                {/* 3. FISCAL WIDGET */}
                <div className="h-full">
                    <FiscalWidget data={legal} />
                </div>

            </div>



        </div>
    );
};

export default LegalSection;
