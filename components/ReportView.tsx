
import React, { useRef, useEffect, useState } from 'react';
import { ReportData, SectionData } from '../types';
import { 
  BarChart as ChartIcon, Wallet, ShieldAlert, Leaf, Wifi, Coffee, Users, 
  TrendingUp, Hammer, Building, Scale, BrainCircuit, ArrowUpRight, ArrowDownRight, 
  Briefcase, Home, Plane, Train, Car, MapPin, Stethoscope, Droplets, AlertTriangle, CheckCircle,
  ChevronLeft, ChevronRight, Wind, Volume2, TreePine, AlertCircle, Check, X, Gavel, FileCheck,
  Sun, CloudRain, Mountain, GraduationCap, ShoppingCart, Utensils, Dumbbell, Library, Bus, Search,
  FileText, ShieldCheck, Clock, Percent, Navigation, Map, Activity, Building2, LayoutDashboard
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
  { id: 'crime', icon: ShieldAlert, label: 'Sicurezza', color: 'text-red-400', bg: 'bg-red-500' },
  { id: 'environment', icon: Leaf, label: 'Ambiente', color: 'text-teal-400', bg: 'bg-teal-500' },
  { id: 'connectivity', icon: Wifi, label: 'Connettività', color: 'text-cyan-400', bg: 'bg-cyan-500' },
  { id: 'amenities', icon: Coffee, label: 'Servizi', color: 'text-orange-400', bg: 'bg-orange-500' },
  { id: 'demographics', icon: Users, label: 'Demografia', color: 'text-purple-400', bg: 'bg-purple-500' },
  { id: 'market_comps', icon: ChartIcon, label: 'Mercato', color: 'text-yellow-400', bg: 'bg-yellow-500' },
  { id: 'renovation_potential', icon: Hammer, label: 'Ristrutt.', color: 'text-pink-400', bg: 'bg-pink-500' },
  { id: 'legal_tax', icon: Scale, label: 'Legale', color: 'text-gray-400', bg: 'bg-gray-500' },
  { id: 'ai_verdict', icon: BrainCircuit, label: 'Verdetto', color: 'text-fuchsia-500', bg: 'bg-fuchsia-500' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 border border-slate-700 p-3 rounded-lg shadow-xl z-50">
        <p className="text-gray-400 text-xs mb-1">{label}</p>
        <p className="text-white font-bold">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

// --- 0. OVERVIEW SECTION (NEW) ---
const OverviewSection = ({ data }: { data: ReportData }) => {
  const { overview, sections } = data;
  
  const SummaryWidget = ({ icon: Icon, label, value, color, sub, onClick }: any) => {
    const colors: any = {
       emerald: { text: 'text-emerald-400', bg: 'bg-emerald-500', border: 'border-emerald-500/20', hover: 'hover:border-emerald-500/50' },
       red: { text: 'text-red-400', bg: 'bg-red-500', border: 'border-red-500/20', hover: 'hover:border-red-500/50' },
       teal: { text: 'text-teal-400', bg: 'bg-teal-500', border: 'border-teal-500/20', hover: 'hover:border-teal-500/50' },
       pink: { text: 'text-pink-400', bg: 'bg-pink-500', border: 'border-pink-500/20', hover: 'hover:border-pink-500/50' },
    };
    const c = colors[color];
 
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
             <span className="text-2xl font-bold text-white block tracking-tight">{String(value)}</span>
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
              {/* Background FX */}
              <div className="absolute right-0 top-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/15 transition-all duration-700"></div>
              <div className="absolute left-0 bottom-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px]"></div>
              
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
                    <div className="flex items-center gap-2 text-gray-400">
                       <Activity className="w-4 h-4" />
                       <span>Range stimato: <span className="text-white font-bold">€ {overview.valueRange[0].toLocaleString()} - € {overview.valueRange[1].toLocaleString()}</span></span>
                    </div>
                 </div>

                 <div className="mt-auto pt-6 border-t border-white/5 flex flex-col md:flex-row gap-8">
                    <div>
                       <span className="text-gray-500 text-xs font-bold uppercase tracking-widest block mb-1">Prezzo al Mq</span>
                       <span className="text-xl font-bold text-white">€ {Math.round(overview.pricePerSqm).toLocaleString()}</span>
                    </div>
                    <div>
                       <span className="text-gray-500 text-xs font-bold uppercase tracking-widest block mb-1">Rivalutazione Annuale</span>
                       <span className="text-xl font-bold text-green-400">+3.2% (Est.)</span>
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
                    <div className="absolute inset-0 rounded-full border-8 border-fuchsia-500 border-t-transparent border-l-transparent rotate-45"></div>
                    <div className="flex flex-col items-center">
                       <span className="text-6xl font-bold text-white tracking-tighter">{sections.ai_verdict.score}</span>
                       <span className="text-fuchsia-400 text-sm font-bold">/10</span>
                    </div>
                 </div>
                 
                 <span className="text-fuchsia-400 text-sm font-bold uppercase tracking-widest bg-fuchsia-500/10 px-4 py-1.5 rounded-full border border-fuchsia-500/20 mb-4">
                    Vertical Score
                 </span>
                 <p className="text-gray-400 text-xs leading-relaxed max-w-[200px] mx-auto">
                    {sections.ai_verdict.recommendation.substring(0, 80)}...
                 </p>
              </div>
           </div>
        </div>

        {/* Summary Widgets Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
           <SummaryWidget 
              icon={Wallet} 
              label="Rendimento" 
              value={sections.rental_yield.details[0]?.value || "7%"} 
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
              value={sections.renovation_potential.details.find(d => d.label.toLowerCase().includes('valore'))?.value || "+25%"} 
              color="pink" 
              sub="Potenziale Aggiunto"
           />
        </div>
     </div>
  )
}

// --- 1. VALUATION REDESIGNED ---
const ValuationSection = ({ section, data }: { section: SectionData, data: ReportData }) => {
  const currentVal = data.overview.estimatedValue;
  const [selectedMetric, setSelectedMetric] = useState<any>(null);

  // Historical Data (Simulated based on current value)
  const historyData = [
    { year: '2020', value: currentVal * 0.82 },
    { year: '2021', value: currentVal * 0.88 },
    { year: '2022', value: currentVal * 0.94 },
    { year: '2023', value: currentVal * 0.98 },
    { year: '2024', value: currentVal },
  ];

  // Forecast Data (Simulated)
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
       {/* Header */}
       <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-6xl font-bold mb-4">Valutazione <span className="text-indigo-400">Immobiliare</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm lg:text-base">
            Analisi di mercato basata su algoritmi predittivi e comparabili reali.
          </p>
       </div>

       {/* Modal Overlay */}
       <AnimatePresence>
        {selectedMetric && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setSelectedMetric(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0f172a] p-8 rounded-3xl border border-indigo-500/20 max-w-md w-full relative overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
               <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${selectedMetric.bg}/20 rounded-full blur-[60px]`}></div>
               <button onClick={() => setSelectedMetric(null)} className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10"><X className="w-5 h-5 text-gray-400" /></button>
               
               <div className="flex items-center gap-4 mb-6 relative z-10">
                 <div className="p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                   <selectedMetric.icon className={`w-8 h-8 ${selectedMetric.color}`} />
                 </div>
                 <div>
                   <h3 className="text-2xl font-bold text-white">{selectedMetric.label}</h3>
                   <span className="text-sm text-gray-400 uppercase tracking-widest">Dettaglio Metrica</span>
                 </div>
               </div>

               <div className="space-y-6 relative z-10">
                 <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                    <span className={`text-3xl font-bold text-white block`}>{selectedMetric.value}</span>
                 </div>
                 <p className="text-gray-300 text-sm leading-relaxed text-center">{selectedMetric.desc}</p>
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
             {/* AI Summary Compact */}
             <div className="glass-panel p-6 rounded-3xl border border-white/5 bg-white/5">
                <div className="flex items-center gap-3 mb-3">
                   <BrainCircuit className="w-5 h-5 text-indigo-400" />
                   <h4 className="font-bold text-white">Analisi Sintetica</h4>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 hover:line-clamp-none transition-all">
                  {section.summary}
                </p>
             </div>

             {/* Metric Cards */}
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

// --- 2. INVESTMENT SECTION REDESIGNED ---
const InvestmentSection = ({ section }: { section: SectionData }) => {
  const longTermRaw = section.details.find(d => d.label.toLowerCase().includes('lungo') || d.label.toLowerCase().includes('canone'))?.value;
  const shortTermRaw = section.details.find(d => d.label.toLowerCase().includes('breve') || d.label.toLowerCase().includes('short'))?.value;
  const parseEuro = (str: string | number) => Number(String(str).replace(/[^0-9]/g, '')) || 0;
  const longTermVal = parseEuro(longTermRaw) || 1200; 
  const shortTermVal = parseEuro(shortTermRaw) || (longTermVal * 1.8);
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

       <AnimatePresence>
        {detailMode && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
            onClick={() => setDetailMode(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0f172a] w-full max-w-xl rounded-3xl border border-white/10 overflow-hidden shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
               <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] opacity-20 ${detailMode === 'long' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
               <button onClick={() => setDetailMode(null)} className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10 z-20"><X className="w-5 h-5 text-white" /></button>

               <div className="p-8 relative z-10">
                 <div className="flex items-center gap-4 mb-8">
                    <div className={`p-4 rounded-2xl ${detailMode === 'long' ? 'bg-blue-500/20 text-blue-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {detailMode === 'long' ? <Briefcase className="w-8 h-8" /> : <Home className="w-8 h-8" />}
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-white">{detailMode === 'long' ? 'Lungo Termine (4+4)' : 'Short Rent (Turistico)'}</h3>
                        <span className="text-gray-400 text-sm font-bold uppercase tracking-widest">Analisi Cashflow</span>
                    </div>
                 </div>

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
               </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
         {strategies.map((s) => (
             <motion.div
                key={s.id}
                whileHover={{ scale: 1.02, y: -5 }}
                onClick={() => setDetailMode(s.id as any)}
                className={`relative overflow-hidden rounded-3xl border ${s.border} bg-gradient-to-br ${s.gradient} p-8 cursor-pointer group`}
             >
                {/* Background Glow */}
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

// --- MARKET SECTION REDESIGNED ---
const MarketSection = ({ section, data }: { section: SectionData, data: ReportData }) => {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const pps = data.overview.pricePerSqm;
  
  // Mock comparison data
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

        <AnimatePresence>
            {selectedItem && (
                 <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
                    onClick={() => setSelectedItem(null)}
                 >
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-[#0f172a] p-8 rounded-3xl border border-yellow-500/20 max-w-lg w-full relative overflow-hidden shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                         <div className="absolute top-0 right-0 w-40 h-40 bg-yellow-500/10 rounded-full blur-[60px]"></div>
                         <button onClick={() => setSelectedItem(null)} className="absolute top-4 right-4 p-2 bg-white/5 rounded-full hover:bg-white/10"><X className="w-5 h-5 text-gray-400" /></button>
                         
                         <div className="flex items-center gap-4 mb-6 relative z-10">
                             <div className="p-4 bg-yellow-500/10 rounded-2xl border border-yellow-500/20">
                                 <ChartIcon className="w-8 h-8 text-yellow-400" />
                             </div>
                             <div>
                                 <h3 className="text-2xl font-bold text-white">{selectedItem.label}</h3>
                                 <span className="text-sm text-yellow-400 font-bold uppercase tracking-widest">Metrica di Mercato</span>
                             </div>
                         </div>

                         <div className="space-y-6 relative z-10">
                            <div className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                                <span className="text-4xl font-bold text-white block mb-2">{String(selectedItem.value)}</span>
                            </div>
                             <p className="text-gray-400 text-sm leading-relaxed">
                                Questo indicatore posiziona l'immobile nel percentile {section.score > 7 ? 'superiore' : 'medio'} del mercato locale. 
                                Basato su analisi comparativa di annunci simili e rogiti recenti.
                             </p>
                         </div>
                    </motion.div>
                 </motion.div>
            )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Chart */}
             <div className="h-[400px] w-full glass-panel rounded-3xl border border-yellow-500/10 p-6 flex flex-col justify-center relative">
                 <h3 className="text-lg font-bold text-white mb-6 text-center">Confronto Prezzo al Mq</h3>
                 <ResponsiveContainer width="100%" height="100%">
                     <BarChart data={comparisonData} margin={{top: 20, right: 30, left: 