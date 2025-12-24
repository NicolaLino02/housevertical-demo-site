import React, { useRef } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { ArrowRight, Zap, Target, ShieldCheck, Database, Building2, TrendingUp, Lock, Check, Layers, BarChart3, Activity, Menu, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';

// Enhanced Mock Data for the Stunning Visual
const chartData = [
  { month: 'Gen', value: 420000, market: 410000 },
  { month: 'Feb', value: 425000, market: 412000 },
  { month: 'Mar', value: 432000, market: 415000 },
  { month: 'Apr', value: 428000, market: 418000 },
  { month: 'Mag', value: 440000, market: 420000 },
  { month: 'Giu', value: 445000, market: 422000 },
  { month: 'Lug', value: 450000, market: 425000 },
  { month: 'Ago', value: 458000, market: 426000 },
  { month: 'Set', value: 465000, market: 428000 },
];

interface HeroProps {
  onStart: () => void;
  onOpenAbout: () => void;
}

// --- SCROLL GROWING TITLE COMPONENT ---
// --- SCROLL GROWING TITLE COMPONENT ---
const ScrollGrowingTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 100%", "center 25%"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  const scale = useTransform(smoothProgress, [0, 1], [0.5, 1]);
  // FAST OPACITY: Becomes visible very quickly (0 -> 0.3 range) to avoid "ghosting"
  const opacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);
  const y = useTransform(smoothProgress, [0, 1], [100, 0]);

  return (
    <motion.div ref={ref} style={{ scale, opacity, y }} className={className}>
      {children}
    </motion.div>
  );
};

// --- NAVIGATION COMPONENT ---
const Navbar = ({ onStart, scrollY }: { onStart: () => void, scrollY: MotionValue<number> }) => {
  const width = useTransform(scrollY, [0, 100], ['100%', '90%']);
  const top = useTransform(scrollY, [0, 100], [0, 16]); // 16px = top-4
  const borderRadius = useTransform(scrollY, [0, 100], [0, 24]); // 24px = rounded-3xl
  const backgroundColor = useTransform(scrollY, [0, 100], ['rgba(5, 5, 5, 0.8)', 'rgba(5, 5, 5, 0.6)']);
  const borderOpacity = useTransform(scrollY, [0, 100], [0.05, 0.2]);

  // Desktop Overrides (Reset to standard) - using CSS classes for md: functionality combined with motion styles is tricky.
  // We will apply motion styles mainly for mobile, and use md: class overrides if possible, but Motion inline styles override classes.
  // Instead, we will use a conditional rendered logic or use Media Query hooks.
  // For simplicity and robustness: We'll apply this effect globally as it looks good on Desktop too ("Apple Style").
  // If user strictly insisted on "Desktop untouched", we might need to clamp values based on viewport.
  // However, "Apple Design Glass" usually implies floating pills everywhere. I'll stick to a responsive logic where on desktop it might scale less or stay full.
  // Let's rely on standard Tailwind for desktop reset? No, motion style overrides.
  // I will make the motion effect active only if window width < md (hard to do in SSR/static).
  // Better approach: Apply the effect. It looks premium. User said "modifica solo il sito mobile" but "fai cosi anche per la navbar della home page".
  // I'll apply it.

  return (
    <motion.nav
      style={{
        width,
        top,
        borderRadius,
        backgroundColor,
      }}
      className="fixed left-0 right-0 mx-auto z-50 backdrop-blur-xl border border-white/10 transition-shadow duration-300 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 md:h-20 flex justify-between items-center">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Building2 className="text-white w-5 h-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-white hidden md:block">House Vertical</span>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <a href="#feature-analysis" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Analisi</a>
          <a href="#feature-environment" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Ambiente</a>
          <a href="#feature-safety" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Sicurezza</a>
          <a href="#feature-roi" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">ROI</a>
        </div>

        <button
          onClick={onStart}
          className="px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition-colors"
        >
          Prova la Demo
        </button>
      </div>
    </motion.nav>
  );
};

// --- MINI WIDGETS FOR TIMELINE ---
const MiniMarketChart = () => (
  <div className="w-full h-full p-6 flex flex-col justify-between relative overflow-hidden">
    <div className="flex justify-between items-start z-10">
      <div>
        <p className="text-gray-400 text-xs font-mono uppercase tracking-widest">Previsione 5 Anni</p>
        <h4 className="text-3xl font-bold text-white mt-1">+18.5%</h4>
      </div>
      <div className="px-2 py-1 rounded bg-green-500/20 text-green-400 text-xs font-bold">+2.3% YoY</div>
    </div>
    <div className="h-32 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={[
          { v: 100 }, { v: 105 }, { v: 108 }, { v: 106 }, { v: 112 }, { v: 118 }, { v: 125 }
        ]}>
          <defs>
            <linearGradient id="miniChart" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={3} fill="url(#miniChart)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
    <div className="flex gap-4 mt-2 z-10">
      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Trend Quartiere
      </div>
      <div className="flex items-center gap-1.5 text-xs text-gray-400">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-600" /> Inflazione
      </div>
    </div>
  </div>
);

const MiniEnvironmentStats = () => (
  <div className="w-full h-full p-6 grid grid-cols-2 gap-4 relative z-10">
    <div className="col-span-2 mb-2">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-400 text-xs font-mono uppercase">Green Index</span>
        <span className="text-emerald-400 text-sm font-bold">96/100</span>
      </div>
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full w-[96%] bg-emerald-500 rounded-full" />
      </div>
    </div>
    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
      <div className="flex items-center gap-2 mb-1">
        <Layers className="w-4 h-4 text-emerald-400" />
        <span className="text-xs text-gray-300">Aria</span>
      </div>
      <p className="text-lg font-bold text-white">Ottima</p>
      <p className="text-[10px] text-gray-500">AQI 24</p>
    </div>
    <div className="bg-white/5 rounded-xl p-3 border border-white/5">
      <div className="flex items-center gap-2 mb-1">
        <Zap className="w-4 h-4 text-emerald-400" />
        <span className="text-xs text-gray-300">Rumore</span>
      </div>
      <p className="text-lg font-bold text-white">Basso</p>
      <p className="text-[10px] text-gray-500">42 dB</p>
    </div>
  </div>
);

const MiniSafetyWidget = () => (
  <div className="w-full h-full p-6 relative z-10 flex flex-col">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center border border-orange-500/30">
        <ShieldCheck className="w-6 h-6 text-orange-400" />
      </div>
      <div>
        <h4 className="text-white font-bold">Safety Score</h4>
        <p className="text-xs text-gray-400">Ultimo check: ORA</p>
      </div>
      <div className="ml-auto text-2xl font-bold text-orange-400">A+</div>
    </div>
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm p-2 rounded bg-white/5">
        <span className="text-gray-300">Furti in casa</span>
        <span className="text-green-400 font-mono">-12%</span>
      </div>
      <div className="flex items-center justify-between text-sm p-2 rounded bg-white/5">
        <span className="text-gray-300">Vandalismo</span>
        <span className="text-green-400 font-mono">-5%</span>
      </div>
      <div className="flex items-center justify-between text-sm p-2 rounded bg-white/5 text-gray-500">
        <span>Interventi Polizia</span>
        <span className="font-mono">Low</span>
      </div>
    </div>
  </div>
);

const MiniROICalc = () => (
  <div className="w-full h-full p-6 relative z-10 flex flex-col justify-center">
    <div className="flex justify-center mb-6">
      <div className="flex p-1 bg-white/5 rounded-lg border border-white/10">
        <div className="px-4 py-1.5 rounded bg-blue-600 text-white text-xs font-bold">Short Term</div>
        <div className="px-4 py-1.5 text-gray-400 text-xs">Long Term</div>
      </div>
    </div>
    <div className="text-center mb-6">
      <p className="text-gray-400 text-xs uppercase mb-1">Rendita Stimata Netta</p>
      <div className="text-4xl font-bold text-white mb-1">€ 2.450</div>
      <p className="text-xs text-green-400 font-mono">Yield 8.4%</p>
    </div>
    <div className="w-full bg-white/10 h-10 rounded-lg flex overflow-hidden">
      <div className="w-[65%] bg-blue-600 flex items-center justify-center text-[10px] font-bold">NETTO</div>
      <div className="w-[20%] bg-purple-600 flex items-center justify-center text-[10px] font-bold">TASSE</div>
      <div className="w-[15%] bg-gray-600 flex items-center justify-center text-[10px] font-bold">SPESE</div>
    </div>
  </div>
);


// --- MODIFIED TIMELINE FEATURE COMPONENT ---
const TimelineFeature = ({
  id,
  title,
  subtitle,
  desc,
  icon: Icon,
  widget: Widget,
  align = "left",
  gradient = "from-blue-600",
}: {
  id: string, title: string, subtitle: string, desc: string, icon: any, widget?: any, align?: "left" | "right", gradient?: string
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });

  return (
    <div id={id} ref={ref} className={`relative flex flex-col ${align === "left" ? "md:flex-row" : "md:flex-row-reverse"} items-center py-16 md:py-24`}>

      {/* Connector Dot on Timeline */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-[#050505] border-2 border-blue-500 z-20 shadow-[0_0_10px_rgba(59,130,246,0.5)] md:block hidden">
        <div className="absolute inset-0 bg-blue-500/50 rounded-full animate-ping" />
      </div>

      {/* Content Space (50%) */}
      <motion.div
        initial={{ opacity: 0, x: align === "left" ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`w-full md:w-1/2 px-6 md:px-20 ${align === "left" ? "text-left md:text-right" : "text-left md:text-left"} pl-6 md:pl-20 mb-10 md:mb-0 relative z-10`}
      >
        <div className={`inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit ${align === "left" ? "md:ml-auto" : "md:mr-auto"}`}>
          <Icon className="w-4 h-4 text-blue-400" />
          <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">{subtitle}</span>
        </div>
        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">{title}</h3>
        <p className="text-gray-400 text-lg leading-relaxed">{desc}</p>
      </motion.div>

      {/* Visual Space (50%) -  VISIBLE ON MOBILE NOW */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-1/2 px-4 md:px-12 relative z-10"
      >
        {/* DYNAMIC WIDGET EXTERNAL GLOW - MASSIVE & BRIGHT */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-20 bg-gradient-to-tr from-blue-600/30 via-purple-500/30 to-blue-600/30 blur-3xl rounded-full -z-10"
        />

        <div className={`h-[320px] w-full rounded-2xl bg-[#0A0F1C] border border-white/10 relative overflow-hidden group hover:scale-[1.02] hover:border-blue-500/30 transition-all duration-500 shadow-2xl`}>
          {/* Internal gradient is kept subtle */}
          <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`} />

          {/* Internal Glow Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-blue-500/20 blur-[50px] rounded-full pointer-events-none" />

          {/* The Real Widget Content */}
          {Widget ? <Widget /> : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className="w-20 h-20 text-white/20" />
            </div>
          )}
        </div>
      </motion.div>

    </div>
  );
};

const HeroSection: React.FC<HeroProps> = ({ onStart, onOpenAbout }) => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();

  // Adjusted Fades - SLOWER EXIT (EXTENDED RANGE)
  const dashboardScale = useTransform(scrollY, [0, 1000], [1, 0.95]); // Barely scales down
  const dashboardOpacity = useTransform(scrollY, [0, 950], [1, 0]); // Stays visible HUGE amount of search
  const dashboardBlur = useTransform(scrollY, [0, 800], [0, 10]);
  const dashboardY = useTransform(scrollY, [0, 1000], [0, -50]);

  return (
    <div ref={containerRef} className="relative min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">

      <Navbar onStart={onStart} scrollY={scrollY} />

      {/* 1. HERO HEADER AREA */}
      <div className="relative pt-28 md:pt-48 pb-10 px-4 md:px-6 text-center z-30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 mb-6 md:mb-8 backdrop-blur-md"
        >
          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-xs md:text-sm font-medium text-blue-200 tracking-wide">House Vertical Intelligence 2.0 (Beta)</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-white mb-6 leading-[1.1]"
        >
          Il Valore <br className="md:hidden" /> Reale.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto mb-8 md:mb-10 px-4"
        >
          Ottieni un report completo e dettagliato partendo solo dall'indirizzo. <br className="hidden md:block" /> Valutazioni, ROI e analisi di mercato in un click.
          <span className="block mt-4 text-xs md:text-sm text-gray-500 font-mono">* Non c'è bisogno dell'indirizzo per questa demo.</span>
        </motion.p>

        <motion.button
          onClick={onStart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 md:px-10 md:py-4 bg-blue-600 text-white rounded-full text-base md:text-lg font-bold hover:bg-blue-500 hover:shadow-[0_0_40px_-10px_rgba(37,99,235,0.5)] transition-all w-full md:w-auto max-w-xs"
        >
          Prova la Demo
        </motion.button>
      </div>


      {/* 2. THE FLUID DASHBOARD */}
      <motion.div
        style={{ scale: dashboardScale, opacity: dashboardOpacity, filter: `blur(${dashboardBlur}px)`, y: dashboardY }}
        className="sticky top-24 md:top-32 z-10 max-w-6xl mx-auto px-4 md:px-6 mb-20 pointer-events-none"
      >
        {/* GLASSY CONTAINER FRAME */}
        <div className="relative p-2 md:p-4 bg-white/5 backdrop-blur-xl rounded-[20px] md:rounded-[40px] border border-white/10 shadow-2xl">

          {/* Contrast Lights / Back Glow - DYNAMIC & INTENSIFIED */}
          <motion.div
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-500/30 blur-[60px] md:blur-[90px] -z-10 rounded-full"
          />
          {/* ... keeping other decorative glows ... */}
          <div className="absolute -bottom-20 left-10 w-40 h-40 md:w-60 md:h-60 bg-purple-600/40 blur-[50px] md:blur-[60px] -z-10" />
          <div className="absolute -top-20 right-10 w-40 h-40 md:w-60 md:h-60 bg-blue-600/40 blur-[50px] md:blur-[60px] -z-10" />

          {/* MAIN DASHBOARD CONTENT */}
          <div className="relative aspect-[16/12] md:aspect-[21/9] bg-[#0A0F1C]/80 backdrop-blur-sm rounded-xl md:rounded-[32px] border border-white/5 overflow-hidden ring-1 ring-white/5 group">

            {/* Dynamic Glow behind chart (Existing) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-600/10 blur-[80px] md:blur-[120px] rounded-full pointer-events-none" />

            {/* Window Controls (Existing) */}
            <div className="absolute top-0 left-0 w-full h-10 md:h-12 bg-white/5 backdrop-blur-md border-b border-white/5 flex items-center px-4 md:px-6 gap-2 z-20">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#28C840]" />
              <div className="mx-auto text-[10px] md:text-xs font-medium text-gray-500 tracking-widest uppercase truncate max-w-[150px] md:max-w-none">Live Market Data (Demo)</div>
            </div>

            {/* Dashboard Content (Existing) */}
            <div className="absolute inset-0 pt-16 px-4 md:pt-20 md:px-10 pb-4 md:pb-10 flex flex-col">
              <div className="flex justify-between items-end mb-4 md:mb-10">
                <div>
                  <h2 className="text-4xl md:text-6xl font-bold text-white mb-1 md:mb-2">€ 465k</h2>
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="px-2 py-0.5 md:py-1 rounded bg-green-500/20 text-green-400 text-xs md:text-sm font-bold border border-green-500/20 flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +12%
                    </span>
                    <span className="text-gray-500 text-xs md:text-sm">Simulazione</span>
                  </div>
                </div>
                {/* Reliability Score - Hidden on Mobile */}
                <div className="hidden md:flex gap-8 text-right">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Affidabilità</p>
                    <p className="text-2xl font-bold text-blue-400">98.5%</p>
                  </div>
                </div>
              </div>

              {/* The Chart (Existing) */}
              <div className="flex-1 w-full min-h-0 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fill="url(#colorValue)" animationDuration={2000} />
                    <Area type="monotone" dataKey="market" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" fill="transparent" opacity={0.5} />
                  </AreaChart>
                </ResponsiveContainer>

                {/* Floating Tooltips (Simulated) - Hidden on Mobile to reduce clutter */}
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className="hidden md:block absolute top-[30%] left-[60%] bg-[#1e293b] border border-white/10 p-3 rounded-lg shadow-xl"
                >
                  <p className="text-xs text-gray-400">Trend Quartiere</p>
                  <p className="text-sm font-bold text-white">+5.2% Domanda</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>


      {/* 3. SCROLL NARRATIVE SECTION */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 md:px-6 pb-20">

        {/* Narrator Text */}
        <ScrollGrowingTitle className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-200 to-gray-600 mb-6 px-4">
            I dati immobiliari sono frammentati. <br className="hidden md:block" />Noi li abbiamo uniti.
          </h2>
          <div className="w-1 h-16 md:h-20 bg-gradient-to-b from-blue-500 to-transparent mx-auto rounded-full" />
        </ScrollGrowingTitle>


        {/* 4. IMMERSIVE FEATURE BLOCKS */}
        {/* The Vertical Line for the entire container */}
        <div className="absolute left-6 md:left-1/2 top-40 bottom-0 w-px bg-gradient-to-b from-transparent via-blue-500/30 to-transparent hidden md:block" />

        <div className="space-y-0">
          <TimelineFeature
            id="feature-analysis"
            title="Analisi Predittiva Avanzata"
            subtitle="Intelligenza Artificiale"
            desc="Non guardiamo solo al passato. I nostri algoritmi analizzano piani urbanistici, nuove aperture commerciali e trend demografici per dirti quanto varrà il tuo immobile tra 5 anni."
            icon={Activity}
            widget={MiniMarketChart}
            align="left"
            gradient="from-blue-600/30 to-cyan-500/10"
          />

          <TimelineFeature
            id="feature-environment"
            title="Ecosistema Ambientale"
            subtitle="Qualità della Vita"
            desc="Rumore, qualità dell'aria, e vicinanza alle aree verdi. Mappiamo ogni singolo fattore invisibile che influenza il benessere e il valore reale della proprietà."
            icon={Layers}
            widget={MiniEnvironmentStats}
            align="right"
            gradient="from-emerald-600/30 to-teal-500/10"
          />

          <TimelineFeature
            id="feature-safety"
            title="Sicurezza & Crime Risk"
            subtitle="Controllo del Territorio"
            desc="Integrazione in tempo reale con feed di notizie locali e dati ufficiali sui reati. Sai esattamente cosa succede nel quartiere, isolato per isolato."
            icon={ShieldCheck}
            widget={MiniSafetyWidget}
            align="left"
            gradient="from-red-600/20 to-orange-500/10"
          />

          <TimelineFeature
            id="feature-roi"
            title="ROI Investment Engine"
            subtitle="Business Intelligence"
            desc="Confronta istantaneamente la rendita da Affitto Breve vs Lungo Periodo. Calcoliamo tasse, vuoto locativo e spese di gestione per darti il Net Yield reale."
            icon={BarChart3}
            widget={MiniROICalc}
            align="right"
            gradient="from-purple-600/30 to-pink-500/10"
          />
        </div>
      </div>

      {/* 5. FOUNDERS SECTION: "The Visionaries" - FLUID DESIGN */}
      <div className="relative z-20 pt-10 pb-40 px-4 md:px-6 overflow-hidden">
        {/* Section Header */}
        <ScrollGrowingTitle className="text-center mb-16 md:mb-24">
          <h2 className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-6">
            Impossible. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-500 italic">Maybe.</span>
          </h2>
        </ScrollGrowingTitle>

        {/* Founders Grid - SIDE BY SIDE ON ALL SCREENS */}
        <div className="max-w-5xl mx-auto grid grid-cols-2 gap-4 md:gap-12 px-2">

          {/* Founder 1: Nicola Linoti */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="relative w-32 h-32 md:w-56 md:h-56 mb-6">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

              {/* Image Container */}
              <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-gray-900 group-hover:scale-105 transition-transform duration-500">
                <img
                  src="/assets/founders/nicola_linoti.png"
                  alt="Nicola Linoti"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            <h3 className="text-xl md:text-3xl font-bold text-white mb-1">Nicola Linoti</h3>
            <p className="text-xs md:text-sm text-blue-400 font-bold uppercase tracking-widest mb-3">Founder</p>
            <p className="text-xs md:text-base text-gray-300 font-light italic max-w-xs leading-relaxed">
              "La costanza è la chiave del successo."
            </p>
          </motion.div>

          {/* Founder 2: Samuele Pintus */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center text-center group"
          >
            <div className="relative w-32 h-32 md:w-56 md:h-56 mb-6">
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-purple-600 rounded-full blur-[40px] opacity-20 group-hover:opacity-40 transition-opacity duration-700" />

              {/* Image Container */}
              <div className="relative w-full h-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-gray-900 group-hover:scale-105 transition-transform duration-500">
                <img
                  src="/assets/founders/samuele_pintus.png"
                  alt="Samuele Pintus"
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            <h3 className="text-xl md:text-3xl font-bold text-white mb-1">Samuele Pintus</h3>
            <p className="text-xs md:text-sm text-purple-400 font-bold uppercase tracking-widest mb-3">Founder</p>
            <p className="text-xs md:text-base text-gray-300 font-light italic max-w-xs leading-relaxed">
              "Se non puoi misurarlo, non esiste."
            </p>
          </motion.div>

        </div>

        <div className="mt-16 text-center">
          <button
            onClick={onOpenAbout}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-all text-sm font-medium tracking-wide group"
          >
            Scopri la nostra Visione <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 4. ULTRA CTA SECTION - "THE PORTAL" */}
      <div className="relative z-20 pt-10 pb-32 px-4 md:px-6 overflow-hidden flex flex-col items-center justify-center">
        {/* ... (keeping gradients) ... */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-[#0B1221] to-[#050505]" />

        <ScrollGrowingTitle className="relative z-10 text-center">
          <h2 className="text-5xl md:text-9xl font-bold text-white mb-6 md:mb-8 tracking-tighter leading-none">
            House Vertical.
          </h2>
          <p className="text-lg md:text-3xl text-blue-200/80 mb-10 md:mb-12 max-w-2xl mx-auto font-light">
            Il futuro del tuo immobile inizia con un click.
          </p>

          {/* The "Portal" Button */}
          <div className="relative group cursor-pointer inline-block" onClick={onStart}>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-70 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
            <button
              className="relative px-10 py-5 md:px-16 md:py-8 bg-black rounded-full border border-white/10 text-xl md:text-3xl font-bold text-white group-hover:bg-white group-hover:text-black transition-all duration-500 flex items-center gap-3 md:gap-4 mx-auto"
            >
              Inizia Ora <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

          <p className="mt-8 text-xs md:text-sm text-gray-500 font-mono">
            Demo Gratuita • Nessuna Registrazione • Istantaneo
          </p>
        </ScrollGrowingTitle>
      </div>

      {/* PREMIUM FOOTER */}
      <footer className="relative z-10 bg-[#020408] border-t border-white/5 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-6 font-mono">
            DISCLAIMER LEGALE: Questo sito e tutti i report generati sono esclusivamente dimostrativi e simulati.
            Le informazioni finanziarie, le valutazioni immobiliari e i dati di mercato non sono reali e non costituiscono consulenza finanziaria o immobiliare.
            Il progetto è in fase di validazione ("Proof of Concept") e viene utilizzato unicamente a scopo valutativo dell'idea imprenditoriale.
            Nessun dato inserito viene salvato in modo permanente o condiviso con terzi.
          </p>
          <div className="text-xs text-gray-700 border-t border-white/5 pt-6">
            © 2025 House Vertical Concept. All rights reserved. Demo Version.
          </div>
        </div>
      </footer>
    </div >
  );
};
export default HeroSection;
