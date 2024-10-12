import mongoose, { Document, Schema } from "mongoose";

// Define the Teacher interface
export interface Teacher extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  AllClasses: mongoose.Schema.Types.ObjectId[]; // Array of ObjectId references to Class
}

// Define the Teacher schema
const TeacherSchema: Schema<Teacher> = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Referencing the User model
    },
    AllClasses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class", // Referencing the Class model
      },
    ],
  },
  { timestamps: true }
);

// Model for the Teacher schema
const teacherModel =
  (mongoose.models.Teacher as mongoose.Model<Teacher>) ||
  mongoose.model<Teacher>("Teacher", TeacherSchema);

export default teacherModel;
