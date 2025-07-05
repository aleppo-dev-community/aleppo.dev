// apps/web/app/(public)/complete-profile/page.tsx
'use client';

import { useEffect } from 'react';
import { authClient } from '@/lib/auth-client';
import { ProfileForm } from '@/components/auth/profile-form';
import { useRouter } from 'next/navigation';

export default function CompleteProfilePage() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await authClient.getSession();
      if (!session) {
        router.push('/login');
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="container max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold text-center mb-8">أكمل ملفك الشخصي</h1>
      <ProfileForm />
    </div>
  );
}