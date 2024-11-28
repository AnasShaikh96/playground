import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const createUser = asyncHandler(
  async (req, res) => {
    // check if either thing is missing
    const { userName, fullName, email, password } = req.body

    if ([userName, fullName, email, password].some(content => content.trim().length === 0)) {
      throw new ApiError(400, 'Empty values are not allowed')
    }


    const existedUser = await User.findOne({
      $or: [{ userName }, { email }]
    })

    if (existedUser) {
      throw new ApiError(400, 'UserName or Email already Exists!')
    }

    try {
      const user = await User.create({ userName, fullName, email, password })

      res.status(200).json(
        new ApiResponse(200, user, "User created Successfully")
      );

    } catch (error) {

      // console.log(error)

      throw new ApiError(500, error.message)

      // console.log('hello', error)

      // res.status(error.status).json(
      //   new ApiError(error.status, error.message)
      // )

    }
  })


const getUsers = asyncHandler(async (req, res) => {

  const users = await User.find();

  res.status(200).json(users)
})


export { createUser, getUsers }
