"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sections } from "@/data/pieces";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f5f2ee]/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-playfair text-base font-medium tracking-wide text-gray-900 hover:text-gray-400 transition-colors duration-300"
        >
          The Armand Edit
        </Link>

        <nav className="flex items-center gap-8">
          {sections.map((s) => (
            <Link
              key={s.slug}
              href={`/${s.slug}`}
              className={`text-xs font-light tracking-[0.15em] uppercase transition-colors duration-300 ${
                pathname === `/${s.slug}`
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-900"
              }`}
            >
              {s.label}
            </Link>
          ))}
          <Link
            href="/#about"
            className="text-xs font-light tracking-[0.15em] uppercase text-gray-400 hover:text-gray-900 transition-colors duration-300"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
