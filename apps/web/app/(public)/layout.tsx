"use client";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { useRequireProfileCompletion } from "@/hooks/use-require-profile-completion";

export default function Layout({ children }: { children: React.ReactNode }) {
  useRequireProfileCompletion();
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
