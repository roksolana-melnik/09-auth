import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = "https://notehub-api.goit.study";

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") || "";

  try {
    const response = await axios.get(`${API_URL}/auth/session`, {
      headers: { Cookie: cookieHeader },
      withCredentials: true,
    });

    const setCookieHeader = response.headers["set-cookie"];
    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

    if (setCookieHeader) {
      setCookieHeader.forEach((cookie: string) => {
        nextResponse.headers.append("Set-Cookie", cookie);
      });
    }

    return nextResponse;
  } catch {
    return NextResponse.json(null, { status: 200 });
  }
}
