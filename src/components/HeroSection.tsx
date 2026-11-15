import React from 'react';
import { ArrowRight, Download, MapPin } from 'lucide-react';
import { RIVIERA_MEDIA } from '../data/media';
import { Language } from '../types/riviera';

interface HeroSectionProps {
  lang: Language;
  onBookVisit: () => void;
  onOpenBrochure: () => void;
  onExplorePlans: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onBookVisit,
  onOpenBrochure,
  onExplorePlans,
}) => {
  const highlights =
    lang === 'fr'
      ? [
          { label: 'Typologies', value: '3 ½ · 4 ½ · 5 ½' },
          { label: 'Superficies', value: '715 à 1 445 pi²' },
          { label: 'Occupation', value: 'Immédiate & Automne 2027' },
          { label: 'Emplacement', value: 'Berges du Saint-Laurent' },
        ]
      : [
          { label: 'Layouts', value: '1, 2 & 3 Bedrooms' },
          { label: 'Living Area', value: '715 to 1,445 sq ft' },
          { label: 'Occupancy', value: 'Immediate & Fall 2027' },
          { label: 'Location', value: 'St. Lawrence Waterfront' },
        ];

  return (
    <section id="accueil" className="scroll-mt-16 pt-8 pb-12 md:pt-12 md:pb-16 lg:pt-14 lg:pb-20">
      <div id="projet" className="scroll-mt-16 mx-auto max-w-[1320px] px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Editorial Column */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2 lg:py-4">
            <div>
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[11px] font-bold uppercase tracking-[0.12em] text-[#725B38] mb-5">
                <span className="text-[#122338]">
                  {lang === 'fr' ? 'Nouvelle administration' : 'New Management'}
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  {lang === 'fr'
                    ? 'Phases 3 & 4 — Automne 2027'
                    : 'Phases 3 & 4 — Fall 2027'}
                </span>
              </div>

              <h1 className="font-display text-[36px] leading-[44px] md:text-[48px] md:leading-[56px] lg:text-[54px] lg:leading-[62px] font-semibold tracking-[-0.02em] text-[#122338] text-balance">
                {lang === 'fr'
                  ? 'L’art de vivre au bord du fleuve Saint-Laurent.'
                  : 'Refined waterfront living on the St. Lawrence River.'}
              </h1>

              <p className="mt-6 text-base md:text-lg leading-relaxed text-[#2C3E50] max-w-xl">
                {lang === 'fr'
                  ? 'Résidences locatives contemporaines à Repentigny alliant architecture de pierre calcaire, fenestration pleine hauteur sur le fleuve et services dignes d’un hôtel cinq étoiles.'
                  : 'Contemporary rental residences in Repentigny pairing warm limestone architecture, floor-to-ceiling river vistas, and five-star hospitality amenities.'}
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm text-[#725B38] font-medium">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>730, rue Notre-Dame, Repentigny · Parc de l’Île-Lebel</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#C5A880]/30 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={onBookVisit}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 min-h-[48px] bg-[#122338] text-[#FBF9F6] text-[15px] font-semibold tracking-[0.03em] rounded hover:bg-[#1A365D] hover:-translate-y-0.5 transition-all duration-200 shadow-ambient cursor-pointer whitespace-nowrap"
              >
                <span>
                  {lang === 'fr' ? 'Réserver ma visite privée' : 'Book My Private Tour'}
                </span>
                <ArrowRight className="w-4 h-4 text-[#C5A880]" />
              </button>

              <button
                type="button"
                onClick={onOpenBrochure}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 min-h-[48px] bg-transparent border-[1.5px] border-[#C5A880] text-[#122338] text-[15px] font-semibold tracking-[0.03em] rounded hover:bg-[#C5A880] hover:text-[#FFFFFF] transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                <Download className="w-4 h-4" />
                <span>
                  {lang === 'fr' ? 'Télécharger la brochure' : 'Download Brochure'}
                </span>
              </button>
            </div>
          </div>

          {/* Right Photographic Column */}
          <div className="lg:col-span-6">
            <div className="relative h-full min-h-[300px] sm:min-h-[380px] lg:min-h-[480px] rounded-lg overflow-hidden bg-[#122338] shadow-ambient border border-[#C5A880]/30 group">
              <img
                src={RIVIERA_MEDIA.hero}
                alt={
                  lang === 'fr'
                    ? 'Façade riveraine de Le 730 Notre-Dame au bord du fleuve Saint-Laurent à Repentigny'
                    : 'Waterfront facade of Le 730 Notre-Dame along the St. Lawrence River in Repentigny'
                }
                referrerPolicy="no-referrer"
                className="w-full h-full lg:h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#000C1E]/85 via-[#000C1E]/40 to-transparent p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#F3EAD8]">
                    {lang === 'fr'
                      ? 'Occupation immédiate · Unités limitées'
                      : 'Immediate Occupancy · Limited Units'}
                  </p>
                  <p className="mt-1 font-display text-xl text-[#FFFFFF]">
                    {lang === 'fr'
                      ? 'À partir de 1 795 $ / mois'
                      : 'Starting at $1,795 / month'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onExplorePlans}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#FBF9F6]/95 text-[#122338] text-xs font-bold uppercase tracking-[0.1em] rounded hover:bg-[#FFFFFF] transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
                >
                  <span>{lang === 'fr' ? 'Découvrir les plans' : 'Explore Plans'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-column Architectural KPI Strip below hero split */}
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 bg-[#FFFFFF] border border-[#C5A880]/30 rounded-lg p-5 md:p-6 shadow-ambient">
          {highlights.map((item) => (
            <div key={item.label} className="space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#725B38]">
                {item.label}
              </p>
              <p className="font-display text-lg md:text-xl font-medium text-[#122338] tabular-nums">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
