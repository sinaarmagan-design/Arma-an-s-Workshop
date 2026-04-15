"use client";

import { useState, useRef } from "react";
import Image from "next/image";

function norm(img, defaultPosition = "center") {
  return typeof img === "string"
    ? { src: img, objectFit: "contain", objectPosition: defaultPosition }
    : { objectPosition: defaultPosition, ...img };
}

const posClass = (p) =>
  ({ top: "object-top", bottom: "object-bottom", left: "object-left", right: "object-right" }[p] ?? "");

export default function ImageGallery({ images, alt, objectPosition = "center", objectFit, imagePadding }) {
  const imgs = images.map((img) => {
    const n = norm(img, objectPosition);
    if (objectFit && !img.objectFit) n.objectFit = objectFit;
    return n;
  });
  const [current, setCurrent] = useState(0);
  const touchStart = useRef(null);

  if (!imgs || imgs.length === 0) return null;

  function prev() {
    setCurrent((c) => Math.max(0, c - 1));
  }
  function next() {
    setCurrent((c) => Math.min(imgs.length - 1, c + 1));
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
          src={imgs[current].src}
          alt={`${alt} — ${current + 1} of ${imgs.length}`}
          fill
          style={imagePadding ? { inset: imagePadding } : undefined}
          className={`${imgs[current].objectFit === "cover" ? "object-cover" : "object-contain"} ${posClass(imgs[current].objectPosition)}`}
          priority={current === 0}
        />

        {/* Side arrows */}
        {imgs.length > 1 && (
          <>
            <button
              onClick={prev}
              disabled={current === 0}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center leading-none text-gray-700 text-sm hover:bg-white/40 transition-colors duration-200 disabled:opacity-20 disabled:cursor-default"
            >
              &#8592;
            </button>
            <button
              onClick={next}
              disabled={current === imgs.length - 1}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center leading-none text-gray-700 text-sm hover:bg-white/40 transition-colors duration-200 disabled:opacity-20 disabled:cursor-default"
            >
              &#8594;
            </button>
          </>
        )}
      </div>

      {/* Dot indicators */}
      {imgs.length > 1 && (
        <div className="flex justify-center gap-2">
          {imgs.map((_, i) => (
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
