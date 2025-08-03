import { events } from "@/lib/events";
import { PageProps } from "@/types/next";
import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { CalendarDays, HeartHandshake, HelpCircle, ImageIcon, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
    return <div className="text-center h-[60vh] pt-10 text-lg">لم يتم العثور على الفعالية...</div>;
  }

  const isUpcoming = !event.date || new Date(event.date) > new Date();
  const showSponsorPrompt = isUpcoming && event.sponsors.length <= 1;

  return (
    <main className="text-white w-full flex flex-col items-center py-20" dir="rtl">
      <div className="w-full md:max-w-4xl px-4 flex flex-col items-start">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{event.title}</h1>
        <p className="text-lg leading-relaxed text-secondary-foreground mb-8">
          {event.description}
        </p>

        <div className="mb-12 text-2xl w-full">
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

          <div className="flex flex-col sm:flex-row gap-4 items-start w-full ">
            {event.cta && event.cta.button}
            {event.cta && event.cta.href && (
              <Button asChild size="lg">
                <Link href={event.cta.href}>{event.cta.label}</Link>
              </Button>
            )}
          </div>
        </div>

        <section className="mb-12 w-full">
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
            <Users />
            الفقرات
          </h2>
          <div className="space-y-8 max-w-xl">
            {event.talks.map((talk, i) => (
              <div key={i} className="bg-[#1f1f1f] p-6 rounded-lg">
                <h3 className="text-2xl font-bold text-primary mb-2">{talk.title}</h3>
                <div className="flex items-center gap-4 mb-4">
                  {talk.speaker.image && (
                    <img
                      src={talk.speaker.image}
                      alt={`صورة المتحدث`}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="text-lg font-semibold text-white [&_a]:underline">
                      {talk.speaker.name}
                    </p>
                    {talk.speaker.description && (
                      <p className="text-sm text-secondary-foreground">
                        {talk.speaker.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="text-secondary-foreground">{talk.description}</div>
              </div>
            ))}
            {event.talks.length === 0 && (
              <div className="p-6 rounded-lg flex flex-col">
                <h3 className="text-2xl font-bold text-primary">لم يتم تحديد الفقرات بعد</h3>
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
                        sponsor.website ? "underline" : "no-underline",
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
                    شاركنا في الفعالية{" "}
                    <Link href="/participate/sponsor-a-meetup" className="text-primary underline">
                      وقم برعايتها
                    </Link>
                    .
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
