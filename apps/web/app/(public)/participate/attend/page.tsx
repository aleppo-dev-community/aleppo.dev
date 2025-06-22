import { EventCard } from "@/components/event-card";
import { events } from "@/lib/events";

export default function AttendPage() {
  const upcomingEvents = events.filter((e) => !e.date || new Date(e.date) > new Date());
  return (
    <main className="text-white min-h-screen w-full overflow-x-hidden flex flex-col items-center">
      <section
        className="mt-32 max-w-3xl mx-auto flex flex-col items-center text-center p-6"
        style={{ direction: "rtl" }}
      >
        <h1 className="text-4xl font-bold mb-6 text-white">شاركنا في الفعاليات</h1>
        <div className="text-[#AFAFAF] text-[19px] mb-8 leading-relaxed">
          لقاءاتنا هي فرصة رائعة للتواصل مع المطورين في حلب، تعلم أشياء جديدة، وشارك معرفتك.
        </div>
      </section>

      <section className="w-full max-w-3xl px-4 mt-20" style={{ direction: "rtl" }}>
        <h2 className="text-2xl font-semibold mb-6 text-white">الفعاليات القادمة</h2>
        <div className="flex flex-col gap-6">
          {upcomingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
          {upcomingEvents.length === 0 && (
            <p className="text-secondary-foreground">لا توجد فعاليات قادمة حالياً.</p>
          )}
        </div>
      </section>
    </main>
  );
}
