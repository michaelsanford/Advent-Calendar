import React, { useEffect } from 'react';
import { X, Volume2, Star, Sparkles } from 'lucide-react';
import type { SurpriseContent } from '../types/calendar';
import { sounds } from '../services/soundEffects';
import { MiniGameWidget } from './MiniGameWidget';
import confetti from 'canvas-confetti';

interface SurpriseModalProps {
  surprise: SurpriseContent;
  onClose: () => void;
}

export const SurpriseModal: React.FC<SurpriseModalProps> = ({ surprise, onClose }) => {
  useEffect(() => {
    // Play celebratory fanfare and burst confetti
    sounds.playDoorOpen();
    setTimeout(() => sounds.playFanfare(), 300);

    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 }
    });

    // Speak the message automatically to delight the toddler
    sounds.speak(`Day ${surprise.day}! ${surprise.title}! ${surprise.shortMessage}`);

    return () => {
      sounds.stopSpeaking();
    };
  }, [surprise]);

  const handleSpeakAgain = () => {
    sounds.speak(`Day ${surprise.day}! ${surprise.title}! ${surprise.shortMessage}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 border-4 border-amber-400/50 rounded-3xl p-5 sm:p-7 text-center shadow-2xl shadow-amber-500/20 text-white my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-12 h-12 bg-slate-800/80 hover:bg-slate-700 border-2 border-slate-600 rounded-full flex items-center justify-center text-amber-300 transition-transform active:scale-90"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Day Number Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/20 border border-amber-300/40 rounded-full text-amber-300 font-extrabold text-sm sm:text-base mb-3 font-festive">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>DAY {surprise.day} OF 24</span>
          <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
        </div>

        {/* Big Icon */}
        <div className="text-6xl sm:text-7xl mb-2 filter drop-shadow-lg animate-gentle-bob">
          {surprise.badgeIcon}
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-amber-300 mb-2 font-festive tracking-wide">
          {surprise.title}
        </h2>

        {/* Toddler Message */}
        <p className="text-base sm:text-lg text-slate-100 mb-3 px-2 font-medium leading-relaxed">
          {surprise.shortMessage}
        </p>

        {/* Optional Custom Parent Note */}
        {surprise.customNote && (
          <div className="mb-3 px-4 py-2 bg-rose-950/40 border border-rose-500/40 rounded-xl text-rose-200 text-sm italic">
            💌 Note from Family: "{surprise.customNote}"
          </div>
        )}

        {/* Read to Me Button */}
        <div className="flex justify-center mb-4">
          <button
            onClick={handleSpeakAgain}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-900/70 hover:bg-indigo-800 border border-indigo-500/50 rounded-xl text-indigo-200 text-sm font-semibold transition active:scale-95"
          >
            <Volume2 className="w-4 h-4 text-amber-300" />
            <span>Read to Me Again 🔊</span>
          </button>
        </div>

        {/* Interactive Toddler Mini-Activity Widget */}
        <div className="bg-slate-900/80 border border-indigo-800/60 rounded-2xl p-4 mb-5 shadow-inner">
          <MiniGameWidget gameType={surprise.miniGame} />
        </div>

        {/* Parent Activity Tip Box */}
        {surprise.parentActivityTip && (
          <div className="mb-5 px-3 py-2 bg-emerald-950/30 border border-emerald-600/30 rounded-xl text-emerald-200 text-xs sm:text-sm text-left flex items-start gap-2">
            <span className="text-base">💡</span>
            <div>
              <strong className="text-emerald-300">Family Fun Tonight:</strong> {surprise.parentActivityTip}
            </div>
          </div>
        )}

        {/* Big Touch-Friendly Return Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 sm:py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 active:scale-95 text-slate-950 text-xl font-black rounded-2xl shadow-lg shadow-amber-400/25 transition-all font-festive flex items-center justify-center gap-2"
        >
          <span>Back to Calendar</span>
          <span className="text-2xl">⭐</span>
        </button>
      </div>
    </div>
  );
};
