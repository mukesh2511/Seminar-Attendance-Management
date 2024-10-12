"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
// Define the Student schema
var StudentSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User", // Referencing the User model
    },
    className: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    division: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    rollNo: {
        type: Number,
        required: true,
        trim: true,
    },
    attendedClasses: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Class", // Referencing the Class model
        },
    ],
}, { timestamps: true });
// Model for the Student schema
var studentModel = mongoose_1.default.models.Student ||
    mongoose_1.default.model("Student", StudentSchema);
exports.default = studentModel;
