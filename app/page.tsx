import { pieces } from "@/data/pieces";
import PieceCard from "@/components/PieceCard";

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Intro */}
      <div className="mb-16">
        <p className="text-xs font-light tracking-widest uppercase text-gray-400 mb-2">
          Selected Works
        </p>
        <h2 className="text-2xl font-light text-gray-900 tracking-tight">
          {pieces.length} pieces
        </h2>
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {pieces.map((piece) => (
          <PieceCard key={piece.id} piece={piece} />
        ))}
      </div>
    </div>
  );
}
