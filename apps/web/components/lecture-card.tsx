import { Lecture } from "@/lib/lectures";
import { cn } from "@workspace/ui/lib/utils";
import dayjs from "dayjs";
import { BookOpen, CalendarDays, Clock, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function calculateIsUpcoming(startDate: string) {
  if (!startDate || startDate.trim() === "") return false;

  const lectureDate = new Date(startDate);
  const now = new Date();

  if (isNaN(lectureDate.getTime())) return false;

  return lectureDate > now;
}
export function LectureCard({
  lecture,
  direction = "column",
}: {
  lecture: Lecture;
  direction?: "row" | "column";
}) {
  const isUpcoming = calculateIsUpcoming(lecture.startDate);

  return (
    <div
      className={cn(
        "bg-gradient-to-br from-[#232323] to-[#181818] rounded-2xl relative shadow-lg border border-[#232323] flex overflow-hidden",
        direction === "row" ? "flex-row" : "flex-col",
      )}
    >
      <Link href={`/learn/${lecture.id}`} className="w-full h-full absolute top-0 left-0 " />

      {isUpcoming && (
        <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold z-10 shadow-lg">
          سجل الآن
        </div>
      )}

      <div
        className={cn(
          "bg-[#181818] flex items-center justify-center",
          direction === "row" ? "w-72" : "",
        )}
      >
        <Image
          src={lecture.image}
          alt={lecture.title}
          className="object-cover aspect-video w-full h-full"
          width={626}
          height={470}
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 text-white">{lecture.title}</h3>

        {isUpcoming && (
          <>
            <div className="flex items-center gap-1 text-secondary-foreground text-sm mb-1">
              <CalendarDays className="w-4 h-4" />
              <span className="font-bold">التاريخ:</span>
              <span>{dayjs(lecture.startDate).format("DD/MM/YYYY") || "سيحدد قريباً"}</span>
            </div>
            <div className="flex items-center gap-1 text-secondary-foreground text-sm mb-1">
              <Clock className="w-4 h-4" />
              <span className="font-bold">الوقت:</span>
              <span>
                {dayjs(lecture.startDate).format("A hh:mm")} -{" "}
                {dayjs(lecture.endDate).format("A hh:mm")}
              </span>
            </div>
          </>
        )}

        <div className="flex items-center gap-1 text-secondary-foreground text-sm mb-1">
          <User className="w-4 h-4" />
          <span className="font-bold">تقديم:</span>
          <span>{lecture.instructor.name}</span>
        </div>

        {lecture.topics && lecture.topics.length > 0 && (
          <div className="text-secondary-foreground text-sm mb-4">
            <div className="flex items-center gap-1 mb-1">
              <BookOpen className="w-4 h-4" />
              <span className="font-bold">المواضيع:</span>
            </div>
            <ul className="list-disc list-inside text-xs space-y-1">
              {lecture.topics.slice(0, 3).map((topic, idx) => (
                <li key={idx} className="text-sm">
                  {topic}
                </li>
              ))}
              {lecture.topics.length > 3 && (
                <li className="text-sm text-primary">+{lecture.topics.length - 3} مواضيع أخرى</li>
              )}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {lecture.tags.map((tag: string) => (
            <span key={tag} className="bg-[#232323] text-xs px-2 py-1 rounded text-primary">
              {tag}
            </span>
          ))}
          <span className="bg-[#232323] text-xs px-2 py-1 rounded text-secondary-foreground">
            {lecture.level}
          </span>
        </div>
      </div>
    </div>
  );
}
