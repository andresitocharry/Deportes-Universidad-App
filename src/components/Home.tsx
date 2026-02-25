import { useState, useEffect } from 'react';
import { Trophy, Clock, UsersThree, CloudSun, Pulse, CalendarBlank, CaretRight, Fire, TrendUp } from '@phosphor-icons/react';
import { AgendarPartido } from './AgendarPartido';

interface HomeProps {
  onNavigate: (screen: string) => void;
  fabTrigger?: number;
}

export function Home({ onNavigate, fabTrigger }: HomeProps) {
  const [showAgendar, setShowAgendar] = useState(false);

  useEffect(() => {
    if (fabTrigger && fabTrigger > 0) setShowAgendar(true);
  }, [fabTrigger]);

  return (
    <>
      <div className="pb-28 space-y-5">
        {/* Hero / Welcome Banner */}
        <div className="bg-gradient-to-br from-primary to-primary/80 text-white px-5 pt-6 pb-8 rounded-b-3xl">
          <p className="text-sm font-medium text-white/70 mb-1">Buenos días 👋</p>
          <h1 className="text-2xl font-black font-heading uppercase tracking-tight">
            UniAndes Sports
          </h1>
          <p className="text-sm text-white/80 mt-1">Stay active, stay connected</p>

          {/* Stats Row */}
          <div className="flex gap-4 mt-5">
            <StatPill icon={Fire} label="Streak" value="7 days" />
            <StatPill icon={TrendUp} label="This week" value="3 activities" />
          </div>
        </div>

        {/* Quick Access Horizontal Scroll */}
        <div className="px-5">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
            <QuickChip icon={CloudSun} label="24° Cloudy" onClick={() => onNavigate('clima')} />
            <QuickChip icon={Pulse} label="Strava" onClick={() => onNavigate('strava')} />
            <QuickChip icon={Clock} label="History" onClick={() => onNavigate('historial')} />
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
    </>
  );
}

// --- Sub-components ---

function StatPill({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5 flex-1">
      <Icon size={20} weight="fill" className="text-secondary" />
      <div>
        <p className="text-[10px] uppercase tracking-wider text-white/60 font-medium">{label}</p>
        <p className="text-sm font-bold font-data">{value}</p>
      </div>
    </div>
  );
}

function QuickChip({ icon: Icon, label, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-secondary/60 text-primary rounded-full px-4 py-2.5 whitespace-nowrap border border-secondary hover:bg-secondary transition-colors flex-shrink-0"
    >
      <Icon size={18} weight="duotone" />
      <span className="text-xs font-semibold">{label}</span>
    </button>
  );
}

function SectionHeader({ title, action, onAction }: { title: string; action?: string; onAction?: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-base font-bold font-heading text-foreground uppercase tracking-tight">{title}</h2>
      {action && (
        <button onClick={onAction} className="text-xs font-semibold text-tertiary flex items-center gap-0.5 hover:underline">
          {action}
          <CaretRight size={12} weight="bold" />
        </button>
      )}
    </div>
  );
}

function ChallengeCard({ title, daysLeft, progress, participants }: any) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-sm font-bold font-heading text-foreground leading-tight mb-1">{title}</h3>
          <p className="text-xs font-medium text-muted-foreground">{daysLeft} days remaining</p>
        </div>
        <div className="text-2xl font-data text-primary">
          {progress}%
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
        <div
          className="h-full bg-tertiary rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center gap-2">
        <div className="flex -space-x-1.5">
          {[1, 2, 3].map(i => (
            <div key={i} className="w-5 h-5 rounded-full bg-gray-200 border-2 border-white" />
          ))}
        </div>
        <p className="text-[11px] font-medium text-muted-foreground">+{participants} participants</p>
      </div>
    </div>
  );
}

function EventCard({ title, time, location }: any) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center gap-3">
      <div className="w-11 h-11 bg-secondary text-primary rounded-xl flex items-center justify-center flex-shrink-0">
        <CalendarBlank size={22} weight="bold" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold font-heading text-foreground truncate">{title}</p>
        <p className="text-xs font-medium text-muted-foreground mt-0.5">{time}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">{location}</p>
      </div>
      <div className="w-7 h-7 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
        <CaretRight size={14} weight="bold" />
      </div>
    </div>
  );
}