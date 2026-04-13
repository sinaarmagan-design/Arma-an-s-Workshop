import { pieces } from "@/data/pieces";
import PieceCard from "@/components/PieceCard";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Hero blurb */}
      <div className="mb-20 max-w-lg">
        <p className="text-xs font-light tracking-[0.2em] uppercase text-gray-400 mb-4">
          Selected Works
        </p>
        <h2 className="text-2xl font-light text-gray-900 leading-relaxed tracking-tight">
          Paintings, drawings, and studies made in the studio.
        </h2>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {pieces.map((piece) => (
          <PieceCard key={piece.id} piece={piece} />
        ))}
      </div>

      {/* About section */}
      <section id="about" className="mt-32 pt-12 border-t border-gray-100">
        <div className="max-w-xl">
          <p className="text-xs font-light tracking-[0.2em] uppercase text-gray-400 mb-6">
            About
          </p>
          <p className="text-sm font-light text-gray-600 leading-7">
            Armaan is a multidisciplinary artist working across painting, drawing,
            and mixed media. This workshop documents ongoing practice — a running
            archive of finished pieces, studies, and experiments. New work is
            added as it leaves the studio.
          </p>
        </div>
      </section>
    </div>
  );
}
