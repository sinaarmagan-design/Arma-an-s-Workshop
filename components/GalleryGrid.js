"use client";

import { useState } from "react";
import PieceCard from "./PieceCard";
import { categories } from "@/data/pieces";

export default function GalleryGrid({ pieces }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeSubcategory, setActiveSubcategory] = useState(null);

  const currentCat = categories.find((c) => c.slug === activeCategory);
  const subcategories = currentCat?.subcategories ?? [];

  const filtered = pieces.filter((p) => {
    if (activeCategory !== "all" && p.category !== activeCategory) return false;
    if (activeSubcategory && p.subcategory !== activeSubcategory) return false;
    return true;
  });

  function handleCategoryClick(slug) {
    setActiveCategory(slug);
    setActiveSubcategory(null);
  }

  return (
    <div>
      {/* Category tabs */}
      <div className="flex items-center gap-8 mb-6 border-b border-gray-100 overflow-x-auto">
        {categories.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => handleCategoryClick(cat.slug)}
            className={`text-xs font-light tracking-[0.18em] uppercase whitespace-nowrap transition-colors duration-200 pb-4 border-b-[1.5px] -mb-px ${
              activeCategory === cat.slug
                ? "text-gray-900 border-gray-900"
                : "text-gray-400 border-transparent hover:text-gray-700"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Subcategory pills */}
      {subcategories.length > 0 && (
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          <button
            onClick={() => setActiveSubcategory(null)}
            className={`text-[10px] font-light tracking-[0.15em] uppercase px-3 py-1.5 border transition-colors duration-200 ${
              !activeSubcategory
                ? "border-gray-900 text-gray-900"
                : "border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-400"
            }`}
          >
            All
          </button>
          {subcategories.map((sub) => (
            <button
              key={sub}
              onClick={() =>
                setActiveSubcategory(sub === activeSubcategory ? null : sub)
              }
              className={`text-[10px] font-light tracking-[0.15em] uppercase px-3 py-1.5 border transition-colors duration-200 ${
                activeSubcategory === sub
                  ? "border-gray-900 text-gray-900"
                  : "border-gray-200 text-gray-400 hover:text-gray-700 hover:border-gray-400"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {filtered.length === 0 && (
        <p className="text-sm font-light text-gray-400 py-24 text-center tracking-wide">
          Nothing here yet.
        </p>
      )}

      {/* Grid */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {filtered.map((piece) => (
            <PieceCard key={piece.id} piece={piece} />
          ))}
        </div>
      )}
    </div>
  );
}
