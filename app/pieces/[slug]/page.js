import Image from "next/image";
import Link from "next/link";
import { pieces } from "@/data/pieces";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return pieces.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const piece = pieces.find((p) => p.slug === slug);
  if (!piece) return {};
  return {
    title: `${piece.title} — Armaan's Workshop`,
    description: `${piece.medium}, ${piece.year}. ${piece.dimensions}.`,
  };
}

export default async function PiecePage({ params }) {
  const { slug } = await params;
  const piece = pieces.find((p) => p.slug === slug);
  if (!piece) notFound();

  // Find prev/next for navigation
  const idx = pieces.findIndex((p) => p.slug === slug);
  const prev = idx > 0 ? pieces[idx - 1] : null;
  const next = idx < pieces.length - 1 ? pieces[idx + 1] : null;

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Back link */}
      <Link
        href="/"
        className="text-xs font-light tracking-[0.18em] uppercase text-gray-400 hover:text-gray-900 transition-colors duration-200 inline-flex items-center gap-2 mb-14"
      >
        <span aria-hidden="true">&larr;</span>
        <span>All Works</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 items-start">
        {/* Image */}
        <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
          <Image
            src={piece.imageUrl}
            alt={piece.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
        </div>

        {/* Details */}
        <div className="lg:pt-4 space-y-10">
          <div>
            <h1 className="text-2xl font-light text-gray-900 tracking-tight leading-snug mb-2">
              {piece.title}
            </h1>
            <p className="text-xs font-light text-gray-400 tracking-[0.2em] uppercase">
              {piece.year}
            </p>
          </div>

          <dl className="space-y-7">
            <div>
              <dt className="text-[10px] font-light tracking-[0.25em] uppercase text-gray-400 mb-1.5">
                Medium
              </dt>
              <dd className="text-sm font-light text-gray-800">{piece.medium}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-light tracking-[0.25em] uppercase text-gray-400 mb-1.5">
                Dimensions
              </dt>
              <dd className="text-sm font-light text-gray-800">{piece.dimensions}</dd>
            </div>
          </dl>
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
