import { z } from "zod";

// Common signup schema
export const signUpSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(80, { message: "Name must be of maximum 80 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["TEACHER", "STUDENT"], {
    message: "Role must be either Teacher or Student",
  }),
  division: z
    .string()
    .min(1, { message: "Division must be a single character" })
    .max(1, { message: "Division must be a single character" })
    .optional(),
  rollNo: z
    .number({ message: "Roll number must be a number" })
    .min(1)
    .max(1000)
    .optional(),
  className: z
    .string()
    .min(4, { message: "Class must be at least 4 characters" })
    .max(15, { message: "Class must be of maximum 15 characters" })
    .optional(),
});

export const signUpSchemaTeachers = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(80, { message: "Name must be of maximum 80 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  role: z.enum(["TEACHER", "STUDENT"], {
    message: "Role must be either Teacher or Student",
  }),
});
