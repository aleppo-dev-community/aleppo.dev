import { ProfileForm } from "@/app/(protected)/dashboard/profile/profile-form";
import { rpc } from "@/lib/rpc";
import { PageProps } from "@/types/next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function CompleteProfilePage({
  searchParams,
}: PageProps<{}, { redirect?: string; mode?: string }>) {
  const profileStatus = await rpc.profile.status.$get(undefined, {
    headers: Object.fromEntries((await headers()).entries()),
  });

  const params = await searchParams;
  if (profileStatus.isProfileComplete && params.mode !== "edit") {
    return redirect(params.redirect ?? "/dashboard");
  }

  const profileData = profileStatus.isProfileComplete ? await rpc.profile.$get(undefined, {
    headers: Object.fromEntries((await headers()).entries()),
  }) : undefined;

  return (
    <div className="container max-w-2xl mx-auto py-10">
      <ProfileForm initialData={profileData || undefined} />
    </div>
  );
}
