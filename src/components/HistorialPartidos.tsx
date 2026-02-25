import { useState } from 'react';
import { Trophy, TrendUp, Crosshair, Medal, ArrowLeft } from '@phosphor-icons/react';

interface HistorialProps {
  onNavigate?: (screen: string) => void;
}

export function HistorialPartidos({ onNavigate }: HistorialProps) {
  const [vistaActual, setVistaActual] = useState<'historial' | 'estadisticas'>('historial');

  const partidos = [
    { id: 1, deporte: '5v5 Soccer', fecha: 'Jan 28, 2026', resultado: 'Victory', equipo: 'Los Andes FC', rival: 'Rosario United', ubicacion: 'UniAndes Courts' },
    { id: 2, deporte: 'Basketball', fecha: 'Jan 25, 2026', resultado: 'Defeat', equipo: 'Warriors', rival: 'Javeriana', ubicacion: 'UniAndes Gym' },
    { id: 3, deporte: 'Tennis', fecha: 'Jan 22, 2026', resultado: 'Victory', equipo: 'Singles', rival: 'Laura M.', ubicacion: 'El Nogal Club' },
    { id: 4, deporte: '5v5 Soccer', fecha: 'Jan 20, 2026', resultado: 'Draw', equipo: 'Los Andes FC', rival: 'Nacional', ubicacion: 'Sports Complex' },
    { id: 5, deporte: 'Volleyball', fecha: 'Jan 18, 2026', resultado: 'Victory', equipo: 'UniAndes Volley', rival: 'Sabana', ubicacion: 'UniAndes Courts' },
  ];

  const estadisticas = [
    { deporte: 'Soccer', jugados: 12, victorias: 7, derrotas: 3, empates: 2 },
    { deporte: 'Basketball', jugados: 8, victorias: 5, derrotas: 3, empates: 0 },
    { deporte: 'Tennis', jugados: 15, victorias: 10, derrotas: 5, empates: 0 },
    { deporte: 'Volleyball', jugados: 6, victorias: 4, derrotas: 2, empates: 0 },
  ];

  const getResultadoStyle = (resultado: string) => {
    switch (resultado) {
      case 'Victory': return 'bg-tertiary text-white';
      case 'Defeat': return 'bg-red-100 text-red-600';
      case 'Draw': return 'bg-gray-200 text-gray-600';
      default: return 'bg-muted text-foreground';
    }
  };

  return (
    <div className="pb-4 space-y-5">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white px-5 pt-5 pb-8 rounded-b-3xl">
        {onNavigate && (
          <button onClick={() => onNavigate('home')} className="flex items-center gap-1.5 text-white/70 mb-3 hover:text-white transition-colors">
            <ArrowLeft size={18} weight="bold" />
            <span className="text-xs font-semibold">Back</span>
          </button>
        )}
        <p className="text-sm font-medium text-white/70">Your records 📊</p>
        <h1 className="text-2xl font-black font-heading uppercase tracking-tight">History</h1>
        <p className="text-sm text-white/80 mt-1">Matches and statistics</p>
      </div>

      {/* View Toggle */}
      <div className="px-5">
        <div className="flex gap-2 bg-muted rounded-xl p-1">
          <button
            onClick={() => setVistaActual('historial')}
            className={`flex-1 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${vistaActual === 'historial' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground'
              }`}
          >
            History
          </button>
          <button
            onClick={() => setVistaActual('estadisticas')}
            className={`flex-1 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${vistaActual === 'estadisticas' ? 'bg-primary text-white shadow-sm' : 'text-muted-foreground'
              }`}
          >
            Statistics
          </button>
        </div>
      </div>

      {/* History View */}
      {vistaActual === 'historial' && (
        <div className="px-5 space-y-3">
          {partidos.map(partido => (
            <div key={partido.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${getResultadoStyle(partido.resultado)}`}>
                    {partido.resultado}
                  </span>
                  <h3 className="text-sm font-bold font-heading text-foreground mt-2">{partido.deporte}</h3>
                  <p className="text-[11px] text-muted-foreground">{partido.fecha}</p>
                </div>
              </div>
              <div className="space-y-1 text-xs mt-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Team</span>
                  <span className="font-bold text-foreground">{partido.equipo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Opponent</span>
                  <span className="font-medium text-foreground">{partido.rival}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="text-muted-foreground">{partido.ubicacion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Statistics View */}
      {vistaActual === 'estadisticas' && (
        <div className="px-5 space-y-4">
          {/* Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <div className="w-10 h-10 bg-secondary text-primary rounded-xl flex items-center justify-center mx-auto mb-2">
                <Trophy size={22} weight="fill" />
              </div>
              <p className="text-2xl font-bold font-data text-primary">41</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Total matches</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-center">
              <div className="w-10 h-10 bg-secondary text-primary rounded-xl flex items-center justify-center mx-auto mb-2">
                <Medal size={22} weight="fill" />
              </div>
              <p className="text-2xl font-bold font-data text-primary">63%</p>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Win Rate</p>
            </div>
          </div>

          {/* By Sport */}
          <h3 className="text-sm font-bold font-heading uppercase tracking-tight">By Sport</h3>
          <div className="space-y-3">
            {estadisticas.map(est => {
              const winRate = Math.round((est.victorias / est.jugados) * 100);
              return (
                <div key={est.deporte} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold font-heading text-foreground">{est.deporte}</h4>
                    <span className="text-xs text-muted-foreground">{est.jugados} matches</span>
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">Win Rate</span>
                      <span className="font-bold font-data text-primary">{winRate}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-tertiary rounded-full transition-all duration-1000" style={{ width: `${winRate}%` }} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-secondary/40 rounded-xl p-2">
                      <p className="text-lg font-bold font-data text-primary">{est.victorias}</p>
                      <p className="text-[10px] text-muted-foreground">Wins</p>
                    </div>
                    <div className="bg-red-50 rounded-xl p-2">
                      <p className="text-lg font-bold font-data text-red-500">{est.derrotas}</p>
                      <p className="text-[10px] text-muted-foreground">Losses</p>
                    </div>
                    <div className="bg-muted rounded-xl p-2">
                      <p className="text-lg font-bold font-data text-muted-foreground">{est.empates}</p>
                      <p className="text-[10px] text-muted-foreground">Draws</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Monthly Trend */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold font-heading uppercase mb-3 flex items-center gap-2">
              <TrendUp size={16} weight="bold" className="text-tertiary" />
              Monthly Trend
            </h3>
            <div className="flex items-end justify-between h-28 gap-2 mb-2">
              {[65, 80, 55, 90].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-tertiary/80 rounded-lg" style={{ height: `${height}%` }} />
                  <span className="text-[10px] text-muted-foreground">Wk {i + 1}</span>
                </div>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground text-center border-t border-gray-100 pt-2">Weekly activity for the last month</p>
          </div>

          {/* Personal Records */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold font-heading uppercase mb-3 flex items-center gap-2">
              <Crosshair size={16} weight="bold" className="text-tertiary" />
              Personal Records
            </h3>
            <div className="space-y-2">
              {[
                { label: 'Win streak', value: '5 matches' },
                { label: 'Matches in a month', value: '12 matches' },
                { label: 'Most played sport', value: 'Tennis' },
              ].map(rec => (
                <div key={rec.label} className="flex items-center justify-between p-2.5 bg-muted rounded-xl">
                  <span className="text-xs text-muted-foreground">{rec.label}</span>
                  <span className="text-sm font-bold font-data text-primary">{rec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
