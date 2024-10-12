import mongoose, { Document, Schema } from "mongoose";

// Define the Class interface
export interface Class extends Document {
  TeacherId: mongoose.Schema.Types.ObjectId;
  ipAddressTeacher: string;
  className: string;
  classCode: string;
  latitude: number;
  longitude: number;
  ipAddressStudent: string[]; // Array of IP addresses for students
  attendedStudents: [
    {
      id: mongoose.Schema.Types.ObjectId;
      dateTime: Date;
    }
  ]; // Array of ObjectId references to User
}

// Define the Class schema
const ClassSchema: Schema<Class> = new Schema(
  {
    TeacherId: {
      type: mongoose.Schema.Types.ObjectId,
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
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Referencing the User model
        },
        dateTime: {
          type: Date,
          default: Date.now, // Pass Date.now as a function
        },
      },
    ],
  },
  { timestamps: true }
);

// Model for the Class schema
const ClassModel =
  (mongoose.models.Class as mongoose.Model<Class>) ||
  mongoose.model<Class>("Class", ClassSchema);

export default ClassModel;
