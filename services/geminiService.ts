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
    - Tipologia: ${details.type.toUpperCase()}
    - Superficie: ${details.sqm}
    - Piano: ${details.floor}
    - Condizioni: ${details.renovationStatus.toUpperCase()}
    - Dotazioni: ${details.hasElevator ? "Ascensore SI" : "Ascensore NO"}, ${details.hasPool ? "Piscina SI" : "Piscina NO"}, Balcone/Terrazzo
    - Anno: ${details.yearBuilt}
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
        "recommendation": "string" 
      },
      "amenities": { 
        "title": "Servizi", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string" 
      },
      "demographics": { 
        "title": "Demografia", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string" 
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
        "recommendation": "string" 
      },
      "ai_verdict": { 
        "title": "Verdetto AI", 
        "summary": "string", 
        "score": number (1-10), 
        "details": [{"label": "string", "value": "string | number", "explanation": "string"}], 
        "recommendation": "string" 
      }
    }
  }
  `;

  const systemInstruction = `
    Sei un "Real Estate Scout" esperto e intransigente. 
    Il tuo compito è analizzare il mercato immobiliare reale usando Google Search.

    *** REGOLE CRITICHE DI RICERCA (Grounding) ***
    1. I portali immobiliari (Immobiliare.it, Idealista) spesso NASCONDONO il numero civico esatto.
    2. QUANDO IL NUMERO CIVICO NON È VISIBILE:
       - Cerca di dedurlo dalla descrizione o dalla mappa se possibile.
       - Se impossibile, usa la VIA SPECIFICA (es. "Via Tuveri").
       - EVITA "Zona Centro" se puoi essere più preciso.
       - "address": "Via Tuveri 15" (OTTIMO)
       - "address": "Via Tuveri" (BUONO)
       - "address": "Trivano via Tuveri..." (SBAGLIATO - Non mettere il titolo qui)

    3. DESCRIZIONE E URL:
       - "description": NON copiare il titolo. Fai un RIASSUNTO breve (max 20 parole) delle caratteristiche chiave (es. "Luminoso trilocale ristrutturato con doppia esposizione e posto auto").
       - "url": OBBLIGATORIO. Deve essere il link reale.

    4. STRATEGIA DI RICERCA GLOBALE (Per ogni sezione):
       - **Mercato**: "site:immobiliare.it vendita ${address.address.city} ${address.address.road}", "site:idealista.it vendita ${address.address.city} ${address.address.road}".
       - **Sicurezza**: Cerca "criminalità ${address.address.city} ${address.address.road}", "notizie cronaca ${address.address.city} quartiere", "statistiche furti ${address.address.city}".
       - **Ambiente**: Cerca "qualità aria ${address.address.city}", "parchi vicino ${address.address.road}", "inquinamento acustico ${address.address.city}".
       - **Connettività**: Cerca "fermate bus vicino ${address.address.road}", "stazione treni vicino ${address.address.road}", "distanza aeroporto ${address.address.city}".
       - **Servizi**: Cerca "supermercati vicino ${address.address.road}", "scuole vicino ${address.address.road}", "farmacie vicino ${address.address.road}".
       - **Demografia**: Cerca "statistiche demografiche ${address.address.city}", "reddito medio quartiere ${address.address.city}".

    *** GUIDA ALLA COMPILAZIONE JSON ***
    - **POPOLAMENTO COMPLETO**: Ogni sezione (Crime, Environment, Connectivity, etc.) DEVE avere il campo "details" compilato con almeno 3-4 dati REALI e SPECIFICI trovati.
    - Esempio Connectivity: "Fermata Bus Linea 9 a 100m", "Stazione Centrale a 2km". (NON scrivere "Buoni trasporti").
    - Esempio Amenities: "Supermercato Conad a 200m", "Farmacia Rossi a 50m". (NON scrivere "Negozi vicini").
    
    - **SICUREZZA (Crime)**:
      - Cerca notizie di cronaca REALI e recenti per la zona/città.
      - Compila il campo "news" con Titolo, Fonte e URL reale dell'articolo.
      - Compila "chartData.trend" con una stima dell'andamento criminalità ultimi 5 anni (es. indice 0-100).

    - **AMBIENTE (Environment)**:
      - Cerca dati su: Qualità Aria (AQI), Aree Verdi (Parchi specifici), Inquinamento Acustico.
      - Compila "details" con:
        - "Qualità Aria": Valore AQI stimato e spiegazione.
        - "Aree Verdi": Nomi dei parchi vicini e distanza.
        - "Acustico": Livello di rumore stimato (Basso/Medio/Alto).
      - Compila "chartData.radar" con punteggi 0-100 per: Aria, Verde, Silenzio, Pulizia, Acqua.

    - **RISTRUTTURAZIONE (Renovation)**:
      - Stima i costi di ristrutturazione per mq (es. 500-800€/mq).
      - Calcola "totalCost" (Costo Totale), "valueIncrease" (Incremento Valore Post-Lavori), "roi" (Ritorno Investimento).
      - Compila "breakdown" con voci specifiche: Impianti, Muratura, Infissi, Finiture.
      - Cerca BONUS EDILIZI attivi (es. Bonus Ristrutturazione 50%, Ecobonus) e compilali in "bonuses".

    - **INVESTIMENTI & SPESE**:
      - Calcola "expenses" (IMU, Condominio, Manutenzione) stimandole sulla base dei mq e della zona.
      - Calcola "scenarios":
        - Long Term: Affitto mensile realistico per la zona.
        - Short Term: Prezzo per notte (ADR) e Occupazione media stagionale.
      - Compila "shortTermData.seasonality" con tassi di occupazione realistici per le 4 stagioni.

    - "estimatedValue": Media ponderata dei comparabili.
    - "confidence": Bassa (0.5) se pochi dati, Alta (0.9) se dati precisi.
    - "address": Via e Civico (o Via specifica).
    - "url": Link reale.
  `;

  const userPrompt = `
    Dati Immobile Target:
    ${propertyContext}

    OBIETTIVO: Genera un report immobiliare COMPLETO e BASATO SU DATI REALI.
    
    1. Trova 4 Comparables reali (con URL e Indirizzo pulito).
    2. Cerca dati specifici per Sicurezza, Ambiente, Trasporti e Servizi.
    3. Compila TUTTI i campi del JSON, inclusi i grafici (chartData) e le analisi finanziarie.
    
    Genera il report JSON seguendo rigorosamente questa struttura:
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
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();

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
