import type { ReactNode } from "react";

import { NavBar } from "@/components/nav-bar";

// Officials work on a computer with data-dense tables: wide container.
export default function OfficialsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-6 md:px-6 md:py-8">
        {children}
      </main>
    </>
  );
}
