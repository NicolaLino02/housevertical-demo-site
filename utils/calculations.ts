import { PropertyDetails, InvestmentFinancials, InvestmentExpenses, InvestmentScenarios, RenovationData, ValuationData } from '../types';

// --- Constants ---
const MONTHS_IN_YEAR = 12;
const IMU_RATE = 0.0106; // Average IMU rate (1.06%)
const MAINTENANCE_RATE = 0.01; // 1% of property value per year
const MANAGEMENT_RATE_LONG = 0.10; // 10% for long term management
const MANAGEMENT_RATE_SHORT = 0.20; // 20% for short term management
const UTILITIES_MONTHLY_ESTIMATE = 150; // Estimate for short rent
const SHORT_RENT_OCCUPANCY_AVG = 0.65; // 65% occupancy default
const LONG_RENT_OCCUPANCY = 0.95; // 95% (considering some vacancy)

// --- Helper Types ---
interface Comparable {
    price: number;
    sqm: number;
    pricePerSqm: number;
}

// --- Financial Calculations ---

export const calculateExpenses = (
    propertyValue: number,
    sqm: number,
    condoFeesMonthly: number = 50
): InvestmentExpenses => {
    const tax = propertyValue * IMU_RATE; // IMU
    const maintenance = propertyValue * MAINTENANCE_RATE;
    const condoFees = condoFeesMonthly * MONTHS_IN_YEAR;

    // Base expenses without management (calculated later based on rent)
    return {
        condoFees,
        tax,
        maintenance,
        management: 0, // Placeholder
        utilities: 0 // Placeholder
    };
};

export const calculateLongTermScenario = (
    propertyValue: number,
    monthlyRent: number,
    baseExpenses: InvestmentExpenses
): { metrics: any, scenario: any } => {
    const grossIncome = monthlyRent * MONTHS_IN_YEAR;
    const managementCost = grossIncome * MANAGEMENT_RATE_LONG;
    const totalExpenses = baseExpenses.tax + baseExpenses.maintenance + baseExpenses.condoFees + managementCost;

    const netIncome = grossIncome - totalExpenses;
    const grossYield = (grossIncome / propertyValue) * 100;
    const netYield = (netIncome / propertyValue) * 100;
    const cashFlowMonthly = netIncome / MONTHS_IN_YEAR;

    return {
        metrics: {
            grossYield: { value: Number(grossYield.toFixed(2)), explanation: "Rendimento lordo annuo (Affitto / Valore)" },
            netYield: { value: Number(netYield.toFixed(2)), explanation: "Rendimento netto annuo (Utile / Valore)" },
            cashFlowMonthly: { value: Number(cashFlowMonthly.toFixed(0)), explanation: "Flusso di cassa mensile netto stimato" },
            totalInvestment: { value: propertyValue, explanation: "Valore stimato immobile" },
            capRate: { value: Number(netYield.toFixed(2)), explanation: "Tasso di capitalizzazione" }
        },
        scenario: {
            rentMonthly: monthlyRent,
            occupancyRate: LONG_RENT_OCCUPANCY * 100,
            cashFlowYearly: Number(netIncome.toFixed(0))
        }
    };
};

export const calculateShortTermScenario = (
    propertyValue: number,
    adr: number, // Average Daily Rate
    baseExpenses: InvestmentExpenses
): { metrics: any, scenario: any } => {
    const grossIncome = adr * 365 * SHORT_RENT_OCCUPANCY_AVG;
    const managementCost = grossIncome * MANAGEMENT_RATE_SHORT;
    const utilitiesCost = UTILITIES_MONTHLY_ESTIMATE * MONTHS_IN_YEAR;

    const totalExpenses = baseExpenses.tax + baseExpenses.maintenance + baseExpenses.condoFees + managementCost + utilitiesCost;

    const netIncome = grossIncome - totalExpenses;
    const grossYield = (grossIncome / propertyValue) * 100;
    const netYield = (netIncome / propertyValue) * 100;
    const cashFlowMonthly = netIncome / MONTHS_IN_YEAR;

    return {
        metrics: { // Note: These are just for calculation, usually we display Long Term in the main card, but this allows comparison
            grossYield: Number(grossYield.toFixed(2)),
            netYield: Number(netYield.toFixed(2)),
            cashFlowMonthly: Number(cashFlowMonthly.toFixed(0))
        },
        scenario: {
            adr: adr,
            occupancyRate: SHORT_RENT_OCCUPANCY_AVG * 100,
            cashFlowYearly: Number(netIncome.toFixed(0))
        }
    };
};

// --- Valuation Logic ---

export const calculateValuation = (
    details: PropertyDetails,
    comparables: Comparable[],
    realAdvisorPricePerSqm?: number
): { estimatedValue: number, pricePerSqm: number, valueRange: [number, number] } => {

    // 1. Calculate Average Price/Sqm from Comparables
    const validComps = comparables.filter(c => c.price > 0 && c.sqm > 0);
    let avgCompPriceSqm = 0;
    if (validComps.length > 0) {
        avgCompPriceSqm = validComps.reduce((acc, c) => acc + (c.price / c.sqm), 0) / validComps.length;
    }

    // 2. Weighted Average with RealAdvisor (if available)
    let finalPricePerSqm = avgCompPriceSqm;
    if (realAdvisorPricePerSqm && realAdvisorPricePerSqm > 0) {
        if (avgCompPriceSqm > 0) {
            // 60% Comparables, 40% RealAdvisor (External Data)
            finalPricePerSqm = (avgCompPriceSqm * 0.6) + (realAdvisorPricePerSqm * 0.4);
        } else {
            finalPricePerSqm = realAdvisorPricePerSqm;
        }
    }

    // 3. Apply Condition Multipliers
    let conditionMultiplier = 1.0;
    switch (details.condition) {
        case 'excellent': conditionMultiplier = 1.15; break; // +15%
        case 'good': conditionMultiplier = 1.05; break;      // +5%
        case 'livable': conditionMultiplier = 1.0; break;    // Baseline
        case 'poor': conditionMultiplier = 0.85; break;      // -15%
        case 'ruin': conditionMultiplier = 0.60; break;      // -40%
    }

    // Adjust for Features
    if (details.features.includes('elevator') && details.floor > 2) conditionMultiplier += 0.05;
    if (details.features.includes('pool')) conditionMultiplier += 0.05;
    if (details.features.includes('view')) conditionMultiplier += 0.03;
    if (details.parkingSpaces.indoor > 0) conditionMultiplier += 0.05;

    finalPricePerSqm = finalPricePerSqm * conditionMultiplier;

    // 4. Calculate Total Value
    const estimatedValue = Math.round(finalPricePerSqm * details.sqm);

    // 5. Calculate Range (+/- 10%)
    const minVal = Math.round(estimatedValue * 0.9);
    const maxVal = Math.round(estimatedValue * 1.1);

    return {
        estimatedValue,
        pricePerSqm: Math.round(finalPricePerSqm),
        valueRange: [minVal, maxVal]
    };
};

export const calculateRenovationPotential = (
    currentValue: number,
    sqm: number,
    condition: string
): { totalCost: number, valueIncrease: number, roi: number } => {

    let costPerSqm = 0;
    let valueIncreasePercent = 0;

    switch (condition) {
        case 'excellent':
            costPerSqm = 100; valueIncreasePercent = 0.05; break; // Minor touchups
        case 'good':
            costPerSqm = 300; valueIncreasePercent = 0.15; break; // Modernization
        case 'livable':
            costPerSqm = 600; valueIncreasePercent = 0.25; break; // Full renovation
        case 'poor':
            costPerSqm = 1000; valueIncreasePercent = 0.40; break; // Heavy renovation
        case 'ruin':
            costPerSqm = 1500; valueIncreasePercent = 0.60; break; // Reconstruction
        default:
            costPerSqm = 500; valueIncreasePercent = 0.20;
    }

    const totalCost = costPerSqm * sqm;
    const futureValue = currentValue * (1 + valueIncreasePercent);
    const valueIncrease = futureValue - currentValue;
    const roi = ((valueIncrease - totalCost) / totalCost) * 100;

    return {
        totalCost,
        valueIncrease,
        roi: Number(roi.toFixed(1))
    };
};
