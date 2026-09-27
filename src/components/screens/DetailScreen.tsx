import React, { useState } from 'react';
import {
  ArrowLeft,
  Heart,
  Share2,
  Calendar,
  Clock,
  Compass,
  CheckCircle2,
  Sparkles,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { Destination } from '../../types';
import { RatingStars } from '../flutter_widgets/RatingStars';
import { WidgetBadge } from '../WidgetInspectorOverlay';

interface DetailScreenProps {
  destinationId: string;
  source?: string;
  destinations: Destination[];
  isFavorite: boolean;
  onBack: () => void;
  onToggleFavorite: () => void;
  onBook: (destinationId: string) => void;
  showInspector?: boolean;
}

export const DetailScreen: React.FC<DetailScreenProps> = ({
  destinationId,
  source = 'home',
  destinations,
  isFavorite,
  onBack,
  onToggleFavorite,
  onBook,
  showInspector = false,
}) => {
  const [activeTab, setActiveTab] = useState<'apercu' | 'itineraire' | 'inclus' | 'avis'>('apercu');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [shareToast, setShareToast] = useState(false);

  const destination = destinations.find((d) => d.id === destinationId);

  if (!destination) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center bg-slate-50 dark:bg-slate-900">
        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          Destination introuvable (ID : {destinationId})
        </p>
        <button
          type="button"
          onClick={onBack}
          className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-medium"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const allImages = [destination.imageUrl, ...(destination.galleryUrls || [])];
  const activeImage = allImages[selectedImageIndex] || destination.imageUrl;

  const handleShare = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2200);
  };

  return (
    <div className="relative flex flex-col h-full bg-slate-50 dark:bg-slate-900 overflow-y-auto">
      {/* Toast Notification (SnackBar simulation) */}
      {shareToast && (
        <div className="fixed top-14 left-1/2 -translate-x-1/2 z-50 px-4 py-2 bg-slate-900 text-white text-xs font-medium rounded-full shadow-lg flex items-center gap-1.5 animate-bounce">
          <Share2 size={13} className="text-teal-400" />
          <span>Lien d'expédition copié dans le presse-papier !</span>
        </div>
      )}

      {/* Hero Banner with Flutter Stack simulation */}
      <WidgetBadge name="SliverAppBar / Stack" enabled={showInspector}>
        <div className="relative w-full aspect-16/11 bg-slate-900 overflow-hidden">
          <img
            src={activeImage}
            alt={destination.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-black/40 pointer-events-none" />

          {/* Floating Action Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <button
              type="button"
              onClick={onBack}
              className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all active:scale-95"
              title="Retour"
            >
              <ArrowLeft size={18} />
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all active:scale-95"
                title="Partager"
              >
                <Share2 size={18} />
              </button>

              <button
                type="button"
                onClick={onToggleFavorite}
                className="p-2.5 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all active:scale-95"
                title={isFavorite ? 'Retirer' : 'Favori'}
              >
                <Heart
                  size={18}
                  className={isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'}
                />
              </button>
            </div>
          </div>

          {/* Source indicator pill & title */}
          <div className="absolute bottom-4 left-4 right-4 z-10 text-white">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-teal-600/90 text-white backdrop-blur-md">
                {destination.category}
              </span>
              <span className="text-[11px] text-white/80 flex items-center gap-1">
                <MapPin size={11} className="text-teal-300" />
                {destination.country}
              </span>
            </div>

            <h1 className="text-xl font-bold leading-tight drop-shadow-sm">
              {destination.title}
            </h1>
          </div>
        </div>
      </WidgetBadge>

      {/* Image Gallery Thumbnails */}
      {allImages.length > 1 && (
        <div className="px-4 py-2.5 bg-white dark:bg-slate-800/80 border-b border-slate-200/80 dark:border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setSelectedImageIndex(idx)}
              className={`relative shrink-0 w-14 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                selectedImageIndex === idx
                  ? 'border-teal-500 scale-105 shadow-sm'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`Photo ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Quick Specs Grid */}
      <WidgetBadge name="Card / Row" enabled={showInspector}>
        <div className="p-4 bg-white dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 flex flex-col items-center">
            <Clock size={16} className="text-teal-600 dark:text-teal-400 mb-1" />
            <span className="text-[10px] text-slate-400 uppercase font-medium">Durée</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
              {destination.durationDays} Jours
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 flex flex-col items-center">
            <Award size={16} className="text-teal-600 dark:text-teal-400 mb-1" />
            <span className="text-[10px] text-slate-400 uppercase font-medium">Niveau</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
              {destination.difficulty}
            </span>
          </div>

          <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-900/60 flex flex-col items-center">
            <Calendar size={16} className="text-teal-600 dark:text-teal-400 mb-1" />
            <span className="text-[10px] text-slate-400 uppercase font-medium">Saison</span>
            <span className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate max-w-full">
              {destination.bestSeason}
            </span>
          </div>
        </div>
      </WidgetBadge>

      {/* Tabs Bar (Flutter TabBar simulation) */}
      <WidgetBadge name="TabBar" enabled={showInspector}>
        <div className="sticky top-0 z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 flex items-center px-4">
          <button
            type="button"
            onClick={() => setActiveTab('apercu')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'apercu'
                ? 'border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Aperçu
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('itineraire')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'itineraire'
                ? 'border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Itinéraire ({destination.itinerary.length}j)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('inclus')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'inclus'
                ? 'border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Inclus
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('avis')}
            className={`py-3 px-3 text-xs font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === 'avis'
                ? 'border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Avis ({destination.reviewCount})
          </button>
        </div>
      </WidgetBadge>

      {/* TabBarView Body */}
      <div className="flex-1 p-4 pb-28">
        {activeTab === 'apercu' && (
          <div className="space-y-5">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                À propos de l'expédition
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {destination.longDescription}
              </p>
            </div>

            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
                Points forts de l'aventure
              </h2>
              <div className="space-y-2">
                {destination.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 size={15} className="text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 flex items-center gap-3">
              <ShieldCheck size={24} className="text-teal-600 dark:text-teal-400 shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-teal-900 dark:text-teal-200">
                  Garantie Nomade Sécurité
                </h4>
                <p className="text-[11px] text-teal-700 dark:text-teal-300">
                  Guides certifiés d'État, balise satellite SOS et matériel de haute qualité.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'itineraire' && (
          <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
              Programme étape par étape
            </h2>
            <div className="space-y-3 relative before:absolute before:top-3 before:bottom-3 before:left-3.5 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700">
              {destination.itinerary.map((step) => (
                <div key={step.day} className="relative flex items-start gap-3 pl-1">
                  <div className="w-6 h-6 rounded-full bg-teal-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 z-10 ring-4 ring-white dark:ring-slate-900 shadow-xs">
                    {step.day}
                  </div>
                  <div className="flex-1 bg-white dark:bg-slate-800 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                      Jour {step.day} : {step.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inclus' && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2">
              Ce qui est inclus dans le tarif
            </h2>
            <div className="space-y-2.5">
              {destination.included.map((inc, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300"
                >
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  <span>{inc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'avis' && (
          <div className="space-y-3">
            <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
              <div>
                <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                  {destination.rating.toFixed(1)}
                </span>
                <span className="text-xs text-slate-400 ml-1">/ 5.0</span>
                <p className="text-xs text-slate-500 mt-0.5">
                  Basé sur {destination.reviewCount} avis vérifiés
                </p>
              </div>
              <RatingStars rating={destination.rating} size={18} />
            </div>

            <div className="space-y-2 mt-3">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Mathieu V. · Expédition 2025
                  </span>
                  <RatingStars rating={5} />
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  « Une expérience à couper le souffle. Le guide était d'un professionnalisme exemplaire et l'ambiance du groupe tout simplement géniale ! »
                </p>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200/80 dark:border-slate-700 text-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-900 dark:text-slate-100">
                    Camille L. · Expédition 2025
                  </span>
                  <RatingStars rating={4.9} />
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
                  « Paysages grandioses et organisation sans faille de A à Z. On en prend plein les yeux chaque jour. »
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Sticky Bottom Booking Bar */}
      <WidgetBadge name="BottomAppBar / CTA" enabled={showInspector}>
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between z-20">
          <div>
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">
              Tarif par participant
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-teal-700 dark:text-teal-400 tabular-nums">
                {destination.price} €
              </span>
              <span className="text-xs text-slate-500">TTC</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onBook(destination.id)}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 active:scale-95 text-white font-bold text-xs shadow-md shadow-teal-600/30 transition-all cursor-pointer"
          >
            <span>Réserver l'expédition</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </WidgetBadge>
    </div>
  );
};
