import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { parse, serialize } from "cookie";

const API_URL = "https://notehub-api.goit.study";

export async function POST(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") || "";

  await axios.post(
    `${API_URL}/auth/logout`,
    {},
    {
      headers: { Cookie: cookieHeader },
      withCredentials: true,
    }
  );

  const cookies = parse(cookieHeader);
  const nextResponse = NextResponse.json({}, { status: 200 });

  Object.keys(cookies).forEach((name) => {
    nextResponse.headers.append(
      "Set-Cookie",
      serialize(name, "", { maxAge: 0, path: "/" })
    );
  });

  return nextResponse;
}
