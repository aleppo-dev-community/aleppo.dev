"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { ChevronDown } from "lucide-react";
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
      <button
        className="sm:hidden flex flex-col justify-center items-center w-10 h-10 z-40"
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
        className={`flex-col sm:flex-row flex gap-8 sm:gap-10 text-lg font-medium fixed sm:static inset-0 w-full sm:w-auto h-screen sm:h-auto bg-background sm:bg-transparent pt-24 sm:pt-0 px-8 sm:px-0 transition-all duration-300 z-30 ${open ? "flex" : "hidden sm:flex"}`}
      >
        <li className="sm:hidden">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" width={40} height={40} />
          </Link>
        </li>
        <li className="sm:hidden">
          <Link href="/" onClick={() => setOpen(false)}>
            الرئيسية
          </Link>
        </li>
        <li>
          <Link href="/events" onClick={() => setOpen(false)}>
            الفعاليات
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
        <li className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="text-lg font-medium inline-flex items-center gap-1 w-full">
                انضم إلينا
                <ChevronDown className="w-4 h-4" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[80vw] md:w-48" align="start">
              <DropdownMenuItem asChild onClick={() => setOpen(false)}>
                <Link href="/participate/attend">شاركنا في الفعاليات</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild onClick={() => setOpen(false)}>
                <Link href="/participate/volunteer">انضم للفريق التطوعي</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild onClick={() => setOpen(false)}>
                <Link href="/participate/give-a-talk">ألق كلمة</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild onClick={() => setOpen(false)}>
                <Link href="/participate/sponsor-a-meetup">ارع لقاء</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
      <div className="flex-1 hidden sm:block" />
    </nav>
  );
}
