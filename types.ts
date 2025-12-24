
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
  type: 'house' | 'apartment';
  subType?: string; // e.g., 'detached', 'semi_detached', 'penthouse'
  role: 'owner' | 'buyer' | 'tenant' | 'agent' | 'other';

  // Composition
  sqm: number;
  rooms: number;
  bathrooms: number;
  floor: number;
  totalFloors?: number;

  // Features
  features: string[]; // e.g., 'balcony', 'garage', 'pool', 'elevator', 'view'
  parkingSpaces: { indoor: number; outdoor: number };

  // Condition & Age
  yearBuilt: number;
  yearBuiltUnknown?: boolean;
  isRenovated: boolean;
  renovationYear?: number;
  condition: 'excellent' | 'good' | 'livable' | 'poor' | 'ruin';

  // Legacy fields mapping (for compatibility if needed, though we should migrate)
  hasElevator?: boolean; // Mapped to features
  hasPool?: boolean; // Mapped to features
  renovationStatus?: 'new' | 'good' | 'needs_renovation'; // Mapped to condition
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

export interface TransitLine {
  type: 'bus' | 'train' | 'metro' | 'tram';
  name: string;
  distance: string;
  frequency: string;
  destinations: string[];
}

export interface ConnectivityData {
  mobilityScore: RichMetric;
  transitLines: TransitLine[];
  airports: { name: string; distance: string; time: string }[];
  highways: { name: string; distance: string }[];
  commuteTimes: { destination: string; time: string; mode: string }[];
}

export interface ServiceItem {
  name: string;
  distance: string;
  rating: number; // 1-5
  type: 'school' | 'supermarket' | 'pharmacy' | 'gym' | 'restaurant' | 'hospital';
}

export interface AmenitiesData {
  serviceScore: RichMetric;
  schools: ServiceItem[];
  supermarkets: ServiceItem[];
  pharmacies: ServiceItem[];
  lifestyle: ServiceItem[]; // Gyms, Restaurants
}

export interface DemographicsData {
  populationDensity: RichMetric;
  averageAge: RichMetric;
  incomeLevel: RichMetric;
  educationLevel: RichMetric;
  ageDistribution: { ageRange: string; percentage: number }[];
  householdComposition: { type: string; percentage: number }[];
}

export interface LegalData {
  zoning: RichMetric; // Urbanistica (Zona A/B/C)
  cadastral: { category: string; income: number; explanation: string }; // Catasto (A/2, A/3)
  taxes: { name: string; amount: string; explanation: string }[]; // IMU, TARI
  permits: { name: string; status: string; explanation: string }[]; // Agibilità, APE
  regulations: { name: string; description: string }[]; // Cedolare Secca, Affitti Brevi
}

export interface VerdictData {
  pros: string[];
  cons: string[];
  buyStrategy: { title: string; description: string; riskLevel: 'low' | 'medium' | 'high' };
  suitability: { type: 'investor' | 'family' | 'young_couple'; score: number; reason: string }[];
  finalScore: { value: number; label: string; description: string };
}

export interface ValuationData {
  saleStrategy: {
    quickSale: { price: number; timing: string; description: string; analysis: string; confidence: number };
    marketPrice: { price: number; timing: string; description: string; analysis: string; confidence: number };
    highPrice: { price: number; timing: string; description: string; analysis: string; confidence: number };
  };
  buyStrategy: {
    idealPrice: number;
    maxDiscount: number;
    riskLevel: 'low' | 'medium' | 'high';
    advice: string;
    analysis: string; // Deep dive for the modal
    negotiationPoints: string[]; // Specific points to use in negotiation
  };
  comparables: {
    address: string;
    price: number;
    sqm: number;
    similarity: number;
    url?: string;
    // Extended fields for demo
    pricePerSqm?: number;
    floor?: string;
    bathrooms?: number;
    rooms?: number;
    elevator?: boolean;
    description?: string;
    analysis?: string;
    distance?: string;
  }[];
  marketTrend: { year: string; value: number; volume: number }[]; // Enhanced chart data
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
  connectivity?: ConnectivityData; // New for Connectivity Section
  amenities?: AmenitiesData; // New for Amenities Section
  demographics?: DemographicsData; // New for Demographics Section
  legal?: LegalData; // New for Legal Section
  verdict?: VerdictData; // New for Verdict Section
  valuation?: ValuationData; // New for Valuation Section
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
  REPORT,
  ABOUT
}
