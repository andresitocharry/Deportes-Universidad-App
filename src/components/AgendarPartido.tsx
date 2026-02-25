import { useState, useEffect } from 'react';
import {
    SoccerBall, Barbell, PersonSimpleRun, Plus, X, ArrowLeft,
    MagnifyingGlass, MapPin, CalendarBlank, Clock, Users, CaretRight,
    Bluetooth, VideoCamera, Watch, Trophy, Target, Lightning,
    UserCirclePlus, ShieldCheck, Star, Spinner, CheckCircle
} from '@phosphor-icons/react';

type Step = 'sport' | 'mode' | 'create' | 'matchmaking' | 'searching' | 'found' | 'smart';
type Sport = 'soccer' | 'calisthenics' | 'running' | 'custom';

interface AgendarPartidoProps {
    open: boolean;
    onClose: () => void;
    initialSport?: 'soccer' | 'calisthenics' | 'running' | 'custom' | null;
    initialSportName?: string;
}

export function AgendarPartido({ open, onClose, initialSport, initialSportName }: AgendarPartidoProps) {
    const [step, setStep] = useState<Step>('sport');
    const [selectedSport, setSelectedSport] = useState<Sport | null>(null);
    const [customSportName, setCustomSportName] = useState('');
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [matchMode, setMatchMode] = useState<'create' | 'matchmaking' | null>(null);

    // Soccer-specific
    const [position, setPosition] = useState('');
    const [skillLevel, setSkillLevel] = useState('');

    // Search simulation
    const [searchProgress, setSearchProgress] = useState(0);

    // Smart feature states
    const [bluetoothPlayers, setBluetoothPlayers] = useState<string[]>([]);
    const [videoUploaded, setVideoUploaded] = useState(false);
    const [watchConnected, setWatchConnected] = useState(false);

    // Reset on open
    useEffect(() => {
        if (open) {
            if (initialSport) {
                // Skip sport selection — go directly to create
                setStep('create');
                setSelectedSport(initialSport);
                setMatchMode('create');
                if (initialSport === 'custom' && initialSportName) {
                    setCustomSportName(initialSportName);
                }
            } else {
                setStep('sport');
                setSelectedSport(null);
                setMatchMode(null);
            }
            setCustomSportName('');
            setShowCustomInput(false);
            setPosition('');
            setSkillLevel('');
            setSearchProgress(0);
            setBluetoothPlayers([]);
            setVideoUploaded(false);
            setWatchConnected(false);
        }
    }, [open, initialSport]);

    // Simulated matchmaking search
    useEffect(() => {
        if (step === 'searching') {
            setSearchProgress(0);
            const interval = setInterval(() => {
                setSearchProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(() => setStep('found'), 300);
                        return 100;
                    }
                    return prev + Math.random() * 15 + 5;
                });
            }, 400);
            return () => clearInterval(interval);
        }
    }, [step]);

    // Simulated Bluetooth detection
    useEffect(() => {
        if (step === 'smart' && selectedSport === 'soccer') {
            const players = ['Carlos M.', 'Ana R.', 'Miguel T.', 'Laura G.', 'David S.',
                'Sofía P.', 'Andrés L.', 'Valentina C.', 'Santiago H.', 'Camila B.'];
            let idx = 0;
            const interval = setInterval(() => {
                if (idx < players.length) {
                    setBluetoothPlayers(prev => [...prev, players[idx]]);
                    idx++;
                } else {
                    clearInterval(interval);
                }
            }, 1200);
            return () => clearInterval(interval);
        }
    }, [step, selectedSport]);

    if (!open) return null;

    const sportConfig = {
        soccer: { icon: SoccerBall, label: 'Fútbol', color: 'bg-green-500', type: 'group' as const },
        calisthenics: { icon: Barbell, label: 'Calistenia', color: 'bg-purple-500', type: 'individual' as const },
        running: { icon: PersonSimpleRun, label: 'Running', color: 'bg-orange-500', type: 'individual' as const },
        custom: { icon: Plus, label: customSportName || 'Custom', color: 'bg-gray-500', type: 'individual' as const },
    };

    const getSportLabel = () => selectedSport ? sportConfig[selectedSport].label : '';
    const isGroupSport = selectedSport ? sportConfig[selectedSport].type === 'group' : false;

    const handleBack = () => {
        switch (step) {
            case 'mode': setStep('sport'); break;
            case 'create': case 'matchmaking': setStep('mode'); break;
            case 'searching': setStep('matchmaking'); break;
            case 'found': setStep('matchmaking'); break;
            case 'smart': setStep('found'); break;
            default: onClose();
        }
    };

    const selectSport = (sport: Sport) => {
        if (sport === 'custom') {
            setShowCustomInput(true);
        } else {
            setSelectedSport(sport);
            setShowCustomInput(false);
            setStep('mode');
        }
    };

    const confirmCustomSport = () => {
        if (customSportName.trim()) {
            setSelectedSport('custom');
            setShowCustomInput(false);
            setStep('mode');
        }
    };

    // ── RENDER STEPS ──

    const renderSportSelection = () => (
        <div className="space-y-5">
            <div>
                <h2 className="text-xl font-black font-heading uppercase tracking-tight text-foreground">Schedule a Match</h2>
                <p className="text-sm text-muted-foreground mt-1">Choose your sport</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {(['soccer', 'calisthenics', 'running'] as Sport[]).map(sport => {
                    const config = sportConfig[sport];
                    const Icon = config.icon;
                    return (
                        <button
                            key={sport}
                            onClick={() => selectSport(sport)}
                            className="flex flex-col items-center gap-2.5 p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md active:scale-95 transition-all"
                        >
                            <div className={`w-14 h-14 ${config.color} text-white rounded-2xl flex items-center justify-center`}>
                                <Icon size={28} weight="fill" />
                            </div>
                            <span className="text-xs font-bold text-foreground">{config.label}</span>
                            <span className="text-[10px] text-muted-foreground px-2 py-0.5 bg-muted rounded-full">
                                {config.type === 'group' ? 'Group' : 'Individual'}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Add Custom Sport */}
            {!showCustomInput ? (
                <button
                    onClick={() => setShowCustomInput(true)}
                    className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl border-2 border-dashed border-gray-200 text-sm font-semibold text-muted-foreground hover:border-tertiary hover:text-tertiary transition-colors"
                >
                    <Plus size={18} weight="bold" />
                    Add another sport
                </button>
            ) : (
                <div className="bg-muted rounded-2xl p-4 space-y-3">
                    <label className="block text-xs font-semibold text-muted-foreground">Custom sport name</label>
                    <input
                        type="text"
                        value={customSportName}
                        onChange={e => setCustomSportName(e.target.value)}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary bg-white"
                        placeholder="e.g. Volleyball, Skateboarding..."
                        autoFocus
                    />
                    <div className="flex gap-2">
                        <button onClick={() => setShowCustomInput(false)} className="flex-1 px-3 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-muted-foreground hover:bg-white">Cancel</button>
                        <button onClick={confirmCustomSport} className="flex-1 px-3 py-2 rounded-xl bg-tertiary text-white text-xs font-semibold hover:bg-tertiary/90">Confirm</button>
                    </div>
                </div>
            )}
        </div>
    );

    const renderModeSelection = () => (
        <div className="space-y-5">
            <div>
                <h2 className="text-xl font-black font-heading uppercase tracking-tight text-foreground">{getSportLabel()}</h2>
                <p className="text-sm text-muted-foreground mt-1">What would you like to do?</p>
            </div>

            <button
                onClick={() => { setMatchMode('create'); setStep('create'); }}
                className="w-full bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-left active:scale-[0.98] transition-all"
            >
                <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-secondary text-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <CalendarBlank size={24} weight="duotone" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-bold font-heading text-foreground mb-1">Create Match</h3>
                        <p className="text-xs text-muted-foreground">Set up a match and invite players to join</p>
                    </div>
                    <CaretRight size={18} className="text-gray-400 mt-3" />
                </div>
            </button>

            <button
                onClick={() => { setMatchMode('matchmaking'); setStep('matchmaking'); }}
                className="w-full bg-white rounded-2xl p-5 shadow-sm border border-gray-100 text-left active:scale-[0.98] transition-all"
            >
                <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-tertiary/10 text-tertiary rounded-xl flex items-center justify-center flex-shrink-0">
                        <MagnifyingGlass size={24} weight="duotone" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-bold font-heading text-foreground mb-1">Matchmaking</h3>
                        <p className="text-xs text-muted-foreground">Find players at your level and join automatically</p>
                    </div>
                    <CaretRight size={18} className="text-gray-400 mt-3" />
                </div>
            </button>

            {/* Smart Feature Teaser */}
            {selectedSport && selectedSport !== 'custom' && (
                <div className="bg-gradient-to-r from-primary/5 to-tertiary/5 rounded-2xl p-4 border border-primary/10">
                    <div className="flex items-center gap-2 mb-2">
                        <Lightning size={16} weight="fill" className="text-tertiary" />
                        <span className="text-xs font-bold text-primary uppercase tracking-wide">Smart Features</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {selectedSport === 'soccer' && '⚽ Bluetooth arrival detection + AI formation suggestion'}
                        {selectedSport === 'calisthenics' && '🏋️ Upload video for AI technique analysis'}
                        {selectedSport === 'running' && '🏃 Smartwatch sync for real-time performance'}
                    </p>
                </div>
            )}
        </div>
    );

    const renderCreateMatch = () => (
        <div className="space-y-4">
            <div>
                <h2 className="text-lg font-black font-heading uppercase tracking-tight text-foreground">Create {getSportLabel()} Match</h2>
                <p className="text-xs text-muted-foreground mt-1">Set up the details</p>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Title</label>
                    <input type="text" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" placeholder={`${getSportLabel()} match`} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1">Date</label>
                        <input type="date" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1">Time</label>
                        <input type="time" className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" />
                    </div>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Location</label>
                    <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 py-2.5">
                        <MapPin size={16} weight="bold" className="text-tertiary" />
                        <input type="text" className="flex-1 text-sm outline-none" placeholder="Select location..." />
                    </div>
                </div>
                {isGroupSport && (
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1">Players needed</label>
                        <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary">
                            <option>5v5 (10 players)</option>
                            <option>7v7 (14 players)</option>
                            <option>11v11 (22 players)</option>
                        </select>
                    </div>
                )}
                <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Skill Level</label>
                    <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary">
                        <option>Open (any level)</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                    </select>
                </div>
                <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Notes</label>
                    <textarea className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm h-16 resize-none focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary" placeholder="Extra details..." />
                </div>
            </div>

            <button
                onClick={() => { setStep('found'); }}
                className="w-full px-4 py-3 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90 transition-colors"
            >
                Create Match
            </button>
        </div>
    );

    const renderMatchmaking = () => (
        <div className="space-y-4">
            <div>
                <h2 className="text-lg font-black font-heading uppercase tracking-tight text-foreground">{getSportLabel()} Matchmaking</h2>
                <p className="text-xs text-muted-foreground mt-1">We'll pair you with players at your level</p>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Skill Level</label>
                    <div className="grid grid-cols-3 gap-2">
                        {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                            <button
                                key={level}
                                onClick={() => setSkillLevel(level)}
                                className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${skillLevel === level
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'bg-muted text-muted-foreground hover:bg-gray-200'
                                    }`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Soccer-specific: position */}
                {selectedSport === 'soccer' && (
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1.5">Preferred Position</label>
                        <div className="grid grid-cols-2 gap-2">
                            {['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Any Position'].map(pos => (
                                <button
                                    key={pos}
                                    onClick={() => setPosition(pos)}
                                    className={`px-3 py-2.5 rounded-xl text-xs font-semibold transition-all text-left flex items-center gap-2 ${position === pos
                                        ? 'bg-primary text-white shadow-sm'
                                        : 'bg-muted text-muted-foreground hover:bg-gray-200'
                                        } ${pos === 'Any Position' ? 'col-span-2 justify-center' : ''}`}
                                >
                                    {pos === 'Goalkeeper' && '🧤'}
                                    {pos === 'Defender' && '🛡️'}
                                    {pos === 'Midfielder' && '⚙️'}
                                    {pos === 'Forward' && '⚡'}
                                    {pos === 'Any Position' && '🔄'}
                                    {pos}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1">Preferred Time</label>
                        <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary">
                            <option>Morning (6-12)</option>
                            <option>Afternoon (12-6)</option>
                            <option>Evening (6-10)</option>
                            <option>Any</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1">Location</label>
                        <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary">
                            <option>Near campus</option>
                            <option>North zone</option>
                            <option>Any</option>
                        </select>
                    </div>
                </div>

                {isGroupSport && (
                    <div>
                        <label className="block text-xs font-semibold text-muted-foreground mb-1">Game Size</label>
                        <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-tertiary/30 focus:border-tertiary">
                            <option>5v5</option>
                            <option>7v7</option>
                            <option>11v11</option>
                        </select>
                    </div>
                )}
            </div>

            <button
                onClick={() => setStep('searching')}
                className="w-full px-4 py-3 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90 transition-colors flex items-center justify-center gap-2"
                disabled={!skillLevel}
            >
                <MagnifyingGlass size={18} weight="bold" />
                Find Match
            </button>
        </div>
    );

    const renderSearching = () => (
        <div className="space-y-6 text-center py-6">
            <div className="w-20 h-20 bg-secondary text-primary rounded-full flex items-center justify-center mx-auto animate-pulse">
                <MagnifyingGlass size={36} weight="duotone" />
            </div>
            <div>
                <h2 className="text-lg font-black font-heading uppercase tracking-tight text-foreground">Searching...</h2>
                <p className="text-xs text-muted-foreground mt-1">Finding {isGroupSport ? 'players' : 'a partner'} at your level</p>
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
                    <span>Analyzing your profile...</span>
                </div>
                <div className={`flex items-center gap-2 text-xs ${searchProgress > 50 ? 'text-tertiary' : 'text-gray-300'} transition-colors`}>
                    <CheckCircle size={14} weight={searchProgress > 50 ? 'fill' : 'regular'} />
                    <span>Finding matching {isGroupSport ? 'players' : 'partners'}...</span>
                </div>
                <div className={`flex items-center gap-2 text-xs ${searchProgress > 80 ? 'text-tertiary' : 'text-gray-300'} transition-colors`}>
                    <CheckCircle size={14} weight={searchProgress > 80 ? 'fill' : 'regular'} />
                    <span>Organizing {isGroupSport ? 'teams' : 'session'}...</span>
                </div>
            </div>
        </div>
    );

    const renderFound = () => (
        <div className="space-y-5">
            {/* Success Header */}
            <div className="text-center py-3">
                <div className="w-16 h-16 bg-tertiary/10 text-tertiary rounded-full flex items-center justify-center mx-auto mb-3">
                    <CheckCircle size={36} weight="fill" />
                </div>
                <h2 className="text-lg font-black font-heading uppercase tracking-tight text-foreground">
                    {matchMode === 'create' ? 'Match Created!' : 'Match Found!'}
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                    {matchMode === 'create' ? 'Share with your friends' : 'You\'ve been matched'}
                </p>
            </div>

            {/* Match Card */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                    {selectedSport && (() => {
                        const config = sportConfig[selectedSport];
                        const Icon = config.icon;
                        return <div className={`w-10 h-10 ${config.color} text-white rounded-xl flex items-center justify-center`}><Icon size={22} weight="fill" /></div>;
                    })()}
                    <div>
                        <h3 className="text-sm font-bold font-heading">{getSportLabel()} Match</h3>
                        <p className="text-[11px] text-muted-foreground">
                            {matchMode === 'matchmaking' && skillLevel && `${skillLevel} level`}
                            {selectedSport === 'soccer' && position && ` • ${position}`}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="bg-muted rounded-xl p-2.5">
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <CalendarBlank size={12} weight="bold" className="text-tertiary" />
                            <span className="text-[10px] text-muted-foreground">Date</span>
                        </div>
                        <p className="text-xs font-bold text-primary">Today, 5:00 PM</p>
                    </div>
                    <div className="bg-muted rounded-xl p-2.5">
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <MapPin size={12} weight="bold" className="text-tertiary" />
                            <span className="text-[10px] text-muted-foreground">Location</span>
                        </div>
                        <p className="text-xs font-bold text-primary">UniAndes Courts</p>
                    </div>
                </div>

                {isGroupSport && matchMode === 'matchmaking' && (
                    <div className="mb-3">
                        <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wide mb-2">Matched Players</p>
                        <div className="flex -space-x-2">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="w-8 h-8 bg-secondary text-primary rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">
                                    {String.fromCharCode(65 + i)}
                                </div>
                            ))}
                            <div className="w-8 h-8 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white">+2</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Smart Feature CTA */}
            {selectedSport && selectedSport !== 'custom' && (
                <button
                    onClick={() => setStep('smart')}
                    className="w-full bg-gradient-to-r from-primary to-primary/80 text-white rounded-2xl p-4 text-left active:scale-[0.98] transition-all"
                >
                    <div className="flex items-center gap-2 mb-1.5">
                        <Lightning size={16} weight="fill" className="text-amber-300" />
                        <span className="text-xs font-bold uppercase tracking-wide">Smart Feature</span>
                    </div>
                    <p className="text-xs text-white/80">
                        {selectedSport === 'soccer' && 'Start Bluetooth detection for arrival & formation'}
                        {selectedSport === 'calisthenics' && 'Upload video for AI technique analysis'}
                        {selectedSport === 'running' && 'Connect smartwatch for performance tracking'}
                    </p>
                </button>
            )}

            <button onClick={onClose} className="w-full px-4 py-3 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90 transition-colors">
                Done
            </button>
        </div>
    );

    const renderSmartFeature = () => {
        if (selectedSport === 'soccer') return renderSmartSoccer();
        if (selectedSport === 'calisthenics') return renderSmartCalisthenics();
        if (selectedSport === 'running') return renderSmartRunning();
        return null;
    };

    const renderSmartSoccer = () => (
        <div className="space-y-5">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Bluetooth size={18} weight="bold" className="text-blue-500" />
                    <h2 className="text-lg font-black font-heading uppercase tracking-tight text-foreground">Bluetooth Detection</h2>
                </div>
                <p className="text-xs text-muted-foreground">Detecting players arriving at the court</p>
            </div>

            {/* Radar Animation */}
            <div className="relative w-44 h-44 mx-auto">
                <div className="absolute inset-0 rounded-full border-2 border-blue-100" />
                <div className="absolute inset-4 rounded-full border-2 border-blue-100" />
                <div className="absolute inset-8 rounded-full border-2 border-blue-200" />
                <div className="absolute inset-0 rounded-full bg-blue-500/5 animate-ping" style={{ animationDuration: '2s' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center">
                        <Bluetooth size={20} weight="bold" />
                    </div>
                </div>
                {/* Player dots */}
                {bluetoothPlayers.slice(0, 6).map((_, i) => {
                    const angle = (i * 60) * (Math.PI / 180);
                    const radius = 55;
                    return (
                        <div
                            key={i}
                            className="absolute w-6 h-6 bg-tertiary text-white rounded-full flex items-center justify-center text-[9px] font-bold animate-bounce"
                            style={{
                                top: `${50 + Math.sin(angle) * (radius / 88) * 50}%`,
                                left: `${50 + Math.cos(angle) * (radius / 88) * 50}%`,
                                transform: 'translate(-50%, -50%)',
                                animationDelay: `${i * 0.2}s`,
                                animationDuration: '1.5s'
                            }}
                        >
                            {bluetoothPlayers[i]?.charAt(0)}
                        </div>
                    );
                })}
            </div>

            {/* Player List */}
            <div>
                <div className="flex justify-between items-center mb-2">
                    <p className="text-xs font-bold font-heading uppercase">{bluetoothPlayers.length}/10 Players Detected</p>
                    <span className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full font-semibold animate-pulse">Scanning...</span>
                </div>
                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                    {bluetoothPlayers.map((player, i) => (
                        <div key={i} className="flex items-center gap-2 p-2 bg-muted rounded-xl">
                            <div className="w-6 h-6 bg-secondary text-primary rounded-lg flex items-center justify-center text-[10px] font-bold">{player.charAt(0)}</div>
                            <span className="text-xs font-medium flex-1">{player}</span>
                            <CheckCircle size={14} weight="fill" className="text-tertiary" />
                        </div>
                    ))}
                </div>
            </div>

            {/* Formation Suggestion */}
            {bluetoothPlayers.length >= 6 && (
                <div className="bg-gradient-to-br from-green-50 to-secondary/30 rounded-2xl p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                        <ShieldCheck size={16} weight="fill" className="text-tertiary" />
                        <span className="text-xs font-bold text-primary uppercase">AI Formation Suggestion</span>
                    </div>
                    <div className="bg-green-800 rounded-xl p-3 mb-2">
                        {/* Mini formation diagram */}
                        <div className="flex flex-col items-center gap-3 py-2">
                            <div className="flex gap-6">
                                {['CF', 'CF'].map((pos, i) => (
                                    <div key={i} className="w-7 h-7 bg-white text-green-800 rounded-full flex items-center justify-center text-[9px] font-bold">{pos}</div>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                {['MF', 'MF', 'MF'].map((pos, i) => (
                                    <div key={i} className="w-7 h-7 bg-white/80 text-green-800 rounded-full flex items-center justify-center text-[9px] font-bold">{pos}</div>
                                ))}
                            </div>
                            <div className="flex gap-4">
                                {['DF', 'DF', 'DF', 'DF'].map((pos, i) => (
                                    <div key={i} className="w-7 h-7 bg-white/60 text-green-800 rounded-full flex items-center justify-center text-[9px] font-bold">{pos}</div>
                                ))}
                            </div>
                            <div className="w-7 h-7 bg-amber-400 text-green-800 rounded-full flex items-center justify-center text-[9px] font-bold">GK</div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground text-center">Suggested: <strong className="text-primary">4-3-2</strong> based on player profiles</p>
                </div>
            )}

            <button onClick={onClose} className="w-full px-4 py-3 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90 transition-colors">
                Done
            </button>
        </div>
    );

    const renderSmartCalisthenics = () => (
        <div className="space-y-5">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <VideoCamera size={18} weight="bold" className="text-purple-500" />
                    <h2 className="text-lg font-black font-heading uppercase tracking-tight text-foreground">AI Video Analysis</h2>
                </div>
                <p className="text-xs text-muted-foreground">Upload a short clip and get technique feedback</p>
            </div>

            {!videoUploaded ? (
                <button
                    onClick={() => setVideoUploaded(true)}
                    className="w-full aspect-video bg-muted rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-3 hover:border-purple-400 hover:bg-purple-50/30 transition-colors"
                >
                    <div className="w-16 h-16 bg-purple-100 text-purple-500 rounded-2xl flex items-center justify-center">
                        <VideoCamera size={32} weight="duotone" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-foreground">Tap to upload video</p>
                        <p className="text-[11px] text-muted-foreground">Max 30 seconds • MP4 or MOV</p>
                    </div>
                </button>
            ) : (
                <div className="space-y-4">
                    {/* Video Preview Mock */}
                    <div className="w-full aspect-video bg-gray-800 rounded-2xl flex items-center justify-center relative overflow-hidden">
                        <div className="text-center text-white">
                            <VideoCamera size={36} weight="duotone" className="mx-auto mb-2 text-white/60" />
                            <p className="text-xs font-medium">push_ups_form.mp4</p>
                            <p className="text-[10px] text-white/50">00:12 uploaded</p>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                            <div className="h-full bg-purple-400 w-full" />
                        </div>
                    </div>

                    {/* AI Analysis Results */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-3">
                            <Star size={16} weight="fill" className="text-amber-400" />
                            <span className="text-sm font-bold font-heading uppercase">Analysis Results</span>
                        </div>

                        <div className="space-y-3">
                            <div>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-muted-foreground">Form Score</span>
                                    <span className="font-bold font-data text-primary text-sm">8.5/10</span>
                                </div>
                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                                    <div className="h-full bg-tertiary rounded-full" style={{ width: '85%' }} />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-start gap-2 p-2.5 bg-green-50 rounded-xl">
                                    <CheckCircle size={14} weight="fill" className="text-green-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-green-800">Good elbow alignment during downward phase</p>
                                </div>
                                <div className="flex items-start gap-2 p-2.5 bg-green-50 rounded-xl">
                                    <CheckCircle size={14} weight="fill" className="text-green-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-green-800">Consistent rhythm and controlled movement</p>
                                </div>
                                <div className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-xl">
                                    <Target size={14} weight="fill" className="text-amber-500 flex-shrink-0 mt-0.5" />
                                    <p className="text-xs text-amber-800">Try to keep hips more aligned — slight sag detected</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <button onClick={onClose} className="w-full px-4 py-3 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90 transition-colors">
                Done
            </button>
        </div>
    );

    const renderSmartRunning = () => (
        <div className="space-y-5">
            <div>
                <div className="flex items-center gap-2 mb-1">
                    <Watch size={18} weight="bold" className="text-orange-500" />
                    <h2 className="text-lg font-black font-heading uppercase tracking-tight text-foreground">Smartwatch Sync</h2>
                </div>
                <p className="text-xs text-muted-foreground">Connect your watch for real-time tracking</p>
            </div>

            {!watchConnected ? (
                <div className="text-center py-6 space-y-4">
                    <div className="w-20 h-20 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mx-auto">
                        <Watch size={40} weight="duotone" />
                    </div>
                    <div>
                        <p className="text-sm font-bold text-foreground mb-1">Connect your device</p>
                        <p className="text-xs text-muted-foreground">Supports Apple Watch, Galaxy Watch, Garmin</p>
                    </div>
                    <button
                        onClick={() => setWatchConnected(true)}
                        className="mx-auto px-6 py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2"
                    >
                        <Bluetooth size={16} weight="bold" />
                        Pair Device
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Connected Status */}
                    <div className="flex items-center gap-2 p-2.5 bg-secondary/60 rounded-xl">
                        <CheckCircle size={16} weight="fill" className="text-tertiary" />
                        <span className="text-xs font-bold text-tertiary">Galaxy Watch 6 Connected</span>
                    </div>

                    {/* Live Stats Mock */}
                    <div className="bg-gray-900 rounded-2xl p-5 text-white">
                        <p className="text-[10px] uppercase tracking-wider text-white/50 mb-3">Live Tracking</p>
                        <div className="text-center mb-4">
                            <p className="text-4xl font-data font-bold">5:42</p>
                            <p className="text-xs text-white/50 mt-0.5">Current Pace (min/km)</p>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                            <div className="text-center">
                                <p className="text-lg font-data font-bold text-orange-400">3.2</p>
                                <p className="text-[10px] text-white/50">km</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-data font-bold text-red-400">156</p>
                                <p className="text-[10px] text-white/50">bpm</p>
                            </div>
                            <div className="text-center">
                                <p className="text-lg font-data font-bold text-green-400">245</p>
                                <p className="text-[10px] text-white/50">cal</p>
                            </div>
                        </div>
                    </div>

                    {/* Performance Zone */}
                    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                        <p className="text-xs font-bold font-heading uppercase mb-2">Performance Zone</p>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden flex">
                                <div className="h-full bg-blue-400" style={{ width: '20%' }} />
                                <div className="h-full bg-green-400" style={{ width: '30%' }} />
                                <div className="h-full bg-yellow-400" style={{ width: '25%' }} />
                                <div className="h-full bg-orange-400" style={{ width: '15%' }} />
                                <div className="h-full bg-red-400" style={{ width: '10%' }} />
                            </div>
                        </div>
                        <div className="flex justify-between text-[9px] text-muted-foreground">
                            <span>Easy</span>
                            <span>Fat Burn</span>
                            <span>Cardio</span>
                            <span>Peak</span>
                            <span>Max</span>
                        </div>
                        <p className="text-xs text-muted-foreground text-center mt-2">You're in the <strong className="text-orange-500">Cardio</strong> zone 🔥</p>
                    </div>
                </div>
            )}

            <button onClick={onClose} className="w-full px-4 py-3 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90 transition-colors">
                Done
            </button>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl max-h-[88vh] overflow-y-auto">
                {/* Header with back/close */}
                <div className="sticky top-0 bg-white rounded-t-2xl px-5 pt-4 pb-2 border-b border-gray-50 z-10">
                    <div className="flex items-center justify-between">
                        {step !== 'sport' ? (
                            <button onClick={handleBack} className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                                <ArrowLeft size={18} weight="bold" />
                                <span className="text-xs font-semibold">Back</span>
                            </button>
                        ) : <div />}
                        <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <X size={16} weight="bold" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="px-5 py-4">
                    {step === 'sport' && renderSportSelection()}
                    {step === 'mode' && renderModeSelection()}
                    {step === 'create' && renderCreateMatch()}
                    {step === 'matchmaking' && renderMatchmaking()}
                    {step === 'searching' && renderSearching()}
                    {step === 'found' && renderFound()}
                    {step === 'smart' && renderSmartFeature()}
                </div>
            </div>
        </div>
    );
}
