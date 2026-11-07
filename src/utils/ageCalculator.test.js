import { calculateDetailedAge } from './ageCalculator.js';

function assert(condition, message) {
  if (!condition) {
    console.error('❌ ASSERTION FAILED:', message);
    process.exit(1);
  } else {
    console.log('✅ PASS:', message);
  }
}

console.log('--- Testing Precision Age Calculator Engine ---');

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

// Test 2: Month transition with varying month lengths (Jan 31 to March 1, 2023 - non-leap)
{
  const birth = new Date(2023, 0, 31, 0, 0, 0); // Jan 31, 2023
  const target = new Date(2023, 2, 1, 0, 0, 0); // Mar 1, 2023
  const res = calculateDetailedAge(birth, target);
  assert(res.composite.years === 0, 'Years should be 0');
  assert(res.composite.months === 1, 'Months should be 1 (Jan 31 to Feb 28)');
  assert(res.composite.days === 1, 'Days should be 1 (Feb 28 to Mar 1)');
}

// Test 3: Leap Year Baby (Feb 29, 2000 to Feb 28, 2001)
{
  const birth = new Date(2000, 1, 29, 0, 0, 0);
  const target = new Date(2001, 1, 28, 0, 0, 0);
  const res = calculateDetailedAge(birth, target);
  assert(res.composite.years === 1, 'Feb 29 leap baby is 1 year old on Feb 28 of non-leap year');
}

// Test 4: Future date detection
{
  const birth = new Date(2030, 0, 1);
  const target = new Date(2026, 0, 1);
  const res = calculateDetailedAge(birth, target);
  assert(res.isFuture === true, 'Future date should be detected');
}

// Test 5: Next birthday countdown
{
  const birth = new Date(2000, 10, 15); // Nov 15, 2000
  const target = new Date(2026, 10, 7); // Nov 7, 2026
  const res = calculateDetailedAge(birth, target);
  assert(res.nextBirthday.days === 8, '8 days until next birthday');
  assert(res.nextBirthday.turningAge === 26, 'Turning 26');
}

console.log('🎉 All edge-case mathematical tests passed successfully!');
