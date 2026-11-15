import heroWaterfront from '../assets/images/hero_waterfront_residences_1794770932171.jpg';
import interiorLiving from '../assets/images/interior_living_river_1794770932680.jpg';
import rooftopTerrace from '../assets/images/amenity_rooftop_terrace_1794770933522.jpg';
import fitnessSpa from '../assets/images/amenity_fitness_spa_1794770934630.jpg';

export const RIVIERA_MEDIA = {
  hero: heroWaterfront,
  interior: interiorLiving,
  rooftop: rooftopTerrace,
  spa: fitnessSpa,
} as const;

export type MediaKey = keyof typeof RIVIERA_MEDIA;
