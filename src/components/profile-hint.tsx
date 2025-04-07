import React from "react";

import { Button } from "@/components/button";
import { Text } from "@/components/text";

export type ProfileHintProps = {
  title: string;
  subtitle: string;
};

export const ProfileHint = React.forwardRef<HTMLDivElement, ProfileHintProps>(
  ({ title, subtitle }, ref) => {
    return (
      <div ref={ref} className="flex items-center space-x-4">
        <div className="grow overflow-hidden">
          <Text as="div" size="title-md" className="truncate">
            {title}
          </Text>
          <Text as="div" size="body-md" color="variant" className="truncate">
            {subtitle}
          </Text>
        </div>
        <div className="shrink-0">
          <Button variant="primary">Follow</Button>
        </div>
      </div>
    );
  }
);
ProfileHint.displayName = "ProfileHint";
