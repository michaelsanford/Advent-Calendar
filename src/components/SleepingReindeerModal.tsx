import React, { useEffect } from 'react';
import { X, Moon, Star } from 'lucide-react';
import { sounds } from '../services/soundEffects';

interface SleepingReindeerModalProps {
  day: number;
  remainingSleeps: number;
  onClose: () => void;
}

export const SleepingReindeerModal: React.FC<SleepingReindeerModalProps> = ({
  day,
  remainingSleeps,
  onClose
}) => {
  useEffect(() => {
    sounds.playLullaby();
    const sleepWord = remainingSleeps === 1 ? 'one more sleep' : `${remainingSleeps} more sleeps`;
    sounds.speak(`Shhh! Rudolph is resting. Only ${sleepWord} until door number ${day} opens!`);

    return () => {
      sounds.stopSpeaking();
    };
  }, [day, remainingSleeps]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-900 border-4 border-amber-300/40 rounded-3xl p-6 sm:p-8 text-center shadow-2xl shadow-indigo-950/80 text-white overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-12 h-12 bg-indigo-900/80 hover:bg-indigo-800 border-2 border-indigo-700/60 rounded-full flex items-center justify-center text-amber-200 transition-transform active:scale-90"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Floating Night Moon & Stars */}
        <div className="flex justify-center items-center gap-2 mb-2 text-amber-300">
          <Moon className="w-6 h-6 fill-amber-300 animate-gentle-bob" />
          <span className="text-xl sm:text-2xl font-bold font-festive tracking-wide text-amber-200">
            Shhh... Sweet Dreams!
          </span>
          <Star className="w-5 h-5 fill-amber-300 animate-pulse" />
        </div>

        {/* Cute Sleeping Rudolph SVG */}
        <div className="relative my-4 flex justify-center">
          <div className="w-44 h-44 sm:w-52 sm:h-52 animate-sleep-snore relative">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
              <defs>
                <radialGradient id="reindeerFur" cx="50%" cy="40%" r="60%">
                  <stop offset="0%" stop-color="#b45309" />
                  <stop offset="100%" stop-color="#78350f" />
                </radialGradient>
                <radialGradient id="noseGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="#ef4444" />
                  <stop offset="70%" stop-color="#b91c1c" />
                  <stop offset="100%" stop-color="#7f1d1d" />
                </radialGradient>
              </defs>

              {/* Antlers Left and Right */}
              <path
                d="M 65 65 Q 40 35 30 40 Q 25 25 35 20 Q 50 25 60 45"
                fill="#92400e"
                stroke="#451a03"
                strokeWidth="2.5"
              />
              <path
                d="M 135 65 Q 160 35 170 40 Q 175 25 165 20 Q 150 25 140 45"
                fill="#92400e"
                stroke="#451a03"
                strokeWidth="2.5"
              />

              {/* Ears */}
              <ellipse cx="50" cy="85" rx="14" ry="9" transform="rotate(-25 50 85)" fill="#b45309" stroke="#451a03" strokeWidth="2" />
              <ellipse cx="150" cy="85" rx="14" ry="9" transform="rotate(25 150 85)" fill="#b45309" stroke="#451a03" strokeWidth="2" />

              {/* Head */}
              <circle cx="100" cy="105" r="48" fill="url(#reindeerFur)" stroke="#451a03" strokeWidth="3" />

              {/* Cozy Red Nightcap */}
              <path
                d="M 60 78 Q 100 50 140 78 Q 165 110 160 135"
                fill="#dc2626"
                stroke="#991b1b"
                strokeWidth="2.5"
              />
              {/* White Trim */}
              <ellipse cx="100" cy="78" rx="42" ry="10" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
              {/* Pom-pom */}
              <circle cx="160" cy="135" r="13" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />

              {/* Closed Smiling Eyelashes */}
              <path d="M 72 105 Q 82 115 90 106" fill="none" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 110 106 Q 118 115 128 105" fill="none" stroke="#451a03" strokeWidth="3.5" strokeLinecap="round" />

              {/* Soft Rosy Cheeks */}
              <circle cx="70" cy="118" r="8" fill="#f87171" opacity="0.4" />
              <circle cx="130" cy="118" r="8" fill="#f87171" opacity="0.4" />

              {/* Snout */}
              <ellipse cx="100" cy="126" rx="24" ry="16" fill="#d97706" />

              {/* Softly Glowing Red Nose */}
              <circle cx="100" cy="124" r="10" fill="url(#noseGlow)" className="animate-pulse" />
              <circle cx="97" cy="121" r="2.5" fill="#fecaca" />

              {/* Gentle Smiling Mouth */}
              <path d="M 94 135 Q 100 139 106 135" fill="none" stroke="#451a03" strokeWidth="2.5" strokeLinecap="round" />
            </svg>

            {/* Floating "Zzz" Letters */}
            <div className="absolute -top-1 right-2 text-indigo-300 font-bold font-festive text-lg animate-gentle-bob">
              Z
            </div>
            <div className="absolute -top-5 right-7 text-indigo-200 font-bold font-festive text-2xl animate-gentle-bob delay-150">
              z
            </div>
            <div className="absolute -top-9 right-12 text-amber-200 font-bold font-festive text-3xl animate-gentle-bob delay-300">
              z...
            </div>
          </div>
        </div>

        {/* Message for Child */}
        <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-300 mb-2 font-festive">
          Door {day} is Still Sleeping!
        </h3>

        <p className="text-base sm:text-lg text-indigo-100 mb-4 px-2 font-medium leading-relaxed">
          {remainingSleeps === 1 ? (
            <span>
              Just <strong className="text-amber-300 text-xl font-bold">1 more sleep</strong> until you can open this door!
            </span>
          ) : (
            <span>
              Sleep <strong className="text-amber-300 text-xl font-bold">{remainingSleeps} more times</strong> and this surprise will awaken!
            </span>
          )}
        </p>

        {/* Remaining Sleeps Stars Visual Indicator */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-6 max-h-20 overflow-y-auto px-4 py-2 bg-indigo-950/60 rounded-2xl border border-indigo-800/60">
          {Array.from({ length: Math.min(remainingSleeps, 12) }).map((_, i) => (
            <span
              key={i}
              className="text-2xl filter drop-shadow hover:scale-125 transition-transform"
              title={`Sleep ${i + 1}`}
            >
              ⭐
            </span>
          ))}
          {remainingSleeps > 12 && (
            <span className="text-amber-200 text-sm font-bold">+{remainingSleeps - 12} more</span>
          )}
        </div>

        {/* Big Touch-Friendly Button for Toddler */}
        <button
          onClick={onClose}
          className="w-full py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 active:scale-95 text-slate-950 text-xl sm:text-2xl font-black rounded-2xl shadow-lg shadow-amber-400/30 transition-all font-festive tracking-wide flex items-center justify-center gap-3"
        >
          <span>Goodnight Rudolph!</span>
          <span className="text-2xl">💤</span>
        </button>
      </div>
    </div>
  );
};
