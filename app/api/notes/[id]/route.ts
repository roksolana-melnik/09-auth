import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const API_URL = "https://notehub-api.goit.study";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieHeader = req.headers.get("cookie") || "";
  const { id } = await params;

  const response = await axios.get(`${API_URL}/notes/${id}`, {
    headers: { Cookie: cookieHeader },
    withCredentials: true,
  });

  return NextResponse.json(response.data, { status: response.status });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieHeader = req.headers.get("cookie") || "";
  const { id } = await params;

  const response = await axios.delete(`${API_URL}/notes/${id}`, {
    headers: { Cookie: cookieHeader },
    withCredentials: true,
  });

  return NextResponse.json(response.data, { status: response.status });
}
