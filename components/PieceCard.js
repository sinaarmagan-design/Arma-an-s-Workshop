import Image from "next/image";
import Link from "next/link";

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function PieceCard({ piece }) {
  return (
    <Link href={`/pieces/${piece.slug}`} className="group block">
      {/* Image container */}
      <div className="relative overflow-hidden bg-white aspect-square rounded-xl">
        <Image
          src={piece.imageUrl}
          alt={`${piece.brand} ${piece.title}`}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {/* Subtle dark overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
      </div>

      {/* Metadata */}
      <div className="mt-3 transition-opacity duration-300 opacity-60 group-hover:opacity-100">
        <p className="text-[10px] font-light text-gray-400 tracking-[0.2em] uppercase mb-1">
          {piece.brand}
        </p>
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-sm font-light text-gray-900 tracking-wide leading-snug">
            {piece.title}
          </p>
          {piece.price != null && (
            <p className="text-xs font-light text-gray-500 whitespace-nowrap shrink-0">
              {formatPrice(piece.price)}
            </p>
          )}
        </div>
        {piece.subcategory && (
          <p className="text-[10px] font-light text-gray-300 tracking-[0.12em] uppercase mt-0.5">
            {piece.subcategory}
          </p>
        )}
      </div>
    </Link>
  );
}
