import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#fafafa]/90 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-light tracking-widest uppercase text-gray-900 hover:text-gray-500 transition-colors duration-300"
        >
          Armaan&apos;s Workshop
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xs font-light tracking-widest uppercase text-gray-500 hover:text-gray-900 transition-colors duration-300"
          >
            Work
          </Link>
          <Link
            href="#about"
            className="text-xs font-light tracking-widest uppercase text-gray-500 hover:text-gray-900 transition-colors duration-300"
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
