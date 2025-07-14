import { getSession } from "@/lib/get-session";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  const location = (await headers()).get("x-location");
  const searchParams = new URLSearchParams(location?.split("?")[1]);
  if (session.data) {
    redirect(searchParams.get("redirect") ?? "/dashboard");
  }

  return children;
}
