import { calculateDetailedAge, getVedicRashi, getVedicVara } from './ageCalculator.js';

function assert(condition, message) {
  if (!condition) {
    console.error('❌ ASSERTION FAILED:', message);
    process.exit(1);
  } else {
    console.log('✅ PASS:', message);
  }
}

console.log('--- Testing Vedic Age Calculator Engine ---');

// Test 1: Standard 10 year difference
{
  const birth = new Date(2010, 5, 15, 10, 0, 0); // June 15, 2010
  const target = new Date(2020, 5, 15, 10, 0, 0); // June 15, 2020
  const res = calculateDetailedAge(birth, target);
  assert(res.composite.years === 10, 'Years should be 10');
  assert(res.composite.months === 0, 'Months should be 0');
  assert(res.composite.days === 0, 'Days should be 0');
  assert(res.nextBirthday.isToday === true, 'Next birthday should be marked as today');
}

// Test 2: Vedic Rashi calculation
{
  // Mesha (Apr 14 - May 14)
  const mesha = getVedicRashi(4, 20);
  assert(mesha.rashi === 'Mesha', 'April 20 is Mesha Rashi');
  assert(mesha.hindi === 'मेष', 'Mesha Hindi is मेष');
  assert(mesha.swami.includes('Mangal'), 'Mesha swami is Mangal');

  // Makara (Jan 14 - Feb 12 - Makar Sankranti)
  const makara = getVedicRashi(1, 15);
  assert(makara.rashi === 'Makara', 'Jan 15 is Makara Rashi');
  assert(makara.hindi === 'मकर', 'Makara Hindi is मकर');
  assert(makara.swami.includes('Shani'), 'Makara swami is Shani');

  // Simha (Aug 17 - Sep 16)
  const simha = getVedicRashi(8, 25);
  assert(simha.rashi === 'Simha', 'Aug 25 is Simha Rashi');
  assert(simha.hindi === 'सिंह', 'Simha Hindi is सिंह');
  assert(simha.swami.includes('Surya'), 'Simha swami is Surya');
}

// Test 3: Vedic Vara calculation
{
  // Sunday = 0
  const ravi = getVedicVara(0);
  assert(ravi.hindi === 'रविवार', '0 is Ravivara');
  assert(ravi.grahaLord.includes('Surya'), 'Ravivara lord is Surya');

  // Tuesday = 2
  const mangal = getVedicVara(2);
  assert(mangal.hindi === 'मंगलवार', '2 is Mangalavara');
  assert(mangal.grahaLord.includes('Mangal'), 'Mangalavara lord is Mangal');
}

// Test 4: Leap Year Baby (Feb 29, 2000 to Feb 28, 2001)
{
  const birth = new Date(2000, 1, 29, 0, 0, 0);
  const target = new Date(2001, 1, 28, 0, 0, 0);
  const res = calculateDetailedAge(birth, target);
  assert(res.composite.years === 1, 'Feb 29 leap baby is 1 year old on Feb 28 of non-leap year');
}

console.log('🎉 All Vedic Jyotish & mathematical tests passed successfully!');
