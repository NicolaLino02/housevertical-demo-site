
export interface AddressResult {
  display_name: string;
  lat: string;
  lon: string;
  address: {
    road?: string;
    house_number?: string;
    city?: string;
    postcode?: string;
    country?: string;
    [key: string]: string | undefined;
  };
}

export interface PropertyDetails {
  floor: number;
  sqm: number;
  type: 'apartment' | 'villa' | 'loft' | 'penthouse';
  renovationStatus: 'new' | 'good' | 'needs_renovation';
  hasElevator: boolean;
  hasPool: boolean;
  rooms: number;
  bathrooms: number;
  yearBuilt: number;
}

export interface DetailItem {
  label: string;
  value: string | number;
  explanation: string; // Added for deep-dive modals
}

export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

export interface RichMetric {
  value: number | string;
  explanation: string;
  breakdown?: { label: string; value: number }[];
  trend?: { year: string; value: number }[];
  recommendation?: string;
  benchmark?: { label: string; value: number };
}

export interface InvestmentFinancials {
  grossYield: RichMetric;
  netYield: RichMetric;
  cashFlowMonthly: RichMetric;
  capRate: RichMetric;
  totalInvestment: RichMetric;
}

export interface InvestmentExpenses {
  condoFees: number;
  tax: number; // IMU/TASI
  maintenance: number;
  management: number; // Agenzia/Gestione
  utilities: number; // Solo per short rent
}

export interface InvestmentScenarios {
  longTerm: {
    rentMonthly: number;
    occupancyRate: number;
    cashFlowYearly: number;
  };
  shortTerm: {
    adr: number; // Average Daily Rate
    occupancyRate: number;
    cashFlowYearly: number;
  };
}

export interface InvestmentSeasonality {
  winter: { occupancy: number; rate: number };
  spring: { occupancy: number; rate: number };
  summer: { occupancy: number; rate: number };
  autumn: { occupancy: number; rate: number };
}

export interface InvestmentLongTermData {
  advantages: string[];
  risks: string[];
  contractType: string;
  tenantRisk: 'low' | 'medium' | 'high';
}

export interface InvestmentShortTermData {
  seasonality: InvestmentSeasonality;
  risks: string[];
}

export interface InvestmentRisks {
  list: string[];
  severity: 'low' | 'medium' | 'high';
}

export interface Metric {
  label: string;
  value: string | number;
}

export interface MarketTrend {
  year: string;
  price: number;
}

export interface MarketData {
  pricePerSqm: RichMetric;
  averageDaysOnMarket: RichMetric;
  demandIndex: RichMetric; // 0-100
  supplyIndex: RichMetric; // 0-100
  priceGrowthForecast: RichMetric;
  comparables: {
    address: string;
    price: number;
    sqm: number;
    pricePerSqm: number;
    floor: string;
    bathrooms: number;
    rooms: number;
    elevator: boolean;
    description: string;
    analysis: string;
    distance: string;
    url?: string;
  }[];
  priceHistory: MarketTrend[];
}

export interface NewsItem {
  title: string;
  summary: string;
  source: string;
  url: string;
  date: string;
}

export interface RenovationData {
  totalCost: RichMetric;
  valueIncrease: RichMetric;
  roi: RichMetric;
  timeline: RichMetric;
  breakdown: { category: string; cost: number; description: string; tips: string }[];
  bonuses: { name: string; value: string; description: string }[];
}

export interface SectionData {
  title: string;
  content: string;
  summary?: string; // Restored
  score?: number;
  details?: DetailItem[]; // Restored
  recommendation?: string; // Restored

  // Premium Fields
  financials?: InvestmentFinancials;
  expenses?: InvestmentExpenses;
  scenarios?: InvestmentScenarios;
  longTermData?: InvestmentLongTermData; // New
  shortTermData?: InvestmentShortTermData; // New
  seasonality?: InvestmentSeasonality; // Deprecated but kept for compatibility if needed
  risks?: InvestmentRisks; // Deprecated but kept for compatibility if needed
  marketData?: MarketData; // New for Market Section
  renovation?: RenovationData; // New for Renovation Section
  metrics?: Metric[];
  chartData?: any;
  news?: NewsItem[];
}

export interface ReportData {
  overview: {
    estimatedValue: number;
    valueRange: [number, number];
    pricePerSqm: number;
    confidence: number;
  };
  sections: {
    valuation: SectionData;
    investment: SectionData;
    crime: SectionData;
    environment: SectionData;
    connectivity: SectionData;
    amenities: SectionData;
    demographics: SectionData;
    market_comps: SectionData;
    renovation_potential: SectionData;
    rental_yield: SectionData;
    legal_tax: SectionData;
    ai_verdict: SectionData;
  };
}

export enum AppStep {
  LANDING,
  ADDRESS_SEARCH,
  PROPERTY_FORM,
  LOADING,
  REPORT
}
