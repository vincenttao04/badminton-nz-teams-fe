"use client";

import {
  CheckCircleIcon,
  CircleDashedIcon,
  FlagIcon,
  LockIcon,
  LockOpenIcon,
  PaperPlaneTiltIcon,
  PencilSimpleIcon,
} from "@phosphor-icons/react";

import { cn } from "@/lib/utils";

// The single source for status styling. Status is always carried by colour
// plus an icon and label, never colour alone. See design.md 5.2 and 10.
type Tone = "teal" | "success" | "warning" | "neutral";

const toneStyles: Record<Tone, string> = {
  teal: "bg-primary/10 text-link",
  success: "bg-success-subtle text-success",
  warning: "bg-warning-subtle text-warning",
  neutral: "bg-muted text-muted-foreground",
};

const statusConfig = {
  open: { label: "Open", tone: "success", Icon: LockOpenIcon },
  closed: { label: "Closed", tone: "neutral", Icon: LockIcon },
  submitted: { label: "Submitted", tone: "teal", Icon: PaperPlaneTiltIcon },
  flagged: { label: "Flagged", tone: "warning", Icon: FlagIcon },
  approved: { label: "Approved", tone: "success", Icon: CheckCircleIcon },
  superseded: { label: "Superseded", tone: "neutral", Icon: CircleDashedIcon },
  draft: { label: "Draft", tone: "neutral", Icon: PencilSimpleIcon },
} as const;

export type Status = keyof typeof statusConfig;

export function StatusBadge({
  status,
  className,
}: {
  status: Status;
  className?: string;
}) {
  const { label, tone, Icon } = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.25 py-1 text-xs font-medium",
        toneStyles[tone],
        className,
      )}
    >
      <Icon aria-hidden className="size-3.5" />
      {label}
    </span>
  );
}
