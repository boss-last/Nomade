import React from 'react';
import { Search, X } from 'lucide-react';
import { WidgetBadge } from '../WidgetInspectorOverlay';

interface CustomSearchBarProps {
  value: string;
  onChange: (val: string) => void;
  onClear: () => void;
  placeholder?: string;
  showInspector?: boolean;
}

export const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  value,
  onChange,
  onClear,
  placeholder = 'Rechercher une destination, pays...',
  showInspector = false,
}) => {
  return (
    <WidgetBadge name="TextField / Container" enabled={showInspector}>
      <div className="relative flex items-center w-full">
        <Search
          size={18}
          className="absolute left-3.5 text-slate-400 dark:text-slate-500 pointer-events-none"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2.5 bg-slate-100 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-700/80 rounded-2xl text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500 transition-all shadow-inner/10"
        />
        {value.length > 0 && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700 transition-colors"
            title="Effacer"
          >
            <X size={14} />
          </button>
        )}
      </div>
    </WidgetBadge>
  );
};
