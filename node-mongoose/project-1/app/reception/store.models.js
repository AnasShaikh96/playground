import mongoose from "mongoose";

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }]
}, { timestamps: true });

export const Store = mongoose.model('Store', storeSchema);