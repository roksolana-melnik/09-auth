import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import axios, { isAxiosError } from "axios";

const API_URL = "https://notehub-api.goit.study";

function logErrorResponse(error: unknown) {
  if (isAxiosError(error) && error.response) {
    console.error("API Error:", error.response.status, error.response.data);
  } else {
    console.error("Unexpected error:", error);
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const { id } = await params;

  try {
    const response = await axios.get(`${API_URL}/notes/${id}`, {
      headers: { Cookie: cookieHeader },
      withCredentials: true,
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    logErrorResponse(error);
    if (isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const { id } = await params;
  const body = await req.json();

  try {
    const response = await axios.patch(`${API_URL}/notes/${id}`, body, {
      headers: { Cookie: cookieHeader },
      withCredentials: true,
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    logErrorResponse(error);
    if (isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const { id } = await params;

  try {
    const response = await axios.delete(`${API_URL}/notes/${id}`, {
      headers: { Cookie: cookieHeader },
      withCredentials: true,
    });
    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    logErrorResponse(error);
    if (isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
