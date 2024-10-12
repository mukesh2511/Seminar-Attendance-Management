import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout successful!",
    });

    response.cookies.set("token", "", {
      expires: new Date(0),
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Logout Failed!!",
      },
      { status: 500 }
    );
  }
}
