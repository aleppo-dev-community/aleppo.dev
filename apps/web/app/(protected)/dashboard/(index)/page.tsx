"use client";
import { Footer } from "@/components/footer";
import { authClient } from "@/lib/auth-client";
import { events } from "@/lib/events";
import { lectures } from "@/lib/lectures";
import { rpc } from "@/lib/rpc";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@workspace/ui/components/hover-card";
import dayjs from "dayjs";
import { Calendar, CheckCircle2, Home, Info, LogOutIcon, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const queryClient = useQueryClient();
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
      className="text-foreground w-full flex flex-col items-center py-12 min-h-screen"
      dir="rtl"
    >
      <div className="w-full md:max-w-4xl px-4 flex flex-col items-start">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 w-full">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <User className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              {isLoading ? (
                <div className="h-6 w-32 bg-muted rounded animate-pulse mb-2"></div>
              ) : (
                data?.userDetails && (
                  <h1 className="text-xl font-semibold">مرحباً {data.userDetails.fullName}</h1>
                )
              )}
              <p className="text-secondary-foreground text-sm">مجتمع مطوري حلب</p>
            </div>
          </div>
          <div className="flex gap-2 ms-auto">
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

        <div className="space-y-6 mb-6 w-full">
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
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Calendar />
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
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center flex-shrink-0">
                                <Calendar className="w-6 h-6 text-primary-foreground" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
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
