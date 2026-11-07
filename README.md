# 🎂 Precision Age Calculator

A modern, precision age calculator and life metrics explorer built with **React 18**, **Vite 6**, **Tailwind CSS**, and **shadcn/ui**.

Live Demo: [https://abhinav6174.github.io/age-calculator](https://abhinav6174.github.io/age-calculator)

---

## ✨ Features

- **⚡ Modern Tech Stack**: Built with Vite 6 + React 18 for instant load times and fast HMR.
- **🎨 Shadcn UI Design System**: Clean, responsive UI components (Card, Tabs, Badge, Button, Input, Progress, Alert) with dark and light theme toggle.
- **⏱️ Real-time Live Ticking Age**: Live down-to-the-second age counter displaying exact Years, Months, Days, Hours, Minutes, and Seconds.
- **🧮 100% Mathematically Exact**:
  - Eliminates calculation bugs (no naive month divisions or 30-day assumptions).
  - Handles all leap years (including babies born on Feb 29) and varying month lengths (28, 29, 30, 31 days).
  - Distinguishes exact composite age (*X Years, Y Months, Z Days*) from continuous totals (*Total Days, Total Hours, etc.*).
- **🎉 Birthday Celebration**: Automatic confetti animation and celebration banner when visited on your birthday.
- **🎂 Upcoming Birthday Countdown**:
  - Live countdown in Days, Hours, Minutes, and Seconds.
  - Day of the week of your next birthday.
  - Interactive year progress bar showing percentage of your current age year completed.
- **📊 Total Lifetime Units**:
  - Total Months, Total Weeks, Total Days, Total Hours, Total Minutes, Total Seconds, and Milliseconds.
- **❤️ Life Milestones & Vital Statistics**:
  - Estimated lifetime heartbeats (~80 bpm).
  - Estimated lifetime breaths (~16/min).
  - Total hours spent sleeping (~8 hrs/day).
  - 10,000 Days and 20,000 Days alive landmark dates.
  - Golden Birthday (age matching day of birth).
  - Half-Birthday milestone date.
- **⚙️ Advanced Controls**:
  - Optional exact time of birth input.
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
