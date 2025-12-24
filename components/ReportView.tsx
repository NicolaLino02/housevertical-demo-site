import React, { useRef, useEffect, useState } from 'react';
import { ReportData } from '../types';
import {
  LayoutDashboard, TrendingUp, Wallet, BarChart as ChartIcon, ShieldAlert, Leaf, Hammer, Wifi, Coffee, Users, Scale, BrainCircuit, ChevronLeft, ChevronRight, Building2, Calculator, Shield
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
import MortgageSection from './report/MortgageSection';
import InsuranceSection from './report/InsuranceSection';
import LegalDisclaimer from './report/LegalDisclaimer';

interface ReportViewProps {
  data: ReportData;
  onBack: () => void;
  onOpenSurvey: () => void;
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
  { id: 'mortgage_calculator', icon: Calculator, label: 'Mutuo', color: 'text-green-400', bg: 'bg-green-500' },
  { id: 'insurance', icon: Shield, label: 'Assicurazione', color: 'text-blue-400', bg: 'bg-blue-500' },
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

const ReportView: React.FC<ReportViewProps> = ({ data, onBack, onOpenSurvey }) => {
  return (
    <ErrorBoundary>
      <ReportViewContent data={data} onBack={onBack} onOpenSurvey={onOpenSurvey} />
    </ErrorBoundary>
  );
};

const ReportViewContent = ({ data, onBack, onOpenSurvey }: { data: ReportData, onBack: () => void, onOpenSurvey: () => void }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  // Custom Scroll Logic Refs
  const isScrolling = useRef(false);
  const wheelAccumulator = useRef(0);
  const lastScrollTime = useRef(0);
  const SCROLL_THRESHOLD = 150; // Higher = Requires more scroll to switch
  const COOLDOWN = 1000; // ms to wait before allowing another switch
  const [isScrolled, setIsScrolled] = useState(false);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });
    // Reset accumulator on click to prevent instant double-jump
    wheelAccumulator.current = 0;
  };

  const currentSectionIndex = sectionConfig.findIndex(s => s.id === activeSection);

  const scrollToSection = (index: number) => {
    if (index >= 0 && index < sectionConfig.length) {
      const id = sectionConfig[index].id;
      if (isScrolling.current) return;

      isScrolling.current = true;
      setActiveSection(id);
      sectionRefs.current[id]?.scrollIntoView({ behavior: 'smooth' });

      setTimeout(() => {
        isScrolling.current = false;
        wheelAccumulator.current = 0; // Reset after move
      }, COOLDOWN);
    }
  };

  // INTERSECTION OBSERVER (Keeps sidebar synced if user drags scrollbar)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      // Only update if not currently in a programmed scroll transition (to avoid flickering)
      if (!isScrolling.current) {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            setActiveSection(entry.target.id);
          }
        });
      }
    }, { threshold: 0.5 });

    Object.values(sectionRefs.current).forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // SMART WHEEL HANDLER
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      // DESKTOP: Native scroll is preferred. Disable custom hijacking to avoid "broken" feel.
      // MOBILE: We don't scroll active section, we swap.
      // Returning early effectively disables the "snap" behavior, restoring natural scrolling.
      // We still update the header state via onScroll on the main element.
      return;
    };

    // Non-passive listener required to use preventDefault
    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, [currentSectionIndex]); // Re-bind when index changes to capture correct closure

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
  const valuation = sections?.valuation || { title: 'Valutazione', content: '', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const investment = sections?.investment || { title: 'Investimento', content: '', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const market = sections?.market_comps || { title: 'Mercato', content: '', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const crime = sections?.crime || { title: 'Sicurezza', content: '', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const environment = sections?.environment || { title: 'Ambiente', content: '', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const renovation = sections?.renovation_potential || { title: 'Ristrutturazione', content: '', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const connectivity = sections?.connectivity || { title: 'Connettività', content: '', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const amenities = sections?.amenities || { title: 'Servizi', content: '', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const demographics = sections?.demographics || { title: 'Demografia', content: '', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const legal = sections?.legal_tax || { title: 'Legale & Tasse', content: '', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };
  const verdict = sections?.ai_verdict || { title: 'Verdetto AI', content: '', summary: 'Dati non disponibili', score: 0, details: [], recommendation: '' };

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#0f172a] text-white font-sans selection:bg-blue-500/30 flex flex-col">
      {/* Fixed Sticky Header - MOBILE OPTIMIZED (Apple Glass Effect) */}
      <div className={`flex-none fixed md:relative z-50 transition-all duration-500 ease-out flex justify-between items-center shadow-2xl
        ${isScrolled
          ? 'top-4 md:top-0 left-[2.5%] right-[2.5%] w-[95%] md:w-full rounded-full md:rounded-none bg-[#0f172a]/80 backdrop-blur-xl border border-white/20 px-4 py-2 md:px-6 md:py-4 md:bg-[#0f172a]/95 md:border-b md:border-t-0 md:border-x-0 md:border-blue-500/30'
          : 'top-0 left-0 w-full bg-[#0f172a]/95 backdrop-blur-md border-b border-blue-500/30 px-4 md:px-6 py-3 md:py-4 rounded-none'
        }
      `}>

        {/* Brand / Title */}
        <div className="flex flex-col">
          <h1 className="font-bold text-lg md:text-xl flex items-center gap-2">
            <span className="md:hidden text-blue-500"><Building2 className="w-5 h-5" /></span>
            <span className="hidden md:inline">Demo Report</span>
            <span className="md:hidden">House Vertical</span>
          </h1>
          <p className="text-[10px] md:text-xs text-blue-400 hidden md:block">Via Pacini 15, Milano</p>
        </div>

        {/* Action Button - VISIBLE ON MOBILE NOW */}
        <div className="flex-1 flex justify-end">
          <button
            onClick={onOpenSurvey}
            className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold py-2 px-4 md:px-6 rounded-full shadow-lg shadow-blue-500/20 active:scale-95 transition-all text-xs md:text-sm flex items-center gap-2"
          >
            <span className="animate-pulse">✨</span>
            <span>Valuta <span className="hidden md:inline">l'Idea</span></span>
          </button>
        </div>
      </div>

      {/* Main Content Area with Fixed Sidebar */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Fixed Desktop Sidebar */}
        <nav className="hidden lg:flex flex-col w-72 h-full border-r border-white/5 bg-[#0b1120] p-6 overflow-y-auto flex-none z-20">
          <div className="flex items-center gap-3 mb-10 px-2 shrink-0">
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
                  className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${isActive ? 'bg-gradient-to-r from-blue-600/20 to-transparent border-l-2 border-blue-500 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
                >
                  <item.icon className={`w-5 h-5 transition-colors ${isActive ? item.color : 'text-gray-500 group-hover:text-gray-300'}`} />
                  <span className="font-medium text-sm tracking-wide">{item.label}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>}
                </button>
              )
            })}
          </div>
        </nav>

        {/* Scollable Main Content - NO SNAP CLASSES */}
        <main
          ref={containerRef}
          onScroll={(e) => {
            // Update Header State
            const target = e.currentTarget;
            setIsScrolled(target.scrollTop > 20);
          }}
          className="flex-1 h-full overflow-y-auto relative z-0 hide-scrollbar scroll-smooth"
        >
          {/* Mobile Safe Area Spacer Top */}
          <div className="lg:hidden h-2 w-full" />

          {/* Sections with Single-View Logic for Mobile */}
          {sectionConfig.map((item) => {
            const isActive = activeSection === item.id;
            // Mobile: specific check using CSS classes to hide non-active sections
            // Desktop: Always show (lg:block)
            const mobileVisibilityClass = isActive ? 'flex' : 'hidden lg:flex';

            return (
              <div
                key={item.id}
                id={item.id}
                ref={(el) => { sectionRefs.current[item.id] = el; }}
                className={`${mobileVisibilityClass} flex-col min-h-[calc(100vh-80px)] md:min-h-screen w-full p-2 pt-24 md:p-4 lg:p-12 pb-32 lg:pb-24 ${['valuation', 'mortgage_calculator', 'market_comps', 'environment', 'connectivity', 'demographics', 'ai_verdict'].includes(item.id) ? 'bg-black/20' : ''}`}
              >
                <div className="flex-1 w-full flex items-center justify-center">
                  {item.id === 'overview' && <OverviewSection data={data} />}
                  {item.id === 'valuation' && <ValuationSection section={valuation} data={data} />}
                  {item.id === 'investment' && <InvestmentSection section={investment} />}
                  {item.id === 'mortgage_calculator' && <MortgageSection propertyValue={data.overview.estimatedValue} />}
                  {item.id === 'insurance' && <InsuranceSection propertyValue={data.overview.estimatedValue} />}
                  {item.id === 'market_comps' && <MarketSection section={market} data={data} />}
                  {item.id === 'crime' && <CrimeSection section={crime} />}
                  {item.id === 'environment' && <EnvironmentSection section={environment} />}
                  {item.id === 'renovation_potential' && <RenovationSection section={renovation} currentValuation={overview?.estimatedValue || 0} />}
                  {item.id === 'connectivity' && <ConnectivitySection section={connectivity} />}
                  {item.id === 'amenities' && <AmenitiesSection section={amenities} />}
                  {item.id === 'demographics' && <DemographicsSection section={demographics} />}
                  {item.id === 'legal_tax' && <LegalSection section={legal} />}
                  {item.id === 'ai_verdict' && <VerdictSection section={verdict} data={data} />}
                </div>

                <LegalDisclaimer />
              </div>
            );
          })}
        </main>
      </div>

      {/* Mobile Bottom Nav - COMPACT & GLASSY */}
      <div className="lg:hidden fixed bottom-4 left-4 right-4 bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 p-3 rounded-2xl shadow-2xl z-50 flex items-center justify-between gap-3 safe-area-bottom ring-1 ring-white/5">
        <button
          onClick={() => {
            const prevIndex = currentSectionIndex - 1;
            if (prevIndex >= 0) {
              setActiveSection(sectionConfig[prevIndex].id);
              // Scroll top of container to reset view
              if (containerRef.current) containerRef.current.scrollTop = 0;
            }
          }}
          disabled={currentSectionIndex === 0}
          className="p-3 rounded-xl bg-white/5 border border-white/5 disabled:opacity-30 active:scale-95 transition-all text-white/80"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 flex flex-col items-center justify-center overflow-hidden">
          <div className="flex items-center gap-2 mb-1">
            {/* Dynamic Icon */}
            {React.createElement(sectionConfig[currentSectionIndex].icon, { className: `w-3 h-3 ${sectionConfig[currentSectionIndex].color}` })}
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{currentSectionIndex + 1} / {sectionConfig.length}</span>
          </div>
          <h3 className="text-white font-bold text-sm truncate w-full text-center leading-tight">
            {sectionConfig[currentSectionIndex].label}
          </h3>
          {/* Micro Progress Bar */}
          <div className="w-16 h-0.5 bg-gray-800 rounded-full mt-2 overflow-hidden">
            <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${((currentSectionIndex + 1) / sectionConfig.length) * 100}%` }}></div>
          </div>
        </div>

        <button
          onClick={() => {
            const nextIndex = currentSectionIndex + 1;
            if (nextIndex < sectionConfig.length) {
              setActiveSection(sectionConfig[nextIndex].id);
              if (containerRef.current) containerRef.current.scrollTop = 0;
            }
          }}
          disabled={currentSectionIndex === sectionConfig.length - 1}
          className="p-3 rounded-xl bg-white/5 border border-white/5 disabled:opacity-30 active:scale-95 transition-all text-white/80"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ReportView;
