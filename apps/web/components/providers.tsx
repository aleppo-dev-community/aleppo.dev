"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@workspace/ui/components/sonner";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      gcTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      retry: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster />
    </NextThemesProvider>
  );
}
