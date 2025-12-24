import React, { useState } from 'react';
import { SectionData, ReportData } from '../../types';
import {
    Clock, TrendingUp, Building2, Activity, Layers, ArrowLeft, MapPin, Trophy, Target, Info, Wallet, Percent, Filter, MoreHorizontal, ArrowRight, Home, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ComposedChart, Line } from 'recharts';

// --- SHARED COMPONENTS ---

// StickyHeader is deprecated in favor of Modal Header
const StickyHeader = ({ title, onBack }: { title: string, onBack: () => void }) => null;

const FilterButton = ({ label, active, onClick }: any) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${active
            ? 'bg-white text-black border-white shadow-lg scale-105'
            : 'bg-white/5 text-gray-400 border-transparent hover:bg-white/10 hover:text-white'
            }`}
    >
        {label}
    </button>
);

// --- VISUAL WIDGETS (KPI DETAILS) ---

const LiquidityDetail = ({ item, onBack }: any) => {
    return (
        <div className="min-h-full flex flex-col animate-in fade-in duration-500">
            <StickyHeader title="Analisi Liquidità" onBack={onBack} />

            <div className="flex-1 w-full max-w-7xl mx-auto pt-8"> {/* Added pt-8 padding */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest mb-4">
                        <Clock className="w-3 h-3" /> Time To Sell
                    </div>
                    <h2 className="text-6xl font-bold text-white mb-4 tracking-tighter">{item.data.value}</h2>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg">Il mercato locale mostra un'alta rotazione. Gli immobili a prezzo di mercato vengono assorbiti rapidamente.</p>
                </div>

                {/* Timeline Visualization */}
                <div className="w-full relative py-12 mb-20 px-4">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-white/10 -translate-y-1/2 rounded-full"></div>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '40%' }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 -translate-y-1/2 rounded-full shadow-[0_0_20px_rgba(249,115,22,0.5)]"
                    ></motion.div>

                    <div className="relative flex justify-between w-full max-w-4xl mx-auto">
                        {[
                            { label: 'Listing', days: '0' },
                            { label: 'Visits', days: '15' },
                            { label: 'Offers', days: '30' },
                            { label: 'Closing', days: '45' },
                            { label: 'Sold', days: '60+' }
                        ].map((step, i) => (
                            <div key={i} className="flex flex-col items-center gap-4 relative group cursor-pointer w-20">
                                <div className={`w-4 h-4 rounded-full border-2 ${i <= 2 ? 'bg-black border-orange-500 shadow-[0_0_10px_rgba(249,115,22,1)]' : 'bg-[#0f172a] border-gray-600'} z-10 transition-colors bg-[#0f172a]`}></div>
                                <div className="text-center absolute top-8 w-24">
                                    <span className={`text-xs font-bold block ${i <= 2 ? 'text-white' : 'text-gray-500'}`}>{step.label}</span>
                                    <span className="text-[10px] text-gray-500 font-mono">{step.days}gg</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Breakdown Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {item.data.breakdown.map((b: any, i: number) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors text-center group">
                            <div className="text-gray-500 text-xs uppercase font-bold mb-3 tracking-widest">{b.label}</div>
                            <div className="text-4xl font-bold text-white mb-2 group-hover:scale-110 transition-transform inline-block">{b.value} <span className="text-lg font-normal text-gray-500">gg</span></div>
                            <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden mt-4">
                                <div className="h-full bg-orange-500" style={{ width: `${(100 - (b.value / 80) * 100)}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const DemandDetail = ({ item, onBack }: any) => {
    return (
        <div className="min-h-full flex flex-col animate-in fade-in duration-500">
            <StickyHeader title="Analisi Domanda" onBack={onBack} />

            <div className="flex-1 w-full max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 pt-8"> {/* Added pt-8 padding */}
                {/* Sonar Visualization */}
                <div className="flex-1 flex flex-col items-center justify-center relative w-full aspect-square max-w-[500px]">
                    <div className="absolute inset-0 rounded-full border border-emerald-500/20"></div>
                    <div className="absolute inset-[25%] rounded-full border border-emerald-500/20"></div>
                    <div className="absolute inset-[50%] rounded-full border border-emerald-500/10 bg-emerald-500/5"></div>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-emerald-500/10 to-transparent animate-spin-slow origin-center opacity-50" style={{ clipPath: 'polygon(50% 50%, 100% 0, 100% 50%)' }}></div>

                    <div className="absolute top-[20%] left-[30%] w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <div className="absolute bottom-[30%] right-[25%] w-3 h-3 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_15px_#34d399]"></div>

                    <div className="absolute inset-0 flex items-center justify-center flex-col z-10">
                        <div className="text-7xl font-bold text-white tracking-tighter drop-shadow-2xl">{item.data.value}</div>
                        <div className="text-emerald-400 font-bold uppercase tracking-widest text-sm mt-2">Demand Score</div>
                    </div>
                </div>

                {/* Metrics */}
                <div className="flex-1 w-full space-y-6">
                    <div className="bg-emerald-900/10 border border-emerald-500/20 p-8 rounded-3xl">
                        <h3 className="text-emerald-400 font-bold uppercase text-xs mb-6 flex items-center gap-2"><Target className="w-4 h-4" /> Identikit Acquirente</h3>
                        <div className="space-y-4">
                            {['Giovani Coppie (25-35)', 'Investitori Retail', 'Professionisti Relocating'].map((p, i) => (
                                <div key={i} className="flex justify-between items-center p-4 bg-black/40 rounded-2xl border border-white/5">
                                    <span className="text-white font-medium">{p}</span>
                                    <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500" style={{ width: `${80 - i * 15}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                            <h4 className="text-gray-400 text-xs uppercase font-bold mb-2">Buy vs Rent</h4>
                            <div className="text-3xl font-bold text-white mb-2">70% <span className="text-sm font-normal text-gray-500">Buy</span></div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="bg-emerald-500 w-[70%] h-full"></div></div>
                        </div>
                        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl">
                            <h4 className="text-gray-400 text-xs uppercase font-bold mb-2">Trend YoY</h4>
                            <div className="text-3xl font-bold text-white mb-2 text-emerald-400">+12%</div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden"><div className="bg-emerald-500 w-[100%] h-full"></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const YieldDetail = ({ item, onBack }: any) => {
    const [price, setPrice] = useState(350000);
    const [rent, setRent] = useState(1200);
    const grossYield = ((rent * 12) / price) * 100;

    return (
        <div className="min-h-full flex flex-col animate-in fade-in duration-500">
            <StickyHeader title="Investment Calculator" onBack={onBack} />

            <div className="flex-1 w-full max-w-7xl mx-auto flex items-center pt-8"> {/* Added pt-8 padding */}
                <div className="bg-[#1e293b] w-full rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
                    <div className="flex-1 p-8 lg:p-12 space-y-10 bg-black/20">
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-blue-500 rounded-xl text-white"><Wallet className="w-6 h-6" /></div>
                            <div>
                                <h3 className="text-2xl font-bold text-white">Parametri</h3>
                                <p className="text-gray-400 text-xs">Regola i valori per stimare il rendimento.</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <div className="flex justify-between text-base mb-4">
                                    <span className="text-gray-300 font-medium">Prezzo Acquisto</span>
                                    <span className="text-blue-400 font-mono font-bold text-xl">€ {price.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range" min="100000" max="1000000" step="5000" value={price} onChange={(e) => setPrice(Number(e.target.value))}
                                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between text-base mb-4">
                                    <span className="text-gray-300 font-medium">Affitto Mensile</span>
                                    <span className="text-blue-400 font-mono font-bold text-xl">€ {rent.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range" min="500" max="5000" step="50" value={rent} onChange={(e) => setRent(Number(e.target.value))}
                                    className="w-full h-3 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 p-8 lg:p-12 bg-blue-600 flex flex-col items-center justify-center text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                        <div className="relative z-10 w-full">
                            <div className="text-blue-100 uppercase text-xs font-bold tracking-[0.2em] mb-4">Gross Yield Stimato</div>
                            <div className="text-8xl font-bold text-white mb-4 tabular-nums tracking-tighter">{grossYield.toFixed(1)}%</div>

                            <div className="grid grid-cols-2 gap-4 w-full mt-12">
                                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                                    <div className="text-blue-100 text-[10px] uppercase font-bold mb-1">Cashflow Annuo</div>
                                    <div className="text-white font-bold text-xl font-mono">€ {(rent * 12).toLocaleString()}</div>
                                </div>
                                <div className="bg-white/10 p-6 rounded-2xl backdrop-blur-sm border border-white/10">
                                    <div className="text-blue-100 text-[10px] uppercase font-bold mb-1">Break Even</div>
                                    <div className="text-white font-bold text-xl font-mono">{(price / (rent * 12)).toFixed(1)} Anni</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// 4. COMPARABLE (Revised Layout + Padding)
const ComparableDetail = ({ item, onBack }: any) => {
    return (
        <div className="min-h-full flex flex-col animate-in fade-in duration-500">
            <StickyHeader title={item.data.address} onBack={onBack} />

            <div className="flex-1 w-full max-w-7xl mx-auto p-2 lg:p-4 pt-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 h-full">
                    {/* Left: Enhanced Image Gallery/Hero - MORE COMPACT */}
                    <div className="h-[250px] lg:h-[400px] rounded-2xl overflow-hidden relative border border-white/10 shadow-2xl group">
                        <img src={item.data.image} alt="Main" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                        <div className="absolute top-4 left-4 flex gap-2">
                            <span className="px-2 py-1 bg-black/60 backdrop-blur text-white text-[10px] font-bold rounded-lg border border-white/10 flex items-center gap-1">
                                <Building2 className="w-3 h-3 text-white" /> {item.data.type || 'Residenziale'}
                            </span>
                            <span className="px-2 py-1 bg-yellow-500 text-black text-[10px] font-bold rounded-lg flex items-center gap-1">
                                <Trophy className="w-3 h-3" /> Top Match
                            </span>
                        </div>
                    </div>

                    {/* Right: Info & Specs - COMPACT */}
                    <div className="flex flex-col gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-xl lg:text-2xl font-bold text-white mb-1 leading-tight">{item.data.address}</h1>
                                    <div className="flex items-center gap-1.5 text-gray-400 text-xs lg:text-sm">
                                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                                        <span>{item.data.distance} dal centro</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-baseline justify-end gap-1 text-white mb-0.5">
                                        <span className="text-sm font-medium text-gray-400">€</span>
                                        <span className="text-xl lg:text-2xl font-bold tracking-tight">{item.data.price?.toLocaleString()}</span>
                                    </div>
                                    <div className="text-[10px] uppercase font-bold text-gray-500 tracking-wider">
                                        € {Math.round(item.data.pricePerSqm).toLocaleString()} / mq
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-2 mb-6">
                                {[
                                    { label: 'Mq', value: `${item.data.sqm}` },
                                    { label: 'Locali', value: item.data.rooms || '3' },
                                    { label: 'Bagni', value: item.data.bathrooms || '2' },
                                    { label: 'Piano', value: item.data.floor || '3°' },
                                ].map((f, i) => (
                                    <div key={i} className="p-2 lg:p-3 rounded-xl bg-black/20 text-center border border-white/5">
                                        <div className="text-[9px] text-gray-500 uppercase font-bold mb-0.5">{f.label}</div>
                                        <div className="text-base lg:text-lg font-bold text-white">{f.value}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-xs text-gray-400 font-bold uppercase tracking-wider">Note Agente AI</h3>
                                <p className="text-gray-300 leading-relaxed text-xs lg:text-sm border-l-2 border-orange-500 pl-3">
                                    {item.data.description || "Immobile selezionato per l'ottima distribuzione degli spazi interni e la recente ristrutturazione. Il prezzo al metro quadro è in linea con i valori di mercato."}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col justify-center items-center text-center">
                                <div className="text-xs text-gray-500 uppercase font-bold mb-1">Match Score</div>
                                <div className="text-4xl font-bold text-indigo-400 mb-0.5">94%</div>
                                <div className="text-[10px] text-indigo-200">Alta Affinità</div>
                            </div>
                            <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-2xl p-4 flex flex-col justify-center items-center text-center shadow-lg cursor-pointer hover:scale-[1.02] transition-transform">
                                <h4 className="text-white font-bold text-base mb-1">Vedi Annuncio</h4>
                                <p className="text-white/80 text-[10px]">Apri su portale esterno</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- CONTAINER ---
const MarketDetailContainer: React.FC<{ item: any, onBack: () => void }> = ({ item, onBack }) => {
    return (
        <div className="w-full">
            {item.type === 'liquidity' && <LiquidityDetail item={item} onBack={onBack} />}
            {item.type === 'demand' && <DemandDetail item={item} onBack={onBack} />}
            {item.type === 'yield' && <YieldDetail item={item} onBack={onBack} />}
            {item.type === 'comparable' && <ComparableDetail item={item} onBack={onBack} />}
        </div>
    );
};

// --- MAIN MARKET SECTION ---
const MarketSection = ({ section, data }: { section: SectionData, data: ReportData }) => {
    const [activeDetail, setActiveDetail] = useState<any | null>(null);
    const [viewMode, setViewMode] = useState<'market' | 'comparables'>('market'); // NEW MODE STATE

    const pps = data.overview.pricePerSqm || 3500;

    const market = section.marketData || {} as any;
    const investment = data.sections?.investment?.financials || {} as any;

    const marketData = {
        pricePerSqm: {
            value: market.pricePerSqm?.value ? `€ ${Number(market.pricePerSqm.value).toLocaleString()}` : 'N/D',
            // FALLBACK TREND DATA if empty
            trend: (market.pricePerSqm?.trend && market.pricePerSqm.trend.length > 0)
                ? market.pricePerSqm.trend
                : [
                    { year: '2020', value: 2800 },
                    { year: '2021', value: 2950 },
                    { year: '2022', value: 3100 },
                    { year: '2023', value: 3350 },
                    { year: '2024', value: 3500 },
                    { year: '2025', value: 3650 }
                ],
            explanation: market.pricePerSqm?.explanation || "Dati non disponibili",
            recommendation: market.pricePerSqm?.recommendation || "",
            breakdown: market.pricePerSqm?.breakdown || []
        },
        liquidity: {
            value: market.averageDaysOnMarket?.value ? `${market.averageDaysOnMarket.value} gg` : 'N/D',
            trend: market.averageDaysOnMarket?.trend || [],
            explanation: market.averageDaysOnMarket?.explanation || "Dati non disponibili",
            recommendation: market.averageDaysOnMarket?.recommendation || "",
            breakdown: market.averageDaysOnMarket?.breakdown || []
        },
        demand: {
            value: market.demandIndex?.value ? `${market.demandIndex.value}/100` : 'N/D',
            trend: market.demandIndex?.trend || [],
            explanation: market.demandIndex?.explanation || "Dati non disponibili",
            recommendation: market.demandIndex?.recommendation || "",
            breakdown: market.demandIndex?.breakdown || []
        },
        yield: {
            value: investment.grossYield?.value ? `${investment.grossYield.value}%` : 'N/D',
            trend: investment.grossYield?.trend || [],
            explanation: investment.grossYield?.explanation || "Dati non disponibili",
            recommendation: investment.grossYield?.recommendation || "",
            breakdown: investment.grossYield?.breakdown || []
        }
    };

    // Enhanced Comparable Images
    const comparableImages = [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800", // Modern Villa (Replaced broken link)
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800", // Bright Apartment
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800", // Elegant Interior
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800", // Modern Kitchen
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800"  // Sunny Living Room
    ];

    const comparables = (section.marketData?.comparables || []).slice(0, 5).map((c, i) => ({
        ...c,
        image: comparableImages[i % comparableImages.length] || comparableImages[0]
    }));

    const ProKpiCard = ({ label, value, trend, subtext, icon: Icon, colorHex, colorName, data, onClick }: any) => {
        return (
            <motion.div
                whileHover={{ y: -4, boxShadow: `0 10px 30px -10px ${colorHex}40` }}
                onClick={onClick}
                className={`
                    relative overflow-hidden rounded-2xl p-5 cursor-pointer transition-all 
                    border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-${colorName}-500/30 group
                    flex flex-col justify-between min-h-[160px]
                `}
            >
                <div className="flex justify-between items-start mb-2">
                    <div className={`p-2 rounded-xl bg-${colorName}-500/10 border border-${colorName}-500/20`}>
                        <Icon className={`w-4 h-4 text-${colorName}-400`} />
                    </div>
                    <div className={`flex items-center gap-1 text-[10px] font-bold ${trend > 0 ? 'text-green-400' : 'text-red-400'} bg-black/30 px-2 py-1 rounded-full`}>
                        {trend > 0 ? '+' : ''}{trend}%
                        <TrendingUp className={`w-3 h-3 ${trend < 0 ? 'rotate-180' : ''}`} />
                    </div>
                </div>
                <div>
                    <h4 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-1">{label}</h4>
                    <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <div className="text-[10px] text-gray-500 font-medium max-w-[50%] leading-tight">
                        {subtext}
                    </div>
                    <div className="h-8 w-16 opacity-50">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data.trend}>
                                <Area type="monotone" dataKey="value" stroke={colorHex} strokeWidth={2} fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </motion.div>
        );
    };

    // --- MODAL WRAPPER for Details ---
    const DetailModal = () => {
        if (!activeDetail) return null;

        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-end lg:items-center justify-center lg:p-4 bg-black/90 backdrop-blur-md"
                onClick={() => setActiveDetail(null)}
            >
                <motion.div
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: '100%', opacity: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-[#0f111a] border-t lg:border border-white/10 w-full max-w-4xl rounded-t-[2rem] lg:rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-white/5 h-[80vh] lg:h-[85vh] flex flex-col"
                >
                    {/* Modal Header */}
                    <div className="p-4 lg:p-6 border-b border-white/5 bg-[#131620] flex justify-between items-center shrink-0">
                        <div>
                            <span className="text-[10px] lg:text-xs font-bold uppercase tracking-widest text-gray-500 block mb-0.5">{activeDetail.type === 'comparable' ? 'Immobile Comparabile' : 'Analisi Dettagliata'}</span>
                            <h3 className="text-lg lg:text-xl font-bold text-white tracking-wide">{activeDetail.label}</h3>
                        </div>
                        <button onClick={() => setActiveDetail(null)} className="p-2 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors border border-white/5">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Modal Content - Scrollable */}
                    <div className="flex-1 overflow-y-auto p-4 lg:p-6 pb-20">
                        {activeDetail.type === 'liquidity' && <LiquidityDetail item={activeDetail} onBack={() => { }} isModal />}
                        {activeDetail.type === 'demand' && <DemandDetail item={activeDetail} onBack={() => { }} isModal />}
                        {activeDetail.type === 'yield' && <YieldDetail item={activeDetail} onBack={() => { }} isModal />}
                        {activeDetail.type === 'comparable' && <ComparableDetail item={activeDetail} onBack={() => { }} isModal />}
                    </div>
                </motion.div>
            </motion.div>
        );
    };

    return (
        <div className="w-full max-w-[1400px] mx-auto p-4 lg:p-8 space-y-12 h-full flex flex-col">
            <AnimatePresence>
                {activeDetail && <DetailModal />}
            </AnimatePresence>

            <motion.div
                key="main"
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
            >
                {/* 1. HEADER & CONTROLS */}
                <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
                    <div>
                        <h2 className="text-4xl lg:text-5xl font-bold mb-2">
                            Market <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500">Studio Pro</span>
                        </h2>
                        <p className="text-gray-400 text-sm max-w-xl">
                            Piattaforma avanzata di analisi immobiliare. Valutazioni, Liquidità & Comparables.
                        </p>
                    </div>
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                        <FilterButton label="Market Trends" active={viewMode === 'market'} onClick={() => setViewMode('market')} />
                        <FilterButton label="Comparables" active={viewMode === 'comparables'} onClick={() => setViewMode('comparables')} />
                    </div>
                </div>

                {/* VIEW MODE: MARKET TRENDS */}
                {viewMode === 'market' && (
                    <div className="animate-in fade-in duration-500">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[500px]">

                            {/* A. MAIN CHART (Takes 8 columns) */}
                            <div className="lg:col-span-8 glass-panel rounded-3xl p-6 border border-white/10 bg-gradient-to-b from-white/5 to-transparent flex flex-col relative overflow-hidden group min-h-[300px] md:min-h-[400px] lg:min-h-0">
                                <div className="absolute top-0 right-0 p-6 opacity-30 group-hover:opacity-100 transition-opacity">
                                    <Activity className="w-24 h-24 text-yellow-500/10 rotate-12" />
                                </div>

                                <div className="flex justify-between items-start mb-6 relative z-10">
                                    <div>
                                        <div className="flex items-baseline gap-3">
                                            <span className="text-5xl font-bold text-white tracking-tighter">€ {Math.round(pps).toLocaleString()}</span>
                                            <span className="text-xl text-gray-500 font-medium">/mq</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className="px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold">+12.4% YoY</span>
                                            <span className="text-gray-500 text-xs">vs. Media Quartiere</span>
                                        </div>
                                    </div>
                                    <div className="text-right hidden md:block">
                                        <div className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Forecast 2026</div>
                                        <div className="text-2xl font-bold text-yellow-400">€ {Math.round(pps * 1.04).toLocaleString()}</div>
                                    </div>
                                </div>

                                <div className="flex-1 w-full relative z-10 min-h-[200px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={marketData.pricePerSqm.trend}>
                                            <defs>
                                                <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.3} />
                                                    <stop offset="95%" stopColor="#eab308" stopOpacity={0} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                            <XAxis dataKey="year" stroke="#525252" fontSize={10} tickLine={false} axisLine={false} />
                                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }} />
                                            <Area type="monotone" dataKey="value" stroke="#eab308" strokeWidth={3} fill="url(#colorMain)" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* B. KPI STACK (Liquidity, Demand, Yield) */}
                            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
                                <ProKpiCard
                                    label="Liquidità" value={marketData.liquidity.value} trend={-15} subtext="Giorni sul mercato"
                                    icon={Clock} colorHex="#f97316" colorName="orange" data={marketData.liquidity}
                                    onClick={() => setActiveDetail({ label: 'Analisi Liquidità', color: 'orange', type: 'liquidity', data: marketData.liquidity })}
                                />
                                <ProKpiCard
                                    label="Domanda" value={marketData.demand.value} trend={+8} subtext="Indice pressione"
                                    icon={TrendingUp} colorHex="#10b981" colorName="emerald" data={marketData.demand}
                                    onClick={() => setActiveDetail({ label: 'Analisi Domanda', color: 'emerald', type: 'demand', data: marketData.demand })}
                                />
                                <div className="hidden lg:block">
                                    <ProKpiCard
                                        label="Yield" value={marketData.yield.value} trend={+2.1} subtext="Rendimento Lordo"
                                        icon={Percent} colorHex="#3b82f6" colorName="blue" data={marketData.yield}
                                        onClick={() => setActiveDetail({ label: 'Analisi Rendimento', color: 'blue', type: 'yield', data: marketData.yield })}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* VIEW MODE: COMPARABLES */}
                {viewMode === 'comparables' && (
                    <div className="animate-in fade-in duration-500 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-white">Analisi Comparativa Di Mercato</h3>
                            <div className="text-sm text-gray-400">
                                Identificati <span className="text-white font-bold">{comparables.length}</span> immobili simili
                            </div>
                        </div>

                        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* MOBILE CAROUSEL WRAPPER */}
                            <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 -mx-4 px-4 hide-scrollbar">
                                {comparables.map((comp, idx) => (
                                    <div key={idx} className="min-w-[85vw] snap-center">
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                                            onClick={() => setActiveDetail({ label: comp.address, type: 'comparable', data: comp })}
                                            className="group cursor-pointer rounded-3xl bg-white/5 border border-white/10 overflow-hidden h-full"
                                        >
                                            <div className="h-48 relative overflow-hidden">
                                                <img
                                                    src={comp.image}
                                                    alt="Comp"
                                                    className="w-full h-full object-cover"
                                                    onError={(e) => {
                                                        const target = e.target as HTMLImageElement;
                                                        target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"; // Fallback
                                                    }}
                                                />
                                                <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent">
                                                    <div className="text-xl font-bold text-white mb-1">€ {comp.price?.toLocaleString()}</div>
                                                    <div className="text-xs text-gray-300 flex items-center gap-1"><MapPin className="w-3 h-3" /> {comp.address}</div>
                                                </div>
                                            </div>
                                            <div className="p-4 bg-[#0f172a]">
                                                <div className="flex justify-between text-xs text-gray-400">
                                                    <span>{comp.sqm} mq</span>
                                                    <span>€{Math.round(comp.pricePerSqm).toLocaleString()}/mq</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>

                            {/* DESKTOP GRID (Hidden on Mobile) */}
                            <div className="hidden md:contents">
                                {comparables.map((comp, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
                                        whileHover={{ y: -5 }}
                                        onClick={() => setActiveDetail({ label: comp.address, type: 'comparable', data: comp })}
                                        className="group cursor-pointer rounded-3xl bg-white/5 border border-white/10 overflow-hidden hover:border-yellow-500/50 hover:shadow-2xl transition-all"
                                    >
                                        <div className="h-64 relative overflow-hidden">
                                            <img
                                                src={comp.image}
                                                alt="Comp"
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800"; // Fallback
                                                }}
                                            />
                                            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur rounded-full px-3 py-1 border border-white/10 text-white text-xs font-bold flex items-center gap-1">
                                                <div className="w-2 h-2 rounded-full bg-green-500"></div> Active
                                            </div>
                                            <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                                                <div className="text-2xl font-bold text-white mb-1">€ {comp.price?.toLocaleString()}</div>
                                                <div className="text-sm text-gray-300 flex items-center gap-1"><MapPin className="w-3 h-3" /> {comp.address}</div>
                                            </div>
                                        </div>
                                        <div className="p-6">
                                            <div className="grid grid-cols-3 gap-4 mb-6">
                                                <div className="text-center">
                                                    <div className="text-[10px] text-gray-500 uppercase font-bold">Mq</div>
                                                    <div className="text-white font-bold">{comp.sqm}</div>
                                                </div>
                                                <div className="text-center border-l border-white/10">
                                                    <div className="text-[10px] text-gray-500 uppercase font-bold">€/Mq</div>
                                                    <div className="text-white font-bold">{Math.round(comp.pricePerSqm).toLocaleString()}</div>
                                                </div>
                                                <div className="text-center border-l border-white/10">
                                                    <div className="text-[10px] text-gray-500 uppercase font-bold">Match</div>
                                                    <div className="text-green-400 font-bold">{94 - idx * 2}%</div>
                                                </div>
                                            </div>
                                            <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-white font-bold group-hover:bg-yellow-500 group-hover:text-black group-hover:border-yellow-500 transition-all flex items-center justify-center gap-2">
                                                Vedi Dettagli <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Add New Card (Placeholder) */}
                            <div className="rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center p-8 hover:bg-white/5 transition-colors cursor-pointer text-gray-500 hover:text-white group">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10">
                                    <Home className="w-6 h-6" />
                                </div>
                                <span className="font-bold">Cerca altri immobili</span>
                                <span className="text-xs text-gray-600 mt-2">Espandi il raggio di ricerca</span>
                            </div>
                        </div>
                    </div>
                )}

            </motion.div>
        </div>
    );
};

export default MarketSection;
