import React, { useEffect, useState } from 'react';
import { Calendar, Compass, Heart, X, ZoomIn, ZoomOut } from 'lucide-react';
import { RIVIERA_MEDIA } from '../data/media';
import { Language, UnitPlan } from '../types/riviera';
import { formatCurrencyCad } from '../utils/booking';
import { FloorPlanSvg } from './FloorPlanSvg';

interface PlanZoomModalProps {
  unit: UnitPlan | null;
  lang: Language;
  isFavorite: boolean;
  onClose: () => void;
  onToggleFavorite: (unitId: string) => void;
  onBookUnit: (unit: UnitPlan) => void;
}

export const PlanZoomModal: React.FC<PlanZoomModalProps> = ({
  unit,
  lang,
  isFavorite,
  onClose,
  onToggleFavorite,
  onBookUnit,
}) => {
  const [zoomScale, setZoomScale] = useState<1 | 1.35 | 1.75>(1);

  useEffect(() => {
    setZoomScale(1);
  }, [unit?.id]);

  useEffect(() => {
    if (!unit) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [unit, onClose]);

  if (!unit) return null;

  const photo =
    unit.image === 'hero'
      ? RIVIERA_MEDIA.hero
      : unit.image === 'rooftop'
        ? RIVIERA_MEDIA.rooftop
        : RIVIERA_MEDIA.interior;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="plan-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-[#000C1E]/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#FBF9F6] border border-[#C5A880]/45 rounded-lg shadow-ambient"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-5 md:px-7 py-4 bg-[#122338] text-[#FBF9F6] border-b border-[#C5A880]/30">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#C5A880] tabular-nums">
              {unit.code} · {unit.typology} · {unit.areaSqFt.toLocaleString('fr-CA')} pi²
            </p>
            <h3 id="plan-modal-title" className="font-display text-xl md:text-2xl font-medium">
              {lang === 'fr' ? unit.nameFr : unit.nameEn}
            </h3>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => onToggleFavorite(unit.id)}
              aria-label={lang === 'fr' ? 'Basculer favori' : 'Toggle shortlist'}
              className="w-10 h-10 inline-flex items-center justify-center rounded border border-[#C5A880]/40 hover:bg-[#1A365D] transition-colors cursor-pointer"
            >
              <Heart
                className={`w-4 h-4 ${
                  isFavorite ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-[#FBF9F6]'
                }`}
              />
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label={lang === 'fr' ? 'Fermer le plan' : 'Close plan modal'}
              className="w-10 h-10 inline-flex items-center justify-center rounded border border-[#C5A880]/40 hover:bg-[#1A365D] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 md:p-7 space-y-6">
          {/* Zoom Controls + Blueprint Viewport */}
          <div className="bg-[#FFFFFF] border border-[#C5A880]/35 rounded-lg p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 pb-3 border-b border-[#C5A880]/20">
              <div className="flex items-center gap-2 text-xs text-[#2C3E50]">
                <Compass className="w-4 h-4 text-[#725B38]" />
                <span>
                  {lang === 'fr' ? unit.orientation : unit.orientationEn} · {unit.floorRange}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() =>
                    setZoomScale((prev) => (prev === 1.75 ? 1.35 : 1))
                  }
                  disabled={zoomScale === 1}
                  aria-label={lang === 'fr' ? 'Dézoomer' : 'Zoom out'}
                  className="w-9 h-9 inline-flex items-center justify-center rounded border border-[#C5A880]/40 text-[#122338] disabled:opacity-40 hover:bg-[#EFE8DC] cursor-pointer"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="px-2 text-xs font-semibold text-[#122338] tabular-nums">
                  {Math.round(zoomScale * 100)}%
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setZoomScale((prev) => (prev === 1 ? 1.35 : 1.75))
                  }
                  disabled={zoomScale === 1.75}
                  aria-label={lang === 'fr' ? 'Zoomer' : 'Zoom in'}
                  className="w-9 h-9 inline-flex items-center justify-center rounded border border-[#C5A880]/40 text-[#122338] disabled:opacity-40 hover:bg-[#EFE8DC] cursor-pointer"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="overflow-auto max-h-[340px] rounded border border-[#C5A880]/20 bg-[#FBF9F6] p-2">
              <div
                style={{
                  transform: `scale(${zoomScale})`,
                  transformOrigin: 'top left',
                  width: `${100}%`,
                }}
                className="transition-transform duration-200"
              >
                <FloorPlanSvg
                  typology={unit.typology}
                  code={unit.code}
                  orientation={lang === 'fr' ? unit.orientation : unit.orientationEn}
                />
              </div>
            </div>
          </div>

          {/* Room Dimensions & Interior Preview */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            <div className="md:col-span-7 bg-[#FFFFFF] border border-[#C5A880]/30 rounded-lg p-5">
              <h4 className="font-display text-lg font-medium text-[#122338] mb-3">
                {lang === 'fr' ? 'Dimensions des pièces' : 'Room Dimensions'}
              </h4>
              <div className="divide-y divide-[#C5A880]/20">
                {unit.rooms.map((room) => (
                  <div
                    key={room.nameFr}
                    className="py-2.5 flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="text-[#2C3E50]">
                      {lang === 'fr' ? room.nameFr : room.nameEn}
                    </span>
                    <span className="font-semibold text-[#122338] tabular-nums">
                      {room.dimensions}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-5 rounded-lg overflow-hidden border border-[#C5A880]/30 bg-[#122338] min-h-[200px]">
              <img
                src={photo}
                alt={lang === 'fr' ? unit.nameFr : unit.nameEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Modal Action Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-[#C5A880]/30">
            <div>
              <p className="text-xs uppercase tracking-[0.1em] text-[#725B38] font-bold">
                {lang === 'fr' ? unit.deliveryLabelFr : unit.deliveryLabelEn}
              </p>
              <p className="font-display text-2xl font-semibold text-[#122338] tabular-nums">
                {formatCurrencyCad(unit.monthlyRent, lang)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => onBookUnit(unit)}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] bg-[#122338] text-[#FBF9F6] text-sm font-semibold rounded hover:bg-[#1A365D] transition-colors cursor-pointer whitespace-nowrap"
            >
              <Calendar className="w-4 h-4 text-[#C5A880]" />
              <span>
                {lang === 'fr'
                  ? 'Réserver une visite pour cette unité'
                  : 'Book a Private Tour for This Unit'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
