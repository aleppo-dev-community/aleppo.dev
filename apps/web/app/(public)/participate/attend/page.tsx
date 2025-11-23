import { EventCard } from "@/components/event-card";
import { LectureCard } from "@/components/lecture-card";
import { events } from "@/lib/events";
import { lectures } from "@/lib/lectures";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "شاركنا في الفعاليات",
};

export default function AttendPage() {
  const upcomingEvents = events.filter((e) => !e.date || new Date(e.date) > new Date());
  const upcomingLectures = lectures.filter(
    (e) => !e.startDate || new Date(e.startDate) > new Date(),
  );
  const pastEvents = events.filter((e) => e.date && new Date(e.date) <= new Date());
  const pastLectures = lectures.filter((e) => e.startDate && new Date(e.startDate) <= new Date());

  const upcomingItems = [
    ...upcomingEvents.map((event) => ({
      type: "event" as const,
      item: event,
      date: event.date ? new Date(event.date) : new Date(0),
    })),
    ...upcomingLectures.map((lecture) => ({
      type: "lecture" as const,
      item: lecture,
      date: lecture.startDate ? new Date(lecture.startDate) : new Date(0),
    })),
  ].sort((a, b) => a.date.getTime() - b.date.getTime());

  const pastItems = [
    ...pastEvents.map((event) => ({
      type: "event" as const,
      item: event,
      date: event.date ? new Date(event.date) : new Date(0),
    })),
    ...pastLectures.map((lecture) => ({
      type: "lecture" as const,
      item: lecture,
      date: lecture.startDate ? new Date(lecture.startDate) : new Date(0),
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <main className="text-white w-full overflow-x-hidden flex flex-col items-center">
      <section
        className="mt-8 max-w-3xl mx-auto flex flex-col items-center text-center p-6"
        style={{ direction: "rtl" }}
      >
        <h1 className="text-4xl font-bold mb-6 text-white">شاركنا في الفعاليات</h1>
        <div className="text-[#AFAFAF] text-[19px] mb-2 leading-relaxed">
          لقاءاتنا هي فرصة رائعة للتواصل مع المطورين في حلب، تعلم أشياء جديدة، وشارك معرفتك.
        </div>
      </section>

      <section className="w-full max-w-3xl px-4 mt-3" style={{ direction: "rtl" }}>
        <h2 className="text-2xl font-semibold mb-6 text-white">الفعاليات القادمة</h2>
        <div className="flex flex-col gap-6">
          {upcomingItems.map(({ type, item }) =>
            type === "event" ? (
              <EventCard key={item.id} event={item} />
            ) : (
              <LectureCard key={item.id} lecture={item} />
            ),
          )}
          {upcomingItems.length === 0 && (
            <p className="text-secondary-foreground">لا توجد فعاليات قادمة حالياً.</p>
          )}
        </div>
      </section>
      <section className="w-full max-w-3xl px-4 mt-10" style={{ direction: "rtl" }}>
        <h2 className="text-2xl font-semibold mb-6 text-white">الفعاليات السابقة</h2>
        <div className="flex flex-col gap-6">
          {pastItems.map(({ type, item }) =>
            type === "event" ? (
              <EventCard key={item.id} event={item} />
            ) : (
              <LectureCard key={item.id} lecture={item} direction="row" />
            ),
          )}
        </div>
      </section>
    </main>
  );
}
