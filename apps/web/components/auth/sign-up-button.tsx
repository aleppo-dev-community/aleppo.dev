"use client";

import { Button } from "@workspace/ui/components/button";
import { useState } from "react";
import Image from "next/image";

export function SignUpButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignUp = async () => {
    try {
      setIsLoading(true);
      // Redirect to the Google OAuth endpoint
      window.location.href = `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/google/authorize`;
    } catch (error) {
      console.error("Error signing up with Google:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={handleGoogleSignUp}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      ) : (
        <>
          <Image
            src="/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="h-5 w-5"
          />
          <span>تسجيل الدخول باستخدام Google</span>
        </>
      )}
    </Button>
  );
} 