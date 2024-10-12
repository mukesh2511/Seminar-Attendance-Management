// // server.ts

import { createServer } from "http";
import { parse } from "url";
import next from "next";
import { Server as IOServer } from "socket.io";

// For db.tsx
// import { Connect } from "./src/utils/db.tsx";

// // For classModel.ts
// import ClassModel from "./src/models/classModel.ts";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  // Socket.IO setup
  const io = new IOServer(server);

  io.on("connection", (socket) => {
    console.log("New client connected");

    socket.on("message", (data) => {
      console.log("Message received:", data);
      socket.broadcast.emit("message", data);
    });

    // socket.on("join-class", async (id) => {
    //   console.log(`Client joined the class with id: ${id}`);

    //   try {
    //     // Fetch class data using getData function
    //     const classData = await getData(id);
    //     console.log(classData);

    //     if (classData.success) {
    //       // If class data is successfully fetched, join the room and emit the data
    //       socket.join(id);
    //       socket.to(id).emit("receive-data", classData.data[0]); // Emits data to the other clients in the room
    //       console.log(`Data sent for class id: ${id}`);
    //     } else {
    //       // If there was an issue fetching data, emit an error message
    //       socket.emit("error", { message: classData.message });
    //     }
    //   } catch (error) {
    //     // Emit an error event if something goes wrong
    //     socket.emit("error", {
    //       message: "An error occurred while fetching class data.",
    //     });
    //     console.error(`Error fetching class data for id: ${id}`, error);
    //   }
    // });
    socket.on("join-class", (id) => {
      console.log(`client joined the room with id ${id}`);
      socket.join(id);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });

    socket.on("updated-data", (data) => {
      const { id, fetchedData } = data;
      console.log({ DATAAAAAAAAAAA: data });
      console.log(`Client updated data for class id: ${id}`);
      io.to(id).emit("get-updated-data", fetchedData);
    });
  });

  // Start the server
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});

// // export async function getData(id) {
// //   try {
// //     // Ensure a valid ID is provided
// //     if (!id || !mongoose.Types.ObjectId.isValid(id)) {
// //       return {
// //         success: false,
// //         message: "Invalid ID provided!",
// //         status: 400,
// //       };
// //     }

// //     // Connect to the database
// //     await Connect();

// //     // Fetch the class using aggregation
// //     const myClass = await ClassModel.aggregate([
// //       {
// //         $match: {
// //           _id: new mongoose.Types.ObjectId(id),
// //         },
// //       },
// //       {
// //         $lookup: {
// //           from: "users",
// //           localField: "TeacherId",
// //           foreignField: "_id",
// //           as: "teacher",
// //         },
// //       },
// //       {
// //         $unwind: {
// //           path: "$teacher",
// //           preserveNullAndEmptyArrays: true,
// //         },
// //       },
// //       {
// //         $lookup: {
// //           from: "users",
// //           localField: "attendedStudents.id",
// //           foreignField: "_id",
// //           as: "Students",
// //           pipeline: [
// //             {
// //               $lookup: {
// //                 from: "students",
// //                 localField: "_id",
// //                 foreignField: "userId",
// //                 as: "student",
// //               },
// //             },
// //             {
// //               $unwind: {
// //                 path: "$student",
// //                 preserveNullAndEmptyArrays: true,
// //               },
// //             },
// //           ],
// //         },
// //       },
// //       {
// //         $addFields: {
// //           Students: {
// //             $map: {
// //               input: "$Students",
// //               as: "student",
// //               in: {
// //                 _id: "$$student._id",
// //                 name: "$$student.name",
// //                 dateTime: {
// //                   $arrayElemAt: [
// //                     {
// //                       $filter: {
// //                         input: "$attendedStudents",
// //                         as: "attended",
// //                         cond: {
// //                           $eq: ["$$attended.id", "$$student._id"],
// //                         },
// //                       },
// //                     },
// //                     0,
// //                   ],
// //                 },
// //                 className: "$$student.student.className",
// //                 division: "$$student.student.division",
// //                 rollNo: "$$student.student.rollNo",
// //               },
// //             },
// //           },
// //         },
// //       },
// //       {
// //         $project: {
// //           _id: 1,
// //           className: 1,
// //           classCode: 1,
// //           latitude: 1,
// //           longitude: 1,
// //           ipAddressTeacher: 1,
// //           createdAt: 1,
// //           teacher: {
// //             name: "$teacher.name",
// //             email: "$teacher.email",
// //           },
// //           Students: {
// //             _id: 1,
// //             name: 1,
// //             dateTime: 1,
// //             rollNo: 1,
// //             division: 1,
// //             className: 1,
// //           },
// //         },
// //       },
// //     ]);

// //     // If no class is found, return a 404 error
// //     if (!myClass || myClass.length === 0) {
// //       return {
// //         success: false,
// //         message: "Class Not Found!!",
// //         status: 404,
// //       };
// //     }

// //     // If class is found, return the data
// //     return {
// //       success: true,
// //       data: myClass,
// //       status: 200,
// //     };
// //   } catch (error) {
// //     console.error("Error fetching class:", error);

// //     // Return error response in case of server issues
// //     return {
// //       success: false,
// //       message: "Internal Server Error",
// //       status: 500,
// //     };
// //   }
// // }
// const { createServer } = require("http");
// const { parse } = require("url");
// const next = require("next");
// const { Server } = require("socket.io");

// const dev = process.env.NODE_ENV !== "production";
// const app = next({ dev });
// const handle = app.getRequestHandler();

// app.prepare().then(() => {
//   const server = createServer((req, res) => {
//     const parsedUrl = parse(req.url, true);
//     handle(req, res, parsedUrl);
//   });

//   const io = new Server(server);

//   io.on("connection", (socket) => {
//     console.log("New client connected");

//     socket.on("join-room", (roomId) => {
//       console.log(`Client ${socket.id} joined room ${roomId}`);
//       socket.join(roomId);
//     });

//     socket.on("send-message", (data) => {
//       console.log("Message received:", data);
//       io.to(data.roomId).emit("receive-message", data.message);
//     });

//     socket.on("disconnect", () => {
//       console.log("Client disconnected");
//     });
//   });

//   server.listen(3000, (err) => {
//     if (err) throw err;
//     console.log("> Ready on http://localhost:3000");
//   });
// });
