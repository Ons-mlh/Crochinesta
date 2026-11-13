"use client";

import Image from "next/image";
import { useState } from "react";
import { Clock, Mail, MapPin } from "lucide-react";
import { useLocale } from "../../../i18n/LocaleProvider";

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
  message: string;
};

type ContactErrors = Partial<Record<keyof ContactForm, string>>;

const initialForm: ContactForm = {
  name: "",
  email: "",
  message: "",
};

const inputClassName =
  "w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 font-sans text-sm text-[var(--primary)] placeholder-[var(--muted-foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20";

export default function ContactPage() {
  const { messages } = useLocale();
  const localizedContactInfo = [
    { icon: Mail, label: messages.contact.email, value: "crochinesta@gmail.com" },
    { icon: MapPin, label: messages.contact.location, value: "Moknine, Tunisia" },
    { icon: Clock, label: messages.contact.response, value: messages.contact.responseValue },
  ];
  const whatsappHref = `https://wa.me/21624029896?text=${encodeURIComponent(messages.contact.whatsappMessage)}`;
  const [form, setForm] = useState<ContactForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const updateField = (field: keyof ContactForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleSubmit = async () => {
    const nextErrors: ContactErrors = {};

    Object.entries(form).forEach(([field, value]) => {
      if (!value.trim()) {
        nextErrors[field as keyof ContactForm] = messages.contact.required;
      }
    });

    setErrors(nextErrors);
    setSubmitError(null);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSending(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.fieldErrors) {
          const serverErrors: ContactErrors = {};
          Object.entries(data.fieldErrors).forEach(([field, serverMessages]) => {
            const serverMessage = serverMessages?.[0] || "";
            const translated = serverMessage.includes("Name must")
              ? messages.contact.invalidName
              : serverMessage.includes("email address")
                ? messages.contact.invalidEmail
                : serverMessage.includes("Message must")
                  ? messages.contact.invalidMessage
                  : serverMessage;
            serverErrors[field as keyof ContactForm] = translated;
          });
          setErrors(serverErrors);
        } else {
          setSubmitError(messages.contact.error);
        }
        return;
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError(
        messages.contact.error,
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="font-serif text-4xl text-(--primary)">{messages.contact.title}</h1>
          <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-(--muted-foreground)">
            {messages.contact.intro}
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
            <div>
              <h2 className="mb-6 font-serif text-xl text-(--primary)">
                {messages.contact.direct}
              </h2>

              <div className="flex flex-col gap-4">
                {localizedContactInfo.map(({ icon: Icon, label, value }) => (
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
                  {messages.contact.follow}
                </p>

                <div className="flex flex-col gap-3">
                  {socialLinks.map(({ icon, label, handle, href }) => (
                    <a
                      key={label}
                      href={label === "WhatsApp" ? whatsappHref : href}
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
                  {messages.contact.success}
                </p>
              ) : (
                <>
                  <div>
                    <input
                      type="text"
                      aria-label={messages.contact.name}
                      value={form.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      placeholder={messages.contact.name}
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
                      aria-label={messages.contact.emailPlaceholder}
                      value={form.email}
                      onChange={(event) =>
                        updateField("email", event.target.value)
                      }
                      placeholder={messages.contact.emailPlaceholder}
                      className={inputClassName}
                    />
                    {errors.email ? (
                      <p className="mt-1 font-sans text-xs text-red-600">
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div>
                    <textarea
                      rows={5}
                      aria-label={messages.contact.message}
                      value={form.message}
                      onChange={(event) =>
                        updateField("message", event.target.value)
                      }
                      placeholder={messages.contact.message}
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
                    disabled={sending}
                    className={`mt-2 w-full rounded-full bg-(--primary) py-3 font-sans text-sm font-semibold text-white transition-opacity hover:opacity-90 ${
                      sending ? "cursor-not-allowed opacity-60" : ""
                    }`}
                  >
                    {sending ? messages.contact.sending : messages.contact.send}{" "}
                  </button>
                  {submitError ? (
                    <p className="mt-2 text-center font-sans text-xs text-red-600">
                      {submitError}
                    </p>
                  ) : null}
                </>
              )}
            </div>
          </div>

          <p className="mt-12 text-center font-sans text-sm text-(--muted-foreground)">
            {messages.contact.shipping}
          </p>
        </div>
      </section>
    </>
  );
}
