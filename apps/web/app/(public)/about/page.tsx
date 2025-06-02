import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="text-white min-h-screen w-full overflow-x-hidden flex flex-col items-center">
      <section
        className="mt-32 max-w-3xl mx-auto flex flex-col items-center text-center p-6"
        style={{ direction: "rtl" }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">من نحن</h1>
        <div className="text-[#AFAFAF] text-[19px] mb-8 leading-relaxed">
          مجتمع مطوري حلب هو مبادرة غير ربحية تهدف إلى دعم وتمكين المطورين في مدينة حلب من خلال
          تنظيم فعاليات، ورش عمل، وفرص تعليمية وتواصلية. رؤيتنا هي بناء مجتمع تقني متكامل يساهم في
          تطوير قطاع التكنولوجيا محلياً وعالمياً.
        </div>
        <h2 className="text-2xl font-semibold text-white mb-4">رسالتنا</h2>
        <div className="text-[#AFAFAF] text-[17px] mb-8">
          تمكين المطورين من الوصول إلى مصادر التعلم، بناء شبكة علاقات مهنية، وتبادل الخبرات في بيئة
          محفزة وداعمة.
        </div>
        <h2 className="text-2xl font-semibold text-white mb-4">قيمنا</h2>
        <ul className="text-[#AFAFAF] text-[17px] space-y-3 mb-8 list-disc list-inside text-right w-full md:w-3/4 mx-auto">
          <li>التعاون والمشاركة في المعرفة.</li>
          <li>الابتكار والتطوير المستمر.</li>
          <li>الاحتواء والتنوع.</li>
          <li>دعم نمو المجتمع التقني المحلي.</li>
        </ul>
        <h2 className="text-2xl font-semibold text-white mb-4">أنشطتنا</h2>
        <div className="text-[#AFAFAF] text-[17px] mb-8">
          نقوم بتنظيم فعاليات تقنية، ورش عمل، لقاءات دورية، وجلسات نقاشية تهدف إلى تطوير المهارات
          التقنية وتعزيز التواصل بين المطورين.
        </div>
        <Button asChild size="lg" className="mt-4">
          <Link href="/join-us">انضم إلينا</Link>
        </Button>
      </section>
    </main>
  );
}
