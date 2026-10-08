import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = "https://notehub-api.goit.study";

export async function GET(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") || "";

  const response = await axios.get(`${API_URL}/users/me`, {
    headers: { Cookie: cookieHeader },
    withCredentials: true,
  });

  return NextResponse.json(response.data, { status: response.status });
}

export async function PATCH(req: NextRequest) {
  const cookieHeader = req.headers.get("cookie") || "";
  const body = await req.json();

  const response = await axios.patch(`${API_URL}/users/me`, body, {
    headers: { Cookie: cookieHeader },
    withCredentials: true,
  });

  return NextResponse.json(response.data, { status: response.status });
}
