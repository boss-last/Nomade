import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  reviewCount?: number;
  size?: number;
}

export const RatingStars: React.FC<RatingStarsProps> = ({ rating, reviewCount, size = 14 }) => {
  return (
    <div className="flex items-center gap-1">
      <Star size={size} className="fill-amber-400 text-amber-400 shrink-0" />
      <span className="text-xs font-bold text-slate-800 dark:text-slate-100">
        {rating.toFixed(1)}
      </span>
      {reviewCount !== undefined && (
        <span className="text-[11px] text-slate-500 dark:text-slate-400">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};
