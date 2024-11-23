import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  courses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    unique: true
  }]
}, { timestamps: true });

export const Student = mongoose.model('Student', StudentSchema);


