import { z } from "zod";

// Common signup schema
export const signUpSchema = z
  .object({
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
    // Optional fields that will be required based on the role
    division: z
      .string()
      .min(1, { message: "division must be of single character" })
      .max(1, { message: "division must be of single character" })
      .optional(),
    rollNo: z
      .number({ message: "Roll number must be a number" })
      .min(1)
      .max(1000)
      .optional(),
    className: z
      .string()
      .min(4, { message: "class must be at least 4 characters" })
      .max(15, { message: "class must be of maximum 15 characters" })
      .optional(),
  })
  .refine(
    (data) => {
      if (data.role === "STUDENT") {
        // For students, we ensure these fields are present and valid
        return data.division && data.rollNo && data.className;
      }
      return true; // No extra fields for teachers
    },
    {
      message: "Division, Roll No, and Class are required for students",
      path: ["division", "rollNo", "className"], // You can specify the path of the error for clarity
    }
  );
