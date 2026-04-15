import { notFound } from "next/navigation";
import { editorials } from "@/data/editorials";
import { pieces } from "@/data/pieces";
import PieceCard from "@/components/PieceCard";
import Link from "next/link";

export async function generateStaticParams() {
  return editorials.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ed = editorials.find((e) => e.slug === slug);
  if (!ed) return {};
  return {
    title: `${ed.title} — The Armand Edit`,
    description: ed.description,
  };
}

export default async function EditorialPage({ params }) {
  const { slug } = await params;
  const ed = editorials.find((e) => e.slug === slug);
  if (!ed) notFound();

  const edPieces = (ed.pieces ?? [])
    .map((s) => pieces.find((p) => p.slug === s))
    .filter(Boolean);

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Back */}
      <Link
        href="/editorial"
        className="text-xs font-light tracking-[0.18em] uppercase text-gray-400 hover:text-gray-900 transition-colors duration-200 inline-flex items-center gap-2 mb-14"
      >
        <span aria-hidden="true">&larr;</span>
        <span>Editorial</span>
      </Link>

      {/* Header */}
      <div className="max-w-2xl mb-16">
        <p className="text-[9px] font-light tracking-[0.3em] uppercase text-gray-400 mb-4">
          {ed.season}
        </p>
        <h1 className="font-playfair text-4xl font-medium text-gray-900 tracking-tight leading-tight mb-6">
          {ed.title}
        </h1>
        <p className="text-sm font-light text-gray-500 leading-7">
          {ed.description}
        </p>
      </div>

      {/* Body text */}
      {ed.body && (
        <div className="max-w-xl mb-20 pb-16 border-b border-gray-100">
          <p className="text-sm font-light text-gray-700 leading-8">{ed.body}</p>
        </div>
      )}

      {/* Pieces */}
      {edPieces.length > 0 && (
        <div>
          <p className="text-[10px] font-light tracking-[0.25em] uppercase text-gray-400 mb-10">
            The Selection
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
            {edPieces.map((p) => (
              <PieceCard key={p.id} piece={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
