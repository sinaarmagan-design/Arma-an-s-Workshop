"use client";

import { useState, useRef } from "react";
import Image from "next/image";

function norm(img, defaultPosition = "center") {
  return typeof img === "string"
    ? { src: img, objectFit: "cover", objectPosition: defaultPosition }
    : { objectPosition: defaultPosition, ...img };
}

const posClass = (p) =>
  ({ top: "object-top", bottom: "object-bottom", left: "object-left", right: "object-right" }[p] ?? "object-center");

export default function ImageGallery({ images, alt, objectPosition = "center" }) {
  const imgs = images.map((img) => norm(img, objectPosition));
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
          className={`${imgs[current].objectFit === "contain" ? "object-contain" : "object-cover"} ${posClass(imgs[current].objectPosition)}`}
          priority={current === 0}
        />

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
