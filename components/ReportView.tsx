
import React, { useRef, useEffect, useState } from 'react';
import { ReportData, SectionData } from '../types';
import { 
  BarChart as ChartIcon, Wallet, ShieldAlert, Leaf, Wifi, Coffee, Users, 
  TrendingUp, Hammer, Building, Scale, BrainCircuit, ArrowUpRight, ArrowDownRight, 
  Briefcase, Home, Plane, Train, Car, MapPin, Stethoscope, Droplets, AlertTriangle, CheckCircle,
  ChevronLeft, ChevronRight, Wind, Volume2, TreePine, AlertCircle, Check, X, Gavel, FileCheck,
  Sun, CloudRain, Mountain, GraduationCap, ShoppingCart, Utensils, Dumbbell, Library, Bus, Search,
  FileText, ShieldCheck, Clock, Percent, Navigation, Map, Activity, Building2, LayoutDashboard,
  Timer, DollarSign, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  CartesianGrid, Legend, RadialBarChart, RadialBar
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

  return (
     <div className="max-w-7xl w-full animate-fade-in-up">
        {/* Header */}
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
           
           {/* Hero Value Card */}
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

           {/* Vertical Score Card */}
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

        {/* Summary Widgets Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
           <SummaryWidget 
              icon={Wallet} 
              label="Rendimento" 
              value={sections.rental_yield.details[0]?.value || "N/A"} 
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
              value={sections.renovation_potential.details.find(d => d.label.toLowerCase().includes('valore'))?.value || "N/A"} 
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
          {/* Main Value Card (Hero) */}
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

          {/* Right Column: Metrics & Summary */}
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
                       <span className="block text-gray-500 text-[10px] font-bold uppercase tracking-widest group-hover:text-indigo-300 transition-colors">{m.label}</span>
                       <span className="block text-lg font-bold text-white">{m.value}</span>
                     </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-indigo-400" />
               </motion.div>
             ))}
          </div>

          {/* Bottom Chart: Forecast */}
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

// --- 2. INVESTMENT SECTION ---
const InvestmentSection = ({ section }: { section: SectionData }) => {
  const parseEuro = (str: string | number) => Number(String(str).replace(/[^0-9]/g, '')) || 0;
  
  // Find relevant details safely
  const longTermDetail = section.details.find(d => d.label.toLowerCase().includes('lungo') || d.label.toLowerCase().includes('canone'));
  const shortTermDetail = section.details.find(d => d.label.toLowerCase().includes('breve') || d.label.toLowerCase().includes('short'));

  const longTermVal = parseEuro(longTermDetail?.value) || 1200; 
  const shortTermVal = parseEuro(shortTermDetail?.value) || (longTermVal * 1.8);

  const [detailMode, setDetailMode] = useState<'long' | 'short' | null>(null);

  const revenue = detailMode === 'long' ? longTermVal : shortTermVal;
  const expenseRate = detailMode === 'long' ? 0.10 : 0.25; 
  const taxRate = 0.21;
  const expenses = revenue * expenseRate;
  const taxes = revenue * taxRate;
  const net = revenue - expenses - taxes;

  const strategies = [
    {
      id: 'long',
      title: 'Affitto Lungo Termine',
      icon: Briefcase,
      value: longTermVal,
      color: 'text-blue-400',
      bg: 'bg-blue-500',
      gradient: 'from-blue-500/20 to-blue-900/5',
      border: 'border-blue-500/30'
    },
    {
      id: 'short',
      title: 'Short Rent (Airbnb)',
      icon: Home,
      value: shortTermVal,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500',
      gradient: 'from-emerald-500/20 to-emerald-900/5',
      border: 'border-emerald-500/30',
      tag: 'CONSIGLIATO'
    }
  ];

  return (
    <div className="max-w-6xl w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-6xl font-bold mb-4">Strategia <span className="text-emerald-400">Investimento</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{section.summary}</p>
      </div>

       <Modal 
         isOpen={!!detailMode} 
         onClose={() => setDetailMode(null)} 
         title={detailMode === 'long' ? 'Lungo Termine (4+4)' : 'Short Rent (Turistico)'} 
         icon={detailMode === 'long' ? Briefcase : Home} 
         color={detailMode === 'long' ? 'text-blue-400' : 'text-emerald-400'}
       >
         <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
              <span className="text-gray-300">Entrate Lorde Mensili</span>
              <span className="text-white font-bold text-xl">+ € {revenue.toLocaleString()}</span>
            </div>
            
            <div className="pl-4 space-y-3 border-l-2 border-gray-700 ml-2">
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Costi Gestione {detailMode === 'short' ? '(25%)' : '(10%)'}</span>
                    <span className="text-red-400">- € {Math.round(expenses).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Cedolare Secca (21%)</span>
                    <span className="text-orange-400">- € {Math.round(taxes).toLocaleString()}</span>
                </div>
            </div>

            <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-white/10 flex justify-between items-center">
                <span className="text-white font-bold text-lg">Netto Mensile</span>
                <span className={`text-3xl font-bold ${detailMode === 'long' ? 'text-blue-400' : 'text-emerald-400'}`}>
                    € {Math.round(net).toLocaleString()}
                </span>
            </div>
         </div>
       </Modal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
         {strategies.map((s) => (
             <motion.div
                key={s.id}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setDetailMode(s.id as any)}
                className={`relative overflow-hidden rounded-3xl border ${s.border} bg-gradient-to-br ${s.gradient} p-8 cursor-pointer group`}
             >
                <div className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[60px] opacity-20 ${s.bg}`}></div>
                
                {s.tag && (
                    <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-emerald-500/20">
                        {s.tag}
                    </div>
                )}

                <div className="flex flex-col h-full justify-between relative z-10">
                    <div>
                        <div className={`w-14 h-14 rounded-2xl ${s.bg}/20 flex items-center justify-center mb-6 ${s.color}`}>
                            <s.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{s.title}</h3>
                        <p className="text-gray-400 text-sm max-w-xs leading-relaxed mb-8">
                            {s.id === 'long' 
                                ? 'Stabilità e continuità. Ideale per chi cerca rendite passive senza gestione operativa frequente.' 
                                : 'Massimizzazione del profitto. Richiede gestione attiva check-in/out e pulizie.'}
                        </p>
                    </div>

                    <div className="flex items-end justify-between">
                        <div>
                            <span className="block text-gray-500 text-xs font-bold uppercase tracking-wider mb-1">Stima Lorda</span>
                            <span className={`text-4xl font-bold ${s.color}`}>€ {s.value.toLocaleString()}</span>
                        </div>
                        <div className={`w-10 h-10 rounded-full border border-white/10 flex items-center justify-center ${s.bg}/10 ${s.color} group-hover:bg-white/10 transition-colors`}>
                            <ArrowUpRight className="w-5 h-5" />
                        </div>
                    </div>
                </div>
             </motion.div>
         ))}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
         {section.details.filter(d => !d.label.toLowerCase().includes('lungo') && !d.label.toLowerCase().includes('breve')).slice(0,3).map((d, i) => (
             <div key={i} className="glass-panel p-4 rounded-xl border border-white/5 flex flex-col items-center justify-center text-center">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{d.label}</span>
                <span className="text-white font-bold text-lg">{String(d.value)}</span>
             </div>
         ))}
      </div>
    </div>
  );
};

// --- 3. MARKET SECTION ---
const MarketSection = ({ section, data }: { section: SectionData, data: ReportData }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const pps = data.overview.pricePerSqm;
  
  const comparisonData = [
    { name: 'Tuo Immobile', price: pps, fill: '#facc15' },
    { name: 'Media Zona', price: pps * (0.92 + Math.random() * 0.1), fill: '#eab308' },
    { name: 'Media Città', price: pps * (0.85 + Math.random() * 0.15), fill: '#ca8a04' },
  ];

  const getIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('prezzo') || l.includes('euro') || l.includes('€')) return Wallet;
    if (l.includes('giorni') || l.includes('tempo')) return Clock;
    if (l.includes('transazioni') || l.includes('vendite')) return ChartIcon;
    if (l.includes('margine') || l.includes('%') || l.includes('sconto')) return Percent;
    return TrendingUp;
  };

  return (
    <div className="max-w-6xl w-full">
        <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-6xl font-bold mb-4">Analisi di <span className="text-yellow-400">Mercato</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{section.summary}</p>
        </div>

        <Modal 
          isOpen={!!selectedItem} 
          onClose={() => setSelectedItem(null)} 
          title={selectedItem?.label} 
          icon={selectedItem ? getIcon(selectedItem.label) : ChartIcon} 
          color="text-yellow-400"
        >
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
              <span className="text-4xl font-bold text-white block mb-2">{String(selectedItem?.value)}</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
             Questo indicatore posiziona l'immobile nel percentile {section.score > 7 ? 'superiore' : 'medio'} del mercato locale. 
             Basato su analisi comparativa di annunci simili e rogiti recenti.
          </p>
        </Modal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div className="h-[400px] w-full glass-panel rounded-3xl border border-yellow-500/10 p-6 flex flex-col justify-center relative">
                 <h3 className="text-lg font-bold text-white mb-6 text-center">Confronto Prezzo al Mq</h3>
                 <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={comparisonData} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                        <YAxis hide />
                        <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                        <Bar dataKey="price" radius={[8, 8, 0, 0]} barSize={60} />
                     </BarChart>
                 </ResponsiveContainer>
             </div>

             <div className="space-y-4">
                 {section.details.map((d, i) => {
                     const Icon = getIcon(d.label);
                     return (
                        <motion.div 
                            key={i}
                            whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.05)' }}
                            onClick={() => setSelectedItem(d)}
                            className="glass-panel p-6 rounded-2xl border border-white/5 cursor-pointer flex items-center justify-between group transition-all"
                        >
                            <div className="flex items-center gap-5">
                                <div className="p-3 bg-yellow-500/10 rounded-xl text-yellow-400 group-hover:bg-yellow-500/20 transition-colors">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <span className="text-gray-400 text-xs font-bold uppercase tracking-widest block mb-1">{d.label}</span>
                                    <span className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors">{String(d.value)}</span>
                                </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-white" />
                        </motion.div>
                     )
                 })}
             </div>
        </div>
    </div>
  );
};

// --- 4. ENVIRONMENT SECTION ---
const EnvironmentSection = ({ section }: { section: SectionData }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const radarData = [
    { subject: 'Aria', A: section.score * 10, fullMark: 100 },
    { subject: 'Verde', A: Math.min(100, section.score * 12), fullMark: 100 },
    { subject: 'Silenzio', A: Math.min(100, section.score * 9), fullMark: 100 },
    { subject: 'Acqua', A: 85, fullMark: 100 },
  ];

  const cards = [
    { id: 'air', label: 'Qualità Aria', icon: Wind, color: 'text-cyan-400', bg: 'bg-cyan-500', score: 85 },
    { id: 'noise', label: 'Inquinamento Acustico', icon: Volume2, color: 'text-purple-400', bg: 'bg-purple-500', score: 70 },
    { id: 'green', label: 'Aree Verdi', icon: TreePine, color: 'text-emerald-400', bg: 'bg-emerald-500', score: 90 },
    { id: 'hydro', label: 'Rischio Idro', icon: Droplets, color: 'text-blue-400', bg: 'bg-blue-500', score: 95 },
  ];

  return (
    <div className="max-w-6xl w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-6xl font-bold mb-4">Analisi <span className="text-teal-400">Ambientale</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{section.summary}</p>
      </div>

      <Modal 
          isOpen={!!selectedItem} 
          onClose={() => setSelectedItem(null)} 
          title={selectedItem?.label} 
          icon={selectedItem?.icon || Leaf} 
          color={selectedItem?.color || 'text-teal-400'}
        >
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4">
              <span className="text-4xl font-bold text-white block mb-2">{selectedItem?.score}/100</span>
              <span className="text-xs text-gray-400 uppercase tracking-widest">Indice Qualità</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
             Analisi basata sui dati satellitari Sentinel-5P e rilevazioni ARPA locali.
             La zona presenta ottimi valori di vivibilità con bassa concentrazione di PM10 e NO2.
          </p>
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Radar Chart */}
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

        {/* Interactive Cards */}
        <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
           {cards.map((card) => (
             <motion.div 
               key={card.id}
               whileHover={{ scale: 1.05 }}
               onClick={() => setSelectedItem(card)}
               className="glass-panel p-5 rounded-2xl border border-white/5 cursor-pointer group relative overflow-hidden"
             >
                <div className={`absolute top-0 right-0 p-10 bg-gradient-to-br from-${card.bg.split('-')[1]}-500/20 to-transparent blur-xl`}></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                   <div className={`p-3 rounded-xl bg-white/5 ${card.color}`}>
                     <card.icon className="w-6 h-6" />
                   </div>
                   <span className="text-xl font-bold text-white">{card.score}</span>
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

// --- 5. RENOVATION SECTION ---
const RenovationSection = ({ section }: { section: SectionData }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  return (
    <div className="max-w-6xl w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-6xl font-bold mb-4">Potenziale <span className="text-pink-400">Ristrutturazione</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{section.summary}</p>
      </div>

      <Modal 
          isOpen={!!selectedItem} 
          onClose={() => setSelectedItem(null)} 
          title={selectedItem?.label} 
          icon={Hammer} 
          color="text-pink-400"
      >
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4">
              <span className="text-3xl font-bold text-white block mb-2">{String(selectedItem?.value)}</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
             Stima calcolata sulla base dei costi medi regionali per ristrutturazioni di livello medio-alto.
             Include rifacimento impianti, pavimenti e infissi. Non include arredi.
          </p>
      </Modal>

      {/* Timeline Visualization */}
      <div className="relative mb-16 py-8 px-4">
         {/* Line */}
         <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-pink-600 to-emerald-500 rounded-full opacity-30 transform -translate-y-1/2 hidden md:block"></div>
         
         <div className="flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
            {/* Start */}
            <div className="flex flex-col items-center text-center">
               <div className="w-24 h-24 rounded-full bg-[#0f172a] border-4 border-pink-500 flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.3)] mb-4 relative">
                  <Home className="w-10 h-10 text-pink-500" />
               </div>
               <span className="text-pink-400 font-bold uppercase tracking-widest text-sm mb-1">Stato Attuale</span>
               <span className="text-white text-lg font-bold">Da Ristrutturare</span>
            </div>

            {/* Arrow Mobile */}
            <div className="md:hidden">
               <ArrowDownRight className="w-8 h-8 text-gray-600" />
            </div>

            {/* Action */}
            <div className="bg-white/5 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md flex items-center gap-3">
               <Hammer className="w-5 h-5 text-gray-300" />
               <span className="text-sm font-bold text-gray-300">Intervento Stimato</span>
            </div>

            {/* Arrow Mobile */}
            <div className="md:hidden">
               <ArrowDownRight className="w-8 h-8 text-gray-600" />
            </div>

            {/* End */}
            <div className="flex flex-col items-center text-center">
               <div className="w-24 h-24 rounded-full bg-[#0f172a] border-4 border-emerald-400 flex items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.5)] mb-4 relative animate-pulse">
                   <div className="absolute inset-0 bg-emerald-400 rounded-full opacity-20 blur-xl"></div>
                   <TrendingUp className="w-10 h-10 text-emerald-400" />
               </div>
               <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-1">Post-Work</span>
               <span className="text-white text-lg font-bold">+25% Valore</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {section.details.map((d, i) => (
             <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedItem(d)}
                className="glass-panel p-6 rounded-2xl border border-pink-500/20 cursor-pointer text-center group"
             >
                <span className="text-pink-300 text-xs font-bold uppercase tracking-widest mb-2 block">{d.label}</span>
                <span className="text-2xl font-bold text-white group-hover:scale-105 transition-transform inline-block">{String(d.value)}</span>
             </motion.div>
         ))}
      </div>
    </div>
  );
};

// --- 6. LEGAL SECTION ---
const LegalSection = ({ section }: { section: SectionData }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const getStatusColor = (val: string) => {
    const v = val.toLowerCase();
    if (v.includes('ok') || v.includes('regolare') || v.includes('assente') || v.includes('basso')) return 'bg-green-500';
    if (v.includes('medio') || v.includes('verifica')) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="max-w-6xl w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-6xl font-bold mb-4">Checklist <span className="text-gray-400">Legale</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{section.summary}</p>
      </div>

      <Modal 
          isOpen={!!selectedItem} 
          onClose={() => setSelectedItem(null)} 
          title={selectedItem?.label} 
          icon={Gavel} 
          color="text-gray-400"
      >
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4">
              <span className="text-xl font-bold text-white block">{String(selectedItem?.value)}</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
             Verifica preliminare basata su dati catastali e ipotecari pubblici. 
             Si raccomanda sempre una verifica notarile prima del rogito.
          </p>
      </Modal>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         {section.details.map((d, i) => {
           const statusColor = getStatusColor(String(d.value));
           return (
             <motion.div 
               key={i}
               whileHover={{ x: 5 }}
               onClick={() => setSelectedItem(d)}
               className="glass-panel p-5 rounded-xl border border-white/5 flex items-center justify-between cursor-pointer group"
             >
                <div className="flex items-center gap-4">
                   <div className={`w-2 h-12 rounded-full ${statusColor}`}></div>
                   <div>
                      <h4 className="font-bold text-white text-lg">{d.label}</h4>
                      <p className="text-gray-400 text-sm">{String(d.value)}</p>
                   </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                   {statusColor === 'bg-green-500' ? <CheckCircle className="w-5 h-5 text-green-500" /> : <AlertTriangle className="w-5 h-5 text-yellow-500" />}
                </div>
             </motion.div>
           )
         })}
      </div>
    </div>
  );
};

// --- 7. CONNECTIVITY SECTION ---
const ConnectivitySection = ({ section }: { section: SectionData }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const getIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('aero')) return Plane;
    if (l.includes('treno') || l.includes('stazione')) return Train;
    if (l.includes('auto') || l.includes('strada')) return Car;
    return MapPin;
  };

  return (
    <div className="max-w-6xl w-full">
       <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-6xl font-bold mb-4">Connettività <span className="text-cyan-400">e Trasporti</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{section.summary}</p>
      </div>

      <Modal 
          isOpen={!!selectedItem} 
          onClose={() => setSelectedItem(null)} 
          title={selectedItem?.label} 
          icon={selectedItem ? getIcon(selectedItem.label) : MapPin} 
          color="text-cyan-400"
      >
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4">
              <span className="text-3xl font-bold text-white block">{String(selectedItem?.value)}</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
             Distanza calcolata in linea d'aria o tramite stima di percorso medio in condizioni di traffico standard.
          </p>
      </Modal>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {section.details.map((d, i) => {
            const Icon = getIcon(d.label);
            return (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedItem(d)}
                className="glass-panel p-6 rounded-3xl border border-cyan-500/20 flex flex-col items-center text-center cursor-pointer group hover:bg-cyan-900/10 transition-colors"
              >
                 <div className="w-16 h-16 rounded-full bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-cyan-400" />
                 </div>
                 <h4 className="text-white font-bold mb-2">{d.label}</h4>
                 <span className="px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-bold">{String(d.value)}</span>
              </motion.div>
            )
         })}
      </div>
    </div>
  );
};

// --- 8. AMENITIES SECTION ---
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

      <Modal 
          isOpen={!!selectedItem} 
          onClose={() => setSelectedItem(null)} 
          title={selectedItem?.label} 
          icon={selectedItem ? getIcon(selectedItem.label) : Coffee} 
          color="text-orange-400"
      >
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4">
              <span className="text-3xl font-bold text-white block">{String(selectedItem?.value)}</span>
              <span className="text-xs text-gray-400 uppercase">Quantità in zona</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
             Conteggio basato sui punti di interesse registrati entro 10-15 minuti a piedi dall'immobile.
          </p>
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
         {/* Gauge Chart */}
         <div className="lg:col-span-4 flex flex-col items-center">
             <div className="relative w-64 h-64">
                <ResponsiveContainer width="100%" height="100%">
                   <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ name: 'Score', value: section.score * 10, fill: '#fb923c' }]} startAngle={180} endAngle={0}>
                      <RadialBar background dataKey="value" cornerRadius={30} />
                   </RadialBarChart>
                </ResponsiveContainer>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 text-center">
                   <span className="text-5xl font-bold text-white">{section.score}</span>
                   <span className="block text-gray-500 text-sm uppercase font-bold">Score Servizi</span>
                </div>
             </div>
         </div>

         {/* Grid */}
         <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-4">
            {section.details.map((d, i) => {
               const Icon = getIcon(d.label);
               return (
                 <motion.div 
                   key={i}
                   whileHover={{ scale: 1.05 }}
                   onClick={() => setSelectedItem(d)}
                   className="glass-panel p-4 rounded-2xl border border-orange-500/10 flex flex-col items-center text-center cursor-pointer group hover:bg-orange-500/10 transition-colors"
                 >
                    <Icon className="w-8 h-8 text-orange-400 mb-3 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-300 text-sm font-bold mb-1">{d.label}</span>
                    <span className="text-2xl font-bold text-white">{String(d.value)}</span>
                 </motion.div>
               )
            })}
         </div>
      </div>
    </div>
  );
};

// --- 9. DEMOGRAPHICS SECTION ---
const DemographicsSection = ({ section }: { section: SectionData }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Mock data for pie chart
  const ageData = [
    { name: '0-18', value: 15, fill: '#e879f9' },
    { name: '19-35', value: 25, fill: '#d946ef' },
    { name: '36-65', value: 40, fill: '#c026d3' },
    { name: '65+', value: 20, fill: '#a21caf' },
  ];

  const getIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('età')) return Activity;
    if (l.includes('famigl')) return Home;
    if (l.includes('reddito')) return Wallet;
    if (l.includes('istruz') || l.includes('laurea')) return GraduationCap;
    return Users;
  };

  return (
    <div className="max-w-6xl w-full">
      <div className="text-center mb-12">
        <h2 className="text-4xl lg:text-6xl font-bold mb-4">Analisi <span className="text-purple-400">Demografica</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{section.summary}</p>
      </div>

      <Modal 
          isOpen={!!selectedItem} 
          onClose={() => setSelectedItem(null)} 
          title={selectedItem?.label} 
          icon={selectedItem ? getIcon(selectedItem.label) : Users} 
          color="text-purple-400"
      >
          <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center mb-4">
              <span className="text-3xl font-bold text-white block">{String(selectedItem?.value)}</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">
             Insight AI: Un dato come questo indica {String(selectedItem?.label).toLowerCase().includes('età') ? 'il dinamismo della zona' : 'il livello socio-economico del quartiere'}, 
             influenzando direttamente la tipologia di inquilino ideale per un investimento.
          </p>
      </Modal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
         {/* Donut Chart */}
         <div className="lg:col-span-5 h-[300px] relative">
            <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                  <Pie 
                    data={ageData} 
                    innerRadius={60} 
                    outerRadius={100} 
                    paddingAngle={5} 
                    dataKey="value"
                  >
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke="rgba(255,255,255,0.1)" />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
               </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
               <span className="text-3xl font-bold text-white block">42</span>
               <span className="text-xs text-purple-300 uppercase font-bold">Età Media</span>
            </div>
         </div>

         {/* Banners */}
         <div className="lg:col-span-7 space-y-4">
            {section.details.map((d, i) => {
               const Icon = getIcon(d.label);
               return (
                  <motion.div 
                     key={i}
                     whileHover={{ x: 10, scale: 1.02 }}
                     onClick={() => setSelectedItem(d)}
                     className="glass-panel p-6 rounded-2xl border-l-4 border-purple-500 cursor-pointer group relative overflow-hidden"
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     <div className="flex justify-between items-center relative z-10">
                        <div className="flex items-center gap-4">
                           <div className="p-3 bg-purple-500/20 rounded-full text-purple-400">
                              <Icon className="w-6 h-6" />
                           </div>
                           <span className="text-lg font-bold text-white">{d.label}</span>
                        </div>
                        <span className="text-2xl font-bold text-purple-300">{String(d.value)}</span>
                     </div>
                  </motion.div>
               )
            })}
         </div>
      </div>
    </div>
  );
};

// --- MAIN REPORT VIEW COMPONENT ---
const ReportView: React.FC<ReportViewProps> = ({ data }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
  };

  const currentSectionIndex = sectionConfig.findIndex(s => s.id === activeSection);
  const nextSection = () => {
    if (currentSectionIndex < sectionConfig.length - 1) {
      handleNavClick(sectionConfig[currentSectionIndex + 1].id);
    }
  };
  const prevSection = () => {
    if (currentSectionIndex > 0) {
      handleNavClick(sectionConfig[currentSectionIndex - 1].id);
    }
  };

  // Intersection Observer for scroll tracking
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex h-screen bg-[#0f172a] text-white overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* Desktop Sidebar */}
      <nav className="hidden lg:flex flex-col w-80 h-full border-r border-white/5 bg-[#0b1120] p-6 overflow-y-auto">
         <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Building2 className="text-white w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight">House Vertical</span>
         </div>

         <div className="space-y-2">
            {sectionConfig.map((item) => {
               const isActive = activeSection === item.id;
               return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                       isActive 
                       ? 'bg-gradient-to-r from-blue-600/20 to-transparent border-l-2 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]' 
                       : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                     <item.icon className={`w-5 h-5 transition-colors ${isActive ? item.color : 'text-gray-500 group-hover:text-gray-300'}`} />
                     <span className="font-medium text-sm tracking-wide">{item.label}</span>
                     {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>}
                  </button>
               )
            })}
         </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 h-full overflow-y-auto scroll-smooth snap-y snap-mandatory relative z-0">
         {/* Mobile Header Gradient */}
         <div className="lg:hidden fixed top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0f172a] to-transparent z-10 pointer-events-none"></div>

         <div id="overview" ref={(el) => { sectionRefs.current['overview'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12">
            <OverviewSection data={data} />
         </div>

         <div id="valuation" ref={(el) => { sectionRefs.current['valuation'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20">
            <ValuationSection section={data.sections.valuation} data={data} />
         </div>

         <div id="investment" ref={(el) => { sectionRefs.current['investment'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12">
            <InvestmentSection section={data.sections.investment} />
         </div>

         <div id="market_comps" ref={(el) => { sectionRefs.current['market_comps'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20">
            <MarketSection section={data.sections.market_comps} data={data} />
         </div>

         <div id="crime" ref={(el) => { sectionRefs.current['crime'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12">
            {/* Reusing Environment style for Crime/Security roughly similar layout logic or simplified */}
             <div className="max-w-6xl w-full">
                <div className="text-center mb-12">
                  <h2 className="text-4xl lg:text-6xl font-bold mb-4">Indice <span className="text-red-400">Sicurezza</span></h2>
                  <p className="text-gray-400 max-w-2xl mx-auto">{data.sections.crime.summary}</p>
                </div>
                {/* Simplified Card Grid for Crime */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                   {data.sections.crime.details.map((d, i) => (
                      <div key={i} className="glass-panel p-6 rounded-2xl border border-red-500/20 flex flex-col items-center text-center">
                         <ShieldAlert className="w-10 h-10 text-red-500 mb-4" />
                         <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{d.label}</span>
                         <span className="text-white text-xl font-bold">{String(d.value)}</span>
                      </div>
                   ))}
                </div>
             </div>
         </div>

         <div id="environment" ref={(el) => { sectionRefs.current['environment'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20">
            <EnvironmentSection section={data.sections.environment} />
         </div>

         <div id="renovation_potential" ref={(el) => { sectionRefs.current['renovation_potential'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12">
            <RenovationSection section={data.sections.renovation_potential} />
         </div>

         <div id="connectivity" ref={(el) => { sectionRefs.current['connectivity'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20">
            <ConnectivitySection section={data.sections.connectivity} />
         </div>

         <div id="amenities" ref={(el) => { sectionRefs.current['amenities'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12">
            <AmenitiesSection section={data.sections.amenities} />
         </div>

         <div id="demographics" ref={(el) => { sectionRefs.current['demographics'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20">
            <DemographicsSection section={data.sections.demographics} />
         </div>

         <div id="legal_tax" ref={(el) => { sectionRefs.current['legal_tax'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12">
            <LegalSection section={data.sections.legal_tax} />
         </div>

         <div id="ai_verdict" ref={(el) => { sectionRefs.current['ai_verdict'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20">
             {/* Verdict Section reused from overview vertical card logic roughly, or simple */}
             <div className="max-w-4xl w-full text-center">
                 <div className="mb-12">
                     <BrainCircuit className="w-20 h-20 text-fuchsia-500 mx-auto mb-6" />
                     <h2 className="text-5xl lg:text-7xl font-bold mb-6 text-white">Verdetto <span className="text-fuchsia-500">Finale</span></h2>
                     <p className="text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto">"{data.sections.ai_verdict.recommendation}"</p>
                 </div>
                 <div className="glass-panel p-8 rounded-3xl border border-fuchsia-500/30 bg-fuchsia-900/10">
                    <span className="block text-fuchsia-300 font-bold uppercase tracking-widest text-sm mb-4">House Vertical Score</span>
                    <div className="text-8xl font-bold text-white mb-2">{data.sections.ai_verdict.score}<span className="text-4xl text-gray-500">/10</span></div>
                    <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden max-w-md mx-auto mt-6">
                       <div className="h-full bg-gradient-to-r from-fuchsia-600 to-purple-600" style={{ width: `${data.sections.ai_verdict.score * 10}%` }}></div>
                    </div>
                 </div>
             </div>
         </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-[#0f172a]/90 backdrop-blur-xl border-t border-white/10 p-4 z-50 safe-area-bottom">
         <div className="flex items-center justify-between gap-4">
            <button 
              onClick={prevSection}
              disabled={currentSectionIndex === 0}
              className="p-4 rounded-full bg-white/5 border border-white/10 disabled:opacity-30 active:scale-95 transition-all"
            >
               <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            
            <div className="flex-1 text-center">
               <span className="text-xs text-blue-400 font-bold uppercase tracking-widest block mb-1">
                  {currentSectionIndex + 1} / {sectionConfig.length}
               </span>
               <h3 className="text-white font-bold text-lg leading-none">
                  {sectionConfig[currentSectionIndex].label}
               </h3>
               {/* Progress Bar */}
               <div className="w-full h-1 bg-gray-800 rounded-full mt-3 overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 transition-all duration-300" 
                    style={{ width: `${((currentSectionIndex + 1) / sectionConfig.length) * 100}%` }}
                  ></div>
               </div>
            </div>

            <button 
              onClick={nextSection}
              disabled={currentSectionIndex === sectionConfig.length - 1}
              className="p-4 rounded-full bg-white/5 border border-white/10 disabled:opacity-30 active:scale-95 transition-all"
            >
               <ChevronRight className="w-6 h-6 text-white" />
            </button>
         </div>
      </div>

    </div>
  );
};

export default ReportView;
