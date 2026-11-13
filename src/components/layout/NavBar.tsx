"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Globe2, Search, ShoppingCart } from "lucide-react";
import logo from "../../../public/logo.png";
import { useLocale } from "../../i18n/LocaleProvider";
import { locales } from "../../i18n/config";

const languageNames = { en: "English", fr: "Français", ar: "العربية" };
const collectionKeys = ["bags", "keychains", "decorations", "accessories"] as const;

export default function NavBar() {
  const { locale, messages } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languagePickerRef = useRef<HTMLDivElement>(null);
  const languageTriggerRef = useRef<HTMLButtonElement>(null);
  const localizedPath = (path: string) => `/${locale}${path === "/" ? "" : path}`;
  const changeLocale = (nextLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    router.push(`${segments.join("/")}${window.location.search}`);
  };

  useEffect(() => {
    if (!isLanguageOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsLanguageOpen(false);
        languageTriggerRef.current?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isLanguageOpen]);

  const links = [
    { label: messages.navigation.home, href: localizedPath("/") },
    { label: messages.navigation.about, href: localizedPath("/about") },
    { label: messages.navigation.contact, href: localizedPath("/contact") },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-primary/10 bg-background/80 backdrop-blur" aria-label={messages.navigation.main}>
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href={localizedPath("/")} className="flex shrink-0 items-center gap-2" aria-label="Crochinesta">
          <Image src={logo} alt="" width={40} height={40} className="rounded-full" />
          <span className="font-serif text-lg font-normal tracking-wide text-primary">Crochinesta</span>
        </Link>

        <div className="hidden items-center gap-6 font-serif text-lg tracking-wide md:flex">
          {links.map((item) => <Link key={item.href} href={item.href} className="text-foreground transition-colors hover:text-primary">{item.label}</Link>)}
          <div className="relative" onMouseEnter={() => setIsProductsOpen(true)} onMouseLeave={() => setIsProductsOpen(false)}>
            <Link href={localizedPath("/products")} className="flex items-center gap-1 text-foreground hover:text-primary" aria-haspopup="true" aria-expanded={isProductsOpen} onFocus={() => setIsProductsOpen(true)} onBlur={(event) => { if (!event.currentTarget.parentElement?.contains(event.relatedTarget as Node)) setIsProductsOpen(false); }}>
              {messages.navigation.products}<ChevronDown size={16} aria-hidden="true" />
            </Link>
            <div className={`absolute start-1/2 top-full min-w-52 -translate-x-1/2 pt-3 ${isProductsOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
              <div className="rounded-2xl border border-primary/10 bg-white py-2 shadow-lg">
                {collectionKeys.map((key) => <Link key={key} href={`${localizedPath("/products")}?collection=${key}`} className="block px-5 py-2.5 text-sm text-foreground hover:bg-primary/5 hover:text-primary">{messages.collections[key]}</Link>)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <div
            className="relative"
            ref={languagePickerRef}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                setIsLanguageOpen(false);
              }
            }}
          >
            <button
              ref={languageTriggerRef}
              type="button"
              aria-label={messages.language}
              aria-expanded={isLanguageOpen}
              aria-controls="language-options"
              onClick={() => setIsLanguageOpen((open) => !open)}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-secondary px-2.5 text-sm font-normal text-primary transition-colors hover:border-primary/30 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <Globe2 size={15} className="text-primary" aria-hidden="true" />
              <span className="hidden sm:inline">{languageNames[locale]}</span>
              <span className="font-sans text-xs uppercase text-muted-foreground sm:hidden">{locale}</span>
              <ChevronDown size={13} className={`text-muted-foreground transition-transform ${isLanguageOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            {isLanguageOpen ? (
              <div
                id="language-options"
                role="group"
                aria-label={messages.language}
                className="absolute end-0 top-full z-50 mt-2 w-44 rounded-xl border border-border bg-background p-1.5 shadow-lg shadow-primary/10"
              >
                <p className="px-2.5 pb-1.5 pt-1 font-serif text-xs text-muted-foreground">{messages.language}</p>
                {locales.map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={option === locale}
                    onClick={() => {
                      setIsLanguageOpen(false);
                      if (option !== locale) changeLocale(option);
                    }}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-start transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${option === locale ? "bg-secondary text-primary" : "text-foreground"}`}
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-white font-sans text-[10px] font-semibold uppercase text-primary">{option}</span>
                    <span className="flex-1 font-serif text-sm">{languageNames[option]}</span>
                    {option === locale ? <Check size={16} className="text-primary" aria-hidden="true" /> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <Link href={localizedPath("/search")} className="rounded-full p-2 hover:bg-primary/5" aria-label={messages.navigation.search}><Search className="text-primary" aria-hidden="true" /></Link>
          <Link href={localizedPath("/cart")} className="rounded-full p-2 hover:bg-primary/5" aria-label={messages.navigation.cart}><ShoppingCart className="text-primary" aria-hidden="true" /></Link>
        </div>
      </div>

      <div className="flex justify-center gap-5 border-t border-primary/5 px-4 py-2 font-serif text-base md:hidden">
        {links.map((item) => <Link key={item.href} href={item.href} className="text-foreground hover:text-primary">{item.label}</Link>)}
        <Link href={localizedPath("/products")} className="text-foreground hover:text-primary">{messages.navigation.products}</Link>
      </div>
    </nav>
  );
}
