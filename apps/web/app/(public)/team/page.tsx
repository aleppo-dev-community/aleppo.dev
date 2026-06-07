import { VolunteersGrid } from "@/components/volunteers-grid";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "الفريق",
};

export default function Page() {
  return (
    <main className="text-white w-full flex flex-col items-center justify-start py-20 px-4">
      <div className="max-w-6xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">المتطوعون</h1>
        <VolunteersGrid />
      </div>
    </main>
  );
}
