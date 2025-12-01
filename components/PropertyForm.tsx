import React, { useState } from 'react';
import { PropertyDetails, AddressResult } from '../types';
import {
  Home, Building2, User, Check, ArrowRight, ArrowLeft,
  Hammer, Ruler, Layers, Car, Trees, Waves, Mountain,
  Zap, Shield, AlertTriangle, Star, Calendar
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PropertyFormProps {
  address: AddressResult;
  onSubmit: (details: PropertyDetails) => void;
  onBack: () => void;
}

const STEPS = [
  { id: 'type', title: 'Tipologia', icon: Home },
  { id: 'role', title: 'Il tuo Ruolo', icon: User },
  { id: 'features', title: 'Caratteristiche', icon: Star },
  { id: 'renovation', title: 'Ristrutturazione', icon: Hammer },
  { id: 'composition', title: 'Composizione', icon: Ruler },
  { id: 'condition', title: 'Condizioni', icon: Shield },
  { id: 'age', title: 'Età Immobile', icon: Calendar },
];

const PropertyForm: React.FC<PropertyFormProps> = ({ address, onSubmit, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [details, setDetails] = useState<PropertyDetails>({
    type: 'apartment',
    role: 'owner',
    sqm: 80,
    rooms: 3,
    bathrooms: 1,
    floor: 1,
    features: [],
    parkingSpaces: { indoor: 0, outdoor: 0 },
    yearBuilt: 1990,
    isRenovated: false,
    condition: 'good'
  });

  const updateDetail = <K extends keyof PropertyDetails>(key: K, value: PropertyDetails[K]) => {
    setDetails(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onSubmit(details);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    } else {
      onBack();
    }
  };

  const toggleFeature = (feature: string) => {
    setDetails(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Type
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Che tipo di immobile vuoi valutare?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => updateDetail('type', 'house')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${details.type === 'house'
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
              >
                <Home className="w-12 h-12" />
                <span className="text-lg font-bold">Casa Indipendente</span>
              </button>
              <button
                onClick={() => updateDetail('type', 'apartment')}
                className={`p-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-4 ${details.type === 'apartment'
                    ? 'border-blue-500 bg-blue-500/10 text-white'
                    : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
              >
                <Building2 className="w-12 h-12" />
                <span className="text-lg font-bold">Appartamento</span>
              </button>
            </div>

            {details.type === 'house' && (
              <div className="space-y-3 animate-fade-in-up">
                <label className="text-sm text-gray-400 font-medium">Sottotipo</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Villa', 'Villetta a Schiera', 'Rustico', 'Bifamiliare'].map(sub => (
                    <button
                      key={sub}
                      onClick={() => updateDetail('subType', sub)}
                      className={`p-3 rounded-xl border text-sm transition-all ${details.subType === sub
                          ? 'border-blue-500 bg-blue-500/20 text-white'
                          : 'border-white/10 bg-white/5 text-gray-400'
                        }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {details.type === 'apartment' && (
              <div className="space-y-3 animate-fade-in-up">
                <label className="text-sm text-gray-400 font-medium">Sottotipo</label>
                <div className="grid grid-cols-2 gap-3">
                  {['Standard', 'Attico', 'Loft', 'Piano Terra', 'Mansarda'].map(sub => (
                    <button
                      key={sub}
                      onClick={() => updateDetail('subType', sub)}
                      className={`p-3 rounded-xl border text-sm transition-all ${details.subType === sub
                          ? 'border-blue-500 bg-blue-500/20 text-white'
                          : 'border-white/10 bg-white/5 text-gray-400'
                        }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 1: // Role
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Qual è il tuo ruolo?</h3>
            <div className="space-y-3">
              {[
                { id: 'owner', label: 'Sono il proprietario' },
                { id: 'buyer', label: 'Sto cercando di acquistare' },
                { id: 'tenant', label: 'Sono l\'inquilino' },
                { id: 'agent', label: 'Sono un agente immobiliare' },
                { id: 'other', label: 'Altro' }
              ].map((role) => (
                <button
                  key={role.id}
                  onClick={() => updateDetail('role', role.id as any)}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between transition-all ${details.role === role.id
                      ? 'border-blue-500 bg-blue-500/10 text-white'
                      : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                >
                  <span className="font-medium">{role.label}</span>
                  {details.role === role.id && <Check className="w-5 h-5 text-blue-500" />}
                </button>
              ))}
            </div>
          </div>
        );

      case 2: // Features
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Caratteristiche Principali</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'balcony', label: 'Balcone / Terrazzo', icon: Waves },
                { id: 'garden', label: 'Giardino', icon: Trees },
                { id: 'elevator', label: 'Ascensore', icon: Layers },
                { id: 'pool', label: 'Piscina', icon: Waves },
                { id: 'view', label: 'Vista Panoramica', icon: Mountain },
                { id: 'garage', label: 'Garage / Box', icon: Car },
                { id: 'ac', label: 'Aria Condizionata', icon: Zap },
                { id: 'alarm', label: 'Allarme', icon: Shield },
              ].map((feature) => {
                const Icon = feature.icon;
                const isSelected = details.features.includes(feature.id);
                return (
                  <button
                    key={feature.id}
                    onClick={() => toggleFeature(feature.id)}
                    className={`p-4 rounded-xl border text-left flex items-center gap-3 transition-all ${isSelected
                        ? 'border-blue-500 bg-blue-500/10 text-white'
                        : 'border-white/10 bg-white/5 text-gray-400 hover:bg-white/10'
                      }`}
                  >
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-500 text-white' : 'bg-white/10 text-gray-400'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-medium text-sm">{feature.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3: // Renovation
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Stato Ristrutturazione</h3>
            <div className="space-y-6">
              <div>
                <label className="text-lg text-gray-300 mb-4 block">L'immobile è stato ristrutturato recentemente?</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => updateDetail('isRenovated', true)}
                    className={`p-4 rounded-xl border text-center font-bold transition-all ${details.isRenovated
                        ? 'border-blue-500 bg-blue-500/10 text-white'
                        : 'border-white/10 bg-white/5 text-gray-400'
                      }`}
                  >
                    Sì
                  </button>
                  <button
                    onClick={() => {
                      updateDetail('isRenovated', false);
                      updateDetail('renovationYear', undefined);
                    }}
                    className={`p-4 rounded-xl border text-center font-bold transition-all ${!details.isRenovated
                        ? 'border-blue-500 bg-blue-500/10 text-white'
                        : 'border-white/10 bg-white/5 text-gray-400'
                      }`}
                  >
                    No
                  </button>
                </div>
              </div>

              {details.isRenovated && (
                <div className="animate-fade-in-up space-y-2">
                  <label className="text-sm text-gray-400 font-medium">Anno Ristrutturazione</label>
                  <input
                    type="number"
                    placeholder="Es. 2015"
                    value={details.renovationYear || ''}
                    onChange={(e) => updateDetail('renovationYear', Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 4: // Composition
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Composizione Immobile</h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Superficie (mq)</label>
                <input
                  type="number"
                  value={details.sqm}
                  onChange={(e) => updateDetail('sqm', Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 font-medium">Piano</label>
                <input
                  type="number"
                  value={details.floor}
                  onChange={(e) => updateDetail('floor', Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-gray-300">Locali</span>
                <div className="flex items-center gap-4">
                  <button onClick={() => updateDetail('rooms', Math.max(1, details.rooms - 1))} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">-</button>
                  <span className="font-bold w-6 text-center">{details.rooms}</span>
                  <button onClick={() => updateDetail('rooms', details.rooms + 1)} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-gray-300">Bagni</span>
                <div className="flex items-center gap-4">
                  <button onClick={() => updateDetail('bathrooms', Math.max(1, details.bathrooms - 1))} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">-</button>
                  <span className="font-bold w-6 text-center">{details.bathrooms}</span>
                  <button onClick={() => updateDetail('bathrooms', details.bathrooms + 1)} className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center">+</button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-gray-300">Posti Auto</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateDetail('parkingSpaces', { ...details.parkingSpaces, indoor: Math.max(0, details.parkingSpaces.indoor - 1) })}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
                  >-</button>
                  <span className="font-bold w-6 text-center">{details.parkingSpaces.indoor}</span>
                  <button
                    onClick={() => updateDetail('parkingSpaces', { ...details.parkingSpaces, indoor: details.parkingSpaces.indoor + 1 })}
                    className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center"
                  >+</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 5: // Condition
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Condizioni Generali</h3>
            <div className="space-y-3">
              {[
                { id: 'excellent', label: 'Eccellente', desc: 'Nuovo o appena ristrutturato con finiture di pregio.' },
                { id: 'good', label: 'Buono', desc: 'Abitabile subito, non richiede interventi urgenti.' },
                { id: 'livable', label: 'Abitabile', desc: 'Datato ma funzionale, richiede ammodernamento.' },
                { id: 'poor', label: 'Da Ristrutturare', desc: 'Richiede interventi significativi agli impianti/struttura.' },
                { id: 'ruin', label: 'Da Ristrutturare Completamente', desc: 'Immobile fatiscente o al grezzo.' }
              ].map((cond) => (
                <button
                  key={cond.id}
                  onClick={() => updateDetail('condition', cond.id as any)}
                  className={`w-full p-4 rounded-xl border text-left transition-all hover:bg-white/5 ${details.condition === cond.id
                      ? 'border-purple-500 bg-purple-500/10'
                      : 'border-white/10 bg-white/5'
                    }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className={`font-bold ${details.condition === cond.id ? 'text-purple-400' : 'text-white'}`}>{cond.label}</span>
                    {details.condition === cond.id && <Check className="w-5 h-5 text-purple-500" />}
                  </div>
                  <p className="text-sm text-gray-400">{cond.desc}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 6: // Age
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Età dell'Immobile</h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                <span className="text-gray-300">Non conosco l'anno esatto</span>
                <div
                  onClick={() => updateDetail('yearBuiltUnknown', !details.yearBuiltUnknown)}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${details.yearBuiltUnknown ? 'bg-blue-500' : 'bg-gray-600'}`}
                >
                  <div className={`w-4 h-4 bg-white rounded-full transition-transform ${details.yearBuiltUnknown ? 'translate-x-6' : 'translate-x-0'}`} />
                </div>
              </div>

              {!details.yearBuiltUnknown && (
                <div className="space-y-2 animate-fade-in-up">
                  <label className="text-sm text-gray-400 font-medium">Anno di Costruzione</label>
                  <input
                    type="number"
                    value={details.yearBuilt}
                    onChange={(e) => updateDetail('yearBuilt', Number(e.target.value))}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
                  />
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 bg-slate-900 relative">
      <div className="w-full max-w-2xl glass-panel rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

        {/* Header & Progress */}
        <div className="p-6 border-b border-white/10 bg-[#0f111a]">
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevStep} className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-400" />
            </button>
            <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
              <span className="text-blue-400">Step {currentStep + 1}</span>
              <span>di {STEPS.length}</span>
            </div>
            <div className="w-9" /> {/* Spacer for centering */}
          </div>

          <div className="relative h-1 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-blue-500"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-[#0f111a]/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-[#0f111a] flex justify-end">
          <button
            onClick={nextStep}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            {currentStep === STEPS.length - 1 ? 'Genera Report' : 'Continua'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default PropertyForm;
