import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.models.js";


export const verifyJwt = asyncHandler(async (req, res, next) => {

  const userCookies = req.cookies.accessToken;

  const accessToken = jwt.verify(userCookies, 'pass@123');

  if (!accessToken) {
    throw new ApiError(401, 'Invalid access token');
  }


  const user = await User.findById(accessToken.id).select('-password')

  if (!user) {
    throw new ApiError(404, 'User not found')
  }

  req.user = user

  next()
})

