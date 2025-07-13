"use client";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
