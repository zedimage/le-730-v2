import React from 'react';
import { Calendar, Compass, Heart, Maximize2, Sparkles } from 'lucide-react';
import { AvailabilityStatus, Language, Typology, UnitFilters, UnitPlan } from '../types/riviera';
import { formatCurrencyCad } from '../utils/booking';
import { FloorPlanSvg } from './FloorPlanSvg';

interface FloorPlansSectionProps {
  lang: Language;
  units: UnitPlan[];
  filters: UnitFilters;
  favoriteIds: string[];
  onChangeFilters: (next: UnitFilters) => void;
  onToggleFavorite: (unitId: string) => void;
  onInspectPlan: (unit: UnitPlan) => void;
  onSelectForBooking: (unit: UnitPlan) => void;
}

const TYPOLOGIES: Array<{ value: Typology | 'all'; fr: string; en: string }> = [
  { value: 'all', fr: 'Toutes', en: 'All Layouts' },
  { value: '3 ½', fr: '3 ½', en: '3 ½ (1 Bed)' },
  { value: '4 ½', fr: '4 ½', en: '4 ½ (2 Bed)' },
  { value: '5 ½', fr: '5 ½', en: '5 ½ (3 Bed)' },
];

const AVAILABILITY_TABS: Array<{ value: AvailabilityStatus | 'all'; fr: string; en: string }> = [
  { value: 'all', fr: 'Toutes phases', en: 'All Phases' },
  { value: 'immediate', fr: 'Disponible immédiatement', en: 'Immediate' },
  { value: 'phase34', fr: 'Phases 3 & 4 (2027)', en: 'Phases 3 & 4 (2027)' },
];

export const FloorPlansSection: React.FC<FloorPlansSectionProps> = ({
  lang,
  units,
  filters,
  favoriteIds,
  onChangeFilters,
  onToggleFavorite,
  onInspectPlan,
  onSelectForBooking,
}) => {
  return (
    <section id="plans" className="scroll-mt-16 py-16 md:py-24 bg-[#EFE8DC]/45 border-y border-[#C5A880]/25">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#725B38] mb-2">
              {lang === 'fr' ? 'Architecture & Plans d’étage' : 'Architecture & Floor Plans'}
            </p>
            <h2 className="font-display text-[28px] leading-[36px] md:text-[40px] md:leading-[48px] font-semibold text-[#122338] text-balance">
              {lang === 'fr'
                ? 'Des espaces pensés pour la lumière et le fleuve.'
                : 'Residences proportioned for light and river vistas.'}
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#2C3E50] max-w-md">
            {lang === 'fr'
              ? 'Sélectionnez une typologie ou consultez le plan détaillé pour vérifier les dimensions et réserver votre visite.'
              : 'Filter by layout or phase, inspect architectural room dimensions, and reserve a private tour.'}
          </p>
        </div>

        {/* Interactive Filter Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-[#C5A880]/30">
          <div className="flex flex-wrap items-center gap-2">
            <div
              role="group"
              aria-label={lang === 'fr' ? 'Filtrer par typologie' : 'Filter by layout'}
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#FFFFFF] border border-[#C5A880]/35 rounded-lg"
            >
              {TYPOLOGIES.map((t) => {
                const active = filters.typology === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => onChangeFilters({ ...filters, typology: t.value })}
                    className={`px-3.5 py-2 text-xs md:text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-[#122338] text-[#FBF9F6]'
                        : 'text-[#2C3E50] hover:text-[#122338] hover:bg-[#FBF9F6]'
                    }`}
                  >
                    {lang === 'fr' ? t.fr : t.en}
                  </button>
                );
              })}
            </div>

            <div
              role="group"
              aria-label={lang === 'fr' ? 'Filtrer par phase' : 'Filter by availability'}
              className="inline-flex flex-wrap items-center gap-1 p-1 bg-[#FFFFFF] border border-[#C5A880]/35 rounded-lg"
            >
              {AVAILABILITY_TABS.map((tab) => {
                const active = filters.availability === tab.value;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    onClick={() => onChangeFilters({ ...filters, availability: tab.value })}
                    className={`px-3.5 py-2 text-xs md:text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                      active
                        ? 'bg-[#C5A880] text-[#FFFFFF]'
                        : 'text-[#2C3E50] hover:text-[#122338] hover:bg-[#FBF9F6]'
                    }`}
                  >
                    {lang === 'fr' ? tab.fr : tab.en}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Favorites Shortlist Toggle */}
          <button
            type="button"
            onClick={() =>
              onChangeFilters({ ...filters, onlyFavorites: !filters.onlyFavorites })
            }
            aria-pressed={filters.onlyFavorites}
            className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 min-h-[42px] text-xs md:text-sm font-semibold rounded-lg border transition-colors whitespace-nowrap cursor-pointer ${
              filters.onlyFavorites
                ? 'bg-[#122338] text-[#FBF9F6] border-[#122338]'
                : 'bg-[#FFFFFF] text-[#122338] border-[#C5A880]/45 hover:border-[#122338]'
            }`}
          >
            <Heart
              className={`w-4 h-4 ${
                favoriteIds.length > 0 ? 'fill-[#C5A880] text-[#C5A880]' : ''
              }`}
            />
            <span>
              {lang === 'fr'
                ? `Favoris (${favoriteIds.length})`
                : `Shortlist (${favoriteIds.length})`}
            </span>
          </button>
        </div>

        {/* Unit Cards Grid */}
        {units.length === 0 ? (
          <div className="bg-[#FFFFFF] border border-[#C5A880]/35 rounded-lg p-10 text-center shadow-ambient">
            <Sparkles className="w-6 h-6 text-[#C5A880] mx-auto mb-3" />
            <h3 className="font-display text-2xl text-[#122338] mb-2">
              {lang === 'fr'
                ? 'Aucune unité ne correspond à cette sélection'
                : 'No residences match your current filters'}
            </h3>
            <p className="text-sm text-[#2C3E50] mb-5">
              {lang === 'fr'
                ? 'Réinitialisez les filtres pour afficher l’ensemble de nos plans 3 ½, 4 ½ et 5 ½.'
                : 'Reset filters to view all available 3 ½, 4 ½, and 5 ½ residences.'}
            </p>
            <button
              type="button"
              onClick={() =>
                onChangeFilters({
                  typology: 'all',
                  availability: 'all',
                  onlyFavorites: false,
                })
              }
              className="px-5 py-2.5 bg-[#122338] text-[#FBF9F6] text-sm font-semibold rounded hover:bg-[#1A365D] transition-colors cursor-pointer"
            >
              {lang === 'fr' ? 'Afficher tous les plans' : 'Show All Plans'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {units.map((unit) => {
              const isFav = favoriteIds.includes(unit.id);
              const isImmediate = unit.availability === 'immediate';

              return (
                <article
                  key={unit.id}
                  data-testid={`unit-card-${unit.code}`}
                  className="bg-[#FFFFFF] border border-[#C5A880]/35 rounded-lg overflow-hidden shadow-ambient flex flex-col justify-between transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <div>
                    {/* Top Blueprint + Photo Header */}
                    <div className="relative bg-[#FBF9F6] border-b border-[#C5A880]/25 p-4">
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span
                          className={`text-[11px] font-bold uppercase tracking-[0.11em] ${
                            isImmediate ? 'text-[#122338]' : 'text-[#9E2A2B]'
                          }`}
                        >
                          {lang === 'fr' ? unit.deliveryLabelFr : unit.deliveryLabelEn}
                        </span>
                        <button
                          type="button"
                          onClick={() => onToggleFavorite(unit.id)}
                          aria-label={
                            isFav
                              ? `${lang === 'fr' ? 'Retirer des favoris' : 'Remove from shortlist'} ${unit.code}`
                              : `${lang === 'fr' ? 'Ajouter aux favoris' : 'Add to shortlist'} ${unit.code}`
                          }
                          aria-pressed={isFav}
                          className="w-9 h-9 inline-flex items-center justify-center rounded-full border border-[#C5A880]/40 bg-[#FFFFFF] text-[#122338] hover:border-[#122338] transition-colors cursor-pointer shrink-0"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isFav ? 'fill-[#9E2A2B] text-[#9E2A2B]' : 'text-[#725B38]'
                            }`}
                          />
                        </button>
                      </div>

                      {/* Architectural SVG Plan with quick zoom click */}
                      <button
                        type="button"
                        onClick={() => onInspectPlan(unit)}
                        aria-label={`${lang === 'fr' ? 'Agrandir le plan architectural' : 'Zoom floor plan'} ${unit.code}`}
                        className="w-full block rounded border border-[#C5A880]/25 overflow-hidden bg-[#FBF9F6] hover:border-[#122338]/50 transition-colors cursor-pointer group relative"
                      >
                        <FloorPlanSvg
                          typology={unit.typology}
                          code={unit.code}
                          orientation={lang === 'fr' ? unit.orientation : unit.orientationEn}
                        />
                        <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 px-2.5 py-1 bg-[#122338]/90 text-[#FBF9F6] text-[11px] font-semibold rounded opacity-95 group-hover:bg-[#122338]">
                          <Maximize2 className="w-3 h-3 text-[#C5A880]" />
                          <span>{lang === 'fr' ? 'Agrandir' : 'Zoom'}</span>
                        </span>
                      </button>
                    </div>

                    {/* Card Details */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-[#725B38] font-medium mb-1.5 tabular-nums">
                        <span>{unit.code}</span>
                        <span aria-hidden="true">·</span>
                        <span>{unit.typology}</span>
                        <span aria-hidden="true">·</span>
                        <span>{unit.areaSqFt.toLocaleString('fr-CA')} pi²</span>
                      </div>

                      <h3 className="font-display text-xl font-medium text-[#122338] leading-snug">
                        {lang === 'fr' ? unit.nameFr : unit.nameEn}
                      </h3>

                      <div className="mt-3 flex items-center gap-2 text-xs text-[#2C3E50]">
                        <Compass className="w-3.5 h-3.5 text-[#725B38] shrink-0" />
                        <span>
                          {lang === 'fr' ? unit.orientation : unit.orientationEn} · {unit.floorRange} · +{unit.balconySqFt} pi² {lang === 'fr' ? 'terrasse' : 'terrace'}
                        </span>
                      </div>

                      <ul className="mt-4 space-y-1.5 text-sm text-[#2C3E50]">
                        {(lang === 'fr' ? unit.highlightsFr : unit.highlightsEn).map((h) => (
                          <li key={h} className="flex items-start gap-2">
                            <span aria-hidden="true" className="text-[#C5A880] font-bold">
                              ·
                            </span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Card Footer: Rent + Actions */}
                  <div className="px-6 py-4 bg-[#FBF9F6] border-t border-[#C5A880]/25 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.1em] text-[#725B38] font-semibold">
                        {lang === 'fr' ? 'À partir de' : 'Starting at'}
                      </p>
                      <p className="font-display text-xl font-semibold text-[#122338] tabular-nums">
                        {formatCurrencyCad(unit.monthlyRent, lang)}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => onInspectPlan(unit)}
                        aria-label={`${lang === 'fr' ? 'Voir le plan' : 'View plan'} ${unit.code}`}
                        className="px-3 py-2 min-h-[40px] border border-[#C5A880] text-[#122338] text-xs font-semibold rounded hover:bg-[#EFE8DC] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        {lang === 'fr' ? 'Voir le plan' : 'View Plan'}
                      </button>
                      <button
                        type="button"
                        onClick={() => onSelectForBooking(unit)}
                        aria-label={`${lang === 'fr' ? 'Visiter' : 'Tour'} ${unit.code}`}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 min-h-[40px] bg-[#122338] text-[#FBF9F6] text-xs font-semibold rounded hover:bg-[#1A365D] transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                        <span>{lang === 'fr' ? 'Visiter' : 'Tour'}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
