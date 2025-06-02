"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="w-full flex items-center justify-between border-b border-[#232323] bg-[#050505] px-4 sm:px-10 h-20 relative">
      <Link href="/" className="w-10 h-10 me-4 sm:me-10 ms-2 sm:ms-5">
        <Image src="/logo.svg" alt="Logo" width={40} height={40} />
      </Link>
      <button
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
      </button>
      <ul
        className={`flex-col sm:flex-row flex gap-8 sm:gap-10 text-lg font-medium fixed sm:static top-0 left-0 w-full sm:w-auto h-screen sm:h-auto bg-[#050505] sm:bg-transparent pt-24 sm:pt-0 px-8 sm:px-0 transition-all duration-300 z-10 ${open ? "flex" : "hidden sm:flex"}`}
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
      </ul>
      <div className="flex-1 hidden sm:block" />
    </nav>
  );
}
