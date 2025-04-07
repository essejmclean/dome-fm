/**
 * 1-line list item with avatar or thumbnail.
 */

import React from "react";

export type ListItemProps = {
  slot?: React.ReactNode;
  overline?: string;
  title: string;
  subtitle?: string;
};

export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ slot, overline, title, subtitle }, ref) => {
    return (
      <div ref={ref} className="flex items-center h-18 space-x-4 pl-4 pr-6">
        {slot && <div className="w-10 h-10 shrink-0">{slot}</div>}
        <div className="overflow-hidden">
          {overline && (
            <div className="text-label-sm text-on-surface-variant truncate">
              {overline}
            </div>
          )}
          <div className="text-body-lg text-on-surface truncate">{title}</div>
          {subtitle && (
            <div className="text-body-md text-on-surface-variant truncate">
              {subtitle}
            </div>
          )}
        </div>
      </div>
    );
  }
);
ListItem.displayName = "ListItem";
