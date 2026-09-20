import { Nunito, Outfit } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-sans",
  subsets: ["latin"],
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
      className={`${outfit.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
