import { useState, useEffect } from 'react';
import {
    SoccerBall, Barbell, PersonSimpleRun, Basketball, TennisBall,
    MagnifyingGlass, Lightning, CaretRight, MapPin, Clock, Users,
    Plus, Trophy, Handshake, Target, CheckCircle, GameController
} from '@phosphor-icons/react';
import { AgendarPartido } from './AgendarPartido';

type Sport = 'soccer' | 'basketball' | 'tennis' | 'calisthenics' | 'running' | null;
type Modality = 'amateur' | 'torneo' | 'casual' | 'entrenamiento' | null;

interface PlayProps {
    onNavigate?: (screen: string) => void;
    fabTrigger?: number;
}

const sports = [
    { id: 'soccer' as Sport, label: 'Fútbol', icon: SoccerBall, color: 'bg-green-500', emoji: '⚽' },
    { id: 'basketball' as Sport, label: 'Basketball', icon: Basketball, color: 'bg-orange-500', emoji: '🏀' },
    { id: 'tennis' as Sport, label: 'Tennis', icon: TennisBall, color: 'bg-yellow-500', emoji: '🎾' },
    { id: 'calisthenics' as Sport, label: 'Calistenia', icon: Barbell, color: 'bg-purple-500', emoji: '🏋️' },
    { id: 'running' as Sport, label: 'Running', icon: PersonSimpleRun, color: 'bg-red-500', emoji: '🏃' },
];

const modalities = [
    { id: 'casual' as Modality, label: 'Casual', icon: Handshake, desc: 'Just for fun' },
    { id: 'amateur' as Modality, label: 'Amateur', icon: Users, desc: 'Competitive but relaxed' },
    { id: 'torneo' as Modality, label: 'Torneo', icon: Trophy, desc: 'Competitive match' },
    { id: 'entrenamiento' as Modality, label: 'Training', icon: Target, desc: 'Practice & improve' },
];

const mockMatches = [
    { id: 1, sport: 'soccer', title: 'Fútbol 5v5', modality: 'Casual', players: '7/10', time: 'Hoy 3:00 PM', location: 'UniAndes Courts', level: 'Amateur' },
    { id: 2, sport: 'basketball', title: 'Basketball 3v3', modality: 'Torneo', players: '4/6', time: 'Hoy 5:30 PM', location: 'Main Gym', level: 'Intermediate' },
    { id: 3, sport: 'tennis', title: 'Tennis Doubles', modality: 'Casual', players: '3/4', time: 'Mañana 10:00 AM', location: 'El Nogal Club', level: 'Beginner' },
    { id: 4, sport: 'soccer', title: 'Fútbol 7v7', modality: 'Amateur', players: '10/14', time: 'Mañana 4:00 PM', location: 'North Complex', level: 'Advanced' },
    { id: 5, sport: 'running', title: 'Running Group 5K', modality: 'Training', players: '6/12', time: 'Sábado 7:00 AM', location: 'Parque Simón Bolívar', level: 'Open' },
];

export function Play({ onNavigate, fabTrigger }: PlayProps) {
    const [selectedSport, setSelectedSport] = useState<Sport>(null);
    const [selectedModality, setSelectedModality] = useState<Modality>(null);
    const [isSearching, setIsSearching] = useState(false);
    const [searchProgress, setSearchProgress] = useState(0);
    const [showResults, setShowResults] = useState(false);
    const [showCreateMatch, setShowCreateMatch] = useState(false);

    useEffect(() => {
        if (fabTrigger && fabTrigger > 0) {
            // Reset and start fresh
            setSelectedSport(null);
            setSelectedModality(null);
            setIsSearching(false);
            setShowResults(false);
        }
    }, [fabTrigger]);

    // Simulated search animation
    useEffect(() => {
        if (isSearching) {
            setSearchProgress(0);
            const interval = setInterval(() => {
                setSearchProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => {
                            setIsSearching(false);
                            setShowResults(true);
                        }, 300);
                        return 100;
                    }
                    return prev + Math.random() * 18 + 8;
                });
            }, 350);
            return () => clearInterval(interval);
        }
    }, [isSearching]);

    const handleSearch = () => {
        setIsSearching(true);
    };

    const handleReset = () => {
        setSelectedSport(null);
        setSelectedModality(null);
        setIsSearching(false);
        setShowResults(false);
        setSearchProgress(0);
    };

    const filteredMatches = mockMatches.filter(m => {
        if (selectedSport && m.sport !== selectedSport) return false;
        return true;
    });

    return (
        <div className="pb-28 space-y-5">
            {/* Hero Header */}
            <div className="bg-gradient-to-br from-primary via-primary/90 to-tertiary text-white px-5 pt-6 pb-8 rounded-b-3xl relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-1">
                        <GameController size={22} weight="fill" className="text-secondary" />
                        <p className="text-sm font-medium text-white/70">Ready to play? 🎮</p>
                    </div>
                    <h1 className="text-2xl font-black font-heading uppercase tracking-tight">
                        Find a Match
                    </h1>
                    <p className="text-sm text-white/80 mt-1">Connect with players, pick your sport & go!</p>

                    {/* Quick stats */}
                    <div className="flex gap-3 mt-5">
                        <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 flex-1">
                            <Lightning size={18} weight="fill" className="text-amber-300" />
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">Active Now</p>
                                <p className="text-sm font-bold font-data">24 players</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 flex-1">
                            <Trophy size={18} weight="fill" className="text-amber-300" />
                            <div>
                                <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">Open Matches</p>
                                <p className="text-sm font-bold font-data">{mockMatches.length} nearby</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search flow or results */}
            {isSearching ? (
                /* Searching animation */
                <div className="px-5">
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center space-y-5">
                        <div className="w-20 h-20 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto animate-pulse">
                            <MagnifyingGlass size={36} weight="duotone" />
                        </div>
                        <div>
                            <h2 className="text-lg font-black font-heading uppercase tracking-tight text-foreground">Searching...</h2>
                            <p className="text-xs text-muted-foreground mt-1">
                                Finding {selectedSport ? sports.find(s => s.id === selectedSport)?.label : ''} matches near you
                            </p>
                        </div>
                        <div className="w-full max-w-[200px] mx-auto">
                            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-tertiary rounded-full transition-all duration-300" style={{ width: `${Math.min(searchProgress, 100)}%` }} />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">{Math.min(Math.round(searchProgress), 100)}%</p>
                        </div>
                        <div className="space-y-2 text-left max-w-[240px] mx-auto">
                            <div className={`flex items-center gap-2 text-xs ${searchProgress > 20 ? 'text-tertiary' : 'text-gray-300'} transition-colors`}>
                                <CheckCircle size={14} weight={searchProgress > 20 ? 'fill' : 'regular'} />
                                <span>Scanning nearby players...</span>
                            </div>
                            <div className={`flex items-center gap-2 text-xs ${searchProgress > 50 ? 'text-tertiary' : 'text-gray-300'} transition-colors`}>
                                <CheckCircle size={14} weight={searchProgress > 50 ? 'fill' : 'regular'} />
                                <span>Matching preferences...</span>
                            </div>
                            <div className={`flex items-center gap-2 text-xs ${searchProgress > 80 ? 'text-tertiary' : 'text-gray-300'} transition-colors`}>
                                <CheckCircle size={14} weight={searchProgress > 80 ? 'fill' : 'regular'} />
                                <span>Finding open matches...</span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : showResults ? (
                /* Results view */
                <div className="px-5 space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-base font-bold font-heading text-foreground uppercase tracking-tight">Matches Found</h2>
                            <p className="text-xs text-muted-foreground">{filteredMatches.length} available matches</p>
                        </div>
                        <button
                            onClick={handleReset}
                            className="text-xs font-semibold text-tertiary flex items-center gap-0.5 hover:underline"
                        >
                            New Search
                            <CaretRight size={12} weight="bold" />
                        </button>
                    </div>

                    {/* Active filter chips */}
                    <div className="flex gap-2 flex-wrap">
                        {selectedSport && (
                            <span className="px-3 py-1 bg-primary text-white rounded-full text-xs font-semibold flex items-center gap-1">
                                {sports.find(s => s.id === selectedSport)?.emoji} {sports.find(s => s.id === selectedSport)?.label}
                            </span>
                        )}
                        {selectedModality && (
                            <span className="px-3 py-1 bg-tertiary text-white rounded-full text-xs font-semibold">
                                {modalities.find(m => m.id === selectedModality)?.label}
                            </span>
                        )}
                    </div>

                    {/* Match cards */}
                    <div className="space-y-3">
                        {filteredMatches.map(match => (
                            <div key={match.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 active:scale-[0.98] transition-all">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-11 h-11 ${sports.find(s => s.id === match.sport)?.color || 'bg-gray-500'} text-white rounded-xl flex items-center justify-center flex-shrink-0`}>
                                        {(() => {
                                            const SportIcon = sports.find(s => s.id === match.sport)?.icon || SoccerBall;
                                            return <SportIcon size={22} weight="fill" />;
                                        })()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold font-heading text-foreground truncate">{match.title}</p>
                                        <p className="text-xs text-muted-foreground">{match.modality} • {match.level}</p>
                                    </div>
                                    <div className="bg-secondary/60 text-primary px-2.5 py-1 rounded-full flex-shrink-0">
                                        <span className="text-xs font-bold font-data">{match.players}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} weight="bold" className="text-tertiary" />
                                        {match.time}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin size={12} weight="bold" className="text-tertiary" />
                                        {match.location}
                                    </span>
                                </div>
                                <button className="w-full px-4 py-2.5 rounded-xl bg-tertiary text-white text-xs font-semibold hover:bg-tertiary/90 transition-colors flex items-center justify-center gap-1.5">
                                    Join Match
                                    <CaretRight size={14} weight="bold" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                /* Selection flow */
                <div className="px-5 space-y-5">
                    {/* Step 1: Sport Selection */}
                    <div>
                        <h2 className="text-base font-bold font-heading text-foreground uppercase tracking-tight mb-3">
                            {selectedSport ? '1. Sport ✓' : '1. Choose your sport'}
                        </h2>
                        <div className="grid grid-cols-3 gap-3">
                            {sports.map(sport => {
                                const Icon = sport.icon;
                                const isSelected = selectedSport === sport.id;
                                return (
                                    <button
                                        key={sport.id}
                                        onClick={() => {
                                            setSelectedSport(isSelected ? null : sport.id);
                                            if (isSelected) setSelectedModality(null);
                                        }}
                                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl border transition-all active:scale-95 ${isSelected
                                            ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                                            : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
                                            }`}
                                    >
                                        <div className={`w-12 h-12 ${isSelected ? 'bg-white/20' : sport.color} ${isSelected ? 'text-white' : 'text-white'} rounded-2xl flex items-center justify-center`}>
                                            <Icon size={24} weight="fill" />
                                        </div>
                                        <span className={`text-[11px] font-bold ${isSelected ? 'text-white' : 'text-foreground'}`}>{sport.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Step 2: Modality Selection (appears after sport is selected) */}
                    {selectedSport && (
                        <div className="animate-fadeIn">
                            <h2 className="text-base font-bold font-heading text-foreground uppercase tracking-tight mb-3">
                                {selectedModality ? '2. Mode ✓' : '2. Choose mode'}
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {modalities.map(mod => {
                                    const Icon = mod.icon;
                                    const isSelected = selectedModality === mod.id;
                                    return (
                                        <button
                                            key={mod.id}
                                            onClick={() => setSelectedModality(isSelected ? null : mod.id)}
                                            className={`flex items-center gap-3 p-3.5 rounded-2xl border text-left transition-all active:scale-[0.97] ${isSelected
                                                ? 'bg-tertiary text-white border-tertiary shadow-md shadow-tertiary/20'
                                                : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
                                                }`}
                                        >
                                            <div className={`w-10 h-10 ${isSelected ? 'bg-white/20' : 'bg-secondary'} ${isSelected ? 'text-white' : 'text-primary'} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                                <Icon size={20} weight={isSelected ? "fill" : "duotone"} />
                                            </div>
                                            <div className="min-w-0">
                                                <p className={`text-xs font-bold ${isSelected ? 'text-white' : 'text-foreground'}`}>{mod.label}</p>
                                                <p className={`text-[10px] ${isSelected ? 'text-white/70' : 'text-muted-foreground'}`}>{mod.desc}</p>
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    {selectedSport && selectedModality && (
                        <div className="animate-fadeIn flex gap-3">
                            <button
                                onClick={handleSearch}
                                className="flex-1 px-4 py-4 rounded-2xl bg-gradient-to-r from-tertiary to-tertiary/80 text-white text-sm font-bold hover:from-tertiary/90 hover:to-tertiary/70 transition-all shadow-lg shadow-tertiary/30 flex items-center justify-center gap-2 active:scale-[0.98]"
                            >
                                <MagnifyingGlass size={20} weight="bold" />
                                Search
                            </button>
                            <button
                                onClick={() => setShowCreateMatch(true)}
                                className="px-5 py-4 rounded-2xl border-2 border-tertiary text-tertiary text-sm font-bold hover:bg-tertiary/5 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                            >
                                <Plus size={20} weight="bold" />
                                Create
                            </button>
                        </div>
                    )}

                    {/* Available Matches Preview */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <h2 className="text-base font-bold font-heading text-foreground uppercase tracking-tight">Open Matches</h2>
                            <span className="text-[10px] font-semibold text-tertiary bg-secondary/60 px-2.5 py-1 rounded-full">{mockMatches.length} available</span>
                        </div>
                        <div className="space-y-3">
                            {mockMatches.slice(0, 3).map(match => (
                                <div key={match.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
                                    <div className={`w-10 h-10 ${sports.find(s => s.id === match.sport)?.color || 'bg-gray-500'} text-white rounded-xl flex items-center justify-center flex-shrink-0`}>
                                        {(() => {
                                            const SportIcon = sports.find(s => s.id === match.sport)?.icon || SoccerBall;
                                            return <SportIcon size={20} weight="fill" />;
                                        })()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold font-heading text-foreground truncate">{match.title}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{match.time} • {match.players}</p>
                                    </div>
                                    <div className="w-7 h-7 rounded-full bg-tertiary/10 flex items-center justify-center text-tertiary flex-shrink-0">
                                        <CaretRight size={14} weight="bold" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Match Creation Wizard */}
            <AgendarPartido
                open={showCreateMatch}
                onClose={() => setShowCreateMatch(false)}
                initialSport={
                    selectedSport === 'soccer' ? 'soccer'
                        : selectedSport === 'calisthenics' ? 'calisthenics'
                            : selectedSport === 'running' ? 'running'
                                : selectedSport ? 'custom' : null
                }
                initialSportName={selectedSport ? sports.find(s => s.id === selectedSport)?.label : undefined}
            />
        </div>
    );
}
