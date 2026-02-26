import { useState, useEffect } from 'react';
import {
  Trophy, Users, Timer, CaretRight, X, Target, Medal,
  SoccerBall, PersonSimpleRun, Barbell, TennisBall, Basketball,
  Lightning, Fire
} from '@phosphor-icons/react';

interface RetosProps {
  onNavigate?: (screen: string) => void;
  fabTrigger?: number;
}

export function RetosComunidad({ onNavigate, fabTrigger }: RetosProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedReto, setSelectedReto] = useState<number | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sportFilter, setSportFilter] = useState<string>('all');

  useEffect(() => {
    if (fabTrigger && fabTrigger > 0) setShowModal(true);
  }, [fabTrigger]);

  const retos = [
    { id: 1, nombre: '100K Running Challenge', tipo: 'Individual', deporte: 'Running', dificultad: 'Advanced', objetivo: '100 km', diasRestantes: 15, participantes: 45, progreso: 35 },
    { id: 2, nombre: 'UniAndes Soccer Cup', tipo: 'Team', deporte: 'Soccer', dificultad: 'Intermediate', objetivo: 'Win tournament', diasRestantes: 25, participantes: 8, progreso: 20 },
    { id: 3, nombre: '30-Day Push-ups', tipo: 'Individual', deporte: 'Calisthenics', dificultad: 'Beginner', objetivo: '1000 reps', diasRestantes: 22, participantes: 67, progreso: 42 },
    { id: 4, nombre: 'Tennis Marathon', tipo: 'Individual', deporte: 'Tennis', dificultad: 'Intermediate', objetivo: '20 sets', diasRestantes: 18, participantes: 23, progreso: 25 },
    { id: 5, nombre: '5K Speed Challenge', tipo: 'Individual', deporte: 'Running', dificultad: 'Beginner', objetivo: 'Under 25 min', diasRestantes: 10, participantes: 34, progreso: 60 },
    { id: 6, nombre: 'Dunk Contest', tipo: 'Individual', deporte: 'Basketball', dificultad: 'Advanced', objetivo: '10 dunks', diasRestantes: 30, participantes: 12, progreso: 10 },
  ];

  const sportIcons: Record<string, any> = {
    Soccer: SoccerBall, Running: PersonSimpleRun, Calisthenics: Barbell, Tennis: TennisBall, Basketball: Basketball,
  };

  const difficultyColors: Record<string, string> = {
    Beginner: 'bg-emerald-50 text-emerald-700',
    Intermediate: 'bg-amber-50 text-amber-700',
    Advanced: 'bg-red-50 text-red-600',
  };

  let filtered = retos;
  if (typeFilter !== 'all') filtered = filtered.filter(r => r.tipo === typeFilter);
  if (sportFilter !== 'all') filtered = filtered.filter(r => r.deporte === sportFilter);

  return (
    <div className="pb-4 space-y-5 pt-2">

      {/* Type Filter Pills */}
      <div className="px-5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['all', 'Individual', 'Team'].map(f => (
            <button
              key={f}
              onClick={() => setTypeFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${typeFilter === f
                ? 'bg-primary dark:bg-primary text-white'
                : 'bg-secondary/60 dark:bg-gray-800 text-primary dark:text-gray-200 border border-secondary dark:border-gray-700 hover:bg-secondary dark:hover:bg-gray-700'
                }`}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Sport Filter Pills */}
      <div className="px-5 -mt-2">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['all', 'Soccer', 'Running', 'Calisthenics', 'Tennis', 'Basketball'].map(f => {
            const Icon = f !== 'all' ? sportIcons[f] : Lightning;
            return (
              <button
                key={f}
                onClick={() => setSportFilter(f)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors ${sportFilter === f
                  ? 'bg-tertiary text-white'
                  : 'bg-gray-50 dark:bg-gray-800 text-muted-foreground dark:text-gray-400 border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                <Icon size={13} weight={sportFilter === f ? 'fill' : 'duotone'} />
                {f === 'all' ? 'All Sports' : f}
              </button>
            );
          })}
        </div>
      </div>

      {/* Challenge Cards */}
      <div className="px-5 space-y-3">
        {filtered.map(reto => {
          const SportIcon = sportIcons[reto.deporte] || Trophy;
          return (
            <button
              key={reto.id}
              onClick={() => setSelectedReto(reto.id)}
              className="w-full bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-left active:scale-[0.98] transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 bg-secondary dark:bg-gray-700 text-primary dark:text-tertiary rounded-xl flex items-center justify-center flex-shrink-0">
                    <SportIcon size={20} weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-heading text-foreground dark:text-white leading-tight mb-1">{reto.nombre}</h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[11px] px-2 py-0.5 bg-secondary dark:bg-gray-700 text-primary dark:text-tertiary rounded-full font-semibold">{reto.tipo}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${reto.dificultad === 'Beginner' ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : reto.dificultad === 'Intermediate' ? 'bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400'}`}>
                        {reto.dificultad}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-2xl font-data text-primary dark:text-tertiary">{reto.progreso}%</div>
              </div>

              {/* Info Row */}
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="flex items-center gap-1.5">
                  <Target size={14} weight="duotone" className="text-tertiary dark:text-tertiary/90" />
                  <span className="text-[11px] text-muted-foreground dark:text-gray-400">{reto.objetivo}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Timer size={14} weight="duotone" className="text-tertiary dark:text-tertiary/90" />
                  <span className="text-[11px] text-muted-foreground dark:text-gray-400">{reto.diasRestantes}d left</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={14} weight="duotone" className="text-tertiary dark:text-tertiary/90" />
                  <span className="text-[11px] text-muted-foreground dark:text-gray-400">{reto.participantes}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-tertiary rounded-full transition-all duration-1000" style={{ width: `${reto.progreso}%` }} />
              </div>
            </button>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-8 bg-muted rounded-2xl">
            <p className="text-sm text-muted-foreground">No challenges found for this filter</p>
          </div>
        )}
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
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Type</label>
                  <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary">
                    <option>Individual</option>
                    <option>Team</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Difficulty</label>
                  <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option>Advanced</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Sport</label>
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary">
                  <option>Soccer</option>
                  <option>Running</option>
                  <option>Calisthenics</option>
                  <option>Tennis</option>
                  <option>Basketball</option>
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
        const SportIcon = sportIcons[reto.deporte] || Trophy;
        return (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-5 z-[100]">
            <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-heading uppercase leading-tight">{reto.nombre}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 bg-secondary text-primary rounded-full font-semibold">{reto.tipo}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${difficultyColors[reto.dificultad]}`}>
                      {reto.dificultad}
                    </span>
                  </div>
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

              {/* Leaderboard with highlighted current user */}
              <div className="mb-5">
                <h4 className="text-sm font-bold font-heading uppercase mb-2 flex items-center gap-1.5">
                  <Fire size={14} weight="fill" className="text-amber-400" />
                  Leaderboard
                </h4>
                <div className="space-y-2">
                  {[
                    { pos: 1, name: 'David Elías', value: '78 km' },
                    { pos: 2, name: 'Ana Rodriguez', value: '65 km' },
                    { pos: 3, name: 'You', value: '52 km', isUser: true },
                    { pos: 4, name: 'Carlos Mendez', value: '45 km' },
                    { pos: 5, name: 'Student E', value: '38 km' },
                  ].map(entry => (
                    <div
                      key={entry.pos}
                      className={`flex items-center justify-between p-2.5 rounded-xl ${entry.isUser ? 'bg-tertiary/10 border border-tertiary/30' : 'bg-muted'}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${entry.pos === 1 ? 'bg-amber-100 text-amber-700' : entry.pos === 2 ? 'bg-gray-200 text-gray-600' : entry.pos === 3 ? 'bg-orange-100 text-orange-700' : 'bg-secondary text-primary'}`}>
                          {entry.pos}
                        </div>
                        <span className={`text-sm font-medium ${entry.isUser ? 'font-bold text-tertiary' : ''}`}>
                          {entry.name} {entry.isUser && '⭐'}
                        </span>
                      </div>
                      <span className="text-sm font-bold font-data text-primary">{entry.value}</span>
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