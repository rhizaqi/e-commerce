import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./app/db/helpers/jose";

type JWTPayload = {
  id: string;
  email: string;
  iat: number;
};

export async function middleware(request: NextRequest) {
  try {
    let cookieAuth = cookies().get("Authorization");

    if (!cookieAuth) {
      throw new Error("Invalid token");
    }

    const token = cookieAuth.value.split(" ")[1];

    // console.log(cookieAuth, `,<<< dapat kan yah?`);
    const payload = (await verifyToken(token)) as JWTPayload;

    console.log(payload.id, `,<<< id payload`);

    const reqHeaders = new Headers(request.headers);
    reqHeaders.set("x-id", payload.id);
    reqHeaders.set("x-email", payload.email);

    // console.log(reqHeaders, `,<<<< apa??`);

    return NextResponse.next({
      headers: reqHeaders,
    });
  } catch (error) {
    if (error instanceof Error) {
      return Response.json({
        message: error.message,
      });
    }
  }
}

export const config = {
  matcher: ["/api/wishlist/:path*"],
};
