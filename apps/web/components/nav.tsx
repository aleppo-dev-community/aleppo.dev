"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full bg-background flex items-center justify-between border-b border-[#232323] px-4 sm:px-10 h-20 relative">
      <Link href="/" className="w-10 h-10 me-4 sm:me-10 ms-2 sm:ms-5">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
      </Link>
      <Button
        className="sm:hidden flex flex-col justify-center items-center w-10 h-10 z-20"
        onClick={() => setOpen((v) => !v)}
        aria-label="Open menu"
      >
        <span
          className={`block w-6 h-0.5 bg-white transition-all ${open ? "rotate-45 translate-y-1.5" : ""}`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-white my-1 transition-all ${open ? "opacity-0" : ""}`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-white transition-all ${open ? "-rotate-45 -translate-y-1.5" : ""}`}
        ></span>
      </Button>
      <ul
        className={`flex-col sm:flex-row flex gap-8 sm:gap-10 text-lg font-medium fixed sm:static top-0 left-0 w-full sm:w-auto h-screen sm:h-auto sm:bg-transparent pt-24 sm:pt-0 px-8 sm:px-0 transition-all duration-300 z-10 ${open ? "flex" : "hidden sm:flex"}`}
      >
        <li className="sm:hidden">
          <Link href="/" onClick={() => setOpen(false)}>
            الرئيسية
          </Link>
        </li>
        <li>
          <Link href="/events" onClick={() => setOpen(false)}>
            الأحداث
          </Link>
        </li>
        <li>
          <Link href="/learn" onClick={() => setOpen(false)}>
            التعلّم
          </Link>
        </li>
        <li>
          <Link href="/blog" onClick={() => setOpen(false)}>
            المدونة
          </Link>
        </li>
        <li>
          <Link href="/join-us" onClick={() => setOpen(false)}>
            التطوع
          </Link>
        </li>
        <li>
          <Link href="/about" onClick={() => setOpen(false)}>
            من نحن
          </Link>
        </li>
      </ul>
      <div className="flex-1 hidden sm:block" />
      <div className="flex items-center gap-4">
        <AuthSection onLinkClick={() => setOpen(false)} />
      </div>
    </nav>
  );
}

function AuthSection({ onLinkClick }: { onLinkClick: () => void }) {
  const { data: session, isPending: isLoading } = authClient.useSession();

  const handleSignOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            window.location.href = "/";
          },
        },
      });
      onLinkClick();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isLoading) {
    return null;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium">مرحباً، {session.user.name}</span>
        <Button variant="outline" size="sm" onClick={handleSignOut}>
          تسجيل الخروج
        </Button>
      </div>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className="text-sm font-medium hover:text-primary transition-colors"
        onClick={onLinkClick}
      >
        تسجيل الدخول
      </Link>
    </>
  );
}
