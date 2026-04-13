import Image from "next/image";
import Link from "next/link";

export default function PieceCard({ piece }) {
  return (
    <Link href={`/pieces/${piece.slug}`} className="group block">
      {/* Image container */}
      <div className="relative overflow-hidden bg-gray-100 aspect-[3/4]">
        <Image
          src={piece.imageUrl}
          alt={piece.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Metadata — fades in on hover */}
      <div className="mt-3 transition-opacity duration-300 opacity-60 group-hover:opacity-100">
        <p className="text-sm font-light text-gray-900 tracking-wide">
          {piece.title}
        </p>
        <p className="text-xs font-light text-gray-400 mt-0.5 tracking-wide">
          {piece.medium} &nbsp;&middot;&nbsp; {piece.year}
        </p>
      </div>
    </Link>
  );
}
