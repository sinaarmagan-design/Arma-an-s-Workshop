import type { Metadata } from "next";
import { Playfair_Display, Inter, Raleway, Lato } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--nf-playfair",
  weight: ["400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--nf-inter",
  weight: ["300", "400", "500"],
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--nf-raleway",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--nf-lato",
  weight: ["300", "400", "700"],
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
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${raleway.variable} ${lato.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f0ebe3] text-gray-900">
        <Header />
        <main className="flex-1 pt-16">{children}</main>
      </body>
    </html>
  );
}
