import { EventCard } from "@/components/event-card";
import { LectureCard } from "@/components/lecture-card";
import { events } from "@/lib/events";
import { lectures } from "@/lib/lectures";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الفعاليات",
};

export default function Page() {
  const allItems = [
    ...events.map((event) => ({
      type: "event" as const,
      data: event,
      id: event.id,
      date: event.date,
    })),
    ...lectures.map((lecture) => ({
      type: "lecture" as const,
      data: lecture,
      id: lecture.id,
      date: lecture.startDate,
    })),
  ].sort((a, b) => {
    const dateA = a.date ? new Date(a.date).getTime() : 0;
    const dateB = b.date ? new Date(b.date).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <main className="text-white w-full flex flex-col items-center pt-8" dir="rtl">
      <div className="w-full md:max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">الفعاليات</h2>
        <div className="grid grid-cols-1 gap-8 mb-16">
          {allItems.map((item) =>
            item.type === "event" ? (
              <EventCard event={item.data} key={item.id} />
            ) : (
              <LectureCard lecture={item.data} key={item.id} direction="row" />
            ),
          )}
        </div>
      </div>
    </main>
  );
}
