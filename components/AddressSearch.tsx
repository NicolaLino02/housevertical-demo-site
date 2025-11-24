import React, { useState, useEffect } from 'react';
import { Search, MapPin, Loader2 } from 'lucide-react';
import { AddressResult } from '../types';

interface AddressSearchProps {
  onSelect: (address: AddressResult) => void;
  onBack: () => void;
}

const AddressSearch: React.FC<AddressSearchProps> = ({ onSelect, onBack }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<AddressResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.length < 3) {
      setResults([]);
      return;
    }

    const searchAddress = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            debouncedQuery
          )}&addressdetails=1&limit=5&countrycodes=it`
        );
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error("Failed to fetch address", error);
      } finally {
        setLoading(false);
      }
    };

    searchAddress();
  }, [debouncedQuery]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[100px]"></div>
      </div>

      <div className="w-full max-w-2xl animate-fade-in-up">
        <button onClick={onBack} className="text-gray-400 hover:text-white mb-8 text-sm">
          ← Torna alla Home
        </button>

        <h2 className="text-4xl font-bold mb-2">Dov'è l'immobile?</h2>
        <p className="text-gray-400 mb-8">Inserisci l'indirizzo completo per avviare l'analisi verticale.</p>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-gray-500" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-5 bg-white/5 border border-white/10 rounded-2xl text-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all shadow-2xl"
            placeholder="es. Via Roma 1, Milano"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          {loading && (
            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
              <Loader2 className="h-6 w-6 text-blue-500 animate-spin" />
            </div>
          )}
        </div>

        {results.length > 0 && (
          <div className="mt-4 bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md shadow-2xl">
            {results.map((result, index) => (
              <button
                key={index}
                className="w-full text-left px-6 py-4 hover:bg-white/10 transition-colors flex items-start border-b border-white/5 last:border-0"
                onClick={() => onSelect(result)}
              >
                <MapPin className="h-5 w-5 text-blue-400 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-medium text-white">{result.address.road || result.display_name.split(',')[0]} {result.address.house_number}</div>
                  <div className="text-sm text-gray-400 truncate w-full max-w-md">{result.display_name}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AddressSearch;