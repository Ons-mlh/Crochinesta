"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";
import ProductCard from "../ui/ProductCard";
import { useLocale } from "../../i18n/LocaleProvider";

const newReleases = [
  { id: 1, name: "Rust Meadow Tote", price: "$68", image: "/images/placeholder.jpg", isNew: true },
  { id: 2, name: "Sunbeam Coaster Set", price: "$24", image: "/images/placeholder.jpg", isNew: false },
  { id: 3, name: "Moss Loop Pouch", price: "$39", image: "/images/placeholder.jpg", isNew: true },
  { id: 4, name: "Pebble Mini Bag", price: "$52", image: "/images/placeholder.jpg", isNew: false },
  { id: 5, name: "Honey Twist Keychain", price: "$18", image: "/images/placeholder.jpg", isNew: false },
  { id: 6, name: "Dusk Basket", price: "$45", image: "/images/placeholder.jpg", isNew: false },
];

export default function NewReleases() {
  const { locale, messages } = useLocale();
  const { ref, isVisible } = useFadeInOnScroll();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateScrollState = () => {
    const container = scrollRef.current;

    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setShowLeft(scrollLeft > 0);
    setShowRight(scrollLeft + clientWidth < scrollWidth - 4);
    setActiveIndex(Math.round(scrollLeft / 280));
  };

  useEffect(() => {
    updateScrollState();
  }, []);

  return (
    <section
      ref={ref}
      className={`py-20 transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="font-serif text-3xl text-[#3D2314]">{messages.releases.title}</h2>
          <Link href={`/${locale}/products`} className="font-sans text-sm text-[#9B6845] hover:underline">
            {messages.releases.viewAll}
          </Link>
        </div>

        <div className="relative -mx-5 px-5">
          {showLeft ? (
            <button
              type="button"
              aria-label={messages.releases.previous}
              onClick={() => scrollRef.current?.scrollBy({ left: -280, behavior: "smooth" })}
              className="absolute left-0 top-1/2 z-10 flex h-10 w-10 -translate-x-5 -translate-y-1/2 items-center justify-center rounded-full border border-[#D9C9BB] bg-white text-[#3D2314] shadow-sm transition-colors hover:bg-[#F0E8DF]"
            >
              <ChevronLeft size={18} />
            </button>
          ) : null}

          {showRight ? (
            <button
              type="button"
              aria-label={messages.releases.next}
              onClick={() => scrollRef.current?.scrollBy({ left: 280, behavior: "smooth" })}
              className="absolute right-0 top-1/2 z-10 flex h-10 w-10 translate-x-5 -translate-y-1/2 items-center justify-center rounded-full border border-[#D9C9BB] bg-white text-[#3D2314] shadow-sm transition-colors hover:bg-[#F0E8DF]"
            >
              <ChevronRight size={18} />
            </button>
          ) : null}

          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="flex flex-row gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {newReleases.map((product, index) => (
              <ProductCard key={product.id} {...product} name={messages.releases.mockNames[index]} newLabel={messages.releases.new} wishlistAddLabel={messages.releases.wishlistAdd} wishlistRemoveLabel={messages.releases.wishlistRemove} addToCartLabel={messages.releases.addToCart} />
            ))}
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {newReleases.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollRef.current?.scrollTo({ left: index * 280, behavior: "smooth" })}
                aria-label={`${messages.releases.slide} ${index + 1}`}
                className={`transition-all duration-300 ${
                  activeIndex === index ? "h-1.5 w-4 rounded-full bg-[#9B6845]" : "h-1.5 w-1.5 rounded-full bg-[#D9C9BB]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
