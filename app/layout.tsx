import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";

const geist = localFont({
  src: [
    {
      path: "../public/fonts/geist-latin.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/geist-latin.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/geist-latin.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Armand Edit",
  description:
    "A curated collection of goods by Armand — selected with care.",
  openGraph: {
    title: "The Armand Edit",
    description:
      "A curated collection of goods by Armand — selected with care.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f5f2ee] text-gray-900">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
      </body>
    </html>
  );
}
