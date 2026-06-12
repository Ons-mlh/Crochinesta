"use client";

import Image from "next/image";
import { Heart, ShoppingBag } from "lucide-react";
import { useState } from "react";

type ProductCardProps = {
  id: number | string;
  name: string;
  price: string;
  image: string;
  isNew?: boolean;
};

export default function ProductCard({ name, price, image, isNew = false }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const isPlaceholder = image.includes("placeholder");

  return (
    <article className="w-65 shrink-0 snap-start">
      <div className="group relative aspect-3/4 overflow-hidden rounded-2xl bg-[#F0E8DF]">
        {isPlaceholder ? (
          <div className="absolute inset-0 bg-linear-to-br from-[#F0E8DF] via-[#E8DCCE] to-[#D9C9BB]" aria-hidden="true" />
        ) : (
          <Image
            src={image}
            alt={name}
            fill
            sizes="260px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}

        <button
          type="button"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          onClick={() => setIsWishlisted((current) => !current)}
          className="absolute right-3 top-3 z-10"
        >
          <Heart
            size={18}
            className={isWishlisted ? "fill-[#9B6845] text-[#9B6845]" : "text-[#D9C9BB]"}
          />
        </button>

        <button
          type="button"
          aria-label="Add to cart"
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#3D2314] text-white opacity-0 transition-opacity group-hover:opacity-100"
        >
          <ShoppingBag size={16} />
        </button>
      </div>

      <div className="mt-3 flex items-start gap-2">
        <h3 className="text-sm font-medium text-[#3D2314]">{name}</h3>
        {isNew ? (
          <span className="rounded-full bg-[#3D2314] px-2 py-0.5 text-[10px] text-white">
            New
          </span>
        ) : null}
      </div>
      <p className="mt-1 text-sm font-semibold text-[#9B6845]">{price}</p>
    </article>
  );
}