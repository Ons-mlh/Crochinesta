"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Leaf, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { useFadeInOnScroll } from "../../../components/hooks/useFadeInOnScroll";

function FadeInSection({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const { ref, isVisible } = useFadeInOnScroll();

  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      } ${className}`}
    >
      {children}
    </section>
  );
}

const values = [
  {
    icon: Heart,
    iconBg: "bg-(--accent)",
    title: "Made with love",
    description:
      "Every stitch carries care, patience, and a personal touch you can feel.",
  },
  {
    icon: Leaf,
    iconBg: "bg-[#eef2e6]",
    title: "Sustainable materials",
    description:
      "We choose quality yarns thoughtfully, creating pieces meant to last.",
  },
  {
    icon: Sparkles,
    iconBg: "bg-[#f5ece4]",
    title: "One of a kind",
    description:
      "No two pieces are exactly alike -- each one has its own character.",
  },
];

export default function AboutPage() {
  return (
    <>
      <FadeInSection className="py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-(--muted-foreground)">
                Our story
              </p>
              <h1 className="font-serif text-5xl leading-tight tracking-wide text-(--primary) lg:text-6xl">
                <span className="block">Made by hand,</span>
                <span className="block">made with heart</span>
              </h1>
              <p className="max-w-xl font-sans text-lg leading-relaxed text-(--muted-foreground) md:text-xl">
                Crochinesta began as a small passion project. Every piece you
                see here is crocheted by hand, one stitch at a time, with care
                and patience.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <span className="rounded-full border border-(--border) bg-(--accent) px-3 py-1 font-sans text-xs font-medium text-(--primary)">
                100% Handmade
              </span>
              <span className="rounded-full border border-(--border) bg-(--accent) px-3 py-1 font-sans text-xs font-medium text-(--primary)">
                Stitched in Sousse
              </span>
              <span className="rounded-full border border-(--border) bg-(--accent) px-3 py-1 font-sans text-xs font-medium text-(--primary)">
                Made with love
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/products"
                className="rounded-full bg-(--primary) px-8 py-3 font-sans font-semibold text-white transition-opacity hover:opacity-90"
              >
                Shop Now
              </Link>
            </div>
          </div>

          <div className="relative order-first mx-auto w-full max-w-lg md:order-last md:mx-0">
            <div className="relative aspect-4/5 w-full overflow-hidden rounded-2xl bg-(--accent) shadow-[8px_12px_32px_rgba(180,140,100,0.25)] transition-transform duration-300 hover:rotate-0 md:-rotate-1">
              <Image
                src="/images/about-hero.jpg"
                alt="Handmade crochet work in progress"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] blur-3xl" />
            <div className="absolute -bottom-4 -left-4 flex h-24 w-24 -rotate-3 items-center justify-center rounded-2xl border border-(--border) bg-(--secondary)">
              <Heart size={24} color="var(--primary)" />
            </div>
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2">
          <div className="relative aspect-square rotate-1deg overflow-hidden rounded-2xl bg-(--accent) shadow-[8px_12px_32px_rgba(180,140,100,0.2)] transition-transform duration-300 hover:rotate-0">
            <Image
              src="/images/about-hero.jpg"
              alt="Handmade crochet work in progress"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <h2 className="mb-4 font-serif text-2xl text-(--primary)">
              How it all started
            </h2>
            <p className="mb-4 font-sans text-sm leading-relaxed text-(--muted-foreground)">
              It all started at home, with a few balls of yarn and a love for
              creating something beautiful with our own hands. What began as
              gifts for friends and family slowly turned into Crochinesta.
            </p>
            <p className="mb-4 font-sans text-sm leading-relaxed text-(--muted-foreground)">
              Today, every bag, keychain, and decoration is still made the same
              way: by hand, with attention to every detail, because that&apos;s
              what makes each piece truly one of a kind.
            </p>
          </div>
        </div>
      </FadeInSection>

      <div className="mx-auto h-px w-full max-w-6xl bg-(--border)" />

      <FadeInSection className="py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center font-serif text-3xl text-(--primary)">
            What we believe in
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map(({ icon: Icon, iconBg, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-(--border) bg-white p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-(--primary)/30"
              >
                <div
                  className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${iconBg}`}
                >
                  <Icon size={22} color="var(--primary)" />
                </div>
                <h3 className="mb-2 font-serif text-lg text-(--primary)">
                  {title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-(--muted-foreground)">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </FadeInSection>

      <FadeInSection className="mx-auto my-10 max-w-4xl rounded-2xl border border-(--border) bg-(--secondary) px-8 py-20 md:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <Sparkles
            size={28}
            color="var(--primary)"
            className="mx-auto mb-4 opacity-50"
          />
          <h2 className="mb-4 font-serif text-2xl text-(--primary)">
            Discover our collection
          </h2>
          <Link
            href="/products"
            className="inline-flex rounded-full bg-(--primary) px-8 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            Shop Now
          </Link>
        </div>
      </FadeInSection>
    </>
  );
}
