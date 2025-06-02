import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa6";

export default function Page() {
  const events = [
    {
      cover: "https://uploads.aleppo.dev/AI-meetup.png",
      title: "ملتقى الذكاء الصنعي",
      description: "تعرف على أحدث التقنيات في المجال والتقي بإبرز مطوري الذكاء الصنعي في حلب",
      date: null,
      type: "ملتقى",
    },
  ];

  return (
    <main className="bg-[#050505] text-white min-h-screen w-full overflow-x-hidden">
      <section
        className="relative flex items-center min-h-[500px] md:min-h-[600px] w-full overflow-hidden text-right"
        style={{ direction: "rtl" }}
      >
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="https://uploads.aleppo.dev/dev-meetup-Q2/IMG_7211.JPG"
            alt="Dev Meetup Aleppo"
            fill
            className="object-cover pb-16 md:pb-0 md:object-right w-full h-full md:ms-[250px]"
            priority
            unoptimized
          />
          <div className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-t md:bg-gradient-to-l from-black md:from-20% md:via-40% md:via-black/90 via-black/70 to-transparent z-10" />
          <div className="absolute inset-0 w-full pointer-events-none bg-gradient-to-t  from-black via-7% via-transparent to-transparent z-10" />
        </div>
        <div className="relative z-20 flex flex-col items-start justify-center w-full md:w-[48%] p-8 mt-40 md:p-16 min-h-[320px] md:min-h-[500px] max-w-2xl">
          <h1 className="text-4xl md:text-5xl leading-[60px] md:leading-[90px] font-bold tracking-tight text-foreground mb-4 text-right w-full">
            مجتمع مطوري حلب
          </h1>
          <div className="mt-2 text-[#919191] text-[19px] max-w-xl leading-tight text-right w-full">
            منصتك الأولى للفعاليات وورش العمل التقنية في حلب. انضم إلينا لتطوير مهاراتك، بناء علاقات
            جديدة، والمساهمة في نمو مجتمع البرمجة المحلي.
          </div>
          <Button
            asChild
            className="mt-8 bg-gradient-to-r from-[#E89548] to-primary text-primary-foreground rounded-[7px] px-10 py-6 text-white font-medium text-lg shadow-lg hover:scale-105 transition-transform"
          >
            <Link href="/events">الفعاليات القادمة</Link>
          </Button>
        </div>
      </section>
      <section className="mt-32">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h2 className="text-[40px] font-semibold text-white mb-8">الفعاليات القادمة</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 justify-center gap-8 w-full">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-[#232323] to-[#181818] rounded-2xl p-0 flex flex-col items-start shadow-lg w-full border border-[#232323] transition-transform duration-200 hover:scale-[1.025] hover:shadow-2xl group"
              >
                <div className="relative w-full rounded-t-2xl overflow-hidden aspect-[4/2.2] bg-[#181818] border-b border-[#232323]">
                  <Image
                    src={event.cover}
                    alt={event.title}
                    width={626}
                    height={470}
                    className="object-cover w-full h-full rounded-t-2xl transition-transform duration-200 group-hover:scale-105"
                  />
                  <span className="absolute top-3 right-3 bg-purple-800 text-white text-xs px-3 py-1 rounded shadow-md z-10 border border-purple-900">
                    {event.type}
                  </span>
                </div>
                <div className="flex flex-col gap-1 px-7 py-6 w-full">
                  <div className="text-[22px] font-bold text-[#fff] mb-1">{event.title}</div>
                  {event.date ? (
                    <div className="text-[#E89548] text-[15px] mb-1">{event.date}</div>
                  ) : (
                    <div className="inline-block bg-[#E89548] text-white text-xs font-semibold px-4 py-1 rounded mb-1 w-fit">
                      قريباً
                    </div>
                  )}
                  <div className="text-[#AFAFAF] text-[16px] mb-2">{event.description}</div>
                </div>
              </div>
            ))}
          </div>
          <Button asChild className="mt-10" size="lg">
            <Link href="/events">عرض جميع الفعاليات</Link>
          </Button>
        </div>
      </section>
      <section className="mt-32 max-w-5xl mx-auto flex flex-col items-center">
        <h2 className="text-[38px] font-semibold text-white mb-6">
          لماذا تنضم إلى مجتمع مطوري حلب؟
        </h2>
        <ul className="text-[#AFAFAF] text-[18px] space-y-4 w-full md:w-3/4 list-disc list-inside text-right">
          <li>ورش عمل تقنية متخصصة وفرص تعلم مستمرة.</li>
          <li>شبكة علاقات قوية مع مطوري ومهندسي البرمجيات في حلب.</li>
          <li>تبادل الخبرات والمعرفة في بيئة محفزة وداعمة.</li>
          <li>فرص التعاون على مشاريع تقنية محلية وعالمية.</li>
          <li>دعم مستمر لنموك المهني وتطوير مهاراتك.</li>
        </ul>
      </section>
      <section className="mt-32 max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-[32px] font-semibold text-white mb-4">من نحن</h2>
        <div className="text-[#AFAFAF] text-[18px] mb-6">
          مجتمع مطوري حلب هو مبادرة تهدف إلى دعم وتمكين المطورين في مدينة حلب من خلال تنظيم فعاليات،
          ورش عمل، وفرص تعليمية وتواصلية. رؤيتنا هي بناء مجتمع تقني متكامل يساهم في تطوير قطاع
          التكنولوجيا محلياً وعالمياً.
        </div>
        <Button asChild size="lg">
          <Link href="/about">تعرف على المزيد عنا</Link>
        </Button>
      </section>
      <section className="mt-32 max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2 className="text-[32px] font-semibold text-white mb-4">انضم إلينا كمتطوع</h2>
        <div className="text-[#AFAFAF] text-[18px] mb-8">
          هل لديك شغف بالمساهمة في تطوير مجتمع مطوري حلب؟ إذا كنت ترغب في دعمنا في صيانة الموقع،
          المشاركة في الفعاليات، أو المساهمة في التصميم والتوثيق، يسعدنا انضمامك إلى فريقنا التطوعي.
        </div>
        <Button asChild size="lg">
          <Link href="/join-us">انضم إلينا الآن</Link>
        </Button>
      </section>
      <section className="mt-32 max-w-6xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">تابع مجتمع مطوري حلب</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full">
          <a
            href="https://www.linkedin.com/company/aleppo-dev-community"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#181818] border border-[#232323] rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:bg-[#232323] hover:shadow-lg cursor-pointer"
          >
            <FaLinkedin className="text-4xl mb-4 text-[#0A66C2] group-hover:text-primary transition-colors" />
            <div className="text-xl font-semibold text-white mb-2">LinkedIn</div>
            <div className="text-[#AFAFAF] text-[16px]">
              تابع آخر أخبار المجتمع وفرص التواصل المهني.
            </div>
          </a>
          <a
            href="https://t.me/aleppo_dev_community"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#181818] border border-[#232323] rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:bg-[#232323] hover:shadow-lg cursor-pointer"
          >
            <FaTelegram className="text-4xl mb-4 text-[#229ED9] group-hover:text-primary transition-colors" />
            <div className="text-xl font-semibold text-white mb-2">Telegram</div>
            <div className="text-[#AFAFAF] text-[16px]">
              انضم إلى قناتنا للنقاشات التقنية والإعلانات الهامة.
            </div>
          </a>
          <a
            href="https://www.facebook.com/AleppoDevCommunity/"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#181818] border border-[#232323] rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:bg-[#232323] hover:shadow-lg cursor-pointer"
          >
            <FaFacebook className="text-4xl mb-4 text-[#1877F3] group-hover:text-primary transition-colors" />
            <div className="text-xl font-semibold text-white mb-2">Facebook</div>
            <div className="text-[#AFAFAF] text-[16px]">
              تابع فعالياتنا وتواصل مع أعضاء المجتمع.
            </div>
          </a>
          <a
            href="https://www.instagram.com/aleppo_dev_community"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#181818] border border-[#232323] rounded-2xl p-8 flex flex-col items-center text-center transition-all duration-300 hover:bg-[#232323] hover:shadow-lg cursor-pointer"
          >
            <FaInstagram className="text-4xl mb-4 text-[#E1306C] group-hover:text-primary transition-colors" />
            <div className="text-xl font-semibold text-white mb-2">Instagram</div>
            <div className="text-[#AFAFAF] text-[16px]">
              شاهد مقتطفات ولقطات من فعالياتنا التقنية.
            </div>
          </a>
        </div>
      </section>

      <footer className="mt-32 py-12 bg-[#111111] text-[#AFAFAF] text-center text-[17.3px] border-t border-[#232323]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-4">
          <div className="mb-4 md:mb-0">
            <div className="font-bold text-white text-xl mb-2">مجتمع مطوري حلب</div>
            <div className="text-[#AFAFAF] text-sm">
              © {new Date().getFullYear()} جميع الحقوق محفوظة.
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <a href="mailto:contact@aleppo.dev" className="hover:text-primary transition-colors">
              contact@aleppo.dev
            </a>
          </div>
          <div className="flex gap-4 items-center mt-4 md:mt-0">
            <a
              href="https://www.linkedin.com/company/aleppo-dev-community"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a
              href="https://t.me/aleppo_dev_community"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaTelegram className="text-2xl" />
            </a>
            <a
              href="https://www.facebook.com/AleppoDevCommunity/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaFacebook className="text-2xl" />
            </a>
            <a
              href="https://www.instagram.com/aleppo_dev_community"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary"
            >
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
