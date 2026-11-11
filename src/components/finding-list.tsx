"use client";

import { WarningIcon, WarningOctagonIcon } from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

// The single source for validation-finding styling. A block is red, a flag is
// amber; each finding shows an icon, the message, and how to fix it, never
// colour alone. See design.md 5.2 and 6. Screens map a ValidationResult from
// the API into these views.
export type FindingSeverity = "block" | "flag";

export interface FindingView {
  severity: FindingSeverity;
  message: string;
  howToFix?: string | null;
  location?: string | null;
}

const severityStyles: Record<
  FindingSeverity,
  { wrap: string; icon: string; Icon: typeof WarningIcon; label: string }
> = {
  block: {
    wrap: "border-danger/30 bg-danger-subtle",
    icon: "text-danger",
    Icon: WarningOctagonIcon,
    label: "Must fix",
  },
  flag: {
    wrap: "border-warning/30 bg-warning-subtle",
    icon: "text-warning",
    Icon: WarningIcon,
    label: "Flag",
  },
};

export function FindingItem({
  severity,
  message,
  howToFix,
  location,
}: FindingView) {
  const style = severityStyles[severity];
  const Icon = style.Icon;
  return (
    <li className={cn("flex gap-3 rounded-md border p-3", style.wrap)}>
      <Icon aria-hidden className={cn("mt-0.5 size-4 shrink-0", style.icon)} />
      <div className="space-y-1">
        <p className="text-foreground text-sm font-medium">
          <span className="sr-only">{style.label}: </span>
          {message}
        </p>
        {howToFix ? (
          <p className="text-muted-foreground text-sm">{howToFix}</p>
        ) : null}
        {location ? (
          <p className="text-muted-foreground text-xs">{location}</p>
        ) : null}
      </div>
    </li>
  );
}

export function FindingList({
  findings,
  className,
}: {
  findings: FindingView[];
  className?: string;
}) {
  if (findings.length === 0) return null;
  return (
    <ul className={cn("space-y-2", className)}>
      {findings.map((finding, index) => (
        <FindingItem key={index} {...finding} />
      ))}
    </ul>
  );
}
