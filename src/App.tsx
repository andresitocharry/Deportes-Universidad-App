import { useState, useRef, useCallback, useEffect } from 'react';
import { Home } from './components/Home';
import { RetosComunidad } from './components/RetosComunidad';
import { Play } from './components/Play';
import { Comunidades } from './components/Comunidades';
import { Profesores } from './components/Profesores';
import { Clima } from './components/Clima';
import { ConexionStrava } from './components/ConexionStrava';
import { HistorialPartidos } from './components/HistorialPartidos';
import { PerfilUsuario } from './components/PerfilUsuario';
import { Torneos } from './components/Torneos';
import {
  House, Trophy, PersonSimpleRun, UsersThree, Student, Plus,
  Bell, MagnifyingGlass, UserCircle, Sliders, CalendarBlank,
  SoccerBall, Basketball, TennisBall, Barbell, Handshake, Target, GameController,
  Moon, Sun
} from '@phosphor-icons/react';

type Screen = 'home' | 'retos' | 'play' | 'clima' | 'comunidades' | 'strava' | 'historial' | 'profesores' | 'perfil' | 'torneos';

// Main tab order for swipe navigation
const TAB_ORDER: Screen[] = ['home', 'retos', 'play', 'comunidades', 'profesores'];

const playIcons = [PersonSimpleRun, SoccerBall, Basketball, Handshake, TennisBall, Target, Barbell, GameController];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [fabTrigger, setFabTrigger] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [playIconIndex, setPlayIconIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isFabVisible, setIsFabVisible] = useState(true);
  const lastScrollY = useRef(0);

  // Rotate play icon every 12 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setPlayIconIndex((prev) => (prev + 1) % playIcons.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const CurrentPlayIcon = playIcons[playIconIndex];

  // Swipe tracking
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const getTabIndex = (screen: Screen) => TAB_ORDER.indexOf(screen);

  const navigateWithAnimation = useCallback((target: Screen, direction?: 'left' | 'right') => {
    if (isAnimating) return;

    // Auto-detect direction if not provided
    if (!direction) {
      const currentIdx = getTabIndex(currentScreen);
      const targetIdx = getTabIndex(target);
      if (currentIdx >= 0 && targetIdx >= 0) {
        direction = targetIdx > currentIdx ? 'left' : 'right';
      } else {
        direction = 'left';
      }
    }

    setIsAnimating(true);
    setSlideDirection(direction);

    // After exit animation, switch screen and play enter animation
    setTimeout(() => {
      setFabTrigger(0);
      setCurrentScreen(target);
      setSlideDirection(direction === 'left' ? 'enter-left' as any : 'enter-right' as any);

      setTimeout(() => {
        setSlideDirection(null);
        setIsAnimating(false);
      }, 200);
    }, 150);
  }, [currentScreen, isAnimating]);

  const navigate = (s: string) => {
    const target = s as Screen;
    if (target === currentScreen) return;
    navigateWithAnimation(target);
  };

  // Scroll handler for FAB
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollY = e.currentTarget.scrollTop;
    if (currentScrollY > lastScrollY.current + 10) {
      setIsFabVisible(false);
    } else if (currentScrollY < lastScrollY.current - 10) {
      setIsFabVisible(true);
    }
    lastScrollY.current = currentScrollY;
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only trigger swipe if horizontal movement is dominant and > 60px
    if (Math.abs(deltaX) < 60 || Math.abs(deltaY) > Math.abs(deltaX)) return;

    const currentIdx = getTabIndex(currentScreen);
    if (currentIdx < 0) return; // Not a main tab, don't swipe

    if (deltaX < 0 && currentIdx < TAB_ORDER.length - 1) {
      // Swipe left → next tab
      navigateWithAnimation(TAB_ORDER[currentIdx + 1], 'left');
    } else if (deltaX > 0 && currentIdx > 0) {
      // Swipe right → previous tab
      navigateWithAnimation(TAB_ORDER[currentIdx - 1], 'right');
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <Home onNavigate={navigate} fabTrigger={fabTrigger} />;
      case 'retos':
        return <RetosComunidad onNavigate={navigate} fabTrigger={fabTrigger} />;
      case 'play':
        return <Play onNavigate={navigate} fabTrigger={fabTrigger} />;
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
      case 'perfil':
        return <PerfilUsuario onNavigate={navigate} isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />;
      case 'torneos':
        return <Torneos onNavigate={navigate} />;
      default:
        return <Home onNavigate={navigate} />;
    }
  };

  // Slide animation class
  const getSlideClass = () => {
    switch (slideDirection) {
      case 'left':
        return 'animate-slide-out-left';
      case 'right':
        return 'animate-slide-out-right';
      case 'enter-left' as any:
        return 'animate-slide-in-left';
      case 'enter-right' as any:
        return 'animate-slide-in-right';
      default:
        return '';
    }
  };

  // Top bar config per screen
  const topBarConfig: Record<string, { title: string; subtitle?: string; actions: Array<{ icon: any; onClick: () => void; badge?: number }> }> = {
    home: {
      title: 'Buenos días 👋',
      subtitle: 'UNIANDES SPORTS',
      actions: [
        { icon: UserCircle, onClick: () => navigate('perfil') },
        { icon: Bell, onClick: () => { }, badge: 3 },
      ],
    },
    retos: {
      title: 'Retos',
      subtitle: 'COMPITE Y MEJORA',
      actions: [
        { icon: MagnifyingGlass, onClick: () => { } },
        { icon: CalendarBlank, onClick: () => navigate('historial') },
      ],
    },
    play: {
      title: 'Play',
      subtitle: 'ENCUENTRA PARTIDO',
      actions: [
        { icon: MagnifyingGlass, onClick: () => { } },
        { icon: Sliders, onClick: () => { } },
      ],
    },
    comunidades: {
      title: 'Social',
      subtitle: 'TU RED DEPORTIVA',
      actions: [
        { icon: MagnifyingGlass, onClick: () => { } },
        { icon: Bell, onClick: () => { }, badge: 5 },
      ],
    },
    profesores: {
      title: 'Profesores',
      subtitle: 'APRENDE CON EXPERTOS',
      actions: [
        { icon: MagnifyingGlass, onClick: () => { } },
        { icon: Sliders, onClick: () => { } },
      ],
    },
    clima: {
      title: 'Weather',
      actions: [],
    },
    strava: {
      title: 'Strava',
      actions: [],
    },
    historial: {
      title: 'History',
      actions: [],
    },
    perfil: {
      title: 'Perfil de Usuario',
      subtitle: 'MI CUENTA',
      actions: [],
    },
    torneos: {
      title: 'Torneos',
      subtitle: 'COMPETICIONES',
      actions: [
        { icon: MagnifyingGlass, onClick: () => { } },
      ],
    },
  };

  const config = topBarConfig[currentScreen] || topBarConfig.home;

  return (
    <div className={`min-h-screen font-body flex justify-center ${isDarkMode ? 'dark bg-gray-900 text-gray-100' : 'bg-gray-50 text-foreground'}`}>
      {/* Mobile Shell */}
      <div className={`w-full max-w-md h-screen flex flex-col relative shadow-2xl overflow-hidden transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>

        {/* Fixed Top App Bar - Modern Theme (Hidden on Profile) */}
        {currentScreen !== 'perfil' && (
          <header className={`shrink-0 px-5 pt-4 pb-3 z-50 border-b flex items-center justify-between transition-colors duration-300 ${isDarkMode ? 'bg-gray-900/95 border-gray-800' : 'bg-white/95 border-gray-100'} backdrop-blur-md`}>
            {/* Left — Title Area */}
            <div className="flex-1 min-w-0 pr-2">
              {config.subtitle && (
                <p className={`text-[10px] font-bold font-heading tracking-[0.2em] uppercase mb-0.5 truncate ${isDarkMode ? 'text-tertiary/80' : 'text-tertiary'}`}>
                  {config.subtitle}
                </p>
              )}
              <h1 className={`text-xl font-black font-heading tracking-tight truncate ${isDarkMode ? 'text-white' : 'text-foreground'}`}>
                {config.title}
              </h1>
            </div>

            {/* Right — Action Buttons */}
            <div className="flex items-center gap-2">
              {config.actions.map((action, i) => (
                <button
                  key={i}
                  onClick={action.onClick}
                  className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all border ${isDarkMode ? 'bg-gray-800 hover:bg-gray-700 border-gray-700 text-gray-200' : 'bg-gray-50 hover:bg-gray-100 border-gray-100 text-foreground'} active:scale-95`}
                >
                  <action.icon size={20} weight="bold" />
                  {action.badge && (
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center ring-2 ring-white">
                      {action.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </header>
        )}

        {/* Scrollable Content Area with Swipe + Slide Animation */}
        <div
          ref={contentRef}
          className={`flex-1 overflow-y-auto pb-2 no-scrollbar ${getSlideClass()}`}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onScroll={handleScroll}
        >
          {renderScreen()}
        </div>

        {/* FAB — Android Material Design Style (hidden on Play and Perfil tabs) */}
        {currentScreen !== 'play' && currentScreen !== 'perfil' && (
          <button
            className={`absolute right-6 w-14 h-14 bg-tertiary text-white rounded-full shadow-lg shadow-tertiary/40 flex items-center justify-center hover:bg-tertiary/90 active:scale-95 transition-all duration-300 z-50 ${isFabVisible ? 'bottom-24 opacity-100 translate-y-0' : 'bottom-10 opacity-0 translate-y-20 pointer-events-none'}`}
            onClick={() => setFabTrigger(t => t + 1)}
          >
            <Plus size={28} weight="bold" />
          </button>
        )}

        {/* Bottom Navigation Bar */}
        <nav className={`shrink-0 border-t pb-5 pt-2 z-50 transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'}`}>
          <div className="flex justify-around items-center">
            <NavButton active={currentScreen === 'home'} onClick={() => navigate('home')} icon={House} label="Home" isDarkMode={isDarkMode} />
            <NavButton active={currentScreen === 'retos'} onClick={() => navigate('retos')} icon={Trophy} label="Retos" isDarkMode={isDarkMode} />
            {/* Play — Highlighted as primary feature */}
            <button
              onClick={() => navigate('play')}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all duration-200 min-w-[60px] -mt-3 ${currentScreen === 'play' ? 'scale-105' : ''
                }`}
            >
              <div className={`p-2.5 rounded-2xl transition-all duration-200 shadow-lg ${currentScreen === 'play'
                ? 'bg-tertiary shadow-tertiary/40 scale-110'
                : 'bg-tertiary/90 shadow-tertiary/30 hover:bg-tertiary'
                }`}>
                <CurrentPlayIcon key={playIconIndex} size={26} weight="fill" className="text-white animate-[fadeIn_0.5s_ease-out]" />
              </div>
              <span className={`text-[10px] tracking-wide font-bold ${currentScreen === 'play' ? 'text-tertiary' : 'text-tertiary/70'
                }`}>Play</span>
            </button>
            <NavButton active={currentScreen === 'comunidades'} onClick={() => navigate('comunidades')} icon={UsersThree} label="Social" isDarkMode={isDarkMode} />
            <NavButton active={currentScreen === 'profesores'} onClick={() => navigate('profesores')} icon={Student} label="Profes" isDarkMode={isDarkMode} />
          </div>
        </nav>
      </div>
    </div>
  );
}

// Bottom Nav Button
function NavButton({ active, onClick, icon: Icon, label, isDarkMode }: { active: boolean; onClick: () => void; icon: any; label: string; isDarkMode: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px] ${active
        ? (isDarkMode ? 'text-white' : 'text-primary')
        : (isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600')
        }`}
    >
      <div className={`p-1 rounded-full transition-all duration-200 ${active ? (isDarkMode ? 'bg-gray-800' : 'bg-secondary') : ''}`}>
        <Icon size={24} weight={active ? "fill" : "regular"} />
      </div>
      <span className={`text-[10px] tracking-wide ${active ? 'font-bold' : 'font-medium'}`}>
        {label}
      </span>
    </button>
  );
}