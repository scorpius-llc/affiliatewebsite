"use client";

const normalizeImageSrc = (src, fallbackSrc) => {
  const image = src || fallbackSrc;
  if (!image || image.startsWith('http') || image.startsWith('/')) return image;
  return `/${image}`;
};

export default function ProductImage({ src, fallbackSrc, alt, className }) {
  const handleError = (e) => {
    if (e.currentTarget.src !== fallbackSrc) {
      e.currentTarget.src = fallbackSrc;
    }
  };

  return (
    <img
      src={normalizeImageSrc(src, fallbackSrc)}
      onError={handleError}
      className={className}
      alt={alt}
    />
  );
}
