import { headers } from "next/headers";
import { authClient } from "./auth-client";

export async function getSession() {
  const session = await authClient.getSession({ fetchOptions: { headers: await headers() } });
  return session;
}
