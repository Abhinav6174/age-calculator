/**
 * Precise Age & Indian Vedic Astrology Calculation Engine
 * Replaces Western and Chinese astrology with authentic Vedic Jyotish (वैदिक ज्योतिष).
 * Uses Nirayana Solar Sidereal Rashi, Vedic Vara (Weekdays & Graha Lords),
 * Associated Nakshatras, Tattva, Rashi Swami, Lucky Ratna, and Devata.
 */

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const DAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

/**
 * 7 Vedic Varas (वार - Day of the Week) with Planetary Lords & Devata
 */
const VEDIC_VARAS = [
  {
    name: 'Ravivara',
    hindi: 'रविवार',
    english: 'Sunday',
    grahaLord: 'Surya (Sun / सूर्य)',
    deity: 'Lord Surya / Lord Shiva',
    luckyColor: 'Saffron, Orange, Gold',
    ratna: 'Manikya (Ruby / माणिक्य)',
    nature: 'Sthira (Stable & Creative)',
    mantra: 'Om Suryaya Namaha'
  },
  {
    name: 'Somavara',
    hindi: 'सोमवार',
    english: 'Monday',
    grahaLord: 'Chandra (Moon / चंद्र)',
    deity: 'Lord Shiva & Mata Parvati',
    luckyColor: 'White, Silver, Cream',
    ratna: 'Moti (Natural Pearl / मोती)',
    nature: 'Chara (Gentle & Intuitive)',
    mantra: 'Om Chandraya Namaha'
  },
  {
    name: 'Mangalavara',
    hindi: 'मंगलवार',
    english: 'Tuesday',
    grahaLord: 'Mangal (Mars / मंगल)',
    deity: 'Lord Hanuman & Kartikeya',
    luckyColor: 'Red, Crimson, Coral',
    ratna: 'Moonga (Red Coral / मूंगा)',
    nature: 'Ugra (Fierce & Courageous)',
    mantra: 'Om Angarakaya Namaha'
  },
  {
    name: 'Budhavara',
    hindi: 'बुधवार',
    english: 'Wednesday',
    grahaLord: 'Budha (Mercury / बुध)',
    deity: 'Lord Ganesha & Lord Vishnu',
    luckyColor: 'Emerald Green, Parakeet Green',
    ratna: 'Panna (Emerald / पन्ना)',
    nature: 'Mishra (Intellectual & Eloquent)',
    mantra: 'Om Budhaya Namaha'
  },
  {
    name: 'Guruvara',
    hindi: 'गुरुवार',
    english: 'Thursday',
    grahaLord: 'Brihaspati / Guru (Jupiter / बृहस्पति)',
    deity: 'Lord Vishnu & Brihaspati',
    luckyColor: 'Yellow, Mustard, Golden',
    ratna: 'Pukhraj (Yellow Sapphire / पुखराज)',
    nature: 'Kshipra (Wise & Auspicious)',
    mantra: 'Om Brihaspataye Namaha'
  },
  {
    name: 'Shukravara',
    hindi: 'शुक्रवार',
    english: 'Friday',
    grahaLord: 'Shukra (Venus / शुक्र)',
    deity: 'Mata Lakshmi',
    luckyColor: 'Bright White, Pink, Pastel',
    ratna: 'Heera / Opal (Diamond / हीरा)',
    nature: 'Mrida (Harmonious & Artistic)',
    mantra: 'Om Shukraya Namaha'
  },
  {
    name: 'Shanivara',
    hindi: 'शनिवार',
    english: 'Saturday',
    grahaLord: 'Shani Dev (Saturn / शनि)',
    deity: 'Lord Shani & Lord Hanuman',
    luckyColor: 'Deep Blue, Navy, Black',
    ratna: 'Neelam (Blue Sapphire / नीलम)',
    nature: 'Daruna (Disciplined & Resilient)',
    mantra: 'Om Sham Shanicharaya Namaha'
  }
];

/**
 * 12 Vedic Rashis (वैदिक राशियां) according to Nirayana Solar Sidereal Transit (Sankranti calendar)
 */
const VEDIC_RASHIS = [
  {
    rashi: 'Mesha',
    hindi: 'मेष',
    english: 'Aries',
    symbol: '♈',
    animal: 'Ram (मेष)',
    startDate: { month: 4, day: 14 },
    endDate: { month: 5, day: 14 },
    dates: 'Apr 14 - May 14',
    swami: 'Mangal (Mars / मंगल)',
    tattva: 'Agni (Fire / अग्नि)',
    guna: 'Rajas (Action & Drive)',
    nakshatras: 'Ashwini (अश्विनी), Bharani (भरणी), Krittika (कृत्तिका)',
    ishtaDevata: 'Lord Hanuman, Kartikeya',
    ratna: 'Red Coral (Moonga / मूंगा)',
    luckyNumbers: '9, 1, 8',
    luckyColor: 'Red, Coral, Scarlet',
    luckyDay: 'Tuesday (मंगलवार)'
  },
  {
    rashi: 'Vrishabha',
    hindi: 'वृषभ',
    english: 'Taurus',
    symbol: '♉',
    animal: 'Bull (वृषभ)',
    startDate: { month: 5, day: 15 },
    endDate: { month: 6, day: 14 },
    dates: 'May 15 - Jun 14',
    swami: 'Shukra (Venus / शुक्र)',
    tattva: 'Prithvi (Earth / पृथ्वी)',
    guna: 'Rajas (Stability & Luxury)',
    nakshatras: 'Krittika (कृत्तिका), Rohini (रोहिणी), Mrigashira (मृगशिरा)',
    ishtaDevata: 'Goddess Lakshmi',
    ratna: 'Diamond or Opal (Heera / हीरा)',
    luckyNumbers: '6, 5, 8',
    luckyColor: 'White, Pink, Cream',
    luckyDay: 'Friday (शुक्रवार)'
  },
  {
    rashi: 'Mithuna',
    hindi: 'मिथुन',
    english: 'Gemini',
    symbol: '♊',
    animal: 'Couple / Twins (मिथुन)',
    startDate: { month: 6, day: 15 },
    endDate: { month: 7, day: 15 },
    dates: 'Jun 15 - Jul 15',
    swami: 'Budha (Mercury / बुध)',
    tattva: 'Vayu (Air / वायु)',
    guna: 'Sattva (Intellect & Communication)',
    nakshatras: 'Mrigashira (मृगशिरा), Ardra (आर्द्रा), Punarvasu (पुनर्वसु)',
    ishtaDevata: 'Lord Ganesha, Lord Vishnu',
    ratna: 'Emerald (Panna / पन्ना)',
    luckyNumbers: '5, 3, 6',
    luckyColor: 'Green, Emerald',
    luckyDay: 'Wednesday (बुधवार)'
  },
  {
    rashi: 'Karka',
    hindi: 'कर्क',
    english: 'Cancer',
    symbol: '♋',
    animal: 'Crab (कर्क)',
    startDate: { month: 7, day: 16 },
    endDate: { month: 8, day: 16 },
    dates: 'Jul 16 - Aug 16',
    swami: 'Chandra (Moon / चंद्र)',
    tattva: 'Jala (Water / जल)',
    guna: 'Sattva (Emotion & Nurturing)',
    nakshatras: 'Punarvasu (पुनर्वसु), Pushya (पुष्य), Ashlesha (आश्लेषा)',
    ishtaDevata: 'Lord Shiva',
    ratna: 'Natural Pearl (Moti / मोती)',
    luckyNumbers: '2, 7, 9',
    luckyColor: 'White, Silver, Milky',
    luckyDay: 'Monday (सोमवार)'
  },
  {
    rashi: 'Simha',
    hindi: 'सिंह',
    english: 'Leo',
    symbol: '♌',
    animal: 'Lion (सिंह)',
    startDate: { month: 8, day: 17 },
    endDate: { month: 9, day: 16 },
    dates: 'Aug 17 - Sep 16',
    swami: 'Surya (Sun / सूर्य)',
    tattva: 'Agni (Fire / अग्नि)',
    guna: 'Sattva (Leadership & Nobility)',
    nakshatras: 'Magha (मघा), Purva Phalguni (पूर्वाफाल्गुनी), Uttara Phalguni (उत्तराफाल्गुनी)',
    ishtaDevata: 'Lord Surya, Lord Shiva',
    ratna: 'Ruby (Manikya / माणिक्य)',
    luckyNumbers: '1, 4, 9',
    luckyColor: 'Gold, Orange, Copper',
    luckyDay: 'Sunday (रविवार)'
  },
  {
    rashi: 'Kanya',
    hindi: 'कन्या',
    english: 'Virgo',
    symbol: '♍',
    animal: 'Maiden (कन्या)',
    startDate: { month: 9, day: 17 },
    endDate: { month: 10, day: 16 },
    dates: 'Sep 17 - Oct 16',
    swami: 'Budha (Mercury / बुध)',
    tattva: 'Prithvi (Earth / पृथ्वी)',
    guna: 'Tamas (Analytical & Detail-oriented)',
    nakshatras: 'Uttara Phalguni (उत्तराफाल्गुनी), Hasta (हस्त), Chitra (चित्रा)',
    ishtaDevata: 'Lord Vishnu, Goddess Saraswati',
    ratna: 'Emerald (Panna / पन्ना)',
    luckyNumbers: '5, 3, 2',
    luckyColor: 'Dark Green, Jade',
    luckyDay: 'Wednesday (बुधवार)'
  },
  {
    rashi: 'Tula',
    hindi: 'तुला',
    english: 'Libra',
    symbol: '♎',
    animal: 'Balance Scales (तुला)',
    startDate: { month: 10, day: 17 },
    endDate: { month: 11, day: 15 },
    dates: 'Oct 17 - Nov 15',
    swami: 'Shukra (Venus / शुक्र)',
    tattva: 'Vayu (Air / वायु)',
    guna: 'Rajas (Harmony & Justice)',
    nakshatras: 'Chitra (चित्रा), Swati (स्वाती), Vishakha (विशाखा)',
    ishtaDevata: 'Goddess Lakshmi, Goddess Durga',
    ratna: 'Diamond or Opal (Heera / हीरा)',
    luckyNumbers: '6, 5, 8',
    luckyColor: 'White, Light Blue, Turquoise',
    luckyDay: 'Friday (शुक्रवार)'
  },
  {
    rashi: 'Vrishchika',
    hindi: 'वृश्चिक',
    english: 'Scorpio',
    symbol: '♏',
    animal: 'Scorpion (वृश्चिक)',
    startDate: { month: 11, day: 16 },
    endDate: { month: 12, day: 15 },
    dates: 'Nov 16 - Dec 15',
    swami: 'Mangal / Ketu (Mars / मंगल)',
    tattva: 'Jala (Water / जल)',
    guna: 'Tamas (Transformation & Mysticism)',
    nakshatras: 'Vishakha (विशाखा), Anuradha (अनुराधा), Jyeshtha (ज्येष्ठा)',
    ishtaDevata: 'Lord Hanuman, Lord Shiva',
    ratna: 'Red Coral (Moonga / मूंगा)',
    luckyNumbers: '9, 1, 4',
    luckyColor: 'Maroon, Crimson, Dark Red',
    luckyDay: 'Tuesday (मंगलवार)'
  },
  {
    rashi: 'Dhanu',
    hindi: 'धनु',
    english: 'Sagittarius',
    symbol: '♐',
    animal: 'Bow & Arrow / Centaur (धनु)',
    startDate: { month: 12, day: 16 },
    endDate: { month: 1, day: 13 },
    dates: 'Dec 16 - Jan 13',
    swami: 'Guru / Brihaspati (Jupiter / बृहस्पति)',
    tattva: 'Agni (Fire / अग्नि)',
    guna: 'Sattva (Wisdom & Dharma)',
    nakshatras: 'Mula (मूल), Purva Ashadha (पूर्वाषाढ़ा), Uttara Ashadha (उत्तराषाढ़ा)',
    ishtaDevata: 'Lord Vishnu, Dakshinamoorthy',
    ratna: 'Yellow Sapphire (Pukhraj / पुखराज)',
    luckyNumbers: '3, 9, 7',
    luckyColor: 'Yellow, Saffron, Amber',
    luckyDay: 'Thursday (गुरुवार)'
  },
  {
    rashi: 'Makara',
    hindi: 'मकर',
    english: 'Capricorn',
    symbol: '♑',
    animal: 'Crocodile (मकर)',
    startDate: { month: 1, day: 14 },
    endDate: { month: 2, day: 12 },
    dates: 'Jan 14 - Feb 12',
    swami: 'Shani Dev (Saturn / शनि)',
    tattva: 'Prithvi (Earth / पृथ्वी)',
    guna: 'Tamas (Perseverance & Discipline)',
    nakshatras: 'Uttara Ashadha (उत्तराषाढ़ा), Shravana (श्रवण), Dhanishta (धनिष्ठा)',
    ishtaDevata: 'Lord Shani, Lord Shiva',
    ratna: 'Blue Sapphire (Neelam / नीलम)',
    luckyNumbers: '8, 6, 4',
    luckyColor: 'Black, Navy Blue, Grey',
    luckyDay: 'Saturday (शनिवार)'
  },
  {
    rashi: 'Kumbha',
    hindi: 'कुंभ',
    english: 'Aquarius',
    symbol: '♒',
    animal: 'Water Pitcher (कुंभ)',
    startDate: { month: 2, day: 13 },
    endDate: { month: 3, day: 13 },
    dates: 'Feb 13 - Mar 13',
    swami: 'Shani Dev / Rahu (Saturn / शनि)',
    tattva: 'Vayu (Air / वायु)',
    guna: 'Tamas (Humanitarian & Philosophical)',
    nakshatras: 'Dhanishta (धनिष्ठा), Shatabhisha (शतभिषा), Purva Bhadrapada (पूर्वाभाद्रपद)',
    ishtaDevata: 'Lord Shiva, Lord Hanuman',
    ratna: 'Blue Sapphire (Neelam / नीलम)',
    luckyNumbers: '8, 4, 6',
    luckyColor: 'Royal Blue, Violet, Electric Blue',
    luckyDay: 'Saturday (शनिवार)'
  },
  {
    rashi: 'Meena',
    hindi: 'मीन',
    english: 'Pisces',
    symbol: '♓',
    animal: 'Two Fish (मीन)',
    startDate: { month: 3, day: 14 },
    endDate: { month: 4, day: 13 },
    dates: 'Mar 14 - Apr 13',
    swami: 'Guru / Brihaspati (Jupiter / बृहस्पति)',
    tattva: 'Jala (Water / जल)',
    guna: 'Sattva (Moksha & Compassion)',
    nakshatras: 'Purva Bhadrapada (पूर्वाभाद्रपद), Uttara Bhadrapada (उत्तराभाद्रपद), Revati (रेवती)',
    ishtaDevata: 'Lord Vishnu, Lord Shiva',
    ratna: 'Yellow Sapphire (Pukhraj / पुखराज)',
    luckyNumbers: '3, 9, 2',
    luckyColor: 'Yellow, Sea Green, Pale Gold',
    luckyDay: 'Thursday (गुरुवार)'
  }
];

/**
 * Calculates Vedic Solar Rashi (निरयण सूर्य राशि) based on date of birth
 * month: 1..12, day: 1..31
 */
export function getVedicRashi(month, day) {
  if ((month === 4 && day >= 14) || (month === 5 && day <= 14)) {
    return VEDIC_RASHIS[0]; // Mesha
  } else if ((month === 5 && day >= 15) || (month === 6 && day <= 14)) {
    return VEDIC_RASHIS[1]; // Vrishabha
  } else if ((month === 6 && day >= 15) || (month === 7 && day <= 15)) {
    return VEDIC_RASHIS[2]; // Mithuna
  } else if ((month === 7 && day >= 16) || (month === 8 && day <= 16)) {
    return VEDIC_RASHIS[3]; // Karka
  } else if ((month === 8 && day >= 17) || (month === 9 && day <= 16)) {
    return VEDIC_RASHIS[4]; // Simha
  } else if ((month === 9 && day >= 17) || (month === 10 && day <= 16)) {
    return VEDIC_RASHIS[5]; // Kanya
  } else if ((month === 10 && day >= 17) || (month === 11 && day <= 15)) {
    return VEDIC_RASHIS[6]; // Tula
  } else if ((month === 11 && day >= 16) || (month === 12 && day <= 15)) {
    return VEDIC_RASHIS[7]; // Vrishchika
  } else if ((month === 12 && day >= 16) || (month === 1 && day <= 13)) {
    return VEDIC_RASHIS[8]; // Dhanu
  } else if ((month === 1 && day >= 14) || (month === 2 && day <= 12)) {
    return VEDIC_RASHIS[9]; // Makara
  } else if ((month === 2 && day >= 13) || (month === 3 && day <= 13)) {
    return VEDIC_RASHIS[10]; // Kumbha
  } else {
    return VEDIC_RASHIS[11]; // Meena
  }
}

/**
 * Returns Vedic Weekday info (वार)
 * dayOfWeek: 0 (Sunday) to 6 (Saturday)
 */
export function getVedicVara(dayOfWeek) {
  return VEDIC_VARAS[dayOfWeek % 7];
}

/**
 * Helper to safely add months while preserving max days in target month.
 */
function addMonthsClamped(date, monthsToAdd, originalDay) {
  const currentTotalMonths = date.getFullYear() * 12 + date.getMonth() + monthsToAdd;
  const targetYear = Math.floor(currentTotalMonths / 12);
  const targetMonth = currentTotalMonths % 12;
  const daysInTargetMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
  const targetDay = Math.min(originalDay, daysInTargetMonth);

  return new Date(
    targetYear,
    targetMonth,
    targetDay,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  );
}

/**
 * Calculates exact age between birthDate and targetDate
 */
export function calculateDetailedAge(birthDate, targetDate = new Date()) {
  if (!birthDate || isNaN(birthDate.getTime())) {
    return null;
  }

  const diffMs = targetDate.getTime() - birthDate.getTime();
  const isFuture = diffMs < 0;

  if (isFuture) {
    return {
      isFuture: true,
      timeUntilBirthMs: Math.abs(diffMs),
    };
  }

  const originalDay = birthDate.getDate();

  // 1. Exact Calendar Years
  let years = targetDate.getFullYear() - birthDate.getFullYear();
  let cursor = addMonthsClamped(birthDate, years * 12, originalDay);
  if (cursor > targetDate) {
    years -= 1;
    cursor = addMonthsClamped(birthDate, years * 12, originalDay);
  }

  // 2. Exact Calendar Months
  let months = 0;
  while (true) {
    const nextCursor = addMonthsClamped(birthDate, years * 12 + months + 1, originalDay);
    if (nextCursor <= targetDate) {
      months += 1;
      cursor = nextCursor;
    } else {
      break;
    }
  }

  // 3. Exact Days, Hours, Minutes, Seconds, Milliseconds from cursor to targetDate
  let remainderMs = targetDate.getTime() - cursor.getTime();

  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const MS_PER_HOUR = 60 * 60 * 1000;
  const MS_PER_MINUTE = 60 * 1000;
  const MS_PER_SECOND = 1000;

  const days = Math.floor(remainderMs / MS_PER_DAY);
  remainderMs -= days * MS_PER_DAY;

  const hours = Math.floor(remainderMs / MS_PER_HOUR);
  remainderMs -= hours * MS_PER_HOUR;

  const minutes = Math.floor(remainderMs / MS_PER_MINUTE);
  remainderMs -= minutes * MS_PER_MINUTE;

  const seconds = Math.floor(remainderMs / MS_PER_SECOND);
  remainderMs -= seconds * MS_PER_SECOND;

  const milliseconds = remainderMs;

  // Total Lifetime Units
  const totalDays = Math.floor(diffMs / MS_PER_DAY);
  const totalHours = Math.floor(diffMs / MS_PER_HOUR);
  const totalMinutes = Math.floor(diffMs / MS_PER_MINUTE);
  const totalSeconds = Math.floor(diffMs / MS_PER_SECOND);
  const totalMilliseconds = diffMs;
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingWeekDays = totalDays % 7;
  const totalMonthsExact = (years * 12 + months + days / 30.4375).toFixed(1);
  const totalYearsExact = (diffMs / (365.2425 * MS_PER_DAY)).toFixed(2);

  // Next Birthday Calculation
  const birthMonth = birthDate.getMonth();
  const birthDay = birthDate.getDate();
  const currentYear = targetDate.getFullYear();

  // Handle Feb 29 for non-leap years
  const getBirthdayForYear = (year) => {
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const day = (birthMonth === 1 && birthDay === 29 && !isLeap) ? 28 : birthDay;
    return new Date(
      year,
      birthMonth,
      day,
      birthDate.getHours(),
      birthDate.getMinutes(),
      birthDate.getSeconds()
    );
  };

  let nextBirthday = getBirthdayForYear(currentYear);
  let previousBirthday = getBirthdayForYear(currentYear - 1);

  if (nextBirthday.getTime() < targetDate.getTime()) {
    previousBirthday = nextBirthday;
    nextBirthday = getBirthdayForYear(currentYear + 1);
  }

  const isBirthdayToday =
    targetDate.getMonth() === birthMonth &&
    targetDate.getDate() === birthDay;

  const nextBirthdayDiffMs = Math.max(0, nextBirthday.getTime() - targetDate.getTime());
  const nextBirthdayDays = Math.floor(nextBirthdayDiffMs / MS_PER_DAY);
  const nextBirthdayHours = Math.floor((nextBirthdayDiffMs % MS_PER_DAY) / MS_PER_HOUR);
  const nextBirthdayMinutes = Math.floor((nextBirthdayDiffMs % MS_PER_HOUR) / MS_PER_MINUTE);
  const nextBirthdaySeconds = Math.floor((nextBirthdayDiffMs % MS_PER_MINUTE) / MS_PER_SECOND);

  const totalYearSpanMs = nextBirthday.getTime() - previousBirthday.getTime();
  const elapsedYearSpanMs = targetDate.getTime() - previousBirthday.getTime();
  const yearProgressPercent = Math.min(
    100,
    Math.max(0, (elapsedYearSpanMs / totalYearSpanMs) * 100)
  );

  const turningAge = nextBirthday.getFullYear() - birthDate.getFullYear();
  const nextBirthdayDayName = DAY_NAMES[nextBirthday.getDay()];

  // Vedic Jyotish Attributes
  const vedicRashi = getVedicRashi(birthMonth + 1, birthDay);
  const vedicVara = getVedicVara(birthDate.getDay());
  const dayBornName = DAY_NAMES[birthDate.getDay()];

  // Life Milestones
  const heartbeats = Math.floor(totalMinutes * 80); // avg 80 bpm
  const breaths = Math.floor(totalMinutes * 16); // avg 16 breaths/min
  const sleepHours = Math.floor(totalDays * 8); // avg 8 hours/day
  const tenThousandDaysDate = new Date(birthDate.getTime() + 10000 * MS_PER_DAY);
  const twentyThousandDaysDate = new Date(birthDate.getTime() + 20000 * MS_PER_DAY);
  const goldenBirthdayAge = birthDay;
  const halfBirthdayDate = new Date(birthDate.getFullYear() + years, birthMonth + 6, birthDay);

  return {
    isFuture: false,
    composite: {
      years,
      months,
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
    },
    totals: {
      years: totalYearsExact,
      months: totalMonthsExact,
      weeks: totalWeeks,
      remainingWeekDays,
      days: totalDays,
      hours: totalHours,
      minutes: totalMinutes,
      seconds: totalSeconds,
      milliseconds: totalMilliseconds,
    },
    nextBirthday: {
      date: nextBirthday,
      days: nextBirthdayDays,
      hours: nextBirthdayHours,
      minutes: nextBirthdayMinutes,
      seconds: nextBirthdaySeconds,
      dayName: nextBirthdayDayName,
      turningAge,
      progressPercent: yearProgressPercent,
      isToday: isBirthdayToday,
    },
    vedic: {
      rashi: vedicRashi,
      vara: vedicVara,
      dayBornName,
      monthName: MONTH_NAMES[birthMonth],
    },
    milestones: {
      heartbeats,
      breaths,
      sleepHours,
      tenThousandDaysDate,
      twentyThousandDaysDate,
      goldenBirthdayAge,
      halfBirthdayDate,
    },
  };
}
