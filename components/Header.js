"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { sections } from "@/data/pieces";

const allLinks = [
  ...sections.map((s) => ({ href: `/${s.slug}`, label: s.label })),
  { href: "/editorial", label: "Editorial" },
  { href: "/#about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#f0ebe3]/95 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-playfair text-base font-medium tracking-wide text-gray-900 hover:text-gray-400 transition-colors duration-300"
        >
          The Armand Edit
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
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
            href="/editorial"
            className={`text-xs font-light tracking-[0.15em] uppercase transition-colors duration-300 ${
              pathname === "/editorial" || pathname.startsWith("/editorial/")
                ? "text-gray-900"
                : "text-gray-400 hover:text-gray-900"
            }`}
          >
            Editorial
          </Link>
          <Link
            href="/#about"
            className="text-xs font-light tracking-[0.15em] uppercase text-gray-400 hover:text-gray-900 transition-colors duration-300"
          >
            About
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span
            className={`block w-5 h-px bg-gray-900 transition-all duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-gray-900 transition-all duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-px bg-gray-900 transition-all duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          open ? "max-h-96 border-t border-gray-100" : "max-h-0"
        } bg-[#f0ebe3]/98`}
      >
        <nav className="px-6 py-6 flex flex-col gap-5">
          {allLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`text-xs font-light tracking-[0.2em] uppercase transition-colors duration-200 ${
                pathname === href ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
