import Link from "next/link";
import { sections } from "@/data/pieces";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Hero */}
      <div className="min-h-[60vh] flex flex-col justify-center py-24">
        <p className="text-[10px] font-light tracking-[0.3em] uppercase text-gray-400 mb-6">
          Est. 2024
        </p>
        <h1 className="text-5xl sm:text-7xl font-light text-gray-900 tracking-tight leading-none mb-8">
          The Armand Edit
        </h1>
        <p className="text-sm font-light text-gray-400 tracking-wide max-w-sm leading-relaxed">
          A personal archive of goods — selected across fashion, interiors, and technology.
        </p>
      </div>

      {/* Section tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pb-32">
        {sections.map((s) => (
          <Link
            key={s.slug}
            href={`/${s.slug}`}
            className="group relative bg-white rounded-xl p-8 flex flex-col justify-between min-h-[180px] hover:shadow-sm transition-shadow duration-300"
          >
            <span className="text-[10px] font-light tracking-[0.25em] uppercase text-gray-300 group-hover:text-gray-400 transition-colors duration-300">
              Browse
            </span>
            <span className="text-xl font-light text-gray-900 tracking-tight">
              {s.label}
            </span>
            <span className="absolute bottom-8 right-8 text-gray-200 group-hover:text-gray-400 transition-colors duration-300 text-lg">
              &rarr;
            </span>
          </Link>
        ))}
      </div>

      {/* About */}
      <section id="about" className="pb-24 pt-12 border-t border-gray-200">
        <div className="max-w-xl">
          <p className="text-xs font-light tracking-[0.2em] uppercase text-gray-400 mb-6">
            About
          </p>
          <p className="text-sm font-light text-gray-600 leading-7">
            The Armand Edit is a personal catalogue of things worth
            owning — clothing, shoes, accessories, and more, collected and
            documented over time. Each piece is chosen with care.
          </p>
        </div>
      </section>
    </div>
  );
}
