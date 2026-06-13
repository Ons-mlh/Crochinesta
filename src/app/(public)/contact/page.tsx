"use client";

import Image from "next/image";
import { useState } from "react";
import { Clock, Mail, MapPin } from "lucide-react";

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

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactForm, string>>;

const initialForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

const inputClassName =
  "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 font-sans text-sm text-[var(--primary)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20";

export default function ContactPage() {
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = () => {
    const nextErrors: ContactErrors = {};

    Object.entries(form).forEach(([field, value]) => {
      if (!value.trim()) {
        nextErrors[field as keyof ContactForm] = "This field is required.";
      }
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

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

            <div className="flex flex-col gap-4">
              {submitted ? (
                <p className="py-8 text-center font-sans text-sm text-(--primary)">
                  Thank you for reaching out! We&apos;ll get back to you within
                  24 hours. &#10022;
                </p>
              ) : (
                <>
                  <div>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      placeholder="Name"
                      className={inputClassName}
                    />
                    {errors.name ? (
                      <p className="mt-1 font-sans text-xs text-red-600">
                        {errors.name}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      placeholder="Email"
                      className={inputClassName}
                    />
                    {errors.email ? (
                      <p className="mt-1 font-sans text-xs text-red-600">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <input
                      type="text"
                      value={form.subject}
                      onChange={(event) =>
                        updateField("subject", event.target.value)
                      }
                      placeholder="Subject"
                      className={inputClassName}
                    />
                    {errors.subject ? (
                      <p className="mt-1 font-sans text-xs text-red-600">
                        {errors.subject}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <textarea
                      rows={5}
                      value={form.message}
                      onChange={(event) =>
                        updateField("message", event.target.value)
                      }
                      placeholder="Message"
                      className={inputClassName}
                    />
                    {errors.message ? (
                      <p className="mt-1 font-sans text-xs text-red-600">
                        {errors.message}
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="mt-2 w-full rounded-full bg-(--primary) py-3 font-sans text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Send Message
                  </button>
                </>
              )}
            </div>
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
