import type { ReactNode } from "react";

import { Typography } from "@/components/typography";

// Shown when a data view has loaded but has nothing to show: a short message
// and, where useful, the action that fills it.
export function EmptyState({
  title,
  description,
  icon,
  action,
}: {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="border-border flex flex-col items-center justify-center gap-3 rounded-md border border-dashed px-6 py-12 text-center">
      {icon ? <div className="text-muted-foreground">{icon}</div> : null}
      <div className="space-y-1">
        <Typography variant="h4">{title}</Typography>
        {description ? (
          <Typography variant="body-sm" className="text-muted-foreground">
            {description}
          </Typography>
        ) : null}
      </div>
      {action ? <div className="pt-1">{action}</div> : null}
    </div>
  );
}
