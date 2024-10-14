import ClassModel from "@/models/classModel";
import teacherModel from "@/models/teacherModel";
import { createClassSchema } from "@/schemas/createClassSchema";
import { Connect } from "@/utils/db";
import { broadcastToClass } from "@/utils/sse";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { className, code, latitude, longitude, ipAddTeacher, accuracy } =
      body;

    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role"); // Unused, remove if unnecessary

    if (!userId || userRole !== "TEACHER") {
      return NextResponse.json(
        { success: false, message: "Unauthorized access!" },
        { status: 401 }
      );
    }

    // Convert userId to ObjectId
    const teacherId = new mongoose.Types.ObjectId(userId);

    const reqData = {
      TeacherId: teacherId, // Use ObjectId
      ipAddressTeacher: ipAddTeacher,
      className: className,
      classCode: code,
      latitude: latitude,
      longitude: longitude,
      accuracy: accuracy,
      // attendedStudents: [
      //   {
      //     id: teacherId, // Ensure the ID is a valid ObjectId
      //     dateTime: new Date(),
      //   },
      // ],
    };

    // Validate the request data using the schema
    const result = createClassSchema.safeParse(reqData);
    if (!result.success) {
      return NextResponse.json(
        { success: false, message: result.error.errors[0].message },
        { status: 422 }
      );
    }

    // Connect to the database
    await Connect();

    // Create a new class document
    const newClass: any = await ClassModel.create(reqData);
    await teacherModel.findOneAndUpdate(
      { userId: newClass.TeacherId },
      {
        $push: { AllClasses: newClass._id }, // Use $push directly here
      }
    );

    if (
      global.sseConnections &&
      global.sseConnections.has(newClass._id.toString())
    ) {
      broadcastToClass(newClass._id.toString(), {
        type: "student-joined",
        userId,
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Class created successfully",
        data: newClass,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      message: "Internal server error",
    });
  }
}
