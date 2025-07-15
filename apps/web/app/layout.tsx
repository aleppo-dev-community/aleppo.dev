import { Cairo } from "next/font/google";

import { Providers } from "@/components/providers";
import "@workspace/ui/globals.css";
import { Metadata } from "next";

const fontSans = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
});

const fontMono = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "مجتمع مطوري حلب - Aleppo Dev Community",
    template: "%s | مجتمع مطوري حلب",
  },
  description:
    "انضم إلى مجتمع من المبدعين والمطورين الطموحين، طوّر مهاراتك التقنية المختلفة، وسّع شبكة علاقاتك، وكن جزءًا من نهضة رقمية تقودها العقول المحلية.",
  keywords: [
    "Aleppo Developer Community",
    "Aleppo Developers",
    "ADC",
    "مجتمع مطوري حلب",
    "ملتقى مطوري حلب",
  ],
  openGraph: {
    title: "مجتمع مطوري حلب",
    description:
      "انضم إلى مجتمع من المبدعين والمطورين الطموحين، طوّر مهاراتك التقنية المختلفة، وسّع شبكة علاقاتك، وكن جزءًا من نهضة رقمية تقودها العقول المحلية.",
    url: "https://aleppo.dev",
    siteName: "مجتمع مطوري حلب",
    locale: "ar_SY",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning translate="no">
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased  `}>
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === "production" && (
          <script
            defer
            src="/umami/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_ID}
          ></script>
        )}
      </body>
    </html>
  );
}
