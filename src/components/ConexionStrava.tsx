import { useState } from 'react';
import { Lightning, Check, X, TrendUp, Medal, CalendarBlank, ArrowLeft, Info } from '@phosphor-icons/react';

interface StravaProps {
  onNavigate?: (screen: string) => void;
}

export function ConexionStrava({ onNavigate }: StravaProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [showConnect, setShowConnect] = useState(false);

  const actividadesStrava = [
    { id: 1, tipo: 'Running', distancia: '5.2 km', fecha: 'Jan 28, 2026', tiempo: '28:15' },
    { id: 2, tipo: 'Cycling', distancia: '15.8 km', fecha: 'Jan 26, 2026', tiempo: '45:30' },
    { id: 3, tipo: 'Running', distancia: '3.5 km', fecha: 'Jan 24, 2026', tiempo: '18:42' },
  ];

  return (
    <div className="pb-4 space-y-5">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-primary to-primary/80 text-white px-5 pt-5 pb-8 rounded-b-3xl">
        {onNavigate && (
          <button onClick={() => onNavigate('home')} className="flex items-center gap-1.5 text-white/70 mb-3 hover:text-white transition-colors">
            <ArrowLeft size={18} weight="bold" />
            <span className="text-xs font-semibold">Back</span>
          </button>
        )}
        <p className="text-sm font-medium text-white/70">Sync your activities ⚡</p>
        <h1 className="text-2xl font-black font-heading uppercase tracking-tight">Strava</h1>
        <p className="text-sm text-white/80 mt-1">Connect and track your progress</p>
      </div>

      {/* Connection Card */}
      <div className="px-5">
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 bg-secondary text-primary rounded-xl flex items-center justify-center">
              <Lightning size={28} weight="fill" />
            </div>
            <div>
              <h3 className="text-base font-bold font-heading text-foreground">Strava</h3>
              <p className="text-xs text-muted-foreground">Activity tracking app</p>
            </div>
          </div>

          {isConnected ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 p-2.5 bg-secondary/60 rounded-xl">
                <Check size={16} weight="bold" className="text-tertiary" />
                <span className="text-xs font-bold text-tertiary">Successfully connected</span>
              </div>
              <button onClick={() => setIsConnected(false)} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-muted-foreground hover:bg-gray-50 transition-colors">
                Disconnect
              </button>
            </div>
          ) : (
            <button onClick={() => setShowConnect(true)} className="w-full px-4 py-3 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90 transition-colors">
              Connect with Strava
            </button>
          )}
        </div>
      </div>

      {/* Benefits (if not connected) */}
      {!isConnected && (
        <div className="px-5">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold font-heading uppercase mb-3">Benefits</h3>
            <div className="space-y-2.5">
              {[
                'Automatic synchronization of sports activities',
                'Automatic distance logging for challenges',
                'Detailed performance statistics',
                'Share achievements with university community',
              ].map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 bg-secondary text-tertiary rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check size={12} weight="bold" />
                  </div>
                  <p className="text-xs text-muted-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Activities (if connected) */}
      {isConnected && (
        <div className="px-5">
          <h2 className="text-sm font-bold font-heading uppercase tracking-tight mb-3">Recent Activities</h2>
          <div className="space-y-2">
            {actividadesStrava.map(act => (
              <div key={act.id} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Lightning size={16} weight="fill" className="text-tertiary" />
                    <h3 className="text-sm font-bold font-heading">{act.tipo}</h3>
                  </div>
                  <span className="text-[11px] text-muted-foreground">{act.fecha}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Distance</p>
                    <p className="text-sm font-bold font-data text-primary">{act.distancia}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Time</p>
                    <p className="text-sm font-bold font-data text-primary">{act.tiempo}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Monthly Summary (if connected) */}
      {isConnected && (
        <div className="px-5">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold font-heading uppercase mb-3">Monthly Summary</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: TrendUp, value: '24.5', label: 'total km' },
                { icon: CalendarBlank, value: '8', label: 'activities' },
                { icon: Medal, value: '3', label: 'achievements' },
              ].map(({ icon: Icon, value, label }) => (
                <div key={label} className="text-center">
                  <div className="w-10 h-10 bg-secondary text-primary rounded-xl flex items-center justify-center mx-auto mb-1.5">
                    <Icon size={20} weight="duotone" />
                  </div>
                  <p className="text-lg font-bold font-data text-primary">{value}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Other Apps */}
      <div className="px-5">
        <h2 className="text-sm font-bold font-heading uppercase tracking-tight mb-3">Other Apps</h2>
        <div className="space-y-2">
          {['Garmin Connect', 'Nike Run Club', 'MapMyRun'].map(app => (
            <div key={app} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  <Lightning size={20} weight="duotone" className="text-muted-foreground" />
                </div>
                <span className="text-sm font-medium">{app}</span>
              </div>
              <button className="px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary/60 text-primary border border-secondary hover:bg-secondary transition-colors">
                Connect
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy */}
      <div className="px-5 pb-2">
        <div className="bg-muted rounded-2xl p-3 flex items-start gap-2.5">
          <Info size={18} weight="fill" className="text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-foreground mb-0.5">Privacy</p>
            <p className="text-[11px] text-muted-foreground">We only sync public sports activity data. We don't share personal information without your consent.</p>
          </div>
        </div>
      </div>

      {/* Connect Modal */}
      {showConnect && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-5 z-[100]">
          <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-bold font-heading uppercase">Connect Strava</h3>
              <button onClick={() => setShowConnect(false)} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <X size={18} weight="bold" />
              </button>
            </div>

            <div className="bg-secondary/40 rounded-2xl p-5 mb-4 text-center">
              <div className="w-16 h-16 bg-secondary text-primary rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Lightning size={32} weight="fill" />
              </div>
              <p className="text-sm font-bold text-foreground mb-1">Authorize UniAndes Sports</p>
              <p className="text-xs text-muted-foreground">This app will access your public Strava activities</p>
            </div>

            <div className="space-y-2 mb-4">
              {[
                { icon: Check, text: 'View activities and statistics', ok: true },
                { icon: Check, text: 'Sync distances for challenges', ok: true },
                { icon: X, text: 'Cannot post on your behalf', ok: false },
              ].map(({ icon: Icon, text, ok }) => (
                <div key={text} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Icon size={14} weight="bold" className={`flex-shrink-0 mt-0.5 ${ok ? 'text-tertiary' : 'text-red-400'}`} />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button onClick={() => setShowConnect(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-muted-foreground hover:bg-gray-50">Cancel</button>
              <button onClick={() => { setIsConnected(true); setShowConnect(false); }} className="flex-1 px-4 py-2.5 rounded-xl bg-tertiary text-white text-sm font-semibold hover:bg-tertiary/90">Authorize</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
