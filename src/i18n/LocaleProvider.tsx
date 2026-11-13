"use client";

import { createContext, useContext, useEffect } from "react";
import type { Locale } from "./config";
import { getDirection } from "./config";
import { messages, type Messages } from "./messages";

const LocaleContext = createContext<{ locale: Locale; messages: Messages } | null>(null);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getDirection(locale);
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, messages: messages[locale] }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used inside LocaleProvider");
  return context;
}
