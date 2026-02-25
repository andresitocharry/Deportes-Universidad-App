import { useState, useEffect } from 'react';
import { UsersThree, ChatCircle, Lock, Hash, CaretRight, X } from '@phosphor-icons/react';

interface ComunidadesProps {
  onNavigate?: (screen: string) => void;
  fabTrigger?: number;
}

export function Comunidades({ onNavigate, fabTrigger }: ComunidadesProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedComunidad, setSelectedComunidad] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    if (fabTrigger && fabTrigger > 0) setShowModal(true);
  }, [fabTrigger]);

  const comunidades = [
    { id: 1, nombre: 'UniAndes Football Club', tipo: 'Clan', deporte: 'Soccer', miembros: 48, descripcion: 'Official soccer clan. Weekly training sessions.', canales: 3 },
    { id: 2, nombre: 'UniAndes Racquets', tipo: 'Community', deporte: 'Tennis', miembros: 32, descripcion: 'Tennis community for all skill levels.', canales: 2 },
    { id: 3, nombre: 'Basketball Warriors', tipo: 'Clan', deporte: 'Basketball', miembros: 24, descripcion: 'Competitive basketball clan 3x3 and 5x5.', canales: 3 },
    { id: 4, nombre: 'Running UniAndes', tipo: 'Community', deporte: 'Running', miembros: 67, descripcion: 'Runners group for all levels.', canales: 2 },
  ];

  const canales = [
    { id: 1, nombre: 'general', tipo: 'publico', mensajes: 245 },
    { id: 2, nombre: 'matches', tipo: 'publico', mensajes: 128 },
    { id: 3, nombre: 'strategy', tipo: 'privado', mensajes: 67 },
  ];

  const filtered = filter === 'all' ? comunidades : comunidades.filter(c => c.tipo === filter);

  return (
    <div className="pb-4 space-y-5">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white px-5 pt-6 pb-8 rounded-b-3xl">
        <div className="flex items-center justify-between mb-1">
          <div>
            <p className="text-sm font-medium text-white/70">Find your team 🤝</p>
            <h1 className="text-2xl font-black font-heading uppercase tracking-tight">Social</h1>
          </div>
        </div>
        <p className="text-sm text-white/80">Join sports groups and communities</p>
      </div>

      {/* Filter Pills */}
      <div className="px-5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['all', 'Community', 'Clan'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${filter === f
                ? 'bg-primary text-white'
                : 'bg-secondary/60 text-primary border border-secondary hover:bg-secondary'
                }`}
            >
              {f === 'all' ? 'All' : f === 'Clan' ? 'Clans' : 'Communities'}
            </button>
          ))}
        </div>
      </div>

      {/* Community Cards */}
      <div className="px-5 space-y-3">
        {filtered.map(com => (
          <button
            key={com.id}
            onClick={() => setSelectedComunidad(com.id)}
            className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-left active:scale-[0.98] transition-all"
          >
            <div className="flex items-start gap-3 mb-2">
              <div className="w-12 h-12 bg-secondary text-primary rounded-xl flex items-center justify-center flex-shrink-0 text-lg font-bold font-heading">
                {com.nombre.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-bold font-heading text-foreground truncate leading-tight mb-1">{com.nombre}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2 py-0.5 bg-secondary text-primary rounded-full font-semibold">{com.tipo.toUpperCase()}</span>
                  <span className="text-[11px] text-muted-foreground">{com.deporte}</span>
                </div>
              </div>
              <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 flex-shrink-0 mt-1">
                <CaretRight size={14} weight="bold" />
              </div>
            </div>

            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{com.descripcion}</p>

            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <UsersThree size={14} weight="duotone" className="text-tertiary" />
                <span>{com.miembros} members</span>
              </div>
              <div className="flex items-center gap-1">
                <ChatCircle size={14} weight="duotone" className="text-tertiary" />
                <span>{com.canales} channels</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Create Community Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-5 z-[100]">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-heading uppercase">New Community</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={18} weight="bold" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Name</label>
                <input type="text" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" placeholder="Community name" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Type</label>
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary">
                  <option>Community (open)</option>
                  <option>Clan (closed)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Sport</label>
                <input type="text" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" placeholder="e.g. Soccer" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Description</label>
                <textarea className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm h-20 resize-none focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" placeholder="Describe your community..." />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-muted-foreground hover:bg-gray-50">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90">Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Community Detail Modal */}
      {selectedComunidad && (() => {
        const com = comunidades.find(c => c.id === selectedComunidad);
        if (!com) return null;
        return (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-5 z-[100]">
            <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold font-heading uppercase leading-tight">{com.nombre}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{com.descripcion}</p>
                </div>
                <button onClick={() => setSelectedComunidad(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <X size={18} weight="bold" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { label: 'Type', value: com.tipo },
                  { label: 'Sport', value: com.deporte },
                  { label: 'Members', value: String(com.miembros) },
                  { label: 'Channels', value: String(com.canales) },
                ].map(stat => (
                  <div key={stat.label} className="bg-muted rounded-xl p-3">
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{stat.label}</p>
                    <p className="text-sm font-bold font-data text-primary">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Channels */}
              <div className="mb-4">
                <h4 className="text-sm font-bold font-heading uppercase mb-2">Channels</h4>
                <div className="space-y-2">
                  {canales.map(canal => (
                    <div key={canal.id} className="flex items-center justify-between p-2.5 bg-muted rounded-xl">
                      <div className="flex items-center gap-2">
                        {canal.tipo === 'privado'
                          ? <Lock size={14} weight="duotone" className="text-muted-foreground" />
                          : <Hash size={14} weight="bold" className="text-tertiary" />
                        }
                        <span className="text-sm font-medium">{canal.nombre}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{canal.mensajes} msgs</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Members */}
              <div className="mb-5">
                <h4 className="text-sm font-bold font-heading uppercase mb-2">Members</h4>
                <div className="space-y-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-2.5 p-2 bg-muted rounded-xl">
                      <div className="w-8 h-8 bg-secondary text-primary rounded-lg flex items-center justify-center text-xs font-bold">
                        S{i}
                      </div>
                      <span className="text-sm font-medium">Student {i}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={() => setSelectedComunidad(null)} className="w-full px-4 py-3 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90 transition-colors">
                Join Community
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
