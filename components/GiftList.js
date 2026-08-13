"use client";

import { useState } from "react";
import GiftCard from "./GiftCard";

export default function GiftList({ gifts, bank, currency }) {
  const categories = ["All", ...new Set(gifts.map((g) => g.category).filter(Boolean))];
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? gifts : gifts.filter((g) => g.category === active);

  return (
    <div>
      {categories.length > 2 && (
        <div className="flex items-center gap-2 mb-10 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-[10px] font-light tracking-[0.15em] uppercase px-3 py-1.5 border transition-colors duration-200 rounded-full ${
                active === cat
                  ? "border-gray-900 text-gray-900"
                  : "border-gray-300 text-gray-400 hover:text-gray-700 hover:border-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-sm font-light text-gray-400 py-24 text-center tracking-wide">
          Nothing here yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((gift) => (
            <GiftCard key={gift.id} gift={gift} bank={bank} currency={currency} />
          ))}
        </div>
      )}
    </div>
  );
}
