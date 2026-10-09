import { NextRequest, NextResponse } from "next/server";
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
  const body = await req.json();

  try {
    const response = await axios.post(`${API_URL}/auth/register`, body, {
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
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
