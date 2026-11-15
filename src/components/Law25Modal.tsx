import React, { useEffect, useState } from 'react';
import { Check, ChevronDown, ChevronUp, Lock, ShieldCheck, X } from 'lucide-react';
import { PROJECT_CONTACT } from '../data/units';
import { Language, Law25Preferences } from '../types/riviera';
import { createLaw25Preferences } from '../utils/booking';

interface Law25ModalProps {
  isOpen: boolean;
  lang: Language;
  currentPreferences: Law25Preferences | null;
  onSavePreferences: (prefs: Law25Preferences) => void;
  onClose: () => void;
}

export const Law25Modal: React.FC<Law25ModalProps> = ({
  isOpen,
  lang,
  currentPreferences,
  onSavePreferences,
  onClose,
}) => {
  const [showCustomize, setShowCustomize] = useState(false);
  const [showFullPolicy, setShowFullPolicy] = useState(false);
  const [analytics, setAnalytics] = useState(currentPreferences?.analytics ?? false);
  const [personalization, setPersonalization] = useState(
    currentPreferences?.personalization ?? false
  );

  useEffect(() => {
    setAnalytics(currentPreferences?.analytics ?? false);
    setPersonalization(currentPreferences?.personalization ?? false);
  }, [currentPreferences, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && currentPreferences) {
        onClose();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, currentPreferences, onClose]);

  if (!isOpen) return null;

  const handleAcceptAll = () => {
    onSavePreferences(createLaw25Preferences(true, true));
  };

  const handleRefuseNonEssential = () => {
    onSavePreferences(createLaw25Preferences(false, false));
  };

  const handleSaveCustom = () => {
    onSavePreferences(createLaw25Preferences(analytics, personalization));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="law25-title"
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-3 sm:p-5 bg-[#000C1E]/60 backdrop-blur-xs"
    >
      <div className="w-full max-w-2xl max-h-[88vh] overflow-y-auto bg-[#FBF9F6] border border-[#C5A880]/60 rounded-lg shadow-ambient">
        {/* Header */}
        <div className="px-5 sm:px-7 py-4 bg-[#122338] text-[#FBF9F6] flex items-center justify-between gap-4 border-b border-[#C5A880]/30">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#C5A880]">
                {lang === 'fr'
                  ? 'Conformité Québec / Canada · Loi 25'
                  : 'Quebec / Canada Compliance · Law 25'}
              </p>
              <h2 id="law25-title" className="font-display text-lg sm:text-xl font-medium">
                {lang === 'fr'
                  ? 'Respect de la confidentialité et renseignements personnels'
                  : 'Respect for Confidentiality & Personal Information'}
              </h2>
            </div>
          </div>
          {currentPreferences && (
            <button
              type="button"
              onClick={onClose}
              aria-label={lang === 'fr' ? 'Fermer la fenêtre Loi 25' : 'Close Law 25 modal'}
              className="w-9 h-9 inline-flex items-center justify-center rounded border border-[#C5A880]/40 hover:bg-[#1A365D] cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-5 sm:p-7 space-y-5 text-sm text-[#2C3E50]">
          <p className="leading-relaxed">
            {lang === 'fr'
              ? 'Conformément à la Loi modernisant des dispositions législatives en matière de protection des renseignements personnels (Loi 25 au Québec, Canada), Le 730 Notre-Dame sollicite votre consentement libre et éclairé avant d’activer des témoins non essentiels ou d’enregistrer vos préférences de visite.'
              : 'In accordance with Quebec Law 25 (Act to modernize legislative provisions as regards the protection of personal information in Canada), Le 730 Notre-Dame requests your informed consent before enabling non-essential cookies or saving your leasing preferences.'}
          </p>

          {/* Expandable Granular Preferences */}
          <div className="border border-[#C5A880]/35 rounded-lg bg-[#FFFFFF] overflow-hidden">
            <button
              type="button"
              onClick={() => setShowCustomize((v) => !v)}
              aria-expanded={showCustomize}
              className="w-full px-4 py-3.5 flex items-center justify-between gap-3 text-left font-semibold text-[#122338] hover:bg-[#FBF9F6] transition-colors cursor-pointer"
            >
              <span>
                {lang === 'fr'
                  ? 'Personnaliser mes préférences de confidentialité'
                  : 'Customize My Privacy Preferences'}
              </span>
              {showCustomize ? (
                <ChevronUp className="w-4 h-4 text-[#725B38]" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#725B38]" />
              )}
            </button>

            {showCustomize && (
              <div className="px-4 pb-4 pt-2 border-t border-[#C5A880]/25 space-y-3">
                {/* Essential */}
                <div className="flex items-start justify-between gap-4 py-2">
                  <div>
                    <p className="font-semibold text-[#122338] flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-[#725B38]" />
                      <span>
                        {lang === 'fr'
                          ? 'Témoins strictement nécessaires'
                          : 'Strictly Necessary Cookies'}
                      </span>
                    </p>
                    <p className="text-xs text-[#44474D] mt-0.5">
                      {lang === 'fr'
                        ? 'Indispensables à la sécurité, la navigation et la mémorisation de votre choix Loi 25.'
                        : 'Required for site security, navigation, and remembering your Law 25 choice.'}
                    </p>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#725B38] shrink-0 pt-1">
                    {lang === 'fr' ? 'Toujours actif' : 'Always Active'}
                  </span>
                </div>

                {/* Analytics */}
                <label className="flex items-start justify-between gap-4 py-2 border-t border-[#C5A880]/20 cursor-pointer">
                  <div>
                    <span className="block font-semibold text-[#122338]">
                      {lang === 'fr'
                        ? 'Mesure d’audience anonymisée'
                        : 'Anonymized Audience Analytics'}
                    </span>
                    <span className="block text-xs text-[#44474D] mt-0.5">
                      {lang === 'fr'
                        ? 'Nous aide à améliorer la clarté des plans et des créneaux de visite.'
                        : 'Helps us improve floor plan clarity and appointment scheduling.'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    aria-label={
                      lang === 'fr'
                        ? 'Activer la mesure d’audience anonymisée'
                        : 'Enable anonymized audience analytics'
                    }
                    className="mt-1 w-5 h-5 accent-[#122338] shrink-0 cursor-pointer"
                  />
                </label>

                {/* Personalization */}
                <label className="flex items-start justify-between gap-4 py-2 border-t border-[#C5A880]/20 cursor-pointer">
                  <div>
                    <span className="block font-semibold text-[#122338]">
                      {lang === 'fr'
                        ? 'Préférences de location & favoris'
                        : 'Leasing Preferences & Shortlist'}
                    </span>
                    <span className="block text-xs text-[#44474D] mt-0.5">
                      {lang === 'fr'
                        ? 'Conserve vos unités favorites (3 ½, 4 ½, 5 ½) et facilite votre prise de rendez-vous.'
                        : 'Saves your shortlisted units and streamlines private tour booking.'}
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={personalization}
                    onChange={(e) => setPersonalization(e.target.checked)}
                    aria-label={
                      lang === 'fr'
                        ? 'Activer les préférences de location'
                        : 'Enable leasing preferences'
                    }
                    className="mt-1 w-5 h-5 accent-[#122338] shrink-0 cursor-pointer"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Expandable Full Law 25 Legal Policy & RPRP Contact */}
          <div>
            <button
              type="button"
              onClick={() => setShowFullPolicy((v) => !v)}
              aria-expanded={showFullPolicy}
              className="text-xs font-semibold text-[#122338] underline hover:text-[#725B38] cursor-pointer"
            >
              {showFullPolicy
                ? lang === 'fr'
                  ? 'Masquer les détails de la politique (Loi 25)'
                  : 'Hide Law 25 Policy Details'
                : lang === 'fr'
                  ? 'Consulter nos engagements Loi 25 & Responsable (RPRP)'
                  : 'Read Full Law 25 Commitments & Privacy Officer (RPRP)'}
            </button>

            {showFullPolicy && (
              <div className="mt-3 p-4 rounded-lg bg-[#EFE8DC]/60 border border-[#C5A880]/35 text-xs space-y-2 leading-relaxed text-[#2C3E50]">
                <p>
                  <strong>
                    {lang === 'fr'
                      ? 'Responsable de la protection des renseignements personnels (RPRP) :'
                      : 'Privacy Officer (RPRP):'}
                  </strong>{' '}
                  {PROJECT_CONTACT.privacyOfficerName} —{' '}
                  <a
                    href={`mailto:${PROJECT_CONTACT.privacyOfficerEmail}`}
                    className="underline font-semibold text-[#122338]"
                  >
                    {PROJECT_CONTACT.privacyOfficerEmail}
                  </a>
                </p>
                <p>
                  {lang === 'fr'
                    ? 'Finalités & conservation : Vos coordonnées fournies lors d’une demande de visite sont utilisées exclusivement pour le suivi locatif à Repentigny, hébergées au Canada et conservées pour une durée maximale de 24 mois.'
                    : 'Purpose & retention: Contact details submitted for tour scheduling are used strictly for leasing follow-up in Repentigny, hosted in Canada, and retained for a maximum of 24 months.'}
                </p>
                <p>
                  {lang === 'fr'
                    ? 'Vos droits : Vous disposez en tout temps d’un droit d’accès, de rectification, de portabilité et de retrait de consentement en écrivant au RPRP.'
                    : 'Your rights: You have the right to access, correct, or withdraw consent for your personal data at any time by contacting our Privacy Officer.'}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-3 border-t border-[#C5A880]/30">
            <button
              type="button"
              onClick={handleRefuseNonEssential}
              className="px-4 py-2.5 min-h-[44px] border border-[#C5A880] text-[#122338] text-xs sm:text-sm font-semibold rounded hover:bg-[#EFE8DC] transition-colors cursor-pointer"
            >
              {lang === 'fr' ? 'Refuser les non essentiels' : 'Decline Non-Essential'}
            </button>

            {showCustomize && (
              <button
                type="button"
                onClick={handleSaveCustom}
                className="px-4 py-2.5 min-h-[44px] border border-[#122338] text-[#122338] text-xs sm:text-sm font-semibold rounded hover:bg-[#122338] hover:text-[#FBF9F6] transition-colors cursor-pointer"
              >
                {lang === 'fr' ? 'Enregistrer mes choix' : 'Save My Choices'}
              </button>
            )}

            <button
              type="button"
              onClick={handleAcceptAll}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 min-h-[44px] bg-[#122338] text-[#FBF9F6] text-xs sm:text-sm font-semibold rounded hover:bg-[#1A365D] transition-colors cursor-pointer"
            >
              <Check className="w-4 h-4 text-[#C5A880]" />
              <span>{lang === 'fr' ? 'Tout accepter' : 'Accept All'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
