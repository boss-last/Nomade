import React, { useState } from 'react';
import {
  Heart,
  Calendar,
  Trash2,
  MapPin,
  Users,
  Compass,
  CheckCircle2,
  ArrowRight,
  Receipt,
} from 'lucide-react';
import { Destination, Booking } from '../../types';
import { DestinationCard } from '../flutter_widgets/DestinationCard';
import { WidgetBadge } from '../WidgetInspectorOverlay';

interface FavoritesScreenProps {
  destinations: Destination[];
  favoriteIds: Set<string>;
  bookings: Booking[];
  onNavigate: (route: string) => void;
  onToggleFavorite: (id: string) => void;
  onCancelBooking: (bookingId: string) => void;
  showInspector?: boolean;
}

export const FavoritesScreen: React.FC<FavoritesScreenProps> = ({
  destinations,
  favoriteIds,
  bookings,
  onNavigate,
  onToggleFavorite,
  onCancelBooking,
  showInspector = false,
}) => {
  const [activeTab, setActiveTab] = useState<'favorites' | 'bookings'>('favorites');

  const favoriteDestinations = destinations.filter((d) => favoriteIds.has(d.id));

  const totalBookingsAmount = bookings.reduce((sum, b) => sum + b.totalPrice, 0);

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 overflow-y-auto">
      {/* Flutter AppBar */}
      <WidgetBadge name="AppBar" enabled={showInspector}>
        <header className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
          <h1 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Mes Carnets de Voyage
          </h1>
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-900/60 text-teal-800 dark:text-teal-300">
            {activeTab === 'favorites'
              ? `${favoriteDestinations.length} favoris`
              : `${bookings.length} réservations`}
          </span>
        </header>
      </WidgetBadge>

      {/* Flutter TabBar simulation */}
      <WidgetBadge name="TabBar" enabled={showInspector}>
        <div className="bg-white dark:bg-slate-800/90 border-b border-slate-200/80 dark:border-slate-800 grid grid-cols-2 text-center">
          <button
            type="button"
            onClick={() => setActiveTab('favorites')}
            className={`py-3 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'favorites'
                ? 'border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Heart size={14} className={activeTab === 'favorites' ? 'fill-teal-600 dark:fill-teal-400' : ''} />
            <span>Favoris ({favoriteDestinations.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('bookings')}
            className={`py-3 text-xs font-bold border-b-2 flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'bookings'
                ? 'border-teal-600 text-teal-600 dark:border-teal-400 dark:text-teal-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Receipt size={14} />
            <span>Réservations ({bookings.length})</span>
          </button>
        </div>
      </WidgetBadge>

      {/* Tab Content */}
      <div className="flex-1 p-4 pb-24">
        {activeTab === 'favorites' ? (
          <div>
            {favoriteDestinations.length === 0 ? (
              <div className="py-16 text-center px-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-500 flex items-center justify-center mb-3">
                  <Heart size={24} />
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Aucun coup de cœur pour l'instant
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                  Explorez le catalogue et cliquez sur le cœur pour épingler vos prochaines expéditions de rêve.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('/')}
                  className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors"
                >
                  Découvrir les expéditions
                </button>
              </div>
            ) : (
              <WidgetBadge name="ListView.builder" enabled={showInspector}>
                <div className="flex flex-col gap-3">
                  {favoriteDestinations.map((dest) => (
                    <DestinationCard
                      key={dest.id}
                      destination={dest}
                      isFavorite={true}
                      onTap={() => onNavigate(`/destination/${dest.id}?from=favorites`)}
                      onFavoriteToggle={() => onToggleFavorite(dest.id)}
                      showInspector={showInspector}
                    />
                  ))}
                </div>
              </WidgetBadge>
            )}
          </div>
        ) : (
          <div>
            {bookings.length > 0 && (
              <div className="mb-4 p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/80 dark:border-teal-800/60 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-teal-700 dark:text-teal-300 font-semibold uppercase">
                    Budget total engagé
                  </span>
                  <p className="text-lg font-extrabold text-teal-950 dark:text-teal-100 tabular-nums">
                    {totalBookingsAmount} €
                  </p>
                </div>
                <span className="text-xs text-teal-700 dark:text-teal-300 flex items-center gap-1 font-medium">
                  <CheckCircle2 size={14} /> {bookings.length} confirmée(s)
                </span>
              </div>
            )}

            {bookings.length === 0 ? (
              <div className="py-16 text-center px-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-teal-50 dark:bg-teal-950/40 text-teal-600 flex items-center justify-center mb-3">
                  <Compass size={24} />
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                  Aucune réservation enregistrée
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs mx-auto">
                  Prêt à partir à l'aventure ? Réservez une expédition via le formulaire de réservation.
                </p>
                <button
                  type="button"
                  onClick={() => onNavigate('/booking')}
                  className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-xl text-xs font-semibold hover:bg-teal-700 transition-colors"
                >
                  Ouvrir le formulaire
                </button>
              </div>
            ) : (
              <WidgetBadge name="ListView.builder (Bookings)" enabled={showInspector}>
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-3.5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-xs flex flex-col gap-2.5"
                    >
                      <div className="flex items-start gap-3">
                        <img
                          src={booking.destinationImageUrl}
                          alt={booking.destinationTitle}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase tracking-wide">
                              {booking.id}
                            </span>
                            <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                              {booking.status}
                            </span>
                          </div>

                          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate mt-0.5">
                            {booking.destinationTitle}
                          </h4>

                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {booking.fullName} ({booking.email})
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100 dark:border-slate-700/60 grid grid-cols-2 gap-2 text-[11px] text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={12} className="text-slate-400" />
                          <span>Départ : {booking.departureDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users size={12} className="text-slate-400" />
                          <span>{booking.travelersCount} voyageur(s)</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100 tabular-nums">
                          Total : {booking.totalPrice} €
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => onNavigate(`/destination/${booking.destinationId}?from=bookings`)}
                            className="px-2.5 py-1 text-[11px] font-semibold text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                          >
                            Détails
                          </button>
                          <button
                            type="button"
                            onClick={() => onCancelBooking(booking.id)}
                            className="p-1 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-700 rounded-lg transition-colors"
                            title="Annuler cette réservation"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </WidgetBadge>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
