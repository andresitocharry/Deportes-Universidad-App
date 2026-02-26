import { useState } from 'react';
import {
    CaretLeft, Trophy, Users, CalendarBlank, CaretRight, X,
    Lightning, Timer, MapPin, CreditCard, CheckCircle,
    Clock, SoccerBall, TennisBall, Barbell
} from '@phosphor-icons/react';

interface TorneosProps {
    onNavigate: (screen: string) => void;
}

export function Torneos({ onNavigate }: TorneosProps) {
    const [selectedTorneo, setSelectedTorneo] = useState<number | null>(null);
    const [showRegister, setShowRegister] = useState(false);
    const [filter, setFilter] = useState<string>('all');

    const torneos = [
        {
            id: 1, nombre: 'Copa Turing 2026', deporte: 'Soccer', icon: SoccerBall,
            tipo: '5v5', fecha: 'Mar 3-7, 2026', estado: 'Registration Open',
            equipos: 12, maxEquipos: 16, ubicacion: 'UniAndes Courts',
            inscripcion: '$15/person', organizador: 'Sofia Castañeda',
        },
        {
            id: 2, nombre: 'Tennis Open Spring', deporte: 'Tennis', icon: TennisBall,
            tipo: 'Singles', fecha: 'Mar 10-12, 2026', estado: 'Registration Open',
            equipos: 20, maxEquipos: 32, ubicacion: 'UniAndes Tennis Courts',
            inscripcion: '$10/person', organizador: 'UniAndes Racquets',
        },
        {
            id: 3, nombre: 'Calisthenics Championship', deporte: 'Calisthenics', icon: Barbell,
            tipo: 'Individual', fecha: 'Feb 28, 2026', estado: 'Live',
            equipos: 24, maxEquipos: 24, ubicacion: 'Sports Center',
            inscripcion: 'Free', organizador: 'Calisthenics Crew',
        },
    ];

    const bracketRounds = [
        {
            round: 'Quarter-Finals',
            matches: [
                { id: 1, team1: 'Team Alpha', team2: 'Team Beta', score1: 3, score2: 1, completed: true, time: 'Completed' },
                { id: 2, team1: 'Team Gamma', team2: 'Team Delta', score1: 2, score2: 2, completed: false, time: 'In progress' },
                { id: 3, team1: 'Team Epsilon', team2: 'Team Zeta', score1: 0, score2: 0, completed: false, time: 'Today 4:00 PM' },
                { id: 4, team1: 'Team Eta', team2: 'Team Theta', score1: 0, score2: 0, completed: false, time: 'Today 5:00 PM' },
            ],
        },
        {
            round: 'Semi-Finals',
            matches: [
                { id: 5, team1: 'Team Alpha', team2: 'TBD', score1: 0, score2: 0, completed: false, time: 'Mar 5' },
                { id: 6, team1: 'TBD', team2: 'TBD', score1: 0, score2: 0, completed: false, time: 'Mar 5' },
            ],
        },
        {
            round: 'Final',
            matches: [
                { id: 7, team1: 'TBD', team2: 'TBD', score1: 0, score2: 0, completed: false, time: 'Mar 7' },
            ],
        },
    ];

    const teamPayments = [
        { name: 'You (Captain)', paid: true },
        { name: 'David Elías', paid: true },
        { name: 'Julián Contreras', paid: true },
        { name: 'Carlos Mendez', paid: false },
        { name: 'Miguel Torres', paid: false },
    ];

    const filtered = filter === 'all' ? torneos : torneos.filter(t => t.deporte === filter);

    return (
        <div className="pb-28 space-y-5">
            {/* Header */}
            <div className="bg-gradient-to-br from-primary to-primary/80 text-white px-5 pt-5 pb-8 rounded-b-3xl">
                <button onClick={() => onNavigate('home')} className="flex items-center gap-1.5 text-white/70 hover:text-white mb-4 transition-colors">
                    <CaretLeft size={18} weight="bold" />
                    <span className="text-sm font-semibold">Back</span>
                </button>
                <p className="text-sm font-medium text-white/70">Compete & Win 🏆</p>
                <h1 className="text-2xl font-black font-heading uppercase tracking-tight">Tournaments</h1>
                <p className="text-sm text-white/80 mt-1">Register, compete, and track live brackets</p>
            </div>

            {/* Filter Pills */}
            <div className="px-5">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                    {['all', 'Soccer', 'Tennis', 'Calisthenics'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${filter === f
                                ? 'bg-primary text-white'
                                : 'bg-secondary/60 text-primary border border-secondary hover:bg-secondary'
                                }`}
                        >
                            {f === 'all' ? 'All Sports' : f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tournament Cards */}
            <div className="px-5 space-y-3">
                {filtered.map(torneo => (
                    <button
                        key={torneo.id}
                        onClick={() => setSelectedTorneo(torneo.id)}
                        className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 text-left active:scale-[0.98] transition-all"
                    >
                        <div className="flex items-start gap-3 mb-3">
                            <div className="w-12 h-12 bg-secondary text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                                <torneo.icon size={24} weight="duotone" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-sm font-bold font-heading text-foreground leading-tight mb-1">{torneo.nombre}</h3>
                                <div className="flex items-center gap-2">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${torneo.estado === 'Live'
                                        ? 'bg-red-50 text-red-600'
                                        : 'bg-secondary text-primary'
                                        }`}>
                                        {torneo.estado === 'Live' && '● '}{torneo.estado}
                                    </span>
                                    <span className="text-[11px] text-muted-foreground">{torneo.tipo}</span>
                                </div>
                            </div>
                            <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 flex-shrink-0 mt-1">
                                <CaretRight size={14} weight="bold" />
                            </div>
                        </div>

                        {/* Info Row */}
                        <div className="grid grid-cols-3 gap-2">
                            <div className="flex items-center gap-1.5">
                                <CalendarBlank size={13} weight="duotone" className="text-tertiary" />
                                <span className="text-[11px] text-muted-foreground">{torneo.fecha}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Users size={13} weight="duotone" className="text-tertiary" />
                                <span className="text-[11px] text-muted-foreground">{torneo.equipos}/{torneo.maxEquipos}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <MapPin size={13} weight="duotone" className="text-tertiary" />
                                <span className="text-[11px] text-muted-foreground truncate">{torneo.ubicacion}</span>
                            </div>
                        </div>

                        {/* Capacity Bar */}
                        <div className="mt-3">
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-700 ${torneo.equipos >= torneo.maxEquipos ? 'bg-red-400' : 'bg-tertiary'}`}
                                    style={{ width: `${(torneo.equipos / torneo.maxEquipos) * 100}%` }}
                                />
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Tournament Detail Modal */}
            {selectedTorneo && (() => {
                const torneo = torneos.find(t => t.id === selectedTorneo);
                if (!torneo) return null;
                return (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
                        <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl max-h-[90vh] overflow-y-auto">
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold font-heading uppercase leading-tight">{torneo.nombre}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${torneo.estado === 'Live'
                                                ? 'bg-red-50 text-red-600'
                                                : 'bg-secondary text-primary'
                                                }`}>
                                                {torneo.estado === 'Live' && '● '}{torneo.estado}
                                            </span>
                                            <span className="text-xs text-muted-foreground">{torneo.tipo}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => setSelectedTorneo(null)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                        <X size={18} weight="bold" />
                                    </button>
                                </div>

                                {/* Stats Grid */}
                                <div className="grid grid-cols-2 gap-2 mb-4">
                                    {[
                                        { label: 'Date', value: torneo.fecha },
                                        { label: 'Location', value: torneo.ubicacion },
                                        { label: 'Teams', value: `${torneo.equipos}/${torneo.maxEquipos}` },
                                        { label: 'Fee', value: torneo.inscripcion },
                                    ].map(stat => (
                                        <div key={stat.label} className="bg-muted rounded-xl p-3">
                                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-medium">{stat.label}</p>
                                            <p className="text-sm font-bold text-primary">{stat.value}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Live Bracket */}
                                <div className="mb-4">
                                    <h4 className="text-sm font-bold font-heading uppercase mb-3">Live Bracket</h4>
                                    <div className="space-y-4">
                                        {bracketRounds.map(round => (
                                            <div key={round.round}>
                                                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-2">{round.round}</p>
                                                <div className="space-y-2">
                                                    {round.matches.map(match => (
                                                        <div
                                                            key={match.id}
                                                            className={`rounded-xl p-2.5 border ${match.completed
                                                                ? 'bg-emerald-50/50 border-emerald-200'
                                                                : match.time === 'In progress'
                                                                    ? 'bg-amber-50/50 border-amber-200'
                                                                    : 'bg-muted border-gray-100'
                                                                }`}
                                                        >
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex-1">
                                                                    <div className="flex items-center justify-between mb-1">
                                                                        <span className={`text-xs font-semibold ${match.completed && match.score1 > match.score2 ? 'text-primary' : 'text-muted-foreground'}`}>
                                                                            {match.team1}
                                                                        </span>
                                                                        <span className="text-sm font-bold font-data text-primary">{match.completed || match.time === 'In progress' ? match.score1 : '-'}</span>
                                                                    </div>
                                                                    <div className="flex items-center justify-between">
                                                                        <span className={`text-xs font-semibold ${match.completed && match.score2 > match.score1 ? 'text-primary' : 'text-muted-foreground'}`}>
                                                                            {match.team2}
                                                                        </span>
                                                                        <span className="text-sm font-bold font-data text-primary">{match.completed || match.time === 'In progress' ? match.score2 : '-'}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1 mt-1.5">
                                                                {match.completed ? (
                                                                    <CheckCircle size={11} weight="fill" className="text-emerald-500" />
                                                                ) : match.time === 'In progress' ? (
                                                                    <Lightning size={11} weight="fill" className="text-amber-500" />
                                                                ) : (
                                                                    <Clock size={11} weight="duotone" className="text-muted-foreground" />
                                                                )}
                                                                <span className={`text-[10px] font-medium ${match.completed ? 'text-emerald-600' : match.time === 'In progress' ? 'text-amber-600' : 'text-muted-foreground'}`}>
                                                                    {match.time}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setSelectedTorneo(null)}
                                        className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-muted-foreground hover:bg-gray-50 transition-colors"
                                    >
                                        Close
                                    </button>
                                    {torneo.estado === 'Registration Open' && (
                                        <button
                                            onClick={() => { setSelectedTorneo(null); setShowRegister(true); }}
                                            className="flex-1 px-4 py-3 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90 transition-colors"
                                        >
                                            Register Team
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })()}

            {/* Register Team Modal with Split Payment */}
            {showRegister && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
                    <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl max-h-[85vh] overflow-y-auto">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold font-heading uppercase">Register Team</h3>
                            <button onClick={() => setShowRegister(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <X size={18} weight="bold" />
                            </button>
                        </div>

                        {/* Team Name */}
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-muted-foreground mb-1">Team Name</label>
                            <input type="text" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" placeholder="e.g. Team Thunder" />
                        </div>

                        {/* Team Members & Payment Status */}
                        <div className="mb-4">
                            <label className="block text-xs font-semibold text-muted-foreground mb-2">Team Members</label>

                            {/* Payment Progress Bar */}
                            <div className="mb-3">
                                <div className="flex items-center justify-between text-xs mb-1.5">
                                    <span className="text-muted-foreground font-medium">Payment Progress</span>
                                    <span className="font-bold font-data text-primary text-sm">3/5 paid</span>
                                </div>
                                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-tertiary rounded-full transition-all duration-700" style={{ width: '60%' }} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                {teamPayments.map((member, i) => (
                                    <div key={i} className="flex items-center justify-between p-2.5 bg-muted rounded-xl">
                                        <div className="flex items-center gap-2.5">
                                            <div className="w-8 h-8 bg-secondary text-primary rounded-lg flex items-center justify-center text-xs font-bold">
                                                {member.name.charAt(0)}
                                            </div>
                                            <span className="text-sm font-medium">{member.name}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            {member.paid ? (
                                                <>
                                                    <CheckCircle size={16} weight="fill" className="text-emerald-500" />
                                                    <span className="text-[11px] font-semibold text-emerald-600">Paid</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Clock size={16} weight="duotone" className="text-amber-500" />
                                                    <span className="text-[11px] font-semibold text-amber-600">Pending</span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Add Member */}
                            <button className="w-full mt-2 px-3 py-2.5 rounded-xl border-2 border-dashed border-gray-200 text-xs font-semibold text-muted-foreground hover:border-tertiary hover:text-tertiary transition-colors">
                                + Add Team Member
                            </button>
                        </div>

                        {/* Fee Info */}
                        <div className="bg-muted rounded-xl p-3 mb-5 flex items-center gap-3">
                            <CreditCard size={20} weight="duotone" className="text-tertiary flex-shrink-0" />
                            <div>
                                <p className="text-xs font-semibold text-foreground">$15 per person</p>
                                <p className="text-[11px] text-muted-foreground">Each member pays individually via Nequi/DaviPlata</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2">
                            <button onClick={() => setShowRegister(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-muted-foreground hover:bg-gray-50 transition-colors">
                                Cancel
                            </button>
                            <button onClick={() => setShowRegister(false)} className="flex-1 px-4 py-2.5 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90 transition-colors">
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
