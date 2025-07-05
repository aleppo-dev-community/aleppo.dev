"use client";

import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { useRequireProfileCompletion } from "@/hooks/use-require-profile-completion";

export default function Layout({ children }: { children: React.ReactNode }) {
  useRequireProfileCompletion();
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  );
}
