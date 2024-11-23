import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  },
  sale: [{
    productName: {
      type: String,
      required: true
    },
    productPrice: {
      type: Number,
      required: true
    }
  }]
}, { timestamps: true });

export const Employee = mongoose.model('Employee', employeeSchema)