import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

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


const loginUser = asyncHandler(async (res, res) => {
  // validate is in correct format email
  // if email exists
  // if password is correct
  // generate tokens and return vals

  const { email, password } = req.body;

  if ([email, password].some(field => field.trim() === '')) {
    throw new ApiError(400, 'Email or password cannot be empty')
  }


  const findEmail = await User.findOne({
    $or: [{ email }]
  })

  if (!findEmail) {
    throw new ApiError(400, 'User does not Exists');
  }

  const checkPassword = findEmail.isPasswordCorrect(password)

  if (!checkPassword) {
    throw new ApiError(400, 'password is incorrect');
  }


})



const getUsers = asyncHandler(async (req, res) => {

  const users = await User.find();

  res.status(200).json(users)
})


export { createUser, getUsers, loginUser }
