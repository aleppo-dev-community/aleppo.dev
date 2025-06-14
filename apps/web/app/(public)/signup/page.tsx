import { SignUpButton } from "@/components/auth/sign-up-button";

export default function SignUpPage() {
  return (
    <div className="container max-w-md mx-auto py-20">
      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">إنشاء حساب جديد</h1>
          <p className="text-muted-foreground">
            اختر طريقة التسجيل المفضلة لديك
          </p>
        </div>
        <div className="space-y-4">
          <SignUpButton />
        </div>
      </div>
    </div>
  );
} 