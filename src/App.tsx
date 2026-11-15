import { useEffect, useMemo, useState } from 'react';
import { AmenitiesSection } from './components/AmenitiesSection';
import { BookingSection } from './components/BookingSection';
import { BrochureModal } from './components/BrochureModal';
import { ConciergeChat } from './components/ConciergeChat';
import { FloorPlansSection } from './components/FloorPlansSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Law25Modal } from './components/Law25Modal';
import { Navbar } from './components/Navbar';
import { NeighborhoodSection } from './components/NeighborhoodSection';
import { PlanZoomModal } from './components/PlanZoomModal';
import { UNIT_PLANS } from './data/units';
import {
  Language,
  Law25Preferences,
  UnitFilters,
  UnitPlan,
} from './types/riviera';
import {
  FAVORITES_STORAGE_KEY,
  filterUnits,
  LAW25_STORAGE_KEY,
  parseLaw25Preferences,
} from './utils/booking';

export default function App() {
  const [lang, setLang] = useState<Language>('fr');
  const [activeSection, setActiveSection] = useState<string>('projet');
  const [filters, setFilters] = useState<UnitFilters>({
    typology: 'all',
    availability: 'all',
    onlyFavorites: false,
  });

  const [law25Preferences, setLaw25Preferences] = useState<Law25Preferences | null>(() => {
    try {
      return parseLaw25Preferences(window.localStorage.getItem(LAW25_STORAGE_KEY));
    } catch {
      return null;
    }
  });

  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('autostart') === '1') return false;
      return parseLaw25Preferences(window.localStorage.getItem(LAW25_STORAGE_KEY)) === null;
    } catch {
      return true;
    }
  });

  const [favoriteIds, setFavoriteIds] = useState<string[]>(() => {
    try {
      const raw = window.localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter((x) => typeof x === 'string') : [];
    } catch {
      return [];
    }
  });

  const [inspectedUnit, setInspectedUnit] = useState<UnitPlan | null>(null);
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [selectedBookingUnitId, setSelectedBookingUnitId] = useState<string>('');

  const visibleUnits = useMemo(
    () => filterUnits(UNIT_PLANS, filters, favoriteIds),
    [filters, favoriteIds]
  );

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const sectionIds = ['projet', 'plans', 'commodites', 'quartier', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0.05 }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId === 'accueil' ? 'projet' : sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (sectionId === 'accueil') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleToggleFavorite = (unitId: string) => {
    setFavoriteIds((prev) => {
      const next = prev.includes(unitId)
        ? prev.filter((id) => id !== unitId)
        : [...prev, unitId];
      try {
        window.localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors in restricted environments
      }
      return next;
    });
  };

  const handleSelectUnitForBooking = (unit: UnitPlan) => {
    setInspectedUnit(null);
    setSelectedBookingUnitId(unit.id);
    handleNavigate('rendez-vous');
  };

  const handleSaveLaw25 = (prefs: Law25Preferences) => {
    setLaw25Preferences(prefs);
    setIsPrivacyOpen(false);
    try {
      window.localStorage.setItem(LAW25_STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore storage errors
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F6] text-[#1B1C1A] overflow-x-clip">
      <Navbar
        lang={lang}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      <main className="flex-1">
        <HeroSection
          lang={lang}
          onBookVisit={() => handleNavigate('rendez-vous')}
          onOpenBrochure={() => setIsBrochureOpen(true)}
          onExplorePlans={() => handleNavigate('plans')}
        />

        <FloorPlansSection
          lang={lang}
          units={visibleUnits}
          filters={filters}
          favoriteIds={favoriteIds}
          onChangeFilters={setFilters}
          onToggleFavorite={handleToggleFavorite}
          onInspectPlan={(unit) => setInspectedUnit(unit)}
          onSelectForBooking={handleSelectUnitForBooking}
        />

        <AmenitiesSection
          lang={lang}
          onBookVisit={() => handleNavigate('rendez-vous')}
        />

        <NeighborhoodSection lang={lang} />

        <BookingSection
          lang={lang}
          selectedUnitId={selectedBookingUnitId}
          onChangeSelectedUnitId={setSelectedBookingUnitId}
          onOpenPrivacy={() => setIsPrivacyOpen(true)}
        />
      </main>

      <Footer
        lang={lang}
        onToggleLang={() => setLang((prev) => (prev === 'fr' ? 'en' : 'fr'))}
        onNavigate={handleNavigate}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenBrochure={() => setIsBrochureOpen(true)}
      />

      <PlanZoomModal
        unit={inspectedUnit}
        lang={lang}
        isFavorite={inspectedUnit ? favoriteIds.includes(inspectedUnit.id) : false}
        onClose={() => setInspectedUnit(null)}
        onToggleFavorite={handleToggleFavorite}
        onBookUnit={handleSelectUnitForBooking}
      />

      <BrochureModal
        isOpen={isBrochureOpen}
        lang={lang}
        onClose={() => setIsBrochureOpen(false)}
        onBookVisit={() => handleNavigate('rendez-vous')}
      />

      <Law25Modal
        isOpen={isPrivacyOpen}
        lang={lang}
        currentPreferences={law25Preferences}
        onSavePreferences={handleSaveLaw25}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <ConciergeChat
        lang={lang}
        onJumpToBooking={() => handleNavigate('rendez-vous')}
      />
    </div>
  );
}
