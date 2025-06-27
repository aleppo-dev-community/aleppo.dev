import { Event } from "@/lib/events";
import { CalendarDays, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function EventCard({ event }: { event: Event }) {
  return (
    <div className="bg-gradient-to-br from-[#232323] to-[#181818] rounded-2xl relative shadow-lg border border-[#232323] flex flex-col md:flex-row overflow-hidden">
      <Link href={`/events/${event.id}`} className="w-full h-full absolute top-0 left-0 " />
      <div className="md:w-40  bg-[#181818] flex items-center justify-center">
        <Image
          src={event.image}
          alt={event.title}
          className="object-cover w-full h-full"
          width={626}
          height={470}
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
        <div className="flex items-center gap-1 text-secondary-foreground text-sm mb-1">
          <CalendarDays className="w-4 h-4" />
          <span className="font-bold">التاريخ:</span>
          <span>{event.date || "سيحدد قريباً"}</span>
        </div>
        {event.talks.length < 2 && (
          <div className="text-secondary-foreground text-base mb-4 flex-1">{event.description}</div>
        )}
        {event.talks && event.talks.length > 0 && (
          <div className="text-secondary-foreground text-sm mb-4">
            <div className="flex items-center gap-1 mb-1">
              <Users className="w-4 h-4" />
              <span className="font-bold">الفقرات:</span>
            </div>
            <ul className="list-disc list-inside text-xs space-y-1">
              {event.talks.map((talk, idx) => (
                <li key={idx} className="text-sm">
                  {talk.title}
                  {talk.speaker && <> تقدمة {talk.speaker}</>}
                </li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map((tag: string) => (
            <span key={tag} className="bg-[#232323] text-xs px-2 py-1 rounded text-primary">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
