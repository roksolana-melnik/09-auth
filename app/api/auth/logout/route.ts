import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

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

  const nextResponse = NextResponse.json({}, { status: 200 });

  req.cookies.getAll().forEach(({ name }) => {
    nextResponse.cookies.set(name, "", { maxAge: 0, path: "/" });
  });

  return nextResponse;
}
