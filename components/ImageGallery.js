"use client";

import { useState, useRef } from "react";
import Image from "next/image";

export default function ImageGallery({ images, alt }) {
  const [current, setCurrent] = useState(0);
  const touchStart = useRef(null);

  if (!images || images.length === 0) return null;

  function prev() {
    setCurrent((c) => Math.max(0, c - 1));
  }
  function next() {
    setCurrent((c) => Math.min(images.length - 1, c + 1));
  }

  function onTouchStart(e) {
    touchStart.current = e.touches[0].clientX;
  }
  function onTouchEnd(e) {
    if (touchStart.current === null) return;
    const delta = touchStart.current - e.changedTouches[0].clientX;
    if (delta > 50) next();
    else if (delta < -50) prev();
    touchStart.current = null;
  }

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div
        className="relative w-full aspect-square bg-white overflow-hidden rounded-xl select-none"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={images[current]}
          alt={`${alt} — ${current + 1} of ${images.length}`}
          fill
          className="object-cover"
          priority={current === 0}
        />

        {/* Arrow buttons */}
        {images.length > 1 && (
          <>
            {current > 0 && (
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors duration-200 shadow-sm"
              >
                &#8592;
              </button>
            )}
            {current < images.length - 1 && (
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-700 hover:bg-white transition-colors duration-200 shadow-sm"
              >
                &#8594;
              </button>
            )}
          </>
        )}
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to image ${i + 1}`}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                i === current ? "bg-gray-900" : "bg-gray-300 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
