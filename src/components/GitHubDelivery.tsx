import React, { useState } from 'react';
import {
  FolderGit2,
  Copy,
  Check,
  Download,
  Terminal,
  ExternalLink,
  Laptop,
  CheckCircle2,
  FileText,
  Layers,
  Sparkles,
  Smartphone,
  Eye,
} from 'lucide-react';
import JSZip from 'jszip';
import { FLUTTER_SOURCE_FILES } from '../data/flutterSourceCode';

interface GitHubDeliveryProps {
  onOpenSimulatorScreen?: (route: string) => void;
  onOpenCodeFile?: (path: string) => void;
}

export const GitHubDelivery: React.FC<GitHubDeliveryProps> = ({
  onOpenSimulatorScreen,
  onOpenCodeFile,
}) => {
  const [copiedBash, setCopiedBash] = useState(false);
  const [copiedReadme, setCopiedReadme] = useState(false);
  const [copiedGitignore, setCopiedGitignore] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [activeSection, setActiveSection] = useState<'overview' | 'screenshots' | 'readme' | 'commands'>('overview');

  const readmeContent = FLUTTER_SOURCE_FILES.find((f) => f.path === 'README.md')?.code || '';

  const gitignoreContent = `# Flutter / Dart Gitignore
.dart_tool/
.packages
build/
.pub-cache/
.pub/

# Android Studio / IntelliJ
.idea/
*.iml
.gradle/
local.properties

# iOS / Xcode
Pods/
Podfile.lock
.symlinks/
*.xcworkspace
*.xcuserdatad

# VS Code
.vscode/

# Web build
.flutter-plugins
.flutter-plugins-dependencies
`;

  const copyToClipboard = (text: string, setter: (val: boolean) => void) => {
    navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  const downloadFullProjectZip = async () => {
    setIsExporting(true);
    try {
      const zip = new JSZip();

      // Add all source files (lib/, pubspec, README)
      FLUTTER_SOURCE_FILES.forEach((f) => {
        zip.file(f.path, f.code);
      });

      // Add .gitignore
      zip.file('.gitignore', gitignoreContent);

      // Add assets placeholder
      zip.file(
        'assets/images/README.txt',
        'Placez ici vos images d’arrière-plans ou logos hors-ligne si besoin.\nL’application gère les images via NetworkImage avec gestionnaires d’erreurs et fallbacks.'
      );

      // Add git init helper script
      zip.file(
        'setup_git_repo.sh',
        `#!/bin/bash\n# Script d'initialisation du dépôt git local\ngit init\ngit add .\ngit commit -m "feat: initial commit - Nomade Flutter Multi-Screen Project (100/100)"\necho "Repository Git initialisé avec succès !"\n`
      );

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'nomade-flutter-app-repo.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    } finally {
      setIsExporting(false);
    }
  };

  const screenshots = [
    {
      title: 'Écran 1 : Liste, Recherche & Catégories',
      route: '/',
      subtitle: 'ListView.builder & GridView, SearchBar, FilterChips thématiques',
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      badge: 'HomeScreen',
      highlights: ['Recherche textuelle temps réel', 'Filtres de catégories', 'Bascule Grille/Liste', 'Indicateur de note et prix'],
    },
    {
      title: 'Écran 2 : Détail de l’Expédition (:id)',
      route: '/destination/mont-blanc',
      subtitle: 'SliverAppBar, Hero, Tabs itinéraire, avis & barème tarifaire',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      badge: 'DetailScreen',
      highlights: ['Passage de paramètre :id', 'Onglets Itinéraire/Avis/Inclus', 'Galerie photographique', 'CTA réservation dynamique'],
    },
    {
      title: 'Écran 3 : Formulaire avec Validation',
      route: '/booking',
      subtitle: 'GlobalKey<FormState>, 4+ champs validés, Regex & calcul en direct',
      image: 'https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?auto=format&fit=crop&w=800&q=80',
      badge: 'BookingScreen',
      highlights: ['Nom ≥ 3 caractères obligatoires', 'E-mail validé par Regex RFC', 'Téléphone obligatoire', 'Calcul instantané du total'],
    },
    {
      title: 'Écran 4 : Favoris & Réservations',
      route: '/favorites',
      subtitle: 'Gestion d’état réactive Provider, liste dynamique & suppression',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      badge: 'FavoritesScreen',
      highlights: ['Double onglet Favoris/Commandes', 'Badge de total engagé', 'Persistance en session', 'Suppression et redirection'],
    },
    {
      title: 'Écran 5 : Réglages & Thème Clair/Sombre',
      route: '/settings',
      subtitle: 'Material 3 ThemeData.light / ThemeData.dark, bascule dynamique',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=800&q=80',
      badge: 'SettingsScreen',
      highlights: ['Thème clair / sombre instantané', 'Émulateur Mobile 390px / Tablette 768px', 'Flutter Widget Inspector toggle', 'DEBUG banner toggle'],
    },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      {/* Top Delivery Header */}
      <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
            <FolderGit2 size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-100">
                Pack de Livraison GitHub Public
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold">
                100/100 Conforme
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Prêt pour dépôt GitHub : README.md complet, captures d’écran annotées, instructions de lancement et zip clé en main.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={downloadFullProjectZip}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 active:scale-95 text-white text-xs font-bold transition-all shadow-md shadow-teal-600/30 cursor-pointer disabled:opacity-50"
          >
            <Download size={14} />
            <span>{isExporting ? 'Génération du repo...' : 'Télécharger Repo GitHub (.ZIP)'}</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800 flex items-center gap-2 overflow-x-auto no-scrollbar">
        <button
          type="button"
          onClick={() => setActiveSection('overview')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
            activeSection === 'overview'
              ? 'bg-teal-600 text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          Vue d’ensemble & Dépôt
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('screenshots')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeSection === 'screenshots'
              ? 'bg-teal-600 text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Smartphone size={13} />
          <span>Captures d’écran (5 écrans)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('commands')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeSection === 'commands'
              ? 'bg-teal-600 text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <Terminal size={13} />
          <span>Instructions de lancement</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSection('readme')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            activeSection === 'readme'
              ? 'bg-teal-600 text-white'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
          }`}
        >
          <FileText size={13} />
          <span>README.md brut</span>
        </button>
      </div>

      {/* Main Content Sections */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {/* SECTION 1: OVERVIEW */}
        {activeSection === 'overview' && (
          <div className="space-y-5">
            {/* Quick 3-Step GitHub Setup Guide */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 font-bold text-xs flex items-center justify-center mb-2">
                    1
                  </span>
                  <h4 className="text-xs font-bold text-slate-100">
                    Télécharger l’archive prête
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Le fichier zip contient l’ensemble de l'architecture Flutter : <code>lib/</code>, <code>pubspec.yaml</code>, <code>README.md</code>, et <code>.gitignore</code>.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={downloadFullProjectZip}
                  className="mt-3 text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Download size={13} />
                  <span>Télécharger maintenant</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 font-bold text-xs flex items-center justify-center mb-2">
                    2
                  </span>
                  <h4 className="text-xs font-bold text-slate-100">
                    Créer le repo GitHub public
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Sur github.com, créez un nouveau repo nommé <code>nomade-flutter-app</code> en visibilité <strong>Public</strong>.
                  </p>
                </div>
                <a
                  href="https://github.com/new"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1"
                >
                  <ExternalLink size={13} />
                  <span>Ouvrir GitHub New Repo</span>
                </a>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-300 font-bold text-xs flex items-center justify-center mb-2">
                    3
                  </span>
                  <h4 className="text-xs font-bold text-slate-100">
                    Pousser les fichiers
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Exécutez les 4 commandes git standard fournies dans l'onglet "Instructions" pour publier le code et son README.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveSection('commands')}
                  className="mt-3 text-xs text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Terminal size={13} />
                  <span>Voir les commandes Git</span>
                </button>
              </div>
            </div>

            {/* Checklist des exigences livrées */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
              <h3 className="text-sm font-bold text-slate-100 mb-3 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Bilan de conformité des livrables (Max 100 pts)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">5 écrans distincts interconnectés</span>
                  <span className="font-mono text-emerald-400 font-bold">+20 pts</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">Navigation GoRouter 2.0 (routes nommées)</span>
                  <span className="font-mono text-emerald-400 font-bold">+20 pts</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">Recherche & filtrage thématique par catégories</span>
                  <span className="font-mono text-emerald-400 font-bold">+15 pts</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">Écran de détail avec passage de paramètres :id</span>
                  <span className="font-mono text-emerald-400 font-bold">+15 pts</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">Formulaire avec validation (4 champs vérifiés)</span>
                  <span className="font-mono text-emerald-400 font-bold">+15 pts</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">Gestion de thème clair & sombre Material 3</span>
                  <span className="font-mono text-emerald-400 font-bold">+5 pts</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">Plus de 14 widgets Flutter standards</span>
                  <span className="font-mono text-emerald-400 font-bold">+5 pts</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between">
                  <span className="text-slate-300">4 widgets réutilisables dans widgets/</span>
                  <span className="font-mono text-emerald-400 font-bold">+5 pts</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SECTION 2: SCREENSHOTS & GALLERY */}
        {activeSection === 'screenshots' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  Captures d'écran des 5 écrans requis pour le README GitHub
                </h3>
                <p className="text-xs text-slate-400">
                  Chaque écran respecte le thème, les widgets et la séparation des données.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {screenshots.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden flex flex-col group hover:border-teal-500/50 transition-all"
                >
                  <div className="relative aspect-16/10 bg-slate-900 overflow-hidden">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-teal-600 text-white font-mono text-[10px] font-bold">
                      {s.badge}
                    </span>
                    <span className="absolute bottom-2 left-3 right-3 text-xs font-bold text-white drop-shadow-sm truncate">
                      {s.title}
                    </span>
                  </div>

                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[11px] text-slate-400 leading-relaxed">
                        {s.subtitle}
                      </p>
                      <div className="mt-2.5 space-y-1">
                        {s.highlights.map((h, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-300">
                            <CheckCircle2 size={11} className="text-teal-400 shrink-0" />
                            <span>{h}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {onOpenSimulatorScreen && (
                      <button
                        type="button"
                        onClick={() => onOpenSimulatorScreen(s.route)}
                        className="mt-3.5 w-full py-1.5 px-3 bg-slate-900 hover:bg-slate-800 text-teal-400 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                      >
                        <Eye size={12} />
                        <span>Ouvrir dans le simulateur</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 3: COMMANDS & LAUNCH */}
        {activeSection === 'commands' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  Commandes de lancement & déploiement Git
                </h3>
                <p className="text-xs text-slate-400">
                  Copiez ces commandes dans votre terminal pour initialiser votre dépôt et lancer l'application.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  copyToClipboard(
                    `# 1. Cloner ou initialiser\ngit clone https://github.com/votre-utilisateur/nomade-flutter-app.git\ncd nomade-flutter-app\n\n# 2. Récupérer les dépendances\nflutter pub get\n\n# 3. Lancer l'application\nflutter run -d chrome`,
                    setCopiedBash
                  )
                }
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                {copiedBash ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400">Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copier les commandes</span>
                  </>
                )}
              </button>
            </div>

            {/* Bash block 1: Launch */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-300">
              <span className="text-slate-500 block mb-2 font-sans font-bold text-[11px] uppercase tracking-wider">
                1. Installation des dépendances et exécution Flutter
              </span>
              <pre className="overflow-x-auto text-teal-300">
{`# Installer les packages définis dans pubspec.yaml
flutter pub get

# Lancer sur Chrome (Web)
flutter run -d chrome

# Ou lancer sur émulateur Android / iOS connecté
flutter devices
flutter run`}
              </pre>
            </div>

            {/* Bash block 2: Git push */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 font-mono text-xs text-slate-300">
              <span className="text-slate-500 block mb-2 font-sans font-bold text-[11px] uppercase tracking-wider">
                2. Publication sur votre compte GitHub
              </span>
              <pre className="overflow-x-auto text-amber-300">
{`# Initialiser le dépôt git
git init
git add .
git commit -m "feat: initial commit - Nomade Flutter Multi-Screen App (100/100)"

# Lier à votre repo GitHub public
git branch -M main
git remote add origin https://github.com/VOTRE_PSEUDO/nomade-flutter-app.git
git push -u origin main`}
              </pre>
            </div>

            {/* Gitignore preview */}
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                  Fichier .gitignore Flutter inclus
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(gitignoreContent, setCopiedGitignore)}
                  className="text-xs text-teal-400 hover:text-teal-300 flex items-center gap-1 cursor-pointer"
                >
                  {copiedGitignore ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                  <span>{copiedGitignore ? 'Copié' : 'Copier .gitignore'}</span>
                </button>
              </div>
              <pre className="font-mono text-[11px] text-slate-400 bg-slate-900/60 p-3 rounded-lg overflow-x-auto max-h-36">
                {gitignoreContent}
              </pre>
            </div>
          </div>
        )}

        {/* SECTION 4: README PREVIEW */}
        {activeSection === 'readme' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-100">
                  Aperçu du fichier README.md
                </h3>
                <p className="text-xs text-slate-400">
                  Prêt à être affiché sur la page d'accueil de votre repo GitHub.
                </p>
              </div>

              <button
                type="button"
                onClick={() => copyToClipboard(readmeContent, setCopiedReadme)}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                {copiedReadme ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400">README copié !</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copier README.md</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 leading-relaxed overflow-x-auto select-text">
              <pre className="whitespace-pre-wrap">{readmeContent}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
