"use client";

import type { ReactNode } from "react";

import { EmptyState } from "@/components/empty-state";
import { ErrorState } from "@/components/error-state";
import { FindingList } from "@/components/finding-list";
import { SkeletonText, TableSkeleton } from "@/components/loading-skeleton";
import { PageHeader } from "@/components/page-header";
import { StatusBadge, type Status } from "@/components/status-badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

// Styleguide. Renders every token and component so the system can be checked at
// once in both themes. Not a product route; remove or keep as a dev page.
const statuses: Status[] = [
  "open",
  "closed",
  "submitted",
  "flagged",
  "approved",
  "superseded",
  "draft",
];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4">
      <Typography variant="h2">{title}</Typography>
      {children}
    </section>
  );
}

function Swatch({ name, className }: { name: string; className: string }) {
  return (
    <div className="space-y-1">
      <div className={cn("border-border h-14 rounded-md border", className)} />
      <Typography variant="caption" className="font-mono">
        {name}
      </Typography>
    </div>
  );
}

function Chip({ name, className }: { name: string; className: string }) {
  return (
    <div
      className={cn(
        "flex h-14 items-center justify-center rounded-md text-sm font-medium",
        className,
      )}
    >
      {name}
    </div>
  );
}

export default function FoundationsPage() {
  return (
    <main className="mx-auto w-full max-w-[1000px] space-y-10 px-4 py-8 md:px-6">
      <PageHeader
        title="Foundations"
        description="Every token and component in one place. Toggle the theme to check light and dark."
        actions={<ThemeToggle />}
      />

      <Section title="Surfaces">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          <Swatch name="background" className="bg-background" />
          <Swatch name="card" className="bg-card" />
          <Swatch name="muted" className="bg-muted" />
          <Swatch name="border" className="bg-border" />
          <Swatch name="primary" className="bg-primary" />
        </div>
      </Section>

      <Section title="Fills and text">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Chip name="primary" className="bg-primary text-primary-foreground" />
          <Chip name="danger" className="bg-danger text-danger-foreground" />
          <Chip name="warning" className="bg-warning text-warning-foreground" />
          <Chip name="success" className="bg-success text-success-foreground" />
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <Chip name="primary / link" className="bg-primary/10 text-link" />
          <Chip name="danger-subtle" className="bg-danger-subtle text-danger" />
          <Chip
            name="warning-subtle"
            className="bg-warning-subtle text-warning"
          />
          <Chip
            name="success-subtle"
            className="bg-success-subtle text-success"
          />
        </div>
        <Typography variant="body">
          Links use{" "}
          <span className="text-link font-medium">this teal step</span> and gold
          accents use{" "}
          <span className="text-gold font-medium">this gold step</span>.
        </Typography>
      </Section>

      <Section title="Typography">
        <div className="space-y-2">
          <Typography variant="h1">h1 Heading</Typography>
          <Typography variant="h2">h2 Heading</Typography>
          <Typography variant="h3">h3 Heading</Typography>
          <Typography variant="h4">h4 Heading</Typography>
          <Typography variant="body">
            body: the quick brown fox jumps over the lazy dog.
          </Typography>
          <Typography variant="body-sm">
            body-sm: the quick brown fox jumps over the lazy dog.
          </Typography>
          <Typography variant="label">label: Team name</Typography>
          <Typography variant="caption">
            caption: updated 11 Nov 2026, 2:30 PM
          </Typography>
          <Typography variant="data">data: 1,234.56</Typography>
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="link">Link</Button>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button>Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </Section>

      <Section title="Form controls">
        <div className="max-w-sm space-y-2">
          <Label htmlFor="team">Team name</Label>
          <Input id="team" placeholder="Auckland Badminton" />
        </div>
        <div className="max-w-sm space-y-2">
          <Label htmlFor="team-err">Team name</Label>
          <Input id="team-err" aria-invalid placeholder="Required" />
          <Typography variant="caption" className="text-danger">
            This field is required.
          </Typography>
        </div>
      </Section>

      <Section title="Status badges">
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => (
            <StatusBadge key={status} status={status} />
          ))}
        </div>
      </Section>

      <Section title="Findings">
        <FindingList
          findings={[
            {
              severity: "block",
              message: "Player is not on the Approved Team List.",
              howToFix: "Pick a player from the approved list.",
              location: "Men's Singles",
            },
            {
              severity: "flag",
              message: "The same player appears in two events.",
              howToFix: "Confirm this is intended before submitting.",
              location: "Men's Doubles",
            },
          ]}
        />
      </Section>

      <Section title="States">
        <EmptyState
          title="No lineups yet"
          description="Submitted lineups will appear here."
        />
        <ErrorState onRetry={() => {}} />
        <div className="space-y-6">
          <TableSkeleton />
          <SkeletonText />
        </div>
      </Section>
    </main>
  );
}
