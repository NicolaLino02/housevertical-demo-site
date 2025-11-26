
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

  // --- SCHEMA DEFINITION (Identico per compatibilità UI) ---
  const detailItemSchema = {
    type: Type.OBJECT,
    properties: {
      label: { type: Type.STRING },
      value: { type: Type.STRING },
      explanation: { type: Type.STRING }
    },
    required: ["label", "value", "explanation"]
  };

  const sectionSchema = {
    type: Type.OBJECT,
    properties: {
      title: { type: Type.STRING },
      summary: { type: Type.STRING },
      score: { type: Type.NUMBER },
      details: { 
        type: Type.ARRAY, 
        items: detailItemSchema
      },
      recommendation: { type: Type.STRING },
    },
    required: ["title", "summary", "score", "details", "recommendation"]
  };

  // --- NUOVA LOGICA DI PROMPT "MARKET LISTING SIMULATION" ---

  const propertyContext = `
    TARGET IMMOBILE:
    - Indirizzo Completo: ${address.display_name}
    - Coordinate: ${address.lat}, ${address.lon} (Usa queste per la micro-zona esatta)
    - Tipologia: ${details.type.toUpperCase()}
    - Superficie: ${details.sqm} mq
    - Piano: ${details.floor}
    - Condizioni Dichiarate: ${details.renovationStatus.toUpperCase()}
    - Dotazioni: ${details.hasElevator ? "Ascensore SI" : "Ascensore NO"}, ${details.hasPool ? "Piscina SI" : "Piscina NO"}
    - Bagni: ${details.bathrooms}, Locali: ${details.rooms}
    - Anno: ${details.yearBuilt}
  `;

  const systemInstruction = `
    Sei un Perito Immobiliare Senior e Analista di Mercato che lavora per un fondo di investimento Real Estate.
    IL TUO OBIETTIVO: Valutare l'immobile al PREZZO REALE DI MERCATO OGGI (Market Value), simulando una ricerca sui principali portali (Immobiliare.it, Idealista, Casa.it).

    REGOLA D'ORO: IL MERCATO VINCE SUL CATASTO.
    Le tabelle OMI sono spesso vecchie e troppo basse. Se in una zona le case si vendono a 2.000€/mq, non puoi valutarle a 1.400€/mq solo perché lo dice l'OMI. Devi allinearti al "Listing Price" reale.

    PROTOCOLLO DI VALUTAZIONE (ALGORITMO COMPARATIVO):

    1.  **IDENTIFICAZIONE COMPARABLES (Simulazione Web)**:
        - Cerca nella tua conoscenza interna immobili simili in vendita ORA in quella specifica VIA o Quartiere.
        - Se l'indirizzo è "Via Aie, Decimomannu" (esempio), sai che è una zona residenziale di ville. I prezzi sono più alti della media comunale.
    
    2.  **LOGICA "VILLA" vs "APPARTAMENTO"**:
        - SE TIPOLOGIA = VILLA / INDIPENDENTE:
          *   VALE MOLTO DI PIÙ (+25% / +30%) rispetto agli appartamenti in condominio della stessa zona.
          *   NON APPLICARE MAI malus per "piano terra" o "senza ascensore". Nelle ville non contano.
          *   Il giardino e l'indipendenza sono driver di valore enormi.
        - SE TIPOLOGIA = APPARTAMENTO:
          *   Piano alto + ascensore = Premium.
          *   Piano terra o senza ascensore = Malus.

    3.  **CALCOLO PREZZO AL MQ (Sanity Check)**:
        - Esempio: Una Villa a Decimomannu ristrutturata o in buono stato viaggia sui 1.900 - 2.200 €/mq. Se il tuo calcolo viene 1.400 €/mq, È SBAGLIATO. CORREGGILO AL RIALZO.
        - Esempio: Un appartamento a Milano Centro viaggia sui 8.000 - 10.000 €/mq.
        - Sii coerente con i portali immobiliari.

    4.  **SINCERITÀ E SEVERITÀ**:
        - Se la casa è "Da Ristrutturare", abbatti il prezzo pesantemente (costo lavori oggi è alto, 1000€/mq).
        - Se è "Nuova/Ristrutturata", spingi il prezzo verso i massimi di zona.

    5.  **INVESTIMENTO**:
        - Calcola Affitti (Lungo Termine) e Short Rent (Airbnb) basandoti sui prezzi reali degli annunci di affitto in zona.
  `;

  const userPrompt = `
    ${propertyContext}

    Genera il report JSON seguendo rigorosamente queste istruzioni per sezione. Sii specifico e analitico.

    1.  **OVERVIEW (Valutazione Finale)**:
        - 'estimatedValue': Il prezzo a cui metteresti l'immobile in vendita OGGI su Immobiliare.it per venderlo in 3-6 mesi. (Non svenderlo, non fuori mercato).
        - 'valueRange': [Prezzo Minimo (Liquidazione veloce), Prezzo Massimo (Amatore)].
        - 'pricePerSqm': Deve essere coerente: estimatedValue / mq.
        - 'confidence': 0.85 se zona densa, 0.95 se zona molto liquida.

    2.  **MERCATO (market_comps) - 6 ITEM**:
        - 'Giorni sul Mercato': Tempo medio vendita zona.
        - 'Sconto Trattativa': % (es. 7%).
        - 'Prezzo Listing Medio': Prezzo medio annunci simili in zona (spesso più alto del valore finale).
        - 'Domanda vs Offerta': (es. "Alta Richiesta").
        - 'Nr. Immobili Simili': Stima stock concorrente.
        - 'Trend Prezzi': % crescita annuale.
        - *Explanation*: Spiega perché hai scelto questi numeri basandoti sulla zona specifica.

    3.  **INVESTIMENTO (investment) - DATI CONFRONTABILI**:
        - 'Affitto Lungo Termine': Canone mensile realistico (4+4).
        - 'Short Rent (Airbnb)': Fatturato LORDO medio mensile (occupazione x prezzo notte).
        - 'Cashflow Netto': Stima realistica dopo tasse e costi.
        - 'Rendimento Lordo': Yield %.
        - 'Tasso Occupazione': % realistica per la zona.
        - 'Spese Gestione': Stima costi annui.
        - *Explanation*: Giustifica i canoni (es. "Zona vicina aeroporto/ospedale spinge lo short rent").

    4.  **SICUREZZA (crime) - 6 ITEM**:
        - Sii onesto. Se la zona è tranquilla, dai voti alti. Se è pericolosa, dillo.

    5.  **CONNETTIVITÀ**:
        - Calcola tempi VERI (Google Maps style) per i punti di interesse (Aeroporto, Stazione, Centro).
        - Indica i nomi specifici (es. "Aeroporto Elmas", "Stazione Centrale").

    6.  **VERDETTO AI**:
        - Consiglia l'azione migliore (Vendi, Compra, Ristruttura) basandoti solo sui numeri.
        - Se il prezzo/mq è basso rispetto al potenziale -> OPPORTUNITÀ.
        - Se il prezzo è già al picco -> RISCHIO.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        { role: "user", parts: [{ text: systemInstruction + "\n" + userPrompt }] }
      ],
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
