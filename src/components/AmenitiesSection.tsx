import React from 'react';
import { RIVIERA_MEDIA } from '../data/media';
import { Language } from '../types/riviera';

interface AmenitiesSectionProps {
  lang: Language;
  onBookVisit: () => void;
}

export const AmenitiesSection: React.FC<AmenitiesSectionProps> = ({ lang, onBookVisit }) => {
  const amenities =
    lang === 'fr'
      ? [
          {
            num: '01.',
            title: 'Terrasse panoramique & bassin sur le toit',
            desc: 'Salon extérieur chauffé avec foyers architecturaux, pavillon d’été et vue dégagée à 180° sur le fleuve Saint-Laurent.',
          },
          {
            num: '02.',
            title: 'Pavillon bien-être, gym & spa nordique',
            desc: 'Salle d’entraînement vitrée sur l’eau, studio de yoga en chêne blanc, sauna sec et espace détente réservé aux résidents.',
          },
          {
            num: '03.',
            title: 'Salon riverain & suites de télétravail',
            desc: 'Espaces acoustiques privés, bibliothèque de lecture, Wi-Fi fibre symétrique et service de conciergerie sur place.',
          },
          {
            num: '04.',
            title: 'Garage souterrain & bornes de recharge VÉ',
            desc: 'Stationnement intérieur chauffé, bornes rapides de niveau 2, station de toilettage canin et remise pour kayaks et vélos.',
          },
        ]
      : [
          {
            num: '01.',
            title: 'Panoramic Rooftop Terrace & Infinity Pool',
            desc: 'Heated outdoor lounge with architectural fire tables, summer pavilion, and unobstructed 180° St. Lawrence River views.',
          },
          {
            num: '02.',
            title: 'Wellness Pavilion, Fitness & Nordic Spa',
            desc: 'Waterfront glass gym, white-oak yoga studio, dry sauna, and quiet recovery lounge exclusive to residents.',
          },
          {
            num: '03.',
            title: 'Riverfront Lounge & Private Work Suites',
            desc: 'Acoustic meeting booths, curated library lounge, symmetric fiber internet, and dedicated on-site concierge.',
          },
          {
            num: '04.',
            title: 'Heated Underground Parking & EV Chargers',
            desc: 'Secure climate-controlled garage, Level 2 EV charging stations, pet grooming washroom, and kayak/bike lockers.',
          },
        ];

  return (
    <section id="commodites" className="scroll-mt-16 py-16 md:py-24 bg-[#FBF9F6]">
      <div className="mx-auto max-w-[1320px] px-5 md:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#725B38] mb-2">
              {lang === 'fr' ? 'Art de vivre & Inclusions' : 'Lifestyle & Signature Amenities'}
            </p>
            <h2 className="font-display text-[28px] leading-[36px] md:text-[40px] md:leading-[48px] font-semibold text-[#122338] text-balance">
              {lang === 'fr'
                ? 'Le confort feutré d’un hôtel riverain, chaque jour.'
                : 'Five-star riverfront hospitality, every single day.'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onBookVisit}
            className="self-start lg:self-auto px-5 py-3 min-h-[44px] border-[1.5px] border-[#C5A880] text-[#122338] text-sm font-semibold rounded hover:bg-[#C5A880] hover:text-[#FFFFFF] transition-colors cursor-pointer whitespace-nowrap"
          >
            {lang === 'fr' ? 'Planifier une visite guidée' : 'Schedule a Guided Tour'}
          </button>
        </div>

        {/* Asymmetric Editorial Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* Large Marquee Visual */}
          <div className="lg:col-span-7 rounded-lg overflow-hidden border border-[#C5A880]/30 bg-[#122338] shadow-ambient group relative min-h-[300px] md:min-h-[380px]">
            <img
              src={RIVIERA_MEDIA.rooftop}
              alt={
                lang === 'fr'
                  ? 'Terrasse panoramique et bassin sur le toit face au fleuve'
                  : 'Panoramic rooftop terrace and heated pool overlooking the river'
              }
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#000C1E]/85 via-[#000C1E]/35 to-transparent p-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-[#F3EAD8]">
                {lang === 'fr' ? 'Espace signature' : 'Signature Space'}
              </p>
              <p className="font-display text-2xl text-[#FFFFFF] mt-1">
                {lang === 'fr'
                  ? 'Terrasse Belvédère & Bassin chauffé'
                  : 'Belvedere Terrace & Heated Pool'}
              </p>
            </div>
          </div>

          {/* Right Stacked Visuals */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
            <div className="rounded-lg overflow-hidden border border-[#C5A880]/30 bg-[#122338] shadow-ambient group relative min-h-[200px]">
              <img
                src={RIVIERA_MEDIA.interior}
                alt={
                  lang === 'fr'
                    ? 'Intérieur lumineux avec îlot en travertin et vue sur le fleuve'
                    : 'Bright interior with travertine kitchen island overlooking the river'
                }
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#000C1E]/80 to-transparent p-4">
                <p className="font-display text-lg text-[#FFFFFF]">
                  {lang === 'fr'
                    ? 'Finitions nobles en chêne et travertin'
                    : 'White Oak & Honed Travertine Finishes'}
                </p>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-[#C5A880]/30 bg-[#122338] shadow-ambient group relative min-h-[200px]">
              <img
                src={RIVIERA_MEDIA.spa}
                alt={
                  lang === 'fr'
                    ? 'Pavillon bien-être et salle d’entraînement face aux berges'
                    : 'Wellness pavilion and glass fitness studio facing the riverbanks'
                }
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#000C1E]/80 to-transparent p-4">
                <p className="font-display text-lg text-[#FFFFFF]">
                  {lang === 'fr'
                    ? 'Pavillon Bien-être & Entraînement'
                    : 'Waterfront Wellness & Fitness Pavilion'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4-column Clean Editorial Numbered Features */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8 border-t border-[#C5A880]/30">
          {amenities.map((item) => (
            <div key={item.num} className="space-y-2">
              <p className="text-xs font-bold tracking-[0.12em] text-[#725B38] tabular-nums">
                {item.num}
              </p>
              <h3 className="font-display text-xl font-medium text-[#122338] leading-snug">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-[#2C3E50]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
