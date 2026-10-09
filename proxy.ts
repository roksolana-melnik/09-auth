import { NextRequest, NextResponse } from "next/server";

const API_URL = "https://notehub-api.goit.study";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPrivate = privateRoutes.some((r) => pathname.startsWith(r));
  const isPublic = publicRoutes.some((r) => pathname.startsWith(r));

  if (!isPrivate && !isPublic) return NextResponse.next();

  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!accessToken && !refreshToken) {
    if (isPrivate) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    return NextResponse.next();
  }

  if (!accessToken && refreshToken) {
    try {
      const res = await fetch(`${API_URL}/auth/session`, {
        headers: { Cookie: req.headers.get("cookie") || "" },
      });
      const nextResponse = NextResponse.next();
      const setCookie = res.headers.get("set-cookie");
      if (setCookie) {
        nextResponse.headers.set("set-cookie", setCookie);
      }
      if (!res.ok) {
        if (isPrivate) {
          return NextResponse.redirect(new URL("/sign-in", req.url));
        }
      }
      return nextResponse;
    } catch {
      if (isPrivate) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
      }
      return NextResponse.next();
    }
  }

  if (isPublic) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
