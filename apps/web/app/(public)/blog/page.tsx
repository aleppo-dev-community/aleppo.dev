import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المدونة",
};

export default function Page() {
  return (
    <main className="text-white min-h-screen w-full flex flex-col items-center justify-start py-20 px-4">
      <div className="max-w-xl w-full bg-gradient-to-br from-[#232323] to-[#181818] rounded-2xl p-10 shadow-lg border border-[#232323] flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">قريباً</h1>
        <p className="text-secondary-foreground text-lg mb-2 text-center">
          قسم المدونة سيتوفر قريباً
        </p>
      </div>
    </main>
  );
}
