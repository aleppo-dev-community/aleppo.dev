import { SocialAuthButton } from "@/components/auth/social-auth-button";

export default function LoginPage() {
  return (
    <div className="container max-w-md mx-auto py-20">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">تسجيل الدخول</h1>
          <p className="text-muted-foreground">
            اختر طريقة تسجيل الدخول المفضلة لديك
          </p>
        </div>
        <div className="space-y-4">
          <SocialAuthButton />
        </div>
      </div>
    </div>
  );
}
