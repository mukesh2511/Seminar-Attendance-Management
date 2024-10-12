"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = void 0;
var zod_1 = require("zod");
// Common signup schema
exports.signUpSchema = zod_1.z
    .object({
    name: zod_1.z
        .string()
        .min(3, { message: "Name must be at least 3 characters" })
        .max(80, { message: "Name must be of maximum 80 characters" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
    role: zod_1.z.enum(["TEACHER", "STUDENT"], {
        message: "Role must be either Teacher or Student",
    }),
    // Optional fields that will be required based on the role
    division: zod_1.z
        .string()
        .min(1, { message: "division must be of single character" })
        .max(1, { message: "division must be of single character" })
        .optional(),
    rollNo: zod_1.z
        .number({ message: "Roll number must be a number" })
        .min(1)
        .max(1000)
        .optional(),
    className: zod_1.z
        .string()
        .min(4, { message: "class must be at least 4 characters" })
        .max(15, { message: "class must be of maximum 15 characters" })
        .optional(),
})
    .refine(function (data) {
    if (data.role === "STUDENT") {
        // For students, we ensure these fields are present and valid
        return data.division && data.rollNo && data.className;
    }
    return true; // No extra fields for teachers
}, {
    message: "Division, Roll No, and Class are required for students",
    path: ["division", "rollNo", "className"], // You can specify the path of the error for clarity
});
