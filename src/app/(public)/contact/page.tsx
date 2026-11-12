"use client";

import Image from "next/image";
import { Clock, Mail, MapPin } from "lucide-react";
import ContactForm from "../../../components/contact/ContactForm";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "crochinesta@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Moknine, Tunisia",
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Usually within 24 hours",
  },
];

const socialLinks = [
  {
    icon: "/insta-logo.png",
    label: "Instagram",
    handle: "@crochinesta",
    href: "https://www.instagram.com/cro.chenista/",
  },
  {
    icon: "/whatsapp-logo.png",
    label: "WhatsApp",
    handle: "+216 24 029 896",
    href: "https://wa.me/21624029896?text=Hi!%20I%27m%20interested%20in%20one%20of%20your%20crochet%20pieces%20%F0%9F%A7%B6",
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="font-serif text-4xl text-(--primary)">
            Get in touch
          </h1>
          <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-(--muted-foreground)">
            Have a question, custom request, or just want to say hi? We&apos;d
            love to hear from you.
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-serif text-xl text-(--primary)">
                Reach us directly
              </h2>

              <div className="flex flex-col gap-4">
                {contactInfo.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-(--border) bg-(--accent)">
                      <Icon size={18} color="var(--primary)" />
                    </span>
                    <div>
                      <p className="font-sans text-sm font-medium text-(--primary)">
                        {label}
                      </p>
                      <p className="font-sans text-xs text-(--muted-foreground)">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="mb-3 font-sans text-sm font-medium text-(--primary)">
                  Follow us
                </p>

                <div className="flex flex-col gap-3">
                  {socialLinks.map(({ icon, label, handle, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3"
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-(--border) bg-(--accent)">
                        <span className="flex h-7 w-7 items-center justify-center overflow-hidden">
                          <Image
                            src={icon}
                            alt={label}
                            width={28}
                            height={28}
                            className="object-cover"
                          />
                        </span>
                      </span>
                      <span>
                        <span className="block font-sans text-sm font-medium text-(--primary)">
                          {label}
                        </span>
                        <span className="block font-sans text-xs text-(--muted-foreground)">
                          {handle}
                        </span>
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <ContactForm />
          </div>

          <p className="mt-12 text-center font-sans text-sm text-(--muted-foreground)">
            Based in Moknine, Tunisia: shipping handmade crochet pieces across
            the country and beyond.
          </p>
        </div>
      </section>
    </>
  );
}
