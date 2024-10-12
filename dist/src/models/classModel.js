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
// Define the Class schema
var ClassSchema = new mongoose_1.Schema({
    TeacherId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Teacher", // Referencing the Teacher model
        required: true,
    },
    ipAddressTeacher: {
        type: String,
        required: true,
    },
    className: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    classCode: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
    },
    latitude: {
        type: Number,
        required: true,
    },
    longitude: {
        type: Number,
        required: true,
    },
    ipAddressStudent: [
        {
            type: String,
        },
    ],
    attendedStudents: [
        {
            id: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: "User", // Referencing the User model
            },
            dateTime: {
                type: Date,
                default: Date.now, // Pass Date.now as a function
            },
        },
    ],
}, { timestamps: true });
// Model for the Class schema
var ClassModel = mongoose_1.default.models.Class ||
    mongoose_1.default.model("Class", ClassSchema);
exports.default = ClassModel;
