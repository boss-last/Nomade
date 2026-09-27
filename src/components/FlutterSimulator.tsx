import React, { useState, useEffect } from 'react';
import {
  Compass,
  Heart,
  Settings as SettingsIcon,
  PlusCircle,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Smartphone,
  Tablet,
  Maximize2,
  CheckCircle,
  Copy,
  Terminal,
  Layers,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { Destination, Booking, DeviceMode, ThemeMode } from '../types';
import { HomeScreen } from './screens/HomeScreen';
import { DetailScreen } from './screens/DetailScreen';
import { BookingScreen } from './screens/BookingScreen';
import { FavoritesScreen } from './screens/FavoritesScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { WidgetBadge } from './WidgetInspectorOverlay';

interface FlutterSimulatorProps {
  destinations: Destination[];
  favoriteIds: Set<string>;
  bookings: Booking[];
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  deviceMode: DeviceMode;
  onDeviceChange: (mode: DeviceMode) => void;
  showInspector: boolean;
  onToggleInspector: () => void;
  showDebugBanner: boolean;
  onToggleDebugBanner: () => void;
  onToggleFavorite: (id: string) => void;
  onAddBooking: (booking: Booking) => void;
  onCancelBooking: (id: string) => void;
  onResetData: () => void;
  onOpenCodeExplorer: (filePath?: string) => void;
  onOpenRubric: () => void;
  onOpenDelivery?: () => void;
  currentRoute: string;
  onNavigate: (route: string) => void;
}

export const FlutterSimulator: React.FC<FlutterSimulatorProps> = ({
  destinations,
  favoriteIds,
  bookings,
  themeMode,
  onThemeChange,
  deviceMode,
  onDeviceChange,
  showInspector,
  onToggleInspector,
  showDebugBanner,
  onToggleDebugBanner,
  onToggleFavorite,
  onAddBooking,
  onCancelBooking,
  onResetData,
  onOpenCodeExplorer,
  onOpenRubric,
  onOpenDelivery,
  currentRoute,
  onNavigate,
}) => {
  const [history, setHistory] = useState<string[]>([currentRoute]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [routeInput, setRouteInput] = useState(currentRoute);
  const [copiedRoute, setCopiedRoute] = useState(false);

  useEffect(() => {
    setRouteInput(currentRoute);
  }, [currentRoute]);

  const handleNavigate = (newRoute: string) => {
    if (newRoute === currentRoute) return;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newRoute);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    onNavigate(newRoute);
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      onNavigate(prev);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      onNavigate(next);
    }
  };

  const handleRouteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (routeInput.trim()) {
      handleNavigate(routeInput.trim());
    }
  };

  const handleCopyRoute = () => {
    navigator.clipboard.writeText(currentRoute);
    setCopiedRoute(true);
    setTimeout(() => setCopiedRoute(false), 1500);
  };

  // Route parsing
  const parseRoute = (route: string) => {
    const [pathPart, queryPart] = route.split('?');
    const queryParams: Record<string, string> = {};
    if (queryPart) {
      const searchParams = new URLSearchParams(queryPart);
      searchParams.forEach((val, key) => {
        queryParams[key] = val;
      });
    }

    if (pathPart.startsWith('/destination/')) {
      const id = pathPart.replace('/destination/', '');
      return {
        screen: 'detail',
        params: { id, ...queryParams },
      };
    }

    if (pathPart === '/booking') {
      return {
        screen: 'booking',
        params: queryParams,
      };
    }

    if (pathPart === '/favorites') {
      return {
        screen: 'favorites',
        params: queryParams,
      };
    }

    if (pathPart === '/settings') {
      return {
        screen: 'settings',
        params: queryParams,
      };
    }

    return {
      screen: 'home',
      params: queryParams,
    };
  };

  const parsed = parseRoute(currentRoute);

  const getScreenBadgeName = () => {
    switch (parsed.screen) {
      case 'detail':
        return `DetailScreen(id: "${parsed.params.id}")`;
      case 'booking':
        return `BookingScreen(destId: "${parsed.params.destId || 'none'}")`;
      case 'favorites':
        return 'FavoritesScreen()';
      case 'settings':
        return 'SettingsScreen()';
      default:
        return 'HomeScreen()';
    }
  };

  // Bottom Navigation Active Index
  const getNavIndex = () => {
    if (parsed.screen === 'favorites') return 1;
    if (parsed.screen === 'settings') return 2;
    return 0; // home or sub-screen
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-2 sm:p-4">
      {/* GoRouter Inspector Bar */}
      <div className="w-full max-w-4xl mb-3 bg-slate-900 border border-slate-800 rounded-2xl p-2.5 flex flex-wrap items-center justify-between gap-2 shadow-md">
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={historyIndex <= 0}
            onClick={handleBack}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            title="Page précédente (Navigator.pop)"
          >
            <ArrowLeft size={15} />
          </button>
          <button
            type="button"
            disabled={historyIndex >= history.length - 1}
            onClick={handleForward}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 disabled:opacity-30 disabled:hover:bg-transparent transition-colors cursor-pointer"
            title="Page suivante"
          >
            <ArrowRight size={15} />
          </button>
          <button
            type="button"
            onClick={() => handleNavigate('/')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            title="Accueil (/)"
          >
            <RotateCcw size={14} />
          </button>

          <span className="text-[11px] font-mono text-teal-400 font-bold px-2 py-0.5 rounded bg-teal-950/80 border border-teal-800/60 hidden sm:inline">
            GoRouter 2.0
          </span>
        </div>

        {/* URL Path Input Bar */}
        <form
          onSubmit={handleRouteSubmit}
          className="flex-1 max-w-md mx-1 flex items-center relative"
        >
          <span className="absolute left-2.5 text-slate-500 font-mono text-xs select-none">
            app://
          </span>
          <input
            type="text"
            value={routeInput}
            onChange={(e) => setRouteInput(e.target.value)}
            className="w-full pl-14 pr-7 py-1.5 bg-slate-950 border border-slate-800 rounded-xl font-mono text-xs text-slate-200 focus:outline-none focus:border-teal-500 transition-colors"
            placeholder="Route URL (/destination/mont-blanc)..."
          />
          <button
            type="button"
            onClick={handleCopyRoute}
            className="absolute right-2 text-slate-500 hover:text-slate-200 transition-colors"
            title="Copier l'URL"
          >
            {copiedRoute ? (
              <CheckCircle size={13} className="text-emerald-400" />
            ) : (
              <Copy size={13} />
            )}
          </button>
        </form>

        {/* Current Screen Badge & View Switchers */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-slate-800 text-slate-300 font-medium hidden md:inline truncate max-w-[200px]">
            {getScreenBadgeName()}
          </span>

          <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
            <button
              type="button"
              onClick={() => onDeviceChange('mobile')}
              className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                deviceMode === 'mobile'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Vue Mobile (iPhone 390px)"
            >
              <Smartphone size={14} />
            </button>
            <button
              type="button"
              onClick={() => onDeviceChange('tablet')}
              className={`p-1.5 rounded-md text-xs transition-colors cursor-pointer ${
                deviceMode === 'tablet'
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Vue Tablette (iPad 768px)"
            >
              <Tablet size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Flutter Device Shell Frame */}
      <div
        className={`relative transition-all duration-300 flex flex-col ${
          deviceMode === 'mobile'
            ? 'w-full max-w-[400px] h-[780px] rounded-[44px] shadow-2xl p-3 border-4 border-slate-700 bg-slate-800'
            : deviceMode === 'tablet'
            ? 'w-full max-w-[760px] h-[780px] rounded-[36px] shadow-2xl p-4 border-4 border-slate-700 bg-slate-800'
            : 'w-full h-full max-w-5xl rounded-2xl border border-slate-800 p-1 bg-slate-900'
        }`}
      >
        {/* Device speaker/notch simulation for mobile */}
        {deviceMode === 'mobile' && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-950 rounded-full z-40 flex items-center justify-center">
            <div className="w-10 h-1 bg-slate-800 rounded-full" />
          </div>
        )}

        {/* Screen Bezel Inside Frame */}
        <div
          className={`relative flex-1 w-full overflow-hidden flex flex-col transition-colors ${
            themeMode === 'dark' ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
          } ${
            deviceMode === 'mobile'
              ? 'rounded-[34px] pt-4'
              : deviceMode === 'tablet'
              ? 'rounded-[26px]'
              : 'rounded-xl'
          }`}
        >
          {/* Flutter Official Debug Banner (Top Right Corner) */}
          {showDebugBanner && (
            <div className="absolute top-2 right-[-28px] rotate-45 bg-rose-600 text-white text-[8px] font-extrabold px-7 py-0.5 shadow-md z-50 uppercase tracking-widest pointer-events-none select-none">
              DEBUG
            </div>
          )}

          {/* Scaffold Body (Adaptive Row for Tablet, Single Col for Mobile) */}
          <div className="flex-1 flex overflow-hidden">
            {/* Tablet NavigationRail simulation */}
            {deviceMode === 'tablet' && (
              <WidgetBadge name="NavigationRail" enabled={showInspector}>
                <aside className="w-20 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 flex flex-col items-center py-6 gap-6 z-20 shrink-0">
                  <div className="w-10 h-10 rounded-2xl bg-teal-600 flex items-center justify-center text-white shadow-md shadow-teal-600/30">
                    <Compass size={22} />
                  </div>

                  <nav className="flex flex-col items-center gap-4 flex-1">
                    <button
                      type="button"
                      onClick={() => handleNavigate('/')}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                        parsed.screen === 'home'
                          ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 font-bold'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <Compass size={20} />
                      <span className="text-[10px]">Explorer</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigate('/favorites')}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                        parsed.screen === 'favorites'
                          ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 font-bold'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <Heart size={20} />
                      <span className="text-[10px]">Favoris</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleNavigate('/settings')}
                      className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                        parsed.screen === 'settings'
                          ? 'bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 font-bold'
                          : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      <SettingsIcon size={20} />
                      <span className="text-[10px]">Réglages</span>
                    </button>
                  </nav>

                  <button
                    type="button"
                    onClick={() => handleNavigate('/booking')}
                    className="p-3 rounded-2xl bg-teal-600 text-white shadow-md shadow-teal-600/30 hover:bg-teal-700 transition-colors"
                    title="Nouvelle réservation"
                  >
                    <PlusCircle size={20} />
                  </button>
                </aside>
              </WidgetBadge>
            )}

            {/* Screen Content Container */}
            <main className="flex-1 overflow-hidden relative flex flex-col">
              {parsed.screen === 'home' && (
                <HomeScreen
                  destinations={destinations}
                  favoriteIds={favoriteIds}
                  onNavigate={handleNavigate}
                  onToggleFavorite={onToggleFavorite}
                  showInspector={showInspector}
                />
              )}

              {parsed.screen === 'detail' && (
                <DetailScreen
                  destinationId={parsed.params.id}
                  source={parsed.params.from}
                  destinations={destinations}
                  isFavorite={favoriteIds.has(parsed.params.id)}
                  onBack={handleBack}
                  onToggleFavorite={() => onToggleFavorite(parsed.params.id)}
                  onBook={(destId) => handleNavigate(`/booking?destId=${destId}`)}
                  showInspector={showInspector}
                />
              )}

              {parsed.screen === 'booking' && (
                <BookingScreen
                  preselectedDestId={parsed.params.destId}
                  destinations={destinations}
                  onBack={handleBack}
                  onSubmitBooking={(booking) => {
                    onAddBooking(booking);
                    handleNavigate('/favorites');
                  }}
                  showInspector={showInspector}
                />
              )}

              {parsed.screen === 'favorites' && (
                <FavoritesScreen
                  destinations={destinations}
                  favoriteIds={favoriteIds}
                  bookings={bookings}
                  onNavigate={handleNavigate}
                  onToggleFavorite={onToggleFavorite}
                  onCancelBooking={onCancelBooking}
                  showInspector={showInspector}
                />
              )}

              {parsed.screen === 'settings' && (
                <SettingsScreen
                  themeMode={themeMode}
                  onThemeChange={onThemeChange}
                  deviceMode={deviceMode}
                  onDeviceChange={onDeviceChange}
                  showInspector={showInspector}
                  onToggleInspector={onToggleInspector}
                  showDebugBanner={showDebugBanner}
                  onToggleDebugBanner={onToggleDebugBanner}
                  onResetData={onResetData}
                  onOpenCodeExplorer={() => onOpenCodeExplorer()}
                  onOpenRubric={onOpenRubric}
                  onOpenDelivery={onOpenDelivery}
                />
              )}
            </main>
          </div>

          {/* Mobile Bottom Navigation Bar (Material 3 NavigationBar) */}
          {deviceMode !== 'tablet' && (
            <WidgetBadge name="NavigationBar (Bottom)" enabled={showInspector}>
              <div className="sticky bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-around py-2 px-3">
                <button
                  type="button"
                  onClick={() => handleNavigate('/')}
                  className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all cursor-pointer ${
                    getNavIndex() === 0
                      ? 'text-teal-700 dark:text-teal-400 font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <div
                    className={`px-3 py-0.5 rounded-full transition-all ${
                      getNavIndex() === 0
                        ? 'bg-teal-100 dark:bg-teal-950/80'
                        : 'bg-transparent'
                    }`}
                  >
                    <Compass size={18} />
                  </div>
                  <span className="text-[10px]">Explorer</span>
                </button>

                {/* Extended FAB: Book expedition */}
                <button
                  type="button"
                  onClick={() => handleNavigate('/booking')}
                  className="flex items-center gap-1.5 px-3.5 py-2 -mt-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-lg shadow-teal-600/30 transition-transform active:scale-95 cursor-pointer"
                  title="Réserver une expédition (Formulaire)"
                >
                  <PlusCircle size={16} />
                  <span>Réserver</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate('/favorites')}
                  className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all cursor-pointer ${
                    getNavIndex() === 1
                      ? 'text-teal-700 dark:text-teal-400 font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <div
                    className={`px-3 py-0.5 rounded-full transition-all ${
                      getNavIndex() === 1
                        ? 'bg-teal-100 dark:bg-teal-950/80'
                        : 'bg-transparent'
                    }`}
                  >
                    <Heart size={18} />
                  </div>
                  <span className="text-[10px]">Favoris</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleNavigate('/settings')}
                  className={`flex flex-col items-center gap-1 py-1 px-4 rounded-xl transition-all cursor-pointer ${
                    getNavIndex() === 2
                      ? 'text-teal-700 dark:text-teal-400 font-bold'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <div
                    className={`px-3 py-0.5 rounded-full transition-all ${
                      getNavIndex() === 2
                        ? 'bg-teal-100 dark:bg-teal-950/80'
                        : 'bg-transparent'
                    }`}
                  >
                    <SettingsIcon size={18} />
                  </div>
                  <span className="text-[10px]">Réglages</span>
                </button>
              </div>
            </WidgetBadge>
          )}

          {/* iPhone home indicator bar */}
          {deviceMode === 'mobile' && (
            <div className="w-full pb-1 pt-0.5 bg-white dark:bg-slate-900 flex justify-center">
              <div className="w-32 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
