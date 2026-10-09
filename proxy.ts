import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = "https://notehub-api.goit.study";

const privateRoutes = ["/profile", "/notes"];
const publicRoutes = ["/sign-in", "/sign-up"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isPrivate = privateRoutes.some((r) => pathname.startsWith(r));
  const isPublic = publicRoutes.some((r) => pathname.startsWith(r));

  if (!isPrivate && !isPublic) return NextResponse.next();

  const cookieHeader = req.headers.get("cookie") || "";

  let isAuthenticated = false;
  try {
    const { data } = await axios.get(`${API_URL}/auth/session`, {
      headers: { Cookie: cookieHeader },
    });
    isAuthenticated = !!data;
  } catch {
    isAuthenticated = false;
  }

  if (isPrivate && !isAuthenticated) {
    return NextResponse.redirect(new URL("/sign-in", req.url));
  }

  if (isPublic && isAuthenticated) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
