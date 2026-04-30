import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OperatingNoticeBanner } from "@/components/layout/OperatingNoticeBanner";
import { SupportAgentBubble } from "@/components/support/SupportAgentBubble";
import { GoogleTagManager } from "@next/third-parties/google";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hime — Lokalt internett og TV i Modum, Sigdal og Krødsherad",
    template: "%s | Hime",
  },
  description:
    "Hime leverer fiber, bredbånd og TV til privatpersoner i Modum, Sigdal, Krødsherad, Nakkerud og Tyristrand. Lokal leverandør med ekte kundeservice.",
  metadataBase: new URL("https://hime.no"),
  openGraph: {
    siteName: "Hime",
    locale: "nb_NO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" className={`${raleway.variable} h-full`} suppressHydrationWarning>
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
      <body className="min-h-full flex flex-col antialiased">
        <Header />
        <Suspense fallback={null}>
          <OperatingNoticeBanner />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
        <SupportAgentBubble />
        <Script
          async
          defer
          src="https://api.enduser.no/ina/chat/chat.js?id=c97ac751-9a65-408c-b55f-13aee8ac7dd2"
          data-ina-chat
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
