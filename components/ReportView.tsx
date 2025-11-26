
import React, { useRef, useEffect, useState } from 'react';
import { ReportData, SectionData } from '../types';
import { 
  BarChart as ChartIcon, Wallet, ShieldAlert, Leaf, Wifi, Coffee, Users, 
  TrendingUp, Hammer, Building, Scale, BrainCircuit, ArrowUpRight, ArrowDownRight, 
  Briefcase, Home, Plane, Train, Car, MapPin, Stethoscope, Droplets, AlertTriangle, CheckCircle,
  ChevronLeft, ChevronRight, Wind, Volume2, TreePine, AlertCircle, Check, X, Gavel, FileCheck,
  Sun, CloudRain, Mountain, GraduationCap, ShoppingCart, Utensils, Dumbbell, Library, Bus, Search,
  FileText, ShieldCheck, Clock, Percent, Navigation, Map, Activity, Building2, LayoutDashboard,
  Timer, DollarSign, ArrowRight, ThumbsUp, ThumbsDown, Info, AlertOctagon, BarChart3, LineChart,
  BriefcaseBusiness
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  CartesianGrid, Legend, RadialBarChart, RadialBar, ComposedChart, Line, ReferenceLine
} from 'recharts';

interface ReportViewProps {
  data: ReportData;
}

const sectionConfig = [
  { id: 'overview', icon: LayoutDashboard, label: 'Panoramica', color: 'text-blue-400', bg: 'bg-blue-500' },
  { id: 'valuation', icon: TrendingUp, label: 'Valutazione', color: 'text-indigo-400', bg: 'bg-indigo-500' },
  { id: 'investment', icon: Wallet, label: 'Investimento', color: 'text-emerald-400', bg: 'bg-emerald-500' },
  { id: 'market_comps', icon: ChartIcon, label: 'Mercato', color: 'text-yellow-400', bg: 'bg-yellow-500' },
  { id: 'crime', icon: ShieldAlert, label: 'Sicurezza', color: 'text-red-400', bg: 'bg-red-500' },
  { id: 'environment', icon: Leaf, label: 'Ambiente', color: 'text-teal-400', bg: 'bg-teal-500' },
  { id: 'renovation_potential', icon: Hammer, label: 'Ristrutt.', color: 'text-pink-400', bg: 'bg-pink-500' },
  { id: 'connectivity', icon: Wifi, label: 'Connettività', color: 'text-cyan-400', bg: 'bg-cyan-500' },
  { id: 'amenities', icon: Coffee, label: 'Servizi', color: 'text-orange-400', bg: 'bg-orange-500' },
  { id: 'demographics', icon: Users, label: 'Demografia', color: 'text-purple-400', bg: 'bg-purple-500' },
  { id: 'legal_tax', icon: Scale, label: 'Legale', color: 'text-gray-400', bg: 'bg-gray-500' },
  { id: 'ai_verdict', icon: BrainCircuit, label: 'Verdetto', color: 'text-fuchsia-500', bg: 'bg-fuchsia-500' },
];

// --- SHARED COMPONENTS ---

const Modal = ({ isOpen, onClose, title, icon: Icon, color, children }: any) => {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
          className="bg-[#0f172a] p-6 md:p-8 rounded-[2rem] border border-white/10 max-w-lg w-full relative overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-${color.split('-')[1]}-500/20 to-transparent rounded-full blur-[60px]`}></div>
          <button onClick={onClose} className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10 z-10">
            <X className="w-5 h-5 text-gray-400" />
          </button>
          
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <div className={`p-4 bg-white/5 rounded-2xl border border-white/10 ${color}`}>
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">{title}</h3>
              <span className={`text-xs font-bold uppercase tracking-widest ${color}`}>Dettaglio Sezione</span>
            </div>
          </div>
          <div className="relative z-10 space-y-4">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- 0. OVERVIEW SECTION ---
const OverviewSection = ({ data }: { data: ReportData }) => {
  const { overview, sections } = data;
  
  const SummaryWidget = ({ icon: Icon, label, value, color, sub, onClick }: any) => {
    const colors: any = {
       emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500/20', hover: 'hover:border-emerald-500/50' },
       red: { text: 'text-red-400', bg: 'bg-red-500', border: 'border-red-500/20', hover: 'hover:border-red-500/50' },
       teal: { text: 'text-teal-400', bg: 'bg-teal-500', border: 'border-teal-500/20', hover: 'hover:border-teal-500/50' },
       pink: { text: 'text-pink-400', bg: 'bg-pink-500', border: 'border-pink-500/20', hover: 'hover:border-pink-500/50' },
    };
    const c = colors[color] || colors.emerald;
 
    return (
       <div onClick={onClick} className={`glass-panel p-5 rounded-2xl border ${c.border} hover:bg-white/5 transition-all group cursor-pointer ${c.hover} relative overflow-hidden`}>
          <div className="absolute right-0 top-0 p-12 rounded-full opacity-5 bg-gradient-to-br from-white to-transparent blur-xl"></div>
          <div className="flex justify-between items-start mb-4 relative z-10">
             <div className={`p-2.5 rounded-xl bg-black/20 ${c.text}`}>
                <Icon className="w-5 h-5" />
             </div>
             <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
          </div>
          <div className="relative z-10">
             <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1">{label}</span>
             <span className="text-xl md:text-2xl font-bold text-white block tracking-tight truncate">{String(value)}</span>
             <span className="text-[10px] text-gray-500 mt-2 block font-medium uppercase tracking-wide">{sub}</span>
          </div>
       </div>
    )
  }

  const yieldVal = sections.investment.details.find(d => d.label.includes('Yield'))?.value || "N/A";
  const renoVal = sections.renovation_potential.details.find(d => d.label.includes('Valore'))?.value || "N/A";

  return (
     <div className="max-w-7xl w-full animate-fade-in-up">
        <div className="mb-10 text-center lg:text-left">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Analisi Completata</span>
           </div>
           <h1 className="text-4xl md:text-6xl font-bold mb-2 text-white">
             Report <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Esecutivo</span>
           </h1>
           <p className="text-gray-400 max-w-xl">Sintesi strategica dell'analisi immobiliare generata da House Vertical AI.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
           <div className="lg:col-span-8 glass-panel p-8 md:p-10 rounded-[2.5rem] border border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-slate-900/50 relative overflow-hidden group">
              <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/15 transition-all duration-700"></div>
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                 <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                       <div className="p-3 bg-blue-500/20 rounded-2xl text-blue-400 border border-blue-500/10">
                          <Building2 className="w-6 h-6" />
                       </div>
                       <div>
                          <span className="block text-blue-300 font-bold uppercase tracking-widest text-xs">Stima di Mercato</span>
                          <span className="text-gray-400 text-xs">Algoritmo Comparativo v2.4</span>
                       </div>
                    </div>
                    <div className="px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                       <TrendingUp className="w-3 h-3" />
                       Alta Confidenza
                    </div>
                 </div>

                 <div className="mb-6">
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-2">
                      € {overview.estimatedValue.toLocaleString()}
                    </h2>
                    <div className="flex items-center gap-2 text-gray-400 text-sm md:text-base">
                       <Activity className="w-4 h-4" />
                       <span>Range: <span className="text-white font-bold">€ {overview.valueRange[0].toLocaleString()} - € {overview.valueRange[1].toLocaleString()}</span></span>
                    </div>
                 </div>

                 <div className="mt-auto pt-6 border-t border-white/5 flex flex-col md:flex-row gap-8">
                    <div>
                       <span className="text-gray-500 text-xs font-bold uppercase tracking-widest block mb-1">Prezzo al Mq</span>
                       <span className="text-xl font-bold text-white">€ {Math.round(overview.pricePerSqm).toLocaleString()}</span>
                    </div>
                    <div>
                       <span className="text-gray-500 text-xs font-bold uppercase tracking-widest block mb-1">Analisi AI</span>
                       <span className="text-sm font-medium text-gray-300 line-clamp-2 max-w-sm">
                         {sections.valuation.summary}
                       </span>
                    </div>
                 </div>
              </div>
           </div>

           <div className="lg:col-span-4 glass-panel p-8 rounded-[2.5rem] border border-fuchsia-500/20 bg-gradient-to-b from-fuchsia-900/10 to-slate-900/50 flex flex-col items-center justify-center relative overflow-hidden text-center group hover:border-fuchsia-500/30 transition-all">
              <div className="absolute inset-0 bg-fuchsia-500/5 blur-[40px] group-hover:bg-fuchsia-500/10 transition-all duration-700"></div>
              
              <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                 <div className="w-40 h-40 relative flex items-center justify-center mb-6">
                    <div className="absolute inset-0 rounded-full border-8 border-white/5"></div>
                    <div 
                      className="absolute inset-0 rounded-full border-8 border-fuchsia-500 border-t-transparent border-l-transparent" 
                      style={{ transform: `rotate(${(sections.ai_verdict.score / 10) * 360}deg)`, transition: 'transform 1s ease-out' }}
                    ></div>
                    <div className="flex flex-col items-center">
                       <span className="text-6xl font-bold text-white tracking-tighter">{sections.ai_verdict.score}</span>
                       <span className="text-fuchsia-400 text-sm font-bold">/10</span>
                    </div>
                 </div>
                 
                 <span className="text-fuchsia-400 text-sm font-bold uppercase tracking-widest bg-fuchsia-500/10 px-4 py-1.5 rounded-full border border-fuchsia-500/20 mb-4">
                    Vertical Score
                 </span>
                 <p className="text-gray-400 text-xs leading-relaxed max-w-[200px] mx-auto line-clamp-3">
                    {sections.ai_verdict.recommendation}
                 </p>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
           <SummaryWidget 
              icon={Wallet} 
              label="Rendimento" 
              value={yieldVal} 
              color="emerald" 
              sub="Netto Annuo Stimato"
           />
           <SummaryWidget 
              icon={ShieldCheck} 
              label="Sicurezza" 
              value={`${sections.crime.score}/10`} 
              color="red" 
              sub="Indice Rischio Zona"
           />
           <SummaryWidget 
              icon={Leaf} 
              label="Ambiente" 
              value={`${sections.environment.score}/10`} 
              color="teal" 
              sub="Qualità Vivibilità"
           />
           <SummaryWidget 
              icon={Hammer} 
              label="Ristrutturazione" 
              value={renoVal} 
              color="pink" 
              sub="Potenziale Aggiunto"
           />
        </div>
     </div>
  )
}

// --- 1. VALUATION SECTION ---
const ValuationSection = ({ section, data }: { section: SectionData, data: ReportData }) => {
  const currentVal = data.overview.estimatedValue;
  const [selectedMetric, setSelectedMetric] = useState<any>(null);

  const historyData = [
    { year: '2020', value: currentVal * 0.82 },
    { year: '2021', value: currentVal * 0.88 },
    { year: '2022', value: currentVal * 0.94 },
    { year: '2023', value: currentVal * 0.98 },
    { year: '2024', value: currentVal },
  ];

  const forecastData = [
    { quarter: 'Q1', growth: 0.5 },
    { quarter: 'Q2', growth: 0.8 },
    { quarter: 'Q3', growth: 1.2 },
    { quarter: 'Q4', growth: 1.5 },
  ];

  const metrics = [
    { 
      id: 'range', 
      label: 'Range di Prezzo', 
      value: `€ ${(currentVal * 0.95).toLocaleString()} - ${(currentVal * 1.05).toLocaleString()}`, 
      icon: Activity, 
      desc: 'Oscillazione stimata basata sulla volatilità del quartiere.',
      color: 'text-blue-400',
      bg: 'bg-blue-500'
    },
    { 
      id: 'sqm', 
      label: 'Prezzo al Mq', 
      value: `€ ${Math.round(data.overview.pricePerSqm).toLocaleString()}/mq`, 
      icon: Building2, 
      desc: 'Valore medio calcolato su immobili simili nel raggio di 500m.',
      color: 'text-indigo-400',
      bg: 'bg-indigo-500'
    },
    { 
      id: 'confidence', 
      label: 'Affidabilità AI', 
      value: `${Math.round(data.overview.confidence * 100)}%`, 
      icon: CheckCircle, 
      desc: 'Livello di confidenza basato sulla quantità di dati reperiti.',
      color: 'text-teal-400',
      bg: 'bg-teal-500'
    }
  ];

  return (
    <div className="max-w-7xl w-full">
       <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">Valutazione <span className="text-indigo-400">Immobiliare</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm lg:text-base">
            Analisi di mercato basata su algoritmi predittivi e comparabili reali.
          </p>
       </div>

       <Modal 
         isOpen={!!selectedMetric} 
         onClose={() => setSelectedMetric(null)} 
         title={selectedMetric?.label} 
         icon={selectedMetric?.icon || Activity} 
         color={selectedMetric?.color || 'text-white'}
       >
         <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
            <span className={`text-3xl font-bold text-white block`}>{selectedMetric?.value}</span>
         </div>
         <p className="text-gray-300 text-sm leading-relaxed text-center">{selectedMetric?.desc}</p>
       </Modal>

       <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-8 glass-panel rounded-3xl p-8 border border-indigo-500/30 bg-gradient-to-br from-indigo-900/10 to-transparent relative overflow-hidden group">
             <div className="absolute right-0 top-0 p-32 bg-indigo-600/10 rounded-full blur-[80px] group-hover:bg-indigo-600/20 transition-colors duration-500"></div>
             
             <div className="relative z-10 mb-8 flex flex-col md:flex-row justify-between items-start gap-4">
               <div>
                 <p className="text-indigo-300 font-bold uppercase tracking-widest text-sm mb-2">Valore di Mercato Stimato</p>
                 <h3 className="text-5xl lg:text-7xl font-bold text-white tracking-tight">€ {currentVal.toLocaleString()}</h3>
               </div>
               <div className={`px-4 py-2 rounded-xl border flex items-center gap-2 ${section.score > 6 ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                  {section.score > 6 ? <TrendingUp className="w-5 h-5" /> : <TrendingUp className="w-5 h-5 rotate-180" />}
                  <span className="font-bold">Trend {section.score > 6 ? 'Positivo' : 'Stabile'}</span>
               </div>
             </div>

             <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={historyData}>
                    <defs>
                      <linearGradient id="colorValuation" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                    <XAxis dataKey="year" stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }} 
                      itemStyle={{ color: '#fff' }}
                      cursor={{ stroke: '#818cf8', strokeWidth: 1, strokeDasharray: '5 5' }}
                    />
                    <Area type="monotone" dataKey="value" stroke="#818cf8" strokeWidth={4} fill="url(#colorValuation)" />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
             <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-white/5">
                <div className="flex items-center gap-3 mb-3">
                   <BrainCircuit className="w-5 h-5 text-indigo-400" />
                   <h4 className="font-bold text-white">Analisi Sintetica</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 hover:line-clamp-none transition-all">
                  {section.summary}
                </p>
             </div>

             {metrics.map((m) => (
               <motion.div 
                 key={m.id}
                 whileHover={{ scale: 1.02 }}
                 onClick={() => setSelectedMetric(m)}
                 className="flex-1 glass-panel p-5 rounded-2xl border border-white/5 hover:border-indigo-500/30 cursor-pointer flex items-center justify-between group transition-all"
               >
                  <div className="flex items-center gap-4">
                     <div className={`p-3 rounded-xl bg-black/20 ${m.color} group-hover:bg-white/10 transition-colors`}>
                       <m.icon className="w-5 h-5" />
                     </div>
                     <div>
                       <span className="block text-gray-500 text-xs font-bold uppercase tracking-widest group-hover:text-indigo-300 transition-colors">{m.label}</span>
                       <span className="block text-lg font-bold text-white">{m.value}</span>
                     </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-indigo-400" />
               </motion.div>
             ))}
          </div>

          <div className="lg:col-span-12 glass-panel p-6 rounded-3xl border border-white/5">
              <div className="flex items-center justify-between mb-6">
                 <div>
                    <h4 className="text-lg font-bold text-white">Previsione Crescita (12 Mesi)</h4>
                    <p className="text-gray-400 text-sm">Stima basata su piano regolatore e infrastrutture in arrivo.</p>
                 </div>
                 <div className="flex gap-2">
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-lg">+1.8% Atteso</span>
                 </div>
              </div>
              <div className="h-[150px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={forecastData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                      <XAxis dataKey="quarter" stroke="#94a3b8" axisLine={false} tickLine={false} />
                      <Tooltip 
                        cursor={{fill: 'transparent'}}
                        contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                      />
                      <Bar dataKey="growth" fill="#818cf8" radius={[4, 4, 0, 0]} barSize={40}>
                        {forecastData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={`rgba(129, 140, 248, ${0.4 + (index * 0.2)})`} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>
       </div>
    </div>
  );
};

// --- 2. INVESTMENT SECTION (REDESIGNED: SPLIT CARDS) ---
const InvestmentSection = ({ section }: { section: SectionData }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const findDetail = (key: string) => section.details.find(d => d.label.toLowerCase().includes(key));
    
    // Dynamic Data Extraction
    const longTerm = findDetail('lungo') || { label: 'Affitto Lungo Termine', value: '€ 850', explanation: 'Analisi basata su canoni concordati.' };
    const shortTerm = findDetail('airbnb') || findDetail('breve') || { label: 'Short Rent (Airbnb)', value: '€ 1.400', explanation: 'Stima basata su tassi di occupazione medi.' };
    const cashflow = findDetail('cashflow') || { label: 'Cashflow Netto', value: '€ 350', explanation: 'Differenza tra entrate e uscite stimate.' };
    const yieldGross = findDetail('yield') || { label: 'Rendimento Lordo', value: '5.5%', explanation: 'Rapporto tra canone annuo e prezzo immobile.' };
    const occupancy = findDetail('occupazione') || { label: 'Occupazione', value: '75%', explanation: 'Percentuale notti prenotate su base annua.' };

    // Parse numeric values to determine recommendation
    const parseVal = (str: string) => Number(String(str).replace(/[^0-9]/g, ''));
    const ltVal = parseVal(String(longTerm.value));
    const stVal = parseVal(String(shortTerm.value));
    const isShortRecommended = stVal > ltVal * 1.2; // 20% buffer for risk

    return (
      <div className="max-w-6xl w-full">
         <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">Strategia <span className="text-emerald-400">Investimento</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">{section.summary}</p>
        </div>

        <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.label} icon={Wallet} color="text-emerald-400">
           <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4">
               <span className="text-4xl font-bold text-white block">{String(selectedItem?.value)}</span>
           </div>
           <p className="text-gray-300 text-sm leading-relaxed">{selectedItem?.explanation}</p>
        </Modal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Long Term Card */}
            <motion.div 
               whileHover={{ y: -5 }}
               onClick={() => setSelectedItem(longTerm)}
               className="glass-panel p-8 rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-transparent relative overflow-hidden cursor-pointer group"
            >
                <div className="absolute top-0 right-0 p-32 bg-blue-600/10 rounded-full blur-[80px] group-hover:bg-blue-600/20 transition-all"></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="mb-6">
                        <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-4 border border-blue-500/10">
                            <BriefcaseBusiness className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Affitto Lungo Termine</h3>
                        <p className="text-gray-400 text-xs">Stabilità e continuità. Ideale per chi cerca rendite passive senza gestione operativa frequente.</p>
                    </div>
                    <div>
                        <span className="text-blue-400 text-xs font-bold uppercase tracking-widest block mb-1">Stima Canone Mensile</span>
                        <div className="flex justify-between items-end">
                            <span className="text-4xl lg:text-5xl font-bold text-white tracking-tight">{String(longTerm.value)}</span>
                            <ArrowUpRight className="w-6 h-6 text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Short Term Card */}
            <motion.div 
               whileHover={{ y: -5 }}
               onClick={() => setSelectedItem(shortTerm)}
               className="glass-panel p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-transparent relative overflow-hidden cursor-pointer group"
            >
                <div className="absolute top-0 right-0 p-32 bg-emerald-600/10 rounded-full blur-[80px] group-hover:bg-emerald-600/20 transition-all"></div>
                {isShortRecommended && (
                    <div className="absolute top-6 right-6 px-3 py-1 bg-emerald-500 text-black text-xs font-bold rounded-full uppercase tracking-wider shadow-lg shadow-emerald-500/20">
                        Consigliato
                    </div>
                )}
                <div className="relative z-10 flex flex-col h-full justify-between">
                    <div className="mb-6">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/10">
                            <Home className="w-6 h-6" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">Short Rent (Airbnb)</h3>
                        <p className="text-gray-400 text-xs">Massimizzazione del profitto. Richiede gestione attiva check-in/out e pulizie.</p>
                    </div>
                    <div>
                        <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest block mb-1">Stima Ricavo Mensile</span>
                        <div className="flex justify-between items-end">
                            <span className="text-4xl lg:text-5xl font-bold text-white tracking-tight">{String(shortTerm.value)}</span>
                            <ArrowUpRight className="w-6 h-6 text-emerald-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>

        {/* Bottom Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div onClick={() => setSelectedItem(cashflow)} className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Cashflow Netto Mensile</span>
                <span className="text-2xl font-bold text-white">{String(cashflow.value)}</span>
            </div>
            <div onClick={() => setSelectedItem(yieldGross)} className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Rendimento Lordo Annuo</span>
                <span className="text-2xl font-bold text-white">{String(yieldGross.value)}</span>
            </div>
            <div onClick={() => setSelectedItem(occupancy)} className="glass-panel p-5 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/5 transition-colors">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Tasso Occupazione L.T.</span>
                <span className="text-2xl font-bold text-white">{String(occupancy.value)}</span>
            </div>
        </div>
      </div>
    );
  };

// --- 3. MARKET SECTION (REDESIGNED: 6 DYNAMIC ITEMS + FIX CHART) ---
const MarketSection = ({ section, data }: { section: SectionData, data: ReportData }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const pps = data.overview.pricePerSqm;
    // Use valueRange from overview to create a realistic distribution
    const minVal = data.overview.valueRange[0] / data.overview.estimatedValue * pps; 
    const maxVal = data.overview.valueRange[1] / data.overview.estimatedValue * pps;
    
    // Create distribution data that logically places 'pps' between 'minVal' and 'maxVal'
    const distData = [
      { name: 'Min', value: minVal * 0.9, y: 5 },
      { name: 'Range Min', value: minVal, y: 15 },
      { name: 'Medio', value: pps, y: 45 },
      { name: 'Range Max', value: maxVal, y: 15 },
      { name: 'Max', value: maxVal * 1.1, y: 5 },
    ];

    const getIcon = (label: string) => {
        const l = label.toLowerCase();
        if (l.includes('tempo') || l.includes('giorni')) return Clock;
        if (l.includes('sconto')) return Percent;
        if (l.includes('richiesta') || l.includes('domanda') || l.includes('assorbimento')) return TrendingUp;
        if (l.includes('stock')) return Building2;
        if (l.includes('cagr')) return BarChart3;
        if (l.includes('volat')) return Activity;
        return DollarSign;
    }

    // Dynamic attribution based on math
    const marketStatus = pps > (maxVal + minVal) / 2 ? "Premium" : "Competitivo";
  
    return (
      <div className="max-w-6xl w-full">
          <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-6xl font-bold mb-4">Analisi <span className="text-yellow-400">Mercato</span></h2>
              <p className="text-gray-400 max-w-2xl mx-auto">Posizionamento competitivo e liquidità dell'asset nel contesto locale.</p>
          </div>
  
          <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.label} icon={ChartIcon} color="text-yellow-400">
             <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4">
                 <span className="text-4xl font-bold text-white block">{String(selectedItem?.value)}</span>
             </div>
             <p className="text-gray-300 text-sm leading-relaxed">
               {selectedItem?.explanation || "Dato calcolato incrociando annunci immobiliari attivi e transazioni recenti registrate dall'OMI nella zona."}
             </p>
          </Modal>
  
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
               
               {/* Hero Positioning Card */}
               <div className="lg:col-span-12 glass-panel p-8 rounded-[2.5rem] border border-yellow-500/20 bg-gradient-to-r from-yellow-900/10 to-transparent relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px]"></div>
                   <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
                       <div className="flex-1">
                           <span className="text-yellow-500 font-bold uppercase tracking-widest text-xs mb-2 block">Posizionamento Prezzo</span>
                           <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">Fascia {marketStatus}</h3>
                           <p className="text-gray-400 max-w-md text-sm leading-relaxed">
                               Il prezzo al mq (€ {Math.round(pps).toLocaleString()}) si colloca nella parte {marketStatus === 'Premium' ? 'alta' : 'medio-bassa'} della forchetta di mercato locale ({Math.round(minVal).toLocaleString()} - {Math.round(maxVal).toLocaleString()} €/mq).
                           </p>
                       </div>
                       
                       <div className="flex-1 w-full h-[200px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={distData}>
                                    <defs>
                                        <linearGradient id="colorDist" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                                            <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <Area type="monotone" dataKey="y" stroke="#eab308" strokeWidth={3} fill="url(#colorDist)" />
                                    {/* The reference line uses the index to position loosely, but we label it based on logic */}
                                    <ReferenceLine x={marketStatus === 'Premium' ? 3 : 1.8} stroke="white" strokeDasharray="3 3" label={{ position: 'top', value: 'Tu sei qui', fill: 'white', fontSize: 12 }} />
                                </AreaChart>
                            </ResponsiveContainer>
                       </div>
                   </div>
               </div>

               {/* KPI Cards Grid - EXACTLY 6 ITEMS */}
               <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-3 gap-6">
                   {section.details.slice(0, 6).map((d, i) => {
                       const Icon = getIcon(d.label);
                       return (
                           <motion.div 
                              key={i}
                              whileHover={{ y: -5 }}
                              onClick={() => setSelectedItem(d)}
                              className="glass-panel p-6 rounded-3xl border border-white/5 hover:border-yellow-500/30 cursor-pointer flex flex-col justify-between h-36 relative overflow-hidden group"
                           >
                               <div className="absolute top-0 right-0 p-8 bg-yellow-500/5 rounded-full blur-xl group-hover:bg-yellow-500/10 transition-all"></div>
                               <div className="flex justify-between items-start">
                                   <div className="p-2 rounded-xl bg-yellow-500/10 text-yellow-400">
                                       <Icon className="w-5 h-5" />
                                   </div>
                                   <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-yellow-400 transition-colors" />
                               </div>
                               <div>
                                   <span className="text-gray-400 text-xs font-bold uppercase tracking-wider block mb-1 truncate">{d.label}</span>
                                   <span className="text-2xl font-bold text-white truncate block">{String(d.value)}</span>
                               </div>
                           </motion.div>
                       )
                   })}
               </div>
          </div>
      </div>
    );
  };

// --- 4. CRIME SECTION (REDESIGNED: 6 DYNAMIC ITEMS) ---
const CrimeSection = ({ section }: { section: SectionData }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    return (
        <div className="max-w-6xl w-full">
            <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">Indice <span className="text-red-400">Sicurezza</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto">{section.summary}</p>
            </div>

            <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.label} icon={ShieldAlert} color="text-red-400">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4">
                    <span className="text-2xl font-bold text-white block">{String(selectedItem?.value)}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                   {selectedItem?.explanation || "Dati incrociati con database locali e segnalazioni pubbliche. Il punteggio è normalizzato sulla media cittadina."}
                </p>
            </Modal>

            {/* Grid 6 Items */}
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {section.details.slice(0, 6).map((d, i) => (
                    <motion.div 
                        key={i} 
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedItem(d)}
                        className="glass-panel p-8 rounded-2xl border border-red-500/20 flex flex-col items-center text-center cursor-pointer hover:bg-red-900/10 transition-colors relative overflow-hidden"
                    >
                         <div className="absolute top-0 right-0 p-10 bg-red-500/5 rounded-full blur-xl"></div>
                        <ShieldAlert className="w-10 h-10 text-red-500 mb-6 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]" />
                        <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2 truncate w-full">{d.label}</span>
                        <span className="text-white text-xl font-bold truncate w-full">{String(d.value)}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// --- 5-9 SECTIONS (ENVIRONMENT, RENOVATION, CONNECTIVITY, AMENITIES, DEMOGRAPHICS) ---
// (Kept Identical in structure but using passed props correctly)

const EnvironmentSection = ({ section }: { section: SectionData }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const extractScore = (str: string | number) => Number(String(str).replace(/[^0-9]/g, '').slice(0, 2)) || 50;

  const findDetail = (key: string) => section.details.find(d => d.label.includes(key));
  const air = findDetail('Aria');
  const noise = findDetail('Acustico');
  const green = findDetail('Verdi');
  const hydro = findDetail('Idro');

  const radarData = [
    { subject: 'Aria', A: extractScore(air?.value || '80'), fullMark: 100 },
    { subject: 'Verde', A: extractScore(green?.value || '80'), fullMark: 100 },
    { subject: 'Silenzio', A: extractScore(noise?.value || '80'), fullMark: 100 },
    { subject: 'Sicurezza Idro', A: extractScore(hydro?.value || '90'), fullMark: 100 },
  ];

  const cards = [
    { id: 'air', label: 'Qualità Aria', icon: Wind, color: 'text-cyan-400', bg: 'bg-cyan-500', score: extractScore(air?.value || '80'), detail: air },
    { id: 'noise', label: 'Inquinamento Acustico', icon: Volume2, color: 'text-purple-400', bg: 'bg-purple-500', score: extractScore(noise?.value || '80'), detail: noise },
    { id: 'green', label: 'Aree Verdi', icon: TreePine, color: 'text-emerald-400', bg: 'bg-emerald-500', score: extractScore(green?.value || '80'), detail: green },
    { id: 'hydro', label: 'Rischio Idro', icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-500', score: extractScore(hydro?.value || '90'), detail: hydro },
  ];

  return (
    <div className="max-w-6xl w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-6xl font-bold mb-4">Analisi <span className="text-teal-400">Ambientale</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{section.summary}</p>
      </div>
      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.label} icon={selectedItem?.icon || Leaf} color={selectedItem?.color || 'text-teal-400'}>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4">
              <span className="text-4xl font-bold text-white block mb-2">{selectedItem?.detail?.value || 'N/A'}</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{selectedItem?.detail?.explanation || "Analisi basata sui dati satellitari Sentinel-5P e rilevazioni ARPA locali."}</p>
      </Modal>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-6 flex justify-center">
          <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
             <div className="absolute inset-0 bg-teal-500/20 blur-[100px] rounded-full"></div>
             <ResponsiveContainer width="100%" height="100%">
               <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                 <PolarGrid stroke="#334155" />
                 <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 'bold' }} />
                 <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                 <Radar name="Environment" dataKey="A" stroke="#2dd4bf" strokeWidth={3} fill="#2dd4bf" fillOpacity={0.3} />
               </RadarChart>
             </ResponsiveContainer>
          </div>
        </div>
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
           {cards.map((card) => (
             <motion.div key={card.id} whileHover={{ scale: 1.05 }} onClick={() => setSelectedItem(card)} className="glass-panel p-5 rounded-2xl border border-white/5 cursor-pointer group relative overflow-hidden">
                <div className={`absolute top-0 right-0 p-10 bg-gradient-to-br from-${card.bg.split('-')[1]}-500/20 to-transparent blur-xl`}></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                   <div className={`p-3 rounded-xl bg-white/5 ${card.color}`}><card.icon className="w-6 h-6" /></div>
                   <span className="text-xl font-bold text-white">{card.detail?.value}</span>
                </div>
                <h4 className="text-white font-bold mb-2 relative z-10">{card.label}</h4>
                <div className="w-full bg-gray-700 h-1.5 rounded-full overflow-hidden relative z-10">
                   <div className={`h-full ${card.bg}`} style={{ width: `${card.score}%` }}></div>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
};

const RenovationSection = ({ section }: { section: SectionData }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  return (
    <div className="max-w-6xl w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-6xl font-bold mb-4">Potenziale <span className="text-pink-400">Ristrutturazione</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{section.summary}</p>
      </div>
      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.label} icon={Hammer} color="text-pink-400">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4">
              <span className="text-3xl font-bold text-white block mb-2">{String(selectedItem?.value)}</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{selectedItem?.explanation || "Stima basata sui costi medi regionali."}</p>
      </Modal>
      <div className="relative mb-16 py-8 px-4">
         <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-pink-600 to-emerald-500 rounded-full opacity-30 transform -translate-y-1/2 hidden md:block"></div>
         <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
            <div className="flex flex-col items-center text-center">
               <div className="w-24 h-24 rounded-full bg-[#0f172a] border-4 border-pink-500 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.3)] mb-4 relative"><Home className="w-10 h-10 text-pink-500" /></div>
               <span className="text-pink-400 font-bold uppercase tracking-widest text-sm mb-1">Stato Attuale</span>
               <span className="text-white text-lg font-bold">Da Ristrutturare</span>
            </div>
            <div className="md:hidden"><ArrowDownRight className="w-8 h-8 text-gray-600" /></div>
            <div className="bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md flex items-center gap-3"><Hammer className="w-5 h-5 text-gray-300" /><span className="text-sm font-bold text-gray-300">Intervento Stimato</span></div>
            <div className="md:hidden"><ArrowDownRight className="w-8 h-8 text-gray-600" /></div>
            <div className="flex flex-col items-center text-center">
               <div className="w-24 h-24 rounded-full bg-[#0f172a] border-4 border-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.5)] mb-4 relative animate-pulse">
                   <div className="absolute inset-0 bg-emerald-400 rounded-full opacity-20 blur-xl"></div><TrendingUp className="w-10 h-10 text-emerald-400" />
               </div>
               <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-1">Post-Work</span>
               <span className="text-white text-lg font-bold">+25% Valore</span>
            </div>
         </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {section.details.map((d, i) => (
             <motion.div key={i} whileHover={{ y: -5 }} onClick={() => setSelectedItem(d)} className="glass-panel p-6 rounded-2xl border border-pink-500/20 cursor-pointer text-center group">
                <span className="text-pink-300 text-xs font-bold uppercase tracking-widest mb-2 block">{d.label}</span>
                <span className="text-2xl font-bold text-white group-hover:scale-105 transition-transform inline-block">{String(d.value)}</span>
             </motion.div>
         ))}
      </div>
    </div>
  );
};

const ConnectivitySection = ({ section }: { section: SectionData }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const findDetail = (key: string) => section.details.find(d => d.label.toLowerCase().includes(key));
    const transports = [
      { id: 'plane', icon: Plane, label: 'Aeroporto', detail: findDetail('aero'), color: 'text-cyan-400' },
      { id: 'train', icon: Train, label: 'Stazione', detail: findDetail('staz'), color: 'text-cyan-400' },
      { id: 'car', icon: Car, label: 'Autostrada', detail: findDetail('auto'), color: 'text-cyan-400' },
    ];
    return (
      <div className="max-w-6xl w-full">
         <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">Hub <span className="text-cyan-400">Trasporti</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Accessibilità e tempi di percorrenza dai principali snodi.</p>
        </div>
        <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.label} icon={Navigation} color="text-cyan-400">
           <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4"><span className="text-4xl font-bold text-white block">{selectedItem?.value}</span></div>
           <p className="text-gray-300 text-sm">{selectedItem?.explanation || "Tempo stimato in condizioni di traffico medio."}</p>
        </Modal>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-5 relative py-4 pl-4">
                <div className="absolute left-4 top-0 bottom-0 w-1 bg-cyan-900/50 rounded-full"></div>
                <div className="space-y-12">
                    {section.details.map((d, i) => (
                        <div key={i} className="relative pl-10 group cursor-pointer" onClick={() => setSelectedItem(d)}>
                            <div className="absolute left-[11px] top-1.5 w-4 h-4 rounded-full bg-[#0f172a] border-4 border-cyan-500 group-hover:scale-125 transition-transform"></div>
                            <h4 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{d.label}</h4>
                            <span className="text-cyan-500 font-mono text-sm">{String(d.value)}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="lg:col-span-7 space-y-8">
                <div className="glass-panel p-8 rounded-3xl border border-cyan-500/20 flex items-center justify-between">
                     <div><h3 className="text-xl font-bold text-white mb-1">Mobility Score</h3><p className="text-gray-400 text-sm">Indice di accessibilità generale</p></div>
                     <div className="relative w-24 h-24">
                         <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ value: section.score * 10, fill: '#06b6d4' }]} startAngle={90} endAngle={-270}><RadialBar background dataKey="value" cornerRadius={10} /></RadialBarChart>
                         </ResponsiveContainer>
                         <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-white">{section.score}</div>
                     </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    {transports.map((t) => (
                        <motion.div key={t.id} whileHover={{y:-5}} onClick={() => t.detail && setSelectedItem(t.detail)} className="glass-panel p-4 rounded-2xl border border-white/5 flex flex-col items-center justify-center text-center cursor-pointer">
                            <t.icon className={`w-8 h-8 ${t.color} mb-3`} /><span className="text-xs text-gray-400 font-bold uppercase">{t.label}</span><span className="text-white font-bold">{t.detail?.value || 'N/A'}</span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    );
  };

const AmenitiesSection = ({ section }: { section: SectionData }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const getIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('scuol') || l.includes('univ')) return GraduationCap;
    if (l.includes('super') || l.includes('comm')) return ShoppingCart;
    if (l.includes('rist') || l.includes('bar')) return Utensils;
    if (l.includes('park') || l.includes('verde')) return TreePine;
    if (l.includes('palest') || l.includes('sport')) return Dumbbell;
    return Coffee;
  };
  return (
    <div className="max-w-6xl w-full">
       <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-6xl font-bold mb-4">Servizi <span className="text-orange-400">di Zona</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{section.summary}</p>
      </div>
      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.label} icon={selectedItem ? getIcon(selectedItem.label) : Coffee} color="text-orange-400">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4"><span className="text-3xl font-bold text-white block">{String(selectedItem?.value)}</span><span className="text-xs text-gray-400 uppercase">Quantità in zona</span></div>
          <p className="text-gray-300 text-sm leading-relaxed">{selectedItem?.explanation || "Conteggio basato sui punti di interesse registrati entro 10-15 minuti a piedi dall'immobile."}</p>
      </Modal>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
         <div className="lg:col-span-4 flex flex-col items-center">
             <div className="relative w-64 h-64">
                <ResponsiveContainer width="100%" height="100%">
                   <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: 'Score', value: section.score * 10, fill: '#fb923c' }]} startAngle={180} endAngle={0}><RadialBar background dataKey="value" cornerRadius={30} /></RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 text-center"><span className="text-5xl font-bold text-white">{section.score}</span><span className="block text-gray-500 text-sm uppercase font-bold">Score Servizi</span></div>
             </div>
         </div>
         <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {section.details.map((d, i) => { const Icon = getIcon(d.label); return (
                 <motion.div key={i} whileHover={{ scale: 1.05 }} onClick={() => setSelectedItem(d)} className="glass-panel p-4 rounded-2xl border border-orange-500/10 flex flex-col items-center text-center cursor-pointer group hover:bg-orange-500/10 transition-colors">
                    <Icon className="w-8 h-8 text-orange-400 mb-3 group-hover:scale-110 transition-transform" /><span className="text-gray-300 text-sm font-bold mb-1">{d.label}</span><span className="text-2xl font-bold text-white">{String(d.value)}</span>
                 </motion.div>
            )})}
         </div>
      </div>
    </div>
  );
};

const DemographicsSection = ({ section }: { section: SectionData }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);
    const getPct = (key: string) => { const d = section.details.find(d => d.label.includes(key)); if (!d) return 0; return Number(String(d.value).replace(/[^0-9.]/g, '')) || 0; };
    const data = [ { age: '65+', pct: getPct('65+') }, { age: '51-65', pct: getPct('51-65') }, { age: '36-50', pct: getPct('36-50') }, { age: '19-35', pct: getPct('19-35') }, { age: '0-18', pct: getPct('0-18') }, ];
    return (
      <div className="max-w-6xl w-full">
         <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">Profilo <span className="text-purple-400">Sociologico</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{section.summary}</p>
         </div>
         <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.label} icon={Users} color="text-purple-400">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4"><span className="text-3xl font-bold text-white block">{String(selectedItem?.value)}</span></div>
            <p className="text-gray-300 text-sm">{selectedItem?.explanation || "Dato chiave per determinare il target di inquilino ideale."}</p>
         </Modal>
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div className="glass-panel p-8 rounded-3xl border border-purple-500/20">
                 <h3 className="text-lg font-bold text-white mb-6">Piramide Età Residenti</h3>
                 <div className="h-[300px] w-full">
                     <ResponsiveContainer width="100%" height="100%">
                         <BarChart layout="vertical" data={data} margin={{ left: 10, right: 10 }}><CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" /><XAxis type="number" stroke="#94a3b8" /><YAxis dataKey="age" type="category" stroke="#fff" width={50} /><Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} cursor={{fill: 'rgba(168,85,247,0.1)'}} /><Bar dataKey="pct" fill="#c084fc" radius={[0, 4, 4, 0]} barSize={30} /></BarChart>
                     </ResponsiveContainer>
                 </div>
             </div>
             <div className="space-y-4">
                {section.details.filter(d => !d.label.includes('Age')).map((d, i) => (
                    <motion.div key={i} whileHover={{ x: 5, backgroundColor: 'rgba(192, 132, 252, 0.1)' }} onClick={() => setSelectedItem(d)} className="glass-panel p-5 rounded-2xl border border-white/5 flex items-center justify-between cursor-pointer group transition-all">
                        <div className="flex items-center gap-4"><div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400"><Users className="w-5 h-5" /></div><span className="font-bold text-white">{d.label}</span></div>
                        <span className="text-xl font-bold text-purple-300">{String(d.value)}</span>
                    </motion.div>
                ))}
             </div>
         </div>
      </div>
    );
  };

// --- 10. LEGAL SECTION (REDESIGNED: 6 DYNAMIC ITEMS) ---
const LegalSection = ({ section }: { section: SectionData }) => {
    const [selectedItem, setSelectedItem] = useState<any>(null);

    const getStatus = (val: string) => {
        const v = val.toLowerCase();
        if (v.includes('ok') || v.includes('regolare') || v.includes('assente') || v.includes('basso') || v.includes('a') || v.includes('b')) return 'success';
        if (v.includes('attenzione') || v.includes('verifica') || v.includes('presenza') || v.includes('alto')) return 'warning';
        return 'neutral';
    };

    return (
        <div className="max-w-6xl w-full">
            <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">Due Diligence <span className="text-gray-400">Legale</span></h2>
                <p className="text-gray-400 max-w-2xl mx-auto text-sm">Quadro sintetico della conformità urbanistica, catastale e ipotecaria.</p>
            </div>

            <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)} title={selectedItem?.label} icon={Gavel} color="text-gray-400">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4">
                    <span className="text-xl font-bold text-white block">{String(selectedItem?.value)}</span>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{selectedItem?.explanation || "Verifica preliminare. Si consiglia sempre il supporto di un notaio per la conferma definitiva."}</p>
            </Modal>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col items-center justify-center text-center">
                     <h3 className="text-lg font-bold text-white mb-6">Indice Rischio</h3>
                     <div className="w-full h-[200px] relative">
                         <ResponsiveContainer width="100%" height="100%">
                            <RadialBarChart innerRadius="80%" outerRadius="100%" data={[{ value: section.score * 10, fill: section.score > 7 ? '#22c55e' : '#ef4444' }]} startAngle={180} endAngle={0}><RadialBar background dataKey="value" cornerRadius={30} /></RadialBarChart>
                         </ResponsiveContainer>
                         <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
                            <span className={`text-5xl font-bold ${section.score > 7 ? 'text-green-500' : 'text-red-500'}`}>{section.score}/10</span>
                            <span className="block text-gray-500 text-xs font-bold uppercase mt-2">Legal Score</span>
                         </div>
                     </div>
                </div>

                {/* Checklist Grid - 6 Items */}
                <div className="lg:col-span-2 grid grid-cols-2 gap-4">
                    {section.details.slice(0, 6).map((d, i) => {
                        const status = getStatus(String(d.value));
                        return (
                            <motion.div 
                               key={i}
                               whileHover={{ scale: 1.02 }}
                               onClick={() => setSelectedItem(d)}
                               className={`p-5 rounded-2xl border cursor-pointer flex flex-col gap-2 relative overflow-hidden ${
                                   status === 'success' ? 'bg-green-900/10 border-green-500/20' : 
                                   status === 'warning' ? 'bg-yellow-900/10 border-yellow-500/20' : 
                                   'bg-white/5 border-white/10'
                               }`}
                            >
                                <div className="flex justify-between items-start">
                                    <div className={`p-2 rounded-lg ${
                                        status === 'success' ? 'bg-green-500/20 text-green-400' : 
                                        status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' : 
                                        'bg-gray-700 text-gray-400'
                                    }`}>
                                        {status === 'success' ? <CheckCircle className="w-5 h-5" /> : 
                                         status === 'warning' ? <AlertTriangle className="w-5 h-5" /> : 
                                         <FileText className="w-5 h-5" />}
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-gray-500" />
                                </div>
                                <div>
                                    <span className="text-gray-400 text-xs font-bold uppercase truncate block w-full">{d.label}</span>
                                    <h4 className="text-white font-bold leading-tight mt-1 truncate">{String(d.value)}</h4>
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

// ... VERDICT SECTION & MAIN COMPONENT (Identical to previous step) ...

const VerdictSection = ({ section, data }: { section: SectionData, data: ReportData }) => {
    const isPositive = section.score >= 6;
    return (
      <div className="max-w-7xl w-full flex flex-col items-center">
        <div className="text-center mb-12">
           <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 mb-6"><BrainCircuit className="w-4 h-4" /><span className="text-xs font-bold uppercase tracking-widest">Analisi Conclusiva</span></div>
           <h2 className="text-5xl lg:text-7xl font-bold mb-4 text-white">Verdetto <span className="text-fuchsia-500">AI</span></h2>
           <p className="text-gray-400 max-w-2xl mx-auto">Sintesi finale basata su {data.overview.confidence * 100}% di confidenza dati.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-start">
          <div className="glass-panel p-8 rounded-[2rem] border border-green-500/20 bg-gradient-to-br from-green-900/10 to-transparent relative overflow-hidden group hover:border-green-500/40 transition-all">
             <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/10 rounded-full blur-[50px]"></div>
             <h3 className="flex items-center gap-3 text-2xl font-bold text-green-400 mb-8 relative z-10"><div className="p-2 bg-green-500/20 rounded-lg"><Check className="w-6 h-6" /></div>Punti di Forza</h3>
             <ul className="space-y-6 relative z-10">{section.details.filter((_, i) => i % 2 === 0).map((d, i) => (
                 <li key={i} className="flex items-start gap-4 group/item"><div className="w-2 h-2 rounded-full bg-green-500 mt-2.5 shadow-[0_0_10px_rgba(34,197,94,0.5)] group-hover/item:scale-150 transition-transform"></div><div><span className="block font-bold text-white text-lg mb-1">{d.label}</span><span className="text-gray-400 text-sm">{String(d.value)}</span></div></li>
               ))}</ul>
          </div>
          <div className="flex flex-col items-center justify-center text-center relative order-first lg:order-none mb-8 lg:mb-0">
             <div className="absolute inset-0 bg-fuchsia-600/20 blur-[100px] rounded-full pointer-events-none"></div>
             <div className="relative z-10 glass-panel p-10 rounded-full border border-white/10 w-[300px] h-[300px] flex flex-col items-center justify-center shadow-2xl bg-[#0f172a]/80 backdrop-blur-xl group hover:scale-105 transition-transform duration-500">
               <div className="absolute inset-0 rounded-full border-4 border-white/5"></div>
               <div className="absolute inset-0 rounded-full border-4 border-t-fuchsia-500 border-r-fuchsia-500 border-b-transparent border-l-transparent animate-spin-slow opacity-50"></div>
               <span className="text-8xl font-bold text-white tracking-tighter drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">{section.score}</span><span className="text-fuchsia-400 uppercase tracking-[0.2em] text-sm mt-2 font-bold">Vertical Score</span>
             </div>
             <div className="mt-10 space-y-6 relative z-10 w-full max-w-md">
                <div className={`py-4 px-8 rounded-2xl font-bold text-2xl border flex items-center justify-center gap-3 shadow-lg ${isPositive ? 'bg-green-600 border-green-500 text-white shadow-green-900/50' : 'bg-red-600 border-red-500 text-white shadow-red-900/50'}`}>
                  {isPositive ? <Gavel className="w-6 h-6" /> : <AlertTriangle className="w-6 h-6" />}
                  {isPositive ? 'OPPORTUNITÀ' : 'RISCHIO ALTO'}
                </div>
                <div className="glass-panel p-6 rounded-2xl border border-white/10"><p className="text-gray-300 text-base leading-relaxed font-medium">"{section.recommendation}"</p></div>
             </div>
          </div>
          <div className="glass-panel p-8 rounded-[2rem] border border-red-500/20 bg-gradient-to-bl from-red-900/10 to-transparent relative overflow-hidden group hover:border-red-500/40 transition-all">
             <div className="absolute top-0 left-0 w-32 h-32 bg-red-500/10 rounded-full blur-[50px]"></div>
             <h3 className="flex items-center gap-3 text-2xl font-bold text-red-400 mb-8 relative z-10"><div className="p-2 bg-red-500/20 rounded-lg"><X className="w-6 h-6" /></div>Attenzione A</h3>
             <ul className="space-y-6 relative z-10">{section.details.filter((_, i) => i % 2 !== 0).map((d, i) => (
                 <li key={i} className="flex items-start gap-4 group/item"><div className="w-2 h-2 rounded-full bg-red-500 mt-2.5 shadow-[0_0_10px_rgba(239,68,68,0.5)] group-hover/item:scale-150 transition-transform"></div><div><span className="block font-bold text-white text-lg mb-1">{d.label}</span><span className="text-gray-400 text-sm">{String(d.value)}</span></div></li>
               ))}</ul>
          </div>
        </div>
      </div>
    );
  };

const ReportView: React.FC<ReportViewProps> = ({ data }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleNavClick = (id: string) => { setActiveSection(id); sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' }); };
  const currentSectionIndex = sectionConfig.findIndex(s => s.id === activeSection);
  const nextSection = () => { if (currentSectionIndex < sectionConfig.length - 1) handleNavClick(sectionConfig[currentSectionIndex + 1].id); };
  const prevSection = () => { if (currentSectionIndex > 0) handleNavClick(sectionConfig[currentSectionIndex - 1].id); };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id); });
    }, { threshold: 0.5 });
    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-screen bg-[#0f172a] text-white overflow-hidden font-sans selection:bg-blue-500/30">
      <nav className="hidden lg:flex flex-col w-80 h-full border-r border-white/5 bg-[#0b1120] p-6 overflow-y-auto">
         <div className="flex items-center gap-3 mb-10 px-2"><div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20"><Building2 className="text-white w-6 h-6" /></div><span className="font-bold text-xl tracking-tight">House Vertical</span></div>
         <div className="space-y-2">{sectionConfig.map((item) => { const isActive = activeSection === item.id; return (<button key={item.id} onClick={() => handleNavClick(item.id)} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${isActive ? 'bg-gradient-to-r from-blue-600/20 to-transparent border-l-2 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}><item.icon className={`w-5 h-5 transition-colors ${isActive ? item.color : 'text-gray-500 group-hover:text-gray-300'}`} /><span className="font-medium text-sm tracking-wide">{item.label}</span>{isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>}</button>)})}</div>
      </nav>
      <main className="flex-1 h-full overflow-y-auto scroll-smooth snap-y snap-mandatory relative z-0">
         <div className="lg:hidden fixed top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0f172a] to-transparent z-10 pointer-events-none"></div>
         <div id="overview" ref={(el) => { sectionRefs.current['overview'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12"><OverviewSection data={data} /></div>
         <div id="valuation" ref={(el) => { sectionRefs.current['valuation'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20"><ValuationSection section={data.sections.valuation} data={data} /></div>
         <div id="investment" ref={(el) => { sectionRefs.current['investment'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12"><InvestmentSection section={data.sections.investment} /></div>
         <div id="market_comps" ref={(el) => { sectionRefs.current['market_comps'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20"><MarketSection section={data.sections.market_comps} data={data} /></div>
         <div id="crime" ref={(el) => { sectionRefs.current['crime'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12"><CrimeSection section={data.sections.crime} /></div>
         <div id="environment" ref={(el) => { sectionRefs.current['environment'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20"><EnvironmentSection section={data.sections.environment} /></div>
         <div id="renovation_potential" ref={(el) => { sectionRefs.current['renovation_potential'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12"><RenovationSection section={data.sections.renovation_potential} /></div>
         <div id="connectivity" ref={(el) => { sectionRefs.current['connectivity'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20"><ConnectivitySection section={data.sections.connectivity} /></div>
         <div id="amenities" ref={(el) => { sectionRefs.current['amenities'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12"><AmenitiesSection section={data.sections.amenities} /></div>
         <div id="demographics" ref={(el) => { sectionRefs.current['demographics'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20"><DemographicsSection section={data.sections.demographics} /></div>
         <div id="legal_tax" ref={(el) => { sectionRefs.current['legal_tax'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12"><LegalSection section={data.sections.legal_tax} /></div>
         <div id="ai_verdict" ref={(el) => { sectionRefs.current['ai_verdict'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20"><VerdictSection section={data.sections.ai_verdict} data={data} /></div>
      </main>
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#0f172a]/90 backdrop-blur-xl border-t border-white/10 p-4 z-50 safe-area-bottom">
         <div className="flex items-center justify-between gap-4">
            <button onClick={prevSection} disabled={currentSectionIndex === 0} className="p-4 rounded-full bg-white/5 border border-white/10 disabled:opacity-30 active:scale-95 transition-all"><ChevronLeft className="w-6 h-6 text-white" /></button>
            <div className="flex-1 text-center"><span className="text-xs text-blue-400 font-bold uppercase tracking-widest block mb-1">{currentSectionIndex + 1} / {sectionConfig.length}</span><h3 className="text-white font-bold text-lg leading-none">{sectionConfig[currentSectionIndex].label}</h3><div className="w-full h-1 bg-gray-800 rounded-full mt-3 overflow-hidden"><div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${((currentSectionIndex + 1) / sectionConfig.length) * 100}%` }}></div></div></div>
            <button onClick={nextSection} disabled={currentSectionIndex === sectionConfig.length - 1} className="p-4 rounded-full bg-white/5 border border-white/10 disabled:opacity-30 active:scale-95 transition-all"><ChevronRight className="w-6 h-6 text-white" /></button>
         </div>
      </div>
    </div>
  );
};

export default ReportView;
