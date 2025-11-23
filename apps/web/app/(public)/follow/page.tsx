import { SocialCard } from "@/components/social-card";
import { socialLinks } from "@/lib/social";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تابع مجتمع مطوري حلب",
};

export default function FollowPage() {
  return (
    <main className="-mb-6 pb-20 text-white w-full overflow-x-hidden">
      <section className="mt-10 md:mt-10 px-3 max-w-6xl mx-auto flex flex-col items-center">
        <div className="max-w-3xl mx-auto mb-12 text-center" style={{ direction: "rtl" }}>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">تابع مجتمع مطوري حلب</h1>
          <p className="text-[#AFAFAF] text-lg md:text-xl leading-relaxed">
            انضم إلى مجتمعنا على مختلف المنصات لتكون على اطلاع دائم بآخر الأخبار، الفعاليات،
            والمحتوى التقني. تواصل معنا، شارك أفكارك، وكن جزءاً من مجتمع المطورين في حلب.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-12">
          {socialLinks.map((social) => (
            <SocialCard key={social.platform} social={social} />
          ))}
        </div>
        <div
          className="mt-8 max-w-3xl mx-auto bg-[#181818]/80 rounded-2xl shadow-lg p-8 md:p-12 border border-[#232323] flex flex-col items-center text-center"
          style={{ direction: "rtl" }}
        >
          <div className="w-12 h-1 bg-gradient-to-r from-[#E89548] to-primary rounded-full mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">تواصل معنا</h2>
          <p className="text-[#AFAFAF] text-lg md:text-xl mb-6">
            لديك سؤال أو استفسار؟ نحن هنا للمساعدة
          </p>
          <a
            href="mailto:contact@aleppo.dev"
            className="text-primary hover:text-[#E89548] transition-colors text-lg font-semibold"
          >
            contact@aleppo.dev
          </a>
        </div>
      </section>
    </main>
  );
}
