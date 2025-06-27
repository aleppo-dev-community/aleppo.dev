import { Button } from "@workspace/ui/components/button";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "أرع لقاء",
};

export default function SponsorPage() {
  return (
    <main className="text-white min-h-screen w-full overflow-x-hidden flex flex-col items-center">
      <section
        className="mt-32 max-w-3xl mx-auto flex flex-col items-center text-center p-6"
        style={{ direction: "rtl" }}
      >
        <h1 className="text-4xl font-bold mb-6 text-white">أرع لقاء</h1>
        <div className="text-[#AFAFAF] text-[19px] mb-8 leading-relaxed">
          نحن نعتمد على دعم الشركات والأفراد لتنظيم فعالياتنا وتوفير بيئة مناسبة للمطورين. رعايتك
          تساعدنا في تغطية تكاليف المكان، المرطبات، وغيرها من المصاريف.
        </div>
        <h2 className="text-2xl font-semibold text-white mb-4">لماذا ترعى لقاءاتنا؟</h2>
        <ul className="text-[#AFAFAF] text-[17px] space-y-3 mb-8 list-disc list-inside text-right w-full md:w-3/4 mx-auto">
          <li>الوصول إلى مجتمع من المطورين الموهوبين.</li>
          <li>زيادة الوعي بعلامتك التجارية.</li>
          <li>دعم نمو المجتمع التقني في مدينة حلب.</li>
        </ul>
        <div className="text-[#AFAFAF] text-[17px] mb-8">
          إذا كنت مهتمًا برعاية أحد لقاءاتنا، يرجى التواصل معنا لمناقشة التفاصيل.
        </div>
        <Button asChild size="lg" className="mt-4">
          <Link href="mailto:contact@aleppo.dev">تواصل معنا للرعاية</Link>
        </Button>
      </section>
    </main>
  );
}
