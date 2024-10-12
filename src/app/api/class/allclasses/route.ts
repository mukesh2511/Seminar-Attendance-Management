import studentModel from "@/models/studentModel";
import teacherModel from "@/models/teacherModel";
import ClassModel from "@/models/classModel";
import { Connect } from "@/utils/db";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const id = req.headers.get("x-user-id");
    const userRole = req.headers.get("x-user-role");

    // Check if id is present, return error if it's null or invalid
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "Invalid or missing user ID" },
        { status: 400 }
      );
    }
    await Connect();

    let myclass: any;
    if (userRole === "STUDENT") {
      myclass = await studentModel.aggregate([
        {
          $match: { userId: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            localField: "attendedClasses",
            from: "classes",
            foreignField: "_id",
            as: "attendedClasses",
          },
        },
        {
          $project: {
            _id: 1,
            userId: 1,
            className: 1,
            division: 1,
            rollNo: 1,
            attendedClasses: {
              $map: {
                input: "$attendedClasses",
                as: "class",
                in: {
                  _id: "$$class._id",
                  TeacherId: "$$class.TeacherId",
                  className: "$$class.className",
                  classCode: "$$class.classCode",
                  latitude: "$$class.latitude",
                  longitude: "$$class.longitude",
                  ipAddressTeacher: "$$class.ipAddressTeacher",
                  ipAddressStudent: "$$class.ipAddressStudent",
                  attendedStudents: {
                    $filter: {
                      input: "$$class.attendedStudents",
                      as: "student",
                      cond: {
                        $eq: ["$$student.id", new mongoose.Types.ObjectId(id)],
                      }, // Filtering attendedStudents where id matches userId
                    },
                  },
                  createdAt: "$$class.createdAt",
                  updatedAt: "$$class.updatedAt",
                },
              },
            },
          },
        },
      ]);
    } else {
      // myclass = await teacherModel.findOne({ userId: id }).populate({
      //   path: "AllClasses", // Populating AllClasses from the Class model
      //   model: "Class",
      // });
      myclass = await teacherModel.aggregate([
        {
          $match: {
            userId: new mongoose.Types.ObjectId(id),
          },
        },
        {
          $lookup: {
            from: "classes",
            localField: "AllClasses",
            foreignField: "_id",
            as: "Classes",
          },
        },
      ]);
    }

    if (!myclass) {
      return NextResponse.json(
        { message: "No classes found" },
        { status: 404 }
      );
    }
    console.log(myclass);
    return NextResponse.json(
      {
        success: true,
        message: "Class retrieved successfully",
        data: myclass,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error fetching all classes", error);
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
