import { useState, useEffect } from 'react';
import { MagnifyingGlass, MapPin, NavigationArrow, FunnelSimple, X, CaretRight } from '@phosphor-icons/react';

interface MapaProps {
  onNavigate?: (screen: string) => void;
  fabTrigger?: number;
}

export function MapaUbicaciones({ onNavigate, fabTrigger }: MapaProps) {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (fabTrigger && fabTrigger > 0) setShowFilters(true);
  }, [fabTrigger]);

  const locations = [
    { id: 1, nombre: 'UniAndes Courts', tipo: 'Court', deporte: 'Soccer', distancia: '0.2 km', top: '30%', left: '45%' },
    { id: 2, nombre: 'Main Gym', tipo: 'Gym', deporte: 'Various', distancia: '0.3 km', top: '35%', left: '55%' },
    { id: 3, nombre: 'North Sports Complex', tipo: 'Court', deporte: 'Basketball', distancia: '1.5 km', top: '55%', left: '60%' },
    { id: 4, nombre: 'El Nogal Club', tipo: 'Club', deporte: 'Tennis', distancia: '2.8 km', top: '70%', left: '30%' },
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Search Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 px-5 pt-5 pb-4 rounded-b-3xl">
        <h1 className="text-lg font-black font-heading uppercase tracking-tight text-white mb-3">Sports Map</h1>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2.5">
            <MagnifyingGlass size={18} className="text-white/60" />
            <input
              type="text"
              placeholder="Search location..."
              className="flex-1 text-sm bg-transparent outline-none text-white placeholder:text-white/50"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-10 h-10 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/25 transition-colors"
          >
            <FunnelSimple size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-gradient-to-b from-secondary/30 to-muted overflow-hidden min-h-[250px]">
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full" style={{
            backgroundImage: 'linear-gradient(rgba(1,37,103,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(1,37,103,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }} />
        </div>

        {/* Simulated road lines */}
        <div className="absolute top-1/3 left-0 right-0 h-[3px] bg-tertiary/20 rounded-full" />
        <div className="absolute top-2/3 left-0 right-0 h-[3px] bg-tertiary/20 rounded-full" />
        <div className="absolute left-1/3 top-0 bottom-0 w-[3px] bg-tertiary/20 rounded-full" />
        <div className="absolute left-2/3 top-0 bottom-0 w-[3px] bg-tertiary/20 rounded-full" />

        {/* Map Markers */}
        {locations.map(loc => (
          <button
            key={loc.id}
            onClick={() => setSelectedLocation(loc.id)}
            className={`absolute w-9 h-9 rounded-full flex items-center justify-center shadow-lg active:scale-110 transition-all ${selectedLocation === loc.id
              ? 'bg-primary text-white scale-110'
              : 'bg-white text-tertiary border-2 border-tertiary/30'
              }`}
            style={{ top: loc.top, left: loc.left }}
          >
            <MapPin size={18} weight="fill" />
          </button>
        ))}

        {/* Current Location Button */}
        <button className="absolute bottom-4 right-4 w-11 h-11 bg-white text-primary rounded-full flex items-center justify-center shadow-lg active:bg-gray-50 border border-gray-100">
          <NavigationArrow size={20} weight="fill" />
        </button>

        {/* Map Label Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 shadow-sm">
          <p className="text-[10px] font-bold text-primary uppercase tracking-wide">📍 UniAndes Campus</p>
        </div>
      </div>

      {/* Nearby Locations List */}
      <div className="bg-white border-t border-gray-100 p-4 space-y-2 max-h-44 overflow-y-auto">
        <h3 className="text-xs font-bold font-heading uppercase text-muted-foreground tracking-wide mb-1">Nearby</h3>
        {locations.map(loc => (
          <button
            key={loc.id}
            onClick={() => setSelectedLocation(loc.id)}
            className={`w-full flex items-center gap-3 p-2.5 rounded-xl transition-all active:scale-[0.98] ${selectedLocation === loc.id ? 'bg-secondary/60' : 'bg-muted hover:bg-gray-100'
              }`}
          >
            <div className="w-9 h-9 bg-secondary text-primary rounded-xl flex items-center justify-center flex-shrink-0">
              <MapPin size={18} weight="bold" />
            </div>
            <div className="flex-1 text-left min-w-0">
              <p className="text-xs font-bold text-foreground truncate">{loc.nombre}</p>
              <p className="text-[10px] text-muted-foreground">{loc.tipo} • {loc.deporte}</p>
            </div>
            <span className="text-[10px] font-semibold text-tertiary flex-shrink-0">{loc.distancia}</span>
          </button>
        ))}
      </div>

      {/* Location Detail Bottom Sheet */}
      {selectedLocation && (() => {
        const loc = locations.find(l => l.id === selectedLocation);
        if (!loc) return null;
        return (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end z-[100]" onClick={() => setSelectedLocation(null)}>
            <div className="bg-white rounded-t-3xl w-full max-w-md mx-auto p-5 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-4" />
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-base font-bold font-heading uppercase">{loc.nombre}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{loc.tipo} • {loc.deporte}</p>
                </div>
                <button onClick={() => setSelectedLocation(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <X size={16} weight="bold" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Distance</p>
                  <p className="text-sm font-bold font-data text-primary">{loc.distancia}</p>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Status</p>
                  <p className="text-sm font-bold text-tertiary">Open now</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-foreground hover:bg-gray-50 transition-colors flex items-center justify-center gap-1.5">
                  <NavigationArrow size={16} weight="bold" />
                  Directions
                </button>
                <button className="flex-1 px-4 py-2.5 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90 transition-colors flex items-center justify-center gap-1.5">
                  Details
                  <CaretRight size={14} weight="bold" />
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Filters Modal */}
      {showFilters && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-5 z-[100]">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-heading uppercase">Filters</h3>
              <button onClick={() => setShowFilters(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={18} weight="bold" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Place type</p>
                <div className="flex flex-wrap gap-2">
                  {['Court', 'Gym', 'Club', 'Park'].map(tipo => (
                    <button key={tipo} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary/60 text-primary border border-secondary hover:bg-secondary transition-colors">
                      {tipo}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Sport</p>
                <div className="flex flex-wrap gap-2">
                  {['Soccer', 'Basketball', 'Tennis', 'Various'].map(dep => (
                    <button key={dep} className="px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary/60 text-primary border border-secondary hover:bg-secondary transition-colors">
                      {dep}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={() => setShowFilters(false)} className="w-full mt-5 px-4 py-2.5 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
