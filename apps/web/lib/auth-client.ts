import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  social: {
    google: {
      callbackPath: '/api/auth/google/callback', // Must match your Google Cloud Console URI
    }
  },
});

export type Session = typeof authClient.$Infer.Session;