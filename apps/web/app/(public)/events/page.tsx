const events = {
  upcoming: [
    {
      title: "ملتقى الذكاء الصنعي",
      date: "سيحدد قريباً",
      description: "تعرف على الذكاء الصنعي وكيف يمكنك استخدامه في تطبيقاتك.",
      tags: ["#AI", "#Meetup"],
      image: "https://uploads.aleppo.dev/AI-meetup.png",
      cta: {
        label: "قريباً",
        href: null,
      },
    },
  ],
  recent: [
    {
      title: "ملتقى مطوري حلب الأول",
      date: "2025/05/24",
      description:
        "جمع المتقى نخبة من المطورين من مختلف الاختصاصات، إلى جانب حضور لافت من الأساتذة الأكاديميين وممثلين عن بعض أبرز الشركات المحلية. كان يومًا مميزًا زاخراً بالتفاعل وتبادل المعرفة، وبناء العلاقات بين أفراد المجتمع التقني.",
      tags: ["#Meetup", "#Developers"],
      cta: {
        label: "منشور الـ LinkedIn",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7332327903168249856",
      },
      image: "https://uploads.aleppo.dev/dev-meetup-Q2/IMG_7211.JPG",
    },
  ],
};

function EventCard({ event }: { event: any }) {
  return (
    <div className="bg-gradient-to-br from-[#232323] to-[#181818] rounded-2xl shadow-lg border border-[#232323] flex flex-col overflow-hidden">
      <div className="h-40 w-full bg-[#181818] flex items-center justify-center">
        <img
          src={event.image}
          alt={event.title}
          className="object-cover w-full h-full"
          style={{ maxHeight: 160 }}
        />
      </div>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 text-white">{event.title}</h3>
        <div className="text-secondary-foreground text-sm mb-2">{event.date}</div>
        <div className="text-secondary-foreground text-base mb-4 flex-1">{event.description}</div>
        <div className="flex flex-wrap gap-2 mb-4">
          {event.tags.map((tag: string) => (
            <span key={tag} className="bg-[#232323] text-xs px-2 py-1 rounded text-primary">
              {tag}
            </span>
          ))}
        </div>
        {event.cta && (
          <a
            href={event.cta.href}
            className="mt-auto inline-block bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition"
          >
            {event.cta.label}
          </a>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main
      className="bg-[#050505] text-white min-h-screen w-full flex flex-col items-center py-20"
      dir="rtl"
    >
      <div className="w-full md:max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">الأحداث القادمة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {events.upcoming.map((event, i) => (
            <EventCard event={event} key={i} />
          ))}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold mb-8">الأحداث السابقة</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.recent.map((event, i) => (
            <EventCard event={event} key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
