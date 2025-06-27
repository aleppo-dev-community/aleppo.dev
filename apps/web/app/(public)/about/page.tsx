import { Button } from "@workspace/ui/components/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "من نحن",
};

export default function AboutPage() {
  return (
    <main className="text-white min-h-screen w-full overflow-x-hidden flex flex-col items-center">
      <section className="mt-20 max-w-4xl mx-auto flex flex-col p-6" style={{ direction: "rtl" }}>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-center">من نحن</h1>
        <p className="text-[#AFAFAF] text-lg md:text-xl mb-8 leading-relaxed text-center">
          مجتمع مطوري حلب هو مبادرة تهدف إلى دعم وتمكين المطورين في مدينة حلب من خلال تنظيم فعاليات،
          ورش عمل، وفرص تعليمية وتواصلية. رؤيتنا هي بناء مجتمع تقني متكامل يساهم في تطوير قطاع
          التكنولوجيا محلياً وعالمياً.
        </p>
        <h2 className="text-2xl font-semibold text-white mb-4">رسالتنا</h2>
        <p className="text-[#AFAFAF] text-lg md:text-xl mb-8 leading-relaxed">
          تمكين المطورين من الوصول إلى مصادر التعلم، بناء شبكة علاقات مهنية، وتبادل الخبرات في بيئة
          محفزة وداعمة.
        </p>
        <h2 className="text-2xl font-semibold text-white mb-4">قيمنا</h2>
        <ul className="text-[#AFAFAF] [&_*]:text-base md:text-xl leading-relaxed space-y-3 mb-8 list-disc text-start">
          <li>التعاون والمشاركة في المعرفة.</li>
          <li>الابتكار والتطوير المستمر.</li>
          <li>الاحتواء والتنوع.</li>
          <li>دعم نمو المجتمع التقني المحلي.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-white mb-4">أنشطتنا</h2>
        <p className="text-[#AFAFAF] text-lg md:text-xl mb-8 leading-relaxed">
          نقوم بتنظيم فعاليات تقنية، ورش عمل، لقاءات دورية، وجلسات نقاشية تهدف إلى تطوير المهارات
          التقنية وتعزيز التواصل بين المطورين.
        </p>
        <Button asChild size="lg" className="mt-8 w-fit mx-auto">
          <Link href="/participate/attend">انضم إلينا</Link>
        </Button>
      </section>
    </main>
  );
}
