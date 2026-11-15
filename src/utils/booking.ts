import {
  BookingConfirmation,
  BookingFormInput,
  BookingValidationErrors,
  Language,
  Law25Preferences,
  UnitFilters,
  UnitPlan,
} from '../types/riviera';

export const LAW25_STORAGE_KEY = 'notredame730_law25_consent_v1';
export const FAVORITES_STORAGE_KEY = 'notredame730_favorites_v1';
export const LAW25_POLICY_VERSION = '2026.1';

export function filterUnits(
  units: UnitPlan[],
  filters: UnitFilters,
  favoriteIds: string[] = []
): UnitPlan[] {
  return units.filter((unit) => {
    if (filters.typology !== 'all' && unit.typology !== filters.typology) {
      return false;
    }
    if (filters.availability !== 'all' && unit.availability !== filters.availability) {
      return false;
    }
    if (filters.onlyFavorites && !favoriteIds.includes(unit.id)) {
      return false;
    }
    return true;
  });
}

export interface TourDateOption {
  iso: string;
  dayNameFr: string;
  dayNameEn: string;
  dayNumber: string;
  monthLabelFr: string;
  monthLabelEn: string;
}

const DAYS_FR = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
const DAYS_EN = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS_FR = ['janv.', 'févr.', 'mars', 'avr.', 'mai', 'juin', 'juil.', 'août', 'sept.', 'oct.', 'nov.', 'déc.'];
const MONTHS_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getAvailableTourDates(baseDate: Date = new Date(), count: number = 8): TourDateOption[] {
  const options: TourDateOption[] = [];
  const start = new Date(baseDate.getFullYear(), baseDate.getMonth(), baseDate.getDate());

  for (let i = 1; i <= count; i++) {
    const candidate = new Date(start);
    candidate.setDate(start.getDate() + i);
    const yyyy = candidate.getFullYear();
    const mm = String(candidate.getMonth() + 1).padStart(2, '0');
    const dd = String(candidate.getDate()).padStart(2, '0');
    const dayIdx = candidate.getDay();
    const monthIdx = candidate.getMonth();

    options.push({
      iso: `${yyyy}-${mm}-${dd}`,
      dayNameFr: DAYS_FR[dayIdx],
      dayNameEn: DAYS_EN[dayIdx],
      dayNumber: dd,
      monthLabelFr: MONTHS_FR[monthIdx],
      monthLabelEn: MONTHS_EN[monthIdx],
    });
  }
  return options;
}

export function isValidEmail(email: string): boolean {
  const trimmed = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed);
}

export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 11;
}

export function validateBookingForm(
  input: BookingFormInput,
  lang: Language = 'fr'
): BookingValidationErrors {
  const errors: BookingValidationErrors = {};

  if (!input.dateIso.trim()) {
    errors.dateIso =
      lang === 'fr'
        ? 'Veuillez sélectionner une date de visite.'
        : 'Please select a visit date.';
  }

  if (!input.timeSlot.trim()) {
    errors.timeSlot =
      lang === 'fr'
        ? 'Veuillez choisir un créneau horaire.'
        : 'Please choose a time slot.';
  }

  if (input.fullName.trim().length < 2) {
    errors.fullName =
      lang === 'fr'
        ? 'Veuillez indiquer votre nom complet (minimum 2 caractères).'
        : 'Please enter your full name (at least 2 characters).';
  }

  if (!isValidEmail(input.email)) {
    errors.email =
      lang === 'fr'
        ? 'Veuillez saisir une adresse courriel valide.'
        : 'Please enter a valid email address.';
  }

  if (!isValidPhone(input.phone)) {
    errors.phone =
      lang === 'fr'
        ? 'Veuillez entrer un numéro de téléphone à 10 chiffres (ex. 450 555-0192).'
        : 'Please enter a valid 10-digit phone number (e.g. 450-555-0192).';
  }

  if (!input.law25Accepted) {
    errors.law25Accepted =
      lang === 'fr'
        ? 'Votre consentement Loi 25 est requis pour traiter la demande de visite.'
        : 'Law 25 privacy consent is required to process your visit request.';
  }

  return errors;
}

export function generateBookingReference(dateIso: string, timeSlot: string): string {
  const dateCompact = dateIso.replace(/-/g, '').slice(-4) || '0000';
  const timeCompact = timeSlot.replace(':', '') || '0000';
  return `RN-${dateCompact}-${timeCompact}`;
}

export function buildBookingConfirmation(
  input: BookingFormInput,
  units: UnitPlan[],
  lang: Language = 'fr',
  now: Date = new Date()
): BookingConfirmation {
  const matchedUnit = units.find((u) => u.id === input.unitId);
  const unitLabel = matchedUnit
    ? `${matchedUnit.code} · ${matchedUnit.typology} (${lang === 'fr' ? matchedUnit.nameFr : matchedUnit.nameEn})`
    : lang === 'fr'
      ? 'Visite découverte générale (3 ½, 4 ½, 5 ½)'
      : 'General Discovery Tour (3 ½, 4 ½, 5 ½)';

  return {
    reference: generateBookingReference(input.dateIso, input.timeSlot),
    unitLabel,
    dateIso: input.dateIso,
    timeSlot: input.timeSlot,
    fullName: input.fullName.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    createdAtIso: now.toISOString(),
  };
}

export function createLaw25Preferences(
  analytics: boolean,
  personalization: boolean,
  now: Date = new Date()
): Law25Preferences {
  return {
    essential: true,
    analytics,
    personalization,
    decidedAtIso: now.toISOString(),
    version: LAW25_POLICY_VERSION,
  };
}

export function parseLaw25Preferences(raw: string | null): Law25Preferences | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Partial<Law25Preferences>;
    if (
      parsed &&
      parsed.essential === true &&
      typeof parsed.analytics === 'boolean' &&
      typeof parsed.personalization === 'boolean' &&
      typeof parsed.decidedAtIso === 'string'
    ) {
      return {
        essential: true,
        analytics: parsed.analytics,
        personalization: parsed.personalization,
        decidedAtIso: parsed.decidedAtIso,
        version: typeof parsed.version === 'string' ? parsed.version : LAW25_POLICY_VERSION,
      };
    }
    return null;
  } catch {
    return null;
  }
}

export function formatCurrencyCad(amount: number, lang: Language = 'fr'): string {
  const formatted = amount.toLocaleString(lang === 'fr' ? 'fr-CA' : 'en-CA');
  return lang === 'fr' ? `${formatted} $ / mois` : `$${formatted} / mo`;
}

export function getConciergeReply(
  userQuery: string,
  units: UnitPlan[],
  lang: Language = 'fr'
): string {
  const q = userQuery.toLowerCase();

  if (q.includes('loi 25') || q.includes('confidential') || q.includes('privacy') || q.includes('law 25')) {
    return lang === 'fr'
      ? 'Vos renseignements personnels sont protégés conformément à la Loi 25 du Québec. Vous pouvez consulter ou modifier vos choix de confidentialité à tout moment via le lien « Confidentialité (Loi 25) » au bas de la page.'
      : 'Your personal information is protected under Quebec Law 25. You may review or update your privacy preferences anytime via the "Privacy (Law 25)" link in the footer.';
  }

  if (q.includes('stationnement') || q.includes('parking') || q.includes('borne') || q.includes('vé') || q.includes('ev') || q.includes('garage')) {
    return lang === 'fr'
      ? 'Chaque résidence offre l’accès à un stationnement intérieur chauffé et sécurisé avec bornes de recharge rapide pour véhicules électriques (niveau 2), ainsi qu’un rangement privé pour vélos et kayaks.'
      : 'Every residence offers access to heated indoor underground parking equipped with Level 2 EV charging stations, plus dedicated bike and kayak storage lockers.';
  }

  if (q.includes('animaux') || q.includes('chien') || q.includes('chat') || q.includes('pet')) {
    return lang === 'fr'
      ? 'Oui, les animaux de compagnie (chiens et chats jusqu’à 35 lb) sont les bienvenus à la résidence Le 730 Notre-Dame, avec une station de toilettage dédiée au rez-de-jardin.'
      : 'Yes, pets (cats and dogs up to 35 lbs) are warmly welcomed at Le 730 Notre-Dame, complete with a dedicated ground-level pet washing station.';
  }

  if (
    /\b[345]\s*(½|1\/2)\b/.test(q) ||
    q.includes('plan') ||
    q.includes('dispo') ||
    q.includes('prix') ||
    q.includes('price') ||
    q.includes('unit') ||
    q.includes('loyer')
  ) {
    const immediateCount = units.filter((u) => u.availability === 'immediate').length;
    const minRent = Math.min(...units.map((u) => u.monthlyRent));
    return lang === 'fr'
      ? `Nous avons actuellement ${immediateCount} typologies disponibles immédiatement dès ${minRent.toLocaleString('fr-CA')} $/mois (3 ½, 4 ½ et 5 ½), ainsi que les réservations sur plan pour les Phases 3 & 4 (automne 2027). Souhaitez-vous réserver une visite privée ?`
      : `We currently have ${immediateCount} unit layouts ready for immediate occupancy starting at $${minRent.toLocaleString('en-CA')}/mo (1-, 2-, and 3-bedroom suites), plus pre-leasing for Phases 3 & 4 (Fall 2027). Would you like to book a private tour?`;
  }

  if (q.includes('visite') || q.includes('rendez') || q.includes('tour') || q.includes('book') || q.includes('horaire')) {
    return lang === 'fr'
      ? 'Nos conseillers en location vous accueillent tous les jours au 730, rue Notre-Dame à Repentigny. Sélectionnez une date et une heure directement dans la section « Réserver ma visite privée » ci-dessous.'
      : 'Our leasing advisors welcome you 7 days a week at 730 Notre-Dame Street in Repentigny. Choose your date and time slot directly in the Private Visit Booking section below.';
  }

  return lang === 'fr'
    ? 'Merci pour votre message. Un conseiller pour Le 730 Notre-Dame peut vous renseigner sur nos unités 3 ½, 4 ½ et 5 ½, les inclusions riveraines ou planifier votre visite privée dès aujourd’hui.'
    : 'Thank you for reaching out. A Le 730 Notre-Dame leasing advisor can assist you with 3 ½, 4 ½, and 5 ½ availability, riverfront inclusions, or scheduling a private tour today.';
}

export function buildBrochureHtmlDocument(units: UnitPlan[], lang: Language = 'fr'): string {
  const title =
    lang === 'fr'
      ? 'Le 730 Notre-Dame — Brochure Architecturale & Tarifs'
      : 'Le 730 Notre-Dame — Architectural Brochure & Rates';

  const rows = units
    .map(
      (u) => `
      <tr>
        <td style="padding:12px;border-bottom:1px solid #e4e2df;font-weight:600;">${u.code}</td>
        <td style="padding:12px;border-bottom:1px solid #e4e2df;">${lang === 'fr' ? u.nameFr : u.nameEn}</td>
        <td style="padding:12px;border-bottom:1px solid #e4e2df;">${u.typology}</td>
        <td style="padding:12px;border-bottom:1px solid #e4e2df;">${u.areaSqFt} pi²</td>
        <td style="padding:12px;border-bottom:1px solid #e4e2df;">${lang === 'fr' ? u.orientation : u.orientationEn}</td>
        <td style="padding:12px;border-bottom:1px solid #e4e2df;font-weight:600;">${formatCurrencyCad(u.monthlyRent, lang)}</td>
      </tr>`
    )
    .join('');

  return `<!doctype html>
<html lang="${lang}">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
</head>
<body style="font-family:Georgia,serif;background:#fbf9f6;color:#122338;padding:40px;max-width:900px;margin:0 auto;">
  <p style="font-family:sans-serif;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:#725b38;">Repentigny · Fleuve Saint-Laurent</p>
  <h1 style="font-size:36px;margin:8px 0 16px;">Le 730 Notre-Dame</h1>
  <p style="font-family:sans-serif;line-height:1.6;color:#2c3e50;">730, rue Notre-Dame, Repentigny (QC) J6A 2T4 · (450) 555-0192 · location@730notredame.ca</p>
  <hr style="border:none;border-top:1px solid #c5a880;margin:24px 0;" />
  <table style="width:100%;border-collapse:collapse;font-family:sans-serif;font-size:14px;">
    <thead>
      <tr style="background:#122338;color:#ffffff;text-align:left;">
        <th style="padding:12px;">Code</th>
        <th style="padding:12px;">Résidence</th>
        <th style="padding:12px;">Typologie</th>
        <th style="padding:12px;">Superficie</th>
        <th style="padding:12px;">Orientation</th>
        <th style="padding:12px;">Loyer</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
</body>
</html>`;
}
