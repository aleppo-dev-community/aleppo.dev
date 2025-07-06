// apps/web/app/(public)/events/page.tsx

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Event = {
  id: number;
  title: string;
  date: string | null;      // ISO string or null for “TBD”
  description: string;
  tags?: string[];
  image: string;
  registered: boolean;
};

export default function Page() {
  const [upcoming, setUpcoming] = useState<Event[]>([]);
  const [recent, setRecent] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/events", {
          method: "GET",
          credentials: "include",
        });
        const { upcomingEvents, recentEvents } = await res.json() as { upcomingEvents: Event[], recentEvents: Event[] };
        
        setUpcoming(upcomingEvents);
        setRecent(recentEvents);
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return <div className="text-center text-white py-20">Loading…</div>;
  }

  return (
    <main className="text-white min-h-screen w-full flex flex-col items-center py-20" dir="rtl">
      <div className="w-full md:max-w-6xl px-4">
        {/* Upcoming Events */}
        <h2 className="text-2xl md:text-3xl font-bold mb-8">الأحداث القادمة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {upcoming.map((event) => (
            <EventCard key={event.id} event={event} showRegister />
          ))}
          {upcoming.length === 0 && <p className="col-span-full text-center">لا توجد فعاليات قادمة حالياً.</p>}
        </div>

        {/* Recent Events */}
        <h2 className="text-2xl md:text-3xl font-bold mb-8">الأحداث السابقة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {recent.map((event) => (
            <EventCard key={event.id} event={event} showRegister={false} />
          ))}
          {recent.length === 0 && <p className="col-span-full text-center">لا توجد فعاليات سابقة.</p>}
        </div>
      </div>
    </main>
  );
}

type EventCardProps = {
  event: Event;
  showRegister?: boolean;
};

function EventCard({ event, showRegister = true }: EventCardProps) {
  const handleRegister = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ eventId: event.id }),
      });
      if (!res.ok) throw new Error("Registration failed");
      event.registered = true; // optimistically update
      alert("تم التسجيل بنجاح");
    } catch {
      alert("فشل التسجيل، حاول لاحقاً");
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#232323] to-[#181818] rounded-2xl shadow-lg border border-[#232323] flex flex-col overflow-hidden">
      <div className="h-40 w-full bg-[#181818] flex items-center justify-center">
        <Image src={event.image} alt={event.title} width={626} height={470} className="object-cover w-full h-full" />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
        <div className="text-secondary-foreground text-sm mb-2">
          {event.date ? new Date(event.date).toLocaleDateString("ar-EG") : "سيحدد قريباً"}
        </div>
        <div className="text-secondary-foreground text-base mb-4 flex-1">{event.description}</div>
        <div className="flex flex-wrap gap-2 mb-4"> 
          {event.tags?.map((tag) => (
            <span key={tag} className="bg-[#232323] text-xs px-2 py-1 rounded text-primary">
              {tag}
            </span>
          ))}
        </div>

        {showRegister && (event.registered ? (
          <button className="mt-auto bg-gray-600 text-white px-4 py-2 rounded cursor-not-allowed">
            مسجل بالفعل
          </button>
        ) : (
          <button
            onClick={handleRegister}
            className="mt-auto bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/80 transition"
          >
            سجل الآن
          </button>
        ))}
      </div>
    </div>
  );
}
