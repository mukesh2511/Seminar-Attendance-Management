"use server";

import { cookies } from "next/headers";
import userModel from "@/models/userModel";
import { signInSchema } from "@/schemas/signInSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { TextEncoder } from "util";
import mongoose from "mongoose";
import { Connect } from "@/utils/db";

// Type for the token payload
interface SignToken {
  id: mongoose.Types.ObjectId;
  role: string;
}
interface RequestBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validate request body using Zod schema
    const result = signInSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          error: result.error.errors,
        },
        { status: 400 }
      );
    }

    const { email, password }: RequestBody = result.data;

    ////connect to Db
    await Connect();

    // Check if user with the provided email exists
    const checkUserWithEmail = await userModel.findOne({ email });
    if (!checkUserWithEmail) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(
      password,
      checkUserWithEmail.password
    );
    if (!isValidPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid Email or Password",
        },
        { status: 403 }
      );
    }

    // Create a token payload
    const tokenData: SignToken = {
      id: checkUserWithEmail._id as mongoose.Types.ObjectId,
      role: checkUserWithEmail.role,
    };
    const secretKey = new TextEncoder().encode(process.env.JWTSECRET);
    // Sign JWT token
    const token = await new SignJWT({ tokenData })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" }) // Specify the algorithm and type
      .setIssuedAt() // Set the issue time to now
      .setExpirationTime("1d") // Set the expiration time (e.g., 1 day)
      .sign(secretKey);
    const user = await userModel.findOne({ email }).select("-password");
    console.log(user);

    // Send response with token
    const response = NextResponse.json(
      {
        success: true,
        message: "Login successfull",
        token,
        user,
      },
      { status: 200 }
    );
    // Set cookie with token
    cookies().set("token", token, { httpOnly: true, path: "/", maxAge: 86400 });
    return response;
  } catch (error) {
    console.error("Error during sign-in:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
