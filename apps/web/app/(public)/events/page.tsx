import { EventCard } from "@/components/event-card";
import { events } from "@/lib/events";
import { Button } from "@workspace/ui/components/button";
import { BookOpen } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "الفعاليات",
};

export default function Page() {
  return (
    <main className="text-white w-full flex flex-col items-center pt-8" dir="rtl">
      <div className="w-full md:max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">الفعاليات</h2>
        <div className="grid grid-cols-1 gap-8 mb-16">
          {events.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>

        <section className="mt-12 mb-8 w-full">
          <div className="bg-[#1f1f1f] border border-[#333] rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 text-center md:text-right">
                <h3 className="text-lg font-semibold mb-2 text-secondary-foreground">
                  شاهد محاضراتنا التعليمية
                </h3>
                <p className="text-sm text-secondary-foreground/80">
                  استكشف جميع المحاضرات التعليمية التي قدمناها في مجتمع حلب للمطورين
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/learn">
                    <BookOpen className="w-5 h-5" />
                    عرض المحاضرات
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
