import { useState, useEffect } from 'react';
import { Trophy, Users, Timer, CaretRight, X, Target, Medal } from '@phosphor-icons/react';

interface RetosProps {
  onNavigate?: (screen: string) => void;
  fabTrigger?: number;
}

export function RetosComunidad({ onNavigate, fabTrigger }: RetosProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedReto, setSelectedReto] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (fabTrigger && fabTrigger > 0) setShowModal(true);
  }, [fabTrigger]);

  const retos = [
    { id: 1, nombre: '100K Running Challenge', tipo: 'Individual', objetivo: '100 km', diasRestantes: 15, participantes: 45, progreso: 35 },
    { id: 2, nombre: 'UniAndes Soccer Cup', tipo: 'Team', objetivo: 'Win tournament', diasRestantes: 25, participantes: 8, progreso: 20 },
    { id: 3, nombre: '30-Day Push-ups', tipo: 'Individual', objetivo: '1000 reps', diasRestantes: 22, participantes: 67, progreso: 42 },
    { id: 4, nombre: 'Tennis Marathon', tipo: 'Individual', objetivo: '20 sets', diasRestantes: 18, participantes: 23, progreso: 25 },
  ];

  const filtered = filter === 'all' ? retos : retos.filter(r => r.tipo === filter);

  return (
    <div className="pb-4 space-y-5">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white px-5 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-sm font-medium text-white/70">Compete & achieve 🏅</p>
            <h1 className="text-2xl font-black font-heading uppercase tracking-tight">Challenges</h1>
          </div>
        </div>
        <p className="text-sm text-white/80">Join challenges and reach your goals</p>
      </div>

      {/* Filter Pills */}
      <div className="px-5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['all', 'Individual', 'Team'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${filter === f
                ? 'bg-primary text-white'
                : 'bg-secondary/60 text-primary border border-secondary hover:bg-secondary'
                }`}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Challenge Cards */}
      <div className="px-5 space-y-3">
        {filtered.map(reto => (
          <button
            key={reto.id}
            onClick={() => setSelectedReto(reto.id)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-left active:scale-[0.98] transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-sm font-bold font-heading text-foreground leading-tight mb-1">{reto.nombre}</h3>
                <span className="text-[11px] px-2 py-0.5 bg-secondary text-primary rounded-full font-semibold">{reto.tipo}</span>
              </div>
              <div className="text-2xl font-data text-primary">{reto.progreso}%</div>
            </div>

            {/* Info Row */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="flex items-center gap-1.5">
                <Target size={14} weight="duotone" className="text-tertiary" />
                <span className="text-[11px] text-muted-foreground">{reto.objetivo}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Timer size={14} weight="duotone" className="text-tertiary" />
                <span className="text-[11px] text-muted-foreground">{reto.diasRestantes}d left</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users size={14} weight="duotone" className="text-tertiary" />
                <span className="text-[11px] text-muted-foreground">{reto.participantes}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-tertiary rounded-full transition-all duration-1000" style={{ width: `${reto.progreso}%` }} />
            </div>
          </button>
        ))}
      </div>

      {/* Create Challenge Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-5 z-[100]">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-heading uppercase">New Challenge</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={18} weight="bold" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Name</label>
                <input type="text" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" placeholder="Challenge name" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Type</label>
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary">
                  <option>Individual</option>
                  <option>Team</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Goal</label>
                <input type="text" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" placeholder="e.g. 100 km" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Start</label>
                  <input type="date" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">End</label>
                  <input type="date" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" />
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-muted-foreground hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90 transition-colors">
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Challenge Detail Modal */}
      {selectedReto && (() => {
        const reto = retos.find(r => r.id === selectedReto);
        if (!reto) return null;
        return (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-5 z-[100]">
            <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-heading uppercase leading-tight">{reto.nombre}</h3>
                  <span className="text-xs px-2 py-0.5 bg-secondary text-primary rounded-full font-semibold">{reto.tipo}</span>
                </div>
                <button onClick={() => setSelectedReto(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <X size={18} weight="bold" />
                </button>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Goal</p>
                  <p className="text-sm font-bold font-data text-primary">{reto.objetivo}</p>
                </div>
                <div className="bg-muted rounded-xl p-3">
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">Days Left</p>
                  <p className="text-sm font-bold font-data text-primary">{reto.diasRestantes}d</p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-muted-foreground font-medium">Progress</span>
                  <span className="font-bold font-data text-primary text-sm">{reto.progreso}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-tertiary rounded-full" style={{ width: `${reto.progreso}%` }} />
                </div>
              </div>

              {/* Leaderboard */}
              <div className="mb-5">
                <h4 className="text-sm font-bold font-heading uppercase mb-2">Top Participants</h4>
                <div className="space-y-2">
                  {[1, 2, 3].map(pos => (
                    <div key={pos} className="flex items-center justify-between p-2.5 bg-muted rounded-xl">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 bg-secondary text-primary rounded-lg flex items-center justify-center text-xs font-bold">
                          {pos}
                        </div>
                        <span className="text-sm font-medium">Student {pos}</span>
                      </div>
                      <span className="text-sm font-bold font-data text-primary">{78 - (pos - 1) * 13} km</span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setSelectedReto(null)} className="w-full px-4 py-3 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90 transition-colors">
                Join Challenge
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}