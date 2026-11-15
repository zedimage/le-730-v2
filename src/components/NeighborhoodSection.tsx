import React, { useState } from 'react';
import { Anchor, Car, Check, Coffee, Copy, MapPin, Navigation } from 'lucide-react';
import { NEIGHBORHOOD_POIS, PROJECT_CONTACT } from '../data/units';
import { Language, NeighborhoodPOI } from '../types/riviera';

interface NeighborhoodSectionProps {
  lang: Language;
}

type CategoryFilter = 'all' | NeighborhoodPOI['category'];

export const NeighborhoodSection: React.FC<NeighborhoodSectionProps> = ({ lang }) => {
  const [category, setCategory] = useState<CategoryFilter>('all');
  const [selectedPoiId, setSelectedPoiId] = useState<string>(NEIGHBORHOOD_POIS[0].id);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const visiblePois =
    category === 'all'
      ? NEIGHBORHOOD_POIS
      : NEIGHBORHOOD_POIS.filter((p) => p.category === category);

  const activePoi =
    visiblePois.find((p) => p.id === selectedPoiId) ?? visiblePois[0] ?? NEIGHBORHOOD_POIS[0];

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(PROJECT_CONTACT.address);
      setCopiedAddress(true);
      window.setTimeout(() => setCopiedAddress(false), 2500);
    } catch {
      setCopiedAddress(true);
      window.setTimeout(() => setCopiedAddress(false), 2500);
    }
  };

  const categories: Array<{ id: CategoryFilter; fr: string; en: string; icon: React.ReactNode }> = [
    { id: 'all', fr: 'Tout voir', en: 'All', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'nautical', fr: 'Nautisme & Parcs', en: 'Marina & Parks', icon: <Anchor className="w-3.5 h-3.5" /> },
    { id: 'dining', fr: 'Gastronomie & Culture', en: 'Dining & Culture', icon: <Coffee className="w-3.5 h-3.5" /> },
    { id: 'mobility', fr: 'Mobilité', en: 'Transit & Access', icon: <Car className="w-3.5 h-3.5" /> },
  ];

  return (
    <section id="quartier" className="scroll-mt-16 py-16 md:py-24 bg-[#EFE8DC]/45 border-y border-[#C5A880]/25">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#725B38] mb-2">
              {lang === 'fr' ? 'Emplacement privilégié · Repentigny' : 'Prime Waterfront Location · Repentigny'}
            </p>
            <h2 className="font-display text-[28px] leading-[36px] md:text-[40px] md:leading-[48px] font-semibold text-[#122338] text-balance">
              {lang === 'fr'
                ? 'Entre marina, parcs riverains et artères gourmandes.'
                : 'Steps from the marina, riverfront parks, and local bistros.'}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={handleCopyAddress}
              className="inline-flex items-center gap-2 px-4 py-2.5 min-h-[42px] bg-[#FFFFFF] border border-[#C5A880]/50 rounded text-xs md:text-sm font-medium text-[#122338] hover:border-[#122338] transition-colors cursor-pointer"
            >
              {copiedAddress ? (
                <>
                  <Check className="w-4 h-4 text-[#725B38]" />
                  <span>{lang === 'fr' ? 'Adresse copiée' : 'Address Copied'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#725B38]" />
                  <span>{PROJECT_CONTACT.address}</span>
                </>
              )}
            </button>
            <a
              href="https://maps.google.com/?q=730+Rue+Notre-Dame,+Repentigny,+QC"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={lang === 'fr' ? 'Ouvrir l’itinéraire Google Maps' : 'Open directions in Google Maps'}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 min-h-[42px] bg-[#122338] text-[#FBF9F6] text-xs md:text-sm font-semibold rounded hover:bg-[#1A365D] transition-colors whitespace-nowrap"
            >
              <Navigation className="w-3.5 h-3.5 text-[#C5A880]" />
              <span>{lang === 'fr' ? 'Itinéraire' : 'Directions'}</span>
            </a>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div
          role="group"
          aria-label={lang === 'fr' ? 'Filtrer les points d’intérêt' : 'Filter neighborhood points'}
          className="inline-flex flex-wrap items-center gap-1.5 p-1 bg-[#FFFFFF] border border-[#C5A880]/35 rounded-lg mb-8"
        >
          {categories.map((cat) => {
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setCategory(cat.id);
                  const first =
                    cat.id === 'all'
                      ? NEIGHBORHOOD_POIS[0]
                      : NEIGHBORHOOD_POIS.find((p) => p.category === cat.id);
                  if (first) setSelectedPoiId(first.id);
                }}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs md:text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  active
                    ? 'bg-[#122338] text-[#FBF9F6]'
                    : 'text-[#2C3E50] hover:text-[#122338] hover:bg-[#FBF9F6]'
                }`}
              >
                {cat.icon}
                <span>{lang === 'fr' ? cat.fr : cat.en}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-stretch">
          {/* Interactive Riverfront Map Canvas */}
          <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#C5A880]/35 rounded-lg p-4 md:p-5 shadow-ambient flex flex-col justify-between">
            <div className="relative w-full h-[300px] sm:h-[340px] rounded overflow-hidden border border-[#C5A880]/25 bg-[#F5F3F0]">
              {/* Stylized Architectural Map of Repentigny Shore & St. Lawrence */}
              <svg viewBox="0 0 600 340" className="w-full h-full" aria-hidden="true">
                {/* Land */}
                <rect x="0" y="0" width="600" height="340" fill="#F9F7F4" />
                {/* Streets */}
                <g stroke="#C5A880" strokeOpacity="0.35" strokeWidth="2">
                  <path d="M 0 115 Q 250 105 600 90" fill="none" />
                  <path d="M 120 0 L 145 210" fill="none" />
                  <path d="M 310 0 L 325 225" fill="none" />
                  <path d="M 465 0 L 450 215" fill="none" />
                </g>
                {/* Île-Lebel greenery */}
                <path
                  d="M 70 215 Q 170 185 260 225 Q 220 265 110 250 Z"
                  fill="#EFE8DC"
                  stroke="#C5A880"
                  strokeWidth="1"
                />
                {/* St. Lawrence River */}
                <path
                  d="M 0 245 Q 180 215 360 245 T 600 220 L 600 340 L 0 340 Z"
                  fill="#122338"
                />
                <path
                  d="M 0 262 Q 180 232 360 262 T 600 237"
                  fill="none"
                  stroke="#C5A880"
                  strokeOpacity="0.35"
                  strokeWidth="1.5"
                />
                <text
                  x="300"
                  y="305"
                  fill="#F3EAD8"
                  fontFamily="Playfair Display, Georgia, serif"
                  fontSize="15"
                  fontStyle="italic"
                  textAnchor="middle"
                  opacity="0.85"
                >
                  Fleuve Saint-Laurent · Repentigny
                </text>
              </svg>

              {/* Le 730 Notre-Dame Home Pin */}
              <div
                style={{ left: '42%', top: '54%' }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center"
              >
                <span className="px-2.5 py-1 bg-[#122338] text-[#F3EAD8] text-[11px] font-bold tracking-[0.06em] rounded shadow-md whitespace-nowrap border border-[#D4AF37]/60">
                  Le 730 Notre-Dame
                </span>
                <span className="w-3 h-3 mt-1 rounded-full bg-[#D4AF37] border-2 border-[#FFFFFF] shadow" />
              </div>

              {/* Interactive POI Pins */}
              {visiblePois.map((poi, index) => {
                const isSelected = activePoi.id === poi.id;
                return (
                  <button
                    key={poi.id}
                    type="button"
                    onClick={() => setSelectedPoiId(poi.id)}
                    style={{ left: `${poi.mapX}%`, top: `${poi.mapY}%` }}
                    aria-label={lang === 'fr' ? poi.nameFr : poi.nameEn}
                    aria-pressed={isSelected}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold tabular-nums transition-transform duration-150 cursor-pointer border-2 shadow ${
                      isSelected
                        ? 'bg-[#C5A880] text-[#FFFFFF] border-[#122338] scale-115 z-20'
                        : 'bg-[#FFFFFF] text-[#122338] border-[#C5A880] hover:scale-110 z-10'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            {/* Spotlight Bar for Selected Pin */}
            <div className="mt-4 pt-4 border-t border-[#C5A880]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#725B38] tabular-nums">
                  {activePoi.distance} · {lang === 'fr' ? activePoi.durationFr : activePoi.durationEn}
                </p>
                <h3 className="font-display text-lg font-medium text-[#122338]">
                  {lang === 'fr' ? activePoi.nameFr : activePoi.nameEn}
                </h3>
                <p className="text-sm text-[#2C3E50] mt-0.5">
                  {lang === 'fr' ? activePoi.descriptionFr : activePoi.descriptionEn}
                </p>
              </div>
            </div>
          </div>

          {/* Clickable POI List */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {visiblePois.map((poi, index) => {
              const isSelected = activePoi.id === poi.id;
              return (
                <button
                  key={poi.id}
                  type="button"
                  onClick={() => setSelectedPoiId(poi.id)}
                  className={`text-left p-4 rounded-lg border transition-colors cursor-pointer flex items-start justify-between gap-4 ${
                    isSelected
                      ? 'bg-[#FFFFFF] border-[#122338] shadow-ambient'
                      : 'bg-[#FBF9F6] border-[#C5A880]/30 hover:bg-[#FFFFFF]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 tabular-nums mt-0.5 ${
                        isSelected
                          ? 'bg-[#122338] text-[#FBF9F6]'
                          : 'bg-[#EFE8DC] text-[#725B38]'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-display text-base font-medium text-[#122338]">
                        {lang === 'fr' ? poi.nameFr : poi.nameEn}
                      </p>
                      <p className="text-xs text-[#2C3E50] mt-1">
                        {lang === 'fr' ? poi.descriptionFr : poi.descriptionEn}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 tabular-nums">
                    <p className="text-xs font-bold text-[#122338]">{poi.distance}</p>
                    <p className="text-[11px] text-[#725B38]">
                      {lang === 'fr' ? poi.durationFr : poi.durationEn}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
