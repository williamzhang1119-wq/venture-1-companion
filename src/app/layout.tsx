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
  title: "Venture 1 — family-friendly companion",
  description:
    "Chat, stories, and quizzes with Venture 1 — a family-safe companion with wide knowledge for all ages.",
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
