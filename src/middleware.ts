import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface TokenType {
  id: string;
  role: string;
}

export const middleware = async (req: NextRequest) => {
  try {
    const cookieStore = cookies();

    // Check if the "token" cookie exists
    const tokenCookie = cookieStore.get("token");
    // console.log({ tokenCookie });

    if (!tokenCookie) {
      // Redirect to login if token is missing
      return NextResponse.redirect(new URL("/dashboard/login", req.url));
    }

    const token = tokenCookie.value;
    // console.log({ token });

    // Verify JWT token
    const secretKey = new Uint8Array(
      Buffer.from(process.env.JWTSECRET as string, "utf-8")
    );

    const { payload } = await jwtVerify(token, secretKey);

    const { tokenData } = payload;
    const { id, role } = tokenData as TokenType;

    // Add user data to request headers
    const newHeaders = new Headers(req.headers);
    newHeaders.set("x-user-id", id as string);
    newHeaders.set("x-user-role", role as string);
    // console.log(newHeaders);

    // Return a modified response with the new headers attached
    return NextResponse.next({
      request: {
        headers: newHeaders,
      },
    });
  } catch (error) {
    console.error("JWT verification error:", error);

    // Redirect to login if token verification fails
    return NextResponse.redirect(new URL("/dashboard/login", req.url));
  }
};

export const config = {
  matcher: [
    "/Class/:path*",
    "/home",
    "/createseminar",
    "/joinseminar",
    "/api/class/:path*",
  ],
};
