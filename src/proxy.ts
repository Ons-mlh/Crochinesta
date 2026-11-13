import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "./i18n/config";

export function proxy(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const firstPathSegment = request.nextUrl.pathname.split("/")[1];
  if (!firstPathSegment || !isLocale(firstPathSegment)) {
    const localizedUrl = request.nextUrl.clone();
    localizedUrl.pathname = `/${defaultLocale}${request.nextUrl.pathname}`;
    return NextResponse.redirect(localizedUrl);
  }
  requestHeaders.set(
    "x-locale",
    firstPathSegment,
  );

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
