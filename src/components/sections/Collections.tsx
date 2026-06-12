"use client";

import Image from "next/image";
import Link from "next/link";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";

const collections = [
  { id: 1, name: "Bags", slug: "/collections/bags", itemCount: 12, image: "/images/placeholder.jpg", featured: true },
  { id: 2, name: "Keychains", slug: "/collections/keychains", itemCount: 8, image: "/images/placeholder.jpg", featured: false },
  { id: 3, name: "Home Decorations", slug: "/collections/decorations", itemCount: 6, image: "/images/placeholder.jpg", featured: false },
  { id: 4, name: "Accessories", slug: "/collections/accessories", itemCount: 10, image: "/images/placeholder.jpg", featured: false },
];

export default function Collections() {
  const { ref, isVisible } = useFadeInOnScroll();

  return (
    <section
      ref={ref}
      className={`py-20 transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-[#3D2314]">Shop by Collection</h2>
          <p className="mt-2 text-sm text-[#9B6845]">Find the perfect piece for every moment</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={collection.slug}
              className="group relative aspect-4/5 cursor-pointer overflow-hidden rounded-2xl bg-[#F0E8DF]"
            >
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent transition-colors duration-300 group-hover:from-black/60" />

              {collection.featured ? (
                <span className="absolute left-3 top-3 rounded-full bg-[#9B6845] px-2.5 py-1 text-[10px] text-white">
                  New
                </span>
              ) : null}

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-lg text-white">{collection.name}</h3>
                <p className="mt-0.5 text-xs text-white/70">{collection.itemCount} items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}