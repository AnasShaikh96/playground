import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    min: [6, 'Minimum 6 characters Required']
  },
  blogs: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog"
  }]
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
