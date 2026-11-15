import React from 'react';
import { Typology } from '../types/riviera';

interface FloorPlanSvgProps {
  typology: Typology;
  code: string;
  orientation: string;
  className?: string;
}

export const FloorPlanSvg: React.FC<FloorPlanSvgProps> = ({
  typology,
  code,
  orientation,
  className = '',
}) => {
  return (
    <svg
      viewBox="0 0 420 260"
      className={`w-full h-auto select-none ${className}`}
      role="img"
      aria-label={`Plan architectural ${code} (${typology})`}
    >
      <rect x="0" y="0" width="420" height="260" fill="#FBF9F6" />

      {/* Outer architectural grid */}
      <g stroke="#C5A880" strokeOpacity="0.22" strokeWidth="0.75">
        <line x1="20" y1="20" x2="400" y2="20" />
        <line x1="20" y1="240" x2="400" y2="240" />
        <line x1="20" y1="20" x2="20" y2="240" />
        <line x1="400" y1="20" x2="400" y2="240" />
      </g>

      {typology === '3 ½' && (
        <g>
          {/* Main perimeter */}
          <rect x="44" y="42" width="332" height="162" fill="#FFFFFF" stroke="#122338" strokeWidth="2.5" />
          {/* Terrace */}
          <rect x="44" y="204" width="210" height="26" fill="#EFE8DC" stroke="#122338" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Bedroom */}
          <rect x="254" y="42" width="122" height="106" fill="#FBF9F6" stroke="#122338" strokeWidth="1.5" />
          {/* Bath & Walk-in */}
          <rect x="254" y="148" width="122" height="56" fill="#F5F3F0" stroke="#122338" strokeWidth="1.5" />
          {/* Kitchen island */}
          <rect x="82" y="76" width="88" height="22" fill="#EFE8DC" stroke="#725B38" strokeWidth="1.2" />
          {/* Living sofa */}
          <rect x="84" y="138" width="96" height="36" rx="2" fill="none" stroke="#725B38" strokeWidth="1.2" />
          {/* Bed */}
          <rect x="284" y="64" width="64" height="56" rx="2" fill="none" stroke="#725B38" strokeWidth="1.2" />

          <g fill="#122338" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9.5" fontWeight="600" textAnchor="middle">
            <text x="148" y="64">CUISINE &amp; ÎLOT</text>
            <text x="148" y="128">SALON RIVERAIN</text>
            <text x="315" y="134">CHAMBRE PRINCIPALE</text>
            <text x="315" y="180">SDB &amp; WALK-IN</text>
            <text x="148" y="220" fill="#725B38">LOGGIA PRIVÉE</text>
          </g>
        </g>
      )}

      {typology === '4 ½' && (
        <g>
          {/* Main perimeter */}
          <rect x="36" y="38" width="348" height="168" fill="#FFFFFF" stroke="#122338" strokeWidth="2.5" />
          {/* Terrace */}
          <rect x="116" y="206" width="268" height="26" fill="#EFE8DC" stroke="#122338" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Primary Suite */}
          <rect x="36" y="38" width="112" height="114" fill="#FBF9F6" stroke="#122338" strokeWidth="1.5" />
          {/* Ensuite */}
          <rect x="36" y="152" width="112" height="54" fill="#F5F3F0" stroke="#122338" strokeWidth="1.5" />
          {/* Bedroom 2 */}
          <rect x="276" y="38" width="108" height="110" fill="#FBF9F6" stroke="#122338" strokeWidth="1.5" />
          {/* Bath 2 */}
          <rect x="276" y="148" width="108" height="58" fill="#F5F3F0" stroke="#122338" strokeWidth="1.5" />
          {/* Kitchen island */}
          <rect x="168" y="64" width="88" height="22" fill="#EFE8DC" stroke="#725B38" strokeWidth="1.2" />
          {/* Living area */}
          <rect x="166" y="126" width="92" height="44" rx="2" fill="none" stroke="#725B38" strokeWidth="1.2" />
          {/* Beds */}
          <rect x="58" y="58" width="66" height="56" rx="2" fill="none" stroke="#725B38" strokeWidth="1.2" />
          <rect x="302" y="58" width="56" height="50" rx="2" fill="none" stroke="#725B38" strokeWidth="1.2" />

          <g fill="#122338" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="9" fontWeight="600" textAnchor="middle">
            <text x="92" y="136">SUITE MAÎTRES</text>
            <text x="92" y="182">SDB PRINCIPALE</text>
            <text x="212" y="54">CUISINE</text>
            <text x="212" y="114">SALON &amp; REPAS</text>
            <text x="330" y="132">CHAMBRE 2</text>
            <text x="330" y="180">SDB 2</text>
            <text x="250" y="222" fill="#725B38">TERRASSE RIVERAIN</text>
          </g>
        </g>
      )}

      {typology === '5 ½' && (
        <g>
          {/* Main perimeter */}
          <rect x="30" y="34" width="360" height="172" fill="#FFFFFF" stroke="#122338" strokeWidth="2.5" />
          {/* Wrap terrace */}
          <rect x="30" y="206" width="360" height="26" fill="#EFE8DC" stroke="#122338" strokeWidth="1.5" strokeDasharray="4 3" />
          {/* Primary suite */}
          <rect x="30" y="34" width="110" height="114" fill="#FBF9F6" stroke="#122338" strokeWidth="1.5" />
          <rect x="30" y="148" width="110" height="58" fill="#F5F3F0" stroke="#122338" strokeWidth="1.5" />
          {/* Living/Kitchen center */}
          <rect x="160" y="64" width="102" height="22" fill="#EFE8DC" stroke="#725B38" strokeWidth="1.2" />
          <rect x="158" y="122" width="106" height="54" rx="2" fill="none" stroke="#725B38" strokeWidth="1.2" />
          {/* Bedroom 2 & 3 */}
          <rect x="282" y="34" width="108" height="86" fill="#FBF9F6" stroke="#122338" strokeWidth="1.5" />
          <rect x="282" y="120" width="108" height="86" fill="#FBF9F6" stroke="#122338" strokeWidth="1.5" />
          {/* Beds */}
          <rect x="52" y="54" width="66" height="56" rx="2" fill="none" stroke="#725B38" strokeWidth="1.2" />
          <rect x="306" y="48" width="56" height="46" rx="2" fill="none" stroke="#725B38" strokeWidth="1.2" />
          <rect x="306" y="136" width="56" height="46" rx="2" fill="none" stroke="#725B38" strokeWidth="1.2" />

          <g fill="#122338" fontFamily="Plus Jakarta Sans, sans-serif" fontSize="8.8" fontWeight="600" textAnchor="middle">
            <text x="85" y="136">SUITE MAÎTRES</text>
            <text x="85" y="180">SDB &amp; WALK-IN</text>
            <text x="211" y="54">CUISINE DE CHEF</text>
            <text x="211" y="112">GRAND SALON</text>
            <text x="336" y="110">CHAMBRE 2</text>
            <text x="336" y="196">CHAMBRE 3 / BUREAU</text>
            <text x="211" y="222" fill="#725B38">TERRASSE PANORAMIQUE</text>
          </g>
        </g>
      )}

      {/* Compass / Scale footer inside blueprint */}
      <text
        x="32"
        y="251"
        fill="#44474D"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="8.5"
        letterSpacing="1"
      >
        {code} · {orientation.toUpperCase()}
      </text>
      <text
        x="388"
        y="251"
        fill="#725B38"
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize="8.5"
        textAnchor="end"
      >
        ÉCHELLE ARCHITECTURALE
      </text>
    </svg>
  );
};
