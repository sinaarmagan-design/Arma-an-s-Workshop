import Image from "next/image";
import Link from "next/link";
import { pieces } from "@/data/pieces";
import { notFound } from "next/navigation";
import ImageGallery from "@/components/ImageGallery";

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export async function generateStaticParams() {
  return pieces.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const piece = pieces.find((p) => p.slug === slug);
  if (!piece) return {};
  return {
    title: `${piece.brand} ${piece.title} — The Armand Edit`,
    description: `${piece.brand} ${piece.title}, ${piece.year}. ${piece.subcategory ?? piece.category}.`,
  };
}

export default async function PiecePage({ params }) {
  const { slug } = await params;
  const piece = pieces.find((p) => p.slug === slug);
  if (!piece) notFound();

  const idx = pieces.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? pieces[idx - 1] : null;
  const next = idx < pieces.length - 1 ? pieces[idx + 1] : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href={`/${piece.section}`}
        className="text-xs font-light tracking-[0.18em] uppercase text-gray-400 hover:text-gray-900 transition-colors duration-200 inline-flex items-center gap-2 mb-14"
      >
        <span aria-hidden="true">&larr;</span>
        <span>{piece.section}</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 items-start">
        {/* Image / Gallery */}
        <ImageGallery
          images={piece.images ?? [piece.imageUrl]}
          alt={`${piece.brand} ${piece.title}`}
        />

        {/* Details */}
        <div className="lg:pt-4 space-y-10">
          <div>
            <p className="text-[10px] font-light text-gray-400 tracking-[0.25em] uppercase mb-2">
              {piece.brand}
            </p>
            <h1 className="text-2xl font-light text-gray-900 tracking-tight leading-snug mb-3">
              {piece.title}
            </h1>
            {piece.price != null && (
              <p className="text-lg font-light text-gray-700 tracking-wide">
                {formatPrice(piece.price)}
              </p>
            )}
          </div>

          <dl className="space-y-7">
            {piece.year != null && (
              <div>
                <dt className="text-[10px] font-light tracking-[0.25em] uppercase text-gray-400 mb-1.5">
                  Year
                </dt>
                <dd className="text-sm font-light text-gray-800">{piece.year}</dd>
              </div>
            )}

            <div>
              <dt className="text-[10px] font-light tracking-[0.25em] uppercase text-gray-400 mb-1.5">
                Category
              </dt>
              <dd className="text-sm font-light text-gray-800 capitalize">
                {piece.subcategory
                  ? `${piece.subcategory} · ${piece.category}`
                  : piece.category}
              </dd>
            </div>
          </dl>

          {piece.link && (
            <a
              href={piece.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-light tracking-[0.18em] uppercase text-gray-400 hover:text-gray-900 transition-colors duration-200"
            >
              <span>Shop</span>
              <span aria-hidden="true" className="text-[10px]">↗</span>
            </a>
          )}
        </div>
      </div>

      {/* Prev / Next navigation */}
      {(prev || next) && (
        <nav className="mt-20 pt-10 border-t border-gray-100 flex items-center justify-between">
          {prev ? (
            <Link
              href={`/pieces/${prev.slug}`}
              className="group flex flex-col gap-1"
            >
              <span className="text-[10px] font-light tracking-[0.2em] uppercase text-gray-400 group-hover:text-gray-900 transition-colors duration-200">
                &larr; &nbsp; Previous
              </span>
              <span className="text-xs font-light text-gray-400 group-hover:text-gray-600 transition-colors duration-200 uppercase tracking-[0.15em]">
                {prev.brand}
              </span>
              <span className="text-sm font-light text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                {prev.title}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              href={`/pieces/${next.slug}`}
              className="group flex flex-col gap-1 text-right"
            >
              <span className="text-[10px] font-light tracking-[0.2em] uppercase text-gray-400 group-hover:text-gray-900 transition-colors duration-200">
                Next &nbsp; &rarr;
              </span>
              <span className="text-xs font-light text-gray-400 group-hover:text-gray-600 transition-colors duration-200 uppercase tracking-[0.15em]">
                {next.brand}
              </span>
              <span className="text-sm font-light text-gray-600 group-hover:text-gray-900 transition-colors duration-200">
                {next.title}
              </span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}
    </div>
  );
}
