import React, { useEffect, useState } from 'react';
import { Calendar, Mail, MapPin, Menu, Phone, ShieldCheck, X } from 'lucide-react';
import { PROJECT_CONTACT } from '../data/units';
import { Language } from '../types/riviera';

interface NavbarProps {
  lang: Language;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenPrivacy: () => void;
}

const NAV_ITEMS = [
  { id: 'projet', fr: 'Le Projet', en: 'The Project' },
  { id: 'plans', fr: 'Plans', en: 'Floor Plans' },
  { id: 'commodites', fr: 'Commodités', en: 'Amenities' },
  { id: 'quartier', fr: 'Quartier', en: 'Neighborhood' },
  { id: 'contact', fr: 'Contact', en: 'Contact' },
] as const;

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  activeSection,
  onNavigate,
  onOpenPrivacy,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleLinkClick = (sectionId: string) => {
    setMobileOpen(false);
    onNavigate(sectionId);
  };

  return (
    <>
      <header className="sticky top-0 z-40 glass-nav border-b border-[#C5A880]/25">
        <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-12 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#accueil"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick('accueil');
            }}
            className="font-display text-xl md:text-[22px] font-semibold tracking-tight text-[#122338] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A880]"
          >
            Le 730 Notre-Dame
          </a>

          {/* Zone 2: 5 concise single-line nav links */}
          <nav
            aria-label={lang === 'fr' ? 'Navigation principale' : 'Primary navigation'}
            className="hidden md:flex items-center gap-6 lg:gap-8"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(item.id);
                  }}
                  className={`relative py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C5A880] ${
                    isActive
                      ? 'text-[#122338]'
                      : 'text-[#2C3E50] hover:text-[#122338]'
                  }`}
                >
                  {lang === 'fr' ? item.fr : item.en}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 right-0 -bottom-0.5 h-[1.5px] bg-[#C5A880] transition-transform duration-200 origin-left ${
                      isActive ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action on desktop + mobile drawer button */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => handleLinkClick('rendez-vous')}
              className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-semibold tracking-[0.02em] bg-[#122338] text-[#FBF9F6] rounded hover:bg-[#1A365D] transition-all duration-200 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C5A880]"
            >
              {lang === 'fr' ? 'Visite privée' : 'Private Tour'}
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-drawer"
              aria-label={
                mobileOpen
                  ? lang === 'fr'
                    ? 'Fermer le menu de navigation'
                    : 'Close navigation menu'
                  : lang === 'fr'
                    ? 'Ouvrir le menu de navigation'
                    : 'Open navigation menu'
              }
              className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded border border-[#C5A880]/40 bg-[#FFFFFF] text-[#122338] hover:bg-[#EFE8DC] transition-colors cursor-pointer"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Optimal Responsive Mobile Navigation Drawer (rendered outside header backdrop-filter) */}
      {mobileOpen && (
        <div
          id="mobile-navigation-drawer"
          role="dialog"
          aria-modal="true"
          aria-label={lang === 'fr' ? 'Menu mobile' : 'Mobile menu'}
          className="md:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-[#FBF9F6] border-t border-[#C5A880]/30 overflow-y-auto"
        >
          <div className="px-5 py-6 flex flex-col justify-between min-h-full gap-8">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#725B38] mb-3">
                {lang === 'fr' ? 'Navigation' : 'Navigation'}
              </p>
              <nav className="flex flex-col divide-y divide-[#C5A880]/25 border-y border-[#C5A880]/25">
                {NAV_ITEMS.map((item, idx) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(item.id);
                    }}
                    className="flex items-center justify-between py-4 min-h-[48px] text-lg font-display font-medium text-[#122338] active:bg-[#EFE8DC]/60 transition-colors"
                  >
                    <span>
                      <span className="text-xs font-sans font-semibold text-[#725B38] mr-3 tabular-nums">
                        0{idx + 1}.
                      </span>
                      {lang === 'fr' ? item.fr : item.en}
                    </span>
                    <span className="text-xs font-sans uppercase tracking-[0.1em] text-[#725B38]">
                      →
                    </span>
                  </a>
                ))}
              </nav>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => handleLinkClick('rendez-vous')}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3.5 min-h-[48px] bg-[#122338] text-[#FBF9F6] text-base font-semibold rounded hover:bg-[#1A365D] transition-colors cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-[#C5A880]" />
                  <span>
                    {lang === 'fr' ? 'Réserver ma visite privée' : 'Book My Private Tour'}
                  </span>
                </button>
              </div>
            </div>

            {/* Direct working icon links inside mobile drawer */}
            <div className="bg-[#EFE8DC]/70 rounded-lg p-5 border border-[#C5A880]/30 space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#725B38]">
                {lang === 'fr' ? 'Pavillon de location · Repentigny' : 'Leasing Gallery · Repentigny'}
              </p>
              <div className="grid grid-cols-1 gap-2.5 text-sm text-[#122338]">
                <a
                  href={PROJECT_CONTACT.phoneHref}
                  className="flex items-center gap-3 min-h-[44px] px-3 py-2 bg-[#FFFFFF] rounded border border-[#C5A880]/25 font-medium"
                >
                  <Phone className="w-4 h-4 text-[#725B38] shrink-0" />
                  <span className="tabular-nums">{PROJECT_CONTACT.phoneDisplay}</span>
                </a>
                <a
                  href={`mailto:${PROJECT_CONTACT.email}`}
                  className="flex items-center gap-3 min-h-[44px] px-3 py-2 bg-[#FFFFFF] rounded border border-[#C5A880]/25 font-medium"
                >
                  <Mail className="w-4 h-4 text-[#725B38] shrink-0" />
                  <span className="truncate">{PROJECT_CONTACT.email}</span>
                </a>
                <a
                  href="#quartier"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick('quartier');
                  }}
                  className="flex items-center gap-3 min-h-[44px] px-3 py-2 bg-[#FFFFFF] rounded border border-[#C5A880]/25 font-medium"
                >
                  <MapPin className="w-4 h-4 text-[#725B38] shrink-0" />
                  <span>{PROJECT_CONTACT.address}</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenPrivacy();
                  }}
                  className="flex items-center gap-3 min-h-[44px] px-3 py-2 bg-[#FFFFFF] rounded border border-[#C5A880]/25 font-medium text-left cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#725B38] shrink-0" />
                  <span>
                    {lang === 'fr'
                      ? 'Confidentialité & Loi 25'
                      : 'Privacy & Law 25 Consent'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
