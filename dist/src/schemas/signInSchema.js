"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCodeSchema = exports.signInSchema = void 0;
var zod_1 = require("zod");
exports.signInSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    password: zod_1.z
        .string()
        .min(6, { message: "password must be at least 6 characters" }),
});
exports.verifyCodeSchema = zod_1.z.object({
    verifyCode: zod_1.z
        .string()
        .min(4, { message: "Code must be at least 4 characters" }),
});
