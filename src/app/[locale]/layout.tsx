import type { Metadata } from "next";
import { notFound } from "next/navigation";
import NavBar from "../../components/layout/NavBar";
import Footer from "../../components/sections/Footer";
import { LocaleProvider } from "../../i18n/LocaleProvider";
import { getDirection, isLocale, type Locale } from "../../i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const copy = {
    en: { title: "Crochinesta | Handmade Crochet", description: "Handmade crochet pieces, crafted with care in Tunisia." },
    fr: { title: "Crochinesta | Crochet fait main", description: "Des créations au crochet faites à la main avec soin en Tunisie." },
    ar: { title: "Crochinesta | كروشيه يدوي", description: "قطع كروشيه يدوية مصنوعة بعناية في تونس." },
  };
  return copy[isLocale(locale) ? locale : "en"];
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: routeLocale } = await params;
  if (!isLocale(routeLocale)) notFound();
  const locale: Locale = routeLocale;

  return (
    <LocaleProvider locale={locale}>
      <div>
        <NavBar />
        {children}
        <Footer />
      </div>
    </LocaleProvider>
  );
}
