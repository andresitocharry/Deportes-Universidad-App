import { useState, useEffect } from 'react';
import {
  UsersThree, ChatCircle, Lock, Hash, CaretRight, X,
  PushPin, MegaphoneSimple, Heart, Clock, Crown, Fire
} from '@phosphor-icons/react';

interface ComunidadesProps {
  onNavigate?: (screen: string) => void;
  fabTrigger?: number;
}

export function Comunidades({ onNavigate, fabTrigger }: ComunidadesProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedComunidad, setSelectedComunidad] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [detailTab, setDetailTab] = useState<'feed' | 'channels' | 'members'>('feed');

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

  const feedPosts = [
    {
      id: 1, author: 'Daniel Torres', role: 'Instructor',
      content: '⚡ Schedule change: tomorrow\'s training session moved to 5 PM at La Caneca. See you there!',
      time: '1h ago', pinned: true, likes: 12,
    },
    {
      id: 2, author: 'Sofia Castañeda', role: 'Organizer',
      content: '🏆 Copa Turing 2026 registrations are OPEN! 16 team slots — register your team before Mar 1.',
      time: '3h ago', pinned: true, likes: 34,
    },
    {
      id: 3, author: 'Julián Martínez', role: 'Member',
      content: 'Great match today! Our team won 4-2 against Team Beta. Thanks for the coordination 🙌',
      time: '6h ago', pinned: false, likes: 8,
    },
    {
      id: 4, author: 'Carlos Mendez', role: 'Coach',
      content: 'Tip: focus on your first touch — it determines the quality of your next action. Practice wall passes for 10 minutes before each session.',
      time: '1d ago', pinned: false, likes: 21,
    },
  ];

  const topAthletes = [
    { pos: 1, name: 'David Elías', matches: 28, winRate: '82%' },
    { pos: 2, name: 'Julián Contreras', matches: 24, winRate: '75%' },
    { pos: 3, name: 'Ana Rodriguez', matches: 22, winRate: '73%' },
  ];

  const filtered = filter === 'all' ? comunidades : comunidades.filter(c => c.tipo === filter);
  const trending = comunidades.slice(0, 2);
  const others = filter === 'all' ? comunidades.slice(2) : filtered;

  return (
    <div className="pb-4 space-y-5 pt-2">

      {/* Filter Pills */}
      <div className="px-5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar">
          {['all', 'Community', 'Clan'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${filter === f
                ? 'bg-primary dark:bg-primary text-white'
                : 'bg-secondary/60 dark:bg-gray-800 text-primary dark:text-gray-200 border border-secondary dark:border-gray-700 hover:bg-secondary dark:hover:bg-gray-700'
                }`}
            >
              {f === 'all' ? 'All' : f === 'Clan' ? 'Clans' : 'Communities'}
            </button>
          ))}
        </div>
      </div>

      {/* Trending Section (only shown when 'all' is selected) */}
      {filter === 'all' && (
        <div className="px-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-black font-heading tracking-tight uppercase dark:text-white flex items-center gap-1.5">
              <Fire size={18} weight="fill" className="text-orange-500" />
              Trending Now
            </h2>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {trending.map(com => (
              <button
                key={com.id}
                onClick={() => { setSelectedComunidad(com.id); setDetailTab('feed'); }}
                className="relative min-w-[240px] flex-shrink-0 bg-gradient-to-br from-primary to-primary/80 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-5 shadow-lg shadow-primary/10 text-left overflow-hidden active:scale-[0.98] transition-all"
              >
                {/* Decorative background element */}
                <div className="absolute -right-4 -bottom-4 text-[100px] font-black font-heading text-white/5 pointer-events-none leading-none">
                  {com.nombre.charAt(0)}
                </div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-8">
                    <span className="text-[10px] px-2 py-1 bg-white/20 text-white rounded-lg font-bold tracking-wider uppercase backdrop-blur-sm">
                      {com.tipo}
                    </span>
                    <div className="flex bg-white/20 rounded-full p-1 backdrop-blur-sm">
                      <CaretRight size={14} weight="bold" className="text-white" />
                    </div>
                  </div>

                  <h3 className="text-lg font-black font-heading text-white leading-tight mb-1">{com.nombre}</h3>
                  <p className="text-xs text-secondary/90 font-medium mb-3">{com.deporte}</p>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded-md">
                      <UsersThree size={12} weight="fill" className="text-white" />
                      <span className="text-[10px] font-bold text-white">{com.miembros}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-black/20 px-2 py-1 rounded-md">
                      <ChatCircle size={12} weight="fill" className="text-white" />
                      <span className="text-[10px] font-bold text-white">{com.canales}</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Community Cards */}
      <div className="px-5 space-y-4 pt-2">
        <h2 className="text-sm font-black font-heading tracking-tight uppercase dark:text-white">
          {filter === 'all' ? 'Discover More' : `Filtered ${filter === 'Clan' ? 'Clans' : 'Communities'}`}
        </h2>
        <div className="space-y-3">
          {others.map(com => (
            <button
              key={com.id}
              onClick={() => { setSelectedComunidad(com.id); setDetailTab('feed'); }}
              className="w-full bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 text-left active:scale-[0.98] transition-all group"
            >
              <div className="flex items-start gap-4 mb-3">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/60 dark:from-gray-700 dark:to-gray-600 text-primary dark:text-tertiary rounded-2xl flex items-center justify-center flex-shrink-0 text-xl font-black font-heading shadow-inner">
                  {com.nombre.charAt(0)}
                </div>
                <div className="flex-1 min-w-0 pt-0.5">
                  <h3 className="text-[15px] font-bold font-heading text-foreground dark:text-white truncate leading-tight mb-1 group-hover:text-tertiary transition-colors">{com.nombre}</h3>
                  <p className="text-xs text-muted-foreground dark:text-gray-400 line-clamp-1">{com.descripcion}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-1 pt-3 border-t border-gray-50 dark:border-gray-700/50">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 bg-secondary/60 dark:bg-gray-700 text-primary dark:text-gray-200 rounded-md font-bold uppercase tracking-wider">{com.tipo}</span>
                  <div className="w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <span className="text-[11px] font-medium text-muted-foreground dark:text-gray-400">{com.deporte}</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground dark:text-gray-400 font-medium">
                  <div className="flex items-center gap-1">
                    <UsersThree size={14} weight="fill" className="text-tertiary dark:text-tertiary/80" />
                    <span>{com.miembros}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ChatCircle size={14} weight="fill" className="text-tertiary dark:text-tertiary/80" />
                    <span>{com.canales}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Create Community Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-5 z-[100]">
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-sm p-5 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold font-heading uppercase dark:text-white">New Community</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center dark:text-white">
                <X size={18} weight="bold" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground dark:text-gray-400 mb-1">Name</label>
                <input type="text" className="w-full border border-gray-200 dark:border-gray-700 bg-transparent dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" placeholder="Community name" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground dark:text-gray-400 mb-1">Type</label>
                <select className="w-full border border-gray-200 dark:border-gray-700 bg-transparent dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary">
                  <option className="dark:bg-gray-900">Community (open)</option>
                  <option className="dark:bg-gray-900">Clan (closed)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground dark:text-gray-400 mb-1">Sport</label>
                <input type="text" className="w-full border border-gray-200 dark:border-gray-700 bg-transparent dark:text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" placeholder="e.g. Soccer" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-muted-foreground dark:text-gray-400 mb-1">Description</label>
                <textarea className="w-full border border-gray-200 dark:border-gray-700 bg-transparent dark:text-white rounded-xl px-3 py-2.5 text-sm h-20 resize-none focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" placeholder="Describe your community..." />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-semibold text-muted-foreground dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800">Cancel</button>
              <button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2.5 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90">Create</button>
            </div>
          </div>
        </div>
      )}

      {/* Community Detail Modal — Redesigned with Tabs */}
      {selectedComunidad && (() => {
        const com = comunidades.find(c => c.id === selectedComunidad);
        if (!com) return null;
        return (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
            <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-sm shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold font-heading uppercase leading-tight dark:text-white">{com.nombre}</h3>
                    <p className="text-xs text-muted-foreground dark:text-gray-400 mt-1">{com.descripcion}</p>
                  </div>
                  <button onClick={() => setSelectedComunidad(null)} className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center dark:text-white">
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
                    <div key={stat.label} className="bg-muted dark:bg-gray-800 rounded-xl p-3">
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground dark:text-gray-400 font-medium">{stat.label}</p>
                      <p className="text-sm font-bold font-data text-primary dark:text-tertiary">{stat.value}</p>
                    </div>
                  ))}
                </div>

                {/* Tab Selector */}
                <div className="flex bg-muted dark:bg-gray-800 rounded-xl p-1 mb-4">
                  {(['feed', 'channels', 'members'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setDetailTab(tab)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${detailTab === tab
                        ? 'bg-white dark:bg-gray-700 text-primary dark:text-white shadow-sm'
                        : 'text-muted-foreground dark:text-gray-500 hover:text-foreground dark:hover:text-gray-300'
                        }`}
                    >
                      {tab === 'feed' ? 'Feed' : tab === 'channels' ? 'Channels' : 'Members'}
                    </button>
                  ))}
                </div>

                {/* Feed Tab — Clan Feed with Pinned Posts (FS-09) */}
                {detailTab === 'feed' && (
                  <div className="space-y-3 animate-fadeIn">
                    {/* New Announcement Button */}
                    <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-700 text-xs font-semibold text-muted-foreground dark:text-gray-400 hover:border-tertiary dark:hover:border-tertiary/80 hover:text-tertiary transition-colors">
                      <MegaphoneSimple size={16} weight="duotone" />
                      New Announcement
                    </button>

                    {feedPosts.map(post => (
                      <div key={post.id} className={`rounded-xl p-3.5 border ${post.pinned ? 'bg-secondary/30 dark:bg-gray-800 border-secondary dark:border-gray-600' : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700'}`}>
                        <div className="flex items-start gap-2.5 mb-2">
                          <div className="w-8 h-8 bg-secondary dark:bg-gray-700 text-primary dark:text-tertiary rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0">
                            {post.author.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-foreground dark:text-white">{post.author}</span>
                              <span className="text-[10px] px-1.5 py-0.5 bg-muted dark:bg-gray-700 text-muted-foreground dark:text-gray-300 rounded font-medium">{post.role}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="text-[10px] text-muted-foreground dark:text-gray-400">{post.time}</span>
                              {post.pinned && (
                                <span className="flex items-center gap-0.5 text-[10px] text-tertiary font-semibold">
                                  <PushPin size={10} weight="fill" />
                                  Pinned
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <p className="text-xs text-foreground dark:text-gray-200 leading-relaxed">{post.content}</p>
                        <div className="flex items-center gap-1.5 mt-2.5">
                          <button className="flex items-center gap-1 text-[11px] text-muted-foreground dark:text-gray-400 hover:text-red-500 transition-colors">
                            <Heart size={13} weight="regular" />
                            <span>{post.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-[11px] text-muted-foreground dark:text-gray-400 hover:text-tertiary transition-colors ml-3">
                            <ChatCircle size={13} weight="regular" />
                            <span>Reply</span>
                          </button>
                        </div>
                      </div>
                    ))}

                    {/* Top Athletes Section */}
                    <div className="mt-2">
                      <h4 className="text-sm font-bold font-heading uppercase mb-2 flex items-center gap-1.5 dark:text-white">
                        <Crown size={14} weight="fill" className="text-amber-400" />
                        Top Athletes
                      </h4>
                      <div className="space-y-2">
                        {topAthletes.map(athlete => (
                          <div key={athlete.pos} className="flex items-center justify-between p-2.5 bg-muted dark:bg-gray-800 rounded-xl">
                            <div className="flex items-center gap-2.5">
                              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${athlete.pos === 1 ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' : athlete.pos === 2 ? 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300' : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'}`}>
                                {athlete.pos}
                              </div>
                              <span className="text-sm font-medium dark:text-white">{athlete.name}</span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-bold font-data text-primary dark:text-tertiary">{athlete.winRate}</span>
                              <p className="text-[10px] text-muted-foreground dark:text-gray-400">{athlete.matches} matches</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Channels Tab */}
                {detailTab === 'channels' && (
                  <div className="space-y-2 animate-fadeIn">
                    {canales.map(canal => (
                      <div key={canal.id} className="flex items-center justify-between p-2.5 bg-muted dark:bg-gray-800 rounded-xl">
                        <div className="flex items-center gap-2">
                          {canal.tipo === 'privado'
                            ? <Lock size={14} weight="duotone" className="text-muted-foreground dark:text-gray-500" />
                            : <Hash size={14} weight="bold" className="text-tertiary dark:text-tertiary/90" />
                          }
                          <span className="text-sm font-medium dark:text-white">{canal.nombre}</span>
                        </div>
                        <span className="text-xs text-muted-foreground dark:text-gray-400">{canal.mensajes} msgs</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Members Tab */}
                {detailTab === 'members' && (
                  <div className="space-y-2 animate-fadeIn">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="flex items-center gap-2.5 p-2 bg-muted dark:bg-gray-800 rounded-xl">
                        <div className="w-8 h-8 bg-secondary dark:bg-gray-700 text-primary dark:text-tertiary rounded-lg flex items-center justify-center text-xs font-bold">
                          S{i}
                        </div>
                        <div className="flex-1">
                          <span className="text-sm font-medium dark:text-white">Student {i}</span>
                          <p className="text-[10px] text-muted-foreground dark:text-gray-400">{i <= 2 ? 'Admin' : 'Member'}</p>
                        </div>
                        {i <= 2 && <Crown size={14} weight="fill" className="text-amber-400" />}
                      </div>
                    ))}
                  </div>
                )}

                <button onClick={() => setSelectedComunidad(null)} className="w-full px-4 py-3 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90 transition-colors mt-4">
                  Join Community
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
