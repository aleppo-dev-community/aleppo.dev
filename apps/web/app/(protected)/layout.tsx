import { getSession } from "@/lib/get-session";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session.data) {
    const headersList = await headers();
    const pathname = headersList.get("x-location") || "/dashboard";

    redirect(`/auth?redirect=${encodeURIComponent(pathname)}`);
  }

  return children;
}

export default Layout;
