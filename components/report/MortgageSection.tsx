import React, { useState, useEffect } from 'react';
import { Calculator, Euro, Percent, Calendar, PieChart as PieChartIcon, Info, ChevronRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface MortgageSectionProps {
    propertyValue: number;
}

const MortgageSection = ({ propertyValue }: MortgageSectionProps) => {
    // Default: 80% LTV, 3.5% Rate, 30 Years
    const [loanAmount, setLoanAmount] = useState(Math.round(propertyValue * 0.8));
    const [interestRate, setInterestRate] = useState(3.5);
    const [years, setYears] = useState(30);

    const [results, setResults] = useState({
        monthlyPayment: 0,
        totalInterest: 0,
        totalCost: 0
    });

    useEffect(() => {
        calculateMortgage();
    }, [loanAmount, interestRate, years]);

    const calculateMortgage = () => {
        const principal = loanAmount;
        const calculatedInterest = interestRate / 100 / 12;
        const calculatedPayments = years * 12;

        const x = Math.pow(1 + calculatedInterest, calculatedPayments);
        const monthly = (principal * x * calculatedInterest) / (x - 1);

        if (isFinite(monthly)) {
            const total = monthly * calculatedPayments;
            setResults({
                monthlyPayment: monthly,
                totalInterest: total - principal,
                totalCost: total
            });
        }
    };

    const pieData = [
        { name: 'Capitale', value: loanAmount, color: '#3b82f6' },
        { name: 'Interessi', value: results.totalInterest, color: '#a855f7' }
    ];

    const formatCurrency = (val: number) => new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

    return (
        <div className="max-w-7xl w-full mx-auto p-6 space-y-8">
            {/* 1. HEADER */}
            <div className="text-center mb-12 relative">
                <h2 className="text-4xl lg:text-6xl font-bold mb-4">
                    Calcolo <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Mutuo</span>
                </h2>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Simula la rata del tuo mutuo e scopri la sostenibilità del tuo investimento.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 2. INPUT PANEL */}
                <div className="glass-panel p-8 rounded-3xl border border-white/10 bg-white/5 space-y-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Calculator className="w-5 h-5 text-green-400" /> Parametri
                    </h3>

                    {/* Loan Amount Input */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400 font-medium">Importo Mutuo (LTV {(loanAmount / propertyValue * 100).toFixed(0)}%)</span>
                            <span className="text-white font-bold bg-white/10 px-3 py-1 rounded-lg">{formatCurrency(loanAmount)}</span>
                        </div>
                        <input
                            type="range"
                            min={propertyValue * 0.2}
                            max={propertyValue}
                            step={5000}
                            value={loanAmount}
                            onChange={(e) => setLoanAmount(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>Min: {formatCurrency(propertyValue * 0.2)}</span>
                            <span>Max: {formatCurrency(propertyValue)}</span>
                        </div>
                    </div>

                    {/* Interest Rate Input */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400 font-medium">Tasso di Interesse (fisso/variabile)</span>
                            <span className="text-white font-bold bg-white/10 px-3 py-1 rounded-lg">{interestRate}%</span>
                        </div>
                        <input
                            type="range"
                            min="0.5"
                            max="10"
                            step="0.1"
                            value={interestRate}
                            onChange={(e) => setInterestRate(Number(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>0.5%</span>
                            <span>10%</span>
                        </div>
                    </div>

                    {/* Duration Input */}
                    <div className="space-y-4">
                        <span className="text-gray-400 font-medium text-sm">Durata (Anni)</span>
                        <div className="flex gap-2 flex-wrap">
                            {[10, 15, 20, 25, 30].map(yr => (
                                <button
                                    key={yr}
                                    onClick={() => setYears(yr)}
                                    className={`flex-1 min-w-[60px] py-2 rounded-xl text-sm font-bold border transition-all ${years === yr ? 'bg-green-500 border-green-400 text-white shadow-lg shadow-green-500/20' : 'bg-white/5 border-white/5 text-gray-400 hover:bg-white/10'}`}
                                >
                                    {yr}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 3. RESULTS PANEL */}
                <div className="space-y-6">
                    {/* Main Result Card */}
                    <div className="glass-panel p-8 rounded-3xl border border-green-500/20 bg-green-500/5 relative overflow-hidden">
                        {/* Bg Blob */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[80px] rounded-full pointer-events-none" />

                        <h3 className="text-gray-400 text-sm uppercase tracking-widest font-bold mb-2">Rata Mensile Stimata</h3>
                        <div className="text-6xl font-bold text-white mb-2 tracking-tighter">
                            € {results.monthlyPayment.toFixed(0)}
                        </div>
                        <p className="text-green-400/80 text-sm mb-8">
                            Sostenibile con un reddito netto mensile di circa € {(results.monthlyPayment * 3).toFixed(0)}.
                        </p>

                        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                            <div>
                                <p className="text-gray-400 text-xs mb-1">Interessi Totali</p>
                                <p className="text-xl font-bold text-blue-300">{formatCurrency(results.totalInterest)}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-xs mb-1">Costo Totale</p>
                                <p className="text-xl font-bold text-white">{formatCurrency(results.totalCost)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Composition Chart */}
                    <div className="glass-panel p-6 rounded-3xl border border-white/10 bg-white/5 flex flex-col md:flex-row items-center gap-6">
                        <div className="h-[150px] w-[150px] relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={40}
                                        outerRadius={60}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {pieData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <PieChartIcon className="w-6 h-6 text-gray-500" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-3">
                            <h4 className="text-white font-bold">Composizione Costo</h4>
                            {pieData.map((entry) => (
                                <div key={entry.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                                        <span className="text-gray-300">{entry.name}</span>
                                    </div>
                                    <span className="text-white font-mono">{formatCurrency(entry.value)}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default MortgageSection;
