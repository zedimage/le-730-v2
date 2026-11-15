export type Language = 'fr' | 'en';

export type Typology = '3 ½' | '4 ½' | '5 ½';

export type AvailabilityStatus = 'immediate' | 'phase34';

export type Orientation = 'Fleuve' | 'Cour intérieure' | 'Angle Panoramique';

export interface RoomDimension {
  nameFr: string;
  nameEn: string;
  dimensions: string;
}

export interface UnitPlan {
  id: string;
  code: string;
  nameFr: string;
  nameEn: string;
  typology: Typology;
  areaSqFt: number;
  bedrooms: number;
  bathrooms: number;
  orientation: Orientation;
  orientationEn: string;
  floorRange: string;
  monthlyRent: number;
  availability: AvailabilityStatus;
  deliveryLabelFr: string;
  deliveryLabelEn: string;
  balconySqFt: number;
  highlightsFr: string[];
  highlightsEn: string[];
  rooms: RoomDimension[];
  image: string;
}

export interface UnitFilters {
  typology: Typology | 'all';
  availability: AvailabilityStatus | 'all';
  onlyFavorites: boolean;
}

export interface BookingFormInput {
  unitId: string;
  dateIso: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  notes?: string;
  law25Accepted: boolean;
}

export interface BookingValidationErrors {
  dateIso?: string;
  timeSlot?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  law25Accepted?: string;
}

export interface BookingConfirmation {
  reference: string;
  unitLabel: string;
  dateIso: string;
  timeSlot: string;
  fullName: string;
  email: string;
  phone: string;
  createdAtIso: string;
}

export interface Law25Preferences {
  essential: true;
  analytics: boolean;
  personalization: boolean;
  decidedAtIso: string;
  version: string;
}

export interface ChatMessage {
  id: string;
  sender: 'advisor' | 'user';
  text: string;
  timestamp: string;
}

export interface NeighborhoodPOI {
  id: string;
  category: 'nautical' | 'dining' | 'mobility';
  nameFr: string;
  nameEn: string;
  distance: string;
  durationFr: string;
  durationEn: string;
  descriptionFr: string;
  descriptionEn: string;
  mapX: number;
  mapY: number;
}
