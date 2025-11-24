
import React from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { ArrowRight, Activity, ShieldCheck, Database, Building2, TrendingUp, Lock, Check, Search, FileText, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

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

const FeatureCard = ({ icon: Icon, title, desc, delay }: { icon: any, title: string, desc: string, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.05, y: -5 }}
    className="glass-panel p-5 rounded-2xl border border-white/10 cursor-pointer group hover:bg-white/5 transition-colors"
  >
    <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors">
      <Icon className="w-6 h-6 text-blue-400" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
  </motion.div>
);

const PricingCard = ({ title, price, features, recommended = false, delay }: { title: string, price: string, features: string[], recommended?: boolean, delay: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className={`relative p-8 rounded-3xl border flex flex-col h-full ${recommended ? 'bg-gradient-to-b from-blue-900/40 to-[#0f172a] border-blue-500/50 shadow-2xl shadow-blue-900/20' : 'bg-[#1e293b]/50 border-white/10'}`}
  >
    {recommended && (
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
        Più Popolare
      </div>
    )}
    <h3 className="text-xl font-bold text-gray-300 mb-2">{title}</h3>
    <div className="flex items-baseline mb-6">
      <span className="text-4xl font-bold text-white">{price}</span>
      {price !== 'Gratis' && <span className="text-gray-500 ml-2">/report</span>}
    </div>
    <ul className="space-y-4 mb-8 flex-1">
      {features.map((feat, i) => (
        <li key={i} className="flex items-start">
          <Check className={`w-5 h-5 mr-3 shrink-0 ${recommended ? 'text-blue-400' : 'text-gray-500'}`} />
          <span className="text-sm text-gray-300">{feat}</span>
        </li>
      ))}
    </ul>
    <button className={`w-full py-3 rounded-xl font-bold transition-all ${recommended ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/25' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
      Scegli {title}
    </button>
  </motion.div>
);

const StepCard = ({ num, title, desc, icon: Icon }: any) => (
  <div className="flex flex-col items-center text-center relative z-10">
    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20 text-white text-xl font-bold relative group">
      <Icon className="w-8 h-8 absolute group-hover:scale-110 transition-transform" />
      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#0f172a] border border-white/10 flex items-center justify-center text-sm font-bold text-gray-400">
        {num}
      </div>
    </div>
    <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
    <p className="text-gray-400 max-w-xs">{desc}</p>
  </div>
);

const FloatingShape = ({ className }: { className: string }) => (
  <motion.div 
    animate={{ 
      y: [0, -20, 0], 
      rotate: [0, 5, -5, 0],
      scale: [1, 1.05, 1]
    }}
    transition={{ 
      duration: 8, 
      repeat: Infinity, 
      ease: "easeInOut" 
    }}
    className={`absolute opacity-20 blur-3xl rounded-full mix-blend-screen pointer-events-none ${className}`}
  />
);

const HeroSection: React.FC<HeroProps> = ({ onStart }) => {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#0f172a] text-white selection:bg-blue-500/30">
      
      {/* Dynamic Background Elements */}
      <FloatingShape className="top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-600" />
      <FloatingShape className="bottom-[10%] right-[-5%] w-[600px] h-[600px] bg-purple-600" />
      <FloatingShape className="top-[40%] left-[30%] w-[400px] h-[400px] bg-pink-600/30" />

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <Building2 className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">House Vertical</span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollTo('how-it-works')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Come funziona</button>
            <button onClick={() => scrollTo('pricing')} className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Prezzi</button>
            <button onClick={onStart} className="px-5 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition-all">
              Inizia Ora
            </button>
          </div>
        </div>
      </nav>

      {/* HERO CONTENT */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        <div className="container mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
          
          {/* Left: Text */}
          <div className="flex-1 text-center lg:text-left max-w-3xl relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 rounded-full glass-panel border border-blue-500/30 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse mr-3"></span>
              <span className="text-xs font-bold tracking-widest text-blue-300 uppercase">La nuova era del Real Estate</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-6 tracking-tight">
              Il valore reale di <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">ogni immobile.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-10 leading-relaxed max-w-lg mx-auto lg:mx-0">
              Analisi immobiliare potenziata dall'Intelligenza Artificiale. 
              Ottieni valutazioni, ROI, rischi e previsioni future in pochi secondi.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={onStart}
                className="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white transition-all duration-300 bg-blue-600 rounded-2xl shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] hover:bg-blue-500 hover:shadow-[0_0_60px_-15px_rgba(37,99,235,0.6)] hover:-translate-y-1 flex items-center justify-center"
              >
                Inizia Analisi Gratuita
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button onClick={() => scrollTo('how-it-works')} className="px-8 py-4 rounded-2xl border border-white/10 hover:bg-white/5 transition-colors font-bold text-gray-300">
                Scopri di più
              </button>
            </div>

            <div className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8 opacity-60">
              {['Revolut', 'Immobiliare', 'Idealista', 'Casa.it'].map(brand => (
                <span key={brand} className="text-xl font-bold text-white/40 uppercase tracking-widest">{brand}</span>
              ))}
            </div>
          </div>

          {/* Right: Floating Cards */}
          <div className="flex-1 w-full max-w-lg relative z-10 hidden md:block">
            <div className="grid grid-cols-2 gap-4">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 animate={{ opacity: 1, scale: 1 }}
                 transition={{ duration: 0.8 }}
                 className="col-span-2 glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden group"
               >
                  <div className="absolute top-0 right-0 p-32 bg-blue-600/20 rounded-full blur-[80px] group-hover:bg-purple-600/20 transition-colors duration-1000"></div>
                  <div className="flex justify-between items-start mb-6 relative z-10">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider mb-1">Stima Valore</p>
                      <h3 className="text-4xl font-bold text-white">€ 485.000</h3>
                    </div>
                    <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold flex items-center">
                      +4.2% YoY
                    </div>
                  </div>
                  <div className="h-40 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockData}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.5}/>
                            <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <Area type="monotone" dataKey="value" stroke="#60a5fa" strokeWidth={3} fill="url(#colorValue)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
               </motion.div>
               
               <FeatureCard icon={TrendingUp} title="ROI Calculator" desc="Affitti brevi vs lunghi." delay={0.2} />
               <FeatureCard icon={Lock} title="Risk Analysis" desc="Criminalità e ambiente." delay={0.4} />
            </div>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-[#0f172a] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Come funziona <span className="text-blue-500">House Vertical</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Tre semplici passi per ottenere un report professionale completo.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector Line */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-600/0 via-blue-600/50 to-blue-600/0 border-t border-dashed border-white/20 z-0"></div>

            <StepCard 
              num="01" 
              icon={Search} 
              title="Inserisci l'indirizzo" 
              desc="Digita via e civico. Il nostro sistema geolocalizza l'immobile con precisione metrica." 
            />
            <StepCard 
              num="02" 
              icon={Database} 
              title="Arricchimento Dati" 
              desc="Incrociamo dati dal Catasto, OMI, mappe di rischio e database immobiliari in tempo reale." 
            />
            <StepCard 
              num="03" 
              icon={FileText} 
              title="Report AI Completo" 
              desc="Ricevi un'analisi dettagliata su valore, rendimento, rischi e vivibilità della zona." 
            />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24 bg-[#0b1120] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-[#0b1120] to-[#0b1120]"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Scegli il tuo <span className="text-purple-500">Piano</span></h2>
            <p className="text-gray-400">Trasparenza totale. Nessun costo nascosto.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <PricingCard 
              title="Valutazione" 
              price="Gratis" 
              features={[
                "Stima valore istantanea",
                "Range di prezzo min/max",
                "Analisi quartiere base"
              ]} 
              delay={0}
            />
            <PricingCard 
              title="Report Pro" 
              price="€ 29" 
              recommended={true}
              features={[
                "Tutte le feature Gratis",
                "Analisi ROI Investimento",
                "Verifica Rischi Idrogeologici",
                "Analisi Criminalità e Sicurezza",
                "Export PDF Completo"
              ]} 
              delay={0.2}
            />
             <PricingCard 
              title="Agency" 
              price="Custom" 
              features={[
                "Report Illimitati",
                "Dashboard Agente dedicata",
                "White Label (Tuo Logo)",
                "API Access",
                "Supporto Prioritario"
              ]} 
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/5 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
             <Building2 className="w-5 h-5 text-gray-400" />
             <span className="font-bold text-gray-300">House Vertical</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Termini</a>
            <a href="#" className="hover:text-white transition-colors">Contatti</a>
          </div>
          <div className="mt-4 md:mt-0">
            © 2024 House Vertical Inc.
          </div>
        </div>
      </footer>

    </div>
  );
};

export default HeroSection;
