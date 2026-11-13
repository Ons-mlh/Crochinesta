"use client";

import Image from "next/image";
import Link from "next/link";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";
import { useLocale } from "../../i18n/LocaleProvider";

const collections = [
  { id: 1, key: "bags", slug: "/collections/bags", itemCount: 12, image: "/images/placeholder.jpg", featured: true },
  { id: 2, key: "keychains", slug: "/collections/keychains", itemCount: 8, image: "/images/placeholder.jpg", featured: false },
  { id: 3, key: "decorations", slug: "/collections/decorations", itemCount: 6, image: "/images/placeholder.jpg", featured: false },
  { id: 4, key: "accessories", slug: "/collections/accessories", itemCount: 10, image: "/images/placeholder.jpg", featured: false },
] as const;

export default function Collections() {
  const { locale, messages } = useLocale();
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
          <h2 className="font-serif text-3xl text-[#3D2314]">{messages.collections.title}</h2>
          <p className="mt-2 font-sans text-sm text-[#9B6845]">{messages.collections.description}</p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/${locale}${collection.slug}`}
              className="group relative aspect-4/5 cursor-pointer overflow-hidden rounded-2xl bg-[#F0E8DF]"
            >
              <Image
                src={collection.image}
                alt={messages.collections[collection.key]}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent transition-colors duration-300 group-hover:from-black/60" />

              {collection.featured ? (
                <span className="absolute left-3 top-3 rounded-full bg-[#9B6845] px-2.5 py-1 font-sans text-[10px] text-white">
                  {messages.collections.new}
                </span>
              ) : null}

              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="font-serif text-lg text-white">{messages.collections[collection.key]}</h3>
                <p className="mt-0.5 font-sans text-xs text-white/70">{collection.itemCount} {messages.collections.items}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
