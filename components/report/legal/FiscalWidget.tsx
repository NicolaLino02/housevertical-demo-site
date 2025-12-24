import React from 'react';
import { DollarSign, Scale, Trash2, Building } from 'lucide-react';

interface FiscalWidgetProps {
    data: any;
}

const FiscalWidget = ({ data }: FiscalWidgetProps) => {
    // Extract Taxes safely
    const taxes = data.taxes || [];
    const imu = taxes.find((t: any) => t.name.includes('IMU'))?.amount || "€ 0";
    const tari = taxes.find((t: any) => t.name.includes('TARI'))?.amount || "€ 0";

    // Parse numeric values for total (Mock/Demo logic)
    const parseCost = (str: string) => parseInt(str.replace(/[^0-9]/g, '')) || 0;
    const yearlyTotal = parseCost(imu) + parseCost(tari) + 1200; // Adding dummy condo fees

    return (
        <div className="h-full bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-600/50 rounded-[24px] p-6 relative flex flex-col justify-between shadow-2xl">

            <h4 className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-400" /> Fiscalità & Spese
            </h4>

            <div className="space-y-4 flex-1">
                {/* IMU Row */}
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-indigo-500/20 rounded text-indigo-400"><Building className="w-4 h-4" /></div>
                        <span className="text-sm text-slate-300">IMU (Seconda Casa)</span>
                    </div>
                    <span className="text-white font-mono font-bold">{imu}</span>
                </div>

                {/* TARI Row */}
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-orange-500/20 rounded text-orange-400"><Trash2 className="w-4 h-4" /></div>
                        <span className="text-sm text-slate-300">TARI (Rifiuti)</span>
                    </div>
                    <span className="text-white font-mono font-bold">{tari}</span>
                </div>

                {/* CONDO Row (Extra) */}
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-1.5 bg-emerald-500/20 rounded text-emerald-400"><DollarSign className="w-4 h-4" /></div>
                        <span className="text-sm text-slate-300">Spese Cond. (Stim.)</span>
                    </div>
                    <span className="text-white font-mono font-bold">~ € 1.200</span>
                </div>
            </div>

            {/* Total Footer */}
            <div className="mt-6 pt-4 border-t border-slate-600/50 flex flex-col">
                <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">Costo di Mantenimento Annuo</span>
                <div className="text-3xl font-bold text-white font-mono">
                    € {yearlyTotal.toLocaleString()}
                    <span className="text-xs text-slate-500 font-sans ml-2">/ anno</span>
                </div>
            </div>

        </div>
    );
};

export default FiscalWidget;
