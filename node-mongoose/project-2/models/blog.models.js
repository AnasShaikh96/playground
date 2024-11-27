import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      comment: {
        type: String
      },
      replies: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
          },
          comment: {
            type: String
          },
        }
      ]
    }
  ],
  hashtags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hashtag'
  }]

}, { timestamps: true })

export const Blog = mongoose.model('Blog', blogSchema)