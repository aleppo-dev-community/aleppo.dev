import { SocialAuthButton } from "@/components/auth/social-auth-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-background p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-xl border-0 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <img src="/logo.svg" alt="logo" className="size-16 mx-auto" />
            <CardTitle className="text-2xl font-bold text-center ">مجتمع مطوري حلب</CardTitle>
            <CardDescription className="text-center">سجل دخولك للوصول إلى حسابك</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <SocialAuthButton />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
