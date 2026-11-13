"use client";

import Link from "next/link";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";
import { useLocale } from "../../i18n/LocaleProvider";

export default function Contact() {
  const { locale, messages } = useLocale();
  const { ref, isVisible } = useFadeInOnScroll();

  return (
    <section
      ref={ref}
      className={`py-20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-2xl border border-[#D9C9BB] bg-[#F0E8DF] px-8 py-16 text-center">
          <h2 className="font-serif text-3xl text-[#3D2314]">
            {messages.cta.title}
          </h2>
          <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-[#6B5344]">
            {messages.cta.description}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href={`/${locale}/contact`}
              className="w-full rounded-full bg-[#3D2314] px-8 py-3 text-center font-sans text-sm font-semibold text-white transition-colors hover:bg-[#5a3520] sm:w-auto"
            >
              {messages.cta.contact}
            </Link>

            <a
              href={`https://wa.me/21624029896?text=${encodeURIComponent(messages.contact.whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-full border border-[#D9C9BB] bg-white px-8 py-3 text-center font-sans text-sm font-semibold text-[#3D2314] transition-colors hover:bg-[#FAF8F5] sm:w-auto"
            >
              {messages.cta.whatsapp}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
