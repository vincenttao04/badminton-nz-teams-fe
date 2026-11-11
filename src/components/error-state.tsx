"use client";

import { WarningCircleIcon } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import { Typography } from "@/components/typography";

// Shown when a data view fails to load: a plain message and a retry. The
// caller passing onRetry is a client component.
export function ErrorState({
  title = "Something went wrong",
  message = "We could not load this. Please try again.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="border-danger/30 bg-danger-subtle flex flex-col items-center justify-center gap-3 rounded-md border px-6 py-12 text-center">
      <WarningCircleIcon aria-hidden className="text-danger size-6" />
      <div className="space-y-1">
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body-sm" className="text-muted-foreground">
          {message}
        </Typography>
      </div>
      {onRetry ? (
        <Button variant="outline" size="sm" onClick={onRetry} className="mt-1">
          Try again
        </Button>
      ) : null}
    </div>
  );
}
