import React, { useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar as CalendarIcon,
  Clock,
  Sparkles,
  Cake,
  Heart,
  Moon,
  Sun,
  Share2,
  Check,
  Hourglass,
  Activity,
  Bed,
  Wind,
  Gift,
  Star,
  CalendarDays
} from 'lucide-react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Logo } from '@/components/Logo';
import { calculateDetailedAge } from '@/utils/ageCalculator';

function formatNumber(num) {
  if (num === undefined || num === null || isNaN(num)) return '0';
  return Number(num).toLocaleString();
}

function formatDateDisplay(date) {
  if (!date) return '';
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('age-calc-theme') || 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('age-calc-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const [dateOfBirth, setDateOfBirth] = useState('2000-01-01');
  const [timeOfBirth, setTimeOfBirth] = useState('00:00');
  const [showTimeInput, setShowTimeInput] = useState(false);
  const [customTargetDate, setCustomTargetDate] = useState('');
  const [useCustomTarget, setUseCustomTarget] = useState(false);

  const [now, setNow] = useState(new Date());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const birthDateObj = useMemo(() => {
    if (!dateOfBirth) return null;
    const [year, month, day] = dateOfBirth.split('-').map(Number);
    if (!year || !month || !day) return null;

    let hours = 0;
    let minutes = 0;
    if (showTimeInput && timeOfBirth) {
      const [h, m] = timeOfBirth.split(':').map(Number);
      hours = isNaN(h) ? 0 : h;
      minutes = isNaN(m) ? 0 : m;
    }

    return new Date(year, month - 1, day, hours, minutes, 0, 0);
  }, [dateOfBirth, timeOfBirth, showTimeInput]);

  const targetDateObj = useMemo(() => {
    if (useCustomTarget && customTargetDate) {
      const [year, month, day] = customTargetDate.split('-').map(Number);
      if (year && month && day) {
        return new Date(year, month - 1, day, 23, 59, 59, 999);
      }
    }
    return now;
  }, [now, useCustomTarget, customTargetDate]);

  const ageData = useMemo(() => {
    if (!birthDateObj) return null;
    return calculateDetailedAge(birthDateObj, targetDateObj);
  }, [birthDateObj, targetDateObj]);

  const triggerConfetti = useCallback(() => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#a855f7', '#ec4899', '#3b82f6', '#10b981'],
      });
    } catch {
      // safe fallback
    }
  }, []);

  useEffect(() => {
    if (ageData?.nextBirthday?.isToday) {
      triggerConfetti();
    }
  }, [ageData?.nextBirthday?.isToday, triggerConfetti]);

  const setPreset = (yearsAgo) => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - yearsAgo);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    setDateOfBirth(`${yyyy}-${mm}-${dd}`);
  };

  const handleCopySummary = () => {
    if (!ageData || ageData.isFuture) return;
    const { composite, totals } = ageData;
    const text = `🎂 My Age Summary:
• Age: ${composite.years} Years, ${composite.months} Months, ${composite.days} Days
• Exact: ${composite.hours} Hours, ${composite.minutes} Minutes, ${composite.seconds} Seconds
• Total Days Lived: ${formatNumber(totals.days)} Days
• Total Heartbeats: ~${formatNumber(ageData.milestones.heartbeats)}
Calculated with Modern Age Calculator ✨`;

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const todayStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background/95 to-muted/30 transition-colors duration-300 pb-16">
      {/* Background ambient lighting */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-primary/10 blur-[130px] rounded-full dark:bg-primary/15" />
        <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-indigo-500/10 blur-[140px] rounded-full dark:bg-indigo-500/10" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation / Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-border/50">
          <div className="flex items-center gap-3">
            <Logo className="h-11 w-11" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                  Age Calculator
                </h1>
                {/* <Badge variant="accent" className="font-mono text-[11px] px-2 py-0.5">
                  v2.0
                </Badge> */}
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                Precision life metrics, live countdowns & vital statistics
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {ageData && !ageData.isFuture && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopySummary}
                className="gap-1.5 text-xs h-9"
              >
                {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Share2 className="h-4 w-4" />}
                {copied ? 'Copied!' : 'Share Age'}
              </Button>
            )}

            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 rounded-xl"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-slate-700" />}
            </Button>
          </div>
        </header>

        {/* Input Configuration Card */}
        <Card className="mt-8 border-border/70 shadow-lg shadow-black/5 dark:shadow-black/20">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                  Life Subscription Activation Date
                </CardTitle>
                <CardDescription>
                  Enter your exact date of birth to calculate live down-to-the-second age
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTimeInput(!showTimeInput)}
                  className="text-xs h-8 text-muted-foreground hover:text-foreground"
                >
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  {showTimeInput ? 'Hide Time' : 'Add Time of Birth'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setUseCustomTarget(!useCustomTarget)}
                  className="text-xs h-8 text-muted-foreground hover:text-foreground"
                >
                  <CalendarDays className="h-3.5 w-3.5 mr-1" />
                  {useCustomTarget ? 'Use Current Time' : 'Custom Target Date'}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className={showTimeInput ? 'sm:col-span-8' : 'sm:col-span-12'}>
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Birth Date
                </label>
                <div className="relative">
                  <Input
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    max={todayStr}
                    className="font-medium h-11 text-base cursor-pointer"
                  />
                </div>
              </div>

              {showTimeInput && (
                <div className="sm:col-span-4">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                    Time (Optional)
                  </label>
                  <Input
                    type="time"
                    value={timeOfBirth}
                    onChange={(e) => setTimeOfBirth(e.target.value)}
                    className="font-medium h-11 text-base"
                  />
                </div>
              )}
            </div>

            {/* Custom target date selector if enabled */}
            {useCustomTarget && (
              <div className="p-3.5 rounded-xl bg-muted/40 border border-border/50 animate-in fade-in-50">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5 block">
                  Calculate Age On This Date
                </label>
                <Input
                  type="date"
                  value={customTargetDate}
                  onChange={(e) => setCustomTargetDate(e.target.value)}
                  placeholder="Select any date"
                  className="font-medium h-10 max-w-sm"
                />
                <p className="text-xs text-muted-foreground mt-1.5">
                  Allows calculating how old you were or will be on a specific historic or future date.
                </p>
              </div>
            )}

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-xs text-muted-foreground mr-1">Quick Presets:</span>
              {[18, 21, 25, 30, 40, 50].map((years) => (
                <Button
                  key={years}
                  variant="outline"
                  size="sm"
                  onClick={() => setPreset(years)}
                  className="h-7 px-2.5 text-xs rounded-full border-dashed hover:border-solid hover:bg-primary/10 hover:text-primary transition-all"
                >
                  {years} yrs
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Validation Error: Future Date */}
        {ageData?.isFuture && (
          <Alert variant="warning" className="mt-6">
            <Hourglass className="h-4 w-4" />
            <AlertTitle>Future Date Detected</AlertTitle>
            <AlertDescription>
              The selected date is in the future. Please select a birth date in the past or today!
            </AlertDescription>
          </Alert>
        )}

        {/* Main Display Area */}
        {ageData && !ageData.isFuture && (
          <div className="mt-8 space-y-6">
            {/* Birthday Alert Banner if Today is user's birthday! */}
            {ageData.nextBirthday.isToday && (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-500/15 via-purple-500/15 to-indigo-500/15 border border-pink-500/30 flex items-center justify-between gap-4 shadow-sm animate-pulse-glow">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-pink-500 text-white flex items-center justify-center shadow-md">
                    <Cake className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-foreground flex items-center gap-2">
                      Happy Birthday! 🎉🎂
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Today you officially complete another fantastic revolution around the sun!
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={triggerConfetti}
                  className="text-xs font-semibold gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5 text-pink-500" />
                  Celebrate!
                </Button>
              </div>
            )}

            {/* HERO CARD: Exact Composite Age */}
            <Card className="border-primary/20 bg-gradient-to-b from-card via-card to-primary/5 shadow-xl shadow-primary/5 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="success" className="gap-1 px-2.5 py-0.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Age Counter
                    </Badge>
                    <span className="text-xs text-muted-foreground hidden sm:inline">
                      Born on a {ageData.dayBornName}
                    </span>
                  </div>
                  <Badge variant="outline" className="font-mono text-xs">
                    {useCustomTarget ? 'Target Date Mode' : 'Real-time Ticking'}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 pt-3">
                {/* Large Responsive Digits Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {[
                    { label: 'Years', value: ageData.composite.years, highlight: true },
                    { label: 'Months', value: ageData.composite.months, highlight: true },
                    { label: 'Days', value: ageData.composite.days, highlight: true },
                    { label: 'Hours', value: ageData.composite.hours },
                    { label: 'Minutes', value: ageData.composite.minutes },
                    { label: 'Seconds', value: ageData.composite.seconds, isTicking: true },
                  ].map((unit) => (
                    <div
                      key={unit.label}
                      className={`relative p-3.5 sm:p-4 rounded-xl border transition-all text-center ${
                        unit.highlight
                          ? 'bg-primary/10 border-primary/30 shadow-sm'
                          : 'bg-muted/40 border-border/60 hover:border-border'
                      }`}
                    >
                      <div
                        className={`font-mono-numbers text-3xl sm:text-4xl font-extrabold tracking-tight ${
                          unit.highlight
                            ? 'text-primary'
                            : unit.isTicking
                            ? 'text-indigo-400'
                            : 'text-foreground'
                        }`}
                      >
                        {String(unit.value).padStart(2, '0')}
                      </div>
                      <div className="text-[11px] uppercase tracking-wider font-semibold text-muted-foreground mt-1">
                        {unit.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Subtitle sentence */}
                <div className="p-3 rounded-xl bg-muted/30 border border-border/40 text-center text-xs sm:text-sm text-muted-foreground">
                  You are exactly{' '}
                  <span className="font-semibold text-foreground">
                    {ageData.composite.years} years, {ageData.composite.months} months, and {ageData.composite.days} days old
                  </span>
                  .
                </div>
              </CardContent>
            </Card>

            {/* TABBED DEEP DIVE SECTION (Totals, Next Birthday, Milestones) */}
            <Tabs defaultValue="totals" className="w-full">
              <TabsList className="grid grid-cols-1 sm:grid-cols-3 w-full h-auto p-1.5 gap-1">
                <TabsTrigger value="totals" className="gap-1.5 py-2">
                  <Activity className="h-4 w-4" />
                  Lifetime Totals
                </TabsTrigger>
                <TabsTrigger value="nextBirthday" className="gap-1.5 py-2">
                  <Cake className="h-4 w-4" />
                  Next Birthday
                </TabsTrigger>
                <TabsTrigger value="milestones" className="gap-1.5 py-2">
                  <Heart className="h-4 w-4" />
                  Life Milestones
                </TabsTrigger>
              </TabsList>

              {/* TAB 1: Total Lifetime Units */}
              <TabsContent value="totals" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Hourglass className="h-4 w-4 text-primary" />
                      Total Lifetime Units
                    </CardTitle>
                    <CardDescription>
                      Your entire existence broken down into individual continuous units of time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {[
                        { title: 'Total Months', value: `${formatNumber(ageData.totals.months)} months`, desc: 'Continuous months lived' },
                        { title: 'Total Weeks', value: `${formatNumber(ageData.totals.weeks)} wks, ${ageData.totals.remainingWeekDays} days`, desc: 'Full calendar weeks' },
                        { title: 'Total Days', value: `${formatNumber(ageData.totals.days)} days`, desc: 'Days on Planet Earth' },
                        { title: 'Total Hours', value: `${formatNumber(ageData.totals.hours)} hrs`, desc: 'Waking & sleeping hours' },
                        { title: 'Total Minutes', value: `${formatNumber(ageData.totals.minutes)} mins`, desc: 'Elapsed minutes' },
                        { title: 'Total Seconds', value: `${formatNumber(ageData.totals.seconds)} s`, desc: 'Every ticking second' },
                        { title: 'Solar Years', value: `${ageData.totals.years} yrs`, desc: 'Solar orbital cycles' },
                        { title: 'Milliseconds', value: `${formatNumber(ageData.totals.milliseconds)} ms`, desc: 'Raw timestamp duration' },
                      ].map((item) => (
                        <div
                          key={item.title}
                          className="p-3.5 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 transition-all flex flex-col justify-between"
                        >
                          <div className="text-xs text-muted-foreground font-medium">{item.title}</div>
                          <div className="font-mono-numbers text-lg sm:text-xl font-bold text-foreground mt-1 mb-1 truncate" title={item.value}>
                            {item.value}
                          </div>
                          <div className="text-[11px] text-muted-foreground/80">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB 2: Next Birthday */}
              <TabsContent value="nextBirthday" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Gift className="h-4 w-4 text-pink-500" />
                      Upcoming Birthday Countdown
                    </CardTitle>
                    <CardDescription>
                      Turning age {ageData.nextBirthday.turningAge} on {formatDateDisplay(ageData.nextBirthday.date)}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Countdown Digits */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-4 rounded-xl bg-pink-500/10 border border-pink-500/20">
                        <div className="font-mono-numbers text-3xl font-extrabold text-pink-600 dark:text-pink-400">
                          {ageData.nextBirthday.days}
                        </div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-1">
                          Days Left
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <div className="font-mono-numbers text-3xl font-extrabold text-purple-600 dark:text-purple-400">
                          {String(ageData.nextBirthday.hours).padStart(2, '0')}
                        </div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-1">
                          Hours Left
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                        <div className="font-mono-numbers text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                          {String(ageData.nextBirthday.minutes).padStart(2, '0')}
                        </div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-1">
                          Minutes Left
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                        <div className="font-mono-numbers text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                          {String(ageData.nextBirthday.seconds).padStart(2, '0')}
                        </div>
                        <div className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mt-1">
                          Seconds Left
                        </div>
                      </div>
                    </div>

                    {/* Progress of current age year */}
                    <div className="space-y-2 p-4 rounded-xl bg-muted/30 border border-border/50">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-foreground">
                          Year Progress to Age {ageData.nextBirthday.turningAge}
                        </span>
                        <span className="font-mono font-bold text-primary">
                          {ageData.nextBirthday.progressPercent.toFixed(1)}%
                        </span>
                      </div>
                      <Progress value={ageData.nextBirthday.progressPercent} className="h-2.5" />
                      <div className="flex justify-between items-center text-[11px] text-muted-foreground pt-1">
                        <span>Previous Birthday: Age {ageData.composite.years}</span>
                        <span>Falls on a {ageData.nextBirthday.dayName}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB 3: Milestones & Life Insights */}
              <TabsContent value="milestones" className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Card className="border-rose-500/20 bg-rose-500/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center gap-2 text-rose-500">
                        <Heart className="h-4 w-4" />
                        Estimated Heartbeats
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="font-mono-numbers text-2xl font-bold text-foreground">
                        ~{formatNumber(ageData.milestones.heartbeats)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Assuming average resting heart rate of 80 beats per minute
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-sky-500/20 bg-sky-500/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center gap-2 text-sky-500">
                        <Wind className="h-4 w-4" />
                        Estimated Breaths
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="font-mono-numbers text-2xl font-bold text-foreground">
                        ~{formatNumber(ageData.milestones.breaths)}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Based on normal human baseline of 16 breaths per minute
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-indigo-500/20 bg-indigo-500/5">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold flex items-center gap-2 text-indigo-500">
                        <Bed className="h-4 w-4" />
                        Time Spent Sleeping
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="font-mono-numbers text-2xl font-bold text-foreground">
                        ~{formatNumber(ageData.milestones.sleepHours)} hrs
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Approximately {(ageData.milestones.sleepHours / (365.25 * 24)).toFixed(1)} full years spent resting & dreaming
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Star className="h-4 w-4 text-amber-500" />
                      Key Life Landmarks
                    </CardTitle>
                    <CardDescription>Special calendar benchmarks and milestones</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3.5 rounded-xl border border-border/50 bg-muted/20">
                        <div className="text-xs text-muted-foreground font-medium">10,000 Days Alive Date</div>
                        <div className="text-base font-bold text-foreground mt-1">
                          {formatDateDisplay(ageData.milestones.tenThousandDaysDate)}
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">
                          {ageData.totals.days >= 10000 ? '✅ Passed milestone!' : `In ${formatNumber(10000 - ageData.totals.days)} days`}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-border/50 bg-muted/20">
                        <div className="text-xs text-muted-foreground font-medium">20,000 Days Alive Date</div>
                        <div className="text-base font-bold text-foreground mt-1">
                          {formatDateDisplay(ageData.milestones.twentyThousandDaysDate)}
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">
                          {ageData.totals.days >= 20000 ? '✅ Passed milestone!' : `In ${formatNumber(20000 - ageData.totals.days)} days`}
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-border/50 bg-muted/20">
                        <div className="text-xs text-muted-foreground font-medium">Golden Birthday</div>
                        <div className="text-base font-bold text-foreground mt-1">
                          Turning {ageData.milestones.goldenBirthdayAge} years old
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">
                          When your age matches the day of the month you were born
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl border border-border/50 bg-muted/20">
                        <div className="text-xs text-muted-foreground font-medium">Half-Birthday</div>
                        <div className="text-base font-bold text-foreground mt-1">
                          {formatDateDisplay(ageData.milestones.halfBirthdayDate)}
                        </div>
                        <div className="text-[11px] text-muted-foreground mt-0.5">
                          Exact 6-month celebration mark
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-xs text-muted-foreground pt-8 border-t border-border/40 space-y-1">
          <p>
            Precision Age Calculator &copy; {new Date().getFullYear()} &bull; Built with React, Vite & Shadcn UI
          </p>
          <p className="text-[11px] text-muted-foreground/70">
            Accounts for leap years, variable calendar month lengths, and exact astronomical cycles.
          </p>
        </footer>
      </div>
    </div>
  );
}
