import Image from "next/image";
import Link from "next/link";
import { pieces } from "@/data/pieces";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return pieces.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const piece = pieces.find((p) => p.slug === params.slug);
  if (!piece) return {};
  return { title: `${piece.title} — Armaan's Workshop` };
}

export default function PiecePage({ params }) {
  const piece = pieces.find((p) => p.slug === params.slug);
  if (!piece) notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="text-xs font-light tracking-widest uppercase text-gray-400 hover:text-gray-900 transition-colors duration-200 inline-block mb-12"
      >
        &larr; &nbsp; All Works
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Image */}
        <div className="relative w-full aspect-[3/4] bg-gray-100 overflow-hidden">
          <Image
            src={piece.imageUrl}
            alt={piece.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        {/* Details */}
        <div className="lg:pt-8">
          <h1 className="text-3xl font-light text-gray-900 tracking-tight mb-2">
            {piece.title}
          </h1>
          <p className="text-sm font-light text-gray-400 tracking-widest uppercase mb-12">
            {piece.year}
          </p>

          <dl className="space-y-6">
            <div>
              <dt className="text-xs font-light tracking-widest uppercase text-gray-400 mb-1">
                Medium
              </dt>
              <dd className="text-sm font-light text-gray-900">{piece.medium}</dd>
            </div>
            <div>
              <dt className="text-xs font-light tracking-widest uppercase text-gray-400 mb-1">
                Dimensions
              </dt>
              <dd className="text-sm font-light text-gray-900">{piece.dimensions}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
