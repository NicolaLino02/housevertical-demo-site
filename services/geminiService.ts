
import { GoogleGenAI, Type } from "@google/genai";
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

  // Schema per un singolo dettaglio (Label + Value)
  const detailItemSchema = {
    type: Type.OBJECT,
    properties: {
      label: { type: Type.STRING, description: "Nome del dato (es. 'Canone Mensile', 'Rischio Alluvioni')" },
      value: { type: Type.STRING, description: "Valore del dato (es. '1.200 €', 'Basso', '1.5km')" }
    },
    required: ["label", "value"]
  };

  const sectionSchema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      summary: { type: Type.STRING, description: "Analisi discorsiva dettagliata e professionale (min 40 parole)." },
      score: { type: Type.NUMBER, description: "Punteggio da 1 a 10" },
      details: { 
        type: Type.ARRAY, 
        items: detailItemSchema,
        description: "Lista di almeno 5-6 metriche specifiche e numeriche per questa sezione."
      },
      recommendation: { type: Type.STRING, description: "Consiglio operativo strategico." },
    },
    required: ["title", "summary", "score", "details", "recommendation"]
  };

  const prompt = `
    Sei House Vertical AI, il più avanzato analista immobiliare italiano.
    
    OBIETTIVO:
    Generare un report immobiliare dettagliato, critico e realistico per l'indirizzo fornito.
    Devi simulare un'analisi di mercato reale. Sii specifico sui numeri.

    INPUT DATI IMMOBILE:
    - Indirizzo: ${address.display_name}
    - Tipo: ${details.type}
    - Mq: ${details.sqm}
    - Piano: ${details.floor}
    - Stato: ${details.renovationStatus}
    - Anno: ${details.yearBuilt}
    - Ascensore/Piscina: ${details.hasElevator ? 'Sì' : 'No'} / ${details.hasPool ? 'Sì' : 'No'}

    ISTRUZIONI SPECIFICHE PER SEZIONE (Cruciale per i nuovi layout grafici):

    1. INVESTIMENTO (investment):
       - Devi fornire stime separate per "Affitto Lungo Termine" (Canone mensile standard) e "Affitto Breve" (Short Rent/Airbnb stagionale).
       - Includi una stima del "Cashflow Netto".
    
    2. SICUREZZA (crime):
       - Includi "Rischio Idrogeologico" (Basso/Medio/Alto).
       - Includi "Distanza Ospedale/Pronto Soccorso".
       - Includi "Tasso Criminalità" rispetto alla media città.

    3. CONNETTIVITÀ (connectivity):
       - Fornisci tempi/distanze per: "Aeroporto", "Stazione Treni", "Centro Città", "Autostrada".

    4. SERVIZI (amenities):
       - Conta le "Scuole" nel raggio di 1km.
       - Conta "Supermercati" e "Parchi".
    
    5. DEMOGRAFIA (demographics):
       - Stima l'età media del quartiere.
       - Percentuale famiglie vs single.

    6. RISTRUTTURAZIONE (renovation_potential):
       - Stima "Costo Ristrutturazione al mq".
       - Stima "Valore Post-Ristrutturazione".

    REGOLE GENERALI:
    - Lingua: ITALIANO PROFESSIONALE.
    - Valuta: € (Euro).
    - Rispondi SOLO JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: {
              type: Type.OBJECT,
              properties: {
                estimatedValue: { type: Type.NUMBER },
                valueRange: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                pricePerSqm: { type: Type.NUMBER },
                confidence: { type: Type.NUMBER }
              },
              required: ["estimatedValue", "valueRange", "pricePerSqm", "confidence"]
            },
            sections: {
              type: Type.OBJECT,
              properties: {
                valuation: sectionSchema,
                investment: sectionSchema,
                crime: sectionSchema,
                environment: sectionSchema,
                connectivity: sectionSchema,
                amenities: sectionSchema,
                demographics: sectionSchema,
                market_comps: sectionSchema,
                renovation_potential: sectionSchema,
                rental_yield: sectionSchema,
                legal_tax: sectionSchema,
                ai_verdict: sectionSchema,
              },
              required: [
                "valuation", "investment", "crime", "environment", "connectivity", 
                "amenities", "demographics", "market_comps", "renovation_potential", 
                "rental_yield", "legal_tax", "ai_verdict"
              ]
            }
          },
          required: ["overview", "sections"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("Nessun dato ricevuto dall'AI");
    
    return JSON.parse(text) as ReportData;
  } catch (error: any) {
    console.error("Gemini API Error Full:", JSON.stringify(error, null, 2));
    throw error;
  }
};
