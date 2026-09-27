import React from 'react';
import {
  Sun,
  Moon,
  Monitor,
  Code2,
  CheckCircle,
  HelpCircle,
  RotateCcw,
  Smartphone,
  Tablet,
  FolderGit2,
  Layers,
} from 'lucide-react';
import { ThemeMode, DeviceMode } from '../../types';
import { WidgetBadge } from '../WidgetInspectorOverlay';

interface SettingsScreenProps {
  themeMode: ThemeMode;
  onThemeChange: (mode: ThemeMode) => void;
  deviceMode: DeviceMode;
  onDeviceChange: (mode: DeviceMode) => void;
  showInspector: boolean;
  onToggleInspector: () => void;
  showDebugBanner: boolean;
  onToggleDebugBanner: () => void;
  onResetData: () => void;
  onOpenCodeExplorer: () => void;
  onOpenRubric: () => void;
  onOpenDelivery?: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  themeMode,
  onThemeChange,
  deviceMode,
  onDeviceChange,
  showInspector,
  onToggleInspector,
  showDebugBanner,
  onToggleDebugBanner,
  onResetData,
  onOpenCodeExplorer,
  onOpenRubric,
  onOpenDelivery,
}) => {
  return (
    <div className="flex flex-col h-full bg-slate-50 dark:bg-slate-900 overflow-y-auto">
      {/* Flutter AppBar */}
      <WidgetBadge name="AppBar" enabled={showInspector}>
        <header className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 py-3 flex items-center justify-between">
          <h1 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Réglages de l'application
          </h1>
          <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">
            Flutter 3.x
          </span>
        </header>
      </WidgetBadge>

      <div className="p-4 space-y-5 pb-24">
        {/* Section 1: Thème Clair / Sombre */}
        <WidgetBadge name="RadioListTile (Theme)" enabled={showInspector}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4">
            <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-3">
              Gestion du thème (AppTheme)
            </h2>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onThemeChange('light')}
                className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  themeMode === 'light'
                    ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/30 text-teal-800 dark:text-teal-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                <Sun size={16} className={themeMode === 'light' ? 'text-teal-600' : 'text-slate-400'} />
                <span>Mode Clair</span>
              </button>

              <button
                type="button"
                onClick={() => onThemeChange('dark')}
                className={`flex items-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  themeMode === 'dark'
                    ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/30 text-teal-800 dark:text-teal-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                }`}
              >
                <Moon size={16} className={themeMode === 'dark' ? 'text-teal-400' : 'text-slate-400'} />
                <span>Mode Sombre</span>
              </button>
            </div>
          </div>
        </WidgetBadge>

        {/* Section 2: Format d'affichage Responsive */}
        <WidgetBadge name="MediaQuery / Responsive" enabled={showInspector}>
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4">
            <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider mb-1">
              Émulation d'appareil
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-3">
              Testez le comportement adaptatif de la barre de navigation et du GridView.
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onDeviceChange('mobile')}
                className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  deviceMode === 'mobile'
                    ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/30 text-teal-800 dark:text-teal-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Smartphone size={14} />
                <span>Mobile (390px)</span>
              </button>

              <button
                type="button"
                onClick={() => onDeviceChange('tablet')}
                className={`flex items-center justify-center gap-1.5 p-2.5 rounded-xl border text-xs font-semibold transition-all ${
                  deviceMode === 'tablet'
                    ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/30 text-teal-800 dark:text-teal-300'
                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                <Tablet size={14} />
                <span>Tablette (768px)</span>
              </button>
            </div>
          </div>
        </WidgetBadge>

        {/* Section 3: Outils Développeur Flutter */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 p-4 space-y-3">
          <h2 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
            Outils de débogage Flutter
          </h2>

          <div
            onClick={onToggleInspector}
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Layers size={16} className="text-teal-600 dark:text-teal-400" />
              <div>
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 block">
                  Flutter Widget Inspector
                </span>
                <span className="text-[10px] text-slate-500">
                  Afficher les badges des widgets (Stack, Card, Form...)
                </span>
              </div>
            </div>
            <div
              className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${
                showInspector ? 'bg-teal-600' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform absolute top-0.5 ${
                  showInspector ? 'translate-x-4.5' : 'translate-x-0.5'
                }`}
              />
            </div>
          </div>

          <div
            onClick={onToggleDebugBanner}
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Code2 size={16} className="text-teal-600 dark:text-teal-400" />
              <div>
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 block">
                  Bannière "DEBUG" Flutter
                </span>
                <span className="text-[10px] text-slate-500">
                  Ruban rouge officiel en haut à droite
                </span>
              </div>
            </div>
            <div
              className={`w-9 h-5 rounded-full transition-colors relative shrink-0 ${
                showDebugBanner ? 'bg-teal-600' : 'bg-slate-300 dark:bg-slate-600'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform absolute top-0.5 ${
                  showDebugBanner ? 'translate-x-4.5' : 'translate-x-0.5'
                }`}
              />
            </div>
          </div>
        </div>

        {/* Section 4: Liens rapides & Grille */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onOpenCodeExplorer}
            className="p-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <FolderGit2 size={15} />
            <span>Code Source Dart</span>
          </button>

          <button
            type="button"
            onClick={onOpenRubric}
            className="p-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <CheckCircle size={15} className="text-teal-400" />
            <span>Barème 100/100</span>
          </button>
        </div>

        {onOpenDelivery && (
          <button
            type="button"
            onClick={onOpenDelivery}
            className="w-full p-3 bg-slate-900 dark:bg-slate-950 hover:bg-slate-800 text-teal-400 border border-teal-500/40 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs cursor-pointer"
          >
            <FolderGit2 size={16} />
            <span>Pack de Livraison GitHub (README, Captures & ZIP)</span>
          </button>
        )}

        {/* Reset button */}
        <div className="pt-2 text-center">
          <button
            type="button"
            onClick={onResetData}
            className="text-[11px] text-slate-400 hover:text-rose-500 flex items-center justify-center gap-1 mx-auto transition-colors"
          >
            <RotateCcw size={12} />
            <span>Réinitialiser les favoris et réservations de test</span>
          </button>
        </div>
      </div>
    </div>
  );
};
