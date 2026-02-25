import { CloudSun, CloudRain, Sun, Wind, Drop, CalendarBlank, WarningCircle, ArrowLeft } from '@phosphor-icons/react';

interface ClimaProps {
  onNavigate?: (screen: string) => void;
}

export function Clima({ onNavigate }: ClimaProps) {
  const pronóstico = [
    { dia: 'Today', hora: '3:00 PM', temp: '18°', lluvia: '10%', icono: 'sun' },
    { dia: 'Today', hora: '6:00 PM', temp: '16°', lluvia: '20%', icono: 'cloud' },
    { dia: 'Tomorrow', hora: '10:00 AM', temp: '17°', lluvia: '45%', icono: 'cloud' },
    { dia: 'Tomorrow', hora: '3:00 PM', temp: '19°', lluvia: '65%', icono: 'rain' },
    { dia: 'Day after', hora: '10:00 AM', temp: '15°', lluvia: '80%', icono: 'rain' },
    { dia: 'Day after', hora: '3:00 PM', temp: '16°', lluvia: '55%', icono: 'rain' },
  ];

  const getIcono = (tipo: string) => {
    switch (tipo) {
      case 'sun': return <Sun size={24} weight="duotone" className="text-amber-400" />;
      case 'cloud': return <CloudSun size={24} weight="duotone" className="text-gray-400" />;
      case 'rain': return <CloudRain size={24} weight="duotone" className="text-blue-400" />;
      default: return <CloudSun size={24} weight="duotone" className="text-gray-400" />;
    }
  };

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
        <p className="text-sm font-medium text-white/70">Plan your activities ☀️</p>
        <h1 className="text-2xl font-black font-heading uppercase tracking-tight">Weather</h1>

        {/* Current Weather */}
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-xs text-white/60">Now in Bogotá</p>
            <p className="text-5xl font-data font-bold">17°C</p>
          </div>
          <Sun size={64} weight="duotone" className="text-amber-300/80" />
        </div>

        {/* Quick Stats */}
        <div className="flex gap-3 mt-4">
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 flex-1">
            <Drop size={16} weight="fill" className="text-blue-300" />
            <div>
              <p className="text-[10px] text-white/60">Rain</p>
              <p className="text-xs font-bold">15%</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 flex-1">
            <Wind size={16} weight="bold" className="text-white/70" />
            <div>
              <p className="text-[10px] text-white/60">Wind</p>
              <p className="text-xs font-bold">12 km/h</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2 flex-1">
            <CloudSun size={16} weight="duotone" className="text-white/70" />
            <div>
              <p className="text-[10px] text-white/60">Clouds</p>
              <p className="text-xs font-bold">40%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Weather Alert */}
      <div className="px-5">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2.5">
          <WarningCircle size={20} weight="fill" className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-amber-800 mb-0.5">Weather alert</p>
            <p className="text-xs text-amber-700">Rain probability increasing in the next hours. Consider indoor activities.</p>
          </div>
        </div>
      </div>

      {/* Hourly Forecast */}
      <div className="px-5">
        <h2 className="text-sm font-bold font-heading uppercase tracking-tight mb-3">Hourly Forecast</h2>
        <div className="space-y-2">
          {pronóstico.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl p-3 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-xl flex items-center justify-center">
                  {getIcono(item.icono)}
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">{item.dia}</p>
                  <p className="text-[11px] text-muted-foreground">{item.hora}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm font-bold font-data text-primary">{item.temp}</p>
                </div>
                <div className="text-right min-w-[40px]">
                  <p className={`text-sm font-bold font-data ${parseInt(item.lluvia) > 50 ? 'text-blue-500' : 'text-muted-foreground'}`}>{item.lluvia}</p>
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
                    <div className="h-full bg-tertiary rounded-full" style={{ width: item.lluvia }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Best Times */}
      <div className="px-5">
        <h3 className="text-sm font-bold font-heading uppercase tracking-tight mb-3 flex items-center gap-2">
          <CalendarBlank size={16} weight="bold" className="text-tertiary" />
          Best times to play
        </h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-3 bg-secondary/40 rounded-2xl border border-secondary">
            <div>
              <p className="text-xs font-bold text-foreground">Today 3:00 PM - 5:00 PM</p>
              <p className="text-[11px] text-muted-foreground">Low chance of rain</p>
            </div>
            <Sun size={22} weight="duotone" className="text-amber-400" />
          </div>
          <div className="flex items-center justify-between p-3 bg-secondary/40 rounded-2xl border border-secondary">
            <div>
              <p className="text-xs font-bold text-foreground">Tomorrow 9:00 AM - 11:00 AM</p>
              <p className="text-[11px] text-muted-foreground">Clear weather</p>
            </div>
            <Sun size={22} weight="duotone" className="text-amber-400" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-2 pb-2">
        <p className="text-[11px] text-muted-foreground">Updated 15 minutes ago</p>
      </div>
    </div>
  );
}
