import { Button } from "@workspace/ui/components/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "انضم للفريق التطوعي",
};

export default function VolunteerPage() {
  return (
    <main className="text-white min-h-screen w-full overflow-x-hidden flex flex-col items-center">
      <section
        className="mt-32 max-w-4xl mx-auto flex flex-col items-center text-center p-6"
        style={{ direction: "rtl" }}
      >
        <h1 className="text-4xl font-bold mb-6 text-white">انضم للفريق التطوعي</h1>
        <div className="text-[#AFAFAF] text-[19px] mb-8 leading-relaxed">
          كن جزءً من مجتمع مطوري حلب وساهم في تنظيم الفعاليات، إنتاج المحتوى، ودعم نمو المجتمع
          التقني في مدينتنا.
        </div>
        <h2 className="text-2xl font-semibold text-white mb-4">لماذا تتطوع معنا؟</h2>
        <ul className="text-[#AFAFAF] text-[17px] space-y-3 mb-8 list-disc list-inside text-right w-full md:w-3/4 mx-auto">
          <li>تطوير مهاراتك القيادية والتنظيمية من خلال العمل على فعاليات حقيقية.</li>
          <li>توسيع شبكة علاقاتك مع مطورين محترفين وشركات تقنية.</li>
          <li>المساهمة في بناء مجتمع تقني مزدهر في مدينة حلب.</li>
          <li>الحصول على شهادات تقدير وفرص تميّز داخل المجتمع.</li>
        </ul>
        <div className="text-[#AFAFAF] text-[17px] mb-8">
          إذا كنت شغوفاً بالتقنية ومتحمساً لدعم الآخرين، فنحن نرحب بك في فريقنا التطوعي.
        </div>
        <Button asChild size="lg" className="mt-4">
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSfxaZ3SsnPL5RSScQbOCXp5Tk04k91DP7GtLbs6kWxlCL5sQg/viewform"
            target="_blank"
          >
            انضم الآن
          </Link>
        </Button>
      </section>
    </main>
  );
}
