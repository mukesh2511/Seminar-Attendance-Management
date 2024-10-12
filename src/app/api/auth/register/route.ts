import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { Connect } from "@/utils/db";
import userModel from "@/models/userModel";
import studentModel from "@/models/studentModel";
import teacherModel from "@/models/teacherModel";
import { signUpSchema, signUpSchemaTeachers } from "@/schemas/signUpSchema";

// Define the request body type
interface RequestBody {
  name: string;
  email: string;
  password: string;
  role: string;
  division: string;
  className: string;
  rollNo: number;
  isVerified: boolean;
}

// Use async function for the POST method and export it
export async function POST(req: Request) {
  try {
    const body = await req.json();
    let result;
    if (body.role === "STUDENT") {
      result = signUpSchema.safeParse(body);
    } else if (body.role === "TEACHER") {
      result = signUpSchemaTeachers.safeParse(body);
    }
    if (!result?.success) {
      return NextResponse.json(
        {
          error: result?.error.errors, // Detailed error messages
        },
        { status: 400 }
      );
    }

    const {
      name,
      email,
      password,
      role,
      division,
      className,
      rollNo,
      isVerified,
    }: RequestBody = body;

    const db = await Connect();
    const isUserPresent = await userModel.findOne({ email });
    if (isUserPresent) {
      return NextResponse.json(
        { success: false, message: "User already exists!!" },
        { status: 409 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      isVerified,
      role,
    });

    let student;
    let teacher;
    const savedUser = await newUser.save();
    if (savedUser.role === "STUDENT") {
      student = await studentModel.create({
        userId: savedUser._id,
        className,
        division,
        rollNo,
      });
    } else {
      teacher = await teacherModel.create({
        userId: savedUser._id,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "User created successfully",
        savedUser,
        teacher,
        student,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { success: true, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
