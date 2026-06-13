"use client";
import { Footer } from "@/components/footer";
import { QRScanner } from "@/components/qr-scanner";
import { authClient } from "@/lib/auth-client";
import { events } from "@/lib/events";
import { lectures } from "@/lib/lectures";
import { rpc } from "@/lib/rpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@workspace/ui/components/hover-card";
import dayjs from "dayjs";
import { Calendar, CheckCircle2, Edit, Globe, Home, Info, LogOutIcon, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa6";
import QRCode from "react-qr-code";

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [qrSize, setQrSize] = useState(200);

  useEffect(() => {
    const updateQrSize = () => {
      setQrSize(window.innerWidth < 640 ? 150 : 200);
    };
    updateQrSize();
    window.addEventListener("resize", updateQrSize);
    return () => window.removeEventListener("resize", updateQrSize);
  }, []);
  const logout = useMutation({
    mutationFn: () => authClient.signOut(),
    onSuccess: () => {
      queryClient.removeQueries();
      router.replace("/");
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: () => rpc.profile.dashboard.$get(),
  });

  const totalRegistrations = data?.totalRegistrations ?? 0;
  const activeRegistrations = data?.activeRegistrations ?? [];
  const attendedRegistrations = data?.attendedRegistrations ?? [];
  const getTelegramLink = (telegramId: string) => {
    const username = telegramId.startsWith("@") ? telegramId.slice(1) : telegramId;
    return `https://t.me/${username}`;
  };

  const addFriend = useMutation({
    mutationFn: async (friendId: string) => {
      const response = await rpc.profile.friends.$post({ json: { friendId } });
      if ("error" in response) {
        throw new Error(response.error);
      }
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });

  const getEventDetails = (slug: string) => {
    const event = events.find((e) => e.id === slug);
    if (event) {
      return {
        id: event.id,
        title: event.title,
        date: event.date,
        location: event.location,
        type: "event" as const,
      };
    }

    const lecture = lectures.find((l) => l.id === slug);
    if (lecture) {
      return {
        id: lecture.id,
        title: lecture.title,
        date: lecture.startDate,
        location: lecture.location,
        type: "lecture" as const,
      };
    }

    return null;
  };

  return (
    <main
      className="text-foreground w-full flex flex-col items-center py-6 sm:py-12 min-h-screen"
      dir="rtl"
    >
      <div className="w-full md:max-w-4xl px-4 sm:px-6 flex flex-col items-start">
        <div className="flex flex-col gap-4 mb-6 w-full">
          <div className="flex items-center justify-between w-full">
            <Button asChild variant="ghost" size="sm" className="gap-2">
              <Link href="/">
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">الرئيسية</span>
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link href="/dashboard/profile/edit?mode=edit&redirect=/dashboard">
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">تعديل الملف الشخصي</span>
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
                <span className="hidden sm:inline">تسجيل الخروج</span>
              </Button>
            </div>
          </div>
          <div className="w-full flex flex-col sm:flex-row items-center sm:items-start gap-3">
            <QRScanner onScan={async (userId) => { await addFriend.mutateAsync(userId); }} />
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link href="/dashboard/friends">
                <Users className="w-5 h-5" />
                <span>قائمة الأصدقاء</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6 mb-6 w-full">
          {!isLoading && data?.userDetails && data?.userId && (
            <Card className="border-4 border-yellow-400 shadow-2xl overflow-hidden rounded-xl bg-[#1a1a1a]">
              <CardContent className="p-0">
                <div className="relative bg-[#1a1a1a]">
                  <div className="absolute inset-0 opacity-5">
                    <div className="grid grid-cols-8 gap-4 h-full w-full p-4">
                      {Array.from({ length: 64 }).map((_, i) => (
                        <div key={i} className="w-full h-full border border-yellow-400/20 rounded"></div>
                      ))}
                    </div>
                  </div>

                  <div className="relative p-3 sm:p-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0 mb-2 sm:mb-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-400 rounded flex items-center justify-center flex-shrink-0">
                          <Image src="/logo.svg" alt="Logo" width={32} height={32} className="invert w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-white font-semibold text-sm sm:text-base">مجتمع مطوري حلب</span>
                      </div>
                      <div className="text-yellow-400 font-mono font-bold text-base sm:text-lg">
                        #{data.userId.slice(-5).padStart(5, "0")}
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-3 md:gap-4 items-start">
                      <div className="flex-1 min-w-0 w-full">
                        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 sm:mb-3 uppercase tracking-wide break-words">
                          {data.userDetails.fullName}
                        </h2>
                        <div className="space-y-1.5 sm:space-y-2" dir="ltr">
                          {data.userDetails.linkedinUrl && (
                            <div className="flex items-center gap-2 sm:gap-3">
                              <FaLinkedin className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
                              <a
                                href={data.userDetails.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 text-sm sm:text-base truncate flex-1 min-w-0"
                              >
                                {data.userDetails.linkedinUrl}
                              </a>
                            </div>
                          )}
                          {data.userDetails.telegramId && (
                            <div className="flex items-center gap-2 sm:gap-3">
                              <FaTelegram className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
                              <a
                                href={getTelegramLink(data.userDetails.telegramId)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 text-sm sm:text-base"
                              >
                                {data.userDetails.telegramId}
                              </a>
                            </div>
                          )}
                          {data.userDetails.githubUrl && (
                            <div className="flex items-center gap-2 sm:gap-3">
                              <FaGithub className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
                              <a
                                href={data.userDetails.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 text-sm sm:text-base truncate flex-1 min-w-0"
                              >
                                {data.userDetails.githubUrl}
                              </a>
                            </div>
                          )}
                          {data.userDetails.websiteUrl && (
                            <div className="flex items-center gap-2 sm:gap-3">
                              <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 flex-shrink-0" />
                              <a
                                href={data.userDetails.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 text-sm sm:text-base truncate flex-1 min-w-0"
                              >
                                {data.userDetails.websiteUrl}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-center justify-center w-full md:w-auto md:border-s md:ps-4 pt-3 md:pt-0 border-t md:border-t-0 border-yellow-400/30">
                        <div className="bg-white p-2 sm:p-3 rounded-lg">
                          <QRCode value={data.userId} size={qrSize} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="h-4 w-24 bg-muted rounded mb-3 animate-pulse"></div>
                      <div className="h-10 w-16 bg-muted rounded animate-pulse"></div>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-muted animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="h-4 w-24 bg-muted rounded mb-3 animate-pulse"></div>
                      <div className="h-10 w-16 bg-muted rounded animate-pulse"></div>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-muted animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-secondary-foreground text-sm mb-2">
                        إجمالي الفعاليات التي قمت بالتسجيل فيها
                      </p>
                      <p className="text-3xl font-bold text-primary">{totalRegistrations}</p>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {attendedRegistrations.length > 0 ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-secondary-foreground text-sm">الفعاليات التي حضرتها</p>
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <button className="text-secondary-foreground hover:text-foreground transition-colors">
                                <Info className="w-4 h-4" />
                              </button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-64">
                              <p className="text-sm text-foreground">
                                هذا العدد يعتمد على عمليات مسح QR Code ضمن الفعاليات.
                              </p>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                        <p className="text-3xl font-bold text-primary">
                          {attendedRegistrations.length}
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="opacity-60">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <p className="text-secondary-foreground text-sm">الفعاليات التي حضرتها</p>
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <button className="text-secondary-foreground hover:text-foreground transition-colors">
                                <Info className="w-4 h-4" />
                              </button>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-64">
                              <p className="text-sm text-foreground">
                                هذا العدد يعتمد على عمليات مسح QR Code ضمن الفعاليات.
                              </p>
                            </HoverCardContent>
                          </HoverCard>
                        </div>
                        <p className="text-2xl font-bold text-secondary-foreground">-</p>
                        <p className="text-xs text-secondary-foreground mt-1">
                          لا توجد بيانات حضور
                        </p>
                      </div>
                      <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-6 h-6 text-secondary-foreground" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {isLoading ? (
            <div>
              <div className="h-7 w-32 bg-muted rounded mb-4 animate-pulse"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1].map((i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-muted animate-pulse"></div>
                        <div className="flex-1 min-w-0 space-y-3">
                          <div className="h-6 w-3/4 bg-muted rounded animate-pulse"></div>
                          <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
                          <div className="h-4 w-2/3 bg-muted rounded animate-pulse"></div>
                          <div className="h-8 w-24 bg-muted rounded animate-pulse mt-4"></div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <>
              {activeRegistrations.length > 0 && (
                <div className="w-full">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                    <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                    الفعاليات القادمة
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeRegistrations.map((registration) => {
                      const event = getEventDetails(registration.eventSlug);
                      if (!event) return null;
                      return (
                        <Card
                          key={registration.eventSlug}
                          className="hover:border-primary/50 transition-all duration-300"
                        >
                          <CardContent className="p-4 sm:p-6">
                            <div className="flex items-start gap-3 sm:gap-4">
                              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-primary-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base sm:text-lg font-semibold mb-2 break-words">{event.title}</h3>
                                {event.date && (
                                  <p className="text-secondary-foreground text-sm mb-2">
                                    {dayjs(event.date).format("YYYY/MM/DD")}
                                  </p>
                                )}
                                {event.location && (
                                  <p className="text-secondary-foreground text-sm mb-4">
                                    {event.location}
                                  </p>
                                )}
                                <Button asChild variant="outline" size="sm">
                                  <Link
                                    href={
                                      event.type === "lecture"
                                        ? `/learn/${registration.eventSlug}`
                                        : `/events/${registration.eventSlug}`
                                    }
                                  >
                                    عرض التفاصيل
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <Footer className="mt-auto" />
    </main>
  );
}
