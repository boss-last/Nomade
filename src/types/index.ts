export interface Destination {
  id: string;
  title: string;
  subtitle: string;
  country: string;
  continent: string;
  category: 'Montagne' | 'Plage' | 'Aventure' | 'Culture' | 'Détente';
  price: number; // in Euros
  durationDays: number;
  rating: number;
  reviewCount: number;
  difficulty: 'Facile' | 'Modéré' | 'Exigeant' | 'Expert';
  bestSeason: string;
  altitude?: string;
  description: string;
  longDescription: string;
  highlights: string[];
  included: string[];
  itinerary: { day: number; title: string; desc: string }[];
  imageUrl: string;
  galleryUrls: string[];
  featured?: boolean;
}

export interface Booking {
  id: string;
  destinationId: string;
  destinationTitle: string;
  destinationCountry: string;
  destinationImageUrl: string;
  fullName: string;
  email: string;
  phone: string;
  travelersCount: number;
  departureDate: string;
  experienceLevel: 'Débutant' | 'Intermédiaire' | 'Expert';
  hasInsurance: boolean;
  specialRequests?: string;
  totalPrice: number;
  status: 'Confirmée' | 'En attente' | 'Terminée';
  createdAt: string;
}

export type DeviceMode = 'mobile' | 'tablet' | 'desktop';
export type ThemeMode = 'light' | 'dark';
