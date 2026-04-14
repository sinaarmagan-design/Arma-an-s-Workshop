"use client";

import { useState } from "react";
import { categories } from "@/data/pieces";
import GalleryGrid from "./GalleryGrid";

const genders = [
  { slug: "men", label: "Men" },
  { slug: "women", label: "Women" },
];

export default function HomeFeed({ pieces }) {
  const [activeGender, setActiveGender] = useState("men");

  // Men always first, then women
  const sorted = [...pieces].sort((a, b) => {
    if (a.section === "men" && b.section !== "men") return -1;
    if (a.section !== "men" && b.section === "men") return 1;
    return 0;
  });

  const displayPieces = sorted.filter((p) => p.section === activeGender);
  const genderCategories = categories[activeGender];

  return (
    <div>
      {/* Gender toggle */}
      <div className="flex items-center border-b border-gray-200 mb-0">
        {genders.map((g) => (
          <button
            key={g.slug}
            onClick={() => setActiveGender(g.slug)}
            className={`text-sm font-light tracking-[0.25em] uppercase pb-4 mr-12 border-b-2 -mb-px transition-colors duration-200 ${
              activeGender === g.slug
                ? "text-gray-900 border-gray-900"
                : "text-gray-400 border-transparent hover:text-gray-700"
            }`}
          >
            {g.label}
          </button>
        ))}
      </div>

      {/* Category filter + grid */}
      <div className="mt-8">
        <GalleryGrid pieces={displayPieces} categories={genderCategories} />
      </div>
    </div>
  );
}
