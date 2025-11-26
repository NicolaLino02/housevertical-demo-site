
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

export interface SectionData {
  title: string;
  summary: string;
  score: number; // 0-10
  details: DetailItem[]; 
  recommendation: string;
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
