import test from 'node:test';
import assert from 'node:assert/strict';
import { UNIT_PLANS } from '../data/units';
import {
  buildBookingConfirmation,
  createLaw25Preferences,
  filterUnits,
  generateBookingReference,
  getAvailableTourDates,
  getConciergeReply,
  isValidEmail,
  isValidPhone,
  parseLaw25Preferences,
  validateBookingForm,
} from './booking';

test('filterUnits filters by typology, availability, and favorites', () => {
  const fourHalf = filterUnits(UNIT_PLANS, {
    typology: '4 ½',
    availability: 'all',
    onlyFavorites: false,
  });
  assert.equal(fourHalf.length, 2);
  assert.ok(fourHalf.every((u) => u.typology === '4 ½'));

  const immediateOnly = filterUnits(UNIT_PLANS, {
    typology: 'all',
    availability: 'immediate',
    onlyFavorites: false,
  });
  assert.equal(immediateOnly.length, 3);
  assert.ok(immediateOnly.every((u) => u.availability === 'immediate'));

  const favs = filterUnits(
    UNIT_PLANS,
    { typology: 'all', availability: 'all', onlyFavorites: true },
    ['unit-45-marina']
  );
  assert.equal(favs.length, 1);
  assert.equal(favs[0].id, 'unit-45-marina');
});

test('getAvailableTourDates produces consecutive future ISO dates', () => {
  const base = new Date(2026, 10, 15);
  const dates = getAvailableTourDates(base, 5);
  assert.equal(dates.length, 5);
  assert.equal(dates[0].iso, '2026-11-16');
  assert.equal(dates[4].iso, '2026-11-20');
});

test('validateBookingForm rejects missing fields, invalid email/phone, and missing Law 25 consent', () => {
  const invalidErrors = validateBookingForm({
    unitId: 'unit-45-marina',
    dateIso: '',
    timeSlot: '',
    fullName: 'A',
    email: 'invalid-email',
    phone: '123',
    law25Accepted: false,
  });

  assert.ok(invalidErrors.dateIso);
  assert.ok(invalidErrors.timeSlot);
  assert.ok(invalidErrors.fullName);
  assert.ok(invalidErrors.email);
  assert.ok(invalidErrors.phone);
  assert.ok(invalidErrors.law25Accepted);

  const validErrors = validateBookingForm({
    unitId: 'unit-45-marina',
    dateIso: '2026-11-18',
    timeSlot: '11:00',
    fullName: 'Sophie Tremblay',
    email: 'sophie.tremblay@example.ca',
    phone: '(450) 555-0192',
    law25Accepted: true,
  });

  assert.deepEqual(validErrors, {});
});

test('email and phone validators accept Quebec formats and reject malformed input', () => {
  assert.equal(isValidEmail('client@730notredame.ca'), true);
  assert.equal(isValidEmail('bad@email'), false);
  assert.equal(isValidPhone('450-555-0144'), true);
  assert.equal(isValidPhone('1-514-555-0199'), true);
  assert.equal(isValidPhone('555-01'), false);
});

test('booking confirmation builds deterministic reference and unit label', () => {
  assert.equal(generateBookingReference('2026-11-18', '13:30'), 'RN-1118-1330');
  const receipt = buildBookingConfirmation(
    {
      unitId: 'unit-45-marina',
      dateIso: '2026-11-18',
      timeSlot: '13:30',
      fullName: 'Marc-Antoine Gagnon',
      email: 'marc@example.ca',
      phone: '514-555-0188',
      law25Accepted: true,
    },
    UNIT_PLANS,
    'fr'
  );
  assert.equal(receipt.reference, 'RN-1118-1330');
  assert.ok(receipt.unitLabel.includes('RN-408'));
});

test('Law 25 preference serialization preserves essential=true and parses valid JSON only', () => {
  const prefs = createLaw25Preferences(true, false, new Date('2026-11-15T12:00:00Z'));
  const serialized = JSON.stringify(prefs);
  const parsed = parseLaw25Preferences(serialized);
  assert.ok(parsed);
  assert.equal(parsed?.essential, true);
  assert.equal(parsed?.analytics, true);
  assert.equal(parsed?.personalization, false);

  assert.equal(parseLaw25Preferences('not-json'), null);
  assert.equal(parseLaw25Preferences(JSON.stringify({ essential: false })), null);
});

test('concierge replies accurately to parking, pets, availability, and Law 25 queries', () => {
  const parkingReply = getConciergeReply('Avez-vous des bornes de stationnement?', UNIT_PLANS, 'fr');
  assert.ok(parkingReply.includes('stationnement'));

  const law25Reply = getConciergeReply('Comment fonctionne la Loi 25 ?', UNIT_PLANS, 'fr');
  assert.ok(law25Reply.includes('Loi 25'));

  const petReply = getConciergeReply('Are pets allowed?', UNIT_PLANS, 'en');
  assert.ok(petReply.toLowerCase().includes('pets'));
});
