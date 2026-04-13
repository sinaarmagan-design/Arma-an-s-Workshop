import { notFound } from "next/navigation";
import { pieces, categories, sections } from "@/data/pieces";
import GalleryGrid from "@/components/GalleryGrid";

export async function generateStaticParams() {
  return sections.map((s) => ({ section: s.slug }));
}

export async function generateMetadata({ params }) {
  const { section } = await params;
  const s = sections.find((s) => s.slug === section);
  if (!s) return {};
  return {
    title: `${s.label} — The Armand Edit`,
    description: `Curated ${s.label.toLowerCase()} goods from The Armand Edit.`,
  };
}

export default async function SectionPage({ params }) {
  const { section } = await params;
  const sectionData = sections.find((s) => s.slug === section);
  if (!sectionData) notFound();

  const sectionPieces = pieces.filter((p) => p.section === section);
  const sectionCategories = categories[section];

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-14">
        <h1 className="text-3xl font-light text-gray-900 tracking-tight">
          {sectionData.label}
        </h1>
      </div>

      <GalleryGrid pieces={sectionPieces} categories={sectionCategories} />
    </div>
  );
}
