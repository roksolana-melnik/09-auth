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

export async function POST(req: NextRequest) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  try {
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
