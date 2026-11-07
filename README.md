# 🕉️ Vedic Age Calculator

A modern, precision age calculator and life metrics explorer built with **React**, **Vite**, **Tailwind CSS**, and **shadcn/ui**, powered by authentic **Indian Vedic Astrology (वैदिक ज्योतिष)**.

Live Demo: [https://abhinav6174.github.io/age-calculator](https://abhinav6174.github.io/age-calculator)

---

## ✨ Features

- **⚡ Modern Tech Stack**: Migrated to Vite 6 + React 18 for instant builds and blazing fast HMR.
- **🎨 Shadcn UI Design System**: Built with modern accessible UI components (Card, Tabs, Badge, Button, Input, Progress, Alert) with dark and light theme support.
- **⏱️ Real-time Live Ticking Age**: Live down-to-the-second age counter displaying exact Years, Months, Days, Hours, Minutes, and Seconds.
- **🧮 100% Mathematically Exact**:
  - Eliminates calculation bugs (no naive month divisions or 30-day assumptions).
  - Handles all leap years (including leap babies born on Feb 29) and varying month lengths.
  - Distinguishes exact composite age (*X Years, Y Months, Z Days*) from continuous totals (*Total Days, Total Hours, etc.*).
- **🕉️ Indian Vedic Astrology (वैदिक ज्योतिष)**:
  - **Nirayana Surya Rashi (निरयण सूर्य राशि)**: Accurate sidereal solar rashi with Sanskrit names (मेष, वृषभ, मिथुन, कर्क, सिंह, कन्या, तुला, वृश्चिक, धनु, मकर, कुंभ, मीन).
  - **Rashi Swami (Ruling Graha)**: Mangal, Shukra, Budha, Surya, Chandra, Guru, Shani.
  - **Tattva & Guna**: Agni (Fire), Prithvi (Earth), Vayu (Air), Jala (Water) and Sattva/Rajas/Tamas.
  - **Associated Nakshatras (नक्षत्र चरण)**: The specific lunar mansions associated with your birth sign.
  - **Auspicious Ratna (लकी रत्न)**: Red Coral (Moonga), Emerald (Panna), Ruby (Manikya), Pearl (Moti), Yellow Sapphire (Pukhraj), Blue Sapphire (Neelam), Diamond (Heera).
  - **Ishta Devata**: Presiding divine energies (Lord Shiva, Hanuman, Vishnu, Lakshmi, Ganesha, Durga).
  - **Vedic Janma Vara (जन्म वार)**: Detailed day-of-week attributes, Day Lord, and Graha Bija/Smaran Mantra.
- **🎂 Upcoming Birthday Countdown**:
  - Live countdown in Days, Hours, Minutes, and Seconds.
  - Day of the week of your next birthday.
  - Interactive year progress bar showing percentage of your current age year completed.
- **📊 Total Lifetime Units**:
  - Total Months, Total Weeks, Total Days, Total Hours, Total Minutes, Total Seconds, and Milliseconds.
- **❤️ Life Milestones & Vital Statistics**:
  - Estimated lifetime heartbeats (~80 bpm).
  - Estimated lifetime breaths (~16/min).
  - Total hours spent sleeping.
  - 10,000 Days and 20,000 Days alive landmark dates.
  - Golden Birthday (age matching day of birth).
  - Half-Birthday milestone date.
- **⚙️ Advanced Controls**:
  - Optional exact time of birth (Janma Samay) input.
  - Custom target date mode (calculate age on any historic or future date).
  - Quick age presets (18, 21, 25, 30, 40, 50 years).
  - One-click copy/share summary to clipboard.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Abhinav6174/age-calculator.git
cd age-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

---

## 🛠️ Tech Stack

- **Framework**: React 18
- **Bundler**: Vite 6
- **Styling**: Tailwind CSS
- **Components**: Shadcn UI architecture (Radix-inspired accessible primitives, Lucide icons)
- **Effects**: canvas-confetti
- **Typography**: Plus Jakarta Sans & JetBrains Mono
