import "./globals.css";
import { headers } from "next/headers";
import { IM_Fell_French_Canon_SC } from "next/font/google";
import { defaultLocale, getDirection, isLocale } from "../i18n/config";

const headingFont = IM_Fell_French_Canon_SC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const requestedLocale = requestHeaders.get("x-locale") ?? defaultLocale;
  const locale = isLocale(requestedLocale) ? requestedLocale : defaultLocale;

  return (
    <html lang={locale} dir={getDirection(locale)}>
      <body className={headingFont.variable}>{children}</body>
    </html>
  );
}
