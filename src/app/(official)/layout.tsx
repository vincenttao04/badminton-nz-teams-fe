import type { ReactNode } from "react";

import { NavBar } from "@/components/nav-bar";

// Teams act on a phone, one action at a time: narrow centred column with room
// for a sticky action bar.
export default function TeamLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NavBar />
      <main className="mx-auto flex w-full max-w-[480px] flex-1 flex-col px-4 py-6">
        {children}
      </main>
    </>
  );
}
