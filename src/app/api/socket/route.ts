// // import { Server as NetServer } from "http";
// // import { NextApiRequest } from "next";
// // import { Server as ServerIO } from "socket.io";
// // import { NextApiResponseServerIO } from "../../../../next";

// // export const dynamic = "force-dynamic";
// // export const runtime = "nodejs";

// // export async function GET(req: NextApiRequest, res: NextApiResponseServerIO) {
// //   if (!res.socket.server.io) {
// //     console.log("New Socket.io server...");
// //     // adapt Next's net Server to http Server
// //     const httpServer: NetServer = res.socket.server as any;
// //     const io = new ServerIO(httpServer, {
// //       path: "/api/socket",
// //     });
// //     // append SocketIO server to Next.js socket server response
// //     res.socket.server.io = io;

// //     io.on("connection", (socket) => {
// //       console.log("New client connected");

// //       socket.on("join-room", (roomId: string) => {
// //         console.log(`Client ${socket.id} joined room ${roomId}`);
// //         socket.join(roomId);
// //       });

// //       socket.on("send-message", (data: { roomId: string; message: string }) => {
// //         console.log("Message received:", data);
// //         io.to(data.roomId).emit("receive-message", data.message);
// //       });

// //       socket.on("disconnect", () => {
// //         console.log("Client disconnected");
// //       });
// //     });
// //   }

// //   res.status(200).json({ message: "Socket server is running" });
// // }

// import { Server as NetServer } from "http";
// import { Server as SocketIOServer } from "socket.io";
// import { NextResponse } from 'next/server';

// export const dynamic = "force-dynamic";
// export const runtime = "nodejs";

// let io: SocketIOServer;

// export async function GET(req: Request) {
//   if (!io) {
//     const res = new NextResponse();
//     const httpServer: NetServer = res.socket.server as any;
//     io = new SocketIOServer(httpServer, {
//       path: "/api/socket",
//     });

//     io.on("connection", (socket) => {
//       console.log("New client connected");

//       socket.on("join-room", (roomId: string) => {
//         console.log(`Client ${socket.id} joined room ${roomId}`);
//         socket.join(roomId);
//       });

//       socket.on("send-message", (data: { roomId: string; message: string }) => {
//         console.log("Message received:", data);
//         io.to(data.roomId).emit("receive-message", data.message);
//       });

//       socket.on("disconnect", () => {
//         console.log("Client disconnected");
//       });
//     });
//   }

//   return NextResponse.json({ message: "Socket server is running" });
// }
