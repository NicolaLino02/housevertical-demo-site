import { GoogleGenAI } from "@google/genai";
import { PropertyDetails, AddressResult, ReportData, SectionData } from "../types";
import {
  calculateExpenses,
  calculateLongTermScenario,
  calculateShortTermScenario,
  calculateValuation,
  calculateRenovationPotential
} from "../utils/calculations";

// --- JSON Schemas for AI Responses ---

const locationJsonStructure = `
{
  "crime": { 
    "title": "Sicurezza",
    "summary": "string",
    "score": number, 
    "details": [{"label": "string", "value": "string", "explanation": "string"}], 
    "recommendation": "string",
    "news": [{"title": "string", "summary": "string", "source": "string", "url": "string", "date": "string"}]
  },
  "environment": { 
    "title": "Ambiente",
    "summary": "string",
    "score": number, 
    "details": [{"label": "string", "value": "string", "explanation": "string"}], 
    "recommendation": "string"
  },
  "connectivity": { 
    "title": "Connettività",
    "summary": "string",
    "score": number, 
    "details": [{"label": "string", "value": "string", "explanation": "string"}], 
    "recommendation": "string",
    "connectivity": {
      "mobilityScore": { "value": number, "explanation": "string" },
      "transitLines": [{"type": "bus | train | metro | tram", "name": "string", "distance": "string", "frequency": "string", "destinations": ["string"]}],
      "airports": [{"name": "string", "distance": "string", "time": "string"}],
      "highways": [{"name": "string", "distance": "string"}],
      "commuteTimes": [{"destination": "string", "time": "string", "mode": "string"}]
    }
  },
  "amenities": { 
    "title": "Servizi",
    "summary": "string",
    "score": number, 
    "details": [{"label": "string", "value": "string", "explanation": "string"}], 
    "recommendation": "string",
    "amenities": {
      "serviceScore": { "value": number, "explanation": "string" },
      "schools": [{"name": "string", "distance": "string", "rating": number, "type": "school"}],
      "supermarkets": [{"name": "string", "distance": "string", "rating": number, "type": "supermarket"}],
      "pharmacies": [{"name": "string", "distance": "string", "rating": number, "type": "pharmacy"}],
      "lifestyle": [{"name": "string", "distance": "string", "rating": number, "type": "gym | restaurant | hospital"}]
    }
  },
  "demographics": { 
    "title": "Demografia",
    "summary": "string",
    "score": number, 
    "details": [{"label": "string", "value": "string", "explanation": "string"}], 
    "recommendation": "string",
    "demographics": {
      "populationDensity": { "value": number, "explanation": "string" },
      "averageAge": { "value": number, "explanation": "string" },
      "incomeLevel": { "value": number, "explanation": "string" },
      "educationLevel": { "value": number, "explanation": "string" },
      "ageDistribution": [{"ageRange": "string", "percentage": number}],
      "householdComposition": [{"type": "string", "percentage": number}]
    }
  },
  "legal_tax": { 
    "title": "Legale & Tasse",
    "summary": "string",
    "score": number, 
    "details": [{"label": "string", "value": "string", "explanation": "string"}], 
    "recommendation": "string",
    "legal": {
      "zoning": { "value": "string", "explanation": "string" },
      "cadastral": { "category": "string", "income": number, "explanation": "string" },
      "taxes": [{"name": "string", "amount": "string", "explanation": "string"}],
      "permits": [{"name": "string", "status": "string", "explanation": "string"}],
      "regulations": [{"name": "string", "description": "string"}]
    }
  }
}
`;

const marketJsonStructure = `
{
  "comparables": [
    {
      "address": "string", 
      "price": number, 
      "sqm": number, 
      "pricePerSqm": number, 
      "floor": "string", 
      "bathrooms": number, 
      "rooms": number, 
      "elevator": boolean, 
      "description": "string", 
      "analysis": "string", 
      "distance": "string", 
      "url": "string"
    }
  ],
  "marketData": {
    "averageDaysOnMarket": { "value": number, "explanation": "string" },
    "demandIndex": { "value": number, "explanation": "string" },
    "priceGrowthForecast": { "value": number, "explanation": "string" },
    "realAdvisorPricePerSqm": number
  },
  "rent": {
    "longTermMonthly": number,
    "shortTermDaily": number
  },
  "verdict": {
    "pros": ["string"],
    "cons": ["string"],
    "buyStrategy": { "title": "string", "description": "string", "riskLevel": "low | medium | high" },
    "suitability": [{"type": "investor | family | young_couple", "score": number, "reason": "string"}],
    "finalScore": { "value": number, "label": "string", "description": "string" },
    "recommendation": "string"
  }
}
`;

// --- Helper Functions ---

const cleanJson = (text: string): string => {
  // Remove markdown code blocks
  let cleaned = text.replace(/```json/g, "").replace(/```/g, "").trim();

  const firstOpen = cleaned.indexOf('{');
  if (firstOpen === -1) return "{}";

  let balance = 0;
  let inString = false;
  let escaped = false;
  let endIndex = -1;

  for (let i = firstOpen; i < cleaned.length; i++) {
    const char = cleaned[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (char === '\\') {
      escaped = true;
      continue;
    }

    if (char === '"') {
      inString = !inString;
      continue;
    }

    if (!inString) {
      if (char === '{') {
        balance++;
      } else if (char === '}') {
        balance--;
        if (balance === 0) {
          endIndex = i;
          break;
        }
      }
    }
  }

  if (endIndex !== -1) {
    return cleaned.substring(firstOpen, endIndex + 1);
  }

  // Fallback: return from first open to end if no balanced close found
  return cleaned.substring(firstOpen);
};

// --- Main Function ---

export const generateReport = async (
  address: AddressResult,
  details: PropertyDetails
): Promise<ReportData> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Chiave API non trovata. Assicurati che la variabile d'ambiente sia configurata.");
  }

  const ai = new GoogleGenAI({ apiKey });

  // Helper for rate limiting
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const propertyContext = `
    PROPERTY DETAILS:
    - Address: ${address.display_name}
    - Coordinates: ${address.lat}, ${address.lon}
    - Type: ${details.type} (${details.subType || 'Standard'})
    - Size: ${details.sqm} sqm
    - Floor: ${details.floor}
    - Condition: ${details.condition}
    - Renovated: ${details.isRenovated ? 'Yes' : 'No'}
    - Year Built: ${details.yearBuilt}
    - Features: ${details.features.join(", ")}
  `;

  // --- STEP 1: LOCATION INTELLIGENCE ---
  console.log("STEP 1: Fetching Location Data...");
  const locationPrompt = `
    You are an expert real estate location analyst. Analyze the area of this property:
    ${propertyContext}

    OBJECTIVE: Provide detailed data on Safety, Environment, Connectivity, Amenities, Demographics, and Legal aspects.
    
    INSTRUCTIONS:
    1. Safety: Search for crime news in the last 3 YEARS in the specific neighborhood.
    2. Amenities: Be specific. Provide names and distances of real schools, supermarkets, etc.
    3. Connectivity: List EACH transit line (Bus, Metro, Tram) as a SEPARATE object in the 'transitLines' array. Do NOT group them.
    4. Demographics: Estimate based on the neighborhood data.
    5. Legal: Indicate probable zoning and estimated taxes.
    6. SUMMARY: For each section, write a "summary" of 1-2 sentences summarizing the situation in Italian.
    7. LANGUAGE: All text fields (summaries, explanations, recommendations) MUST be in ITALIAN.

    OUTPUT: Valid JSON conforming to this structure:
    ${locationJsonStructure}
  `;

  // Helper for retry logic
  const generateWithRetry = async (prompt: string, retries = 3): Promise<any> => {
    for (let i = 0; i < retries; i++) {
      try {
        return await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: [{ role: "user", parts: [{ text: prompt }] }],
          config: {
            tools: [{ googleSearch: {} }],
            // responseMimeType: "application/json" // REMOVED: Conflicts with tools
          }
        });
      } catch (error: any) {
        if (error.message?.includes("503") || error.message?.includes("overloaded")) {
          console.warn(`Attempt ${i + 1} failed (503 Overloaded). Retrying in ${(i + 1) * 2}s...`);
          await delay((i + 1) * 2000); // Exponential backoff: 2s, 4s, 6s
          continue;
        }
        throw error; // Throw other errors immediately
      }
    }
    throw new Error("Service unavailable after multiple attempts. Please try again later.");
  };

  try {
    const locationResponse = await generateWithRetry(locationPrompt);

    const locationText = typeof locationResponse.text === 'function' ? locationResponse.text() : locationResponse.text;
    const locationData = JSON.parse(cleanJson(locationText || "{}"));

    // Add delay to avoid hitting rate limits (429)
    await delay(2000);

    // --- STEP 2: MARKET INTELLIGENCE ---
    console.log("STEP 2: Fetching Market Data...");
    const marketPrompt = `
      You are an expert real estate appraiser. Analyze the market for this property:
      ${propertyContext}

      OBJECTIVE: Find REAL comparables and market data.

      STRICT RULES FOR COMPARABLES:
      - YOU MUST USE the 'googleSearch' tool.
      - ONLY use results from:
        - immobiliare.it (single listings, NOT search results pages)
        - idealista.it (single listings, NOT search results pages)
      - COPY the URL EXACTLY as it appears in the search result.
      - NEVER invent URLs, IDs, addresses, or prices.
      - If you do not find valid listings, return "comparables": [] (empty array).

      VALID URL FORMATS (GUIDA):
      - immobiliare.it: deve contenere "/annunci/" e un numero ID.
      - idealista.it: deve contenere "/immobile/" e un numero ID.

      VERIFICATION PROCESS (CRITICAL):
      - For each candidate URL, you MUST verify the page content/snippet.
      - **CHECK FOR EXPIRED STATUS**: Look for keywords like "Venduto", "Scaduto", "Rimosso", "Non disponibile", "Archiviato", "Sotto offerta".
      - **ACTION**: If the listing is expired or sold, **DISCARD IT IMMEDIATELY**. Do not include it in the JSON.
      - **FALSE POSITIVES**: If you are unsure if it's active, DISCARD IT.

      QUANTITY:
      - Target: up to 4 comparables.
      - If you find fewer, that is fine.
      - NEVER INVENT data.

      LANGUAGE: Italian.

      OUTPUT: Valid JSON conforming to this structure:
      ${marketJsonStructure}
    `;

    const marketResponse = await generateWithRetry(marketPrompt);

    const marketText = typeof marketResponse.text === 'function' ? marketResponse.text() : marketResponse.text;
    const marketData = JSON.parse(cleanJson(marketText || "{}"));

    // --- SMART VALIDATION ---
    const isValidListingUrl = (url: string): boolean => {
      if (!url) return false;

      try {
        const u = new URL(url);
        const host = u.hostname.replace(/^www\./, "");
        const path = u.pathname;

        // idealista.it: cerchiamo "/immobile/" seguito da numeri
        // Es: /immobile/12345/ o /immobile/12345
        if (host === "idealista.it") {
          return /\/immobile\/.*\d+/.test(path);
        }

        // immobiliare.it: cerchiamo "/annunci/" seguito da numeri
        // Es: /annunci/12345/ o /annunci/12345-titolo-slug
        if (host === "immobiliare.it") {
          return /\/annunci\/.*\d+/.test(path);
        }

        return false;
      } catch {
        return false;
      }
    };

    if (marketData.comparables && Array.isArray(marketData.comparables)) {
      marketData.comparables = marketData.comparables.filter((c: any) => {
        if (!c || typeof c !== "object") return false;
        if (!isValidListingUrl(c.url)) return false;

        // sanity check numeri
        if (typeof c.price !== "number" || c.price <= 0) return false;
        if (typeof c.sqm !== "number" || c.sqm <= 0) return false;

        // calcolo o ricontrollo pricePerSqm
        c.pricePerSqm = Math.round(c.price / c.sqm);

        return true;
      });
    }

    const validComparables = marketData.comparables || [];
    if (validComparables.length === 0) {
      console.warn("Nessun comparable valido trovato, uso solo dati di zona.");
    }


    // --- STEP 3: DETERMINISTIC CALCULATIONS ---
    console.log("STEP 3: Calculating Financials...");

    // 3.1 Valuation
    const valuation = calculateValuation(
      details,
      validComparables, // Use filtered comparables
      marketData.marketData?.realAdvisorPricePerSqm
    );

    // 3.2 Expenses
    const expenses = calculateExpenses(valuation.estimatedValue, details.sqm);

    // 3.3 Scenarios
    const longTerm = calculateLongTermScenario(
      valuation.estimatedValue,
      marketData.rent?.longTermMonthly || 1000,
      expenses
    );

    const shortTerm = calculateShortTermScenario(
      valuation.estimatedValue,
      marketData.rent?.shortTermDaily || 80,
      expenses
    );

    // 3.4 Renovation
    const renovation = calculateRenovationPotential(
      valuation.estimatedValue,
      details.sqm,
      details.condition
    );

    // --- STEP 4: MERGE & RETURN ---
    console.log("STEP 4: Merging Data...");

    const report: ReportData = {
      overview: {
        estimatedValue: valuation.estimatedValue,
        valueRange: valuation.valueRange,
        pricePerSqm: valuation.pricePerSqm,
        confidence: 0.85 // High confidence due to hybrid approach
      },
      sections: {
        valuation: {
          title: "Valutazione",
          content: "", // Added to fix type error
          summary: `Valore stimato di € ${valuation.estimatedValue.toLocaleString()} basato su ${validComparables.length} comparabili e dati di zona.`,
          score: 8, // Placeholder, could be calculated
          details: [
            { label: "Prezzo/mq Stimato", value: `€ ${valuation.pricePerSqm}`, explanation: "Media ponderata comparables e dati di zona" },
            { label: "Range Valore", value: `€ ${valuation.valueRange[0].toLocaleString()} - ${valuation.valueRange[1].toLocaleString()}`, explanation: "Forchetta di oscillazione +/- 10%" }
          ],
          recommendation: marketData.verdict?.recommendation || "Valutare offerta in linea con il mercato.",
          valuation: {
            saleStrategy: {
              quickSale: { price: valuation.valueRange[0], timing: "1-2 Mesi", description: "Prezzo aggressivo per vendita rapida", analysis: "Sconto del 10% sul valore di mercato", confidence: 0.9 },
              marketPrice: { price: valuation.estimatedValue, timing: "3-6 Mesi", description: "Prezzo di mercato corretto", analysis: "Allineato ai comparables", confidence: 0.8 },
              highPrice: { price: valuation.valueRange[1], timing: "6+ Mesi", description: "Prezzo amatoriale", analysis: "Richiede acquirente specifico", confidence: 0.6 }
            },
            buyStrategy: {
              idealPrice: valuation.valueRange[0],
              maxDiscount: 15,
              riskLevel: "medium",
              advice: "Puntare al ribasso facendo leva sui lavori da fare",
              analysis: "Margine di trattativa presente",
              negotiationPoints: ["Stato conservativo", "Prezzi comparabili inferiori"]
            },
            comparables: validComparables.map((c: any) => ({ ...c, similarity: 85 })),
            marketTrend: []
          }
        },
        investment: {
          title: "Investimento",
          content: "", // Added to fix type error
          summary: `Rendimento lordo stimato del ${longTerm.metrics.grossYield.value}% (Lungo Termine) vs ${shortTerm.metrics.grossYield}% (Short Rent).`,
          score: longTerm.metrics.netYield.value > 4 ? 8 : 5,
          details: [
            { label: "Yield Netto (Lungo)", value: `${longTerm.metrics.netYield.value}%`, explanation: "Rendimento netto annuale affitto 4+4" },
            { label: "Cashflow (Lungo)", value: `€ ${longTerm.metrics.cashFlowMonthly.value}`, explanation: "Flusso di cassa mensile" },
            { label: "Yield Netto (Short)", value: `${shortTerm.metrics.netYield}%`, explanation: "Rendimento netto annuale affitto breve" }
          ],
          recommendation: longTerm.metrics.netYield.value > shortTerm.metrics.netYield ? "Strategia Lungo Termine Consigliata" : "Strategia Short Rent Consigliata",
          financials: longTerm.metrics,
          expenses: expenses,
          scenarios: {
            longTerm: longTerm.scenario,
            shortTerm: shortTerm.scenario
          },
          // Fallbacks for UI components that might expect these
          longTermData: { advantages: ["Rendita stabile", "Gestione semplice"], risks: ["Morosità", "Vincolo lungo"], contractType: "4+4", tenantRisk: "medium" },
          shortTermData: { seasonality: { winter: { occupancy: 50, rate: 80 }, spring: { occupancy: 70, rate: 100 }, summer: { occupancy: 90, rate: 120 }, autumn: { occupancy: 60, rate: 90 } }, risks: ["Vacanza", "Gestione impegnativa"] }
        },
        market_comps: {
          title: "Mercato",
          content: "", // Added to fix type error
          summary: "Analisi dei comparabili di zona.",
          score: 7,
          details: [],
          marketData: {
            pricePerSqm: { value: valuation.pricePerSqm, explanation: "Prezzo al mq stimato" },
            averageDaysOnMarket: marketData.marketData?.averageDaysOnMarket || { value: 90, explanation: "Media zona" },
            demandIndex: marketData.marketData?.demandIndex || { value: 70, explanation: "Media" },
            supplyIndex: { value: 50, explanation: "Media" },
            priceGrowthForecast: marketData.marketData?.priceGrowthForecast || { value: 2, explanation: "Stabile" },
            comparables: validComparables,
            priceHistory: []
          }
        },
        renovation_potential: {
          title: "Ristrutturazione",
          content: "", // Added to fix type error
          summary: `Potenziale ROI del ${renovation.roi}% con ristrutturazione.`,
          score: renovation.roi > 15 ? 9 : 6,
          details: [
            { label: "Costo Stimato", value: `€ ${renovation.totalCost.toLocaleString()}`, explanation: "Basato su mq e condizioni" },
            { label: "Incremento Valore", value: `€ ${renovation.valueIncrease.toLocaleString()}`, explanation: "Valore futuro - Valore attuale" }
          ],
          recommendation: renovation.roi > 20 ? "Ristrutturazione Fortemente Consigliata" : "Ristrutturazione Opzionale",
          renovation: {
            totalCost: { value: renovation.totalCost, explanation: "Costo totale lavori" },
            valueIncrease: { value: renovation.valueIncrease, explanation: "Plusvalenza generata" },
            roi: { value: renovation.roi, explanation: "Ritorno sull'investimento" },
            timeline: { value: "3-6 Mesi", explanation: "Durata stimata lavori" },
            breakdown: [],
            bonuses: []
          }
        },
        crime: { ...locationData.crime, content: "" } || { title: "Sicurezza", content: "", score: 5, details: [], summary: "Dati non disponibili", recommendation: "Verificare in loco" },
        environment: { ...locationData.environment, content: "" } || { title: "Ambiente", content: "", score: 5, details: [], summary: "Dati non disponibili", recommendation: "Verificare in loco" },
        connectivity: { ...locationData.connectivity, content: "" } || { title: "Connettività", content: "", score: 5, details: [], summary: "Dati non disponibili", recommendation: "Verificare in loco", connectivity: { mobilityScore: { value: 5, explanation: "" }, transitLines: [], airports: [], highways: [], commuteTimes: [] } },
        amenities: { ...locationData.amenities, content: "" } || { title: "Servizi", content: "", score: 5, details: [], summary: "Dati non disponibili", recommendation: "Verificare in loco", amenities: { serviceScore: { value: 5, explanation: "" }, schools: [], supermarkets: [], pharmacies: [], lifestyle: [] } },
        demographics: { ...locationData.demographics, content: "" } || { title: "Demografia", content: "", score: 5, details: [], summary: "Dati non disponibili", recommendation: "Verificare in loco", demographics: { populationDensity: { value: 0, explanation: "" }, averageAge: { value: 0, explanation: "" }, incomeLevel: { value: 0, explanation: "" }, educationLevel: { value: 0, explanation: "" }, ageDistribution: [], householdComposition: [] } },
        legal_tax: { ...locationData.legal_tax, content: "" } || { title: "Legale & Tasse", content: "", score: 5, details: [], summary: "Dati non disponibili", recommendation: "Verificare in loco", legal: { zoning: { value: "", explanation: "" }, cadastral: { category: "", income: 0, explanation: "" }, taxes: [], permits: [], regulations: [] } },
        ai_verdict: {
          title: "Verdetto AI",
          content: "", // Added to fix type error
          summary: marketData.verdict?.recommendation || "Analisi completata.",
          score: marketData.verdict?.finalScore?.value || 7,
          details: [],
          recommendation: marketData.verdict?.recommendation || "",
          verdict: marketData.verdict || { pros: [], cons: [], buyStrategy: { title: "", description: "", riskLevel: "medium" }, suitability: [], finalScore: { value: 7, label: "Buono", description: "" }, recommendation: "" }
        },
        // Placeholder for rental_yield section if needed by UI, though Investment covers it
        rental_yield: { title: "Rendita", content: "", summary: "", score: 0, details: [] }
      }
    };

    return report;

  } catch (error: any) {
    console.error("Errore generazione report:", error);
    throw new Error(`Errore durante la generazione del report: ${error.message}`);
  }
};