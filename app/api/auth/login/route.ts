import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { serialize } from "cookie";

const API_URL = "https://notehub-api.goit.study";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = await axios.post(`${API_URL}/auth/login`, body, {
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
}
