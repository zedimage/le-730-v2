import React, { useEffect, useState } from 'react';
import { CheckCircle2, Download, FileText, X } from 'lucide-react';
import { PROJECT_CONTACT, UNIT_PLANS } from '../data/units';
import { Language } from '../types/riviera';
import { buildBrochureHtmlDocument, formatCurrencyCad } from '../utils/booking';

interface BrochureModalProps {
  isOpen: boolean;
  lang: Language;
  onClose: () => void;
  onBookVisit: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  isOpen,
  lang,
  onClose,
  onBookVisit,
}) => {
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleDownloadBrochure = () => {
    const html = buildBrochureHtmlDocument(UNIT_PLANS, lang);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Le-730-Notre-Dame-Brochure-2026.html';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setDownloaded(true);
    window.setTimeout(() => setDownloaded(false), 3500);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="brochure-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#000C1E]/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#FBF9F6] border border-[#C5A880]/45 rounded-lg shadow-ambient overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-[#122338] text-[#FBF9F6] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <FileText className="w-5 h-5 text-[#C5A880]" />
            <h3 id="brochure-modal-title" className="font-display text-xl font-medium">
              {lang === 'fr'
                ? 'Dossier Architectural & Grille Tarifaire'
                : 'Architectural Brochure & Rate Schedule'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={lang === 'fr' ? 'Fermer la brochure' : 'Close brochure'}
            className="w-9 h-9 inline-flex items-center justify-center rounded border border-[#C5A880]/40 hover:bg-[#1A365D] cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 space-y-5 max-h-[78vh] overflow-y-auto">
          <p className="text-sm text-[#2C3E50] leading-relaxed">
            {lang === 'fr'
              ? 'Consultez la synthèse complète des typologies disponibles immédiatement et des réservations sur plan pour les Phases 3 & 4 (livraison automne 2027) au bord du fleuve à Repentigny.'
              : 'Review our complete overview of immediately available suites and Phases 3 & 4 pre-leasing (Fall 2027) on the Repentigny waterfront.'}
          </p>

          <div className="bg-[#FFFFFF] border border-[#C5A880]/30 rounded-lg overflow-hidden">
            <table className="w-full text-left text-xs md:text-sm">
              <thead className="bg-[#EFE8DC] text-[#122338]">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Code</th>
                  <th className="py-2.5 px-3 font-semibold">{lang === 'fr' ? 'Type' : 'Layout'}</th>
                  <th className="py-2.5 px-3 font-semibold">{lang === 'fr' ? 'Superficie' : 'Area'}</th>
                  <th className="py-2.5 px-3 font-semibold text-right">{lang === 'fr' ? 'Loyer' : 'Rent'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#C5A880]/20">
                {UNIT_PLANS.map((u) => (
                  <tr key={u.id}>
                    <td className="py-2.5 px-3 font-semibold text-[#122338] tabular-nums">{u.code}</td>
                    <td className="py-2.5 px-3 text-[#2C3E50]">{u.typology}</td>
                    <td className="py-2.5 px-3 text-[#2C3E50] tabular-nums">{u.areaSqFt} pi²</td>
                    <td className="py-2.5 px-3 font-semibold text-[#122338] text-right tabular-nums">
                      {formatCurrencyCad(u.monthlyRent, lang)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-[#725B38]">
            {PROJECT_CONTACT.address} · {PROJECT_CONTACT.phoneDisplay}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-[#C5A880]/30">
            <button
              type="button"
              onClick={handleDownloadBrochure}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[46px] bg-[#122338] text-[#FBF9F6] text-sm font-semibold rounded hover:bg-[#1A365D] transition-colors cursor-pointer"
            >
              {downloaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
                  <span>
                    {lang === 'fr' ? 'Brochure téléchargée' : 'Brochure Downloaded'}
                  </span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#C5A880]" />
                  <span>
                    {lang === 'fr'
                      ? 'Télécharger le dossier complet'
                      : 'Download Complete Dossier'}
                  </span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onBookVisit();
              }}
              className="inline-flex items-center justify-center px-5 py-3 min-h-[46px] border border-[#C5A880] text-[#122338] text-sm font-semibold rounded hover:bg-[#EFE8DC] transition-colors cursor-pointer"
            >
              {lang === 'fr' ? 'Réserver ma visite privée' : 'Book My Private Tour'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
