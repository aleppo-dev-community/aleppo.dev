"use client";

import { Footer } from "@/components/footer";
import { rpc } from "@/lib/rpc";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Globe, Home, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaTelegram } from "react-icons/fa6";

export default function FriendsPage() {
  const { data: friends, isLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: () => rpc.profile.friends.$get(),
  });

  const getTelegramLink = (telegramId: string) => {
    const username = telegramId.startsWith("@") ? telegramId.slice(1) : telegramId;
    return `https://t.me/${username}`;
  };

  return (
    <main
      className="text-foreground w-full flex flex-col items-center py-6 sm:py-12 min-h-screen"
      dir="rtl"
    >
      <div className="w-full md:max-w-2xl px-4 sm:px-6 flex flex-col items-start">
        <div className="flex items-center justify-between w-full mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center">
              <Link href="/">
              <Image src="/logo.svg" alt="Logo" width={40} height={40} className="size-10 sm:size-12" />
              </Link>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold">قائمة الأصدقاء</h1>
          </div>
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href="/dashboard">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">الملف الشخصي</span>
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex flex-col gap-4 w-full">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="h-6 w-3/4 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-1/2 bg-muted rounded animate-pulse"></div>
                    <div className="h-4 w-2/3 bg-muted rounded animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : friends && friends.length > 0 ? (
          <div className="flex flex-col gap-4 w-full">
            {friends.map((friend, index) => (
              <Card key={index} className="hover:border-primary/50 transition-all duration-300">
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">{friend.fullName}</h3>
                      {friend.specialization && (
                        <p className="text-sm text-secondary-foreground">{friend.specialization}</p>
                      )}
                      {friend.faculty && (
                        <p className="text-xs text-secondary-foreground">{friend.faculty}</p>
                      )}
                      {friend.yearsOfExperience !== null && friend.yearsOfExperience !== undefined && (
                        <p className="text-xs text-secondary-foreground mt-1">
                          {friend.yearsOfExperience} سنوات خبرة
                        </p>
                      )}
                    </div>

                    <div className="space-y-2" dir="ltr">
                      {friend.linkedinUrl && (
                        <div className="flex items-center gap-2">
                          <FaLinkedin className="w-4 h-4 text-primary flex-shrink-0" />
                          <a
                            href={friend.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm truncate flex-1 min-w-0"
                          >
                            LinkedIn
                          </a>
                        </div>
                      )}
                      {friend.telegramId && (
                        <div className="flex items-center gap-2">
                          <FaTelegram className="w-4 h-4 text-primary flex-shrink-0" />
                          <a
                            href={getTelegramLink(friend.telegramId)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm"
                          >
                            {friend.telegramId}
                          </a>
                        </div>
                      )}
                      {friend.githubUrl && (
                        <div className="flex items-center gap-2">
                          <FaGithub className="w-4 h-4 text-primary flex-shrink-0" />
                          <a
                            href={friend.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm truncate flex-1 min-w-0"
                          >
                            GitHub
                          </a>
                        </div>
                      )}
                      {friend.websiteUrl && (
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4 text-primary flex-shrink-0" />
                          <a
                            href={friend.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline text-sm truncate flex-1 min-w-0"
                          >
                            Website
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="w-full">
            <CardContent className="p-8 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                  <User className="w-8 h-8 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">لا توجد أصدقاء</h3>
                  <p className="text-sm text-secondary-foreground">
                    استخدم زر مسح QR Code لإضافة أصدقاء جدد
                  </p>
                </div>
                <Button asChild variant="outline">
                  <Link href="/dashboard">العودة إلى لوحة التحكم</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      <Footer className="mt-auto" />
    </main>
  );
}
