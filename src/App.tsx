import { useState } from 'react';
import { Home } from './components/Home';
import { RetosComunidad } from './components/RetosComunidad';
import { MapaUbicaciones } from './components/MapaUbicaciones';
import { Comunidades } from './components/Comunidades';
import { Profesores } from './components/Profesores';
import { Clima } from './components/Clima';
import { ConexionStrava } from './components/ConexionStrava';
import { HistorialPartidos } from './components/HistorialPartidos';
import { House, Trophy, MapTrifold, UsersThree, Student, Plus } from '@phosphor-icons/react';

type Screen = 'home' | 'retos' | 'mapa' | 'clima' | 'comunidades' | 'strava' | 'historial' | 'profesores';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [fabTrigger, setFabTrigger] = useState(0);

  const navigate = (s: string) => {
    setFabTrigger(0);
    setCurrentScreen(s as Screen);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home onNavigate={navigate} fabTrigger={fabTrigger} />;
      case 'retos':
        return <RetosComunidad onNavigate={navigate} fabTrigger={fabTrigger} />;
      case 'mapa':
        return <MapaUbicaciones onNavigate={navigate} fabTrigger={fabTrigger} />;
      case 'comunidades':
        return <Comunidades onNavigate={navigate} fabTrigger={fabTrigger} />;
      case 'profesores':
        return <Profesores onNavigate={navigate} fabTrigger={fabTrigger} />;
      case 'clima':
        return <Clima onNavigate={navigate} />;
      case 'strava':
        return <ConexionStrava onNavigate={navigate} />;
      case 'historial':
        return <HistorialPartidos onNavigate={navigate} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-body text-foreground flex justify-center">
      {/* Mobile Shell */}
      <div className="w-full max-w-md bg-white h-screen flex flex-col relative shadow-2xl">
        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto pb-2">
          {renderScreen()}
        </div>

        {/* FAB — Android Material Design Style */}
        <button
          className="absolute bottom-24 right-6 w-14 h-14 bg-tertiary text-white rounded-2xl shadow-lg shadow-tertiary/40 flex items-center justify-center hover:bg-tertiary/90 active:scale-95 transition-all duration-200 z-50"
          onClick={() => setFabTrigger(t => t + 1)}
        >
          <Plus size={28} weight="bold" />
        </button>

        {/* Bottom Navigation Bar */}
        <nav className="shrink-0 bg-white border-t border-gray-200 pb-5 pt-2 z-50">
          <div className="flex justify-around items-center">
            <NavButton active={currentScreen === 'home'} onClick={() => navigate('home')} icon={House} label="Home" />
            <NavButton active={currentScreen === 'retos'} onClick={() => navigate('retos')} icon={Trophy} label="Retos" />
            <NavButton active={currentScreen === 'mapa'} onClick={() => navigate('mapa')} icon={MapTrifold} label="Mapa" />
            <NavButton active={currentScreen === 'comunidades'} onClick={() => navigate('comunidades')} icon={UsersThree} label="Social" />
            <NavButton active={currentScreen === 'profesores'} onClick={() => navigate('profesores')} icon={Student} label="Profes" />
          </div>
        </nav>
      </div>
    </div>
  );
}

// Bottom Nav Button
function NavButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: any; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px] ${active
        ? 'text-primary'
        : 'text-gray-400 hover:text-gray-600'
        }`}
    >
      <div className={`p-1 rounded-full transition-all duration-200 ${active ? 'bg-secondary' : ''}`}>
        <Icon size={24} weight={active ? "fill" : "regular"} />
      </div>
      <span className={`text-[10px] tracking-wide ${active ? 'font-bold' : 'font-medium'}`}>
        {label}
      </span>
    </button>
  );
}