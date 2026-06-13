"use client";

import Image from "next/image";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";

export default function Hero() {
  const { ref, isVisible } = useFadeInOnScroll();

  return (
    <section
      ref={ref}
      className={`py-20 transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="font-serif text-5xl leading-tight tracking-wide text-[#3D2314] lg:text-6xl">
              <span className="block">Handmade</span>
              <span className="block">
                Crochet <span className="text-[#9B6845]">Products</span>
              </span>
            </h1>

            <p className="max-w-xl font-sans text-lg leading-relaxed text-[#6B5344] md:text-xl">
              Made with heart, stitched by hand. Discover beautiful, artisan-crafted crochet pieces that bring warmth and personality to your home.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <span className="rounded-full border border-[#D9C9BB] bg-[#F0E8DF] px-3 py-1 font-sans text-xs font-medium text-[#3D2314]">
              100% Handmade
            </span>
            <span className="rounded-full border border-[#D9C9BB] bg-[#F0E8DF] px-3 py-1 font-sans text-xs font-medium text-[#3D2314]">
              Custom orders welcome
            </span>
            <span className="rounded-full border border-[#D9C9BB] bg-[#F0E8DF] px-3 py-1 font-sans text-xs font-medium text-[#3D2314]">
              Ships all across Tunisia
            </span>
          </div>

          <div className="flex flex-wrap gap-4">
            <button className="rounded-full bg-[#3D2314] px-8 py-3 font-sans font-semibold text-white transition-colors hover:bg-[#5a3520]">
              Shop Now
            </button>
            <button className="rounded-full border border-[#3D2314] px-8 py-3 font-sans font-semibold text-[#3D2314] transition-colors hover:bg-[#F0E8DF]">
              Learn More
            </button>
          </div>
        </div>

        <div className="relative order-first mx-auto w-full max-w-lg md:order-last md:mx-0">
          <div
            className="relative w-full overflow-hidden rounded-2xl shadow-[8px_12px_32px_rgba(180,140,100,0.25)] transition-transform duration-300 hover:rotate-0 md:-rotate-1"
            style={{ height: "30rem" }}
          >
            {/* <Image
              src="/images/placeholder.jpg"
              alt="Handmade crochet products"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 42vw"
              className="object-cover"
            /> */}
          </div>
          <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-[#3D2314]/10 blur-3xl" />
        </div>
      </div>
    </section>
  );
}
