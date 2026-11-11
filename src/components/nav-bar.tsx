import Link from "next/link";
import type { ReactNode } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Typography } from "@/components/typography";

// The app shell navigation bar:
// (Left): Brand
// (Right): Theme - TODO: more to come, e.g. sign out, etc.
export function NavBar({ children }: { children?: ReactNode }) {
  return (
    <header className="border-border bg-background sticky top-0 z-40 border-b">
      <div className="flex h-14 items-center justify-between gap-4 px-4 md:px-6">
        <Link href="/" className="flex items-baseline gap-2">
          <Typography as="span" variant="h4" className="text-primary">
            Badminton NZ
          </Typography>
          <Typography
            as="span"
            variant="label"
            className="text-muted-foreground"
          >
            Team Events
          </Typography>
        </Link>
        <div className="flex items-center gap-2">
          {children}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
