import React, { useRef, useEffect, useState } from 'react';
import { ReportData } from '../types';
import {
  LayoutDashboard, TrendingUp, Wallet, BarChart as ChartIcon, ShieldAlert, Leaf, Hammer, Wifi, Coffee, Users, Scale, BrainCircuit, ChevronLeft, ChevronRight, Building2
} from 'lucide-react';

import OverviewSection from './report/OverviewSection';
import ValuationSection from './report/ValuationSection';
import InvestmentSection from './report/InvestmentSection';
import MarketSection from './report/MarketSection';
import CrimeSection from './report/CrimeSection';
import EnvironmentSection from './report/EnvironmentSection';
import RenovationSection from './report/RenovationSection';
import ConnectivitySection from './report/ConnectivitySection';
import AmenitiesSection from './report/AmenitiesSection';
import DemographicsSection from './report/DemographicsSection';
import LegalSection from './report/LegalSection';
import VerdictSection from './report/VerdictSection';

interface ReportViewProps {
  data: ReportData;
  onBack: () => void;
}

// Simple ErrorBoundary component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  constructor(props: ErrorBoundaryProps) {
    super(props);
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-8">
          <div className="max-w-2xl w-full bg-red-500/10 border border-red-500/20 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-4 text-red-400">Si è verificato un errore nel report</h2>
            <p className="text-gray-300 mb-4">Dettagli tecnici:</p>
            <pre className="bg-black/50 p-4 rounded-lg overflow-auto text-xs font-mono text-red-300 mb-6">
              {this.state.error?.toString()}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
            >
              Ricarica Pagina
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
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

const ReportView: React.FC<ReportViewProps> = ({ data, onBack }) => {
  return (
    <ErrorBoundary>
      <ReportViewContent data={data} onBack={onBack} />
    </ErrorBoundary>
  );
};

const ReportViewContent = ({ data, onBack }: { data: ReportData, onBack: () => void }) => {
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

  if (!data || !data.sections) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0f172a] text-white">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Dati del report mancanti o incompleti</h2>
          <button onClick={onBack} className="text-blue-400 hover:text-blue-300">Torna indietro</button>
        </div>
      </div>
    );
  }

  const { overview, sections } = data;

  // Safe access to sections with fallbacks
  const valuation = sections?.valuation || { title: 'Valutazione', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const investment = sections?.investment || { title: 'Investimento', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const market = sections?.market_comps || { title: 'Mercato', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const crime = sections?.crime || { title: 'Sicurezza', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const environment = sections?.environment || { title: 'Ambiente', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const renovation = sections?.renovation_potential || { title: 'Ristrutturazione', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const connectivity = sections?.connectivity || { title: 'Connettività', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const amenities = sections?.amenities || { title: 'Servizi', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const demographics = sections?.demographics || { title: 'Demografia', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const legal = sections?.legal_tax || { title: 'Legale & Tasse', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const verdict = sections?.ai_verdict || { title: 'Verdetto AI', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };

  return (
    <div className="flex h-screen bg-[#0f172a] text-white overflow-hidden font-sans selection:bg-blue-500/30">
      <nav className="hidden lg:flex flex-col w-80 h-full border-r border-white/5 bg-[#0b1120] p-6 overflow-y-auto">
        <div className="flex items-center gap-3 mb-10 px-2"><div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20"><Building2 className="text-white w-6 h-6" /></div><span className="font-bold text-xl tracking-tight">House Vertical</span></div>
        <div className="space-y-2">{sectionConfig.map((item) => { const isActive = activeSection === item.id; return (<button key={item.id} onClick={() => handleNavClick(item.id)} className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${isActive ? 'bg-gradient-to-r from-blue-600/20 to-transparent border-l-2 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}><item.icon className={`w-5 h-5 transition-colors ${isActive ? item.color : 'text-gray-500 group-hover:text-gray-300'}`} /><span className="font-medium text-sm tracking-wide">{item.label}</span>{isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>}</button>) })}</div>
      </nav>
      <main className="flex-1 h-full overflow-y-auto scroll-smooth snap-y snap-mandatory relative z-0">
        <div className="lg:hidden fixed top-0 left-0 w-full h-24 bg-gradient-to-b from-[#0f172a] to-transparent z-10 pointer-events-none"></div>
        <div id="overview" ref={(el) => { sectionRefs.current['overview'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12"><OverviewSection data={data} /></div>
        <div id="valuation" ref={(el) => { sectionRefs.current['valuation'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20"><ValuationSection section={valuation} data={data} /></div>
        <div id="investment" ref={(el) => { sectionRefs.current['investment'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12"><InvestmentSection section={investment} /></div>
        <div id="market_comps" ref={(el) => { sectionRefs.current['market_comps'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20"><MarketSection section={market} data={data} /></div>
        <div id="crime" ref={(el) => { sectionRefs.current['crime'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12"><CrimeSection section={crime} /></div>
        <div id="environment" ref={(el) => { sectionRefs.current['environment'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20"><EnvironmentSection section={environment} /></div>
        <div id="renovation_potential" ref={(el) => { sectionRefs.current['renovation_potential'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12"><RenovationSection section={renovation} /></div>
        <div id="connectivity" ref={(el) => { sectionRefs.current['connectivity'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20"><ConnectivitySection section={connectivity} /></div>
        <div id="amenities" ref={(el) => { sectionRefs.current['amenities'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12"><AmenitiesSection section={amenities} /></div>
        <div id="demographics" ref={(el) => { sectionRefs.current['demographics'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20"><DemographicsSection section={demographics} /></div>
        <div id="legal_tax" ref={(el) => { sectionRefs.current['legal_tax'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12"><LegalSection section={legal} /></div>
        <div id="ai_verdict" ref={(el) => { sectionRefs.current['ai_verdict'] = el; }} className="min-h-screen w-full flex items-center justify-center p-4 lg:p-12 snap-start pt-20 pb-32 md:pt-12 md:pb-12 bg-black/20"><VerdictSection section={verdict} data={data} /></div>
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
