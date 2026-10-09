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

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

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
  } catch (error) {
    logErrorResponse(error);
    if (isAxiosError(error) && error.response) {
      return NextResponse.json(error.response.data, {
        status: error.response.status,
      });
    }
    return NextResponse.json(null, { status: 200 });
  }
}
