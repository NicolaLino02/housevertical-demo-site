import React, { useState } from 'react';
import { AppStep, AddressResult, PropertyDetails, ReportData } from './types';
import HeroSection from './components/HeroSection';
import AddressSearch from './components/AddressSearch';
import PropertyForm from './components/PropertyForm';
import LoadingScreen from './components/LoadingScreen';
import ReportView from './components/ReportView';
import { generateReport } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);
  const [address, setAddress] = useState<AddressResult | null>(null);
  const [reportData, setReportData] = useState<ReportData | null>(null);

  const handleAddressSelect = (selected: AddressResult) => {
    setAddress(selected);
    setStep(AppStep.PROPERTY_FORM);
  };

  const handlePropertySubmit = async (details: PropertyDetails) => {
    if (!address) return;
    setStep(AppStep.LOADING);
    
    try {
      const data = await generateReport(address, details);
      setReportData(data);
      setStep(AppStep.REPORT);
    } catch (error) {
      console.error("Report generation failed:", error);
      alert("Impossibile generare il report al momento. Assicurati che la chiave API sia configurata o riprova più tardi.");
      setStep(AppStep.PROPERTY_FORM);
    }
  };

  return (
    <main className="w-full h-screen bg-[#0f172a] text-white">
      {step === AppStep.LANDING && (
        <HeroSection onStart={() => setStep(AppStep.ADDRESS_SEARCH)} />
      )}
      
      {step === AppStep.ADDRESS_SEARCH && (
        <AddressSearch 
          onSelect={handleAddressSelect} 
          onBack={() => setStep(AppStep.LANDING)}
        />
      )}

      {step === AppStep.PROPERTY_FORM && address && (
        <PropertyForm 
          address={address}
          onSubmit={handlePropertySubmit}
          onBack={() => setStep(AppStep.ADDRESS_SEARCH)}
        />
      )}

      {step === AppStep.LOADING && (
        <LoadingScreen />
      )}

      {step === AppStep.REPORT && reportData && (
        <ReportView data={reportData} />
      )}
    </main>
  );
};

export default App;