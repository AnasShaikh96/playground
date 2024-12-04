import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    lowercase: true,
    unique: [true, 'Username should be unique']
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
  }],
  accessToken: {
    type: String
  },
  refreshToken: {
    type: String
  },
}, { timestamps: true });


userSchema.pre('save', async function (next) {
  if (!this.isModified()) return next()
  this.password = await bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {

  return jwt.sign({
    id: this._id,
    userName: this.userName,
    email: this.email
  }, "pass@123", {
    expiresIn: 60 * 60
  })

}

userSchema.methods.generateRefreshToken = function () {

  return jwt.sign({
    id: this._id,
  }, "pass@123", {
    expiresIn: 60 * 60
  })

}


export const User = mongoose.model('User', userSchema);
