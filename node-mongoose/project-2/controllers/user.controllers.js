import { User } from "../models/user.models.js"

const createUser = async (req, res) => {

  const { username, fullName, email, password } = req.body

  const user = await User.create({ username, fullName, email, password })

  res.status(200).json(user)

}


export { createUser }
