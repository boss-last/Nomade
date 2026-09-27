import React, { useState } from 'react';
import { Heart, Clock, Mountain, MapPin } from 'lucide-react';
import { Destination } from '../../types';
import { RatingStars } from './RatingStars';
import { WidgetBadge } from '../WidgetInspectorOverlay';

interface DestinationCardProps {
  destination: Destination;
  isFavorite: boolean;
  onTap: () => void;
  onFavoriteToggle: () => void;
  isCompact?: boolean;
  showInspector?: boolean;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  isFavorite,
  onTap,
  onFavoriteToggle,
  isCompact = false,
  showInspector = false,
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <WidgetBadge name="Card > InkWell" enabled={showInspector}>
      <div
        onClick={onTap}
        className="group relative bg-white dark:bg-slate-800/90 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden cursor-pointer flex flex-col"
      >
        {/* Flutter Stack Widget simulation */}
        <WidgetBadge name="Stack" enabled={showInspector}>
          <div className="relative w-full overflow-hidden bg-slate-200 dark:bg-slate-700 aspect-16/10">
            {!imageError ? (
              <img
                src={destination.imageUrl}
                alt={destination.title}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-teal-800 to-slate-900 text-teal-200">
                <Mountain size={36} className="opacity-80" />
                <span className="text-xs mt-1 font-medium">{destination.title}</span>
              </div>
            )}

            {/* Dark gradient overlay at bottom of image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Positioned Category Tag */}
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-black/50 text-white backdrop-blur-md border border-white/10">
                {destination.category}
              </span>
            </div>

            {/* Positioned Favorite Toggle Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onFavoriteToggle();
              }}
              className="absolute top-2.5 right-2.5 z-10 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition-all active:scale-90"
              title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              <Heart
                size={16}
                className={isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'}
              />
            </button>

            {/* Positioned bottom info over image (Difficulty & Altitude) */}
            <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between text-[11px] text-white/90">
              <span className="font-medium bg-black/30 px-1.5 py-0.5 rounded backdrop-blur-xs">
                {destination.difficulty}
              </span>
              {destination.altitude && (
                <span className="text-white/80 text-[10px]">
                  {destination.altitude}
                </span>
              )}
            </div>
          </div>
        </WidgetBadge>

        {/* Content body */}
        <div className={`flex flex-col flex-1 ${isCompact ? 'p-3' : 'p-4'}`}>
          <div className="flex items-center justify-between gap-1 text-[11px] text-slate-500 dark:text-slate-400 mb-1">
            <span className="inline-flex items-center gap-1 font-medium text-teal-600 dark:text-teal-400 truncate">
              <MapPin size={12} className="shrink-0" />
              {destination.country}
            </span>
            <RatingStars
              rating={destination.rating}
              reviewCount={destination.reviewCount}
            />
          </div>

          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-snug line-clamp-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {destination.title}
          </h3>

          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {destination.subtitle}
          </p>

          <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 text-xs">
              <Clock size={13} />
              <span>{destination.durationDays} j</span>
            </div>

            <div className="text-right">
              <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100 tabular-nums">
                {destination.price} €
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 ml-0.5">
                /pers.
              </span>
            </div>
          </div>
        </div>
      </div>
    </WidgetBadge>
  );
};
