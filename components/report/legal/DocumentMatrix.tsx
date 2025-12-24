import React from 'react';
import { FileText, CheckCircle, AlertCircle, FileCheck, FileX } from 'lucide-react';

interface DocumentMatrixProps {
    data: any;
}

const DocumentMatrix = ({ data }: DocumentMatrixProps) => {
    // Infer document list from data structure or use fallbacks
    const documents = [
        { name: "Atto di Provenienza", status: "ok", date: "2015" },
        { name: "Planimetria Catastale", status: "ok", date: "2023" },
        { name: "Visura Ipotecaria", status: "ok", date: "Aggiornata" },
        { name: "APE (Prestazione En.)", status: data.permits?.[0]?.status === 'Richiesto' ? 'pending' : 'ok', date: "In corso" },
        { name: "Agibilità / Abitabilità", status: "warning", date: "Ante '67" },
        { name: "Regolamento Cond.", status: "ok", date: "Presente" },
    ];

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'ok': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
            case 'pending': return <AlertCircle className="w-4 h-4 text-amber-400" />;
            case 'warning': return <FileX className="w-4 h-4 text-red-400" />;
            default: return <AlertCircle className="w-4 h-4 text-slate-400" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ok': return 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400';
            case 'pending': return 'bg-amber-500/10 border-amber-500/20 text-amber-400';
            case 'warning': return 'bg-red-500/10 border-red-500/20 text-red-400';
            default: return 'bg-slate-500/10 border-slate-500/20 text-slate-400';
        }
    };

    return (
        <div className="h-full bg-[#1e293b] border border-slate-700/50 rounded-[24px] p-6 relative overflow-hidden flex flex-col shadow-2xl">
            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-grid-slate-700/[0.1] pointer-events-none" />

            <h4 className="relative z-10 text-slate-400 text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" /> Matrix Documentale
            </h4>

            <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto custom-scrollbar pr-2">
                {documents.map((doc, idx) => (
                    <div key={idx} className={`p-4 rounded-xl border flex flex-col justify-between min-h-[100px] transition-all hover:bg-white/5 group ${getStatusColor(doc.status)}`}>
                        <div className="flex justify-between items-start">
                            <FileCheck className="w-5 h-5 opacity-70 group-hover:scale-110 transition-transform" />
                            {getStatusIcon(doc.status)}
                        </div>
                        <div>
                            <div className="text-[10px] font-mono opacity-70 mb-1">{doc.date}</div>
                            <h5 className="font-bold text-xs leading-tight line-clamp-2">{doc.name}</h5>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative z-10 mt-6 pt-4 border-t border-slate-700/50 text-center">
                <p className="text-[10px] text-slate-500">
                    La documentazione è conservata in cloud crittografato.
                </p>
            </div>

        </div>
    );
};

export default DocumentMatrix;
