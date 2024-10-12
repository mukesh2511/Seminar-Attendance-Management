import ClassModel from "@/models/classModel";
import studentModel from "@/models/studentModel";
import calculateDistanceInMeters from "@/utils/calculateDistance";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";

// Utility function for returning error responses
const createErrorResponse = (message: string, status: number) => {
  return NextResponse.json({ success: false, message }, { status });
};

export async function POST(req: NextRequest) {
  try {
    console.log(req);
    const body: any = await req.json(); // Ensure you await the JSON parsing
    const { latitude, longitude, code, ip } = body;
    const userId = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role"); // Unused, consider removing if not needed

    // Authorization check
    if (!userId || userRole !== "STUDENT") {
      return createErrorResponse("Unauthorized access!", 401);
    }

    // Location and IP validation
    if (!latitude || !longitude || !ip) {
      return createErrorResponse("Please Verify Location!!", 403);
    }

    // Code validation
    if (!code || code.length !== 8) {
      return createErrorResponse("Please Enter the correct Code!!", 403);
    }

    // Find class
    const getClass = await ClassModel.findOne({ classCode: code });
    if (!getClass) {
      return createErrorResponse("Please enter correct Seminar Code", 404);
    }

    // Calculate distance
    const distance = await calculateDistanceInMeters(
      getClass.latitude,
      getClass.longitude,
      latitude,
      longitude
    );
    console.log({ distance });

    // Distance check
    if (distance > 10) {
      return createErrorResponse("You are not inside class", 401);
    }

    // Check if student already joined the class
    if (getClass.ipAddressStudent.includes(ip)) {
      return NextResponse.json(
        { message: "You are already in class", id: getClass._id },
        { status: 202 }
      );
    }

    // Update class model
    await ClassModel.findByIdAndUpdate(getClass._id, {
      $push: {
        ipAddressStudent: ip, // Push IP into ipAddressStudent array
        attendedStudents: {
          // Push an object with id and dateTime into attendedStudents array
          id: new mongoose.Types.ObjectId(userId),
          dateTime: new Date(),
        },
      },
    });

    // Update student model
    await studentModel.findOneAndUpdate(
      { userId },
      {
        $push: { attendedClasses: getClass._id },
      }
    );

    // Success response
    return NextResponse.json(
      { message: "Joined Class Successfully", id: getClass._id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error joining class:", error);
    return createErrorResponse("Internal server error", 500);
  }
}
