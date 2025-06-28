import { Button } from "@workspace/ui/components/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ألق كلمة",
};

export default function GiveATalkPage() {
  return (
    <main className="text-white w-full overflow-x-hidden flex flex-col items-center">
      <section
        className="mt-8 max-w-4xl mx-auto flex flex-col items-center text-center p-6"
        style={{ direction: "rtl" }}
      >
        <h1 className="text-4xl font-bold mb-6 text-white">لكلّ منا تجربة تستحق أن تُسمع</h1>
        <ul className="text-[#AFAFAF] [&_*]:text-lg space-y-3 mb-8 list-disc text-start px-5">
          <li>
            هل لديك فكرة مبتكرة، أو مشروع تفخر به، أو تجربة جديدة مررت بها في عالم البرمجة والتطوير؟
            شاركنا قصتك!
          </li>
          <li>
            هل أنهيت مشروعاً باستخدام مكتبة أو تقنية جديدة؟ حدّثنا عن الدروس التي تعلمتها والخبرات
            التي اكتسبتها!
          </li>
          <li>هل قمت بتجربة مزايا جديدة غير مستقرة بعد؟ نود أن نسمع أفكارك!</li>
          <li>هل نفذت فكرة مميزة أو خدعة فريدة في مشروعك؟ أخبرنا بها!</li>
        </ul>
        <p className="text-[#AFAFAF] text-lg md:text-xl leading-relaxed mt-6">
          لا يهم إذا كنت مبتدئًا أو خبيرًا؛ كل تجربة لها قيمتها، وكل فكرة قد تلهم غيرك. العروض في
          ملتقياتنا تصل حتى 30 دقيقة. نرحب بالمشاركين لأول مرة. لأي استفسار، تواصل معنا على
          <Link
            href="mailto:contact@aleppo.dev"
            className="mx-1 font-semibold text-white underline"
          >
            contact@aleppo.dev
          </Link>
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="https://forms.gle/cTAWAhbd1sA4jTLC6">أريد إلقاء كلمة</Link>
        </Button>
      </section>
    </main>
  );
}
