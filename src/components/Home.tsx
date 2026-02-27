import { useState, useEffect } from 'react';
import {
  Trophy, Clock, UsersThree, CloudSun, Pulse, CalendarBlank, CaretRight,
  Fire, TrendUp, Lightning, PersonSimpleRun, Barbell, SoccerBall,
  UserCircle, Timer, MapPin, DiceFive, X
} from '@phosphor-icons/react';
import { AgendarPartido } from './AgendarPartido';

interface HomeProps {
  onNavigate: (screen: string) => void;
  fabTrigger?: number;
  diceTrigger?: number;
}

export function Home({ onNavigate, fabTrigger, diceTrigger }: HomeProps) {
  const [showAgendar, setShowAgendar] = useState(false);
  const [showDice, setShowDice] = useState(false);
  const [randomAct, setRandomAct] = useState(0);

  useEffect(() => {
    if (fabTrigger && fabTrigger > 0) setShowAgendar(true);
  }, [fabTrigger]);

  useEffect(() => {
    if (diceTrigger && diceTrigger > 0) {
      setRandomAct(Math.floor(Math.random() * 3));
      setShowDice(true);
    }
  }, [diceTrigger]);

  return (
    <>
      <div className="pb-28 space-y-5">
        {/* Stats Section */}
        <div className="px-5 pt-2">
          <div className="flex gap-3">
            <StatPill icon={Fire} label="Streak" value="7 DAYS" iconColor="text-orange-500" iconBg="bg-orange-50" />
            <StatPill icon={TrendUp} label="This week" value="3 ACTS" iconColor="text-emerald-500" iconBg="bg-emerald-50" />
          </div>
        </div>

        {/* Quick Access Horizontal Scroll */}
        <div className="px-5">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            <QuickChip icon={CloudSun} label="24° Cloudy" onClick={() => onNavigate('clima')} />
            <QuickChip icon={Pulse} label="Strava" onClick={() => onNavigate('strava')} />
            <QuickChip icon={Clock} label="History" onClick={() => onNavigate('historial')} />
            <QuickChip icon={Trophy} label="Tournaments" onClick={() => onNavigate('torneos')} />
          </div>
        </div>

        {/* Quick Activity — AI Recommendations (FS-06, PAS S9) */}
        <div className="px-5">
          <SectionHeader title="Quick Activity" />
          <p className="text-xs text-muted-foreground mt-1 mb-3">Based on your profile and schedule</p>
          <div className="space-y-2">
            <QuickActivityCard
              icon={PersonSimpleRun}
              title="30-min Interval Run"
              subtitle="Campus Track • 400m away"
              time="30 min"
              tag="Matches your running goal"
              color="bg-emerald-50 text-emerald-700"
              iconColor="text-emerald-600"
            />
            <QuickActivityCard
              icon={Barbell}
              title="Calisthenics Challenge"
              subtitle="Trending in your community"
              time="20 min"
              tag="12 participants today"
              color="bg-amber-50 text-amber-700"
              iconColor="text-amber-600"
            />
            <QuickActivityCard
              icon={SoccerBall}
              title="5v5 Soccer – 1 spot left!"
              subtitle="La Caneca • Starts in 10 min"
              time="45 min"
              tag="Join now"
              color="bg-blue-50 text-blue-700"
              iconColor="text-blue-600"
              highlight
            />
          </div>
        </div>

        {/* Active Challenges */}
        <div className="px-5">
          <SectionHeader title="Active Challenges" action="View all" onAction={() => onNavigate('retos')} />
          <div className="space-y-3 mt-3">
            <ChallengeCard
              title="100K Running Challenge"
              daysLeft={15}
              progress={35}
              participants={45}
            />
            <ChallengeCard
              title="30-Day Push-ups"
              daysLeft={22}
              progress={42}
              participants={67}
            />
          </div>
        </div>

        {/* Recommended for You — Community events */}
        <div className="px-5">
          <SectionHeader title="Recommended for You" action="See more" onAction={() => onNavigate('comunidades')} />
          <div className="flex gap-3 overflow-x-auto no-scrollbar mt-3 pb-1">
            <RecommendedCard
              sport="Tennis"
              title="Doubles Tournament"
              community="UniAndes Racquets"
              spots={6}
              date="Sat, Mar 1"
            />
            <RecommendedCard
              sport="Running"
              title="5K Night Run"
              community="Running UniAndes"
              spots={18}
              date="Fri, Feb 28"
            />
            <RecommendedCard
              sport="Soccer"
              title="Copa Turing 2026"
              community="UniAndes Football"
              spots={4}
              date="Mon, Mar 3"
            />
          </div>
        </div>

        {/* Upcoming Matches */}
        <div className="px-5">
          <SectionHeader title="Upcoming Matches" />
          <div className="space-y-3 mt-3">
            <EventCard
              title="5v5 Soccer"
              time="Today 3:00 PM"
              location="UniAndes Courts"
            />
            <EventCard
              title="Tennis Doubles"
              time="Tomorrow 10:00 AM"
              location="El Nogal Club"
            />
          </div>
        </div>
      </div>

      {/* Match Scheduling Wizard */}
      <AgendarPartido open={showAgendar} onClose={() => setShowAgendar(false)} />

      {/* Quick Activity Modal / Sorpréndeme */}
      {showDice && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-5" onClick={() => setShowDice(false)}>
          <div className="bg-white dark:bg-gray-900 rounded-3xl w-full max-w-[320px] p-6 shadow-2xl relative overflow-hidden animate-[scaleIn_0.2s_ease-out]" onClick={(e) => e.stopPropagation()}>
            {/* Decorative background */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-tertiary/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <button onClick={() => setShowDice(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 hover:text-gray-800 dark:hover:text-white transition-colors z-[60] cursor-pointer outline-none">
              <X size={16} weight="bold" />
            </button>

            <div className="text-center relative z-10 pt-2 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-tertiary to-teal-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-tertiary/30">
                <DiceFive size={36} weight="fill" />
              </div>
              <h3 className="text-xl font-black font-heading tracking-tight dark:text-white uppercase mb-1">Tu Actividad</h3>
              <p className="text-xs font-medium text-muted-foreground dark:text-gray-400">Recomendación instantánea</p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/80 rounded-2xl p-4 mb-6 border border-gray-100 dark:border-gray-700 relative z-10">
              {randomAct === 0 && (
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-3">
                    <PersonSimpleRun size={28} weight="duotone" />
                  </div>
                  <h4 className="text-base font-bold dark:text-white">30-min Interval Run</h4>
                  <p className="text-xs text-muted-foreground mt-1">Campus Track • Matches your goals</p>
                </div>
              )}
              {randomAct === 1 && (
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mb-3">
                    <Barbell size={28} weight="duotone" />
                  </div>
                  <h4 className="text-base font-bold dark:text-white">Calisthenics Challenge</h4>
                  <p className="text-xs text-muted-foreground mt-1">12 participants today • Trending</p>
                </div>
              )}
              {randomAct === 2 && (
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-3">
                    <SoccerBall size={28} weight="duotone" />
                  </div>
                  <h4 className="text-base font-bold dark:text-white">5v5 Soccer</h4>
                  <p className="text-xs text-muted-foreground mt-1">La Caneca • Starts in 10 mins! 🏃</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 relative z-10">
              <button onClick={() => setRandomAct(Math.floor(Math.random() * 3))} className="flex-1 py-3 rounded-xl border-2 border-tertiary text-tertiary font-bold text-sm hover:bg-tertiary/5 transition-all outline-none">
                Tirar Dado
              </button>
              <button onClick={() => { setShowDice(false); onNavigate('play'); }} className="flex-1 py-3 rounded-xl bg-tertiary text-white font-bold text-sm shadow-md shadow-tertiary/30 hover:bg-tertiary/90 transition-all outline-none">
                ¡Vamos!
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// --- Sub-components ---

function StatPill({ icon: Icon, label, value, iconColor = "text-primary dark:text-gray-100", iconBg = "bg-primary/10 dark:bg-gray-800" }: any) {
  return (
    <div className="flex-1 bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col justify-between hover:shadow-md active:scale-[0.98] transition-all">
      <div className="flex items-center gap-2 mb-1">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center ${iconBg} ${iconColor}`}>
          <Icon size={14} weight="fill" />
        </div>
        <p className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground dark:text-gray-400">{label}</p>
      </div>
      <p className="text-2xl font-black font-data tracking-wide text-foreground dark:text-white mt-1">{value}</p>
    </div>
  );
}

function QuickChip({ icon: Icon, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-secondary/60 dark:bg-gray-800 text-primary dark:text-gray-200 rounded-full px-4 py-2.5 whitespace-nowrap border border-secondary dark:border-gray-700 hover:bg-secondary dark:hover:bg-gray-700 transition-colors flex-shrink-0"
    >
      <Icon size={18} weight="duotone" />
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}

function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-base font-bold font-heading text-foreground dark:text-white uppercase tracking-tight">{title}</h2>
      {action && (
        <button onClick={onAction} className="text-xs font-semibold text-tertiary dark:text-tertiary/90 flex items-center gap-0.5 hover:underline">
          {action}
          <CaretRight size={12} weight="bold" />
        </button>
      )}
    </div>
  );
}

function QuickActivityCard({ icon: Icon, title, subtitle, time, tag, color, iconColor, highlight }: any) {
  return (
    <div className={`rounded-2xl p-3.5 border transition-all active:scale-[0.98] cursor-pointer ${highlight
      ? 'bg-tertiary/5 dark:bg-tertiary/10 border-tertiary/30 dark:border-tertiary/50 shadow-sm shadow-tertiary/10'
      : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 shadow-sm'
      }`}>
      <div className="flex items-center gap-3">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${highlight ? 'bg-tertiary/10 dark:bg-tertiary/20' : 'bg-muted dark:bg-gray-700'}`}>
          <Icon size={22} weight="duotone" className={highlight ? 'text-tertiary dark:text-tertiary/90' : iconColor} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold font-heading text-foreground dark:text-white leading-tight mb-0.5">{title}</h3>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground dark:text-gray-400">
            <MapPin size={11} weight="bold" />
            <span>{subtitle}</span>
          </div>
        </div>
        <div className="flex flex-col items-end flex-shrink-0 gap-1">
          <div className="flex items-center gap-1 text-[11px] text-muted-foreground dark:text-gray-400">
            <Timer size={11} weight="bold" />
            <span className="font-medium">{time}</span>
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${highlight ? 'bg-tertiary/15 text-tertiary dark:bg-tertiary/20 dark:text-tertiary/90' : color}`}>
            {tag}
          </span>
        </div>
      </div>
    </div>
  );
}

function RecommendedCard({ sport, title, community, spots, date }: any) {
  return (
    <div className="min-w-[200px] bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex-shrink-0">
      <span className="text-[10px] px-2 py-0.5 bg-secondary dark:bg-gray-700 text-primary dark:text-tertiary rounded-full font-semibold">{sport}</span>
      <h3 className="text-sm font-bold font-heading text-foreground dark:text-white mt-2 leading-tight">{title}</h3>
      <p className="text-[11px] text-muted-foreground dark:text-gray-400 mt-1">{community}</p>
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1 text-[11px] text-muted-foreground dark:text-gray-400">
          <CalendarBlank size={12} weight="duotone" className="text-tertiary dark:text-tertiary/90" />
          <span>{date}</span>
        </div>
        <span className="text-[11px] font-semibold text-tertiary dark:text-tertiary/90">{spots} spots</span>
      </div>
    </div>
  );
}

function ChallengeCard({ title, daysLeft, progress, participants }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold font-heading text-foreground dark:text-white leading-tight mb-1">{title}</h3>
          <p className="text-xs font-medium text-muted-foreground dark:text-gray-400">{daysLeft} days remaining</p>
        </div>
        <div className="text-2xl font-data text-primary dark:text-tertiary">
          {progress}%
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-tertiary rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex -space-x-1.5">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-600 border-2 border-white dark:border-gray-800" />
          ))}
        </div>
        <p className="text-[11px] font-medium text-muted-foreground dark:text-gray-400">+{participants} participants</p>
      </div>
    </div>
  );
}

function EventCard({ title, time, location }: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-3">
      <div className="w-11 h-11 bg-secondary dark:bg-gray-700 text-primary dark:text-tertiary rounded-xl flex items-center justify-center flex-shrink-0">
        <CalendarBlank size={22} weight="bold" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold font-heading text-foreground dark:text-white truncate">{title}</p>
        <p className="text-xs font-medium text-muted-foreground dark:text-gray-300 mt-0.5">{time}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{location}</p>
      </div>
      <div className="w-7 h-7 rounded-full bg-gray-50 dark:bg-gray-700 flex items-center justify-center text-gray-400 dark:text-gray-500">
        <CaretRight size={14} weight="bold" />
      </div>
    </div>
  );
}