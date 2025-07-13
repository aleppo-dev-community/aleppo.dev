"use client";

import { authClient } from "@/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export function SocialAuthButton() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const googleAuth = useMutation({
    mutationFn: async () => {
      const callbackURL = redirect || "/";
      return authClient.signIn.social({
        provider: "google",
        callbackURL,
      });
    },
    onError: ({ error }) => {
      toast.error(error.message);
    },
  });

  return (
    <Button
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
      onClick={() => googleAuth.mutate()}
      disabled={googleAuth.isPending}
      isLoading={googleAuth.isPending}
    >
      <Image src="/google.svg" alt="Google" width={20} height={20} className="h-5 w-5" />
      <span>التسجيل باستخدام Google</span>
    </Button>
  );
}
