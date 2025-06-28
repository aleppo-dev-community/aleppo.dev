import { EventCard } from "@/components/event-card";
import { events } from "@/lib/events";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الفعاليات",
};

export default function Page() {
  const now = new Date();
  const upcomingEvents = events.filter((e) => !e.date || new Date(e.date) > now);
  const pastEvents = events.filter((e) => e.date && new Date(e.date) <= now);

  return (
    <main className="text-white w-full flex flex-col items-center pt-8" dir="rtl">
      <div className="w-full md:max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">الفعاليات القادمة</h2>
        <div className="grid grid-cols-1 gap-8 mb-16">
          {upcomingEvents.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-8">الفعاليات السابقة</h2>
        <div className="grid grid-cols-1 gap-8">
          {pastEvents.map((event) => (
            <EventCard event={event} key={event.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
