import { Blog } from "../models/blog.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createBlog = asyncHandler(async (req, res) => {


  const { title, content, createdBy } = req.body

  // if ([title, content, createdBy].some(x => x.trim().length === 0)) {
  //   throw new ApiError(400, 'Title or Content cannot be empty')
  // }

  const user = await User.findById({ _id: createdBy });

  if (!user) {
    throw new ApiError(400, 'User does not exists')
  }

  const blog = await Blog.create({ title, content, createdBy })
  user.blogs.push(blog._id)
  user.save()

  res.status(200).json(
    new ApiResponse(200, blog, 'Blog has been created!')
  )

})

export { createBlog }