import { Registration } from "@/components/registration";
import { lectures } from "@/lib/lectures";
import { PageProps } from "@/types/next";
import dayjs from "dayjs";
import "dayjs/locale/ar";
import {
  BookOpen,
  CalendarDays,
  Clock,
  ExternalLink,
  ImageIcon,
  MapPin,
  User,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Configure dayjs to use Arabic locale
dayjs.locale("ar");

export async function generateMetadata({ params }: PageProps<{ id: string }>) {
  const lectureId = (await params).id;
  const lecture = lectures.find((l) => l.id === lectureId);
  return {
    title: lecture?.title,
  };
}

export async function generateStaticParams() {
  return lectures.map((l) => ({ id: l.id }));
}

export default async function LecturePage({ params }: PageProps<{ id: string }>) {
  const lectureId = (await params).id;
  const lecture = lectures.find((l) => l.id === lectureId);

  if (!lecture) {
    return <div className="text-center h-[60vh] pt-10 text-lg">لم يتم العثور على المحاضرة...</div>;
  }
  const isUpcoming = dayjs().isBefore(dayjs(lecture.startDate), "date");

  return (
    <main className="text-white w-full flex flex-col items-center py-20" dir="rtl">
      <div className="w-full md:max-w-4xl px-4 flex flex-col items-start">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{lecture.title}</h1>

        <div className="mb-4 text-xl w-full flex flex-col gap-2">
          <div>
            <div className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="font-bold">تقديم</span>
            </div>
            <Link href={lecture.instructor.url} target="_blank">
              <div className="flex items-center gap-2 mt-1">
                <img
                  src={lecture.instructor.image}
                  alt={``}
                  className="size-20 rounded-full object-cover"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-secondary-foreground underline">{lecture.instructor.name}</p>
                  <p className="text-lg text-secondary-foreground mb-4">
                    {lecture.instructor.title}
                  </p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-wrap gap-2 my-4">
            {lecture.tags.map((tag: string) => (
              <span key={tag} className="bg-[#232323] text-sm px-3 py-1 rounded text-primary">
                {tag}
              </span>
            ))}
            <span className="bg-[#232323] text-sm px-3 py-1 rounded text-secondary-foreground">
              {lecture.level}
            </span>
          </div>
          {lecture.requirements && lecture.requirements.length > 0 && (
            <section className="mb-4 w-full">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Users />
                المتطلبات
              </h2>
              <div className="space-y-2 max-w-xl">
                {lecture.requirements.map((requirement, i) => (
                  <div key={i} className="bg-[#1f1f1f] p-4 rounded-lg">
                    <p className="text-white">• {requirement}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
          <div className="flex flex-col gap-4 items-start w-full">
            {lecture.social.youtube && (
              <iframe
                width="560"
                height="315"
                src={lecture.social.youtube}
                title={`${lecture.title} | Aleppo Dev Community`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="rounded-lg shadow-lg max-w-full"
              />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5" />
              <span className="font-bold">التاريخ</span>
            </div>
            <p className="mt-1 mb-4 text-secondary-foreground">
              {dayjs(lecture.startDate).format("dddd، YYYY/MM/DD") || "سيحدد قريباً"}
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-bold">الوقت</span>
            </div>
            <p className="mt-1 mb-4 text-secondary-foreground">
              {dayjs(lecture.startDate).format("A hh:mm")} -{" "}
              {dayjs(lecture.endDate).format("A hh:mm")}
            </p>
          </div>
          <div>
            {lecture.location && (
              <>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-bold">الموقع</span>
                </div>
                <p className="mt-1 mb-4 text-secondary-foreground">{lecture.location}</p>
              </>
            )}
          </div>
          {isUpcoming && lecture.registrationOpen && (
            <section className="w-full my-4">
              {lecture.registrationUrl !== "" ? (
                <div className="w-full relative overflow-hidden bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-2xl p-8 shadow-2xl">
                  <div className="absolute inset-0 opacity-50">
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: "20px 20px",
                      }}
                    ></div>
                  </div>

                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold mb-3 text-foreground">
                        أحجز مقعدك الآن
                      </h2>
                    </div>

                    <div className="flex-shrink-0">
                      <Link
                        href={lecture.registrationUrl}
                        target="_blank"
                        className="group inline-flex items-center gap-3 bg-white hover:bg-white/90 text-primary px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                      >
                        <ExternalLink className="w-6 h-6" />
                        تسجيل الآن
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-fit">
                  <Registration slug={lecture.id} date={lecture.startDate} eventType="lecture" />
                </div>
              )}
            </section>
          )}
        </div>

        <section className="mb-4 w-full">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <BookOpen />
            المواضيع
          </h2>
          <div className="space-y-4 max-w-xl">
            {lecture.topics.map((topic, i) => (
              <div key={i} className="bg-[#1f1f1f] p-4 rounded-lg">
                <p className="text-lg text-white">{topic}</p>
              </div>
            ))}
          </div>
        </section>

        {lecture.gallery && lecture.gallery.length > 0 && (
          <section className="mt-12 w-full">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <ImageIcon />
              صور من المحاضرة
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {lecture.gallery.map((photo, i) => (
                <a key={i} className="rounded-sm overflow-hidden" href={photo} target="_blank">
                  <Image
                    src={photo}
                    alt={`lecture photo ${i + 1}`}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </a>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
