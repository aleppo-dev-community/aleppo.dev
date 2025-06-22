import { EventCard } from "@/components/event-card";
import { events } from "@/lib/events";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTelegram } from "react-icons/fa6";

export default function Page() {
  return (
    <main className="bg-[#050505] -mb-6 pb-20 text-white min-h-screen w-full overflow-x-hidden">
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
          <div className="absolute inset-0 w-full h-full pointer-events-none bg-gradient-to-t md:bg-gradient-to-l from-black md:from-20% md:via-40% md:via-black/90 via-black/80 to-transparent z-10" />
          <div className="absolute inset-0 w-full pointer-events-none bg-gradient-to-t  from-black via-7% via-transparent to-transparent z-10" />
        </div>
        <div className="relative z-20 flex flex-col items-start justify-center w-full md:w-[48%] p-8 mt-40 md:p-16 min-h-[320px] md:min-h-[500px] max-w-2xl">
          <div className="flex flex-row-reverse items-center w-full gap-5 justify-end">
            <div className="w-2 h-24 bg-gradient-to-b from-[#E89548] to-primary rounded-full" />
            <div className="flex flex-col items-end text-right animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground mb-2 leading-tight drop-shadow">
                مجتمع مطوري حلب
              </h1>
            </div>
          </div>
          <div className="mt-2 text-foreground/90 text-[19px] max-w-xl leading-tight text-right w-full">
            انضم إلى مجتمع من المبدعين والمطورين الطموحين، طوّر مهاراتك التقنية المختلفة، وسّع شبكة
            علاقاتك، وكن جزءًا من نهضة رقمية تقودها العقول المحلية.
            <br />
            <span className="block mt-3">هنا، لا تُطوَّر المهارات فقط ... بل تُبنى المسيرة.</span>
          </div>
          <Button
            asChild
            className="mt-8 bg-gradient-to-r from-[#E89548] to-primary text-primary-foreground rounded-[7px] px-10 py-6  font-medium text-lg shadow-lg hover:scale-105 transition-transform"
          >
            <Link href="/participate/attend">انضم إلينا</Link>
          </Button>
        </div>
      </section>
      <section className="mt-32 px-3">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          <h2 className="text-[40px] font-semibold text-white mb-8">الفعاليات القادمة</h2>
          <div className="flex flex-col gap-8 w-full">
            {events
              .filter((event) => !event.date || new Date(event.date) > new Date())
              .map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
          </div>
          <Button asChild className="mt-10" size="lg">
            <Link href="/events">عرض جميع الفعاليات</Link>
          </Button>
        </div>
      </section>
      <section className="mt-20 md:mt-28 px-3">
        <div className="max-w-3xl mx-auto bg-[#181818]/80 rounded-2xl shadow-lg p-8 md:p-12 border border-[#232323] flex flex-col items-start md:text-right">
          <div className="w-12 h-1 bg-gradient-to-r from-[#E89548] to-primary rounded-full mb-4" />
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-white mb-4">من نحن</h2>
          <div className="text-[#AFAFAF] text-lg md:text-xl mb-6 w-full">
            نحن مجتمع من المطورين والمهندسين والشغوفين بمجال تكنولوجيا المعلومات من مختلف
            الاختصاصات، نسعى لأن نصبح منصة رائدة في الإبداع والتعلّم التشاركي، حيث يجتمع المطورين،
            ويلتقي المهندس بالمستثمر، ورائد الأعمال بالمطور، لتتلاقى الأفكار وتثمر مشاريعاً واقعية
            ذات أثر حقيقي.
          </div>
        </div>
      </section>
      <section className="mt-20 md:mt-28 px-3">
        <div className="max-w-3xl mx-auto bg-[#181818]/80 rounded-2xl shadow-lg p-8 md:p-12 border border-[#232323] flex flex-col items-start ">
          <div className="w-12 h-1 bg-gradient-to-r from-[#E89548] to-primary rounded-full mb-4" />
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-white mb-4">
            أهدافنا ورؤيتنا
          </h2>
          <div className="text-[#AFAFAF] text-lg md:text-xl mb-6 w-full">
            نطمح إلى بناء مجتمع تقني متكامل في مدينة حلب، يكون مركزًا للإبداع والابتكار، ومحفزًا
            لتحولات رقمية محلية وعالمية. نؤمن أن المطورين والمبرمجين يمتلكون القدرة على حل أكبر
            التحديات وتحقيق قفزات نوعية في مختلف المجالات من خلال التكنولوجيا
          </div>
        </div>
      </section>
      <section className="mt-20 md:mt-28 px-3">
        <div className="max-w-3xl mx-auto bg-[#181818]/80 rounded-2xl shadow-lg p-8 md:p-12 border border-[#232323] flex flex-col items-start ">
          <div className="w-12 h-1 bg-gradient-to-r from-[#E89548] to-primary rounded-full mb-4" />
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-white mb-4">قيمنا</h2>
          <ul className="text-[#AFAFAF] text-lg md:text-xl space-y-4 w-full md:w-3/4 list-disc list-inside text-right">
            <li>التعاون والمشاركة في المعرفة.</li>
            <li>الابتكار والتطوير المستمر.</li>
            <li>الاحتواء والتنوع.</li>
            <li>دعم نمو المجتمع التقني المحلي.</li>
          </ul>
        </div>
      </section>
      <section className="mt-20 md:mt-28 px-3">
        <div className="max-w-3xl mx-auto bg-[#181818]/80 rounded-2xl shadow-lg p-8 md:p-12 border border-[#232323] flex flex-col items-start">
          <div className="w-12 h-1 bg-gradient-to-r from-[#E89548] to-primary rounded-full mb-4" />
          <h2 className="text-[2rem] md:text-[2.5rem] font-bold text-white mb-4">أنشطتنا</h2>
          <div
            className="text-[#AFAFAF] text-lg md:text-xl mb-6 leading-relaxed text-right w-full"
            style={{ direction: "rtl" }}
          >
            نقوم بتنظيم فعاليات تقنية، ورش عمل، لقاءات دورية، وجلسات نقاشية تهدف إلى تطوير المهارات
            التقنية وتعزيز التواصل بين المطورين أنفسهم أولاً، ثم مع أصحاب الأعمال ثانياً.
          </div>
        </div>
      </section>
      <section className="mt-32 px-3 max-w-6xl mx-auto flex flex-col items-center">
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
    </main>
  );
}
