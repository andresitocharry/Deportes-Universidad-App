import { useState } from 'react';
import {
    CaretLeft, Medal, Trophy, SoccerBall, PersonSimpleRun, Barbell,
    TrendUp, Target, CalendarBlank, Star, Crown, Lightning,
    GameController, Fire, UsersThree, Moon, Sun
} from '@phosphor-icons/react';

interface PerfilProps {
    onNavigate: (screen: string) => void;
    isDarkMode?: boolean;
    onToggleDarkMode?: () => void;
}

export function PerfilUsuario({ onNavigate, isDarkMode, onToggleDarkMode }: PerfilProps) {
    const [activeTab, setActiveTab] = useState<'stats' | 'history' | 'badges'>('stats');

    const user = {
        nombre: 'Julián Martínez',
        universidad: 'Universidad de los Andes',
        semestre: '7th Semester — Systems Engineering',
        streak: 7,
        totalMatches: 34,
        winRate: 68,
        avgPace: '5:23 min/km',
        challengesCompleted: 8,
    };

    const rankings = [
        { clan: 'Running UniAndes', position: 12, total: 67, sport: 'Running', icon: PersonSimpleRun },
        { clan: 'UniAndes Football Club', position: 5, total: 48, sport: 'Soccer', icon: SoccerBall },
        { clan: 'Calisthenics Crew', position: 3, total: 29, sport: 'Calisthenics', icon: Barbell },
    ];

    const matchHistory = [
        { id: 1, sport: 'Soccer', title: '5v5 Soccer', result: 'Won', score: '4-2', opponent: 'Team Alpha', date: 'Feb 24, 2026', icon: SoccerBall },
        { id: 2, sport: 'Running', title: '5K Campus Run', result: 'Completed', score: '24:15', opponent: '-', date: 'Feb 22, 2026', icon: PersonSimpleRun },
        { id: 3, sport: 'Soccer', title: '5v5 Casual', result: 'Lost', score: '1-3', opponent: 'Team Beta', date: 'Feb 20, 2026', icon: SoccerBall },
        { id: 4, sport: 'Calisthenics', title: 'Push-up Challenge', result: 'Completed', score: '150 reps', opponent: '-', date: 'Feb 18, 2026', icon: Barbell },
        { id: 5, sport: 'Soccer', title: 'Copa Turing R1', result: 'Won', score: '3-1', opponent: 'Team Gamma', date: 'Feb 15, 2026', icon: SoccerBall },
    ];

    const badges = [
        { id: 1, name: 'First Match', icon: GameController, earned: true, desc: 'Complete your first match' },
        { id: 2, name: '7-Day Streak', icon: Fire, earned: true, desc: 'Stay active for 7 days straight' },
        { id: 3, name: 'Speed Demon', icon: Lightning, earned: true, desc: 'Run 5K under 25 minutes' },
        { id: 4, name: 'Team Player', icon: UsersThree, earned: true, desc: 'Join 3 communities' },
        { id: 5, name: '100K Runner', icon: PersonSimpleRun, earned: false, desc: 'Run 100 km total' },
        { id: 6, name: 'Tournament Champ', icon: Crown, earned: false, desc: 'Win a tournament' },
        { id: 7, name: 'Coach Rated', icon: Star, earned: true, desc: 'Rate a coaching session' },
        { id: 8, name: 'Challenge Creator', icon: Target, earned: false, desc: 'Create a community challenge' },
        { id: 9, name: 'Top 10', icon: Trophy, earned: true, desc: 'Reach Top 10 in any community' },
    ];

    return (
        <div className="pb-28 space-y-5">
            {/* Header with Back and Theme Toggle */}
            <div className="bg-gradient-to-br from-primary to-primary/80 dark:from-gray-800 dark:to-gray-900 text-white px-5 pt-5 pb-8 rounded-b-3xl border-b border-transparent dark:border-gray-700 transition-colors">
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => onNavigate('home')} className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors">
                        <CaretLeft size={18} weight="bold" />
                        <span className="text-sm font-semibold">Back</span>
                    </button>
                    {onToggleDarkMode && (
                        <button onClick={onToggleDarkMode} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                            {isDarkMode ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
                        </button>
                    )}
                </div>

                {/* Profile Info */}
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-sm border-2 border-white/30 flex items-center justify-center text-2xl font-black font-heading">
                        JM
                    </div>
                    <div className="flex-1">
                        <h1 className="text-xl font-black font-heading uppercase tracking-tight">{user.nombre}</h1>
                        <p className="text-xs text-white/70 mt-0.5">{user.universidad}</p>
                        <p className="text-[11px] text-white/50 mt-0.5">{user.semestre}</p>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-2 mt-5">
                    <MiniStat label="Matches" value={String(user.totalMatches)} />
                    <MiniStat label="Win Rate" value={`${user.winRate}%`} />
                    <MiniStat label="Avg Pace" value={user.avgPace} />
                    <MiniStat label="Streak" value={`${user.streak}d`} />
                </div>
            </div>

            {/* Tab Selector */}
            <div className="px-5">
                <div className="flex bg-muted dark:bg-gray-800 rounded-xl p-1">
                    {(['stats', 'history', 'badges'] as const).map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${activeTab === tab
                                ? 'bg-white dark:bg-gray-700 text-primary dark:text-white shadow-sm'
                                : 'text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-200'
                                }`}
                        >
                            {tab === 'stats' ? 'Rankings' : tab === 'history' ? 'History' : 'Badges'}
                        </button>
                    ))}
                </div>
            </div>

            {/* Tab Content */}
            {activeTab === 'stats' && (
                <div className="px-5 space-y-3 animate-fadeIn">
                    <h3 className="text-sm font-bold font-heading uppercase tracking-tight dark:text-gray-100">Community Rankings</h3>
                    {rankings.map((rank, i) => (
                        <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 transition-colors">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 bg-secondary dark:bg-gray-700 text-primary dark:text-tertiary rounded-xl flex items-center justify-center flex-shrink-0">
                                    <rank.icon size={20} weight="duotone" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-bold font-heading text-foreground dark:text-gray-100 leading-tight">{rank.clan}</h4>
                                    <span className="text-[11px] px-2 py-0.5 bg-secondary dark:bg-gray-700 text-primary dark:text-tertiary rounded-full font-semibold">{rank.sport}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-xl font-bold font-data text-primary">#{rank.position}</p>
                                    <p className="text-[10px] text-muted-foreground font-medium">of {rank.total}</p>
                                </div>
                            </div>

                            {/* Ranking Bar */}
                            <div className="relative">
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-tertiary rounded-full transition-all duration-1000"
                                        style={{ width: `${((rank.total - rank.position + 1) / rank.total) * 100}%` }}
                                    />
                                </div>
                                <p className="text-[10px] text-tertiary font-semibold mt-1">
                                    Top {Math.round((rank.position / rank.total) * 100)}%
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'history' && (
                <div className="px-5 space-y-2 animate-fadeIn">
                    <h3 className="text-sm font-bold font-heading uppercase tracking-tight mb-1 dark:text-gray-100">Match History</h3>
                    {matchHistory.map(match => (
                        <div key={match.id} className="bg-white dark:bg-gray-800 rounded-2xl p-3.5 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3 transition-colors">
                            <div className="w-10 h-10 bg-secondary dark:bg-gray-700 text-primary dark:text-tertiary rounded-xl flex items-center justify-center flex-shrink-0">
                                <match.icon size={20} weight="duotone" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-bold font-heading text-foreground dark:text-gray-100 leading-tight">{match.title}</h4>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${match.result === 'Won'
                                        ? 'bg-emerald-50 text-emerald-700'
                                        : match.result === 'Lost'
                                            ? 'bg-red-50 text-red-600'
                                            : 'bg-blue-50 text-blue-600'
                                        }`}>
                                        {match.result}
                                    </span>
                                    <span className="text-[11px] text-muted-foreground">{match.score}</span>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className="text-[11px] text-muted-foreground">{match.date}</p>
                                {match.opponent !== '-' && (
                                    <p className="text-[10px] text-muted-foreground mt-0.5">vs {match.opponent}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {activeTab === 'badges' && (
                <div className="px-5 animate-fadeIn">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold font-heading uppercase tracking-tight dark:text-gray-100">Earned Badges</h3>
                        <span className="text-xs font-semibold text-tertiary">
                            {badges.filter(b => b.earned).length}/{badges.length}
                        </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {badges.map(badge => (
                            <div
                                key={badge.id}
                                className={`rounded-2xl p-3 text-center transition-all ${badge.earned
                                    ? 'bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700'
                                    : 'bg-muted/50 dark:bg-gray-800/40 opacity-40'
                                    }`}
                            >
                                <div className={`w-10 h-10 mx-auto rounded-xl flex items-center justify-center mb-2 ${badge.earned
                                    ? 'bg-secondary dark:bg-tertiary/20 text-primary dark:text-tertiary'
                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                                    }`}>
                                    <badge.icon size={22} weight={badge.earned ? 'fill' : 'regular'} />
                                </div>
                                <p className="text-[11px] font-bold font-heading text-foreground dark:text-gray-100 leading-tight">{badge.name}</p>
                                <p className="text-[9px] text-muted-foreground dark:text-gray-400 mt-0.5 line-clamp-2">{badge.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function MiniStat({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-white/15 backdrop-blur-sm rounded-xl px-2 py-2 text-center">
            <p className="text-[9px] uppercase tracking-wider text-white/60 font-medium">{label}</p>
            <p className="text-sm font-bold font-data mt-0.5">{value}</p>
        </div>
    );
}
