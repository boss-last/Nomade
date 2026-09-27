import React from 'react';
import { LucideIcon } from 'lucide-react';
import { WidgetBadge } from '../WidgetInspectorOverlay';

interface CategoryChipProps {
  label: string;
  icon: LucideIcon;
  isSelected: boolean;
  count?: number;
  onSelected: () => void;
  showInspector?: boolean;
}

export const CategoryChip: React.FC<CategoryChipProps> = ({
  label,
  icon: Icon,
  isSelected,
  count,
  onSelected,
  showInspector = false,
}) => {
  return (
    <WidgetBadge name="FilterChip" enabled={showInspector}>
      <button
        type="button"
        onClick={onSelected}
        className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-150 cursor-pointer ${
          isSelected
            ? 'bg-teal-600 text-white shadow-sm shadow-teal-700/20 dark:bg-teal-500'
            : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700'
        }`}
      >
        <Icon size={14} className={isSelected ? 'text-white' : 'text-teal-600 dark:text-teal-400'} />
        <span>{label}</span>
        {count !== undefined && (
          <span
            className={`text-[10px] ml-0.5 px-1.5 py-0.2 rounded-full ${
              isSelected
                ? 'bg-teal-700/80 text-teal-100'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
            }`}
          >
            {count}
          </span>
        )}
      </button>
    </WidgetBadge>
  );
};
