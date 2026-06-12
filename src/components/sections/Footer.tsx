"use client";

import Link from "next/link";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";

export default function Footer() {
  const { ref, isVisible } = useFadeInOnScroll();

  return (
    <footer
      ref={ref}
      className={`bg-[#3D2314] py-8 text-white transition-all duration-700 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 md:flex-row">
        <div>
          <p className="font-serif text-xl">Crochinesta</p>
          <p className="mt-1 text-xs text-white/50">Handmade with love.</p>
        </div>

        <nav className="flex flex-row gap-6 text-sm text-white/60">
          {[
            { label: "Home", href: "/" },
            { label: "About", href: "/about" },
            { label: "Products", href: "/products" },
            { label: "Contact", href: "/contact" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <p className="text-sm text-gray-400">
          Made with 🤎 by{" "}
          <a
            href="https://www.linkedin.com/in/ons-el-maleh-648531300/"
            target="_blank"
            rel="noopener noreferrer"
            className=" text-[#d9c9bb] hover:text-[#efe9e4] decoration-[#c9b6a6] hover:decoration-[#efe9e4] transition-colors"
          >
            Ons El Maleh
          </a>
        </p>
      </div>
    </footer>
  );
}
