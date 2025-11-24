
import React, { useState } from 'react';
import { PropertyDetails, AddressResult } from '../types';
import { Home, Ruler, Layers, Hammer, Check } from 'lucide-react';

interface PropertyFormProps {
  address: AddressResult;
  onSubmit: (details: PropertyDetails) => void;
  onBack: () => void;
}

const PropertyForm: React.FC<PropertyFormProps> = ({ address, onSubmit, onBack }) => {
  const [details, setDetails] = useState<PropertyDetails>({
    sqm: 80,
    floor: 1,
    type: 'apartment',
    renovationStatus: 'good',
    hasElevator: true,
    hasPool: false,
    rooms: 3,
    bathrooms: 1,
    yearBuilt: 1990
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(details);
  };

  const updateDetail = <K extends keyof PropertyDetails>(key: K, value: PropertyDetails[K]) => {
    setDetails(prev => ({ ...prev, [key]: value }));
  };

  const typeLabels: Record<string, string> = {
    'apartment': 'Appartamento',
    'villa': 'Villa',
    'loft': 'Loft',
    'penthouse': 'Attico'
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 bg-slate-900 relative">
      <div className="w-full max-w-3xl glass-panel p-6 md:p-12 rounded-3xl shadow-2xl animate-fade-in-up my-4">
        <button onClick={onBack} className="text-gray-400 hover:text-white mb-6 text-sm">← Indietro</button>
        
        <div className="mb-8 border-b border-white/10 pb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Dettagli dell'Immobile</h2>
          <div className="flex items-center text-blue-400">
            <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="text-sm font-medium truncate">{address.display_name}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          
          {/* Main Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Superficie (mq)</label>
              <div className="relative">
                <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input 
                  type="number" 
                  value={details.sqm} 
                  onChange={(e) => updateDetail('sqm', Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Piano</label>
              <div className="relative">
                <Layers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                <input 
                  type="number" 
                  value={details.floor} 
                  onChange={(e) => updateDetail('floor', Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Type Selection */}
          <div className="space-y-3">
            <label className="text-sm text-gray-400 font-medium">Tipologia</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {['apartment', 'villa', 'loft', 'penthouse'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => updateDetail('type', type as any)}
                  className={`py-3 px-2 md:px-4 rounded-xl border transition-all text-sm md:text-base ${
                    details.type === type 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {typeLabels[type]}
                </button>
              ))}
            </div>
          </div>

           {/* Renovation Selection */}
           <div className="space-y-3">
            <label className="text-sm text-gray-400 font-medium">Condizioni</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
              {[
                { id: 'new', label: 'Nuovo / Ristrutturato' },
                { id: 'good', label: 'Buono Stato' },
                { id: 'needs_renovation', label: 'Da Ristrutturare' }
              ].map((status) => (
                <button
                  key={status.id}
                  type="button"
                  onClick={() => updateDetail('renovationStatus', status.id as any)}
                  className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                    details.renovationStatus === status.id
                    ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Counters */}
          <div className="grid grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Locali</label>
              <div className="flex items-center space-x-2 md:space-x-4 bg-white/5 p-2 rounded-xl border border-white/10">
                <button type="button" onClick={() => updateDetail('rooms', Math.max(1, details.rooms - 1))} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">-</button>
                <span className="flex-1 text-center font-bold">{details.rooms}</span>
                <button type="button" onClick={() => updateDetail('rooms', details.rooms + 1)} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">+</button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 font-medium">Bagni</label>
              <div className="flex items-center space-x-2 md:space-x-4 bg-white/5 p-2 rounded-xl border border-white/10">
                <button type="button" onClick={() => updateDetail('bathrooms', Math.max(1, details.bathrooms - 1))} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">-</button>
                <span className="flex-1 text-center font-bold">{details.bathrooms}</span>
                <button type="button" onClick={() => updateDetail('bathrooms', details.bathrooms + 1)} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">+</button>
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex space-x-6 pt-2">
            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${details.hasElevator ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                {details.hasElevator && <Check className="w-4 h-4 text-white" />}
              </div>
              <input type="checkbox" className="hidden" checked={details.hasElevator} onChange={(e) => updateDetail('hasElevator', e.target.checked)} />
              <span className="text-gray-300 group-hover:text-white text-sm md:text-base">Ascensore</span>
            </label>

            <label className="flex items-center space-x-3 cursor-pointer group">
              <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${details.hasPool ? 'bg-green-500 border-green-500' : 'border-gray-500'}`}>
                {details.hasPool && <Check className="w-4 h-4 text-white" />}
              </div>
              <input type="checkbox" className="hidden" checked={details.hasPool} onChange={(e) => updateDetail('hasPool', e.target.checked)} />
              <span className="text-gray-300 group-hover:text-white text-sm md:text-base">Piscina</span>
            </label>
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-blue-500/25 transition-all transform hover:scale-[1.02] text-lg"
          >
            Genera Report House Vertical
          </button>

        </form>
      </div>
    </div>
  );
};

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export default PropertyForm;
