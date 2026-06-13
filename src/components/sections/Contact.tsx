"use client";

import { useState } from "react";
import Image from "next/image";
import { useFadeInOnScroll } from "../hooks/useFadeInOnScroll";

export default function Contact() {
  const { ref, isVisible } = useFadeInOnScroll();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

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

        <div className="flex flex-col gap-4">
          {submitted ? (
            <p className="rounded-2xl border border-[#D9C9BB] bg-white px-4 py-5 font-sans text-sm text-[#9B6845]">
              Thank you! We&apos;ll get back to you soon. ✦
            </p>
          ) : (
            <>
              <input
                type="text"
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Name"
                className="w-full rounded-xl border border-[#D9C9BB] bg-white px-4 py-3 font-sans text-sm text-[#3D2314] placeholder-[#B8A898] focus:outline-none focus:ring-2 focus:ring-[#9B6845]/30"
              />
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                placeholder="Email"
                className="w-full rounded-xl border border-[#D9C9BB] bg-white px-4 py-3 font-sans text-sm text-[#3D2314] placeholder-[#B8A898] focus:outline-none focus:ring-2 focus:ring-[#9B6845]/30"
              />
              <textarea
                rows={4}
                value={form.message}
                onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
                placeholder="Message"
                className="w-full rounded-xl border border-[#D9C9BB] bg-white px-4 py-3 font-sans text-sm text-[#3D2314] placeholder-[#B8A898] focus:outline-none focus:ring-2 focus:ring-[#9B6845]/30"
              />
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="mt-2 w-full rounded-full bg-[#3D2314] py-3 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#5a3520]"
              >
                Send Message
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
