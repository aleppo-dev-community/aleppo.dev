import { ProfileForm } from "@/app/(protected)/dashboard/profile/profile-form";
import { rpc } from "@/lib/rpc";
import { PageProps } from "@/types/next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CompleteProfilePage({
  searchParams,
}: PageProps<{}, { redirect?: string }>) {
  const profileStatus = await rpc.profile.status.$get(undefined, {
    headers: Object.fromEntries((await headers()).entries()),
  });

  if (profileStatus.isProfileComplete) {
    return redirect((await searchParams).redirect ?? "/dashboard");
  }
  return (
    <div className="container max-w-2xl mx-auto py-10">
      <ProfileForm />
    </div>
  );
}
