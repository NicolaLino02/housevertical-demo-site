import React from 'react';
import { Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface RenovationTimelineProps {
    data: any;
}

const RenovationTimeline = ({ data }: RenovationTimelineProps) => {
    const roadmap = [
        { phase: 'Progettazione & Permessi', duration: 4, color: 'bg-blue-500', desc: 'Rilievo, Computo metrico, CILA/SCIA' },
        { phase: 'Demolizioni & Smaltimento', duration: 2, color: 'bg-orange-500', desc: 'Rimozione pavimenti, tramezzi, impianti vecchi' },
        { phase: 'Impiantistica (Elettrico/Idraulico)', duration: 3, color: 'bg-yellow-500', desc: 'Posain opera nuove tubazioni e corrugati' },
        { phase: 'Massetti & Intonaci', duration: 3, color: 'bg-indigo-500', desc: 'Chiusura tracce, livellamento sottofondi' },
        { phase: 'Pavimenti & Rivestimenti', duration: 3, color: 'bg-purple-500', desc: 'Posa parquet/gres, piastrelle bagni' },
        { phase: 'Finiture & Collaudo', duration: 2, color: 'bg-emerald-500', desc: 'Pitturazione, montaggio frutti, verifica impianti' },
    ];

    const totalWeeks = roadmap.reduce((acc, curr) => acc + curr.duration, 0);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">

            {/* LEFT: SUMMARY */}
            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl" />

                <div>
                    <h3 className="text-white font-bold text-lg mb-2 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-emerald-400" /> Cronoprogramma
                    </h3>
                    <p className="text-gray-400 text-sm">Stima tempi basata su interventi standard per metratura simile.</p>
                </div>

                <div className="py-8 text-center">
                    <div className="text-6xl font-bold text-white tracking-tighter mb-2">{Math.ceil(totalWeeks / 4)}</div>
                    <div className="text-emerald-400 font-bold uppercase tracking-widest text-sm">Mesi Stimati</div>
                    <div className="text-gray-500 text-xs mt-2">Circa {totalWeeks} settimane lavorative</div>
                </div>

                <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-colors flex items-center justify-center gap-2 group">
                    Scarica Gantt PDF <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            {/* RIGHT: GANTT CHART */}
            <div className="lg:col-span-8 bg-[#0f172a] border border-white/10 rounded-3xl p-8 overflow-y-auto custom-scrollbar">
                <h3 className="text-white font-bold text-lg mb-8">Fasi Operative</h3>

                <div className="space-y-6 relative">
                    {/* Vertical Line Connector */}
                    <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-white/5 z-0" />

                    {roadmap.map((step, idx) => (
                        <div key={idx} className="relative z-10 group">
                            <div className="flex items-start gap-4">
                                {/* Indicator dot */}
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 bg-[#0f172a] shadow-lg group-hover:border-${step.color.split('-')[1]}-500/50 transition-colors`}>
                                    <div className={`w-3 h-3 rounded-full ${step.color} opacity-80`} />
                                </div>

                                <div className="flex-1 pt-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className="text-white font-bold text-sm">{step.phase}</h4>
                                        <span className="text-gray-500 text-xs font-mono">{step.duration} sett.</span>
                                    </div>

                                    {/* Bar Visual */}
                                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden mb-2">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: '100%' }}
                                            transition={{ duration: 1, delay: idx * 0.1 }}
                                            className={`h-full ${step.color} opacity-60`}
                                        />
                                    </div>

                                    <p className="text-gray-400 text-xs leading-relaxed opacity-60 group-hover:opacity-100 transition-opacity">
                                        {step.desc}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 p-4 rounded-xl bg-emerald-900/10 border border-emerald-500/20 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-200 text-sm">Consegna Chiavi prevista: <strong>Entro 5 mesi dal rogito</strong></span>
                </div>
            </div>

        </div>
    );
};

export default RenovationTimeline;
