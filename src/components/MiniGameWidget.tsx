import React, { useState } from 'react';
import type { MiniGameType } from '../types/calendar';
import { sounds } from '../services/soundEffects';
import confetti from 'canvas-confetti';

interface MiniGameWidgetProps {
  gameType: MiniGameType;
}

export const MiniGameWidget: React.FC<MiniGameWidgetProps> = ({ gameType }) => {
  // Tree Lights State
  const [lights, setLights] = useState([
    { id: 1, on: true, color: 'bg-red-500' },
    { id: 2, on: false, color: 'bg-yellow-400' },
    { id: 3, on: true, color: 'bg-blue-400' },
    { id: 4, on: false, color: 'bg-emerald-400' },
    { id: 5, on: true, color: 'bg-purple-400' },
    { id: 6, on: false, color: 'bg-amber-300' },
    { id: 7, on: true, color: 'bg-pink-400' }
  ]);

  // Snowman Dress State
  const hats = ['🎩 Top Hat', '🎅 Santa Hat', '🧢 Cozy Beanie', '👑 Golden Crown'];
  const scarves = ['🧣 Cozy Red', '🧣 Emerald Green', '🧣 Royal Blue', '🧣 Striped Candy'];
  const [hatIdx, setHatIdx] = useState(0);
  const [scarfIdx, setScarfIdx] = useState(0);

  // Snowflakes Pop State
  const [poppedSnowflakes, setPoppedSnowflakes] = useState<number[]>([]);

  // Gingerbread Toppings
  const [toppingsCount, setToppingsCount] = useState(2);

  // Rudolph Nose Glow
  const [noseGlowCount, setNoseGlowCount] = useState(0);

  // Marshmallow count
  const [marshmallows, setMarshmallows] = useState<number[]>([]);

  // Penguin Slide
  const [penguinSliding, setPenguinSliding] = useState(false);

  // Aurora Sky
  const [auroraColors, setAuroraColors] = useState(['from-emerald-400', 'via-cyan-400', 'to-indigo-500']);

  // Santa Sleigh Finale Fireworks
  const triggerGrandFinale = () => {
    sounds.playFanfare();
    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.6 }
    });
  };

  switch (gameType) {
    case 'tree-lights':
      return (
        <div className="flex flex-col items-center gap-3">
          <p className="text-amber-200 text-sm font-semibold">Tap the bulbs to turn them on & off!</p>
          <div className="flex flex-wrap justify-center gap-3 py-3">
            {lights.map((light) => (
              <button
                key={light.id}
                onClick={() => {
                  sounds.playSparkle();
                  setLights((prev) =>
                    prev.map((l) => (l.id === light.id ? { ...l, on: !l.on } : l))
                  );
                }}
                className={`w-14 h-14 rounded-full border-2 border-white/50 transition-all transform active:scale-90 flex items-center justify-center text-xl shadow-lg ${
                  light.on
                    ? `${light.color} shadow-amber-400/80 scale-105 animate-pulse`
                    : 'bg-slate-700 opacity-40'
                }`}
              >
                {light.on ? '✨' : '⚪'}
              </button>
            ))}
          </div>
        </div>
      );

    case 'dress-snowman':
      return (
        <div className="flex flex-col items-center gap-4 py-2">
          <div className="w-32 h-32 relative flex flex-col items-center justify-center bg-sky-950/40 rounded-full border border-sky-400/30">
            <span className="text-2xl -mt-6">{hats[hatIdx].split(' ')[0]}</span>
            <div className="text-4xl">⛄</div>
            <span className="text-base font-bold text-amber-200">{scarves[scarfIdx]}</span>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => {
                sounds.playPop(520);
                setHatIdx((prev) => (prev + 1) % hats.length);
              }}
              className="px-4 py-3 bg-red-600 hover:bg-red-500 active:scale-95 text-white font-bold rounded-xl shadow"
            >
              Change Hat! 🎩
            </button>
            <button
              onClick={() => {
                sounds.playPop(660);
                setScarfIdx((prev) => (prev + 1) % scarves.length);
              }}
              className="px-4 py-3 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white font-bold rounded-xl shadow"
            >
              Change Scarf! 🧣
            </button>
          </div>
        </div>
      );

    case 'snowflake-pop':
      return (
        <div className="flex flex-col items-center gap-3">
          <p className="text-sky-200 text-sm font-semibold">Tap all 6 snowflakes to pop them!</p>
          <div className="grid grid-cols-3 gap-3 py-2">
            {[1, 2, 3, 4, 5, 6].map((num) => {
              const isPopped = poppedSnowflakes.includes(num);
              return (
                <button
                  key={num}
                  disabled={isPopped}
                  onClick={() => {
                    sounds.playPop(400 + num * 80);
                    setPoppedSnowflakes((prev) => {
                      const next = [...prev, num];
                      if (next.length === 6) {
                        sounds.playSparkle();
                        confetti({ particleCount: 60, spread: 70 });
                      }
                      return next;
                    });
                  }}
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-transform active:scale-75 ${
                    isPopped
                      ? 'bg-sky-950/30 border border-sky-900/40 opacity-30 scale-90'
                      : 'bg-gradient-to-br from-sky-400 to-indigo-500 shadow-lg shadow-sky-400/40 animate-gentle-bob'
                  }`}
                >
                  {isPopped ? '💥' : '❄️'}
                </button>
              );
            })}
          </div>
          {poppedSnowflakes.length === 6 && (
            <button
              onClick={() => {
                sounds.playSparkle();
                setPoppedSnowflakes([]);
              }}
              className="text-xs text-amber-300 font-bold underline"
            >
              Play Again ❄️
            </button>
          )}
        </div>
      );

    case 'jingle-bells':
      return (
        <div className="flex flex-col items-center gap-3">
          <p className="text-amber-200 text-sm font-semibold">Tap the bells to play music!</p>
          <div className="grid grid-cols-4 gap-2 sm:gap-3 py-2">
            {[
              { note: 'Do', hz: 523.25, color: 'from-red-500 to-red-600', label: 'C' },
              { note: 'Mi', hz: 659.25, color: 'from-amber-400 to-amber-500', label: 'E' },
              { note: 'Sol', hz: 783.99, color: 'from-emerald-500 to-emerald-600', label: 'G' },
              { note: 'High Do', hz: 1046.5, color: 'from-blue-500 to-blue-600', label: 'C' }
            ].map((bell, idx) => (
              <button
                key={idx}
                onClick={() => sounds.playBell(bell.hz)}
                className={`w-16 sm:w-18 h-20 rounded-2xl bg-gradient-to-b ${bell.color} shadow-lg active:scale-90 flex flex-col items-center justify-center text-white border-2 border-white/40 transition-transform`}
              >
                <span className="text-2xl">🔔</span>
                <span className="text-xs font-black mt-1">{bell.note}</span>
              </button>
            ))}
          </div>
        </div>
      );

    case 'gingerbread':
      return (
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="relative w-32 h-36 bg-amber-800 rounded-3xl border-4 border-amber-950 flex flex-col items-center justify-center shadow-xl">
            <span className="text-3xl mb-1">🍪</span>
            <div className="flex gap-2">
              {Array.from({ length: toppingsCount }).map((_, i) => (
                <span key={i} className="text-lg">🍬</span>
              ))}
            </div>
            <span className="text-sm font-bold text-amber-100 mt-2">Frosted Smile! 😊</span>
          </div>
          <button
            onClick={() => {
              sounds.playPop(700);
              setToppingsCount((prev) => (prev % 5) + 1);
            }}
            className="px-5 py-3 bg-pink-600 hover:bg-pink-500 active:scale-95 text-white font-bold rounded-xl shadow-lg"
          >
            Add More Candy Buttons! 🍭
          </button>
        </div>
      );

    case 'rudolph-nose':
      return (
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="relative flex flex-col items-center">
            <span className="text-6xl">🦌</span>
            <button
              onClick={() => {
                sounds.playSparkle();
                setNoseGlowCount((prev) => prev + 1);
              }}
              className={`-mt-5 w-12 h-12 rounded-full border-2 border-white bg-red-600 active:scale-90 shadow-2xl transition-all ${
                noseGlowCount % 2 === 1 ? 'scale-125 shadow-red-500 bg-red-500 animate-pulse' : ''
              }`}
            >
              🔴
            </button>
          </div>
          <p className="text-amber-200 text-sm font-bold">Tap Rudolph's red nose to glow!</p>
        </div>
      );

    case 'hot-cocoa':
      return (
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="relative w-32 h-32 bg-amber-900 rounded-3xl border-4 border-amber-950 flex flex-col items-center justify-center shadow-xl overflow-hidden">
            <span className="text-4xl">☕</span>
            <div className="flex flex-wrap justify-center gap-1 mt-1 px-2">
              {marshmallows.map((m) => (
                <span key={m} className="text-base animate-gentle-bob">⚪</span>
              ))}
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playPop(500 + marshmallows.length * 50);
              if (marshmallows.length < 8) {
                setMarshmallows((prev) => [...prev, prev.length + 1]);
              } else {
                setMarshmallows([1]);
              }
            }}
            className="px-5 py-3 bg-amber-600 hover:bg-amber-500 active:scale-95 text-white font-bold rounded-xl shadow"
          >
            Plop a Marshmallow! ☁️
          </button>
        </div>
      );

    case 'penguin-slide':
      return (
        <div className="flex flex-col items-center gap-3 py-2 w-full">
          <div className="w-full h-24 bg-gradient-to-r from-sky-900 to-indigo-900 rounded-2xl relative overflow-hidden flex items-center px-4 border border-sky-400/30">
            <div
              className={`text-4xl transition-all duration-700 ${
                penguinSliding ? 'translate-x-60 rotate-12 scale-110' : 'translate-x-0'
              }`}
            >
              🐧
            </div>
            <div className="absolute right-4 text-3xl">❄️🏔️</div>
          </div>
          <button
            onClick={() => {
              sounds.playPop(850);
              setPenguinSliding(true);
              setTimeout(() => setPenguinSliding(false), 800);
            }}
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 active:scale-95 text-white font-bold rounded-xl shadow"
          >
            Wheeeee! Slide Penguin! 🛷
          </button>
        </div>
      );

    case 'aurora-sky':
      return (
        <div className="flex flex-col items-center gap-3 py-2 w-full">
          <div
            onClick={() => {
              sounds.playSparkle();
              const palettes = [
                ['from-emerald-400', 'via-cyan-400', 'to-indigo-500'],
                ['from-pink-500', 'via-purple-500', 'to-indigo-600'],
                ['from-amber-300', 'via-rose-400', 'to-purple-600']
              ];
              setAuroraColors(palettes[Math.floor(Math.random() * palettes.length)]);
            }}
            className={`w-full h-28 bg-gradient-to-r ${auroraColors[0]} ${auroraColors[1]} ${auroraColors[2]} rounded-2xl cursor-pointer shadow-inner flex items-center justify-center transition-all duration-500`}
          >
            <span className="text-3xl text-white drop-shadow">✨🌌 Touch Night Sky! 🌌✨</span>
          </div>
        </div>
      );

    case 'sleigh-finale':
      return (
        <div className="flex flex-col items-center gap-4 py-3">
          <div className="text-6xl animate-gentle-bob">🎅🛷🦌⭐</div>
          <button
            onClick={triggerGrandFinale}
            className="px-6 py-4 bg-gradient-to-r from-amber-400 via-red-500 to-pink-500 hover:from-amber-300 hover:to-pink-400 active:scale-95 text-white font-black text-xl rounded-2xl shadow-xl shadow-red-500/40"
          >
            Launch Santa's Sleigh & Fireworks! 🎆
          </button>
        </div>
      );

    default:
      // General playful sensory celebration widget
      return (
        <div className="flex flex-col items-center gap-3 py-2">
          <button
            onClick={() => {
              sounds.playSparkle();
              confetti({ particleCount: 40, spread: 60 });
            }}
            className="px-6 py-3 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-yellow-400 active:scale-95 text-slate-950 font-black rounded-2xl shadow-lg shadow-amber-400/30 text-lg flex items-center gap-2"
          >
            <span>Tap for Magic Sparkles!</span>
            <span className="text-xl">✨</span>
          </button>
        </div>
      );
  }
};
