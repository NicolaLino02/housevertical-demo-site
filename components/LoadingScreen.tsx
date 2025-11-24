import React, { useEffect, useState } from 'react';

const steps = [
  "Connessione al Catasto Nazionale...",
  "Analisi Immagini Satellitari...",
  "Interrogazione Database Sicurezza...",
  "Simulazione Rischi Ambientali...",
  "Confronto con 10.000+ Immobili...",
  "Generazione Previsioni Investimento...",
  "Finalizzazione Verdetto AI..."
];

const LoadingScreen: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < steps.length - 1) {
      const timeout = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 1500); // Change step every 1.5s
      return () => clearTimeout(timeout);
    }
  }, [currentStep]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0f172a] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
      
      <div className="z-10 text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
           <div className="absolute inset-0 border-4 border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-transparent rounded-full animate-spin"></div>
           <div className="absolute inset-2 border-4 border-t-transparent border-r-blue-400 border-b-purple-400 border-l-pink-400 rounded-full animate-spin direction-reverse duration-500"></div>
        </div>

        <h3 className="text-2xl font-bold mb-2 text-white transition-all duration-300">
          {steps[currentStep]}
        </h3>
        <p className="text-gray-500 text-sm">Elaborazione dati via House Vertical Engine</p>

        <div className="mt-8 w-64 h-1 bg-gray-800 rounded-full overflow-hidden mx-auto">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;