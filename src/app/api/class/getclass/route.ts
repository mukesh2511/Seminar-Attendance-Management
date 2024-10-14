import ClassModel from "@/models/classModel";
import { Connect } from "@/utils/db";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body;
    console.log("HHEHEHEHEHEHEHE", id);

    // Ensure a valid ID is provided
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID provided!" },
        { status: 400 }
      );
    }

    await Connect();

    // Use aggregate function correctly
    const myClass = await ClassModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(id),
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "TeacherId",
          foreignField: "_id",
          as: "teacher",
        },
      },
      {
        $unwind: {
          path: "$teacher",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "attendedStudents.id",
          foreignField: "_id",
          as: "Students",
          pipeline: [
            {
              $lookup: {
                from: "students",
                localField: "_id",
                foreignField: "userId",
                as: "student",
              },
            },
            {
              $unwind: {
                path: "$student",
                preserveNullAndEmptyArrays: true,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          Students: {
            $map: {
              input: "$Students",
              as: "student",
              in: {
                _id: "$$student._id",
                name: "$$student.name",
                dateTime: {
                  $arrayElemAt: [
                    {
                      $filter: {
                        input: "$attendedStudents",
                        as: "attended",
                        cond: {
                          $eq: ["$$attended.id", "$$student._id"],
                        },
                      },
                    },
                    0,
                  ],
                },
                className: "$$student.student.className",
                division: "$$student.student.division",
                rollNo: "$$student.student.rollNo",
              },
            },
          },
        },
      },
      {
        $project: {
          _id: 1,
          className: 1,
          classCode: 1,
          latitude: 1,
          longitude: 1,
          ipAddressTeacher: 1,
          createdAt: 1,
          teacher: {
            name: "$teacher.name",
            email: "$teacher.email",
          },
          Students: {
            _id: 1,
            name: 1,
            dateTime: 1,
            rollNo: 1,
            division: 1,
            className: 1,
          },
        },
      },
    ]);
    console.log(myClass);

    if (!myClass || myClass.length === 0) {
      return NextResponse.json(
        { success: false, message: "Class Not Found!!" },
        { status: 404 }
      );
    }

    // If class found, return success response
    return NextResponse.json({ success: true, data: myClass }, { status: 200 });
  } catch (error) {
    console.error("Error fetching class:", error);

    // Return error response
    return NextResponse.json(
      { success: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
