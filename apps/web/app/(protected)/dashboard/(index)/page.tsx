"use client";
import { Footer } from "@/components/footer";
import { authClient } from "@/lib/auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Bell, Clock, Home, LogOutIcon, Settings, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const logout = useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: () => {
      queryClient.removeQueries();
      router.replace("/");
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#181818] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#E89548] to-primary flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">مرحباً {session?.user.name}</h1>
              <p className="text-[#AFAFAF] text-sm">مجتمع مطوري حلب</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
                الرئيسية
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout.mutate()}
              isLoading={logout.isPending}
              className="gap-2"
            >
              <LogOutIcon className="w-4 h-4" />
              تسجيل الخروج
            </Button>
          </div>
        </div>

        <div className="text-center mb-12">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-[#E89548] to-primary blur-xl opacity-20 rounded-full"></div>
            <div className="relative w-20 h-20 mx-auto bg-gradient-to-r from-[#E89548] to-primary rounded-full flex items-center justify-center">
              <Clock className="w-10 h-10 text-white" />
            </div>
          </div>

          <h2 className="text-5xl md:text-6xl h-16 font-bold mb-6 bg-gradient-to-r from-[#E89548] to-primary bg-clip-text text-transparent">
            قريباً جداً
          </h2>

          <p className="text-xl md:text-2xl text-[#AFAFAF] mb-8 max-w-2xl mx-auto leading-relaxed">
            نحن نعمل على إطلاق لوحة تحكم مميزة لأعضاء مجتمع مطوري حلب
          </p>

          <div className="w-24 h-1 bg-gradient-to-r from-[#E89548] to-primary rounded-full mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-[#232323] to-[#181818] border-[#333] hover:border-[#E89548]/50 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-[#E89548] to-primary rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">الملف الشخصي</h3>
              <p className="text-[#AFAFAF] text-sm">إدارة بياناتك الشخصية ومعلومات التواصل</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#232323] to-[#181818] border-[#333] hover:border-[#E89548]/50 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-[#E89548] to-primary rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">الإشعارات</h3>
              <p className="text-[#AFAFAF] text-sm">تلقي آخر الأخبار والفعاليات القادمة</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#232323] to-[#181818] border-[#333] hover:border-[#E89548]/50 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-[#E89548] to-primary rounded-lg flex items-center justify-center">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">الإعدادات</h3>
              <p className="text-[#AFAFAF] text-sm">تخصيص تجربتك وتفضيلاتك الشخصية</p>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </div>
  );
}
