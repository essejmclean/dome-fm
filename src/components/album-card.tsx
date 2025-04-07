import { Image } from "@unpic/react";
import { format } from "date-fns";
import React from "react";

import { Text } from "@/components/text";

export type AlbumCardProps = {
  title: string;
  date: Date;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
};

export const AlbumCard = React.forwardRef<HTMLDivElement, AlbumCardProps>(
  ({ title, date, image }, ref) => {
    const formattedDate = format(date, "yyyy");

    return (
      <div ref={ref}>
        <div className="aspect-square">
          <Image
            className="w-full h-full"
            src={image.src}
            alt={image.alt}
            layout="constrained"
            width={352}
            height={352}
          />
        </div>
        <div className="p-2">
          <Text as="span" size="label-sm" color="variant" className="truncate">
            <time>{formattedDate}</time>
          </Text>
          <Text as="h3" size="title-sm" className="truncate">
            {title}
          </Text>
        </div>
      </div>
    );
  }
);
AlbumCard.displayName = "AlbumCard";
