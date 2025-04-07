import { Image } from "@unpic/react";
import React from "react";
import { RiPlayFill } from "react-icons/ri";

export type FeaturedTrackProps = {};

export const FeaturedTrack = React.forwardRef<
  HTMLDivElement,
  FeaturedTrackProps
>(({}, ref) => {
  return (
    <div
      ref={ref}
      className="grid grid-cols-[8rem,auto] grid-rows-[3rem,auto] [grid-template-areas:'a_b'_'a_c']"
    >
      <div className="shrink-0 aspect-square [grid-area:a] bg-primary-container">
        <Image
          className="w-full h-full"
          src="https://cdn.shopify.com/static/sample-images/shoes.jpeg"
          alt="Person in a white dress wearing sneakers on a yellow tiled floor"
          layout="constrained"
          width={128}
          height={128}
        />
      </div>

      <div className="flex items-center gap-1 overflow-hidden bg-inverse-surface py-4 pl-4 pr-3.5 [grid-area:b]">
        <div className="flex grow items-baseline gap-1 overflow-hidden">
          <div className="text-body-sm text-inverse-on-surface truncate">
            <span className="tabular-nums">5.</span> Stellar State One
          </div>
          <div className="text-label-sm text-inverse-on-surface/75 tabular-nums">
            4:56
          </div>
        </div>
        <div>
          <RiPlayFill className="w-5 h-5 text-inverse-on-surface" />
        </div>
      </div>

      <div className="overflow-hidden flex flex-col justify-center bg-surface-variant p-4 [grid-area:c]">
        <div className="text-title-sm text-on-surface truncate">
          Sunset Stories
        </div>
        <div className="text-body-sm text-on-surface-variant truncate">
          <span>10 Tracks</span>
          {", "}
          <span>37 Minutes</span>
        </div>
      </div>
    </div>
  );
});
FeaturedTrack.displayName = "FeaturedTrack";
