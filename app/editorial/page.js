import Link from "next/link";
import { editorials } from "@/data/editorials";

export const metadata = {
  title: "Editorial — The Armand Edit",
};

export default function EditorialIndex() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="pt-10 pb-16">
        <p className="text-[10px] font-light tracking-[0.25em] uppercase text-gray-400 mb-3">
          Editorial
        </p>
        <h1 className="font-playfair text-3xl font-medium text-gray-900 tracking-tight">
          The Journal
        </h1>
      </div>

      {editorials.length === 0 ? (
        <p className="text-sm font-light text-gray-400 py-24 text-center tracking-wide">
          Coming soon.
        </p>
      ) : (
        <div className="divide-y divide-gray-100">
          {editorials.map((ed) => (
            <Link
              key={ed.slug}
              href={`/editorial/${ed.slug}`}
              className="group flex flex-col sm:flex-row sm:items-start gap-6 py-10"
            >
              {/* Cover */}
              <div className="w-full sm:w-40 aspect-square rounded-xl overflow-hidden bg-white shrink-0">
                <img
                  src={ed.coverImage}
                  alt={ed.title}
                  className="w-full h-full object-contain group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>

              {/* Info */}
              <div className="flex flex-col justify-center gap-2">
                <p className="text-[9px] font-light tracking-[0.25em] uppercase text-gray-400">
                  {ed.season}
                </p>
                <h2 className="font-playfair text-xl font-medium text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
                  {ed.title}
                </h2>
                <p className="text-sm font-light text-gray-500 leading-relaxed max-w-md">
                  {ed.description}
                </p>
                <p className="text-[10px] font-light tracking-[0.18em] uppercase text-gray-400 mt-1 group-hover:text-gray-700 transition-colors duration-200">
                  Read ↗
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
