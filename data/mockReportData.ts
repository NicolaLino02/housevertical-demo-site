
import { ReportData } from "../types";

export const MOCK_REPORT: ReportData = {
  overview: {
    estimatedValue: 465000,
    valueRange: [445000, 485000],
    pricePerSqm: 5410,
    confidence: 0.96
  },
  sections: {
    valuation: {
      title: "Valutazione",
      content: "",
      summary: "Valore stimato di € 465.000, in forte crescita (+5.2%) rispetto all'anno precedente.",
      score: 9,
      details: [
        { label: "Prezzo/mq", value: "€ 5.410", explanation: "Valore nel 90° percentile per la zona Città Studi." },
        { label: "Trend", value: "+5.2%", explanation: "Crescita superiore alla media di Milano (+3.1%)." }
      ],
      recommendation: "Valore ai massimi storici. Ottimo momento per capitalizzare o rifinanziare.",
      valuation: {
        saleStrategy: {
          quickSale: { price: 445000, timing: "15-30 Giorni", description: "Liquidità immediata", analysis: "A questo prezzo si attirano investitori cash.", confidence: 0.98 },
          marketPrice: { price: 465000, timing: "2-4 Mesi", description: "Valore equo", analysis: "Prezzo allineato ai rogiti recenti in via Pacini.", confidence: 0.90 },
          highPrice: { price: 495000, timing: "6+ Mesi", description: "Target amatoriale", analysis: "Richiede marketing emozionale e home staging.", confidence: 0.65 }
        },
        buyStrategy: {
          idealPrice: 450000,
          maxDiscount: 8,
          riskLevel: "low",
          advice: "Offerta a €450k con caparra confirmatoria robusta (20%).",
          analysis: "L'immobile è liquido, evitare ribassi aggressivi che verrebbero scartati.",
          negotiationPoints: ["Infissi originali da sostituire", "Assenza aria condizionata canalizzata"]
        },
        comparables: [
          { address: "Via Pacini 15", price: 470000, sqm: 87, similarity: 98, pricePerSqm: 5402, floor: "4", bathrooms: 1, rooms: 3, elevator: true, description: "Ristrutturato 2023", analysis: "Immobile gemello, finiture superiori.", distance: "Nello stabile", url: "https://www.immobiliare.it" },
          { address: "Via Teodosio 22", price: 445000, sqm: 85, similarity: 92, pricePerSqm: 5235, floor: "2", bathrooms: 1, rooms: 3, elevator: true, description: "Stato originale", analysis: "Piano più basso, meno luminoso.", distance: "150m", url: "https://www.immobiliare.it" },
          { address: "Piazza Leonardo 4", price: 510000, sqm: 90, similarity: 85, pricePerSqm: 5666, floor: "5", bathrooms: 2, rooms: 3, elevator: true, description: "Doppi servizi", analysis: "Posizione di maggior pregio.", distance: "300m", url: "https://www.immobiliare.it" }
        ],
        marketTrend: [
          { year: "2021", value: 415000, volume: 95 },
          { year: "2022", value: 435000, volume: 102 },
          { year: "2023", value: 450000, volume: 110 },
          { year: "2024", value: 465000, volume: 125 }
        ]
      }
    },
    investment: {
      title: "Investimento",
      content: "",
      summary: "Short Rent imbattibile: ROI potenziale dell'8.1% grazie alla vicinanza con Politecnico e Istituto Besta.",
      score: 9,
      details: [
        { label: "Yield Short", value: "8.1%", explanation: "Occupazione stimata 85% annuo." },
        { label: "Yield Long", value: "5.4%", explanation: "Canone Concordato 3+2 con cedolare." }
      ],
      recommendation: "Convertire in affitti brevi (3 stanze) per massimizzare il cashflow.",
      financials: {
        grossYield: { value: 8.1, explanation: "Lordo su prezzo acquisto" },
        netYield: { value: 6.2, explanation: "Netto tasse (21%) e gestione (20%)" },
        cashFlowMonthly: { value: 2150, explanation: "Media mensile netta" },
        capRate: { value: 6.5, explanation: "Tasso di capitalizzazione" },
        totalInvestment: { value: 485000, explanation: "Include €20k spese accessorie" }
      },
      expenses: {
        condoFees: 2400,
        tax: 1800,
        maintenance: 1200,
        management: 4500,
        utilities: 2400
      },
      scenarios: {
        longTerm: { rentMonthly: 1750, occupancyRate: 100, cashFlowYearly: 16500 },
        shortTerm: { adr: 135, occupancyRate: 82, cashFlowYearly: 28500 }
      },
      longTermData: {
        advantages: ["Stabilità flussi", "Zero vacancy risk", "Gestione passiva"],
        risks: ["Rischio morosità incastro legale", "Rendita inferiore"],
        contractType: "Studenti Universitari (Transitorio)",
        tenantRisk: "medium"
      },
      shortTermData: {
        seasonality: {
          winter: { occupancy: 65, rate: 110 },
          spring: { occupancy: 85, rate: 140 },
          summer: { occupancy: 95, rate: 160 },
          autumn: { occupancy: 90, rate: 150 }
        },
        risks: ["Gestione operativa intensa", "Usura immobile accelerata", "Normative comunali in evoluzione"]
      }
    },
    crime: {
      title: "Sicurezza",
      content: "",
      summary: "Zona sicura e vigilata. Indice di criminalità inferiore del 15% rispetto alla media di Milano.",
      score: 8,
      news: [
        {
          date: "2 Nov 2024",
          source: "MilanoToday",
          title: "Piola-Città Studi: Potenziata l'illuminazione pubblica nel parchetto di via Pascoli",
          summary: "Il municipio 3 ha completato l'installazione di nuovi lampioni a LED per aumentare la sicurezza notturna nelle aree verdi.",
          url: "https://www.milanotoday.it"
        },
        {
          date: "15 Ott 2024",
          source: "Il Giorno",
          title: "Sicurezza, calano i furti in appartamento nella zona est",
          summary: "I dati della Questura confermano un trend in discesa del 12% rispetto all'anno precedente grazie ai controlli intensificati.",
          url: "https://www.ilgiorno.it"
        },
        {
          date: "20 Set 2024",
          source: "Corriere Milano",
          title: "Nuovo presidio di polizia locale in Piazza Leonardo",
          summary: "Attivo da lunedì il nuovo punto mobile di controllo per garantire maggior presidio durante le ore serali.",
          url: "https://milano.corriere.it"
        }
      ],
      details: [{ label: "Livello", value: "Basso", explanation: "Prevalentemente reati minori (borseggi)" }],
      recommendation: "Zona adatta a famiglie e studenti, sicura anche di notte grazie alla movida di Lambrate."
    },
    environment: {
      title: "Ambiente",
      content: "",
      summary: "Buona qualità della vita. Vicinanza strategica a spazi verdi importanti (Giardino Farina, Parco Lambro).",
      score: 7,
      details: [{ label: "Verde", value: "Alta", explanation: "4 parchi nel raggio di 1km" }],
      recommendation: "Ottimo compromesso tra urbanità e verde."
    },
    connectivity: {
      title: "Connettività",
      content: "",
      summary: "Hub strategico. Metro Verde (M2) a 2 minuti a piedi, Stazione Ferroviaria Lambrate a 5 minuti.",
      score: 10,
      details: [{ label: "Mobilità", value: "Eccellente", explanation: "Non serve l'auto privata" }],
      recommendation: "Perfetto per pendolari su Milano o fuori città.",
      connectivity: {
        mobilityScore: { value: 98, explanation: "Transit Score vertice classifica" },
        transitLines: [
          { type: "metro", name: "M2 Piola/Lambrate", distance: "200m", frequency: "2.5 min", destinations: ["Garibaldi", "Centrale", "Cadorna"] },
          { type: "train", name: "Stazione Lambrate", distance: "500m", frequency: "Alta", destinations: ["Monza", "Bergamo", "Venezia"] },
          { type: "bus", name: "Filobus 90/91", distance: "600m", frequency: "5 min", destinations: ["Circonvallazione Esterna"] }
        ],
        airports: [{ name: "Linate", distance: "12 min", time: "Taxi o Metro M4 (scambio Dateo)" }],
        highways: [{ name: "Tangenziale Est (Uscita Lambrate)", distance: "4 min" }],
        commuteTimes: [{ destination: "Piazza Duomo", time: "18 min", mode: "Metro" }, { destination: "Stazione Centrale", time: "8 min", mode: "Metro" }]
      }
    },
    amenities: {
      title: "Servizi",
      content: "",
      summary: "Città Studi offre ogni tipo di servizio. Eccellenza per istruzione e sanità.",
      score: 10,
      details: [{ label: "Servizi", value: "Top Tier", explanation: "Tutto raggiungibile a piedi" }],
      recommendation: "Ideale per chi cerca comodità totale.",
      amenities: {
        serviceScore: { value: 96, explanation: "Zona dei 15 minuti reale" },
        schools: [
          { name: "Politecnico di Milano", distance: "400m", rating: 5, type: "school" },
          { name: "Scuola Elementare Stoppani", distance: "600m", rating: 4, type: "school" }
        ],
        supermarkets: [
          { name: "Unes Supermercati", distance: "100m", rating: 4, type: "supermarket" },
          { name: "Esselunga Rubattino", distance: "1.2km", rating: 5, type: "supermarket" }
        ],
        pharmacies: [{ name: "Farmacia dei Padri", distance: "50m", rating: 5, type: "pharmacy" }],
        lifestyle: [
          { name: "Birrificio Lambrate", distance: "800m", rating: 5, type: "restaurant" },
          { name: "Istituto Besta", distance: "300m", rating: 5, type: "hospital" }
        ]
      }
    },
    demographics: {
      title: "Demografia",
      content: "",
      summary: "Mix vibrante di studenti universitari (40%), giovani professionisti (35%) e residenti storici (25%).",
      score: 9,
      details: [{ label: "Trend", value: "Gentrification", explanation: "In progressiva riqualificazione" }],
      recommendation: "Target inquilini di alta qualità e solvibilità garantita (genitori).",
      demographics: {
        populationDensity: { value: 0, explanation: "" },
        averageAge: { value: 36, explanation: "Tra le più basse di Milano" },
        incomeLevel: { value: 0, explanation: "Medio-Alto in crescita" },
        educationLevel: { value: 0, explanation: "" },
        ageDistribution: [],
        householdComposition: []
      }
    },
    market_comps: {
      title: "Mercato",
      content: "",
      summary: "Il mercato di Città Studi ha sovraperformato Milano del 2% negli ultimi 24 mesi.",
      score: 8,
      details: [],
      marketData: {
        pricePerSqm: { value: 5410, explanation: "Media zona ristrutturato" },
        averageDaysOnMarket: { value: 38, explanation: "Elevata liquidità (Media MI: 55gg)" },
        demandIndex: { value: 92, explanation: "Molto Alta" },
        supplyIndex: { value: 35, explanation: "Stock in esaurimento" },
        priceGrowthForecast: { value: 4.1, explanation: "Previsto 2025" },
        comparables: [
          { address: "Via Teodosio 44", price: 495000, sqm: 95, similarity: 88, pricePerSqm: 5210, floor: "5", bathrooms: 2, rooms: 3, elevator: true, description: "Piano alto con doppia esposizione, parzialmente arredato.", distance: "400m", url: "https://immobiliare.it" },
          { address: "Piazza Piola 12", price: 580000, sqm: 100, similarity: 85, pricePerSqm: 5800, floor: "3", bathrooms: 2, rooms: 4, elevator: true, description: "Signorile, portineria tutto il giorno.", distance: "350m", url: "https://immobiliare.it" },
          { address: "Via Ampère 101", price: 390000, sqm: 70, similarity: 80, pricePerSqm: 5570, floor: "1", bathrooms: 1, rooms: 2, elevator: true, description: "Bilocale ampio uso investimento, locato.", distance: "250m", url: "https://immobiliare.it" }
        ],
        priceHistory: [
          { year: '2019', value: 4200 },
          { year: '2020', value: 4350 },
          { year: '2021', value: 4600 },
          { year: '2022', value: 4900 },
          { year: '2023', value: 5200 },
          { year: '2024', value: 5410 }
        ]
      }
    },
    renovation_potential: {
      title: "Ristrutturazione",
      content: "",
      summary: "Potenziale nascosto: abbattendo il tramezzo cucina-sala si crea un open space che aumenta il valore del 12%.",
      score: 7,
      details: [],
      recommendation: "Ristrutturazione consigliata per cambio target da affitto a vendita amatoriale.",
      renovation: {
        totalCost: { value: 35000, explanation: "Ristrutturazione media" },
        valueIncrease: { value: 55000, explanation: "Valore aggiunto" },
        roi: { value: 57, explanation: "ROI Ristrutturazione" },
        timeline: { value: "3 Mesi", explanation: "Chiavi in mano" },
        breakdown: [
          { category: "Opere Murarie", cost: 5000, description: "Demolizione tramezzi e smaltimento", tips: "Creare Open Space" },
          { category: "Impianti", cost: 12000, description: "Rifacimento elettrico e idraulico", tips: "Certificazione a norma" },
          { category: "Finiture", cost: 10000, description: "Parquet e rivestimenti", tips: "Gres porcellanato effetto legno" },
          { category: "Infissi", cost: 8000, description: "PVC Doppio Vetro", tips: "Taglio termico acustico" }
        ],
        bonuses: [
          { name: "Bonus Casa 50%", value: "€ 17.500", description: "Detrazione IRPEF 10 anni" },
          { name: "Bonus Mobili", value: "€ 5.000", description: "Su acquisto arredi" }
        ]
      }
    },
    rental_yield: { title: "Rendita", content: "", summary: "", score: 0, details: [] },
    legal_tax: {
      title: "Legale & Tasse",
      content: "",
      summary: "Situazione trasparente. Nessuna ipoteca iscritta, conformità urbanistica verificata (ante '67).",
      score: 10,
      details: [],
      recommendation: "Richiedere accesso agli atti per verifica finale tramezzi interni.",
      legal: {
        zoning: { value: "A/3 (Economico)", explanation: "Bassa rendita castale" },
        cadastral: { category: "A/3", income: 852.15, explanation: "Rendita Catastale aggiornata" },
        taxes: [{ name: "IMU (Seconde case)", amount: "€ 1.150", explanation: "Stima annua" }, { name: "TARI", amount: "€ 180", explanation: "Rifiuti" }],
        permits: [{ name: "APE", status: "Classe E", explanation: "145 kWh/mq anno" }, { name: "Agibilità", status: "Presente", explanation: "" }],
        regulations: [{ name: "Affitti Brevi", description: "Nessun divieto nel regolamento di condominio vigente." }]
      }
    },
    ai_verdict: {
      title: "Verdetto AI",
      content: "",
      summary: "HARD BUY. Immobile scarso sul mercato con fondamentali (posizione e yield) solidissimi.",
      score: 9.2,
      details: [],
      recommendation: "Procedere immediatamente con proposta vincolata al mutuo.",
      verdict: {
        pros: ["Yield Short Rent > 8%", "Posizione Metro M2 irreplicabile", "Taglio perfetto per investimento"],
        cons: ["Affaccio su via trafficata (necessari doppi vetri)", "Basso piano (meno luce)"],
        buyStrategy: { title: "Aggressive Entry", description: "Il mercato è veloce, non temporeggiare.", riskLevel: "low" },
        suitability: [
          { type: "investor", score: 10, reason: "Cash machine perfetta per short rent." },
          { type: "young_couple", score: 7, reason: "Ottimo start ma potrebbe diventare stretto." }
        ],
        finalScore: { value: 9.2, label: "Eccellenza", description: "Rapporto rischio/rendimento estremamente favorevole." }
      }
    }
  }
};
