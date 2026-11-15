import React from 'react';
import {
  ArrowUp,
  Globe,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Share2,
  ShieldCheck,
} from 'lucide-react';
import { PROJECT_CONTACT } from '../data/units';
import { Language } from '../types/riviera';

interface FooterProps {
  lang: Language;
  onToggleLang: () => void;
  onNavigate: (sectionId: string) => void;
  onOpenPrivacy: () => void;
  onOpenBrochure: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onToggleLang,
  onNavigate,
  onOpenPrivacy,
  onOpenBrochure,
}) => {
  const [sharedNotice, setSharedNotice] = React.useState(false);

  const handleShare = async () => {
    const shareUrl = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Le 730 Notre-Dame',
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
      }
      setSharedNotice(true);
      window.setTimeout(() => setSharedNotice(false), 2500);
    } catch {
      setSharedNotice(true);
      window.setTimeout(() => setSharedNotice(false), 2500);
    }
  };

  return (
    <footer className="bg-[#122338] text-[#FBF9F6] border-t border-[#C5A880]/30">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-[#C5A880]/25">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="#accueil"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('accueil');
              }}
              className="font-display text-2xl font-semibold text-[#FFFFFF] inline-block"
            >
              Le 730 Notre-Dame
            </a>
            <p className="text-sm text-[#B7C8E3] max-w-md leading-relaxed">
              {lang === 'fr'
                ? 'Résidences locatives de prestige au bord du fleuve Saint-Laurent à Repentigny. Nouvelle administration · Phases 1 & 2 disponibles et Phases 3 & 4 à l’automne 2027.'
                : 'Luxury waterfront rental residences on the St. Lawrence River in Repentigny. New management · Immediate occupancy & Phases 3 & 4 Fall 2027.'}
            </p>

            {/* Working Icon Links Row */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <a
                href={PROJECT_CONTACT.phoneHref}
                aria-label={lang === 'fr' ? 'Appeler le bureau de location' : 'Call leasing office'}
                className="w-10 h-10 inline-flex items-center justify-center rounded border border-[#C5A880]/40 text-[#F3EAD8] hover:bg-[#1A365D] transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${PROJECT_CONTACT.email}`}
                aria-label={lang === 'fr' ? 'Envoyer un courriel' : 'Send an email'}
                className="w-10 h-10 inline-flex items-center justify-center rounded border border-[#C5A880]/40 text-[#F3EAD8] hover:bg-[#1A365D] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://maps.google.com/?q=730+Rue+Notre-Dame,+Repentigny,+QC"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={lang === 'fr' ? 'Localisation sur Google Maps' : 'Open location on Google Maps'}
                className="w-10 h-10 inline-flex items-center justify-center rounded border border-[#C5A880]/40 text-[#F3EAD8] hover:bg-[#1A365D] transition-colors"
              >
                <MapPin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Le 730 Notre-Dame"
                className="w-10 h-10 inline-flex items-center justify-center rounded border border-[#C5A880]/40 text-[#F3EAD8] hover:bg-[#1A365D] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Le 730 Notre-Dame"
                className="w-10 h-10 inline-flex items-center justify-center rounded border border-[#C5A880]/40 text-[#F3EAD8] hover:bg-[#1A365D] transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={handleShare}
                aria-label={lang === 'fr' ? 'Partager cette page' : 'Share this page'}
                className="inline-flex items-center gap-1.5 h-10 px-3 rounded border border-[#C5A880]/40 text-xs font-medium text-[#F3EAD8] hover:bg-[#1A365D] transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>
                  {sharedNotice
                    ? lang === 'fr'
                      ? 'Lien copié'
                      : 'Link Copied'
                    : lang === 'fr'
                      ? 'Partager'
                      : 'Share'}
                </span>
              </button>
            </div>
          </div>

          {/* Navigation Mirror */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C5A880]">
              {lang === 'fr' ? 'Navigation' : 'Navigation'}
            </p>
            <ul className="space-y-2 text-sm text-[#E4E2DF]">
              <li>
                <a
                  href="#projet"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('projet');
                  }}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {lang === 'fr' ? 'Le Projet' : 'The Project'}
                </a>
              </li>
              <li>
                <a
                  href="#plans"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('plans');
                  }}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {lang === 'fr' ? 'Plans 3 ½, 4 ½ & 5 ½' : 'Floor Plans'}
                </a>
              </li>
              <li>
                <a
                  href="#commodites"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('commodites');
                  }}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {lang === 'fr' ? 'Commodités' : 'Amenities'}
                </a>
              </li>
              <li>
                <a
                  href="#quartier"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('quartier');
                  }}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {lang === 'fr' ? 'Quartier & Marina' : 'Neighborhood & Marina'}
                </a>
              </li>
              <li>
                <a
                  href="#rendez-vous"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('rendez-vous');
                  }}
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  {lang === 'fr' ? 'Réserver une visite' : 'Book a Visit'}
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenBrochure}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer text-left"
                >
                  {lang === 'fr' ? 'Brochure architecturale' : 'Architectural Brochure'}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Law 25 */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#C5A880]">
              {lang === 'fr' ? 'Pavillon & Confidentialité' : 'Gallery & Privacy'}
            </p>
            <p className="text-sm text-[#E4E2DF]">{PROJECT_CONTACT.address}</p>
            <p className="text-sm text-[#B7C8E3] tabular-nums">
              {PROJECT_CONTACT.phoneDisplay} · {PROJECT_CONTACT.email}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="inline-flex items-center gap-2 px-3.5 py-2 min-h-[40px] rounded border border-[#C5A880]/50 text-xs font-semibold text-[#F3EAD8] hover:bg-[#1A365D] transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>
                  {lang === 'fr' ? 'Confidentialité (Loi 25)' : 'Privacy (Law 25)'}
                </span>
              </button>

              <button
                type="button"
                onClick={onToggleLang}
                aria-label={
                  lang === 'fr' ? 'Switch site language to English' : 'Passer le site en français'
                }
                className="inline-flex items-center gap-1.5 px-3 py-2 min-h-[40px] rounded border border-[#C5A880]/50 text-xs font-semibold text-[#F3EAD8] hover:bg-[#1A365D] transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{lang === 'fr' ? 'EN' : 'FR'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7A8BA4]">
          <p>
            © {new Date().getFullYear()} Le 730 Notre-Dame · Repentigny, Québec.{' '}
            {lang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
          </p>
          <button
            type="button"
            onClick={() => onNavigate('accueil')}
            aria-label={lang === 'fr' ? 'Haut de page' : 'Back to top'}
            className="inline-flex items-center gap-1.5 text-[#F3EAD8] hover:text-[#D4AF37] transition-colors cursor-pointer"
          >
            <span>{lang === 'fr' ? 'Haut de page' : 'Back to top'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
