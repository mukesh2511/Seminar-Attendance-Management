import { z } from "zod";

export const createClassSchema = z.object({
  // TeacherId: z.string().length(24, {
  //   message: "Teacher ID must be a valid 24-character ObjectId",
  // }), // MongoDB ObjectId is 24 characters long
  ipAddressTeacher: z
    .string()
    .min(7, { message: "Invalid IP address" })
    .max(15, { message: "Invalid IP address" }), // IPv4 address length between 7-15 characters
  className: z
    .string()
    .min(2, { message: "Class name must contain at least 2 characters" })
    .max(50, { message: "Class name must contain a maximum of 50 characters" }),
  classCode: z
    .string()
    .length(8, { message: "Class code must be exactly 8 characters" }), // Fixed 8 characters for the class code
  latitude: z.number(),
  // .min(-90, { message: "Latitude must be between -90 and 90" })
  // .max(90, { message: "Latitude must be between -90 and 90" }),
  longitude: z.number(),
  // .min(-180, { message: "Longitude must be between -180 and 180" })
  // .max(180, { message: "Longitude must be between -180 and 180" }),
  accuracy: z.number(),
  // .min(-180, { message: "Longitude must be between -180 and 180" })
  // .max(180, { message: "Longitude must be between -180 and 180" }),
});
