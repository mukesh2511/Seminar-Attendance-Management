import mongoose, { Document, Schema } from "mongoose";

// Define the Student interface
export interface Student extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  className: string;
  division: string;
  rollNo: number;
  attendedClasses: mongoose.Schema.Types.ObjectId[]; // Array of ObjectId references to Class
}

// Define the Student schema
const StudentSchema: Schema<Student> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class", // Referencing the Class model
      },
    ],
  },
  { timestamps: true }
);

// Model for the Student schema
const studentModel =
  (mongoose.models.Student as mongoose.Model<Student>) ||
  mongoose.model<Student>("Student", StudentSchema);

export default studentModel;
