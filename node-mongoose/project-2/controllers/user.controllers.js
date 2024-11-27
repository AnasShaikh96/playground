import { User } from "../models/user.models.js"
import { ApiError } from "../utils/ApiError.js"

const createUser = async (req, res) => {

  const { userName, fullName, email, password } = req.body

  try {
    const user = await User.create({ userName, fullName, email, password })

    res.status(200).json(user)

  } catch (error) {

    // res.status(500)

    throw new ApiError(500, error.message)
  }


}


const getUsers = async (req, res) => {

  const users = await User.find();

  res.status(200).json(users)
}


export { createUser, getUsers }
