import type { ReactNode } from "react";

import { Typography } from "@/components/typography";

// The single page title block: one h1, an optional description, and an actions
// slot; one per page.
export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <Typography variant="h1">{title}</Typography>
        {description ? (
          <Typography variant="body-sm" className="text-muted-foreground">
            {description}
          </Typography>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </div>
  );
}
