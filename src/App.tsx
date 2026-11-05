import { useState, useEffect } from 'react';
import { AppHeader } from './components/AppHeader';
import { CalendarGrid } from './components/CalendarGrid';
import { SnowEffect } from './components/SnowEffect';
import { SurpriseModal } from './components/SurpriseModal';
import { SleepingReindeerModal } from './components/SleepingReindeerModal';
import { ParentModal } from './components/ParentModal';
import { DEFAULT_SURPRISES } from './data/defaultSurprises';
import type { CalendarSettings, SurpriseContent } from './types/calendar';
import { sounds } from './services/soundEffects';
import { Download } from 'lucide-react';

const STORAGE_KEY = 'advent_calendar_settings_v1';

const DEFAULT_SETTINGS: CalendarSettings = {
  childName: '',
  calendarTitle: 'Holiday Advent Calendar',
  soundEnabled: true,
  speechEnabled: true,
  testMode: false,
  simulatedDay: null,
  openedDays: [],
  customSurprises: {}
};

export function App() {
  // Load settings from localStorage
  const [settings, setSettings] = useState<CalendarSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch (e) {
      console.warn('Failed to parse saved advent settings:', e);
    }
    return DEFAULT_SETTINGS;
  });

  // Modals state
  const [activeSurprise, setActiveSurprise] = useState<SurpriseContent | null>(null);
  const [lockedReindeer, setLockedReindeer] = useState<{ day: number; remainingSleeps: number } | null>(null);
  const [isParentOpen, setIsParentOpen] = useState(false);

  // PWA install prompt state
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  // Sync sound setting to sound engine
  useEffect(() => {
    sounds.setSoundEnabled(settings.soundEnabled);
    sounds.setSpeechEnabled(settings.speechEnabled);
  }, [settings.soundEnabled, settings.speechEnabled]);

  // Persist settings
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save advent settings:', e);
    }
  }, [settings]);

  // Listen for PWA beforeinstallprompt
  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBtn(false);
    }
    setDeferredPrompt(null);
  };

  // Today's calendar day computed once per session
  const [todayDay] = useState<number>(() => {
    const now = new Date();
    // Month is 0-indexed: 11 is December
    return now.getMonth() === 11 ? Math.min(24, Math.max(1, now.getDate())) : 1;
  });

  const currentDay = settings.simulatedDay !== null ? settings.simulatedDay : todayDay;

  // Merge default surprises with any custom parent overrides
  const fullSurprises: SurpriseContent[] = DEFAULT_SURPRISES.map((def) => {
    const custom = settings.customSurprises[def.day];
    return {
      ...def,
      ...custom
    };
  });

  const handleOpenDoor = (day: number) => {
    const surprise = fullSurprises.find((s) => s.day === day);
    if (!surprise) return;

    // Mark day as opened if not already
    if (!settings.openedDays.includes(day)) {
      setSettings((prev) => ({
        ...prev,
        openedDays: [...prev.openedDays, day]
      }));
    }

    setActiveSurprise(surprise);
  };

  const handleLockedDoorClick = (day: number) => {
    const remainingSleeps = Math.max(1, day - currentDay);
    setLockedReindeer({ day, remainingSleeps });
  };

  const handleToggleSound = () => {
    const nextVal = !settings.soundEnabled;
    setSettings((prev) => ({ ...prev, soundEnabled: nextVal }));
    sounds.setSoundEnabled(nextVal);
  };

  const handleUpdateSettings = (newSettings: Partial<CalendarSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const handleResetProgress = () => {
    setSettings((prev) => ({ ...prev, openedDays: [] }));
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-slate-950 text-slate-100 overflow-x-hidden select-none">
      {/* Falling Snow Canvas */}
      <SnowEffect />

      {/* Decorative Alpine Mountain Background Silhouettes */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Deep Mountain Range */}
        <svg
          viewBox="0 0 1440 600"
          className="absolute bottom-0 w-full h-auto opacity-35"
          preserveAspectRatio="none"
        >
          <path
            d="M 0,320 L 160,180 L 340,310 L 520,150 L 760,340 L 980,140 L 1220,300 L 1440,180 L 1440,600 L 0,600 Z"
            fill="#0f172a"
          />
          <path
            d="M 0,420 L 220,290 L 460,400 L 680,260 L 920,410 L 1180,270 L 1440,380 L 1440,600 L 0,600 Z"
            fill="#020617"
          />
        </svg>

        {/* Alpine Pine Tree Silhouettes along the bottom */}
        <div className="absolute bottom-0 inset-x-0 h-16 sm:h-24 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      {/* Main Content Shell */}
      <div className="relative z-10 flex-1 flex flex-col justify-between max-w-7xl w-full mx-auto">
        {/* Header with Title, Sleeps countdown, and utility buttons */}
        <AppHeader
          title={settings.calendarTitle}
          childName={settings.childName}
          currentDay={currentDay}
          soundEnabled={settings.soundEnabled}
          onToggleSound={handleToggleSound}
          onOpenParentSettings={() => setIsParentOpen(true)}
        />

        {/* PWA Install Button (if browser detects installability) */}
        {showInstallBtn && (
          <div className="flex justify-center px-4 mb-2">
            <button
              onClick={handleInstallClick}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold rounded-full shadow-lg flex items-center gap-2 active:scale-95 border border-emerald-400/40"
            >
              <Download className="w-4 h-4" />
              <span>Install Advent Calendar on Tablet / Phone 📲</span>
            </button>
          </div>
        )}

        {/* 24-Door Responsive Grid (Tablet Landscape 6x4 / Mobile 4x6 or 3x8) */}
        <main className="flex-1 flex items-center">
          <CalendarGrid
            currentDay={currentDay}
            testMode={settings.testMode}
            openedDays={settings.openedDays}
            surprises={fullSurprises}
            onOpenDoor={handleOpenDoor}
            onLockedDoorClick={handleLockedDoorClick}
          />
        </main>

        {/* Footer */}
        <footer className="w-full py-2 px-4 text-center text-xs text-slate-500">
          <span>Made with ❤️ for family holiday moments • </span>
          <button
            onClick={() => setIsParentOpen(true)}
            className="text-amber-400/70 hover:text-amber-300 underline"
          >
            Parent Controls
          </button>
        </footer>
      </div>

      {/* Modals */}
      {activeSurprise && (
        <SurpriseModal
          surprise={activeSurprise}
          onClose={() => setActiveSurprise(null)}
        />
      )}

      {lockedReindeer && (
        <SleepingReindeerModal
          day={lockedReindeer.day}
          remainingSleeps={lockedReindeer.remainingSleeps}
          onClose={() => setLockedReindeer(null)}
        />
      )}

      {isParentOpen && (
        <ParentModal
          settings={settings}
          defaultSurprises={DEFAULT_SURPRISES}
          onUpdateSettings={handleUpdateSettings}
          onResetProgress={handleResetProgress}
          onClose={() => setIsParentOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
