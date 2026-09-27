import React, { useState } from 'react';
import JSZip from 'jszip';
import {
  FileCode,
  Copy,
  Check,
  Download,
  FolderTree,
  FileText,
  Search,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { FLUTTER_SOURCE_FILES, FlutterFile } from '../data/flutterSourceCode';

interface CodeExplorerProps {
  initialFilePath?: string;
  onClose?: () => void;
}

export const CodeExplorer: React.FC<CodeExplorerProps> = ({
  initialFilePath = 'lib/router/app_router.dart',
  onClose,
}) => {
  const [selectedPath, setSelectedPath] = useState<string>(initialFilePath);
  const [copied, setCopied] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isZipping, setIsZipping] = useState(false);

  const selectedFile =
    FLUTTER_SOURCE_FILES.find((f) => f.path === selectedPath) || FLUTTER_SOURCE_FILES[0];

  const filteredFiles = FLUTTER_SOURCE_FILES.filter((file) => {
    const matchesCategory =
      categoryFilter === 'all' || file.category === categoryFilter;
    const matchesSearch =
      !searchFilter ||
      file.path.toLowerCase().includes(searchFilter.toLowerCase()) ||
      file.description.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopy = () => {
    if (!selectedFile) return;
    navigator.clipboard.writeText(selectedFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadSingle = () => {
    if (!selectedFile) return;
    const blob = new Blob([selectedFile.code], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedFile.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();

      FLUTTER_SOURCE_FILES.forEach((file) => {
        zip.file(file.path, file.code);
      });

      // Also add sample assets placeholder note
      zip.file(
        'assets/images/README.txt',
        'Placez vos images d’arrière-plan et d’expéditions dans ce dossier si vous préférez des assets locaux.'
      );

      const content = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'nomade_flutter_project.zip';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to generate zip', err);
    } finally {
      setIsZipping(false);
    }
  };

  const categories = [
    { id: 'all', label: 'Tous' },
    { id: 'router', label: 'GoRouter' },
    { id: 'screens', label: 'Écrans (5)' },
    { id: 'widgets', label: 'Widgets (4)' },
    { id: 'models', label: 'Modèles' },
    { id: 'data', label: 'Données' },
    { id: 'theme', label: 'Thème' },
    { id: 'docs', label: 'README' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 rounded-2xl overflow-hidden border border-slate-800 shadow-xl">
      {/* Top Header */}
      <div className="px-4 py-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderTree size={18} className="text-teal-400" />
          <span className="font-bold text-sm text-slate-100">
            Explorateur du Code Source Flutter
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-teal-900/60 text-teal-300 font-mono">
            {FLUTTER_SOURCE_FILES.length} fichiers prêts
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 active:scale-95 text-white text-xs font-semibold transition-all shadow-sm cursor-pointer disabled:opacity-50"
            title="Télécharger tout le projet Flutter dans une archive zip"
          >
            <Download size={13} />
            <span>{isZipping ? 'Création du zip...' : 'Télécharger .ZIP complet'}</span>
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-xs px-2.5 py-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              Fermer
            </button>
          )}
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar: File List */}
        <div className="w-64 border-r border-slate-800 bg-slate-950/70 flex flex-col shrink-0">
          {/* Category Tabs */}
          <div className="p-2 border-b border-slate-800/80 flex items-center gap-1 overflow-x-auto no-scrollbar">
            {categories.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategoryFilter(c.id)}
                className={`px-2 py-1 rounded text-[11px] font-medium whitespace-nowrap cursor-pointer transition-colors ${
                  categoryFilter === c.id
                    ? 'bg-teal-600 text-white'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Search bar inside sidebar */}
          <div className="p-2 border-b border-slate-800/60">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-2 text-slate-500" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Filtrer un fichier..."
                className="w-full pl-7 pr-2 py-1 text-[11px] bg-slate-900 border border-slate-800 rounded text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-teal-500"
              />
            </div>
          </div>

          {/* File item list */}
          <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
            {filteredFiles.map((file) => {
              const isSelected = file.path === selectedPath;
              return (
                <button
                  key={file.path}
                  type="button"
                  onClick={() => setSelectedPath(file.path)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-xs transition-colors cursor-pointer group ${
                    isSelected
                      ? 'bg-teal-600/20 text-teal-300 font-semibold border border-teal-500/30'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {file.language === 'markdown' ? (
                      <FileText size={13} className="text-amber-400 shrink-0" />
                    ) : (
                      <FileCode size={13} className={isSelected ? 'text-teal-400' : 'text-slate-400'} />
                    )}
                    <span className="truncate">{file.name}</span>
                  </div>
                  <ChevronRight
                    size={12}
                    className={`shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ${
                      isSelected ? 'opacity-100 text-teal-400' : 'text-slate-500'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Code Content Viewer */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-900">
          {/* File Header Bar */}
          <div className="px-4 py-2.5 bg-slate-950/40 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              <span className="font-mono text-xs text-teal-400 font-semibold truncate">
                {selectedFile.path}
              </span>
              <span className="text-[11px] text-slate-400 hidden sm:inline truncate">
                — {selectedFile.description}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors cursor-pointer"
                title="Copier le code"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400">Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copier</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleDownloadSingle}
                className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Télécharger ce fichier"
              >
                <Download size={13} />
              </button>
            </div>
          </div>

          {/* Syntax Code Container */}
          <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-300 bg-slate-950/90 leading-relaxed select-text">
            <pre className="overflow-x-auto">
              <code>
                {selectedFile.code.split('\n').map((line, idx) => (
                  <div key={idx} className="table-row">
                    <span className="table-cell pr-4 text-right select-none text-slate-600 text-[11px]">
                      {idx + 1}
                    </span>
                    <span className="table-cell whitespace-pre">{line}</span>
                  </div>
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
