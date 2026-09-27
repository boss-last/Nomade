import React, { useState, useMemo } from 'react';
import {
  Compass,
  LayoutGrid,
  List as ListIcon,
  Mountain,
  Palmtree,
  Tent,
  Landmark,
  Sparkles,
  SlidersHorizontal,
  Flame,
} from 'lucide-react';
import { Destination } from '../../types';
import { DestinationCard } from '../flutter_widgets/DestinationCard';
import { CustomSearchBar } from '../flutter_widgets/CustomSearchBar';
import { CategoryChip } from '../flutter_widgets/CategoryChip';
import { WidgetBadge } from '../WidgetInspectorOverlay';

interface HomeScreenProps {
  destinations: Destination[];
  favoriteIds: Set<string>;
  onNavigate: (route: string) => void;
  onToggleFavorite: (id: string) => void;
  showInspector?: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  destinations,
  favoriteIds,
  onNavigate,
  onToggleFavorite,
  showInspector = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [isGridView, setIsGridView] = useState(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'duration'>('featured');

  const categories = [
    { label: 'Tous', icon: Compass },
    { label: 'Montagne', icon: Mountain },
    { label: 'Aventure', icon: Tent },
    { label: 'Culture', icon: Landmark },
    { label: 'Plage', icon: Palmtree },
    { label: 'Détente', icon: Sparkles },
  ];

  const filteredDestinations = useMemo(() => {
    let result = destinations.filter((dest) => {
      const matchesCategory =
        selectedCategory === 'Tous' || dest.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        dest.title.toLowerCase().includes(q) ||
        dest.country.toLowerCase().includes(q) ||
        dest.subtitle.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });

    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'duration':
        result.sort((a, b) => a.durationDays - b.durationDays);
        break;
      default:
        // featured first
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [destinations, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 overflow-y-auto">
      {/* Flutter AppBar */}
      <WidgetBadge name="AppBar" enabled={showInspector}>
        <header className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-teal-600 dark:bg-teal-500 flex items-center justify-center text-white shadow-sm shadow-teal-600/30">
              <Compass size={18} />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 dark:text-slate-100 leading-tight">
                Nomade
              </h1>
              <p className="text-[10px] text-teal-600 dark:text-teal-400 font-medium">
                Expéditions & Voyages
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setIsGridView(!isGridView)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isGridView ? 'Passer en vue Liste' : 'Passer en vue Grille'}
            >
              {isGridView ? <ListIcon size={18} /> : <LayoutGrid size={18} />}
            </button>
          </div>
        </header>
      </WidgetBadge>

      {/* Search Bar */}
      <div className="px-4 pt-3 pb-1">
        <CustomSearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          onClear={() => setSearchQuery('')}
          placeholder="Rechercher Mont-Blanc, Norvège, Japon..."
          showInspector={showInspector}
        />
      </div>

      {/* Category Chips Scroll (Horizontal ListView) */}
      <WidgetBadge name="ListView (Horizontal)" enabled={showInspector}>
        <div className="px-4 py-2 overflow-x-auto no-scrollbar flex items-center gap-2">
          {categories.map((cat) => {
            const count =
              cat.label === 'Tous'
                ? destinations.length
                : destinations.filter((d) => d.category === cat.label).length;

            return (
              <CategoryChip
                key={cat.label}
                label={cat.label}
                icon={cat.icon}
                isSelected={selectedCategory === cat.label}
                count={count}
                onSelected={() => setSelectedCategory(cat.label)}
                showInspector={showInspector}
              />
            );
          })}
        </div>
      </WidgetBadge>

      {/* Sorting bar & Counter */}
      <div className="px-4 py-2 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200/50 dark:border-slate-800/60">
        <span className="font-medium">
          {filteredDestinations.length}{' '}
          {filteredDestinations.length > 1 ? 'destinations trouvées' : 'destination trouvée'}
        </span>

        <div className="flex items-center gap-1.5">
          <SlidersHorizontal size={12} className="text-slate-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent text-xs text-slate-700 dark:text-slate-300 font-medium focus:outline-none cursor-pointer"
          >
            <option value="featured" className="dark:bg-slate-800">Populaires</option>
            <option value="price-asc" className="dark:bg-slate-800">Prix croissant</option>
            <option value="price-desc" className="dark:bg-slate-800">Prix décroissant</option>
            <option value="rating" className="dark:bg-slate-800">Meilleure note</option>
            <option value="duration" className="dark:bg-slate-800">Durée plus courte</option>
          </select>
        </div>
      </div>

      {/* List or Grid View of Destination Cards */}
      <div className="flex-1 p-4 pb-20">
        <WidgetBadge
          name={isGridView ? 'GridView.builder' : 'ListView.builder'}
          enabled={showInspector}
        >
          {filteredDestinations.length === 0 ? (
            <div className="py-12 flex flex-col items-center justify-center text-center px-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 mb-3">
                <Mountain size={24} />
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Aucune destination trouvée
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                Modifiez vos critères de recherche ou réinitialisez le filtre de catégorie.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Tous');
                }}
                className="mt-3 px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-medium hover:bg-teal-700 transition-colors"
              >
                Réinitialiser les filtres
              </button>
            </div>
          ) : (
            <div
              className={
                isGridView
                  ? 'grid grid-cols-2 gap-3'
                  : 'flex flex-col gap-4'
              }
            >
              {filteredDestinations.map((dest) => (
                <DestinationCard
                  key={dest.id}
                  destination={dest}
                  isFavorite={favoriteIds.has(dest.id)}
                  onTap={() => onNavigate(`/destination/${dest.id}?from=explore`)}
                  onFavoriteToggle={() => onToggleFavorite(dest.id)}
                  isCompact={isGridView}
                  showInspector={showInspector}
                />
              ))}
            </div>
          )}
        </WidgetBadge>
      </div>
    </div>
  );
};
