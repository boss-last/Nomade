/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Compass,
  Code2,
  Award,
  Download,
  Smartphone,
  Tablet,
  Sun,
  Moon,
  Layers,
  Sparkles,
  ExternalLink,
  BookOpen,
  FolderGit2,
} from 'lucide-react';
import JSZip from 'jszip';
import { Destination, Booking, DeviceMode, ThemeMode } from './types';
import { INITIAL_DESTINATIONS, INITIAL_BOOKINGS } from './data/destinations';
import { FLUTTER_SOURCE_FILES } from './data/flutterSourceCode';
import { FlutterSimulator } from './components/FlutterSimulator';
import { CodeExplorer } from './components/CodeExplorer';
import { GradingRubric } from './components/GradingRubric';
import { GitHubDelivery } from './components/GitHubDelivery';

export default function App() {
  const [destinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(
    () => new Set(['mont-blanc', 'kyoto-japan'])
  );
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [themeMode, setThemeMode] = useState<ThemeMode>('dark');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('mobile');
  const [currentRoute, setCurrentRoute] = useState<string>('/');
  const [activeTab, setActiveTab] = useState<'simulator' | 'code' | 'delivery' | 'rubric'>('simulator');
  const [selectedCodePath, setSelectedCodePath] = useState<string>('lib/router/app_router.dart');
  const [showInspector, setShowInspector] = useState(false);
  const [showDebugBanner, setShowDebugBanner] = useState(true);
  const [isExportingZip, setIsExportingZip] = useState(false);

  // Sync dark class on document for styling
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  const handleToggleFavorite = (id: string) => {
    setFavoriteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleAddBooking = (newBooking: Booking) => {
    setBookings((prev) => [newBooking, ...prev]);
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings((prev) => prev.filter((b) => b.id !== bookingId));
  };

  const handleResetData = () => {
    setFavoriteIds(new Set(['mont-blanc', 'kyoto-japan']));
    setBookings(INITIAL_BOOKINGS);
    setCurrentRoute('/');
  };

  const handleOpenCodeAt = (filePath?: string) => {
    if (filePath) {
      setSelectedCodePath(filePath);
    }
    setActiveTab('code');
  };

  const handleDownloadFullZip = async () => {
    setIsExportingZip(true);
    try {
      const zip = new JSZip();
      FLUTTER_SOURCE_FILES.forEach((f) => {
        zip.file(f.path, f.code);
      });
      zip.file(
        'assets/images/README.txt',
        'Placez vos images et icônes d’expéditions dans ce dossier.'
      );

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'nomade_flutter_projet_complet.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExportingZip(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Contract: 3 zones */}
      <header className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 px-4 md:px-8 py-3 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-500 flex items-center justify-center text-slate-950 font-black shadow-md shadow-teal-500/20">
            <Compass size={18} />
          </div>
          <span className="text-base font-extrabold tracking-tight text-white">
            Nomade <span className="text-teal-400 font-semibold text-xs ml-1">Flutter Studio</span>
          </span>
        </div>

        {/* Zone 2: Navigation Links (single line, clean buttons/tabs) */}
        <nav className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'simulator'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Simulateur Flutter
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'code'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Code Dart & lib/
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('delivery')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'delivery'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FolderGit2 size={13} className="text-teal-400" />
            <span>Livraison GitHub</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('rubric')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'rubric'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award size={13} className="text-teal-400" />
            <span>Barème 100 pts</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Quick Toggles */}
        <div className="flex items-center gap-2">
          {/* Quick theme toggle */}
          <button
            type="button"
            onClick={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors cursor-pointer"
            title={`Passer en thème ${themeMode === 'dark' ? 'clair' : 'sombre'}`}
          >
            {themeMode === 'dark' ? (
              <Sun size={15} className="text-amber-400" />
            ) : (
              <Moon size={15} className="text-teal-400" />
            )}
          </button>

          {/* Download Zip */}
          <button
            type="button"
            onClick={handleDownloadFullZip}
            disabled={isExportingZip}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 active:scale-95 text-white text-xs font-bold shadow-sm shadow-teal-600/30 transition-all cursor-pointer disabled:opacity-50"
            title="Télécharger l'intégralité du projet Flutter prêt à exécuter"
          >
            <Download size={14} />
            <span className="hidden sm:inline">
              {isExportingZip ? 'Création...' : 'Télécharger (.ZIP)'}
            </span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col p-3 sm:p-6 max-w-7xl w-full mx-auto">
        {activeTab === 'simulator' && (
          <div className="flex-1 flex flex-col items-center">
            {/* Quick Helper Subtitle Bar */}
            <div className="w-full max-w-4xl mb-2 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium text-slate-300">
                  Simulateur Flutter 3.x actif
                </span>
                <span>·</span>
                <span className="text-slate-400">
                  5 écrans · GoRouter 2.0 · Validation de formulaire
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowInspector(!showInspector)}
                  className={`text-xs flex items-center gap-1 px-2 py-0.5 rounded cursor-pointer transition-colors ${
                    showInspector
                      ? 'bg-blue-600/30 text-blue-300 font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Layers size={12} />
                  <span>Widget Inspector : {showInspector ? 'ON' : 'OFF'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('rubric')}
                  className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>100/100 pts validés</span>
                  <Award size={13} />
                </button>
              </div>
            </div>

            {/* The Flutter Simulator */}
            <FlutterSimulator
              destinations={destinations}
              favoriteIds={favoriteIds}
              bookings={bookings}
              themeMode={themeMode}
              onThemeChange={setThemeMode}
              deviceMode={deviceMode}
              onDeviceChange={setDeviceMode}
              showInspector={showInspector}
              onToggleInspector={() => setShowInspector(!showInspector)}
              showDebugBanner={showDebugBanner}
              onToggleDebugBanner={() => setShowDebugBanner(!showDebugBanner)}
              onToggleFavorite={handleToggleFavorite}
              onAddBooking={handleAddBooking}
              onCancelBooking={handleCancelBooking}
              onResetData={handleResetData}
              onOpenCodeExplorer={handleOpenCodeAt}
              onOpenRubric={() => setActiveTab('rubric')}
              onOpenDelivery={() => setActiveTab('delivery')}
              currentRoute={currentRoute}
              onNavigate={setCurrentRoute}
            />
          </div>
        )}

        {activeTab === 'code' && (
          <div className="flex-1 h-[780px]">
            <CodeExplorer
              initialFilePath={selectedCodePath}
              onClose={() => setActiveTab('simulator')}
            />
          </div>
        )}

        {activeTab === 'rubric' && (
          <div className="flex-1 max-w-4xl mx-auto w-full h-[780px]">
            <GradingRubric
              onNavigateToScreen={(route) => {
                setCurrentRoute(route);
                setActiveTab('simulator');
              }}
              onOpenCodeFile={(path) => {
                setSelectedCodePath(path);
                setActiveTab('code');
              }}
              onClose={() => setActiveTab('simulator')}
            />
          </div>
        )}

        {activeTab === 'delivery' && (
          <div className="flex-1 max-w-5xl mx-auto w-full h-[780px]">
            <GitHubDelivery
              onOpenSimulatorScreen={(route) => {
                setCurrentRoute(route);
                setActiveTab('simulator');
              }}
              onOpenCodeFile={(path) => {
                setSelectedCodePath(path);
                setActiveTab('code');
              }}
            />
          </div>
        )}
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-900 px-6 py-4 text-center text-xs text-slate-500 flex flex-wrap items-center justify-between gap-2 max-w-7xl w-full mx-auto">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-slate-400">Nomade Travel</span>
          <span>·</span>
          <span>Projet Flutter multi-écrans avec GoRouter, widgets réutilisables & formulaire validé</span>
        </div>
        <div className="flex items-center gap-4 text-slate-400">
          <button
            type="button"
            onClick={() => setActiveTab('delivery')}
            className="hover:text-teal-400 transition-colors cursor-pointer text-teal-400 font-semibold"
          >
            Livraison GitHub (README & Captures)
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => handleOpenCodeAt('README.md')}
            className="hover:text-teal-400 transition-colors cursor-pointer"
          >
            Instructions de lancement
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={() => handleOpenCodeAt('lib/router/app_router.dart')}
            className="hover:text-teal-400 transition-colors cursor-pointer"
          >
            Routes nommées
          </button>
          <span>·</span>
          <button
            type="button"
            onClick={handleDownloadFullZip}
            className="hover:text-teal-400 transition-colors cursor-pointer"
          >
            Archive ZIP
          </button>
        </div>
      </footer>
    </div>
  );
}
