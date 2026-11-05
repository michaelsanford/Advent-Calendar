import React from 'react';
import type { DoorStatus, SurpriseContent } from '../types/calendar';
import { Lock, Sparkles, Star } from 'lucide-react';

interface DoorCardProps {
  day: number;
  status: DoorStatus;
  surprise: SurpriseContent;
  onOpen: (day: number) => void;
  onLockedClick: (day: number) => void;
}

export const DoorCard: React.FC<DoorCardProps> = ({
  day,
  status,
  surprise,
  onOpen,
  onLockedClick
}) => {
  const handleClick = () => {
    if (status === 'locked') {
      onLockedClick(day);
    } else {
      onOpen(day);
    }
  };

  if (status === 'opened') {
    return (
      <button
        onClick={handleClick}
        className="group relative w-full h-full min-h-[100px] sm:min-h-[120px] rounded-2xl bg-gradient-to-b from-amber-700/40 via-amber-900/60 to-amber-950/80 border-2 border-amber-400/80 p-2 sm:p-3 flex flex-col items-center justify-between shadow-lg shadow-amber-950/40 transition-all duration-200 active:scale-95 hover:border-amber-300"
      >
        {/* Snow on top of cabin */}
        <div className="absolute -top-1.5 inset-x-2 h-2.5 bg-gradient-to-b from-white to-sky-100 rounded-full opacity-90 shadow-sm pointer-events-none" />

        {/* Small corner Day Tag */}
        <div className="w-full flex justify-between items-center text-amber-200/90 text-xs sm:text-sm font-bold font-festive">
          <span className="bg-amber-400/30 px-2 py-0.5 rounded-full border border-amber-300/40">
            #{day}
          </span>
          <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
        </div>

        {/* Revealed Icon inside warm glowing cabin window */}
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-3xl sm:text-4xl filter drop-shadow shadow-inner my-1 group-hover:scale-110 transition-transform">
          {surprise.badgeIcon}
        </div>

        {/* Title snippet */}
        <span className="text-[11px] sm:text-xs text-amber-100 font-semibold truncate w-full text-center">
          {surprise.title}
        </span>
      </button>
    );
  }

  if (status === 'ready') {
    return (
      <button
        onClick={handleClick}
        className="group relative w-full h-full min-h-[100px] sm:min-h-[120px] rounded-2xl bg-gradient-to-b from-red-600 via-red-700 to-rose-900 border-4 border-amber-300 p-2 sm:p-3 flex flex-col items-center justify-between shadow-xl shadow-red-700/50 transition-all duration-300 active:scale-95 animate-gentle-glow"
      >
        {/* Snowy Roof Cap */}
        <div className="absolute -top-2 inset-x-2 h-3.5 bg-white rounded-full shadow-md pointer-events-none flex justify-center items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400 -mt-1 mx-1" />
        </div>

        {/* Glowing Badge: Open Today! */}
        <div className="w-full flex justify-between items-center text-amber-200">
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
          <span className="px-2 py-0.5 bg-amber-400 text-slate-950 font-black text-[10px] sm:text-xs rounded-full uppercase tracking-wider shadow">
            TODAY!
          </span>
          <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
        </div>

        {/* Giant Day Number */}
        <div className="flex flex-col items-center justify-center my-0.5">
          <span className="text-3xl sm:text-5xl font-black text-amber-200 font-festive filter drop-shadow-md tracking-tight group-hover:scale-110 transition-transform">
            {day}
          </span>
        </div>

        {/* Action prompt */}
        <div className="w-full py-1 bg-amber-300/30 rounded-lg text-amber-100 text-xs font-bold tracking-wide flex items-center justify-center gap-1">
          <span>TAP TO OPEN!</span>
          <span>🎁</span>
        </div>
      </button>
    );
  }

  // Locked future door
  return (
    <button
      onClick={handleClick}
      className="group relative w-full h-full min-h-[100px] sm:min-h-[120px] rounded-2xl bg-gradient-to-b from-slate-800/80 via-slate-900/80 to-indigo-950/80 border-2 border-slate-700/60 p-2 sm:p-3 flex flex-col items-center justify-between opacity-80 hover:opacity-100 transition-all duration-200 active:scale-95 hover:border-slate-500 shadow-md"
    >
      {/* Light Snow on Roof */}
      <div className="absolute -top-1.5 inset-x-3 h-2 bg-slate-200/80 rounded-full pointer-events-none" />

      {/* Top Lock Icon */}
      <div className="w-full flex justify-between items-center text-slate-400">
        <span className="text-xs text-slate-500 font-bold font-festive">Dec</span>
        <Lock className="w-3.5 h-3.5 text-slate-400" />
      </div>

      {/* Prominent Day Number */}
      <div className="flex items-center justify-center my-1">
        <span className="text-3xl sm:text-4xl font-extrabold text-slate-300 font-festive group-hover:text-amber-200 transition-colors">
          {day}
        </span>
      </div>

      {/* Closed cozy shutter hint */}
      <div className="text-[10px] sm:text-xs text-indigo-300/70 font-medium flex items-center gap-1">
        <span>Sleeping</span>
        <span>💤</span>
      </div>
    </button>
  );
};
