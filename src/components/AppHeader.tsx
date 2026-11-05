import React from 'react';
import { Volume2, VolumeX, Settings, Sparkles, Moon } from 'lucide-react';

interface AppHeaderProps {
  title: string;
  childName: string;
  currentDay: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenParentSettings: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  childName,
  currentDay,
  soundEnabled,
  onToggleSound,
  onOpenParentSettings
}) => {
  const sleepsUntilChristmas = Math.max(0, 24 - currentDay);

  const displayTitle = childName.trim()
    ? `${childName}'s Advent Calendar`
    : title || 'Holiday Advent Calendar';

  return (
    <header className="relative z-20 w-full pt-3 pb-2 px-3 sm:px-6 flex flex-col items-center">
      {/* Top Utility Bar */}
      <div className="w-full max-w-7xl flex items-center justify-between mb-1">
        {/* Sleeps Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-950/70 border border-indigo-400/40 rounded-full text-indigo-100 text-xs sm:text-sm font-semibold shadow-sm backdrop-blur-sm">
          <Moon className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
          {sleepsUntilChristmas > 0 ? (
            <span>
              <strong className="text-amber-300">{sleepsUntilChristmas}</strong>{' '}
              {sleepsUntilChristmas === 1 ? 'sleep' : 'sleeps'} until Christmas!
            </span>
          ) : (
            <span className="text-amber-300 font-bold">✨ Merry Christmas! ✨</span>
          )}
        </div>

        {/* Action Controls: Sound & Parent Settings */}
        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-indigo-400/30 flex items-center justify-center text-amber-300 transition-transform active:scale-90 backdrop-blur-sm shadow"
          >
            {soundEnabled ? (
              <Volume2 className="w-5 h-5 text-amber-300" />
            ) : (
              <VolumeX className="w-5 h-5 text-slate-500" />
            )}
          </button>

          {/* Parent Settings Button */}
          <button
            onClick={onOpenParentSettings}
            aria-label="Parent Settings"
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 border border-indigo-400/30 flex items-center justify-center text-slate-300 hover:text-amber-300 transition-transform active:scale-90 backdrop-blur-sm shadow"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="text-center relative">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-amber-300 font-festive tracking-wide drop-shadow-[0_2px_10px_rgba(251,191,36,0.35)] flex items-center justify-center gap-2 sm:gap-3">
          <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-amber-300 fill-amber-300/40 animate-pulse hidden xs:inline-block" />
          <span>{displayTitle}</span>
          <Sparkles className="w-5 h-5 sm:w-7 sm:h-7 text-amber-300 fill-amber-300/40 animate-pulse hidden xs:inline-block" />
        </h1>
        <p className="text-xs sm:text-sm text-indigo-200/90 font-medium tracking-normal mt-0.5">
          Tap today's glowing cabin door to discover the holiday magic!
        </p>
      </div>
    </header>
  );
};
