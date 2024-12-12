import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from 'jsonwebtoken'


const generateAccessAndRefreshToken = async (userId) => {

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, 'User does not exists!')
  }

  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()

  return { accessToken, refreshToken }

}

const createUser = asyncHandler(
  async (req, res) => {
    // check if either thing is missing
    const { userName, fullName, email, password } = req.body

    if ([userName, fullName, email, password].some(content => content.trim() === '')) {
      throw new ApiError(400, 'Empty values are not allowed')
    }


    const existedUser = await User.findOne({
      $or: [{ userName }, { email }]
    })

    if (existedUser) {
      throw new ApiError(400, 'UserName or Email already Exists!')
    }

    const user = await User.create({ userName, fullName, email, password })

    const createdUser = await User.findById(user._id).select("-password");

    res.status(200).json(
      new ApiResponse(200, createdUser, "User created Successfully")
    );

  })


const loginUser = asyncHandler(async (req, res) => {
  // validate is in correct format email
  // if email exists
  // if password is correct
  // generate tokens and return vals

  const { email, userName, password } = req.body;

  const user = await User.findOne({
    $or: [{ email }, { userName }]
  })

  if (!user) {
    throw new ApiError(400, 'User does not Exists');
  }

  const checkPassword = user.isPasswordCorrect(password)

  if (!checkPassword) {
    throw new ApiError(400, 'password is incorrect');
  }


  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)


  const updateAccessToken = await User.findByIdAndUpdate(user._id, { $set: { accessToken, refreshToken } });
  // console.log('updateAccessToken', updateAccessToken)

  const options = {
    httpOnly: true,
    secure: true
  }

  return res.status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json(
      new ApiResponse(200, updateAccessToken, "User Logged in Successfully!")
    )


})


const logoutUser = asyncHandler(async (req, res) => {

  const user = await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } }, { new: true });


  const options = {
    httpOnly: true,
    secure: true
  }


  return res.status(200)
    .clearCookie("accessToken", '', options)
    .clearCookie("refreshToken", '', options)
    .json(
      new ApiResponse(200, { user }, 'User logged out succesfully')
    )
})


const refreshAccessToken = asyncHandler(async (req, res) => {

  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    throw new ApiError(401, 'Invalid Refresh Token')
  }

  try {
    const decodedToken = jwt.verify(refreshToken, 'pass@123');

    if (!decodedToken) {
      throw new ApiError(401, 'Refresh Token expired or Invalid')
    }


    const user = await User.findById(decodedToken?.id);

    if (!user) {
      throw new ApiError(401, 'Invalid Refresh Token')
    }

    // console.log(user)
    if (refreshToken !== user.refreshToken) {
      throw new ApiError(401, 'Refresh Token is invalid')
    }


    const options = {
      httpOnly: true,
      secure: true
    }

    const { accessToken, newRefreshToken } = await generateAccessAndRefreshToken(user._id)


    return res.status(200)
      .cookie('accessToken', accessToken, options)
      .cookie('refreshToken', newRefreshToken, options)
      .json(
        new ApiResponse(200, { accessToken, refreshToken: newRefreshToken }, 'Token Refreshed')
      )



  } catch (error) {
    throw new ApiError(401, error.message || 'Invalid Refresh Token')
  }
})



const getUsers = asyncHandler(async (req, res) => {
  res.status(200).json(
    new ApiResponse(200, req.user, 'User fetched Successfully!')
  )
})


export { createUser, getUsers, loginUser, logoutUser, refreshAccessToken }
