import React from "react";

import { formatIsoDuration } from "@/lib/duration";

export type TrackListingProps = {
  number: number;
  title: string;
  duration: string;
};

export const TrackListing = React.forwardRef<HTMLDivElement, TrackListingProps>(
  ({ number, title, duration }, ref) => {
    const formattedDuration = formatIsoDuration(duration);

    return (
      <div ref={ref} className="flex items-center h-14 space-x-4 px-4 md:px-6">
        <div className="w-3 h-6 shrink-0 text-body-lg text-on-surface-variant tabular-nums">
          {number}.
        </div>
        <div className="overflow-hidden flex grow">
          <div className="text-body-lg text-on-surface grow truncate">
            {title}
          </div>
          <div className="text-body-lg text-on-surface-variant tabular-nums">
            {formattedDuration}
          </div>
        </div>
      </div>
    );
  }
);
TrackListing.displayName = "TrackListing";
