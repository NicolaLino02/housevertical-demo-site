
import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowRight, Activity, ShieldCheck, Database } from 'lucide-react';

const mockData = [
  { name: 'Gen', value: 2400 },
  { name: 'Feb', value: 1398 },
  { name: 'Mar', value: 3800 },
  { name: 'Apr', value: 3908 },
  { name: 'Mag', value: 4800 },
  { name: 'Giu', value: 3800 },
  { name: 'Lug', value: 4300 },
];

interface HeroProps {
  onStart: () => void;
}

const HeroSection: React.FC<HeroProps> = ({ onStart }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
        
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-flex items-center px-4 py-2 rounded-full glass-panel border border-white/10 mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse mr-2"></span>
            <span className="text-xs font-semibold tracking-wide text-gray-300 uppercase">Intelligenza Artificiale Immobiliare</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6">
            Trasforma ogni indirizzo in una decisione <span className="gradient-text">guidata dai dati</span>.
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-lg mx-auto md:mx-0">
            House Vertical rivoluziona il Real Estate con copertura dati al 90%, insight generativi e valutazioni istantanee per privati e agenzie.
          </p>
          
          <button 
            onClick={onStart}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-blue-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-blue-700"
          >
            Inizia Analisi Gratuita
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            <div className="absolute -inset-3 rounded-full bg-blue-400 opacity-20 group-hover:opacity-40 blur-lg transition-opacity duration-200" />
          </button>

          <div className="mt-12 flex items-center justify-center md:justify-start space-x-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-blue-400" />
              <span>7+ Fonti Ufficiali</span>
            </div>
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              <span>Dati Certificati</span>
            </div>
          </div>
        </div>

        {/* Visual/Graph Content */}
        <div className="flex-1 w-full max-w-lg flex justify-center">
          <div className="relative glass-panel rounded-3xl p-6 border border-white/10 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 w-full">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-bold text-white">Previsione Mercato</h3>
                <p className="text-sm text-gray-400">Milano, IT - Centro Storico</p>
              </div>
              <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                <Activity className="w-3 h-3 mr-1" /> +12.5%
              </div>
            </div>
            
            {/* Fixed Height Container for Recharts to prevent errors */}
            <div className="h-64 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <XAxis dataKey="name" hide />
                  <YAxis hide />
                  <Area type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-xs text-gray-400 uppercase">Valore Stimato</p>
                <p className="text-xl font-bold">€ 1.2M</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl">
                <p className="text-xs text-gray-400 uppercase">Indice Sicurezza</p>
                <p className="text-xl font-bold text-green-400">9.2/10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
