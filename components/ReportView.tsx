
import React, { useRef, useEffect, useState } from 'react';
import { ReportData, SectionData } from '../types';
import { 
  BarChart as ChartIcon, Wallet, ShieldAlert, Leaf, Wifi, Coffee, Users, 
  TrendingUp, Hammer, Building, Scale, BrainCircuit, ArrowUpRight, ArrowDownRight, 
  Briefcase, Home, Plane, Train, Car, MapPin, Stethoscope, Droplets, AlertTriangle, CheckCircle
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell, PieChart, Pie, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  CartesianGrid, Legend
} from 'recharts';

interface ReportViewProps {
  data: ReportData;
}

const sectionConfig = [
  { id: 'overview', icon: Building, label: 'Panoramica', color: 'text-blue-400', bg: 'bg-blue-500' },
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

// --- 1. VALUATION: Area Chart Focus ---
const ValuationSection = ({ section, data }: { section: SectionData, data: ReportData }) => {
  const currentVal = data.overview.estimatedValue;
  const chartData = [
    { name: '2020', value: currentVal * 0.85 },
    { name: '2021', value: currentVal * 0.92 },
    { name: '2022', value: currentVal * 0.95 },
    { name: '2023', value: currentVal * 1.02 },
    { name: '2024', value: currentVal },
    { name: '2025 (Prev)', value: currentVal * (1 + (section.score > 5 ? 0.03 : -0.01)) },
  ];

  return (
    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div className="lg:col-span-5 space-y-6">
        <h2 className="text-5xl font-bold mb-2">Valutazione <span className="text-indigo-400">AI</span></h2>
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-indigo-500 bg-indigo-900/10">
          <p className="text-gray-200 text-lg leading-relaxed">{section.summary}</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
           {section.details.slice(0,4).map((d, i) => (
             <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/10">
               <p className="text-indigo-300 text-xs uppercase font-bold">{d.label}</p>
               <p className="text-xl font-bold text-white mt-1">{String(d.value)}</p>
             </div>
           ))}
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="glass-panel p-2 rounded-3xl border border-white/10 relative overflow-hidden shadow-2xl bg-[#0f172a]/80">
          <div className="p-8">
            <div className="flex justify-between items-end mb-8">
              <div>
                <p className="text-sm text-gray-400 mb-1 uppercase tracking-widest">Valore Stimato Oggi</p>
                <h3 className="text-6xl font-bold text-white tracking-tight">€ {currentVal.toLocaleString()}</h3>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-bold flex items-center ${section.score >= 6 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {section.score >= 6 ? <ArrowUpRight className="w-5 h-5 mr-2" /> : <ArrowDownRight className="w-5 h-5 mr-2" />}
                Trend {section.score >= 6 ? 'Positivo' : 'Negativo'}
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#475569" tick={{fill: '#94a3b8', fontSize: 12}} tickLine={false} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '5 5' }} />
                  <Area type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. INVESTMENT: Short vs Long Term Cards ---
const InvestmentSection = ({ section }: { section: SectionData }) => {
  // Parsing euristico o fallback
  const longTermRaw = section.details.find(d => d.label.toLowerCase().includes('lungo') || d.label.toLowerCase().includes('canone'))?.value;
  const shortTermRaw = section.details.find(d => d.label.toLowerCase().includes('breve') || d.label.toLowerCase().includes('short'))?.value;
  
  // Clean strings to numbers for math (simple fallback logic)
  const parseEuro = (str: string | number) => Number(String(str).replace(/[^0-9]/g, '')) || 0;
  
  const longTermVal = parseEuro(longTermRaw) || 1200; 
  const shortTermVal = parseEuro(shortTermRaw) || (longTermVal * 1.8);

  return (
    <div className="max-w-7xl w-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row justify-between items-end mb-4">
        <div>
          <h2 className="text-5xl font-bold mb-2">Analisi <span className="text-emerald-400">Rendimento</span></h2>
          <p className="text-gray-400 max-w-2xl text-lg">{section.summary}</p>
        </div>
        <div className="bg-emerald-500/20 px-6 py-3 rounded-xl border border-emerald-500/30 text-emerald-400 font-bold text-xl mt-4 md:mt-0">
          Score: {section.score}/10
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Long Term Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-panel p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-900/20 to-transparent relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-32 bg-blue-500/10 rounded-full blur-[60px] -mr-16 -mt-16"></div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">Affitto Lungo Termine</h3>
          </div>
          
          <div className="space-y-6 relative z-10">
            <div>
              <p className="text-gray-400 text-sm uppercase">Canone Mensile Stimato</p>
              <p className="text-4xl font-bold text-white">€ {longTermVal.toLocaleString()}</p>
            </div>
            
            <div className="w-full bg-white/5 rounded-xl p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Occupazione</span>
                <span className="text-white font-bold">98%</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-blue-500 w-[98%] h-full"></div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-white/10">
              <span className="text-gray-400">Yield Lordo</span>
              <span className="text-xl font-bold text-blue-400">~{((longTermVal * 12 / (longTermVal * 250)) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </motion.div>

        {/* Short Term Card */}
        <motion.div 
          whileHover={{ y: -5 }}
          className="glass-panel p-8 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/20 to-transparent relative overflow-hidden shadow-emerald-900/20 shadow-2xl"
        >
          <div className="absolute top-0 right-0 p-32 bg-emerald-500/10 rounded-full blur-[60px] -mr-16 -mt-16"></div>
          <div className="absolute top-4 right-4 bg-emerald-500 text-black text-xs font-bold px-3 py-1 rounded-full">
            CONSIGLIATO
          </div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
              <Home className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-white">Short Rent (Airbnb)</h3>
          </div>
          
          <div className="space-y-6 relative z-10">
            <div>
              <p className="text-emerald-200/70 text-sm uppercase">Potenziale Mensile (Alta Stagione)</p>
              <p className="text-5xl font-bold text-emerald-400">€ {shortTermVal.toLocaleString()}</p>
            </div>
            
            <div className="w-full bg-emerald-900/30 rounded-xl p-4 border border-emerald-500/20">
               <div className="flex justify-between text-sm mb-2">
                <span className="text-emerald-200/70">Occupazione Media</span>
                <span className="text-emerald-400 font-bold">75%</span>
              </div>
              <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 w-[75%] h-full"></div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-emerald-500/20">
              <span className="text-emerald-200/70">Yield Lordo</span>
              <span className="text-2xl font-bold text-emerald-400">~{((shortTermVal * 12 * 0.85 / (shortTermVal * 200)) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Cashflow Bar */}
      <div className="w-full bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="flex items-center gap-3">
            <Wallet className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="font-bold text-white">Vertical Advice</p>
              <p className="text-sm text-gray-400">{section.recommendation}</p>
            </div>
         </div>
         <button className="px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-colors">
            Scarica Business Plan Excel
         </button>
      </div>
    </div>
  );
};

// --- 3. SAFETY: Hydrogeological & Hospital ---
const SafetySection = ({ section }: { section: SectionData }) => {
  const hydroRisk = section.details.find(d => d.label.toLowerCase().includes('idro'))?.value || "Basso";
  const hospitalDist = section.details.find(d => d.label.toLowerCase().includes('ospedal'))?.value || "2 km";

  return (
    <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="space-y-8">
        <h2 className="text-5xl font-bold">Analisi <span className="text-red-400">Rischi</span></h2>
        <p className="text-gray-300 text-xl leading-relaxed">{section.summary}</p>
        
        {/* Hydro Risk Block */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <Droplets className="w-6 h-6 text-blue-400" />
              <h4 className="font-bold text-lg">Rischio Idrogeologico</h4>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${
              String(hydroRisk).includes('Alto') ? 'bg-red-500 text-white' : 
              String(hydroRisk).includes('Medio') ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white'
            }`}>
              {hydroRisk}
            </span>
          </div>
          <div className="w-full h-4 bg-gray-800 rounded-full overflow-hidden relative">
            <div className="absolute left-0 top-0 h-full w-1/3 bg-green-500 opacity-50"></div>
            <div className="absolute left-1/3 top-0 h-full w-1/3 bg-yellow-500 opacity-50"></div>
            <div className="absolute right-0 top-0 h-full w-1/3 bg-red-500 opacity-50"></div>
            {/* Indicator */}
            <div 
              className="absolute top-0 w-1 h-full bg-white shadow-[0_0_10px_white]"
              style={{ 
                left: String(hydroRisk).includes('Alto') ? '85%' : String(hydroRisk).includes('Medio') ? '50%' : '15%' 
              }}
            ></div>
          </div>
        </div>

        {/* Hospital Block */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="p-3 bg-red-500/20 rounded-full">
               <Stethoscope className="w-6 h-6 text-red-400" />
             </div>
             <div>
               <p className="text-gray-400 text-sm">Pronto Soccorso più vicino</p>
               <p className="text-white font-bold text-xl">{hospitalDist}</p>
             </div>
           </div>
           <CheckCircle className="w-6 h-6 text-green-500" />
        </div>
      </div>

      <div className="h-[500px] w-full relative">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={[
            { subject: 'Furti', A: 120, fullMark: 150 },
            { subject: 'Vandalismo', A: 98, fullMark: 150 },
            { subject: 'Microcrim.', A: 86, fullMark: 150 },
            { subject: 'Rumore', A: 99, fullMark: 150 },
            { subject: 'Traffico', A: 85, fullMark: 150 },
            { subject: 'Degrado', A: 65, fullMark: 150 },
          ]}>
            <PolarGrid stroke="#334155" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 14 }} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Radar name="Zona" dataKey="A" stroke="#f87171" strokeWidth={3} fill="#f87171" fillOpacity={0.3} />
          </RadarChart>
        </ResponsiveContainer>
        <div className="absolute bottom-0 w-full text-center">
          <p className="text-red-400 font-bold text-lg">Indice Criminalità: {section.score}/10</p>
          <p className="text-gray-500 text-sm">Più alto è il numero, più sicura è la zona.</p>
        </div>
      </div>
    </div>
  );
};

// --- 4. CONNECTIVITY: Timeline Layout ---
const ConnectivitySection = ({ section }: { section: SectionData }) => {
  const items = [
    { icon: Plane, key: 'Aeroporto', color: 'text-cyan-400', bg: 'bg-cyan-500' },
    { icon: Train, key: 'Stazione', color: 'text-orange-400', bg: 'bg-orange-500' },
    { icon: Building, key: 'Centro', color: 'text-purple-400', bg: 'bg-purple-500' },
    { icon: Car, key: 'Autostrada', color: 'text-blue-400', bg: 'bg-blue-500' },
  ];

  const getVal = (k: string) => section.details.find(d => d.label.includes(k) || d.label.includes(k.split(' ')[0]))?.value || "N/D";

  return (
    <div className="max-w-6xl w-full">
      <h2 className="text-5xl font-bold mb-12 text-center">Mobilità & <span className="text-cyan-400">Connessioni</span></h2>
      
      <div className="relative">
        {/* Central Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500/0 via-cyan-500/50 to-cyan-500/0 hidden md:block"></div>
        
        <div className="space-y-12">
          {items.map((item, idx) => (
            <motion.div 
              key={item.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 w-full md:w-auto">
                 <div className={`glass-panel p-6 rounded-2xl border border-white/5 hover:border-${item.color.split('-')[1]}-500/50 transition-colors`}>
                    <div className="flex justify-between items-start">
                       <div>
                         <h4 className="text-xl font-bold text-white mb-1">{item.key}</h4>
                         <p className="text-gray-400 text-sm">Tempo di percorrenza stimato</p>
                       </div>
                       <div className="text-2xl font-bold font-mono text-white">{String(getVal(item.key))}</div>
                    </div>
                 </div>
              </div>
              
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <div className="flex-1 hidden md:block"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 5. AMENITIES: Bento Grid ---
const AmenitiesSection = ({ section }: { section: SectionData }) => {
  return (
    <div className="max-w-6xl w-full">
      <div className="text-center mb-12">
        <h2 className="text-5xl font-bold mb-4">Servizi in <span className="text-orange-400">Zona</span></h2>
        <p className="text-gray-400 max-w-2xl mx-auto">{section.summary}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[180px]">
        {/* Main large block */}
        <div className="col-span-2 row-span-2 glass-panel p-8 rounded-3xl border border-orange-500/20 bg-gradient-to-br from-orange-900/10 to-transparent flex flex-col justify-between relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-24 bg-orange-500/10 rounded-full blur-[50px] group-hover:bg-orange-500/20 transition-all"></div>
           <Coffee className="w-12 h-12 text-orange-400" />
           <div>
             <h3 className="text-3xl font-bold text-white mb-2">Lifestyle</h3>
             <p className="text-gray-400">Punteggio vivibilità elevato. Zona ricca di servizi premium.</p>
           </div>
        </div>

        {/* Small detail blocks */}
        {section.details.map((d, i) => (
          <motion.div 
            key={i}
            whileHover={{ scale: 1.02 }}
            className="glass-panel p-6 rounded-3xl border border-white/5 flex flex-col justify-center items-center text-center gap-3 bg-[#1e293b]/50"
          >
            <div className="w-2 h-2 rounded-full bg-orange-400 mb-2"></div>
            <span className="text-3xl font-bold text-white">{String(d.value).replace(/[^0-9]/g, '') || "N/A"}</span>
            <span className="text-xs text-gray-400 uppercase tracking-wider">{d.label}</span>
          </motion.div>
        ))}

        {/* Comparison Block */}
        <div className="col-span-2 glass-panel p-6 rounded-3xl border border-white/5 flex items-center justify-between">
           <div>
             <p className="text-gray-400 text-sm">Media Servizi Quartiere</p>
             <div className="flex gap-1 mt-2">
               {[1,2,3,4,5].map(s => <div key={s} className={`w-8 h-2 rounded-full ${s <= (section.score/2) ? 'bg-orange-500' : 'bg-gray-700'}`}></div>)}
             </div>
           </div>
           <span className="text-4xl font-bold text-orange-400">{section.score}/10</span>
        </div>
      </div>
    </div>
  );
};

// --- 6. DEMOGRAPHICS: Age Bars ---
const DemographicsSection = ({ section }: { section: SectionData }) => {
  // Mock data distribution based on description if not available
  const data = [
    { name: '0-18', val: 15 },
    { name: '19-35', val: 35 },
    { name: '36-50', val: 30 },
    { name: '51-65', val: 15 },
    { name: '65+', val: 5 },
  ];

  return (
    <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      <div>
         <h2 className="text-5xl font-bold mb-6">Chi abita <span className="text-purple-400">Qui?</span></h2>
         <div className="glass-panel p-8 rounded-3xl border-l-4 border-purple-500 bg-purple-900/10 mb-8">
            <p className="text-xl text-gray-200">{section.summary}</p>
         </div>
         <div className="grid grid-cols-2 gap-4">
            {section.details.slice(0,2).map((d,i) => (
               <div key={i} className="bg-white/5 p-4 rounded-xl">
                 <p className="text-purple-300 text-xs uppercase">{d.label}</p>
                 <p className="text-2xl font-bold">{String(d.value)}</p>
               </div>
            ))}
         </div>
      </div>

      <div className="h-[400px]">
         <h3 className="text-sm text-gray-400 uppercase mb-4 text-center">Distribuzione Età Stimata</h3>
         <ResponsiveContainer width="100%" height="100%">
           <BarChart layout="vertical" data={data} margin={{ left: 20, right: 20 }}>
             <XAxis type="number" hide />
             <YAxis dataKey="name" type="category" stroke="#94a3b8" width={50} />
             <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
             <Bar dataKey="val" radius={[0, 4, 4, 0]} barSize={40}>
               {data.map((entry, index) => (
                 <Cell key={`cell-${index}`} fill={['#e879f9', '#d946ef', '#c026d3', '#a21caf', '#86198f'][index]} />
               ))}
             </Bar>
           </BarChart>
         </ResponsiveContainer>
      </div>
    </div>
  );
};

// --- 7. RENOVATION: Before/After ---
const RenovationSection = ({ section }: { section: SectionData }) => {
  return (
    <div className="max-w-5xl w-full">
      <h2 className="text-5xl font-bold mb-12 text-center">Potenziale <span className="text-pink-400">Ristrutturazione</span></h2>
      
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {/* Current State */}
        <div className="w-64 h-64 rounded-full border-4 border-gray-700 flex flex-col items-center justify-center bg-gray-900 opacity-50 scale-90">
           <span className="text-gray-500 font-bold text-xl mb-2">Stato Attuale</span>
           <span className="text-gray-400">Valore Base</span>
        </div>

        <div className="h-1 md:h-24 w-24 md:w-1 bg-gradient-to-r md:bg-gradient-to-b from-gray-700 to-pink-500"></div>

        {/* Potential State */}
        <div className="w-80 h-80 rounded-full border-4 border-pink-500 flex flex-col items-center justify-center bg-pink-900/20 shadow-[0_0_50px_rgba(236,72,153,0.3)] relative">
           <Hammer className="w-8 h-8 text-pink-500 mb-4 animate-bounce" />
           <span className="text-white font-bold text-2xl mb-1">Post-Renovation</span>
           <span className="text-pink-300 text-lg">+35% Valore</span>
           
           {/* Satellites */}
           <div className="absolute -top-4 bg-gray-800 px-4 py-2 rounded-full border border-pink-500/50 text-xs">
              Bonus Fiscali ✅
           </div>
           <div className="absolute -bottom-4 bg-gray-800 px-4 py-2 rounded-full border border-pink-500/50 text-xs">
              Classe Energetica A ✅
           </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
         {section.details.map((d,i) => (
           <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border-l-4 border-pink-500">
             <span className="text-gray-300">{d.label}</span>
             <span className="text-xl font-bold text-white">{String(d.value)}</span>
           </div>
         ))}
      </div>
    </div>
  );
};

// --- Main Render Logic ---

const GenericSection = ({ section, icon: Icon, color }: { section: SectionData, icon: any, color: string }) => (
  <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
    <div className="order-2 lg:order-1 grid grid-cols-1 gap-4">
       {section.details.map((d, i) => (
         <motion.div 
           key={i}
           whileHover={{ scale: 1.02 }}
           className="glass-panel p-6 rounded-2xl border border-white/5 flex justify-between items-center group"
         >
           <span className="text-gray-400 group-hover:text-white transition-colors">{d.label}</span>
           <span className={`text-xl font-bold ${color}`}>{String(d.value)}</span>
         </motion.div>
       ))}
       <div className="glass-panel p-6 rounded-2xl border border-white/5 mt-4">
          <p className="text-xs text-gray-500 uppercase mb-2">Vertical Advice</p>
          <p className="text-white font-medium">{section.recommendation}</p>
       </div>
    </div>
    <div className="order-1 lg:order-2 space-y-6 text-center lg:text-right">
       <div className={`inline-flex p-4 rounded-full bg-white/5 ${color} mb-4`}>
         <Icon className="w-10 h-10" />
       </div>
       <h2 className="text-5xl font-bold">{section.title}</h2>
       <p className="text-xl text-gray-300 leading-relaxed">{section.summary}</p>
    </div>
  </div>
);

const ReportView: React.FC<ReportViewProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveSection(index);
          }
        });
      },
      { threshold: 0.5 }
    );
    const sections = document.querySelectorAll('.report-section');
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [data]); // Re-run if data changes

  const scrollToSection = (index: number) => {
    const section = document.querySelector(`[data-index="${index}"]`);
    section?.scrollIntoView({ behavior: 'smooth' });
  };

  const renderSectionContent = (config: typeof sectionConfig[0], sectionData: SectionData) => {
    switch (config.id) {
      case 'valuation': return <ValuationSection section={sectionData} data={data} />;
      case 'investment': return <InvestmentSection section={sectionData} />;
      case 'crime': return <SafetySection section={sectionData} />;
      case 'connectivity': return <ConnectivitySection section={sectionData} />;
      case 'amenities': return <AmenitiesSection section={sectionData} />;
      case 'demographics': return <DemographicsSection section={sectionData} />;
      case 'renovation_potential': return <RenovationSection section={sectionData} />;
      // Per le sezioni restanti (Environment, Market, Legal, Verdict), usiamo layout generici ma puliti, o potremmo espanderli ulteriormente.
      // Per ora usiamo il GenericSection ottimizzato per coerenza ma diversità di dati.
      default: return <GenericSection section={sectionData} icon={config.icon} color={config.color} />;
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#0f172a] text-white font-sans selection:bg-blue-500/30">
      
      {/* Navigation Sidebar */}
      <nav className="fixed left-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
        {sectionConfig.map((item, idx) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(idx)}
            className={`group relative flex items-center justify-center w-10 h-10 transition-all ${
              activeSection === idx ? 'scale-110' : 'opacity-50 hover:opacity-100'
            }`}
          >
             <div className={`absolute inset-0 rounded-full transition-all duration-300 ${activeSection === idx ? item.bg + '/20' : 'bg-transparent'}`}></div>
             <div className={`relative z-10 p-2 rounded-full glass-panel border border-white/10 ${activeSection === idx ? item.color : 'text-gray-400'}`}>
               <item.icon className="w-4 h-4" />
             </div>
             <div className="absolute left-14 px-3 py-1 bg-slate-900/90 backdrop-blur border border-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
               <span className="text-xs font-bold text-white">{item.label}</span>
             </div>
          </button>
        ))}
      </nav>

      <div ref={containerRef} className="h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
        {/* 0. OVERVIEW - Kept original high-impact design */}
        <section data-index="0" className="report-section h-screen w-full snap-start flex items-center justify-center relative p-6 overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0f172a] to-[#0f172a] z-0"></div>
           <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             <div className="space-y-8 animate-fade-in-up">
               <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-wider uppercase">
                 <Building className="w-3 h-3" />
                 <span>Report Immobiliare Completo</span>
               </div>
               <div>
                 <p className="text-gray-400 text-lg mb-2">Valutazione di mercato stimata</p>
                 <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-500">
                   € {data.overview.estimatedValue.toLocaleString()}
                 </h1>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="glass-panel p-4 rounded-xl border border-white/10">
                    <p className="text-gray-500 text-xs uppercase mb-1">Prezzo / mq</p>
                    <p className="text-2xl font-bold font-mono">€ {Math.round(data.overview.pricePerSqm).toLocaleString()}</p>
                  </div>
                  <div className="glass-panel p-4 rounded-xl border border-white/10">
                     <p className="text-gray-500 text-xs uppercase mb-1">Affidabilità AI</p>
                     <div className="flex items-center space-x-2">
                       <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                         <div className="h-full bg-green-400" style={{width: `${data.overview.confidence}%`}}></div>
                       </div>
                       <span className="font-bold text-green-400">{data.overview.confidence}%</span>
                     </div>
                  </div>
               </div>
             </div>
             <div className="relative flex justify-center items-center">
                <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full animate-pulse"></div>
                <div className="relative glass-panel p-8 rounded-[2.5rem] border border-white/10 w-full max-w-md aspect-square flex flex-col items-center justify-center text-center shadow-2xl">
                   <h3 className="text-xl font-bold mb-8 text-gray-300">Vertical Score</h3>
                   <div className="relative w-64 h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[{ value: data.sections.ai_verdict.score }, { value: 10 - data.sections.ai_verdict.score }]}
                            innerRadius={80}
                            outerRadius={100}
                            startAngle={180}
                            endAngle={0}
                            dataKey="value"
                            stroke="none"
                            cornerRadius={10}
                            paddingAngle={5}
                          >
                            <Cell fill="url(#blueGradient)" />
                            <Cell fill="#1e293b" />
                          </Pie>
                          <defs>
                            <linearGradient id="blueGradient" x1="0" y1="0" x2="1" y2="0">
                              <stop offset="0%" stopColor="#60a5fa" />
                              <stop offset="100%" stopColor="#a78bfa" />
                            </linearGradient>
                          </defs>
                        </PieChart>
                      </ResponsiveContainer>
                      <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
                        <span className="text-7xl font-bold tracking-tighter">{data.sections.ai_verdict.score}</span>
                        <span className="text-sm text-gray-400 uppercase tracking-widest mt-2">Eccellente</span>
                      </div>
                   </div>
                </div>
             </div>
           </div>
           <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-500">
             <ArrowDownRight className="w-6 h-6 rotate-45" />
           </div>
        </section>

        {/* Dynamic Sections */}
        {sectionConfig.map((config, idx) => {
            if (config.id === 'overview') return null;
            const sectionKey = config.id as keyof typeof data.sections;
            const section = data.sections[sectionKey];
            if (!section) return null;

            return (
              <section 
                key={config.id} 
                data-index={idx} 
                className="report-section h-screen w-full snap-start flex items-center justify-center p-6 relative overflow-hidden"
              >
                {/* Dynamic Backgrounds per Section */}
                <div className={`absolute -right-[20%] top-[20%] w-[50%] h-[50%] ${config.bg}/10 rounded-full blur-[120px] pointer-events-none`}></div>
                <div className={`absolute -left-[20%] -bottom-[20%] w-[40%] h-[40%] ${config.bg}/5 rounded-full blur-[100px] pointer-events-none`}></div>
                
                {renderSectionContent(config, section)}

              </section>
            );
        })}

        {/* Final CTA Section */}
        <section data-index={12} className="report-section h-screen w-full snap-start flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent"></div>
           <div className="relative z-10 text-center max-w-3xl px-6">
             <div className="w-20 h-20 mx-auto bg-white/10 rounded-full flex items-center justify-center mb-8 backdrop-blur-md border border-white/20">
               <Building className="w-10 h-10 text-white" />
             </div>
             <h2 className="text-5xl md:text-7xl font-bold mb-8">Il tuo prossimo passo?</h2>
             <p className="text-xl text-gray-300 mb-12 leading-relaxed">
               Hai sbloccato l'analisi preliminare di House Vertical. <br/>
               Scarica il report legale completo o connettiti con un esperto di zona.
             </p>
             <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <button className="group relative px-8 py-5 bg-white text-black font-bold rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl shadow-white/10">
                   <span className="flex items-center">
                     Scarica PDF Completo (€29)
                     <ArrowUpRight className="ml-2 w-5 h-5 group-hover:rotate-45 transition-transform" />
                   </span>
                </button>
             </div>
             <p className="mt-8 text-sm text-gray-500">
               House Vertical © 2024 - Dati basati su stime algoritmiche AI.
             </p>
           </div>
        </section>
      </div>

    </div>
  );
};

export default ReportView;
