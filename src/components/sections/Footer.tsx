"use client";

import Link from "next/link";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";
import { useLocale } from "../../i18n/LocaleProvider";

export default function Footer() {
  const { locale, messages } = useLocale();
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
          <p className="mt-1 font-sans text-xs text-white/50">{messages.footer.tagline}</p>
        </div>

        <nav className="flex flex-row gap-6 font-sans text-sm text-white/60">
          {[
            { label: messages.navigation.home, href: `/${locale}` },
            { label: messages.navigation.about, href: `/${locale}/about` },
            { label: messages.navigation.products, href: `/${locale}/products` },
            { label: messages.navigation.contact, href: `/${locale}/contact` },
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

        <p className="font-sans text-sm text-gray-400">
          {messages.footer.madeBy}{" "}
          <a
            href="https://www.linkedin.com/in/ons-el-maleh-648531300/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#d9c9bb] decoration-[#c9b6a6] transition-colors hover:text-[#efe9e4] hover:decoration-[#efe9e4]"
          >
            Ons El Maleh
          </a>
        </p>
      </div>
    </footer>
  );
}
