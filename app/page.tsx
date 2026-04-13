import { pieces } from "@/data/pieces";
import GalleryGrid from "@/components/GalleryGrid";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Hero blurb */}
      <div className="mb-14 max-w-lg">
        <p className="text-xs font-light tracking-[0.2em] uppercase text-gray-400 mb-4">
          The Collection
        </p>
        <h2 className="text-2xl font-light text-gray-900 leading-relaxed tracking-tight">
          A personal archive of goods — curated by brand, category, and taste.
        </h2>
      </div>

      {/* Filtered gallery */}
      <GalleryGrid pieces={pieces} />

      {/* About section */}
      <section id="about" className="mt-32 pt-12 border-t border-gray-100">
        <div className="max-w-xl">
          <p className="text-xs font-light tracking-[0.2em] uppercase text-gray-400 mb-6">
            About
          </p>
          <p className="text-sm font-light text-gray-600 leading-7">
            The Armand Edit is a personal catalogue of things worth
            owning — clothing, shoes, accessories, and vehicles, collected and
            documented over time. Each piece is chosen with care.
          </p>
        </div>
      </section>
    </div>
  );
}
