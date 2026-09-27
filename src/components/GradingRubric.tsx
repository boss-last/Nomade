import React from 'react';
import {
  CheckCircle2,
  Award,
  Layers,
  ArrowRight,
  ExternalLink,
  Code,
  Smartphone,
  Search,
  Eye,
  FileCheck,
} from 'lucide-react';

interface GradingRubricProps {
  onNavigateToScreen: (route: string) => void;
  onOpenCodeFile: (path: string) => void;
  onClose?: () => void;
}

interface Criterion {
  id: string;
  title: string;
  points: number;
  maxPoints: number;
  description: string;
  evidence: string;
  codePath: string;
  screenRoute?: string;
  widgetsUsed?: string[];
}

export const GradingRubric: React.FC<GradingRubricProps> = ({
  onNavigateToScreen,
  onOpenCodeFile,
  onClose,
}) => {
  const criteria: Criterion[] = [
    {
      id: 'screens',
      title: 'Au moins 4 écrans distincts',
      points: 20,
      maxPoints: 20,
      description: 'L’application propose 5 écrans complets interconnectés.',
      evidence: 'HomeScreen (/), DetailScreen (/destination/:id), BookingScreen (/booking), FavoritesScreen (/favorites), SettingsScreen (/settings).',
      codePath: 'lib/screens/home_screen.dart',
      screenRoute: '/',
    },
    {
      id: 'gorouter',
      title: 'Navigation GoRouter & routes nommées',
      points: 20,
      maxPoints: 20,
      description: 'Navigation 2.0 avec ShellRoute adaptatif, routes nommées et passage de paramètres dynamiques.',
      evidence: 'Déclaré dans lib/router/app_router.dart avec support de context.go() et context.push().',
      codePath: 'lib/router/app_router.dart',
      screenRoute: '/destination/mont-blanc?from=rubric',
    },
    {
      id: 'search-filter',
      title: 'Écran de liste avec recherche et filtrage',
      points: 15,
      maxPoints: 15,
      description: 'Recherche textuelle temps réel (titre/pays) et puces de catégories thématiques (Montagne, Aventure, Culture...).',
      evidence: 'Filtre dynamique avec CustomSearchBar et CategoryChip, plus bascule ListView / GridView.',
      codePath: 'lib/screens/home_screen.dart',
      screenRoute: '/',
    },
    {
      id: 'detail-params',
      title: 'Écran de détail avec passage de paramètres',
      points: 15,
      maxPoints: 15,
      description: 'Réception du paramètre :id dans l’URL et du paramètre de requête ?from= pour charger la destination.',
      evidence: 'SliverAppBar, TabBar avec 4 onglets, galerie d’images et bouton CTA qui transmet les données au formulaire.',
      codePath: 'lib/screens/detail_screen.dart',
      screenRoute: '/destination/mont-blanc',
    },
    {
      id: 'form-validation',
      title: 'Formulaire avec validation (≥ 3 champs)',
      points: 15,
      maxPoints: 15,
      description: 'Validation avec GlobalKey<FormState> sur 4 champs obligatoires avec expressions régulières et contraintes.',
      evidence: 'Champs validés : Nom (≥3 caractères), Email (regex RFC), Téléphone (numérique international), Date de départ.',
      codePath: 'lib/screens/booking_screen.dart',
      screenRoute: '/booking',
    },
    {
      id: 'theme',
      title: 'Gestion du thème clair / sombre',
      points: 5,
      maxPoints: 5,
      description: 'Prise en charge native de ThemeData.light() et ThemeData.dark() avec Material 3 et ChangeNotifier.',
      evidence: 'Bascule instantanée dans les réglages et persistance du mode clair/sombre.',
      codePath: 'lib/theme/app_theme.dart',
      screenRoute: '/settings',
    },
    {
      id: 'widgets-variety',
      title: 'Utilisation d’au moins 8 widgets distincts',
      points: 5,
      maxPoints: 5,
      description: 'Utilisation extensive de plus de 14 widgets Flutter standards.',
      evidence: 'ListView, GridView, Stack, Card, Form, TextFormField, ChoiceChip, SliverAppBar, Hero, TabBar, TabBarView, InkWell, NavigationBar, NavigationRail.',
      codePath: 'lib/widgets/destination_card.dart',
      widgetsUsed: [
        'ListView',
        'GridView',
        'Stack',
        'Card',
        'Form',
        'TextFormField',
        'ChoiceChip',
        'SliverAppBar',
        'TabBar',
        'InkWell',
      ],
    },
    {
      id: 'reusable-widgets',
      title: 'Au moins 3 widgets réutilisables dans widgets/',
      points: 5,
      maxPoints: 5,
      description: 'Création de 4 widgets réutilisables modulaires avec paramètres personnalisés.',
      evidence: '1. DestinationCard (Stack, Card), 2. CategoryChip, 3. CustomSearchBar, 4. RatingStars.',
      codePath: 'lib/widgets/destination_card.dart',
    },
    {
      id: 'responsive',
      title: 'Responsive : mobile et tablette',
      points: 5,
      maxPoints: 5,
      description: 'Adaptation selon la largeur d’écran : BottomNavigationBar sur mobile, NavigationRail sur tablette, GridView 2/3 colonnes.',
      evidence: 'Layout adaptatif vérifiable via le sélecteur d’appareil (Mobile 390px / Tablette 768px).',
      codePath: 'lib/router/app_router.dart',
    },
    {
      id: 'no-hardcoded',
      title: 'Séparation UI / Données',
      points: 5,
      maxPoints: 5,
      description: 'Aucune donnée en dur dans les widgets d’interface ; utilisation de modèles typés et d’un repository centralisé.',
      evidence: 'Modèles Destination & Booking dans lib/models/ et données mockées dans lib/data/mock_destinations.dart.',
      codePath: 'lib/data/mock_destinations.dart',
    },
    {
      id: 'delivery-repo',
      title: 'Livraison : repo GitHub public avec README, captures d’écran et lancement',
      points: 10,
      maxPoints: 10,
      description: 'Dépôt complet prêt à publier avec README détaillé, captures des 5 écrans et script de lancement.',
      evidence: 'README.md avec badge de statut, captures d’écran d’expéditions, guide git init et export ZIP complet.',
      codePath: 'README.md',
    },
  ];

  const totalPoints = criteria.reduce((sum, c) => sum + c.points, 0);
  const maxPossible = criteria.reduce((sum, c) => sum + c.maxPoints, 0);

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      {/* Header */}
      <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
            <Award size={20} />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-100">
              Barème & Conformité du Projet Flutter
            </h2>
            <p className="text-[11px] text-teal-400 font-medium">
              Vérification des exigences du sujet académique
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1 bg-emerald-950/80 border border-emerald-500/40 rounded-xl text-right">
            <span className="text-[10px] text-emerald-400 block font-semibold uppercase">
              Note Finale
            </span>
            <span className="text-base font-extrabold text-emerald-300 tabular-nums">
              {totalPoints} / {maxPossible} pts
            </span>
          </div>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-xs px-2.5 py-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            >
              Fermer
            </button>
          )}
        </div>
      </div>

      {/* Criteria List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {criteria.map((item, idx) => (
          <div
            key={item.id}
            className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col gap-2"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-xs font-bold text-slate-200">
                    {idx + 1}. {item.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>

              <span className="px-2 py-0.5 rounded-full bg-emerald-900/40 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold tabular-nums shrink-0">
                +{item.points} pts
              </span>
            </div>

            <div className="pl-6 text-[11px] bg-slate-900/80 p-2.5 rounded-lg border border-slate-800/60">
              <span className="text-slate-500 font-semibold block mb-0.5">Mise en œuvre :</span>
              <p className="text-slate-300">{item.evidence}</p>

              {item.widgetsUsed && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {item.widgetsUsed.map((w) => (
                    <span
                      key={w}
                      className="px-1.5 py-0.2 rounded bg-slate-800 text-teal-300 font-mono text-[10px]"
                    >
                      {w}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="pl-6 flex items-center gap-3 pt-1 text-[11px]">
              {item.screenRoute && (
                <button
                  type="button"
                  onClick={() => onNavigateToScreen(item.screenRoute!)}
                  className="flex items-center gap-1 text-teal-400 hover:text-teal-300 font-semibold cursor-pointer"
                >
                  <Eye size={12} />
                  <span>Tester dans l'émulateur</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => onOpenCodeFile(item.codePath)}
                className="flex items-center gap-1 text-slate-400 hover:text-slate-200 font-mono text-[10px] cursor-pointer"
              >
                <Code size={11} />
                <span>Voir {item.codePath}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
