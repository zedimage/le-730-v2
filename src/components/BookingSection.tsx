import React, { useMemo, useState } from 'react';
import { Calendar, CheckCircle2, Clock, Mail, Phone, ShieldCheck, User } from 'lucide-react';
import { AVAILABLE_TIME_SLOTS, PROJECT_CONTACT, UNIT_PLANS } from '../data/units';
import {
  BookingConfirmation,
  BookingValidationErrors,
  Language,
} from '../types/riviera';
import {
  buildBookingConfirmation,
  getAvailableTourDates,
  validateBookingForm,
} from '../utils/booking';

interface BookingSectionProps {
  lang: Language;
  selectedUnitId: string;
  onChangeSelectedUnitId: (unitId: string) => void;
  onOpenPrivacy: () => void;
  onBookingCompleted?: (confirmation: BookingConfirmation) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  lang,
  selectedUnitId,
  onChangeSelectedUnitId,
  onOpenPrivacy,
  onBookingCompleted,
}) => {
  const tourDates = useMemo(() => getAvailableTourDates(new Date(), 8), []);
  const [dateIso, setDateIso] = useState<string>(tourDates[0]?.iso ?? '');
  const [timeSlot, setTimeSlot] = useState<string>(AVAILABLE_TIME_SLOTS[1]);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [law25Accepted, setLaw25Accepted] = useState(false);
  const [errors, setErrors] = useState<BookingValidationErrors>({});
  const [confirmation, setConfirmation] = useState<BookingConfirmation | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = validateBookingForm(
      {
        unitId: selectedUnitId,
        dateIso,
        timeSlot,
        fullName,
        email,
        phone,
        law25Accepted,
      },
      lang
    );

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const receipt = buildBookingConfirmation(
      {
        unitId: selectedUnitId,
        dateIso,
        timeSlot,
        fullName,
        email,
        phone,
        law25Accepted,
      },
      UNIT_PLANS,
      lang
    );
    setConfirmation(receipt);
    onBookingCompleted?.(receipt);
  };

  const handleReset = () => {
    setConfirmation(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setLaw25Accepted(false);
    setErrors({});
  };

  return (
    <section id="rendez-vous" className="scroll-mt-16 py-16 md:py-24 bg-[#FBF9F6]">
      <div id="contact" className="scroll-mt-16 mx-auto max-w-[1320px] px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Context & Direct Leasing Contact */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#725B38] mb-2">
                {lang === 'fr' ? 'Rendez-vous personnalisé' : 'Private Leasing Appointment'}
              </p>
              <h2 className="font-display text-[28px] leading-[36px] md:text-[40px] md:leading-[48px] font-semibold text-[#122338] text-balance">
                {lang === 'fr'
                  ? 'Réserver ma visite privée.'
                  : 'Book your private riverfront tour.'}
              </h2>
              <p className="mt-4 text-base text-[#2C3E50] leading-relaxed">
                {lang === 'fr'
                  ? 'Visitez nos unités modèles aménagées et découvrez nos disponibilités immédiates ainsi que les plans des Phases 3 & 4 avec un conseiller dédié.'
                  : 'Tour our staged model suites and review immediate availability alongside Phases 3 & 4 floor plans with a dedicated advisor.'}
              </p>
            </div>

            <div className="bg-[#EFE8DC]/60 border border-[#C5A880]/35 rounded-lg p-6 space-y-4">
              <h3 className="font-display text-xl font-medium text-[#122338]">
                {lang === 'fr' ? 'Pavillon de location' : 'Leasing Gallery'}
              </h3>
              <p className="text-sm text-[#2C3E50]">
                {PROJECT_CONTACT.address}
                <br />
                <span className="text-xs text-[#725B38] font-medium">
                  {lang === 'fr' ? PROJECT_CONTACT.hoursFr : PROJECT_CONTACT.hoursEn}
                </span>
              </p>

              <div className="flex flex-col gap-2.5 pt-2">
                <a
                  href={PROJECT_CONTACT.phoneHref}
                  className="inline-flex items-center gap-3 px-4 py-2.5 min-h-[44px] bg-[#FFFFFF] border border-[#C5A880]/35 rounded text-sm font-semibold text-[#122338] hover:border-[#122338] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#725B38]" />
                  <span className="tabular-nums">{PROJECT_CONTACT.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${PROJECT_CONTACT.email}`}
                  className="inline-flex items-center gap-3 px-4 py-2.5 min-h-[44px] bg-[#FFFFFF] border border-[#C5A880]/35 rounded text-sm font-semibold text-[#122338] hover:border-[#122338] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#725B38]" />
                  <span>{PROJECT_CONTACT.email}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Interactive Booking Card */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#C5A880]/45 rounded-lg p-6 md:p-8 shadow-ambient">
            {confirmation ? (
              <div data-testid="booking-confirmation" className="space-y-6 py-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-7 h-7 text-[#122338] shrink-0 mt-0.5" />
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#725B38] tabular-nums">
                      {lang === 'fr' ? 'Confirmation' : 'Confirmed'} · {confirmation.reference}
                    </p>
                    <h3 className="font-display text-2xl md:text-3xl font-semibold text-[#122338] mt-1">
                      {lang === 'fr'
                        ? 'Votre visite privée est réservée.'
                        : 'Your private tour is reserved.'}
                    </h3>
                  </div>
                </div>

                <div className="bg-[#FBF9F6] border border-[#C5A880]/35 rounded-lg p-5 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#725B38]">
                      {lang === 'fr' ? 'Date & Heure' : 'Date & Time'}
                    </p>
                    <p className="font-semibold text-[#122338] mt-1 tabular-nums">
                      {confirmation.dateIso} · {confirmation.timeSlot}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#725B38]">
                      {lang === 'fr' ? 'Unité sélectionnée' : 'Selected Residence'}
                    </p>
                    <p className="font-semibold text-[#122338] mt-1">{confirmation.unitLabel}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#725B38]">
                      {lang === 'fr' ? 'Visiteur' : 'Guest'}
                    </p>
                    <p className="text-[#2C3E50] mt-1">{confirmation.fullName}</p>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#725B38]">
                      {lang === 'fr' ? 'Coordonnées' : 'Contact'}
                    </p>
                    <p className="text-[#2C3E50] mt-1 tabular-nums">
                      {confirmation.email} · {confirmation.phone}
                    </p>
                  </div>
                </div>

                <p className="text-xs text-[#2C3E50] leading-relaxed">
                  {lang === 'fr'
                    ? 'Un récapitulatif vient d’être préparé pour votre dossier. Nos conseillers vous accueilleront au 730, rue Notre-Dame, Repentigny (stationnement visiteurs gratuit).'
                    : 'Your visit summary has been logged. Our leasing team will welcome you at 730 Notre-Dame Street, Repentigny (complimentary visitor parking).'}
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 min-h-[44px] border border-[#C5A880] text-[#122338] text-sm font-semibold rounded hover:bg-[#EFE8DC] transition-colors cursor-pointer"
                >
                  {lang === 'fr' ? 'Planifier une autre visite' : 'Schedule Another Tour'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                {/* 1. Unit Selector */}
                <div>
                  <label
                    htmlFor="booking-unit-select"
                    className="block text-xs font-bold uppercase tracking-[0.1em] text-[#725B38] mb-2"
                  >
                    {lang === 'fr' ? '1. Résidence souhaitée' : '1. Preferred Residence'}
                  </label>
                  <select
                    id="booking-unit-select"
                    value={selectedUnitId}
                    onChange={(e) => onChangeSelectedUnitId(e.target.value)}
                    className="w-full min-h-[44px] px-3.5 py-2.5 bg-[#FBF9F6] border border-[#C5A880]/50 rounded text-sm font-medium text-[#122338] focus:outline-none focus:border-[#122338]"
                  >
                    <option value="">
                      {lang === 'fr'
                        ? 'Visite découverte générale (3 ½, 4 ½, 5 ½)'
                        : 'General Discovery Tour (3 ½, 4 ½, 5 ½)'}
                    </option>
                    {UNIT_PLANS.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.code} · {u.typology} — {lang === 'fr' ? u.nameFr : u.nameEn} ({u.monthlyRent.toLocaleString('fr-CA')} $/mois)
                      </option>
                    ))}
                  </select>
                </div>

                {/* 2. Interactive Calendar Date Picker */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#725B38] flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{lang === 'fr' ? '2. Date de visite' : '2. Tour Date'}</span>
                    </span>
                    {errors.dateIso && (
                      <span className="text-xs font-medium text-[#9E2A2B]">{errors.dateIso}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                    {tourDates.map((d) => {
                      const active = dateIso === d.iso;
                      return (
                        <button
                          key={d.iso}
                          type="button"
                          onClick={() => {
                            setDateIso(d.iso);
                            setErrors((prev) => ({ ...prev, dateIso: undefined }));
                          }}
                          aria-pressed={active}
                          className={`py-2.5 px-2 rounded border text-center transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#122338] text-[#FBF9F6] border-[#122338]'
                              : 'bg-[#FBF9F6] text-[#122338] border-[#C5A880]/40 hover:border-[#122338]'
                          }`}
                        >
                          <span className="block text-[10px] uppercase tracking-wider opacity-80">
                            {lang === 'fr' ? d.dayNameFr : d.dayNameEn}
                          </span>
                          <span className="block font-display text-lg font-semibold tabular-nums leading-tight mt-0.5">
                            {d.dayNumber}
                          </span>
                          <span className="block text-[10px] opacity-80">
                            {lang === 'fr' ? d.monthLabelFr : d.monthLabelEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Horizontal Time Slots */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#725B38] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{lang === 'fr' ? '3. Plage horaire' : '3. Time Slot'}</span>
                    </span>
                    {errors.timeSlot && (
                      <span className="text-xs font-medium text-[#9E2A2B]">{errors.timeSlot}</span>
                    )}
                  </div>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {AVAILABLE_TIME_SLOTS.map((slot) => {
                      const active = timeSlot === slot;
                      return (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => {
                            setTimeSlot(slot);
                            setErrors((prev) => ({ ...prev, timeSlot: undefined }));
                          }}
                          aria-pressed={active}
                          className={`py-2.5 px-3 min-h-[42px] rounded border text-sm font-semibold tabular-nums transition-colors cursor-pointer ${
                            active
                              ? 'bg-[#C5A880] text-[#FFFFFF] border-[#C5A880]'
                              : 'bg-[#FBF9F6] text-[#122338] border-[#C5A880]/40 hover:border-[#122338]'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 4. Three Essential Fields */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-[#C5A880]/25">
                  <div>
                    <label
                      htmlFor="booking-fullname"
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#122338] mb-1.5"
                    >
                      <User className="w-3.5 h-3.5 text-[#725B38]" />
                      <span>{lang === 'fr' ? 'Nom complet' : 'Full Name'}</span>
                    </label>
                    <input
                      id="booking-fullname"
                      type="text"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (errors.fullName) setErrors((p) => ({ ...p, fullName: undefined }));
                      }}
                      placeholder={lang === 'fr' ? 'Sophie Tremblay' : 'Sophie Tremblay'}
                      className="w-full min-h-[44px] px-3.5 py-2 bg-[#FBF9F6] border border-[#C5A880]/50 rounded text-sm text-[#122338] placeholder:text-[#74777D] focus:outline-none focus:border-[#122338]"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-[#9E2A2B]">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-email"
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#122338] mb-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#725B38]" />
                      <span>{lang === 'fr' ? 'Courriel' : 'Email'}</span>
                    </label>
                    <input
                      id="booking-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                      }}
                      placeholder="nom@exemple.ca"
                      className="w-full min-h-[44px] px-3.5 py-2 bg-[#FBF9F6] border border-[#C5A880]/50 rounded text-sm text-[#122338] placeholder:text-[#74777D] focus:outline-none focus:border-[#122338]"
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-[#9E2A2B]">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="flex items-center gap-1.5 text-xs font-semibold text-[#122338] mb-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#725B38]" />
                      <span>{lang === 'fr' ? 'Téléphone' : 'Phone'}</span>
                    </label>
                    <input
                      id="booking-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
                      }}
                      placeholder="(450) 555-0192"
                      className="w-full min-h-[44px] px-3.5 py-2 bg-[#FBF9F6] border border-[#C5A880]/50 rounded text-sm text-[#122338] placeholder:text-[#74777D] focus:outline-none focus:border-[#122338] tabular-nums"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-[#9E2A2B]">{errors.phone}</p>
                    )}
                  </div>
                </div>

                {/* Explicit Law 25 Consent Checkbox */}
                <div className="space-y-1.5">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={law25Accepted}
                      onChange={(e) => {
                        setLaw25Accepted(e.target.checked);
                        if (errors.law25Accepted) {
                          setErrors((p) => ({ ...p, law25Accepted: undefined }));
                        }
                      }}
                      className="mt-1 w-4 h-4 accent-[#122338] shrink-0 cursor-pointer"
                    />
                    <span className="text-xs text-[#2C3E50] leading-relaxed">
                      {lang === 'fr' ? (
                        <>
                          Conformément à la <strong>Loi 25 (Québec / Canada)</strong>, j’accepte que mes renseignements personnels soient utilisés uniquement pour planifier ma visite privée.{' '}
                          <button
                            type="button"
                            onClick={onOpenPrivacy}
                            className="underline font-semibold text-[#122338] hover:text-[#725B38] cursor-pointer"
                          >
                            Consulter la politique de confidentialité
                          </button>
                          .
                        </>
                      ) : (
                        <>
                          In accordance with <strong>Quebec Law 25 (Canada)</strong>, I consent to the collection of my personal details solely to schedule my private tour.{' '}
                          <button
                            type="button"
                            onClick={onOpenPrivacy}
                            className="underline font-semibold text-[#122338] hover:text-[#725B38] cursor-pointer"
                          >
                            View Privacy Policy
                          </button>
                          .
                        </>
                      )}
                    </span>
                  </label>
                  {errors.law25Accepted && (
                    <p className="text-xs text-[#9E2A2B] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.law25Accepted}</span>
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 min-h-[48px] bg-[#122338] text-[#FBF9F6] text-[15px] font-semibold tracking-[0.03em] rounded hover:bg-[#1A365D] transition-colors cursor-pointer"
                >
                  {lang === 'fr'
                    ? 'Confirmer ma visite privée'
                    : 'Confirm My Private Tour'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
