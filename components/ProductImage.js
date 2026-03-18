"use client";

import Image from 'next/image'; // Using next/image for optimization is a good practice, but we'll stick to img for now to match your code.

export default function ProductImage({ src, fallbackSrc, alt, className }) {
  const handleError = (e) => {
    if (e.currentTarget.src !== fallbackSrc) {
      e.currentTarget.src = fallbackSrc;
    }
  };

  return (
    <img
      src={src || fallbackSrc}
      onError={handleError}
      className={className}
      alt={alt}
    />
  );
}
