import { events } from "@/lib/events";
import { PageProps } from "@/types/next";
import { cn } from "@workspace/ui/lib/utils";
import { CalendarDays, HeartHandshake, HelpCircle, ImageIcon, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
export async function generateMetadata({ params }: PageProps<{ id: string }>) {
  const eventId = (await params).id;
  const event = events.find((e) => e.id.toString() === eventId);
  return {
    title: event?.title,
  };
}
export default async function EventPage({ params }: PageProps<{ id: string }>) {
  const eventId = (await params).id;
  const event = events.find((e) => e.id.toString() === eventId);

  if (!event) {
    notFound();
  }

  const isUpcoming = !event.date || new Date(event.date) > new Date();
  const showSponsorPrompt = isUpcoming && event.sponsors.length <= 1;

  return (
    <main className="text-white min-h-screen w-full flex flex-col items-center py-20" dir="rtl">
      <div className="w-full md:max-w-4xl px-4 flex flex-col items-start">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{event.title}</h1>
        <p className="text-lg leading-relaxed text-secondary-foreground mb-8">
          {event.description}
        </p>

        <div className="mb-12 text-2xl">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5" />
            <span className="font-bold">التاريخ</span>
          </div>
          <p className="mt-1 mb-4 text-secondary-foreground">{event.date || "سيحدد قريباً"}</p>

          {event.location && (
            <>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span className="font-bold">المكان</span>
              </div>
              <p className="mt-1 mb-4 text-secondary-foreground">{event.location}</p>
            </>
          )}

          {event.cta && event.cta.href && (
            <Link
              href={event.cta.href}
              className="mt-4 text-base inline-block bg-primary text-primary-foreground px-5 py-2 rounded-lg hover:bg-primary/80 transition text-md font-semibold"
            >
              {event.cta.label}
            </Link>
          )}
        </div>

        <section className="mb-12 w-full">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Users />
            الفقرات
          </h2>
          <div className="space-y-8">
            {event.talks.map((talk, i) => (
              <div key={i} className="bg-[#1f1f1f] p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-2">{talk.title}</h3>
                <p className="text-lg font-semibold text-white mb-3image.png [&_a]:underline">
                  المتحدث: {talk.speaker}
                </p>
                <div className="text-secondary-foreground">{talk.description}</div>
              </div>
            ))}
            {event.talks.length === 0 && (
              <div className="bg-[#1f1f1f] p-6 rounded-lg flex flex-col items-center text-center">
                <h3 className="text-2xl font-bold text-primary">لم يتم تحديد المحاضرات بعد</h3>
              </div>
            )}
          </div>
        </section>

        {(event.sponsors.length > 0 || showSponsorPrompt) && (
          <section className="w-full">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <HeartHandshake />
              الداعمين
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {event.sponsors.map((sponsor, i) => (
                <div
                  key={i}
                  className="bg-[#1f1f1f] p-6 rounded-lg flex flex-col items-center text-center"
                >
                  {sponsor.logo && (
                    <div className="w-full h-24 mb-4 flex items-center justify-center">
                      <Image
                        src={sponsor.logo}
                        alt={`${sponsor.name} logo`}
                        width={150}
                        height={100}
                        className="object-contain max-h-full rounded-sm"
                      />
                    </div>
                  )}
                  <div className="flex gap-2 w-full">
                    <Link
                      href={sponsor.website}
                      className={cn(
                        "w-full text-2xl font-bold text-primary",
                        sponsor.website ? "underline" : "no-underline"
                      )}
                      target="_blank"
                    >
                      <h3 className="text-2xl font-bold text-primary">{sponsor.name} </h3>
                    </Link>
                  </div>
                  <p className="text-secondary-foreground mt-2 flex-1">{sponsor.description}</p>
                </div>
              ))}
              {showSponsorPrompt && (
                <div className="bg-[#1f1f1f] p-6 rounded-lg flex flex-col items-center text-center">
                  <div className="w-full h-24 mb-4 flex items-center justify-center bg-[#333] rounded-lg">
                    <HelpCircle className="w-16 h-16 text-secondary-foreground" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">إدعم الحدث</h3>
                  <p className="text-secondary-foreground mt-2 flex-1">
                    نحن نبحث عن داعمين لتغطية المرطبات والوجبات الخفيفة. يرجى التواصل معنا على{" "}
                    <Link href="mailto:contact@aleppo.dev" className="text-primary hover:underline">
                      contact@aleppo.dev
                    </Link>{" "}
                    أو على تليجرام{" "}
                    <Link
                      href="https://t.me/aleppp_developers_community"
                      className="text-primary hover:underline"
                    >
                      @aleppp_developers_community
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </section>
        )}

        {event.gallery && event.gallery.length > 0 && (
          <section className="mt-12 w-full">
            <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
              <ImageIcon />
              صور من الحدث
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {event.gallery.map((photo, i) => (
                <div key={i} className="rounded-sm overflow-hidden">
                  <Image
                    src={photo}
                    alt={`Event photo ${i + 1}`}
                    width={400}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
