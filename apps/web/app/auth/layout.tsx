import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (session.data) {
    redirect("/dashboard");
  }

  return children;
}
