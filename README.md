# 🎄 Holiday Advent Calendar PWA

A delightful, offline-first Single Page Application (SPA) Progressive Web App (PWA) advent calendar crafted especially for young children and toddlers (optimized for the **Samsung Galaxy Tab A 11" / widescreen tablet** form factor and responsive on phones).

Hostable on **GitHub Pages** (or custom domains) with complete offline caching via Service Worker.

![License](https://img.shields.io/badge/license-MIT-green.svg)
![PWA](https://img.shields.io/badge/PWA-ready-blue.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38bdf8.svg)

---

## ✨ Features

- **Designed for Little Hands (Preschooler / Toddler friendly)**:
  - Big, tactile touch targets (>= 72px–120px).
  - High-contrast visual cues: *Today's door* glows and pulses with golden starlight.
  - Tapping opens a celebratory modal with **confetti bursts**, fanfare audio, and an interactive sensory mini-activity.
  - "Read to Me 🔊" button uses Web Speech synthesis to speak the day's holiday story aloud.
- **Cute Sleeping Rudolph Reindeer Locked Screen**:
  - When future doors are tapped, Rudolph is sleeping with his warm red nightcap and pulsing red nose.
  - Displays *"Shhh... Sleep X more times until door {day} opens!"* with countable star icons and gentle lullaby chimes.
- **Snowy Alpine Village Aesthetic**:
  - Cozy log cabins with snow on the eaves, warm glowing windows, evergreen pines, and soft falling snow particle canvas.
- **Responsive Tablet-First Form Factor**:
  - **Samsung Galaxy Tab A (16:10 widescreen landscape)**: Full 24-door (6 columns × 4 rows) panoramic view fitting the entire screen without vertical scrolling.
  - **Mobile Phones**: Smooth, fluid 4×6 or 3×8 responsive grid with large thumb-friendly touch zones.
- **100% Offline-First PWA**:
  - Built with `vite-plugin-pwa` and Service Worker Workbox precaching.
  - **Zero external audio file dependencies**: All holiday chimes, jingles, lullabies, bell pitches, and fanfare chords are synthesized natively in real-time with the **Web Audio API**.
  - Installable to Android / Samsung tablet home screens with standalone fullscreen display and high-res app icons.
- **Parent Settings & Customization Gate**:
  - Child-proof parent gate (simple arithmetic question to enter).
  - Customize the child's name (e.g., *"Leo's Advent Calendar"*).
  - Add custom secret family messages/notes to any of the 24 days (e.g., *"Tonight we are baking gingerbread cookies with Grandma!"*).
  - **Test Mode**: Unlock all 24 doors to preview surprises ahead of time.
  - **Date Simulator**: Select any day of December to test the countdown progression.
  - Reset opened doors for a fresh countdown.
  - All customizations and progress are persisted locally in `localStorage`.

---

## 24 Toddler Mini-Activities & Surprises

1. **Day 1**: Light the Village Tree (tap fairy lights to glow in rainbow colors)
2. **Day 2**: Dress Frosty the Snowman (tap to swap funny hats and cozy scarves)
3. **Day 3**: Catch the Snowflakes (tap floating snowflakes to pop them into sparkles)
4. **Day 4**: Jingle Bell Music (tap 4 colorful musical bells playing C, E, G, high C)
5. **Day 5**: Bake Gingerbread Friends (tap to add candy gumdrop buttons)
6. **Day 6**: Rudolph's Glowing Red Nose (tap to make his nose shine bright)
7. **Day 7**: Magical Snow Globe (tap to swirl winter glitter)
8. **Day 8**: Feed the Winter Squirrel (tap acorns into his tree hollow)
9. **Day 9**: Cozy Hot Cocoa (tap to plop marshmallows into steamy cocoa)
10. **Day 10**: Polar Express Train (blow the train whistle across snowy tracks)
11. **Day 11**: Sparkling Ice Castle (stack crystal ice blocks)
12. **Day 12**: Penguin Ice Slide (tap Pippin the penguin to slide down the hill)
13. **Day 13**: Peppermint Candy Cane (stripe red and green sweet swirls)
14. **Day 14**: Winter Animal Chorus (owl, fox, and bear musical sounds)
15. **Day 15**: Wrap Surprise Gifts (wrap boxes in ribbons and bows)
16. **Day 16**: Pop the Ornaments (tap festive baubles for colorful pops)
17. **Day 17**: Northern Lights Magic (touch the night sky to swirl aurora ribbons)
18. **Day 18**: Mountain Sledding (zoom down the snowy mountain slope)
19. **Day 19**: Cozy Fireplace (tap logs to make crackling embers dance)
20. **Day 20**: Playful Polar Bear (give Barnaby the bear cub a cozy hug)
21. **Day 21**: Decorate Alpine Cabin (hang cedar wreaths and roof lights)
22. **Day 22**: Cookies for Santa (place cookies and milk on the table)
23. **Day 23**: Santa's Reindeer Flight Team (meet Dasher, Dancer, Prancer & team)
24. **Day 24**: Santa's Sleigh Launch Finale! (Grand Christmas Eve flight with fireworks & fanfare)

---

## 🛠️ Technology Stack

- **Framework**: React 19 + TypeScript
- **Bundler & Tooling**: Vite 8 + `@tailwindcss/vite`
- **Styling**: Tailwind CSS v4 + Google Web Fonts (*Mountains of Christmas* & *Fredoka*)
- **PWA / Service Worker**: `vite-plugin-pwa` (Workbox)
- **Audio Synthesizer**: Web Audio API + Web Speech Synthesis
- **Effects**: HTML5 Canvas particle snow + `canvas-confetti`
- **Icons**: `lucide-react`
- **Deployment**: GitHub Actions (`deploy.yml`) to GitHub Pages

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- `npm`

### Local Development

1. Clone repository:
   ```bash
   git clone https://github.com/michaelsanford/Advent-Calendar.git
   cd Advent-Calendar
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production & Testing PWA

```bash
npm run build
npm run preview
```

Open the preview URL in Chrome or Edge to test service worker caching and offline capabilities (DevTools -> Network -> Offline).

---

## 📲 Installing on Samsung Galaxy Tab A / Android Tablet

1. Open the hosted URL in **Google Chrome** or **Samsung Internet** on the tablet.
2. An **"Install Advent Calendar on Tablet"** button will appear at the top, or tap the browser menu (three dots `⋮`) and select **"Add to Home screen"** / **"Install app"**.
3. The calendar will install as a full-screen, standalone application that launches directly from the home screen and runs completely offline!

---

## 🔒 Parent Controls

Click the gear icon (or lock icon) in the top-right corner to open the **Parent Gate**. Answer the quick arithmetic question to access:
- Child name & calendar title personalization
- Test Mode (preview all 24 doors)
- Date Simulation (select any day of December)
- Custom message editor for individual days
- Reset opened doors

---

## 📄 License

This project is open-source under the [MIT License](LICENSE).
