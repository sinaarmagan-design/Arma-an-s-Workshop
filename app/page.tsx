import { pieces } from "@/data/pieces";
import HomeFeed from "@/components/HomeFeed";

export default function Home() {
  // Only men + women pieces on home page; house/tech via nav
  const feedPieces = pieces.filter(
    (p) => p.section === "men" || p.section === "women"
  );

  return (
    <div className="max-w-6xl mx-auto px-6">
      {/* Title */}
      <div className="pt-16 pb-12">
        <h1 className="font-playfair text-5xl sm:text-6xl font-medium text-gray-900 tracking-tight">
          The Armand Edit
        </h1>
      </div>

      {/* Gender filter + gallery */}
      <HomeFeed pieces={feedPieces} />

      {/* About */}
      <section id="about" className="mt-32 pb-24 pt-12 border-t border-gray-200">
        <div className="max-w-xl">
          <p className="text-xs font-light tracking-[0.2em] uppercase text-gray-400 mb-6">
            About
          </p>
          <p className="font-lato text-sm font-light text-gray-600 leading-7">
            The Armand Edit is a personal catalogue of things worth owning —
            clothing, shoes, accessories, and more, collected and documented
            over time. Each piece is chosen with care.
          </p>
        </div>
      </section>
    </div>
  );
}
