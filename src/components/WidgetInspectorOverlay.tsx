import React from 'react';

interface WidgetBadgeProps {
  name: string;
  children: React.ReactNode;
  enabled?: boolean;
}

export const WidgetBadge: React.FC<WidgetBadgeProps> = ({ name, children, enabled }) => {
  if (!enabled) return <>{children}</>;

  return (
    <div className="relative group/widget outline outline-1 outline-blue-400/60 dark:outline-blue-500/50 m-0.5 rounded transition-all">
      <span className="absolute -top-2.5 left-2 px-1.5 py-0.2 bg-blue-600 text-white text-[9px] font-mono rounded shadow-sm z-30 opacity-75 group-hover/widget:opacity-100 pointer-events-none">
        {name}
      </span>
      {children}
    </div>
  );
};
