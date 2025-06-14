import Link from "next/link";

export default function Page() {
  return (
    <main className="text-white min-h-screen w-full flex flex-col items-center py-20">
      <div className="max-w-2xl w-full bg-gradient-to-br from-[#232323] to-[#181818] rounded-2xl p-10 shadow-lg border border-[#232323]">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">انضم إلينا</h1>
        <p className="text-secondary-foreground text-lg mb-8 text-center">
          هل لديك شغف بالمساهمة في تطوير مجتمع مطوري حلب؟ إذا كنت ترغب في دعمنا في صيانة الموقع،
          المشاركة في الفعاليات، أو المساهمة في التصميم والتوثيق، يسعدنا انضمامك إلى فريقنا التطوعي.
        </p>

        <div
          className="flex flex-col gap-6 items-center text-center text-lg text-secondary-foreground py-8"
          dir="rtl"
        >
          <p>
            للتواصل معنا، يرجى مراسلتنا عبر البريد الإلكتروني:
            <br />
            <a href="mailto:contact@aleppo.dev" className="text-primary hover:underline break-all">
              contact@aleppo.dev
            </a>
          </p>
          <p>
            أو عبر تيليجرام:
            <br />
            <a
              href="https://t.me/aleppp_developers_community"
              target="_blank"
              rel="noopener noreferrer"
              dir="ltr"
              className="text-primary hover:underline"
            >
              @aleppp_developers_community
            </a>
          </p>
        </div>
        <div className="mt-8 text-center">
          <Link href="/" className="text-primary hover:underline">
            العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </main>
  );
}
