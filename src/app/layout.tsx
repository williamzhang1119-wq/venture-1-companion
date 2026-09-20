import { Noto_Sans_Arabic, Noto_Sans_Devanagari, Noto_Sans_SC, Nunito, Outfit } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const notoSc = Noto_Sans_SC({
  variable: "--font-noto-sc",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const notoAr = Noto_Sans_Arabic({
  variable: "--font-noto-ar",
  subsets: ["arabic"],
  weight: ["500", "700"],
});

const notoHi = Noto_Sans_Devanagari({
  variable: "--font-noto-hi",
  subsets: ["devanagari"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "Venture 1 — all-ages multilingual tutor",
  description:
    "Venture 1 is a family-safe personal tutor for all ages. Chat, stories, and quizzes in any language.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${nunito.variable} ${notoSc.variable} ${notoAr.variable} ${notoHi.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
