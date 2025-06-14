import { Cairo } from "next/font/google";

import { Providers } from "@/components/providers";
import "@workspace/ui/globals.css";

const fontSans = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
});

const fontMono = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl" suppressHydrationWarning>
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
