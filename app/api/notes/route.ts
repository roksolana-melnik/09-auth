import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = "https://notehub-api.goit.study";

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") || "";
  const { searchParams } = new URL(req.url);
  const params = Object.fromEntries(searchParams.entries());

  const response = await axios.get(`${API_URL}/notes`, {
    params,
    headers: { Cookie: cookieHeader },
    withCredentials: true,
  });

  return NextResponse.json(response.data, { status: response.status });
}

export async function POST(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") || "";
  const body = await req.json();

  const response = await axios.post(`${API_URL}/notes`, body, {
    headers: { Cookie: cookieHeader },
    withCredentials: true,
  });

  return NextResponse.json(response.data, { status: response.status });
}
