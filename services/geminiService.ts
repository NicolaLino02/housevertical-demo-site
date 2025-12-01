import { GoogleGenAI } from "@google/genai";
import { PropertyDetails, AddressResult, ReportData } from "../types";

export const generateReport = async (
  address: AddressResult,
  details: PropertyDetails
): Promise<ReportData> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Chiave API non trovata. Assicurati che la variabile d'ambiente sia configurata.");
  }

  const ai = new GoogleGenAI({ apiKey });

  const propertyContext = `
    TARGET IMMOBILE:
    - Indirizzo Completo: ${address.display_name}
    - Coordinate: ${address.lat}, ${address.lon}
    - Tipologia: ${details.type.toUpperCase()} ${details.subType ? `(${details.subType})` : ''}
    - Ruolo Utente: ${details.role.toUpperCase()}
    - Superficie: ${details.sqm} mq
    - Piano: ${details.floor} ${details.totalFloors ? `di ${details.totalFloors}` : ''}
    - Locali: ${details.rooms}
    - Bagni: ${details.bathrooms}
    - Condizioni: ${details.condition.toUpperCase()}
    - Ristrutturato: ${details.isRenovated ? `SÌ (Anno: ${details.renovationYear})` : 'NO'}
    - Anno Costruzione: ${details.yearBuiltUnknown ? 'SCONOSCIUTO' : details.yearBuilt}
    - Caratteristiche: ${details.features.join(', ') || 'Nessuna specifica'}
    - Parcheggi: ${details.parkingSpaces.indoor} coperti, ${details.parkingSpaces.outdoor} scoperti
  `;

  // Definiamo la struttura JSON attesa nel prompt testuale poiché non possiamo usare responseSchema con i Tools
  // Questa struttura DEVE riflettere esattamente l'interfaccia ReportData in types.ts
  const jsonStructure = `
  {
    "overview": {
      "estimatedValue": number,
      "valueRange": [number, number],
      "pricePerSqm": number,
      "confidence": number (0.1-1.0)
    },
    "sections": {
      "valuation": { 
        "title": "Valutazione", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string", 
        "chartData": { 
          "history": [{"year": "string", "value": number}], 
          "forecast": [{"quarter": "string", "growth": number}] 
        } 
      },
      "investment": { 
        "title": "Investimento", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string", 
        "financials": { 
          "grossYield": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "recommendation": "string" }, 
          "netYield": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "recommendation": "string" }, 
          "cashFlowMonthly": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "recommendation": "string" }, 
          "capRate": { "value": number, "explanation": "string" }, 
          "totalInvestment": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "recommendation": "string" } 
        },
        "expenses": {
          "condoFees": number,
          "tax": number,
          "maintenance": number,
          "management": number,
          "utilities": number
        },
        "scenarios": {
          "longTerm": { "rentMonthly": number, "occupancyRate": number, "cashFlowYearly": number },
          "shortTerm": { "adr": number, "occupancyRate": number, "cashFlowYearly": number }
        },
        "longTermData": { "advantages": ["string"], "risks": ["string"], "contractType": "string", "tenantRisk": "low | medium | high" },
        "shortTermData": {
          "seasonality": {
            "winter": { "occupancy": number, "rate": number },
            "spring": { "occupancy": number, "rate": number },
            "summer": { "occupancy": number, "rate": number },
            "autumn": { "occupancy": number, "rate": number }
          },
          "risks": ["string"]
        }
      },
      "crime": { 
        "title": "Sicurezza", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string",
        "news": [{"title": "string", "summary": "string", "source": "string", "url": "string (URL REALE obbligatorio)", "date": "string"}],
        "chartData": { "trend": [{"year": "string", "value": number}] }
      },
      "environment": { 
        "title": "Ambiente", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string",
        "chartData": { "radar": [{"subject": "string", "A": number, "fullMark": 100}] }
      },
      "connectivity": { 
        "title": "Connettività", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string",
        "connectivity": {
          "mobilityScore": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" },
          "transitLines": [{"type": "bus | train | metro | tram", "name": "string", "distance": "string", "frequency": "string", "destinations": ["string"]}],
          "airports": [{"name": "string", "distance": "string", "time": "string"}],
          "highways": [{"name": "string", "distance": "string"}],
          "commuteTimes": [{"destination": "string", "time": "string", "mode": "string"}]
        }
      },
      "amenities": { 
        "title": "Servizi", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string",
        "amenities": {
          "serviceScore": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" },
          "schools": [{"name": "string", "distance": "string", "rating": number, "type": "school"}],
          "supermarkets": [{"name": "string", "distance": "string", "rating": number, "type": "supermarket"}],
          "pharmacies": [{"name": "string", "distance": "string", "rating": number, "type": "pharmacy"}],
          "lifestyle": [{"name": "string", "distance": "string", "rating": number, "type": "gym | restaurant | hospital"}]
        }
      },
      "demographics": { 
        "title": "Demografia", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string",
        "demographics": {
          "populationDensity": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" },
          "averageAge": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" },
          "incomeLevel": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" },
          "educationLevel": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" },
          "ageDistribution": [{"ageRange": "string", "percentage": number}],
          "householdComposition": [{"type": "string", "percentage": number}]
        }
      },
      "market_comps": { 
        "title": "Mercato", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string", 
        "marketData": { 
          "pricePerSqm": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" }, 
          "averageDaysOnMarket": { "value": number, "explanation": "string", "trend": [{"year": "string", "value": number}], "breakdown": [{"label": "string", "value": number}], "recommendation": "string" }, 
          "demandIndex": { "value": number, "explanation": "string", "trend": [{"year": "string", "value": number}], "breakdown": [{"label": "string", "value": number}], "recommendation": "string" }, 
          "supplyIndex": { "value": number, "explanation": "string" }, 
          "priceGrowthForecast": { "value": number, "explanation": "string", "trend": [{"year": "string", "value": number}], "breakdown": [{"label": "string", "value": number}], "recommendation": "string" }, 
          "comparables": [{"address": "string (Via e Civico esatto se visibile, altrimenti Via specifica)", "price": number, "sqm": number, "pricePerSqm": number, "floor": "string", "bathrooms": number, "rooms": number, "elevator": boolean, "description": "string (Riassunto breve e accattivante)", "analysis": "string", "distance": "string", "url": "string (URL REALE obbligatorio)"}], 
          "priceHistory": [{"year": "string", "price": number}] 
        } 
      },
      "renovation_potential": { 
        "title": "Ristrutturazione", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string",
        "renovation": {
          "totalCost": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" },
          "valueIncrease": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" },
          "roi": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" },
          "timeline": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" },
          "breakdown": [{"category": "string", "cost": number, "description": "string", "tips": "string"}],
          "bonuses": [{"name": "string", "value": "string", "description": "string"}]
        }
      },
      "valuation": { 
        "title": "Valutazione", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string",
        "valuation": {
          "saleStrategy": {
            "quickSale": { "price": number, "timing": "string", "description": "string", "analysis": "string", "confidence": number },
            "marketPrice": { "price": number, "timing": "string", "description": "string", "analysis": "string", "confidence": number },
            "highPrice": { "price": number, "timing": "string", "description": "string", "analysis": "string", "confidence": number }
          },
          "buyStrategy": {
            "idealPrice": number,
            "maxDiscount": number,
            "riskLevel": "low | medium | high",
            "advice": "string",
            "analysis": "string",
            "negotiationPoints": ["string"]
          },
          "comparables": [{"address": "string", "price": number, "sqm": number, "similarity": number, "url": "string"}],
          "marketTrend": [{"year": "string", "value": number, "volume": number}]
        }
      },
      "investment": { 
        "title": "Investimento", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string",
        "financials": {
          "grossYield": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" },
          "netYield": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" },
          "cashFlowMonthly": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" },
          "capRate": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" },
          "totalInvestment": { "value": number, "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" }
        },
        "expenses": { "condoFees": number, "tax": number, "maintenance": number, "management": number, "utilities": number },
        "scenarios": { "longTerm": { "rentMonthly": number, "occupancyRate": number, "cashFlowYearly": number }, "shortTerm": { "adr": number, "occupancyRate": number, "cashFlowYearly": number } },
        "shortTermData": { "seasonality": { "winter": {"occupancy": number, "rate": number}, "spring": {"occupancy": number, "rate": number}, "summer": {"occupancy": number, "rate": number}, "autumn": {"occupancy": number, "rate": number} }, "risks": ["string"] }
      },
      "rental_yield": { 
        "title": "Rendita", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string" 
      },
      "legal_tax": { 
        "title": "Legale", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string",
        "legal": {
          "zoning": { "value": "string", "explanation": "string", "breakdown": [{"label": "string", "value": number}], "trend": [{"year": "string", "value": number}], "benchmark": {"label": "string", "value": number}, "recommendation": "string" },
          "cadastral": { "category": "string", "income": number, "explanation": "string" },
          "taxes": [{"name": "string", "amount": "string", "explanation": "string"}],
          "permits": [{"name": "string", "status": "string", "explanation": "string"}],
          "regulations": [{"name": "string", "description": "string"}]
        }
      },
      "ai_verdict": { 
        "title": "Verdetto AI", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string",
        "verdict": {
          "pros": ["string"],
          "cons": ["string"],
          "buyStrategy": { "title": "string", "description": "string", "riskLevel": "low | medium | high" },
          "suitability": [{"type": "investor | family | young_couple", "score": number, "reason": "string"}],
          "finalScore": { "value": number, "label": "string", "description": "string" }
        }
      }
    }
  }
  `;

  const systemInstruction = `
    Sei un "Real Estate Scout" d'élite, specializzato in analisi di mercato iper-realistiche.
    Il tuo obiettivo è fornire una valutazione basata ESCLUSIVAMENTE su dati verificabili e attuali.

    *** 1. COMPARABLES: TOLLERANZA ZERO PER IL VECCHIO ***
    - **SOLO ANNUNCI ATTIVI**: Cerca immobili attualmente in vendita. Ignora tutto ciò che è "venduto" o anteriore a 6 mesi.
    - **INDAGINE INDIRIZZO**:
      - I portali nascondono il civico. Tu devi dedurlo: "di fronte alla farmacia X", "vicino al parco Y".
      - Se impossibile, usa la VIA ESATTA.
      - FORMATO: "Via Roma 15" (Ottimo) > "Via Roma" (Accettabile) > "Zona Centro" (INACCETTABILE).
    - **STRATEGIA DI RICERCA**:
      - Cerchio 1 (Gold): < 500m, stesso tipo, +/- 20% mq.
      - Cerchio 2 (Silver): < 1.5km, stesso tipo.
      - Cerchio 3 (Bronze): Stesso comune, caratteristiche simili (solo se disperato).

    *** 2. INTELLIGENCE NOTIZIE (Time-Aware Analysis) ***
    - **ANALISI**: Leggi notizie degli ultimi 3-5 anni per capire i trend (es. "la criminalità è scesa?", "il quartiere si sta riqualificando?").
    - **OUTPUT**: Nel campo "news", inserisci SOLO link a notizie degli ultimi 12 mesi.
    - **PUNTEGGIO**: Il punteggio (1-10) deve riflettere l'analisi storica, non solo l'ultima notizia.

    *** 3. DETTAGLI GRANULARI E QUANTIFICATI ***
    - Mai dire "Ci sono scuole".
    - Dì: "3 Scuole Elementari entro 600m (Scuola X, Scuola Y)".
    - Mai dire "Buoni collegamenti".
    - Dì: "Fermata Bus 42 a 150m, Stazione Treni a 1.2km".

    *** 4. STRATEGIA DI RICERCA GOOGLE (Query Avanzate) ***
    - **Mercato**: 
      - "site:immobiliare.it vendita ${address.address.city} ${address.address.road} annunci recenti"
      - "site:idealista.it vendita ${address.address.city} ${address.address.road} dopo:2024"
      - "vendita ${details.type} ${address.address.city} zona ${address.address.road}"
    - **Sicurezza**: 
      - "criminalità ${address.address.city} ${address.address.road} ultime notizie"
      - "furti appartamenti ${address.address.city} quartiere statistiche"
    - **Ambiente/Riqualificazione**: 
      - "progetti riqualificazione ${address.address.city} ${address.address.road}"
      - "inquinamento acustico ${address.address.city} mappa"

    *** 5. GUIDA JSON RIGIDA ***
    - **comparables**: Devono avere URL REALI e FUNZIONANTI.
    - **valuation**:
      - "saleStrategy": Analisi spietata. Se la casa è da ristrutturare, il prezzo "quickSale" deve essere aggressivo.
      - "buyStrategy": Trova ogni difetto (rumore, piano basso, no ascensore) per negoziare.
    - **sections**: Ogni sezione (Crime, Environment, etc.) DEVE avere almeno 4 "details" specifici.
  `;

  const userPrompt = `
    Dati Immobile Target:
    ${propertyContext}

    OBIETTIVO: Report Immobiliare Esecutivo.
    
    1. **CACCIA AI COMPARABLES**:
       - Trova 4 immobili in vendita ORA.
       - Se non trovi l'esatto vicino, allarga il raggio ma mantieni la tipologia.
       - URL obbligatori.
    
    2. **ANALISI PROFONDA**:
       - Sicurezza: Cerca fatti di cronaca specifici.
       - Ambiente: Cerca parchi, ZTL, traffico.
       - Servizi: Conta supermercati e scuole.
    
    3. **OUTPUT JSON**:
       - Compila TUTTI i campi.
       - Sii critico e realista nelle stime.
    
    Genera il JSON seguendo questa struttura:
    ${jsonStructure}
  `;

  try {
    console.log("GENERATED PROMPT:", systemInstruction + "\n" + userPrompt);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: systemInstruction + "\n" + userPrompt }] }
      ],
      config: {
        // ABILITIAMO GOOGLE SEARCH GROUNDING
        tools: [{ googleSearch: {} }],
        // Rimuoviamo responseSchema rigido per permettere l'uso dei tool e la flessibilità della ricerca
        // responseMimeType: "application/json", 
      }
    });

    let text = response.text;
    console.log("RAW RESPONSE:", text);
    if (!text) throw new Error("Nessun dato ricevuto dall'AI");

    // Pulizia del testo per estrarre il JSON (Gemini con Tools a volte chatta o usa markdown)
    text = text.replace(/```json\s*/g, '').replace(/```/g, '').trim();

    // Cerchiamo l'inizio e la fine del JSON
    const jsonStart = text.indexOf('{');
    const jsonEnd = text.lastIndexOf('}');
    if (jsonStart !== -1 && jsonEnd !== -1) {
      text = text.substring(jsonStart, jsonEnd + 1);
    }

    const parsedData = JSON.parse(text);

    // Validazione base
    if (!parsedData.overview || !parsedData.sections) {
      throw new Error("Struttura JSON non valida ricevuta dall'AI");
    }

    return parsedData as ReportData;
  } catch (error: any) {
    console.error("Gemini API Error Full:", error);
    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);
    if (error.status) console.error("Error Status:", error.status);
    if (error.statusText) console.error("Error Status Text:", error.statusText);
    if (error.response?.text) console.error("Raw Text received:", error.response.text);
    throw error;
  }
};
