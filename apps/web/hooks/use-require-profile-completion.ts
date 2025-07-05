"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export function useRequireProfileCompletion() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const check = async () => {
      try {
        // Fetch profile completion status from your API
        const res = await fetch("/api/profile", { credentials: "include" });
        if (res.status === 401) {
          return;
        }

        const data = await res.json();

        if (!data.profileComplete && pathname !== "/complete-profile") {
          // Profile incomplete, redirect to form
          router.replace("/complete-profile");
          return;
        }
      } catch (error) {
        console.error("Profile completion check failed:", error);
        // Optional: redirect or show an error page
      }
    };

    check();
  }, [router, pathname]);
}
