import React from 'react';
import { User, Briefcase, GraduationCap, DollarSign, Smile } from 'lucide-react';
import { motion } from 'framer-motion';

interface ResidentPersonaProps {
    data: any;
}

const ResidentPersona = ({ data }: ResidentPersonaProps) => {
    // Safe defaults
    const age = data.averageAge?.value || 42;
    const income = data.incomeLevel?.value || 35000;
    const education = data.educationLevel?.value || 'Laurea';
    const job = "Professionista"; // Inferred for demo/persona

    // Determine "Persona Type" based on data (Simple logic for demo)
    const getPersonaType = () => {
        if (age < 30) return { label: "Young Starter", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" };
        if (age < 50) return { label: "Established Pro", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" };
        return { label: "Golden Age", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" };
    };

    const persona = getPersonaType();

    return (
        <div className={`h-full ${persona.bg} border ${persona.border} rounded-[32px] p-8 relative overflow-hidden flex flex-col items-center text-center`}>
            {/* Background Decorative */}
            <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05]" />
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 ${persona.bg.replace('/10', '/20')} rounded-full blur-[80px]`} />

            <div className="relative z-10 w-full flex flex-col items-center h-full justify-center gap-6">

                {/* Avatar / Icon */}
                <div className={`w-24 h-24 rounded-full border-4 ${persona.border} flex items-center justify-center bg-[#0f172a] shadow-xl`}>
                    <User className={`w-10 h-10 ${persona.color}`} />
                </div>

                <div>
                    <div className={`text-xs font-bold uppercase tracking-widest mb-2 ${persona.color} opacity-80`}>Il Residente Tipo</div>
                    <h3 className="text-3xl font-bold text-white mb-1">"{persona.label}"</h3>
                    <p className="text-gray-400 text-sm max-w-[200px] mx-auto leading-relaxed">
                        Età media di <span className="text-white font-bold">{age} anni</span>, con un profilo socio-economico stabile.
                    </p>
                </div>

                {/* Traits Grid */}
                <div className="grid grid-cols-1 gap-3 w-full max-w-[260px]">
                    <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-white/10 p-3 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-green-500/20 rounded text-green-400"><DollarSign className="w-4 h-4" /></div>
                            <span className="text-sm text-gray-300">Reddito</span>
                        </div>
                        <span className="text-white font-bold">€ {Number(income).toLocaleString()}</span>
                    </div>
                    <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-white/10 p-3 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-blue-500/20 rounded text-blue-400"><GraduationCap className="w-4 h-4" /></div>
                            <span className="text-sm text-gray-300">Titolo</span>
                        </div>
                        <span className="text-white font-bold text-sm truncate max-w-[100px]">{education}</span>
                    </div>
                    <div className="bg-[#0f172a]/50 backdrop-blur-sm border border-white/10 p-3 rounded-xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-1.5 bg-pink-500/20 rounded text-pink-400"><Smile className="w-4 h-4" /></div>
                            <span className="text-sm text-gray-300">Vibe</span>
                        </div>
                        <span className="text-white font-bold text-sm">Residenziale</span>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ResidentPersona;
