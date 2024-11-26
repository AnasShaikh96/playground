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
        id: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      comment: {
        type: String
      },
      replies: [
        {
          user: {
            id: mongoose.Schema.Types.ObjectId,
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
    id: mongoose.Schema.Types.ObjectId,
    ref: 'Hashtag'
  }]

}, { timestamps: true })

export const Blog = mongoose.model('Blog', blogSchema)