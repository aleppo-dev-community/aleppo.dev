import { LectureCard } from "@/components/lecture-card";
import { lectures } from "@/lib/lectures";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "التعلّم",
};

export default function Page() {
  return (
    <main className="text-white w-full flex flex-col items-center pt-8" dir="rtl">
      <div className="w-full md:max-w-6xl px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">المحاضرات</h2>
        <div className="grid grid-cols-1 gap-8">
          {lectures.map((lecture) => (
            <LectureCard lecture={lecture} key={lecture.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
