import React, { useState } from 'react';
import { X, Lock, Unlock, RotateCcw, Check, Save } from 'lucide-react';
import type { CalendarSettings, SurpriseContent } from '../types/calendar';

interface ParentModalProps {
  settings: CalendarSettings;
  defaultSurprises: SurpriseContent[];
  onUpdateSettings: (newSettings: Partial<CalendarSettings>) => void;
  onResetProgress: () => void;
  onClose: () => void;
}

export const ParentModal: React.FC<ParentModalProps> = ({
  settings,
  defaultSurprises,
  onUpdateSettings,
  onResetProgress,
  onClose
}) => {
  // Parent Gate state
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [numA] = useState(() => Math.floor(Math.random() * 6) + 4); // 4 - 9
  const [numB] = useState(() => Math.floor(Math.random() * 5) + 3); // 3 - 7
  const [gateAnswer, setGateAnswer] = useState('');
  const [gateError, setGateError] = useState(false);

  // Form states
  const [childName, setChildName] = useState(settings.childName);
  const [calendarTitle, setCalendarTitle] = useState(settings.calendarTitle);
  const [testMode, setTestMode] = useState(settings.testMode);
  const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled);
  const [speechEnabled, setSpeechEnabled] = useState(settings.speechEnabled);
  const [simulatedDay, setSimulatedDay] = useState<number | null>(settings.simulatedDay);

  // Custom Notes Editor
  const [selectedEditDay, setSelectedEditDay] = useState(1);
  const [customNote, setCustomNote] = useState(
    settings.customSurprises[1]?.customNote || ''
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleGateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(gateAnswer, 10) === numA + numB) {
      setIsUnlocked(true);
      setGateError(false);
    } else {
      setGateError(true);
      setGateAnswer('');
    }
  };

  const handleSaveGeneral = () => {
    onUpdateSettings({
      childName,
      calendarTitle,
      testMode,
      soundEnabled,
      speechEnabled,
      simulatedDay
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleSaveCustomNote = () => {
    const updatedCustomSurprises = {
      ...settings.customSurprises,
      [selectedEditDay]: {
        ...settings.customSurprises[selectedEditDay],
        customNote: customNote.trim()
      }
    };
    onUpdateSettings({ customSurprises: updatedCustomSurprises });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  const handleSelectDayToEdit = (day: number) => {
    setSelectedEditDay(day);
    setCustomNote(settings.customSurprises[day]?.customNote || '');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-indigo-500/40 rounded-3xl p-5 sm:p-7 text-white shadow-2xl my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-11 h-11 bg-slate-800 hover:bg-slate-700 rounded-full flex items-center justify-center text-slate-300 transition-transform active:scale-95"
        >
          <X className="w-5 h-5" />
        </button>

        {!isUnlocked ? (
          /* Parent Gate Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-indigo-950 border-2 border-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-300">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2 font-festive text-amber-300">
              Parent Gate
            </h2>
            <p className="text-slate-300 text-sm max-w-sm mx-auto mb-6">
              To keep the surprises safe from little fingers, please answer this quick question:
            </p>

            <form onSubmit={handleGateSubmit} className="max-w-xs mx-auto">
              <div className="mb-4 text-2xl font-black text-amber-200 bg-slate-800/80 py-3 rounded-2xl border border-slate-700">
                {numA} + {numB} = ?
              </div>
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                autoFocus
                placeholder="Enter answer"
                value={gateAnswer}
                onChange={(e) => setGateAnswer(e.target.value)}
                className="w-full text-center py-3 px-4 bg-slate-950 border-2 border-indigo-500 rounded-xl text-xl font-bold text-white mb-3 focus:outline-none focus:border-amber-400"
              />
              {gateError && (
                <p className="text-red-400 text-xs mb-3 font-semibold">
                  Oops, that was not quite right! Try again.
                </p>
              )}
              <button
                type="submit"
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 font-bold rounded-xl text-white shadow transition-all flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Open Parent Settings</span>
              </button>
            </form>
          </div>
        ) : (
          /* Parent Settings Dashboard */
          <div>
            <div className="flex items-center gap-3 mb-5 border-b border-slate-800 pb-3">
              <div className="p-2 bg-indigo-950 border border-indigo-500/50 rounded-xl text-amber-300">
                <Unlock className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold font-festive text-amber-300">
                  Parent Settings & Customization
                </h2>
                <p className="text-xs text-slate-400">
                  All settings are saved locally on this tablet.
                </p>
              </div>
            </div>

            {savedSuccess && (
              <div className="mb-4 px-4 py-2 bg-emerald-950/80 border border-emerald-500 text-emerald-200 text-sm font-semibold rounded-xl flex items-center gap-2 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Settings saved successfully!</span>
              </div>
            )}

            {/* General Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Child's Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leo"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase mb-1">
                  Calendar Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Leo's Holiday Calendar"
                  value={calendarTitle}
                  onChange={(e) => setCalendarTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>
            </div>

            {/* Toggles & Date Simulation */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-bold text-sm text-slate-200">
                    Test Mode (Unlock All 24 Doors)
                  </span>
                  <p className="text-xs text-slate-400">
                    Allow clicking any door immediately to preview all surprises.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setTestMode(!testMode)}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${
                    testMode ? 'bg-amber-500' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                      testMode ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <div>
                  <span className="font-bold text-sm text-slate-200">
                    Simulate Date (Day of December)
                  </span>
                  <p className="text-xs text-slate-400">
                    {simulatedDay === null
                      ? 'Currently using real-world today date'
                      : `Simulating December ${simulatedDay}`}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={simulatedDay ?? ''}
                    onChange={(e) =>
                      setSimulatedDay(e.target.value ? parseInt(e.target.value, 10) : null)
                    }
                    className="bg-slate-900 border border-slate-700 rounded-lg px-2 py-1 text-sm text-amber-200 focus:outline-none"
                  >
                    <option value="">Real Date</option>
                    {Array.from({ length: 24 }).map((_, idx) => (
                      <option key={idx + 1} value={idx + 1}>
                        Dec {idx + 1}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <div>
                  <span className="font-bold text-sm text-slate-200">Musical Sound Effects</span>
                  <p className="text-xs text-slate-400">
                    Play holiday chimes, jingles, and fanfare.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${
                    soundEnabled ? 'bg-emerald-500' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                      soundEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                <div>
                  <span className="font-bold text-sm text-slate-200">Audio Speech Reading</span>
                  <p className="text-xs text-slate-400">
                    Speak the daily stories aloud using voice synthesis.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSpeechEnabled(!speechEnabled)}
                  className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors ${
                    speechEnabled ? 'bg-emerald-500' : 'bg-slate-800'
                  }`}
                >
                  <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                      speechEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Custom Daily Note / Secret Message Editor */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-sm text-amber-200">
                  Custom Surprise Message by Day
                </span>
                <span className="text-xs text-slate-400">
                  Editing: <strong>Day {selectedEditDay}</strong> ({defaultSurprises[selectedEditDay - 1]?.title})
                </span>
              </div>

              {/* Day Selector Pills */}
              <div className="flex gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-thin">
                {Array.from({ length: 24 }).map((_, i) => {
                  const d = i + 1;
                  const hasCustom = !!settings.customSurprises[d]?.customNote;
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() => handleSelectDayToEdit(d)}
                      className={`min-w-8 h-8 rounded-lg text-xs font-bold transition ${
                        selectedEditDay === d
                          ? 'bg-amber-400 text-slate-950 font-black'
                          : hasCustom
                          ? 'bg-indigo-900 text-amber-200 border border-amber-400/50'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {d}
                    </button>
                  );
                })}
              </div>

              <textarea
                rows={2}
                placeholder="Write a custom note or family treat (e.g. 'Tonight we are going to look at holiday lights and drink cocoa with grandma!')..."
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 mb-2"
              />

              <button
                type="button"
                onClick={handleSaveCustomNote}
                className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 active:scale-95 text-xs font-bold text-white rounded-lg flex items-center gap-1.5 ml-auto"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Note for Day {selectedEditDay}</span>
              </button>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <button
                type="button"
                onClick={() => {
                  if (window.confirm('Reset all opened doors so your child can start fresh?')) {
                    onResetProgress();
                    setSavedSuccess(true);
                  }
                }}
                className="px-4 py-2.5 bg-rose-950/80 hover:bg-rose-900 border border-rose-700/60 text-rose-200 text-xs font-bold rounded-xl flex items-center gap-2 active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset Opened Doors</span>
              </button>

              <div className="flex gap-2 ml-auto">
                <button
                  type="button"
                  onClick={handleSaveGeneral}
                  className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 text-sm font-black rounded-xl shadow font-festive flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save All Settings</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
