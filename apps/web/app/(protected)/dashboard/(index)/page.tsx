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
    <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0a0a0a] to-[#181818] text-white p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#E89548] to-primary flex items-center justify-center">
              <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-semibold">مرحباً {session?.user.name}</h1>
              <p className="text-[#AFAFAF] text-xs sm:text-sm">مجتمع مطوري حلب</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3 ms-auto">
            <Button asChild variant="ghost" size="sm" className="gap-1 sm:gap-2 text-xs sm:text-sm">
              <Link href="/">
                <Home className="w-3 h-3 sm:w-4 sm:h-4" />
                الرئيسية
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logout.mutate()}
              isLoading={logout.isPending}
              className="gap-1 sm:gap-2 text-xs sm:text-sm"
            >
              <LogOutIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              تسجيل الخروج
            </Button>
          </div>
        </div>

        <div className="text-center mb-8 sm:mb-12">
          <div className="relative inline-block mb-4 sm:mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-[#E89548] to-primary blur-xl opacity-20 rounded-full"></div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-gradient-to-r from-[#E89548] to-primary rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl h-12 sm:h-16 font-bold mb-4 sm:mb-6 bg-gradient-to-r from-[#E89548] to-primary bg-clip-text text-transparent">
            قريباً جداً
          </h2>

          <p className="text-lg sm:text-xl md:text-2xl text-[#AFAFAF] mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
            نحن نعمل على إطلاق لوحة تحكم مميزة لأعضاء مجتمع مطوري حلب
          </p>

          <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[#E89548] to-primary rounded-full mx-auto mb-6 sm:mb-8"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 px-2 sm:px-0">
          <Card className="bg-gradient-to-br from-[#232323] to-[#181818] border-[#333] hover:border-[#E89548]/50 transition-all duration-300">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-[#E89548] to-primary rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">الملف الشخصي</h3>
              <p className="text-[#AFAFAF] text-xs sm:text-sm">
                إدارة بياناتك الشخصية ومعلومات التواصل
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#232323] to-[#181818] border-[#333] hover:border-[#E89548]/50 transition-all duration-300">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-[#E89548] to-primary rounded-lg flex items-center justify-center">
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">الإشعارات</h3>
              <p className="text-[#AFAFAF] text-xs sm:text-sm">
                تلقي آخر الأخبار والفعاليات القادمة
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-[#232323] to-[#181818] border-[#333] hover:border-[#E89548]/50 transition-all duration-300 sm:col-span-2 md:col-span-1">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 bg-gradient-to-r from-[#E89548] to-primary rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h3 className="text-base sm:text-lg font-semibold mb-2">الإعدادات</h3>
              <p className="text-[#AFAFAF] text-xs sm:text-sm">تخصيص تجربتك وتفضيلاتك الشخصية</p>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </div>
  );
}
