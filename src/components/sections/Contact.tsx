"use client";

import Image from "next/image";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";
import ContactForm from "../contact/ContactForm";

export default function Contact() {
  const { ref, isVisible } = useFadeInOnScroll();
  return (
    <section
      ref={ref}
      className={`py-20 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 px-6 md:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl text-[#3D2314]">Get in touch</h2>
          <p className="mt-3 max-w-xs font-sans text-sm leading-relaxed text-[#6B5344]">
            Have a custom order in mind? Want to know more about a product? We&apos;d love to hear from you.
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {[
              { label: "Instagram", handle: "@crochinesta", icon: "/insta-logo.png", href: "https://www.instagram.com/cro.chenista/" },
              { label: "WhatsApp", handle: "+216 24 029 896", icon: "/whatsapp-logo.png", href: "https://wa.me/21624029896" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D9C9BB] bg-[#F0E8DF]">
                  <Image src={item.icon} alt={item.label} width={28} height={28} className="rounded-full object-contain" />
                </span>
                <div>
                  <p className="font-sans text-sm font-medium text-[#3D2314]">{item.label}</p>
                  <p className="font-sans text-xs text-[#9B6845]"><a href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.handle}
                  </a></p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ContactForm includeSubject={false} />
      </div>
    </section>
  );
}
